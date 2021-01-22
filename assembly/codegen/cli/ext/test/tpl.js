const Handlebars = require("handlebars");
const fs = require("fs");

let mainTpl = fs.readFileSync("../tpl/main.tpl", { encoding: "utf8" });
const template = Handlebars.compile(mainTpl);
let output = template(
  {
    ctorWithParams: "filter"
  }
)

console.log(output)



