// pages/Features/Parameter/Parameter.js
var button_command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "仪表参数设置",
    items: [
      { name: 'Installation_conditions', value: '001 安装条件' },
      { name: 'Metering_parameters', value: '002 计量参数' },
      { name: 'Display_settings', value: '003 显示器' },
      { name: 'Output_interface', value: '004 输出接口'},
      { name: 'Other_options', value: '005 其他'},
      { name: 'Channel_parameters', value: '006 声道参数'},
      { name: 'Multi-stage_tuning', value: '007 多段调校'},
    ]
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
    if(getApp().globalData.Parameter_readed == true){
      this.setData({
        button_disabled: false,
        tips: "",
        buttonText: "下达",
      });
    }
    else {
      this.setData({
        button_disabled: true,
        tips: "",
        buttonText: "下达",
      });

      //预先读取
      var that = this;
      var arrayBuffer1 = new ArrayBuffer(50)
      var dataView = new DataView(arrayBuffer1)
      for(let i = 0; i < 50; i++) {
        dataView.setUint8(i, 0xFF)
      }
      var data = await getApp().Command_Send(1, arrayBuffer1, that.data.title, false)
      if(data.result) {
        var tips_text = ""
        that.setData({
          tips: "正在获取仪表参数【1】…",
        })
        ////////////////////////////////////////
        /////////////第1组//////////////////////
        ////////////////////////////////////////
        arrayBuffer1 = new ArrayBuffer(8)
        dataView = new DataView(arrayBuffer1)
        dataView.setUint8(0, 0x01)
        dataView.setUint8(1, 0x03)
        dataView.setUint8(2, 0x00)
        dataView.setUint8(3, 0x64)
        dataView.setUint8(4, 0x00)
        dataView.setUint8(5, 0x2E)
        var crcdataArray = new Uint8Array(arrayBuffer1)
        var crc = getApp().calculateCRC16(crcdataArray, 6)
        console.log(crc)
        dataView.setUint8(6, Math.floor(crc / 256))
        dataView.setUint8(7, crc%256)
        data = await getApp().Command_Send(1, arrayBuffer1, that.data.title)
        if(data.result) {
          tips_text = ""
          console.log(data.detail.value)
          if(data.detail.value.byteLength >= 97) {
            var dataArray = new Uint8Array(data.detail.value)
            if(dataArray[0] == 0x01 && 
              dataArray[1] == 0x03 && 
              dataArray[2] == 0x5C) {
                crc = getApp().calculateCRC16(dataArray, 95)
                if(dataArray[95] == Math.floor(crc / 256) && 
                  dataArray[96] == crc%256) {
                    //数值解析
                    const buffer = new ArrayBuffer(4)
                    const uint8Array = new Uint8Array(buffer)
                    uint8Array.set(dataArray.slice(3, 7), 0)
                    //console.log(buffer)
                    //console.log(getApp().bytesToFloat(buffer))
                    getApp().Param.Diameter = getApp().bytesToFloat(buffer);
                    getApp().floatToBytes(getApp().Param.Diameter)
                    
                    uint8Array.set(dataArray.slice(7, 11), 0)
                    getApp().Param.Mounting_Distance = getApp().bytesToFloat(buffer);

                    uint8Array.set(dataArray.slice(11, 15), 0)
                    getApp().Param.Zero = getApp().bytesToFloat(buffer);

                    uint8Array.set(dataArray.slice(15, 19), 0)
                    getApp().Param.Startup = getApp().bytesToFloat(buffer);

                    uint8Array.set(dataArray.slice(19, 23), 0)
                    getApp().Param.Correction_Factor = getApp().bytesToFloat(buffer);

                    uint8Array.set(dataArray.slice(23, 27), 0)
                    getApp().Param.Fluid_Velocity = getApp().bytesToFloat(buffer);

                    uint8Array.set(dataArray.slice(27, 31), 0)
                    getApp().Param.Moving_Average = getApp().bytesToFloat(buffer);

                    for(let i = 0; i < 16; i++){
                      uint8Array.set(dataArray.slice(31 + i * 4, 35 + i * 4), 0)
                      getApp().Param.Channel_parameters[i].Channel_Length = getApp().bytesToFloat(buffer);
                    }

                    that.setData({
                      tips: "正在获取仪表参数【2】…",
                    })

                    ////////////////////////////////////////
                    /////////////第2组//////////////////////
                    ////////////////////////////////////////
                    arrayBuffer1 = new ArrayBuffer(8)
                    dataView = new DataView(arrayBuffer1)
                    dataView.setUint8(0, 0x01)
                    dataView.setUint8(1, 0x03)
                    dataView.setUint8(2, 0x00)
                    dataView.setUint8(3, 0x92)
                    dataView.setUint8(4, 0x00)
                    dataView.setUint8(5, 0x2E)
                    crcdataArray = new Uint8Array(arrayBuffer1)
                    crc = getApp().calculateCRC16(crcdataArray, 6)
                    console.log(crc)
                    dataView.setUint8(6, Math.floor(crc / 256))
                    dataView.setUint8(7, crc%256)
                    data = await getApp().Command_Send(1, arrayBuffer1, that.data.title)
                    if(data.result) {
                      tips_text = ""
                      console.log(data.detail.value)
                      if(data.detail.value.byteLength >= 97) {
                        dataArray = new Uint8Array(data.detail.value)
                        if(dataArray[0] == 0x01 && 
                          dataArray[1] == 0x03 && 
                          dataArray[2] == 0x5C) {
                            crc = getApp().calculateCRC16(dataArray, 95)
                            if(dataArray[95] == Math.floor(crc / 256) && 
                              dataArray[96] == crc%256) {
                                //数值解析
                                for(let i = 0; i < 2; i++){
                                  uint8Array.set(dataArray.slice(3 + i * 4, 7 + i * 4), 0)
                                  getApp().Param.Channel_parameters[16 + i].Channel_Length = getApp().bytesToFloat(buffer);
                                }

                                for(let i = 0; i < 18; i++){
                                  uint8Array.set(dataArray.slice(11 + i * 4, 15 + i * 4), 0)
                                  getApp().Param.Channel_parameters[i].Channel_Angle = getApp().bytesToFloat(buffer);
                                }

                                for(let i = 0; i < 3; i++){
                                  uint8Array.set(dataArray.slice(83 + i * 4, 87 + i * 4), 0)
                                  getApp().Param.Multi_params[i].flowP = getApp().bytesToFloat(buffer);
                                }

                                that.setData({
                                  tips: "正在获取仪表参数【3】…",
                                })

                                ////////////////////////////////////////
                                /////////////第3组//////////////////////
                                ////////////////////////////////////////
                                arrayBuffer1 = new ArrayBuffer(8)
                                dataView = new DataView(arrayBuffer1)
                                dataView.setUint8(0, 0x01)
                                dataView.setUint8(1, 0x03)
                                dataView.setUint8(2, 0x00)
                                dataView.setUint8(3, 0xC0)
                                dataView.setUint8(4, 0x00)
                                dataView.setUint8(5, 0x2E)
                                crcdataArray = new Uint8Array(arrayBuffer1)
                                crc = getApp().calculateCRC16(crcdataArray, 6)
                                console.log(crc)
                                dataView.setUint8(6, Math.floor(crc / 256))
                                dataView.setUint8(7, crc%256)
                                data = await getApp().Command_Send(1, arrayBuffer1, that.data.title)
                                if(data.result) {
                                  tips_text = ""
                                  console.log(data.detail.value)
                                  if(data.detail.value.byteLength >= 97) {
                                    dataArray = new Uint8Array(data.detail.value)
                                    if(dataArray[0] == 0x01 && 
                                      dataArray[1] == 0x03 && 
                                      dataArray[2] == 0x5C) {
                                        crc = getApp().calculateCRC16(dataArray, 95)
                                        if(dataArray[95] == Math.floor(crc / 256) && 
                                          dataArray[96] == crc%256) {
                                            //数值解析
                                            for(let i = 0; i < 6; i++){
                                              uint8Array.set(dataArray.slice(3 + i * 4, 7 + i * 4), 0)
                                              getApp().Param.Multi_params[3 + i].flowP = getApp().bytesToFloat(buffer);
                                              getApp().Param.Multi_params[i].flowP = getApp().bytesToFloat(buffer);
                                            }

                                            for(let i = 0; i < 9; i++){
                                              uint8Array.set(dataArray.slice(27 + i * 4, 31 + i * 4), 0)
                                              getApp().Param.Multi_params[i].factP = getApp().bytesToFloat(buffer);
                                            }

                                            uint8Array.set(dataArray.slice(63, 67), 0)
                                            getApp().Param.Propagation_delay = getApp().bytesToFloat(buffer);

                                            for(let i = 0; i < 7; i++){
                                              uint8Array.set(dataArray.slice(67 + i * 4, 71 + i * 4), 0)
                                              getApp().Param.Channel_parameters[i].Channel_Offset = getApp().bytesToFloat(buffer);
                                            }

                                            that.setData({
                                              tips: "正在获取仪表参数【4】…",
                                            })

                                            ////////////////////////////////////////
                                            /////////////第4组//////////////////////
                                            ////////////////////////////////////////
                                            arrayBuffer1 = new ArrayBuffer(8)
                                            dataView = new DataView(arrayBuffer1)
                                            dataView.setUint8(0, 0x01)
                                            dataView.setUint8(1, 0x03)
                                            dataView.setUint8(2, 0x00)
                                            dataView.setUint8(3, 0xEE)
                                            dataView.setUint8(4, 0x00)
                                            dataView.setUint8(5, 0x2E)
                                            crcdataArray = new Uint8Array(arrayBuffer1)
                                            crc = getApp().calculateCRC16(crcdataArray, 6)
                                            console.log(crc)
                                            dataView.setUint8(6, Math.floor(crc / 256))
                                            dataView.setUint8(7, crc%256)
                                            data = await getApp().Command_Send(1, arrayBuffer1, that.data.title)
                                            if(data.result) {
                                              tips_text = ""
                                              console.log(data.detail.value)
                                              if(data.detail.value.byteLength >= 97) {
                                                dataArray = new Uint8Array(data.detail.value)
                                                if(dataArray[0] == 0x01 && 
                                                  dataArray[1] == 0x03 && 
                                                  dataArray[2] == 0x5C) {
                                                    crc = getApp().calculateCRC16(dataArray, 95)
                                                    if(dataArray[95] == Math.floor(crc / 256) && 
                                                      dataArray[96] == crc%256) {
                                                        //数值解析
                                                        for(let i = 0; i < 11; i++){
                                                          uint8Array.set(dataArray.slice(3 + i * 4, 7 + i * 4), 0)
                                                          getApp().Param.Channel_parameters[7 + i].Channel_Offset = getApp().bytesToFloat(buffer);
                                                        }

                                                        getApp().Param.Channel_amount = dataArray[47]

                                                        getApp().Param.Sensors_Type = dataArray[48]

                                                        getApp().Param.Installation_Method = dataArray[49]

                                                        getApp().Param.Measuring_Direction = dataArray[50]

                                                        getApp().Param.Transmission_Mode = dataArray[51]

                                                        getApp().Param.Multistage_number = dataArray[52]

                                                        getApp().Param.Mono_track_test = dataArray[53]

                                                        getApp().Param.even_number = dataArray[54]

                                                        uint8Array.set(dataArray.slice(55, 59), 0)
                                                        getApp().Param.LRV = getApp().bytesToFloat(buffer);

                                                        uint8Array.set(dataArray.slice(59, 63), 0)
                                                        getApp().Param.URV = getApp().bytesToFloat(buffer);

                                                        uint8Array.set(dataArray.slice(63, 67), 0)
                                                        getApp().Param.Mailing_Address = getApp().bytesToFloat(buffer);

                                                        uint8Array.set(dataArray.slice(67, 71), 0)
                                                        getApp().Param.User_Password = getApp().bytesToFloat(buffer);

                                                        uint8Array.set(dataArray.slice(71, 75), 0)
                                                        getApp().Param.mA_4 = getApp().bytesToFloat(buffer);

                                                        uint8Array.set(dataArray.slice(75, 79), 0)
                                                        getApp().Param.mA_20 = getApp().bytesToFloat(buffer);

                                                        uint8Array.set(dataArray.slice(79, 83), 0)
                                                        getApp().Param.Wall_thickness = getApp().bytesToFloat(buffer);

                                                        uint8Array.set(dataArray.slice(83, 87), 0)
                                                        getApp().Param.Lining_thickness = getApp().bytesToFloat(buffer);

                                                        uint8Array.set(dataArray.slice(87, 91), 0)
                                                        getApp().Param.Wall_sound_velocity = getApp().bytesToFloat(buffer);

                                                        uint8Array.set(dataArray.slice(91, 95), 0)
                                                        getApp().Param.Lining_sound_velocity = getApp().bytesToFloat(buffer);
                                                        
                                                        that.setData({
                                                          tips: "正在获取仪表参数【5】…",
                                                        })

                                                        ////////////////////////////////////////
                                                        /////////////第5组//////////////////////
                                                        ////////////////////////////////////////
                                                        arrayBuffer1 = new ArrayBuffer(8)
                                                        dataView = new DataView(arrayBuffer1)
                                                        dataView.setUint8(0, 0x01)
                                                        dataView.setUint8(1, 0x03)
                                                        dataView.setUint8(2, 0x01)
                                                        dataView.setUint8(3, 0x1C)
                                                        dataView.setUint8(4, 0x00)
                                                        dataView.setUint8(5, 0x2E)
                                                        crcdataArray = new Uint8Array(arrayBuffer1)
                                                        crc = getApp().calculateCRC16(crcdataArray, 6)
                                                        console.log(crc)
                                                        dataView.setUint8(6, Math.floor(crc / 256))
                                                        dataView.setUint8(7, crc%256)
                                                        data = await getApp().Command_Send(1, arrayBuffer1, that.data.title)
                                                        if(data.result) {
                                                          tips_text = ""
                                                          console.log(data.detail.value)
                                                          if(data.detail.value.byteLength >= 97) {
                                                            dataArray = new Uint8Array(data.detail.value)
                                                            if(dataArray[0] == 0x01 && 
                                                              dataArray[1] == 0x03 && 
                                                              dataArray[2] == 0x5C) {
                                                                crc = getApp().calculateCRC16(dataArray, 95)
                                                                if(dataArray[95] == Math.floor(crc / 256) && 
                                                                  dataArray[96] == crc%256) {
                                                                    //数值解析
                                                                    uint8Array.set(dataArray.slice(3, 7), 0)
                                                                    getApp().Param.Fluid_temperature = getApp().bytesToFloat(buffer);

                                                                    uint8Array.set(dataArray.slice(7, 11), 0)
                                                                    getApp().Param.Pulse_Width = getApp().bytesToFloat(buffer);

                                                                    uint8Array.set(dataArray.slice(11, 15), 0)
                                                                    getApp().Param.Pulse_Equivalent = getApp().bytesToFloat(buffer);

                                                                    uint8Array.set(dataArray.slice(15, 19), 0)
                                                                    getApp().Param.Alarm_Low = getApp().bytesToFloat(buffer);

                                                                    uint8Array.set(dataArray.slice(19, 23), 0)
                                                                    getApp().Param.Alarm_High = getApp().bytesToFloat(buffer);

                                                                    for(let i = 0; i < 9; i++){
                                                                      uint8Array.set(dataArray.slice(23 + i * 4, 27 + i * 4), 0)
                                                                      getApp().Param.Multi_params[i].flowN = getApp().bytesToFloat(buffer);
                                                                    }

                                                                    for(let i = 0; i < 9; i++){
                                                                      uint8Array.set(dataArray.slice(59 + i * 4, 63 + i * 4), 0)
                                                                      getApp().Param.Multi_params[i].factN = getApp().bytesToFloat(buffer);
                                                                    }
                                                                    
                                                                    that.setData({
                                                                      tips: "正在获取仪表参数【6】…",
                                                                    })

                                                                    ////////////////////////////////////////
                                                                    /////////////第6组//////////////////////
                                                                    ////////////////////////////////////////
                                                                    arrayBuffer1 = new ArrayBuffer(8)
                                                                    dataView = new DataView(arrayBuffer1)
                                                                    dataView.setUint8(0, 0x01)
                                                                    dataView.setUint8(1, 0x03)
                                                                    dataView.setUint8(2, 0x01)
                                                                    dataView.setUint8(3, 0x4A)
                                                                    dataView.setUint8(4, 0x00)
                                                                    dataView.setUint8(5, 0x08)
                                                                    crcdataArray = new Uint8Array(arrayBuffer1)
                                                                    crc = getApp().calculateCRC16(crcdataArray, 6)
                                                                    console.log(crc)
                                                                    dataView.setUint8(6, Math.floor(crc / 256))
                                                                    dataView.setUint8(7, crc%256)
                                                                    data = await getApp().Command_Send(1, arrayBuffer1, that.data.title)
                                                                    if(data.result) {
                                                                      tips_text = ""
                                                                      console.log(data.detail.value)
                                                                      if(data.detail.value.byteLength >= 23) {
                                                                        dataArray = new Uint8Array(data.detail.value)
                                                                        if(dataArray[0] == 0x01 && 
                                                                          dataArray[1] == 0x03 && 
                                                                          dataArray[2] == 0x12) {
                                                                            crc = getApp().calculateCRC16(dataArray, 21)
                                                                            if(dataArray[21] == Math.floor(crc / 256) && 
                                                                              dataArray[22] == crc%256) {
                                                                                //数值解析
                                                                                getApp().Param.UI_Language = dataArray[3]

                                                                                getApp().Param.Unit_Flow_rate = dataArray[4]

                                                                                getApp().Param.Unit_Flow_total = dataArray[5]

                                                                                getApp().Param.Unit_Flow_velocity = dataArray[6]

                                                                                getApp().Param.Baud_Rate = dataArray[7]

                                                                                getApp().Param.Parity_Bit = dataArray[8]

                                                                                getApp().Param.Password = dataArray[9]

                                                                                getApp().Param.Cheat = dataArray[10]

                                                                                getApp().Param.Communication_Protocol = dataArray[11]

                                                                                getApp().Param.Transducer_Type = dataArray[12]

                                                                                getApp().Param.AutoPatchWork = dataArray[13]

                                                                                getApp().Param.Wall_material = dataArray[14]

                                                                                getApp().Param.Lining_material = dataArray[15]

                                                                                getApp().Param.Fluid_type = dataArray[16]

                                                                                getApp().Param.Pulse_Function = dataArray[17]

                                                                                getApp().Param.Multistage_number_R = dataArray[18]

                                                                                getApp().Param.CRCHi = dataArray[19]

                                                                                getApp().Param.CRCLo = dataArray[20]
                                                                                
                                                                                getApp().Param_temp = getApp().Param
                                                                                getApp().globalData.Parameter_readed = true

                                                                                that.setData({
                                                                                  button_disabled: false,
                                                                                  tips: "获取仪表参数完成",
                                                                                })
                                                                              }
                                                                          }
                                                                      }
                                                                    }
                                                                    else{
                                                                      //发生错误时恢复按钮禁用
                                                                      that.setData({
                                                                        button_disabled: true,
                                                                      })
                                                                    }
                                                                  }
                                                              }
                                                          }
                                                        }
                                                        else{
                                                          //发生错误时恢复按钮禁用
                                                          that.setData({
                                                            button_disabled: true,
                                                          })
                                                        }
                                                      }
                                                  }
                                              }
                                            }
                                            else{
                                              //发生错误时恢复按钮禁用
                                              that.setData({
                                                button_disabled: true,
                                              })
                                            }
                                          }
                                      }
                                  }
                                }
                                else{
                                  //发生错误时恢复按钮禁用
                                  that.setData({
                                    button_disabled: true,
                                  })
                                }
                              }
                          }
                      }
                    }
                    else{
                      //发生错误时恢复按钮禁用
                      that.setData({
                        button_disabled: true,
                      })
                    }
                  }
              }
          }
        }
        else{
          //发生错误时恢复按钮禁用
          that.setData({
            button_disabled: true,
          })
        }
      }
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

  btn0(event) {
    wx.vibrateShort();
      wx.navigateTo({
        url: '/pages/Parameter_Items/' + event.currentTarget.id + '/' + event.currentTarget.id,
      })
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


      getApp().Parameter_checking()
      getApp().Param = getApp().Param_temp
        var arrayBuffer1 = new ArrayBuffer(50)
        var dataView = new DataView(arrayBuffer1)
        for(let i = 0; i < 50; i++) {
          dataView.setUint8(i, 0xFF)
        }
        var data = await getApp().Command_Send(1, arrayBuffer1, that.data.title, false)
        if(data.result) {
          ////////////////////////////////////////
          /////////////第1组//////////////////////
          ////////////////////////////////////////
          arrayBuffer1 = new ArrayBuffer(101)
          dataView = new DataView(arrayBuffer1)
          dataView.setUint8(0, 0x01)
          dataView.setUint8(1, 0x10)
          dataView.setUint8(2, 0x00)
          dataView.setUint8(3, 0x64)
          dataView.setUint8(4, 0x00)
          dataView.setUint8(5, 0x2E)
          dataView.setUint8(6, 0x5C)
          dataView.setFloat32(7, getApp().Param.Diameter, true);
          dataView.setFloat32(11, getApp().Param.Mounting_Distance, true);
          dataView.setFloat32(15, getApp().Param.Zero, true);
          dataView.setFloat32(19, getApp().Param.Startup, true);
          dataView.setFloat32(23, getApp().Param.Correction_Factor, true);
          dataView.setFloat32(27, getApp().Param.Fluid_Velocity, true);
          dataView.setFloat32(31, getApp().Param.Moving_Average, true);
          for(let i = 0; i < 16; i++) {
            dataView.setFloat32(35 + i * 4, getApp().Param.Channel_parameters[i].Channel_Length, true);
          }
          const crcdataArray = new Uint8Array(arrayBuffer1)
          var crc = getApp().calculateCRC16(crcdataArray, 99)
          console.log(crc)
          dataView.setUint8(99, Math.floor(crc / 256))
          dataView.setUint8(100, crc%256)
          data = await getApp().Command_Send(1, arrayBuffer1, "设置仪表参数【1】")
          if(data.result) {
            console.log(data.detail.value)
            if(data.detail.value.byteLength >= 8) {
              var dataArray = new Uint8Array(data.detail.value)
              if(dataArray[0] == 0x01 && 
                dataArray[1] == 0x10 && 
                dataArray[2] == 0x00 && 
                dataArray[3] == 0x64 && 
                dataArray[4] == 0x00 && 
                dataArray[5] == 0x2E) {
                  crc = getApp().calculateCRC16(dataArray, 6)
                  if(dataArray[6] == Math.floor(crc / 256) && 
                  dataArray[7] == crc%256) {
                    ////////////////////////////////////////
                    /////////////第2组//////////////////////
                    ////////////////////////////////////////
                    arrayBuffer1 = new ArrayBuffer(101)
                    dataView = new DataView(arrayBuffer1)
                    dataView.setUint8(0, 0x01)
                    dataView.setUint8(1, 0x10)
                    dataView.setUint8(2, 0x00)
                    dataView.setUint8(3, 0x92)
                    dataView.setUint8(4, 0x00)
                    dataView.setUint8(5, 0x2E)
                    dataView.setUint8(6, 0x5C)
                    for(let i = 0; i < 2; i++) {
                      dataView.setFloat32(7 + i * 4, getApp().Param.Channel_parameters[i + 16].Channel_Length, true);
                    }
                    for(let i = 0; i < 18; i++) {
                      dataView.setFloat32(15 + i * 4, getApp().Param.Channel_parameters[i].Channel_Angle, true);
                    }
                    for(let i = 0; i < 3; i++) {
                      dataView.setFloat32(87 + i * 4, getApp().Param.Multi_params[i].flowP, true);
                    }
                    crcdataArray = new Uint8Array(arrayBuffer1)
                    crc = getApp().calculateCRC16(crcdataArray, 99)
                    console.log(crc)
                    dataView.setUint8(99, Math.floor(crc / 256))
                    dataView.setUint8(100, crc%256)
                    data = await getApp().Command_Send(1, arrayBuffer1, "设置仪表参数【2】")
                    if(data.result) {
                      console.log(data.detail.value)
                      if(data.detail.value.byteLength >= 8) {
                        dataArray = new Uint8Array(data.detail.value)
                        if(dataArray[0] == 0x01 && 
                          dataArray[1] == 0x10 && 
                          dataArray[2] == 0x00 && 
                          dataArray[3] == 0x92 && 
                          dataArray[4] == 0x00 && 
                          dataArray[5] == 0x2E) {
                            crc = getApp().calculateCRC16(dataArray, 6)
                            if(dataArray[6] == Math.floor(crc / 256) && 
                            dataArray[7] == crc%256) {
                              ////////////////////////////////////////
                              /////////////第3组//////////////////////
                              ////////////////////////////////////////
                              arrayBuffer1 = new ArrayBuffer(101)
                              dataView = new DataView(arrayBuffer1)
                              dataView.setUint8(0, 0x01)
                              dataView.setUint8(1, 0x10)
                              dataView.setUint8(2, 0x00)
                              dataView.setUint8(3, 0xC0)
                              dataView.setUint8(4, 0x00)
                              dataView.setUint8(5, 0x2E)
                              dataView.setUint8(6, 0x5C)
                              for(let i = 0; i < 6; i++) {
                                dataView.setFloat32(7 + i * 4, getApp().Param.Multi_params[i + 3].flowP, true);
                              }
                              for(let i = 0; i < 9; i++) {
                                dataView.setFloat32(31 + i * 4, getApp().Param.Multi_params[i].factP, true);
                              }
                              dataView.setFloat32(67, getApp().Param.Propagation_delay, true);
                              for(let i = 0; i < 7; i++) {
                                dataView.setFloat32(71 + i * 4, getApp().Param.Channel_parameters[i].Channel_Offset, true);
                              }
                              crcdataArray = new Uint8Array(arrayBuffer1)
                              crc = getApp().calculateCRC16(crcdataArray, 99)
                              console.log(crc)
                              dataView.setUint8(99, Math.floor(crc / 256))
                              dataView.setUint8(100, crc%256)
                              data = await getApp().Command_Send(1, arrayBuffer1, "设置仪表参数【3】")
                              if(data.result) {
                                console.log(data.detail.value)
                                if(data.detail.value.byteLength >= 8) {
                                  dataArray = new Uint8Array(data.detail.value)
                                  if(dataArray[0] == 0x01 && 
                                    dataArray[1] == 0x10 && 
                                    dataArray[2] == 0x00 && 
                                    dataArray[3] == 0xC0 && 
                                    dataArray[4] == 0x00 && 
                                    dataArray[5] == 0x2E) {
                                      crc = getApp().calculateCRC16(dataArray, 6)
                                      if(dataArray[6] == Math.floor(crc / 256) && 
                                      dataArray[7] == crc%256) {
                                        ////////////////////////////////////////
                                        /////////////第4组//////////////////////
                                        ////////////////////////////////////////
                                        arrayBuffer1 = new ArrayBuffer(101)
                                        dataView = new DataView(arrayBuffer1)
                                        dataView.setUint8(0, 0x01)
                                        dataView.setUint8(1, 0x10)
                                        dataView.setUint8(2, 0x00)
                                        dataView.setUint8(3, 0xEE)
                                        dataView.setUint8(4, 0x00)
                                        dataView.setUint8(5, 0x2E)
                                        dataView.setUint8(6, 0x5C)
                                        for(let i = 0; i < 11; i++) {
                                          dataView.setFloat32(7 + i * 4, getApp().Param.Channel_parameters[7 + i].Channel_Offset, true);
                                        }
                                        dataView.setUint8(51, getApp().Param.Channel_amount)
                                        dataView.setUint8(52, getApp().Param.Sensors_Type)
                                        dataView.setUint8(53, getApp().Param.Installation_Method)
                                        dataView.setUint8(54, getApp().Param.Measuring_Direction)
                                        dataView.setUint8(55, getApp().Param.Transmission_Mode)
                                        dataView.setUint8(56, getApp().Param.Multistage_number)
                                        dataView.setUint8(57, getApp().Param.Mono_track_test)
                                        dataView.setUint8(58, getApp().Param.even_number)
                                        dataView.setFloat32(59, getApp().Param.LRV, true);
                                        dataView.setFloat32(63, getApp().Param.URV, true);
                                        dataView.setFloat32(67, getApp().Param.Mailing_Address, true);
                                        dataView.setFloat32(71, getApp().Param.User_Password, true);
                                        dataView.setFloat32(75, getApp().Param.mA_4, true);
                                        dataView.setFloat32(79, getApp().Param.mA_20, true);
                                        dataView.setFloat32(83, getApp().Param.Wall_thickness, true);
                                        dataView.setFloat32(87, getApp().Param.Lining_thickness, true);
                                        dataView.setFloat32(91, getApp().Param.Wall_sound_velocity, true);
                                        dataView.setFloat32(95, getApp().Param.Lining_sound_velocity, true);
                                        crcdataArray = new Uint8Array(arrayBuffer1)
                                        crc = getApp().calculateCRC16(crcdataArray, 99)
                                        console.log(crc)
                                        dataView.setUint8(99, Math.floor(crc / 256))
                                        dataView.setUint8(100, crc%256)
                                        data = await getApp().Command_Send(1, arrayBuffer1, "设置仪表参数【4】")
                                        if(data.result) {
                                          console.log(data.detail.value)
                                          if(data.detail.value.byteLength >= 8) {
                                            dataArray = new Uint8Array(data.detail.value)
                                            if(dataArray[0] == 0x01 && 
                                              dataArray[1] == 0x10 && 
                                              dataArray[2] == 0x00 && 
                                              dataArray[3] == 0xEE && 
                                              dataArray[4] == 0x00 && 
                                              dataArray[5] == 0x2E) {
                                                crc = getApp().calculateCRC16(dataArray, 6)
                                                if(dataArray[6] == Math.floor(crc / 256) && 
                                                dataArray[7] == crc%256) {
                                                  ////////////////////////////////////////
                                                  /////////////第5组//////////////////////
                                                  ////////////////////////////////////////
                                                  arrayBuffer1 = new ArrayBuffer(101)
                                                  dataView = new DataView(arrayBuffer1)
                                                  dataView.setUint8(0, 0x01)
                                                  dataView.setUint8(1, 0x10)
                                                  dataView.setUint8(2, 0x01)
                                                  dataView.setUint8(3, 0x1C)
                                                  dataView.setUint8(4, 0x00)
                                                  dataView.setUint8(5, 0x2E)
                                                  dataView.setUint8(6, 0x5C)
                                                  dataView.setFloat32(7, getApp().Param.Fluid_temperature, true);
                                                  dataView.setFloat32(11, getApp().Param.Pulse_Width, true);
                                                  dataView.setFloat32(15, getApp().Param.Pulse_Equivalent, true);
                                                  dataView.setFloat32(19, getApp().Param.Alarm_Low, true);
                                                  dataView.setFloat32(23, getApp().Param.Alarm_High, true);
                                                  for(let i = 0; i < 9; i++) {
                                                    dataView.setFloat32(27 + i * 4, getApp().Param.Multi_params[i].flowN, true);
                                                  }
                                                  for(let i = 0; i < 9; i++) {
                                                    dataView.setFloat32(63 + i * 4, getApp().Param.Multi_params[i].factN, true);
                                                  }
                                                  crcdataArray = new Uint8Array(arrayBuffer1)
                                                  crc = getApp().calculateCRC16(crcdataArray, 99)
                                                  console.log(crc)
                                                  dataView.setUint8(99, Math.floor(crc / 256))
                                                  dataView.setUint8(100, crc%256)
                                                  data = await getApp().Command_Send(1, arrayBuffer1, "设置仪表参数【5】")
                                                  if(data.result) {
                                                    console.log(data.detail.value)
                                                    if(data.detail.value.byteLength >= 8) {
                                                      dataArray = new Uint8Array(data.detail.value)
                                                      if(dataArray[0] == 0x01 && 
                                                        dataArray[1] == 0x10 && 
                                                        dataArray[2] == 0x01 && 
                                                        dataArray[3] == 0x1C && 
                                                        dataArray[4] == 0x00 && 
                                                        dataArray[5] == 0x2E) {
                                                          crc = getApp().calculateCRC16(dataArray, 6)
                                                          if(dataArray[6] == Math.floor(crc / 256) && 
                                                          dataArray[7] == crc%256) {
                                                            ////////////////////////////////////////
                                                            /////////////第6组//////////////////////
                                                            ////////////////////////////////////////
                                                            arrayBuffer1 = new ArrayBuffer(27)
                                                            dataView = new DataView(arrayBuffer1)
                                                            dataView.setUint8(0, 0x01)
                                                            dataView.setUint8(1, 0x10)
                                                            dataView.setUint8(2, 0x01)
                                                            dataView.setUint8(3, 0x4A)
                                                            dataView.setUint8(4, 0x00)
                                                            dataView.setUint8(5, 0x09)
                                                            dataView.setUint8(6, 0x12)
                                                            dataView.setUint8(7, getApp().Param.UI_Language)
                                                            dataView.setUint8(8, getApp().Param.Unit_Flow_rate)
                                                            dataView.setUint8(9, getApp().Param.Unit_Flow_total)
                                                            dataView.setUint8(10, getApp().Param.Unit_Flow_velocity)
                                                            dataView.setUint8(11, getApp().Param.Baud_Rate)
                                                            dataView.setUint8(12, getApp().Param.Parity_Bit)
                                                            dataView.setUint8(13, getApp().Param.Password)
                                                            dataView.setUint8(14, getApp().Param.Cheat)
                                                            dataView.setUint8(15, getApp().Param.Communication_Protocol)
                                                            dataView.setUint8(16, getApp().Param.Transducer_Type)
                                                            dataView.setUint8(17, getApp().Param.AutoPatchWork)
                                                            dataView.setUint8(18, getApp().Param.Wall_material)
                                                            dataView.setUint8(19, getApp().Param.Lining_material)
                                                            dataView.setUint8(20, getApp().Param.Fluid_type)
                                                            dataView.setUint8(21, getApp().Param.Pulse_Function)
                                                            dataView.setUint8(22, getApp().Param.Multistage_number_R)
                                                            dataView.setUint8(23, 0)
                                                            dataView.setUint8(24, 0)
                                                            crcdataArray = new Uint8Array(arrayBuffer1)
                                                            crc = getApp().calculateCRC16(crcdataArray, 25)
                                                            console.log(crc)
                                                            dataView.setUint8(25, Math.floor(crc / 256))
                                                            dataView.setUint8(26, crc%256)
                                                            data = await getApp().Command_Send(1, arrayBuffer1, "设置仪表参数【6】")
                                                            if(data.result) {
                                                              console.log(data.detail.value)
                                                              if(data.detail.value.byteLength >= 8) {
                                                                dataArray = new Uint8Array(data.detail.value)
                                                                if(dataArray[0] == 0x01 && 
                                                                  dataArray[1] == 0x10 && 
                                                                  dataArray[2] == 0x01 && 
                                                                  dataArray[3] == 0x4A && 
                                                                  dataArray[4] == 0x00 && 
                                                                  dataArray[5] == 0x09) {
                                                                    crc = getApp().calculateCRC16(dataArray, 6)
                                                                    if(dataArray[6] == Math.floor(crc / 256) && 
                                                                    dataArray[7] == crc%256) {
                                                                      tips_text = that.data.title + "成功!\n" //不轻易说，只在最后说
                                                                    }
                                                                    else {
                                                                      tips_text = "设置仪表参数【6】" + "设备响应校验不符。"
                                                                    }
                                                                  }
                                                                  else {
                                                                    tips_text = "设置仪表参数【6】" + "设备响应内容不符。"
                                                                  }
                                                              }
                                                              else {
                                                                tips_text = "设置仪表参数【6】" + "设备响应长度不符。"
                                                              }
                                                            }
                                                          }
                                                          else {
                                                            tips_text = "设置仪表参数【5】" + "设备响应校验不符。"
                                                          }
                                                        }
                                                        else {
                                                          tips_text = "设置仪表参数【5】" + "设备响应内容不符。"
                                                        }
                                                    }
                                                    else {
                                                      tips_text = "设置仪表参数【5】" + "设备响应长度不符。"
                                                    }
                                                  }
                                                }
                                                else {
                                                  tips_text = "设置仪表参数【4】" + "设备响应校验不符。"
                                                }
                                              }
                                              else {
                                                tips_text = "设置仪表参数【4】" + "设备响应内容不符。"
                                              }
                                          }
                                          else {
                                            tips_text = "设置仪表参数【4】" + "设备响应长度不符。"
                                          }
                                        }
                                      }
                                      else {
                                        tips_text = "设置仪表参数【3】" + "设备响应校验不符。"
                                      }
                                    }
                                    else {
                                      tips_text = "设置仪表参数【3】" + "设备响应内容不符。"
                                    }
                                }
                                else {
                                  tips_text = "设置仪表参数【3】" + "设备响应长度不符。"
                                }
                              }
                            }
                            else {
                              tips_text = "设置仪表参数【2】" + "设备响应校验不符。"
                            }
                          }
                          else {
                            tips_text = "设置仪表参数【2】" + "设备响应内容不符。"
                          }
                      }
                      else {
                        tips_text = "设置仪表参数【2】" + "设备响应长度不符。"
                      }
                    }
                  }
                  else {
                    tips_text = "设置仪表参数【1】" + "设备响应校验不符。"
                  }
                }
                else {
                  tips_text = "设置仪表参数【1】" + "设备响应内容不符。"
                }
            }
            else {
              tips_text = "设置仪表参数【1】" + "设备响应长度不符。"
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
