//sequence.js
const app = getApp()

Page({
  data: {
    userInfo:null,
  },
  onLoad: function () {
    let that = this;
    if (app.globalData.employ && app.globalData.employ != '') {
      console.log("first")
      let userInfo = app.globalData.userInfo;
      that.setData({
        userInfo: userInfo ? userInfo : null
      });
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.employCallback = employ => {
        if (employ != '') {
          that.setData({
            userInfo: app.globalData.userInfo
          });         
        }
      }
    }
  }
})
