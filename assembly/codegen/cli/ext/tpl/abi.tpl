{
  "metadataVersion": "0.1.0",
  "source": {
    "hash": "{{hash}}",
    "language": "ask! 1.0.0-dev",
    "compiler": "asc 1.49.0-nightly"
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
        "docs": [
          ""
        ],
        "name": [
          "{{methodName}}"
        ],
        "selector": "0xd183512b"
      }{{#if isMid}},{{/if}}
      {{/each}}
    ],
    "docs": [],
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
        "docs": [],
        "mutates": false,
        "name": [
          "{{methodName}}"
        ],
        "payable": false,
        "returnType": {
          {{#if hasReturnVal}}
          "displayName": [
            "{{returnType.originalType}}"
          ],
          "type": {{index}}
          {{/if}}
        },
        "selector": "0x1e5ca456"
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
              "key": "{{#keySelector layout.cell.key}}{{/keySelector}}",
              "ty": {{layout.cell.ty}}
            }
          },
          "name": "{{name}}"
        }
        {{/each}}
      ]
    }
  },
  "types": [
    {{#each types}}
    {
      "def": {
        "primitive": "{{name}}"
      }
    }
    {{/each}}
  ]
}