const Handlebars = require("handlebars");
const fs = require("fs");
// var blake2 = require('blake2');

/**
 * Register the tag of each.
 */
Handlebars.registerHelper("each", function (context, options) {
  var ret = "";
  for (var i = 0, j = context.length; i < j; i++) {
    let data = context[i];
    data.index = i;
    data.isMid = (i != j - 1 && i != 0)
    ret = ret + options.fn(data);
  }
  return ret;
});
/**
 * Register the tag of each.
 */
Handlebars.registerHelper("selector", function (context, options) {
  // let keyHash = blake2.createKeyedHash('blake2b', Buffer.from('key - up to 64 bytes for blake2b, 32 for blake2s'));
  // keyHash.update(Buffer.from(context));
  // let digestBuffer = keyHash.digest();
  //console.log(`${digestBuffer.join(",")}`);
  return `[TODO]`;
});

// Write text (also fallback)
function outputCode(abiInfo, baseDir) {
  // console.log("===========")
  // console.log(abiInfo.exportDef);
  let mainTpl = fs.readFileSync(baseDir + "/cli/ext/tpl/main.tpl", { encoding: "utf8" });
  const render = Handlebars.compile(mainTpl);
  const output = render(abiInfo);
  console.log("output", output)
  return output;
}


function outputAbi(abiInfo, baseDir) {
  let abiTpl = fs.readFileSync(baseDir + "/cli/ext/tpl/abi.tpl", { encoding: "utf8" });
  const render = Handlebars.compile(abiTpl);
  const output = render(abiInfo);
  console.log("output", output)
  return output;
}

exports.outputCode = outputCode;

exports.outputAbi = outputAbi;