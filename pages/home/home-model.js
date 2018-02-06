
import { Base } from '../../utils/base.js';

class Home extends Base {

  constructor() {
    super();
  }

  //根据经纬度获取场馆列表
  getClubList(longitude, latitude, callback) {
    var params = {
      url: 'venue/venueList?longitude=' + longitude + '&latitude=' + latitude,
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }
}
export { Home };