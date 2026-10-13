// tests/unit/assessment.test.js
// 测评算法单元测试

const assert = require('assert');
const { assessmentQuestions, subjectCombinations, calculateResult, subjectNames } = require('../../utils/assessment.js');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
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

// ============ 题库结构测试 ============
describe('题库结构验证', () => {
  test('总题数为30道', () => {
    assert.strictEqual(assessmentQuestions.length, 30);
  });

  test('性格特质模块10道题', () => {
    const count = assessmentQuestions.filter(q => q.module === 'personality').length;
    assert.strictEqual(count, 10);
  });

  test('学科兴趣模块10道题', () => {
    const count = assessmentQuestions.filter(q => q.module === 'interest').length;
    assert.strictEqual(count, 10);
  });

  test('能力倾向模块10道题', () => {
    const count = assessmentQuestions.filter(q => q.module === 'ability').length;
    assert.strictEqual(count, 10);
  });

  test('每道题都有唯一ID', () => {
    const ids = assessmentQuestions.map(q => q.id);
    const uniqueIds = new Set(ids);
    assert.strictEqual(uniqueIds.size, 30);
  });

  test('每道题都有题干', () => {
    assessmentQuestions.forEach(q => {
      assert.ok(q.question && q.question.length > 0, `第${q.id}题缺少题干`);
    });
  });

  test('每道题都有至少2个选项', () => {
    assessmentQuestions.forEach(q => {
      assert.ok(q.options && q.options.length >= 2, `第${q.id}题选项不足`);
    });
  });

  test('每个选项都有value值', () => {
    assessmentQuestions.forEach(q => {
      q.options.forEach(opt => {
        assert.ok(opt.value !== undefined && opt.value !== null, `第${q.id}题选项缺少value`);
      });
    });
  });

  test('每个选项都有文字描述', () => {
    assessmentQuestions.forEach(q => {
      q.options.forEach(opt => {
        assert.ok(opt.text && opt.text.length > 0, `第${q.id}题选项缺少文字`);
      });
    });
  });
});

// ============ 科目名称映射测试 ============
describe('科目名称映射', () => {
  test('包含全部6门科目', () => {
    const subjects = ['physics', 'chemistry', 'biology', 'history', 'geography', 'politics'];
    subjects.forEach(s => {
      assert.ok(subjectNames[s], `缺少${s}的名称映射`);
    });
  });

  test('名称都是中文', () => {
    Object.values(subjectNames).forEach(name => {
      assert.ok(/[\u4e00-\u9fa5]/.test(name), `${name}不是中文`);
    });
  });
});

// ============ 选科组合数据测试 ============
describe('选科组合数据', () => {
  test('3+1+2模式有12种组合', () => {
    assert.strictEqual(subjectCombinations['3+1+2'].length, 12);
  });

  test('3+3模式有20种组合', () => {
    assert.strictEqual(subjectCombinations['3+3'].length, 20);
  });

  test('每个组合有3门科目', () => {
    Object.values(subjectCombinations).forEach(mode => {
      mode.forEach(combo => {
        assert.strictEqual(combo.subjects.length, 3, `${combo.name}科目数不是3`);
      });
    });
  });

  test('每个组合有专业覆盖率', () => {
    Object.values(subjectCombinations).forEach(mode => {
      mode.forEach(combo => {
        assert.ok(typeof combo.majorCoverage === 'number', `${combo.name}缺少覆盖率`);
        assert.ok(combo.majorCoverage > 0 && combo.majorCoverage <= 100, `${combo.name}覆盖率不合理`);
      });
    });
  });

  test('物化生组合覆盖率最高', () => {
    const combos = subjectCombinations['3+1+2'];
    const wuHuaSheng = combos.find(c => c.id === 'phy-chem-bio');
    combos.forEach(c => {
      assert.ok(c.majorCoverage <= wuHuaSheng.majorCoverage, `${c.name}覆盖率不应高于物化生`);
    });
  });

  test('史地政组合覆盖率最低', () => {
    const combos = subjectCombinations['3+1+2'];
    const shiDiZheng = combos.find(c => c.id === 'his-geo-pol');
    combos.forEach(c => {
      assert.ok(c.majorCoverage >= shiDiZheng.majorCoverage, `${c.name}覆盖率不应低于史地政`);
    });
  });

  test('每个组合都有描述', () => {
    Object.values(subjectCombinations).forEach(mode => {
      mode.forEach(combo => {
        assert.ok(combo.description && combo.description.length > 0, `${combo.name}缺少描述`);
      });
    });
  });

  test('每个组合都有难度和竞争信息', () => {
    Object.values(subjectCombinations).forEach(mode => {
      mode.forEach(combo => {
        assert.ok(combo.difficulty, `${combo.name}缺少难度`);
        assert.ok(combo.competition, `${combo.name}缺少竞争`);
      });
    });
  });

  test('3+1+2模式首选科目为物理或历史', () => {
    const combos = subjectCombinations['3+1+2'];
    combos.forEach(combo => {
      const hasFirst = combo.subjects.includes('physics') || combo.subjects.includes('history');
      assert.ok(hasFirst, `${combo.name}缺少首选科目`);
    });
  });

  test('3+1+2模式不能同时选物理和历史', () => {
    const combos = subjectCombinations['3+1+2'];
    combos.forEach(combo => {
      const both = combo.subjects.includes('physics') && combo.subjects.includes('history');
      assert.strictEqual(both, false, `${combo.name}同时包含物理和历史`);
    });
  });
});

