// pages/data/score.js
const app = getApp();
const { generateId, formatDate, scoreToGrade } = require('../../utils/util.js');

Page({
  data: {
    isMember: false,
    records: [],
    latestRecord: null,
    showAddModal: false,
    // 科目列表
    subjects: [
      { key: 'chinese', name: '语文', fullScore: 150 },
      { key: 'math', name: '数学', fullScore: 150 },
      { key: 'english', name: '英语', fullScore: 150 },
      { key: 'physics', name: '物理', fullScore: 100 },
      { key: 'chemistry', name: '化学', fullScore: 100 },
      { key: 'biology', name: '生物', fullScore: 100 },
      { key: 'history', name: '历史', fullScore: 100 },
      { key: 'geography', name: '地理', fullScore: 100 },
      { key: 'politics', name: '政治', fullScore: 100 }
    ],
    // 新增成绩表单
    newRecord: {
      examName: '',
      examDate: '',
      subjects: []
    },
    // 趋势数据
    trendData: [],
    // 优势科目排名
    subjectRanking: [],
    // 百分位弹窗
    showPercentileModal: false,
    percentileData: [],
    // 智能建议弹窗
    showAdviceModal: false,
    adviceList: []
  },

  onLoad() {
    this.checkMemberStatus();
    this.loadRecords();
  },

  onShow() {
    this.checkMemberStatus();
  },

  // 检查会员状态
  checkMemberStatus() {
    const isMember = app.checkMember();
    this.setData({ isMember });
  },

  // 加载成绩记录
  loadRecords() {
    const records = wx.getStorageSync('scoreRecords') || [];
    
    // 计算总分
    const processedRecords = records.map(record => {
      let total = 0;
      record.subjects.forEach(s => {
        total += Number(s.score) || 0;
      });
      return { ...record, total };
    });

    let latestRecord = null;
    let trendData = [];
    let subjectRanking = [];

    if (processedRecords.length > 0) {
      latestRecord = processedRecords[processedRecords.length - 1];
      
      // 趋势数据（最近5次）
      trendData = processedRecords.slice(-5).map(r => ({
        name: r.examName,
        score: r.total
      }));

      // 优势科目排名
      if (latestRecord && latestRecord.subjects) {
        subjectRanking = [...latestRecord.subjects]
          .sort((a, b) => (b.score / b.fullScore) - (a.score / a.fullScore))
          .map((s, index) => ({
            ...s,
            rank: index + 1,
            percent: Math.round((s.score / s.fullScore) * 100),
            grade: scoreToGrade((s.score / s.fullScore) * 100)
          }));
      }
    }

    this.setData({
      records: processedRecords,
      latestRecord,
      trendData,
      subjectRanking
    });
  },

  // 显示添加弹窗
  showAddModal() {
    const today = formatDate(new Date(), 'YYYY-MM-DD');
    const newSubjects = this.data.subjects.map(s => ({
      ...s,
      score: ''
    }));

    this.setData({
      showAddModal: true,
      newRecord: {
        examName: '',
        examDate: today,
        subjects: newSubjects
      }
    });
  },

  // 隐藏添加弹窗
  hideAddModal() {
    this.setData({ showAddModal: false });
  },

  // 输入考试名称
  inputExamName(e) {
    this.setData({
      'newRecord.examName': e.detail.value
    });
  },

  // 选择考试日期
  selectDate(e) {
    this.setData({
      'newRecord.examDate': e.detail.value
    });
  },

  // 输入科目分数
  inputScore(e) {
    const index = e.currentTarget.dataset.index;
    const score = e.detail.value;
    const key = `newRecord.subjects[${index}].score`;
    this.setData({ [key]: score });
  },

  // 保存成绩
  saveRecord() {
    const { newRecord } = this.data;
    
    if (!newRecord.examName.trim()) {
      wx.showToast({ title: '请输入考试名称', icon: 'none' });
      return;
    }

    // 过滤掉没有分数的科目
    const subjectsWithScore = newRecord.subjects.filter(s => s.score !== '' && !isNaN(Number(s.score)));
    
    if (subjectsWithScore.length === 0) {
      wx.showToast({ title: '请至少输入一科成绩', icon: 'none' });
      return;
    }

    const record = {
      id: generateId(),
      examName: newRecord.examName,
      examDate: newRecord.examDate,
      subjects: subjectsWithScore.map(s => ({
        key: s.key,
        name: s.name,
        score: Number(s.score),
        fullScore: s.fullScore
      })),
      createdAt: Date.now()
    };

    const records = wx.getStorageSync('scoreRecords') || [];
    records.push(record);
    wx.setStorageSync('scoreRecords', records);

    wx.showToast({ title: '保存成功', icon: 'none' });
    this.hideAddModal();
    this.loadRecords();
  },

  // 删除记录
  deleteRecord(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条成绩记录吗？',
      success: (res) => {
        if (res.confirm) {
          let records = wx.getStorageSync('scoreRecords') || [];
          records = records.filter(r => r.id !== id);
          wx.setStorageSync('scoreRecords', records);
          this.loadRecords();
          wx.showToast({ title: '已删除', icon: 'none' });
        }
      }
    });
  },

  // 查看百分位对比（会员功能）
  viewPercentile() {
    if (!this.data.isMember) {
      app.showMemberGuide('开通会员查看百分位对比');
      return;
    }
    const { latestRecord } = this.data;
    if (!latestRecord) {
      wx.showToast({ title: '暂无成绩数据', icon: 'none' });
      return;
    }
    // 模拟百分位数据（基于得分率生成合理的百分位排名）
    const percentileData = latestRecord.subjects.map(s => {
      const rate = s.score / s.fullScore;
      // 得分率越高，百分位越低（排名越靠前）
      let percentile = Math.round((1 - rate) * 80 + 10);
      percentile = Math.max(1, Math.min(99, percentile));
      return {
        name: s.name,
        score: s.score,
        fullScore: s.fullScore,
        percentile,
        level: percentile <= 10 ? '顶尖' : percentile <= 25 ? '优秀' : percentile <= 50 ? '中等' : percentile <= 75 ? '一般' : '需提升',
        levelColor: percentile <= 10 ? '#FF6B35' : percentile <= 25 ? '#667EEA' : percentile <= 50 ? '#4CAF50' : percentile <= 75 ? '#FF9800' : '#EF5350'
      };
    }).sort((a, b) => a.percentile - b.percentile);

    this.setData({
      showPercentileModal: true,
      percentileData
    });
  },

  // 关闭百分位弹窗
  closePercentileModal() {
    this.setData({ showPercentileModal: false });
  },

  // 查看智能建议（会员功能）
  viewAdvice() {
    if (!this.data.isMember) {
      app.showMemberGuide('开通会员获取智能建议');
      return;
    }
    const { latestRecord, subjectRanking, trendData } = this.data;
    if (!latestRecord) {
      wx.showToast({ title: '暂无成绩数据', icon: 'none' });
      return;
    }

    const adviceList = [];

    // 优势科目建议
    if (subjectRanking.length > 0) {
      const topSubject = subjectRanking[0];
      adviceList.push({
        icon: '🏆',
        type: '优势保持',
        color: '#4CAF50',
        text: `${topSubject.name}是你的最强科目，得分率${topSubject.percent}%，建议继续保持优势，争取冲刺更高分数。`
      });
    }

    // 薄弱科目建议
    if (subjectRanking.length > 2) {
      const weakSubject = subjectRanking[subjectRanking.length - 1];
      adviceList.push({
        icon: '💪',
        type: '弱项提升',
        color: '#FF8A65',
        text: `${weakSubject.name}相对薄弱，得分率${weakSubject.percent}%，建议每天安排30分钟专项练习，重点攻克基础知识点。`
      });
    }

    // 趋势分析建议
    if (trendData.length >= 3) {
      const scores = trendData.map(t => t.score);
      const recent = scores[scores.length - 1];
      const earlier = scores[0];
      if (recent > earlier) {
        adviceList.push({
          icon: '📈',
          type: '进步趋势',
          color: '#667EEA',
          text: `最近${trendData.length}次考试总分呈上升趋势，比最初提升了${recent - earlier}分，学习方法有效，继续保持！`
        });
      } else if (recent < earlier) {
        adviceList.push({
          icon: '⚠️',
          type: '波动提醒',
          color: '#FF9800',
          text: `最近成绩有所波动，建议回顾这段时间的学习状态，调整学习计划，保持稳定的学习节奏。`
        });
      }
    }

    // 总分建议
    const totalRate = latestRecord.total / 750;
    if (totalRate >= 0.85) {
      adviceList.push({
        icon: '🎯',
        type: '目标规划',
        color: '#764BA2',
        text: '总分优秀，已具备冲击重点大学的实力。建议在保持优势科目的同时，查漏补缺，向满分冲刺。'
      });
    } else if (totalRate >= 0.7) {
      adviceList.push({
        icon: '🎯',
        type: '目标规划',
        color: '#764BA2',
        text: '总分良好，有冲击一本的潜力。建议重点提分空间大的科目，制定专项提升计划。'
      });
    } else {
      adviceList.push({
        icon: '🎯',
        type: '目标规划',
        color: '#764BA2',
        text: '当前基础还有提升空间，建议先夯实基础，从最容易提分的科目入手，循序渐进。'
      });
    }

    // 学习方法建议
    adviceList.push({
      icon: '📚',
      type: '学习方法',
      color: '#00BCD4',
      text: '建议使用"错题本"方法，每次考试后整理错题，每周回顾一次，避免同样的错误重复出现。'
    });

    this.setData({
      showAdviceModal: true,
      adviceList
    });
  },

  // 关闭智能建议弹窗
  closeAdviceModal() {
    this.setData({ showAdviceModal: false });
  }
});
