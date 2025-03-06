"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderMathInText = void 0;
var katex_1 = __importDefault(require("katex"));
var splitAtDelimiters_1 = __importDefault(require("./splitAtDelimiters"));
var core_1 = require("../core");
var renderMathInText = function (text, optionsCopy) {
    var _a, _b;
    var data = (0, splitAtDelimiters_1.default)(text, (_a = optionsCopy === null || optionsCopy === void 0 ? void 0 : optionsCopy.delimiters) !== null && _a !== void 0 ? _a : [
        { left: "$$", right: "$$", display: true },
        { left: "\\(", right: "\\)", display: false },
        { left: "\\begin{equation}", right: "\\end{equation}", display: true },
        { left: "\\begin{align}", right: "\\end{align}", display: true },
        { left: "\\begin{alignat}", right: "\\end{alignat}", display: true },
        { left: "\\begin{gather}", right: "\\end{gather}", display: true },
        { left: "\\begin{CD}", right: "\\end{CD}", display: true },
        { left: "\\[", right: "\\]", display: true },
    ]);
    if (data.length === 1 && data[0].type === "text") {
        return data[0].data;
    }
    var fragment = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i].type === "text") {
            fragment.push({
                type: "node",
                name: "span",
                attrs: {
                    style: "white-space: pre-wrap;",
                },
                children: [
                    {
                        type: "text",
                        text: data[i].data,
                    },
                ],
            });
        }
        else {
            var newOptionsCopy = __assign({}, optionsCopy);
            var math = data[i].data;
            newOptionsCopy.displayMode = data[i].display;
            try {
                if (newOptionsCopy.preProcess) {
                    math = newOptionsCopy.preProcess(math);
                }
                var children = (0, core_1.parseLatex)(math, newOptionsCopy);
                fragment.push.apply(fragment, children);
            }
            catch (e) {
                if (!(e instanceof katex_1.default.ParseError)) {
                    throw e;
                }
                (_b = optionsCopy.errorCallback) === null || _b === void 0 ? void 0 : _b.call(optionsCopy, "KaTeX auto-render: Failed to parse `" + data[i].data + "` with ", e);
                fragment.push(data[i].rawData);
                continue;
            }
        }
    }
    return fragment;
};
exports.renderMathInText = renderMathInText;
//# sourceMappingURL=index.js.map