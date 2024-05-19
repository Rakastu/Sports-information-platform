// pages/researchProjects/researchProjects.js
Page({
  data: {
    categories: ["所有","计算机", "信息工程", "机械", "光电","仪器","外语"],
    selectedCategoryIndex: 0,
    projects: []
  },
  onCategoryChange: function(e) {
    this.setData({
      selectedCategoryIndex: e.detail.value
    });
    this.loadProjects();
  },
  loadProjects: function() {
    // 根据 selectedCategoryIndex 调用后端 API 获取数据
  },
  goToDetail: function(e) {
    wx.navigateTo({
      url: '/pages/projectDetail/projectDetail?id=' + e.currentTarget.dataset.id
    });
  }
});
