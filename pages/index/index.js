// pages/index/index.js
const app = getApp();


Page({
  data: {
    userInfo: null,
    isMember: false,
    memberInfo: null,
    hasAssessment: false,
    latestAssessment: null,

    quickFunctions: [
      { icon: '🔍', name: '选科查询', url: '/pages/query/query', color: '#4A90D9' },
      { icon: '📊', name: '成绩分析', url: '/pages/data/score', color: '#52C41A' },
      { icon: '🎯', name: '志愿规划', url: '/pages/data/admission', color: '#FF8C42' },
      { icon: '📚', name: '知识库', url: '/pages/knowledge/list', color: '#9254DE' }
    ]
  },

  onLoad() {
    this.loadUserInfo();

  },

  onShow() {
    this.loadUserInfo();
    this.checkAssessmentStatus();
  },

  // 加载用户信息
  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo');
    const isMember = app.checkMember();
    const memberInfo = wx.getStorageSync('memberInfo');
    
    this.setData({
      userInfo,
      isMember,
      memberInfo
    });
  },

  // 检查测评状态
  checkAssessmentStatus() {
    const records = wx.getStorageSync('assessmentRecords') || [];
    if (records.length > 0) {
      const latest = records[records.length - 1];
      this.setData({
        hasAssessment: true,
        latestAssessment: latest
      });
    } else {
      this.setData({
        hasAssessment: false,
        latestAssessment: null
      });
    }
  },

  // 开始测评
  startAssessment() {
    wx.switchTab({
      url: '/pages/assessment/assessment'
    });
  },

  // 查看测评结果
  viewAssessmentResult() {
    wx.navigateTo({
      url: '/pages/assessment/result'
    });
  },

  // 快速功能跳转
  goToFunction(e) {
    const url = e.currentTarget.dataset.url;
    if (url.includes('tabBar')) {
      wx.switchTab({ url });
    } else {
      wx.navigateTo({ url });
    }
  },

  // 开通会员
  openMember() {
    wx.navigateTo({
      url: '/pages/member/member'
    });
  },

  // 登录
  handleLogin() {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        const userInfo = {
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl
        };
        wx.setStorageSync('userInfo', userInfo);
        this.setData({ userInfo });
        wx.showToast({ title: '登录成功', icon: 'none' });
      }
    });
  }
});
