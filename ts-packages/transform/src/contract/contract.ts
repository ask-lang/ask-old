import {
    ClassPrototype,
    Program,
} from "assemblyscript";

import {
    ContractMetadata,
} from "pl-contract-metadata/src/index";

import { ElementUtil } from "../utils/utils";

import { ProgramAnalyzar } from "./analyzer";
import { ClassInterpreter, ContractInterpreter, DynamicIntercepter, EventInterpreter } from "./classdef";
import { NamedTypeNodeDef } from "./typedef";
import { MetadataGenerator } from "../metadata/generator";
import { ProgramDiagnostic } from "../diagnostic/diagnostic";
import { TypeKindEnum } from "../enums/customtype";

export class ContractProgram {
    program: Program;
    contract: ContractInterpreter;
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
        this.contract = this.getEntryContract();
        this.resolveContract();
        this.genTypeSequence();
        this.getToGenCodecClass();
        this.metatdata = this.genMetadata();
    }

    private getToGenCodecClass(): void {
        this.typeDefByName.forEach((item, key) => {
            if (item.typeKind == TypeKindEnum.USER_CLASS && !item.isCodec) {
                let classInterpreter = new ClassInterpreter(<ClassPrototype>item.current);
                this.codecs.push(classInterpreter);
            }
        });
    }

    private genMetadata(): ContractMetadata {
        return new MetadataGenerator(this).createMetadata();
    }

    private getEntryContract(): ContractInterpreter {
        let contractNum = 0;
        let contract: ContractInterpreter | null = null;
        this.program.elementsByName.forEach((element, _) => {
            if (ElementUtil.isTopContractClass(element)) {
                contractNum++;
                contract = new ContractInterpreter(<ClassPrototype>element);
            }
        });
        if (contract && contractNum == 1) {
            return contract;
        }
        throw new Error(`The entry file should contain one '@contract', in fact it has ${contractNum}.`);
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
        this.contract.genSeqOfMetadataType(this.typeDefByName);
        this.events.forEach(event => {
            event.genSeqOfMetadataType(this.typeDefByName);
        });
    }
}

export function getContractInfo(program: Program): ContractProgram {
    new ProgramAnalyzar(program);
    let contract = new ContractProgram(program);
    new ProgramDiagnostic(contract);
    return contract;
}
