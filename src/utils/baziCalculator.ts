import { BaziResult, BaziPillar, DateInput, LuckPeriod, TenGodDetail, DestinyPattern, RemedyAdvice } from '../types/bazi';

// 天干 (Heavenly Stems)
const HEAVENLY_STEMS = [
  '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'
];

// 地支 (Earthly Branches)
const EARTHLY_BRANCHES = [
  '子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'
];

// 五行 (Five Elements)
const STEM_ELEMENTS: { [key: string]: string } = {
  '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
  '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水'
};

const BRANCH_ELEMENTS: { [key: string]: string } = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土', '巳': '火',
  '午': '火', '未': '土', '申': '金', '酉': '金', '戌': '土', '亥': '水'
};

// 阴阳属性
const STEM_YIN_YANG: { [key: string]: 'yin' | 'yang' } = {
  '甲': 'yang', '乙': 'yin', '丙': 'yang', '丁': 'yin', '戊': 'yang',
  '己': 'yin', '庚': 'yang', '辛': 'yin', '壬': 'yang', '癸': 'yin'
};

const BRANCH_YIN_YANG: { [key: string]: 'yin' | 'yang' } = {
  '子': 'yang', '丑': 'yin', '寅': 'yang', '卯': 'yin', '辰': 'yang', '巳': 'yin',
  '午': 'yang', '未': 'yin', '申': 'yang', '酉': 'yin', '戌': 'yang', '亥': 'yin'
};

// 十神关系
const TEN_GODS: { [key: string]: { [key: string]: string } } = {
  '木': {
    '木': '比肩', '火': '食神', '土': '偏财', '金': '七杀', '水': '正印'
  },
  '火': {
    '木': '正印', '火': '比肩', '土': '食神', '金': '偏财', '水': '七杀'
  },
  '土': {
    '木': '七杀', '火': '正印', '土': '比肩', '金': '食神', '水': '偏财'
  },
  '金': {
    '木': '偏财', '火': '七杀', '土': '正印', '金': '比肩', '水': '食神'
  },
  '水': {
    '木': '食神', '火': '偏财', '土': '七杀', '金': '正印', '水': '比肩'
  }
};

