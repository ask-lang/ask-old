import Handlebars from "./handlebarsfunc";
import { CONFIG } from "../config/compile";
import { ClassInterpreter, EventInterpreter } from "../contract/classdef";
import { FieldDef, FunctionDef } from "../contract/elementdef";
import { NamedTypeNodeDef } from "../contract/typedef";
import { TypeKindEnum } from "../enums/customtype";
import { TypeHelper } from "../utils/typeutil";
import { KeySelector } from "./selector";

const WIN = process.platform === "win32";
const EOL = WIN ? "\r\n" : "\n";

let scope = CONFIG.scope;

function convertToCodec(typeNode: NamedTypeNodeDef, varname: string): string {
    if (!typeNode.isCodec && typeNode.typeKind == TypeKindEnum.NUMBER) {
        return `new ${scope}${typeNode.codecType}(${varname})`;
    } else if (!typeNode.isCodec && typeNode.typeKind == TypeKindEnum.STRING) {
        return `new ${scope}${typeNode.codecType}(${varname})`;
    }  else if (!typeNode.isCodec && typeNode.typeKind == TypeKindEnum.BIG_NUM) {
        return `new ${scope}${typeNode.codecType}(${varname})`;
    } else {
        return `${varname}`;
    }
}

function createDefaultCodec(typeNode: NamedTypeNodeDef): string {
    if (typeNode.typeKind == TypeKindEnum.NUMBER) {
        return `new ${typeNode.getNameSpace()}${typeNode.codecType}()`;
    } else if (typeNode.typeKind == TypeKindEnum.STRING) {
        return `new ${typeNode.getNameSpace()}${typeNode.codecType}()`;
    } else if (typeNode.typeKind == TypeKindEnum.BIG_NUM) {
        return `new ${typeNode.getNameSpace()}${typeNode.codecType}()`;
    } else {
        return `new ${typeNode.getNameSpace()}${typeNode.codecType}()`;
    }
}

function toTypeValue(type: NamedTypeNodeDef, varname: string): string {
    if (type.isCodec) {
        return varname;
    }
    if (type.typeKind == TypeKindEnum.NUMBER || type.typeKind == TypeKindEnum.BIG_NUM) {
        return `${varname}.unwrap();`;
    } else if (type.typeKind == TypeKindEnum.STRING) {
        return `${varname}.toString();`;
    } else {
        return `${varname}`;
    }
}

function convertBytesToType(typeNode: NamedTypeNodeDef | null) {
    if (!typeNode) {
        return "";
    }
    let code: string[] = [];
    if (!typeNode.isCodec && typeNode.typeKind == TypeKindEnum.NUMBER) {
        code.push(`return ${scope}BytesReader.decodeInto<${scope}${typeNode.codecType}>(rs).unwrap();`);
    }
    if (!typeNode.isCodec && typeNode.typeKind == TypeKindEnum.STRING) {
        code.push(`return ${scope}BytesReader.decodeInto<${scope}${typeNode.codecType}>(rs).toString();`);
    }
    return code.join(EOL);
}

Handlebars.registerHelper("genClassToU8", function (classDef: ClassInterpreter) {
    let code: string[] = [];
    code.push(`   let bytes = new Array<u8>();`);
    for (let index = 0; index < classDef.fields.length; index ++) {
        let codecObj = convertToCodec(classDef.fields[index].type, `this.${classDef.fields[index].name}`);
        code.push(`  bytes = bytes.concat(${codecObj}.toU8a())`);
    }
    code.push(`     return bytes;`);
    return code.join(EOL);
});


Handlebars.registerHelper("genEncodedLength", function (classDef: ClassInterpreter) {
    let code: string[] = [];
    code.push(`   let length: i32 = 0;`);
    for (let index = 0; index < classDef.fields.length; index++) {
        let codecObj = convertToCodec(classDef.fields[index].type, `this.${classDef.fields[index].name}`);
        code.push(`  length += ${codecObj}.encodedLength();`);
    }
    code.push(`     return length;`);
    return code.join(EOL);
});


