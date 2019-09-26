// components/like/like.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {//对外开放的数据
    like:{
      type: Boolean
    },
    count: {
      type: Number
    },
    readOnly:{
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {//封装在内部的数据
    yesSrc: '../images/like.png',
    noSrc: '../images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(e){
      if(this.properties.readOnly){//禁止点赞功能，只做展示用
        return 
      }
      let like = this.properties.like
      let count = this.properties.count
      count = like ? count - 1 : count + 1//减一或加一，不可--或++
      this.setData({
        like: !like,
        count: count
      })

      //自定义事件
      let behavior = this.properties.like
      this.triggerEvent('like',{//第二个参数代表detail对象
        behavior: behavior
      },{})
    }

    
  }
})
