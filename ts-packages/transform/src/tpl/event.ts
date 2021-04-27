let scope = "_lang.";
export const eventTpl = `class {{className}} extends Event {
  {{#each fields}}
  private {{varName}}: ${scope}{{type.codecType}};
  {{/each}}

  prepare(): void {
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