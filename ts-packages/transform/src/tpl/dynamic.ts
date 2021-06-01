import { CONFIG } from "../config/compile";
const scope = CONFIG.scope;
export const dynamicTpl = `{{export}}class {{className}} {
    addr: ${scope}AccountId;
    constructor(addr: ${scope}AccountId) {
        this.addr = addr;
    }
    {{#each functions}}
    {{#generateFunction .}}{{/generateFunction}}
    {{/each}}
}`;