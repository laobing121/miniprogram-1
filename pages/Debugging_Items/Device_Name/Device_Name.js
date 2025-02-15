// pages/Debugging_Items/Device_Name/Device_Name.js
var button_command
var value
var Reconnect_count = 0//重连次数

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "设定蓝牙设备名称",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取当前页面
    getApp().TogetCurrentPage()
    //console.log(getApp().globalData.currentPage)
    getApp().globalData.Reconnect_count = 0;

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

  //await就是等待async函数的return，然后再往下执行；同时意味着await所在的函数也必须是async函数
  //回调函数的运行即return，它只是为用户提供了return之前可自定义操作的机会
  btn1: async function() {
    wx.vibrateShort();
    this.setData({
      backgroundcolor: "grey",
      button_disabled: true,
      tips: "",
    })

    var that = this;
    if(String(value).length <= 15){
      if(!isNaN(parseFloat(value)) && isFinite(value)) {
        
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
          



          if(await getApp().Command_Send(3, buffer, that.data.title)) {
            //蓝牙设备名称写入成功！！！！！后，localName立即修改完成，稍后name方修改完成。即搜索到的蓝牙设备名称需要稍待片刻才会发生改变
            that.setData({
              tips: "蓝牙设备名称写入成功！！！！！\n",// + res.detail.errCode + "\n" + res.detail.errMsg,
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