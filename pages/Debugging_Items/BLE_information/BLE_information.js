// pages/Debugging_Items/BLE_information/BLE_information.js
var button_command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "查询蓝牙信息",
    backgroundcolor: "#3d8ae5",
    button_disabled: false,
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
      tips: "",
      });

      var that = this;
      let arrayBuffer1 = new ArrayBuffer(4)
      let dataView = new DataView(arrayBuffer1)
      dataView.setUint8(0, 0x01)
      dataView.setUint8(1, 0xFC)
      dataView.setUint8(2, 0x18)
      dataView.setUint8(3, 0x00)
      var data = await getApp().Command_Send(3, arrayBuffer1, that.data.title)
      if(data.result) {
        var tips_text = ""
        console.log(data.detail)
        if(data.detail.value.byteLength >= 6) { //返回字节数吻合
          var dataArray = new Uint8Array(data.detail.value)
          if(dataArray[0] == 0x04 && 
            dataArray[1] == 0xFC && 
            dataArray[2] == 0x18) {
              const buffer = new ArrayBuffer(data.detail.value.byteLength - 5)
              const uint8Array = new Uint8Array(buffer)
              uint8Array.set(dataArray.slice(5), 0)
              var str
              try{
                str = decodeURIComponent(escape(String.fromCharCode(...uint8Array)))
                //const str = "12345678901234567890123456789012345678901234567890"
                that.setData({
                  value: str,
                })
                tips_text = that.data.title + "成功!\n"
              } catch(e) {
                console.log(e)
                tips_text = "信息转换故障\n" + e.message
              }
            }
            else {
              tips_text = "设备响应内容不符。"
            }
        }
        else {
          tips_text = "设备响应长度不符。"
        }

        that.setData({
          tips: tips_text,
        })
      }
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

  }
})