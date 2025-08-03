// pages/Features/Data-correction/Data-correction.js
var button_command
var value1 //累计流量

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "数据更正",
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
      value1_disabled: false,
      tips: "",
      buttonText: "下达",
      input_value1: "",
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

  bindInput1(e) {
    value1 = e.detail.value;
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


        var arrayBuffer1 = new ArrayBuffer(13)
        dataView = new DataView(arrayBuffer1)
        dataView.setUint8(0, 0x01)
        dataView.setUint8(1, 0x10)
        dataView.setUint8(2, 0x00)
        dataView.setUint8(3, 0x04)
        dataView.setUint8(4, 0x00)
        dataView.setUint8(5, 0x02)
        dataView.setUint8(6, 0x04)
        
      }
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