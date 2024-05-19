// studentPage.js
Page({
  navigateBack: function() {
    wx.navigateBack({
      delta: 1  // 返回上一级页面
    })
  },
  customizeTraining: function() {
    // 跳转至定制训练方案页面
    wx.navigateTo({
      url: '/pages/studentPage/customizeTraining'
    })
  },
  viewMyPlans: function() {
    // 跳转至查看我的训练计划页面
    wx.navigateTo({
      url: '/pages/studentPage/viewMyPlans'
    })
  },
  viewTrainingRecords: function() {
    // 跳转至查看训练记录页面
    wx.navigateTo({
      url: '/pages/studentPage/viewTrainingRecords'
    })
  }
})
