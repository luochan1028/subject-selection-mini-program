// pages/knowledge/list.js
const { knowledgeArticles } = require('../../data/universities.js');
const app = getApp();

Page({
  data: {
    articles: [],
    filteredArticles: [],
    categories: ['全部', '政策解读', '选科误区', '时间规划', '家长指南', '组合分析'],
    selectedCategory: '全部',
    keyword: ''
  },

  onLoad() {
    this.loadArticles();
  },

  // 加载文章
  loadArticles() {
    const articles = knowledgeArticles.map(item => ({
      ...item,
      viewsText: item.views > 10000 ? (item.views / 10000).toFixed(1) + '万' : item.views
    }));
    this.setData({
      articles,
      filteredArticles: articles
    });
  },

  // 搜索
  searchArticle(e) {
    const keyword = e.detail.value;
    this.setData({ keyword });
    this.filterArticles();
  },

  // 选择分类
  selectCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({ selectedCategory: category });
    this.filterArticles();
  },

  // 筛选文章
  filterArticles() {
    const { articles, keyword, selectedCategory } = this.data;
    let filtered = articles;

    if (keyword) {
      filtered = filtered.filter(a => 
        a.title.includes(keyword) || a.summary.includes(keyword)
      );
    }

    if (selectedCategory !== '全部') {
      filtered = filtered.filter(a => a.category === selectedCategory);
    }

    this.setData({ filteredArticles: filtered });
  },

  // 查看文章详情
  viewArticle(e) {
    const id = e.currentTarget.dataset.id;
    const article = this.data.articles.find(a => a.id === id);
    
    if (article && article.isVip && !app.checkMember()) {
      app.showMemberGuide('开通会员阅读此文章');
      return;
    }

    wx.navigateTo({
      url: `/pages/knowledge/detail?id=${id}`
    });
  }
});
