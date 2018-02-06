// pages/map/map.js
import { Home } from '../home/home-model.js';
var home = new Home();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    markId:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var longitude = options.longitude;
    var latitude = options.latitude;
    this.setData({
      longitude: longitude,
      latitude: latitude,
    });
    this._loadData(longitude, latitude);
    this.control();
  },

  _loadData: function (longitude, latitude) {
    home.getClubList(longitude, latitude, (res) => {
      this._drawMap(res);
      this.setData({
        clubList: res
      });
    });
  },

  //确定地图控件位置
  control: function () {
    var res = wx.getSystemInfoSync();
    var height = res.windowHeight;
    height = height - 49 - 10;
    this.setData({
      controls: [
        {
          id: 0,
          iconPath: '/images/icon/button.png',
          position: {
            left: 15,
            top: height,
            width: 345,
            height: 49
          },
          clickable: true
        },
      ]
    })



  },

  //点击地图描点
  markertap:function(event){
    console.log(event);
    this.setData({
      markId: event.markerId
    })
  },

  //点击地图控件
  controltap:function(){
    var markId = this.data.markId;
    if (markId){
      wx.navigateTo({
        url: '../club/club?id=' + markId,
      })
    }else{
      wx.showModal({
        title: '黑弧文艺社',
        content: '请先选择一个场馆！',
        showCancel: false,
        success: function (res) {
          return;
        }
      })
    }
  },




  //地图描点
  _drawMap: function (data) {
    // console.log(data);
    var markers = [];
    for (var i = 0; i < data.length; i++) {
      var mark = {
        iconPath: "/images/icon/marks.png",
        id: data[i].id,
        latitude: data[i].latitude,
        longitude: data[i].longitude,
        width: 16,
        height: 24,
        callout: {
          content: data[i].name,
          color: '#fff',
          fontSize: '14',
          borderRadius: '5',
          bgColor: '#00b4d0',
          padding: '5',
          display: 'BYCLICK',
          textAlign: 'center'
        }
      };
      markers.push(mark)
    }
    console.log(markers)
    this.setData({
      markers: markers
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})