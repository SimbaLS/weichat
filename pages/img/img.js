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
    pic: ['https://goss.cfp.cn/creative/vcg/800/new/VCG211225432073.jpg'],
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
  },
  //图片点击放大事件
   imgYu(event) {    
     let src = event.currentTarget.dataset.src; //获取data-src
     let imgList = event.currentTarget.dataset.list; //获取data-list
     //图片预览
     wx.previewImage({
       current: src, // 当前显示图片的http链接
       urls: imgList, // 需要预览的图片http链接列表
       success(){
         console.log(imgList)
       }
     });
  },

})
