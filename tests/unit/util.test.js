// tests/unit/util.test.js
// 工具函数单元测试

const assert = require('assert');

// 模拟微信小程序API
global.wx = {
  storage: {},
  setStorageSync(key, value) { this.storage[key] = value; },
  getStorageSync(key) { return this.storage[key] || ''; },
  removeStorageSync(key) { delete this.storage[key]; },
  clearStorageSync() { this.storage = {}; },
  showToast(options) { this.lastToast = options; },
  showLoading(options) { this.loading = options; },
  hideLoading() { this.loading = null; },
  navigateTo(options) { this.lastNav = { type: 'navigateTo', options }; },
  redirectTo(options) { this.lastNav = { type: 'redirectTo', options }; },
  switchTab(options) { this.lastNav = { type: 'switchTab', options }; },
  navigateBack(options) { this.lastNav = { type: 'navigateBack', options }; }
};

// 加载被测模块
const util = require('../../utils/util.js');

let passed = 0;
let failed = 0;
let results = [];

function test(name, fn) {
  try {
    fn();
    passed++;
    results.push({ name, status: 'PASS' });
    console.log(`  ✓ ${name}`);
  } catch (e) {
    failed++;
    results.push({ name, status: 'FAIL', error: e.message });
    console.log(`  ✗ ${name}`);
    console.log(`    ${e.message}`);
  }
}

function describe(suiteName, fn) {
  console.log(`\n${suiteName}`);
  fn();
}

// 简易 beforeEach 模拟
let beforeEachFn = null;
function beforeEach(fn) {
  beforeEachFn = fn;
}
function runBeforeEach() {
  if (beforeEachFn) beforeEachFn();
}

// ============ formatDate 测试 ============
describe('formatDate - 日期格式化', () => {
  test('默认格式 YYYY-MM-DD', () => {
    const date = new Date('2026-01-15T00:00:00');
    const result = util.formatDate(date);
    assert.strictEqual(result, '2026-01-15');
  });

  test('自定义格式 YYYY-MM-DD HH:mm:ss', () => {
    const date = new Date('2026-01-15T14:30:45');
    const result = util.formatDate(date, 'YYYY-MM-DD HH:mm:ss');
    assert.strictEqual(result, '2026-01-15 14:30:45');
  });

  test('只返回年月', () => {
    const date = new Date('2026-01-15');
    const result = util.formatDate(date, 'YYYY年MM月');
    assert.strictEqual(result, '2026年01月');
  });

  test('处理时间戳输入', () => {
    const date = new Date('2026-06-01').getTime();
    const result = util.formatDate(date);
    assert.strictEqual(result, '2026-06-01');
  });

  test('月份和日期补零', () => {
    const date = new Date('2026-01-05');
    const result = util.formatDate(date);
    assert.strictEqual(result, '2026-01-05');
  });
});

// ============ generateId 测试 ============
describe('generateId - 生成唯一ID', () => {
  test('生成字符串类型ID', () => {
    const id = util.generateId();
    assert.strictEqual(typeof id, 'string');
  });

  test('ID非空', () => {
    const id = util.generateId();
    assert.ok(id.length > 0);
  });

  test('两次生成不同ID', () => {
    const id1 = util.generateId();
    const id2 = util.generateId();
    assert.notStrictEqual(id1, id2);
  });

  test('连续生成100个不重复', () => {
    const ids = new Set();
    for (let i = 0; i < 100; i++) {
      ids.add(util.generateId());
    }
    assert.strictEqual(ids.size, 100);
  });
});

// ============ debounce 测试 ============
describe('debounce - 防抖函数', () => {
  test('返回函数', () => {
    const fn = () => {};
    const debounced = util.debounce(fn);
    assert.strictEqual(typeof debounced, 'function');
  });

  test('立即调用不会立即执行', () => {
    let count = 0;
    const debounced = util.debounce(() => { count++; }, 100);
    debounced();
    assert.strictEqual(count, 0);
  });
});

// ============ deepClone 测试 ============
describe('deepClone - 深拷贝', () => {
  test('拷贝基本类型', () => {
    assert.strictEqual(util.deepClone(42), 42);
    assert.strictEqual(util.deepClone('hello'), 'hello');
    assert.strictEqual(util.deepClone(null), null);
    assert.strictEqual(util.deepClone(undefined), undefined);
  });

  test('拷贝普通对象', () => {
    const obj = { a: 1, b: { c: 2 } };
    const cloned = util.deepClone(obj);
    assert.deepStrictEqual(cloned, obj);
    // 修改原对象不影响克隆
    obj.b.c = 99;
    assert.strictEqual(cloned.b.c, 2);
  });

  test('拷贝数组', () => {
    const arr = [1, 2, [3, 4]];
    const cloned = util.deepClone(arr);
    assert.deepStrictEqual(cloned, arr);
    arr[2][0] = 99;
    assert.strictEqual(cloned[2][0], 3);
  });

  test('拷贝Date对象', () => {
    const date = new Date('2026-01-01');
    const cloned = util.deepClone(date);
    assert.ok(cloned instanceof Date);
    assert.strictEqual(cloned.getTime(), date.getTime());
  });
});

