import React from 'react';
import { BaziResult } from '../types/bazi';
import { User, Heart, Briefcase, Home } from 'lucide-react';

interface GenderAnalysisProps {
  result: BaziResult;
}

export function GenderAnalysis({ result }: GenderAnalysisProps) {
  const isMale = result.gender === 'male';
  
  return (
    <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-amber-500/20">
      <div className="flex items-center gap-3 mb-8">
        <div className={`bg-gradient-to-r p-2 rounded-lg ${
          isMale ? 'from-blue-500 to-cyan-500' : 'from-pink-500 to-rose-500'
        }`}>
          <User className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-amber-200">
          {isMale ? '男命' : '女命'}分析
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Life Phases */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-amber-300 flex items-center gap-2">
            <Home className="w-5 h-5" />
            人生阶段
          </h3>
          <div className="space-y-3">
            {result.genderAnalysis.lifePhases.map((phase, index) => (
              <div key={index} className="bg-gray-800/30 rounded-lg p-4 border border-amber-500/20">
                <p className="text-amber-100/90 text-sm leading-relaxed">{phase}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Characteristics */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-amber-300 flex items-center gap-2">
            {isMale ? <Briefcase className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
            性格特征
          </h3>
          <div className="space-y-3">
            {result.genderAnalysis.characteristics.map((characteristic, index) => (
              <div key={index} className="bg-gray-800/30 rounded-lg p-4 border border-amber-500/20">
                <p className="text-amber-100/90 text-sm leading-relaxed">{characteristic}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className={`bg-gradient-to-r rounded-xl p-6 border ${
        isMale 
          ? 'from-blue-900/30 to-cyan-900/30 border-blue-500/30' 
          : 'from-pink-900/30 to-rose-900/30 border-pink-500/30'
      }`}>
        <h3 className={`text-lg font-medium mb-4 ${
          isMale ? 'text-blue-300' : 'text-pink-300'
        }`}>
          {isMale ? '男命特色' : '女命特色'}
        </h3>
        <div className={`text-sm space-y-2 leading-relaxed ${
          isMale ? 'text-blue-200/80' : 'text-pink-200/80'
        }`}>
          {isMale ? (
            <>
              <p>• 以事业成就和社会地位为重要追求目标</p>
              <p>• 重视责任担当，具有开拓进取的精神</p>
              <p>• 在家庭中承担经济支柱和决策者角色</p>
              <p>• 感情表达相对内敛，注重实际行动</p>
            </>
          ) : (
            <>
              <p>• 以家庭和谐和情感满足为重要人生目标</p>
              <p>• 重视人际关系，具有细腻的感知能力</p>
              <p>• 在家庭中承担照顾和协调的重要角色</p>
              <p>• 感情丰富细腻，善于表达和沟通</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}