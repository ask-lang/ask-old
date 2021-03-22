const fs = require("fs");
const loader = require("@assemblyscript/loader");

const imports = {
    env: {
        abort (_msg, _file, line, column) {
            console.error("abort called at index.ts:" + line + ":" + column);
        }
    }
};
const instance = loader.instantiateSync(fs.readFileSync(__dirname + "/build/example.wasm"), imports).exports;
console.log('Demonstrating SCALE Codec...');
instance.demonstrate();
