// pages/query/combination.js
const { subjectCombinations, subjectNames } = require('../../utils/assessment.js');
const app = getApp();

Page({
  data: {
    isMember: false,
    combination: null,
    mode: '3+1+2',
    expandedCategories: {}
  },

  onLoad(options) {
    const id = options.id;
    this.checkMemberStatus();
    this.loadCombination(id);
  },

  checkMemberStatus() {
    const isMember = app.checkMember();
    this.setData({ isMember });
  },

  loadCombination(id) {
    const mode = '3+1+2';
    const combinations = subjectCombinations[mode] || [];
    const combo = combinations.find(c => c.id === id);
    
    if (combo) {
      this.setData({
        combination: combo,
        mode
      });
      wx.setNavigationBarTitle({ title: combo.name });
    }
  },

  toggleCategory(e) {
    const index = e.currentTarget.dataset.index;
    const key = `expandedCategories.${index}`;
    this.setData({
      [key]: !this.data.expandedCategories[index]
    });
  },

  // 查看专业详情
  viewMajor(e) {
    const name = e.currentTarget.dataset.name;
    if (!this.data.isMember) {
      app.showMemberGuide('开通会员查看专业详情');
      return;
    }
    wx.navigateTo({
      url: `/pages/query/detail?type=major&name=${encodeURIComponent(name)}`
    });
  },

  // 开始测评
  startAssessment() {
    wx.switchTab({
      url: '/pages/assessment/assessment'
    });
  }
});
