// pages/other/other.js
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
    this.setData({
      tips: "请尽量接近产品，然后点击“扫描”",
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
      });
      
    var that = this;
    wx.openBluetoothAdapter({
      success (res) {
        console.log(res)
        that.setData({
          tips: "蓝牙适配器初始化成功\n" + res.errCode + "\n" + res.errMsg,
          })
          /*that.setData({
            items = []
          })*/
          
          
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
              wx.onBluetoothDeviceFound((res) => {
                




                res.devices.forEach((device) => {
                  // 这里可以做一些过滤
                  console.log('Device Found', device)
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
                })
                that.setData({
                  items: BLEdevices
                })







                console.log(that.data.items)
                /*
                console.log(that.data.BLEdevice.length)*/
                // 找到要搜索的设备后，及时停止扫描
                //wx.stopBluetoothDevicesDiscovery()
                /*if(res.devices.length > 6){
                  wx.stopBluetoothDevicesDiscovery()
                  console.log(that.data.BLEdevice)
                }*/
                
                //console.log(num)
                
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
})