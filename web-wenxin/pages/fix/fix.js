// pages/fix/fix.js
Page({
  
  submitRepair: function(e) {
    const formData = e.detail.value;
    console.log(formData); // 在这里可以获取到表单数据并进一步处理，例如发送网络请求

    // 示例：发送网络请求
    wx.request({
      url: '/submit-repair',
      method: 'POST',
      data: formData,
      success: function(res) {
        console.log('提交成功', res.data);
        // 可以在此处添加提交成功的提示
      },
      fail: function() {
        console.log('提交失败');
        // 可以在此处添加提交失败的提示
      }
    });
  },
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})