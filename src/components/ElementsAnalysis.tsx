import React from 'react';
import { BaziResult } from '../types/bazi';

interface ElementsAnalysisProps {
  result: BaziResult;
}

const ELEMENT_COLORS: { [key: string]: string } = {
  '木': 'bg-green-500',
  '火': 'bg-red-500',
  '土': 'bg-yellow-500',
  '金': 'bg-gray-400',
  '水': 'bg-blue-500'
};

const ELEMENT_NAMES: { [key: string]: string } = {
  '木': 'Wood',
  '火': 'Fire',
  '土': 'Earth',
  '金': 'Metal',
  '水': 'Water'
};

const ELEMENT_SYMBOLS: { [key: string]: string } = {
  '木': '🌳',
  '火': '🔥',
  '土': '🏔️',
  '金': '⚡',
  '水': '🌊'
};

const STRENGTH_COLORS: { [key: string]: string } = {
  'strong': 'text-green-400 bg-green-900/30 border-green-500/30',
  'normal': 'text-amber-400 bg-amber-900/30 border-amber-500/30',
  'weak': 'text-red-400 bg-red-900/30 border-red-500/30'
};

const STRENGTH_LABELS: { [key: string]: string } = {
  'strong': '偏旺',
  'normal': '平衡',
  'weak': '偏弱'
};

export function ElementsAnalysis({ result }: ElementsAnalysisProps) {
  const maxValue = Math.max(...Object.values(result.elementStats));
  
  return (
    <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-amber-500/20">
      <h2 className="text-2xl font-bold text-amber-200 mb-8">五行分析</h2>
      
      <div className="space-y-6 mb-8">
        {Object.entries(result.elementStats).map(([element, count]) => (
          <div key={element} className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{ELEMENT_SYMBOLS[element]}</span>
                <span className="font-medium text-amber-200">
                  {element} ({ELEMENT_NAMES[element]})
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-amber-100">{count}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${STRENGTH_COLORS[result.elementStrength[element]]}`}>
                  {STRENGTH_LABELS[result.elementStrength[element]]}
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-800/50 rounded-full h-4 border border-gray-700/50">
              <div
                className={`h-4 rounded-full transition-all duration-1000 ${ELEMENT_COLORS[element]} shadow-lg`}
                style={{ width: `${(count / maxValue) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-xl p-6 border border-indigo-500/30">
        <h3 className="text-lg font-medium text-indigo-300 mb-4">五行相生相克</h3>
        <div className="text-sm text-indigo-200/80 space-y-2 leading-relaxed">
          <p>• <span className="text-green-400">偏旺</span>：该五行力量强盛，主导性格特征</p>
          <p>• <span className="text-amber-400">平衡</span>：该五行力量适中，发展和谐</p>
          <p>• <span className="text-red-400">偏弱</span>：该五行力量不足，需要补强</p>
        </div>
      </div>
    </div>
  );
}