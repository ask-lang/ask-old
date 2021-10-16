export class Strings {

    static EMPTY = '';

    static VOID = "void";

    /**
     * Split the string that return result without empty.
     * @param str 
     * @param separator 
     * @returns 
     */
    static splitString(str: string, separator: RegExp): string[] {
        return str.split(separator).filter(item => item != "");
    }
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

    static toBool(str: string): boolean {
        return "true" === str ? true : false;
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

    static similarity(s1: string, s2: string): number {
        var longer = s1;
        var shorter = s2;
        if (s1.length < s2.length) {
            longer = s2;
            shorter = s1;
        }
        var longerLength = longer.length;
        if (longerLength == 0) {
            return 1.0;
        }
        return (longerLength - Strings.editDistance(longer, shorter)) / parseFloat(String(longerLength));
    }

    private static editDistance(s1: string, s2: string): number {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        var costs = new Array<number>();
        for (var i = 0; i <= s1.length; i++) {
            var lastValue = i;
            for (var j = 0; j <= s2.length; j++) {
                if (i == 0)
                    costs[j] = j;
                else {
                    if (j > 0) {
                        var newValue = costs[j - 1];
                        if (s1.charAt(i - 1) != s2.charAt(j - 1))
                            newValue = Math.min(Math.min(newValue, lastValue),
                                costs[j]) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0)
                costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    }

}
export class Verify {

    static verify(expression: boolean, message: string): void {
        if (!expression) {
            throw new Error(message);
        }
    }
}
