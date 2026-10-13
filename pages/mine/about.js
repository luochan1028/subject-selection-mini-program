// pages/mine/about.js
const app = getApp();

Page({
  data: {
    appName: '高中选科助手',
    version: 'V1.0.0',
    description: '基于AI算法的智能选科推荐系统，帮助高中生科学规划选科方案，让每一位学生都能找到最适合自己的学习方向。',
    features: [
      { icon: '🧠', title: '智能测评', desc: '多维度性格能力测评' },
      { icon: '🔍', title: '选科查询', desc: '海量选科组合数据' },
      { icon: '📊', title: '成绩分析', desc: '精准定位学业水平' },
      { icon: '🎓', title: '大学数据库', desc: '全国高校信息查询' },
      { icon: '💼', title: '职业前景', desc: '专业就业趋势分析' }
    ],
    contact: {
      wechat: 'xuanzhushou',
      email: 'support@xuanzhushou.com',
      website: 'www.xuanzhushou.com'
    },
    updateLogs: [
      {
        version: 'V1.0.0',
        date: '2024-01-15',
        content: '全新上线，开启智能选科新时代'
      }
    ],
    showUpdateLog: false
  },

  onLoad() {
    // 获取当前版本号
    const accountInfo = wx.getAccountInfoSync();
    if (accountInfo && accountInfo.miniProgram && accountInfo.miniProgram.version) {
      this.setData({
        version: 'V' + accountInfo.miniProgram.version
      });
    }
  },

  // 复制到剪贴板
  copyToClipboard(e) {
    const text = e.currentTarget.dataset.text;
    const label = e.currentTarget.dataset.label;
    wx.setClipboardData({
      data: text,
      success: () => {
        wx.showToast({
          title: label + '已复制',
          icon: 'none'
        });
      }
    });
  },

  // 检查更新
  checkUpdate() {
    wx.showLoading({ title: '检查更新中...' });
    const updateManager = wx.getUpdateManager();

    updateManager.onCheckForUpdate((res) => {
      wx.hideLoading();
      if (res.hasUpdate) {
        wx.showModal({
          title: '发现新版本',
          content: '检测到新版本，是否立即更新？',
          success: (modalRes) => {
            if (modalRes.confirm) {
              wx.showLoading({ title: '更新中...' });
            }
          }
        });
      } else {
        wx.showToast({
          title: '已是最新版本',
          icon: 'none'
        });
      }
    });

    updateManager.onUpdateReady(() => {
      wx.hideLoading();
      wx.showModal({
        title: '更新完成',
        content: '新版本已准备好，是否重启应用？',
        success: (res) => {
          if (res.confirm) {
            updateManager.applyUpdate();
          }
        }
      });
    });

    updateManager.onUpdateFailed(() => {
      wx.hideLoading();
      wx.showToast({
        title: '更新失败，请稍后重试',
        icon: 'none'
      });
    });
  },

  // 切换更新记录显示
  toggleUpdateLog() {
    this.setData({
      showUpdateLog: !this.data.showUpdateLog
    });
  },

  // 用户协议
  showUserAgreement() {
    wx.showModal({
      title: '用户协议',
      content: '感谢您使用高中选科助手！\n\n在使用本应用前，请您仔细阅读并同意用户协议。本应用提供的选科建议仅供参考，最终决策请结合自身实际情况。\n\n我们承诺保护您的个人隐私，不会将您的数据用于其他商业用途。',
      showCancel: false,
      confirmText: '我知道了'
    });
  },

  // 隐私政策
  showPrivacyPolicy() {
    wx.showModal({
      title: '隐私政策',
      content: '我们非常重视您的个人信息保护：\n\n1. 我们仅收集必要的信息用于提供服务\n2. 您的测评数据和个人信息将被严格保密\n3. 我们不会向第三方出售或泄露您的信息\n4. 您可以随时删除自己的账号和数据\n\n如有疑问，请联系客服。',
      showCancel: false,
      confirmText: '我知道了'
    });
  },

  // 给个好评
  rateApp() {
    wx.showModal({
      title: '给个好评',
      content: '如果您觉得我们的应用还不错，麻烦给个五星好评吧！您的支持是我们前进的动力~',
      confirmText: '去评价',
      cancelText: '下次再说',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '感谢您的支持！',
            icon: 'none'
          });
        }
      }
    });
  },

  // 分享给朋友
  onShareAppMessage() {
    return {
      title: '高中选科助手 - AI智能选科推荐系统',
      path: '/pages/index/index',
      imageUrl: ''
    };
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '高中选科助手 - AI智能选科推荐系统'
    };
  },

  // 打开官网
  openWebsite() {
    wx.showToast({
      title: '官网：' + this.data.contact.website,
      icon: 'none',
      duration: 2000
    });
  }
});
