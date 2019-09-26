import {BookModel} from '../../models/book.js'
const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
    searchPanel: false,
    more: ''//是否還有更多
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bookModel.getHotList().then((res)=>{
      // console.log(res)
      this.setData({
        books:res
      })
    })
  },
  onActivateSearch(){
    this.setData({
      searchPanel:true
    })
  },
  onCancel() {
    this.setData({
      searchPanel: false
    })
  },
  onReachBottom() {
    this.setData({
      more: Math.random().toString().slice(2)//属性改变。observer监听
    })
  }
})