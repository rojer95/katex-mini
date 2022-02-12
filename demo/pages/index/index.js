// index.js
import parse from "@rojer/katex-mini";

Page({
  data: {
    nodes: [],
    latex: `
\\begin{matrix} 0 & 1 \\\\ 1 & 0 \\end{matrix}\\quad
\\begin{pmatrix} 0 & -i \\\\ i & 0 \\end{pmatrix}\\\\
\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}\\quad
\\begin{Bmatrix} 1 & 0 \\\\ 0 & -1 \\end{Bmatrix}\\\\
\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}\\quad
\\begin{Vmatrix} i & 0 \\\\ 0 & -i \\end{Vmatrix}
      `,
  },

  onShow() {
    setTimeout(() => {
      if (wx.katex) this.renderLatex();
    }, 100);
  },

  onInput: function (e) {
    this.setData({
      latex: e.detail.value,
    });
  },

  renderLatex: function () {
    this.setData({
      nodes: parse(this.data.latex),
    });
  },
});
