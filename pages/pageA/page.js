// pages/pageA/page.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "user":{
      "userName": "无",
      "signature":"Try,and you can succeed!"
    },
    userInfo: {},
    logged: false,
    avatarUrl:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户信息
    this.setData({
      userInfo: app.globalData.userInfo,
      avatarUrl:app.globalData.userInfo.avatarUrl
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

  },
  /**
   * 点击设置信息时触发的跳转事件
   */
  setinfo:function(){
    wx.navigateTo({
      url: '/pages/pageB/page',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})