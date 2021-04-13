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
  submitLogin: function () {
    this.getUserProfile();
    new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.apiUrl+'/adminCode',
        data : {
          code: this.data.code
        },
        success(res) {
          if (res.data == "error") {
            wx.showToast({
              title: '验证错误,认证失败.',
              icon : "none",
              duration: 2000
            })
          } else {
            if (res.data != 0) {
              console.log("res.data:" + res.data)
              app.globalData.planId = res.data
              console.log("app.globalData.planId:" + app.globalData.planId)
              wx.redirectTo({
                url: '/pages/signIndex/siginIndex',
              })
            } else {
              wx.showToast({
                title: '验证错误,请重新验证.',
                icon: "none",
                duration: 2000
              })
            }
          }
        }
      })
    }, 5000)
  },
  //新版获取用户信息
  getUserProfile:function() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        app.globalData.userInfo = res.userInfo;
        this.submitLogin();
      }
    })
  },
})
