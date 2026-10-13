// pages/query/detail.js
const { universities, majors, universityMajors, generateHistoryScores } = require('../../data/universities.js');
const app = getApp();

Page({
  data: {
    type: 'university', // university or major
    isMember: false,
    detail: null,
    relatedItems: [],
    historyScores: [],
    isFavorite: false,
    activeTab: 'info' // info, admission, career
  },

  onLoad(options) {
    const { type, id, name } = options;
    this.checkMemberStatus();
    this.loadDetail(type, id, name);
  },

  checkMemberStatus() {
    const isMember = app.checkMember();
    this.setData({ isMember });
  },

  loadDetail(type, id, name) {
    if (type === 'university') {
      const uni = universities.find(u => u.id === Number(id));
      if (uni) {
        const related = universityMajors.filter(um => um.universityId === uni.id).slice(0, 10);
        this.setData({
          type,
          detail: uni,
          relatedItems: related,
          historyScores: generateHistoryScores(uni.admissionScore)
        });
        wx.setNavigationBarTitle({ title: uni.name });
        this.checkFavorite('university', uni.id);
      }
    } else {
      const major = majors.find(m => m.id === Number(id));
      if (major) {
        const related = universityMajors.filter(um => um.majorId === major.id).slice(0, 10);
        this.setData({
          type,
          detail: major,
          relatedItems: related,
          historyScores: generateHistoryScores(600)
        });
        wx.setNavigationBarTitle({ title: major.name });
        this.checkFavorite('major', major.id);
      }
    }
  },

  // 检查收藏
  checkFavorite(type, id) {
    const favorites = wx.getStorageSync('favorites') || { universities: [], majors: [] };
    const list = type === 'university' ? favorites.universities : favorites.majors;
    const isFavorite = list.some(item => item.id === id);
    this.setData({ isFavorite });
  },

  // 切换Tab
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    if (tab !== 'info' && !this.data.isMember) {
      app.showMemberGuide('开通会员查看更多数据');
      return;
    }
    this.setData({ activeTab: tab });
  },

  // 收藏/取消收藏
  toggleFavorite() {
    const { type, detail, isFavorite } = this.data;
    let favorites = wx.getStorageSync('favorites') || { universities: [], majors: [], articles: [] };
    const key = type === 'university' ? 'universities' : 'majors';

    if (isFavorite) {
      favorites[key] = favorites[key].filter(item => item.id !== detail.id);
      wx.showToast({ title: '已取消收藏', icon: 'none' });
    } else {
      favorites[key].unshift({
        id: detail.id,
        name: detail.name,
        type: detail.type || detail.category
      });
      wx.showToast({ title: '收藏成功', icon: 'none' });
    }

    wx.setStorageSync('favorites', favorites);
    this.setData({ isFavorite: !isFavorite });
  }
});
