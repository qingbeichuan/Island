// components/search/search.js
import { KeywordModel } from '../../models/keyword.js'
import { paginationBev } from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],//分页
  properties: {
    more:{
      type:String,
      observer:'_loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    finished:false,
    q:'',
    loading:false,
    loadingCenter: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _loadMore(){
      console.log(123)
      if (!this.data.q) {//没有关键字，不搜索
        return
      }
      if (this.isLocked()) {//正在加載
        return
      }
    
      console.log(this.hasMore())
      if(this.hasMore()){
        this.locked()
        keywordModel.search(this.getCurrentStart(), this.data.q).then((res) => {
          // const tempArray=this.data.dataArray.concat(res.books)
          this.setMoreData(res.books)
          this.unLocked()
        })
      }
    },
    onCancel(e) {
      this.init()
      this.triggerEvent('cancel', {}, {})
    },
    onConfirm(e) {
      this.init()
      this.setData({//开始搜索
        finished: true,
        loadingCenter: true
      })
      const q = e.detail.value || e.detail.text
      console.log(e.detail.text)
      keywordModel.search(0,q).then((res)=>{//搜索书籍
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this.setData({
          loadingCenter: false,
          q:q//点击标签，绑定数据到输入框
        })
        keywordModel.addToHistory(q)//把关键字写入缓存
      })
    },
    onDelete(){
      this.init()
      this.setData({
        finished: false,
        q:'',
        loadingCenter: false,
      })
    },

    // _isLocked(){//锁的概念，接收到数据才可以继续发送请求
    //   return this.data.loading?true:false
    // },
    // _locked(){
    //   this.setData({
    //     loading: true
    //   })
    // },
    // _unLocked() {
    //   this.setData({
    //     loading: false
    //   })
    // }
  },

  attached() {
    let history = keywordModel.getHistory()//获得历史关键字
    let hotWords = keywordModel.getHot()
    this.setData({
      history
    })
    hotWords.then((res) => {//获得热门关键字
      this.setData({
        hotWords: res.hot
      })
    })
  },
})
