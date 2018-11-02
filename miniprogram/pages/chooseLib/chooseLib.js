// pages/chooseLib/chooseLib.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scanCodeInfo:''
  },

  /**
   * 扫码验证
   */
  submitFun:function() {
    console.log("扫一扫获取二维码")
    var scanCodeInfo = "";
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
        wx.request({
          url: app.globalData.apiUrl+'/userInfo',
          data : {
            scanCodeInfo: res.result
          },
          success(res) {
            console.log("[返回值]"+res.data)
            if (res.data == "success") {
              wx.showToast({
                title: '该用户可以领取',
                icon: 'none',
                duration: 2000
              })
            } else {
              wx.showToast({
                title: '该用户领取过了',
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
        // that.setData({
        //   scanCodeInfo: res.result
        // })
        // wx.showToast({
        //   title: '扫描成功',
        //   icon: 'success',
        //   duration: 2000
        // })
      },
      fail: (res) => {
        wx.showToast({
          title: '扫描失败',
          icon: 'error',
          duration: 2000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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