Handlebars.registerHelper("genPopulateFromBytes", function (classDef: ClassInterpreter) {
    let code: string[] = [];
    for (let index = 0; index < classDef.fields.length; index++) {
        let field = classDef.fields[index];
        code.push(`     let p${index} = ${createDefaultCodec(field.type)};`);
        code.push(`     p${index}.populateFromBytes(bytes, index);` );
        code.push(`     this.${field.name} = ${toTypeValue(field.type, `p${index}`)} ;`);
        code.push(`     index += p${index}.encodedLength();`);
    }
    return code.join(EOL);
});


Handlebars.registerHelper("genCodeEq", function (classDef: ClassInterpreter) {
    let code: string[] = [];
    let fields: string[] = [];
    code.push(` eq(other: ${classDef.name}): bool {`);

    for (let index = 0; index < classDef.fields.length; index++) {
        let field = classDef.fields[index];
        fields.push(` this.${field.name} == other.${field.name}`);
    }
    code.push(` return ${fields.join(" && ")};`);
    code.push("     }");
    return code.join(EOL);
});


Handlebars.registerHelper("wrapResult", function (typeNode: NamedTypeNodeDef) {
    return convertToCodec(typeNode, "rs");
});

Handlebars.registerHelper("toCodec", function (field: FieldDef) {
    return convertToCodec(field.type, `this.${field.name}`);
});

Handlebars.registerHelper("storeGetter", function (field: FieldDef) {
    let code: string[] = [];
    if (field.type.typeKind == TypeKindEnum.ARRAY) {
        code.push(`get ${field.name}(): ${field.type.plainTypeNode} {`);
        code.push(`     if (this.${field.varName} === null) {`);
        code.push(`       this.${field.varName} = new ${field.type.instanceType}(new ${scope}Hash(${field.selector.hexArr}), ${String(field.decorators.isLazy)}, ${field.decorators.capacity});`);
    } else if (field.type.typeKind == TypeKindEnum.MAP) {
        code.push(`get ${field.name}(): ${field.type.plainTypeNode} {`);
        code.push(`     if (this.${field.varName} === null) {`);
        code.push(`       this.${field.varName} = new ${field.type.instanceType}(new ${scope}Hash(${field.selector.hexArr}), ${String(field.decorators.isLazy)});`);
    } else {
        code.push(`get ${field.name}(): ${field.type.plainType} {`);
        code.push(`    if (this.${field.varName} === null) {`);
        if (field.decorators.ignore) {
            code.push(`    this.${field.varName} = new ${field.type.getNameSpace()}${field.type.codecType}(); `);
        } else {
            code.push(`         const st = new ${scope}Storage(new ${scope}Hash(${field.selector.hexArr}));`);
            code.push(`         let val = st.load<${field.type.getNameSpace()}${field.type.codecType}>();`);
            code.push(`         if (!val) this.${field.varName} = new ${field.type.getNameSpace()}${field.type.codecType}(); `);
            code.push(`         else this.${field.varName} = val;`);
        }  
    }
    code.push(`     }`);
    // return part
    if (field.type.typeKind == TypeKindEnum.STRING) {
        code.push(`     return this.${field.varName}!.toString();`);
    } else if (field.type.typeKind == TypeKindEnum.ARRAY || field.type.typeKind == TypeKindEnum.MAP) {
        code.push(`     return this.${field.varName}!;`);
    } else if (TypeHelper.isPrimitiveType(field.type.typeKind)) {
        code.push(`     return this.${field.varName}!.unwrap();`);
    } else {
        code.push(`     return this.${field.varName}!;`);
    }
    code.push("  }");
    return code.join(EOL);
});

/**
 *  set {{name}}(v: {{type.plainType}}) {
    this.{{varName}} = new {{type.codecTypeAlias}}(v);
    const st = new ${scope}Storage(new ${scope}Hash({{selector.u8Arr}}));
    st.store<{{type.codecTypeAlias}}>(this.{{varName}}!);
  }
 * 
 */
