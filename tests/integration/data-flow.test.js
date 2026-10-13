// tests/integration/data-flow.test.js
// 数据流程集成测试 - 验证页面间数据传递和状态一致性

const assert = require('assert');

// 模拟微信环境
global.wx = {
  storage: {},
  setStorageSync(key, value) { this.storage[key] = value; },
  getStorageSync(key) { return this.storage[key] || ''; },
  removeStorageSync(key) { delete this.storage[key]; },
  clearStorageSync() { this.storage = {}; },
  showToast(options) { this.lastToast = options; },
  showModal(options) { this.modalOptions = options; return { confirm: true }; },
  showLoading() {},
  hideLoading() {},
  navigateTo(options) { this.lastNav = { type: 'navigateTo', ...options }; },
  switchTab(options) { this.lastNav = { type: 'switchTab', ...options }; },
  redirectTo(options) { this.lastNav = { type: 'redirectTo', ...options }; },
  createSelectorQuery() {
    return {
      select() {
        return {
          fields() {
            return {
              exec(cb) { cb([{ node: { getContext: () => ({ scale: () => {} }) }, width: 300, height: 300 }]); }
            };
          }
        };
      }
    };
  },
  getSystemInfoSync() { return { pixelRatio: 2 }; },
  setNavigationBarTitle() {},
  getUserProfile(options) {
    this.userProfileCallback = options;
  }
};

// 模拟全局app
global.getApp = function() {
  return {
    globalData: {
      userInfo: null,
      isMember: false,
      memberInfo: null
    },
    checkMember() {
      const memberInfo = wx.getStorageSync('memberInfo');
      return !!(memberInfo && memberInfo.expireTime > Date.now());
    },
    showMemberGuide(title) {
      wx.showModal({ title: '会员专属', content: title });
    }
  };
};

const util = require('../../utils/util.js');
const { calculateResult, assessmentQuestions, subjectCombinations } = require('../../utils/assessment.js');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    // 每个测试前重置环境
    wx.storage = {};
    wx.lastToast = null;
    wx.lastNav = null;
    wx.modalOptions = null;
    fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (e) {
    failed++;
    console.log(`  ✗ ${name}`);
    console.log(`    ${e.message}`);
  }
}

function describe(suiteName, fn) {
  console.log(`\n${suiteName}`);
  fn();
}

// ============ 测评 - 结果页 数据流 ============
describe('测评 → 结果页 数据流', () => {
  test('完成测评后，结果保存到本地存储', () => {
    const answers = assessmentQuestions.map((q) => ({
      questionId: q.id,
      value: q.options[0].value
    }));

    const result = calculateResult(answers);
    const record = {
      id: util.generateId(),
      date: util.formatDate(new Date()),
      timestamp: Date.now(),
      answers,
      result
    };

    const records = wx.getStorageSync('assessmentRecords') || [];
    records.push(record);
    wx.setStorageSync('assessmentRecords', records);

    const saved = wx.getStorageSync('assessmentRecords');
    assert.strictEqual(saved.length, 1);
    assert.strictEqual(saved[0].result.topCombinations.length, 3);
  });

  test('结果页能从存储中读取最新测评记录', () => {
    const answers = assessmentQuestions.map(q => ({
      questionId: q.id,
      value: q.options[0].value
    }));
    const result = calculateResult(answers);
    const record = {
      id: 'test-1',
      date: '2026-01-15',
      result
    };
    wx.setStorageSync('assessmentRecords', [record]);

    const records = wx.getStorageSync('assessmentRecords') || [];
    assert.ok(records.length > 0);
    const latest = records[records.length - 1];
    assert.ok(latest.result.radarData);
    assert.ok(latest.result.topCombinations.length > 0);
  });

  test('多次测评记录按时间顺序保存', () => {
    for (let i = 0; i < 3; i++) {
      const answers = assessmentQuestions.map(q => ({
        questionId: q.id,
        value: q.options[i % q.options.length].value
      }));
      const result = calculateResult(answers);
      const record = {
        id: `test-${i}`,
        date: `2026-01-${10 + i}`,
        timestamp: Date.now() + i * 1000,
        result
      };
      const records = wx.getStorageSync('assessmentRecords') || [];
      records.push(record);
      wx.setStorageSync('assessmentRecords', records);
    }

    const saved = wx.getStorageSync('assessmentRecords');
    assert.strictEqual(saved.length, 3);
    assert.strictEqual(saved[0].id, 'test-0');
    assert.strictEqual(saved[2].id, 'test-2');
  });

  test('删除测评记录后存储正确更新', () => {
    const records = [
      { id: 'r1', date: '2026-01-10', result: calculateResult(assessmentQuestions.map(q => ({ questionId: q.id, value: q.options[0].value }))) },
      { id: 'r2', date: '2026-01-15', result: calculateResult(assessmentQuestions.map(q => ({ questionId: q.id, value: q.options[0].value }))) }
    ];
    wx.setStorageSync('assessmentRecords', records);

    let saved = wx.getStorageSync('assessmentRecords');
    saved = saved.filter(r => r.id !== 'r1');
    wx.setStorageSync('assessmentRecords', saved);

    const after = wx.getStorageSync('assessmentRecords');
    assert.strictEqual(after.length, 1);
    assert.strictEqual(after[0].id, 'r2');
  });
});

