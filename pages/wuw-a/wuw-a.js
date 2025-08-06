// pages/wuw-a/wuw-a.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'Parameter', value: '001 仪表参数设置' },
      { name: 'Data', value: '002 读取计量数据' },
      { name: 'Debugging', value: '003 读取调试数据' },
      { name: 'Verify', value: '004 读取检定数据' },
      { name: 'Real-time', value: '005 实时时钟校准'},
      { name: 'Data-correction', value: '006 数据更正'},
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
        url: '/pages/Features/' + event.currentTarget.id + '/' + event.currentTarget.id,
      })
  }
})