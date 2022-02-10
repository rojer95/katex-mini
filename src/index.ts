import katex from "katex";
import "./index.less";

// hyphenate and escape adapted from Facebook's React under Apache 2 license

const uppercase = /([A-Z])/g;
const hyphenate = function (str: string): string {
  return str.replace(uppercase, "-$1").toLowerCase();
};

const ESCAPE_LOOKUP: Record<string, string> = {
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
function escape(text: any): string {
  return String(text).replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
}

function svg2base64(svg: string): string {
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
}

function katex2richnode(type: string, dom: any, children: any[]): any {
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

  const attrs: any = {};
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
}

/**
 * Create an HTML className based on a list of classes. In addition to joining
 * with spaces, we also remove empty classes.
 */

const createClass = function (classes: string[]): string {
  return classes?.filter((cls) => cls).join(" ");
};

const toMarkup = (doms: any[]): any[] => {
  return doms
    .map((dom: any) => {
      let domType: string = "";
      if (dom instanceof katex.__domTree.Span) domType = "span";
      if (dom instanceof katex.__domTree.SvgNode) domType = "svg";
      if (dom instanceof katex.__domTree.SymbolNode) domType = "text";

      return katex2richnode(
        domType,
        dom,
        dom.children && dom.children.length > 0 ? toMarkup(dom.children) : []
      );
    })
    .filter((i) => !!i);
};

export default (latex: string): any[] => {
  try {
    const tree = katex.__renderToHTMLTree(latex, {
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
