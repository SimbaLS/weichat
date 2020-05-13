//index.js
//获取应用实例
const app = getApp()
const api = require('../../utils/request.js');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let _this = this;
    if (app.globalData.userInfo) {
      _this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else{
       /* reLogin 在获取其他信息之前先code 不需要的话可以省略*/
      _this.reLogin();
      /**end */
        // 查看是否授权
        wx.getSetting({
          success(res) {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              wx.getUserInfo({
                success: function (res) {
                  /** 如果需要其信息 */
                  //_this.getUserData(res.detail.encryptedData, res.detail.iv);
                  /** end */
                  app.globalData.userInfo = res.userInfo
                  _this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                  })
                }
              })
            }else{
              if (_this.data.canIUse) {
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                app.userInfoReadyCallback = res => {
                  console.log(res);
                  _this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                  })
                }
              } else {
                // 在没有 open-type=getUserInfo 版本的兼容处理
                wx.getUserInfo({
                  success: res => {
                    /** 如果需要其信息 */
                    //_this.getUserData(res.detail.encryptedData, res.detail.iv);
                    /** end */
                    app.globalData.userInfo = res.userInfo
                    _this.setData({
                      userInfo: res.userInfo,
                      hasUserInfo: true
                    })
                  }
                })
              }
            }
          }
        })
    }
      
  },
  /** 重置code */
  reLogin() {
    let _this = this;
    wx.login({
      success: res => {
        _this.setData({
          code: res.code
        })
      }
    });
  },
  getUserInfo: function(e) {
    console.log(e)
    let [_this, detail] = [this, e.detail]
    if (detail.errMsg == "getUserInfo:ok") {
      // detail.encryptedData, detail.iv
      //拿到授权后dosomething
      app.globalData.userInfo = e.detail.userInfo
      _this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      /** 如果需要其信息 */
        //_this.getUserData(detail.encryptedData, detail.iv);
      /** end */
    } else {
      console.log('用户拒绝授权')
      _this.refuse() //拒绝授权的方法
    }
      
  },
  // 用户拒绝授权
  refuse() {
    // 检查是否是因为未授权引起的错误
    wx.getSetting({
      success(res) {
        // 当未授权时直接调用modal窗进行提示
        !res.authSetting['scope.userLocation'] && wx.showModal({
          content: '您暂未开启权限，是否开启',
          confirmColor: '#72bd4a',
          success: res => {
            // 用户确认授权后，进入设置列表
            if (res.confirm) {
              wx.openSetting({
                success(res) {
                  // 查看设置结果
                  console.log(!!res.authSetting['scope.userLocation'] ? '设置成功' : '设置失败');
                },
              });
            }
          }
        });
      }
    });
  },
  /** 授权后换取其他信息 */
  getUserData(encryptedData, iv) {
    let _this = this;
    wx.checkSession({
      success(cres) {
        // session_key 未过期，并且在本生命周期一直有效 // 查看是否授权
        wx.getSetting({
          success(res) {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              let data = {
                code: _this.data.code,
                encryptedData: encryptedData,
                iv: iv
              }
              wx.showLoading({
                title: '登录中...',
              });
              //向自己的后台发送请求   
              api._post(url, data, (success) => {
                if (success.data.status == 0) {
                  /** do your job */
                  //存储userInfo
                  let userInfo = success.data.data;
                  app.globalData.userInfo = userInfo;                 
                  wx.setStorageSync('userInfo', userInfo)
                  _this.setData({
                    userInfo: userInfo,
                    hasUserInfo: true
                  });
                  
                } else {
                  _this.reLogin();
                }
              }, (fail) => {
                console.log(fail)
              }, (complete) => {
                setTimeout(function () {
                  wx.hideLoading();
                }, 1000)
              }, 1)
            }
          }
        })
      },
      fail(err) {
        // 已经失效，需要重新执行登录流程
        _this.reLogin();
      }
    })
  },
  getPhoneNumber (e) { //点击获取手机号码按钮
    var _this = this, detail = e.detail;
    let ency = detail.encryptedData;
    let iv = detail.iv;
    if (detail.errMsg == "getPhoneNumber:fail user deny") {
      //拒绝
      _this.setData({
        modalstatus: true
      });
      return false;
    } else {
      // 登录态过期 获取code换取手机号 同意授权
      wx.login({
        success: res => {
          console.log(res);
          let parms = {
            code: res.code,
            token: _this.data.userInfo.token,
            encryptedData: ency,
            iv: iv,
            registerCode: _this.data.registerCode
          };
          wx.showLoading({
            title: '加载中...'
          });
          api._post('url', parms, (success) => {
            if (success.data.status == 0) {
              /** 拿到后端返回的数据 */
            
              
            } else if (success.data.status == -2) {
              //授权失败
              //提示授权解析失败 重新获取手机号
              operate.hintToast('解析失败，请重试');
            };
          }, (fail) => {
            console.log(fail)
          }, (complete) => {
            console.log('complete')
            wx.hideLoading();
          }, 1)
        },
      });
    }
  },

})
