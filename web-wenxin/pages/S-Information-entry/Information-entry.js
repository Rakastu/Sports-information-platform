Page({
  data: {
    // 存储输入的值
    Tid: '',
    Tname: '',
    Cname: '',
    Cid: ''
  },

  // 监听工号输入
  inputTid(e) {
    this.setData({
      Tid: parseInt(e.detail.value) // 转换为整数
    });
  },

  // 监听姓名输入
  inputTname(e) {
    this.setData({
      Tname: e.detail.value
    });
  },

  // 监听任教课程输入
  inputCname(e) {
    this.setData({
      Cname: e.detail.value
    });
  },

  // 监听课程编号输入
  inputCid(e) {
    this.setData({
      Cid: parseInt(e.detail.value) // 转换为整数
    });
  },

  // 点击录入按钮触发的事件
  handleTap() {
    // 发送 HTTP 请求到后端
    wx.request({
      url: 'http://localhost:8080/api/add',
      method: 'POST',
      "Content-Type":"application/json",
      data: {
        Tid: this.data.Tid,
        Tname: this.data.Tname,
        Cname: this.data.Cname,
        Cid: this.data.Cid
      },
      success(res) {
        // 请求成功的处理逻辑
        console.log(res.data);
      },
      fail(err) {
        // 请求失败的处理逻辑
        console.error(err);
      }
    });
  }
});