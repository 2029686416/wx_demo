var amapFile = require('../../lib/amap-wx.js');  //引入高德js
var config = require('../../lib/config.js');      //引用我们的配置文件
Page({
  data: {
    markers: [{
      iconPath: "../image/mapicon_navi_s.png",
      id: 0, 
      latitude: 31.25145,
      longitude: 121.45088,
      width: 33,
      height: 43
    }, {
      iconPath: "../image/mapicon_navi_e.png",
      id: 0,
        latitude: 31.23136,
        longitude: 121.47004,
      width: 34,
      height: 44
    }],
    distance: '',
    cost: '',
    polyline: []
  },
  onLoad: function () {
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getDrivingRoute({
      origin: '121.45088,31.25145',
      destination: '121.47004,31.23136',
      success: function (data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        that.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        });
       
      },
      fail: function (info) {

      }
    })
  }
 
})