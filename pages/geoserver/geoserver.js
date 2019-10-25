// pages/geoserver/geoserver.js
const util = require('../../utils/util.js')

Page({
  data: {
    
  },
  onLoad: function (mes) {
    this.setData({
      data: mes.mesDetailList,
      rSOrderid: mes.rSOrderid,
      routeDirect: mes.routeDirect,
      routeId: mes.routeId,
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
