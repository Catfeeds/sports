// theme.js

import { ThemeDetail } from 'themeDetail-model.js';
import { Order } from '../../order/order-model.js'

var themeDetail = new ThemeDetail;
var order = new Order;

var WxParse = require('../../../wxParse/wxParse.js');



Page({

    /**
     * 页面的初始数据
     */
	data: {
		currentTabsIndex: 0,
		discount: 1,
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
		//获取展览盒子下专题详情
		var that = this;
		themeDetail.getThemeDetail(this.data.id, (res) => {
			this.setData({
				price: res.price,
				sumMoney: res.price * this.data.discount,
				themeDetail: res,
				content: WxParse.wxParse('content', 'html', res.content, that, 0)
			});
		});
	},
	//打开地图
	openMap: function () {
		wx.openLocation({
			latitude: 39.899117,
			longitude: 116.47062,
			scale: 28,
			name: '黑弧数码文化传媒股份有限公司',
			address: '北京市朝阳区百子湾路32号二十二院街艺术区6号楼20号'
		})
	},
	//可以购买的，走预约的购买流程
	canBuy: function (event) {
		if (this.data.themeDetail.stock != 0) {
			//可以购买
			this.showModal();
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
	//获取姓名
	userNameInput: function (event) {
		var name = event.detail.value;
		this.setData({
			name: name
		})
	},
	//获取手机号
	userTelInput: function (event) {
		var tel = event.detail.value;
		this.setData({
			tel: tel
		})
	},
	//获取人数
	userNumInput: function (event) {
		var discount = event.detail.value;
		let multiple = 100;
		let sumMoney = Number(discount) * multiple * Number(this.data.price) * multiple;
		this.setData({
			discount: discount,
			sumMoney: sumMoney / (multiple * multiple)
		})
	},
	//立即支付
	submitOrder: function () {
		if (this.data.name && this.data.tel) {
			var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
			if (reg.test(this.data.tel)) {
				if (this.data.discount >= 1) {
					console.log(1);
					this._firstTimePay();
				} else {
					wx.showModal({
						title: '提示',
						content: '预约人数最少为1！',
						showCancel: false,
						success: function (res) { }
					});
					return;
				}
			} else {
				wx.showModal({
					title: '提示',
					content: '请输入正确手机号码！',
					showCancel: false,
					success: function (res) { }
				});
				return;
			}
		} else {
			wx.showModal({
				title: '提示',
				content: '请先填写预约信息！',
				showCancel: false,
				success: function (res) { }
			});
			return;
		}
	},
	/*第一次支付*/
	_firstTimePay: function () {
		//将要发送的订单数据数组下标转化为具体值
		var orderInfo = [{}];
		orderInfo[0]['product_id'] = this.data.id;
		orderInfo[0]['count'] = this.data.discount;
		orderInfo[0]['parameterA'] = this.data.name;
		orderInfo[0]['parameterB'] = this.data.tel;
		orderInfo[0]['type'] = 2;

		console.log(orderInfo)
		var that = this;
		// 支付分两步，第一步是生成订单号，然后根据订单号支付
		order.doOrder(orderInfo, (data) => {
			console.log(data);
			this.data.orderId = data.order_id;
			//订单生成成功
			if (data.pass) {
				//更新订单状态
				var id = data.order_id;
				that.data.orderId = id;
				that.data.fromProductFlag = false;
				//开始支付
				that._execPay(id);
			} else {
				that._orderFail(data);  // 下单失败
			}
		});
	},
	/*
	*开始支付
	* params:
	* id - {int}订单id
	*/
	_execPay: function (id) {
		if (!order.onPay) {
			this.showTips('支付提示', '本产品仅用于演示，支付系统已屏蔽', true);//屏蔽支付，提示
			return;
		}
		var that = this;
		order.execPay(id, (statusCode) => {
			//1未支付，2已支付,0未生成订单
			if (statusCode != 0) {
				var flag = statusCode == 2;
				wx.redirectTo({
					url: '../pay-result/pay-result?id=' + id + '&flag=' + flag + '&from=order'
				});
			}
		});
	},
	/*
	*下单失败
	* params:
	* data - {obj} 订单结果信息
	* */
	_orderFail: function (data) {
		this.setData({
			isCanPay: false
		})
		var str = this.data.themeDetail.name;
		str += ' 缺货';
		wx.showModal({
			title: '下单失败',
			content: str,
			showCancel: false,
			success: function (res) {

			}
		});
	},


	// 显示遮罩层
	showModal: function () {
		var animation = wx.createAnimation({
			duration: 200,
			timingFunction: "linear",
			delay: 0
		})
		this.animation = animation
		animation.translateY(300).step()
		this.setData({
			animationData: animation.export(),
			showModalStatus: true
		})
		setTimeout(function () {
			animation.translateY(0).step()
			this.setData({
				animationData: animation.export()
			})
		}.bind(this), 200)
	},

	// 隐藏遮罩层
	hideModal: function () {
		var animation = wx.createAnimation({
			duration: 200,
			timingFunction: "linear",
			delay: 0
		})
		this.animation = animation
		animation.translateY(300).step()
		this.setData({
			animationData: animation.export(),
		})
		setTimeout(function () {
			animation.translateY(0).step()
			this.setData({
				animationData: animation.export(),
				showModalStatus: false
			})
		}.bind(this), 200)
	},

	onShareAppMessage: function () {
		return {
		}
	}

})