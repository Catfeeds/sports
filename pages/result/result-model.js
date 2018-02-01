
import { Base } from '../../utils/base.js';

class Result extends Base {
	constructor() {
		super();
	}
	/*获取开锁信息*/
	getLockInfo(uid,tid,lock, callback) {
		var param = {
			url: '/doors/small_program?user_id='+uid+'&time_id='+tid+'&device_name='+lock,
			sCallback: function (data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
}

export { Result };