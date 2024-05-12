Page({
  data: {
    back: "\t",
    data: "\n",
    showIndex: null,
    height: "10rpx",
    currentDate: '',
    tomorrowDate: '',
    dayAfterTomorrowDate: '',
    currentTab: 'today',
    courts: [
      { id: 0, name: '场地A', status: '空闲' },
      { id: 1, name: '场地B', status: '空闲' },
      { id: 2, name: '场地C', status: '空闲' },
      { id: 3, name: '场地D', status: '空闲' },
    ],
    selectedCourt: null,
    selectedTime: '请选择时间',
    timeOptions: (() => {
      const options = [];
      for (let hour = 8; hour <= 17; hour++) {
        if (hour < 12 || hour > 13) {
          options.push(`${hour.toString().padStart(2, '0')}:00`);
        }
      }
      return options;
    })(),
  },

  selectCourt: function (event) {
    const courtId = event.currentTarget.dataset.id;
    this.setData({
      selectedCourt: this.data.courts.find(court => court.id === parseInt(courtId)),
    });
  },

  bindTimeChange: function (event) {
    const selectedIndex = event.detail.value;
    this.setData({
      selectedTime: this.data.timeOptions[selectedIndex],
    });
  },

  submitReservation: function () {
    if (this.data.selectedCourt && this.data.selectedTime !== '请选择时间' && this.data.currentDate !== '') {
      // 构造预约信息对象
      const reservationData = {
        stu_number: '2019001',
        court_name: this.data.selectedCourt.name,
        date: this.data.currentDate,
        time: this.data.selectedTime,
        status: '已被预约' // 假设初始状态为待确认
      };
      // 发送 GET 请求到后端，检查是否已被预约
      wx.request({
        url: `http://localhost:3000/api/getReservation/${reservationData.court_name}/${reservationData.date}/${reservationData.time}`,
        method: 'GET',
        success: (res) => {
         // console.log(res.data)
          if (res.data.length!=0) {
            wx.showToast({
              title: '该时间段已被预约',
              icon: 'none',
              duration: 2000
            });
          }else {
            wx.request({
              url: 'http://localhost:3000/api/makeReservation',
              method: 'POST',
              data: JSON.stringify(reservationData),
              header: {
                'content-type': 'application/json'
              },
              success: (res) => {
                console.log(res.data);
                wx.showToast({
                  title: '预约成功',
                  icon: 'success',
                  duration: 2000
                });
              },
              fail: (err) => {
                console.error(err);
                wx.showToast({
                  title: '预约失败，请稍后重试',
                  icon: 'none',
                  duration: 2000
                });
              }
            });
          }
        },
        fail: (err) => {
          console.error(err);
          wx.showToast({
            title: '请求失败，请稍后重试',
            icon: 'none',
            duration: 2000
          });
        }
      });

      this.setData({
        selectedCourt: null,
        selectedTime: '请选择时间',
      });
    } else {
      wx.showToast({
        title: '请选择场地、日期和时间',
        icon: 'none',
        duration: 2000
      });
    }
  },

  switchTab: function (e) {
    const targetPage = e.currentTarget.dataset.page;
    this.setData({ currentNavItem: targetPage.split('/')[2] });
    wx.navigateTo({ url: targetPage });
  },

//页面加载时间，调用函数获取今天和明天的日期
  onLoad(options) {
    this.updateDates();
  },


  bindDateChange: function (e) { 
    const selectedDate = e.detail.value;
    this.setData({
      currentDate: selectedDate
    });
  
    this.updateDates(selectedDate);
  },
updateDates: function () {
  const now = new Date();
  const today = now.toISOString().split('T')[0]; 
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(23, 59, 59); 
  const tomorrowDate = tomorrow.toISOString().split('T')[0]; 
  this.setData({
    currentDate:today,
    startDate: today,
    endDate: tomorrowDate
  });
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