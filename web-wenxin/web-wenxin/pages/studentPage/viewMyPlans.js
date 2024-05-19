Page({
  navigateBack: function() {
    wx.navigateBack({
      delta: 1  // 返回上一级页面
    })
  },
  data: {
    trainingPlans: [],
    stuNumber: '' 
  },
  onLoad: function(options) {
    // 从缓存中获取学号
   // const stuNumber = wx.getStorageSync('stuNumber');
   //暂定为学号为2019001
   const stuNumber = '2019001' 
   if (!stuNumber) {
      console.error('Failed to get student number from cache');
      return;
    }
    this.setData({
      stuNumber: stuNumber
    });
    
    wx.request({
      url: 'http://localhost:3000/api/athlete_training/' + stuNumber,
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          const trainingPlansData = res.data;
          this.setData({
            trainingPlans: trainingPlansData
          });
        } else {
          console.error('Failed to fetch training plans:', res.statusCode);
        }
      },
      fail: (error) => {
        console.error('Failed to fetch training plans:', error);
      }
    });
  },
  
  startTraining: function(event) {
    const index = event.currentTarget.dataset.index;
    const trainingPlan = this.data.trainingPlans[index];
    wx.navigateTo({
      url: '/pages/startTraining/startTraining?trainingPlan=' + JSON.stringify(trainingPlan)
    });
  }
})