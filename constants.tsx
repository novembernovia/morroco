import React from 'react';
import { Plane, Sun, MapPin } from 'lucide-react';
import { ItineraryItem, EmergencyContact, ColorScheme } from './types';

// Theme Colors
export const COLORS: ColorScheme = {
  header: "bg-[#CC5544]", // Flag Red
  bg: "bg-amber-50",       // Paper Cream
  text: "text-stone-800",  // Soft Black
  accentGreen: "text-[#556B2F]", // Jacket Green
  accentBlue: "text-[#4682B4]",  // Jeans Blue
  card: "bg-white",
  navActive: "text-[#CC5544]",
  navInactive: "text-[#8B8989]", // Warm Gray
};

export const emergencyContact: EmergencyContact = {
  name: "當地緊急聯絡",
  phone: "+212 610-672-079",
  flightTo: "EK751 (13:10 抵達)",
  flightBack: "EK752 (15:10 起飛)"
};

export const itinerary: ItineraryItem[] = [
  {
    day: 1,
    date: "1月12日 (一)",
    city: "卡薩布蘭卡 → 索維拉",
    title: "抵達與啟程",
    icon: <Plane className="w-6 h-6 text-[#4A6FA5]" />,
    content: "抵達卡薩布蘭卡機場，專車接機。隨後前往索維拉展開旅程。",
    meals: { b: "機上", l: "自理", d: "包含" },
    features: ["哈桑二世清真寺 (外觀)", "大西洋沿岸公路"],
    souvenirs: ["暫無 (剛抵達，先休息)"],
    guideTip: "歡迎來到摩洛哥！第一天長途飛行辛苦了，我們直接前往海邊城市索維拉，車程中可以欣賞大西洋美景喔！記得在機場換一點點當地錢備用。"
  },
  {
    day: 2,
    date: "1月13日 (二)",
    city: "索維拉 (Essaouira)",
    title: "古港口自由活動",
    icon: <Sun className="w-6 h-6 text-[#E6A33E]" />,
    content: "漫步在迷人的大西洋海岸古城，參觀色彩艷麗的漁船、漁市集及麥地那。",
    meals: { b: "飯店", l: "自理 (推薦海鮮)", d: "包含" },
    features: ["權力遊戲取景地", "藍色小船港口", "18世紀海上堡壘"],
    souvenirs: ["阿甘油 (Argan Oil)", "Thya木雕工藝品", "銀飾"],
    guideTip: "索維拉風很大，被稱為「風之城」。這裡是買阿甘油最好的地方之一，品質通常比大城市好。午餐強烈推薦在港口吃現烤海鮮！"
  },
  {
    day: 3,
    date: "1月14日 (三)",
    city: "前往馬拉喀什",
    title: "紅色之城之路",
    icon: <MapPin className="w-6 h-6 text-[#B25E5E]" />,
    content: "前往擁有「紅色之城」美譽的馬拉喀什。參觀阿甘油提煉過程。",
    meals: { b: "飯店", l: "自理", d: "自理" },
    features: ["阿甘樹 (山羊上樹奇景)", "傳統榨油工坊"],
    souvenirs: ["食用/美容阿甘油", "阿甘油肥皂"],
    guideTip: "路上我們會經過阿甘樹林，運氣好可以看到山羊站在樹上吃果子！這天會參觀婦女合作社，看看神奇的摩洛哥油是怎麼做出來的。"
  },
  {
    day: 4,
    date: "1月15日 (四)",
    city: "馬拉喀什 (Marrakech)",
    title: "古城深度遊",
    icon: <MapPin className="w-6 h-6 text-[#B25E5E]" />,
    content: "參觀庫圖比亞清真寺、巴伊亞宮殿、YSL博物館。晚上德吉瑪廣場自由活動。",
    meals: { b: "飯店", l: "自理", d: "自理" },
    features: ["YSL 聖羅蘭花園", "德吉瑪不眠廣場", "巴伊亞宮殿"],
    souvenirs: ["皮拖鞋 (Babouche)", "香料", "摩洛哥地毯", "銅燈"],
    guideTip: "今天行程很豐富！YSL花園拍照超美（記得穿亮色衣服）。晚上的廣場很熱鬧，有弄蛇人、雜技表演，過馬路要小心摩托車喔！"
  },
  {
    day: 5,
    date: "1月16日 (五)",
    city: "埃本哈杜 → 玫瑰谷",
    title: "電影與玫瑰",
    icon: <MapPin className="w-6 h-6 text-[#6B8E23]" />,
    content: "參觀《權力遊戲》取景地埃本哈杜古城。途經玫瑰城市。",
    meals: { b: "飯店", l: "自理", d: "包含" },
    features: ["泥磚古城 (Ksar)", "千堡之路", "玫瑰谷"],
    souvenirs: ["玫瑰水", "玫瑰精油", "玫瑰護手霜"],
    guideTip: "埃本哈杜是世界遺產，很多好萊塢大片都在這拍。下午經過玫瑰谷，這裡的玫瑰水很純天然，是很棒的伴手禮，送給親戚朋友最合適！"
  },
  {
    day: 6,
    date: "1月17日 (六)",
    city: "托德拉 → 撒哈拉",
    title: "前進沙漠",
    icon: <Sun className="w-6 h-6 text-[#E6A33E]" />,
    content: "經過壯觀的髮夾灣與托德拉峽谷。抵達沙漠後騎駱駝看日落。",
    meals: { b: "飯店", l: "自理", d: "包含" },
    features: ["托德拉峽谷 (300米高壁)", "騎駱駝體驗", "沙漠星空"],
    souvenirs: ["撒哈拉沙子 (自裝)", "頭巾 (防風沙用)"],
    guideTip: "今晚是重頭戲！我們會騎駱駝進沙漠看日落。記得帶一件厚外套，沙漠晚上非常冷。晚上有營火晚會，大家一起打鼓跳舞！"
  },
  {
    day: 7,
    date: "1月18日 (日)",
    city: "撒哈拉沙漠",
    title: "沙漠深度探索",
    icon: <Sun className="w-6 h-6 text-[#E6A33E]" />,
    content: "探訪遊牧民族，體驗帳篷生活。參觀廢棄礦村及化石區。",
    meals: { b: "飯店", l: "自理", d: "包含" },
    features: ["拜訪遊牧家庭", "黑奴村格納瓦音樂", "化石開採地"],
    souvenirs: ["三葉蟲化石", "沙漠玫瑰石", "椰棗"],
    guideTip: "今天很輕鬆，去看看真正的遊牧民族怎麼生活。這一帶盛產化石，可以看到幾億年前海洋生物的痕跡，非常神奇。"
  },
  {
    day: 8,
    date: "1月19日 (一)",
    city: "撒哈拉 → 菲斯",
    title: "穿越阿特拉斯山",
    icon: <MapPin className="w-6 h-6 text-[#6B8E23]" />,
    content: "清晨看日出，隨後長途車程前往千年古城菲斯。",
    meals: { b: "飯店", l: "自理", d: "包含" },
    features: ["伊夫蘭 (小瑞士)", "猴子森林"],
    souvenirs: ["路途休息站的蘋果/水果"],
    guideTip: "今天要坐比較久的車，中間會經過像歐洲一樣的「小瑞士」伊夫蘭，完全不像非洲！如果運氣好，在森林還能看到野生猴子。"
  },
  {
    day: 9,
    date: "1月20日 (二)",
    city: "菲斯 (Fes)",
    title: "千年迷宮古城",
    icon: <MapPin className="w-6 h-6 text-[#B25E5E]" />,
    content: "探索菲斯老城區（麥地那）。參觀皮革廠（染坊）及傳統工藝。",
    meals: { b: "飯店", l: "自理", d: "包含" },
    features: ["皮革染坊 (大染缸)", "藍門", "古蘭經學院"],
    souvenirs: ["皮衣/皮包 (最有名)", "馬賽克陶瓷", "銅盤"],
    guideTip: "菲斯有九千多條巷子，千萬別自己亂跑，一定要跟緊導遊！這裡的皮具世界聞名，染坊的味道雖然重，但景象非常壯觀。"
  },
  {
    day: 10,
    date: "1月21日 (三)",
    city: "菲斯 → 舍夫沙萬",
    title: "羅馬遺跡與藍城",
    icon: <MapPin className="w-6 h-6 text-[#4A6FA5]" />,
    content: "參觀瓦盧比利斯羅馬古城。傍晚抵達藍色山城看日落。",
    meals: { b: "飯店", l: "自理", d: "包含" },
    features: ["瓦盧比利斯 (羅馬遺址)", "西班牙清真寺日落"],
    souvenirs: ["路邊攤販的水果"],
    guideTip: "下午就會到夢幻的藍色山城！傍晚我們稍微爬一點山路去西班牙清真寺，那是俯瞰整個藍城全景最棒的地方。"
  },
  {
    day: 11,
    date: "1月22日 (四)",
    city: "舍夫沙萬 (Chefchaouen)",
    title: "藍色童話漫步",
    icon: <MapPin className="w-6 h-6 text-[#4A6FA5]" />,
    content: "全日在藍色山城自由活動。每個角落都適合拍照。",
    meals: { b: "飯店", l: "自理", d: "包含" },
    features: ["藍色階梯", "網紅拍照點", "貓咪"],
    souvenirs: ["羊毛編織外套 (Djellaba)", "手工香皂", "編織毯"],
    guideTip: "今天是完全放鬆的一天。這裡的羊毛製品很便宜又暖和，還有色彩繽紛的手工皂。盡情拍照吧，這裡隨便拍都像明信片！"
  },
  {
    day: 12,
    date: "1月23日 (五)",
    city: "舍夫沙萬 → 丹吉爾",
    title: "海角天涯",
    icon: <MapPin className="w-6 h-6 text-[#4A6FA5]" />,
    content: "前往丹吉爾，隔海眺望西班牙。參觀大力神洞穴。",
    meals: { b: "飯店", l: "自理", d: "包含" },
    features: ["大力神洞穴 (非洲地圖形狀)", "斯帕特爾海角 (大西洋地中海交界)"],
    souvenirs: ["無特別推薦"],
    guideTip: "我們到了非洲的最北端！左邊是大西洋，右邊是地中海。天氣好的話，對面歐洲西班牙的房子都看得很清楚喔！"
  },
  {
    day: 13,
    date: "1月24日 (六)",
    city: "拉巴特 → 卡薩布蘭卡",
    title: "皇城巡禮",
    icon: <MapPin className="w-6 h-6 text-[#5C5C5C]" />,
    content: "參觀首都拉巴特：哈桑塔、穆罕默德五世陵墓。隨後返回卡薩布蘭卡。",
    meals: { b: "飯店", l: "自理", d: "包含" },
    features: ["哈桑塔", "皇家陵墓", "烏達亞堡"],
    souvenirs: ["旅程最後補貨"],
    guideTip: "拉巴特是摩洛哥的首都，感覺比較現代化。參觀完陵墓後，我們就準備回到卡薩布蘭卡，旅程接近尾聲了。"
  },
  {
    day: 14,
    date: "1月25日 (日)",
    city: "卡薩布蘭卡 → 返港",
    title: "再見摩洛哥",
    icon: <Plane className="w-6 h-6 text-[#4A6FA5]" />,
    content: "參觀海上清真寺「哈桑二世清真寺」。前往機場。",
    meals: { b: "飯店", l: "-", d: "-" },
    features: ["世界第三大清真寺", "海上建築奇觀"],
    souvenirs: ["美好的回憶"],
    guideTip: "最後一站是壯觀的海上清真寺，一半建築在海上。看完後我們就要去機場了，記得檢查護照和隨身行李喔！一路順風！"
  }
];