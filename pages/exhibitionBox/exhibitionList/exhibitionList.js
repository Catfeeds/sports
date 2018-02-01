// theme.js

import { ExhibitionList } from 'exhibitionList-model.js';
import { Category } from '../../category/category-model.js';


var exhibitionList = new ExhibitionList;
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
		exhibitionList.getProductorData(this.data.id, (res) => {
			this.setData({
				'themeInfo': res
			});
		});

		//获取展览盒子艺术家列表
		exhibitionList.getArtistList((res)=>{
			this.setData({
				artistList:res
			})
		});

		//获取展览盒子下专题列表
		exhibitionList.getZhuantiList(this.data.id,(res)=>{
			console.log(res);
			this.setData({
				themeList:res,
			})
		});

		//获取分类下传统商品列表
		exhibitionList.getProductsByCategory(this.data.id, (res) => {
			this.setData({
				'categoryProducts': res
			});
		});

		//获取分类下预约商品列表
		// category.getTimesByCategory(this.data.id, (res) => {
		// 	this.setData({
		// 		'categoryTimes': res.data
		// 	});
		// });

		// //获取分类下视频列表
		// category.getVideosByCategory(this.data.id, (res) => {
		// 	this.setData({
		// 		'categoryVideos': res
		// 	});
		// });
	},

	//tab切换详情面板 
	onTabsItemTap: function (event) {
		var index = exhibitionList.getDataSet(event, 'index');
		this.setData({
			currentTabsIndex: index
		});
	},

	//点击进入艺术家详情
	artistListTap:function(event){
		var id = exhibitionList.getDataSet(event, 'id');
		wx.navigateTo({
			url: '../artistDetail/artistDetail?id=' + id,
		})
	},
	//点击进入专题详情
	themeTap:function(event){
		var id = exhibitionList.getDataSet(event, 'id');
		wx.navigateTo({
			url: '../themeDetail/themeDetail?id=' + id,
		})
	},

	//点击查看商品详情onProductsItemTap
	//同时将商品的分类信息传入商品详情，以便商品推荐使用
	onProductsItemTap: function (event) {
		var id = exhibitionList.getDataSet(event, 'id');
		var type = exhibitionList.getDataSet(event, 'type');
		var summary = exhibitionList.getDataSet(event, 'summary');
		wx.navigateTo({
			url: '../detail/detail?id=' + id + '&type=' + type + '&summary=' + summary,
		})
	},

	onShareAppMessage: function () {
		return {
			title: this.data.name,
			path: '/pages/category/category?id=' + this.data.id + '&name=' + this.data.name
		}
	}

})