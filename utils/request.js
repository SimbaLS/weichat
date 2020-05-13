
/**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */
const app = getApp();
let token = '';
function _get(url, data, successf, fail, complete){
  data.token = app.globalData.userInfo ? app.globalData.userInfo.token:'';
  wx.request({
    url: url,
    header: {
      'Content-Type': 'application/json'
    },
    data: data,
    success:(res)=>{
      if (res.statusCode == '200') {
        if (res.data.status == 0) {
          successf(res);
        } else {
          //做一些错误的处理
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500
          });
        }   
      } else {
        wx.showToast({
          title: res.statusCode,
          icon: 'none',
          duration: 1500
        });
      };
    },
    fail: (res) =>{
      fail(res);
    }, complete: (res) =>{      
      complete(res)
    }
  });
}

/**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */
function _post(url, data, successf, fail, complete){
  data.token = app.globalData.userInfo ? app.globalData.userInfo.token : '';
  wx.request({
    url: url,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    },
    method: 'POST',
    data:data,
    success: function (res) {
      if (res.statusCode == '200') {
        if(res.data.status == 0){
          successf(res);
        }else{
          //做一些错误的处理
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500
          });
        }        
      } else {
        wx.showToast({
          title: res.statusCode,
          icon: 'none',
          duration: 1500
        });
      };
    },
    fail: function (res) {
      fail(res);
    }, 
    complete: function(res) {
           
      complete(res)
    }
  });
}

/**
* url 请求地址
* success 成功的回调
* fail 失败的回调
*/
function _post_json(url, data, successf, fail, complete){
  data.token = app.globalData.userInfo ? app.globalData.userInfo.token : '';
  wx.request({
    url: url,  
    method: 'POST',
    data: data,
    success: function (res) {
      if (res.statusCode == '200'){
        if (res.data.status == 0) {
          successf(res);
        } else {
          //做一些错误的处理
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500
          });
        }   
      }else{
        wx.showToast({
          title: res.statusCode,
          icon: 'none',
          duration: 1500
        });
      };
    },
    fail: function (res) {
      fail(res);
    },
    complete: function (res) {
      complete(res)
    }
  });
};

module.exports = {
  _get: _get,
  _post: _post,
  _post_json: _post_json
}