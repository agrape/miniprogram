// component/recommend/recommend.js
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
      { title: '附近', active: false},
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
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeRecommend (e) {
      let index = e.currentTarget.dataset.index
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
    }
  }
})
