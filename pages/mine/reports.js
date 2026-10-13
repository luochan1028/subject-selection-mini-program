// pages/mine/reports.js
Page({
  data: {
    records: []
  },

  onLoad() {
    this.loadRecords();
  },

  onShow() {
    this.loadRecords();
  },

  loadRecords() {
    const records = wx.getStorageSync('assessmentRecords') || [];
    const formatted = records.map(r => ({
      ...r,
      topCombo: r.result.topCombinations[0].name,
      matchScore: r.result.topCombinations[0].matchScore
    })).reverse();

    this.setData({ records: formatted });
  },

  viewReport(e) {
    const id = e.currentTarget.dataset.id;
    const records = wx.getStorageSync('assessmentRecords') || [];
    const record = records.find(r => r.id === id);
    if (record) {
      wx.navigateTo({
        url: '/pages/assessment/result'
      });
    }
  },

  deleteRecord(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这份测评报告吗？',
      success: (res) => {
        if (res.confirm) {
          let records = wx.getStorageSync('assessmentRecords') || [];
          records = records.filter(r => r.id !== id);
          wx.setStorageSync('assessmentRecords', records);
          this.loadRecords();
          wx.showToast({ title: '已删除', icon: 'none' });
        }
      }
    });
  },

  startAssessment() {
    wx.switchTab({
      url: '/pages/assessment/assessment'
    });
  }
});
