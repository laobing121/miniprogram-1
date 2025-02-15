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
  BLE_Reconnect: async function(deviceId, serviceId) {
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
          reject();
        }
      })
    })

    await new Promise((resolve, reject) => {
      wx.getBLEDeviceServices({
        deviceId, // 搜索到设备的 deviceId
        success: (res) => {
          console.log("重新获取服务成功！")
          resolve();
        },
        fail: (res) => {
          result = false;
          reject();
        }
      })
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
          reject();
        }
      })
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
          reject();
        }
      })
    })

    return {
      result: result,
      detail: detail,
    }
  },

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //    函数说明：蓝牙指令发送逻辑
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  Command_Send: async function(characteristicNo, buffer, operate) {
    var deviceId = this.globalData.deviceId
    var serviceId = this.globalData.serviceId
    var characteristicId
    switch(characteristicNo) {
      case 1:
        characteristicId = this.globalData.characteristicsFE61
      break;
      case 2:
        characteristicId = this.globalData.characteristicsFE62
      break;
      case 3:
        characteristicId = this.globalData.characteristicsFE63
      break;
    }


    var result = true
    var res = null
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

      await that.BLE_Reconnect(deviceId, serviceId)
    }
    
    /*******************************/
    /**********监听蓝牙反馈**********/
    /*******************************/
    // 操作之前先监听，保证第一时间获取数据
    wx.onBLECharacteristicValueChange((result) => {
      console.log(result)
      //valid = true
      valid = Data_Analysis(result)
      /*// 使用完成后在合适的时机断开连接和关闭蓝牙适配器
      wx.closeBLEConnection({
        deviceId,
      })
      wx.closeBluetoothAdapter({})*/
    }),

    /*******************************/
    /**********允许蓝牙反馈**********/
    /*******************************/
    // 必须先启用 wx.notifyBLECharacteristicValueChange 才能监听到设备 onBLECharacteristicValueChange 事件
    wx.notifyBLECharacteristicValueChange({
      deviceId,
      serviceId,
      characteristicId,
      state: true,
    })
    
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
        if(await that.BLE_Reconnect(deviceId, serviceId)) {
          console.log("重构连接成功！")
          //that.globalData.Reconnect = false
          //立即重发
          if(await that.Command_Send_Once(deviceId, serviceId, characteristicId, buffer).result) {
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

    if(result) {
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
            reject()
          }
        }, 500);
      }).finally(() => { //定义必然回调函数
        clearInterval(Interval_number)
        wx.offBLECharacteristicValueChange()
      })
    }
    console.log(result)
    /*return {
      result: result,
      detail: detail,
    }*/
    return result
  },

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //    函数说明：蓝牙数据分析
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  Data_Analysis: function(result) {
    return true
  },
})
