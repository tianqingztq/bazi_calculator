import React from 'react';
import { BaziResult } from '../types/bazi';
import { Shield, Palette, Navigation, Hash, Clock, Lightbulb } from 'lucide-react';

interface RemedyAdviceDisplayProps {
  result: BaziResult;
}

const CATEGORY_COLORS: { [key: string]: string } = {
  '补木': 'bg-green-900/30 text-green-300 border-green-500/30',
  '补火': 'bg-red-900/30 text-red-300 border-red-500/30',
  '补土': 'bg-yellow-900/30 text-yellow-300 border-yellow-500/30',
  '补金': 'bg-gray-800/30 text-gray-300 border-gray-500/30',
  '补水': 'bg-blue-900/30 text-blue-300 border-blue-500/30',
  '平衡调和': 'bg-purple-900/30 text-purple-300 border-purple-500/30'
};

export function RemedyAdviceDisplay({ result }: RemedyAdviceDisplayProps) {
  return (
    <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-amber-500/20">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-amber-200">改运指南</h2>
      </div>
      
      <div className="space-y-8">
        {result.remedyAdvice.map((advice, index) => (
          <div key={index} className="border border-amber-500/20 rounded-xl p-6 bg-gray-800/20 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{advice.icon}</span>
              <div>
                <div className={`inline-block px-4 py-2 rounded-full font-medium border ${CATEGORY_COLORS[advice.category]}`}>
                  {advice.category}
                </div>
                <h3 className="text-xl font-semibold text-amber-200 mt-2">{advice.title}</h3>
                <p className="text-sm text-amber-100/70 mt-1">{advice.description}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <h4 className="text-sm font-medium text-amber-300">改运方法</h4>
                  </div>
                  <ul className="text-sm text-amber-100/80 space-y-1">
                    {advice.methods.map((method, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 mt-1">•</span>
                        <span>{method}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <h4 className="text-sm font-medium text-blue-300">日常实践</h4>
                  </div>
                  <ul className="text-sm text-blue-100/80 space-y-1">
                    {advice.dailyPractices.map((practice, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>{practice}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Palette className="w-4 h-4 text-green-400" />
                    <h4 className="text-sm font-medium text-green-300">幸运颜色</h4>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {advice.colors.map((color, idx) => (
                      <span key={idx} className="px-3 py-1 bg-green-800/30 text-green-200 text-sm rounded-lg border border-green-600/30">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Navigation className="w-4 h-4 text-purple-400" />
                    <h4 className="text-sm font-medium text-purple-300">有利方位</h4>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {advice.directions.map((direction, idx) => (
                      <span key={idx} className="px-3 py-1 bg-purple-800/30 text-purple-200 text-sm rounded-lg border border-purple-600/30">
                        {direction}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Hash className="w-4 h-4 text-orange-400" />
                    <h4 className="text-sm font-medium text-orange-300">幸运数字</h4>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {advice.numbers.map((number, idx) => (
                      <span key={idx} className="px-3 py-1 bg-orange-800/30 text-orange-200 text-sm rounded-lg border border-orange-600/30">
                        {number}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-gradient-to-r from-indigo-900/20 to-purple-900/20 rounded-lg p-4 border border-indigo-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-medium text-indigo-300">最佳时机</span>
              </div>
              <p className="text-sm text-indigo-200/80">{advice.timing}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-gradient-to-r from-rose-900/30 to-pink-900/30 rounded-xl p-6 border border-rose-500/30">
        <h3 className="text-lg font-medium text-rose-300 mb-4">重要提醒</h3>
        <div className="text-sm text-rose-200/80 space-y-2 leading-relaxed">
          <p>• 改运方法需要持之以恒，不可三天打鱼两天晒网</p>
          <p>• 心态调整是最重要的改运方法，保持积极乐观</p>
          <p>• 命理分析仅供参考，人生掌握在自己手中</p>
          <p>• 行善积德是最根本的改运之道</p>
        </div>
      </div>
    </div>
  );
}