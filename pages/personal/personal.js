// pages/personal/personal.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')  // 判断小程序的API，回调，参数，组件等是否可用
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      // 已获取用户信息
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      console.log(this.data.userInfo)
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }

      console.log(111, this.data.userInfo)
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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

  },
  getUserInfo (e) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log(e)
          app.globalData.userInfo = e.detail.userInfo
          this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
          })
          wx.setStorageSync('userInfo', e.detail.userInfo)
        } else {
          console.log('拒绝了授权')
        }
      }
    })
    
  },
  bindViewTap () {

  },
  /**
   * 生成海报
   */
  createPoster () {
    // 定义一个 CanvasKit 类
    class CanvasKit{
      // constructor是一个构造方法，用来接收参数
      constructor() {

      }

      //这是一个类的方法，注意千万不要加上function
      drawImg(option={}) {

      }
      drawRect(option={}) {

      }
      drawText(option = {}) {
        
      }
      exportImg(option = {}) {
        // console.log(2222)
      }
    }


    let drawer = new CanvasKit()
    // drawer.exportImg()
    console.log(drawer)
  }
})