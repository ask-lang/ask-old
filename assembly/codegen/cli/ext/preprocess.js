const Handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
var blake2 = require('blake2');
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

function getSelector(key) {
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

function removeSourceCode(sourceText, range, store) {
  let prefix = sourceText.substring(0, range.start);
  let suffix = sourceText.substring(range.end, sourceText.length);
  return prefix + store + suffix;
}

// Write text (also fallback)
function outputCode(sourceText, contractInfo) {
  let mainTpl = fs.readFileSync(path.join(__dirname, "tpl", "main.tpl"), { encoding: "utf8" });
  const render = Handlebars.compile(mainTpl);
  const exportMain = render(contractInfo);
  let storeTpl = fs.readFileSync(path.join(__dirname, "tpl", "store.tpl"), { encoding: "utf8" });
  
  for (let index = 0; index < contractInfo.storages.length; index ++) {
    let store = Handlebars.compile(storeTpl)(contractInfo.storages[index]);
    sourceText = removeSourceCode(sourceText, contractInfo.storages[index].range, store);
  }

  if (contractInfo.import.unimports.length != 0) {
    let importElement = `import { ${contractInfo.import.unimports.join(", ")}} from "../../assembly";\n`;
    sourceText = importElement + sourceText;
  }
  return sourceText + exportMain;
}

function outputAbi(abiInfo) {
  let abiTpl = fs.readFileSync(path.join(__dirname, "tpl", "abi.tpl"), { encoding: "utf8" });
  const render = Handlebars.compile(abiTpl);
  const output = render(abiInfo);
  return output;
}

exports.outputCode = outputCode;

exports.outputAbi = outputAbi;