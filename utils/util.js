// utils/util.js
// 通用工具函数

// 格式化日期
const formatDate = (date, format = 'YYYY-MM-DD') => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
};

// 生成唯一ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// 防抖
const debounce = (fn, delay = 300) => {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

// 节流
const throttle = (fn, delay = 300) => {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      fn.apply(this, args);
    }
  };
};

// 深拷贝
const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  const cloned = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
};

// 计算百分位排名
const calculatePercentile = (score, totalStudents = 1000) => {
  // 简化的百分位计算，实际应基于真实数据
  return Math.round((1 - score / 100) * 100);
};

// 分数转等级
const scoreToGrade = (score) => {
  if (score >= 90) return { grade: 'A', label: '优秀', color: '#52C41A' };
  if (score >= 80) return { grade: 'B', label: '良好', color: '#4A90D9' };
  if (score >= 70) return { grade: 'C', label: '中等', color: '#FF8C42' };
  if (score >= 60) return { grade: 'D', label: '及格', color: '#FAAD14' };
  return { grade: 'E', label: '不及格', color: '#FF4D4F' };
};

// 存储操作
const storage = {
  set(key, value) {
    try {
      wx.setStorageSync(key, value);
      return true;
    } catch (e) {
      console.error('Storage set error:', e);
      return false;
    }
  },
  get(key, defaultValue = null) {
    try {
      const value = wx.getStorageSync(key);
      return value !== '' ? value : defaultValue;
    } catch (e) {
      console.error('Storage get error:', e);
      return defaultValue;
    }
  },
  remove(key) {
    try {
      wx.removeStorageSync(key);
      return true;
    } catch (e) {
      console.error('Storage remove error:', e);
      return false;
    }
  },
  clear() {
    try {
      wx.clearStorageSync();
      return true;
    } catch (e) {
      console.error('Storage clear error:', e);
      return false;
    }
  }
};

// Toast 提示
const toast = {
  success(title, duration = 2000) {
    wx.showToast({ title, icon: 'success', duration });
  },
  error(title, duration = 2000) {
    wx.showToast({ title, icon: 'none', duration });
  },
  info(title, duration = 2000) {
    wx.showToast({ title, icon: 'none', duration });
  },
  loading(title = '加载中...') {
    wx.showLoading({ title, mask: true });
  },
  hideLoading() {
    wx.hideLoading();
  }
};

// 页面跳转
const navigate = {
  to(url) {
    wx.navigateTo({ url });
  },
  redirect(url) {
    wx.redirectTo({ url });
  },
  switchTab(url) {
    wx.switchTab({ url });
  },
  back(delta = 1) {
    wx.navigateBack({ delta });
  },
  reLaunch(url) {
    wx.reLaunch({ url });
  }
};

module.exports = {
  formatDate,
  generateId,
  debounce,
  throttle,
  deepClone,
  calculatePercentile,
  scoreToGrade,
  storage,
  toast,
  navigate
};
