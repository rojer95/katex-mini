// app.js
import { loadKatex } from '@rojer/katex-mini'
App({
  onLaunch() {
    // 通过动态方式加载katex代码，节省小程序包体大小
    wx.request({
      url: 'https://lib.baomitu.com/KaTeX/latest/katex.min.js',
      success: ({ data: code })=>{
        loadKatex(code);
        wx.katex = true
      }
    })
  },
});
