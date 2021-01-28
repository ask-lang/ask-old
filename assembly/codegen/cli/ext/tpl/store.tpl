{{#each stores}}
class {{className}} {
  {{#each fields}}
  private {{varName}}: {{fieldType}} = null;
  {{/each}}
  {{#each fields}}

  get {{name}}(): {{fieldType}} {
    if (this.{{varName}} === null) {
      const st = new Storage<{{fieldCodecType}}>("{{storeKey}}");
      this.{{varName}} = st.load();
    }
    return this.{{varName}}!.unwrap();
  }
  set {{name}}(v: {{fieldType}}) {
    this.{{varName}} = new {{fieldCodecType}}(v);
    const st = new Storage<{{fieldCodecType}}>("{{storeKey}}");
    st.store(this.{{varName}});
  }
  {{/each}}
}
{{/each}}
