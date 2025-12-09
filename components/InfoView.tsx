import React from 'react';
import { 
  Plane, 
  Users, 
  Info, 
} from 'lucide-react';
import { COLORS } from '../constants';

export const InfoView: React.FC = () => {
  return (
    <div className={`p-5 pb-24 space-y-5 overflow-y-auto h-full ${COLORS.bg} no-scrollbar`}>
      <h2 className="text-2xl font-bold text-stone-800 mb-4 font-serif">旅行重要資訊</h2>
      
      {/* Flight Info */}
      <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-[#4A6FA5]">
        <h3 className="text-xl font-bold text-[#4A6FA5] mb-3 flex items-center gap-2">
          <Plane /> 航班資訊 (阿聯酋)
        </h3>
        <div className="space-y-4">
          <div className="bg-[#F0F8FF] p-4 rounded-xl">
            <p className="text-sm text-[#4682B4] font-bold">去程 | 1月12日</p>
            <p className="text-2xl font-bold text-stone-800">EK751</p>
            <p className="text-stone-700 text-lg">13:10 抵達卡薩布蘭卡</p>
          </div>
          <div className="bg-[#F0F8FF] p-4 rounded-xl">
            <p className="text-sm text-[#4682B4] font-bold">回程 | 1月25日</p>
            <p className="text-2xl font-bold text-stone-800">EK752</p>
            <p className="text-stone-700 text-lg">15:10 起飛離開</p>
            <p className="text-[#CC5544] text-sm mt-1 font-bold">※ 請務必於 12:10 前抵達機場</p>
          </div>
        </div>
      </div>

      {/* Group Members */}
      <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-[#8A2BE2]">
        <h3 className="text-xl font-bold text-[#8A2BE2] mb-3 flex items-center gap-2">
          <Users /> 同行團友 (5人)
        </h3>
        <ul className="text-lg text-stone-700 space-y-2 list-disc list-inside">
          <li>李桂嬋 (Lee Kwai Sim)</li>
          <li>歐玉璋 (Au Yuk Cheung)</li>
          <li>歐曉朗 (Au Hiu Long)</li>
          <li>董敏兒 (Tung Mun Yee)</li>
          <li>李忠顯 (Lee Chung Hin)</li>
        </ul>
      </div>

      {/* Tips */}
      <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-[#E6A33E]">
        <h3 className="text-xl font-bold text-[#D2691E] mb-3 flex items-center gap-2">
          <Info /> 溫馨提示
        </h3>
        <ul className="space-y-3 text-lg text-stone-700">
          <li className="flex gap-2">
            <span className="text-[#E6A33E]">🧥</span> 
            <span>1月天氣溫差大，早晚涼爽，沙漠夜晚寒冷，請務必攜帶保暖外套。</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#E6A33E]">💵</span> 
            <span>準備歐元 (Euro) 到當地兌換迪拉姆 (Dirham)。</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#E6A33E]">🔌</span> 
            <span>摩洛哥電壓為 220V，插座通常為兩孔圓形 (歐規)。</span>
          </li>
        </ul>
      </div>
    </div>
  );
};