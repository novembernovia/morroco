import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
  setCurrentDay: (day: number) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab, setCurrentDay }) => {
  return (
    <div className="p-4 space-y-4 h-full overflow-y-auto pb-24 no-scrollbar">
      {/* Guide Card - Featured */}
      <div 
         onClick={() => { setActiveTab('itinerary'); setCurrentDay(0); }}
         className="w-full bg-white p-6 rounded-2xl shadow-md flex items-center justify-between border-l-8 border-[#CC5544] active:bg-orange-50 transition cursor-pointer"
      >
        <div className="flex items-center gap-4">
           <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#E8DCC5] shrink-0 bg-gray-200">
              <img 
                src="https://picsum.photos/200/200" 
                alt="Guide" 
                className="w-full h-full object-cover scale-110" 
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display='none';
                }}
              />
           </div>
           <div className="text-left">
              <h3 className="text-xl font-bold text-[#8B4513] font-serif">開始查看行程</h3>
              <p className="text-stone-500 text-sm">Novia & Stephanie 帶你玩</p>
           </div>
        </div>
        <ArrowRight className="text-[#CC5544]" size={28} />
      </div>

      <button 
        onClick={() => setActiveTab('currency')}
        className="w-full bg-white p-6 rounded-2xl shadow-md flex items-center justify-between border-l-8 border-[#E6A33E] active:bg-amber-50 transition"
      >
        <div className="text-left">
          <h3 className="text-xl font-bold text-stone-800">匯率換算</h3>
          <p className="text-stone-500">港幣 ↔ 摩洛哥幣</p>
        </div>
        <ArrowRight className="text-[#E6A33E]" size={28} />
      </button>
      
      <button 
        onClick={() => setActiveTab('info')}
        className="w-full bg-white p-6 rounded-2xl shadow-md flex items-center justify-between border-l-8 border-[#4A6FA5] active:bg-blue-50 transition"
      >
        <div className="text-left">
          <h3 className="text-xl font-bold text-stone-800">航班與注意事項</h3>
          <p className="text-stone-500">天氣、電壓、匯率</p>
        </div>
        <ArrowRight className="text-[#4A6FA5]" size={28} />
      </button>

      <button 
        onClick={() => setActiveTab('contact')}
        className="w-full bg-white p-6 rounded-2xl shadow-md flex items-center justify-between border-l-8 border-[#556B2F] active:bg-green-50 transition"
      >
        <div className="text-left">
          <h3 className="text-xl font-bold text-stone-800">緊急聯絡</h3>
          <p className="text-stone-500">旅行社 WhatsApp</p>
        </div>
        <ArrowRight className="text-[#556B2F]" size={28} />
      </button>
    </div>
  );
};