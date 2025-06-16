export interface BaziPillar {
  stem: string;
  branch: string;
  element: string;
  yinYang: 'yin' | 'yang';
}

export interface LuckPeriod {
  age: number;
  stem: string;
  branch: string;
  element: string;
  yinYang: 'yin' | 'yang';
  startYear: number;
  endYear: number;
  description: string;
  fortune: 'excellent' | 'good' | 'normal' | 'challenging' | 'difficult';
}

export interface TenGodDetail {
  name: string;
  positions: string[];
  meaning: string;
  personality: string[];
  career: string[];
  relationships: string[];
  strengths: string[];
  weaknesses: string[];
  advice: string[];
}

export interface DestinyPattern {
  name: string;
  description: string;
  characteristics: string[];
  advantages: string[];
  challenges: string[];
  careerSuggestions: string[];
  lifePath: string;
  luckyElements: string[];
  unluckyElements: string[];
}

export interface RemedyAdvice {
  category: string;
  icon: string;
  title: string;
  description: string;
  methods: string[];
  dailyPractices: string[];
  colors: string[];
  directions: string[];
  numbers: string[];
  timing: string;
}

export interface BaziResult {
  pillars: {
    year: BaziPillar;
    month: BaziPillar;
    day: BaziPillar;
    hour: BaziPillar;
  };
  dayMaster: string;
  tenGods: {
    [key: string]: string[];
  };
  tenGodsDetails: TenGodDetail[];
  elementStats: {
    [key: string]: number;
  };
  elementStrength: {
    [key: string]: 'strong' | 'weak' | 'normal';
  };
  gender: 'male' | 'female';
  genderAnalysis: {
    lifePhases: string[];
    characteristics: string[];
  };
  luckPeriods: LuckPeriod[];
  destinyPattern: DestinyPattern;
  remedyAdvice: RemedyAdvice[];
  overallFortune: {
    score: number;
    level: 'excellent' | 'good' | 'normal' | 'challenging' | 'difficult';
    summary: string;
    keyPoints: string[];
  };
}

export interface DateInput {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  gender: 'male' | 'female';
}