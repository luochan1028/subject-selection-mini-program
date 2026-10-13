// utils/assessment.js
// 测评相关工具函数

// 测评题库 - 30道题，三个维度各10题
const assessmentQuestions = [
  // 性格特质 - 10题
  {
    id: 1,
    module: 'personality',
    moduleName: '性格特质',
    question: '你更喜欢用数据证明观点还是用故事打动他人？',
    options: [
      { value: 4, text: '用数据证明', traits: { logical: 2, creative: 0 } },
      { value: 3, text: '偏好用数据', traits: { logical: 1.5, creative: 0.5 } },
      { value: 2, text: '偏好用故事', traits: { logical: 0.5, creative: 1.5 } },
      { value: 1, text: '用故事打动', traits: { logical: 0, creative: 2 } }
    ]
  },
  {
    id: 2,
    module: 'personality',
    moduleName: '性格特质',
    question: '做决定时，你更倾向于：',
    options: [
      { value: 4, text: '理性分析利弊', traits: { logical: 2, emotional: 0 } },
      { value: 3, text: '主要靠理性', traits: { logical: 1.5, emotional: 0.5 } },
      { value: 2, text: '主要靠感觉', traits: { logical: 0.5, emotional: 1.5 } },
      { value: 1, text: '凭直觉和感受', traits: { logical: 0, emotional: 2 } }
    ]
  },
  {
    id: 3,
    module: 'personality',
    moduleName: '性格特质',
    question: '你更喜欢做实验还是阅读理论书籍？',
    options: [
      { value: 4, text: '非常喜欢做实验', traits: { practical: 2, theoretical: 0 } },
      { value: 3, text: '比较喜欢做实验', traits: { practical: 1.5, theoretical: 0.5 } },
      { value: 2, text: '比较喜欢阅读', traits: { practical: 0.5, theoretical: 1.5 } },
      { value: 1, text: '非常喜欢阅读', traits: { practical: 0, theoretical: 2 } }
    ]
  },
  {
    id: 4,
    module: 'personality',
    moduleName: '性格特质',
    question: '周末你更愿意：',
    options: [
      { value: 4, text: '参加聚会认识新朋友', traits: { social: 2, independent: 0 } },
      { value: 3, text: '和几个好友出去玩', traits: { social: 1.5, independent: 0.5 } },
      { value: 2, text: '在家看书看电影', traits: { social: 0.5, independent: 1.5 } },
      { value: 1, text: '一个人独处思考', traits: { social: 0, independent: 2 } }
    ]
  },
  {
    id: 5,
    module: 'personality',
    moduleName: '性格特质',
    question: '面对复杂问题时，你的第一反应是：',
    options: [
      { value: 4, text: '拆解问题逐步解决', traits: { logical: 2, creative: 0 } },
      { value: 3, text: '找类似问题的解法', traits: { logical: 1, creative: 1 } },
      { value: 2, text: '尝试不同的思路', traits: { logical: 0.5, creative: 1.5 } },
      { value: 1, text: '凭灵感找新方法', traits: { logical: 0, creative: 2 } }
    ]
  },
  {
    id: 6,
    module: 'personality',
    moduleName: '性格特质',
    question: '你对细节的关注度如何？',
    options: [
      { value: 4, text: '非常关注细节', traits: { detail: 2, bigPicture: 0 } },
      { value: 3, text: '比较关注细节', traits: { detail: 1.5, bigPicture: 0.5 } },
      { value: 2, text: '更看重整体', traits: { detail: 0.5, bigPicture: 1.5 } },
      { value: 1, text: '只看大局', traits: { detail: 0, bigPicture: 2 } }
    ]
  },
  {
    id: 7,
    module: 'personality',
    moduleName: '性格特质',
    question: '你更喜欢有条理的工作还是灵活自由的工作？',
    options: [
      { value: 4, text: '非常喜欢有条理', traits: { organized: 2, flexible: 0 } },
      { value: 3, text: '比较喜欢有条理', traits: { organized: 1.5, flexible: 0.5 } },
      { value: 2, text: '比较喜欢灵活', traits: { organized: 0.5, flexible: 1.5 } },
      { value: 1, text: '非常喜欢灵活自由', traits: { organized: 0, flexible: 2 } }
    ]
  },
  {
    id: 8,
    module: 'personality',
    moduleName: '性格特质',
    question: '你更擅长：',
    options: [
      { value: 4, text: '空间想象和图形思维', traits: { spatial: 2, verbal: 0 } },
      { value: 3, text: '空间想象稍好', traits: { spatial: 1.5, verbal: 0.5 } },
      { value: 2, text: '语言表达稍好', traits: { spatial: 0.5, verbal: 1.5 } },
      { value: 1, text: '语言文字表达', traits: { spatial: 0, verbal: 2 } }
    ]
  },
  {
    id: 9,
    module: 'personality',
    moduleName: '性格特质',
    question: '面对压力时，你通常会：',
    options: [
      { value: 4, text: '冷静分析制定计划', traits: { logical: 2, emotional: 0 } },
      { value: 3, text: '找人倾诉寻求建议', traits: { social: 1.5, independent: 0.5 } },
      { value: 2, text: '自己消化慢慢调整', traits: { independent: 1.5, social: 0.5 } },
      { value: 1, text: '情绪波动较大', traits: { emotional: 2, logical: 0 } }
    ]
  },
  {
    id: 10,
    module: 'personality',
    moduleName: '性格特质',
    question: '你更喜欢帮助他人还是独立完成任务？',
    options: [
      { value: 4, text: '非常喜欢帮助他人', traits: { social: 2, independent: 0 } },
      { value: 3, text: '比较喜欢帮助他人', traits: { social: 1.5, independent: 0.5 } },
      { value: 2, text: '比较喜欢独立完成', traits: { independent: 1.5, social: 0.5 } },
      { value: 1, text: '非常喜欢独立完成', traits: { independent: 2, social: 0 } }
    ]
  },
  // 学科兴趣 - 10题
  {
    id: 11,
    module: 'interest',
    moduleName: '学科兴趣',
    question: '如果可以选一门课只学不考试，你会选择：',
    options: [
      { value: 'physics', text: '物理', interests: { physics: 3 } },
      { value: 'chemistry', text: '化学', interests: { chemistry: 3 } },
      { value: 'biology', text: '生物', interests: { biology: 3 } },
      { value: 'history', text: '历史', interests: { history: 3 } },
      { value: 'geography', text: '地理', interests: { geography: 3 } },
      { value: 'politics', text: '政治', interests: { politics: 3 } }
    ]
  },
  {
    id: 12,
    module: 'interest',
    moduleName: '学科兴趣',
    question: '你对以下哪个话题最感兴趣？',
    options: [
      { value: 'physics', text: '宇宙的起源与运行规律', interests: { physics: 3 } },
      { value: 'chemistry', text: '物质的变化与新材料', interests: { chemistry: 3 } },
      { value: 'biology', text: '生命的奥秘与基因工程', interests: { biology: 3 } },
      { value: 'history', text: '历史事件与人物故事', interests: { history: 3 } },
      { value: 'geography', text: '地球环境与自然奇观', interests: { geography: 3 } },
      { value: 'politics', text: '社会制度与国际局势', interests: { politics: 3 } }
    ]
  },
  {
    id: 13,
    module: 'interest',
    moduleName: '学科兴趣',
    question: '你最喜欢的课外活动类型是：',
    options: [
      { value: 'science', text: '科技小发明/机器人', interests: { physics: 2, chemistry: 1 } },
      { value: 'biology', text: '观察动植物/做标本', interests: { biology: 2, geography: 1 } },
      { value: 'history', text: '参观博物馆/历史古迹', interests: { history: 2, politics: 1 } },
      { value: 'geography', text: '户外探险/旅行摄影', interests: { geography: 2, biology: 1 } },
      { value: 'social', text: '社会调研/志愿服务', interests: { politics: 2, history: 1 } },
      { value: 'reading', text: '阅读科普/人文书籍', interests: { physics: 1, chemistry: 1, biology: 1, history: 1, geography: 1, politics: 1 } }
    ]
  },
  {
    id: 14,
    module: 'interest',
    moduleName: '学科兴趣',
    question: '你对物理课的兴趣程度：',
    options: [
      { value: 5, text: '非常感兴趣', interests: { physics: 3 } },
      { value: 4, text: '比较感兴趣', interests: { physics: 2 } },
      { value: 3, text: '一般', interests: { physics: 1 } },
      { value: 2, text: '不太感兴趣', interests: { physics: 0.5 } },
      { value: 1, text: '完全没兴趣', interests: { physics: 0 } }
    ]
  },
  {
    id: 15,
    module: 'interest',
    moduleName: '学科兴趣',
    question: '你对化学课的兴趣程度：',
    options: [
      { value: 5, text: '非常感兴趣', interests: { chemistry: 3 } },
      { value: 4, text: '比较感兴趣', interests: { chemistry: 2 } },
      { value: 3, text: '一般', interests: { chemistry: 1 } },
      { value: 2, text: '不太感兴趣', interests: { chemistry: 0.5 } },
      { value: 1, text: '完全没兴趣', interests: { chemistry: 0 } }
    ]
  },
  {
    id: 16,
    module: 'interest',
    moduleName: '学科兴趣',
    question: '你对生物课的兴趣程度：',
    options: [
      { value: 5, text: '非常感兴趣', interests: { biology: 3 } },
      { value: 4, text: '比较感兴趣', interests: { biology: 2 } },
      { value: 3, text: '一般', interests: { biology: 1 } },
      { value: 2, text: '不太感兴趣', interests: { biology: 0.5 } },
      { value: 1, text: '完全没兴趣', interests: { biology: 0 } }
    ]
  },
  {
    id: 17,
    module: 'interest',
    moduleName: '学科兴趣',
    question: '你对历史课的兴趣程度：',
    options: [
      { value: 5, text: '非常感兴趣', interests: { history: 3 } },
      { value: 4, text: '比较感兴趣', interests: { history: 2 } },
      { value: 3, text: '一般', interests: { history: 1 } },
      { value: 2, text: '不太感兴趣', interests: { history: 0.5 } },
      { value: 1, text: '完全没兴趣', interests: { history: 0 } }
    ]
  },
  {
    id: 18,
    module: 'interest',
    moduleName: '学科兴趣',
    question: '你对地理课的兴趣程度：',
    options: [
      { value: 5, text: '非常感兴趣', interests: { geography: 3 } },
      { value: 4, text: '比较感兴趣', interests: { geography: 2 } },
      { value: 3, text: '一般', interests: { geography: 1 } },
      { value: 2, text: '不太感兴趣', interests: { geography: 0.5 } },
      { value: 1, text: '完全没兴趣', interests: { geography: 0 } }
    ]
  },
  {
    id: 19,
    module: 'interest',
    moduleName: '学科兴趣',
    question: '你对政治课的兴趣程度：',
    options: [
      { value: 5, text: '非常感兴趣', interests: { politics: 3 } },
      { value: 4, text: '比较感兴趣', interests: { politics: 2 } },
      { value: 3, text: '一般', interests: { politics: 1 } },
      { value: 2, text: '不太感兴趣', interests: { politics: 0.5 } },
      { value: 1, text: '完全没兴趣', interests: { politics: 0 } }
    ]
  },
  {
    id: 20,
    module: 'interest',
    moduleName: '学科兴趣',
    question: '以下哪种职业你最向往？',
    options: [
      { value: 'engineer', text: '工程师/科学家', interests: { physics: 2, chemistry: 1 } },
      { value: 'doctor', text: '医生/生命科学家', interests: { biology: 2, chemistry: 1 } },
      { value: 'lawyer', text: '律师/外交官', interests: { politics: 2, history: 1 } },
      { value: 'historian', text: '历史学者/考古学家', interests: { history: 2, geography: 1 } },
      { value: 'environmental', text: '环境学家/地理学家', interests: { geography: 2, biology: 1 } },
      { value: 'designer', text: '设计师/艺术家', interests: { geography: 1, physics: 1 } }
    ]
  },
  // 能力倾向 - 10题
  {
    id: 21,
    module: 'ability',
    moduleName: '能力倾向',
    question: '你认为自己的数学能力如何？',
    options: [
      { value: 5, text: '非常好', abilities: { math: 3 } },
      { value: 4, text: '比较好', abilities: { math: 2 } },
      { value: 3, text: '一般', abilities: { math: 1 } },
      { value: 2, text: '不太好', abilities: { math: 0.5 } },
      { value: 1, text: '很差', abilities: { math: 0 } }
    ]
  },
  {
    id: 22,
    module: 'ability',
    moduleName: '能力倾向',
    question: '你的记忆力如何？',
    options: [
      { value: 5, text: '非常好，过目不忘', abilities: { memory: 3 } },
      { value: 4, text: '比较好', abilities: { memory: 2 } },
      { value: 3, text: '一般', abilities: { memory: 1 } },
      { value: 2, text: '不太好', abilities: { memory: 0.5 } },
      { value: 1, text: '很差', abilities: { memory: 0 } }
    ]
  },
  {
    id: 23,
    module: 'ability',
    moduleName: '能力倾向',
    question: '解决一个复杂问题时，你通常第一步是：',
    options: [
      { value: 'analyze', text: '分析问题拆解步骤', abilities: { logical: 3, math: 1 } },
      { value: 'research', text: '查找资料学习方法', abilities: { memory: 2, verbal: 1 } },
      { value: 'try', text: '尝试不同的方法', abilities: { practical: 2, creative: 1 } },
      { value: 'ask', text: '请教他人寻求帮助', abilities: { social: 2, verbal: 1 } }
    ]
  },
  {
    id: 24,
    module: 'ability',
    moduleName: '能力倾向',
    question: '你的空间想象能力如何？（如立体几何、拼图等）',
    options: [
      { value: 5, text: '非常好', abilities: { spatial: 3, math: 1 } },
      { value: 4, text: '比较好', abilities: { spatial: 2, math: 0.5 } },
      { value: 3, text: '一般', abilities: { spatial: 1 } },
      { value: 2, text: '不太好', abilities: { spatial: 0.5 } },
      { value: 1, text: '很差', abilities: { spatial: 0 } }
    ]
  },
  {
    id: 25,
    module: 'ability',
    moduleName: '能力倾向',
    question: '你的阅读理解和写作能力如何？',
    options: [
      { value: 5, text: '非常好', abilities: { verbal: 3, memory: 1 } },
      { value: 4, text: '比较好', abilities: { verbal: 2, memory: 0.5 } },
      { value: 3, text: '一般', abilities: { verbal: 1 } },
      { value: 2, text: '不太好', abilities: { verbal: 0.5 } },
      { value: 1, text: '很差', abilities: { verbal: 0 } }
    ]
  },
  {
    id: 26,
    module: 'ability',
    moduleName: '能力倾向',
    question: '你做实验或手工的动手能力如何？',
    options: [
      { value: 5, text: '非常好，手很巧', abilities: { practical: 3 } },
      { value: 4, text: '比较好', abilities: { practical: 2 } },
      { value: 3, text: '一般', abilities: { practical: 1 } },
      { value: 2, text: '不太好', abilities: { practical: 0.5 } },
      { value: 1, text: '很差，手笨', abilities: { practical: 0 } }
    ]
  },
  {
    id: 27,
    module: 'ability',
    moduleName: '能力倾向',
    question: '你对时间和历史事件的记忆能力如何？',
    options: [
      { value: 5, text: '非常好，能记住很多日期', abilities: { memory: 3, verbal: 1 } },
      { value: 4, text: '比较好', abilities: { memory: 2, verbal: 0.5 } },
      { value: 3, text: '一般', abilities: { memory: 1 } },
      { value: 2, text: '不太好', abilities: { memory: 0.5 } },
      { value: 1, text: '很差，经常记错', abilities: { memory: 0 } }
    ]
  },
  {
    id: 28,
    module: 'ability',
    moduleName: '能力倾向',
    question: '你对地图方向感和地理位置的辨识能力如何？',
    options: [
      { value: 5, text: '非常好，从不迷路', abilities: { spatial: 3, memory: 1 } },
      { value: 4, text: '比较好', abilities: { spatial: 2, memory: 0.5 } },
      { value: 3, text: '一般', abilities: { spatial: 1 } },
      { value: 2, text: '不太好，偶尔迷路', abilities: { spatial: 0.5 } },
      { value: 1, text: '很差，路痴', abilities: { spatial: 0 } }
    ]
  },
  {
    id: 29,
    module: 'ability',
    moduleName: '能力倾向',
    question: '你对社会热点和时事政治的关注程度如何？',
    options: [
      { value: 5, text: '非常关注，经常看新闻', abilities: { verbal: 2, social: 2 } },
      { value: 4, text: '比较关注', abilities: { verbal: 1.5, social: 1 } },
      { value: 3, text: '一般', abilities: { verbal: 1, social: 0.5 } },
      { value: 2, text: '不太关注', abilities: { verbal: 0.5 } },
      { value: 1, text: '完全不关注', abilities: { verbal: 0 } }
    ]
  },
  {
    id: 30,
    module: 'ability',
    moduleName: '能力倾向',
    question: '你观察事物的细致程度如何？',
    options: [
      { value: 5, text: '非常细致，能发现细节', abilities: { detail: 3, memory: 1 } },
      { value: 4, text: '比较细致', abilities: { detail: 2, memory: 0.5 } },
      { value: 3, text: '一般', abilities: { detail: 1 } },
      { value: 2, text: '比较粗心', abilities: { detail: 0.5 } },
      { value: 1, text: '非常粗心', abilities: { detail: 0 } }
    ]
  }
];

