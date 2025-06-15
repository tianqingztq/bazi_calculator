import React from 'react';
import { BaziResult } from '../types/bazi';

interface PillarsDisplayProps {
  result: BaziResult;
}

const ELEMENT_COLORS: { [key: string]: string } = {
  '木': 'text-green-400 bg-green-900/30 border-green-500/30',
  '火': 'text-red-400 bg-red-900/30 border-red-500/30',
  '土': 'text-yellow-400 bg-yellow-900/30 border-yellow-500/30',
  '金': 'text-gray-300 bg-gray-800/30 border-gray-500/30',
  '水': 'text-blue-400 bg-blue-900/30 border-blue-500/30'
};

const YIN_YANG_COLORS: { [key: string]: string } = {
  'yang': 'text-orange-400 bg-orange-900/30 border-orange-500/30',
  'yin': 'text-purple-400 bg-purple-900/30 border-purple-500/30'
};

export function PillarsDisplay({ result }: PillarsDisplayProps) {
  const pillars = [
    { name: '年柱', pillar: result.pillars.year, desc: '祖辈宫' },
    { name: '月柱', pillar: result.pillars.month, desc: '父母宫' },
    { name: '日柱', pillar: result.pillars.day, desc: '夫妻宫' },
    { name: '时柱', pillar: result.pillars.hour, desc: '子女宫' }
  ];

  return (
    <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-amber-500/20">
      <h2 className="text-2xl font-bold text-amber-200 mb-8 text-center">四柱八字</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {pillars.map(({ name, pillar, desc }) => (
          <div key={name} className="text-center">
            <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-amber-500/20 backdrop-blur-sm hover:border-amber-400/40 transition-all duration-300">
              <h3 className="text-sm font-medium text-amber-300 mb-2">{name}</h3>
              <p className="text-xs text-amber-200/60 mb-4">{desc}</p>
              <div className="space-y-3">
                <div className="text-3xl font-bold text-amber-100">
                  {pillar.stem}
                </div>
                <div className="text-2xl font-semibold text-amber-200">
                  {pillar.branch}
                </div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${ELEMENT_COLORS[pillar.element]}`}>
                  {pillar.element}
                </div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${YIN_YANG_COLORS[pillar.yinYang]}`}>
                  {pillar.yinYang === 'yang' ? '阳' : '阴'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-gradient-to-r from-amber-800/20 to-orange-800/20 rounded-xl p-6 border border-amber-600/30">
        <div className="text-center">
          <span className="text-amber-300 font-medium">日主（命主）：</span>
          <span className={`inline-block ml-3 px-4 py-2 rounded-full font-bold text-lg border ${ELEMENT_COLORS[result.dayMaster]}`}>
            {result.dayMaster}
          </span>
        </div>
      </div>
    </div>
  );
}