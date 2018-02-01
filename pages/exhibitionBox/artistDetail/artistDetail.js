// theme.js

import { ArtistDetail } from 'artistDetail-model.js';


var artistDetail = new ArtistDetail;



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
		this.setData({
			id: id,
		})
		this._loadData();
	},

	_loadData: function () {
		//获取展览盒子艺术家详情
		artistDetail.getArtistDetail(this.data.id,(res) => {
			this.setData({
				artistDetail: res.data
			})
		});
	},


	//点击查看艺术家作品
	//同时将艺术家id信息传入艺术家作品详情，以便视频推荐使用
	artistDetailTap: function (event) {
		var id = artistDetail.getDataSet(event, 'id');
		var type = artistDetail.getDataSet(event, 'type');
		wx.navigateTo({
			url: '../detail/detail?id=' + id + '&type=' + type,
		})
	},

	onShareAppMessage: function () {
		return {
		}
	}

})