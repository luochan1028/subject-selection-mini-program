// pages/mine/history.js
// 浏览历史页面

/**
 * 浏览历史工具函数模块
 * 提供添加、获取、删除、清空浏览历史的方法
 * 数据存储在 wx.setStorageSync('viewHistory', [...]) 中
 * 数据结构：{ id, type: 'university'|'major'|'article', name, extra, time, cover }
 */
const ViewHistory = {
  STORAGE_KEY: 'viewHistory',
  MAX_ITEMS: 200, // 最大历史记录条数

  /**
   * 获取所有浏览历史
   * @returns {Array} 历史记录数组，按时间倒序排列
   */
  getAll() {
    const history = wx.getStorageSync(this.STORAGE_KEY) || [];
    return history.sort((a, b) => b.time - a.time);
  },

  /**
   * 按类型获取浏览历史
   * @param {string} type - 类型：'university' | 'major' | 'article'，为空则返回全部
   * @returns {Array} 过滤后的历史记录数组
   */
  getByType(type) {
    const all = this.getAll();
    if (!type || type === 'all') return all;
    return all.filter(item => item.type === type);
  },

  /**
   * 添加一条浏览历史
   * 如果已存在相同 id 和 type 的记录，则更新时间并移到最前面
   * @param {Object} item - 历史记录项
   * @param {string} item.id - 记录ID
   * @param {string} item.type - 类型：'university' | 'major' | 'article'
   * @param {string} item.name - 名称/标题
   * @param {string} [item.extra] - 附加信息
   * @param {string} [item.cover] - 封面图
   */
  add(item) {
    if (!item || !item.id || !item.type) return;

    let history = wx.getStorageSync(this.STORAGE_KEY) || [];

    // 移除已存在的相同记录
    history = history.filter(h => !(h.id === item.id && h.type === item.type));

    // 添加新记录到开头
    const newItem = {
      id: item.id,
      type: item.type,
      name: item.name || '',
      extra: item.extra || '',
      cover: item.cover || '',
      time: Date.now()
    };
    history.unshift(newItem);

    // 超过最大条数时截断
    if (history.length > this.MAX_ITEMS) {
      history = history.slice(0, this.MAX_ITEMS);
    }

    wx.setStorageSync(this.STORAGE_KEY, history);
  },

  /**
   * 删除单条浏览历史
   * @param {string} id - 记录ID
   * @param {string} type - 记录类型
   */
  remove(id, type) {
    let history = wx.getStorageSync(this.STORAGE_KEY) || [];
    history = history.filter(item => !(item.id === id && item.type === type));
    wx.setStorageSync(this.STORAGE_KEY, history);
  },

  /**
   * 清空所有浏览历史
   */
  clear() {
    wx.setStorageSync(this.STORAGE_KEY, []);
  },

  /**
   * 初始化模拟数据（仅当没有历史记录时）
   */
  initMockData() {
    const existing = wx.getStorageSync(this.STORAGE_KEY);
    if (existing && existing.length > 0) return;

    const now = Date.now();
    const mockData = [
      {
        id: 'u001',
        type: 'university',
        name: '清华大学',
        extra: '985/211 · 综合类 · 北京',
        cover: '',
        time: now - 5 * 60 * 1000 // 5分钟前
      },
      {
        id: 'm001',
        type: 'major',
        name: '计算机科学与技术',
        extra: '工学 · 本科 · 四年',
        cover: '',
        time: now - 30 * 60 * 1000 // 30分钟前
      },
      {
        id: 'a001',
        type: 'article',
        name: '新高考选科指南：物理+化学组合优势分析',
        extra: '选科攻略',
        cover: '',
        time: now - 2 * 60 * 60 * 1000 // 2小时前
      },
      {
        id: 'u002',
        type: 'university',
        name: '北京大学',
        extra: '985/211 · 综合类 · 北京',
        cover: '',
        time: now - 5 * 60 * 60 * 1000 // 5小时前
      },
      {
        id: 'a002',
        type: 'article',
        name: '2024年各省市高考录取分数线汇总',
        extra: '分数线',
        cover: '',
        time: now - 24 * 60 * 60 * 1000 // 1天前
      },
      {
        id: 'm002',
        type: 'major',
        name: '软件工程',
        extra: '工学 · 本科 · 四年',
        cover: '',
        time: now - 26 * 60 * 60 * 1000 // 1天2小时前
      },
      {
        id: 'u003',
        type: 'university',
        name: '浙江大学',
        extra: '985/211 · 综合类 · 浙江',
        cover: '',
        time: now - 2 * 24 * 60 * 60 * 1000 // 2天前
      },
      {
        id: 'a003',
        type: 'article',
        name: '大学专业就业前景排名TOP20',
        extra: '就业分析',
        cover: '',
        time: now - 3 * 24 * 60 * 60 * 1000 // 3天前
      },
      {
        id: 'm003',
        type: 'major',
        name: '临床医学',
        extra: '医学 · 本科 · 五年',
        cover: '',
        time: now - 4 * 24 * 60 * 60 * 1000 // 4天前
      }
    ];

    wx.setStorageSync(this.STORAGE_KEY, mockData);
  }
};