// 十神详细信息
const TEN_GODS_DETAILS: { [key: string]: Omit<TenGodDetail, 'positions'> } = {
  '正官': {
    name: '正官',
    meaning: '代表权威、地位、名声、责任感，象征正统的管理能力',
    personality: ['正直守法', '有责任感', '重视名誉', '循规蹈矩', '具有领导才能'],
    career: ['政府公务员', '企业管理者', '法官律师', '教师教授', '医生'],
    relationships: ['重视婚姻', '夫妻关系稳定', '对配偶要求较高', '家庭责任感强'],
    strengths: ['品格高尚', '做事有原则', '受人尊敬', '事业稳定发展'],
    weaknesses: ['过于保守', '缺乏创新', '压力较大', '有时过于严肃'],
    advice: ['适当放松心态', '培养创新思维', '学会灵活变通', '注意工作与生活平衡']
  },
  '七杀': {
    name: '七杀',
    meaning: '代表权威、压力、挑战、竞争，象征非正统的权力和魄力',
    personality: ['果断坚毅', '有魄力', '不怕挑战', '竞争意识强', '有时急躁'],
    career: ['军警武职', '企业家', '销售经理', '竞技体育', '外科医生'],
    relationships: ['感情激烈', '占有欲强', '容易产生冲突', '需要理解包容'],
    strengths: ['执行力强', '能在困境中突破', '有开拓精神', '适应能力强'],
    weaknesses: ['容易冲动', '人际关系紧张', '压力过大', '有时过于强势'],
    advice: ['学会控制情绪', '培养耐心', '改善人际关系', '适当释放压力']
  },
  '正印': {
    name: '正印',
    meaning: '代表智慧、学识、贵人、母爱，象征知识和精神财富',
    personality: ['聪明好学', '有智慧', '善良慈悲', '重视精神', '有贵人运'],
    career: ['教育工作者', '研究学者', '文化工作', '宗教人士', '咨询顾问'],
    relationships: ['重视精神交流', '母子关系良好', '容易得到长辈帮助'],
    strengths: ['学习能力强', '有文化修养', '受人尊敬', '精神世界丰富'],
    weaknesses: ['有时脱离实际', '依赖性强', '缺乏行动力', '过于理想化'],
    advice: ['注重实践应用', '培养独立能力', '平衡理想与现实', '多参与社会活动']
  },
  '偏印': {
    name: '偏印',
    meaning: '代表创意、直觉、独特思维、非传统智慧',
    personality: ['思维独特', '有创意', '直觉敏锐', '不拘一格', '有时孤僻'],
    career: ['艺术创作', '设计师', '发明家', '心理咨询', '另类医疗'],
    relationships: ['感情复杂', '不易被理解', '需要精神共鸣', '重视个人空间'],
    strengths: ['创造力强', '有艺术天赋', '思维敏捷', '适合创新工作'],
    weaknesses: ['不够稳定', '难以坚持', '人际关系复杂', '有时过于敏感'],
    advice: ['培养专注力', '学会坚持', '改善沟通方式', '寻找志同道合的朋友']
  },
  '正财': {
    name: '正财',
    meaning: '代表正当财富、稳定收入、理财能力、物质享受',
    personality: ['务实稳重', '有理财观念', '重视物质', '勤劳节俭', '家庭观念强'],
    career: ['财务会计', '银行金融', '商业贸易', '房地产', '传统行业'],
    relationships: ['重视家庭', '夫妻关系和睦', '对配偶体贴', '家庭责任感强'],
    strengths: ['财运稳定', '善于积累', '生活安定', '家庭和谐'],
    weaknesses: ['过于保守', '缺乏冒险精神', '有时过于现实', '创新不足'],
    advice: ['适当投资理财', '培养创新思维', '扩大社交圈', '平衡物质与精神']
  },
  '偏财': {
    name: '偏财',
    meaning: '代表意外财富、投机收入、商业机会、灵活理财',
    personality: ['机智灵活', '善于抓机会', '交际能力强', '慷慨大方', '有时冲动'],
    career: ['投资理财', '商业贸易', '销售营销', '娱乐行业', '服务业'],
    relationships: ['异性缘好', '社交活跃', '容易有桃花', '需要专一'],
    strengths: ['赚钱能力强', '适应性好', '人脉广泛', '机会多'],
    weaknesses: ['财来财去', '不够稳定', '容易冲动消费', '感情复杂'],
    advice: ['学会储蓄', '控制消费欲望', '专注感情', '建立稳定收入来源']
  },
  '食神': {
    name: '食神',
    meaning: '代表才艺、表达、享受、创造力、生活品味',
    personality: ['有才艺', '善表达', '乐观开朗', '享受生活', '有审美能力'],
    career: ['艺术表演', '美食餐饮', '娱乐媒体', '创意设计', '文化产业'],
    relationships: ['感情丰富', '善于表达爱意', '重视生活情趣', '家庭和睦'],
    strengths: ['有创造力', '生活丰富多彩', '人缘好', '能带给他人快乐'],
    weaknesses: ['有时过于享乐', '缺乏进取心', '容易满足现状', '财务管理不佳'],
    advice: ['培养进取心', '合理规划财务', '平衡享受与奋斗', '发展专业技能']
  },
  '伤官': {
    name: '伤官',
    meaning: '代表才华、批判、创新、表现欲、变革精神',
    personality: ['才华横溢', '有批判精神', '创新能力强', '表现欲强', '有时叛逆'],
    career: ['创意产业', '媒体传播', '技术创新', '自由职业', '改革工作'],
    relationships: ['感情激烈', '要求完美', '容易挑剔', '需要理解包容'],
    strengths: ['才能出众', '创新能力强', '适应变化', '有领导潜质'],
    weaknesses: ['容易得罪人', '不够稳定', '有时过于自我', '人际关系复杂'],
    advice: ['学会包容他人', '控制批判情绪', '培养团队合作', '专注发展才能']
  },
  '比肩': {
    name: '比肩',
    meaning: '代表朋友、平等、合作、自我意识、独立精神',
    personality: ['独立自主', '有主见', '重视友情', '平等意识强', '有时固执'],
    career: ['合伙事业', '团队工作', '自主创业', '平等合作', '独立工作'],
    relationships: ['重视友情', '夫妻平等', '独立性强', '需要个人空间'],
    strengths: ['独立能力强', '有主见', '朋友多', '合作能力好'],
    weaknesses: ['有时过于固执', '不易妥协', '竞争意识强', '容易产生分歧'],
    advice: ['学会妥协', '培养包容心', '平衡独立与合作', '改善沟通技巧']
  },
  '劫财': {
    name: '劫财',
    meaning: '代表竞争、变化、机智、冒险、不稳定因素',
    personality: ['机智敏捷', '适应力强', '有冒险精神', '竞争意识强', '有时冲动'],
    career: ['竞争性行业', '变化性工作', '投机事业', '销售推广', '应急处理'],
    relationships: ['感情变化多', '容易有竞争', '需要信任理解', '重视个人魅力'],
    strengths: ['应变能力强', '有竞争优势', '机会把握好', '适应性强'],
    weaknesses: ['不够稳定', '容易冲动', '财务波动大', '人际关系复杂'],
    advice: ['培养稳定性', '控制冲动行为', '建立长期规划', '改善人际关系']
  }
};

