Page({
  navigateToTeamIntroduction: function() {
    wx.navigateTo({
      url: '/pages/teamIntroduction/teamIntroduction'
    })
  },
  navigateToTraining: function() {
    wx.navigateTo({
      url: '/pages/training/training'
    })
  },
  navigateToMatches: function() {
    wx.navigateTo({
      url: '/pages/matches/matches'
    })
  },
  navigateToResults: function() {
    wx.navigateTo({
      url: '/pages/results/results'
    })
  }
})
