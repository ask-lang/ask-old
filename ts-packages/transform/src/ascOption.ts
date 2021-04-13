import { APIOptions } from "assemblyscript/cli/asc";
import { Range } from "assemblyscript";
import { SourceModifier, ModifyPoint } from "./preprocess";
import  * as path  from "path";
import * as fs from "fs";

export class APIOptionImpl implements APIOptions {

    sourceModifier: SourceModifier;

    constructor(sourceModifer: SourceModifier) {
        this.sourceModifier = sourceModifer;
    }

    modifySource(sourceText: string, range: Range, store: string): string  {
        let prefix = sourceText.substring(0, range.start);
        let suffix = sourceText.substring(range.end, sourceText.length);
        return prefix + store + suffix;
    }

    readFile(filename: string, baseDir: string) : string | null {
        let name = path.resolve(baseDir, filename);
        try {
            let text = fs.readFileSync(name, "utf8");
            if (this.sourceModifier.fileExtMap.has(filename)) {
                let extCodes = this.sourceModifier.fileExtMap.get(filename);
                extCodes.sort((a: ModifyPoint, b: ModifyPoint) => (b.range.end - a.range.end)).forEach(item => {
                    text = this.modifySource(text, item.range, item.code);
                });
            }
            return text;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}