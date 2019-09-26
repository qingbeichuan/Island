// pages/bookDetail/bookDetail.js
import { BookModel } from '../../models/book.js'
import { LikeModel } from '../../models/like.js'
const bookModel = new BookModel()
const likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: null,
    comments: [],
    noComment: true,
    posting: false,//底部输入框显示隐藏
    likeStatus: false,
    likeCount: 0 //书籍点赞数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    const bid = options.bid
    const detail = bookModel.getDetail(bid)//书籍详细信息
    const comments = bookModel.getComments(bid)//短评
    const likeStatus = bookModel.getLikeStatus(bid)//喜欢状态
    Promise.all([detail, likeStatus, comments]).then((res) => {
      console.log(res)
      this.setData({
        book: res[0],//书籍详细信息
        likeStatus: res[1].like_status,
        likeCount: res[1].fav_nums,
        comments: res[2].comments,
        noComment: res[2].comments.length ? false : true,
      })
      wx.hideLoading()
    })
  },
  onLike(e) {//点赞
    let like_or_cancel = e.detail.behavior
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },
  onFakePost() {//弹出遮罩
    this.setData({
      posting: true
    })
  },
  onCancel() {//隐藏真实输入框
    this.setData({
      posting: false
    })
  },
  onPost(e) {//发送评论
    let commemt = e.detail.value
    console.log(e.detail.value)
    if (commemt.length>12){
      wx.showToast({
        title: '短评最多12个字',
      })
      return
    }
    bookModel.postComment(this.data.book.id, commemt).then(res => {
      this.data.comments.unshift({//显示刚刚输入的短评，排在第一
        content: commemt,
        nums:1
      })
      this.setData({//更新短评数据
        comments: this.data.comments,
        posting: false
      })
    })
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

  }
})