
import { Base } from '../../../utils/base.js';

class ArtistDetail extends Base {
	constructor() {
		super();
	}
	// 获取展览盒子下艺术家详情
	getArtistDetail(id,callback) {
		var param = {
			url: 'exhibition/artistDetails?id='+id,
			sCallback: function (data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
}

export { ArtistDetail };