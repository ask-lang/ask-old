const Handlebars = require("handlebars");
const fs = require("fs");
var blake2 = require('blake2');

/**
 * Register the tag of each.
 */
Handlebars.registerHelper("each", function (context, options) {
  var ret = "";
  for (var i = 0, j = context.length; i < j; i++) {
    let data = context[i];
    data._index = i;
    data.isMid = (i != j - 1 || (i == 0 && j == 1))
    ret = ret + options.fn(data);
  }
  return ret;
});
/**
 * Register the tag of selector.
 */
Handlebars.registerHelper("selector", function (context, options) {
  let keyHash = blake2.createKeyedHash('blake2b', Buffer.from('key - up to 64 bytes for blake2b, 32 for blake2s'));
  keyHash.update(Buffer.from(context));
  let hexStr = keyHash.digest("hex");
  return `0x${hexStr.substr(0,8)}`;
});

/**
 * Register the tag of selector.
 */
Handlebars.registerHelper("keySelector", function (context, options) {
  let keyHash = blake2.createKeyedHash('blake2b', Buffer.from('key - up to 64 bytes for blake2b, 32 for blake2s'));
  keyHash.update(Buffer.from(context));
  let hexStr = keyHash.digest("hex");
  return `0x${hexStr}`;
});

/**
 * Register the tag of selector.
 */
Handlebars.registerHelper("selectorArr", function (context, options) {
  let keyHash = blake2.createKeyedHash('blake2b', Buffer.from('key - up to 64 bytes for blake2b, 32 for blake2s'));
  keyHash.update(Buffer.from(context));
  let hexStr = keyHash.digest("hex");
  let selectorArr = new Array();
  for (let index = 0; index < 4; index ++) {
    selectorArr.push("0x" + hexStr.substring(index * 2, index * 2 + 2));
  }
  return `[${selectorArr.join(",")}]`;
});

/**
 * Register the tag of join.
 */
Handlebars.registerHelper("joinParams", function (context, options) {
  var data = [];
  for (var i = 0, j = context.length; i < j; i++) {
    data.push("p" + i);
  }
  return data.join(",");
});

// Write text (also fallback)
function outputCode(abiInfo) {
  let mainTpl = fs.readFileSync(__dirname + "/tpl/main.tpl", { encoding: "utf8" });
  const render = Handlebars.compile(mainTpl);
  const output = render(abiInfo);

  let storeTpl = fs.readFileSync(__dirname + "/tpl/store.tpl", { encoding: "utf8" });
  const store = Handlebars.compile(storeTpl)(abiInfo);
  return  store + output;
}

function outputAbi(abiInfo) {
  let abiTpl = fs.readFileSync(__dirname + "/tpl/abi.tpl", { encoding: "utf8" });
  const render = Handlebars.compile(abiTpl);
  const output = render(abiInfo);
  return output;
}

exports.outputCode = outputCode;

exports.outputAbi = outputAbi;