// pages/Parameter_Items/Metering_parameters/Metering_parameters.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "计量参数",
    array1: [
      '单向', 
      '双向',
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      value1_disabled: true,
      index1: getApp().Param_temp.Measuring_Direction,
      input_value1: getApp().Param_temp.Zero,
      input_value2: getApp().Param_temp.Startup,
      input_value3: getApp().Param_temp.Correction_Factor,
      input_value4: getApp().Param_temp.Moving_Average,
    })
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

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
    getApp().Param_temp.Measuring_Direction = e.detail.value
  },

  bindInput1(e) {
    getApp().Param_temp.Zero = e.detail.value;
  },

  bindInput2(e) {
    getApp().Param_temp.Startup = e.detail.value;
  },

  bindInput3(e) {
    getApp().Param_temp.Correction_Factor = e.detail.value;
  },

  bindInput4(e) {
    getApp().Param_temp.Moving_Average = e.detail.value;
  },
})