// theme.js

import { Category } from 'category-model.js';
var category = new Category;
Page({

    /**
     * 页面的初始数据
     */
	data: {
		currentTabsIndex: 0,
	},

    /**
     * 生命周期函数--监听页面加载
     */
	onLoad: function (options) {
		var id = options.id;
		var name = options.name;
		var type = options.type;
		this.setData({
			id: id,
			name: name,
			type: type
		})
		this._loadData();
	},

	onReady: function () {
		wx.setNavigationBarTitle({
			title: this.data.name,
		})
	},

	_loadData: function () {
		//获取分类信息
		category.getProductorData(this.data.id, (res) => {
			this.setData({
				'themeInfo': res
			});
		});

		//获取分类下传统商品列表
		category.getProductsByCategory(this.data.id, (res) => {
			this.setData({
				'categoryProducts': res
			});
		});
		//获取分类下预约商品列表
		category.getTimesByCategory(this.data.id, (res) => {
			this.setData({
				'categoryTimes': res.data
			});
		});

		//获取分类下视频列表
		category.getVideosByCategory(this.data.id, (res) => {
			this.setData({
				'categoryVideos': res
			});
		});
	},

	//tab切换详情面板 
	onTabsItemTap: function (event) {
		var index = category.getDataSet(event, 'index');
		this.setData({
			currentTabsIndex: index
		});
	},

	//点击查看商品详情
	//同时将商品的分类信息传入商品详情，以便商品推荐使用
	onProductsItemTap: function (event) {
		var id = category.getDataSet(event, 'id');
		var type = category.getDataSet(event, 'type');
		var summary = category.getDataSet(event, 'summary');
		wx.navigateTo({
			url: '../product/product?id=' + id + '&type=' + type + '&summary=' + summary,
		})
	},

	//点击查看预约课程详情
	//同时将预约课程的分类信息传入预约课程详情，以便预约课程推荐使用
	onTimeItemTap: function (event) {
		var id = category.getDataSet(event, 'id');
		var type = category.getDataSet(event, 'type');
		var minprice = category.getDataSet(event, 'minprice');
		wx.navigateTo({
			url: '../time/time?id=' + id + '&minprice=' + minprice + '&type=' + type,
		})
	},

	//点击查看视频详情
	//同时将视频的分类信息传入视频详情，以便视频推荐使用
	onProductsVideoTap: function (event) {
		var id = category.getDataSet(event, 'id');
		var type = category.getDataSet(event, 'type');
		wx.navigateTo({
			url: '../video/video?id=' + id + '&type=' + type,
		})
	},

	onShareAppMessage: function () {
		return {
			title: this.data.name,
			path: '/pages/category/category?id=' + this.data.id + '&name=' + this.data.name
		}
	}

})