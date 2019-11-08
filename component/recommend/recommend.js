// component/recommend/recommend.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    navList: [
      { title: '推荐', active: true},
      { title: '附近', type:'nearby', active: false},
      { title: '视频', active: false },
      { title: '美食', active: false },
      { title: '时尚', active: false },
      { title: '护肤', active: false },
      { title: '彩妆', active: false },
      { title: '明星', active: false },
      { title: '健身', active: false },
      { title: '旅行', active: false },
      { title: '家居', active: false },
      { title: '读书', active: false },
      { title: '宠物', active: false },
      { title: '影视', active: false },
      { title: '数码', active: false }
    ],
    isNearby: false,   // 是否是附近页
    hasLocation: false,  // 是否有位置信息
    locationInfo: {}
  },

  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      // console.log('加载组件')
    },
  },
  pageLifetimes: {
    show: function () {
      // 页面被展示
      // console.log('show')
      // 判断地理位置信息
      if (app.globalData.locationInfo.latitude) {
        this.setData({
          hasLocation: true,
          locationInfo: {
            latitude: app.globalData.locationInfo.latitude,
            longitude: app.globalData.locationInfo.longitude
          }
        })
      }
    },
    hide: function () {
      // 页面被隐藏
      // console.log('hide')
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     *  切换关键词
     */
    changeRecommend (e) {
      let index = e.currentTarget.dataset.index
      let type = e.currentTarget.dataset.type
      let list = this.data.navList
    
      list.forEach((item, i) => {
        if (i === index) {
          item.active = true
        } else {
          item.active = false
        }
      })
      this.setData({
        navList: list
      })
      if (type === 'nearby') {
        this.setData({
          isNearby: true
        })
        wx.getLocation({
          type: 'gcj02', //返回可以用于wx.openLocation的经纬度
          success: (res) => {
            console.log(res)
            const latitude = res.latitude
            const longitude = res.longitude
            app.globalData.locationInfo = {
              latitude,
              longitude
            }
            this.setData({
              hasLocation: true,
              locationInfo: {
                latitude,
                longitude
              }
            })
          },
          fail (res) {
            console.log('拒绝获取位置信息')
            // 拒绝获取位置信息，跳转到设置页面 
            wx.navigateTo({url: '/pages/setting/setting'})
          }
        })
      } else {
        this.setData({
          isNearby: false
        })
      }
    }
  }
})
