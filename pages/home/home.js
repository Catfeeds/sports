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
    cityName: null,
    adcode: 0,
    productProp: {
      name: '商品精选',
      desc: '发现生活中的好物'
    },
    timeProp: {
      name: '预约精选',
      desc: '享受私人定制的乐趣'
    },
    longitude: 0,
    latitude: 0,
    markers: [
      {
        iconPath: "/images/icon/marks.png",
        id: 0,
        latitude: 39.908925,
        longitude: 116.359029,
        width: 16,
        height: 24,
        callout: {
          content: '示例0',
          color: '#fff',
          fontSize: '14',
          borderRadius: '5',
          bgColor: '#00b4d0',
          padding: '5',
          display: 'BYCLICK',
          textAlign: 'center'
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
          fontSize: '14',
          borderRadius: '5',
          bgColor: '#00b4d0',
          padding: '5',
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
          fontSize: '14',
          borderRadius: '5',
          bgColor: '#00b4d0',
          padding: '5',
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
          fontSize: '14',
          borderRadius: '5',
          bgColor: '#00b4d0',
          padding: '5',
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
          fontSize: '14',
          borderRadius: '5',
          bgColor: '#00b4d0',
          padding: '5',
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
          fontSize: '14',
          borderRadius: '5',
          bgColor: '#00b4d0',
          padding: '5',
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
          fontSize: '14',
          borderRadius: '5',
          bgColor: '#00b4d0',
          padding: '5',
          display: 'BYCLICK',
          textAlign: 'center'
        }
      },
    ]
  },

  onShow: function () {
    console.log(Config.cityCode)
    //地理定位
    // if (Config.cityCode == 0 || Config.cityCode == undefined || Config.cityCode == null) {
      var that = this;
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: function (res) {
          console.log(res)
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
              console.log(res);
              var cityName = res.data.result.ad_info.city;
              var adcode = res.data.result.ad_info.adcode;
              Config.cityName = cityName;
              Config.cityCode = adcode;
              that.setData({
                cityName: cityName,
                adcode: adcode
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
    // } else {
    //   this.setData({
    //     cityName: Config.cityName,
    //     adcode: Config.cityCode
    //   })
    // }
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
        timeArr: res.time
      });
    });
  },
  //点击地图放大
  bindtap: function () {
    wx.navigateTo({
      url: '../map/map?longitude=' + this.data.longitude + '&latitude=' + this.data.latitude,
    })
  },

  //进入场馆
  onClubItemTap: function (event) {
    //判断是传统商品还是预约商品
    var id = home.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../product/product?id=' + id,
    })
  },
  //分享效果
  onShareAppMessage: function () {
    return {
    }
  }
})