// components/nav/nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    first: Boolean,
    latest: Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: '../images/triangle.dis@left.png',
    leftSrc: '../images/triangle@left.png',
    disRightSrc: '../images/triangle.dis@right.png',
    rightSrc: '../images/triangle@right.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft(){//最新一期无法点击左按钮
      !this.properties.latest && this.triggerEvent('left',{})
    },
    onRight(e) {//最早一期无法点击右按钮
      !this.properties.first && this.triggerEvent('right', {})
    }
  }
})
