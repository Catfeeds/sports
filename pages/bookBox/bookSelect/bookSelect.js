import { BookSelect } from 'bookSelect-model.js';


var bookSelect = new BookSelect;



Page({

    /**
     * 页面的初始数据
     */
	data: {
		currentTabsIndex: 0,
		categoryItems:[false,false,false],
		productItems: [false, false, false, false, false, false,false],
		themeItems: [false, false, false]
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


	_loadData: function () {
		//获取筛选信息
		// bookSelect.getProductorData(this.data.id, (res) => {
		// 	this.setData({
		// 		'themeInfo': res
		// 	});
		// })
	},

	//点击事件
	// categoryItemTap:function(event){
	// 	var index = bookSelect.getDataSet(event,'index');

	// 	this.data.categoryItems[index] = !this.data.categoryItems[index];
	// 	console.log(this.data.categoryItems);
	// 	this.setData({
	// 		categoryItems: this.data.categoryItems
	// 	})
	// },
	// productItemTap: function (event) {
	// 	var index = bookSelect.getDataSet(event, 'index');

	// 	this.data.productItems[index] = !this.data.productItems[index];
	// 	console.log(this.data.categoryItems);
	// 	this.setData({
	// 		productItems: this.data.productItems
	// 	})
	// },
	themeItemTap: function (event) {
		var index = bookSelect.getDataSet(event, 'index');

		this.data.themeItems[index] = !this.data.themeItems[index];
		console.log(this.data.themeItems);
		this.setData({
			themeItems: this.data.themeItems
		});
		var id = bookSelect.getDataSet(event, 'id');
		wx.redirectTo({
			url: '../bookList/bookList?id=6&name=book box&selectId=' + id+'&from=select'
		})
	},
	//确定
	sure: function () {

	},
	//取消
	del:function(){
		wx.navigateBack({
			delta: 1
		})
	}


})