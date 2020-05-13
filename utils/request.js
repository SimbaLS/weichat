
/**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */
const app = getApp();
let token = '';
function _get(url, data, successf, fail, complete, type){
  data.toksource = 7;
  data.token = app.globalData.userInfo ? app.globalData.userInfo.token:'';
  wx.request({
    url: url,
    header: {
      'Content-Type': 'application/json'
    },
    data: data,
    success:(res)=>{
      if (res.statusCode == '200') {
        successf(res);
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
function _post(url, data, successf, fail, complete,type){
  data.toksource = 7
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
        successf(res);
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
function _post_json(url, data, successf, fail, complete,type){
  data.toksource = 7
  data.token = app.globalData.userInfo ? app.globalData.userInfo.token : '';
  wx.request({
    url: url,  
    method: 'POST',
    data: data,
    success: function (res) {
      if (res.statusCode == '200'){
        successf(res);
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