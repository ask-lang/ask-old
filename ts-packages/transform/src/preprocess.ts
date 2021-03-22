import Handlebars from "handlebars";
import * as blake2 from "blake2";
// import { ContractInfo } from './contract';
import { Range } from "assemblyscript";
import { ContractProgram } from "./interperter";
import { abiTpl, mainTpl, storeTpl } from "./tpl";
import { ContractInfo } from "./contract";
import { MessageFuctionDef } from "./contract/base";

/**
 * Register the tag of each.
 */
Handlebars.registerHelper("each", function (context, options) {
    var ret = "";
    for (var i = 0, j = context.length; i < j; i++) {
        let data = context[i];
        data._index = i;
        data.isMid = i != j - 1 || (i == 0 && j != 1);
        ret = ret + options.fn(data);
    }
    return ret;
});

function getSelector(key: string) {
    let keyHash = blake2.createHash("blake2b", { digestLength: 32 });
    keyHash.update(Buffer.from(key));
    let hexStr = keyHash.digest("hex");
    let selectorArr = [];
    for (let index = 0; index < 4; index++) {
        selectorArr.push("0x" + hexStr.substring(index * 2, index * 2 + 2));
    }
    let data = {
        hex: `0x${hexStr}`,
        short: `0x${hexStr.substr(0, 8)}`,
        u8Arr: `[${selectorArr.join(",")}]`,
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
Handlebars.registerHelper(
    "existSelector",
    function (key, existSelector, options) {
        let data: any = {};
        if (existSelector) {
            let selectorArr = [];
            for (let index = 0; index < 4; index++) {
                selectorArr.push(
                    "0x" + existSelector.substring(index * 2 + 2, index * 2 + 4)
                );
            }
            data.short = `${existSelector}`;
            data.u8Arr = `[${selectorArr.join(",")}]`;
        } else {
            data = getSelector(key);
        }
        return options.fn(data);
    }
);

/**
 * Register the tag of join.
 */
Handlebars.registerHelper("joinParams", function (context) {
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
Handlebars.registerHelper("eq", function (this: any, v1, v2, options) {
    if (v1 == v2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

/**
 * Register the tag of neq (Not equal)
 */
Handlebars.registerHelper("neq", function (this: any, v1, v2, options) {
    if (v1 != v2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

function removeSourceCode(sourceText: string, range: Range, store: string) {
    let prefix = sourceText.substring(0, range.start);
    let suffix = sourceText.substring(range.end, sourceText.length);
    return prefix + store + suffix;
}

const replaceCode: Array<{ range: Range; body: string }> = [];

// Write text (also fallback)
export function outputCode(sourceText: string, contractInfo: ContractProgram) {
    const render = Handlebars.compile(mainTpl);
    const exportMain = render(contractInfo);

    contractInfo.contract.msgFuncDefs.forEach((_item) => {
        let item = _item as MessageFuctionDef;
        if (item.messageDecorator.mutates == "false") {
            let body = item.bodyRange.toString();
            body = body.replace(/{/i, "{\n    Storage.mode = StoreMode.R;");
            replaceCode.push({ range: item.bodyRange, body: body });
        }
    });

    for (let index = 0; index < contractInfo.storages.length; index++) {
        let store = Handlebars.compile(storeTpl)(contractInfo.storages[index]);
        replaceCode.push({
            range: contractInfo.storages[index].range,
            body: store,
        });
    }

    replaceCode
        .sort((a, b) => b.range.end - a.range.end)
        .forEach((item) => {
            sourceText = removeSourceCode(sourceText, item.range, item.body);
        });

    if (contractInfo.import.unimports.length != 0) {
        // TODO: config
        let importElement = `import { ${contractInfo.import.unimports.join(
            ", "
        )}} from "ask-lang";\n`;
        sourceText = importElement + sourceText;
    }
    return sourceText + exportMain;
}

export function outputAbi(abiInfo: ContractProgram) {
    const render = Handlebars.compile(abiTpl);
    const output = render(abiInfo);
    return output;
}