// ============ 测评结果计算测试 ============
describe('calculateResult - 测评结果计算', () => {
  // 生成模拟答案（选第一个选项）
  function generateAnswers(strategy = 'first') {
    return assessmentQuestions.map(q => {
      let value;
      if (strategy === 'first') {
        value = q.options[0].value;
      } else if (strategy === 'last') {
        value = q.options[q.options.length - 1].value;
      } else if (strategy === 'middle') {
        const mid = Math.floor(q.options.length / 2);
        value = q.options[mid].value;
      }
      return { questionId: q.id, value };
    });
  }

  test('输入完整答案能生成结果', () => {
    const answers = generateAnswers('first');
    const result = calculateResult(answers);
    assert.ok(result);
  });

  test('结果包含科目分数', () => {
    const answers = generateAnswers('first');
    const result = calculateResult(answers);
    assert.ok(result.subjectScores);
    assert.strictEqual(result.subjectScores.length, 6);
  });

  test('科目分数在0-100之间', () => {
    const answers = generateAnswers('first');
    const result = calculateResult(answers);
    result.subjectScores.forEach(s => {
      assert.ok(s.score >= 0 && s.score <= 100, `${s.name}分数${s.score}超出范围`);
    });
  });

  test('结果包含TOP3推荐组合', () => {
    const answers = generateAnswers('first');
    const result = calculateResult(answers);
    assert.ok(result.topCombinations);
    assert.strictEqual(result.topCombinations.length, 3);
  });

  test('TOP3按匹配度降序排列', () => {
    const answers = generateAnswers('first');
    const result = calculateResult(answers);
    for (let i = 0; i < result.topCombinations.length - 1; i++) {
      assert.ok(
        result.topCombinations[i].matchScore >= result.topCombinations[i + 1].matchScore,
        '排序不正确'
      );
    }
  });

  test('匹配度在0-100之间', () => {
    const answers = generateAnswers('first');
    const result = calculateResult(answers);
    result.topCombinations.forEach(c => {
      assert.ok(c.matchScore >= 0 && c.matchScore <= 100, `${c.name}匹配度${c.matchScore}超出范围`);
    });
  });

  test('结果包含雷达图数据', () => {
    const answers = generateAnswers('first');
    const result = calculateResult(answers);
    assert.ok(result.radarData);
    assert.ok(result.radarData.labels);
    assert.ok(result.radarData.values);
    assert.strictEqual(result.radarData.labels.length, 6);
    assert.strictEqual(result.radarData.values.length, 6);
  });

  test('雷达图数值在0-100之间', () => {
    const answers = generateAnswers('first');
    const result = calculateResult(answers);
    result.radarData.values.forEach(v => {
      assert.ok(v >= 0 && v <= 100, `雷达图数值${v}超出范围`);
    });
  });

  test('结果包含性格特质数据', () => {
    const answers = generateAnswers('first');
    const result = calculateResult(answers);
    assert.ok(result.traits);
    assert.ok(typeof result.traits.logical === 'number');
  });

  test('结果包含兴趣数据', () => {
    const answers = generateAnswers('first');
    const result = calculateResult(answers);
    assert.ok(result.interests);
    assert.ok(typeof result.interests.physics === 'number');
  });

  test('结果包含能力数据', () => {
    const answers = generateAnswers('first');
    const result = calculateResult(answers);
    assert.ok(result.abilities);
    assert.ok(typeof result.abilities.math === 'number');
  });

  test('不同答案产生不同结果', () => {
    const answers1 = generateAnswers('first');
    const answers2 = generateAnswers('last');
    const result1 = calculateResult(answers1);
    const result2 = calculateResult(answers2);
    
    // 第一名组合可能相同也可能不同，但至少分数有差异
    const scores1 = result1.subjectScores.map(s => s.score).join(',');
    const scores2 = result2.subjectScores.map(s => s.score).join(',');
    assert.notStrictEqual(scores1, scores2, '不同答案结果不应相同');
  });

  test('每个推荐组合包含3个科目分数', () => {
    const answers = generateAnswers('first');
    const result = calculateResult(answers);
    result.topCombinations.forEach(combo => {
      assert.strictEqual(combo.subjectScores.length, 3);
    });
  });

  test('所有组合都被计算', () => {
    const answers = generateAnswers('first');
    const result = calculateResult(answers);
    assert.strictEqual(result.allCombinations.length, 12);
  });

  test('中等选择产生有效结果（非极端值）', () => {
    const answers = generateAnswers('middle');
    const result = calculateResult(answers);
    // 中等选择不会全是极端值，验证有分数差异且在合理范围
    const avgScore = result.subjectScores.reduce((sum, s) => sum + s.score, 0) / 6;
    // 验证所有分数都在0-100之间（已在其他用例验证）
    // 这里验证至少有科目分数 > 0（不会全0）
    const hasPositive = result.subjectScores.some(s => s.score > 0);
    assert.ok(hasPositive, '至少应有科目分数大于0');
    // 验证最高分不会等于满分（不会全100）
    const maxScore = Math.max(...result.subjectScores.map(s => s.score));
    assert.ok(maxScore < 100, '中等选择不应有满分');
  });

  test('雷达图标签正确', () => {
    const answers = generateAnswers('first');
    const result = calculateResult(answers);
    const expectedLabels = ['逻辑思维', '动手能力', '语言表达', '空间想象', '记忆能力', '社交能力'];
    assert.deepStrictEqual(result.radarData.labels, expectedLabels);
  });

  test('科目排名按分数降序', () => {
    const answers = generateAnswers('first');
    const result = calculateResult(answers);
    for (let i = 0; i < result.subjectScores.length - 1; i++) {
      assert.ok(
        result.subjectScores[i].score >= result.subjectScores[i + 1].score,
        '科目排名顺序错误'
      );
    }
  });
});

// ============ 边界和异常测试 ============
describe('边界与异常测试', () => {
  test('空答案数组不崩溃', () => {
    const result = calculateResult([]);
    assert.ok(result);
    assert.ok(result.subjectScores);
  });

  test('部分答案也能计算', () => {
    const partialAnswers = assessmentQuestions.slice(0, 10).map(q => ({
      questionId: q.id,
      value: q.options[0].value
    }));
    const result = calculateResult(partialAnswers);
    assert.ok(result);
    assert.ok(result.subjectScores);
  });

  test('无效questionId被安全跳过', () => {
    const answers = [
      { questionId: 999, value: 'invalid' },
      { questionId: assessmentQuestions[0].id, value: assessmentQuestions[0].options[0].value }
    ];
    const result = calculateResult(answers);
    assert.ok(result);
  });
});

// ============ 输出汇总 ============
console.log('\n' + '='.repeat(50));
console.log(`测试完成：${passed} 通过, ${failed} 失败`);
console.log('='.repeat(50));

module.exports = { passed, failed };
