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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLatex = exports.createClass = void 0;
var katex_1 = __importDefault(require("katex"));
var uppercase = /([A-Z])/g;
var hyphenate = function (str) {
    return str.replace(uppercase, "-$1").toLowerCase();
};
var ESCAPE_LOOKUP = {
    "&": "&amp;",
    ">": "&gt;",
    "<": "&lt;",
    '"': "&quot;",
    "'": "&#x27;",
};
var ESCAPE_REGEX = /[&><"']/g;
function escape(text) {
    return String(text).replace(ESCAPE_REGEX, function (match) { return ESCAPE_LOOKUP[match]; });
}
var svg2base64 = function (svg) {
    var txt = encodeURIComponent(svg.replace(/\s+/g, " "));
    return "data:image/svg+xml," + txt;
};
var katex2richnode = function (type, dom, children) {
    var needsSpan = false;
    if (dom.classes && dom.classes.length > 0)
        needsSpan = true;
    var classes = escape((0, exports.createClass)(dom.classes));
    var styles = "";
    if (type === "text") {
        if (dom.italic > 0) {
            styles += "margin-right:" + dom.italic + "em;";
        }
    }
    for (var style in dom.style) {
        if (dom.style.hasOwnProperty(style)) {
            styles += "".concat(hyphenate(style), ":").concat(dom.style[style], ";");
        }
    }
    if (styles) {
        needsSpan = true;
    }
    var attrs = {};
    for (var attr in dom.attributes) {
        if (dom.attributes.hasOwnProperty(attr)) {
            attrs[attr] = escape(dom.attributes[attr]);
        }
    }
    if (type === "span") {
        return {
            name: "span",
            attrs: {
                class: classes + " katex-span",
                style: styles,
            },
            children: children,
        };
    }
    if (type === "img") {
        return {
            name: "img",
            attrs: {
                class: classes + " katex-img",
                style: styles,
            },
            children: children,
        };
    }
    if (type === "text") {
        var escaped = escape(dom.text);
        if (needsSpan) {
            return {
                name: "span",
                attrs: {
                    class: classes,
                    style: styles,
                },
                children: [
                    {
                        type: "text",
                        text: escaped,
                    },
                ],
            };
        }
        else {
            return {
                type: "text",
                text: escaped,
            };
        }
    }
    if (type === "svg") {
        var svg = dom.toMarkup();
        return {
            name: "img",
            attrs: {
                src: svg2base64(svg),
                class: "katex-svg",
            },
        };
    }
    return null;
};
var createClass = function (classes) {
    var _a;
    return (_a = classes === null || classes === void 0 ? void 0 : classes.filter(function (cls) { return cls; }).join(" ")) !== null && _a !== void 0 ? _a : "";
};
exports.createClass = createClass;
var toMarkup = function (doms, color) {
    return doms
        .map(function (dom) {
        var _a;
        var domColor = color;
        if ((_a = dom === null || dom === void 0 ? void 0 : dom.style) === null || _a === void 0 ? void 0 : _a.color)
            domColor = dom.style.color;
        var type = undefined;
        if (dom instanceof katex_1.default.__domTree.Span)
            type = "span";
        if (dom instanceof katex_1.default.__domTree.Anchor)
            type = "anchor";
        if (dom instanceof katex_1.default.__domTree.LineNode)
            type = "line";
        if (dom instanceof katex_1.default.__domTree.PathNode)
            type = "path";
        if (dom instanceof katex_1.default.__domTree.SvgNode) {
            type = "svg";
            if (domColor)
                dom.attributes.fill = domColor;
        }
        if (dom instanceof katex_1.default.__domTree.SymbolNode)
            type = "text";
        var children = dom.children && dom.children.length > 0
            ? toMarkup(dom.children, domColor)
            : [];
        if (!type)
            return children;
        return katex2richnode(type, dom, children);
    })
        .reduce(function (pre, item) {
        if (Array.isArray(item)) {
            pre.push.apply(pre, item);
        }
        else {
            pre.push(item);
        }
        return pre;
    }, [])
        .filter(function (i) { return !!i; });
};
var parseLatex = function (latex, option) {
    if (option === void 0) { option = {}; }
    var _a = option || {}, throwError = _a.throwError, restOption = __rest(_a, ["throwError"]);
    try {
        var tree = katex_1.default.__renderToDomTree(latex, __assign(__assign({}, restOption), { output: "html" }));
        return toMarkup([tree]);
    }
    catch (error) {
        if (throwError)
            throw error;
        return [
            {
                name: "span",
                attrs: {
                    style: "color:red;",
                },
                children: [{ type: "text", text: error.message }],
            },
        ];
    }
};
exports.parseLatex = parseLatex;
//# sourceMappingURL=index.js.map