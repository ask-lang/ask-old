export const storeTpl = `

  {{#each fields}}
  {{{storeGetter .}}}
  {{{storeSetter .}}}
  {{/each}}
`;

export const storeFieldTpl = `private {{varName}}: {{{type.plainTypeNode}}} | null = null`;

export const storeCommitTpl = `
  __commit_storage__(): void {
    {{#each fields}}
    {{{genCommit .}}}
    {{/each}}
  }
`;