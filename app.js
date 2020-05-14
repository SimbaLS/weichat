//app.js
App({
  globalData: {
    employ: '',
    userInfo: null,
  },
  onLaunch: function () {
    let userInfo = wx.getStorageSync('userInfo') || null,
     that = this;
    // 更新userInfo
    wx.request({
      url: '你的地址',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      method: 'POST',
      data: {},
      success: function (res) {
        if (res.data.status == 0) {
          let obj = res.data.data;
          that.globalData.userInfo = obj;
          wx.setStorageSync('userInfo', userInfo)
        } else {
          wx.setStorageSync('userInfo', null);
        };
        that.globalData.employ = true;
        //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (that.employCallback) {
          that.employCallback(true);
        }
      },
    }); 
  },
 
})