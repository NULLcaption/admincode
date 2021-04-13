// miniprogram/pages/signIndex/siginIndex.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 确认配发页面
   */
  submitFun: function() {
    wx.navigateTo({
      url: '/pages/chooseLib/chooseLib',
    })
  },
  /**
   * 签到页面
   */
  submitFun1: function () {
    wx.navigateTo({
      url: '/pages/sigin/sigin',
    })
  },
  /**
   * 活动拍照页面
   */
  submitFun2: function () {
    this.doUpload();
  },
  
  // 上传图片
  doUpload: function () {
    console.log("app.globalData.planId:" + app.globalData.planId)
    if (app.globalData.openid == ''
      || app.globalData.storeId == '' || app.globalData.openid == 'null') {
      wx.navigateTo({
        url: '/pages/index/index',
      })
    }
    if (app.globalData.planId == 'null' || app.globalData.planId == '') {
      wx.navigateTo({
        url: '/pages/index/index',
      })
    }
    // 选择图片
    wx.chooseImage({
      count: 1,//最多可以选择的图片总数  
      sizeType: ['compressed'],// 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['camera', 'album'],// 可以指定来源是相册还是相机，默认二者都有  'album'
      success: function (res) {
        //上传等待
        wx.showLoading({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 500  
        })
        //文件路径
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const filePath = res.tempFilePaths;
        // 上传图片
        var uploadImgCount = 0;  
        for (var i = 0; i <= filePath.length; i++) {
          // const cloudPath = 'my-image' + filePath[i].match(/\.[^.]+?$/)[0];
          wx.uploadFile({
            url: app.globalData.apiUrl+'/upload',
            filePath: filePath[i],
            name: 'file',
            header: {
              "Content-Type": "multipart/form-data"
            },
            formData: {
              planId: app.globalData.planId+'',
              openId: app.globalData.openid+'',
              index : i+'',
            },
            success: function (res) {
              console.log("[res.data]:" + res.data)
              if (res.data == 'success') {
                uploadImgCount++;
                //如果是最后一张,则隐藏等待中
                if (uploadImgCount == filePath.length) { 
                  wx.showToast({
                    icon: 'none',
                    title: '图片上传成功！',
                  })
                }
              } else if (res.data == 'error_1') {
                wx.showToast({
                  icon: 'none',
                  title: '请先签到后再上传',
                })
              } else if (res.data == 'error_2') {
                wx.showToast({
                  icon: 'none',
                  title: '数据保存失败',
                })
              } else {
                wx.showToast({
                  icon: 'none',
                  title: '图片上传失败',
                })
              }
            },
          })
        }
      },
      fail: e => {
        console.error(e)
      }
    })
  },

  /**
   * 现场扫码核销
   */
  submitFun3: function(){
    wx.scanCode({
      onlyFromCamera: true,
      success (res) {
        wx.request({
          url: app.globalData.apiUrl + '/submit1',
          data: {
            planId: res.result
          },
          success(res) {
            if (res.data.code == 0) {
              wx.showModal({
                title: '提示',
                content: '用户核销成功！',
                success (res) {
                  if (res.confirm) {
                    wx.navigateBack({
                      delta: 0,
                    })
                  } else if (res.cancel) {
                    wx.navigateBack({
                      delta: 0,
                    })
                  }
                }
              })
            } else {
              wx.showModal({
                title: '注意',
                content: '该用户已经参加过活动了，不能再领取了！',
                success (res) {
                  if (res.confirm) {
                    wx.navigateBack({
                      delta: 0,
                    })
                  } else if (res.cancel) {
                    wx.navigateBack({
                      delta: 0,
                    })
                  }
                }
              })
            }
          }
        })
      }
    })
  },
})