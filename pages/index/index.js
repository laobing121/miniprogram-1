// index.js
var btn_enable;
// Ⅰ 连接初始化
// Ⅱ 热点连接
// Ⅲ 适配器连接
var timer_number;

Page({
  onShow() {
    btn_enable = true;
    this.setData({
      backgroundcolor: "#3d8ae5",
      tips: "",
      });
  },

  btn1(e) {
    if(btn_enable == true) {
      btn_enable = false;
      wx.vibrateShort();
      // wx.vibrateLong();
      this.setData({
        backgroundcolor: "grey",
        tips: "连接中，请稍候",
        });

      wx.startWifi({
        success: (res) => {
            console.log(res.errMsg);
            this.connectWifi();
        },
        fail: (err) => {
            console.error(err);
            this.setData({
                tips: "连接初始化失败：" + err.errMsg,
            });

            this.setData({
            backgroundcolor: "#3d8ae5",
            });
            btn_enable = true;
        },
      });
    }
  },

  connectWifi() {
      wx.connectWifi({
        SSID: 'DESKTOP-GB9FE5T 3407',
        password: '24!48N9g',
        /*success(res) {
            console.log(res.errMsg);
            this.setData({
                tips: res.errMsg,
            });
        },*/
        success: (res) => {
            console.log(res.errMsg);
            /*this.setData({
                tips: res.errMsg,
            });*/
            this.wxsetTimeout();
            this.onWifiConnected();
        },
        fail: (err) => {
            console.error(err.errMsg);
            this.setData({
                tips: "热点连接失败：" + err.errMsg,
            });

            this.setData({
            backgroundcolor: "#3d8ae5",
            });
            btn_enable = true;
        },
        /*fail: () => {
            console.error("失败");
            this.setData({
                tips: "失败",
            });
        },*/
      });
  },

  onWifiConnected() {
      wx.onWifiConnected(
          res => {
              clearTimeout(timer_number);
              console.log(res);
              this.setData({
                    tips: "连接成功！",
                });
              wx.navigateTo({
                url: '/pages/page00/page00',
              })
            }
      );
  },

  wxsetTimeout() {
      timer_number = setTimeout(
          () => {
              this.setData({
                  tips: "适配器连接失败！",
              });
              
              this.setData({
                  backgroundcolor: "#3d8ae5",
              });
              btn_enable = true;
          },
          8000,
        );
  },
})
