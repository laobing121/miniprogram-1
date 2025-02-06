// pages/other/other.js
var button_command
        //0——扫描
        //1——连接
        //2——断开连接
var deviceId
var serviceId
var characteristicsFE61
var characteristicsFE62
var characteristicsFE63

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'BLEname', deviceId: '12345', RSSI: '55'},
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    button_command = 0
    this.setData({
      button_disabled: false,
      radio_disabled: false,
      tips: "请尽量接近产品，然后点击“扫描”",
      buttonText: "扫描",
      items: [],
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

  btn1(e) {
    wx.vibrateShort();
    this.setData({
      backgroundcolor: "grey",
      button_disabled: true
      });
      
    var that = this;
    if(button_command == 0){
      /*******************************/
      /*********打开蓝牙适配器*********/
      /*******************************/
      wx.openBluetoothAdapter({
        success (res) {
          console.log(res)
          that.setData({
            tips: "蓝牙适配器初始化成功\n" + res.errCode + "\n" + res.errMsg,
            })

            
            

            /*******************************/
            /************扫描设备************/
            /*******************************/
            wx.startBluetoothDevicesDiscovery({
              //services: ['FEE7'],
              allowDuplicatesKey: false,
              success (res) {
                console.log(res)
                that.setData({
                  tips: "扫描外围设备\n" + res.errCode + "\n" + res.errMsg,
                })
                var BLEdevices = []
                //每当发现一个新的蓝牙设备，就会触发这个事件。
                /*******************************/
                /************发现设备************/
                /*******************************/
                wx.onBluetoothDeviceFound((res) => {
                  res.devices.forEach((device) => {
                    // 这里可以做一些过滤
                    console.log('Device Found', device)
                    if(device.name != ""){//忽略无名称者
                      var temp = BLEdevices.find(function(BLEdevice){
                        return BLEdevice.deviceId === device.deviceId
                      })
                      if(temp == undefined){
                        var newarray = {
                          name: device.name,
                          deviceId: device.deviceId,
                          RSSI: device.RSSI,
                        }
                        BLEdevices.push(newarray)
                      }
                    }
                  })
                  that.setData({
                    items: BLEdevices
                  })
                  console.log(that.data.items)
                  // 找到要搜索的设备后，及时停止扫描
                  //wx.stopBluetoothDevicesDiscovery()
                })
              },
              fail (res) {
                console.log(res)
                that.setData({
                  tips: "扫描外围设备失败\n" + res.errCode + "\n" + res.errMsg,
                backgroundcolor: "#3d8ae5",
                })
              }
            })
        },
        fail (res) {
          console.log(res)
          that.setData({
            tips: "蓝牙适配器初始化失败\n请开启手机蓝牙并重试\n" + res.errCode + "\n" + res.errMsg,
            backgroundcolor: "#3d8ae5",
            })
        }
      })



      wx.onBluetoothAdapterStateChange(function (res) {
        console.log('adapterState changed, now is', res)
        //蓝牙适配器开启
        if(res.available){
          that.setData({
            tips: "蓝牙适配器已开启",
          })} else {
            that.setData({
              tips: "蓝牙适配器已关闭",
            })
          }
      })
    }
    else if(button_command == 1){
      /*******************************/
      /************停止扫描************/
      /*******************************/
      wx.stopBluetoothDevicesDiscovery()
      that.setData({
        radio_disabled: true,
      })
      /*******************************/
      /**************连接*************/
      /*******************************/
      wx.createBLEConnection({
        deviceId, // 搜索到设备的 deviceId
        success: (res) => {
          that.setData({
            tips: "连接成功\n" + res.errCode + "\n" + res.errMsg,
            buttonText: "断开",
            backgroundcolor: "#3d8ae5",
            button_disabled: false,
          })
          button_command = 2
          /*******************************/
          /**********获取设备服务**********/
          /*******************************/
          // 连接成功，获取服务
          wx.getBLEDeviceServices({
            deviceId, // 搜索到设备的 deviceId
            success: (res) => {
              for (let i = 0; i < res.services.length; i++) {
                if (res.services[i].isPrimary) {
                  // 可根据具体业务需要，选择一个主服务进行通信
                  if(res.services[i].uuid.indexOf("FE60-") >=0)
                  {
                    serviceId = res.services[i].uuid
                  }
                }
              }
              console.log(res.services.length)
              console.log(res.services)
              that.setData({
                tips: "获取服务成功\n",
              })
            }
          })
          
          /*******************************/
          /**********获取设备特征**********/
          /*******************************/
          wx.getBLEDeviceCharacteristics({
            deviceId, // 搜索到设备的 deviceId
            serviceId, // 上一步中找到的某个服务
            success: (res) => {
              console.log(res.characteristics)
              that.setData({
                tips: "获取设备特征成功\n",
              })
              for (let i = 0; i < res.characteristics.length; i++) {
                let item = res.characteristics[i]
                if(item.uuid.indexOf("FE61-") >=0) {
                  characteristicsFE61 = item.uuid
                }
                if(item.uuid.indexOf("FE62-") >=0) {
                  characteristicsFE62 = item.uuid
                }
                if(item.uuid.indexOf("FE63-") >=0) {
                  characteristicsFE63 = item.uuid
                }
              }
            },
            fail: (res) => {
              console.log(res)
              that.setData({
                tips: "获取设备特征失败\n" + res.errCode + "\n" + res.errMsg,
              })
            }
          })
        },
        fail: (res) => {
          that.setData({
            tips: "连接失败\n" + res.errCode + "\n" + res.errMsg,
            backgroundcolor: "#3d8ae5",
            button_disabled: false,
            radio_disabled: false,
          })
        }
      })
    }
    else {
      /*******************************/
      /************断开连接************/
      /*******************************/
      wx.closeBLEConnection({
        deviceId,
        success (res) {
          console.log(res)
          that.setData({
            tips: "连接已断开\n" + res.errCode + "\n" + res.errMsg,
          })
        },
        fail: (res) => {
          that.setData({
            tips: "断开失败\n" + res.errCode + "\n" + res.errMsg,
          })
        },
        complete: (res) => {
          that.setData({
            buttonText: "连接",
            backgroundcolor: "#3d8ae5",
            button_disabled: false,
            radio_disabled: false,
          })
          button_command = 1
        },
      })
    }
  },

  radioChange: function (e) {
    deviceId = e.detail.value;
    this.setData({
      buttonText: "连接",
      backgroundcolor: "#3d8ae5",
      button_disabled: false,
      });
    button_command = 1
  },

  btn2(e) {
    wx.vibrateShort();
    this.setData({
      backgroundcolor2: "grey",
      button_disabled2: true
      });
      
    var that = this;
    /*******************************/
    /**********获取设备特征**********/
    /*******************************/

        /*
          
          if (item.properties.write) { // 该特征值可写
            // 本示例是向蓝牙设备发送一个 0x00 的 16 进制数据
            // 实际使用时，应根据具体设备协议发送数据
            let buffer = new ArrayBuffer(1)
            let dataView = new DataView(buffer)
            dataView.setUint8(0, 0)
            wx.writeBLECharacteristicValue({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
              value: buffer,
            })
          }
          if (item.properties.read) { // 该特征值可读
            wx.readBLECharacteristicValue({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
            })
          }
          if (item.properties.notify || item.properties.indicate) {
            // 必须先启用 wx.notifyBLECharacteristicValueChange 才能监听到设备 onBLECharacteristicValueChange 事件
            wx.notifyBLECharacteristicValueChange({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
              state: true,
            })
          }
        }*/


  }
})
