import { CONFIG } from "../config/compile";

let scope = CONFIG.scope;

export const mainTpl = `
export function deploy(): i32 {
  let {{contract.instanceName}} = new {{contract.name}}();

  do {
  {{#each contract.cntrFuncDefs}}
  const {{name}}Selector: u8[] = {{#selector name}}{{shortArr}}{{/selector}};
  if (${scope}msg.isSelector({{name}}Selector)) {
    {{#neq parameters.length 0}}
    const fnParameters = new ${scope}FnParameters(${scope}msg.data);
    {{/neq}}
    {{#each parameters}}
    let p{{_index}} = fnParameters.get<{{type.codecTypeAlias}}>();
    {{/each}}
    {{../contract.instanceName}}.{{name}}({{#joinParams parameters}}{{/joinParams}}{{ctrDefaultVals}});
    break;
  }
  {{/each}}
  }while(0);
  {{contract.instanceName}}.__commit_storage__();
  return 0;
}

export function call(): i32 {
  const {{contract.instanceName}} = new {{contract.name}}();

  do {
  {{#each contract.msgFuncDefs}}
  const {{name}}Selector: u8[] = {{selector.shortArr}};
  if (${scope}msg.isSelector({{name}}Selector)) {
    {{#eq messageDecorator.mutates 'false'}}
    ${scope}Storage.mode = ${scope}StoreMode.R;
    {{/eq}}
    {{#neq parameters.length 0}}
    const fnParameters = new ${scope}FnParameters(${scope}msg.data);
    {{/neq}}
    {{#each parameters}}
    let p{{_index}} = fnParameters.get<{{type.codecTypeAlias}}>();
    {{/each}}
    {{#if isReturnable}}
    let rs = {{../contract.instanceName}}.{{name}}({{#joinParams parameters}}{{/joinParams}});

    ${scope}ReturnData.set<{{returnType.codecTypeAlias}}>({{{wrapResult returnType}}});
    {{/if}}
    {{#unless isReturnable}}
    {{../contract.instanceName}}.{{name}}({{#joinParams parameters}}{{/joinParams}});
    {{/unless}}
    break;
  }
  {{/each}}
  } while(0);
  {{contract.instanceName}}.__commit_storage__();
  return 0;
}`;