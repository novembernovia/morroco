import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Camera, 
  Thermometer,
  Loader2,
  Wind,
  Sun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  Snowflake,
  CloudLightning 
} from 'lucide-react';
import { itinerary } from '../constants';

// --- Weather Types & Config ---
interface DailyForecast {
  date: string;
  max: number;
  min: number;
  code: number;
}

interface WeatherData {
  current: {
    temp: number;
    code: number;
    windSpeed: number;
  };
  daily: DailyForecast[];
}

interface CityWeather {
  id: string;
  name: string;
  label: string;
  lat: number;
  lng: number;
  data: WeatherData | null;
  loading: boolean;
  error: boolean;
}

const CITIES = [
  { id: 'casablanca', name: 'Casablanca', lat: 33.5731, lng: -7.5898, label: '卡薩布蘭卡' },
  { id: 'essaouira', name: 'Essaouira', lat: 31.5085, lng: -9.7595, label: '索維拉' },
  { id: 'marrakech', name: 'Marrakech', lat: 31.6295, lng: -7.9811, label: '馬拉喀什' },
  { id: 'merzouga', name: 'Merzouga', lat: 31.0802, lng: -4.0134, label: '撒哈拉' },
  { id: 'fes', name: 'Fes', lat: 34.0181, lng: -5.0078, label: '菲斯' },
  { id: 'chefchaouen', name: 'Chefchaouen', lat: 35.1716, lng: -5.2697, label: '舍夫沙萬' },
  { id: 'tangier', name: 'Tangier', lat: 35.7595, lng: -5.8340, label: '丹吉爾' },
  { id: 'rabat', name: 'Rabat', lat: 34.0209, lng: -6.8416, label: '拉巴特' },
];

