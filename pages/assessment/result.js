// pages/assessment/result.js
const app = getApp();
const { subjectNames, subjectCombinations } = require('../../utils/assessment.js');

Page({
  data: {
    isMember: false,
    result: null,
    radarData: null,
    topCombinations: [],
    subjectScores: [],
    selectedTab: 0,
    reportDate: '',
    showVipMask: true, // 是否显示会员遮罩
    // AI报告章节
    reportSections: [
      { id: 'profile', name: '个人特质画像', isVip: false },
      { id: 'bestPlan', name: '最佳选科方案', isVip: true },
      { id: 'majors', name: '可报专业全景', isVip: true },
      { id: 'competitiveness', name: '竞争力评估', isVip: true },
      { id: 'advice', name: '行动建议', isVip: true }
    ]
  },

  onLoad() {
    this.checkMemberStatus();
    this.loadResult();
  },

  onShow() {
    this.checkMemberStatus();
  },

  // 检查会员状态
  checkMemberStatus() {
    const isMember = app.checkMember();
    this.setData({ isMember });
  },

  // 加载测评结果
  loadResult() {
    const records = wx.getStorageSync('assessmentRecords') || [];
    if (records.length === 0) {
      wx.showModal({
        title: '提示',
        content: '暂无测评记录，是否立即开始测评？',
        success: (res) => {
          if (res.confirm) {
            wx.redirectTo({
              url: '/pages/assessment/assessment'
            });
          } else {
            wx.navigateBack();
          }
        }
      });
      return;
    }

    const latest = records[records.length - 1];
    const result = latest.result;

    this.setData({
      result,
      radarData: result.radarData,
      topCombinations: result.topCombinations,
      subjectScores: result.subjectScores,
      reportDate: latest.date
    });

    // 绘制雷达图
    this.drawRadarChart(result.radarData);
  },

  // 绘制雷达图
  drawRadarChart(radarData) {
    const query = wx.createSelectorQuery();
    query.select('#radarCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res[0]) return;
        
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        const dpr = wx.getSystemInfoSync().pixelRatio;
        
        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;
        ctx.scale(dpr, dpr);

        const width = res[0].width;
        const height = res[0].height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 40;
        
        const labels = radarData.labels;
        const values = radarData.values;
        const count = labels.length;
        const angleStep = (Math.PI * 2) / count;
        const startAngle = -Math.PI / 2;

        // 清空画布
        ctx.clearRect(0, 0, width, height);

        // 绘制雷达网格
        for (let level = 5; level >= 1; level--) {
          const levelRadius = (radius * level) / 5;
          ctx.beginPath();
          for (let i = 0; i < count; i++) {
            const angle = startAngle + i * angleStep;
            const x = centerX + levelRadius * Math.cos(angle);
            const y = centerY + levelRadius * Math.sin(angle);
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.closePath();
          ctx.strokeStyle = level === 5 ? '#E8E8E8' : '#F0F0F0';
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.fillStyle = level % 2 === 0 ? '#FAFAFA' : '#FFFFFF';
          ctx.fill();
        }

        // 绘制轴线
        for (let i = 0; i < count; i++) {
          const angle = startAngle + i * angleStep;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(x, y);
          ctx.strokeStyle = '#E8E8E8';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // 绘制数据区域
        ctx.beginPath();
        for (let i = 0; i < count; i++) {
          const angle = startAngle + i * angleStep;
          const value = values[i] / 100;
          const x = centerX + radius * value * Math.cos(angle);
          const y = centerY + radius * value * Math.sin(angle);
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        
        // 填充渐变
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        gradient.addColorStop(0, 'rgba(74, 144, 217, 0.3)');
        gradient.addColorStop(1, 'rgba(74, 144, 217, 0.1)');
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.strokeStyle = '#4A90D9';
        ctx.lineWidth = 2;
        ctx.stroke();

        // 绘制数据点
        for (let i = 0; i < count; i++) {
          const angle = startAngle + i * angleStep;
          const value = values[i] / 100;
          const x = centerX + radius * value * Math.cos(angle);
          const y = centerY + radius * value * Math.sin(angle);
          
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();
          ctx.strokeStyle = '#4A90D9';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // 绘制标签
        ctx.font = '12px sans-serif';
        ctx.fillStyle = '#595959';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        for (let i = 0; i < count; i++) {
          const angle = startAngle + i * angleStep;
          const labelRadius = radius + 24;
          const x = centerX + labelRadius * Math.cos(angle);
          const y = centerY + labelRadius * Math.sin(angle);
          
          ctx.fillText(labels[i], x, y);
        }
      });
  },

  // 切换Tab
  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    const section = this.data.reportSections[index];
    
    if (section.isVip && !this.data.isMember) {
      app.showMemberGuide('开通会员查看完整AI报告');
      return;
    }

    this.setData({ selectedTab: index });
  },

  // 重新测评
  retakeAssessment() {
    wx.showModal({
      title: '提示',
      content: '确定要重新测评吗？',
      success: (res) => {
        if (res.confirm) {
          wx.redirectTo({
            url: '/pages/assessment/assessment'
          });
        }
      }
    });
  },

  // 开通会员
  openMember() {
    wx.navigateTo({
      url: '/pages/member/member'
    });
  },

  // 查看组合详情
  viewCombination(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/query/combination?id=${id}`
    });
  }
});
