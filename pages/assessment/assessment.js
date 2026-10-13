// pages/assessment/assessment.js
const app = getApp();
const { assessmentQuestions, calculateResult } = require('../../utils/assessment.js');
const { generateId, formatDate, storage, toast, navigate } = require('../../utils/util.js');

Page({
  data: {
    // 状态: intro(开始页), answering(答题中), result(结果页)
    status: 'intro',
    currentIndex: 0,
    questions: [],
    answers: [],
    currentQuestion: null,
    selectedValue: null,
    progress: 0,
    totalQuestions: 30,
    result: null
  },

  onLoad() {
    this.setData({
      questions: assessmentQuestions,
      totalQuestions: assessmentQuestions.length
    });
  },

  onShow() {
    // 如果有历史记录，可以选择继续
    const records = wx.getStorageSync('assessmentRecords') || [];
    if (records.length > 0 && this.data.status === 'intro') {
      // 显示最近一次测评提示
    }
  },

  // 开始测评
  startAssessment() {
    this.setData({
      status: 'answering',
      currentIndex: 0,
      answers: [],
      selectedValue: null,
      progress: 0,
      currentQuestion: assessmentQuestions[0]
    });
  },

  // 选择答案
  selectOption(e) {
    const value = e.currentTarget.dataset.value;
    this.setData({
      selectedValue: value
    });
  },

  // 下一题
  nextQuestion() {
    if (this.data.selectedValue === null) {
      toast.info('请选择一个选项');
      return;
    }

    const { currentIndex, questions, answers, selectedValue } = this.data;
    const currentQuestion = questions[currentIndex];

    // 保存答案
    const newAnswers = [...answers, {
      questionId: currentQuestion.id,
      value: selectedValue
    }];

    if (currentIndex < questions.length - 1) {
      // 还有下一题
      const nextIndex = currentIndex + 1;
      this.setData({
        currentIndex: nextIndex,
        currentQuestion: questions[nextIndex],
        answers: newAnswers,
        selectedValue: null,
        progress: Math.round((nextIndex + 1) / questions.length * 100)
      });
    } else {
      // 最后一题，提交
      this.submitAssessment(newAnswers);
    }
  },

  // 上一题
  prevQuestion() {
    const { currentIndex, questions, answers } = this.data;
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      const prevAnswer = answers[prevIndex];
      const newAnswers = answers.slice(0, prevIndex);
      
      this.setData({
        currentIndex: prevIndex,
        currentQuestion: questions[prevIndex],
        answers: newAnswers,
        selectedValue: prevAnswer ? prevAnswer.value : null,
        progress: Math.round((prevIndex + 1) / questions.length * 100)
      });
    }
  },

  // 提交测评
  submitAssessment(answers) {
    toast.loading('正在分析结果...');

    // 模拟计算延迟
    setTimeout(() => {
      const result = calculateResult(answers);
      
      // 保存记录
      const record = {
        id: generateId(),
        date: formatDate(new Date()),
        timestamp: Date.now(),
        answers,
        result
      };

      const records = wx.getStorageSync('assessmentRecords') || [];
      records.push(record);
      wx.setStorageSync('assessmentRecords', records);

      toast.hideLoading();
      
      // 跳转到结果页
      wx.redirectTo({
        url: '/pages/assessment/result'
      });
    }, 2000);
  },

  // 查看历史记录
  viewHistory() {
    const records = wx.getStorageSync('assessmentRecords') || [];
    if (records.length === 0) {
      toast.info('暂无测评记录');
      return;
    }
    wx.redirectTo({
      url: '/pages/assessment/result'
    });
  },

  // 重新测评
  restartAssessment() {
    wx.showModal({
      title: '提示',
      content: '确定要重新开始测评吗？当前进度将丢失。',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            status: 'intro',
            currentIndex: 0,
            answers: [],
            selectedValue: null,
            progress: 0
          });
        }
      }
    });
  }
});
