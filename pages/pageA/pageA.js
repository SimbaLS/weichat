// pages/pageA/pageA.js
Page({
  data: {
    num: 1
  },
  goPage() {
    // pageA
    let self = this;
    wx.navigateTo({
      url: '/pages/pageB/pageB?froms=1&num=' + self.data.num,
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        addNumFromDet: function(data) {
          console.log(data)
          self.setData({
            num: data.num
          })
        },
        sendObj: function(data) {
          console.log(data)
        },
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('sendObj', {
          text: 'hello',name:'Tom'
        })
      }
    })
  }
})