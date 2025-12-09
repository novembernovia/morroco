import React, { useState } from 'react';
import { Sun, Notebook } from 'lucide-react';
import { COLORS } from '../constants';

export const Header: React.FC = () => {
  const tripDate = new Date('2026-01-12');
  const today = new Date();
  const diffTime = tripDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  const statusText = diffDays > 0 
    ? `距離出發還有 ${diffDays} 天` 
    : (diffDays > -14 ? "旅程進行中！" : "旅程已圓滿結束");

  const [imgError, setImgError] = useState(false);

  // Fallback to original design if image fails to load
  if (imgError) {
    return (
      <div className={`${COLORS.header} text-white p-6 rounded-b-3xl shadow-lg relative overflow-hidden shrink-0 transition-all duration-500`}>
        <div className="absolute top-4 right-4 text-yellow-300 opacity-80 animate-pulse">
          <Sun size={60} strokeWidth={1.5} />
        </div>
        <div className="absolute top-10 left-10 text-yellow-200 opacity-30">
          <Sun size={30} />
        </div>

        <h1 className="text-3xl font-bold mb-2 tracking-wide font-serif relative z-10">摩洛哥<br/>14天探索之旅</h1>
        <p className="text-orange-50 text-lg font-medium relative z-10">2026年1月12日 - 1月25日</p>
        
        <div className="mt-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl inline-block shadow-sm relative z-10">
          <p className={`font-bold text-lg flex items-center gap-2 text-[#CC5544]`}>
             <Notebook size={20} />
            {statusText}
          </p>
        </div>
      </div>
    );
  }

  // New Image Banner Design
  return (
    <div className="relative shrink-0 shadow-xl z-10 bg-[#FDF6E3]">
      <div className="relative w-full h-[250px]">
         <img 
            src="Gemini_Generated_Image_5motya5motya5mot.jpeg" 
            alt="摩洛哥14天之旅" 
            className="w-full h-full object-cover object-center block"
            onError={() => setImgError(true)}
         />
      </div>
      
      {/* Integrated Info Bar */}
      <div className={`${COLORS.header} text-white px-5 py-4 flex items-center justify-between shadow-inner rounded-b-3xl relative -mt-1`}>
         <div className="flex flex-col leading-tight">
            <span className="text-[10px] opacity-80 font-medium tracking-wider uppercase mb-0.5">Trip Dates</span>
            <span className="text-lg font-bold font-serif">2026.01.12 - 01.25</span>
         </div>
         
         <div className="bg-white/20 backdrop-blur-md px-3 py-2 rounded-xl border border-white/30 flex items-center gap-2 shadow-sm">
            <Notebook size={16} className="text-white" />
            <span className="text-xs font-bold tracking-wide">{statusText}</span>
         </div>
      </div>
    </div>
  );
};