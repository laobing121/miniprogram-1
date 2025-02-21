// pages/Debugging_Items/RSSI/RSSI.js
var button_command
var Reconnect_count = 0//重连次数
var Interval_number

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    button_command = 0
    this.setData({
      value: "",
      buttonText: "读取",
      tips: "",
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    var deviceId = getApp().globalData.deviceId
    wx.closeBLEConnection({
      deviceId,
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  btn1(e) {
    wx.vibrateShort(); 
    var that = this

    if(button_command == 0){
      button_command = 1
      this.setData({
        buttonText: "停止",
      });
      Interval_number = setInterval(function() {
        // 这里是需要无限循环执行的任务
        var deviceId = getApp().globalData.deviceId
        if(getApp().globalData.Reconnect){
          //预重连
          wx.createBLEConnection({
            deviceId,
            success: (res) => {
              console.log("重连成功！")
              getApp().globalData.Reconnect = false
            },
          })
        }
        wx.getBLEDeviceRSSI({deviceId,
          success: (res) => {
            console.log("获取蓝牙信号强度")
            that.setData({
              tips: "",
            })
            Reconnect_count = 0
            that.setData({
              value: res.RSSI,
            })
          },
          fail: (res) => {
            that.setData({
              tips: "获取蓝牙信号强度失败\n" + res.errCode + "\n" + res.errMsg,
            })
            if(getApp().globalData.Reconnect){
              //重连
              wx.createBLEConnection({
                deviceId,
                success: (res) => {
                  console.log("重连成功！")
                  getApp().globalData.Reconnect = false
                },
                fail: (res) => {
                  Reconnect_count++
                  console.log("重连失败-" + Reconnect_count)
                  if(Reconnect_count >= 3){
                    //假设没有向后翻页
                    getApp().globalData.Reconnect = false
                    //返回连接页
                    //console.log(getCurrentPages())
                    var pagestacks = getCurrentPages()
                    var step = pagestacks.length - 2
                    if(step > 0){
                      wx.navigateBack({
                        delta: step
                      })
                    }
                  }
                }
              })
            }
          },
        })
      }, 1000)
    }
    else{
      button_command = 0
      this.setData({
        buttonText: "读取",
      });
      clearInterval(Interval_number)
    }
  }
})