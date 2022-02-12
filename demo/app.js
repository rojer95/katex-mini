// app.js
const katex = require('@rojer/katex-mini')
App({
  onLaunch() {

    wx.request({
      url: 'https://lib.baomitu.com/KaTeX/latest/katex.min.js',
      success: ({ data: code })=>{
        katex.loadKatex(code);
        wx.katex = true
      }
    })
  },
});
