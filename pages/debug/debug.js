// pages/debug/debug.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'RSSI', value: '001 蓝牙信号强度' },
      { name: 'Device_Name', value: '002 修改设备名称' },
      { name: 'BLE_Parameters', value: '003 设定蓝牙参数' },
      { name: 'BLE_information', value: '004 查询蓝牙信息' },
      { name: 'BLE_initialization', value: '005 初始化蓝牙参数' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  btn1(event) {
    wx.vibrateShort();
      wx.navigateTo({
        url: '/pages/Debugging_Items/' + event.currentTarget.id + '/' + event.currentTarget.id,
      })
  }
})