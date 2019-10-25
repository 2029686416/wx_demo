//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    srcimg:'',
    concent: '',
    routeName: '万华线1',
    name1:'候车站',
    name2: '内③门站',
    time: '10'
  },
  blurInput: function (e) {
    this.setData({
      sou: e.detail.value,
    })
  },
  onLoad: function () {
    console.log("一进入就加载");
    var that = this;
    wx.request({
      //后台接口地址
      url: 'https://lemontree.picp.vip/wanhuayuan/message/getNear',
      data: {
        name: this.data.concent
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("状态：" + res.statusCode);
        that.setData({
          mesList: res.data,
       })
      }
    })
    
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  bindName: function (e) {
    this.setData({
      name: e.detail.value,
    })

    console.log("传闻--666------------------>"+this.data.name);
  },
  getDetail: function(event){
    console.log("来了------>" + event.currentTarget.dataset.hi)
    var num = event.currentTarget.dataset.hi;
    wx.navigateTo({
      url: '../nearDetail/nearDetail?routeId=' + this.data.mesList[num].ROUTE_ID + "&routeName=" + this.data.mesList[num].STATION_NAME + "&rSOrderid=" + this.data.mesList[num].R_S_ORDERID + "&routeDirect=" + this.data.mesList[num].ROUTE_DIRECT + "&descp=" + this.data.mesList[num].P_R_DESCP + "&deparTime=" + this.data.mesList[num].DEPARTURE_TIME + "&vehTime=" + this.data.mesList[num].CAL_VEH_TIME
    })
  },
  getSou: function(){
    var that = this;
    wx.request({
      //后台接口地址
      url: 'https://lemontree.picp.vip/wanhuayuan/message/getNear',
      data: {
        name: this.data.name
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("77状态：" + res.statusCode);
        that.setData({
          mesList: res.data,
        })
      }
    })
  }
  
})
