"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var findEndOfMath = function (delimiter, text, startIndex) {
    var index = startIndex;
    var braceLevel = 0;
    var delimLength = delimiter.length;
    while (index < text.length) {
        var character = text[index];
        if (braceLevel <= 0 &&
            text.slice(index, index + delimLength) === delimiter) {
            return index;
        }
        else if (character === "\\") {
            index++;
        }
        else if (character === "{") {
            braceLevel++;
        }
        else if (character === "}") {
            braceLevel--;
        }
        index++;
    }
    return -1;
};
var escapeRegex = function (string) {
    return string.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
};
var amsRegex = /^\\begin{/;
var splitAtDelimiters = function (text, delimiters) {
    var index;
    var data = [];
    var regexLeft = new RegExp("(" + delimiters.map(function (x) { return escapeRegex(x.left); }).join("|") + ")");
    while (true) {
        index = text.search(regexLeft);
        if (index === -1) {
            break;
        }
        if (index > 0) {
            data.push({
                type: "text",
                data: text.slice(0, index),
            });
            text = text.slice(index);
        }
        var i = delimiters.findIndex(function (delim) { return text.startsWith(delim.left); });
        index = findEndOfMath(delimiters[i].right, text, delimiters[i].left.length);
        if (index === -1) {
            break;
        }
        var rawData = text.slice(0, index + delimiters[i].right.length);
        var math = amsRegex.test(rawData)
            ? rawData
            : text.slice(delimiters[i].left.length, index);
        data.push({
            type: "math",
            data: math,
            rawData: rawData,
            display: delimiters[i].display,
        });
        text = text.slice(index + delimiters[i].right.length);
    }
    if (text !== "") {
        data.push({
            type: "text",
            data: text,
        });
    }
    return data;
};
exports.default = splitAtDelimiters;
//# sourceMappingURL=splitAtDelimiters.js.map