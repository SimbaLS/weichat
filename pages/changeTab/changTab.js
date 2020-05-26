// pages/changeTab/changTab.js
Page({

  data: {
    read: [], //已读列表
    noRead: [], //未读列表
    currentTab: 0,
    tabScrollTop1: 0, //1滚动位置
    tabScrollTop2: 0, //2滚动位置
    bol1: true,
    bol2: true,
    loading: false,
    next1: true,
    next2: true,
    next: false,
  },
  onLoad: function (options) {
    this.nextRead();
  },
  onReachBottom: function () {
    if (this.data.currentTab == 0 && this.data.bol1 && this.data.next1) {
      this.nextRead();
    } else if (this.data.currentTab == 1 && this.data.bol2 && this.data.next2) {
      this.nextNoRead();
    } else {
      return false;
    }
  },
  //tab 切换
  swichNav: function (e) {
    let that = this,
      tab = e.target.dataset.current;
    if (this.data.currentTab === tab) {
      return false;
    } else {
      that.setData({
        currentTab: tab
      })
    }
  },
  //tab 切换
  bindChange: function (e) {
    let that = this,
      tab = e.detail.current,
      nextTemp = tab == 0 ? that.data.next1 : that.data.next2;
    that.setData({
      currentTab: tab,
      next: nextTemp
    });
    if (tab == 1 && that.data.next2 && that.data.noRead.length == 0) {
      //请求已读列表      
      that.nextNoRead();
    } else {
      that.autoHeight();
    };
    //切换时可以定位到上次的阅读位置
    let query = wx.createSelectorQuery();
    if (that.data.currentTab == 1) {
      //切换到未读
      query.select('.readList').boundingClientRect(function (res) {
        let top1 = Math.abs(res.top)
        console.log("Top1:" + top1);
        that.setData({
          tabScrollTop1: top1
        })
      }).exec();
      let height = that.data.tabScrollTop2 + 50;
      console.log('定位2222:' + height)
      setTimeout(function () {
        wx.pageScrollTo({
          scrollTop: height
        })
      }, 100)
    } else {
      //切换到已读
      query.select('.noReadList').boundingClientRect(function (res) {
        let top2 = Math.abs(res.top)
        console.log("Top2:" + top2);
        that.setData({
          tabScrollTop2: top2
        })
      }).exec();
      if (that.data.tabScrollTop1) {
        let height = that.data.tabScrollTop1 + 50;
        console.log('定位1111:' + height)
        setTimeout(function () {
          wx.pageScrollTo({
            scrollTop: height
          })
        }, 100)
      }
    }
  },
  // tab切换计算高度
  autoHeight() {
    wx.createSelectorQuery().select("#end" + this.data.currentTab).boundingClientRect().select("#start" + this.data.currentTab).boundingClientRect().exec(rect => {
      let _space = rect[0].bottom - rect[1].top + 49;
      _space = _space + "px";
      this.setData({
        swiper_height: _space
      });
    });
    // console.log(this.data.swiper_height);
  },
  nextRead() {
    let that = this;
    if (that.data.bol1) {
      wx.showLoading();
      that.setData({
        bol1: false
      });
      var list = [{ name: 'aaa', 'age': 1 }, { name: 'bbb', 'age': 2 }, { name: 'ccc', 'age': 3 }, { name: 'ddd', 'age': 4 }, { name: 'eee', 'age': 5 }, { name: 'fff', 'age': 6 }, { name: 'ggg', 'age': 6 }, { name: 'hhh', 'age': 6 }, { name: 'jjj', 'age': 6 }, { name: 'kkk', 'age': 6 }, { name: 'qqq', 'age': 6 }, { name: 'www', 'age': 6 }],
        read = [], temp = that.data.read;
      if (!temp) {
        read = list;
      } else {
        read = temp.concat(list);
      };
      that.setData({
        read,
        bol1: true
      });
      that.autoHeight(); //先计算当前tab高度
      setTimeout(()=>{
        wx.hideLoading();
      },1000)
    };
  },
  nextNoRead() {
    let that = this;
    if (that.data.bol2) {
      that.setData({
        bol2: false
      });
      var list = [{ name: '赵', 'age': 1 }, { name: '钱', 'age': 2 }, { name: '孙', 'age': 3 }, { name: '李', 'age': 4 }, { name: '周', 'age': 5 }, { name: '吴', 'age': 6 }, { name: '郑', 'age': 6 }, { name: '王', 'age': 6 }, { name: '啥', 'age': 6 }, { name: '是啥', 'age': 6 }],
        noRead = [], temp = that.data.noRead;
      if (!temp) {
        noRead = list;
      } else {
        noRead = temp.concat(list);
      };
      that.setData({
        noRead,
        bol2: true
      });
      that.autoHeight(); //先计算当前tab高度
      setTimeout(() => {
        wx.hideLoading();
      }, 1000)
     
    };
  },
  

})