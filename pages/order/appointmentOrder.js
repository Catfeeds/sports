import { Order } from '../order/order-model.js';
import { Cart } from '../cart/cart-model.js';
import { Address } from '../../utils/address.js';

var order = new Order();
var cart = new Cart();
var address = new Address();

Page({ 
	data: {
		goto:true,
		orderAttrInfoObj: [{
			'product_id': 0,	//time_id
			'count': 0,	 	//人数
			'parameterA': 0,	//姓名
			'parameterB': 0,	//手机号
			'type': 1
		}],
		// userName:'',		//用户姓名
		// userTel:'',		//用户手机号码
		dataArr:null,		//日期数组
		dataValue:null,		//当前选择日期值
		timeArr: null,		//当前日期下时间数组
		timeValue:null,		//当前选择时间
		countArr: null,		//当前日期时间下库存数组
		countValue:null,	//当前选择预约人数
		teacher:'',			//当前老师
		stock:0,			//默认库存为0
		time_id:null,		//timeID
		sumMoney:0,			//订单总价
		discount:0,			//当前单价
		orderStatus: 0,   //订单状态，0还未生成订单，刚从商品详情过来，可以修改地址，1未支付，2已支付
		isCanPay: true
	},
  
    /*
    * 订单数据来源包括两个：
    * 1.直接下单
    * 2.旧的订单
    * */
	onLoad: function (options) {
		var that = this;
		var from = options.from;

		if (from == 'product') {
			this._fromProduct(options.productId);
			this.setData({
				orderStatus: 0,
			})
		} else {
			this._fromOrder(options.OrderId);
		}
	},
	//从商品详情过来
	_fromProduct: function (pid) {
		//获取商品详情
		var that = this;
		order.getTimeInfo(pid, (res) => {
			console.log(res);
			if (res.code==1){
				//有数据
				var res = res.data;
				//设置size数组
				this.setData({
					productDetailInfo: res,
					feature: res.data,
					dataArr: that._getDetailData(res.data),
				})
			}else{
				// 没有数据
				wx.showModal({
					title: '黑弧文艺社',
					content: res.msg,
					showCancel: false,
					success: function (res) {
						wx.navigateBack({
							delta: 1
						})
					}
				})
			}
		})
	},
	//从订单列表过来
	_fromOrder: function () {

	},
	//获取预约日期
	_getDetailData: function (data) {
		var arr = [];
		for (let i in data) {
			arr.push(i);
		} 
		return arr;
	},

	//选择日期
	bindPickerData:function(e){
		var val = e.detail.value;
		this.setData({
			data:val,
			dataValue: this.data.dataArr[val],
			//每次改变日期，重置时间人数老师等信息
			timeValue: null,
			countArr: null,
			countValue: null,
			teacher: '',
			stock: 0,
			time_id: null,
			sumMoney: 0,			//订单总价
			discount: 0,
		})

		this._getTimeFromData();
	},
	//选择完日期之后设置时间数组
	_getTimeFromData:function(){
		var arr=[];
		var d = this.data.dataArr[this.data.data];
		var t = this.data.productDetailInfo.data[d];
		for (let i in t) {
			arr.push(i);
		} 
		this.setData({
			timeArr: arr
		})
	},

	//选择时间，选择时间的同时也确定了对应库存和老师
	bindPickerTime:function(e){
		var val = e.detail.value;
		var feature = this.data.feature[this.data.dataValue][this.data.timeArr[val]]
		console.log(feature);
		var teacher=feature[0].teacher;
		var discount = feature[0].discount;
		var stock = feature[0].stock;
		var time_id = feature[0].time_id;
		console.log(teacher, discount, stock, time_id)
		this.setData({
			timeValue: this.data.timeArr[val],
			teacher: teacher,
			discount: discount,
			time_id: time_id,
			countArr: this._setCountArray(stock),
			//每次选择完时间后重置数据
			countValue: null,
			sumMoney: 0,

		})

	},
	//根据库存设置库存数组
	_setCountArray: function (stock){
		var arr=[];
		for (let i = 1; i <= stock;i++){
			arr.push(i);
		}
		return arr;
	},
	//选择商品属性
	bindPickerCount: function (e) {
		var key = e.currentTarget.dataset.type;
		var val = e.detail.value;
		this.setData({
			countValue: this.data.countArr[val],
		})

		// 计算价格
		let multiple = 100;
		let sumMoney = Number(this.data.discount) * multiple * Number(this.data.countArr[val]) * multiple;
		//选择完之后更新价格
		this.setData({
			orderAttrInfoObj: this.data.orderAttrInfoObj,
			sumMoney: sumMoney / (multiple * multiple)
		})
	},

	//立即预约
	onSure:function(){
		if (this.data.dataValue && this.data.timeValue && this.data.countValue && this.data.teacher){
			this.setData({
				goto:false
			});
			var total_micro_second = 15 * 60 * 1000;
			var NowTime = new Date().getTime();
			var EndTime = NowTime + total_micro_second;
			this.setData({
				end_time: EndTime
			})
			var that = this;
			// 调用上面定义的递归函数，一秒一刷新时间
			this.countdown(that);
		}else{
			wx.showModal({
				title: '黑弧文艺社',
				content: '请选择预约信息！',
				showCancel:false,
				success: function (res) {
					return;
				}
			})
		}
	},
	//获取用户姓名
	userNameInput:function(e){
		this.setData({
			userName: e.detail.value
		})
	},
	userTelInput: function (e) {
		this.setData({
			userTel: e.detail.value
		})
	},

	/*下单和付款*/
	pay: function () {
		if (this.data.userTel && this.data.userName) {
			if ((/^1[34578]\d{9}$/.test(this.data.userTel))){
				if (this.data.orderStatus == 0) {
					this._firstTimePay();
				} else {
					this._oneMoresTimePay();
				}
			}else{
				wx.showModal({
					title: '黑弧文艺社',
					content: '请输入正确手机号码！',
					showCancel: false,
					success: function (res) {
						return;
					}
				})
			}
		}else{
			wx.showModal({
				title: '黑弧文艺社',
				content: '请输入预约信息！',
				showCancel: false,
				success: function (res) {
					return;
				}
			})
		}



	},

	/*第一次支付*/
	_firstTimePay: function () {
		//将要发送的订单数据数组下标转化为具体值
		var orderInfo = [{}];
		orderInfo[0]['product_id'] = this.data.time_id;
		orderInfo[0]['count'] = this.data.countValue;
		orderInfo[0]['parameterA'] = this.data.userName;
		orderInfo[0]['parameterB'] = this.data.userTel;
		orderInfo[0]['type'] = 1;

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
    *下单失败
    * params:
    * data - {obj} 订单结果信息
    * */
	_orderFail: function (data) {
		this.setData({
			isCanPay: false
		})
		var str = this.data.productDetailInfo.name + this.data.productDetailInfo.describe;
		str += ' 缺货';
		wx.showModal({
			title: '下单失败',
			content: str,
			showCancel: false,
			success: function (res) {

			}
		});
	},

	/* 再次次支付*/
	_oneMoresTimePay: function () {
		this._execPay(this.data.orderId);
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

	onShow: function () {
	},

    /*
    * 提示窗口
    * params:
    * title - {string}标题
    * content - {string}内容
    * flag - {bool}是否跳转到 "我的页面"
    */
	showTips: function (title, content, flag) {
		wx.showModal({
			title: title,
			content: content,
			showCancel: false,
			success: function (res) {
				if (flag) {
					wx.switchTab({
						url: '/pages/my/my'
					});
				}
			}
		});
	},


	countdown: function (that) {
		var EndTime = that.data.end_time || [];
		var NowTime = new Date().getTime();
		var total_micro_second = EndTime - NowTime || [];
		// 渲染倒计时时钟
		that.setData({
			clock: that.dateformat(total_micro_second)
		});
		if (total_micro_second <= 0) {
			that.setData({
				clock: "系统超时"
			});
			wx.showModal({
				title: '系统超时',
				content: '请您在规定时间内填写购买信息',
				showCancel: false,
				success: function (res) {
					console.log(that.data)
					var id = that.data.productDetailInfo.id;
					var type = that.data.productDetailInfo.category_id;
					var summary = that.data.productDetailInfo.summary;
					// wx.redirectTo({
					// 	url: '../product/product?id=' + id + '&type=' + type + '&summary=' + summary
					// });
					wx.navigateBack({
						delta: 1
					})
				}
			});
			return;
		}else{
			setTimeout(function () {
				total_micro_second -= 1000;
				that.countdown(that);
			}, 1000)
		}
	},

	// 时间格式化输出，如11:03 25:19 每1s都会调用一次
	dateformat: function (micro_second) {
		// 总秒数
		var second = Math.floor(micro_second / 1000);
		// 天数
		var day = Math.floor(second / 3600 / 24);
		// 小时
		var hr = Math.floor(second / 3600 % 24);
		// 分钟
		var min = Math.floor(second / 60 % 60);
		// 秒
		var sec = Math.floor(second % 60);
		if(min<10){
			min='0'+min;
		}
		if(sec<10){
			sec='0'+sec;
		}
		return min + "分钟" + sec + "秒";
	}


})
