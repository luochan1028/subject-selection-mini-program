// app.js
App({
  onLaunch() {
    // 检查用户信息
    const userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      this.globalData.userInfo = null;
    } else {
      this.globalData.userInfo = userInfo;
    }

    // 检查会员状态
    const memberInfo = wx.getStorageSync('memberInfo');
    if (memberInfo && memberInfo.expireTime > Date.now()) {
      this.globalData.isMember = true;
      this.globalData.memberInfo = memberInfo;
    } else {
      this.globalData.isMember = false;
      this.globalData.memberInfo = null;
    }

    // 初始化测评记录
    const assessmentRecords = wx.getStorageSync('assessmentRecords');
    if (!assessmentRecords) {
      wx.setStorageSync('assessmentRecords', []);
    }

    // 初始化成绩记录
    const scoreRecords = wx.getStorageSync('scoreRecords');
    if (!scoreRecords) {
      wx.setStorageSync('scoreRecords', []);
    }

    // 初始化收藏
    const favorites = wx.getStorageSync('favorites');
    if (!favorites) {
      wx.setStorageSync('favorites', { universities: [], majors: [], articles: [] });
    }
  },

  // 检查会员权限
  checkMember() {
    const memberInfo = wx.getStorageSync('memberInfo');
    if (memberInfo && memberInfo.expireTime > Date.now()) {
      this.globalData.isMember = true;
      this.globalData.memberInfo = memberInfo;
      return true;
    }
    this.globalData.isMember = false;
    this.globalData.memberInfo = null;
    return false;
  },

  // 引导开通会员
  showMemberGuide(title = '开通会员解锁更多功能') {
    wx.showModal({
      title: '会员专属',
      content: title,
      confirmText: '开通会员',
      cancelText: '稍后再说',
      success: (res) => {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/member/member'
          });
        }
      }
    });
  },

  globalData: {
    userInfo: null,
    isMember: false,
    memberInfo: null,
    // 选科模式
    subjectMode: '3+1+2', // 3+1+2 或 3+3
    // 省份
    province: '广东'
  }
});