// 科目名称映射
const subjectNames = {
  physics: '物理',
  chemistry: '化学',
  biology: '生物',
  history: '历史',
  geography: '地理',
  politics: '政治'
};

// 选科组合及其对应专业
const subjectCombinations = {
  '3+1+2': [
    {
      id: 'phy-chem-bio',
      name: '物理+化学+生物',
      subjects: ['physics', 'chemistry', 'biology'],
      majorCoverage: 96.7,
      description: '传统理科组合，专业覆盖率最高，适合理工科方向学生',
      difficulty: '高',
      competition: '激烈',
      majors: ['工学类', '理学类', '医学类', '农学类', '经济学类', '管理学类']
    },
    {
      id: 'phy-chem-geo',
      name: '物理+化学+地理',
      subjects: ['physics', 'chemistry', 'geography'],
      majorCoverage: 95.8,
      description: '偏理科组合，地理偏文科思维，适合理科好但不喜欢背诵的学生',
      difficulty: '较高',
      competition: '较激烈',
      majors: ['工学类', '理学类', '经济学类', '管理学类', '地理科学类', '建筑类']
    },
    {
      id: 'phy-chem-pol',
      name: '物理+化学+政治',
      subjects: ['physics', 'chemistry', 'politics'],
      majorCoverage: 96.4,
      description: '偏理科组合，政治对考研考公有利，适合想走理工+公务员方向的学生',
      difficulty: '较高',
      competition: '中等',
      majors: ['工学类', '理学类', '法学类', '经济学类', '管理学类', '马克思主义理论类']
    },
    {
      id: 'phy-bio-geo',
      name: '物理+生物+地理',
      subjects: ['physics', 'chemistry', 'geography'],
      majorCoverage: 87.3,
      description: '偏理科组合，学习难度相对较低，适合物理好但化学一般的学生',
      difficulty: '中等',
      competition: '中等',
      majors: ['医学类', '生物科学类', '地理科学类', '环境科学类', '经济学类', '管理学类']
    },
    {
      id: 'phy-bio-pol',
      name: '物理+生物+政治',
      subjects: ['physics', 'biology', 'politics'],
      majorCoverage: 87.6,
      description: '偏理科组合，适合医学方向且对政治感兴趣的学生',
      difficulty: '中等',
      competition: '中等',
      majors: ['医学类', '生物科学类', '法学类', '经济学类', '管理学类', '公共卫生类']
    },
    {
      id: 'phy-geo-pol',
      name: '物理+地理+政治',
      subjects: ['physics', 'geography', 'politics'],
      majorCoverage: 82.3,
      description: '文理兼修组合，适合物理好但理化生都一般的学生',
      difficulty: '中等',
      competition: '较小',
      majors: ['经济学类', '管理学类', '法学类', '地理科学类', '环境科学类', '公共管理类']
    },
    {
      id: 'his-chem-bio',
      name: '历史+化学+生物',
      subjects: ['history', 'chemistry', 'biology'],
      majorCoverage: 78.4,
      description: '偏文科但保留理科选择，适合文科好但想报医学等专业的学生',
      difficulty: '中等',
      competition: '中等',
      majors: ['医学类', '生物科学类', '化学类', '历史学类', '法学类', '管理学类']
    },
    {
      id: 'his-chem-geo',
      name: '历史+化学+地理',
      subjects: ['history', 'chemistry', 'geography'],
      majorCoverage: 77.8,
      description: '文理均衡组合，适合各科目均衡发展的学生',
      difficulty: '中等',
      competition: '中等',
      majors: ['化学类', '地理科学类', '历史学类', '法学类', '经济学类', '管理学类']
    },
    {
      id: 'his-chem-pol',
      name: '历史+化学+政治',
      subjects: ['history', 'chemistry', 'politics'],
      majorCoverage: 80.2,
      description: '偏文科组合，适合法律、政治方向的学生',
      difficulty: '中等',
      competition: '中等',
      majors: ['法学类', '化学类', '历史学类', '政治学类', '马克思主义理论类', '公共管理类']
    },
    {
      id: 'his-bio-geo',
      name: '历史+生物+地理',
      subjects: ['history', 'biology', 'geography'],
      majorCoverage: 76.1,
      description: '传统偏文科组合，学习难度较低，适合文科有优势的学生',
      difficulty: '较低',
      competition: '较激烈',
      majors: ['历史学类', '地理科学类', '生物科学类', '法学类', '经济学类', '管理学类']
    },
    {
      id: 'his-bio-pol',
      name: '历史+生物+政治',
      subjects: ['history', 'biology', 'politics'],
      majorCoverage: 75.3,
      description: '偏文科组合，适合医学相关文科专业和政法方向',
      difficulty: '较低',
      competition: '较激烈',
      majors: ['法学类', '历史学类', '政治学类', '公共卫生类', '管理学类', '护理学类']
    },
    {
      id: 'his-geo-pol',
      name: '历史+地理+政治',
      subjects: ['history', 'geography', 'politics'],
      majorCoverage: 49.7,
      description: '纯文科组合，专业覆盖率最低，适合文科优势明显的学生',
      difficulty: '低',
      competition: '激烈',
      majors: ['历史学类', '地理科学类', '法学类', '政治学类', '经济学类', '管理学类', '文学类']
    }
  ],
  '3+3': [
    {
      id: 'phy-chem-bio',
      name: '物理+化学+生物',
      subjects: ['physics', 'chemistry', 'biology'],
      majorCoverage: 97.4,
      description: '传统大理科组合，专业覆盖率最高，适合理工科方向学生',
      difficulty: '高',
      competition: '激烈',
      majors: ['工学类', '理学类', '医学类', '农学类']
    },
    {
      id: 'phy-chem-his',
      name: '物理+化学+历史',
      subjects: ['physics', 'chemistry', 'history'],
      majorCoverage: 96.5,
      description: '偏理科组合，历史拓展人文视野，专业选择面广',
      difficulty: '高',
      competition: '较激烈',
      majors: ['工学类', '理学类', '历史学类', '经济学类', '管理学类']
    },
    {
      id: 'phy-chem-geo',
      name: '物理+化学+地理',
      subjects: ['physics', 'chemistry', 'geography'],
      majorCoverage: 95.8,
      description: '偏理科组合，地理兼具文理特点，适合理性思维强的学生',
      difficulty: '较高',
      competition: '较激烈',
      majors: ['工学类', '理学类', '地理科学类', '建筑类', '环境科学类']
    },
    {
      id: 'phy-chem-pol',
      name: '物理+化学+政治',
      subjects: ['physics', 'chemistry', 'politics'],
      majorCoverage: 96.4,
      description: '偏理科组合，政治对未来考研考公有帮助',
      difficulty: '较高',
      competition: '中等',
      majors: ['工学类', '理学类', '法学类', '政治学类', '马克思主义理论类']
    },
    {
      id: 'phy-bio-his',
      name: '物理+生物+历史',
      subjects: ['physics', 'biology', 'history'],
      majorCoverage: 87.9,
      description: '文理兼修，适合物理好但化学一般，对生物历史感兴趣的学生',
      difficulty: '中等',
      competition: '中等',
      majors: ['医学类', '生物科学类', '历史学类', '经济学类', '管理学类']
    },
    {
      id: 'phy-bio-geo',
      name: '物理+生物+地理',
      subjects: ['physics', 'biology', 'geography'],
      majorCoverage: 87.3,
      description: '偏理科组合，学习难度适中，适合中等偏上学生',
      difficulty: '中等',
      competition: '中等',
      majors: ['医学类', '生物科学类', '地理科学类', '环境科学类']
    },
    {
      id: 'phy-bio-pol',
      name: '物理+生物+政治',
      subjects: ['physics', 'biology', 'politics'],
      majorCoverage: 87.6,
      description: '偏理科组合，适合医学方向且对政治感兴趣的学生',
      difficulty: '中等',
      competition: '中等',
      majors: ['医学类', '生物科学类', '法学类', '公共管理类']
    },
    {
      id: 'phy-his-geo',
      name: '物理+历史+地理',
      subjects: ['physics', 'history', 'geography'],
      majorCoverage: 82.5,
      description: '文理兼修，适合物理好且人文学科也不错的学生',
      difficulty: '中等',
      competition: '较小',
      majors: ['经济学类', '管理学类', '地理科学类', '历史学类', '建筑类']
    },
    {
      id: 'phy-his-pol',
      name: '物理+历史+政治',
      subjects: ['physics', 'history', 'politics'],
      majorCoverage: 82.8,
      description: '文理兼修，适合物理好且对政法方向感兴趣的学生',
      difficulty: '中等',
      competition: '较小',
      majors: ['法学类', '政治学类', '历史学类', '经济学类', '公共管理类']
    },
    {
      id: 'phy-geo-pol',
      name: '物理+地理+政治',
      subjects: ['physics', 'geography', 'politics'],
      majorCoverage: 82.3,
      description: '文理均衡，适合物理好但理科都一般的学生',
      difficulty: '中等',
      competition: '较小',
      majors: ['经济学类', '地理科学类', '法学类', '公共管理类']
    },
    {
      id: 'chem-bio-his',
      name: '化学+生物+历史',
      subjects: ['chemistry', 'biology', 'history'],
      majorCoverage: 78.6,
      description: '偏文科但保留医学等专业选择，适合文科好但想报医的学生',
      difficulty: '中等',
      competition: '中等',
      majors: ['医学类', '生物科学类', '化学类', '历史学类', '法学类']
    },
    {
      id: 'chem-bio-geo',
      name: '化学+生物+地理',
      subjects: ['chemistry', 'biology', 'geography'],
      majorCoverage: 77.9,
      description: '偏生命科学方向，适合对化学生物地理感兴趣的学生',
      difficulty: '中等',
      competition: '中等',
      majors: ['医学类', '生物科学类', '化学类', '地理科学类', '环境科学类']
    },
    {
      id: 'chem-bio-pol',
      name: '化学+生物+政治',
      subjects: ['chemistry', 'biology', 'politics'],
      majorCoverage: 78.2,
      description: '偏生命科学+政法方向，适合医学和法学双方向考虑的学生',
      difficulty: '中等',
      competition: '中等',
      majors: ['医学类', '生物科学类', '化学类', '法学类', '公共卫生类']
    },
    {
      id: 'chem-his-geo',
      name: '化学+历史+地理',
      subjects: ['chemistry', 'history', 'geography'],
      majorCoverage: 76.5,
      description: '文理均衡组合，适合化学生物一般但历史地理好的学生',
      difficulty: '中等',
      competition: '较小',
      majors: ['化学类', '历史学类', '地理科学类', '法学类', '经济学类']
    },
    {
      id: 'chem-his-pol',
      name: '化学+历史+政治',
      subjects: ['chemistry', 'history', 'politics'],
      majorCoverage: 76.8,
      description: '偏文科+化学，适合政法方向但保留部分理科专业选择',
      difficulty: '中等',
      competition: '较小',
      majors: ['法学类', '历史学类', '政治学类', '化学类', '马克思主义理论类']
    },
    {
      id: 'chem-geo-pol',
      name: '化学+地理+政治',
      subjects: ['chemistry', 'geography', 'politics'],
      majorCoverage: 76.2,
      description: '文理均衡，适合化学一般但地理政治好的学生',
      difficulty: '中等',
      competition: '较小',
      majors: ['化学类', '地理科学类', '法学类', '环境科学类', '公共管理类']
    },
    {
      id: 'bio-his-geo',
      name: '生物+历史+地理',
      subjects: ['biology', 'history', 'geography'],
      majorCoverage: 75.2,
      description: '偏文科组合，学习难度较低，适合文科有优势的学生',
      difficulty: '较低',
      competition: '较激烈',
      majors: ['历史学类', '地理科学类', '生物科学类', '法学类', '经济学类']
    },
    {
      id: 'bio-his-pol',
      name: '生物+历史+政治',
      subjects: ['biology', 'history', 'politics'],
      majorCoverage: 74.8,
      description: '偏文科组合，适合文科好但对生物医学有兴趣的学生',
      difficulty: '较低',
      competition: '较激烈',
      majors: ['法学类', '历史学类', '政治学类', '生物科学类', '护理学类']
    },
    {
      id: 'bio-geo-pol',
      name: '生物+地理+政治',
      subjects: ['biology', 'geography', 'politics'],
      majorCoverage: 74.5,
      description: '偏文科组合，学习难度较低，竞争相对较小',
      difficulty: '较低',
      competition: '较小',
      majors: ['生物科学类', '地理科学类', '法学类', '环境科学类', '公共管理类']
    },
    {
      id: 'his-geo-pol',
      name: '历史+地理+政治',
      subjects: ['history', 'geography', 'politics'],
      majorCoverage: 49.7,
      description: '纯文科组合，专业覆盖率最低，适合文科优势非常明显的学生',
      difficulty: '低',
      competition: '激烈',
      majors: ['历史学类', '地理科学类', '法学类', '政治学类', '文学类', '经济学类', '管理学类']
    }
  ]
};

