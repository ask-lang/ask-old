const Handlebars = require("handlebars");
const fs = require("fs");

let mainTpl = fs.readFileSync("/Users/peng/Workspace/Program/polkadot/uscript/cli/ext/tpl/main.tpl", { encoding: "utf8" });
const template = Handlebars.compile(mainTpl);
let output = template(
  {
    ctorWithParams: "filter"
  }
)

console.log(output)



