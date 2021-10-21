import { DiagnosticMessage, Range } from "assemblyscript/cli/asc";
import { ContractProgram } from "../contract/contract";
import { FunctionDef } from "../contract/elementdef";
import { RangeUtil } from "../utils/utils";

export enum DiagnosticCode {
    INHERIT_OVERRIDE_METHOD,
}
export class ContractDiagnostic implements DiagnosticMessage {
    code: number;
    category: number;
    message: string;
    range: Range | null;
    relatedRange: Range | null;
   
    constructor(code: number, category: number, message: string, range: Range | null, relatedRange: Range | null) {
        this.code = code;
        this.category = category;
        this.message = message;
        this.range = range;
        this.relatedRange = relatedRange;
    }
}

export class ProgramDiagnostic {

    messasges: ContractDiagnostic[] = [];

    contract: ContractProgram;

    constructor(contract: ContractProgram) {
        this.contract = contract;
        this.checkDuplicateMesssage();
        this.checkDuplicateStorableInstance();
    }

    private checkDuplicateMesssage(): void {
        let messageMap: Map<string, FunctionDef> = new Map();
        let finalMsgFunc: FunctionDef[] = [];
        this.contract.contract.msgFuncDefs.forEach(item => {
            if (messageMap.has(item.name)) {
                let currentSignature = `name:${item.name}signature:${item.declaration.signature.range.toString()}`;
                let existFun = messageMap.get(item.name)!;
                let existSignature = `name:${existFun.name}signature:${existFun.declaration.signature.range.toString()}`;
                if (currentSignature != existSignature) {
                    throw new Error(`The contract has message: ${item.name} that has two difference signatures.`);
                }
            } else {
                messageMap.set(item.name, item);
                finalMsgFunc.push(item);
            }
            this.contract.contract.msgFuncDefs = finalMsgFunc;
        });
    }

    private checkDuplicateStorableInstance(): void {
        let fields = this.contract.contract.fields;
        let countInstanceMap = new Map<string, number>();
        fields.forEach(item => {
            let name = item.type.current.internalName;
            if (countInstanceMap.has(name)) {
                let count = countInstanceMap.get(name) || 0;
                count ++;
                if (count > 1) {
                    throw new Error(`Contract has multiple storable class: ${item.type.current.name} instances. please check ${RangeUtil.location(item.declaration.range)}`);
                }
                countInstanceMap.set(name, count);
            }
        });
    }
}