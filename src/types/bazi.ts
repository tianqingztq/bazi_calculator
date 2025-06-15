export interface BaziPillar {
  stem: string;
  branch: string;
  element: string;
  yinYang: 'yin' | 'yang';
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
  elementStats: {
    [key: string]: number;
  };
  elementStrength: {
    [key: string]: 'strong' | 'weak' | 'normal';
  };
}

export interface DateInput {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}