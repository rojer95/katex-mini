// index.js
import parse, { renderMathInText } from "@rojer/katex-mini";

Page({
  data: {
    // ref: https://rojer95.github.io/dslate/getting-started/math
    dslate: [
      {
        type: "node",
        name: "div",
        children: [
          {
            type: "node",
            name: "span",
            attrs: {
              style: "",
            },
            children: [
              {
                type: "text",
                text: "如图所示，倾角为",
              },
            ],
          },
          {
            type: "node",
            name: "span",
            children: [
              {
                name: "span",
                attrs: {
                  class: "katex katex-span",
                  style: "",
                },
                children: [
                  {
                    name: "span",
                    attrs: {
                      class: "katex-html katex-span",
                      style: "",
                    },
                    children: [
                      {
                        name: "span",
                        attrs: {
                          class: "base katex-span",
                          style: "",
                        },
                        children: [
                          {
                            name: "span",
                            attrs: {
                              class: "strut katex-span",
                              style: "height:0.6944em;",
                            },
                            children: [],
                          },
                          {
                            name: "span",
                            attrs: {
                              class: "mord mathnormal",
                              style: "margin-right:0.02778em;",
                            },
                            children: [
                              {
                                type: "text",
                                text: "θ",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "node",
            name: "span",
            attrs: {
              style: "",
            },
            children: [
              {
                type: "text",
                text: "的周定斜面顶端安装有定滑轮，轻绳跨过滑轮两端分别连接物体",
              },
            ],
          },
          {
            type: "node",
            name: "span",
            children: [
              {
                name: "span",
                attrs: {
                  class: "katex katex-span",
                  style: "",
                },
                children: [
                  {
                    name: "span",
                    attrs: {
                      class: "katex-html katex-span",
                      style: "",
                    },
                    children: [
                      {
                        name: "span",
                        attrs: {
                          class: "base katex-span",
                          style: "",
                        },
                        children: [
                          {
                            name: "span",
                            attrs: {
                              class: "strut katex-span",
                              style: "height:0.6833em;",
                            },
                            children: [],
                          },
                          {
                            name: "span",
                            attrs: {
                              class: "mord mathnormal",
                              style: "",
                            },
                            children: [
                              {
                                type: "text",
                                text: "A",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "node",
            name: "span",
            attrs: {
              style: "",
            },
            children: [
              {
                type: "text",
                text: "、",
              },
            ],
          },
          {
            type: "node",
            name: "span",
            children: [
              {
                name: "span",
                attrs: {
                  class: "katex katex-span",
                  style: "",
                },
                children: [
                  {
                    name: "span",
                    attrs: {
                      class: "katex-html katex-span",
                      style: "",
                    },
                    children: [
                      {
                        name: "span",
                        attrs: {
                          class: "base katex-span",
                          style: "",
                        },
                        children: [
                          {
                            name: "span",
                            attrs: {
                              class: "strut katex-span",
                              style: "height:0.6833em;",
                            },
                            children: [],
                          },
                          {
                            name: "span",
                            attrs: {
                              class: "mord mathnormal",
                              style: "margin-right:0.05017em;",
                            },
                            children: [
                              {
                                type: "text",
                                text: "B",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "node",
            name: "span",
            attrs: {
              style: "",
            },
            children: [
              {
                type: "text",
                text: ",轻绵与斜面平行，整个系统始终处于静止状态。不计滑轮的摩擦。已知物体",
              },
            ],
          },
          {
            type: "node",
            name: "span",
            children: [
              {
                name: "span",
                attrs: {
                  class: "katex katex-span",
                  style: "",
                },
                children: [
                  {
                    name: "span",
                    attrs: {
                      class: "katex-html katex-span",
                      style: "",
                    },
                    children: [
                      {
                        name: "span",
                        attrs: {
                          class: "base katex-span",
                          style: "",
                        },
                        children: [
                          {
                            name: "span",
                            attrs: {
                              class: "strut katex-span",
                              style: "height:0.6833em;",
                            },
                            children: [],
                          },
                          {
                            name: "span",
                            attrs: {
                              class: "mord mathnormal",
                              style: "",
                            },
                            children: [
                              {
                                type: "text",
                                text: "A",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "node",
            name: "span",
            attrs: {
              style: "",
            },
            children: [
              {
                type: "text",
                text: " 的质量为",
              },
            ],
          },
          {
            type: "node",
            name: "span",
            children: [
              {
                name: "span",
                attrs: {
                  class: "katex katex-span",
                  style: "",
                },
                children: [
                  {
                    name: "span",
                    attrs: {
                      class: "katex-html katex-span",
                      style: "",
                    },
                    children: [
                      {
                        name: "span",
                        attrs: {
                          class: "base katex-span",
                          style: "",
                        },
                        children: [
                          {
                            name: "span",
                            attrs: {
                              class: "strut katex-span",
                              style: "height:0.6444em;",
                            },
                            children: [],
                          },
                          {
                            name: "span",
                            attrs: {
                              class: "mord mathnormal",
                              style: "",
                            },
                            children: [
                              {
                                type: "text",
                                text: "m",
                              },
                            ],
                          },
                          {
                            name: "span",
                            attrs: {
                              class: "mord",
                              style: "",
                            },
                            children: [
                              {
                                type: "text",
                                text: "1",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "node",
            name: "span",
            attrs: {
              style: "",
            },
            children: [
              {
                type: "text",
                text: "，物体 ",
              },
            ],
          },
          {
            type: "node",
            name: "span",
            children: [
              {
                name: "span",
                attrs: {
                  class: "katex katex-span",
                  style: "",
                },
                children: [
                  {
                    name: "span",
                    attrs: {
                      class: "katex-html katex-span",
                      style: "",
                    },
                    children: [
                      {
                        name: "span",
                        attrs: {
                          class: "base katex-span",
                          style: "",
                        },
                        children: [
                          {
                            name: "span",
                            attrs: {
                              class: "strut katex-span",
                              style: "height:0.6833em;",
                            },
                            children: [],
                          },
                          {
                            name: "span",
                            attrs: {
                              class: "mord mathnormal",
                              style: "",
                            },
                            children: [
                              {
                                type: "text",
                                text: "A",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "node",
            name: "span",
            attrs: {
              style: "",
            },
            children: [
              {
                type: "text",
                text: " 与斜面间的动摩擦因数为 ",
              },
            ],
          },
          {
            type: "node",
            name: "span",
            children: [
              {
                name: "span",
                attrs: {
                  class: "katex katex-span",
                  style: "",
                },
                children: [
                  {
                    name: "span",
                    attrs: {
                      class: "katex-html katex-span",
                      style: "",
                    },
                    children: [
                      {
                        name: "span",
                        attrs: {
                          class: "base katex-span",
                          style: "",
                        },
                        children: [
                          {
                            name: "span",
                            attrs: {
                              class: "strut katex-span",
                              style: "height:1em;vertical-align:-0.25em;",
                            },
                            children: [],
                          },
                          {
                            name: "span",
                            attrs: {
                              class: "mord mathnormal",
                              style: "",
                            },
                            children: [
                              {
                                type: "text",
                                text: "μ",
                              },
                            ],
                          },
                          {
                            name: "span",
                            attrs: {
                              class: "mopen",
                              style: "",
                            },
                            children: [
                              {
                                type: "text",
                                text: "(",
                              },
                            ],
                          },
                          {
                            name: "span",
                            attrs: {
                              class: "mord mathnormal",
                              style: "",
                            },
                            children: [
                              {
                                type: "text",
                                text: "μ",
                              },
                            ],
                          },
                          {
                            name: "span",
                            attrs: {
                              class: "mspace katex-span",
                              style: "margin-right:0.2778em;",
                            },
                            children: [],
                          },
                          {
                            name: "span",
                            attrs: {
                              class: "mrel",
                              style: "",
                            },
                            children: [
                              {
                                type: "text",
                                text: "&lt;",
                              },
                            ],
                          },
                          {
                            name: "span",
                            attrs: {
                              class: "mspace katex-span",
                              style: "margin-right:0.2778em;",
                            },
                            children: [],
                          },
                        ],
                      },
                      {
                        name: "span",
                        attrs: {
                          class: "base katex-span",
                          style: "",
                        },
                        children: [
                          {
                            name: "span",
                            attrs: {
                              class: "strut katex-span",
                              style:
                                "height:0.7335em;vertical-align:-0.0391em;",
                            },
                            children: [],
                          },
                          {
                            name: "span",
                            attrs: {
                              class: "mord mathnormal",
                              style: "",
                            },
                            children: [
                              {
                                type: "text",
                                text: "t",
                              },
                            ],
                          },
                          {
                            name: "span",
                            attrs: {
                              class: "mord mathnormal",
                              style: "",
                            },
                            children: [
                              {
                                type: "text",
                                text: "an",
                              },
                            ],
                          },
                          {
                            name: "span",
                            attrs: {
                              class: "mord mathnormal",
                              style: "margin-right:0.02778em;",
                            },
                            children: [
                              {
                                type: "text",
                                text: "θ",
                              },
                            ],
                          },
                          {
                            name: "span",
                            attrs: {
                              class: "mspace katex-span",
                              style: "margin-right:0.2778em;",
                            },
                            children: [],
                          },
                          {
                            name: "span",
                            attrs: {
                              class: "mrel",
                              style: "",
                            },
                            children: [
                              {
                                type: "text",
                                text: "&lt;",
                              },
                            ],
                          },
                          {
                            name: "span",
                            attrs: {
                              class: "mspace katex-span",
                              style: "margin-right:0.2778em;",
                            },
                            children: [],
                          },
                        ],
                      },
                      {
                        name: "span",
                        attrs: {
                          class: "base katex-span",
                          style: "",
                        },
                        children: [
                          {
                            name: "span",
                            attrs: {
                              class: "strut katex-span",
                              style: "height:1em;vertical-align:-0.25em;",
                            },
                            children: [],
                          },
                          {
                            name: "span",
                            attrs: {
                              class: "mord",
                              style: "",
                            },
                            children: [
                              {
                                type: "text",
                                text: "1",
                              },
                            ],
                          },
                          {
                            name: "span",
                            attrs: {
                              class: "mclose",
                              style: "",
                            },
                            children: [
                              {
                                type: "text",
                                text: ")",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "node",
            name: "span",
            attrs: {
              style: "",
            },
            children: [
              {
                type: "text",
                text: "，设最大静摩擦力等于滑动摩擦力，重力加速度大小为",
              },
            ],
          },
          {
            type: "node",
            name: "span",
            children: [
              {
                name: "span",
                attrs: {
                  class: "katex katex-span",
                  style: "",
                },
                children: [
                  {
                    name: "span",
                    attrs: {
                      class: "katex-html katex-span",
                      style: "",
                    },
                    children: [
                      {
                        name: "span",
                        attrs: {
                          class: "base katex-span",
                          style: "",
                        },
                        children: [
                          {
                            name: "span",
                            attrs: {
                              class: "strut katex-span",
                              style: "height:0.625em;vertical-align:-0.1944em;",
                            },
                            children: [],
                          },
                          {
                            name: "span",
                            attrs: {
                              class: "mord mathnormal",
                              style: "margin-right:0.03588em;",
                            },
                            children: [
                              {
                                type: "text",
                                text: "g",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "node",
            name: "span",
            attrs: {
              style: "",
            },
            children: [
              {
                type: "text",
                text: "。求：",
              },
            ],
          },
        ],
      },
      {
        type: "node",
        name: "div",
        children: [
          {
            type: "node",
            name: "span",
            attrs: {
              style: "",
            },
            children: [
              {
                type: "text",
                text: "（1）斜面对物体 ",
              },
            ],
          },
          {
            type: "node",
            name: "span",
            children: [
              {
                name: "span",
                attrs: {
                  class: "katex katex-span",
                  style: "",
                },
                children: [
                  {
                    name: "span",
                    attrs: {
                      class: "katex-html katex-span",
                      style: "",
                    },
                    children: [
                      {
                        name: "span",
                        attrs: {
                          class: "base katex-span",
                          style: "",
                        },
                        children: [
                          {
                            name: "span",
                            attrs: {
                              class: "strut katex-span",
                              style: "height:0.6833em;",
                            },
                            children: [],
                          },
                          {
                            name: "span",
                            attrs: {
                              class: "mord mathnormal",
                              style: "",
                            },
                            children: [
                              {
                                type: "text",
                                text: "A",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "node",
            name: "span",
            attrs: {
              style: "",
            },
            children: [
              {
                type: "text",
                text: " 的支持力大小 ",
              },
            ],
          },
          {
            type: "node",
            name: "span",
            children: [
              {
                name: "span",
                attrs: {
                  class: "katex katex-span",
                  style: "",
                },
                children: [
                  {
                    name: "span",
                    attrs: {
                      class: "katex-html katex-span",
                      style: "",
                    },
                    children: [
                      {
                        name: "span",
                        attrs: {
                          class: "base katex-span",
                          style: "",
                        },
                        children: [
                          {
                            name: "span",
                            attrs: {
                              class: "strut katex-span",
                              style: "height:0.8333em;vertical-align:-0.15em;",
                            },
                            children: [],
                          },
                          {
                            name: "span",
                            attrs: {
                              class: "mord katex-span",
                              style: "",
                            },
                            children: [
                              {
                                name: "span",
                                attrs: {
                                  class: "mord mathnormal",
                                  style: "margin-right:0.13889em;",
                                },
                                children: [
                                  {
                                    type: "text",
                                    text: "F",
                                  },
                                ],
                              },
                              {
                                name: "span",
                                attrs: {
                                  class: "msupsub katex-span",
                                  style: "",
                                },
                                children: [
                                  {
                                    name: "span",
                                    attrs: {
                                      class: "vlist-t vlist-t2 katex-span",
                                      style: "",
                                    },
                                    children: [
                                      {
                                        name: "span",
                                        attrs: {
                                          class: "vlist-r katex-span",
                                          style: "",
                                        },
                                        children: [
                                          {
                                            name: "span",
                                            attrs: {
                                              class: "vlist katex-span",
                                              style: "height:0.3283em;",
                                            },
                                            children: [
                                              {
                                                name: "span",
                                                attrs: {
                                                  class: " katex-span",
                                                  style:
                                                    "top:-2.55em;margin-left:-0.1389em;margin-right:0.05em;",
                                                },
                                                children: [
                                                  {
                                                    name: "span",
                                                    attrs: {
                                                      class:
                                                        "pstrut katex-span",
                                                      style: "height:2.7em;",
                                                    },
                                                    children: [],
                                                  },
                                                  {
                                                    name: "span",
                                                    attrs: {
                                                      class:
                                                        "sizing reset-size6 size3 mtight katex-span",
                                                      style: "",
                                                    },
                                                    children: [
                                                      {
                                                        name: "span",
                                                        attrs: {
                                                          class:
                                                            "mord mathnormal mtight",
                                                          style:
                                                            "margin-right:0.10903em;",
                                                        },
                                                        children: [
                                                          {
                                                            type: "text",
                                                            text: "N",
                                                          },
                                                        ],
                                                      },
                                                    ],
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                          {
                                            name: "span",
                                            attrs: {
                                              class: "vlist-s katex-span",
                                              style: "",
                                            },
                                            children: [
                                              {
                                                type: "text",
                                                text: "​",
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                      {
                                        name: "span",
                                        attrs: {
                                          class: "vlist-r katex-span",
                                          style: "",
                                        },
                                        children: [
                                          {
                                            name: "span",
                                            attrs: {
                                              class: "vlist katex-span",
                                              style: "height:0.15em;",
                                            },
                                            children: [
                                              {
                                                name: "span",
                                                attrs: {
                                                  class: " katex-span",
                                                  style: "",
                                                },
                                                children: [],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "node",
            name: "span",
            attrs: {
              style: "",
            },
            children: [
              {
                type: "text",
                text: "；",
              },
            ],
          },
        ],
      },
      {
        type: "node",
        name: "div",
        children: [
          {
            type: "node",
            name: "span",
            attrs: {
              style: "",
            },
            children: [
              {
                type: "text",
                text: "（2）物休 ",
              },
            ],
          },
          {
            type: "node",
            name: "span",
            children: [
              {
                name: "span",
                attrs: {
                  class: "katex katex-span",
                  style: "",
                },
                children: [
                  {
                    name: "span",
                    attrs: {
                      class: "katex-html katex-span",
                      style: "",
                    },
                    children: [
                      {
                        name: "span",
                        attrs: {
                          class: "base katex-span",
                          style: "",
                        },
                        children: [
                          {
                            name: "span",
                            attrs: {
                              class: "strut katex-span",
                              style: "height:0.6833em;",
                            },
                            children: [],
                          },
                          {
                            name: "span",
                            attrs: {
                              class: "mord mathnormal",
                              style: "margin-right:0.05017em;",
                            },
                            children: [
                              {
                                type: "text",
                                text: "B",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "node",
            name: "span",
            attrs: {
              style: "",
            },
            children: [
              {
                type: "text",
                text: " 的质量 ",
              },
            ],
          },
          {
            type: "node",
            name: "span",
            children: [
              {
                name: "span",
                attrs: {
                  class: "katex katex-span",
                  style: "",
                },
                children: [
                  {
                    name: "span",
                    attrs: {
                      class: "katex-html katex-span",
                      style: "",
                    },
                    children: [
                      {
                        name: "span",
                        attrs: {
                          class: "base katex-span",
                          style: "",
                        },
                        children: [
                          {
                            name: "span",
                            attrs: {
                              class: "strut katex-span",
                              style: "height:0.5806em;vertical-align:-0.15em;",
                            },
                            children: [],
                          },
                          {
                            name: "span",
                            attrs: {
                              class: "mord katex-span",
                              style: "",
                            },
                            children: [
                              {
                                name: "span",
                                attrs: {
                                  class: "mord mathnormal",
                                  style: "",
                                },
                                children: [
                                  {
                                    type: "text",
                                    text: "m",
                                  },
                                ],
                              },
                              {
                                name: "span",
                                attrs: {
                                  class: "msupsub katex-span",
                                  style: "",
                                },
                                children: [
                                  {
                                    name: "span",
                                    attrs: {
                                      class: "vlist-t vlist-t2 katex-span",
                                      style: "",
                                    },
                                    children: [
                                      {
                                        name: "span",
                                        attrs: {
                                          class: "vlist-r katex-span",
                                          style: "",
                                        },
                                        children: [
                                          {
                                            name: "span",
                                            attrs: {
                                              class: "vlist katex-span",
                                              style: "height:0.3283em;",
                                            },
                                            children: [
                                              {
                                                name: "span",
                                                attrs: {
                                                  class: " katex-span",
                                                  style:
                                                    "top:-2.55em;margin-left:0em;margin-right:0.05em;",
                                                },
                                                children: [
                                                  {
                                                    name: "span",
                                                    attrs: {
                                                      class:
                                                        "pstrut katex-span",
                                                      style: "height:2.7em;",
                                                    },
                                                    children: [],
                                                  },
                                                  {
                                                    name: "span",
                                                    attrs: {
                                                      class:
                                                        "sizing reset-size6 size3 mtight katex-span",
                                                      style: "",
                                                    },
                                                    children: [
                                                      {
                                                        name: "span",
                                                        attrs: {
                                                          class:
                                                            "mord mathnormal mtight",
                                                          style:
                                                            "margin-right:0.05017em;",
                                                        },
                                                        children: [
                                                          {
                                                            type: "text",
                                                            text: "B",
                                                          },
                                                        ],
                                                      },
                                                    ],
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                          {
                                            name: "span",
                                            attrs: {
                                              class: "vlist-s katex-span",
                                              style: "",
                                            },
                                            children: [
                                              {
                                                type: "text",
                                                text: "​",
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                      {
                                        name: "span",
                                        attrs: {
                                          class: "vlist-r katex-span",
                                          style: "",
                                        },
                                        children: [
                                          {
                                            name: "span",
                                            attrs: {
                                              class: "vlist katex-span",
                                              style: "height:0.15em;",
                                            },
                                            children: [
                                              {
                                                name: "span",
                                                attrs: {
                                                  class: " katex-span",
                                                  style: "",
                                                },
                                                children: [],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "node",
            name: "span",
            attrs: {
              style: "",
            },
            children: [
              {
                type: "text",
                text: " 的取值范围；",
              },
            ],
          },
        ],
      },
      {
        type: "node",
        name: "div",
        children: [
          {
            type: "node",
            name: "span",
            attrs: {
              style: "",
            },
            children: [
              {
                type: "text",
                text: "",
              },
            ],
          },
        ],
      },
      {
        type: "node",
        name: "div",
        children: [
          {
            type: "node",
            name: "span",
            attrs: {
              style: "",
            },
            children: [
              {
                type: "text",
                text: "",
              },
            ],
          },
          {
            type: "node",
            name: "img",
            attrs: {
              style:
                "width:227px;height:206px;margin-left:undefined;margin-top:undefined;margin-bottom:undefined;margin-right:undefined;",
              src: "data:image/png;base64,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",
            },
          },
          {
            type: "node",
            name: "span",
            attrs: {
              style: "",
            },
            children: [
              {
                type: "text",
                text: "",
              },
            ],
          },
        ],
      },
    ],
    nodes: [],
    latex: `\\begin{matrix} 0 & 1 \\\\ 1 & 0 \\end{matrix}\\quad
\\begin{pmatrix} 0 & -i \\\\ i & 0 \\end{pmatrix}\\\\
\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}\\quad
\\begin{Bmatrix} 1 & 0 \\\\ 0 & -1 \\end{Bmatrix}\\\\
\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}\\quad
\\begin{Vmatrix} i & 0 \\\\ 0 & -i \\end{Vmatrix}`,
    latexAutoRender:
      "这是一个行内公式 $ f(x) = sum_{n=0}^{infty} \\frac{f^{(n)}(a)}{n!} (x - a)^n $ ，这是一个行间的公式 $$ \\int_a^b f(x) , dx = F(b) - F(a) $$ \n这是新起一行的文字",
    latexAutoRenderNodes: [],
  },

  onShow() {
    this.renderLatex();
  },

  onInput: function (e) {
    this.setData({
      latex: e.detail.value,
    });
  },

  onInputAutoRender: function (e) {
    this.setData({
      latexAutoRender: e.detail.value,
    });
  },

  renderLatex: function () {
    try {
      const nodes = parse(this.data.latex, {
        throwError: true,
        displayMode: true,
      });
      this.setData({
        nodes,
      });
    } catch (error) {
      console.log(error);
      this.setData({
        nodes: [
          {
            name: "div",
            attrs: {
              style: "color: red;",
            },
            children: [
              {
                type: "text",
                text: "渲染错误",
              },
            ],
          },
        ],
      });
    }

    try {
      const autoRenderNodes = renderMathInText(this.data.latexAutoRender, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false },
          {
            left: "\\begin{equation}",
            right: "\\end{equation}",
            display: true,
          },
          { left: "\\begin{align}", right: "\\end{align}", display: true },
          { left: "\\begin{alignat}", right: "\\end{alignat}", display: true },
          { left: "\\begin{gather}", right: "\\end{gather}", display: true },
          { left: "\\begin{CD}", right: "\\end{CD}", display: true },
          { left: "\\[", right: "\\]", display: true },
        ],
      });
      console.log("autoRenderNodes", autoRenderNodes);

      this.setData({
        latexAutoRenderNodes: autoRenderNodes,
      });
    } catch (error) {}
  },
});
