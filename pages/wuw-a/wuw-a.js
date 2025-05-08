// pages/wuw-a/wuw-a.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'Parameter', value: '001 仪表参数设置' },
      { name: 'Data', value: '002 读取当前参数' },
      { name: 'Transducer_Type', value: '003 设置公称直径' },
      { name: 'Startup', value: '004 设定始动流速'},
      { name: 'Baud_Rate', value: '005 设置波特率'},
      { name: 'Parity_Bit', value: '006 设置校验位'},
      { name: 'Mailing_Address', value: '007 设定通信地址'},
      { name: 'Communication_Protocol', value: '008 设置通信协议'},
      { name: 'Measuring_Direction', value: '009 正负累计流量交替显示开关'},
      { name: 'Moving_Average', value: '010 设定滑动平均参数'},
      { name: 'Cheat', value: '011 标定状态开关'},
      { name: 'Unit_Flow_velocity', value: '012 调零状态开关'},
      { name: 'Zero', value: '013 设定零流量'},
      { name: 'Correction_Factor', value: '014 设定总修正系数'},
      { name: 'Multistage', value: '015 设定分组修正系数'},
      { name: 'Real-time', value: '016 实时时钟校准'},
      { name: 'Data-correction', value: '017 数据更正'},
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