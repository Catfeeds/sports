// booklist.js

import { BookList } from 'bookList-model.js';


var booklist = new BookList;



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
		var from=options.from;
		var selectId = options.selectId;
		this.setData({
			id: id,
			name: name,
			type: type,
			from: from,
			selectId: selectId
		});
		this._loadData();
	},

	onReady: function () {
		wx.setNavigationBarTitle({
			title: this.data.name,
		})
	},

	_loadData: function () {
		console.log(123456);
		if (this.data.from == 'home'){
			//获取分类信息
			booklist.getProductorData(this.data.id, (res) => {
				this.setData({
					'themeInfo': res
				});
			});
			//获取图书盒子下专题列表
			booklist.getZhuantiList(this.data.id, (res) => {
				console.log(res);
				this.setData({
					themeList: res,
				})
			});
			//获取分类下传统商品列表
			booklist.getProductsByCategory(this.data.id, (res) => {
				this.setData({
					'categoryProducts': res
				});
			});
		} else if (this.data.from == 'select'){
			//获取分类信息
			booklist.getProductorData(this.data.id, (res) => {
				this.setData({
					'themeInfo': res
				});
			});
			//获取筛选后的专题
			booklist.selectTheme(this.data.selectId,(res)=>{
				console.log(res);
				this.setData({
					themeList: res,
				})
			});
			//获取分类下传统商品列表
			booklist.getProductsByCategory(this.data.id, (res) => {
				this.setData({
					'categoryProducts': res
				});
			});
		};
	},

	//tab切换详情面板 
	onTabsItemTap: function (event) {
		var index = booklist.getDataSet(event, 'index');
		this.setData({
			currentTabsIndex: index
		});
	},
	//点击进入专题详情
	themeTap: function (event) {
		var id = booklist.getDataSet(event, 'id');
		wx.navigateTo({
			url: '../themeDetail/themeDetail?id=' + id,
		})
	},

	//筛选
	selectTap:function(){
		wx.navigateTo({
			url: '../bookSelect/bookSelect',
		})
	},

	//点击查看商品详情onProductsItemTap
	//同时将商品的分类信息传入商品详情，以便商品推荐使用
	onProductsItemTap: function (event) {
		var id = booklist.getDataSet(event, 'id');
		var type = booklist.getDataSet(event, 'type');
		var summary = booklist.getDataSet(event, 'summary');
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