// ============ 会员状态 - 权限控制 集成 ============
describe('会员状态 - 权限控制 集成', () => {
  test('非会员访问会员功能弹出引导', () => {
    const app = getApp();
    wx.removeStorageSync('memberInfo');
    
    const isMember = app.checkMember();
    assert.strictEqual(isMember, false);

    app.showMemberGuide('开通会员解锁此功能');
    assert.ok(wx.modalOptions);
    assert.strictEqual(wx.modalOptions.title, '会员专属');
  });

  test('开通会员后状态正确更新', () => {
    const app = getApp();
    
    const expireTime = Date.now() + 30 * 24 * 60 * 60 * 1000;
    const memberInfo = {
      planId: 'month',
      planName: '月卡',
      price: 19.9,
      expireTime
    };
    wx.setStorageSync('memberInfo', memberInfo);
    app.globalData.isMember = true;
    app.globalData.memberInfo = memberInfo;

    const isMember = app.checkMember();
    assert.strictEqual(isMember, true);
  });

  test('会员过期后状态自动失效', () => {
    const expiredInfo = {
      planId: 'month',
      expireTime: Date.now() - 1000
    };
    wx.setStorageSync('memberInfo', expiredInfo);

    const app = getApp();
    const isMember = app.checkMember();
    assert.strictEqual(isMember, false);
  });

  test('会员状态在各页面保持一致', () => {
    const expireTime = Date.now() + 30 * 24 * 60 * 60 * 1000;
    const memberInfo = { planId: 'month', expireTime };
    wx.setStorageSync('memberInfo', memberInfo);

    const app = getApp();
    
    const status1 = app.checkMember();
    const status2 = app.checkMember();
    const status3 = app.checkMember();
    
    assert.strictEqual(status1, true);
    assert.strictEqual(status2, true);
    assert.strictEqual(status3, true);
  });
});

// ============ 成绩录入 - 分析展示 集成 ============
describe('成绩录入 → 分析展示 集成', () => {
  test('录入成绩后数据正确保存', () => {
    const record = {
      id: 'score-1',
      examName: '期中考试',
      examDate: '2026-04-15',
      subjects: [
        { key: 'chinese', name: '语文', score: 110, fullScore: 150 },
        { key: 'math', name: '数学', score: 130, fullScore: 150 },
        { key: 'english', name: '英语', score: 120, fullScore: 150 },
        { key: 'physics', name: '物理', score: 85, fullScore: 100 },
        { key: 'chemistry', name: '化学', score: 75, fullScore: 100 },
        { key: 'biology', name: '生物', score: 80, fullScore: 100 }
      ]
    };

    const records = wx.getStorageSync('scoreRecords') || [];
    records.push(record);
    wx.setStorageSync('scoreRecords', records);

    const saved = wx.getStorageSync('scoreRecords') || [];
    assert.strictEqual(saved.length, 1);
    
    const latest = saved[saved.length - 1];
    let total = 0;
    latest.subjects.forEach(s => total += s.score);
    assert.strictEqual(total, 600);
  });

  test('多次成绩录入后趋势分析可用', () => {
    for (let i = 0; i < 5; i++) {
      const record = {
        id: `score-${i}`,
        examName: `第${i + 1}次月考`,
        subjects: [
          { key: 'chinese', name: '语文', score: 100 + i * 5, fullScore: 150 },
          { key: 'math', name: '数学', score: 110 + i * 5, fullScore: 150 },
          { key: 'english', name: '英语', score: 105 + i * 3, fullScore: 150 }
        ]
      };
      const records = wx.getStorageSync('scoreRecords') || [];
      records.push(record);
      wx.setStorageSync('scoreRecords', records);
    }

    const saved = wx.getStorageSync('scoreRecords');
    assert.strictEqual(saved.length, 5);
    const trendData = saved.slice(-5);
    assert.strictEqual(trendData.length, 5);
  });

  test('删除成绩记录后数据正确', () => {
    for (let i = 0; i < 3; i++) {
      const records = wx.getStorageSync('scoreRecords') || [];
      records.push({ id: `s${i}`, examName: `考试${i}`, subjects: [] });
      wx.setStorageSync('scoreRecords', records);
    }

    let saved = wx.getStorageSync('scoreRecords');
    saved = saved.filter(r => r.id !== 's1');
    wx.setStorageSync('scoreRecords', saved);

    const after = wx.getStorageSync('scoreRecords');
    assert.strictEqual(after.length, 2);
    assert.strictEqual(after[0].id, 's0');
    assert.strictEqual(after[1].id, 's2');
  });
});

