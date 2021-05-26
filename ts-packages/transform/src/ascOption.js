"use strict";
exports.__esModule = true;
exports.APIOptionImpl = void 0;
var preprocess_1 = require("./preprocess");
var path = require("path");
var fs = require("fs");

function modifySource(sourceText, point) {
    if (point.mode == preprocess_1.ModifyType.REPLACE) {
        var prefix = sourceText.substring(0, point.range.start);
        var suffix = sourceText.substring(point.range.end, sourceText.length);
        return prefix + point.code + suffix;
    } else if (point.mode == preprocess_1.ModifyType.APPEND) {
        return sourceText + point.code;
    } else if (point.mode == preprocess_1.ModifyType.TOP) {
        return point.code + sourceText;
    } else if (point.mode == preprocess_1.ModifyType.DELETE) {
        var prefix = sourceText.substring(0, point.range.start);
        var suffix = sourceText.substring(point.range.start, sourceText.length);
        suffix = suffix.replace(/export/i, "");
        return prefix + suffix;
    }
    return sourceText;
};

var APIOptionImpl = /** @class */ (function () {
    function APIOptionImpl() {
    }
    APIOptionImpl.prototype.readFile = function (filename, baseDir) {
        var name = path.resolve(baseDir, filename);
        try {
            var text_1 = fs.readFileSync(name, "utf8");
            var sourceModifier = process.sourceModifier ? process.sourceModifier : new preprocess_1.SourceModifier();
            let relativePath = path.relative(baseDir, name);
            if (sourceModifier.fileExtMap.has(relativePath)) {
                var extCodes = sourceModifier.fileExtMap.get(relativePath);
                extCodes.sort((a, b) => {
                    if (a.mode != b.mode) return a.mode - b.mode;
                    return (b.range.end - a.range.end); 
                }).forEach(function (item) {
                    text_1 = modifySource(text_1, item);
                });
                let importLang = `import * as _lang from "ask-lang";\n`;
                text_1 = importLang + text_1;
                console.log(`Extension path: ${path} extension after: ${text_1}`);
            }
            return text_1;
        }
        catch (e) {
            return null;
        }
    };
    return APIOptionImpl;
}());
exports.APIOptionImpl = APIOptionImpl;
