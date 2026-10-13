// pages/data/career.js
const app = getApp();
const { majors } = require('../../data/universities.js');

Page({
  data: {
    isMember: false,
    majors: [],
    keyword: '',
    categories: ['全部', '工学', '理学', '医学', '经济学', '管理学', '法学', '文学'],
    selectedCategory: '全部'
  },

  onLoad() {
    this.checkMemberStatus();
    this.loadMajors();
  },

  checkMemberStatus() {
    const isMember = app.checkMember();
    this.setData({ isMember });
    if (!isMember) {
      setTimeout(() => {
        app.showMemberGuide('开通会员查看职业前景分析');
      }, 500);
    }
  },

  loadMajors() {
    this.setData({ majors });
  },

  searchMajor(e) {
    const keyword = e.detail.value;
    this.setData({ keyword });
    this.filterMajors();
  },

  selectCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({ selectedCategory: category });
    this.filterMajors();
  },

  filterMajors() {
    let filtered = majors;
    const { keyword, selectedCategory } = this.data;

    if (keyword) {
      filtered = filtered.filter(m => m.name.includes(keyword));
    }

    if (selectedCategory !== '全部') {
      filtered = filtered.filter(m => m.category === selectedCategory);
    }

    this.setData({ majors: filtered });
  },

  viewDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/query/detail?type=major&id=${id}`
    });
  },

  openMember() {
    wx.navigateTo({
      url: '/pages/member/member'
    });
  }
});
