var fileHost = "https://hs-pro-server.oss-cn-hangzhou.aliyuncs.com/";//你的阿里云地址最后面跟上一个/   在你当前小程序的后台的uploadFile 合法域名也要配上这个域名
const config_host = require('../config.js')

wx.request({
  url: config_host.aliOss,
  header: {
    'content-type': 'application/json' // 默认值
  },
  success(res){
    console.log(res.data)
    let config = {
      //aliyun OSS config
      uploadImageUrl: `${fileHost}`, // 默认存在根目录，可根据需求改
      AccessKeySecret: res.data.accessKeyId,     
      OSSAccessKeyId: res.data.accessKeySecret,      
      timeout: 87600 //这个是上传文件时Policy的失效时间
    };
    module.exports = config;
  }
})
