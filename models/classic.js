import {HTTP} from '../util/http.js'

class ClassicModel extends HTTP{
  getLatest(){
    return this.request({
      url:'/classic/latest'
    })
  }
  getClassic(index, prevOrNext) {//根据prevOrNext判断上一期还是下一期
    return this.request({
      url: '/classic/' + index + '/' + prevOrNext,
    })
  }
  getMyFavor() {
    return this.request({
      url: '/classic/favor',
    })
  }
}

export { ClassicModel}