// pages/Debugging_Items/BLE_initialization/BLE_initialization.js
var button_command
var value1 = 1000 //广播间隔
var value2 = 30 //连接间隔
var value3 = 3000//连接丢失时间

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "初始化蓝牙参数",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
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
    var tips_text = ""
    var arrayBuffer1 = new ArrayBuffer(6)
    var dataView = new DataView(arrayBuffer1)
    dataView.setUint8(0, 0x01)
    dataView.setUint8(1, 0xFC)
    dataView.setUint8(2, 0x09)
    dataView.setUint8(3, 0x02)
    let temp = Math.round(Number(value1))
    dataView.setUint8(4, temp % 256)
    temp = Math.floor(temp / 256)
    dataView.setUint8(5, temp)
    var data = await getApp().Command_Send(3, arrayBuffer1, that.data.title)
    if(data.result) { //只处理正常结果，不处理异常结果
      console.log(data.detail)
      if(data.detail.value.byteLength >= 5) { //返回字节数吻合
        var dataArray = new Uint8Array(data.detail.value)
        if(dataArray[0] == 0x04 && 
          dataArray[1] == 0xFC && 
          dataArray[2] == 0x09 && 
          dataArray[3] == 0x01 && 
          dataArray[4] == 0x00) {

            arrayBuffer1 = new ArrayBuffer(9)
            dataView = new DataView(arrayBuffer1)
            dataView.setUint8(0, 0x01)
            dataView.setUint8(1, 0xFC)
            dataView.setUint8(2, 0x03)
            dataView.setUint8(3, 0x05)
            temp = Math.round(Number(value2))
            dataView.setUint8(4, temp % 256)
            temp = Math.floor(temp / 256)
            dataView.setUint8(5, temp)
            temp = Math.round(Number(value3))
            dataView.setUint8(6, temp % 256)
            temp = Math.floor(temp / 256)
            dataView.setUint8(7, temp)
            dataView.setUint8(8, 0)
            data = await getApp().Command_Send(3, arrayBuffer1, that.data.title)
            if(data.result) {
              console.log(data.detail)
              if(data.detail.value.byteLength >= 5) {
                dataArray = new Uint8Array(data.detail.value)
                if(dataArray[0] == 0x04 && 
                  dataArray[1] == 0xFC && 
                  dataArray[2] == 0x03 && 
                  dataArray[3] == 0x01 && 
                  dataArray[4] == 0x00) {
                    tips_text = that.data.title + "成功!\n" //不轻易说，只在最后说
                  }
                  else {
                    tips_text = "连接参数设置，" + "设备响应内容不符。"
                  }
              }
              else {
                tips_text = "连接参数设置，" + "设备响应长度不符。"
              }
            }
          }
          else {
            tips_text = "广播间隔设置，" + "设备响应内容不符。"
          }
      }
      else {
        tips_text = "广播间隔设置，" + "设备响应长度不符。"
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
  }
})