"use strict";
exports.__esModule = true;
exports.APIOptionImpl = void 0;
var path = require("path");
var fs = require("fs");
var APIOptionImpl = /** @class */ (function () {
    function APIOptionImpl(sourceModifer) {
        this.sourceModifier = sourceModifer;
    }
    APIOptionImpl.prototype.modifySource = function (sourceText, range, store) {
        var prefix = sourceText.substring(0, range.start);
        var suffix = sourceText.substring(range.end, sourceText.length);
        return prefix + store + suffix;
    };
    APIOptionImpl.prototype.readFile = function (filename, baseDir) {
        var _this = this;
        var name = path.resolve(baseDir, filename);
        try {
            var text_1 = fs.readFileSync(name, "utf8");
            if (this.sourceModifier.fileExtMap.has(filename)) {
                var extCodes = this.sourceModifier.fileExtMap.get(filename);
                extCodes.sort(function (a, b) { return (b.range.end - a.range.end); }).forEach(function (item) {
                    text_1 = _this.modifySource(text_1, item.range, item.code);
                });
            }
            return text_1;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    };
    return APIOptionImpl;
}());
exports.APIOptionImpl = APIOptionImpl;
