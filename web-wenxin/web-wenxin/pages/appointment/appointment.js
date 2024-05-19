Page({
  navigateToAssessment: function(event) {
    wx.navigateTo({
      url: '/pages/assessment/assessment',
    })
  },

  goToAssessment: function() {
    wx.navigateTo({
      url: '/pages/assessment/assessment'
    })
  },

  goToAppointment: function() {
    wx.navigateTo({
      url: '/pages/appointment/appointment'
    })
  },

  goToScore: function() {
    wx.navigateTo({
      url: '/pages/score/score'
    })
  },

  goToPrescription: function() {
    wx.navigateTo({
      url: '/pages/prescription/prescription'
    })
  },

  data: {
    // 初始化日期时间选择器
    dateTimeArray: null,
    dateTime: null,
    startYear: 2021,
    endYear: 2030
  },

  onLoad: function (options) {
    // 初始化日期时间选择器数据
    this.initDateTimePicker();
  },

  initDateTimePicker: function () {
    var dateTime = new Date();
    var dateTimeArray = [
      [],
      [],
      [],
      [],
      [],
      []
    ];
    var startYear = this.data.startYear;
    var endYear = this.data.endYear;
    // 初始化年份
    for (var i = startYear; i <= endYear; i++) {
      dateTimeArray[0].push(i + '年');
    }
    // 初始化月份
    for (var i = 1; i <= 12; i++) {
      dateTimeArray[1].push(i + '月');
    }
    // 初始化日期
    var month = dateTime.getMonth() + 1;
    var day = dateTime.getDate();
    for (var i = 1; i <= this.getMonthDays(month); i++) {
      dateTimeArray[2].push(i + '日');
    }
    // 初始化小时
    for (var i = 0; i <= 23; i++) {
      dateTimeArray[3].push(i + '时');
    }
    // 初始化分钟
    for (var i = 0; i <= 59; i++) {
      dateTimeArray[4].push(i + '分');
    }
    this.setData({
      dateTimeArray: dateTimeArray,
      dateTime: dateTimeArray.map(function (n) {
        return n[0];
      })
    });
  },

  getMonthDays: function (year, month) {
    return new Date(year, month, 0).getDate();
  },

  changeDateTime(e) {
    this.setData({ dateTime: e.detail.value });
  },

  onReady() {

  },

  onShow() {

  },

  onHide() {

  },

  onUnload() {

  },

  onPullDownRefresh() {

  },

  onReachBottom() {

  },

  onShareAppMessage() {

  }
})
