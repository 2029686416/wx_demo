// pages/index/login.js
Page({
  data: {
    userName: '',
    userPwd: "",
  },
  //获取用户输入的用户名
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  passWdInput: function (e) {
    this.setData({
      userPwd: e.detail.value
    })
  },
  //获取用户输入的密码
  loginBtnClick: function (e) {
    wx.navigateTo({
      url: '../complain/complain',
    })
    console.log("用户名：" + this.data.userName + " 密码：" + this.data.userPwd);
  },
  go:function(){
    wx.switchTab({
      url: '../complain/complain',
    })
      console.log("来了来了老弟");
  }
  ,
  enterSetTabBarPage() {
    console.log(123);
    this.setData({
      isComplainPage: true
    })
  },
  // 用户点击右上角分享
  onShareAppMessage: function () {

  }
})