// pages/educationalProjects/educationalProjects.js
Page({
  data: {
    projects: [],
    sortOptions: ["按时间", "按重要性"],
    selectedSortIndex: 0
  },
  onLoad: function() {
    this.loadProjects();
  },
  onSortChange: function(e) {
    this.setData({
      selectedSortIndex: e.detail.value
    });
    this.loadProjects();
  },
  loadProjects: function() {
    // 这里可以调用后端API获取数据，并根据 selectedSortIndex 排序
  },
  goToDetail: function(e) {
    wx.navigateTo({
      url: '/pages/projectDetail/projectDetail?id=' + e.currentTarget.dataset.id
    });
  }
});
