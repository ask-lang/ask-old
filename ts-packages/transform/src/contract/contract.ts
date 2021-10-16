import {
    ClassPrototype,
    Program,
} from "assemblyscript";

import {
    ContractMetadata,
} from "contract-metadata/src/index";

import { ElementUtil } from "../utils/utils";

import { ProgramAnalyzar } from "./analyzer";
import { ClassInterpreter, ContractInterpreter, DynamicIntercepter, EventInterpreter } from "./classdef";
import { NamedTypeNodeDef } from "./typedef";
import { MetadataGenerator } from "../metadata/generator";
import { ProgramDiagnostic } from "../diagnostic/diagnostic";
import { TypeKindEnum } from "../enums/customtype";

export class ContractProgram {
    program: Program;
    contract!: ContractInterpreter;
    metatdata: ContractMetadata;
    events: EventInterpreter[] = [];
    dynamics: DynamicIntercepter[] = [];
    codecs: ClassInterpreter[]  = [];
    /**
     * defined type map, that would be exported.
     */
    typeDefByName: Map<string, NamedTypeNodeDef> = new Map<string, NamedTypeNodeDef>();

    constructor(program: Program) {
        this.program = program;
        this.setEntryContract();
        this.resolveContract();
        this.genTypeSequence();
        this.getToGenCodecClass();
        this.metatdata = this.createMetadata();
    }

    private getToGenCodecClass(): void {
        this.typeDefByName.forEach((item, key) => {
            if (item.typeKind == TypeKindEnum.USER_CLASS && !item.isCodec) {
                let classInterpreter = new ClassInterpreter(<ClassPrototype>item.current);
                classInterpreter.resolveFieldMembers();
                this.codecs.push(classInterpreter);
            }
        });
    }

    private createMetadata(): ContractMetadata {
        return new MetadataGenerator(this).createMetadata();
    }
    
    private setEntryContract(): void {
        let contractNum = 0;
        this.program.elementsByName.forEach((element, _) => {
            if (ElementUtil.isTopContractClass(element)) {
                contractNum++;
                this.contract = new ContractInterpreter(<ClassPrototype>element);
            }
        });
        if (contractNum != 1) {
            throw new Error(`The entry file should contain one '@contract', in fact it has ${contractNum}.`);
        }
    }

    private resolveContract(): void {
        this.program.elementsByName.forEach((element, _) => {
            if (ElementUtil.isEventClassPrototype(element)) {
                let eventInterpreter = new EventInterpreter(<ClassPrototype>element);
                eventInterpreter.index = this.events.length;
                this.events.push(eventInterpreter);
            }
            if (ElementUtil.isDynamicClassPrototype(element)) {
                let dynamicInterpreter = new DynamicIntercepter(<ClassPrototype>element);
                this.dynamics.push(dynamicInterpreter);
            }
        });
    }

    /**
     * 
     */
    private genTypeSequence(): void {
        if (this.contract) {
            this.contract.genTypeSequence(this.typeDefByName);
        }
        this.events.forEach(event => {
            event.genTypeSequence(this.typeDefByName);
        });
    }
}

export function getContractInfo(program: Program): ContractProgram {
    new ProgramAnalyzar(program);
    let contract = new ContractProgram(program);
    new ProgramDiagnostic(contract);
    return contract;
}
