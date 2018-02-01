
import { Base } from '../../utils/base.js';

class Time extends Base {
	constructor() {
		super();
	}

	//获取预约课程详情
	getTimeInfo(id, minPrice, callback) {
		var param = {
			url: 'course/curriculum/details?id=' + id + '&minPrice=' + minPrice,
			sCallback: function (data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}

	//获取传统商品当前分类下推荐商品（商品前5个）
	getMoreByCategory(type, callback) {
		console.log(type)
		var param = {
			url: 'course/curriculum/?id=' + type,
			sCallback: function (data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
};

export { Time }
