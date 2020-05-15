let fileHost = '你的阿里云域名';
let env = wx.getStorageSync('env')||null;
 //配置文件，在这文件里配置你的OSS keyId和KeySecret,timeout:87600;
//阿里云地址最后面跟上一个/   在你当前小程序的后台的uploadFile 合法域名也要配上这个域名
checkTime();
// 检查STS是否过期
function checkTime(){
  if (!env || !env.expiration||new Date().getTime() >= env.expiration) {
    wx.request({
      url: '你的url',
      success(res) {
        env = {
          //aliyun OSS config
          expiration: res.data.data.expiration,
          uploadImageUrl: `${fileHost}`,
          OSSAccessKeyId: res.data.data.accessKeyId,
          AccessKeySecret: res.data.data.accessKeySecret,
          stsToken: res.data.data.securityToken,
          timeout: 87600 //这个是上传文件时Policy的失效时间
        };
        wx.setStorageSync('env', env) //缓存里存储
      }
    })
  };
}


const base64 = require('base64.js');//Base64,hmac,sha1,crypto相关算法
require('hmac.js');
require('sha1.js');
const Crypto = require('crypto.js');

/*
 *上传文件到阿里云oss
 *@param - filePath :图片的本地资源路径
 *@param - dir:表示要传到哪个目录下
 *@param - successc:成功回调
 *@param - failc:失败回调,
 *@param - complete:完成回调
 *@param - fileSize 视频尺寸，
 *@param - type 视频后缀格式
 */ 
const uploadImage = function (filePath, dir, successc, failc, completec) {
  // console.log(filePath);
  if (!filePath || filePath.length < 9) {
    wx.hideLoading();
    wx.showModal({
      title: '图片错误',
      content: '请重试',
      showCancel: false,
    })
    return;
  };  
  //图片名字 可以自行定义， 这里是采用当前的时间戳 + 150内的随机数来给图片命名的
  const aliyunFileKey = dir + new Date().getTime() + Math.floor(Math.random() * 150) + '.png';  
  
  const aliyunServerURL = env.uploadImageUrl;//OSS地址，需要https
  const accessid = env.OSSAccessKeyId;
  const policyBase64 = getPolicyBase64(20);
  const signature = getSignature(policyBase64);//获取签名
  const formData = {
    key: aliyunFileKey,
    policy: policyBase64,
    OSSAccessKeyId: accessid,
    signature: signature,
    success_action_status: '200',
    'x-oss-security-token':env.stsToken
  };
  wx.uploadFile({
    url: aliyunServerURL,//开发者服务器 url
    filePath: filePath,//要上传文件资源的路径
    name: 'file',//必须填file
    header: {
      "Content-Type": "multipart/form-data",
    },
    formData: formData,
    success: function (res) {
      // console.log(formData);
      if (res.statusCode != 200) {
        wx.showToast({
          title: '上传出错，请稍后再试',
          icon: 'none',
          duration: 1500
        });
        failc(new Error('上传错误:' + JSON.stringify(res)))
        return;
      }
       successc(aliyunServerURL+aliyunFileKey);
    },
    fail: function (err) {
      err.wxaddinfo = aliyunServerURL;
      failc(err);
    },
    complete:function(com){
      if (completec){
        completec(com)
      }
    }
  })
}

const uploadVideo = function (filePath,fileSize,type, dir, successc, failc, completec) {
  if (!filePath || filePath.length < 9) {
    wx.hideLoading();
    wx.showModal({
      title: '视频错误',
      content: '请重试',
      showCancel: false,
    })
    return;
  };
  //视频名字 这里是采用当前的时间戳 + 150内的随机数来给图片命名的
  const aliyunFileKey = dir + new Date().getTime() + Math.floor(Math.random() * 150) + type;

  const aliyunServerURL = env.uploadImageUrl;//OSS地址，需要https
  const accessid = env.OSSAccessKeyId;
  const policyBase64 = getPolicyBase64(250);
  const signature = getSignature(policyBase64);//获取签名
  const formData = {
    key: aliyunFileKey, //储存路径
    policy: policyBase64,
    OSSAccessKeyId: accessid,
    signature: signature,
    success_action_status: '200',
    'x-oss-security-token': env.stsToken
  };
  wx.uploadFile({
    url: aliyunServerURL,//开发者服务器 url
    filePath: filePath,//要上传文件资源的路径
    name: 'file',//必须填file
    header: {
      "Content-Type": "multipart/form-data;boundary=" + fileSize,
    },
    formData: formData,
    success: function (res) {
      if (res.statusCode != 200) {
        wx.showToast({
          title: '上传出错，请稍后再试',
          icon: 'none',
          duration: 1500
        });
        failc(new Error('上传错误:' + JSON.stringify(res)))
        return;
      }
      successc(aliyunServerURL + aliyunFileKey);
    },
    fail: function (err) {
      err.wxaddinfo = aliyunServerURL;
      failc(err);
    },
    complete: function (com) {
      if (completec) {
        completec(com)
      }
    }
  })
}
const getPolicyBase64 = function (num) {
  // 视频 250M  图片 20M
  let date = new Date();
  date.setHours(date.getHours() + env.timeout);
  let srcT = date.toISOString();
  const policyText = {
    "expiration": srcT, //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了 
    "conditions": [
      ["content-length-range", 0, num * 1024 * 1024] // 设置上传文件的大小限制,5mb
    ]
  };
  const policyBase64 = base64.encode(JSON.stringify(policyText));
  return policyBase64;
};


const getSignature = function (policyBase64) {
  const accesskey = env.AccessKeySecret;

  const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
    asBytes: true
  });
  const signature = Crypto.util.bytesToBase64(bytes);

  return signature;
}

module.exports = {
  uploadImage,
  uploadVideo
};