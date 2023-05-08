import katex from "katex";
import "./index.less";

type Node = any; // TODO
type NodeType = "text" | "span" | "svg" | "anchor" | "line" | "path";
type RichNode = {
  type?: string;
  name?: string;
  children?: RichNode[];
  attrs?: any;
  text?: string;
};

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

const svg2base64 = (svg: string) => {
  const txt = encodeURIComponent(svg.replace(/\s+/g, " "));
  return "data:image/svg+xml," + txt;
};

const katex2richnode = (
  type: NodeType,
  dom: Node,
  children: RichNode[]
): RichNode | RichNode[] | null => {
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

const toMarkup = (doms, color?: string) => {
  return doms
    .map((dom) => {
      let domColor: string | undefined = color;
      if (dom?.style?.color) domColor = dom.style.color;

      let type: NodeType | undefined = undefined;
      if (dom instanceof katex.__domTree.Span) type = "span";
      if (dom instanceof katex.__domTree.Anchor) type = "anchor";
      if (dom instanceof katex.__domTree.LineNode) type = "line";
      if (dom instanceof katex.__domTree.PathNode) type = "path";
      if (dom instanceof katex.__domTree.SvgNode) {
        type = "svg";
        if (domColor) dom.attributes.fill = domColor;
      }
      if (dom instanceof katex.__domTree.SymbolNode) type = "text";

      const children =
        dom.children && dom.children.length > 0
          ? toMarkup(dom.children, domColor)
          : [];
      if (!type) return children;
      return katex2richnode(type, dom, children);
    })
    .reduce((pre, item) => {
      if (Array.isArray(item)) {
        pre.push(...item);
      } else {
        pre.push(item);
      }
      return pre;
    }, [])
    .filter((i) => !!i);
};

export default (latex, option: any = {}) => {
  const { throwError, ...restOption } = option || {};
  try {
    const tree = katex.__renderToDomTree(latex, {
      ...restOption,
      output: "html",
    });
    return toMarkup([tree]);
  } catch (error: any) {
    if (throwError) throw error;
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
