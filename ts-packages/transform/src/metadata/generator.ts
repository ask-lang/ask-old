import { ClassPrototype } from "assemblyscript";
import { Contract, ContractMetadata, ContractSpec, Source } from "pl-contract-metadata/src";
import { FieldLayout, Layout, StructLayout } from "pl-contract-metadata/src/layouts";
import { ArrayDef, CompositeDef, Field, PrimitiveDef, SequenceDef, Type } from "pl-contract-metadata/src/types";
import { CONFIG } from "../config/compile";
import { ContractProgram } from "../contract/contract";
import { ClassInterpreter } from "../contract/classdef";
import { ConstructorDef, MessageFunctionDef } from "../contract/elementdef";
import { TypeKindEnum } from "../enums/customtype";
import { TypeHelper } from "../utils/typeutil";
import { MetadataUtil } from "../utils/metadatautil";
import { Strings } from "../utils/primitiveutil";
import { IndexSelector } from "../preprocess/selector";
import { NamedTypeNodeDef } from "../contract/typedef";

export class MetadataGenerator {

    contractInfo: ContractProgram;

    constructor(contract: ContractProgram) {
        this.contractInfo = contract;
    }

    public createMetadata(): ContractMetadata {
        let source = new Source("", CONFIG.language, CONFIG.compiler);
        let contractName = Strings.lowerFirstCase(this.contractInfo.contract!.name);
        let contract = new Contract(contractName, CONFIG.version);
        let contractSpec = this.getContractSpec();
        let types = this.genMetadataTypes();
        let layout = this.genMetadataStoreLayout();
        return new ContractMetadata(source, contract, contractSpec, types, layout);
    }

    private getContractSpec(): ContractSpec {
        let events = this.contractInfo.events.map(item => item.createMetadata());
        let message = this.contractInfo.contract.msgFuncDefs.map(item => {
            let msg = <MessageFunctionDef>item;
            return msg.createMetadata();
        });
        let contract = this.contractInfo.contract.cntrFuncDefs.map(item => {
            let cntr = <ConstructorDef>item;
            return cntr.createMetadata();
        });
        contract.push(MetadataUtil.createDefaultCntr());
        return new ContractSpec(contract, message, events, this.contractInfo.contract.doc);
    }

    private genMetadataStoreLayout(): Layout {
        let layouts: FieldLayout[] = [];
        let fields = this.contractInfo.contract.storeFields;
        for (let i = 1; i <= fields.length; i++) {
            let item = fields[i - 1];
            item.selector = new IndexSelector(i);
            layouts = layouts.concat(item.createMetadata());
        }
        return new StructLayout(layouts);
    }

    private genMetadataTypes(): Type[] {
        let metadataTypes = new Array<Type>();
        let typeDefByName = this.contractInfo.typeDefByName;

        typeDefByName.forEach((type, _) => {
            if (TypeHelper.isPrimitiveType(type.typeKind)) {
                metadataTypes.push(new PrimitiveDef(type.abiType));
            } else if (type.typeKind == TypeKindEnum.USER_CLASS) {
                let classType: ClassPrototype = <ClassPrototype>type.current;
                let interpreter = new ClassInterpreter(classType);
                let fieldTypeArr = this.toClassFieldArr(interpreter);
                let compositeDef = new CompositeDef(fieldTypeArr);
                metadataTypes.push(compositeDef);
            } else if (type.typeKind == TypeKindEnum.ARRAY) {
                let argumentType = type.typeArguments[0];
                let arguType = this.getNamedTypeNodeDefByKey(argumentType.getMetadataType());
                if (type.capacity == 0) {
                    let sequence = new SequenceDef(arguType.index);
                    metadataTypes.push(sequence);
                } else {
                    let arr = new ArrayDef(type.capacity, arguType.index);
                    metadataTypes.push(arr);
                }
            } else if (type.typeKind == TypeKindEnum.MAP) {
                let keyArgu = this.getNamedTypeNodeDefByKey(type.typeArguments[0].getMetadataType());
                let valArgu = this.getNamedTypeNodeDefByKey(type.typeArguments[1].getMetadataType());
                let keyField = new Field("key_index", keyArgu.index);
                let valField = new Field("value", valArgu.index);
                let compositeDef = new CompositeDef([keyField, valField]);
                metadataTypes.push(compositeDef);
            }
        });
        return metadataTypes;
    }

    private toClassFieldArr(interpreter: ClassInterpreter): Array<Field> {
        let fieldTypeArr = new Array<Field>();
        interpreter.fields.forEach(classField => {
            let name = classField.name;
            let fieldTypeName = classField.type.getMetadataType();
            let fieldType = this.getNamedTypeNodeDefByKey(fieldTypeName);
            let field = new Field(name, fieldType.index);
            fieldTypeArr.push(field);
        });
        return fieldTypeArr;
    }

    private getNamedTypeNodeDefByKey(key: string): NamedTypeNodeDef {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.contractInfo.typeDefByName.get(key)!;
    }
}