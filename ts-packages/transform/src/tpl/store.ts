const scope = "_lang.";

export const storeTpl = `class {{className}} {
  {{#each fields}}
  private {{varName}}: {{type.codecTypeAlias}} | null = null;
  {{/each}}
  {{#each fields}}

  get {{name}}(): {{type.plainType}} {
    if (this.{{varName}} === null) {
      const st = new ${scope}Storage<{{type.codecTypeAlias}}>("{{storeKey}}");
      this.{{varName}} = st.load();
    }
    {{#eq type.codecType 'ScaleString'}}
    return this.{{varName}}!.toString();
    {{/eq}}
    {{#neq type.codecType 'ScaleString'}}
      return this.{{varName}}!.unwrap();
    {{/neq}}
  }
  set {{name}}(v: {{type.plainType}}) {    
    this.{{varName}} = new {{type.codecTypeAlias}}(v);
    const st = new ${scope}Storage<{{type.codecTypeAlias}}>("{{storeKey}}");
    st.store(this.{{varName}}!);
  }
  {{/each}}
}`;