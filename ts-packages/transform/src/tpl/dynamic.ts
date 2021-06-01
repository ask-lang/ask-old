export const dynamicTpl = `{{export}}class {{className}} {
    addr: AccountId;
    constructor(addr: AccountId) {
        this.addr = addr;
    }
    {{#each functions}}
    {{#generateFunction .}}{{/generateFunction}}
    {{/each}}
}`;