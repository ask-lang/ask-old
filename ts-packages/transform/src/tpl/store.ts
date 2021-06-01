export const storeTpl = `{{export}}class {{className}} {
  {{#each fields}}
  private {{varName}}: {{{type.plainTypeNode}}} | null = null;
  {{/each}}

  {{#each fields}}
  {{{storeGetter .}}}
  {{{storeSetter .}}}
  {{/each}}
}`;