Handlebars.registerHelper("storeSetter", function (field: FieldDef) {
    let code: string[] = [];
    // ARRAY & MAP wasn't generated `set` method.
    if (field.type.typeKind == TypeKindEnum.ARRAY || field.type.typeKind == TypeKindEnum.MAP) {
        return code.join("\n");
    }
    code.push(`set ${field.name}(v: ${field.type.plainType}) {`);

    // the field is ignore or lazy, not store the field.
    if (field.decorators.ignore || field.decorators.isLazy) {
        if (field.type.isCodec || field.type.typeKind == TypeKindEnum.USER_CLASS) {
            code.push(`     this.${field.varName} = v;`);
        } else {
            code.push(`     this.${field.varName} = new ${field.type.codecTypeAlias}(v);`);
        }
        code.push(` }`);
    } else {
        if (field.type.isCodec || field.type.typeKind == TypeKindEnum.USER_CLASS) {
            code.push(`     this.${field.varName} = v;`);
        } else {
            code.push(`     this.${field.varName} = new ${field.type.codecTypeAlias}(v);`);
        }
        code.push(`     const st = new ${scope}Storage(new ${scope}Hash(${field.selector.hexArr}));`);
        code.push(`     st.store<${field.type.codecTypeAlias}>(this.${field.varName}!);`);
        code.push(` }`);
    }

    return code.join("\n");
});

/**
 * Generate the commit storage command
 * 
 */
Handlebars.registerHelper("genCommitLazy", function (field: FieldDef) {
    if (!field.lazy)  return "";
    let code: string[] = [];
    if (field.type.typeKind == TypeKindEnum.ARRAY || field.type.typeKind == TypeKindEnum.MAP) {
        code.push(`      if (this.${field.varName} !== null) {`);
        code.push(`          this.${field.varName}.__commit_storage__();`);
    } else {
        code.push(`      if (this.${field.varName} !== null) {`);
        code.push(`     const st = new ${scope}Storage(new ${scope}Hash(${field.selector.hexArr}));`);
        code.push(`     st.store<${field.type.codecTypeAlias}>(this.${field.varName}!);`);
    }
    code.push(`      }`);
    return code.join("\n");
});


/**
 * Event constructor
 *
 */
Handlebars.registerHelper("constructor", function(event: EventInterpreter) {
    if (event.constructorFun) {
        return event.constructorFun.declaration.range.toString();
    } else {
        let code =[];
        code.push(` constructor() {`);
        code.push(`     super();`);
        code.push(`     this.emit();`);
        code.push(`}`);
        return code.join(EOL);
    }
});

/**
 * Register the tag of selector.
 */
Handlebars.registerHelper("selector", function (context, options) {
    // let data = context;
    let data = new KeySelector(context);
    return options.fn(data);
});

/**
 * Register the tag of join.
 */
Handlebars.registerHelper("joinParams", function (context) {
    var data = [];
    for (var i = 0, j = context.length; i < j; i++) {
        if (context[i].type.codecType == "ScaleString") {
            data.push("p" + i + ".toString()");
        } else if (context[i].type.typeKind == TypeKindEnum.USER_CLASS) {
            data.push("p" + i);
        } else {
            data.push("p" + i + ".unwrap()");
        }
    }
    return data.join(",");
});

Handlebars.registerHelper("generateFunction", function (fn: FunctionDef) {
    let funParams = [];
    let funVarious = [];
    for (let i = 0; i < fn.parameters.length; i++) {
        let param = fn.parameters[i];
        funParams.push(`p${i}: ${param.type.plainType}`);
        funVarious.push(convertToCodec(param.type, `p${i}`));
    }
    let code: string[] = [];
    code.push(`${ fn.name }(${ funParams.join(",") }): ${ fn.isReturnable ? fn.returnType?.plainType : "void" } {`);
    code.push(`     let data = ${CONFIG.scope}Abi.encode("${fn.name}", [${funVarious.join(",")}]);`);
    if (fn.isReturnable) {
        code.push(`         let rs = this.addr.call(data);`);
        code.push(`         ${convertBytesToType(fn.returnType)}`);
    } else {
        code.push(`         this.addr.call(data);`);
    }
    code.push(`     }`);
    return code.join(EOL);
});

export default Handlebars;