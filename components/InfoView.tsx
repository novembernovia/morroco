import React from 'react';
import { 
  Plane, 
  Users, 
  Info, 
  AlertTriangle,
} from 'lucide-react';
import { COLORS } from '../constants';

const FlightCard = ({ type, flight1, flight2, connection, note, headerColor, bookingRef }: any) => (
  <div className="boarding-pass mb-6">
    {/* Header */}
    <div className={`${headerColor} text-white px-5 py-3 flex justify-between items-center font-bold tracking-widest text-sm`}>
      <span>{type}</span>
      <span>{bookingRef}</span>
    </div>
    
    <div className="p-6 space-y-4">
      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{flight1.date}</p>
      
      {/* Flight Segment 1 */}
      <div className="flex justify-between items-center">
        <div className="text-center">
          <div className="text-3xl font-bold text-stone-800">{flight1.from}</div>
          <div className="text-[10px] text-stone-400 font-bold uppercase">{flight1.fromCity}</div>
        </div>
        
        <div className="flex-1 flex flex-col items-center px-4">
          <p className="text-[10px] font-bold text-stone-300 mb-1">{flight1.number}</p>
          <div className="w-full h-[1px] bg-stone-100 relative">
            <Plane size={14} className="absolute -right-1 -top-[7px] text-stone-300 rotate-90" />
          </div>
          <p className="text-[10px] text-stone-400 font-bold mt-1">{flight1.duration}</p>
        </div>

        <div className="text-center">
          <div className="text-3xl font-bold text-stone-800">{flight1.to}</div>
          <div className="text-[10px] text-stone-400 font-bold uppercase">{flight1.toCity}</div>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-sm font-bold text-stone-700 px-1">
        <span>起飛: {flight1.depTime}</span>
        <div className="h-[1px] w-8 bg-stone-200"></div>
        <span>到達: {flight1.arrTime}</span>
      </div>

      <div className="pass-divider"></div>
      
      {/* Connection Info */}
      <div className="flex justify-center">
        <div className="bg-blue-50 text-blue-600 text-[10px] font-bold px-4 py-1.5 rounded-full border border-blue-100 shadow-sm">
          杜拜轉機：停留 {connection}
        </div>
      </div>
      
      <div className="pass-divider"></div>

      {/* Flight Segment 2 */}
      <div className="flex justify-between items-center">
        <div className="text-center">
          <div className="text-3xl font-bold text-stone-800">{flight2.from}</div>
          <div className="text-[10px] text-stone-400 font-bold uppercase">{flight2.fromCity}</div>
        </div>
        
        <div className="flex-1 flex flex-col items-center px-4">
          <p className="text-[10px] font-bold text-stone-300 mb-1">{flight2.number}</p>
          <div className="w-full h-[1px] bg-stone-100 relative">
            <Plane size={14} className="absolute -right-1 -top-[7px] text-stone-300 rotate-90" />
          </div>
          <p className="text-[10px] text-stone-400 font-bold mt-1">{flight2.duration}</p>
        </div>

        <div className="text-center">
          <div className="text-3xl font-bold text-stone-800">{flight2.to}</div>
          <div className="text-[10px] text-stone-400 font-bold uppercase">{flight2.toCity}</div>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-sm font-bold text-stone-700 px-1">
        <span>起飛: {flight2.depTime}</span>
        <div className="h-[1px] w-8 bg-stone-200"></div>
        <span>到達: {flight2.arrTime}</span>
      </div>
    </div>
    
    {/* Footer Alert */}
    <div className="bg-stone-50 p-4 flex items-center justify-center gap-2 border-t border-stone-100">
      <AlertTriangle size={14} className="text-orange-400" />
      <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">
        {note}
      </p>
    </div>
  </div>
);

export const InfoView: React.FC = () => {
  return (
    <div className={`p-5 pb-24 space-y-5 overflow-y-auto h-full ${COLORS.bg} no-scrollbar`}>
      <h2 className="text-2xl font-bold text-stone-800 mb-4 font-serif">旅行重要資訊</h2>
      
      {/* Departure Card */}
      <FlightCard 
        type="DEPARTURE"
        bookingRef="QA5J5B"
        headerColor="bg-[#CC5544]"
        flight1={{
          date: "1月12日 (週一) 凌晨出發",
          from: "HKG", fromCity: "Hong Kong",
          to: "DXB", toCity: "Dubai",
          number: "EK381", duration: "9h 5m",
          depTime: "00:35", arrTime: "05:40"
        }}
        connection="1小時45分"
        flight2={{
          from: "DXB", fromCity: "Dubai",
          to: "CMN", toCity: "Casablanca",
          number: "EK751", duration: "8h 45m",
          depTime: "07:25", arrTime: "13:10"
        }}
        note="特別注意：請在 1月11日 (週日) 21:30 到達香港機場"
      />

      {/* Return Card */}
      <FlightCard 
        type="RETURN"
        bookingRef="EMIRATES"
        headerColor="bg-stone-800"
        flight1={{
          date: "1月25日 (週日) 下午出發",
          from: "CMN", fromCity: "Casablanca",
          to: "DXB", toCity: "Dubai",
          number: "EK752", duration: "7h 30m",
          depTime: "15:10", arrTime: "01:40 (1/26)"
        }}
        connection="1小時25分"
        flight2={{
          from: "DXB", fromCity: "Dubai",
          to: "HKG", toCity: "Hong Kong",
          number: "EK384", duration: "10h 35m",
          depTime: "03:05", arrTime: "17:40"
        }}
        note="特別注意：請在 1月25日 (週日) 12:10 前到達機場"
      />

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
