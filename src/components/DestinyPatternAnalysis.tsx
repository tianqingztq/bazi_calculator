import React from 'react';
import { BaziResult } from '../types/bazi';
import { Crown, Star, TrendingUp, AlertCircle, Target, Compass } from 'lucide-react';

interface DestinyPatternAnalysisProps {
  result: BaziResult;
}

export function DestinyPatternAnalysis({ result }: DestinyPatternAnalysisProps) {
  const pattern = result.destinyPattern;
  
  return (
    <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-amber-500/20">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-2 rounded-lg">
          <Crown className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-amber-200">命格分析</h2>
      </div>
      
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 rounded-full">
            <span className="text-white font-bold text-lg">{pattern.name}</span>
          </div>
          <div className="flex-1">
            <p className="text-amber-100/90 text-sm leading-relaxed">{pattern.description}</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-violet-900/20 to-purple-900/20 rounded-xl p-6 border border-violet-500/30">
          <p className="text-violet-200/80 text-sm leading-relaxed italic">
            "{pattern.lifePath}"
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-amber-300">性格特征</h3>
          </div>
          <div className="space-y-2">
            {pattern.characteristics.map((char, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">•</span>
                <span className="text-amber-100/80 text-sm">{char}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold text-green-300">天赋优势</h3>
          </div>
          <div className="space-y-2">
            {pattern.advantages.map((advantage, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span className="text-green-100/80 text-sm">{advantage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-semibold text-orange-300">挑战考验</h3>
          </div>
          <div className="space-y-2">
            {pattern.challenges.map((challenge, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span className="text-orange-100/80 text-sm">{challenge}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-blue-300">事业方向</h3>
          </div>
          <div className="space-y-2">
            {pattern.careerSuggestions.map((career, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span className="text-blue-100/80 text-sm">{career}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-xl p-6 border border-emerald-500/30">
        <div className="flex items-center gap-2 mb-4">
          <Compass className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-medium text-emerald-300">五行调候</h3>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-emerald-200 mb-2">喜用五行</h4>
            <div className="flex gap-2">
              {pattern.luckyElements.map((element, index) => (
                <span key={index} className="px-3 py-1 bg-emerald-800/30 text-emerald-200 text-sm rounded-lg border border-emerald-600/30">
                  {element}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-red-200 mb-2">忌讳五行</h4>
            <div className="flex gap-2">
              {pattern.unluckyElements.map((element, index) => (
                <span key={index} className="px-3 py-1 bg-red-800/30 text-red-200 text-sm rounded-lg border border-red-600/30">
                  {element}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}