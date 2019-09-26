import { HTTP } from '../util/http.js'

class KeywordModel extends HTTP {
  constructor() {
    super()
    this.key = 'q',
    this.maxLength = 10
  }
  getHistory() {//获取历史关键字
    return wx.getStorageSync(this.key) ? wx.getStorageSync(this.key) : []
  }

  addToHistory(keyword) {//写入缓存
    let words = this.getHistory()
    let has = words.includes(keyword)
    if (!has) {
      if (words.length >= this.maxLength) {
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }

  getHot() {//获取热门关键词
    return this.request({ url: '/book/hot_keyword' })
  }

  search(start, q) {
    return this.request({
      url: '/book/search?summary=1',
      data: {
        start: start,
        q: q
      }
    })
  }
}
export { KeywordModel }