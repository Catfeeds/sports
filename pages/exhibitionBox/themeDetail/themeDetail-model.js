
import { Base } from '../../../utils/base.js';

class ThemeDetail extends Base {
	constructor() {
		super();
	}

	//获取展览盒子下专题列表
	getThemeDetail(id, callback) {
		var param = {
			url: 'theme/product/' + id,
			sCallback: function (data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
}

export { ThemeDetail };