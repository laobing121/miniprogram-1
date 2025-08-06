// pages/Features/Verify/Verify.js
var button_command
var Interval_number
var value1 //瞬时流量
var value2 //平均值
var value3 //加和
var value4 //除数
var Communication_successful = 0
var Communication_count = 0
var Cycle_complete = true

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "读取检定数据",
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
      value1_disabled: true,
      tips: "",
      buttonText: "读取",
      input_value1: "",
      input_value2: "",
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
    clearInterval(Interval_number)
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
    var that = this

    if(button_command == 0){
      button_command = 1
      this.setData({
        buttonText: "停止",
      });
      Communication_successful = 0
      Communication_count = 0
      value3 = 0
      value4 = 0

      try {
        var arrayBuffer1 = new ArrayBuffer(50)
        var dataView = new DataView(arrayBuffer1)
        for(let i = 0; i < 50; i++) {
          dataView.setUint8(i, 0xFF)
        }
        var data = await getApp().Command_Send(1, arrayBuffer1, that.data.title, false)
        if(data.result) {
          Interval_number = setInterval(async function() {
            if(Cycle_complete) {
              Cycle_complete = false
              

              Communication_count++
              // 这里是需要无限循环执行的任务
              var tips_text = ""
    
    
              arrayBuffer1 = new ArrayBuffer(8)
              dataView = new DataView(arrayBuffer1)
              dataView.setUint8(0, 0x01)
              dataView.setUint8(1, 0x03)
              dataView.setUint8(2, 0x00)
              dataView.setUint8(3, 0x32)
              dataView.setUint8(4, 0x00)
              dataView.setUint8(5, 0x04)
              var crcdataArray = new Uint8Array(arrayBuffer1)
              var crc = getApp().calculateCRC16(crcdataArray, 6)
              console.log(crc)
              dataView.setUint8(6, Math.floor(crc / 256))
              dataView.setUint8(7, crc%256)
              data = await getApp().Command_Send(1, arrayBuffer1, that.data.title)
              if(data.result) {
                console.log(data.detail.value)
                if(data.detail.value.byteLength >= 13) {
                  var dataArray = new Uint8Array(data.detail.value)
                  if(dataArray[0] == 0x01 && 
                    dataArray[1] == 0x03 && 
                    dataArray[2] == 0x08) {
                      crc = getApp().calculateCRC16(dataArray, 11)
                      if(dataArray[11] == Math.floor(crc / 256) && 
                      dataArray[12] == crc%256) {
                        //数值解析
                        const buffer = new ArrayBuffer(8)
                        const uint8Array = new Uint8Array(buffer)
                        uint8Array.set(dataArray.slice(3, 11), 0)
                        value1 = getApp().bytesToDouble(buffer);

                        value3 += value1
                        value4++
                        value2 = value3 / value4

                        that.setData({
                          input_value1: value1,
                          input_value2: value2,
                        })

                        Communication_successful++
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


              if(!(tips_text === "")) {
                that.setData({
                  tips: tips_text,
                })
              }
              that.setData({
                countings: Communication_successful + "/" + Communication_count,
              })
              Cycle_complete = true
            }
          }, 2100)
        }
      } catch(e) {
        console.log(e)
        that.setData({
          tips: "Error\n" + e.message,
          backgroundcolor: "#3d8ae5",
          button_disabled: false,
          buttonText: "读取",
        })
        button_command = 0
        clearInterval(Interval_number)
      }
    }
    else {
      button_command = 0
      this.setData({
        buttonText: "读取",
      });
      clearInterval(Interval_number)
      Cycle_complete = true
    }
  }
})