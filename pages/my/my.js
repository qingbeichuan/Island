import { BookModel } from '../../models/book.js'
import { ClassicModel } from '../../models/classic.js'

let bookModel = new BookModel()
let classicModel = new ClassicModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    myBooksCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getMyBookCount()
    this.userAuthorized()
    this.getMyFavor()
  },
  userAuthorized() {//判断用户是否授权
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({//用户未授权
            success: (res) => {
              // console.log(res)
              this.setData({
                authorized: true,
                userInfo: res.userInfo
              })
            }
          })
        } else {
          console.log('err')
        }
      }
    })
  },
  onGetUserInfo(e) {//获取用户信息
    if (e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo,
        authorized: true,
      })
    }
  },
  getMyBookCount() {//获取点赞数量
    bookModel.getMyBookCount().then((res)=>{
      this.setData({
        myBooksCount: res.count
      })
    })
  },
  getMyFavor() {//获取点赞书籍
    classicModel.getMyFavor().then((res)=>{
      this.setData({
        classics: res
      })
    })
  }
})