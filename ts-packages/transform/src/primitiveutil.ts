import * as assert from "assert";

export class Strings {
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
        return beginChar == endChar && (beginChar == 0x22 || beginChar == 0x27);
    }

    static EMPTY = "";

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
            return (
                str.substring(0, 1).toLowerCase() + str.substring(1, str.length)
            );
        }
    }
}

export class AbiUtils {
    private static DATABASE_CHARSETS = "abcdefghijklmnopqrstuvwxyz12345.";

    /**
     * Check the action name whether is legal.
     * The action name should be less or equal than 21 characters.
     * @param str the action name
     */
    static checkActionName(str: string): void {
        assert.ok(str.length > 0, `Action name should not empty.`);
        assert.ok(
            str.length <= 21,
            `Action Name:${str} should be less than 21 characters.`
        );
    }

    /**
     * Check the database name whether is legal.
     * The database name should be less or equal than 12 characters.
     * @param name the database name
     */
    static checkDatabaseName(name: string): void {
        assert.ok(name.length > 0, `Table name should not empty.`);
        assert.ok(
            name.length <= 12,
            `Table name Name:${name} should be less than 12 characters.`
        );
        for (let aChar of name) {
            assert.ok(
                AbiUtils.DATABASE_CHARSETS.includes(aChar),
                `Table name:${name} should only contain the chars:${AbiUtils.DATABASE_CHARSETS}`
            );
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
