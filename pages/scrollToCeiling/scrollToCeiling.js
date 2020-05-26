// pages/scrollToCeiling/scrollToCeiling.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFixedTop: false, //是否固定顶部
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 粘性顶部  //获取节点距离顶部的距离
    let that = this,
      query = wx.createSelectorQuery();
    if (!that.data.navbarInitTop) {
      query.select('#nav').boundingClientRect(function (rect) {
        if (rect && rect.top > 0) {
          var navbarInitTop = parseInt(rect.top);
          that.setData({
            navbarInitTop: navbarInitTop
          });
        }
      }).exec();
    }
  },
  /**
   * 监听页面滑动事件
  */
  onPageScroll: function (e) {
    var that = this;
    var scrollTop = parseInt(e.scrollTop); //滚动条距离顶部高度
    //判断'滚动条'滚动的距离 和 '元素在初始时'距顶部的距离进行判断
    var isSatisfy = scrollTop >= that.data.navbarInitTop ? true : false;
    //为了防止不停的setData, 这儿做了一个等式判断。 只有处于吸顶的临界值才会不相等
    if (that.data.isFixedTop === isSatisfy) {
      return false;
    }
    that.setData({
      isFixedTop: isSatisfy
    });
  },
 
})