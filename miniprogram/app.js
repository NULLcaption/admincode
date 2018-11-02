//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 初始化并调用云函数
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    // 登录
    //通过发送 res.code 到后台换取 openId, sessionKey, unionId
    wx.login({
      success(res) {
        console.log("{res.code}:" + res.code)
        if (res.code) {
          wx.request({
            url: getApp().globalData.apiUrl + '/weChatInfo',
            data: {
              code: res.code
            },
            success(res) {
              console.log("{res.data.openid}:", res.data.openid);
              console.log("{res.data.session_key}:", res.data.session_key);
              const app = getApp();
              app.globalData.openid = res.data.openid;
              app.globalData.userInfo = res.data.session_key;
              //后可以根据注册过的openid来获取用户的相关的信息
              // if (!res.data.mobile) {
              //   wx.reLaunch({
              //     url: "/pages/bindPhone/index"
              //   });
              // }
            },
            fail(res) {
              console.log("-----request fial-----")
            }
          })
        } else {
          console.log("" + res.errmsg)
        }
      }
    }),
      // 获取用户微信中的信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo
                console.log(res.userInfo)
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      })
  },
  //全局变量
  globalData: {
    apiUrl: "http://10.3.3.32:8080/api/wx",
    userInfo: null,
    openid: null,
    session_key: null
  }
})
