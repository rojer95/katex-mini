import { Interpreter } from "eval5";

// hyphenate and escape adapted from Facebook's React under Apache 2 license

const uppercase = /([A-Z])/g;
const hyphenate = function (str) {
  return str.replace(uppercase, "-$1").toLowerCase();
};

const ESCAPE_LOOKUP = {
  "&": "&amp;",
  ">": "&gt;",
  "<": "&lt;",
  '"': "&quot;",
  "'": "&#x27;",
};

const ESCAPE_REGEX = /[&><"']/g;
/**
 * Escapes text to prevent scripting attacks.
 */
function escape(text) {
  return String(text).replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
}

const svg2base64 = (svg) => {
  const txt = svg
    .replace(
      "<svg",
      ~svg.indexOf("xmlns") ? "<svg" : '<svg xmlns="http://www.w3.org/2000/svg"'
    )

    //
    //   Encode (may need a few extra replacements)
    //
    .replace(/"/g, "'")
    .replace(/%/g, "%25")
    .replace(/#/g, "%23")
    .replace(/{/g, "%7B")
    .replace(/}/g, "%7D")
    .replace(/</g, "%3C")
    .replace(/>/g, "%3E")

    .replace(/\s+/g, " ");
  //
  //    The maybe list (add on documented fail)
  //
  //  .replace(/&/g, '%26')
  //  .replace('|', '%7C')
  //  .replace('[', '%5B')
  //  .replace(']', '%5D')
  //  .replace('^', '%5E')
  //  .replace('`', '%60')
  //  .replace(';', '%3B')
  //  .replace('?', '%3F')
  //  .replace(':', '%3A')
  //  .replace('@', '%40')
  //  .replace('=', '%3D')

  return "data:image/svg+xml," + txt;
};

const katex2richnode = (type, dom, children) => {
  let needsSpan = false;
  if (dom.classes && dom.classes.length > 0) needsSpan = true;

  const classes = escape(createClass(dom.classes));
  let styles = "";

  if (type === "text") {
    if (dom.italic > 0) {
      styles += "margin-right:" + dom.italic + "em;";
    }
  }

  // Add the styles, after hyphenation
  for (const style in dom.style) {
    if (dom.style.hasOwnProperty(style)) {
      styles += `${hyphenate(style)}:${dom.style[style]};`;
    }
  }

  if (styles) {
    needsSpan = true;
  }

  const attrs = {};
  for (const attr in dom.attributes) {
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
      children,
    };
  }

  if (type === "text") {
    const escaped = escape(dom.text);
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
    } else {
      return {
        type: "text",
        text: escaped,
      };
    }
  }

  if (type === "svg") {
    const svg = dom.toMarkup();
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

/**
 * Create an HTML className based on a list of classes. In addition to joining
 * with spaces, we also remove empty classes.
 */
export const createClass = function (classes) {
  return classes?.filter((cls) => cls).join(" ") ?? "";
};

const toMarkup = (doms) => {
  return doms
    .map((dom) => {
      let type;
      if (dom instanceof rootContext?.katex?.__domTree.Span) type = "span";
      if (dom instanceof rootContext?.katex?.__domTree.Anchor) type = "anchor";
      if (dom instanceof rootContext?.katex?.__domTree.LineNode) type = "line";
      if (dom instanceof rootContext?.katex?.__domTree.PathNode) type = "path";
      if (dom instanceof rootContext?.katex?.__domTree.SvgNode) type = "svg";
      if (dom instanceof rootContext?.katex?.__domTree.SymbolNode)
        type = "text";

      return katex2richnode(
        type,
        dom,
        dom.children && dom.children.length > 0 ? toMarkup(dom.children) : []
      );
    })
    .filter((i) => !!i);
};

const rootContext: any = {
  console,
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval,
};

export const loadKatex = (code) => {
  try {
    var interpreter = new Interpreter(rootContext, {
      rootContext,
    });
    interpreter.evaluate(code);
  } catch (error) {
    console.log(error);
  }
};

export default (latex, option = {}) => {
  try {
    const tree = rootContext?.katex?.__renderToDomTree(latex, {
      ...option,
      output: "html",
    });
    return toMarkup([tree]);
  } catch (error: any) {
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
