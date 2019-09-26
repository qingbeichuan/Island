import { ClassicModel} from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'

const classicModel=new ClassicModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic:null,
    latest: true,//默认最新一期
    first: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    classicModel.getLatest().then((res)=>{
      this.setData({
        classic:res
        //...res
      })
      //缓存最新一期期刊号
      wx.setStorageSync('latest', res.index)
    })
  },
  onLike(e){//自定义事件
    let behavior = e.detail.behavior//获取子组件的点赞还是取消点赞
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },
  onNext(){
    this._updateClassic('next')//下一期
  },
  onPrev(){
    this._updateClassic('previous')//上一期
  },
  _updateClassic(prevOrNext){
    let index = this.data.classic.index
    classicModel.getClassic(index, prevOrNext).then((res) => {//获取期刊
      // console.log(res)
      this.setData({
        classic: res,
        latest: res.index == wx.getStorageSync('latest') ? true : false,
        first: res.index == 1 ? true : false
      })
    })
  }
})