// 命格模式
const DESTINY_PATTERNS: { [key: string]: DestinyPattern } = {
  '正官格': {
    name: '正官格',
    description: '以正官为用神的命格，代表正统、权威、稳定发展的人生道路',
    characteristics: ['品格端正', '有责任感', '循序渐进', '重视名誉', '稳重可靠'],
    advantages: ['事业稳定发展', '社会地位较高', '受人尊敬', '家庭和睦', '财运平稳'],
    challenges: ['发展较慢', '创新不足', '压力较大', '过于保守', '缺乏冒险精神'],
    careerSuggestions: ['政府机关', '大型企业管理', '教育行业', '法律行业', '医疗行业'],
    lifePath: '通过正当途径，稳步发展，最终获得社会认可和地位',
    luckyElements: ['金', '水'],
    unluckyElements: ['火', '木']
  },
  '财格': {
    name: '财格',
    description: '以财星为用神的命格，代表财富、物质、商业头脑的人生道路',
    characteristics: ['务实理性', '商业头脑', '重视物质', '勤劳节俭', '家庭观念强'],
    advantages: ['财运较好', '善于理财', '生活稳定', '家庭和睦', '物质丰富'],
    challenges: ['过于现实', '精神追求不足', '有时过于保守', '缺乏创新'],
    careerSuggestions: ['商业贸易', '金融投资', '房地产', '制造业', '服务业'],
    lifePath: '通过勤劳和智慧积累财富，享受物质生活的丰富',
    luckyElements: ['土', '金'],
    unluckyElements: ['木', '火']
  },
  '印格': {
    name: '印格',
    description: '以印星为用神的命格，代表智慧、学识、精神追求的人生道路',
    characteristics: ['聪明好学', '有智慧', '重视精神', '善良慈悲', '有贵人运'],
    advantages: ['学习能力强', '有文化修养', '贵人运好', '精神世界丰富', '受人尊敬'],
    challenges: ['有时脱离实际', '依赖性强', '行动力不足', '过于理想化'],
    careerSuggestions: ['教育行业', '文化工作', '研究学术', '宗教哲学', '咨询服务'],
    lifePath: '通过学习和智慧的积累，在精神和文化领域获得成就',
    luckyElements: ['水', '木'],
    unluckyElements: ['土', '金']
  },
  '食伤格': {
    name: '食伤格',
    description: '以食神伤官为用神的命格，代表才华、创意、表达的人生道路',
    characteristics: ['才华横溢', '有创意', '善于表达', '追求自由', '个性鲜明'],
    advantages: ['才能出众', '创造力强', '表达能力好', '生活丰富多彩', '有艺术天赋'],
    challenges: ['不够稳定', '容易冲动', '人际关系复杂', '财务管理不佳'],
    careerSuggestions: ['艺术创作', '媒体传播', '创意设计', '娱乐行业', '自由职业'],
    lifePath: '通过发挥才华和创意，在艺术或创新领域获得成功',
    luckyElements: ['木', '火'],
    unluckyElements: ['金', '水']
  },
  '比劫格': {
    name: '比劫格',
    description: '以比肩劫财为用神的命格，代表独立、合作、竞争的人生道路',
    characteristics: ['独立自主', '有主见', '竞争意识强', '重视友情', '适应力强'],
    advantages: ['独立能力强', '朋友多', '适应性好', '有竞争优势', '团队合作好'],
    challenges: ['不够稳定', '容易冲动', '财务波动', '人际关系复杂'],
    careerSuggestions: ['合伙事业', '竞争性行业', '团队工作', '销售推广', '自主创业'],
    lifePath: '通过合作和竞争，在变化中寻找机会，实现人生价值',
    luckyElements: ['木', '火'],
    unluckyElements: ['金', '土']
  }
};