const getWeatherIcon = (code: number, size = 20, className = "") => {
  if (code === 0) return <Sun size={size} className={`text-orange-400 ${className}`} />;
  if (code === 1 || code === 2 || code === 3) return <Cloud size={size} className={`text-stone-400 ${className}`} />;
  if (code >= 45 && code <= 48) return <CloudFog size={size} className={`text-slate-400 ${className}`} />;
  if (code >= 51 && code <= 57) return <CloudDrizzle size={size} className={`text-blue-300 ${className}`} />;
  if (code >= 61 && code <= 67) return <CloudRain size={size} className={`text-blue-500 ${className}`} />;
  if (code >= 71 && code <= 77) return <Snowflake size={size} className={`text-cyan-300 ${className}`} />;
  if (code >= 80 && code <= 82) return <CloudRain size={size} className={`text-blue-600 ${className}`} />;
  if (code >= 95) return <CloudLightning size={size} className={`text-yellow-500 ${className}`} />;
  return <Sun size={size} className={`text-orange-400 ${className}`} />;
};

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
  setCurrentDay: (day: number) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab, setCurrentDay }) => {
  // --- Weather Logic ---
  const [weatherList, setWeatherList] = useState<CityWeather[]>(
    CITIES.map(c => ({ ...c, data: null, loading: true, error: false }))
  );

  useEffect(() => {
    const fetchWeather = async () => {
      const promises = CITIES.map(async (city) => {
        try {
          const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=4`;
          const res = await fetch(url);
          const data = await res.json();
          if (data.error) throw new Error("API Error");

          const processedData: WeatherData = {
            current: {
              temp: Math.round(data.current.temperature_2m),
              code: data.current.weather_code,
              windSpeed: data.current.wind_speed_10m
            },
            daily: data.daily.time.slice(1, 4).map((t: string, i: number) => ({
              date: new Date(t).toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric' }),
              max: Math.round(data.daily.temperature_2m_max[i + 1]),
              min: Math.round(data.daily.temperature_2m_min[i + 1]),
              code: data.daily.weather_code[i + 1]
            }))
          };
          return { ...city, data: processedData, loading: false, error: false };
        } catch (e) {
          return { ...city, data: null, loading: false, error: true };
        }
      });
      const results = await Promise.all(promises);
      setWeatherList(results);
    };
    fetchWeather();
  }, []);

  // --- Next Attraction Logic ---
  const tripStartDate = new Date('2026-01-12T00:00:00');
  const today = new Date();
  // Reset hours to compare dates only roughly
  today.setHours(0,0,0,0);
  
  // Calculate day index (0-based)
  // If today is before start, it's -N. If today is start, it's 0.
  const diffTime = today.getTime() - tripStartDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  let highlightDayIndex = 0;
  let highlightTitle = "旅程第一站";

  if (diffDays < 0) {
    // Before trip
    highlightDayIndex = 0;
    highlightTitle = "即將前往";
  } else if (diffDays >= 0 && diffDays < itinerary.length) {
    // During trip
    highlightDayIndex = diffDays;
    highlightTitle = "今日行程重點";
  } else {
    // After trip - just show the last day or a "finished" state
    highlightDayIndex = itinerary.length - 1;
    highlightTitle = "旅程回顧";
  }

  const highlightItem = itinerary[highlightDayIndex];

  return (
    <div className="p-4 space-y-4 h-full overflow-y-auto pb-24 no-scrollbar">
      
      {/* 1. Upcoming / Current Highlight Card */}
      <div className="bg-gradient-to-r from-[#CC5544] to-[#E67E22] p-0.5 rounded-2xl shadow-lg">
        <div className="bg-white rounded-[14px] p-5">
           <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-[#CC5544] bg-orange-50 px-2 py-1 rounded-full border border-orange-100 uppercase tracking-wide">
                {highlightTitle}
              </span>
              <span className="text-xs font-bold text-gray-400">{highlightItem.date}</span>
           </div>
           
           <h3 className="text-xl font-bold text-stone-800 mb-1 flex items-center gap-2 font-serif">
              <MapPin className="text-[#CC5544]" size={20} />
              {highlightItem.city.split(' ')[0]} {/* Show first city name mainly */}
           </h3>
           <p className="text-sm text-stone-500 mb-3 pl-7">{highlightItem.title}</p>
           
           <div className="flex flex-wrap gap-2 pl-1">
              {highlightItem.features.slice(0, 3).map((feat, i) => (
                <span key={i} className="text-xs font-bold bg-stone-100 text-stone-600 px-2 py-1 rounded-md flex items-center gap-1">
                   <Camera size={12} /> {feat}
                </span>
              ))}
           </div>

           <button 
             onClick={() => { setActiveTab('itinerary'); setCurrentDay(highlightDayIndex); }}
             className="w-full mt-4 bg-[#FDF6E3] hover:bg-[#F0E68C] text-[#8B4513] text-sm font-bold py-2 rounded-xl transition-colors flex items-center justify-center gap-1"
           >
             查看詳細行程 <ArrowRight size={14} />
           </button>
        </div>
      </div>

      {/* 2. Weather Cards (Horizontal Scroll) */}
      <div>
        <h3 className="text-sm font-bold text-stone-500 mb-2 ml-1 flex items-center gap-1">
          <Thermometer size={14} /> 當地實時天氣
        </h3>
        <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar snap-x snap-mandatory">
          {weatherList.map((city) => (
            <div 
              key={city.id} 
              className="min-w-[100px] bg-white p-3 rounded-xl shadow-sm border border-stone-100 flex flex-col items-center justify-between snap-center"
            >
              <div className="text-center w-full mb-1">
                <p className="font-bold text-xs text-stone-700">{city.label}</p>
              </div>

              {city.loading ? (
                <Loader2 className="animate-spin text-stone-300 my-2" size={16} />
              ) : city.error ? (
                <span className="text-[10px] text-red-300">N/A</span>
              ) : city.data ? (
                <div className="flex flex-col items-center">
                    {getWeatherIcon(city.data.current.code, 24, "mb-1")}
                    <span className="text-xl font-bold text-stone-800 leading-none">{city.data.current.temp}°</span>
                    <div className="flex gap-1 mt-1 text-[10px] text-stone-400">
                       <span className="font-medium">H:{city.data.daily[0].max}°</span>
                       <span>L:{city.data.daily[0].min}°</span>
                    </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Existing Quick Links */}
      <div 
         onClick={() => { setActiveTab('itinerary'); setCurrentDay(0); }}
         className="w-full bg-white p-6 rounded-2xl shadow-md flex items-center justify-between border-l-8 border-[#CC5544] active:bg-orange-50 transition cursor-pointer"
      >
        <div className="flex items-center gap-4">
           <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#E8DCC5] shrink-0 bg-gray-200">
              <img 
                src="image.png" 
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