import React from 'react';
import { BaziResult } from '../types/bazi';
import { Calendar, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface LuckPeriodsDisplayProps {
  result: BaziResult;
}

const FORTUNE_COLORS: { [key: string]: string } = {
  'excellent': 'bg-green-900/30 text-green-300 border-green-500/30',
  'good': 'bg-blue-900/30 text-blue-300 border-blue-500/30',
  'normal': 'bg-gray-800/30 text-gray-300 border-gray-500/30',
  'challenging': 'bg-orange-900/30 text-orange-300 border-orange-500/30',
  'difficult': 'bg-red-900/30 text-red-300 border-red-500/30'
};

const FORTUNE_ICONS: { [key: string]: React.ReactNode } = {
  'excellent': <TrendingUp className="w-4 h-4" />,
  'good': <TrendingUp className="w-4 h-4" />,
  'normal': <Minus className="w-4 h-4" />,
  'challenging': <TrendingDown className="w-4 h-4" />,
  'difficult': <TrendingDown className="w-4 h-4" />
};

const FORTUNE_LABELS: { [key: string]: string } = {
  'excellent': '大吉',
  'good': '吉利',
  'normal': '平稳',
  'challenging': '挑战',
  'difficult': '困难'
};

export function LuckPeriodsDisplay({ result }: LuckPeriodsDisplayProps) {
  const currentYear = new Date().getFullYear();
  const currentAge = currentYear - result.pillars.year.stem.length; // 简化计算
  
  return (
    <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-amber-500/20">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-2 rounded-lg">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-amber-200">大运排盘</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {result.luckPeriods.map((period, index) => {
          const isCurrent = currentAge >= period.age && currentAge < period.age + 10;
          
          return (
            <div 
              key={index} 
              className={`border rounded-xl p-6 backdrop-blur-sm transition-all duration-300 ${
                isCurrent 
                  ? 'border-amber-400/60 bg-amber-900/20 shadow-lg' 
                  : 'border-amber-500/20 bg-gray-800/20 hover:border-amber-400/40'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-amber-100">
                      {period.stem}{period.branch}
                    </span>
                    {isCurrent && (
                      <span className="px-2 py-1 bg-amber-500 text-amber-900 text-xs font-medium rounded-full">
                        当前
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-amber-200/80">{period.description}</p>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${FORTUNE_COLORS[period.fortune]}`}>
                  {FORTUNE_ICONS[period.fortune]}
                  {FORTUNE_LABELS[period.fortune]}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-amber-300">年龄段：</span>
                  <span className="text-amber-100">{period.age}-{period.age + 9}岁</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-amber-300">年份：</span>
                  <span className="text-amber-100">{period.startYear}-{period.endYear}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-amber-300">五行：</span>
                  <span className="text-amber-100">{period.element}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-amber-300">阴阳：</span>
                  <span className="text-amber-100">{period.yinYang === 'yang' ? '阳' : '阴'}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl p-6 border border-purple-500/30">
        <h3 className="text-lg font-medium text-purple-300 mb-4">大运解读</h3>
        <div className="text-sm text-purple-200/80 space-y-2 leading-relaxed">
          <p>• 大运每十年一换，影响人生的重要阶段和发展方向</p>
          <p>• 当前大运与八字的配合决定了这十年的整体运势</p>
          <p>• 大运天干主前五年，地支主后五年的运势特点</p>
          <p>• 结合流年分析，可以更精确地把握时机</p>
        </div>
      </div>
    </div>
  );
}