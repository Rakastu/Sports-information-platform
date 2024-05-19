Page({

  /**
   * 页面的初始数据
   */
  data: {
    back:"\t",
    data:"\n",
    showIndex:null,
    height:"10rpx",
    currentDate: '',
    tomorrowDate: '',
    dayAfterTomorrowDate: '',
    currentTab: 'today',
    courts: [
      {id: 0, name: '场地A', status: '空闲'},
      {id: 1, name: '场地B', status: '空闲'},
      {id: 2, name: '场地C', status: '空闲'},
      {id: 3, name: '场地D', status: '空闲'},
    ],
    selectedCourt: null,
    selectedTime: '请选择时间',
    timeOptions: (() => {
      const options = [];
      for (let hour = 8; hour <= 20; hour++) {
        options.push(`${hour.toString().padStart(2, '0')}:00`);
      }
      return options;
    })(),
    selectedTime: '08:00',
  },
  selectCourt: function(event) {
    const courtId = event.currentTarget.dataset.id;
    this.setData({
      selectedCourt: this.data.courts.find(court => court.id === parseInt(courtId)),
    });
  },

  bindTimeChange: function(event) {
    const selectedIndex = event.detail.value;
    this.setData({
      selectedTime: this.data.timeOptions[selectedIndex],
    });
  },

  submitReservation: function() {
    if (this.data.selectedCourt && this.data.selectedTime !== '请选择时间') {
      console.log('提交预约:', this.data.selectedCourt.name, this.data.selectedTime);
      this.setData({
        selectedCourt: null,
        selectedTime: '请选择时间',
      });
    } else {
      wx.showToast({
        title: '请选择场地和时间',
        icon: 'none',
      });
    }
  },




  
  bindDateChange: function(e) {
    const selectedDate = e.detail.value;
    this.setData({
      currentDate: selectedDate
    });
  },

  switchTab: function(e) {
    const targetPage = e.currentTarget.dataset.page;
    this.setData({ currentNavItem: targetPage.split('/')[2] });
    wx.navigateTo({ url: targetPage });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.updateDates();
  },
  
  updateDates: function () {
    const now = new Date();

    const currentDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;

    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = `${tomorrow.getFullYear()}-${(tomorrow.getMonth() + 1).toString().padStart(2, '0')}-${tomorrow.getDate().toString().padStart(2, '0')}`;

    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
    const dayAfterTomorrowDate = `${dayAfterTomorrow.getFullYear()}-${(dayAfterTomorrow.getMonth() + 1).toString().padStart(2, '0')}-${dayAfterTomorrow.getDate().toString().padStart(2, '0')}`;

    this.setData({
      currentDate: currentDate,
      tomorrowDate: tomorrowDate,
      dayAfterTomorrowDate: dayAfterTomorrowDate
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

  }
})