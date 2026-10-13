// pages/member/member.js
const app = getApp();

Page({
  data: {
    isMember: false,
    memberInfo: null,
    remainDays: 0,
    
    // 套餐列表
    plans: [
      {
        id: 'month',
        name: '月卡',
        price: 19.9,
        originalPrice: 29.9,
        duration: '30天',
        features: ['全部会员功能'],
        tag: '',
        popular: false
      },
      {
        id: 'quarter',
        name: '季卡',
        price: 49.9,
        originalPrice: 89.7,
        duration: '90天',
        features: ['全部会员功能', '每月1次免费咨询'],
        tag: '热卖',
        popular: true
      },
      {
        id: 'year',
        name: '年卡',
        price: 99.9,
        originalPrice: 238.8,
        duration: '365天',
        features: ['全部会员功能', '每月2次免费咨询', '数据导出'],
        tag: '超值',
        popular: false
      }
    ],
    selectedPlan: 'quarter',

    // 权益对比
    benefits: [
      { name: '智能选科测评', free: '可做，查看TOP1', vip: '可做，查看TOP3+详细分析' },
      { name: '选科组合查询', free: '每次展开3个专业类', vip: '无限展开' },
      { name: '大学专业查询', free: '每次显示10条', vip: '显示全部+导出' },
      { name: '成绩分析', free: '基础折线图', vip: '百分位对比+智能建议' },
      { name: 'AI个性化报告', free: '仅查看特质画像', vip: '完整报告5大章节' },
      { name: '历年录取分数线', free: '查看3所大学', vip: '无限查看+对比图表' },
      { name: '职业前景分析', free: '仅显示摘要', vip: '完整数据+趋势图表' },
      { name: '智能志愿规划', free: '不可用', vip: '冲/稳/保三档推荐' },
      { name: '专家咨询', free: '不可用', vip: '每月1-2次免费' },
      { name: '学长学姐案例', free: '查看3个摘要', vip: '全部案例+筛选' },
      { name: '会员专属标识', free: '无', vip: '有' },
      { name: '数据导出', free: '不可用', vip: '年卡专属' }
    ],

    // 用户评价
    reviews: [
      { name: '王同学', avatar: '', rating: 5, content: '测评很准，帮我确定了选科方向，推荐的组合也很适合我。', time: '2026-01-10' },
      { name: '李妈妈', avatar: '', rating: 5, content: '数据很全面，给孩子选科提供了很大帮助，会员价格也很实惠。', time: '2026-01-08' },
      { name: '张同学', avatar: '', rating: 4, content: 'AI报告很详细，特别是职业前景分析部分，对我帮助很大。', time: '2026-01-05' }
    ],

    // FAQ
    faqs: [
      { question: '会员有哪些支付方式？', answer: '支持微信支付，购买后立即开通会员权益。' },
      { question: '会员可以退款吗？', answer: '购买后7天内且未使用过会员功能的，可申请全额退款。' },
      { question: '会员到期后数据会丢失吗？', answer: '不会，您的测评记录和成绩数据会一直保留。' },
      { question: '可以在多个设备上使用吗？', answer: '可以，登录同一微信账号即可在不同设备使用。' }
    ],
    expandedFaq: -1,
    // 支付密码弹窗
    showPayPassword: false,
    payPassword: '',
    payAmount: 0,
    payPlanName: '',
    // 支付成功弹窗
    showPaySuccess: false,
    // 密码键盘
    keyboardVisible: false
  },

  onLoad() {
    this.checkMemberStatus();
  },

  onShow() {
    this.checkMemberStatus();
  },

  // 检查会员状态
  checkMemberStatus() {
    const isMember = app.checkMember();
    const memberInfo = wx.getStorageSync('memberInfo');
    
    let remainDays = 0;
    if (memberInfo && memberInfo.expireTime) {
      remainDays = Math.ceil((memberInfo.expireTime - Date.now()) / (1000 * 60 * 60 * 24));
    }

    this.setData({
      isMember,
      memberInfo,
      remainDays
    });
  },

  // 选择套餐
  selectPlan(e) {
    const planId = e.currentTarget.dataset.plan;
    this.setData({ selectedPlan: planId });
  },

  // 立即开通
  purchase() {
    const plan = this.data.plans.find(p => p.id === this.data.selectedPlan);
    
    wx.showModal({
      title: '确认购买',
      content: `确定开通${plan.name}（¥${plan.price}）吗？`,
      confirmText: '确认支付',
      success: (res) => {
        if (res.confirm) {
          // 显示支付密码输入弹窗
          this.setData({
            showPayPassword: true,
            payPassword: '',
            payAmount: plan.price,
            payPlanName: plan.name,
            currentPlan: plan
          });
        }
      }
    });
  },

  // 关闭支付密码弹窗
  closePayPassword() {
    this.setData({ showPayPassword: false, payPassword: '' });
  },

  // 密码键盘输入
  inputPassword(e) {
    const num = e.currentTarget.dataset.num;
    let pwd = this.data.payPassword;
    
    if (num === 'del') {
      // 删除
      pwd = pwd.slice(0, -1);
    } else if (num === 'ok') {
      // 确认（6位密码才能确认）
      if (pwd.length === 6) {
        this.confirmPayment();
      }
      return;
    } else {
      // 输入数字
      if (pwd.length < 6) {
        pwd += num;
        // 输入满6位自动确认
        if (pwd.length === 6) {
          this.setData({ payPassword: pwd });
          setTimeout(() => {
            this.confirmPayment();
          }, 200);
          return;
        }
      }
    }
    
    this.setData({ payPassword: pwd });
  },

  // 确认支付
  confirmPayment() {
    const plan = this.data.currentPlan;
    this.setData({ showPayPassword: false });
    
    wx.showLoading({ title: '支付中...', mask: true });

    // 模拟支付过程
    setTimeout(() => {
      wx.hideLoading();

      // 计算到期时间
      let days = 30;
      if (plan.id === 'quarter') days = 90;
      if (plan.id === 'year') days = 365;

      const expireTime = Date.now() + days * 24 * 60 * 60 * 1000;
      
      const memberInfo = {
        planId: plan.id,
        planName: plan.name,
        price: plan.price,
        purchaseTime: Date.now(),
        expireTime,
        remainDays: days,
        consultationCount: plan.id === 'year' ? 2 : plan.id === 'quarter' ? 1 : 0
      };

      wx.setStorageSync('memberInfo', memberInfo);
      app.globalData.isMember = true;
      app.globalData.memberInfo = memberInfo;

      this.setData({
        isMember: true,
        memberInfo,
        remainDays: days,
        showPaySuccess: true,
        payPassword: ''
      });
    }, 1000);
  },

  // 关闭支付成功弹窗
  closePaySuccess() {
    this.setData({ showPaySuccess: false });
  },

  // 忘记密码
  forgetPassword() {
    wx.showModal({
      title: '忘记支付密码',
      content: '请前往微信"我-服务-钱包-支付设置"中找回支付密码',
      showCancel: false,
      confirmText: '我知道了'
    });
  },

  // 展开/收起FAQ
  toggleFaq(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      expandedFaq: this.data.expandedFaq === index ? -1 : index
    });
  },

  // 联系客服
  contactService() {
    wx.showModal({
      title: '联系客服',
      content: '客服微信：xuankezhushou\n工作时间：9:00-21:00',
      showCancel: false
    });
  }
});
