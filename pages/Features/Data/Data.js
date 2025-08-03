// pages/Features/Data/Data.js
var button_command
var Interval_number
var value1 //瞬时流量
var value2 //流速
var value3 //正累积流量
var value4 //负累积流量
var value5 //压力
var value6 //温度
var value7 //测量时间
var value8 //运行时间
var Communication_successful = 0
var Communication_count = 0
var Cycle_complete = true
//锁屏、手机程序切换、微信内小程序切换（浮窗），会中断连续读取，可恢复。

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "计量数据读取",
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
      input_value3: "",
      input_value4: "",
      input_value5: "",
      input_value6: "",
      input_value7: "",
      input_value8: "",
      });

    /*const buffer = new ArrayBuffer(2);
    const view = new DataView(buffer);
    view.setUint8(0, 0x01)
    view.setUint8(1, 0x80)
    var dataArray = new Uint8Array(buffer)
    var temp = dataArray[1] * 256 + dataArray[0]
    console.log(temp)
    if(temp > 32767) {
      temp -= 0x10000
    }
    console.log(temp)*/
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
        buttonText: "暂停",
      });
      Communication_successful = 0
      Communication_count = 0

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
              dataView.setUint8(3, 0x00)
              dataView.setUint8(4, 0x00)
              dataView.setUint8(5, 0x18)
              var crcdataArray = new Uint8Array(arrayBuffer1)
              var crc = getApp().calculateCRC16(crcdataArray, 6)
              console.log(crc)
              dataView.setUint8(6, Math.floor(crc / 256))
              dataView.setUint8(7, crc%256)
              data = await getApp().Command_Send(1, arrayBuffer1, that.data.title)
              if(data.result) {
                console.log(data.detail.value)
                if(data.detail.value.byteLength >= 53) {
                  var dataArray = new Uint8Array(data.detail.value)
                  if(dataArray[0] == 0x01 && 
                    dataArray[1] == 0x03 && 
                    dataArray[2] == 0x30) {
                      crc = getApp().calculateCRC16(dataArray, 51)
                      if(dataArray[51] == Math.floor(crc / 256) && 
                      dataArray[52] == crc%256) {
                        //数值解析
                        const buffer = new ArrayBuffer(4)
                        const uint8Array = new Uint8Array(buffer)
                        uint8Array.set(dataArray.slice(3, 7), 0)
                        value1 = getApp().bytesToLong(buffer) / 1000.0;

                        uint8Array.set(dataArray.slice(7, 11), 0)
                        value2 = getApp().bytesToLong(buffer) / 10000.0;

                        uint8Array.set(dataArray.slice(19, 23), 0)
                        value3 = getApp().bytesToLong(buffer);

                        //转换为16位有符号整数
                        var temp = dataArray[23] * 256 + dataArray[24] //js默认变量为Int32
                        temp &= 0xFFFF
                        if(temp > 32767) {
                          temp -= 0x10000
                        }
                        value3 += (temp / 10000.0)

                        temp = dataArray[25] * 256 + dataArray[26]
                        temp &= 0xFFFF
                        if(temp > 32767) {
                          temp -= 0x10000
                        }
                        value3 += (temp * 1e8)

                        uint8Array.set(dataArray.slice(27, 31), 0)
                        value4 = getApp().bytesToLong(buffer);
                        
                        temp = dataArray[31] * 256 + dataArray[32] 
                        temp &= 0xFFFF
                        if(temp > 32767) {
                          temp -= 0x10000
                        }
                        value4 += (temp / 10000.0)

                        temp = dataArray[33] * 256 + dataArray[34]
                        temp &= 0xFFFF
                        if(temp > 32767) {
                          temp -= 0x10000
                        }
                        value4 += (temp * 1e8)
                        //是个负值

                        uint8Array.set(dataArray.slice(35, 39), 0)
                        value5 = getApp().bytesToLong(buffer) / 100.0;

                        uint8Array.set(dataArray.slice(39, 43), 0)
                        value6 = getApp().bytesToLong(buffer) / 10.0;

                        uint8Array.set(dataArray.slice(43, 47), 0)
                        value7 = getApp().bytesToLong(buffer);

                        uint8Array.set(dataArray.slice(47, 51), 0)
                        //console.log(buffer)
                        value8 = getApp().bytesToLong(buffer);
                        //console.log(value8)

                        that.setData({
                          input_value1: value1,
                          input_value2: value2,
                          input_value3: value3,
                          input_value4: value4,
                          input_value5: value5,
                          input_value6: value6,
                          input_value7: value7,
                          input_value8: value8,
                        })

                        Communication_successful++
                        tips_text = that.data.title + "成功!\n"
                      }
                      else {
                        tips_text = that.data.title + "设备响应校验不符。"
                      }
                    }
                    else {
                      tips_text = that.data.title + "设备响应内容不符。"
                    }
                }
                else {
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