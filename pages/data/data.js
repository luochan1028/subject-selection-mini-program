// pages/data/data.js
const app = getApp();

Page({
  data: {
    isMember: false,
    modules: [
      {
        id: 'score',
        icon: '📝',
        name: '成绩分析',
        desc: '录入成绩，分析优势科目',
        url: '/pages/data/score',
        isVip: false,
        color: '#52C41A'
      },
      {
        id: 'admission',
        icon: '📊',
        name: '历年录取分数线',
        desc: '各大学专业历年数据对比',
        url: '/pages/data/admission',
        isVip: true,
        color: '#4A90D9'
      },
      {
        id: 'career',
        icon: '💼',
        name: '职业前景分析',
        desc: '就业率、薪资、发展趋势',
        url: '/pages/data/career',
        isVip: true,
        color: '#FF8C42'
      }
    ],

    // 成绩概览
    hasScoreData: false,
    latestScore: null,
    scoreTrend: [],

    // 快捷入口
    quickEntries: [
      { icon: '🎯', name: '智能志愿规划', desc: '冲稳保三档推荐', isVip: true },
      { icon: '👨‍🏫', name: '专家咨询', desc: '一对一指导', isVip: true }
    ]
  },

  onLoad() {
    this.checkMemberStatus();
    this.loadScoreData();
  },

  onShow() {
    this.checkMemberStatus();
    this.loadScoreData();
  },

  // 检查会员状态
  checkMemberStatus() {
    const isMember = app.checkMember();
    this.setData({ isMember });
  },

  // 加载成绩数据
  loadScoreData() {
    const scoreRecords = wx.getStorageSync('scoreRecords') || [];
    if (scoreRecords.length > 0) {
      const latest = scoreRecords[scoreRecords.length - 1];
      this.setData({
        hasScoreData: true,
        latestScore: latest,
        scoreTrend: scoreRecords.slice(-5)
      });
    } else {
      this.setData({
        hasScoreData: false,
        latestScore: null,
        scoreTrend: []
      });
    }
  },

  // 进入功能模块
  goToModule(e) {
    const module = e.currentTarget.dataset.module;
    
    if (module.isVip && !this.data.isMember) {
      app.showMemberGuide('开通会员解锁此功能');
      return;
    }

    wx.navigateTo({
      url: module.url
    });
  },

  // 开通会员
  openMember() {
    wx.navigateTo({
      url: '/pages/member/member'
    });
  },

  // 添加成绩
  addScore() {
    wx.navigateTo({
      url: '/pages/data/score'
    });
  }
});
