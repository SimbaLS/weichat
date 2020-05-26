// pages/useComponent/useComponent.js
const app = getApp();
const operate = require('../../utils/operate.js');
Page({

  data: {
    contentList: [
      {
        contentId: 1,
        name: '张三',
        num: 12,
        sex: 1,
        title: '这是一个简单的例子'
      },
      {
        contentId: 2,
        name: 'Jack',
        num: 22,
        sex: 1,
        title: 'be deal to all advice'
      },
      {
        contentId: 3,
        name: 'Tom',
        num: 3,
        sex: 1,
        title: 'I’m a cat'
      },
    ],
    changeVal:''
  },


  onLoad: function () {


  },
  touchMe(){
    operate.hintToast('触发点击')
  },
  // 与dynamic 传值
  numChange(e) {
    console.log(e.detail)
    let fromNum = e.detail.num
    this.setData({
      changeVal: fromNum
    });    
  },


})