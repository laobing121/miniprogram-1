// pages/Features/Diameter/Diameter.js
var btn_enable;
var value;

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
    btn_enable = true;
    this.setData({
      backgroundcolor: "#3d8ae5",
      tips: "",
      input: "",
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

  bindInput(e) {
    value = e.detail.value;
  },

  btn1() {
    if(btn_enable == true) {
      btn_enable = false;
      wx.vibrateShort();

      if(getApp().isNumber(value)) {
        if(value >= 80 && value <= 2000) {
          this.setData({
            backgroundcolor: "grey",
            //tips: value,
            tips: "通信中，请稍候",
          });
        } else {
          btn_enable = true;
          this.setData({
            tips: "数值超范围！",
            });
        }
      } else {
        btn_enable = true;
        this.setData({
          tips: "输入有误！",
          });
      }
    }
  }
})