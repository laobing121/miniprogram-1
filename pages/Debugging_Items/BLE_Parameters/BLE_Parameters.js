// pages/Debugging_Items/BLE_Parameters/BLE_Parameters.js
var button_command
var option1 = '0';//发射功率
var value1 //广播间隔
var value2 //连接间隔
var value3 //连接丢失时间

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "设定蓝牙参数",
    array1: [
      '-47 dBm', 
      '-18 dBm',
      '-9 dBm',
      '-5 dBm',
      '-1 dBm',
      '0 dBm',
      '1 dBm',
      '2 dBm',
      '3 dBm',
      '4 dBm',
      '5 dBm',
      '6 dBm',
      '7 dBm',
      '8 dBm',
    ],
    index1: 0,
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
      button_disabled: true,
      option1_disabled: true,
      value1_disabled: true,
      value2_disabled: true,
      value3_disabled: true,
      tips: "",
      buttonText: "下达",
      input_value1: "",
      input_value2: "",
      input_value3: "",
      });

    //预先读取
    var that = this;
    let arrayBuffer1 = new ArrayBuffer(4)
    let dataView = new DataView(arrayBuffer1)
    dataView.setUint8(0, 0x01)
    dataView.setUint8(1, 0xFC)
    dataView.setUint8(2, 0x0C)
    dataView.setUint8(3, 0x00)
    var data = await getApp().Command_Send(3, arrayBuffer1, that.data.title)
    if(data.result) {
      var tips_text = ""
      console.log(data.detail)
      if(data.detail.value.byteLength >= 6) { //返回字节数吻合
        var dataArray = new Uint8Array(data.detail.value)
        if(dataArray[0] == 0x04 && 
          dataArray[1] == 0xFC && 
          dataArray[2] == 0x0C && 
          dataArray[3] == 0x02 && 
          dataArray[4] == 0x00) {
            option1 = dataArray[5]
            that.setData({
              index1: option1,
              option1_disabled: false,
            })

            arrayBuffer1 = new ArrayBuffer(4)
            dataView = new DataView(arrayBuffer1)
            dataView.setUint8(0, 0x01)
            dataView.setUint8(1, 0xFC)
            dataView.setUint8(2, 0x0A)
            dataView.setUint8(3, 0x00)
            data = await getApp().Command_Send(3, arrayBuffer1, that.data.title)
            if(data.result) {
              tips_text = ""
              console.log(data.detail)
              if(data.detail.value.byteLength >= 7) { //返回字节数吻合
                dataArray = new Uint8Array(data.detail.value)
                if(dataArray[0] == 0x04 && 
                  dataArray[1] == 0xFC && 
                  dataArray[2] == 0x0A && 
                  dataArray[3] == 0x03) {
                  //dataArray[4] == 0x00) {
                    value1 = dataArray[5] + dataArray[6] * 256
                    that.setData({
                      input_value1: value1,
                      value1_disabled: false,
                    })

                    arrayBuffer1 = new ArrayBuffer(4)
                    dataView = new DataView(arrayBuffer1)
                    dataView.setUint8(0, 0x01)
                    dataView.setUint8(1, 0xFC)
                    dataView.setUint8(2, 0x04)
                    dataView.setUint8(3, 0x00)
                    data = await getApp().Command_Send(3, arrayBuffer1, that.data.title)
                    if(data.result) {
                      tips_text = ""
                      console.log(data.detail)
                      if(data.detail.value.byteLength >= 10) { //返回字节数吻合
                        dataArray = new Uint8Array(data.detail.value)
                        if(dataArray[0] == 0x04 && 
                          dataArray[1] == 0xFC && 
                          dataArray[2] == 0x04 && 
                          dataArray[3] == 0x06 && 
                          dataArray[4] == 0x00) {
                            value2 = dataArray[5] + dataArray[6] * 256
                            value3 = dataArray[7] + dataArray[8] * 256
                            that.setData({
                              input_value2: value2,
                              input_value3: value3,
                              value2_disabled: false,
                              value3_disabled: false,
                              button_disabled: false,
                              tips: "蓝牙参数读取完成",
                            })
                          }
                      }
                    }
                    else {
                      //发生错误时恢复按钮禁用
                      that.setData({
                        button_disabled: true,
                      })
                    }
                  }
              }
            }
            else {
              //发生错误时恢复按钮禁用
              that.setData({
                button_disabled: true,
              })
            }
        }
      }
    }
    else {
      //发生错误时恢复按钮禁用
      that.setData({
        button_disabled: true,
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

  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
    option1 = e.detail.value
  },

  bindInput1(e) {
    value1 = e.detail.value;
  },

  bindInput2(e) {
    value2 = e.detail.value;
  },

  bindInput3(e) {
    value3 = e.detail.value;
  },

  btn1: async function() {
    wx.vibrateShort();
    this.setData({
      backgroundcolor: "grey",
      button_disabled: true,
      tips: "",
    })

    var that = this;
    try {
      var tips_text = ""


      var arrayBuffer1 = new ArrayBuffer(5)
      var dataView = new DataView(arrayBuffer1)
      dataView.setUint8(0, 0x01)
      dataView.setUint8(1, 0xFC)
      dataView.setUint8(2, 0x0B)
      dataView.setUint8(3, 0x01)
      dataView.setUint8(4, Number(option1))
      var data = await getApp().Command_Send(3, arrayBuffer1, that.data.title)
      if(data.result) { //只处理正常结果，不处理异常结果
        console.log(data.detail)
        if(data.detail.value.byteLength >= 5) { //返回字节数吻合
          var dataArray = new Uint8Array(data.detail.value)
          if(dataArray[0] == 0x04 && 
            dataArray[1] == 0xFC && 
            dataArray[2] == 0x0B && 
            dataArray[3] == 0x01 && 
            dataArray[4] == 0x00) {

              arrayBuffer1 = new ArrayBuffer(6)
              dataView = new DataView(arrayBuffer1)
              dataView.setUint8(0, 0x01)
              dataView.setUint8(1, 0xFC)
              dataView.setUint8(2, 0x09)
              dataView.setUint8(3, 0x02)
              let temp = Math.round(Number(value1))
              dataView.setUint8(4, temp % 256)
              temp = Math.floor(temp / 256)
              dataView.setUint8(5, temp)
              data = await getApp().Command_Send(3, arrayBuffer1, that.data.title)
              if(data.result) {
                console.log(data.detail)
                if(data.detail.value.byteLength >= 5) {
                  dataArray = new Uint8Array(data.detail.value)
                  if(dataArray[0] == 0x04 && 
                    dataArray[1] == 0xFC && 
                    dataArray[2] == 0x09 && 
                    dataArray[3] == 0x01 && 
                    dataArray[4] == 0x00) {

                      arrayBuffer1 = new ArrayBuffer(9)
                      dataView = new DataView(arrayBuffer1)
                      dataView.setUint8(0, 0x01)
                      dataView.setUint8(1, 0xFC)
                      dataView.setUint8(2, 0x03)
                      dataView.setUint8(3, 0x05)
                      temp = Math.round(Number(value2))
                      dataView.setUint8(4, temp % 256)
                      temp = Math.floor(temp / 256)
                      dataView.setUint8(5, temp)
                      temp = Math.round(Number(value3))
                      dataView.setUint8(6, temp % 256)
                      temp = Math.floor(temp / 256)
                      dataView.setUint8(7, temp)
                      dataView.setUint8(8, 0)
                      data = await getApp().Command_Send(3, arrayBuffer1, that.data.title)
                      if(data.result) {
                        console.log(data.detail)
                        if(data.detail.value.byteLength >= 5) {
                          dataArray = new Uint8Array(data.detail.value)
                          if(dataArray[0] == 0x04 && 
                            dataArray[1] == 0xFC && 
                            dataArray[2] == 0x03 && 
                            dataArray[3] == 0x01 && 
                            dataArray[4] == 0x00) {
                              tips_text = that.data.title + "成功!\n" //不轻易说，只在最后说
                            }
                            else {
                              tips_text = "连接参数设置，" + "设备响应内容不符。"
                            }
                        }
                        else {
                          tips_text = "连接参数设置，" + "设备响应长度不符。"
                        }
                      }
                    }
                    else {
                      tips_text = "广播间隔设置，" + "设备响应内容不符。"
                    }
                }
                else {
                  tips_text = "广播间隔设置，" + "设备响应长度不符。"
                }
              }
            }
            else {
              tips_text = "发射功率设置，" + "设备响应内容不符。"
            }
        }
        else {
          tips_text = "发射功率设置，" + "设备响应长度不符。"
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
    } catch(e) {
      console.log(e)
      that.setData({
        tips: "Error\n" + e.message,
        backgroundcolor: "#3d8ae5",
        button_disabled: false,
      })
    }
  },
})