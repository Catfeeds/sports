// pages/map/map.js
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
	controls:[
		{
			id:0,
			iconPath:'http://cs.cms.joyfamliy.com:2017/Data/UploadFiles/literature/product-class@1.jpg',
			position: {
				left: 0,
				top: 300 - 50,
				width: 50,
				height: 50
			},
			clickable: true
		},
		{
			id: 0,
			iconPath: '/images/icon/empty.jpg',
			position: {
				left: 0,
				top: 300,
				width: 50,
				height: 50
			},
			clickable: true
		},
	],
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var longitude = options.longitude;
    var latitude = options.latitude;
    this.setData({
      longitude :longitude,
      latitude : latitude,

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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})