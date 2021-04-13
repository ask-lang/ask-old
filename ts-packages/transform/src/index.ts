import { Transform } from "assemblyscript/cli/transform";
import * as preprocess from "./preprocess";
import { getContractInfo } from "./contract";
import { Program } from "assemblyscript";
import * as path from "path";

// TODO: refactor to ts code
export class AskTransform extends Transform {
    afterInitialize(program: Program): void {
        // TODO: support cli args, see https://github.com/AssemblyScript/assemblyscript/issues/1691
        // TODO: add a config file
        let source = program.sources[0];
        // TODO: make sure the semantics
        for (let src of program.sources) {
            if (
                src.sourceKind === 1 &&
                src.simplePath !== "index-incremental"
            ) {
                source = src;
                break;
            }
        }
        const info = getContractInfo(program);
        const abi = preprocess.outputAbi(info);
        const out = preprocess.outputCode(source.text, info);
        process.sourceModifer = out;
        const abiPath = path.join("target", "metadata.json");
        const baseDir = path.dirname(source.normalizedPath);
        this.writeFile(abiPath, abi, baseDir);
    }
}
