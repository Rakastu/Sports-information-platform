// pages/research/research.js
Page({
  data: {
    news: []
  },
  onLoad: function() {
    var that = this;
    wx.request({
      url: 'https://your-backend-api.com/news', // 替换为你的API地址
      method: 'GET',
      success: function(res) {
        if (res.statusCode === 200) {
          that.setData({
            news: res.data
          });
        } else {
          wx.showToast({
            title: '数据加载失败',
            icon: 'none'
          });
        }
      },
      fail: function() {
        wx.showToast({
          title: 'API调用失败',
          icon: 'none'
        });
      }
    });
  },
  navigateTo: function(e) {
    const url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    });
  }
});
