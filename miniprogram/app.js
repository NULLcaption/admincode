//app.js
App({
  onLaunch: function () {
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
              app.globalData.session_key = res.data.session_key;
            },
            fail(res) {
              console.log("-----request fial-----")
            }
          })
        } else {
          console.log("" + res.errmsg)
        }
      }
    });
  },
  //全局变量
  globalData: {
    apiUrl: "https://ssl.zjxpp.com/api/wx/admin",
    // apiUrl: "http://10.3.25.11:8099/api/wx/admin",
    userInfo: null,
    openid: null,
    session_key: null,
    planId: null
  }
})
