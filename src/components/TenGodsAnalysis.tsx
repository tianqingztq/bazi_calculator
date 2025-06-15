import React from 'react';
import { BaziResult } from '../types/bazi';

interface TenGodsAnalysisProps {
  result: BaziResult;
}

const TEN_GODS_DESCRIPTIONS: { [key: string]: string } = {
  '正官': '代表名声、地位、责任感，具有领导能力和正义感',
  '七杀': '代表权威、压力、挑战，具有开拓精神和决断力',
  '正印': '代表智慧、学识、贵人，具有包容性和慈悲心',
  '偏印': '代表创意、直觉、独特思维，具有艺术天赋',
  '正财': '代表财富、物质、现实，具有经营能力和理财观念',
  '偏财': '代表机遇、投机、灵活性，具有商业头脑',
  '食神': '代表才艺、表达、享受，具有创造力和审美能力',
  '伤官': '代表才华、批判、创新，具有表现欲和变革精神',
  '比肩': '代表朋友、平等、合作，具有团队精神',
  '劫财': '代表竞争、变化、机智，具有应变能力'
};

const TEN_GODS_COLORS: { [key: string]: string } = {
  '正官': 'bg-purple-900/30 text-purple-300 border-purple-500/30',
  '七杀': 'bg-red-900/30 text-red-300 border-red-500/30',
  '正印': 'bg-blue-900/30 text-blue-300 border-blue-500/30',
  '偏印': 'bg-indigo-900/30 text-indigo-300 border-indigo-500/30',
  '正财': 'bg-green-900/30 text-green-300 border-green-500/30',
  '偏财': 'bg-emerald-900/30 text-emerald-300 border-emerald-500/30',
  '食神': 'bg-yellow-900/30 text-yellow-300 border-yellow-500/30',
  '伤官': 'bg-orange-900/30 text-orange-300 border-orange-500/30',
  '比肩': 'bg-gray-800/30 text-gray-300 border-gray-500/30',
  '劫财': 'bg-slate-800/30 text-slate-300 border-slate-500/30'
};

const TEN_GODS_SYMBOLS: { [key: string]: string } = {
  '正官': '👑',
  '七杀': '⚔️',
  '正印': '📚',
  '偏印': '🎨',
  '正财': '💰',
  '偏财': '💎',
  '食神': '🍃',
  '伤官': '✨',
  '比肩': '🤝',
  '劫财': '⚡'
};

export function TenGodsAnalysis({ result }: TenGodsAnalysisProps) {
  const hasGods = Object.keys(result.tenGods).length > 0;
  
  return (
    <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-amber-500/20">
      <h2 className="text-2xl font-bold text-amber-200 mb-8">十神分析</h2>
      
      {hasGods ? (
        <div className="space-y-6">
          {Object.entries(result.tenGods).map(([god, positions]) => (
            <div key={god} className="border border-amber-500/20 rounded-xl p-6 bg-gray-800/20 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{TEN_GODS_SYMBOLS[god]}</span>
                  <span className={`px-4 py-2 rounded-full font-medium border ${TEN_GODS_COLORS[god]}`}>
                    {god}
                  </span>
                </div>
                <div className="flex gap-2">
                  {positions.map((position, index) => (
                    <span key={index} className="px-3 py-1 bg-amber-800/30 text-amber-200 text-sm rounded-lg border border-amber-600/30">
                      {position}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-amber-100/80 leading-relaxed">
                {TEN_GODS_DESCRIPTIONS[god]}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🧘</div>
          <p className="text-amber-200/60 text-lg">日主自身，独立自主</p>
          <p className="text-amber-300/40 text-sm mt-2">暂无其他十神关系显示</p>
        </div>
      )}
      
      <div className="mt-8 bg-gradient-to-r from-teal-900/30 to-cyan-900/30 rounded-xl p-6 border border-teal-500/30">
        <h3 className="text-lg font-medium text-teal-300 mb-4">十神玄机</h3>
        <div className="text-sm text-teal-200/80 space-y-2 leading-relaxed">
          <p>• 十神反映个人性格特征和人生发展轨迹</p>
          <p>• 不同十神的组合决定命运格局高低</p>
          <p>• 位置（年月日时）影响作用的时期和强度</p>
          <p>• 平衡协调的十神组合最为理想</p>
        </div>
      </div>
    </div>
  );
}