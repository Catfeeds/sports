// var productObj = require('product-model.js');

import { Detail } from 'detail-model.js';

var detail = new Detail();  //实例化 商品详情 对象

var WxParse = require('../../../wxParse/wxParse.js');

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
		})
		this._loadData();
	},

	/*加载所有数据*/
	_loadData: function () {
		var that = this;
		detail.getProductInfo(this.data.id, (data) => {
			console.log(data)
			that.setData({
				product: data.data,
				content: WxParse.wxParse('content', 'html', data.data.content, that, 5)
			});
		});

		//获取当前商品分类下所有商品作为推荐商品
		//注意异步问题
		detail.getMoreByCategory(this.data.type, (res) => {
			console.log(res);
			that.setData({
				moreProductsArr: res.data.works
			})
		})

	},

	//商品详情点击更多商品
	onProductsItemTap: function (event) {
		var id = detail.getDataSet(event, 'id');
		var type = this.data.type;
		wx.redirectTo({
			url: 'detail?id=' + id + '&type=' + type
		})
	},
	//点击查看艺术家信息
	artistTap:function(event){
		var id = detail.getDataSet(event, 'id');
		wx.navigateTo({
			url: '../artistDetail/artistDetail?id='+id,
		})

	},
	//切换详情面板
	onTabsItemTap: function (event) {
		var index = detail.getDataSet(event, 'index');
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
			address: '北京市朝阳区百子湾路32号二十二院街艺术区6号楼20号'
		})
	},

	/*提交订单*/
	submitOrder: function (events) {
		if (this.data.product.stock != 0) {
			//可以购买
			console.log(1);
			wx.navigateTo({
				url: '../../order/order?productId=' + this.data.id + '&from=product'
			});
		} else {
			wx.showModal({
				title: '购买失败',
				content: '该商品已下架！',
				showCancel: false,
				success: function (res) {
					return;
				}
			});

		}
	},

	//分享效果
	onShareAppMessage: function () {
		return {
			title: this.data.product.name
		}
	}

})


