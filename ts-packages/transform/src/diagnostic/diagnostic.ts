import { DiagnosticCategory, formatDiagnosticMessage } from "assemblyscript";
import { DiagnosticMessage, Range } from "assemblyscript/cli/asc";
import { ContractProgram } from "../contract/contract";
import { FunctionDef } from "../contract/elementdef";

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
        this.checkDuplicateStorableInstace();
    }

    private checkDuplicateMesssage(): void {
        let messageMap: Map<string, FunctionDef> = new Map();
        let finalMsgFunc: FunctionDef[] = [];
        this.contract.contract.msgFuncDefs.forEach(item => {
            if (messageMap.has(item.methodName)) {
                let currentSignature = `name:${item.methodName}signature:${item.declaration.signature.range.toString()}`.replaceAll(" ", "");
                let existFun = messageMap.get(item.methodName)!;
                let existSignature = `name:${existFun.methodName}signature:${existFun.declaration.signature.range.toString()}`.replaceAll(" ", "");
                // let diagnostic = new ContractDiagnostic(DiagnosticCode.INHERIT_OVERRIDE_METHOD,
                //     DiagnosticCategory.ERROR, "", item.declaration.signature.range, existFun.declaration.signature.range);
                if (currentSignature != existSignature) {
                    throw new Error(`The contract has message: ${item.methodName} that has two difference signatures.`);
                }
            } else {
                messageMap.set(item.methodName, item);
                finalMsgFunc.push(item);
            }
            this.contract.contract.msgFuncDefs = finalMsgFunc;
        });
    }

    private checkDuplicateStorableInstace(): void {
        let fields = this.contract.contract.fields;
        let stores = this.contract.storages;
        let countInstanceMap = new Map<string, number>();
        stores.forEach(item => {
            countInstanceMap.set(item.classPrototype.internalName, 0);
        });
        fields.forEach(item => {
            let name = item.type.current.internalName;
            if (countInstanceMap.has(name)) {
                let count = countInstanceMap.get(name) || 0;
                count ++;
                if (count > 1) {
                    throw new Error(`Contract has duplicate storable class: ${item.type.current.name} instance.`);
                }
                countInstanceMap.set(name, count);
            }
        });
    }
}