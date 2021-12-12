import { Transform } from "assemblyscript/cli/transform";
import * as preprocess from "./preprocess/preprocess";
import { getContractInfo } from "./contract/contract";
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
        const abi = preprocess.getAbiInfo(info);
        const out = preprocess.getExtCodeInfo(info);
        const baseDir = path.dirname(source.normalizedPath);
        out.entryDir = baseDir;
        // @ts-ignore
        process.sourceModifier = out;
        // @ts-ignore
        process.abi = abi;

    }
}
