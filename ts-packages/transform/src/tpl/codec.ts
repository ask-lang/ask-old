import { CONFIG } from "../config/compile";

let scope = CONFIG.scope;

export const codecTpl = `
{{export}}class {{className}} implements ${scope}Codec {

    {{#each fields}}
    {{rangeString}}
    {{/each}}

    {{{constructorFun.rangeString}}}

    toU8a(): u8[] {
        {{{genClassToU8 .}}}
    }

    encodedLength(): i32 {
        {{{genEncodedLength .}}}
    }
    populateFromBytes(bytes: u8[], index: i32 = 0): void {

        {{{genPopulateFromBytes .}}}
    }

    {{{genCodeEq .}}}

    notEq(other: {{className}}): bool {
        return !this.eq(other);
    }

}`;