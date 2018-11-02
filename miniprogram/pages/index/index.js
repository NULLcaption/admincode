//index.js
const app = getApp()

Page({
  data: {
  },

  onLoad: function() {
    code: ''
  },
  //输入端的验证码
  bindKeyCode: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  //验证管理员身份
  submitFun: function () {
    wx.request({
      url: app.globalData.apiUrl+'/adminCode',
      data : {
        code: this.data.code,
        openid: getApp().globalData.openid
      },
      success(res) {
        if (res.data == "error") {
          wx.showToast({
            title: '验证错误,认证失败.',
            icon : "none",
            duration: 2000
          })
        } else {
          console.log("[认证成功]")
          wx.navigateTo({
            url: '/pages/signIndex/siginIndex',
          })
        }
      }
    })
  },
})
