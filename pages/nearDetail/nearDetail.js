//logs.js
var amapFile = require('../../lib/amap-wx.js');  //引入高德js
var config = require('../../lib/config.js');      //引用我们的配置文件
const app = getApp()
Page({
  data: {
    logs: [],
    hiddenText: false,
    showMap: true,
    showList: false,
    moshi1: false,
    moshi2: true,
    vehTimes: null,
    markers: [],
    polyline: []
  },
  onLoad: function (mes) {
    var lo ;
    var la ;
    var po = '123';
    var pa ;

    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    that.setData({
      routeName: mes.routeName,
      rSOrderid: mes.rSOrderid,
      routeDirect: mes.routeDirect,
      routeId: mes.routeId,
      descp: mes.descp,
      deparTime: mes.deparTime,
      vehTime: mes.vehTime 
    })

    //这两处 是因为判断null无效，才使用此方法
    if (that.data.deparTime.length==4){//说明是null四个字节
      that.setData({
        deparTime: '暂无车辆信息...'
      })
    }
    //console.log("传闻-------------------->" + that.data.deparTime.length);

    if(that.data.vehTime>0){
      
    }else{
      that.setData({
        vehTime: '--'
      })
    }
    //获取从另一个页面传的值
    wx.setNavigationBarTitle({
      title: mes.routeName,
    }),
    
      wx.request({
        //后台接口地址
        url: 'https://lemontree.picp.vip/wanhuayuan/message/getNearDetail',
        data: {
          routeId: this.data.routeId,
          routeDirect: this.data.routeDirect
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
        //根据有多少条数据来判断 导航图片需要多长
          var length = res.data.length * 60;
          that.setData({
            mesDetailList: res.data,
            height: length
          })
          console.log(po + "有多少条数据：" + res.data.length + "状态：" + length);
          //console.log("前面的经度---------------->:" + that.data.mesDetailList[0].STATION_LON);
          var jl = that.data.mesDetailList.length - 1;
          la = that.data.mesDetailList[0].STATION_LAT;
          lo = that.data.mesDetailList[0].STATION_LON;
          po = that.data.mesDetailList[jl].STATION_LON;
          pa = that.data.mesDetailList[jl].STATION_LAT;
          console.log("不来" + "'" + lo + "," + la + "'");
          var origin = "'" + lo + "," + la + "'";

          that.setData({
            longitude:lo,
            latitude:la,
            markers: [{
              iconPath: "../image/qi.png",
              id: 0,
              latitude: la,
              longitude: lo,
              width: 40,
              height: 45
            }, {
              iconPath: "../image/zo.png",
              id: 0,
              latitude: pa,
              longitude: po,
              width: 40,
              height: 45
            }]
          })

          var origin = that.data.markers[0].longitude + ',' + that.data.markers[0].latitude;
          var destination = that.data.markers[1].longitude + ',' + that.data.markers[1].latitude;
          app.origin = origin;
          app.destination = destination;
          //console.log('origin---->', origin);
          //console.log('destination------>', destination);
          var key = config.Config.key;
          var myAmapFun = new amapFile.AMapWX({
            key: key
          });

          myAmapFun.getDrivingRoute({
            origin: origin,
            destination: destination,
            success: function (data) {
              //console.log("乌拉拉-----888------------>" + po);
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
                  width: 4
                }]
               
              });
             // console.log("传闻--------111111------------>" + that.data.polyline[0].points[0].latitude);
              
            },
            fail: function (info) {

            }
          })

          
        },
      //计算 scroll-view 的高度
     
      })
      
  },
  showMap: function () {
    wx.navigateTo({
      url: '../geoserver/geoserver?mesDetailList=' + this.data.mesDetailList + "&rSOrderid=" + this.data.rSOrderid + "&routeDirect=" + this.data.routeDirect + "&routeId=" + this.data.routeId
    })
    
  },
  showList: function () {
    this.setData({
      moshi1:false,
      moshi2:true,
      showMap: true,
      showList: false
    })
  }
  
})
