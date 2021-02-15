class {{className}} {
  {{#each fields}}
  private {{varName}}: {{type.codecType}} | null = null;
  {{/each}}
  {{#each fields}}

  get {{name}}(): {{type.originalType}} {
    if (this.{{varName}} === null) {
      const st = new Storage<{{type.codecType}}>("{{storeKey}}");
      this.{{varName}} = st.load();
    }
    {{#eq type.codecType 'ScaleString'}}
    return this.{{varName}}!.toString();
    {{/eq}}
    {{#neq type.codecType 'ScaleString'}}
      return this.{{varName}}!.unwrap();
    {{/neq}}
  }
  set {{name}}(v: {{type.originalType}}) {
    this.{{varName}} = new {{type.codecType}}(v);
    const st = new Storage<{{type.codecType}}>("{{storeKey}}");
    st.store(this.{{varName}}!);
  }
  {{/each}}
}