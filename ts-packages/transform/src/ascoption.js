"use strict";
exports.__esModule = true;
exports.APIOptionImpl = void 0;
const preprocess_1 = require("./preprocess/preprocess");
const mkdirp = require("assemblyscript/cli/util/mkdirp");
const path = require("path");
const fs = require("fs");
const { CONFIG } = require("./config/compile");

function modifySourceText(sourceText, point) {
    if (point.mode == preprocess_1.ModifyType.REPLACE) {
        var prefix = sourceText.substring(0, point.range.start);
        var suffix = sourceText.substring(point.range.end, sourceText.length);
        return prefix + point.code + suffix;
    } else if (point.mode == preprocess_1.ModifyType.APPEND) {
        return sourceText + point.code;
    } else if (point.mode == preprocess_1.ModifyType.TOP) {
        return point.code + sourceText;
    } else if (point.mode == preprocess_1.ModifyType.DELETE) {
        sourceText = sourceText.replaceAll(/export\s/g, " ");
        return sourceText;
    } else if (point.mode == preprocess_1.ModifyType.INSERT) {
        let prefix = sourceText.substring(0, point.range.end);
        let suffix = sourceText.substring(point.range.end, sourceText.length);
        return prefix + point.code + suffix;
    }
    return sourceText;
};

var APIOptionImpl = /** @class */ (function () {
    function APIOptionImpl() {
        this.checkAll = true;
    }
    APIOptionImpl.prototype.readFile = function (filename, baseDir) {
        var name = path.resolve(baseDir, filename);
        try {
            var text_1 = fs.readFileSync(name, "utf8");
            var sourceModifier = process.sourceModifier ? process.sourceModifier : new preprocess_1.SourceModifier();
            let relativePath = path.relative(baseDir, name).split("\\").join("/");
            if (sourceModifier.fileExtMap.has(relativePath)) {
                var extCodes = sourceModifier.fileExtMap.get(relativePath);
                extCodes.sort((a, b) => {
                    if ((a.mode == 1 || a.mode == 0) && (b.mode == 1 || b.mode == 0)) {
                        return (b.range.end - a.range.end);
                    } else if (a.mode == b.mode) {
                        return (b.range.end - a.range.end);
                    }
                    return a.mode - b.mode;
                }).forEach(function (item) {
                    text_1 = modifySourceText(text_1, item);
                });
                let importLang = `import * as ${CONFIG.module} from "ask-lang";\n`;
                text_1 = importLang + text_1;
                sourceModifier.fileExtension.set(filename, text_1);
            }
            return text_1;
        }
        catch (e) {
            return null;
        }
    };

    APIOptionImpl.prototype.writeExtensionFile = function (baseDir) {
        var sourceModifier = process.sourceModifier ? process.sourceModifier : new preprocess_1.SourceModifier();
        for (let [key, value] of sourceModifier.fileExtension) {
            let filePath = path.join(process.outputDir, "extension", path.basename(key));
            if (!fs.existsSync(path.dirname(filePath))) { 
                mkdirp(path.dirname(filePath));
            }
            fs.writeFileSync(filePath, value);
        }
    };

    return APIOptionImpl;
}());
exports.APIOptionImpl = APIOptionImpl;
