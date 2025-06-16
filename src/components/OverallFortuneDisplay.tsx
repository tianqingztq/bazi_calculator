import React from 'react';
import { BaziResult } from '../types/bazi';
import { TrendingUp, Star, Award, AlertTriangle, Info } from 'lucide-react';

interface OverallFortuneDisplayProps {
  result: BaziResult;
}

const FORTUNE_COLORS: { [key: string]: string } = {
  'excellent': 'text-green-400 bg-green-900/30 border-green-500/30',
  'good': 'text-blue-400 bg-blue-900/30 border-blue-500/30',
  'normal': 'text-amber-400 bg-amber-900/30 border-amber-500/30',
  'challenging': 'text-orange-400 bg-orange-900/30 border-orange-500/30',
  'difficult': 'text-red-400 bg-red-900/30 border-red-500/30'
};

const FORTUNE_ICONS: { [key: string]: React.ReactNode } = {
  'excellent': <Award className="w-6 h-6" />,
  'good': <TrendingUp className="w-6 h-6" />,
  'normal': <Star className="w-6 h-6" />,
  'challenging': <AlertTriangle className="w-6 h-6" />,
  'difficult': <AlertTriangle className="w-6 h-6" />
};

const FORTUNE_LABELS: { [key: string]: string } = {
  'excellent': '优秀格局',
  'good': '良好格局',
  'normal': '平稳格局',
  'challenging': '挑战格局',
  'difficult': '困难格局'
};

export function OverallFortuneDisplay({ result }: OverallFortuneDisplayProps) {
  const fortune = result.overallFortune;
  
  return (
    <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-amber-500/20">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-r from-gold-500 to-yellow-500 p-2 rounded-lg">
          <Star className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-amber-200">综合运势</h2>
      </div>
      
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-4 mb-6">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl border ${FORTUNE_COLORS[fortune.level]}`}>
            {FORTUNE_ICONS[fortune.level]}
            <div>
              <div className="text-2xl font-bold">{fortune.score}分</div>
              <div className="text-sm opacity-80">{FORTUNE_LABELS[fortune.level]}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-xl p-6 border border-gray-600/30 mb-6">
          <p className="text-amber-100/90 text-lg leading-relaxed">{fortune.summary}</p>
        </div>
        
        <div className="w-full bg-gray-800/50 rounded-full h-4 mb-2">
          <div
            className={`h-4 rounded-full transition-all duration-1000 ${
              fortune.level === 'excellent' ? 'bg-green-500' :
              fortune.level === 'good' ? 'bg-blue-500' :
              fortune.level === 'normal' ? 'bg-amber-500' :
              fortune.level === 'challenging' ? 'bg-orange-500' :
              'bg-red-500'
            } shadow-lg`}
            style={{ width: `${fortune.score}%` }}
          ></div>
        </div>
        <p className="text-sm text-amber-200/60">命理评分：{fortune.score}/100</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-amber-300">关键要点</h3>
          </div>
          <div className="space-y-3">
            {fortune.keyPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">•</span>
                <span className="text-amber-100/80 text-sm">{point}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-blue-300">发展建议</h3>
          </div>
          <div className="space-y-3">
            {fortune.level === 'excellent' && (
              <>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="text-blue-100/80 text-sm">继续保持优势，稳步发展</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="text-blue-100/80 text-sm">可以承担更大的责任和挑战</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="text-blue-100/80 text-sm">注意保持谦逊，避免骄傲自满</span>
                </div>
              </>
            )}
            {fortune.level === 'good' && (
              <>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="text-blue-100/80 text-sm">把握机会，积极进取</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="text-blue-100/80 text-sm">加强学习，提升能力</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="text-blue-100/80 text-sm">建立良好的人际关系</span>
                </div>
              </>
            )}
            {fortune.level === 'normal' && (
              <>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="text-blue-100/80 text-sm">稳扎稳打，循序渐进</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="text-blue-100/80 text-sm">寻找突破点，创造机会</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="text-blue-100/80 text-sm">保持耐心，持续努力</span>
                </div>
              </>
            )}
            {(fortune.level === 'challenging' || fortune.level === 'difficult') && (
              <>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="text-blue-100/80 text-sm">重视改运调节，化解不利</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="text-blue-100/80 text-sm">保持积极心态，坚持不懈</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="text-blue-100/80 text-sm">寻求专业指导，制定计划</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}