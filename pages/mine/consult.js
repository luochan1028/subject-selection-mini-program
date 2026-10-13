// pages/mine/consult.js
const app = getApp();

Page({
  data: {
    // 会员状态
    isMember: false,
    memberInfo: null,
    remainConsultCount: 0,

    // VIP遮罩
    showVipMask: false,

    // Tab切换
    activeTab: 'expert', // expert: 专家列表 | record: 咨询记录

    // 专家列表
    experts: [
      {
        id: 1,
        name: '张老师',
        avatar: '',
        title: '高级升学规划师',
        experience: '10年',
        specialties: ['志愿填报', '选科规划'],
        consultCount: 1286,
        rating: 4.9,
        isOnline: true,
        price: 99,
        bio: '资深高考志愿填报专家，曾任某省重点高中教务处主任，10年一线升学规划经验。累计指导1000+考生成功考入理想院校，深谙各省份志愿填报规则与院校录取规律。',
        directions: ['新高考选科策略', '志愿填报冲稳保', '院校专业匹配分析', '录取概率精准评估'],
        reviews: [
          { name: '王同学', rating: 5, content: '张老师非常专业，帮我分析了各院校的录取概率，最终成功被心仪大学录取！', time: '2026-03-15' },
          { name: '李妈妈', rating: 5, content: '选科的时候特别迷茫，张老师结合孩子的兴趣和成绩给出了非常实用的建议。', time: '2026-03-10' }
        ]
      },
      {
        id: 2,
        name: '李老师',
        avatar: '',
        title: '心理教育专家',
        experience: '8年',
        specialties: ['兴趣测评', '职业规划'],
        consultCount: 856,
        rating: 4.8,
        isOnline: true,
        price: 89,
        bio: '国家二级心理咨询师，生涯规划师，专注青少年心理发展与职业规划领域8年。擅长通过科学测评帮助学生发现自身优势，明确发展方向。',
        directions: ['兴趣性格测评解读', '职业方向探索', '学习动力激发', '考前心理疏导'],
        reviews: [
          { name: '张同学', rating: 5, content: '李老师的测评解读让我对自己有了全新的认识，终于知道自己适合什么方向了。', time: '2026-03-12' },
          { name: '陈爸爸', rating: 4, content: '老师很有耐心，分析得很到位，孩子听完后对未来清晰了很多。', time: '2026-03-08' }
        ]
      },
      {
        id: 3,
        name: '王老师',
        avatar: '',
        title: '高考政策专家',
        experience: '12年',
        specialties: ['政策解读', '院校选择'],
        consultCount: 1520,
        rating: 4.95,
        isOnline: false,
        price: 109,
        bio: '高考政策研究专家，12年教育行业从业经验，深度参与多省新高考改革政策研究。对全国各省市高考政策、院校招生政策有系统深入的研究。',
        directions: ['新高考政策解读', '院校全面分析', '招生计划变化分析', '特殊招生渠道指导'],
        reviews: [
          { name: '刘妈妈', rating: 5, content: '王老师对政策的解读非常专业透彻，帮我们避开了很多政策盲区，强烈推荐！', time: '2026-03-18' },
          { name: '赵同学', rating: 5, content: '老师对各院校的了解非常深入，给我推荐了几所性价比很高的学校。', time: '2026-03-05' }
        ]
      }
    ],

    // 咨询记录
    consultRecords: [],

    // 详情弹窗
    showDetail: false,
    currentExpert: null
  },

  onLoad() {
    this.checkMemberStatus();
    this.loadConsultRecords();
  },

  onShow() {
    this.checkMemberStatus();
  },

  // 检查会员状态
  checkMemberStatus() {
    const isMember = app.checkMember();
    const memberInfo = wx.getStorageSync('memberInfo');

    let remainConsultCount = 0;
    if (isMember && memberInfo) {
      remainConsultCount = memberInfo.consultationCount || 0;
    }

    this.setData({
      isMember,
      memberInfo,
      remainConsultCount,
      showVipMask: !isMember
    });
  },

  // 加载咨询记录
  loadConsultRecords() {
    const records = wx.getStorageSync('consultRecords') || [];
    this.setData({ consultRecords: records });
  },

  // Tab切换
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab });
  },

  // 查看专家详情
  viewDetail(e) {
    if (!this.data.isMember) {
      this.setData({ showVipMask: true });
      return;
    }

    const id = e.currentTarget.dataset.id;
    const expert = this.data.experts.find(item => item.id === id);
    this.setData({
      showDetail: true,
      currentExpert: expert
    });
  },

  // 关闭详情弹窗
  closeDetail() {
    this.setData({
      showDetail: false,
      currentExpert: null
    });
  },

  // 阻止弹窗内容区域冒泡
  stopPropagation() {},

  // 立即咨询
  startConsult(e) {
    if (!this.data.isMember) {
      this.setData({ showVipMask: true });
      return;
    }

    const expert = this.data.currentExpert || this.data.experts.find(item => item.id === e.currentTarget.dataset.id);

    if (!expert.isOnline) {
      wx.showToast({
        title: '专家当前不在线',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (this.data.remainConsultCount <= 0) {
      wx.showModal({
        title: '咨询次数不足',
        content: `本月免费咨询次数已用完，本次咨询需支付 ¥${expert.price}`,
        confirmText: '立即支付',
        success: (res) => {
          if (res.confirm) {
            this.processConsultPayment(expert);
          }
        }
      });
      return;
    }

    wx.showModal({
      title: '确认咨询',
      content: `确定向${expert.name}发起咨询吗？将消耗1次免费咨询机会。`,
      confirmText: '确认咨询',
      success: (res) => {
        if (res.confirm) {
          this.doConsult(expert, true);
        }
      }
    });
  },

  // 支付咨询费用
  processConsultPayment(expert) {
    wx.showLoading({ title: '支付中...', mask: true });

    setTimeout(() => {
      wx.hideLoading();
      this.doConsult(expert, false);
    }, 1500);
  },

  // 执行咨询
  doConsult(expert, useFree) {
    const record = {
      id: Date.now(),
      expertId: expert.id,
      expertName: expert.name,
      expertTitle: expert.title,
      expertAvatar: expert.avatar,
      type: useFree ? 'free' : 'paid',
      price: useFree ? 0 : expert.price,
      status: 'ongoing',
      createTime: Date.now(),
      lastMessage: '咨询已开始，请描述您的问题...'
    };

    // 保存记录
    const records = wx.getStorageSync('consultRecords') || [];
    records.unshift(record);
    wx.setStorageSync('consultRecords', records);

    // 扣减免费次数
    if (useFree && this.data.memberInfo) {
      const memberInfo = { ...this.data.memberInfo };
      memberInfo.consultationCount = Math.max(0, (memberInfo.consultationCount || 0) - 1);
      wx.setStorageSync('memberInfo', memberInfo);
      app.globalData.memberInfo = memberInfo;
    }

    this.setData({
      consultRecords: records,
      remainConsultCount: useFree ? this.data.remainConsultCount - 1 : this.data.remainConsultCount,
      showDetail: false,
      currentExpert: null
    });

    wx.showToast({
      title: '咨询已发起',
      icon: 'none',
      duration: 2000
    });

    // 模拟跳转到对话页面
    setTimeout(() => {
      wx.showModal({
        title: '模拟咨询对话',
        content: `正在与${expert.name}进行一对一咨询...\n\n（此处为模拟效果，实际项目中将跳转至聊天页面）`,
        showCancel: false,
        confirmText: '我知道了'
      });
    }, 1000);
  },

  // 关闭VIP遮罩
  closeVipMask() {
    this.setData({ showVipMask: false });
  },

  // 前往开通会员
  goMember() {
    this.setData({ showVipMask: false });
    wx.navigateTo({
      url: '/pages/member/member'
    });
  },

  // 查看咨询记录详情
  viewRecord(e) {
    const id = e.currentTarget.dataset.id;
    const record = this.data.consultRecords.find(item => item.id === id);

    if (record && record.status === 'ongoing') {
      wx.showModal({
        title: '模拟咨询对话',
        content: `正在与${record.expertName}进行一对一咨询...\n\n（此处为模拟效果）`,
        showCancel: false,
        confirmText: '我知道了'
      });
    } else {
      wx.showToast({
        title: '查看咨询详情',
        icon: 'none'
      });
    }
  },

  // 格式化时间
  formatTime(timestamp) {
    const date = new Date(timestamp);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    return `${month}月${day}日 ${hour}:${minute}`;
  }
});
