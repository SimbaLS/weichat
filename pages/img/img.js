//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    user: {
      head:'https://upload.jianshu.io/users/upload_avatars/3120799/d78ee51-34c2-41f4-839c-897106dae2ff.jpg',
      name:'猪猪女孩'
     
    },
    imgList:[
      'https://upload.jianshu.io/users/upload_avatars/3120799/d78ee51-34c2.png',          'https://upload.jianshu.io/users/upload_avatars/3120799/d778ee51-34c2-41f4-839c-897106dae2ff.jpg',
      'https://upload.jianshu.io/users/upload_avatars/3120799/d78ee51-34c2.png'

    ],
    noHead: '/img/noHead.png',
  },
  onLoad: function () {
   
  },
  /** 图片错误 */
  errorImg(event) {
    let img = 'user.head',//构建一个对象 user为数据源对象
      noHead = this.data.noHead;
    this.setData({  
      [img]: noHead  //修改数据源对应的数据
    })
  },
  //图片加载出错，替换为默认图片
  avatarError (e) {
    let index = e.currentTarget.dataset.index;
    let errorImg = 'imgList[' + index + ']'
    this.setData({
      [errorImg]: this.data.noHead
    })
  }

})
