
import { Base } from '../../../utils/base.js';

class Detail extends Base {
	constructor() {
		super();
	}
	//获取艺术家作品详情
	getProductInfo(id, callback) {
		var param = {
			url: 'exhibition/worksDetails?id=' + id,
			sCallback: function (data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}

	//获取传统商品当前分类下推荐商品（商品前5个）
	getMoreByCategory(id, callback) {
		var param = {
			url: 'exhibition/artistDetails?id=' + id ,
			sCallback: function (data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}

};

export { Detail }
