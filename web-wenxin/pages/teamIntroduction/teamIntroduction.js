Page({
  //返回上级页面
  navigateBack: function() {
    wx.navigateBack({
      delta: 1  
    })
  },
  data: {
    teamList: [] // 用于存放从后端获取的运动队名称列表
  },
  onLoad: function(options) {
    wx.request({
      url: 'http://localhost:3000/api/teams', 
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          const teamListData = res.data.map(item => item.team_name); // 提取每个对象中的team_name属性
          this.setData({
            teamList: teamListData
          });
        } else {
          console.error('Failed to fetch team list:', res.statusCode);
        }
      },
      fail: (error) => {
        console.error('Failed to fetch team list:', error);
      }
    });
  },
  navigateToDetailPage: function(event) {
    const teamName = event.currentTarget.dataset.teamName;
    wx.navigateTo({
      url: '/pages/teamDetail/' + teamName 
    })
  }
})
