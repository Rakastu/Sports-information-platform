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
    selectedTime: '',
    timeOptionsArray: [],
  },

  selectCourt: function (event) {
    const courtId = event.currentTarget.dataset.id;
    this.setData({
      selectedCourt: this.data.courts.find(court => court.id === parseInt(courtId)),
    });
    this.getCourtStatus();
  },

  bindTimeChange: function (e) {
    const selectedTimeIndex = e.detail.value;
    const selectedTimeData = this.data.timeOptionsArray[selectedTimeIndex];
    const selectedTime = selectedTimeData.split(' - ')[0]; // 提取时间部分
    this.setData({
      selectedTimeIndex: selectedTimeIndex,
      selectedTime: selectedTime
    });
  },

  submitReservation: function () {
    if (this.data.selectedCourt && this.data.selectedTime !== '请选择时间' && this.data.currentDate !== '') {
      const reservationData = {
        stu_number: '2019001',
        court_name: this.data.selectedCourt.name,
        date: this.data.currentDate,
        time: this.data.selectedTime,
        status: '已被预约'
      };
  
      wx.request({
        url: `http://localhost:3000/api/getReservation/${reservationData.court_name}/${reservationData.date}/${reservationData.time}`,
        method: 'GET',
        success: (res) => {
          if (res.data.length !== 0) {
            wx.showToast({
              title: '该时间段已被预约',
              icon: 'none',
              duration: 2000
            });
          } else {
            wx.request({
              url: 'http://localhost:3000/api/makeReservation',
              method: 'POST',
              data: reservationData,
              header: {
                'content-type': 'application/json'
              },
              success: (res) => {
                console.log(res.data);
                const timeOptionsArray = this.data.timeOptionsArray.map(option => {
                  if (option.includes(reservationData.time)) {
                    return option.replace('空闲', '已被预约');
                  }
                  return option;
                });
                wx.showToast({
                  title: '预约成功',
                  icon: 'success',
                  duration: 2000
                });
  
                this.setData({
                  selectedCourt: null,
                  selectedTime: '请选择时间',
                  timeOptionsArray: timeOptionsArray
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
    this.setData({ currentTab: targetPage.split('/')[2] });
    wx.navigateTo({ url: targetPage });
  },

  bindDateChange: function (e) {
    const selectedDate = e.detail.value;
    this.setData({
      currentDate: selectedDate
    });
    this.getCourtStatus();
  },

  updateDates: function () {
    const now =  new Date(); 
    const today = now.toISOString().split('T')[0];
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(23, 59, 59);
    const tomorrowDate = tomorrow.toISOString().split('T')[0];
  
    this.setData({
      startDate: today,
      endDate: tomorrowDate,
      currentDate:today
    });
  },

  gettoday:function(){
    const now =  new Date();
    const today = now.toISOString().split('T')[0];
    this.setData({
      currentDate:today
    })
  },


  getCourtStatus: function () {
    let courtName = '场地A';
    if(this.data.selectedCourt) {
      courtName = this.data.selectedCourt.name; 
    }
    const date = this.data.currentDate;
    wx.request({
      url: `http://localhost:3000/api/getCourtStatus/${courtName}/${date}`, 
      method: 'GET',
      success: (res) => {
        console.log(res.data); 
        const courtStatus = res.data;
        const options = [
          { time: '11:30', status: '空闲' },
          { time: '12:30', status: '空闲' },
          { time: '15:30', status: '空闲' },
          { time: '16:30', status: '空闲' },
          { time: '17:30', status: '空闲' },
          { time: '18:30', status: '空闲' },
          { time: '19:30', status: '空闲' }
        ];
        courtStatus.forEach(status => {
          const index = options.findIndex(option => option.time === status.time);
          if (index !== -1) {
            options[index].status = status.status; 
          }
        });
        const timeOptionsArray = options.map(option => `${option.time} - ${option.status}`);
        this.setData({
          timeOptionsArray: timeOptionsArray
        });
      },
      fail: (error) => {
        console.error(error);
      }
    });
  },

  onLoad() {
    //this.gettoday();
    this.updateDates();
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
