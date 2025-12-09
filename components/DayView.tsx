import React from 'react';
import { ArrowLeft, ArrowRight, Camera, ShoppingBag, Utensils, Info, MessageCircleHeart } from 'lucide-react';
import { itinerary, COLORS } from '../constants';

interface DayViewProps {
  currentDay: number;
  setCurrentDay: (day: number) => void;
}

const GuideAvatar = () => (
    <div className="flex flex-col items-center mr-4 shrink-0">
      <div className="w-20 h-20 bg-[#FFF8E7] rounded-full border-4 border-white shadow-lg flex items-center justify-center overflow-hidden relative bg-gray-200">
         <img 
           src="https://picsum.photos/200/200" 
           alt="Novia & Stephanie" 
           className="w-full h-full object-cover transform scale-110"
           onError={(e) => {
             const target = e.target as HTMLImageElement;
             target.style.display = 'none';
             if (target.parentNode) {
                (target.parentNode as HTMLElement).innerHTML = '<div class="text-xs text-center p-1 text-stone-500">Novia<br/>&<br/>Steph</div>';
             }
           }}
         />
      </div>
      <span className="text-[10px] font-bold text-[#CC5544] mt-2 text-center bg-white px-2 py-1 rounded-full shadow-sm border border-orange-100 leading-tight">
        Novia &<br/>Stephanie
      </span>
    </div>
);

export const DayView: React.FC<DayViewProps> = ({ currentDay, setCurrentDay }) => {
  const dayData = itinerary[currentDay];
  
  return (
    <div className="flex flex-col h-full">
      {/* Navigation - Paper Color */}
      <div className={`flex items-center justify-between p-4 ${COLORS.bg} sticky top-0 z-10 shadow-sm shrink-0 border-b border-stone-200`}>
        <button 
          onClick={() => setCurrentDay(Math.max(0, currentDay - 1))}
          disabled={currentDay === 0}
          className={`p-2 rounded-full transition-colors ${currentDay === 0 ? 'text-stone-300' : 'bg-[#E8DCC5] text-[#5C4033] hover:bg-[#d8cbb4]'}`}
        >
          <ArrowLeft size={28} />
        </button>
        
        <div className="text-center">
          <h2 className={`text-xl font-bold ${COLORS.text} font-serif`}>第 {dayData.day} 天</h2>
          <p className="text-sm text-stone-500 font-medium">{dayData.date}</p>
        </div>

        <button 
          onClick={() => setCurrentDay(Math.min(itinerary.length - 1, currentDay + 1))}
          disabled={currentDay === itinerary.length - 1}
          className={`p-2 rounded-full transition-colors ${currentDay === itinerary.length - 1 ? 'text-stone-300' : 'bg-[#E8DCC5] text-[#5C4033] hover:bg-[#d8cbb4]'}`}
        >
          <ArrowRight size={28} />
        </button>
      </div>

      <div className={`p-4 overflow-y-auto pb-24 space-y-5 ${COLORS.bg} no-scrollbar`}>
        {/* Main Card */}
        <div className="bg-white p-5 rounded-2xl shadow-md border-t-4 border-[#CC5544]">
          <h3 className="text-2xl font-bold text-[#8B4513] mb-1 font-serif">{dayData.city}</h3>
          <h4 className="text-lg text-stone-500 mb-3 font-medium">{dayData.title}</h4>
          <p className="text-stone-700 text-lg leading-relaxed mb-4">
            {dayData.content}
          </p>
          
          {/* Features Tags - Earth tones */}
          <div className="flex flex-wrap gap-2 mb-2">
              {dayData.features.map((feature, idx) => (
                  <span key={idx} className="bg-[#F0E68C]/30 text-[#556B2F] px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 border border-[#F0E68C]">
                      <Camera size={14} /> {feature}
                  </span>
              ))}
          </div>
        </div>

        {/* Guide's Tip Section - Soft Pink/Peach background like skin tone/cheeks */}
        <div className="bg-[#FFF0F0] p-4 rounded-2xl shadow-sm border border-rose-100 flex items-start">
          <GuideAvatar />
          <div className="flex-1 relative bg-white p-4 rounded-xl rounded-tl-none shadow-sm text-stone-700 text-lg border border-rose-100 mt-2">
              <div className="absolute top-0 left-0 -ml-2 w-4 h-4 bg-white border-l border-b border-rose-100 transform rotate-45"></div>
              <h5 className="font-bold text-[#CC5544] text-sm mb-1 flex items-center gap-1">
                  <MessageCircleHeart size={16} /> 導遊小叮嚀
              </h5>
              {dayData.guideTip}
          </div>
        </div>

        {/* Souvenirs / Shopping - Denim Blue accents */}
        {dayData.souvenirs && dayData.souvenirs[0] !== "無特別推薦" && (
          <div className="bg-[#F0F8FF] p-5 rounded-2xl shadow-md border border-blue-100">
              <h4 className="text-lg font-bold text-[#4682B4] mb-3 flex items-center gap-2">
              <ShoppingBag className="text-[#4682B4]" />
              這裡買什麼？(手信推薦)
              </h4>
              <ul className="grid grid-cols-1 gap-2">
                  {dayData.souvenirs.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-stone-700 text-lg bg-white px-3 py-2 rounded-lg shadow-sm">
                          <span className="text-[#4682B4]">●</span> {item}
                      </li>
                  ))}
              </ul>
          </div>
        )}

        {/* Meals - Olive Green for Included, soft Red for Self-pay */}
        <div className="bg-white p-5 rounded-2xl shadow-md">
          <h4 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
            <Utensils className="text-[#556B2F]" />
            餐食安排
          </h4>
          <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-stone-50 p-2 rounded-lg">
                  <div className="text-xs text-stone-400 mb-1 font-bold">早餐</div>
                  <div className="font-bold text-stone-700">{dayData.meals.b}</div>
              </div>
              <div className={`p-2 rounded-lg ${dayData.meals.l.includes('自理') ? 'bg-red-50 border border-red-100' : 'bg-[#F5F6F0] border border-[#E0E8D0]'}`}>
                  <div className="text-xs text-stone-400 mb-1 font-bold">午餐</div>
                  <div className={`font-bold ${dayData.meals.l.includes('自理') ? 'text-[#CC5544]' : 'text-[#556B2F]'}`}>
                      {dayData.meals.l.includes('自理') ? '自理' : dayData.meals.l}
                  </div>
              </div>
              <div className={`p-2 rounded-lg ${dayData.meals.d.includes('自理') ? 'bg-red-50 border border-red-100' : 'bg-[#F5F6F0] border border-[#E0E8D0]'}`}>
                  <div className="text-xs text-stone-400 mb-1 font-bold">晚餐</div>
                  <div className={`font-bold ${dayData.meals.d.includes('自理') ? 'text-[#CC5544]' : 'text-[#556B2F]'}`}>
                       {dayData.meals.d.includes('自理') ? '自理' : dayData.meals.d}
                  </div>
              </div>
          </div>
          {dayData.meals.l.includes('自理') && (
            <p className="mt-3 text-[#CC5544] text-sm flex items-center gap-1 font-medium">
              <Info size={14} /> 記得帶錢包吃午餐喔！
            </p>
          )}
        </div>
      </div>
    </div>
  );
};