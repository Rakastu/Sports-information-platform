// index.js
Page({
  data: {
    startDate: '',
    startTime: '',
    timeRange: ['1', '2', '3', '4', '5'], // 以小时为单位的运动时长
    durationIndex: 0, // 默认选择第一个小时
    isReserved: false, // 是否已经预约成功
    today: '', // 当前日期
  },

  onLoad: function() {
    this.setToday();
  },

  setToday: function() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
    const day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    const todayStr = `${year}-${month}-${day}`;
    this.setData({
      today: todayStr,
      startDate: todayStr
    });
  },

  bindDateChange: function(e) {
    this.setData({
      startDate: e.detail.value
    });
  },

  bindTimeChange: function(e) {
    this.setData({
      startTime: e.detail.value
    });
  },

  bindDurationChange: function(e) {
    this.setData({
      durationIndex: e.detail.value
    });
  },

  confirmReservation: function() {
    // 模拟提交预约请求
    // 这里可以通过 wx.request() 发送预约请求到服务器
    // 如果请求成功，将 isReserved 置为 true，显示预约成功消息
    // 如果请求失败，可以显示一个错误提示或者重新尝试预约
    this.setData({
      isReserved: true
    });
  }
});
