// data/universities.js
// 大学和专业模拟数据

// 大学列表
const universities = [
  {
    id: 1,
    name: '清华大学',
    shortName: '清华',
    province: '北京',
    level: ['985', '211', '双一流'],
    type: '综合类',
    logo: '',
    description: '清华大学是中国著名高等学府，坐落于北京西北郊风景秀丽的清华园，是中国高层次人才培养和科学技术研究的重要基地。',
    rank: 1,
    admissionScore: 680,
    majorCount: 80
  },
  {
    id: 2,
    name: '北京大学',
    shortName: '北大',
    province: '北京',
    level: ['985', '211', '双一流'],
    type: '综合类',
    logo: '',
    description: '北京大学创立于1898年维新变法之际，初名京师大学堂，是中国近现代第一所国立综合性大学，创办之初也是国家最高教育行政机关。',
    rank: 2,
    admissionScore: 678,
    majorCount: 120
  },
  {
    id: 3,
    name: '复旦大学',
    shortName: '复旦',
    province: '上海',
    level: ['985', '211', '双一流'],
    type: '综合类',
    logo: '',
    description: '复旦大学位于上海，是一所世界知名、国内顶尖的综合性研究型大学。',
    rank: 3,
    admissionScore: 665,
    majorCount: 75
  },
  {
    id: 4,
    name: '上海交通大学',
    shortName: '上海交大',
    province: '上海',
    level: ['985', '211', '双一流'],
    type: '综合类',
    logo: '',
    description: '上海交通大学是我国历史最悠久、享誉海内外的著名高等学府之一，是教育部直属并与上海市共建的全国重点大学。',
    rank: 4,
    admissionScore: 668,
    majorCount: 70
  },
  {
    id: 5,
    name: '浙江大学',
    shortName: '浙大',
    province: '浙江',
    level: ['985', '211', '双一流'],
    type: '综合类',
    logo: '',
    description: '浙江大学是一所历史悠久、声誉卓著的高等学府，坐落于中国历史文化名城杭州。',
    rank: 5,
    admissionScore: 660,
    majorCount: 100
  },
  {
    id: 6,
    name: '南京大学',
    shortName: '南大',
    province: '江苏',
    level: ['985', '211', '双一流'],
    type: '综合类',
    logo: '',
    description: '南京大学是一所历史悠久、声誉卓著的百年名校，其前身是创建于1902年的三江师范学堂。',
    rank: 6,
    admissionScore: 655,
    majorCount: 85
  },
  {
    id: 7,
    name: '中国科学技术大学',
    shortName: '中科大',
    province: '安徽',
    level: ['985', '211', '双一流'],
    type: '理工类',
    logo: '',
    description: '中国科学技术大学是中国科学院所属的一所以前沿科学和高新技术为主，兼有医学、特色管理和人文学科的综合性全国重点大学。',
    rank: 7,
    admissionScore: 662,
    majorCount: 45
  },
  {
    id: 8,
    name: '中国人民大学',
    shortName: '人大',
    province: '北京',
    level: ['985', '211', '双一流'],
    type: '综合类',
    logo: '',
    description: '中国人民大学是中国共产党创办的第一所新型正规大学，是一所以人文社会科学为主的综合性研究型全国重点大学。',
    rank: 8,
    admissionScore: 658,
    majorCount: 80
  },
  {
    id: 9,
    name: '武汉大学',
    shortName: '武大',
    province: '湖北',
    level: ['985', '211', '双一流'],
    type: '综合类',
    logo: '',
    description: '武汉大学是国家教育部直属重点综合性大学，是国家"985工程"和"211工程"重点建设高校，是首批"双一流"建设高校。',
    rank: 9,
    admissionScore: 645,
    majorCount: 120
  },
  {
    id: 10,
    name: '中山大学',
    shortName: '中山',
    province: '广东',
    level: ['985', '211', '双一流'],
    type: '综合类',
    logo: '',
    description: '中山大学由孙中山先生创办，有着一百多年办学传统，是直属教育部的综合性研究型大学。',
    rank: 10,
    admissionScore: 640,
    majorCount: 130
  },
  {
    id: 11,
    name: '华中科技大学',
    shortName: '华科',
    province: '湖北',
    level: ['985', '211', '双一流'],
    type: '理工类',
    logo: '',
    description: '华中科技大学是国家教育部直属重点综合性大学，由原华中理工大学、同济医科大学、武汉城市建设学院于2000年5月26日合并成立。',
    rank: 11,
    admissionScore: 638,
    majorCount: 100
  },
  {
    id: 12,
    name: '西安交通大学',
    shortName: '西交',
    province: '陕西',
    level: ['985', '211', '双一流'],
    type: '理工类',
    logo: '',
    description: '西安交通大学是我国最早兴办、享誉海内外的著名高等学府，是国家教育部直属重点大学。',
    rank: 12,
    admissionScore: 635,
    majorCount: 90
  },
  {
    id: 13,
    name: '哈尔滨工业大学',
    shortName: '哈工大',
    province: '黑龙江',
    level: ['985', '211', '双一流'],
    type: '理工类',
    logo: '',
    description: '哈尔滨工业大学隶属于工业和信息化部，以理工为主，理工管文经法艺等多学科协调发展。',
    rank: 13,
    admissionScore: 632,
    majorCount: 85
  },
  {
    id: 14,
    name: '北京航空航天大学',
    shortName: '北航',
    province: '北京',
    level: ['985', '211', '双一流'],
    type: '理工类',
    logo: '',
    description: '北京航空航天大学是新中国第一所航空航天高等学府，现隶属于工业和信息化部。',
    rank: 14,
    admissionScore: 650,
    majorCount: 60
  },
  {
    id: 15,
    name: '同济大学',
    shortName: '同济',
    province: '上海',
    level: ['985', '211', '双一流'],
    type: '综合类',
    logo: '',
    description: '同济大学是历史悠久、享有盛誉的中国著名高等学府，是国家"211工程"、"985工程"重点建设高校。',
    rank: 15,
    admissionScore: 642,
    majorCount: 80
  },
  {
    id: 16,
    name: '四川大学',
    shortName: '川大',
    province: '四川',
    level: ['985', '211', '双一流'],
    type: '综合类',
    logo: '',
    description: '四川大学是教育部直属全国重点大学，是国家布局在中国西部的重点建设的高水平研究型综合大学。',
    rank: 16,
    admissionScore: 625,
    majorCount: 130
  },
  {
    id: 17,
    name: '华南理工大学',
    shortName: '华工',
    province: '广东',
    level: ['985', '211', '双一流'],
    type: '理工类',
    logo: '',
    description: '华南理工大学地处广州，是直属教育部的全国重点大学，校园分为五山校区、大学城校区和广州国际校区。',
    rank: 17,
    admissionScore: 618,
    majorCount: 75
  },
  {
    id: 18,
    name: '北京师范大学',
    shortName: '北师大',
    province: '北京',
    level: ['985', '211', '双一流'],
    type: '师范类',
    logo: '',
    description: '北京师范大学是教育部直属重点大学，是一所以教师教育、教育科学和文理基础学科为主要特色的著名学府。',
    rank: 18,
    admissionScore: 640,
    majorCount: 70
  },
  {
    id: 19,
    name: '南开大学',
    shortName: '南开',
    province: '天津',
    level: ['985', '211', '双一流'],
    type: '综合类',
    logo: '',
    description: '南开大学是国家教育部直属重点综合性大学，是敬爱的周恩来总理的母校。',
    rank: 19,
    admissionScore: 638,
    majorCount: 80
  },
  {
    id: 20,
    name: '山东大学',
    shortName: '山大',
    province: '山东',
    level: ['985', '211', '双一流'],
    type: '综合类',
    logo: '',
    description: '山东大学是一所历史悠久、学科齐全、学术实力雄厚、办学特色鲜明，在国内外具有重要影响的教育部直属重点综合性大学。',
    rank: 20,
    admissionScore: 615,
    majorCount: 110
  },
  {
    id: 21,
    name: '暨南大学',
    shortName: '暨大',
    province: '广东',
    level: ['211', '双一流'],
    type: '综合类',
    logo: '',
    description: '暨南大学是中国第一所由政府创办的华侨学府，是国务院侨办、教育部、广东省共建的"211工程"重点综合性大学。',
    rank: 50,
    admissionScore: 580,
    majorCount: 95
  },
  {
    id: 22,
    name: '深圳大学',
    shortName: '深大',
    province: '广东',
    level: ['双一流'],
    type: '综合类',
    logo: '',
    description: '深圳大学1983年经国家教育部批准设立，是深圳经济特区的第一所综合性大学。',
    rank: 68,
    admissionScore: 570,
    majorCount: 90
  },
  {
    id: 23,
    name: '华南师范大学',
    shortName: '华师',
    province: '广东',
    level: ['211', '双一流'],
    type: '师范类',
    logo: '',
    description: '华南师范大学始建于1933年，前身是广东省立勷勤大学师范学院，是国家"211工程"重点建设大学。',
    rank: 70,
    admissionScore: 575,
    majorCount: 85
  },
  {
    id: 24,
    name: '广东工业大学',
    shortName: '广工',
    province: '广东',
    level: [],
    type: '理工类',
    logo: '',
    description: '广东工业大学是一所以工为主、工理经管文法艺结合、多科性协调发展的省属重点大学。',
    rank: 100,
    admissionScore: 540,
    majorCount: 80
  },
  {
    id: 25,
    name: '广州大学',
    shortName: '广大',
    province: '广东',
    level: [],
    type: '综合类',
    logo: '',
    description: '广州大学是以国家重要中心城市"广州"命名的综合性大学，是广东省高水平大学重点建设高校。',
    rank: 120,
    admissionScore: 535,
    majorCount: 90
  }
];

