let scope = "_lang.";
export const eventTpl = `class {{className}} extends ${scope}Event {
  {{#each fields}}
  private {{varName}}: ${scope}{{type.codecType}};
  {{/each}}

  {{{constructor .}}}

  prepare(): void {
    ${scope}Event.Index = {{index}};
    {{#each fields}}
    {{#if decorators.isTopic}}
    this.appendTopic(this.{{varName}});
    {{/if}}
    {{/each}}

    {{#each fields}}
    this.appendData(this.{{varName}});
    {{/each}}
  }
}`;