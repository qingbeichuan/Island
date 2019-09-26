import { config } from '../config.js'

const tips = {
  1: 'sorry,error',
  1005: 'appkey无效',
  3000: '期刊不存在'
}
class HTTP{
  request({url,data,method="GET"}){
    return new Promise((resolve,reject)=>{
      wx.request({
        url: config.api_base_url + url,
        data:data,
        method: method,
        header:{
          'content-type': 'application/json',
          'appkey': config.appkey
        },
        success:(res)=>{
          if (res.statusCode.toString().startsWith('2')) {
            resolve(res.data)
          } else {
            reject()
            this._show_error(res.data.error_code)
          }  
        },
        fail: (err) => {
          reject()
          this._show_error(1)
        }
      })
    })
  }
  _show_error(error_code) {//代表私有方法
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}

export {HTTP}