// components/classic/music/music.js
const bAM = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    img: String,
    content: String,
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseUrl: '../../images/player@waitting.png',
    playUrl: '../../images/player@playing.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay() {
      if (!this.data.playing) {//播放
        this.setData({
          playing: true
        })
        bAM.src = this.properties.src
        bAM.title = this.properties.title
      } else {//暂停
        this.setData({
          playing: false
        })
        bAM.pause()
      }
    },
    recoverStatus() {//恢复按钮播放状态
      if (bAM.paused) {//当前无音乐播放
        this.setData({
          playing: false
        })
        return
      }
      if (bAM.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },
    monitorSwitch() {
      bAM.onPlay(() => {
        this.recoverStatus()
      })
      bAM.onPause(() => {
        this.recoverStatus()
      })
      bAM.onStop(() => {
        this.recoverStatus()
      }),
        bAM.onEnded(() => {
          this.recoverStatus()
        })
    }
  },
  // wx:if触发生命周期，hidden不触发
  attached() {
    this.recoverStatus()
    this.monitorSwitch()
  },
  detached() {

  }
})
