// pages/shoppingMall/shoppingMall.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    giftStatus: false,
    animation: '',
    systemInfo: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 定义一个 CanvasKit 类
    class CanvasKit {
      // constructor是一个构造方法，用来接收参数
      constructor() {

      }

      //这是一个类的方法，注意千万不要加上function
      drawImg(option = {}) {

      }
      drawRect(option = {}) {

      }
      drawText(option = {}) {

      }
      exportImg(option = {}) {
        // console.log(2222)
      }
    }


    let userInfo = wx.getStorageSync('userInfo')
    console.log('userInfo',userInfo)
    // let drawer = new CanvasKit('canvas')
    // drawer.exportImg()
    // console.log(drawer)

    // wx.showToast({ title: userInfo.avatarUrl })




    wx.getImageInfo({
      src: userInfo.avatarUrl,
      success: (res) => {
        const ctx = wx.createCanvasContext('canvas')
        ctx.setGlobalAlpha(0.2)
        ctx.setFillStyle('#000')
        ctx.drawImage('../../static/images/bg.jpg', 0, 0, 250, 400)
        // ctx.fillRect(0, 0, 250, 400)

        ctx.setGlobalAlpha(1)

        ctx.save()
        ctx.beginPath()
        
        ctx.arc(30, 25, 20, 0, 2 * Math.PI)
        ctx.setFillStyle('pink')
        ctx.setStrokeStyle('#ffffff');   // 设置描边颜色
        ctx.stroke();         // 画出当前路径的边框
        ctx.clip();
        ctx.drawImage(res.path, 10, 5, 40, 40)
        ctx.restore()
        ctx.draw()

        ctx.setFontSize(18)
        ctx.setFillStyle('#999')
        ctx.fillText(`hello ${userInfo.nickName}`, 60, 35)
        ctx.setFontSize(22)
        ctx.setTextAlign('center')
        ctx.setFillStyle('#db639b')
        ctx.fillText('您有一个礼物 🎁', 125, 75)
        ctx.drawImage('../../static/images/poster.jpg', 0, 90, 250, 200)

        ctx.draw(true)
      },
      fail: (err) => {
        wx.showToast({title: err})
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getSystemInfo() {
    if (app.globalData.systemInfo) {
      this.setData({
        systemInfo: app.globalData.systemInfo
      })
    } else {
      //获取页面宽高度
      wx.getSystemInfo({
        success: (res) => {
          this.setData({
            systemInfo: res
          })
          app.globalData.systemInfo = res
        },
      })
    }
    return this.data.systemInfo
  },
  showGift() {
    //实例化一个动画
    let animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear',
      delay: 0,
      transformOrigin: 'bottom 0 top', // 基点
      success: (res) => {
        console.log('success', res)
      }
    })
    if (app.globalData.systemInfo) {
      this.setData({
        systemInfo: app.globalData.systemInfo
      })
    } else {
      //获取页面宽高度
      wx.getSystemInfo({
        success: (res) => {
          this.setData({
            systemInfo: res
          })
          app.globalData.systemInfo = res
        },
      })
    }
    let height = -(this.data.systemInfo.windowHeight / 2)
    animation.translate(0, height).scale(2, 2).step()
    this.setData({
      animation: animation.export()
    })
  },
  /**
   * 生成海报
   */
  saveImage () {
    wx.saveImageToPhotosAlbum({
      filePath: '/static/images/gift.jpg',
      complete: () => {
        wx.showToast({ title: '去您的相册查看哦😯', icon: 'none'})
      }
    })
  },
  /**
   * 保存canvas图片
   */
  saveCanvas () {
    wx.canvasToTempFilePath({
      canvasId: 'canvas',
      success: (res) => {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          complete: () => {
            wx.showToast({ title: '去您的相册查看哦😯', icon: 'none' })
          }
        })
      }
    }, this)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // if (Math.random() > 0.5) {
    //   console.log('show')
    //   this.setData({
    //     giftStatus: true
    //   })
    //   this.showGift()
    // }
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (this.data.giftStatus) {
      //实例化一个动画
      let animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'linear',
        delay: 0,
        // transformOrigin: 'bottom 0 top', // 基点
        success: (res) => {
          console.log('success', res)
        }
      })
      animation.translate(0, this.data.systemInfo.windowHeight).scale(1, 1).step()
      this.setData({
        animation: animation.export(),
        giftStatus: false
      })
    }
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