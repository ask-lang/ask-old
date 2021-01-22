function isSelectorEqual(l: u8[], r: u8[]): boolean {
  if (l.length != r.length) return false;
  for (let i = 0; i < l.length; i++) {
    if (l[i] != r[i]) return false;
  }
  return true;
}

export function deploy(): i32 {
  // const selector = arryToHexString(fnSelector);
  // Log.println("deploy.fnSelctor: " + selector);

  const ctorWithParams: u8[] = {{ctorWithParamsVal}}; // 
  const ctorWithoutParams: u8[] = {{ctorWithoutParamsVal}}

  let _{{exportDef.className}} = new {{exportDef.className}}();

  {{#each exportDef.deployers}}
  if (msg.isSelector(ctorWithParams)) {
    _{{../exportDef.className}}.{{methodName}}(false);
  }
  {{/each}}
}

export function call(): i32 {
  const obj = new {{exportDef.className}}();
  {{#each exportDef.messages}}
  const {{methodName}}Selector: u8[] = {{#selector methodName}}{{/selector}};
  if (msg.isSelector({{methodName}}Selector)) {
    const fnParameters = new FnParameters(msg.data);
    {{#each paramters}}
    let p{{index}} = fnParameters.get<{{codecType}}>();
    {{/each}}
    {{#if hasReturnVal}}
    let rs = _{{../exportDef.className}}.{{methodName}}();
    ReturnData.set<{{returnType.codecType}}>(new {{returnType.codecType}}(rs));
    {{/if}}
    {{#unless hasReturnVal}}
    _{{../exportDef.className}}.{{methodName}}();
    {{/unless}}
  }
  {{/each}}
}