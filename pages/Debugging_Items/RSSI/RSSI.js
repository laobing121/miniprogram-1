    /*******************************/
    /**********获取设备特征**********/
    /*******************************/

        /*
          
          if (item.properties.write) { // 该特征值可写
            // 本示例是向蓝牙设备发送一个 0x00 的 16 进制数据
            // 实际使用时，应根据具体设备协议发送数据
            let buffer = new ArrayBuffer(1)
            let dataView = new DataView(buffer)
            dataView.setUint8(0, 0)
            wx.writeBLECharacteristicValue({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
              value: buffer,
            })
          }
          if (item.properties.read) { // 该特征值可读
            wx.readBLECharacteristicValue({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
            })
          }
          if (item.properties.notify || item.properties.indicate) {
            // 必须先启用 wx.notifyBLECharacteristicValueChange 才能监听到设备 onBLECharacteristicValueChange 事件
            wx.notifyBLECharacteristicValueChange({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
              state: true,
            })
          }
        }*/








// pages/Debugging_Items/RSSI/RSSI.js
var button_command

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
    var Interval_number

    if(button_command == 0){
      button_command = 1
      this.setData({
        buttonText: "停止",
      });
      Interval_number = setInterval(function() {
        // 这里是需要无限循环执行的任务
        wx.getBLEDeviceRSSI({deviceId,
          success: (res) => {
            console.log("获取蓝牙信号强度")
            that.setData({
              value: res.RSSI,
            })
          },
          fail: (res) => {
            that.setData({
              tips: "获取蓝牙信号强度失败\n" + res.errCode + "\n" + res.errMsg,
            })
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