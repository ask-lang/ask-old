export class Strings {

    static EMPTY = '';

    static VOID = "void";

    /**
       * Judge the string whetehr aroud by qutation or not.
       * The charcode of '"' is 0x22
       * @param str The string to judge
       */
    static isAroundQuotation(str: string): boolean {
        if (str == undefined || str == null) {
            return false;
        }
        var beginChar = str.charCodeAt(0);
        var endChar = str.charCodeAt(str.length - 1);
        return (beginChar == endChar) && (beginChar == 0x22 || beginChar == 0x27);
    }

    static isString(typeName: string): boolean {
        return "string" == typeName || "String" == typeName;
    }

    /**
     * If the string around quotation, remove the quotation.
     * @param str The source string
     */
    static removeQuotation(str: string): string {
        if (Strings.isAroundQuotation(str)) {
            return str.substring(1, str.length - 1);
        }
        return str;
    }

    static lowerFirstCase(str: string): string {
        if (str.length <= 1) {
            return str.toLowerCase();
        } else {
            return str.substring(0, 1).toLowerCase() + str.substring(1, str.length);
        }
    }
}
export class Verify {

    static verify(expression: boolean, message: string): void {
        if (!expression) {
            throw new Error(message);
        }
    }
}
