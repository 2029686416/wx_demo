//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    srcimg:'',
    concent: '',
  },
  onLoad: function () {
    console.log("一进入就加载");
    var that = this;
    wx.request({
      //后台接口地址
      url: 'https://lemontree.picp.vip/wanhuayuan/message/getMess',
      data: {
        name: this.data.concent
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("有多少条数据："+res.data.length+"状态：" + res.statusCode + '返回数据：' + res.data[0].name);
        that.setData({
          mesList: res.data
        })
      }
    })

    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onShow() {
    this.onLoad()
  },
  //失去焦点时获取里面评论内容
  //如果此时我输入的内容是我是一个textarea   第一次点击有如下效果
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)         //打印结果”是我是一个textarea”
    this.setData({
      concent: e.detail.value,
    })
  },
  bindgetuserinfo: function (e) {
    var that = this;
    wx.request({
      //后台接口地址
      url: 'https://lemontree.picp.vip/ssmDemo/userAction/list.action',
      data: {
        name: this.data.concent
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("状态：" + res.statusCode + '返回数据：' + res.data[0].a);
        //将文本框中内容清空
        that.data.concent='';
        that.setData({
          concent:''
        })
        console.log("清空后的值：" +that.data.concent);
      }
    })
  },
  bindgetuserinfo_2: function (e) {
    var that = this;
    console.log("内容："+this.data.concent);
    console.log("------->"+e.detail.userInfo);
    if (e.detail.userInfo) {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      wx.login({
        success(res) {
          //console.log("---->"+res.code, e.detail.iv, e.detail.encryptedData)
          wx.request({
            //后台接口地址
            url: 'https://lemontree.picp.vip/ssmDemo/userAction/list.action',
            data: {
              name:'小花'
            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log("状态："+res.statusCode+'返回数据：'+res.data[0].a)
            }
          })
        }
      })
    } else {
      console.log(333, '执行到这里，说明拒绝了授权')
      wx.showToast({
        title: "为了您更好的体验,请先同意授权",
        icon: 'none',
        duration: 2000
      });
    }
  },
  getMes:function(){
    wx.navigateTo({
      url: '../complain/complain',
    })
  }
})
