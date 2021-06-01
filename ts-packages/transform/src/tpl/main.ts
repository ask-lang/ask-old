import { CONFIG } from "../config/compile";

let scope = CONFIG.scope;

export const mainTpl = `
export function deploy(): i32 {
  let {{contract.instanceName}} = new {{contract.className}}();

  {{#each contract.cntrFuncDefs}}
  const {{methodName}}Selector: u8[] = {{#selector methodName}}{{shortArr}}{{/selector}};
  if (${scope}msg.isSelector({{methodName}}Selector)) {
    {{#neq parameters.length 0}}
    const fnParameters = new ${scope}FnParameters(${scope}msg.data);
    {{/neq}}
    {{#each parameters}}
    let p{{_index}} = fnParameters.get<{{type.codecTypeAlias}}>();
    {{/each}}
    {{../contract.instanceName}}.{{methodName}}({{#joinParams parameters}}{{/joinParams}}{{ctrDefaultVals}});
  }
  {{/each}}
  return 0;
}

export function call(): i32 {
  const {{contract.instanceName}} = new {{contract.className}}();
  {{#each contract.msgFuncDefs}}
  const {{methodName}}Selector: u8[] = {{selector.shortArr}};
  if (${scope}msg.isSelector({{methodName}}Selector)) {
    {{#neq parameters.length 0}}
    const fnParameters = new ${scope}FnParameters(${scope}msg.data);
    {{/neq}}
    {{#each parameters}}
    let p{{_index}} = fnParameters.get<{{type.codecTypeAlias}}>();
    {{/each}}
    {{#if isReturnable}}
    let rs = {{../contract.instanceName}}.{{methodName}}({{#joinParams parameters}}{{/joinParams}});

    ${scope}ReturnData.set<{{returnType.codecTypeAlias}}>({{{wrapResult returnType}}});
    {{/if}}
    {{#unless isReturnable}}
    {{../contract.instanceName}}.{{methodName}}({{#joinParams parameters}}{{/joinParams}});
    {{/unless}}
  }
  {{/each}}
  return 0;
}`;