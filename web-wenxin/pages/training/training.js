Page({
  navigateBack: function() {
    wx.navigateBack({
      delta: 1  // 返回上一级页面
    })
  },
  onLoad: function(options) {
    // 假设从上一个页面获取用户权限信息，从登录页面获取
    const userPermission = 'student'; // 示例数据，可替换为实际获取的用户权限信息
    if (userPermission === 'student') {
      // 如果用户权限为学生，则跳转至学生页面
      wx.navigateTo({
        url: '/pages/studentPage/studentPage'
      })
    } else {
      // 如果用户权限为教师或者root，则跳转至教师页面
      wx.navigateTo({
        url: '/pages/teacherPage/teacherPage'
      })
    }
  }
})
