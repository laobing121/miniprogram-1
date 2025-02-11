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








// pages/Debugging_Items/Device_Name/Device_Name.js
var button_command
var value

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
      button_disabled: false,
      tips: "",
      buttonText: "下达",
      input: "",
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

  bindInput(e) {
    value = e.detail.value;
    this.setData({
      tips: "",
    })
  },

  //二维码扫描
  skyOnclick(event) {
    var that = this;
    wx.vibrateShort();
    that.setData({
      input_value: "",
      tips: "",
    })

    wx.scanCode({
      success (res) {
        console.log(res)
        var temp = res.result;
        if(String(temp).length <= 15){
          if(!isNaN(parseFloat(temp)) && isFinite(temp)) {
            value = temp
            that.setData({
              input_value: value,
            });
          }
          else{
            that.setData({
              tips: "输入有误.",
            })
          }
        }
        else {
          that.setData({
            tips: "输入有误.",
          })
        }
      }
    })
  },

  btn1() {
    this.setData({
      tips: "",
    })
  },
})