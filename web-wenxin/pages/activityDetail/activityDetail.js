Page({
  data:
  {
    activity: {
      id: 1,
      name: "校园篮球友谊赛",
      time: "2024-04-15 14:00",
      location: "学校体育馆",
      organizer: "学生会",
      status: "报名中"
    },
    participants: [
      "张三",
      "李四",
      "王五"
    ]
  },

  onLoad: function(options) {
    // 在实际应用中，这里可以根据页面跳转传递过来的id（options.id）去请求活动的详细信息及参与者名单
    // 这里使用的是固定数据仅作为示例
    console.log("加载活动详情，活动ID：", options.id);
    // 假设这里通过options.id去请求了活动详情和参与者名单后更新了data中的activity和participants
  },
  signup: function() {
    // 这里添加用户报名逻辑
    // 在实际应用中，应该向服务器发送报名请求，并根据返回结果给用户反馈
    wx.showToast({
      title: '报名成功!',
      icon: 'success',
      duration: 2000
    });
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
      
    // 假设报名成功后，更新参与者名单
    this.setData({
      participants: [...this.data.participants, '宋六'], // 示例添加新参与者
      'activity.status': '已报名' // 假设活动报名人数已满，更新活动状态
    });
  }
})
  