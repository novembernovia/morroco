import React, { useState } from 'react';
import { Calculator, RefreshCw } from 'lucide-react';
import { COLORS } from '../constants';

export const CurrencyView: React.FC = () => {
  const [hkd, setHkd] = useState('');
  const [mad, setMad] = useState('');
  const RATE = 1.3; 

  const handleHkdChange = (value: string) => {
    setHkd(value);
    if (value === '') {
      setMad('');
    } else {
      setMad((parseFloat(value) * RATE).toFixed(1));
    }
  };

  const handleMadChange = (value: string) => {
    setMad(value);
    if (value === '') {
      setHkd('');
    } else {
      setHkd((parseFloat(value) / RATE).toFixed(1));
    }
  };

  const resetCurrency = () => {
    setHkd('');
    setMad('');
  };

  return (
    <div className={`p-5 h-full flex flex-col items-center ${COLORS.bg} pb-24 overflow-y-auto no-scrollbar`}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-stone-800 mb-1 flex items-center justify-center gap-2 font-serif">
          <Calculator className="text-[#4682B4]" />
          匯率換算
        </h2>
        <p className="text-stone-500">輸入任一欄位即可自動換算</p>
        <div className="mt-2 bg-[#E6E6FA] text-[#483D8B] px-4 py-1 rounded-full text-sm font-bold inline-block border border-purple-100">
          參考匯率：1 港幣 ≈ {RATE} 摩洛哥幣
        </div>
      </div>

      <div className="w-full max-w-sm space-y-6">
        
        {/* MAD */}
        <div className="bg-white p-6 rounded-3xl shadow-md border-2 border-stone-100 focus-within:border-[#CC5544] transition-all">
          <label className="text-stone-500 font-bold text-lg block mb-2 flex justify-between">
            <span>摩洛哥幣 (MAD)</span>
            <span className="text-2xl">🇲🇦</span>
          </label>
          <div className="relative">
            <input 
              type="number" 
              value={mad}
              onChange={(e) => handleMadChange(e.target.value)}
              placeholder="輸入價格"
              className="w-full text-4xl font-bold text-stone-800 outline-none placeholder-stone-200"
            />
            <span className="absolute right-0 bottom-2 text-stone-300 font-bold">DH</span>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center -my-2 z-10 relative">
            <div className="bg-[#CC5544] rounded-full p-2 text-white shadow-lg border-2 border-amber-50">
                <RefreshCw size={24} />
            </div>
        </div>

        {/* HKD */}
        <div className="bg-white p-6 rounded-3xl shadow-md border-2 border-stone-100 focus-within:border-[#556B2F] transition-all">
          <label className="text-stone-500 font-bold text-lg block mb-2 flex justify-between">
            <span>港幣 (HKD)</span>
            <span className="text-2xl">🇭🇰</span>
          </label>
          <div className="relative">
            <input 
              type="number" 
              value={hkd}
              onChange={(e) => handleHkdChange(e.target.value)}
              placeholder="0.0"
              className="w-full text-4xl font-bold text-[#556B2F] outline-none placeholder-stone-200"
            />
            <span className="absolute right-0 bottom-2 text-stone-300 font-bold">$</span>
          </div>
        </div>

        {/* Quick Buttons - using soft earth tones */}
        <div className="mt-8">
            <p className="text-stone-600 font-bold mb-3">當地價格快速查看：</p>
            <div className="grid grid-cols-3 gap-3">
                {[50, 100, 200, 500, 1000].map((amt) => (
                    <button 
                        key={amt}
                        onClick={() => handleMadChange(amt.toString())}
                        className="bg-[#FAF9F6] border border-stone-200 text-stone-600 py-3 rounded-xl font-bold text-lg shadow-sm hover:bg-[#F5F5DC] active:scale-95 transition"
                    >
                        {amt}
                    </button>
                ))}
                 <button 
                    onClick={resetCurrency}
                    className="bg-[#FFF0F0] text-[#CC5544] border border-rose-100 py-3 rounded-xl font-bold text-lg shadow-sm active:scale-95 transition"
                >
                    清除
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};