// 专业列表
const majors = [
  // 工学类
  { id: 1, name: '计算机科学与技术', category: '工学', majorClass: '计算机类', degree: '工学学士', duration: 4,
    description: '本专业培养具备良好的科学素养，系统地掌握计算机科学与技术的基本理论、基本知识和基本技能与方法，能在科研部门、教育单位、企业、事业、技术和行政管理部门等单位从事计算机教学、科学研究和应用的计算机科学与技术学科的高级专门科学技术人才。',
    employmentRate: 94.5, avgSalary: 15000, subjectRequirements: ['物理', '化学'] },
  { id: 2, name: '软件工程', category: '工学', majorClass: '计算机类', degree: '工学学士', duration: 4,
    description: '软件工程专业以计算机科学与技术学科为基础，强调软件开发的工程性，培养能够从事软件开发、测试、维护和软件项目管理的高级专门人才。',
    employmentRate: 95.2, avgSalary: 16000, subjectRequirements: ['物理', '化学'] },
  { id: 3, name: '电子信息工程', category: '工学', majorClass: '电子信息类', degree: '工学学士', duration: 4,
    description: '电子信息工程是一门应用计算机等现代化技术进行电子信息控制和信息处理的学科，主要研究信息的获取与处理，电子设备与信息系统的设计、开发、应用和集成。',
    employmentRate: 92.8, avgSalary: 12000, subjectRequirements: ['物理', '化学'] },
  { id: 4, name: '机械工程', category: '工学', majorClass: '机械类', degree: '工学学士', duration: 4,
    description: '机械工程专业是以有关的自然科学和技术科学为理论基础，结合生产实践中的技术经验，研究和解决在开发、设计、制造、安装、运用和修理各种机械中的全部理论和实际问题的应用学科。',
    employmentRate: 90.5, avgSalary: 9000, subjectRequirements: ['物理', '化学'] },
  { id: 5, name: '土木工程', category: '工学', majorClass: '土木类', degree: '工学学士', duration: 4,
    description: '土木工程专业培养掌握各类土木工程学科的基本理论和基本知识，能在房屋建筑、地下建筑、道路、隧道、桥梁建筑、水电站、港口及近海结构与设施、给水排水和地基处理等领域从事规划、设计、施工、管理和研究工作的高级工程技术人才。',
    employmentRate: 88.6, avgSalary: 8500, subjectRequirements: ['物理', '化学'] },
  { id: 6, name: '建筑学', category: '工学', majorClass: '建筑类', degree: '建筑学学士', duration: 5,
    description: '建筑学专业培养具备建筑设计、城市设计、室内设计等方面的知识，能在设计部门从事设计工作，并具有多种职业适应能力的通用型、复合型高级工程技术人才。',
    employmentRate: 85.3, avgSalary: 10000, subjectRequirements: ['物理', '化学'] },
  { id: 7, name: '人工智能', category: '工学', majorClass: '电子信息类', degree: '工学学士', duration: 4,
    description: '人工智能专业是中国高校人才计划设立的专业，旨在培养中国人工智能产业的应用型人才，推动人工智能一级学科建设。',
    employmentRate: 96.8, avgSalary: 18000, subjectRequirements: ['物理', '化学'] },
  { id: 8, name: '电气工程及其自动化', category: '工学', majorClass: '电气类', degree: '工学学士', duration: 4,
    description: '电气工程及其自动化专业培养能够从事与电气工程有关的系统运行、自动控制、电力电子技术、信息处理、试验分析、研制开发、经济管理以及电子与计算机技术应用等领域工作的宽口径"复合型"高级工程技术人才。',
    employmentRate: 93.2, avgSalary: 10500, subjectRequirements: ['物理', '化学'] },
  // 理学类
  { id: 9, name: '数学与应用数学', category: '理学', majorClass: '数学类', degree: '理学学士', duration: 4,
    description: '数学与应用数学专业培养掌握数学科学的基本理论与基本方法，具备运用数学知识、使用计算机解决实际问题的能力，受到科学研究的初步训练的高级专门人才。',
    employmentRate: 85.6, avgSalary: 9500, subjectRequirements: ['物理', '化学'] },
  { id: 10, name: '物理学', category: '理学', majorClass: '物理学类', degree: '理学学士', duration: 4,
    description: '物理学专业培养掌握物理学的基本理论与方法，具有良好的数学基础和实验技能，能在物理学或相关的科学技术领域中从事科研、教学、技术和相关的管理工作的高级专门人才。',
    employmentRate: 80.2, avgSalary: 8000, subjectRequirements: ['物理', '化学'] },
  { id: 11, name: '化学', category: '理学', majorClass: '化学类', degree: '理学学士', duration: 4,
    description: '化学专业培养具备化学的基础知识、基本理论和基本技能，能在化学及与化学相关的科学技术和其它领域从事科研、教学技术及相关管理工作的高级专门人才。',
    employmentRate: 82.4, avgSalary: 7500, subjectRequirements: ['物理', '化学'] },
  { id: 12, name: '生物科学', category: '理学', majorClass: '生物科学类', degree: '理学学士', duration: 4,
    description: '生物科学专业培养具备生物科学的基本理论、基本知识和较强的实验技能，能在科研机构、高等学校及企事业单位等从事科学研究、教学工作及管理工作的生物科学高级专门人才。',
    employmentRate: 78.9, avgSalary: 7000, subjectRequirements: ['物理', '化学', '生物'] },
  // 医学类
  { id: 13, name: '临床医学', category: '医学', majorClass: '临床医学类', degree: '医学学士', duration: 5,
    description: '临床医学专业是一门实践性很强的应用科学专业，致力于培养具备基础医学、临床医学的基本理论和医疗预防的基本技能，能在医疗卫生单位、医学科研等部门从事医疗及预防、医学科研等方面工作的医学高级专门人才。',
    employmentRate: 92.3, avgSalary: 12000, subjectRequirements: ['物理', '化学', '生物'] },
  { id: 14, name: '口腔医学', category: '医学', majorClass: '口腔医学类', degree: '医学学士', duration: 5,
    description: '口腔医学专业学生主要学习口腔医学的基本理论和基本知识，受到口腔及颌面部疾病的诊断、治疗、预防方面的训练，具有口腔常见病、多发病的诊疗、修复和预防保健的基本能力。',
    employmentRate: 95.1, avgSalary: 15000, subjectRequirements: ['物理', '化学', '生物'] },
  { id: 15, name: '护理学', category: '医学', majorClass: '护理学类', degree: '理学学士', duration: 4,
    description: '护理学专业培养具备人文社会科学、医学、预防保健的基本知识及护理学的基本理论知识和技能，能在护理领域内从事临床护理、预防保健、护理管理、护理教学和护理科研的高级专门人才。',
    employmentRate: 96.5, avgSalary: 7000, subjectRequirements: ['化学', '生物'] },
  // 经济学类
  { id: 16, name: '经济学', category: '经济学', majorClass: '经济学类', degree: '经济学学士', duration: 4,
    description: '经济学专业培养具备比较扎实的经济学理论基础，熟悉现代经济学理论，比较熟练地掌握现代经济分析方法，知识面较宽，具有向经济学相关领域扩展渗透的能力的专门人才。',
    employmentRate: 86.7, avgSalary: 11000, subjectRequirements: ['物理', '历史'] },
  { id: 17, name: '金融学', category: '经济学', majorClass: '金融学类', degree: '经济学学士', duration: 4,
    description: '金融学专业培养系统掌握金融基本理论、基本知识、基本技能，具备能进行金融实际业务操作和金融风险防范、化解金融风险的基本素质和能力的复合型金融人才。',
    employmentRate: 89.2, avgSalary: 13000, subjectRequirements: ['物理', '历史'] },
  { id: 18, name: '国际经济与贸易', category: '经济学', majorClass: '经济与贸易类', degree: '经济学学士', duration: 4,
    description: '国际经济与贸易专业培养适应中国经济与社会发展需要，了解现代国际经济与贸易环境和发展现状，熟悉通行的国际贸易规则、法律与惯例的应用型、复合型人才。',
    employmentRate: 85.4, avgSalary: 9500, subjectRequirements: ['物理', '历史'] },
  // 管理学类
  { id: 19, name: '工商管理', category: '管理学', majorClass: '工商管理类', degree: '管理学学士', duration: 4,
    description: '工商管理专业培养具备管理、经济、法律及企业管理方面的知识和能力，能在企、事业单位及政府部门从事管理以及教学、科研方面工作的工商管理学科高级专门人才。',
    employmentRate: 88.3, avgSalary: 9000, subjectRequirements: ['物理', '历史'] },
  { id: 20, name: '会计学', category: '管理学', majorClass: '工商管理类', degree: '管理学学士', duration: 4,
    description: '会计学专业培养具备管理、经济、法律和会计学等方面的知识和能力，能在企、事业单位及政府部门从事会计实务以及教学、科研方面工作的工商管理学科高级专门人才。',
    employmentRate: 91.5, avgSalary: 8500, subjectRequirements: ['物理', '历史'] },
  { id: 21, name: '人力资源管理', category: '管理学', majorClass: '工商管理类', degree: '管理学学士', duration: 4,
    description: '人力资源管理专业培养具备管理、经济、法律及人力资源管理等方面的知识和能力，能在事业单位及政府部门从事人力资源管理以及教学、科研方面工作的工商管理学科专门人才。',
    employmentRate: 89.8, avgSalary: 8000, subjectRequirements: ['物理', '历史'] },
  // 法学类
  { id: 22, name: '法学', category: '法学', majorClass: '法学类', degree: '法学学士', duration: 4,
    description: '法学专业培养系统掌握法学知识，熟悉我国法律和党的相关政策，能在国家机关、企事业单位和社会团体、特别是能在立法机关、行政机关、检察机关、审判机关、仲裁机构和法律服务机构从事法律工作的高级专门人才。',
    employmentRate: 82.1, avgSalary: 10000, subjectRequirements: ['历史', '政治'] },
  { id: 23, name: '知识产权', category: '法学', majorClass: '法学类', degree: '法学学士', duration: 4,
    description: '知识产权专业培养能在律师事务所、专利事务所、商标事务所等从事商标代理、专利代理等专门知识产权事务的专门人才。',
    employmentRate: 85.6, avgSalary: 11000, subjectRequirements: ['物理', '历史'] },
  // 文学类
  { id: 24, name: '汉语言文学', category: '文学', majorClass: '中国语言文学类', degree: '文学学士', duration: 4,
    description: '汉语言文学专业培养具备文艺理论素养和系统的汉语言文学知识，能在新闻文艺出版部门、高校、科研机构和机关企事业单位从事文学评论、汉语言文学教学与研究工作的人才。',
    employmentRate: 84.3, avgSalary: 7500, subjectRequirements: ['历史', '政治'] },
  { id: 25, name: '新闻学', category: '文学', majorClass: '新闻传播学类', degree: '文学学士', duration: 4,
    description: '新闻学专业培养具备系统的新闻理论知识与技能、宽广的文化与科学知识，熟悉我国新闻、宣传政策法规，能在新闻、出版与宣传部门从事编辑、记者与管理等工作的新闻学高级专门人才。',
    employmentRate: 83.7, avgSalary: 8500, subjectRequirements: ['历史', '政治'] },
  { id: 26, name: '英语', category: '文学', majorClass: '外国语言文学类', degree: '文学学士', duration: 4,
    description: '英语专业培养具有扎实的英语语言基础和比较广泛的科学文化知识，能在外事、经贸、文化、新闻出版、教育、科研、旅游等部门从事翻译、研究、教学、管理工作的英语高级专门人才。',
    employmentRate: 87.2, avgSalary: 8000, subjectRequirements: ['历史', '政治'] },
  // 历史学类
  { id: 27, name: '历史学', category: '历史学', majorClass: '历史学类', degree: '历史学学士', duration: 4,
    description: '历史学专业培养具有一定的马克思主义基本理论素养和系统的专业基本知识，有进一步培养潜能的史学专门人才，以及能在国家机关、文教事业、新闻出版、文博档案及各类企事业单位从事实际工作的应用型、复合型高级专门人才。',
    employmentRate: 75.8, avgSalary: 6500, subjectRequirements: ['历史', '政治'] },
  { id: 28, name: '考古学', category: '历史学', majorClass: '历史学类', degree: '历史学学士', duration: 4,
    description: '考古学专业培养具备考古学基础知识与基本技能，有进一步培养潜能的高层次专门人才和能在考古、文物、博物馆等事业单位及国家机关从事研究、教学、管理等实际工作的考古学高级专门人才。',
    employmentRate: 70.2, avgSalary: 7000, subjectRequirements: ['历史', '政治'] },
  // 教育学类
  { id: 29, name: '教育学', category: '教育学', majorClass: '教育学类', degree: '教育学学士', duration: 4,
    description: '教育学专业培养具有良好思想道德品质、较高教育理论素养和较强教育实际工作能力的中、高等师范院校师资、中小学校教育科研人员、教育科学研究单位研究人员、各级教育行政管理人员和其他教育工作者。',
    employmentRate: 85.1, avgSalary: 7000, subjectRequirements: ['历史', '政治'] },
  { id: 30, name: '应用心理学', category: '教育学', majorClass: '心理学类', degree: '理学学士', duration: 4,
    description: '应用心理学专业培养具备心理学的基本理论、基本知识、基本技能，能在教育、工程设计部门、工商企业、医疗、司法、行政管理等部门从事教学、管理、咨询与治疗、技术开发等工作的高级专门人才。',
    employmentRate: 82.6, avgSalary: 8000, subjectRequirements: ['物理', '生物', '历史'] }
];

