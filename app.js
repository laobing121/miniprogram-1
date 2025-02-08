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
  }
})
