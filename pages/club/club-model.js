
import { Base } from '../../utils/base.js';

class Club extends Base {
  constructor() {
    super();
  }
  //获取场馆详情
  getClubInfo(id, callback) {
    var param = {
      url: 'venue/' + id,
      sCallback: function (res) {
        callback && callback(res);
      }
    };
    this.request(param);
  }

  //获取七天内课程列表
  getLessonInfo(id, callback) {
    var param = {
      url: 'course/courseTimeList?id=' + id,
      sCallback: function (res) {
        callback && callback(res);
      }
    };
    this.request(param);
  }

};

export { Club }
