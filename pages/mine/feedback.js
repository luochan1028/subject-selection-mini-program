// pages/mine/feedback.js
Page({
  data: {
    // 反馈类型列表
    typeList: [
      { id: 'suggest', name: '功能建议', icon: '💡' },
      { id: 'bug', name: 'Bug反馈', icon: '🐛' },
      { id: 'content', name: '内容问题', icon: '📝' },
      { id: 'other', name: '其他', icon: '📌' }
    ],
    // 选中的反馈类型
    selectedType: '',
    // 反馈内容
    content: '',
    // 内容字数
    contentCount: 0,
    // 最大字数
    maxContentLength: 200,
    // 联系方式
    contact: '',
    // 上传的图片列表（模拟）
    images: [],
    // 最多上传图片数量
    maxImages: 3,
    // 历史反馈记录
    feedbackList: []
  },

  onLoad() {
    this.loadFeedbackList();
  },

  onShow() {
    this.loadFeedbackList();
  },

  // 加载历史反馈记录
  loadFeedbackList() {
    const feedbackList = wx.getStorageSync('feedbackList') || [];
    // 状态文本映射
    const statusTextMap = {
      'pending': '待处理',
      'processing': '处理中',
      'replied': '已回复',
      '待处理': '待处理',
      '处理中': '处理中',
      '已回复': '已回复'
    };
    const statusKeyMap = {
      '待处理': 'pending',
      '处理中': 'processing',
      '已回复': 'replied'
    };
    // 兼容旧数据，添加 statusText 和英文 status
    const processed = feedbackList.map(item => {
      const statusKey = statusKeyMap[item.status] || item.status || 'pending';
      return {
        ...item,
        status: statusKey,
        statusText: item.statusText || statusTextMap[item.status] || '待处理'
      };
    });
    // 按时间倒序排列
    processed.sort((a, b) => b.time - a.time);
    this.setData({ feedbackList: processed });
  },

  // 选择反馈类型
  selectType(e) {
    const typeId = e.currentTarget.dataset.id;
    this.setData({ selectedType: typeId });
  },

  // 输入反馈内容
  onContentInput(e) {
    const content = e.detail.value;
    const contentCount = content.length;
    this.setData({ content, contentCount });
  },

  // 输入联系方式
  onContactInput(e) {
    const contact = e.detail.value;
    this.setData({ contact });
  },

  // 选择图片（模拟实现）
  chooseImage() {
    const { images, maxImages } = this.data;
    if (images.length >= maxImages) {
      wx.showToast({
        title: `最多上传${maxImages}张图片`,
        icon: 'none'
      });
      return;
    }

    wx.chooseImage({
      count: maxImages - images.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const newImages = res.tempFilePaths;
        const updatedImages = [...images, ...newImages].slice(0, maxImages);
        this.setData({ images: updatedImages });
      },
      fail: () => {
        // 模拟：如果选择失败，添加占位图
        if (images.length < maxImages) {
          const mockImages = [...images];
          mockImages.push('');
          this.setData({ images: mockImages });
        }
      }
    });
  },

  // 删除图片
  deleteImage(e) {
    const index = e.currentTarget.dataset.index;
    const images = [...this.data.images];
    images.splice(index, 1);
    this.setData({ images });
  },

  // 预览图片
  previewImage(e) {
    const index = e.currentTarget.dataset.index;
    const images = this.data.images.filter(img => img);
    if (images.length === 0) return;
    wx.previewImage({
      current: images[index] || images[0],
      urls: images
    });
  },

  // 提交反馈
  submitFeedback() {
    const { selectedType, content, contact, images, typeList } = this.data;

    // 校验反馈类型
    if (!selectedType) {
      wx.showToast({
        title: '请选择反馈类型',
        icon: 'none'
      });
      return;
    }

    // 校验反馈内容
    if (!content.trim()) {
      wx.showToast({
        title: '请输入反馈内容',
        icon: 'none'
      });
      return;
    }

    if (content.trim().length < 5) {
      wx.showToast({
        title: '反馈内容至少5个字',
        icon: 'none'
      });
      return;
    }

    // 构建反馈数据
    const typeItem = typeList.find(item => item.id === selectedType);
    const feedbackItem = {
      id: Date.now(),
      type: selectedType,
      typeName: typeItem ? typeItem.name : '其他',
      content: content.trim(),
      contact: contact.trim(),
      images: images.filter(img => img),
      time: Date.now(),
      status: 'pending',
      statusText: '待处理'
    };

    // 获取现有反馈列表
    const feedbackList = wx.getStorageSync('feedbackList') || [];
    feedbackList.unshift(feedbackItem);

    // 保存到本地存储
    wx.setStorageSync('feedbackList', feedbackList);

    // 显示成功提示
    wx.showToast({
      title: '提交成功',
      icon: 'none',
      duration: 2000
    });

    // 格式化时间用于显示
    const displayList = feedbackList.map(item => ({
      ...item,
      timeText: this.formatTime(item.time)
    }));

    // 重置表单
    setTimeout(() => {
      this.setData({
        selectedType: '',
        content: '',
        contentCount: 0,
        contact: '',
        images: [],
        feedbackList: displayList
      });
    }, 1500);
  },

  // 格式化时间
  formatTime(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    const hour = this.padZero(date.getHours());
    const minute = this.padZero(date.getMinutes());
    return `${year}-${month}-${day} ${hour}:${minute}`;
  },

  padZero(num) {
    return num < 10 ? '0' + num : num;
  },

  // 查看反馈详情
  viewFeedback(e) {
    const id = e.currentTarget.dataset.id;
    const item = this.data.feedbackList.find(f => f.id === id);
    if (!item) return;

    const statusText = {
      'pending': '待处理',
      'processing': '处理中',
      'replied': '已回复'
    };

    let detail = `类型：${item.typeName}\n`;
    detail += `提交时间：${this.formatTime(item.time)}\n`;
    detail += `处理状态：${statusText[item.status] || item.statusText || '待处理'}\n`;
    if (item.contact) {
      detail += `联系方式：${item.contact}\n`;
    }
    detail += `\n反馈内容：\n${item.content}`;

    wx.showModal({
      title: '反馈详情',
      content: detail,
      showCancel: false,
      confirmText: '知道了'
    });
  }
});
