// pages/knowledge/detail.js
const { knowledgeArticles } = require('../../data/universities.js');
const app = getApp();

Page({
  data: {
    article: null,
    isMember: false,
    isFavorite: false
  },

  onLoad(options) {
    const id = Number(options.id);
    this.loadArticle(id);
    this.checkMemberStatus();
    this.checkFavorite(id);
  },

  // 加载文章
  loadArticle(id) {
    const article = knowledgeArticles.find(a => a.id === id);
    if (article) {
      this.setData({
        article: {
          ...article,
          viewsText: article.views > 10000 ? (article.views / 10000).toFixed(1) + '万' : article.views
        }
      });
      wx.setNavigationBarTitle({ title: article.title.slice(0, 15) + '...' });
    }
  },

  // 检查会员状态
  checkMemberStatus() {
    const isMember = app.checkMember();
    this.setData({ isMember });
  },

  // 检查是否收藏
  checkFavorite(id) {
    const favorites = wx.getStorageSync('favorites') || { articles: [] };
    const isFavorite = favorites.articles.some(a => a.id === id);
    this.setData({ isFavorite });
  },

  // 收藏/取消收藏
  toggleFavorite() {
    const { article, isFavorite } = this.data;
    let favorites = wx.getStorageSync('favorites') || { universities: [], majors: [], articles: [] };

    if (isFavorite) {
      // 取消收藏
      favorites.articles = favorites.articles.filter(a => a.id !== article.id);
      wx.showToast({ title: '已取消收藏', icon: 'none' });
    } else {
      // 添加收藏
      favorites.articles.unshift({
        id: article.id,
        title: article.title,
        category: article.category,
        summary: article.summary
      });
      wx.showToast({ title: '收藏成功', icon: 'none' });
    }

    wx.setStorageSync('favorites', favorites);
    this.setData({ isFavorite: !isFavorite });
  },

  // 开通会员
  openMember() {
    wx.navigateTo({
      url: '/pages/member/member'
    });
  }
});
