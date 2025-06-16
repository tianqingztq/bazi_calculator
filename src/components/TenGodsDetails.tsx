import React from 'react';
import { BaziResult } from '../types/bazi';
import { BookOpen, User, Briefcase, Heart, Lightbulb, AlertTriangle } from 'lucide-react';

interface TenGodsDetailsProps {
  result: BaziResult;
}

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

export function TenGodsDetails({ result }: TenGodsDetailsProps) {
  if (result.tenGodsDetails.length === 0) {
    return (
      <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-amber-500/20">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-2 rounded-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-amber-200">十神详解</h2>
        </div>
        
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🧘</div>
          <p className="text-amber-200/60 text-lg">日主自身，独立自主</p>
          <p className="text-amber-300/40 text-sm mt-2">暂无其他十神关系显示</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-amber-500/20">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-2 rounded-lg">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-amber-200">十神详解</h2>
      </div>
      
      <div className="space-y-8">
        {result.tenGodsDetails.map((god, index) => (
          <div key={index} className="border border-amber-500/20 rounded-xl p-6 bg-gray-800/20 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{TEN_GODS_SYMBOLS[god.name]}</span>
                <div>
                  <span className={`px-4 py-2 rounded-full font-medium border ${TEN_GODS_COLORS[god.name]}`}>
                    {god.name}
                  </span>
                  <p className="text-sm text-amber-200/60 mt-2">{god.meaning}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {god.positions.map((position, idx) => (
                  <span key={idx} className="px-3 py-1 bg-amber-800/30 text-amber-200 text-sm rounded-lg border border-amber-600/30">
                    {position}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-4 h-4 text-amber-400" />
                    <h4 className="text-sm font-medium text-amber-300">性格特征</h4>
                  </div>
                  <ul className="text-sm text-amber-100/80 space-y-1">
                    {god.personality.map((trait, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 mt-1">•</span>
                        <span>{trait}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="w-4 h-4 text-amber-400" />
                    <h4 className="text-sm font-medium text-amber-300">事业发展</h4>
                  </div>
                  <ul className="text-sm text-amber-100/80 space-y-1">
                    {god.career.map((career, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 mt-1">•</span>
                        <span>{career}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="w-4 h-4 text-amber-400" />
                    <h4 className="text-sm font-medium text-amber-300">感情关系</h4>
                  </div>
                  <ul className="text-sm text-amber-100/80 space-y-1">
                    {god.relationships.map((rel, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 mt-1">•</span>
                        <span>{rel}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-green-400" />
                    <h4 className="text-sm font-medium text-green-300">优势特长</h4>
                  </div>
                  <ul className="text-sm text-green-100/80 space-y-1">
                    {god.strengths.map((strength, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                  <h4 className="text-sm font-medium text-orange-300">注意事项</h4>
                </div>
                <ul className="text-sm text-orange-100/80 space-y-1">
                  {god.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-blue-400" />
                  <h4 className="text-sm font-medium text-blue-300">改善建议</h4>
                </div>
                <ul className="text-sm text-blue-100/80 space-y-1">
                  {god.advice.map((advice, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{advice}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}