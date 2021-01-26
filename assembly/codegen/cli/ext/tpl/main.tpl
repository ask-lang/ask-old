var msg: Msg = new Msg();

export function deploy(): i32 {
  let _{{exportDef.contractName}} = new {{exportDef.className}}();

  {{#each exportDef.deployers}}
  const {{methodName}}Selector: u8[] = {{#selectorArr methodName}}{{/selectorArr}};
  if (msg.isSelector({{methodName}}Selector)) {
    const fnParameters = new FnParameters(msg.data);
    {{#each paramters}}
    let p{{_index}} = fnParameters.get<{{codecType}}>();
    {{/each}}
    _{{../exportDef.contractName}}.{{methodName}}({{#joinParams paramters}}{{/joinParams}}{{ctrDefaultVals}});
  }
  {{/each}}
}

export function call(): i32 {
  const _{{exportDef.contractName}} = new {{exportDef.className}}();
  {{#each exportDef.messages}}
  const {{methodName}}Selector: u8[] = {{#selectorArr methodName}}{{/selectorArr}};
  if (msg.isSelector({{methodName}}Selector)) {
    const fnParameters = new FnParameters(msg.data);
    {{#each paramters}}
    let p{{_index}} = fnParameters.get<{{codecType}}>();
    {{/each}}
    {{#if hasReturnVal}}
    let rs = _{{../exportDef.contractName}}.{{methodName}}({{#joinParams paramters}}{{/joinParams}});
    ReturnData.set<{{returnType.codecType}}>(new {{returnType.codecType}}(rs));
    {{/if}}
    {{#unless hasReturnVal}}
    _{{../exportDef.contractName}}.{{methodName}}({{#joinParams paramters}}{{/joinParams}});
    {{/unless}}
  }
  {{/each}}

}