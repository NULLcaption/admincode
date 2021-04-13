// miniprogram/pages/sigin/sigin.js
var util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: util.formatTime(new Date()),
    address : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserAddress();
  },

  /**
   * 签到按钮
   */
  submitFun: function(e){
    console.log("app.globalData.planId:" + app.globalData.planId)
    var that = this;
    if (that.data.address == '' || that.data.date == "") {
      wx.showToast({
        icon: 'none',
        title: '签到地址为空',
      });
      return;
    }
    if (app.globalData.planId == 'null' || app.globalData.planId == '') {
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }
    new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.apiUrl + '/sigin',
        data: {
          address: this.data.address,
          date: this.data.date,
          openid: app.globalData.openid,
          avatarUrl: app.globalData.userInfo.avatarUrl,
          nickName: app.globalData.userInfo.nickName,
          planId: app.globalData.planId,
        },
        success(res) {
          if (res.data == "success") {
            wx.redirectTo({
              url: '/pages/signIndex/siginIndex',
            })
          } else {
            wx.showToast({
              title: '签到失败，请返回重试',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }, 5000)

  },

  /**
   * 获取签到地址
   */
  getUserAddress: function() {
    var that = this;
    var address;
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        wx.chooseLocation({
          success: function (res) {
            that.setData({
              address: res.address
            })  
          },
        })
      }
    }) 
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})