// pages/result/result.js
import { Result } from 'result-model.js';

var result = new Result();
Page({

    /**
     * 页面的初始数据
     */
	data: {
		open: false
	},

    /**
     * 生命周期函数--监听页面加载
     */
	onLoad: function (options) {
		var uid = options.uid;
		var tid = options.timeId;
		var lock = options.lock;
		this._loadData(uid, tid, lock);
		this.audioCtx = wx.createAudioContext('myAudio')
	},

	//加载数据
	_loadData: function (uid, tid, lock) {
		var that = this;
		result.getLockInfo(uid, tid, lock, (res) => {
			if (res.code == 1) {
				//可以开锁
				var url = res.value;
				that._askLock(url);
			} else {
				var str = res.message;
				wx.showModal({
					title: '盒子文艺社',
					content: str,
					showCancel: false
				})
			}
		})
	},

	//请求卡多宝接口
	_askLock: function (url) {
		var that = this;
		wx.request({
			url: url,
			dataType: 'jsonp',
			jsonp: 'callback',
			header: {
				'content-type': 'application/json',
				'token': wx.getStorageSync('token')
			},
			success: function (res) {
				var data = res.data;
				data = JSON.parse(data);
				if (data.Code == 1) {
					var value = data.Value;
					value = 'data:audio/x-wav;base64,' + value;
					that.setData({
						value: value,
						open: true
					});
				}else{
					wx.showModal({
						title: '盒子文艺社',
						content: data.Message,
						showCancel: false
					})
				}
			},
			fail: function (err) {
				wx.showModal({
					title: '盒子文艺社',
					content: '系统错误，请稍后重试！',
					showCancel: false
				})
			}
		});
	},

	onTap: function () {
		if (this.data.open) {
			this.audioCtx.play()
		} else {
			wx.showModal({
				title: '盒子文艺社',
				content: '对不起，该钥匙不在预约时间段内，无法开锁！',
				showCancel: false
			})
		}
	}
})