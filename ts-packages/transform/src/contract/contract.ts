import {
    ClassPrototype,
    Program,
} from "assemblyscript";

import {
    ContractMetadata,
} from "contract-metadata/src/index";

import { ElementUtil } from "../utils/utils";

import { ProgramAnalyzar } from "./analyzer";
import { ContractInterpreter, DynamicIntercepter, EventInterpreter, StorageInterpreter } from "./classdef";
import { NamedTypeNodeDef } from "./typedef";
import { MetadataGenerator } from "../metadata/generator";

export class ContractProgram {
    program: Program;
    contract!: ContractInterpreter;
    metatdata: ContractMetadata;
    events: EventInterpreter[] = [];
    storages: StorageInterpreter[] = [];
    dynamics: DynamicIntercepter[] = [];
    
    public definedTypeMap: Map<string, NamedTypeNodeDef> = new Map<string, NamedTypeNodeDef>();

    constructor(program: Program) {
        this.program = program;
        this.resolveContract();
        this.metatdata = this.createMetadata();
    }

    private createMetadata(): ContractMetadata {
        return new MetadataGenerator(this).createMetadata();
    }
    
    private resolveContract(): void {
        let countContract = 0;

        this.program.elementsByName.forEach((element, _) => {
            if (ElementUtil.isTopContractClass(element)) {
                countContract ++;
                this.contract = new ContractInterpreter(<ClassPrototype>element);
            }
            if (countContract != 1) {
                throw new Error("The entry file contain multiply 1@contract'");
            }

            if (ElementUtil.isStoreClassPrototype(element)) {
                this.storages.push(new StorageInterpreter(<ClassPrototype>element));
            }
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

export function 
getContractInfo(program: Program): ContractProgram {
    new ProgramAnalyzar(program);
    return new ContractProgram(program);
}
