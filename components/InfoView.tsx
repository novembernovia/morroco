import React, { useState, useEffect } from 'react';
import { 
  Plane, 
  Users, 
  Info, 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudLightning, 
  Snowflake, 
  CloudDrizzle, 
  CloudFog, 
  Thermometer, 
  Loader2, 
  Wind, 
  MapPin 
} from 'lucide-react';
import { COLORS } from '../constants';

// --- Weather Types & Data ---

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

// Helper to map WMO codes to Icons
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

export const InfoView: React.FC = () => {
  const [weatherList, setWeatherList] = useState<CityWeather[]>(
    CITIES.map(c => ({ ...c, data: null, loading: true, error: false }))
  );

  useEffect(() => {
    const fetchWeather = async () => {
      const promises = CITIES.map(async (city) => {
        try {
          // Open-Meteo API
          const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=4`;
          const res = await fetch(url);
          const data = await res.json();

          if (data.error) throw new Error("API Error");

          // Process Data
          const processedData: WeatherData = {
            current: {
              temp: Math.round(data.current.temperature_2m),
              code: data.current.weather_code,
              windSpeed: data.current.wind_speed_10m
            },
            // Slice(1) because index 0 is today, we want next 3 days for forecast rows
            daily: data.daily.time.slice(1, 4).map((t: string, i: number) => ({
              date: new Date(t).toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric' }),
              max: Math.round(data.daily.temperature_2m_max[i + 1]),
              min: Math.round(data.daily.temperature_2m_min[i + 1]),
              code: data.daily.weather_code[i + 1]
            }))
          };

          return { ...city, data: processedData, loading: false, error: false };
        } catch (e) {
          console.error(`Failed to fetch weather for ${city.name}`, e);
          return { ...city, data: null, loading: false, error: true };
        }
      });

      const results = await Promise.all(promises);
      setWeatherList(results);
    };

    fetchWeather();
  }, []);

  return (
    <div className={`p-5 pb-24 space-y-5 overflow-y-auto h-full ${COLORS.bg} no-scrollbar`}>
      <h2 className="text-2xl font-bold text-stone-800 mb-4 font-serif">旅行重要資訊</h2>
      
      {/* Weather Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-2xl shadow-md border border-blue-100">
        <h3 className="text-xl font-bold text-[#4682B4] mb-4 flex items-center gap-2">
          <Thermometer className="text-[#4682B4]" /> 當地天氣預報
        </h3>
        
        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar snap-x snap-mandatory">
          {weatherList.map((city) => (
            <div 
              key={city.id} 
              className="min-w-[160px] bg-white p-4 rounded-xl shadow-sm border border-blue-50 flex flex-col items-center justify-between snap-center"
            >
              <div className="text-center w-full border-b border-stone-100 pb-2 mb-2">
                <p className="font-bold text-stone-700">{city.label}</p>
                <p className="text-[10px] text-stone-400 uppercase tracking-wider">{city.name}</p>
              </div>

              {city.loading ? (
                <div className="py-8 flex justify-center text-blue-300">
                  <Loader2 className="animate-spin" />
                </div>
              ) : city.error ? (
                <div className="py-8 text-xs text-red-400 text-center">
                  無法載入
                </div>
              ) : city.data ? (
                <>
                  <div className="flex flex-col items-center mb-4">
                    {getWeatherIcon(city.data.current.code, 40, "mb-1")}
                    <span className="text-3xl font-bold text-stone-800">{city.data.current.temp}°</span>
                    {city.data.current.windSpeed > 20 && (
                       <span className="text-[10px] text-stone-500 flex items-center gap-1 mt-1">
                         <Wind size={10} /> 強風
                       </span>
                    )}
                  </div>

                  <div className="w-full space-y-1">
                    {city.data.daily.map((day, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs text-stone-500 bg-stone-50 px-2 py-1 rounded">
                        <span>{day.date}</span>
                        <div className="flex items-center gap-2">
                          {getWeatherIcon(day.code, 12)}
                          <span className="font-bold">{day.min}°-{day.max}°</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          ))}
        </div>
        <p className="text-[10px] text-stone-400 text-center mt-1">資料來源: Open-Meteo</p>
      </div>

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
