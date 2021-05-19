export const storeTpl = `class {{className}} {
  {{#each fields}}
  private {{varName}}: {{{type.codecTypeAlias}}} | null = null;
  {{/each}}

  {{#each fields}}
  {{{storeGetter .}}}
  {{{storeSetter .}}}
  {{/each}}
}`;