// 根据阴阳调整十神
function adjustTenGod(baseGod: string, dayMasterYinYang: 'yin' | 'yang', targetYinYang: 'yin' | 'yang'): string {
  const godMapping: { [key: string]: string } = {
    '比肩': dayMasterYinYang === targetYinYang ? '比肩' : '劫财',
    '食神': dayMasterYinYang === targetYinYang ? '食神' : '伤官',
    '偏财': dayMasterYinYang === targetYinYang ? '偏财' : '正财',
    '七杀': dayMasterYinYang === targetYinYang ? '七杀' : '正官',
    '正印': dayMasterYinYang === targetYinYang ? '正印' : '偏印'
  };
  
  return godMapping[baseGod] || baseGod;
}

function calculateStemBranch(baseYear: number, offset: number): { stem: string; branch: string } {
  const stemIndex = (baseYear - 4 + offset) % 10;
  const branchIndex = (baseYear - 4 + offset) % 12;
  
  return {
    stem: HEAVENLY_STEMS[stemIndex >= 0 ? stemIndex : stemIndex + 10],
    branch: EARTHLY_BRANCHES[branchIndex >= 0 ? branchIndex : branchIndex + 12]
  };
}

function getMonthStemBranch(year: number, month: number): { stem: string; branch: string } {
  const monthBranches = ['寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑'];
  const branch = monthBranches[month - 1];
  
  const yearStemIndex = HEAVENLY_STEMS.indexOf(calculateStemBranch(year, 0).stem);
  let monthStemStart = 0;
  
  if (yearStemIndex === 0 || yearStemIndex === 5) monthStemStart = 2;
  else if (yearStemIndex === 1 || yearStemIndex === 6) monthStemStart = 4;
  else if (yearStemIndex === 2 || yearStemIndex === 7) monthStemStart = 6;
  else if (yearStemIndex === 3 || yearStemIndex === 8) monthStemStart = 8;
  else if (yearStemIndex === 4 || yearStemIndex === 9) monthStemStart = 0;
  
  const stemIndex = (monthStemStart + month - 1) % 10;
  const stem = HEAVENLY_STEMS[stemIndex];
  
  return { stem, branch };
}

