const paginationBev = Behavior({//封装分页逻辑
  data: {
    dataArray: [],
    total: 0,
    noResult: null,
    loading:false
  },
  methods: {
    setMoreData(dataArray) {//获取更多数据
      const temp = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: temp
      })
    },
    setTotal(total) {//获取总数
      this.data.total = total
      if (total == 0) {//总数为0，显示没有搜索到书籍
        this.setData({
          noResult: true
        })
      }
    },
    getCurrentStart() {//获取当前开始下标
      return this.data.dataArray.length
    },
    hasMore() {//是否还有更多
      if (this.data.dataArray.length >= this.data.total) {
        return false
      } else {
        return true
      }
    },
    init() {//初始化书籍数组，总是，空结果
      this.setData({
        dataArray: [],
        total: 0,
        noResult: false,
        loading: false
      })
    },
    isLocked() {//锁的概念，接收到数据才可以继续发送请求
      return this.data.loading ? true : false
    },
    locked() {
      this.setData({
        loading: true
      })
    },
    unLocked() {
      this.setData({
        loading: false
      })
    }
  }
})
export { paginationBev }