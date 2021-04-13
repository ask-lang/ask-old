// TODO: use json object for abi
export const abiTpl = `{
  "metadataVersion": "0.1.0",
  "source": {
    "hash": "{{hash}}",
    "language": "ask v0.1",
    "compiler": "ask v0.1, asc v0.18.9"
  },
  "contract": {
    "name": "{{contract.name}}",
    "version": "{{contract.version}}",
    "authors": [
      "[your_name] <[your_email]>"
    ]
  },
  "spec": {
    "constructors": [
      {
        "args": [ ],
        "docs": [ "" ],
        "name": [ "new" ],
        "selector": "{{#selector 'new'}}{{short}}{{/selector}}"
      }{{#neq contract.cntrFuncDefs.length 0}},{{/neq}}
      {{#each contract.cntrFuncDefs}}
      {
        "args": [
          {{#each parameters}}
          {
            "name": "{{name}}",
            "type": {
              "displayName": [
                "{{type.originalType}}"
              ],
              "type": {{type.index}}
            }
          }{{#if isMid}},{{/if}}
          {{/each}}
        ],
        "docs": [ "" ],
        "name": [ "{{methodName}}" ],
        "selector": "{{#selector methodName}}{{short}}{{/selector}}"
      }{{#if isMid}},{{/if}}
      {{/each}}
    ],
    "docs": [ "" ],
    "events": [],
    "messages": [
      {{#each contract.msgFuncDefs}}
      {
        "args": [
          {{#each parameters}}
          {
            "name": "{{name}}",
            "type": {
              "displayName": [
                "{{type.originalType}}"
              ],
              "type": {{type.index}}
            }
          }{{#if isMid}},{{/if}}
          {{/each}}
        ],
        "docs": [ "" ],
        "mutates": {{messageDecorator.mutates}},
        "name": [
          "{{methodName}}"
        ],
        "payable": {{messageDecorator.payable}},
        {{#if isReturnable}} 
        "returnType": {
          "displayName": [
            "{{returnType.originalType}}"
          ],
          "type": {{returnType.index}}
        },
        {{else}}
        "returnType": null,
        {{/if}}
        "selector": "{{#existSelector methodName messageDecorator.selector}}{{short}}{{/existSelector}}"
      }{{#if isMid}},{{/if}}
      {{/each}}
    ]
  },
  "storage": {
    "struct": {
      "fields": [
        {{#each fields}}
        {
          "layout": {
            "cell": {
              "key": "{{#selector storeKey}}{{hex}}{{/selector}}",
              "ty": {{type.index}}
            }
          },
          "name": "{{name}}"
        }{{#if isMid}},{{/if}}
        {{/each}}
      ]
    }
  },
  "types": [
    {{#each types}}
    {
      "def": {
        "primitive": "{{abiType}}"
      }
    }{{#if isMid}},{{/if}}
    {{/each}}
  ]
}`;

export const storeTpl = `class {{className}} {
  {{#each fields}}
  private {{varName}}: {{type.codecType}} | null = null;
  {{/each}}
  {{#each fields}}

  get {{name}}(): {{type.originalType}} {
    if (this.{{varName}} === null) {
      const st = new Storage<{{type.codecType}}>("{{storeKey}}");
      this.{{varName}} = st.load();
    }
    {{#eq type.codecType 'ScaleString'}}
    return this.{{varName}}!.toString();
    {{/eq}}
    {{#neq type.codecType 'ScaleString'}}
      return this.{{varName}}!.unwrap();
    {{/neq}}
  }
  set {{name}}(v: {{type.originalType}}) {
    this.{{varName}} = new {{type.codecType}}(v);
    const st = new Storage<{{type.codecType}}>("{{storeKey}}");
    st.store(this.{{varName}}!);
  }
  {{/each}}
}`;

export const mainTpl = `var msg: Msg = new Msg();

export function deploy(): i32 {
  let {{contract.instanceName}} = new {{contract.className}}();

  {{#each contract.cntrFuncDefs}}
  const {{methodName}}Selector: u8[] = {{#selector methodName}}{{u8Arr}}{{/selector}};
  if (msg.isSelector({{methodName}}Selector)) {
    {{#neq parameters.length 0}}
    const fnParameters = new FnParameters(msg.data);
    {{/neq}}
    {{#each parameters}}
    let p{{_index}} = fnParameters.get<{{type.codecType}}>();
    {{/each}}
    {{../contract.instanceName}}.{{methodName}}({{#joinParams parameters}}{{/joinParams}}{{ctrDefaultVals}});
  }
  {{/each}}
  return 0;
}

export function call(): i32 {
  const {{contract.instanceName}} = new {{contract.className}}();
  {{#each contract.msgFuncDefs}}
  const {{methodName}}Selector: u8[] = {{#existSelector methodName messageDecorator.selector}}{{u8Arr}}{{/existSelector}};
  if (msg.isSelector({{methodName}}Selector)) {
    {{#neq parameters.length 0}}
    const fnParameters = new FnParameters(msg.data);
    {{/neq}}
    {{#each parameters}}
    let p{{_index}} = fnParameters.get<{{type.codecType}}>();
    {{/each}}
    {{#if isReturnable}}
    let rs = {{../contract.instanceName}}.{{methodName}}({{#joinParams parameters}}{{/joinParams}});
    ReturnData.set<{{returnType.codecType}}>(new {{returnType.codecType}}(rs));
    {{/if}}
    {{#unless isReturnable}}
    {{../contract.instanceName}}.{{methodName}}({{#joinParams parameters}}{{/joinParams}});
    {{/unless}}
  }
  {{/each}}
  return 0;
}`;


export const eventTpl = `class {{className}} extends Event {
  {{#each fields}}
  private {{varName}}: {{type.codecType}};
  {{/each}}

  prepare(): void {
    {{#each fields}}
    {{#if decorators.isTopic}}
    Event.appendTopic(this.{{varName}});
    {{/if}}
    {{/each}}

    {{#each fields}}
    Event.appendData(this.{{varName}});
    {{/each}}
  }

}`;
