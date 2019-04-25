// pages/pageB/page.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data:{
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openid:app.globalData.openid,
      userid:app.globalData.userid
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
  onGetOpenid: function () {
    // 调用云函数
    
  },
  getDb: function(){
    const db = wx.cloud.database();
    db.collection('schedule').get({
      success: function(res){
        console.log(res);
      }
    });
  },
  formSubmit: function(e){
    console.log(e);
    const db = wx.cloud.database();
    console.log("the userid is:", app.globalData.userid);
    if(app.globalData.userid==null){
      //数据库没有存在所以要重新创建
      db.collection('name').add({
        data: {
          campus: e.detail.value.campus,
          year: e.detail.value.year,
          month: e.detail.value.month,
          day: e.detail.value.day
        },success: res=>{
          console.log("the res is:",res);
          app.globalData.userid=res._id;
          console.log("the new userid is:", app.globalData.userid);
        },
        fail: res => {
          console.log("the datebase has exist")
        }
      })
    }else{
      db.collection('name').doc(app.globalData.userid).update({
        data: {
          campus: e.detail.value.campus,
          year: e.detail.value.year,
          month: e.detail.value.month,
          day: e.detail.value.day
        },
        success: res => {
          console.log('succeed the database has updated!')
          wx.switchTab({
            url: '../pageA/page',
          })
        },
        fail: err => {
          icon: 'none',
            console.error('[数据库] [更新记录] 失败：', err);
        }
      });
    }
  },
  formReset:function(){
    console.log('the form has reset!')
  },
  showid: function(){
    console.log('the openid is:'+app.globalData.openid)
  }
 
})