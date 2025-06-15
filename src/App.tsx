import React, { useState, useMemo } from 'react';
import { Sparkles, Pin as Yin, RefreshCw } from 'lucide-react';
import { DateTimeInput } from './components/DateTimeInput';
import { PillarsDisplay } from './components/PillarsDisplay';
import { ElementsAnalysis } from './components/ElementsAnalysis';
import { TenGodsAnalysis } from './components/TenGodsAnalysis';
import { calculateBazi } from './utils/baziCalculator';
import { DateInput } from './types/bazi';

function App() {
  const [dateInput, setDateInput] = useState<DateInput>({
    year: 1990,
    month: 1,
    day: 1,
    hour: 12,
    minute: 0
  });

  const baziResult = useMemo(() => {
    return calculateBazi(dateInput);
  }, [dateInput]);

  const resetToDefault = () => {
    setDateInput({
      year: new Date().getFullYear() - 30,
      month: 1,
      day: 1,
      hour: 12,
      minute: 0
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      {/* Taoist Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-amber-400 rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-amber-300 rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-amber-500 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 border-2 border-amber-400 rounded-full"></div>
      </div>

      {/* Yin Yang Symbol Background */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-3">
        <Yin className="w-96 h-96 text-amber-400/10" />
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-amber-900/20 to-orange-900/20 backdrop-blur-sm border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-full shadow-lg">
                <Yin className="w-10 h-10 text-white" />
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-3 rounded-full shadow-lg">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent mb-2">
              四柱八字排盘
            </h1>
            <p className="text-amber-200/80 text-lg">天人合一 • 阴阳五行 • 命理玄机</p>
            <div className="mt-4 flex justify-center">
              <button
                onClick={resetToDefault}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <RefreshCw className="w-4 h-4" />
                重新输入
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input */}
          <div className="lg:col-span-1">
            <DateTimeInput value={dateInput} onChange={setDateInput} />
            
            <div className="mt-8 bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-amber-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-2 rounded-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-amber-200">易经智慧</h3>
              </div>
              <div className="text-sm text-amber-100/80 space-y-3 leading-relaxed">
                <p className="border-l-2 border-amber-500 pl-3">• 天干地支承载宇宙运行规律</p>
                <p className="border-l-2 border-amber-500 pl-3">• 五行相生相克体现自然法则</p>
                <p className="border-l-2 border-amber-500 pl-3">• 阴阳平衡是万物和谐之道</p>
                <p className="border-l-2 border-amber-500 pl-3">• 十神关系揭示人生格局</p>
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-amber-800/20 to-orange-800/20 rounded-lg border border-amber-600/30">
                <p className="text-xs text-amber-200/70 text-center italic">
                  "知天命而乐，知人事而忧不惑" - 传统文化仅供参考
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2 space-y-8">
            <PillarsDisplay result={baziResult} />
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <ElementsAnalysis result={baziResult} />
              <TenGodsAnalysis result={baziResult} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative bg-gradient-to-r from-amber-900/20 to-orange-900/20 backdrop-blur-sm border-t border-amber-500/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Yin className="w-6 h-6 text-amber-400" />
              <span className="text-amber-300 font-medium">道法自然</span>
              <Yin className="w-6 h-6 text-amber-400 transform rotate-180" />
            </div>
            <p className="text-amber-200/60 text-sm">
              传承千年智慧 • 探索命运奥秘 • 理性看待人生
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;