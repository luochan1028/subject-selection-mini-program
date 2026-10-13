// pages/query/query.js
const app = getApp();
const { universities, majors, universityMajors } = require('../../data/universities.js');
const { subjectCombinations, subjectNames } = require('../../utils/assessment.js');

Page({
  data: {
    // Tab: combination(选科组合), university(大学查询), major(专业查询)
    activeTab: 'combination',
    tabs: [
      { key: 'combination', name: '选科组合' },
      { key: 'university', name: '大学查询' },
      { key: 'major', name: '专业查询' }
    ],

    // 选科模式
    subjectMode: '3+1+2',
    modes: [
      { key: '3+1+2', name: '3+1+2模式' },
      { key: '3+3', name: '3+3模式' }
    ],

    // 选科组合
    selectedSubjects: [],
    combinations: [],
    filteredCombinations: [],

    // 大学查询
    universityKeyword: '',
    universityList: [],
    universityFilters: {
      province: '',
      level: ''
    },
    showUniversityFilter: false,
    provinces: ['北京', '上海', '广东', '浙江', '江苏', '湖北', '陕西', '四川', '山东', '湖南', '福建', '安徽', '辽宁', '天津', '重庆', '黑龙江', '吉林', '江西', '广西', '贵州', '甘肃', '山西', '河南', '内蒙古', '云南', '宁夏', '青海', '新疆', '西藏', '海南'],
    levels: ['985', '211', '双一流', '普通本科'],

    // 专业查询
    majorKeyword: '',
    majorList: [],
    majorCategories: ['全部', '工学', '理学', '医学', '经济学', '管理学', '法学', '文学', '历史学', '教育学'],
    selectedCategory: '全部',

    // 3+1+2模式科目
    firstSubjects: [
      { key: 'physics', name: '物理', type: 'first' },
      { key: 'history', name: '历史', type: 'first' }
    ],
    secondSubjects: [
      { key: 'chemistry', name: '化学', type: 'second' },
      { key: 'biology', name: '生物', type: 'second' },
      { key: 'politics', name: '政治', type: 'second' },
      { key: 'geography', name: '地理', type: 'second' }
    ],
    // 3+3模式科目
    allSubjects: [
      { key: 'physics', name: '物理', type: 'all' },
      { key: 'chemistry', name: '化学', type: 'all' },
      { key: 'biology', name: '生物', type: 'all' },
      { key: 'history', name: '历史', type: 'all' },
      { key: 'geography', name: '地理', type: 'all' },
      { key: 'politics', name: '政治', type: 'all' }
    ],

    // 专业大类列表
    majorCategoriesList: [
      { name: '工学类', count: 32, expanded: false },
      { name: '理学类', count: 18, expanded: false },
      { name: '医学类', count: 15, expanded: false },
      { name: '经济学类', count: 10, expanded: false },
      { name: '管理学类', count: 12, expanded: false },
      { name: '法学类', count: 8, expanded: false },
      { name: '文学类', count: 15, expanded: false },
      { name: '历史学类', count: 6, expanded: false },
      { name: '教育学类', count: 10, expanded: false },
      { name: '农学类', count: 12, expanded: false }
    ]
  },

  onLoad() {
    this.loadCombinations();
    this.loadUniversities();
    this.loadMajors();
  },

  // 切换Tab
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab });
  },

  // 切换选科模式
  switchMode(e) {
    const mode = e.currentTarget.dataset.mode;
    this.setData({
      subjectMode: mode,
      selectedSubjects: []
    });
    this.loadCombinations();
  },

  // 加载选科组合
  loadCombinations() {
    const combinations = subjectCombinations[this.data.subjectMode] || [];
    this.setData({
      combinations,
      filteredCombinations: combinations
    });
  },

  // 选择科目
  selectSubject(e) {
    const subject = e.currentTarget.dataset.subject;
    const type = e.currentTarget.dataset.type;
    let { selectedSubjects, subjectMode } = this.data;

    if (subjectMode === '3+1+2') {
      if (type === 'first') {
        // 首选科目只能选一个
        const firstSubjects = selectedSubjects.filter(s => 
          ['physics', 'history'].includes(s)
        );
        if (firstSubjects.includes(subject)) {
          // 取消选择
          selectedSubjects = selectedSubjects.filter(s => s !== subject);
        } else {
          // 替换首选
          selectedSubjects = selectedSubjects.filter(s => 
            !['physics', 'history'].includes(s)
          );
          selectedSubjects.push(subject);
        }
      } else {
        // 再选科目最多选2个
        const secondSubjects = selectedSubjects.filter(s => 
          ['chemistry', 'biology', 'politics', 'geography'].includes(s)
        );
        if (selectedSubjects.includes(subject)) {
          // 取消选择
          selectedSubjects = selectedSubjects.filter(s => s !== subject);
        } else if (secondSubjects.length < 2) {
          selectedSubjects.push(subject);
        } else {
          wx.showToast({ title: '再选科目最多选2门', icon: 'none' });
          return;
        }
      }
    } else {
      // 3+3模式，最多选3个
      if (selectedSubjects.includes(subject)) {
        selectedSubjects = selectedSubjects.filter(s => s !== subject);
      } else if (selectedSubjects.length < 3) {
        selectedSubjects.push(subject);
      } else {
        wx.showToast({ title: '最多选择3门科目', icon: 'none' });
        return;
      }
    }

    this.setData({ selectedSubjects });
    this.filterCombinations();
  },

  // 筛选组合
  filterCombinations() {
    const { selectedSubjects, combinations } = this.data;
    if (selectedSubjects.length === 0) {
      this.setData({ filteredCombinations: combinations });
      return;
    }

    const filtered = combinations.filter(combo => {
      return selectedSubjects.every(s => combo.subjects.includes(s));
    });

    this.setData({ filteredCombinations: filtered });
  },

  // 查看组合详情
  viewCombination(e) {
    const id = e.currentTarget.dataset.id;
    const combo = this.data.filteredCombinations.find(c => c.id === id);
    if (combo) {
      wx.navigateTo({
        url: `/pages/query/combination?id=${id}`
      });
    }
  },

  // 加载大学列表
  loadUniversities() {
    this.setData({
      universityList: universities.slice(0, 20)
    });
  },

  // 搜索大学
  searchUniversity(e) {
    const keyword = e.detail.value;
    this.setData({ universityKeyword: keyword });
    this.filterUniversities();
  },

  // 筛选大学
  filterUniversities() {
    const { universityKeyword, universityFilters } = this.data;
    let filtered = universities;

    if (universityKeyword) {
      filtered = filtered.filter(u => 
        u.name.includes(universityKeyword) || 
        u.shortName.includes(universityKeyword)
      );
    }

    if (universityFilters.province) {
      filtered = filtered.filter(u => u.province === universityFilters.province);
    }

    if (universityFilters.level) {
      filtered = filtered.filter(u => u.level.includes(universityFilters.level));
    }

    this.setData({
      universityList: filtered.slice(0, 20)
    });
  },

  // 显示/隐藏筛选
  toggleUniversityFilter() {
    this.setData({
      showUniversityFilter: !this.data.showUniversityFilter
    });
  },

  // 选择省份
  selectProvince(e) {
    const province = e.currentTarget.dataset.province;
    this.setData({
      'universityFilters.province': this.data.universityFilters.province === province ? '' : province
    });
    this.filterUniversities();
  },

  // 选择层次
  selectLevel(e) {
    const level = e.currentTarget.dataset.level;
    this.setData({
      'universityFilters.level': this.data.universityFilters.level === level ? '' : level
    });
    this.filterUniversities();
  },

  // 重置筛选
  resetUniversityFilter() {
    this.setData({
      universityFilters: { province: '', level: '' }
    });
    this.filterUniversities();
  },

  // 查看大学详情
  viewUniversity(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/query/detail?type=university&id=${id}`
    });
  },

  // 加载专业列表
  loadMajors() {
    this.setData({
      majorList: majors
    });
  },

  // 搜索专业
  searchMajor(e) {
    const keyword = e.detail.value;
    this.setData({ majorKeyword: keyword });
    this.filterMajors();
  },

  // 选择专业类别
  selectCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({ selectedCategory: category });
    this.filterMajors();
  },

  // 筛选专业
  filterMajors() {
    const { majorKeyword, selectedCategory, majorList } = this.data;
    let filtered = majors;

    if (majorKeyword) {
      filtered = filtered.filter(m => m.name.includes(majorKeyword));
    }

    if (selectedCategory !== '全部') {
      filtered = filtered.filter(m => m.category === selectedCategory);
    }

    this.setData({ majorList: filtered });
  },

  // 查看专业详情
  viewMajor(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/query/detail?type=major&id=${id}`
    });
  },

  // 展开/收起专业大类
  toggleCategory(e) {
    const index = e.currentTarget.dataset.index;
    const key = `majorCategoriesList[${index}].expanded`;
    this.setData({
      [key]: !this.data.majorCategoriesList[index].expanded
    });
  }
});
