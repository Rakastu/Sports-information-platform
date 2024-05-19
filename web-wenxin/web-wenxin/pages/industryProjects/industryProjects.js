// pages/industryProjects/industryProjects.js
Page({
  data: {
    opportunities: [
      { id: 1, title: "新能源技术合作", summary: "探索新能源技术的合作机会。" },
      { id: 2, title: "智能制造研究", summary: "与顶尖大学合作的智能制造研究项目。" }
    ]
  },
  goToOpportunityDetail: function(e) {
    wx.navigateTo({
      url: '/pages/opportunityDetail/opportunityDetail?id=' + e.currentTarget.dataset.id
    });
  }
});
