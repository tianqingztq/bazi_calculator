import React from 'react';
import { Calendar, Clock, Compass, User } from 'lucide-react';
import { DateInput } from '../types/bazi';

interface DateTimeInputProps {
  value: DateInput;
  onChange: (value: DateInput) => void;
}

export function DateTimeInput({ value, onChange }: DateTimeInputProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 150 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const handleChange = (field: keyof DateInput, newValue: number | string) => {
    onChange({ ...value, [field]: newValue });
  };

  return (
    <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-amber-500/20">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-2 rounded-lg">
          <Compass className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-amber-200">出生信息</h2>
      </div>
      
      <div className="space-y-8">
        {/* Gender Selection */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-medium text-amber-300">性别</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleChange('gender', 'male')}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                value.gender === 'male'
                  ? 'bg-blue-900/30 border-blue-500/50 text-blue-300'
                  : 'bg-gray-800/30 border-gray-600/30 text-gray-400 hover:border-amber-500/30'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">👨</div>
                <div className="font-medium">男性</div>
              </div>
            </button>
            <button
              onClick={() => handleChange('gender', 'female')}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                value.gender === 'female'
                  ? 'bg-pink-900/30 border-pink-500/50 text-pink-300'
                  : 'bg-gray-800/30 border-gray-600/30 text-gray-400 hover:border-amber-500/30'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">👩</div>
                <div className="font-medium">女性</div>
              </div>
            </button>
          </div>
        </div>

        {/* Date Selection */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-medium text-amber-300">出生日期</h3>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-amber-200 mb-3">年</label>
              <select
                value={value.year}
                onChange={(e) => handleChange('year', parseInt(e.target.value))}
                className="w-full px-4 py-3 bg-gray-800/50 border border-amber-500/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100 backdrop-blur-sm transition-all duration-300"
              >
                {years.map(year => (
                  <option key={year} value={year} className="bg-gray-800">{year}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-amber-200 mb-3">月</label>
              <select
                value={value.month}
                onChange={(e) => handleChange('month', parseInt(e.target.value))}
                className="w-full px-4 py-3 bg-gray-800/50 border border-amber-500/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100 backdrop-blur-sm transition-all duration-300"
              >
                {months.map(month => (
                  <option key={month} value={month} className="bg-gray-800">{month}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-amber-200 mb-3">日</label>
              <select
                value={value.day}
                onChange={(e) => handleChange('day', parseInt(e.target.value))}
                className="w-full px-4 py-3 bg-gray-800/50 border border-amber-500/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100 backdrop-blur-sm transition-all duration-300"
              >
                {days.map(day => (
                  <option key={day} value={day} className="bg-gray-800">{day}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Time Selection */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-medium text-amber-300">出生时间</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-amber-200 mb-3">时</label>
              <select
                value={value.hour}
                onChange={(e) => handleChange('hour', parseInt(e.target.value))}
                className="w-full px-4 py-3 bg-gray-800/50 border border-amber-500/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100 backdrop-blur-sm transition-all duration-300"
              >
                {hours.map(hour => (
                  <option key={hour} value={hour} className="bg-gray-800">{hour.toString().padStart(2, '0')}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-amber-200 mb-3">分</label>
              <select
                value={value.minute}
                onChange={(e) => handleChange('minute', parseInt(e.target.value))}
                className="w-full px-4 py-3 bg-gray-800/50 border border-amber-500/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100 backdrop-blur-sm transition-all duration-300"
              >
                {minutes.map(minute => (
                  <option key={minute} value={minute} className="bg-gray-800">{minute.toString().padStart(2, '0')}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}