import { Transform } from "assemblyscript/cli/transform";
import * as preprocess from "./preprocess";
import { getContractInfo } from "./contract/contract";
import { Program } from "assemblyscript";
import * as path from "path";
import * as fs from "fs";
import * as mkdirp from "assemblyscript/cli/util/mkdirp";


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
        const abi = preprocess.getAbiInfo(info);
        const out = preprocess.getExtCodeInfo(info);
        const baseDir = path.dirname(source.normalizedPath);
        out.entryDir = baseDir;
        process.sourceModifier = out;
        const abiPath = path.join(process.outputDir, "metadata.json");
        if (!fs.existsSync(path.dirname(abiPath))) {
            mkdirp(path.dirname(abiPath));
        }
        fs.writeFileSync(abiPath, abi);
        // this.writeFile(abiPath, abi, baseDir);
    }
}
