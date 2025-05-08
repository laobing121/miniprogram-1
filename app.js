// app.js
App({
  globalData: {
    deviceId: "",
    serviceId: "",
    characteristicsFE61: "",
    characteristicsFE62: "",
    characteristicsFE63: "",
    Reconnect: false,
    Reconnect_count: 0,//重连次数
    currentPage: null,//当前页面
    Instrument_type: null,//当前仪表类型选择
    Parameter_readed: false,
  },

  Param: {
    Diameter: 300,
    Mounting_Distance: 0,
    Zero: 0,
    Startup: 0.01,
    Correction_Factor: 1,
    Fluid_Velocity: 1469.3,
    Moving_Average: 10,
    Channel_parameters: [
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
    ],
    Multi_params: [
      {flowP: 0.00, factP: 1.00000, flowN: 0.00, factN: 1.00000},
      {flowP: 0.00, factP: 1.00000, flowN: 0.00, factN: 1.00000},
      {flowP: 0.00, factP: 1.00000, flowN: 0.00, factN: 1.00000},
      {flowP: 0.00, factP: 1.00000, flowN: 0.00, factN: 1.00000},
      {flowP: 0.00, factP: 1.00000, flowN: 0.00, factN: 1.00000},
      {flowP: 0.00, factP: 1.00000, flowN: 0.00, factN: 1.00000},
      {flowP: 0.00, factP: 1.00000, flowN: 0.00, factN: 1.00000},
      {flowP: 0.00, factP: 1.00000, flowN: 0.00, factN: 1.00000},
      {flowP: 0.00, factP: 1.00000, flowN: 0.00, factN: 1.00000},
    ],
    Propagation_delay: 0,
    Channel_amount: 4,
    Sensors_Type: 0,
    Installation_Method: 0,
    Measuring_Direction: 1,
    Transmission_Mode: 0,
    Multistage_number: 9,
    Mono_track_test: 0,
    even_number: 0,
    LRV: 4095,
    URV: 2,
    Mailing_Address: 1,
    User_Password: 0,
    mA_4: 0.7,
    mA_20: 0.6,
    Wall_thickness: 6,
    Lining_thickness: 0.8,
    Wall_sound_velocity: 3000,
    Lining_sound_velocity: 3000,
    Fluid_temperature: 16,
    Pulse_Width: 10,
    Pulse_Equivalent: 0.001,
    Alarm_Low: 0,
    Alarm_High: 200,
    UI_Language: 0,
    Unit_Flow_rate: 0,
    Unit_Flow_total: 0,
    Unit_Flow_velocity: 0,
    Baud_Rate: 2,
    Parity_Bit: 0,
    Password: 0,
    Cheat: 0,
    Communication_Protocol: 0,
    Transducer_Type: 0,
    AutoPatchWork: 0,
    Wall_material: 0,
    Lining_material: 0,
    Fluid_type: 0,
    Pulse_Function: 0,
    Multistage_number_R: 9,
    CRCHi: 0,
    CRCLo: 0,
  },

  Param_temp: {
    Diameter: 300,
    Mounting_Distance: 0,
    Zero: 0,
    Startup: 0.01,
    Correction_Factor: 1,
    Fluid_Velocity: 1469.3,
    Moving_Average: 10,
    Channel_parameters: [
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
      {Channel_Length: 346.41, Channel_Angle: 60, Channel_Offset: 0},
    ],
    Multi_params: [
      {flowP: 0.00, factP: 1.00000, flowN: 0.00, factN: 1.00000},
      {flowP: 0.00, factP: 1.00000, flowN: 0.00, factN: 1.00000},
      {flowP: 0.00, factP: 1.00000, flowN: 0.00, factN: 1.00000},
      {flowP: 0.00, factP: 1.00000, flowN: 0.00, factN: 1.00000},
      {flowP: 0.00, factP: 1.00000, flowN: 0.00, factN: 1.00000},
      {flowP: 0.00, factP: 1.00000, flowN: 0.00, factN: 1.00000},
      {flowP: 0.00, factP: 1.00000, flowN: 0.00, factN: 1.00000},
      {flowP: 0.00, factP: 1.00000, flowN: 0.00, factN: 1.00000},
      {flowP: 0.00, factP: 1.00000, flowN: 0.00, factN: 1.00000},
    ],
    Propagation_delay: 0,
    Channel_amount: 4,
    Sensors_Type: 0,
    Installation_Method: 0,
    Measuring_Direction: 1,
    Transmission_Mode: 0,
    Multistage_number: 9,
    Mono_track_test: 0,
    even_number: 0,
    LRV: 4095,
    URV: 2,
    Mailing_Address: 1,
    User_Password: 0,
    mA_4: 0.7,
    mA_20: 0.6,
    Wall_thickness: 6,
    Lining_thickness: 0.8,
    Wall_sound_velocity: 3000,
    Lining_sound_velocity: 3000,
    Fluid_temperature: 16,
    Pulse_Width: 10,
    Pulse_Equivalent: 0.001,
    Alarm_Low: 0,
    Alarm_High: 200,
    UI_Language: 0,
    Unit_Flow_rate: 0,
    Unit_Flow_total: 0,
    Unit_Flow_velocity: 0,
    Baud_Rate: 2,
    Parity_Bit: 0,
    Password: 0,
    Cheat: 0,
    Communication_Protocol: 0,
    Transducer_Type: 0,
    AutoPatchWork: 0,
    Wall_material: 0,
    Lining_material: 0,
    Fluid_type: 0,
    Pulse_Function: 0,
    Multistage_number_R: 9,
    CRCHi: 0,
    CRCLo: 0,
  },

  isNumber(val) {

    var regPos = /^\d+(\.\d+)?$/; //非负浮点数

    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数

    if(regPos.test(val) || regNeg.test(val)) {
      return true;
    } else {
      return false;
    }
  },

  TogetCurrentPage: function() {
    var pagestacks = getCurrentPages()
    this.globalData.currentPage = pagestacks[pagestacks.length - 1] // 获取当前页面实例
  },

  //定义异步操作逻辑
  Make_myPromise_1: function() {
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(function() { //模拟异步操作
        try{
          //throw new Error("这是一个人为故障");
          resolve('success'); //回调函数resolve用于处理异步操作成功
        }catch(error) {
          console.error("捕获到错误: ", error.message);
          reject('error'); //回调函数reject用于处理异步操作失败
        }
      }, 2500);
    });

    myPromise
      .then(result => { //定义resolve回调函数
        console.log(result);
      })
      .catch(function(error) { //定义reject回调函数
        console.error(error);
      })
      .finally(() => { //定义必然回调函数
        console.log("done.");
      });

    //当 Promise 被构造时，异步操作会被自动执行
  },
  Make_myPromise_2: function() {
    return myPromise = new Promise((resolve, reject) => {
      setTimeout(function() { //模拟异步操作
        try{
          throw new Error("这是一个人为故障");
          resolve('success 2'); //回调函数resolve用于处理异步操作成功
        }catch(error) {
          console.error("捕获到错误: ", error.message);
          reject('error 2'); //回调函数reject用于处理异步操作失败
        }
      }, 5000);
    }).then(result => { //定义resolve回调函数
        console.log(result);
      })
      .catch(function(error) { //定义reject回调函数
        console.error(error);
      })
      .finally(() => { //定义必然回调函数
        console.log("done 2.");
      });
  },

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //    函数说明：重新建立蓝牙连接
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  BLE_Reconnect: async function() {
    var deviceId = this.globalData.deviceId
    var serviceId = this.globalData.serviceId

    var that = this;
    var result = true;

    await new Promise((resolve, reject) => {
      wx.createBLEConnection({
        deviceId,
        success: (res) => {
          console.log("重连成功！")
          that.globalData.Reconnect = false
          resolve();
        },
        fail: (res) => {
          result = false;
          reject(res);
        }
      })
    }).catch(function(error) { //定义reject回调函数
      console.error(error);
    })
    
    if(result) {
    await new Promise((resolve, reject) => {
      wx.getBLEDeviceServices({
        deviceId, // 搜索到设备的 deviceId
        success: (res) => {
          console.log("重新获取服务成功！")
          resolve();
        },
        fail: (res) => {
          result = false;
          reject(res);
        }
      })
    }).catch(function(error) { //定义reject回调函数
      console.error(error);
    })

    await new Promise((resolve, reject) => {
      wx.getBLEDeviceCharacteristics({
        deviceId, // 搜索到设备的 deviceId
        serviceId, // 上一步中找到的某个服务
        success: (res) => {
          console.log("重新获取特征成功！")
          resolve();
        },
        fail: (res) => {
          result = false;
          reject(res);
        }
      })
    }).catch(function(error) { //定义reject回调函数
      console.error(error);
    })}
    
    return result;
  },

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //    函数说明：断开蓝牙连接
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  BLE_Connection_close: async function() {
    var deviceId = this.globalData.deviceId

    var that = this;
    var result = true;

    await new Promise((resolve, reject) => {
      wx.closeBLEConnection({
        deviceId,
        success: (res) => {
          console.log("断开成功！")
          resolve();
        },
        fail: (res) => {
          result = false;
          reject(res);
        }
      })
    }).catch(function(error) { //定义reject回调函数
      console.error(error);
    })
    
    return result;
  },

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //    函数说明：跨页面控件操控
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  Restore_Controls: function(operate, ares) {
    this.globalData.currentPage.setData({
      tips: operate + "失败\n" + ares.errCode + "\n" + ares.errMsg,
      backgroundcolor: "#3d8ae5",
      button_disabled: false,
    })
  },

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //    函数说明：蓝牙指令发送
  //注意：getApp().globalData.Reconnect_count在每一页面的初始载入中必须清零，重连计数是针对某一页面进行的。
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  Command_Send_Once: async function(deviceId, serviceId, characteristicId, buffer) {
    var result = true
    var detail
    var that = this
    await new Promise((resolve, reject) => {
      //建议每次写入不超过 20 字节。
      //若单次写入数据过长，iOS 上存在系统不会有任何回调的情况（包括错误回调）。
      wx.writeBLECharacteristicValue({
        deviceId,
        serviceId,
        characteristicId,
        value: buffer,
        success (res) {
          that.globalData.Reconnect_count = 0
          resolve();
        },
        fail: (res) => {
          /*result = 1//此处赋值未成功，需要等待回调函数异步完成
          detail = res*/
          console.error(res)
          result = false
          detail = res
          reject(res);
        }
      })
    }).catch(function(error) { //定义reject回调函数
      console.error(error);
    })

    return {
      result: result,
      detail: detail,
    }
  },

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //    函数说明：蓝牙指令发送逻辑
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  Command_Send: async function(characteristicNo, buffer, operate, Wait_enable = true) {
    var deviceId = this.globalData.deviceId
    var serviceId = this.globalData.serviceId
    var characteristicId
    var notify_characteristicId
    switch(characteristicNo) {
      case 1:
        characteristicId = this.globalData.characteristicsFE61
        notify_characteristicId = this.globalData.characteristicsFE62
      break;
      case 2:
        characteristicId = this.globalData.characteristicsFE62
      break;
      case 3:
        characteristicId = this.globalData.characteristicsFE63
        notify_characteristicId = this.globalData.characteristicsFE63
      break;
    }


    var result = true
    var res = null
    var detail
    var that = this;
    var valid = false
    /*var result = 0
    var detail*/
    /*******************************/
    /*************预重连************/
    /*******************************/
    if(that.globalData.Reconnect){
      
      //that.Make_myPromise_1(); //执行异步操作（用于诸操作异步执行，不相等待的情况）
      //await that.Make_myPromise_2(); //等待异步操作完成（用于需要等待异步操作完成的情况，所在函数需冠以async）
      //await是一种无阻塞等待
      //使用await，方可通过try...catch结构捕获异步操作中的错误
      //如果要通过await同时执行多个异步操作，则使用await Promise.all([,]);
      console.log("你会看到异步执行的顺序")

      await that.BLE_Reconnect()
    }
    
      /*******************************/
      /**********允许蓝牙反馈**********/
      /*******************************/
      // 必须先启用 wx.notifyBLECharacteristicValueChange 才能监听到设备 onBLECharacteristicValueChange 事件
      wx.notifyBLECharacteristicValueChange({
        deviceId,
        serviceId,
        characteristicId: notify_characteristicId,
        state: true,
      }) // notifyBLECharacteristicValueChange会随着连接断开而失效
    
    
    /*******************************/
    /**********监听蓝牙反馈**********/
    /*******************************/
    // 操作之前先监听，保证第一时间获取数据
    wx.onBLECharacteristicValueChange((result) => {
      console.log(result)
      //valid = true
      if(that.Data_Analysis(result)) {
        detail = result //交割数据
        valid = true
      }
      /*// 使用完成后在合适的时机断开连接和关闭蓝牙适配器
      wx.closeBLEConnection({
        deviceId,
      })
      wx.closeBluetoothAdapter({})*/
    }),

    
    
    //稍待
    await new Promise((resolve, reject) => {
      var Timeout_number = setTimeout(function() {
        // 这里是500毫秒后需要执行的任务
        resolve();
      }, 500);
      //clearTimeout(Timeout_number);
    })
    
    /*******************************/
    /************蓝牙写入************/
    /*******************************/
    var temp = await that.Command_Send_Once(deviceId, serviceId, characteristicId, buffer)

    if(temp.result == false) {
      result = false
      res = temp.detail
      if(that.globalData.Reconnect){
        //重连
        if(await that.BLE_Reconnect()) {
          /*******************************/
          /**********允许蓝牙反馈**********/
          /*******************************/
          // 必须先启用 wx.notifyBLECharacteristicValueChange 才能监听到设备 onBLECharacteristicValueChange 事件
          wx.notifyBLECharacteristicValueChange({
            deviceId,
            serviceId,
            characteristicId: notify_characteristicId,
            state: true,
          }) // notifyBLECharacteristicValueChange会随着连接断开而失效
          console.log("重构连接成功！")
          //that.globalData.Reconnect = false
          //立即重发
          if((await that.Command_Send_Once(deviceId, serviceId, characteristicId, buffer)).result) {
            result = true
          }
          else {
            //第二失败
            that.Restore_Controls(operate, res) //给出的仍是第一次发送失败之原因
          }
        }
        else {
          //第一失败
          that.globalData.Reconnect_count++
          console.log("重连失败-" + that.globalData.Reconnect_count)
          if(that.globalData.Reconnect_count < 3){
            that.Restore_Controls(operate, res) //未能给出重连失败原因
          }
          else {
            wx.offBLECharacteristicValueChange()

            //假设没有向后翻页
            that.globalData.Reconnect = false
            //返回连接页
            //console.log(getCurrentPages())
            var pagestacks = getCurrentPages()
            var step = pagestacks.length - 2
            if(step > 0){
              wx.navigateBack({
                delta: step
              })
            }
          }
        }
      }
      else {
        //第〇失败
        that.Restore_Controls(operate, res)
      }
    }

    if(result && Wait_enable) {
      var count = 0
      var Interval_number
      await new Promise((resolve, reject) => {
        Interval_number = setInterval(function() {
          if(valid) {
            resolve()
          }

          count++
          if(count >= 8) { //最多等待4秒
            result = false //未收到反馈
            reject("蓝牙设备反馈超时")
          }
        }, 500);
      }).catch(function(error) { //定义reject回调函数
        console.error(error);
        that.Restore_Controls(operate, error)
      })
      .finally(() => { //定义必然回调函数
        clearInterval(Interval_number)
        wx.offBLECharacteristicValueChange()
      })
    }

    if(!Wait_enable) {
      wx.offBLECharacteristicValueChange()
    }
    
    return {
      result: result,
      detail: detail,
    }
  },

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //    函数说明：蓝牙数据分析
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  Data_Analysis: function(result) {
    return true
  },

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //    函数说明：CRC-16
  //    data——字节数组
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  /*calculateCRC16: function(data) {
    let crc = 0xffff;
    for (let i = 0; i < data.length; i++) {
      crc ^= data[i] & 0xff;
      for (let j = 0; j < 8; j++) {
        if (crc & 0x0001) {
          crc = (crc >> 1) ^ 0x8006; // 使用 CRC-16 CCITT 多项式
        } else {
          crc = crc >> 1;
        }
      }
    }
    return crc;
  },*/
  //CRC高位字节值表
  auchCRCHi: 
  [
    0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0,
    0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41,
    0x00, 0xC1, 0x81, 0x40, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0,
    0x80, 0x41, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40,
    0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1,
    0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0, 0x80, 0x41,
    0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1,
    0x81, 0x40, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41,
    0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0,
    0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x00, 0xC1, 0x81, 0x40,
    0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1,
    0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40,
    0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0,
    0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x00, 0xC1, 0x81, 0x40,
    0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0,
    0x80, 0x41, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40,
    0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0,
    0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41,
    0x00, 0xC1, 0x81, 0x40, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0,
    0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41,
    0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0,
    0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x00, 0xC1, 0x81, 0x40,
    0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1,
    0x81, 0x40, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41,
    0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0,
    0x80, 0x41, 0x00, 0xC1, 0x81, 0x40,
  ],
  //CRC低位字节值表
  auchCRCLo: [
    0x00, 0xC0, 0xC1, 0x01, 0xC3, 0x03, 0x02, 0xC2, 0xC6, 0x06,
    0x07, 0xC7, 0x05, 0xC5, 0xC4, 0x04, 0xCC, 0x0C, 0x0D, 0xCD,
    0x0F, 0xCF, 0xCE, 0x0E, 0x0A, 0xCA, 0xCB, 0x0B, 0xC9, 0x09,
    0x08, 0xC8, 0xD8, 0x18, 0x19, 0xD9, 0x1B, 0xDB, 0xDA, 0x1A,
    0x1E, 0xDE, 0xDF, 0x1F, 0xDD, 0x1D, 0x1C, 0xDC, 0x14, 0xD4,
    0xD5, 0x15, 0xD7, 0x17, 0x16, 0xD6, 0xD2, 0x12, 0x13, 0xD3,
    0x11, 0xD1, 0xD0, 0x10, 0xF0, 0x30, 0x31, 0xF1, 0x33, 0xF3,
    0xF2, 0x32, 0x36, 0xF6, 0xF7, 0x37, 0xF5, 0x35, 0x34, 0xF4,
    0x3C, 0xFC, 0xFD, 0x3D, 0xFF, 0x3F, 0x3E, 0xFE, 0xFA, 0x3A,
    0x3B, 0xFB, 0x39, 0xF9, 0xF8, 0x38, 0x28, 0xE8, 0xE9, 0x29,
    0xEB, 0x2B, 0x2A, 0xEA, 0xEE, 0x2E, 0x2F, 0xEF, 0x2D, 0xED,
    0xEC, 0x2C, 0xE4, 0x24, 0x25, 0xE5, 0x27, 0xE7, 0xE6, 0x26,
    0x22, 0xE2, 0xE3, 0x23, 0xE1, 0x21, 0x20, 0xE0, 0xA0, 0x60,
    0x61, 0xA1, 0x63, 0xA3, 0xA2, 0x62, 0x66, 0xA6, 0xA7, 0x67,
    0xA5, 0x65, 0x64, 0xA4, 0x6C, 0xAC, 0xAD, 0x6D, 0xAF, 0x6F,
    0x6E, 0xAE, 0xAA, 0x6A, 0x6B, 0xAB, 0x69, 0xA9, 0xA8, 0x68,
    0x78, 0xB8, 0xB9, 0x79, 0xBB, 0x7B, 0x7A, 0xBA, 0xBE, 0x7E,
    0x7F, 0xBF, 0x7D, 0xBD, 0xBC, 0x7C, 0xB4, 0x74, 0x75, 0xB5,
    0x77, 0xB7, 0xB6, 0x76, 0x72, 0xB2, 0xB3, 0x73, 0xB1, 0x71,
    0x70, 0xB0, 0x50, 0x90, 0x91, 0x51, 0x93, 0x53, 0x52, 0x92,
    0x96, 0x56, 0x57, 0x97, 0x55, 0x95, 0x94, 0x54, 0x9C, 0x5C,
    0x5D, 0x9D, 0x5F, 0x9F, 0x9E, 0x5E, 0x5A, 0x9A, 0x9B, 0x5B,
    0x99, 0x59, 0x58, 0x98, 0x88, 0x48, 0x49, 0x89, 0x4B, 0x8B,
    0x8A, 0x4A, 0x4E, 0x8E, 0x8F, 0x4F, 0x8D, 0x4D, 0x4C, 0x8C,
    0x44, 0x84, 0x85, 0x45, 0x87, 0x47, 0x46, 0x86, 0x82, 0x42,
    0x43, 0x83, 0x41, 0x81, 0x80, 0x40,
  ],
  calculateCRC16: function(puchMsg, usDataLen) {
    var uchCRCHi = 0xFF;//高CRC字节初始化
    var uchCRCLo = 0xFF;//低CRC字节初始化
    var uIndex = 0x00;         //CRC循环中的索引
    
    for(let i = 0; i < usDataLen; i++)
    {
      uIndex = uchCRCHi ^ puchMsg[i];
      uchCRCHi = uchCRCLo ^ this.auchCRCHi[uIndex];
      uchCRCLo = this.auchCRCLo[uIndex];
    }
    
    return uchCRCHi<<8 | uchCRCLo;
  },

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //    函数说明：四字节转为浮点数
  //    byteArray——四字节数组
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  bytesToFloat: function(byteArray) {
    const dataView = new DataView(byteArray);
    //console.log(dataView)
    return dataView.getFloat32(0, true); // 读取浮点数
  },

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //    函数说明：浮点数转为四字节
  //    data——待转换浮点数
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  floatToBytes: function(float) {
    const buffer = new ArrayBuffer(4); // 创建一个 4 字节的缓冲区
    const view = new DataView(buffer); // 使用 DataView 操作缓冲区
    view.setFloat32(0, float, true); // 将浮点数写入缓冲区（小端序）（Little Endian）
    console.log(buffer)
    return new Uint8Array(buffer);
  },

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //    函数说明：仪表参数检查
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  Parameter_checking: function() {

  }
})
