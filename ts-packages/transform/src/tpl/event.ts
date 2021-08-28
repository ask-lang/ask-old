export const eventTpl = `
  protected __prepare__(): void {
    super.__prepare__();
    this.index = {{index}};

    {{#each fields}}
    {{#if decorators.isTopic}}
    this.appendTopic({{toCodec .}});
    {{/if}}
    {{/each}}

    {{#each fields}}
    this.appendData({{toCodec .}});
    {{/each}}
  }

  emit(): void {
      this.__prepare__();
      this.__emit__();
  }
`;