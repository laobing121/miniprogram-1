// pages/page00.js
var radio_value;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
        { name: 'wuf-c', value: 'KCL-C' },
        { name: 'wuw-a', value: 'KCS-A'},
        { name: 'wuw-c', value: 'KCS-C' , checked: 'true' },
        { name: 'debug', value: 'Other equipment'},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    radio_value = 'wuw-c';
    getApp().globalData.Instrument_type = radio_value
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
    this.setData({
      backgroundcolor: "#3d8ae5",
    });
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

  radioChange: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    /*this.data.items[2].checked = "true";
    console.log(this.data.items)*/
    radio_value = e.detail.value;
    getApp().globalData.Instrument_type = radio_value
  },

  btn1(e) {
    wx.vibrateShort();
    this.setData({
      backgroundcolor: "grey",
      });
    wx.navigateTo({
      //url: '/pages/' + radio_value + '/' + radio_value,
      url: '/pages/other/other',
    })
  }
})
