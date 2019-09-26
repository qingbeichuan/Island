import { HTTP } from '../util/http.js'

class LikeModel extends HTTP {
  like(behavior,artID,category) {
    return this.request({
      url: behavior?'/like':'/like/cancel',
      method:"POST",
      data:{
        art_id: artID,
        type: category
      }
    })
  }
}

export { LikeModel }