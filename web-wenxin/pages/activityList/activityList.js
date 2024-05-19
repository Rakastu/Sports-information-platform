Page({
  data:
  {
    activities: [
      {
        id: 1,
        name: "校园篮球友谊赛",
        time: "2024-04-15 14:00",
        location: "学校体育馆",
        organizer: "体育部",
        status: "报名中"
      },
      {
        id: 2,
        name: "校园健康跑",
        time: "2024-04-20 07:00",
        location: "操场",
        organizer: "校团委",
        status: "已截止"
      },
      // 更多活动...
    ]
  },

  goToActivityDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/activityDetail/activityDetail?id=${id}`
    });
  }
})