// 计算测评结果
const calculateResult = (answers) => {
  const traits = {
    logical: 0,      // 逻辑思维
    creative: 0,     // 创造力
    practical: 0,    // 动手能力
    theoretical: 0,  // 理论偏好
    social: 0,       // 社交倾向
    independent: 0,  // 独立性
    spatial: 0,      // 空间能力
    verbal: 0,       // 语言能力
    memory: 0,       // 记忆力
    detail: 0        // 细节观察力
  };

  const interests = {
    physics: 0,
    chemistry: 0,
    biology: 0,
    history: 0,
    geography: 0,
    politics: 0
  };

  const abilities = {
    math: 0,
    logical: 0,
    spatial: 0,
    verbal: 0,
    memory: 0,
    practical: 0,
    detail: 0,
    social: 0,
    creative: 0,
    organized: 0
  };

  // 统计各项得分
  answers.forEach(answer => {
    const question = assessmentQuestions.find(q => q.id === answer.questionId);
    if (!question) return;

    const option = question.options.find(o => o.value === answer.value);
    if (!option) return;

    if (option.traits) {
      Object.keys(option.traits).forEach(key => {
        traits[key] = (traits[key] || 0) + option.traits[key];
      });
    }

    if (option.interests) {
      Object.keys(option.interests).forEach(key => {
        interests[key] = (interests[key] || 0) + option.interests[key];
      });
    }

    if (option.abilities) {
      Object.keys(option.abilities).forEach(key => {
        abilities[key] = (abilities[key] || 0) + option.abilities[key];
      });
    }
  });

  // 计算各科综合得分（兴趣+能力+性格匹配）
  const subjectScores = {};
  const subjectFactors = {
    physics: { interest: 'physics', abilities: ['math', 'logical', 'spatial'], traits: ['logical', 'practical'] },
    chemistry: { interest: 'chemistry', abilities: ['memory', 'detail', 'practical'], traits: ['practical', 'detail'] },
    biology: { interest: 'biology', abilities: ['memory', 'detail', 'practical'], traits: ['practical', 'detail'] },
    history: { interest: 'history', abilities: ['memory', 'verbal'], traits: ['verbal', 'theoretical'] },
    geography: { interest: 'geography', abilities: ['memory', 'spatial', 'detail'], traits: ['spatial', 'detail'] },
    politics: { interest: 'politics', abilities: ['verbal', 'memory', 'social'], traits: ['social', 'verbal'] }
  };

  Object.keys(subjectFactors).forEach(subject => {
    const factors = subjectFactors[subject];
    let score = 0;
    let maxScore = 0;

    // 兴趣权重 40%
    score += (interests[factors.interest] || 0) * 0.4;
    maxScore += 15 * 0.4; // 最高约15分

    // 能力权重 40%
    factors.abilities.forEach(ability => {
      score += (abilities[ability] || 0) * 0.4 / factors.abilities.length;
    });
    maxScore += 15 * 0.4;

    // 性格权重 20%
    factors.traits.forEach(trait => {
      score += (traits[trait] || 0) * 0.2 / factors.traits.length;
    });
    maxScore += 10 * 0.2;

    // 归一化到0-100分
    subjectScores[subject] = Math.min(100, Math.round((score / maxScore) * 100));
  });

  // 推荐选科组合
  const mode = '3+1+2'; // 默认3+1+2
  const combinations = subjectCombinations[mode];

  // 计算每个组合的匹配度
  const scoredCombinations = combinations.map(combo => {
    let matchScore = 0;
    combo.subjects.forEach(subject => {
      matchScore += subjectScores[subject] || 0;
    });
    matchScore = Math.round(matchScore / combo.subjects.length);

    return {
      ...combo,
      matchScore,
      subjectScores: combo.subjects.map(s => ({
        subject: s,
        name: subjectNames[s],
        score: subjectScores[s] || 0
      }))
    };
  });

  // 按匹配度排序
  scoredCombinations.sort((a, b) => b.matchScore - a.matchScore);

  // 六维度雷达图数据
  const radarData = {
    labels: ['逻辑思维', '动手能力', '语言表达', '空间想象', '记忆能力', '社交能力'],
    values: [
      Math.min(100, Math.round((traits.logical + abilities.logical) / 8 * 100)),
      Math.min(100, Math.round((traits.practical + abilities.practical) / 8 * 100)),
      Math.min(100, Math.round((traits.verbal + abilities.verbal) / 8 * 100)),
      Math.min(100, Math.round((traits.spatial + abilities.spatial) / 8 * 100)),
      Math.min(100, Math.round((traits.detail + abilities.memory) / 8 * 100)),
      Math.min(100, Math.round((traits.social + abilities.social) / 8 * 100))
    ]
  };

  return {
    subjectScores: Object.keys(subjectScores).map(key => ({
      subject: key,
      name: subjectNames[key],
      score: subjectScores[key]
    })).sort((a, b) => b.score - a.score),
    topCombinations: scoredCombinations.slice(0, 3),
    allCombinations: scoredCombinations,
    radarData,
    traits,
    interests,
    abilities
  };
};

module.exports = {
  assessmentQuestions,
  subjectNames,
  subjectCombinations,
  calculateResult
};
