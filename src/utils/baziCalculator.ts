import { BaziResult, BaziPillar, DateInput } from '../types/bazi';

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
  // 月支固定，从寅月开始（立春）
  const monthBranches = ['寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑'];
  const branch = monthBranches[month - 1];
  
  // 月干的计算：甲己之年丙作首
  const yearStemIndex = HEAVENLY_STEMS.indexOf(calculateStemBranch(year, 0).stem);
  let monthStemStart = 0;
  
  if (yearStemIndex === 0 || yearStemIndex === 5) monthStemStart = 2; // 甲己年
  else if (yearStemIndex === 1 || yearStemIndex === 6) monthStemStart = 4; // 乙庚年
  else if (yearStemIndex === 2 || yearStemIndex === 7) monthStemStart = 6; // 丙辛年
  else if (yearStemIndex === 3 || yearStemIndex === 8) monthStemStart = 8; // 丁壬年
  else if (yearStemIndex === 4 || yearStemIndex === 9) monthStemStart = 0; // 戊癸年
  
  const stemIndex = (monthStemStart + month - 1) % 10;
  const stem = HEAVENLY_STEMS[stemIndex];
  
  return { stem, branch };
}

function getDayStemBranch(date: Date): { stem: string; branch: string } {
  // 使用公元1900年1月1日作为基准（庚子日）
  const baseDate = new Date(1900, 0, 1);
  const daysDiff = Math.floor((date.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const stemIndex = (daysDiff + 6) % 10; // 庚为第6个天干（从0开始）
  const branchIndex = (daysDiff + 0) % 12; // 子为第0个地支
  
  return {
    stem: HEAVENLY_STEMS[stemIndex >= 0 ? stemIndex : stemIndex + 10],
    branch: EARTHLY_BRANCHES[branchIndex >= 0 ? branchIndex : branchIndex + 12]
  };
}

function getHourStemBranch(dayStem: string, hour: number): { stem: string; branch: string } {
  // 时支根据时辰确定
  const hourBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  const hourIndex = Math.floor(hour / 2);
  const branch = hourBranches[hourIndex];
  
  // 时干的计算：甲己还加甲
  const dayStemIndex = HEAVENLY_STEMS.indexOf(dayStem);
  let hourStemStart = 0;
  
  if (dayStemIndex === 0 || dayStemIndex === 5) hourStemStart = 0; // 甲己日
  else if (dayStemIndex === 1 || dayStemIndex === 6) hourStemStart = 2; // 乙庚日
  else if (dayStemIndex === 2 || dayStemIndex === 7) hourStemStart = 4; // 丙辛日
  else if (dayStemIndex === 3 || dayStemIndex === 8) hourStemStart = 6; // 丁壬日
  else if (dayStemIndex === 4 || dayStemIndex === 9) hourStemStart = 8; // 戊癸日
  
  const stemIndex = (hourStemStart + hourIndex) % 10;
  const stem = HEAVENLY_STEMS[stemIndex];
  
  return { stem, branch };
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
  
  // 统计五行
  const elementStats: { [key: string]: number } = {
    '木': 0, '火': 0, '土': 0, '金': 0, '水': 0
  };
  
  // 天干力量为2，地支力量为1
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
  
  return {
    pillars,
    dayMaster,
    tenGods,
    elementStats,
    elementStrength
  };
}