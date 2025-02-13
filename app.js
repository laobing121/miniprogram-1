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
  Make_myPromise: function() {
    //const myPromise = new Promise((resolve, reject) => {
    return myPromise = new Promise((resolve, reject) => {
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

  Command_Send: async function(characteristicNo, buffer) {
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


    var that = this;
    /*var result = 0
    var detail*/
    /*******************************/
    /*************预重连************/
    /*******************************/
    if(that.globalData.Reconnect){
      
      //that.Make_myPromise();
      await that.Make_myPromise(); //执行异步操作

      /*await new Promise((resolve, reject) => {
        wx.createBLEConnection({
          deviceId,
          success: (res) => {
            console.log("重连成功！")
            getApp().globalData.Reconnect = false
            resolve(res);
          },
          fail: (res) => {
            reject(res);
          }
        })
      }).then(result => {
        console.log(result)
      }).catch(error => {
        console.log(error)
      })*/
    }
    console.log("yyyyyyyyyyyyyyyy")
    /*******************************/
    /**********允许蓝牙反馈**********/
    /*******************************/
    // 必须先启用 wx.notifyBLECharacteristicValueChange 才能监听到设备 onBLECharacteristicValueChange 事件
    /*wx.notifyBLECharacteristicValueChange({
      deviceId,
      serviceId,
      characteristicId,
      state: true,
    })*/
    /*******************************/
    /**********监听蓝牙反馈**********/
    /*******************************/
    // 操作之前先监听，保证第一时间获取数据
    /*wx.onBLECharacteristicValueChange((result) => {
      console.log(result)


      // 使用完成后在合适的时机断开连接和关闭蓝牙适配器
      wx.closeBLEConnection({
        deviceId,
      })
      wx.closeBluetoothAdapter({})
    })*/
    //稍待
    /*var Timeout_number = setTimeout(function() {*/
      // 这里是500毫秒后需要执行的任务
      /*******************************/
      /************蓝牙写入************/
      /*******************************/
      //建议每次写入不超过 20 字节。
      //若单次写入数据过长，iOS 上存在系统不会有任何回调的情况（包括错误回调）。
      /*wx.writeBLECharacteristicValue({
        deviceId,
        serviceId,
        characteristicId,
        value: buffer,
        success (res) {
          that.globalData.Reconnect_count = 0
        },
        fail: (res) => {*/
          /*result = 1//此处赋值未成功，需要等待回调函数异步完成
          detail = res*/
          /*that.globalData.currentPage.setData({
            tips: "蓝牙设备名称写入失败\n" + res.errCode + "\n" + res.errMsg,
            backgroundcolor: "#3d8ae5",
            button_disabled: false,
          })
        }
      })
    }, 500);*/

    /*return {
      result: result,
      detail: detail,
    }*/
  },
})
