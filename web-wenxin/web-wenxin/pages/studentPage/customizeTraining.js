Page({
  navigateBack: function() {
    wx.navigateBack({
      delta: 1  // 返回上一级页面
    })
  },
  data: {
    trainingPlan: '',
    trainingDate: '',
    trainingField: ''
  },
  inputTrainingPlan: function(event) {
    this.setData({
      trainingPlan: event.detail.value
    })
  },
  inputTrainingDate: function(event) {
    this.setData({
      trainingDate: event.detail.value
    })
  },
  inputTrainingField: function(event) {
    this.setData({
      trainingField: event.detail.value
    })
  },
  generatePlan: function() {
    // 假设从缓存中获取学号
    //const stuNumber = wx.getStorageSync('stuNumber'); 
    //这里先定义学号为2019004
    const stuNumber = 2019004
    const trainingPlan = this.data.trainingPlan;
    const trainingDate = this.data.trainingDate;
    const trainingField = this.data.trainingField;
    wx.request({
      url: 'http://localhost:3000/api/training-plans', 
      method: 'POST',
      data: {
        stu_number: stuNumber,
        athlete_training_plan: trainingPlan,
        training_date: trainingDate,
        training_field: trainingField
      },
      header: {
        'content-type': 'application/json' 
      },
      success: function(res) {
        wx.showToast({
          title: '生成计划成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function(err) {
        wx.showToast({
          title: '生成计划失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})
