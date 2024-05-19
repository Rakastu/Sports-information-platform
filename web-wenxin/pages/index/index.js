// index.js
Page({
  data: {
    appointments: [], // 预约信息数组
    studentId: '', // 用户学号
  },

  onLoad: function() {
    // 在页面加载时获取用户信息
    // 这里假设已经通过登录或其他方式获取到了学号
    this.setData({
      studentId: '123456' // 假设学号为123456
    });
  },

  checkAppointments: function() {
    // 根据学号查询数据库中的预约信息
    // 这里使用假数据代替实际数据库查询过程
    // 实际开发中需调用后端接口或使用云开发等方式获取数据
    const appointments = [
      { date: '2024-05-10', time: '10:00' },
      { date: '2024-05-12', time: '15:30' },
      // 其他预约信息...
    ];

    // 更新页面数据，显示预约信息
    this.setData({
      appointments: appointments
    });
  }
});
