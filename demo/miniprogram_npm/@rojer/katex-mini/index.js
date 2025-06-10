import l from "katex";
const g = /([A-Z])/g, o = function(r) {
  return r.replace(g, "-$1").toLowerCase();
}, p = {
  "&": "&amp;",
  ">": "&gt;",
  "<": "&lt;",
  '"': "&quot;",
  "'": "&#x27;"
}, d = /[&><"']/g;
function h(r) {
  return String(r).replace(d, (t) => p[t]);
}
const y = (r) => "data:image/svg+xml," + encodeURIComponent(r.replace(/\s+/g, " ")), x = (r, t, e) => {
  let n = !1;
  t.classes && t.classes.length > 0 && (n = !0);
  const i = h(b(t.classes));
  let a = "";
  r === "text" && t.italic > 0 && (a += "margin-right:" + t.italic + "em;");
  for (const s in t.style)
    t.style.hasOwnProperty(s) && (a += `${o(s)}:${t.style[s]};`);
  a && (n = !0);
  for (const s in t.attributes)
    t.attributes.hasOwnProperty(s) && h(t.attributes[s]);
  if (r === "span")
    return {
      name: "span",
      attrs: {
        class: i + " katex-span",
        style: a
      },
      children: e
    };
  if (r === "img")
    return {
      name: "img",
      attrs: {
        class: i + " katex-img",
        style: a
      },
      children: e
    };
  if (r === "text") {
    const s = h(t.text);
    return n ? {
      name: "span",
      attrs: {
        class: i,
        style: a
      },
      children: [
        {
          type: "text",
          text: s
        }
      ]
    } : {
      type: "text",
      text: s
    };
  }
  if (r === "svg") {
    const s = t.toMarkup();
    return {
      name: "img",
      attrs: {
        src: y(s),
        class: "katex-svg"
      }
    };
  }
  return null;
}, b = function(r) {
  return (r == null ? void 0 : r.filter((t) => t).join(" ")) ?? "";
}, u = (r, t) => r.map((e) => {
  var s;
  let n = t;
  (s = e == null ? void 0 : e.style) != null && s.color && (n = e.style.color);
  let i;
  e instanceof l.__domTree.Span && (i = "span"), e instanceof l.__domTree.Anchor && (i = "anchor"), e instanceof l.__domTree.LineNode && (i = "line"), e instanceof l.__domTree.PathNode && (i = "path"), e instanceof l.__domTree.SvgNode && (i = "svg", n && (e.attributes.fill = n)), e instanceof l.__domTree.SymbolNode && (i = "text");
  const a = e.children && e.children.length > 0 ? u(e.children, n) : [];
  return i ? x(i, e, a) : a;
}).reduce((e, n) => (Array.isArray(n) ? e.push(...n) : e.push(n), e), []).filter((e) => !!e), _ = (r, t = {}) => {
  const { throwError: e, ...n } = t || {};
  try {
    const i = l.__renderToDomTree(r, {
      ...n,
      output: "html"
    });
    return u([i]);
  } catch (i) {
    if (e) throw i;
    return [
      {
        name: "span",
        attrs: {
          style: "color:red;"
        },
        children: [{ type: "text", text: i.message }]
      }
    ];
  }
}, w = function(r, t, e) {
  let n = e, i = 0;
  const a = r.length;
  for (; n < t.length; ) {
    const s = t[n];
    if (i <= 0 && t.slice(n, n + a) === r)
      return n;
    s === "\\" ? n++ : s === "{" ? i++ : s === "}" && i--, n++;
  }
  return -1;
}, k = function(r) {
  return r.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}, E = /^\\begin{/, T = function(r, t) {
  let e;
  const n = [], i = new RegExp(
    "(" + t.map((a) => k(a.left)).join("|") + ")"
  );
  for (; e = r.search(i), e !== -1; ) {
    e > 0 && (n.push({
      type: "text",
      data: r.slice(0, e)
    }), r = r.slice(e));
    const a = t.findIndex((c) => r.startsWith(c.left));
    if (e = w(t[a].right, r, t[a].left.length), e === -1)
      break;
    const s = r.slice(0, e + t[a].right.length), f = E.test(s) ? s : r.slice(t[a].left.length, e);
    n.push({
      type: "math",
      data: f,
      rawData: s,
      display: t[a].display
    }), r = r.slice(e + t[a].right.length);
  }
  return r !== "" && n.push({
    type: "text",
    data: r
  }), n;
}, P = function(r, t) {
  var i;
  const e = T(
    r,
    (t == null ? void 0 : t.delimiters) ?? [
      { left: "$$", right: "$$", display: !0 },
      { left: "\\(", right: "\\)", display: !1 },
      { left: "\\begin{equation}", right: "\\end{equation}", display: !0 },
      { left: "\\begin{align}", right: "\\end{align}", display: !0 },
      { left: "\\begin{alignat}", right: "\\end{alignat}", display: !0 },
      { left: "\\begin{gather}", right: "\\end{gather}", display: !0 },
      { left: "\\begin{CD}", right: "\\end{CD}", display: !0 },
      { left: "\\[", right: "\\]", display: !0 }
    ]
  );
  if (e.length === 1 && e[0].type === "text")
    return e[0].data;
  const n = [];
  for (let a = 0; a < e.length; a++)
    if (e[a].type === "text")
      n.push({
        type: "node",
        name: "span",
        attrs: {
          style: "white-space: pre-wrap;"
        },
        children: [
          {
            type: "text",
            text: e[a].data
          }
        ]
      });
    else {
      const s = {
        ...t
      };
      let f = e[a].data;
      s.displayMode = e[a].display;
      try {
        s.preProcess && (f = s.preProcess(f));
        const c = _(f, s);
        n.push(...c);
      } catch (c) {
        if (!(c instanceof l.ParseError))
          throw c;
        (i = t.errorCallback) == null || i.call(
          t,
          "KaTeX auto-render: Failed to parse `" + e[a].data + "` with ",
          c
        ), n.push(e[a].rawData);
        continue;
      }
    }
  return n;
};
export {
  b as createClass,
  _ as default,
  _ as parseLatex,
  P as renderMathInText
};
