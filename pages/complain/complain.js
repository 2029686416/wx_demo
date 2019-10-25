//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    src: ["../image/jias.png"],
    text0: '\n姓名：',
    text1: "\n联系方式：",
    srcimg:'',
    hiddenText: false,
    hiddenImg: true,
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  tapName: function (event) {
    console.log("--来了--->"+event.data[0])
  },
  //失去焦点时获取里面评论内容
  //如果此时我输入的内容是我是一个textarea   第一次点击有如下效果
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)         //打印结果”是我是一个textarea”
    this.setData({
      concent: e.detail.value,
    })
  },
  bindName: function (e) {
    this.setData({
      name: e.detail.value,
    })
  },
  bindPhone: function (e) { 
    this.setData({
      phone: e.detail.value,
    })
    console.log("手机号码："+this.data.phone)
  },
  bindImg: function(){
    this.setData({
      src: e.detail.src,
    })
  },
  tup:function(){
    //success中不能定义this
    var that = this;
    console.log("000000");
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log("调用图片成功！" + tempFilePaths);
        that.setData({
          hiddenText: true,
          hiddenImg: false,
          srcimg: tempFilePaths
        })
        console.log(that.data.srcimg);
      }
    })

  },
  bindgetuserinfo: function (e) {
    var that = this;
    wx.request({
      //后台接口地址
      url: 'https://lemontree.picp.vip/wanhuayuan/message/addMess',
      data: {
        concent: this.data.concent,
        name: this.data.name,
        phone: this.data.phone,
        src: this.data.srcimg
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("状态：" + res.statusCode);
        //将文本框中内容清空
        that.setData({
          concent:'',
          name: '',
          phone: '',
          hiddenText: false,
          hiddenImg: true
        })
        wx.navigateTo({
          url: '../message2/message2',
        })
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
  }
})
