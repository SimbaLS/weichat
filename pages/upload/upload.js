// upload/upload.js
const app = getApp();
const util = require('../../utils/util.js')
const operate = require('../../utils/operate.js');
const upload = require('../../upload/uploadFile.js');

Page({

  data: {
    worksImgs: [], //图片
    submitImgs: [], //提交给图片后端的地址
    videoSrc: '', //视频封面
    video: {},//视频相关信息
  },
  onLoad: function (options) {

  },
  // 选择图片
  chooseImg(e) {
    let that = this,
      worksImgs = this.data.worksImgs;
    if (that.data.videoSrc) {
      operate.hintToast('无法同时选择发布视频和图片!');
      return false;
    };
    wx.chooseImage({
      count: 9 - worksImgs.length,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success(res) {
        const images = worksImgs.concat(res.tempFilePaths)
        console.log(images)
        if (images.length > 0) {
          that.setData({
            canSubmit: true
          })
        }
        that.setData({
          worksImgs: images
        })
      },
      error(res) {
        operate.hintToast(res.errMsg);
      }
    })
  },
  // 删除图片
  deleteImg (e) {
    let worksImgs = this.data.worksImgs;
    let itemIndex = e.currentTarget.dataset.index;
    worksImgs.splice(itemIndex, 1);
    let bol = worksImgs.length > 0 || this.data.content.length > 0 ? true : false;
    this.setData({
      worksImgs: worksImgs,
      canSubmit: bol
    })
  },
  uploadImg: function (i) {
    let that = this, worksImgs = that.data.worksImgs;
    let nowTime = util.formatTime(new Date()), userId = that.data.userId;
    console.log(i, worksImgs);
    wx.showLoading({
      title: '发布中...',
      mask: true
    });
    if (i >= worksImgs.length) {
      that.publish();
    } else if (worksImgs[i].indexOf('oss-cn-hangzhou.aliyuncs.com') > -1) {
      //判断当前图片是不是已经上传过的
      i++;
      if (i >= worksImgs.length) {
        that.publish();//最后一张上传完成，进行其他操作发布    
      } else {
        that.uploadImg(i)
      };
    } else {
      // 这里是uploadImage 方法传的几个参数（图片的本地资源路径，要传到哪个目录下）
      upload.uploadImage(worksImgs[i], 'sds/xcx/your/' + '-' + nowTime,
        function (result) {
          console.log("======上传成功图片地址为：", result);
          let temp = 'worksImgs[' + i + ']';
          that.setData({
            [temp]: result
          });
          console.log(that.data.worksImgs)
        }, function (result) {
          console.log("第" + (i + 1) + "张上传失败", result)
          operate.hintToast("第" + (i + 1) + "张上传失败:" + result)
        }, function (com) {
          i++;
          if (i >= worksImgs.length) {
            that.publish(); //最后一张上传完成，进行其他操作发布            
          } else {
            that.uploadImg(i)
          };
        }
      )
    }
  },
  // 上传图片、视频
  verify() {    
    let that = this;
   if (that.data.worksImgs.length > 0) {
      this.uploadImg(0)
    } else if (that.data.videoSrc) {
      that.uploadvideo();
    }
  },
  //发布
  publish() {
    console.log('发布');
  } 

})