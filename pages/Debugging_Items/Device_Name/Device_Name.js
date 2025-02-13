// pages/Debugging_Items/Device_Name/Device_Name.js
var button_command
var value
var Reconnect_count = 0//重连次数

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    button_command = 0
    this.setData({
      button_disabled: false,
      tips: "",
      buttonText: "下达",
      input: "",
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

  bindInput(e) {
    value = e.detail.value;
    this.setData({
      tips: "",
    })
  },

  //二维码扫描
  skyOnclick(event) {
    var that = this;
    wx.vibrateShort();
    that.setData({
      input_value: "",
      tips: "",
    })

    wx.scanCode({
      success (res) {
        console.log(res)
        var temp = res.result;
        if(String(temp).length <= 15){
          if(!isNaN(parseFloat(temp)) && isFinite(temp)) {
            value = temp
            that.setData({
              input_value: value,
            });
          }
          else{
            that.setData({
              tips: "输入有误.",
            })
          }
        }
        else {
          that.setData({
            tips: "输入有误.",
          })
        }
      }
    })
  },

  btn1() {
    wx.vibrateShort();
    this.setData({
      backgroundcolor: "grey",
      button_disabled: true,
      tips: "",
    })

    var that = this;
    if(String(value).length <= 15){
      if(!isNaN(parseFloat(value)) && isFinite(value)) {
        var deviceId = getApp().globalData.deviceId
        var serviceId = getApp().globalData.serviceId
        var characteristicId = getApp().globalData.characteristicsFE63

        /*******************************/
        /*************预重连************/
        /*******************************/
        if(getApp().globalData.Reconnect){
          wx.createBLEConnection({
            deviceId,
            success: (res) => {
              console.log("重连成功！")
              getApp().globalData.Reconnect = false
            },
          })
        }

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
          let arrayBuffer1 = new ArrayBuffer(4)
          let dataView = new DataView(arrayBuffer1)
          dataView.setUint8(0, 0x01)
          dataView.setUint8(1, 0xFC)
          dataView.setUint8(2, 0x07)
          var temp = 7 + String(value).length
          dataView.setUint8(3, temp)

          var intactValue = "KC BLE " + value
          /*for(let i = 0; i < temp; i++){
            dataView.setUint8(4 + i, String(intactValue).substr(i, 1))
          }
          console.log(arrayBuffer1)*/

          //字符串编码
          /*const encoder = new TextEncoder();
          const arrayBuffer2 = encoder.encode(intactValue).buffer;
          console.log(arrayBuffer2);*/
          const arrayBuffer2 = unescape(encodeURIComponent(intactValue)).split("").map(val => val.charCodeAt())
          console.log(arrayBuffer2);

          //字符串解码
          /*const decoder = new TextDecoder();
          const str = decoder.decode(new Uint8Array(arrayBuffer2));
          console.log(str);*/
          const str = decodeURIComponent(escape(String.fromCharCode(...arrayBuffer2)))
          console.log(str)
          
          //ArrayBuffer的合并
          const buffer = new ArrayBuffer(4 + 7 + String(value).length)
          const uint8Array = new Uint8Array(buffer)
          uint8Array.set(new Uint8Array(arrayBuffer1), 0)
          uint8Array.set(new Uint8Array(arrayBuffer2), 4)
          console.log(buffer)
          
          wx.writeBLECharacteristicValue({
            deviceId,
            serviceId,
            characteristicId,
            value: buffer,
            success (res) {
              Reconnect_count = 0
            },
            fail: (res) => {
              if(getApp().globalData.Reconnect){
                //重连
                wx.createBLEConnection({
                  deviceId,
                  success: (res) => {
                    console.log("重连成功！")
                    getApp().globalData.Reconnect = false
                    //指令重发
                    wx.writeBLECharacteristicValue({
                      deviceId,
                      serviceId,
                      characteristicId,
                      value: buffer,
                      success (res) {
                        Reconnect_count = 0
                      },
                      fail: (res) => {
                        that.setData({
                          tips: "蓝牙设备名称写入失败\n" + res.errCode + "\n" + res.errMsg,
                          backgroundcolor: "#3d8ae5",
                          button_disabled: false,
                        })
                      },
                    })
                  },
                  fail: (res) => {
                    that.setData({
                      tips: "蓝牙设备名称写入失败\n" + res.errCode + "\n" + res.errMsg,
                      backgroundcolor: "#3d8ae5",
                      button_disabled: false,
                    })


                    Reconnect_count++
                    console.log("重连失败-" + Reconnect_count)
                    if(Reconnect_count >= 3){
                      //假设没有向后翻页
                      getApp().globalData.Reconnect = false
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
                })
              }
            }
          })
        }, 500);
        //clearTimeout(Timeout_number);
      }
      else {
        that.setData({
          tips: "输入有误.",
          backgroundcolor: "#3d8ae5",
          button_disabled: false,
        })
      }
    }
    else {
      that.setData({
        tips: "输入有误.",
        backgroundcolor: "#3d8ae5",
        button_disabled: false,
      })
    }
  },
})