// app.js
App({
  globalData: {
    deviceId: "",
    serviceId: "",
    characteristicsFE61: "",
    characteristicsFE62: "",
    characteristicsFE63: "",
    Reconnect: false,
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

  Command_Send: function(deviceId, serviceId, characteristicId) {
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
    /*******************************/
    /**********监听蓝牙反馈**********/
    /*******************************/
    // 操作之前先监听，保证第一时间获取数据
    wx.onBLECharacteristicValueChange((result) => {
      console.log(result)


      // 使用完成后在合适的时机断开连接和关闭蓝牙适配器
      /*wx.closeBLEConnection({
        deviceId,
      })
      wx.closeBluetoothAdapter({})*/
    })
    //稍待
    var Timeout_number = setTimeout(function() {
      // 这里是500毫秒后需要执行的任务
      /*******************************/
      /************蓝牙写入************/
      /*******************************/
      //建议每次写入不超过 20 字节。
      //若单次写入数据过长，iOS 上存在系统不会有任何回调的情况（包括错误回调）。
    }, 500);
  },
})
