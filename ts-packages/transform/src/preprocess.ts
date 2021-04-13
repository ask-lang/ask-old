import Handlebars from "handlebars";
import * as blake2 from "blake2";
import { Range } from "assemblyscript";
import { ContractProgram } from "./contract";
import { abiTpl, mainTpl, storeTpl, eventTpl } from "./tpl";

/**
 * Register the tag of each.
 */
Handlebars.registerHelper("each", function (context, options) {
    var ret = "";
    for (var i = 0, j = context.length; i < j; i++) {
        let data = context[i];
        data._index = i;
        data.isMid = (i != j - 1 || (i == 0 && j != 1));
        ret = ret + options.fn(data);
    }
    return ret;
});

function getSelector(key: string) {
    let keyHash = blake2.createHash('blake2b', { digestLength: 32 });
    keyHash.update(Buffer.from(key));
    let hexStr = keyHash.digest("hex");
    let selectorArr = [];
    for (let index = 0; index < 4; index++) {
        selectorArr.push("0x" + hexStr.substring(index * 2, index * 2 + 2));
    }
    let data = {
        hex: `0x${hexStr}`,
        short: `0x${hexStr.substr(0, 8)}`,
        u8Arr: `[${selectorArr.join(",")}]`
    };
    return data;
}

/**
 * Register the tag of selector.
 */
Handlebars.registerHelper("selector", function (context, options) {
    // let data = context;
    let data = getSelector(context);
    return options.fn(data);
});

/**
 * Register the tag of selector.
 */
Handlebars.registerHelper("existSelector", function (key, existSelector, options) {
    let data = {};
    if (existSelector) {
        let selectorArr = [];
        for (let index = 0; index < 4; index++) {
            selectorArr.push("0x" + existSelector.substring(index * 2 + 2, index * 2 + 4));
        }
        data.short = `${existSelector}`;
        data.u8Arr = `[${selectorArr.join(",")}]`;
    } else {
        data = getSelector(key);
    }
    return options.fn(data);
});

/**
 * Register the tag of join.
 */
Handlebars.registerHelper("joinParams", function (context, options) {
    var data = [];
    for (var i = 0, j = context.length; i < j; i++) {
        if (context[i].type.codecType == "ScaleString") {
            data.push("p" + i + ".toString()");
        } else {
            data.push("p" + i + ".unwrap()");
        }
    }
    return data.join(",");
});

/**
 * Register the tag of equal
 */
Handlebars.registerHelper("eq", function (v1, v2, options) {
    if (v1 == v2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

/**
 * Register the tag of neq (Not equal)
 */
Handlebars.registerHelper("neq", function (v1, v2, options) {
    if (v1 != v2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

export class ModifyPoint {
    range: Range;
    mode: string;
    code: string;

    constructor(range: Range, mode: string, code: string) {
        this.range = range;
        this.mode = mode;
        this.code = code;
    }
}

const INSERT = "INSERT", REPLACE = "REPLACE", TOP = "TOP", APPEND = "APPEND";
export class SourceModifier {
    modifyPoints: ModifyPoint[] = [];
    fileExtMap: Map = new Map();

    public addModifyPoint(point: ModifyPoint): void {
        this.modifyPoints.push(point);
    }
 
    public toModifyFileMap(): void {
        this.modifyPoints.forEach(item => {
            let path = item.range.source.normalizedPath;
            if (this.fileExtMap.has(path)) {
                this.fileExtMap.get(path).push(item);
            } else {
                this.fileExtMap.set(path, [item]);
            }
        });
    }
}

let sourceModifier = new SourceModifier();

// Write text (also fallback)
function outputCode(sourceText: string, contractInfo: ContractProgram) {
    if (!contractInfo.contract) {
        throw Error("Not found annotation @contract that indicate contract!");
    }
    const render = Handlebars.compile(mainTpl);
    const exportMain = render(contractInfo);

    contractInfo.contract.msgFuncDefs.forEach(item => {
        if (item.messageDecorator.mutates == "false") {
            let body = item.bodyRange.toString();
            body = body.replace(/{/i, "{\n  Storage.mode = StoreMode.R;");
            sourceModifier.addModifyPoint(new ModifyPoint(item.bodyRange, REPLACE, body));
            // replaceCode.push({range: item.bodyRange, body: body});
        }
    });

    for (let index = 0; index < contractInfo.storages.length; index++) {
        let store = Handlebars.compile(storeTpl)(contractInfo.storages[index]);
        sourceModifier.addModifyPoint(new ModifyPoint(contractInfo.storages[index].range, REPLACE, store));
    }
    contractInfo.events.forEach(event => {
        let code = Handlebars.compile(eventTpl)(event);
        sourceModifier.addModifyPoint(new ModifyPoint(event.range, REPLACE, code));
    });
    if (contractInfo.import.unimports.length != 0) {
        let importElement = `import { ${contractInfo.import.unimports.join(", ")}} from "ask-lang";\n`;
        sourceModifier.addModifyPoint(new ModifyPoint(contractInfo.contract.range, TOP, importElement));
    }
    sourceModifier.addModifyPoint(new ModifyPoint(contractInfo.contract.range, APPEND, exportMain));
    sourceModifier.toModifyFileMap();
    return sourceModifier;
}

function outputAbi(abiInfo: ContractProgram) {
    const render = Handlebars.compile(abiTpl);
    return render(abiInfo);
}

exports.outputCode = outputCode;

exports.outputAbi = outputAbi;

exports.SourceModifier = SourceModifier;