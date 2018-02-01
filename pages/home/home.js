// home.js

import { Home } from 'home-model.js';
var home = new Home();
//引入全局变量
import { Config } from "../../utils/config.js";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cityName:null,
        adcode:0,
		productProp:{
			name:'商品精选',
			desc:'发现生活中的好物'
		},
		timeProp: {
			name: '预约精选',
			desc: '享受私人定制的乐趣'
		},
		longitude:0,
		latitude:0,
		markers:[
			{
				iconPath: "/images/icon/marks.png",
				id: 0,
				latitude: 39.908925,
				longitude: 116.359029,
				width: 16,
				height: 24,
				callout:{
					content:'示例0',
					color:'#fff',
					fontSize:'14px',
					borderRadius:'5px',
					bgColor:'#00b4d0',
					padding:'5px',
					display:'BYCLICK',
					textAlign:'center'
				}
			}, {
				iconPath: "/images/icon/marks.png",
				id: 1,
				latitude: 39.808925,
				longitude: 116.339029,
				width: 16,
				height: 24,
				callout: {
					content: '示例1',
					color: '#fff',
					fontSize: '14px',
					borderRadius: '5px',
					bgColor: '#00b4d0',
					padding: '5px',
					display: 'BYCLICK',
					textAlign: 'center'
				}
			}, {
				iconPath: "/images/icon/marks.png",
				id: 2,
				latitude: 39.708925,
				longitude: 116.279029,
				width: 16,
				height: 24,
				callout: {
					content: '示例2',
					color: '#fff',
					fontSize: '14px',
					borderRadius: '5px',
					bgColor: '#00b4d0',
					padding: '5px',
					display: 'BYCLICK',
					textAlign: 'center'
				}
			}, {
				iconPath: "/images/icon/marks.png",
				id: 3,
				latitude: 39.838925,
				longitude: 116.309029,
				width: 16,
				height: 24,
				callout: {
					content: '示例3',
					color: '#fff',
					fontSize: '14px',
					borderRadius: '5px',
					bgColor: '#00b4d0',
					padding: '5px',
					display: 'BYCLICK',
					textAlign: 'center'
				}
			}, {
				iconPath: "/images/icon/marks.png",
				id: 4,
				latitude: 39.858925,
				longitude: 116.329029,
				width: 16,
				height: 24,
				callout: {
					content: '示例4',
					color: '#fff',
					fontSize: '14px',
					borderRadius: '5px',
					bgColor: '#00b4d0',
					padding: '5px',
					display: 'BYCLICK',
					textAlign: 'center'
				}
			}, {
				iconPath: "/images/icon/marks.png",
				id: 5,
				latitude: 39.808925,
				longitude: 116.289029,
				width: 16,
				height: 24,
				callout: {
					content: '示例5',
					color: '#fff',
					fontSize: '14px',
					borderRadius: '5px',
					bgColor: '#00b4d0',
					padding: '5px',
					display: 'BYCLICK',
					textAlign: 'center'
				}
			},
			{
				iconPath: "/images/icon/marks.png",
				id: 6,
				latitude: 39.908925,
				longitude: 116.409029,
				width: 16,
				height: 24,
				callout: {
					content: '示例6',
					color: '#fff',
					fontSize: '14px',
					borderRadius: '5px',
					bgColor: '#00b4d0',
					padding: '5px',
					display: 'BYCLICK',
					textAlign: 'center'
				}
			},
		]
    },

    onShow: function () { 
        console.log(Config.cityCode)
        //地理定位
        if (Config.cityCode == 0 || Config.cityCode == undefined || Config.cityCode==null){
            var that = this;
            wx.getLocation({
                type: 'gcj02', //返回可以用于wx.openLocation的经纬度
                success: function (res) {
                    var latitude = res.latitude
                    var longitude = res.longitude
					that.setData({
						longitude: longitude,
						latitude: latitude
					})
                    wx.request({
                        url: 'https://apis.map.qq.com/ws/geocoder/v1/',
                        data: {
                            location: latitude + ',' + longitude,
                            key: 'UE6BZ-4OMK3-LZ23V-3EW4Z-5J6E3-PCFMJ'
                        },
                        success: function (res) {
                            var cityName = res.data.result.ad_info.city;
                            var adcode = res.data.result.ad_info.adcode;
                            Config.cityName = cityName;
                            Config.cityCode = adcode;
                            that.setData({
                                cityName: cityName,
                                adcode: adcode
                            })
                        },
						fail:function(){
							Config.cityName = '北京市';
							Config.cityCode = 0;
							that.setData({
								cityName: '北京市',
								adcode: 0
							})
						}
                    })
                },
				fail: function () {
					Config.cityName = '北京市';
					Config.cityCode = 0;
					that.setData({
						cityName: '北京市',
						adcode: 0
					})
				}
            })
        }else{
            this.setData({
                cityName: Config.cityName,
                adcode: Config.cityCode
            }) 
        }
        //获取数据
        this._loadData();
    },

    _loadData: function () {
        var id = 1;
        home.getBannerData(id, (res) => {
            this.setData({
                bannerArr: res
            });
        });

        home.getProductsData((res) => {
			console.log(res);
            this.setData({
				productsArr: res.product,
				timeArr:res.time
            });
        });
    },
	//点击地图放大
	bindtap:function(){
		
	},

    //推荐商品进入商品详情
    onProductsItemTap: function (event) {
		//判断是传统商品还是预约商品
        var id = home.getDataSet(event, 'id');
        var type = home.getDataSet(event, 'type');
        wx.navigateTo({
            url: '../product/product?id=' + id + '&type=' + type,
        })
    },

    //商品分类进入商品列表
    onCategoryItemTap: function (event) {
        var id = home.getDataSet(event, 'id');
        var name = home.getDataSet(event, 'name');
        wx.navigateTo({
            url: '../category/category?id=' + id + '&name=' + name,
        })
    },
	
	//进入展览盒子
	exhibitionTap:function(event){
		var id = home.getDataSet(event, 'id');
		var name = home.getDataSet(event, 'name');
		wx.navigateTo({
			url: '../exhibitionBox/exhibitionList/exhibitionList?id=' + id + '&name=' + name,
		})
	},
	//进入图书盒子
	bookTap: function (event) {
		var id = home.getDataSet(event, 'id');
		var name = home.getDataSet(event, 'name');
		wx.navigateTo({
			url: '../bookBox/bookList/bookList?id=' + id + '&name=' + name+'&from=home',
		})
	},

    //bannner点击跳转
    onBannerTap: function (event) {
        var name = home.getDataSet(event, 'key');
        var id = home.getDataSet(event, 'type');
        if (id != 0) {
            wx.navigateTo({
                url: '../category/category?id=' + id + '&name=' + name,
            })
        }
    },

    //点击选择城市
    onCityTap:function(event){
        wx.navigateTo({
            url: '../city/city?cityName=' + this.data.cityName
        })
    },

	//跳转到卓儿小程序
	jumpToJoy:function(){
		wx.navigateToMiniProgram({
			appId: 'wxb489506e9a167248',
			path: 'pages/item/home',
			envVersion: 'release',
			success(res) {
				// 打开成功
			},
			fail:function(){
				wx.showModal({
					title: '黑弧文艺社',
					content: '系统错误，请稍后重试！',
					showCancel: false,
					success: function (res) {

					}
				});
			}
		})
	},

    //分享效果
    onShareAppMessage: function () {
        return {
			imageUrl:"/images/home/home-share.jpg"
        }
    }
})