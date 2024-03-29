// components/episode.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {//后面使用wxs
    index: {
      type: String,
      observer: function (newVal, oldVal, changedPath) {
        let val = newVal < 10 ? '0' + newVal : newVal
        this.setData({//不要在属性内部修改属性本身
          _index: val
        })
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    year: 0,
    month: '',
    _index: '',
    months: [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月',
      '十二月'
    ],
  },
  ready: function () {
    let date = new Date()
    let month = date.getMonth()
    let year = date.getFullYear()
    this.setData({
      month: this.data.months[month],
      year
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