Page({
  data: {
    activeTab: 'all',
    tabs: [
      { key: 'all', name: '全部' },
      { key: 'university', name: '大学' },
      { key: 'major', name: '专业' },
      { key: 'article', name: '文章' }
    ],
    historyList: []
  },

  onLoad() {
    // 初始化模拟数据
    ViewHistory.initMockData();
    this.loadHistory();
  },

  onShow() {
    this.loadHistory();
  },

  /**
   * 加载浏览历史记录
   */
  loadHistory() {
    const list = ViewHistory.getByType(this.data.activeTab);
    // 格式化时间显示
    const formattedList = list.map(item => ({
      ...item,
      timeText: this.formatTime(item.time)
    }));
    this.setData({ historyList: formattedList });
  },

  /**
   * 格式化时间显示
   * @param {number} timestamp - 时间戳
   * @returns {string} 格式化后的时间字符串
   */
  formatTime(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (diff < minute) {
      return '刚刚';
    } else if (diff < hour) {
      return `${Math.floor(diff / minute)}分钟前`;
    } else if (diff < day) {
      return `${Math.floor(diff / hour)}小时前`;
    } else if (diff < 7 * day) {
      return `${Math.floor(diff / day)}天前`;
    } else {
      const date = new Date(timestamp);
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }
  },

  /**
   * 切换分类Tab
   */
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab });
    this.loadHistory();
  },

  /**
   * 点击历史记录跳转到对应详情页
   */
  goToDetail(e) {
    const { id, type } = e.currentTarget.dataset;

    switch (type) {
      case 'university':
        wx.navigateTo({
          url: `/pages/query/detail?type=university&id=${id}`
        });
        break;
      case 'major':
        wx.navigateTo({
          url: `/pages/query/detail?type=major&id=${id}`
        });
        break;
      case 'article':
        wx.navigateTo({
          url: `/pages/knowledge/detail?id=${id}`
        });
        break;
    }
  },

  /**
   * 删除单条历史记录
   */
  removeItem(e) {
    const { id, type } = e.currentTarget.dataset;

    wx.showModal({
      title: '删除记录',
      content: '确定要删除这条浏览记录吗？',
      confirmColor: '#667EEA',
      success: (res) => {
        if (res.confirm) {
          ViewHistory.remove(id, type);
          this.loadHistory();
          wx.showToast({ title: '已删除', icon: 'none' });
        }
      }
    });
  },

  /**
   * 清空所有历史记录
   */
  clearAll() {
    if (this.data.historyList.length === 0) {
      wx.showToast({ title: '暂无历史记录', icon: 'none' });
      return;
    }

    wx.showModal({
      title: '清空历史',
      content: '确定要清空所有浏览历史吗？此操作不可恢复。',
      confirmColor: '#FF8A65',
      success: (res) => {
        if (res.confirm) {
          ViewHistory.clear();
          this.loadHistory();
          wx.showToast({ title: '已清空', icon: 'none' });
        }
      }
    });
  }
});
