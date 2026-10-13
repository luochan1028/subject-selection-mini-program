// pages/mine/settings.js
const app = getApp();

Page({
  data: {
    userInfo: null,
    isMember: false,
    settings: {
      noticeEnabled: true,
      gradeReminder: true,
      dataAutoUpdate: true
    },
    province: '广东',
    grade: '高一',
    provinces: ['北京', '上海', '广东', '浙江', '江苏', '湖北', '四川', '山东', '河南', '河北', '湖南', '福建', '安徽', '辽宁', '陕西', '重庆', '江西', '广西', '云南', '贵州', '山西', '黑龙江', '吉林', '甘肃', '内蒙古', '新疆', '海南', '宁夏', '青海', '西藏'],
    grades: ['高一', '高二', '高三'],
    showProvincePicker: false,
    showGradePicker: false
  },

  onLoad() {
    this.loadUserInfo();
    this.loadSettings();
  },

  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo');
    const isMember = app.checkMember();
    this.setData({ userInfo, isMember });
  },

  loadSettings() {
    const settings = wx.getStorageSync('settings');
    const userProfile = wx.getStorageSync('userProfile');
    if (settings) {
      this.setData({ settings });
    }
    if (userProfile) {
      this.setData({
        province: userProfile.province || '广东',
        grade: userProfile.grade || '高一'
      });
    }
  },

  // 切换设置
  toggleSetting(e) {
    const key = e.currentTarget.dataset.key;
    const settings = { ...this.data.settings };
    settings[key] = !settings[key];
    this.setData({ settings });
    wx.setStorageSync('settings', settings);
  },

  // 选择省份
  showProvincePicker() {
    this.setData({ showProvincePicker: true });
  },

  hideProvincePicker() {
    this.setData({ showProvincePicker: false });
  },

  selectProvince(e) {
    const province = e.currentTarget.dataset.province;
    this.setData({ province, showProvincePicker: false });
    this.saveUserProfile();
  },

  // 选择年级
  showGradePicker() {
    this.setData({ showGradePicker: true });
  },

  hideGradePicker() {
    this.setData({ showGradePicker: false });
  },

  selectGrade(e) {
    const grade = e.currentTarget.dataset.grade;
    this.setData({ grade, showGradePicker: false });
    this.saveUserProfile();
  },

  saveUserProfile() {
    const userProfile = {
      province: this.data.province,
      grade: this.data.grade
    };
    wx.setStorageSync('userProfile', userProfile);
  },

  // 清除缓存
  clearCache() {
    wx.showModal({
      title: '清除缓存',
      content: '确定要清除本地缓存吗？这将删除所有本地存储的数据。',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync();
          wx.showToast({ title: '缓存已清除', icon: 'none' });
          setTimeout(() => {
            wx.reLaunch({ url: '/pages/index/index' });
          }, 1500);
        }
      }
    });
  },

  // 关于我们
  showAbout() {
    wx.navigateTo({
      url: '/pages/mine/about'
    });
  },

  // 意见反馈
  showFeedback() {
    wx.navigateTo({
      url: '/pages/mine/feedback'
    });
  },

  // 退出登录
  logout() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('userInfo');
          app.globalData.userInfo = null;
          this.setData({ userInfo: null });
          wx.showToast({ title: '已退出登录', icon: 'none' });
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      }
    });
  }
});
