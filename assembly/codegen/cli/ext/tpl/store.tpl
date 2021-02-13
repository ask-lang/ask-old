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
    return this.{{varName}}!.unwrap();
  }
  set {{name}}(v: {{type.originalType}}) {
    this.{{varName}} = new {{type.codecType}}(v);
    const st = new Storage<{{type.codecType}}>("{{storeKey}}");
    st.store(this.{{varName}}!);
  }
  {{/each}}
}