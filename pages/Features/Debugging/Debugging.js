// pages/Features/Debugging/Debugging.js
var button_command
var Interval_number
var Multi_params = [
  {flowP: 0.00, factP: 1.00000, flowN: 0.00, factN: 1.00000},
  {flowP: 0.00, factP: 1.00000, flowN: 0.00, factN: 1.00000},
  {flowP: 0.00, factP: 1.00000, flowN: 0.00, factN: 1.00000},
  {flowP: 0.00, factP: 1.00000, flowN: 0.00, factN: 1.00000},
];
var value1 //电池电压
var value2 //固件版本

var Communication_successful = 0
var Communication_count = 0
var Cycle_complete = true

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "调试数据读取",
    items: [
      { index: "01", valueP: "", valueN: "", colorP: "#3d8ae5", colorN: "#3d8ae5" },
      { index: "02", valueP: "", valueN: "", colorP: "#3d8ae5", colorN: "#3d8ae5" },
      { index: "03", valueP: "", valueN: "", colorP: "#3d8ae5", colorN: "#3d8ae5" },
      { index: "04", valueP: "", valueN: "", colorP: "#3d8ae5", colorN: "#3d8ae5" },
    ],
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
      states: "",
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
              var states_text = ""
    
    
              arrayBuffer1 = new ArrayBuffer(8)
              dataView = new DataView(arrayBuffer1)
              dataView.setUint8(0, 0x01)
              dataView.setUint8(1, 0x03)
              dataView.setUint8(2, 0x00)
              dataView.setUint8(3, 0x18)
              dataView.setUint8(4, 0x00)
              dataView.setUint8(5, 0x16)
              var crcdataArray = new Uint8Array(arrayBuffer1)
              var crc = getApp().calculateCRC16(crcdataArray, 6)
              console.log(crc)
              dataView.setUint8(6, Math.floor(crc / 256))
              dataView.setUint8(7, crc%256)
              data = await getApp().Command_Send(1, arrayBuffer1, that.data.title)
              if(data.result) {
                console.log(data.detail.value)
                if(data.detail.value.byteLength >= 49) {
                  var dataArray = new Uint8Array(data.detail.value)
                  if(dataArray[0] == 0x01 && 
                    dataArray[1] == 0x03 && 
                    dataArray[2] == 0x2C) {
                      crc = getApp().calculateCRC16(dataArray, 47)
                      if(dataArray[47] == Math.floor(crc / 256) && 
                      dataArray[48] == crc%256) {
                        //数值解析
                        var temp = dataArray[5] * 256 + dataArray[6] //js默认变量为Int32
                        if(temp == 0) {
                          states_text += "正常\n"
                        } else {
                          if(temp & 0x00000001) {
                            states_text += "01声道流量大幅波动\n"
                          }
                          if(temp & 0x00000002) {
                            states_text += "02声道流量大幅波动\n"
                          }
                          if(temp & 0x00000004) {
                            states_text += "03声道流量大幅波动\n"
                          }
                          if(temp & 0x00000008) {
                            states_text += "04声道流量大幅波动\n"
                          }
                          if(temp & 0x00000010) {
                            states_text += "01声道信号丢失\n"
                          }
                          if(temp & 0x00000020) {
                            states_text += "02声道信号丢失\n"
                          }
                          if(temp & 0x00000040) {
                            states_text += "03声道信号丢失\n"
                          }
                          if(temp & 0x00000080) {
                            states_text += "04声道信号丢失\n"
                          }
                          if(temp & 0x00000100) {
                            states_text += "流量测量故障\n"
                          }
                          if(temp & 0x00000200) {
                            states_text += "电池电量低\n"
                          }
                          if(temp & 0x00000400) {
                            states_text += "电池电量即将耗尽\n"
                          }
                          if(temp & 0x00000800) {
                            states_text += "压力传感器故障\n"
                          }
                          if(temp & 0x00001000) {
                            states_text += "温度传感器故障\n"
                          }
                        }

                        //第一声道正向信号强度
                        const buffer = new ArrayBuffer(4)
                        const uint8Array = new Uint8Array(buffer)
                        uint8Array.set(dataArray.slice(7, 11), 0)
                        var dataView_temp = new DataView(buffer);
                        Multi_params[0].flowP = dataView_temp.getFloat32(0, false);

                        //第一声道反向信号强度
                        uint8Array.set(dataArray.slice(11, 15), 0)
                        dataView_temp = new DataView(buffer);
                        Multi_params[0].flowN = dataView_temp.getFloat32(0, false);

                        //第二声道正向信号强度
                        uint8Array.set(dataArray.slice(15, 19), 0)
                        dataView_temp = new DataView(buffer);
                        Multi_params[1].flowP = dataView_temp.getFloat32(0, false);

                        //第二声道反向信号强度
                        uint8Array.set(dataArray.slice(19, 23), 0)
                        dataView_temp = new DataView(buffer);
                        Multi_params[1].flowN = dataView_temp.getFloat32(0, false);

                        //电池电压
                        uint8Array.set(dataArray.slice(23, 27), 0)
                        dataView_temp = new DataView(buffer);
                        value1 = dataView_temp.getFloat32(0, false);

                        //第三声道正向信号强度
                        uint8Array.set(dataArray.slice(27, 31), 0)
                        dataView_temp = new DataView(buffer);
                        Multi_params[2].flowP = dataView_temp.getFloat32(0, false);

                        //第三声道反向信号强度
                        uint8Array.set(dataArray.slice(31, 35), 0)
                        dataView_temp = new DataView(buffer);
                        Multi_params[2].flowN = dataView_temp.getFloat32(0, false);

                        //第四声道正向信号强度
                        uint8Array.set(dataArray.slice(35, 39), 0)
                        dataView_temp = new DataView(buffer);
                        Multi_params[3].flowP = dataView_temp.getFloat32(0, false);

                        //第四声道反向信号强度
                        uint8Array.set(dataArray.slice(39, 43), 0)
                        dataView_temp = new DataView(buffer);
                        Multi_params[3].flowN = dataView_temp.getFloat32(0, false);

                        //固件版本
                        uint8Array.set(dataArray.slice(43, 47), 0)
                        value2 = getApp().bytesToLong(buffer);

                        that.setData({
                          input_value1: value1.toFixed(3),
                          input_value2: value2,
                          ['items[0].valueP']: (+Multi_params[0].flowP).toFixed(2),
                          ['items[0].valueN']: (+Multi_params[0].flowN).toFixed(2),
                          ['items[1].valueP']: (+Multi_params[1].flowP).toFixed(2),
                          ['items[1].valueN']: (+Multi_params[1].flowN).toFixed(2),
                          ['items[2].valueP']: (+Multi_params[2].flowP).toFixed(2),
                          ['items[2].valueN']: (+Multi_params[2].flowN).toFixed(2),
                          ['items[3].valueP']: (+Multi_params[3].flowP).toFixed(2),
                          ['items[3].valueN']: (+Multi_params[3].flowN).toFixed(2),
                          states: states_text,
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