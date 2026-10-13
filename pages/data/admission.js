// pages/data/admission.js
const app = getApp();
const { universities, generateHistoryScores } = require('../../data/universities.js');

Page({
  data: {
    isMember: false,
    universities: [],
    keyword: '',
    selectedUnis: [],
    compareMode: false
  },

  onLoad() {
    this.checkMemberStatus();
    this.loadUniversities();
  },

  checkMemberStatus() {
    const isMember = app.checkMember();
    this.setData({ isMember });
    if (!isMember) {
      setTimeout(() => {
        app.showMemberGuide('开通会员查看历年录取分数线');
      }, 500);
    }
  },

  loadUniversities() {
    this.setData({
      universities: universities.slice(0, 15).map(u => ({
        ...u,
        historyScores: generateHistoryScores(u.admissionScore)
      }))
    });
  },

  searchUniversity(e) {
    const keyword = e.detail.value;
    this.setData({ keyword });
    if (keyword) {
      const filtered = universities.filter(u => 
        u.name.includes(keyword) || u.shortName.includes(keyword)
      ).slice(0, 15).map(u => ({
        ...u,
        historyScores: generateHistoryScores(u.admissionScore)
      }));
      this.setData({ universities: filtered });
    } else {
      this.loadUniversities();
    }
  },

  viewDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/query/detail?type=university&id=${id}`
    });
  },

  openMember() {
    wx.navigateTo({
      url: '/pages/member/member'
    });
  }
});
