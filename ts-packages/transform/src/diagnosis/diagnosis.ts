import { DiagnosticMessage, Range } from "assemblyscript/cli/asc";

export class DiagnosticMsg implements DiagnosticMessage {
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

export class DiagnosticUtil {

    // static create(code: number, category: DiagnosticCategory, arg0?: string | null, arg1?: string | null, arg2?: string | null): DiagnosticMessage {
    //     return
    // }

}