// ============ scoreToGrade 测试 ============
describe('scoreToGrade - 分数转等级', () => {
  test('90分以上为A-优秀', () => {
    const result = util.scoreToGrade(95);
    assert.strictEqual(result.grade, 'A');
    assert.strictEqual(result.label, '优秀');
    assert.strictEqual(result.color, '#52C41A');
  });

  test('80-89分为B-良好', () => {
    const result = util.scoreToGrade(85);
    assert.strictEqual(result.grade, 'B');
    assert.strictEqual(result.label, '良好');
  });

  test('70-79分为C-中等', () => {
    const result = util.scoreToGrade(75);
    assert.strictEqual(result.grade, 'C');
    assert.strictEqual(result.label, '中等');
  });

  test('60-69分为D-及格', () => {
    const result = util.scoreToGrade(65);
    assert.strictEqual(result.grade, 'D');
    assert.strictEqual(result.label, '及格');
  });

  test('60分以下为E-不及格', () => {
    const result = util.scoreToGrade(50);
    assert.strictEqual(result.grade, 'E');
    assert.strictEqual(result.label, '不及格');
  });

  test('边界值：刚好90分', () => {
    const result = util.scoreToGrade(90);
    assert.strictEqual(result.grade, 'A');
  });

  test('边界值：刚好60分', () => {
    const result = util.scoreToGrade(60);
    assert.strictEqual(result.grade, 'D');
  });

  test('边界值：0分', () => {
    const result = util.scoreToGrade(0);
    assert.strictEqual(result.grade, 'E');
  });

  test('边界值：100分', () => {
    const result = util.scoreToGrade(100);
    assert.strictEqual(result.grade, 'A');
  });
});

// ============ storage 测试 ============
describe('storage - 本地存储封装', () => {
  test('set 和 get 字符串', () => {
    wx.storage = {};
    util.storage.set('test', 'hello');
    assert.strictEqual(util.storage.get('test'), 'hello');
  });

  test('set 和 get 对象', () => {
    wx.storage = {};
    const obj = { a: 1, b: 2 };
    util.storage.set('obj', obj);
    assert.deepStrictEqual(util.storage.get('obj'), obj);
  });

  test('get 不存在的key返回默认值', () => {
    wx.storage = {};
    const result = util.storage.get('nonexistent', 'default');
    assert.strictEqual(result, 'default');
  });

  test('remove 删除数据', () => {
    wx.storage = {};
    util.storage.set('temp', 'value');
    util.storage.remove('temp');
    assert.strictEqual(util.storage.get('temp'), null);
  });

  test('clear 清空所有数据', () => {
    wx.storage = {};
    util.storage.set('a', 1);
    util.storage.set('b', 2);
    util.storage.clear();
    assert.strictEqual(util.storage.get('a'), null);
    assert.strictEqual(util.storage.get('b'), null);
  });
});

// ============ toast 测试 ============
describe('toast - 消息提示', () => {
  test('success toast', () => {
    util.toast.success('操作成功');
    assert.strictEqual(wx.lastToast.title, '操作成功');
    assert.strictEqual(wx.lastToast.icon, 'success');
  });

  test('error toast', () => {
    util.toast.error('操作失败');
    assert.strictEqual(wx.lastToast.title, '操作失败');
    assert.strictEqual(wx.lastToast.icon, 'none');
  });

  test('info toast', () => {
    util.toast.info('提示信息');
    assert.strictEqual(wx.lastToast.title, '提示信息');
    assert.strictEqual(wx.lastToast.icon, 'none');
  });

  test('loading 显示和隐藏', () => {
    util.toast.loading('加载中');
    assert.ok(wx.loading);
    util.toast.hideLoading();
    assert.strictEqual(wx.loading, null);
  });
});

// ============ navigate 测试 ============
describe('navigate - 页面跳转', () => {
  test('navigateTo', () => {
    util.navigate.to('/pages/test/test');
    assert.strictEqual(wx.lastNav.type, 'navigateTo');
    assert.strictEqual(wx.lastNav.options.url, '/pages/test/test');
  });

  test('switchTab', () => {
    util.navigate.switchTab('/pages/index/index');
    assert.strictEqual(wx.lastNav.type, 'switchTab');
  });

  test('navigateBack', () => {
    util.navigate.back(2);
    assert.strictEqual(wx.lastNav.type, 'navigateBack');
    assert.strictEqual(wx.lastNav.options.delta, 2);
  });

  test('redirectTo', () => {
    util.navigate.redirect('/pages/test/test');
    assert.strictEqual(wx.lastNav.type, 'redirectTo');
  });
});

// ============ calculatePercentile 测试 ============
describe('calculatePercentile - 百分位计算', () => {
  test('高分数对应低百分位（排名靠前）', () => {
    const result = util.calculatePercentile(90);
    assert.ok(result >= 0 && result <= 100);
  });

  test('低分数对应高百分位（排名靠后）', () => {
    const result = util.calculatePercentile(30);
    assert.ok(result >= 0 && result <= 100);
  });

  test('返回整数', () => {
    const result = util.calculatePercentile(75);
    assert.strictEqual(result, Math.round(result));
  });
});

// ============ 输出汇总 ============
console.log('\n' + '='.repeat(50));
console.log(`测试完成：${passed} 通过, ${failed} 失败`);
console.log('='.repeat(50));

module.exports = { passed, failed, results };