// 大学-专业关联数据（选科要求）
const universityMajors = [];
universities.forEach(uni => {
  const majorCount = Math.min(uni.majorCount, majors.length);
  const selectedMajors = majors.slice(0, majorCount);
  selectedMajors.forEach(major => {
    // 随机生成选科要求
    let requirements;
    if (major.category === '工学' || major.category === '理学') {
      requirements = ['物理', '化学'];
    } else if (major.category === '医学') {
      requirements = ['物理', '化学', '生物'];
    } else if (major.category === '法学' || major.category === '历史学' || major.category === '文学') {
      requirements = ['历史', '政治'];
    } else {
      requirements = ['物理', '历史'];
    }

    universityMajors.push({
      universityId: uni.id,
      universityName: uni.name,
      majorId: major.id,
      majorName: major.name,
      majorCategory: major.category,
      subjectRequirements: requirements,
      admissionScore: Math.round(uni.admissionScore + (Math.random() - 0.5) * 40),
      admissionRank: Math.round(uni.rank * 1000 + Math.random() * 5000),
      enrollment: Math.round(50 + Math.random() * 150)
    });
  });
});

// 历年录取分数线数据
const generateHistoryScores = (baseScore) => {
  const years = [2023, 2022, 2021, 2020, 2019];
  return years.map((year, index) => {
    const variation = (Math.random() - 0.5) * 20;
    return {
      year,
      minScore: Math.round(baseScore - 10 + variation),
      avgScore: Math.round(baseScore + variation),
      maxScore: Math.round(baseScore + 15 + variation),
      admissionCount: Math.round(80 + Math.random() * 60)
    };
  });
};

