// component/card/card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    'list': {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    dataList: [], //数据源
    windowWidth: 0, //页面视图宽度
    windowHeight: 0, //视图高度
    imgMargin: 10, //图片边距: 单位px
    imgWidth: 0,  //图片宽度: 单位px
    topArr: [0, 0], //存储每列的累积top
  },
  /**
   * 组件生命周期
   */
  lifetimes: {
    ready: function () {
      wx.showLoading({
        title: '加载中...',
      })

      var that = this;
      //获取页面宽高度
      wx.getSystemInfo({
        success: function (res) {
          console.log(res)

          let windowWidth = res.windowWidth;
          let imgMargin = that.data.imgMargin;
          //两列，每列的图片宽度
          let imgWidth = (windowWidth - imgMargin * 3) / 2;

          that.setData({
            windowWidth: windowWidth,
            windowHeight: res.windowHeight,
            imgWidth: imgWidth
          }, function () {
            that.loadMoreImages(); //初始化数据
          });
        },
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //加载图片
    loadImage: function (e) {
      let index = e.currentTarget.dataset.index; //图片所在索引
  
      let imgW = e.detail.width, imgH = e.detail.height; //图片实际宽度和高度
      let imgWidth = this.data.imgWidth; //图片宽度
      let imgScaleH = imgWidth / imgW * imgH;  // 计算图片应该显示的高度
      let dataList = this.data.dataList;
      let margin = this.data.imgMargin;  //图片间距
      //第一列的累积top，和第二列的累积top
      let firtColH = this.data.topArr[0], secondColH = this.data.topArr[1];

      let card = this.data.dataList[index];
      if (card.info.title.length > 11) {
        dataList[index].height = imgScaleH + 87 +6;
      } else {
        dataList[index].height = imgScaleH + 65 +6;
      }
      
      if (firtColH <= secondColH) { //表示新图片应该放到第一列
        dataList[index].left = margin;
        dataList[index].top = firtColH + margin;
        firtColH += margin + dataList[index].height;
      } else { //放到第二列
        dataList[index].left = margin * 2 + imgWidth;
        dataList[index].top = secondColH + margin;
        secondColH += margin + dataList[index].height;
      }
      this.setData({
        dataList: dataList,
        topArr: [firtColH, secondColH],
      });
  
    },
    //加载更多图片
    loadMoreImages: function () {
      if (this.data.dataList.length < 40) {
        let imgList = this.properties.list
        let tmpArr = [];
        for (let i = 0; i < imgList.length; i++) {
          let obj = {
            info: imgList[i],
            height: 0,
            top: 0,
            left: 0,
          }
          tmpArr.push(obj);
        }

        let dataList = this.data.dataList.concat(tmpArr)
        this.setData({ dataList: dataList }, function () {
          wx.hideLoading()
        });
      } else {
        wx.showToast({ title: '没有更多数据了', icon: 'none'})
      }
    },
  }
})
