export const storeTpl = `

  {{#each fields}}
  {{{storeGetter .}}}
  {{{storeSetter .}}}
  {{/each}}
`;

export const sotreFieldTpl = `private {{varName}}: {{{type.plainTypeNode}}} | null = null`;