// 知识库文章
const knowledgeArticles = [
  {
    id: 1,
    title: '新高考"3+1+2"选科模式全面解读',
    category: '政策解读',
    author: '选科助手编辑部',
    publishTime: '2026-01-15',
    views: 12580,
    summary: '详细解读新高考3+1+2选科模式的政策背景、科目设置、赋分规则以及选科建议。',
    content: '## 什么是"3+1+2"模式\n\n"3"为全国统考科目语文、数学、外语，所有学生必考；\n\n"1"为首选科目，考生须在高中学业水平选择性考试的物理、历史科目中选择1科；\n\n"2"为再选科目，考生可在化学、生物、思想政治、地理4个科目中选择2科。\n\n## 赋分规则\n\n### 等级赋分制\n\n再选科目（化学、生物、政治、地理）采用等级赋分制，按考生原始成绩排名划分为A、B、C、D、E五个等级，各等级人数所占比例约为15%、35%、35%、13%和2%。\n\n### 赋分公式\n\n$$Y\' = \\frac{(Y2 - Y)}{(Y - Y1)} \\times (X - X1) + X1$$\n\n其中：\n- Y表示原始分\n- Y1、Y2分别表示原始分区间的下限和上限\n- X1、X2分别表示等级分区间的下限和上限\n- Y\'表示等级分\n\n## 选科建议\n\n1. **以兴趣和特长为基础**：选择自己擅长且感兴趣的科目\n2. **考虑专业覆盖率**：物理+化学组合专业覆盖率最高\n3. **结合未来职业规划**：想清楚未来想从事什么行业\n4. **参考学校教学资源**：选择学校师资力量强的科目',
    isVip: false
  },
  {
    id: 2,
    title: '选科必看！10大常见误区盘点',
    category: '选科误区',
    author: '张老师',
    publishTime: '2026-01-10',
    views: 9860,
    summary: '盘点高中生选科最容易陷入的10大误区，帮你避开选科陷阱。',
    content: '## 误区一：物理必须成绩好才能选\n\n很多同学认为物理难学、成绩不好就不能选物理。实际上，选不选物理主要看你未来的专业方向，而不是当前成绩。很多专业要求必选物理，即使你物理成绩一般，但如果未来想学理工科，物理是必须的。\n\n## 误区二：选文科就一定容易考大学\n\n很多人认为文科简单，容易拿高分。实际上，文科虽然学习难度相对较低，但竞争同样激烈，而且专业覆盖率远低于理科组合。\n\n## 误区三：盲目跟风选科\n\n看到身边同学选什么自己就选什么，这是选科的大忌。每个人的兴趣、能力、职业规划都不同，适合别人的不一定适合你。\n\n## 误区四：只看眼前成绩不看潜力\n\n高一的成绩并不能完全代表高三的水平。有些科目入门难，但后期提升空间大；有些科目入门容易，但想要拿高分很难。\n\n## 误区五：文科就业难，理科就业好\n\n这种说法过于绝对。文科也有很多就业前景好的专业，比如法学、金融、新闻传播等。关键还是看个人能力和兴趣。\n\n## 误区六：选科就是为了高考\n\n选科不仅影响高考，更影响未来大学专业选择和职业发展方向。应该从长远考虑，而不仅仅是为了高考分数。',
    isVip: false
  },
  {
    id: 3,
    title: '各省新高考选科政策对比汇总',
    category: '政策解读',
    author: '选科助手编辑部',
    publishTime: '2026-01-08',
    views: 8520,
    summary: '汇总全国各省份新高考改革进度和选科政策，方便不同省份的学生参考。',
    content: '## 已实施新高考的省份\n\n### 第一批（2014年启动，2017年高考）\n- **浙江**：3+3模式，7选3（含技术）\n- **上海**：3+3模式，6选3\n\n### 第二批（2017年启动，2020年高考）\n- **北京**：3+3模式\n- **天津**：3+3模式\n- **山东**：3+3模式\n- **海南**：3+3模式\n\n### 第三批（2018年启动，2021年高考）\n- **河北**：3+1+2模式\n- **辽宁**：3+1+2模式\n- **江苏**：3+1+2模式\n- **福建**：3+1+2模式\n- **湖北**：3+1+2模式\n- **湖南**：3+1+2模式\n- **广东**：3+1+2模式\n- **重庆**：3+1+2模式\n\n### 第四批（2021年启动，2024年高考）\n- **甘肃**：3+1+2模式\n- **黑龙江**：3+1+2模式\n- **吉林**：3+1+2模式\n- **安徽**：3+1+2模式\n- **江西**：3+1+2模式\n- **广西**：3+1+2模式\n- **贵州**：3+1+2模式\n\n### 第五批（2022年启动，2025年高考）\n- **山西**：3+1+2模式\n- **河南**：3+1+2模式\n- **陕西**：3+1+2模式\n- **内蒙古**：3+1+2模式\n- **四川**：3+1+2模式\n- **云南**：3+1+2模式\n- **宁夏**：3+1+2模式\n- **青海**：3+1+2模式\n- **新疆**：3+1+2模式\n- **西藏**：3+1+2模式',
    isVip: true
  },
  {
    id: 4,
    title: '高一选科时间线与规划指南',
    category: '时间规划',
    author: '李老师',
    publishTime: '2026-01-05',
    views: 7680,
    summary: '从高一上学期到高二选科的完整时间规划，告诉你每个阶段该做什么。',
    content: '## 高一上学期：探索期\n\n### 9-10月：适应高中生活\n- 适应高中学习节奏和各科难度\n- 初步了解各学科特点\n- 不要急于做决定\n\n### 11-12月：自我探索\n- 关注自己对各科的兴趣程度\n- 记录各科学习感受\n- 开始思考未来职业方向\n\n### 1月：期末考试后评估\n- 根据期末成绩评估各科优势\n- 初步筛选2-3个备选组合\n- 和家长、老师沟通\n\n## 高一下学期：尝试期\n\n### 2-3月：深入体验\n- 对备选组合的科目重点关注\n- 参加学科兴趣小组或竞赛\n- 了解各科目高考内容\n\n### 4-5月：数据收集\n- 了解目标专业的选科要求\n- 研究各组合的专业覆盖率\n- 参考学长学姐的经验\n\n### 6月：期末评估\n- 根据高一全年成绩综合评估\n- 确定1-2个首选组合\n- 暑假提前预习相关科目\n\n## 高二上学期：决策期\n\n### 9月：最终确认\n- 开学后根据学校安排确定选科\n- 进入选科班学习\n- 制定高中学习规划',
    isVip: false
  },
  {
    id: 5,
    title: '家长如何科学指导孩子选科？',
    category: '家长指南',
    author: '王教授',
    publishTime: '2026-01-03',
    views: 6540,
    summary: '给家长的选科指导建议，如何帮助孩子做出正确的选科决策。',
    content: '## 一、摆正心态，尊重孩子选择\n\n很多家长喜欢把自己的意愿强加给孩子，这是选科最大的忌讳。选科的主体是孩子，家长的角色是引导者和参谋，而不是决策者。\n\n## 二、帮助孩子认识自己\n\n1. **兴趣探索**：观察孩子平时喜欢什么，做什么事情最专注\n2. **能力评估**：客观分析孩子的各科学习能力\n3. **性格特点**：不同性格适合不同的专业方向\n\n## 三、提供信息，而非替做决定\n\n家长可以帮助孩子收集信息，包括：\n- 各专业的就业前景\n- 各大学的选科要求\n- 不同选科组合的利弊\n- 行业发展趋势\n\n## 四、避免的几个雷区\n\n### ❌ 雷区一：盲目追求热门专业\n热门专业不等于好就业，也不一定适合你的孩子。\n\n### ❌ 雷区二：只看分数不看兴趣\n兴趣是最好的老师，没有兴趣很难在一个领域长期发展。\n\n### ❌ 雷区三：攀比心理\n不要拿别人家的孩子做比较，每个孩子都有自己的特点。\n\n### ❌ 雷区四：把自己的遗憾强加给孩子\n家长年轻时没有实现的梦想，不一定要让孩子去完成。',
    isVip: false
  },
  {
    id: 6,
    title: '物理+化学+生物：经典理科组合深度分析',
    category: '组合分析',
    author: '陈老师',
    publishTime: '2026-01-01',
    views: 5890,
    summary: '深度分析物化生组合的优劣势、适合人群、专业选择和学习建议。',
    content: '## 组合概况\n\n物理+化学+生物，简称"物化生"，是传统的大理科组合，也是所有组合中专业覆盖率最高的组合之一，可报专业比例超过96%。\n\n## 优势分析\n\n### 1. 专业覆盖率最高\n几乎所有理工科专业都可以报考，包括最热门的计算机、临床医学、电子信息等。\n\n### 2. 学科关联性强\n理化生三科同属理科，学习思路和方法有很多共通之处，可以互相促进。\n\n### 3. 选择面广\n未来考研、就业选择面都很广，转行也相对容易。\n\n## 劣势分析\n\n### 1. 学习难度大\n三科都是理科中难度较大的科目，对逻辑思维和计算能力要求高。\n\n### 2. 竞争激烈\n学霸扎堆选这个组合，赋分竞争非常激烈，中等生可能吃亏。\n\n### 3. 学习负担重\n三科都需要大量刷题和练习，学习时间投入大。\n\n## 适合人群\n\n1. 理科成绩优秀，逻辑思维能力强\n2. 目标是理工科专业，尤其是顶尖院校\n3. 动手能力强，喜欢做实验\n4. 未来想从事医学、工程、科研等方向\n\n## 学习建议\n\n### 物理\n- 重视基础概念和公式的理解\n- 多做经典题型，总结解题方法\n- 建立物理思维，学会建模\n\n### 化学\n- 掌握元素周期律和化学反应原理\n- 熟记化学方程式和实验现象\n- 多做推断题和计算题\n\n### 生物\n- 构建知识网络，注意知识点的联系\n- 重视课本，关注细节\n- 适当刷题，提高解题速度',
    isVip: true
  }
];

