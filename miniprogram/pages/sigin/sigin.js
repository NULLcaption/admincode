// miniprogram/pages/sigin/sigin.js
var util = require('../../utils/util.js');
var app = getApp();
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
    console.log("[地址：]" + this.data.address)
    console.log("[时间：]" + this.data.date)
    wx.request({
      url: app.globalData.apiUrl + '/sigin',
      data: {
        address: this.data.address,
        date: this.data.date,
        openid: app.globalData.openid,
      },
      success(res) {
        console.log("[返回值]" + res.data)
        if (res.data == "success") {
          wx.showToast({
            title: '签到成功',
            duration: 2000
          })
          wx.navigateBack({
            delta : 1
          })
        } else {
          wx.showToast({
            title: '签到失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
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
        console.log(res)
        wx.chooseLocation({
          success: function (res) {
            console.log("{用户签到地址}："+res.address)
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