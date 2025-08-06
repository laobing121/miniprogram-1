// pages/Features/Real-time/Real-time.js
var button_command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "实时时钟校准",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取当前页面
    getApp().TogetCurrentPage()
    //console.log(getApp().globalData.currentPage)
    getApp().globalData.Reconnect_count = 0;

    button_command = 0
    this.setData({
      button_disabled: false,
      tips: "",
      buttonText: "下达",
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

  btn1: async function() {
    wx.vibrateShort();
    this.setData({
      backgroundcolor: "grey",
      button_disabled: true,
      tips: "",
    })

    var that = this;
    try {
      var arrayBuffer1 = new ArrayBuffer(50)
      var dataView = new DataView(arrayBuffer1)
      for(let i = 0; i < 50; i++) {
        dataView.setUint8(i, 0xFF)
      }
      var data = await getApp().Command_Send(1, arrayBuffer1, that.data.title, false)
      if(data.result) {
        var tips_text = ""
    
    
        var arrayBuffer1 = new ArrayBuffer(21)
        dataView = new DataView(arrayBuffer1)
        dataView.setUint8(0, 0x01)
        dataView.setUint8(1, 0x10)
        dataView.setUint8(2, 0x00)
        dataView.setUint8(3, 0x34)
        dataView.setUint8(4, 0x00)
        dataView.setUint8(5, 0x06)
        dataView.setUint8(6, 0x0C)
        const now = new Date()
        dataView.setUint16(7, now.getFullYear() - 2000, false);
        dataView.setUint16(9, now.getMonth() + 1, false);
        dataView.setUint16(11, now.getDate(), false);
        dataView.setUint16(13, now.getHours(), false);
        dataView.setUint16(15, now.getMinutes(), false);
        dataView.setUint16(17, now.getSeconds(), false);
        var crcdataArray = new Uint8Array(arrayBuffer1)
        var crc = getApp().calculateCRC16(crcdataArray, 19)
        console.log(crc)
        dataView.setUint8(19, Math.floor(crc / 256))
        dataView.setUint8(20, crc%256)
        data = await getApp().Command_Send(1, arrayBuffer1, that.data.title)
        if(data.result) {
          console.log(data.detail.value)
          if(data.detail.value.byteLength >= 8) {
            var dataArray = new Uint8Array(data.detail.value)
            if(dataArray[0] == 0x01 && 
              dataArray[1] == 0x10 && 
              dataArray[2] == 0x00 && 
              dataArray[3] == 0x34 && 
              dataArray[4] == 0x00 && 
              dataArray[5] == 0x06) {
                crc = getApp().calculateCRC16(dataArray, 6)
                if(dataArray[6] == Math.floor(crc / 256) && 
                      dataArray[7] == crc%256) {
                        tips_text = that.data.title + "成功!\n"
                      } else {
                        tips_text = that.data.title + "设备响应校验不符。"
                      }
              } else {
                tips_text = that.data.title + "设备响应内容不符。"
              }
          } else {
            tips_text = that.data.title + "设备响应长度不符。"
          }
        }
      }


      if(!(tips_text === "")) {
        that.setData({
          tips: tips_text,
        })
      }
      that.setData({
        backgroundcolor: "#3d8ae5",
        button_disabled: false,
      })
    } catch(e) {
      console.log(e)
      that.setData({
        tips: "Error\n" + e.message,
        backgroundcolor: "#3d8ae5",
        button_disabled: false,
      })
    }
  }
})