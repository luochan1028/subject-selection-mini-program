// pages/mine/mine.js
const app = getApp();

Page({
  data: {
    userInfo: null,
    isMember: false,
    memberInfo: null,
    remainDays: 0,

    // 统计数据
    stats: {
      assessmentCount: 0,
      scoreCount: 0,
      favoriteCount: 0
    },

    // 功能列表
    menuGroups: [
      {
        title: '我的内容',
        items: [
          { icon: '📊', name: '我的报告', url: '/pages/mine/reports', desc: '测评报告历史' },
          { icon: '⭐', name: '我的收藏', url: '/pages/mine/favorites', desc: '收藏的大学和专业' },
          { icon: '📚', name: '浏览历史', url: '/pages/mine/history', desc: '查看过的内容' }
        ]
      },
      {
        title: '学习工具',
        items: [
          { icon: '📝', name: '成绩管理', url: '/pages/data/score', desc: '录入和分析成绩' },
          { icon: '🎯', name: '志愿规划', url: '/pages/data/admission', desc: '智能推荐院校', isVip: true },
          { icon: '👨‍🏫', name: '专家咨询', url: '/pages/mine/consult', desc: '一对一指导', isVip: true }
        ]
      },
      {
        title: '其他',
        items: [
          { icon: '⚙️', name: '设置', url: '/pages/mine/settings', desc: '账号与偏好设置' },
          { icon: '💬', name: '意见反馈', url: '/pages/mine/feedback', desc: '帮助我们改进' },
          { icon: 'ℹ️', name: '关于我们', url: '/pages/mine/about', desc: '版本信息' }
        ]
      }
    ]
  },

  onLoad() {
    this.loadUserInfo();
    this.loadStats();
  },

  onShow() {
    this.loadUserInfo();
    this.loadStats();
  },

  // 加载用户信息
  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo');
    const isMember = app.checkMember();
    const memberInfo = wx.getStorageSync('memberInfo');
    
    let remainDays = 0;
    if (memberInfo && memberInfo.expireTime) {
      remainDays = Math.ceil((memberInfo.expireTime - Date.now()) / (1000 * 60 * 60 * 24));
    }

    this.setData({
      userInfo,
      isMember,
      memberInfo,
      remainDays
    });
  },

  // 加载统计数据
  loadStats() {
    const assessmentRecords = wx.getStorageSync('assessmentRecords') || [];
    const scoreRecords = wx.getStorageSync('scoreRecords') || [];
    const favorites = wx.getStorageSync('favorites') || { universities: [], majors: [], articles: [] };

    const favoriteCount = (favorites.universities?.length || 0) + 
                          (favorites.majors?.length || 0) + 
                          (favorites.articles?.length || 0);

    this.setData({
      stats: {
        assessmentCount: assessmentRecords.length,
        scoreCount: scoreRecords.length,
        favoriteCount
      }
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
  },

  // 开通会员
  openMember() {
    wx.navigateTo({
      url: '/pages/member/member'
    });
  },

  // 菜单点击
  handleMenuClick(e) {
    const item = e.currentTarget.dataset.item;
    
    if (item.disabled) {
      return;
    }

    if (item.isVip && !this.data.isMember) {
      app.showMemberGuide('开通会员解锁此功能');
      return;
    }

    if (item.url) {
      wx.navigateTo({ url: item.url });
    }
  }
});
