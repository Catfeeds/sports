
import { Time } from 'time-model.js';
import { Cart } from '../cart/cart-model.js';
import { Category } from '../category/category-model.js';

var time = new Time();  //实例化 商品详情 对象
var cart = new Cart();
var category = new Category;

var WxParse = require('../../wxParse/wxParse.js');

Page({
	data: {
		isFly: true,
		currentTabsIndex: 0,
		content: null
	},
	onLoad: function (options) {
		this.setData({
			id: options.id,
			type: options.type,
			minprice: options.minprice,
		})
		this._loadData();
	},

	/*加载所有数据*/
	_loadData: function (callback) {
		var that = this;
			//获取预约课程详情
		time.getTimeInfo(this.data.id, this.data.minprice, (data) => {
			console.log(data)
			that.setData({
				product: data,
				content: WxParse.wxParse('content', 'html', data.content, that, 5)
			});
			callback && callback();
			//获取当前商品分类下所有商品作为推荐商品
			//注意异步问题
			time.getMoreByCategory(this.data.type, (res) => {
				that.setData({
					moreProductsArr: res.data
				})
			})
		});
	},

	//商品详情点击更多商品
	onTimeItemTap: function (event) {
		var id = category.getDataSet(event, 'id');
		var type = category.getDataSet(event, 'type');
		var minprice = category.getDataSet(event, 'minprice');
		wx.redirectTo({
			url: '../time/time?id=' + id + '&minprice=' + minprice + '&type=' + type,
		})
	},

	//切换详情面板
	onTabsItemTap: function (event) {
		var index = time.getDataSet(event, 'index');
		this.setData({
			currentTabsIndex: index
		});
	},
	//点击查看地图
	onAddressTap: function (event) {
		wx.openLocation({
			latitude: 39.899117,
			longitude: 116.47062,
			scale: 28,
			name: '黑弧数码文化传媒股份有限公司',
			address: '北京市朝阳区百子湾路32号二十二院艺术区二十七号馆'
		})
	},

	/*提交订单*/
	submitOrder: function (events) {
		if (this.data.product.stock != 0) {
			//可以购买
			wx.navigateTo({
				url: '../order/appointmentOrder?productId=' + this.data.id + '&from=product&minprice='+this.data.minprice
			});
		} else {
			wx.showModal({
				title: '购买失败',
				content: '该商品已下架！',
				showCancel: false,
				success: function (res) { }
			});
			return;
		}
	},

	//分享效果
	onShareAppMessage: function () {
		return {
			title: this.data.product.server_name
		}
	}

})


