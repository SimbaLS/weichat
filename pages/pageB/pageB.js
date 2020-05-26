// pages/pageB/pageB.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dto:null,
    num:'',
    froms:''//页面来源

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let that = this;
    this.setData({
      num: options.num,
      froms: options.froms
    });
    const eventChannel = this.getOpenerEventChannel();
    // 监听sentPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('sendObj', function (data) {
      console.log(data)
      that.setData({
        dto:data
      })
    })

  },
  addNum(){
    let num = this.data.num;
    this.setData({
      num: ++num
    });
    this.addListen();
  },
  /** 返回上一个页面的num变化 */
  addListen() {
    let that = this, num = that.data.num;
    if (that.data.froms == 1) {    // 页面来源是pageA  
      const eventChannel = that.getOpenerEventChannel();
      // 上一页面通过eventChannel传送当前页面的数据
      eventChannel.emit('addNumFromDet', {
        num:num
      });     
    }
  },  
})