function getDayStemBranch(date: Date): { stem: string; branch: string } {
  const baseDate = new Date(1900, 0, 1);
  const daysDiff = Math.floor((date.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const stemIndex = (daysDiff + 6) % 10;
  const branchIndex = (daysDiff + 0) % 12;
  
  return {
    stem: HEAVENLY_STEMS[stemIndex >= 0 ? stemIndex : stemIndex + 10],
    branch: EARTHLY_BRANCHES[branchIndex >= 0 ? branchIndex : branchIndex + 12]
  };
}

function getHourStemBranch(dayStem: string, hour: number): { stem: string; branch: string } {
  const hourBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  const hourIndex = Math.floor(hour / 2);
  const branch = hourBranches[hourIndex];
  
  const dayStemIndex = HEAVENLY_STEMS.indexOf(dayStem);
  let hourStemStart = 0;
  
  if (dayStemIndex === 0 || dayStemIndex === 5) hourStemStart = 0;
  else if (dayStemIndex === 1 || dayStemIndex === 6) hourStemStart = 2;
  else if (dayStemIndex === 2 || dayStemIndex === 7) hourStemStart = 4;
  else if (dayStemIndex === 3 || dayStemIndex === 8) hourStemStart = 6;
  else if (dayStemIndex === 4 || dayStemIndex === 9) hourStemStart = 8;
  
  const stemIndex = (hourStemStart + hourIndex) % 10;
  const stem = HEAVENLY_STEMS[stemIndex];
  
  return { stem, branch };
}

function calculateLuckPeriods(input: DateInput, monthStem: string): LuckPeriod[] {
  const periods: LuckPeriod[] = [];
  const isMale = input.gender === 'male';
  const monthStemIndex = HEAVENLY_STEMS.indexOf(monthStem);
  
  // 大运起始年龄（简化计算）
  const startAge = isMale ? 8 : 7;
  
  for (let i = 0; i < 8; i++) {
    const age = startAge + i * 10;
    const stemIndex = isMale ? 
      (monthStemIndex + i + 1) % 10 : 
      (monthStemIndex - i - 1 + 10) % 10;
    const branchIndex = (EARTHLY_BRANCHES.indexOf('寅') + (isMale ? i + 1 : -i - 1) + 12) % 12;
    
    const stem = HEAVENLY_STEMS[stemIndex];
    const branch = EARTHLY_BRANCHES[branchIndex];
    const element = STEM_ELEMENTS[stem];
    const yinYang = STEM_YIN_YANG[stem];
    
    // 简化的运势评估
    const fortune = ['excellent', 'good', 'normal', 'challenging', 'difficult'][Math.floor(Math.random() * 5)] as any;
    
    periods.push({
      age,
      stem,
      branch,
      element,
      yinYang,
      startYear: input.year + age,
      endYear: input.year + age + 9,
      description: `${age}-${age + 9}岁大运，${stem}${branch}运`,
      fortune
    });
  }
  
  return periods;
}

function analyzeDestinyPattern(pillars: any, dayMaster: string, tenGods: any): DestinyPattern {
  // 简化的命格分析
  const godCounts: { [key: string]: number } = {};
  Object.keys(tenGods).forEach(god => {
    godCounts[god] = tenGods[god].length;
  });
  
  // 确定主要格局
  let mainPattern = '比劫格';
  if (godCounts['正官'] || godCounts['七杀']) {
    mainPattern = '正官格';
  } else if (godCounts['正财'] || godCounts['偏财']) {
    mainPattern = '财格';
  } else if (godCounts['正印'] || godCounts['偏印']) {
    mainPattern = '印格';
  } else if (godCounts['食神'] || godCounts['伤官']) {
    mainPattern = '食伤格';
  }
  
  return DESTINY_PATTERNS[mainPattern] || DESTINY_PATTERNS['比劫格'];
}

function generateRemedyAdvice(elementStats: any, elementStrength: any, dayMaster: string): RemedyAdvice[] {
  const advice: RemedyAdvice[] = [];
  
  // 根据五行强弱生成建议
  Object.entries(elementStrength).forEach(([element, strength]) => {
    if (strength === 'weak') {
      const remedies = getElementRemedies(element);
      advice.push(...remedies);
    }
  });
  
  // 如果没有弱的五行，给出平衡建议
  if (advice.length === 0) {
    advice.push({
      category: '平衡调和',
      icon: '⚖️',
      title: '五行平衡',
      description: '您的五行相对平衡，重点在于维持和谐',
      methods: ['保持规律作息', '均衡饮食', '适度运动', '心态平和'],
      dailyPractices: ['早睡早起', '多接触自然', '练习冥想', '培养兴趣爱好'],
      colors: ['白色', '灰色', '米色'],
      directions: ['中央'],
      numbers: ['5', '10'],
      timing: '全年适宜'
    });
  }
  
  return advice.slice(0, 3); // 最多返回3个建议
}

function getElementRemedies(element: string): RemedyAdvice[] {
  const remedies: { [key: string]: RemedyAdvice } = {
    '木': {
      category: '补木',
      icon: '🌳',
      title: '增强木气',
      description: '木主仁慈、生长、创造，需要增强活力和创造力',
      methods: ['多接触绿色植物', '到森林公园散步', '从事创意工作', '学习新技能'],
      dailyPractices: ['早起看日出', '种植花草', '穿绿色衣服', '吃绿色蔬菜'],
      colors: ['绿色', '青色', '翠绿'],
      directions: ['东方', '东南方'],
      numbers: ['3', '8'],
      timing: '春季最佳，早晨5-7点'
    },
    '火': {
      category: '补火',
      icon: '🔥',
      title: '增强火气',
      description: '火主礼智、热情、光明，需要增强活力和表达力',
      methods: ['多晒太阳', '参加社交活动', '学习表达技巧', '从事热情的工作'],
      dailyPractices: ['中午晒太阳', '穿红色衣服', '吃辛辣食物', '练习演讲'],
      colors: ['红色', '橙色', '紫色'],
      directions: ['南方'],
      numbers: ['2', '7'],
      timing: '夏季最佳，中午11-13点'
    },
    '土': {
      category: '补土',
      icon: '🏔️',
      title: '增强土气',
      description: '土主信义、稳重、包容，需要增强稳定性和包容力',
      methods: ['接触大地', '从事稳定工作', '培养耐心', '学习理财'],
      dailyPractices: ['赤脚走路', '穿黄色衣服', '吃甜食', '练习书法'],
      colors: ['黄色', '棕色', '土色'],
      directions: ['中央', '西南', '东北'],
      numbers: ['5', '10'],
      timing: '四季末月，下午13-15点'
    },
    '金': {
      category: '补金',
      icon: '⚡',
      title: '增强金气',
      description: '金主义气、决断、收敛，需要增强决断力和执行力',
      methods: ['接触金属', '练习武术', '培养决断力', '从事精密工作'],
      dailyPractices: ['佩戴金属饰品', '穿白色衣服', '吃白色食物', '练习呼吸'],
      colors: ['白色', '银色', '金色'],
      directions: ['西方', '西北方'],
      numbers: ['4', '9'],
      timing: '秋季最佳，下午15-17点'
    },
    '水': {
      category: '补水',
      icon: '🌊',
      title: '增强水气',
      description: '水主智慧、流动、适应，需要增强智慧和适应力',
      methods: ['多接触水', '学习新知识', '培养灵活性', '从事流动性工作'],
      dailyPractices: ['多喝水', '穿黑色衣服', '吃黑色食物', '练习游泳'],
      colors: ['黑色', '蓝色', '深色'],
      directions: ['北方'],
      numbers: ['1', '6'],
      timing: '冬季最佳，晚上21-23点'
    }
  };
  
  return [remedies[element]];
}

function calculateOverallFortune(elementStats: any, tenGods: any, destinyPattern: DestinyPattern): any {
  // 简化的综合运势计算
  let score = 70; // 基础分
  
  // 根据五行平衡度调整
  const values = Object.values(elementStats) as number[];
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / values.length;
  
  if (variance < 1) score += 10; // 五行平衡
  else if (variance > 4) score -= 10; // 五行失衡
  
  // 根据十神数量调整
  const godCount = Object.keys(tenGods).length;
  if (godCount >= 3) score += 5;
  if (godCount >= 5) score += 5;
  
  let level: 'excellent' | 'good' | 'normal' | 'challenging' | 'difficult';
  if (score >= 85) level = 'excellent';
  else if (score >= 75) level = 'good';
  else if (score >= 65) level = 'normal';
  else if (score >= 55) level = 'challenging';
  else level = 'difficult';
  
  const summaries = {
    'excellent': '您的八字格局优秀，五行配置和谐，人生发展顺遂，具有很好的发展潜力。',
    'good': '您的八字格局良好，整体运势不错，通过努力可以获得不错的成就。',
    'normal': '您的八字格局平稳，运势中等，需要通过自身努力来改善命运。',
    'challenging': '您的八字存在一些挑战，需要注意调节和改善，通过努力可以化解。',
    'difficult': '您的八字格局较为复杂，需要特别注意调节和改善，建议寻求专业指导。'
  };
  
  return {
    score,
    level,
    summary: summaries[level],
    keyPoints: [
      `命格：${destinyPattern.name}`,
      `五行${variance < 1 ? '平衡' : variance > 4 ? '失衡' : '基本平衡'}`,
      `十神关系${godCount >= 3 ? '丰富' : '简单'}`,
      `整体运势${level === 'excellent' ? '优秀' : level === 'good' ? '良好' : level === 'normal' ? '平稳' : '需要调节'}`
    ]
  };
}

function generateGenderAnalysis(gender: 'male' | 'female', pillars: any, dayMaster: string): {
  lifePhases: string[];
  characteristics: string[];
} {
  const isMale = gender === 'male';
  
  const lifePhases = isMale ? [
    '青年期：重视学业和技能培养，为事业打基础',
    '壮年期：专注事业发展，承担家庭经济责任',
    '中年期：追求社会地位和成就，平衡工作与家庭',
    '晚年期：享受成果，传承经验，关注健康养生'
  ] : [
    '青年期：注重教育和品德修养，培养内在气质',
    '壮年期：重视家庭建设，平衡事业与家庭角色',
    '中年期：发挥协调能力，成为家庭和社会的纽带',
    '晚年期：享受天伦之乐，传承家庭文化和智慧'
  ];
  
  const elementCharacteristics: { [key: string]: { male: string[]; female: string[] } } = {
    '木': {
      male: [
        '性格正直，具有强烈的正义感和责任心',
        '善于规划，做事有条理，追求完美',
        '重视原则，不轻易妥协，有时显得固执',
        '具有领导才能，善于带领团队向前发展'
      ],
      female: [
        '温柔贤淑，具有母性的包容和关爱特质',
        '心思细腻，善于察言观色，理解他人',
        '重视家庭和谐，是天然的家庭协调者',
        '具有艺术天赋，对美有独特的感知能力'
      ]
    },
    '火': {
      male: [
        '热情开朗，具有强烈的进取心和行动力',
        '善于表达，具有感染力和说服力',
        '重视荣誉，追求成功和社会认可',
        '有时急躁冲动，需要学会冷静思考'
      ],
      female: [
        '活泼开朗，具有独特的个人魅力',
        '善于社交，能够轻松融入各种环境',
        '重视感情，对爱情和友情都很投入',
        '具有创造力，在艺术和文化领域有天赋'
      ]
    },
    '土': {
      male: [
        '稳重踏实，具有强烈的责任感和使命感',
        '善于积累，重视物质基础和安全感',
        '为人诚信，是值得信赖的合作伙伴',
        '有时过于保守，需要适当的变通能力'
      ],
      female: [
        '温和包容，具有强大的内心力量',
        '善于理财，能够合理规划家庭资源',
        '重视传统，是家庭文化的传承者',
        '具有治愈能力，能够给他人带来安慰'
      ]
    },
    '金': {
      male: [
        '意志坚强，具有不屈不挠的精神',
        '善于决断，在关键时刻能够果断行动',
        '重视效率，追求高质量的工作成果',
        '有时过于严厉，需要学会温和待人'
      ],
      female: [
        '独立自强，具有现代女性的自主意识',
        '善于分析，能够理性处理各种问题',
        '重视品质，对生活有较高的要求',
        '具有领导能力，在职场中表现出色'
      ]
    },
    '水': {
      male: [
        '智慧深邃，具有敏锐的洞察力',
        '善于变通，能够适应各种环境变化',
        '重视学习，终身保持求知欲',
        '有时过于理性，需要增加感性色彩'
      ],
      female: [
        '聪慧灵动，具有独特的思维方式',
        '善于沟通，能够化解各种矛盾',
        '重视精神追求，对哲学和艺术有兴趣',
        '具有直觉能力，能够感知他人的内心'
      ]
    }
  };
  
  const characteristics = elementCharacteristics[dayMaster]?.[gender] || [
    '性格特征需要结合具体八字进行详细分析',
    '每个人都有独特的个性和发展潜力',
    '命理分析仅供参考，人生掌握在自己手中',
    '积极向上的心态是成功的重要因素'
  ];
  
  return { lifePhases, characteristics };
}

export function calculateBazi(input: DateInput): BaziResult {
  const date = new Date(input.year, input.month - 1, input.day, input.hour, input.minute);
  
  // 计算四柱
  const yearSB = calculateStemBranch(input.year, 0);
  const monthSB = getMonthStemBranch(input.year, input.month);
  const daySB = getDayStemBranch(date);
  const hourSB = getHourStemBranch(daySB.stem, input.hour);
  
  const pillars = {
    year: {
      stem: yearSB.stem,
      branch: yearSB.branch,
      element: STEM_ELEMENTS[yearSB.stem],
      yinYang: STEM_YIN_YANG[yearSB.stem]
    } as BaziPillar,
    month: {
      stem: monthSB.stem,
      branch: monthSB.branch,
      element: STEM_ELEMENTS[monthSB.stem],
      yinYang: STEM_YIN_YANG[monthSB.stem]
    } as BaziPillar,
    day: {
      stem: daySB.stem,
      branch: daySB.branch,
      element: STEM_ELEMENTS[daySB.stem],
      yinYang: STEM_YIN_YANG[daySB.stem]
    } as BaziPillar,
    hour: {
      stem: hourSB.stem,
      branch: hourSB.branch,
      element: STEM_ELEMENTS[hourSB.stem],
      yinYang: STEM_YIN_YANG[hourSB.stem]
    } as BaziPillar
  };
  
  const dayMaster = STEM_ELEMENTS[daySB.stem];
  const dayMasterYinYang = STEM_YIN_YANG[daySB.stem];
  
  // 计算十神
  const tenGods: { [key: string]: string[] } = {};
  const allElements = [
    { element: pillars.year.element, yinYang: pillars.year.yinYang, position: '年干' },
    { element: BRANCH_ELEMENTS[pillars.year.branch], yinYang: BRANCH_YIN_YANG[pillars.year.branch], position: '年支' },
    { element: pillars.month.element, yinYang: pillars.month.yinYang, position: '月干' },
    { element: BRANCH_ELEMENTS[pillars.month.branch], yinYang: BRANCH_YIN_YANG[pillars.month.branch], position: '月支' },
    { element: pillars.hour.element, yinYang: pillars.hour.yinYang, position: '时干' },
    { element: BRANCH_ELEMENTS[pillars.hour.branch], yinYang: BRANCH_YIN_YANG[pillars.hour.branch], position: '时支' }
  ];
  
  allElements.forEach(({ element, yinYang, position }) => {
    if (element !== dayMaster) {
      const baseGod = TEN_GODS[dayMaster][element];
      const adjustedGod = adjustTenGod(baseGod, dayMasterYinYang, yinYang);
      
      if (!tenGods[adjustedGod]) {
        tenGods[adjustedGod] = [];
      }
      tenGods[adjustedGod].push(position);
    }
  });
  
  // 生成十神详细信息
  const tenGodsDetails: TenGodDetail[] = Object.keys(tenGods).map(godName => ({
    ...TEN_GODS_DETAILS[godName],
    positions: tenGods[godName]
  }));
  
  // 统计五行
  const elementStats: { [key: string]: number } = {
    '木': 0, '火': 0, '土': 0, '金': 0, '水': 0
  };
  
  elementStats[pillars.year.element] += 2;
  elementStats[BRANCH_ELEMENTS[pillars.year.branch]] += 1;
  elementStats[pillars.month.element] += 2;
  elementStats[BRANCH_ELEMENTS[pillars.month.branch]] += 1;
  elementStats[pillars.day.element] += 2;
  elementStats[BRANCH_ELEMENTS[pillars.day.branch]] += 1;
  elementStats[pillars.hour.element] += 2;
  elementStats[BRANCH_ELEMENTS[pillars.hour.branch]] += 1;
  
  // 计算五行强弱
  const totalPower = Object.values(elementStats).reduce((sum, power) => sum + power, 0);
  const averagePower = totalPower / 5;
  
  const elementStrength: { [key: string]: 'strong' | 'weak' | 'normal' } = {};
  Object.entries(elementStats).forEach(([element, power]) => {
    if (power > averagePower * 1.3) {
      elementStrength[element] = 'strong';
    } else if (power < averagePower * 0.7) {
      elementStrength[element] = 'weak';
    } else {
      elementStrength[element] = 'normal';
    }
  });
  
  // 计算大运
  const luckPeriods = calculateLuckPeriods(input, monthSB.stem);
  
  // 分析命格
  const destinyPattern = analyzeDestinyPattern(pillars, dayMaster, tenGods);
  
  // 生成改运建议
  const remedyAdvice = generateRemedyAdvice(elementStats, elementStrength, dayMaster);
  
  // 计算综合运势
  const overallFortune = calculateOverallFortune(elementStats, tenGods, destinyPattern);
  
  // 生成性别分析
  const genderAnalysis = generateGenderAnalysis(input.gender, pillars, dayMaster);
  
  return {
    pillars,
    dayMaster,
    tenGods,
    tenGodsDetails,
    elementStats,
    elementStrength,
    gender: input.gender,
    genderAnalysis,
    luckPeriods,
    destinyPattern,
    remedyAdvice,
    overallFortune
  };
}