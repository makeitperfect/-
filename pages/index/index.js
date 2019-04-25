// pages/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ideal_goal:"清华大学",
    dataEnd: {
      year: 2019,
      month: 12,
      day: 16
    },
    openid:'',
    userInfo:{},
    logged:false,
    avatarUrl:'./images/my.png',
    haveSch:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!wx.cloud){
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
    }
    //从函数中获取openid，并存入全局变量之中
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        app.globalData.unionid = res.result.unionid
        this.openid = res.result.openid
        this.getMainInfo(res.result.openid)
        this.getScheInfo(res.result.openid)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
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
  //从数据库获得主要的信息
  getMainInfo:function(resOpenid){
    const db =wx.cloud.database()
    db.collection('name').where({
      _openid: resOpenid
    }).get({
      success: res => {
        console.log(res.data[0]._id)
        this.setData({
          ideal_goal: res.data[0].campus,
          dataEnd: {
            year: res.data[0].year,
            month: res.data[0].month,
            day: res.data[0].day
          },
        })
        app.globalData.userid = res.data[0]._id
        //获取当前时间戳  
        var timestamp = Date.parse(new Date());
        var data = this.data.dataEnd.year + '-' + this.data.dataEnd.month + '-' + this.data.dataEnd.day;
        timestamp = new Date(data + ' 00:00:00') - timestamp;
        console.log("当前时间戳为：" + data);
        //日  
        var D = timestamp / 1000 / 60 / 60 / 24;
        this.setData({
          "days": D.toFixed(0)
        })
        app.globalData.userid = userid
      },
      fail: () => {
        console.log("没有找到想要的结果！")
      }
    })

  },
  
  //从数据库找到相应的日程信息
  getScheInfo:function(resOpenid){
    const db = wx.cloud.database()
    console.log('the op id is :' + resOpenid)
    db.collection('schedule').where({
      _openid: resOpenid
    }).get({
      success: res => {
        console.log(res.data.length)
        this.setData({
          schedule: res.data
        })
        if (res.data.length==0){
          this.setData({
            haveSch:false
          })
        }else{
          this.setData({
            haveSch: true
          })
        }
        console.log("the havsch is" + this.haveSch)
      },
      fail:() => {
        console.log("您现在还没有日程!")
        wx.navigateTo({
          url: '/pages/pageC/page',
        })
      }
    })
 
  },
  addProject:function(){
    wx.navigateTo({
      url: '/pages/pageC/page',
    })
  },
  onPullDownRefresh:function(){
    this.onLoad()
    this.getMainInfo(this.openid)
    this.getScheInfo(this.openid)
  },
  delItem:function(even){
    console.log("the event is",even.currentTarget.dataset.itemid)
    const db = wx.cloud.database()
    db.collection('schedule').doc(even.currentTarget.dataset.itemid).remove({
      success:()=>{
        console.log("记录删除成功")
        this.getScheInfo(this.openid)
      },
      fail:()=>{
        console.log("删除数据失败！")
      }
    })
  }
})