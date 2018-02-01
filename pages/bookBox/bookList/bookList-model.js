
import { Base } from '../../../utils/base.js';

class BookList extends Base {
	constructor() {
		super();
	}

	//获取图书盒子下专题列表
	getZhuantiList(id, callback) {
		var param = {
			url: 'theme/products/' + id,
			sCallback: function (data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}

	//筛选专题
	selectTheme(id,callback){
		var param = {
			url: 'product/search?category_id=6&theme_id=' + id,
			sCallback: function (data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}

	/*获得某种分类下所有传统商品*/
	getProductsByCategory(id, callback) {
		var param = {
			url: 'product/by_category?id=' + id + '&summary=2',
			sCallback: function (data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}

	//获取分类信息
	getProductorData(id, callback) {
		var param = {
			url: 'theme/' + id,
			sCallback: function (data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
}

export { BookList };