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
      bordercolor: "#3d8ae5",
      button_disabled: true,
      tips: "",
    })

    var that = this;
    try {
      //检查value1
      if(!isNaN(parseFloat(value1)) && isFinite(value1)) {
        value1 = Math.round(value1)
        if((value1 < 1e8) && (value1 > -1e8)) {
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
            dataView.setInt32(7, value1, false); // 将浮点数写入缓冲区（小端序）（Little Endian）
            var crcdataArray = new Uint8Array(arrayBuffer1)
            var crc = getApp().calculateCRC16(crcdataArray, 11)
            console.log(crc)
            dataView.setUint8(11, Math.floor(crc / 256))
            dataView.setUint8(12, crc%256)
            data = await getApp().Command_Send(1, arrayBuffer1, that.data.title)
            if(data.result) {
              console.log(data.detail.value)
              if(data.detail.value.byteLength >= 8) {
                var dataArray = new Uint8Array(data.detail.value)
                if(dataArray[0] == 0x01 && 
                  dataArray[1] == 0x10 && 
                  dataArray[2] == 0x00 && 
                  dataArray[3] == 0x04 && 
                  dataArray[4] == 0x00 && 
                  dataArray[5] == 0x02) {
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
        } else{
          that.setData({
            tips: "数值超出范围！",
            backgroundcolor: "#3d8ae5",
            bordercolor: "red",
            button_disabled: false,
          })
        }
      } else{
        that.setData({
          tips: "输入非法！",
          backgroundcolor: "#3d8ae5",
          bordercolor: "red",
          button_disabled: false,
        })
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