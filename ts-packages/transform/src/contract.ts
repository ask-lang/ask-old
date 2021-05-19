import {
    ClassPrototype,
    Program,
} from "assemblyscript";

import {
    Contract,
    ContractMetadata,
    ContractSpec,
    Source
} from "../../contract-metadata/src/index";

import { ElementUtil } from "./utils/utils";

import { ProgramAnalyzar } from "./analyzer";
import { ConstructorDef, MessageFuctionDef, NamedTypeNodeDef } from "./contract/elementdef";
import { CONFIG } from "./config/compile";
import { FieldLayout, Layout, StructLayout } from "../../contract-metadata/src/layouts";
import { ClassInterpreter, ContractInterpreter, DynamicIntercepter, EventInterpreter, StorageInterpreter } from "./contract/classdef";
import { CompositeDef, PrimitiveDef, Type, Field, SequenceDef } from "../../contract-metadata/src/types";
import { TypeHelper } from "./utils/typeutil";
import { TypeKindEnum } from "./enums/customtype";

export class ContractProgram {
    program: Program;
    contract!: ContractInterpreter;
    metatdata: ContractMetadata;
    events: EventInterpreter[] = [];
    storages: StorageInterpreter[] = [];
    dynamics: DynamicIntercepter[] = [];
    
    private definedTypeMap: Map<string, NamedTypeNodeDef> = new Map<string, NamedTypeNodeDef>();

    constructor(program: Program) {
        this.program = program;
        this.resolve();
        this.metatdata = this.createMetadata();
    }

    private getContractSpec(): ContractSpec {
        let events = this.events.map(item => item.createMetadata());
        let message = this.contract.msgFuncDefs.map(item => {
            let msg = <MessageFuctionDef>item;
            return msg.createMetadata();
        });
        let contract = this.contract.cntrFuncDefs.map(item => {
            let msg = <ConstructorDef>item;
            return msg.createMetadata();
        });
        return new ContractSpec(contract, message, events, []);
    }

    private createStoreLayout(): Layout {
        let layouts: FieldLayout[]  = [];
        this.storages.forEach(item => layouts = layouts.concat(item.createMetadata()));
        return new StructLayout(layouts);
    }

    private createTypeMetadata(): Type[] {
        let metadataTypes = new Array<Type>();
        let _definedTypeMap = this.definedTypeMap;
        _definedTypeMap.forEach((type, _) => {
            if (TypeHelper.isPrimitiveType(type.typeKind)) {
                metadataTypes.push(new PrimitiveDef(type.abiType));
            } else if (type.typeKind == TypeKindEnum.USER_CLASS) {
                let classType: ClassPrototype = <ClassPrototype>type.current;
                let interpreter = new ClassInterpreter(classType);
                interpreter.resolveFieldsMembers();
                let fieldArr = new Array<Field>();
                interpreter.fields.forEach(classField => {
                    let name = classField.name;
                    let fieldTypeName = classField.type.codecType;
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    let fieldType = _definedTypeMap.get(fieldTypeName)!;
                    let field = new Field(name, fieldType.index, fieldType.plainType);
                    fieldArr.push(field);
                });
                let compositeDef = new CompositeDef(fieldArr);
                metadataTypes.push(compositeDef);
            } else if (type.typeKind == TypeKindEnum.ARRAY) {
                let argumentType = type.typeArguments[0];
                let fieldType = _definedTypeMap.get(argumentType.codecType)!;
                let sequence = new SequenceDef(fieldType.index);
                metadataTypes.push(sequence);
            }
        });
        return metadataTypes;
    }

    private createMetadata(): ContractMetadata {
        let source = new Source("", CONFIG.language, CONFIG.language);
        let contract = new Contract(this.contract!.camelName, "0.1");
        let contractSpec = this.getContractSpec();
        let types = this.createTypeMetadata();
        let layout = this.createStoreLayout();
        return new ContractMetadata(source, contract, contractSpec, types, layout);
    }

    private resolve(): void {
        this.program.elementsByName.forEach((element, _) => {
            if (ElementUtil.isTopContractClass(element)) {
                this.contract = new ContractInterpreter(<ClassPrototype>element);
            }
            if (ElementUtil.isStoreClassPrototype(element)) {
                this.storages.push(new StorageInterpreter(<ClassPrototype>element));
            }
            if (ElementUtil.isEventClassPrototype(element)) {
                let eventInterpreter = new EventInterpreter(<ClassPrototype>element);
                this.events.push(eventInterpreter);
            }
            if (ElementUtil.isDynamicClassPrototype(element)) {
                let dynamicInterpreter = new DynamicIntercepter(<ClassPrototype>element);
                this.dynamics.push(dynamicInterpreter);
            }
        });
        this.setTypeSequence();
    }

    private setTypeSequence(): void {
        if (this.contract) {
            this.contract.genTypeSequence(this.definedTypeMap);
        }
        this.storages.forEach(storage => {
            storage.genTypeSequence(this.definedTypeMap);
        });
        this.events.forEach(event => {
            event.genTypeSequence(this.definedTypeMap);
        });
    }
}

export function getContractInfo(program: Program): ContractProgram {
    new ProgramAnalyzar(program);
    // program.getSource
    return new ContractProgram(program);
}
