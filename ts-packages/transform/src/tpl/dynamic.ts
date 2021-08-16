import { CONFIG } from "../config/compile";
const scope = CONFIG.scope;
export const dynamicTpl = `{{export}}class {{className}} {
    addr: ${scope}Account;
    constructor(addr: ${scope}Account) {
        this.addr = addr;
    }
    {{#each functions}}
    {{#generateFunction .}}{{/generateFunction}}
    {{/each}}
}`;