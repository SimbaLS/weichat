const app = getApp();
const operate = require('../../utils/operate.js');
Page({
 
  data: {
    content: '',
    canSubmit:false,
    videoSrc: '',
    fullScreen: false,//视频是否全屏
  },
 
  onLoad: function (options) {

  },

  // 视频全屏
  fullScreen(e) {
    console.log(e.detail.fullScreen);
    let fullScreen = e.detail.fullScreen;
    this.setData({
      fullScreen: fullScreen
    })
  },
  // textarea 聚焦
  bindTextAreaBlur: function (e) {
    let content = e.detail.value, canSubmit = this.data.canSubmit;
    console.log(content)   
    this.setData({
      content
    })
  },
  //选择视频
  chooseVideo: function () {
    var that = this;   
    wx.chooseMedia({
      count: 1,
      mediaType: ['video'],
      sourceType: ['album'],
      success: function (res) {
        console.log(res);
        if (!res.errMsg == 'chooseMedia:ok') {
          operate.hintToast('视频错误，请重新选择')
          wx.hideLoading();
          return false;
        };
        let temp = res.tempFiles[0];
        let filePath = temp.tempFilePath,
          bol = filePath.length > 0 || that.data.content.length > 0 ? true : false,
          size = temp.size,
          videoImg = temp.thumbTempFilePath;
        var fType = filePath.substring(filePath.lastIndexOf("."), filePath.length);
        // 设置100M
        if (size > 100 * 1024 * 1024) {
          operate.hintToast('视频尺寸过大，请重新选择');
          wx.hideLoading();
          return false;
        };
        that.setData({
          videoSrc: filePath,
          video: { type: fType, size: size },
          canSubmit: bol,
          videoImg: videoImg
        })
      },
      error(res) {
        operate.hintToast(res.errMsg);
      },
      complete() {
      }
    })
  },
 
})