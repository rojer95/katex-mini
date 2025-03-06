import katex from "katex";
import splitAtDelimiters from "./splitAtDelimiters";
import { Delimiters } from "./types";
import { parseLatex } from "../core";

export const renderMathInText = function (
  text: string,
  optionsCopy: {
    delimiters: Delimiters;
    preProcess?: (math: string) => string;
    errorCallback?: (msg: string, e) => void;
  }
) {
  const data = splitAtDelimiters(
    text,
    optionsCopy?.delimiters ?? [
      { left: "$$", right: "$$", display: true },
      { left: "\\(", right: "\\)", display: false },
      { left: "\\begin{equation}", right: "\\end{equation}", display: true },
      { left: "\\begin{align}", right: "\\end{align}", display: true },
      { left: "\\begin{alignat}", right: "\\end{alignat}", display: true },
      { left: "\\begin{gather}", right: "\\end{gather}", display: true },
      { left: "\\begin{CD}", right: "\\end{CD}", display: true },
      { left: "\\[", right: "\\]", display: true },
    ]
  );
  if (data.length === 1 && data[0].type === "text") {
    // There is no formula in the text.
    // Let's return null which means there is no need to replace
    // the current text node with a new one.
    return data[0].data;
  }

  const fragment: any = [];

  for (let i = 0; i < data.length; i++) {
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
    } else {
      const newOptionsCopy: any = {
        ...optionsCopy,
      };
      let math = data[i].data;
      // Override any display mode defined in the settings with that
      // defined by the text itself
      newOptionsCopy.displayMode = data[i].display;
      try {
        if (newOptionsCopy.preProcess) {
          math = newOptionsCopy.preProcess(math);
        }

        const children = parseLatex(math, newOptionsCopy);
        fragment.push(...children);
      } catch (e) {
        if (!(e instanceof katex.ParseError)) {
          throw e;
        }
        optionsCopy.errorCallback?.(
          "KaTeX auto-render: Failed to parse `" + data[i].data + "` with ",
          e
        );
        fragment.push(data[i].rawData);
        continue;
      }
    }
  }

  return fragment;
};
