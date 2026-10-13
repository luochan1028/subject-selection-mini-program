// pages/mine/favorites.js
Page({
  data: {
    activeTab: 'university',
    tabs: [
      { key: 'university', name: '大学' },
      { key: 'major', name: '专业' },
      { key: 'article', name: '文章' }
    ],
    favorites: {
      universities: [],
      majors: [],
      articles: []
    }
  },

  onLoad() {
    this.loadFavorites();
  },

  onShow() {
    this.loadFavorites();
  },

  loadFavorites() {
    const favorites = wx.getStorageSync('favorites') || { universities: [], majors: [], articles: [] };
    this.setData({ favorites });
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab });
  },

  viewUniversity(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/query/detail?type=university&id=${id}`
    });
  },

  viewMajor(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/query/detail?type=major&id=${id}`
    });
  },

  viewArticle(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/knowledge/detail?id=${id}`
    });
  },

  removeFavorite(e) {
    const { type, id } = e.currentTarget.dataset;
    const key = type + 's';
    
    wx.showModal({
      title: '确认取消收藏',
      content: '确定要取消收藏吗？',
      success: (res) => {
        if (res.confirm) {
          let favorites = wx.getStorageSync('favorites') || { universities: [], majors: [], articles: [] };
          favorites[key] = favorites[key].filter(item => item.id !== id);
          wx.setStorageSync('favorites', favorites);
          this.loadFavorites();
          wx.showToast({ title: '已取消收藏', icon: 'none' });
        }
      }
    });
  }
});