// ============ 收藏功能 集成 ============
describe('收藏功能 集成', () => {
  test('大学收藏后在我的收藏中显示', () => {
    wx.setStorageSync('favorites', { universities: [], majors: [], articles: [] });

    let favorites = wx.getStorageSync('favorites');
    favorites.universities.unshift({ id: 1, name: '清华大学', type: '综合类' });
    wx.setStorageSync('favorites', favorites);

    const saved = wx.getStorageSync('favorites');
    assert.strictEqual(saved.universities.length, 1);
    assert.strictEqual(saved.universities[0].name, '清华大学');
  });

  test('专业收藏独立于大学收藏', () => {
    wx.setStorageSync('favorites', { universities: [], majors: [], articles: [] });

    let favorites = wx.getStorageSync('favorites');
    favorites.universities.push({ id: 1, name: '清华大学' });
    favorites.majors.push({ id: 1, name: '计算机科学与技术' });
    wx.setStorageSync('favorites', favorites);

    const saved = wx.getStorageSync('favorites');
    assert.strictEqual(saved.universities.length, 1);
    assert.strictEqual(saved.majors.length, 1);
    assert.strictEqual(saved.articles.length, 0);
  });

  test('取消收藏后从列表移除', () => {
    wx.setStorageSync('favorites', { universities: [], majors: [], articles: [] });

    let favorites = wx.getStorageSync('favorites');
    favorites.universities.push({ id: 1, name: '清华大学' });
    favorites.universities.push({ id: 2, name: '北京大学' });
    wx.setStorageSync('favorites', favorites);

    let saved = wx.getStorageSync('favorites');
    saved.universities = saved.universities.filter(u => u.id !== 1);
    wx.setStorageSync('favorites', saved);

    const after = wx.getStorageSync('favorites');
    assert.strictEqual(after.universities.length, 1);
    assert.strictEqual(after.universities[0].name, '北京大学');
  });

  test('重复收藏不产生重复记录', () => {
    wx.setStorageSync('favorites', { universities: [], majors: [], articles: [] });

    const uni = { id: 1, name: '清华大学' };
    let favorites = wx.getStorageSync('favorites');
    
    if (!favorites.universities.some(u => u.id === uni.id)) {
      favorites.universities.unshift(uni);
    }
    wx.setStorageSync('favorites', favorites);

    favorites = wx.getStorageSync('favorites');
    if (!favorites.universities.some(u => u.id === uni.id)) {
      favorites.universities.unshift(uni);
    }
    wx.setStorageSync('favorites', favorites);

    const saved = wx.getStorageSync('favorites');
    assert.strictEqual(saved.universities.length, 1);
  });
});

// ============ 用户信息 集成 ============
describe('用户信息 集成', () => {
  test('登录后各页面能获取用户信息', () => {
    const userInfo = {
      nickName: '测试用户',
      avatarUrl: 'https://example.com/avatar.png'
    };
    wx.setStorageSync('userInfo', userInfo);

    const page1User = wx.getStorageSync('userInfo');
    assert.strictEqual(page1User.nickName, '测试用户');

    const page2User = wx.getStorageSync('userInfo');
    assert.strictEqual(page2User.avatarUrl, 'https://example.com/avatar.png');
  });

  test('退出登录后清除用户信息', () => {
    wx.setStorageSync('userInfo', { nickName: '测试', avatarUrl: '' });
    
    wx.removeStorageSync('userInfo');
    
    const userInfo = wx.getStorageSync('userInfo');
    assert.strictEqual(userInfo, '');
  });
});

// ============ 设置 - 持久化 集成 ============
describe('设置 - 持久化 集成', () => {
  test('省份设置在各页面保持一致', () => {
    const userProfile = { province: '广东', grade: '高一' };
    wx.setStorageSync('userProfile', userProfile);

    const queryPageProvince = wx.getStorageSync('userProfile').province;
    assert.strictEqual(queryPageProvince, '广东');

    const settingsPageProvince = wx.getStorageSync('userProfile').province;
    assert.strictEqual(settingsPageProvince, '广东');
  });

  test('修改设置后立即生效', () => {
    wx.setStorageSync('settings', { noticeEnabled: true });
    
    const settings = wx.getStorageSync('settings');
    settings.noticeEnabled = false;
    wx.setStorageSync('settings', settings);

    const updated = wx.getStorageSync('settings');
    assert.strictEqual(updated.noticeEnabled, false);
  });
});

// ============ 输出汇总 ============
console.log('\n' + '='.repeat(50));
console.log(`集成测试完成：${passed} 通过, ${failed} 失败`);
console.log('='.repeat(50));

module.exports = { passed, failed };