// 学长学姐案例
const seniorCases = [
  {
    id: 1,
    name: '小明（化名）',
    province: '广东',
    subjectCombination: '物理+化学+生物',
    scoreLevel: '高分段（650+）',
    university: '清华大学',
    major: '计算机科学与技术',
    story: '我高一的时候其实各科都还不错，没有特别偏科。当时纠结了很久要不要选纯理，因为听说竞争很激烈。后来想清楚了，我就是想学计算机，那物化生是必须的。\n\n选科之后确实压力很大，身边都是学霸。但我觉得选对了方向，学起来有动力。高三的时候成绩稳步提升，最后考上了清华计算机系。\n\n现在回头看，我觉得选科最重要的是想清楚自己要什么。不要怕竞争，有压力才有动力。',
    advice: '如果你确定了要走理工科道路，物化生是最好的选择。不要因为怕竞争就退缩，关键是提升自己的实力。',
    currentStatus: '大四，已保送研究生，研究方向为人工智能'
  },
  {
    id: 2,
    name: '小红（化名）',
    province: '浙江',
    subjectCombination: '历史+地理+政治',
    scoreLevel: '中分段（580-620）',
    university: '某211高校',
    major: '法学',
    story: '我从小就喜欢文科，特别是历史和政治。虽然很多人说文科就业难，但我觉得兴趣最重要。\n\n选了全文科之后，学习压力确实比理科小一些，但要考高分也不容易。特别是文综大题，需要很强的分析能力和知识积累。\n\n高考我考了600多分，上了一所211的法学专业。现在大三了，正在准备法考。虽然学法律也挺辛苦的，但我觉得很适合我。',
    advice: '选文科不要抱着"偷懒"的心态，文科想考好同样需要付出很多努力。关键是要真的喜欢，并且对未来有清晰的规划。',
    currentStatus: '大三，正在准备国家统一法律职业资格考试'
  },
  {
    id: 3,
    name: '小华（化名）',
    province: '山东',
    subjectCombination: '物理+化学+地理',
    scoreLevel: '中高分段（620-650）',
    university: '某985高校',
    major: '建筑学',
    story: '我物理化学都不错，但是生物不太好。一开始想选物化生，后来发现生物学起来很吃力，就换成了地理。\n\n地理这个科目挺特殊的，说是文科，但其实需要理科思维。我觉得地理比生物学起来轻松一些，而且我也挺喜欢的。\n\n最后我考上了建筑系，正好物理和地理都能用上。建筑设计需要空间想象能力，地理学的好对建筑设计也有帮助。',
    advice: '选科不一定非要选传统组合，适合自己的才是最好的。地理是个被低估的科目，很多专业都用得上。',
    currentStatus: '大五（建筑学五年制），正在设计院实习'
  },
  {
    id: 4,
    name: '小丽（化名）',
    province: '江苏',
    subjectCombination: '物理+生物+地理',
    scoreLevel: '中分段（560-600）',
    university: '某医科大学',
    major: '护理学',
    story: '我一直想学医，但是化学成绩不好。当时很纠结，因为很多医学院校要求必选化学。\n\n后来我查了很多学校的招生要求，发现有些学校的护理专业只要求物理和生物。于是我选了物生地组合。\n\n虽然最后学的是护理，不是临床，但我觉得也挺好的。护理专业就业率很高，而且我也挺喜欢照顾人的。',
    advice: '如果想学医但化学不好，可以考虑护理、药学等相关专业。条条大路通罗马，不一定要挤临床的独木桥。',
    currentStatus: '大二，成绩专业前10%，计划考研'
  },
  {
    id: 5,
    name: '小强（化名）',
    province: '湖北',
    subjectCombination: '物理+化学+政治',
    scoreLevel: '高分段（640-670）',
    university: '中国人民大学',
    major: '金融学',
    story: '我理科成绩不错，但又对经济金融感兴趣。一开始想选物化生，后来发现金融专业对选科要求不高，就加了一门政治。\n\n政治这门课对我来说挺新鲜的，学了之后发现挺有意思的，特别是经济学部分。\n\n高考我发挥不错，考上了人大金融学。现在回头看，选政治真是明智之举，大学学政治经济学的时候轻松多了。',
    advice: '如果未来想学经济、金融、管理等专业，选政治是个不错的选择。而且政治对考研也很有帮助。',
    currentStatus: '大三，已拿到头部券商实习offer'
  }
];

module.exports = {
  universities,
  majors,
  universityMajors,
  generateHistoryScores,
  knowledgeArticles,
  seniorCases
};
