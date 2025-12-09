import React from 'react';
import { Calendar, MapPin, Phone, Info, Coins } from 'lucide-react';
import { COLORS } from '../constants';

interface NavIconProps {
  TabName: string;
  Icon: React.ElementType;
  Label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavIcon: React.FC<NavIconProps> = ({ TabName, Icon, Label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${isActive ? COLORS.navActive : COLORS.navInactive}`}
  >
    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
    <span className="text-[10px] font-bold">{Label}</span>
  </button>
);

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white border-t border-stone-200 h-20 flex justify-around items-center px-2 pb-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20 shrink-0">
      <NavIcon 
        TabName="home" 
        Icon={Calendar} 
        Label="首頁" 
        isActive={activeTab === 'home'} 
        onClick={() => setActiveTab('home')} 
      />
      <NavIcon 
        TabName="itinerary" 
        Icon={MapPin} 
        Label="行程" 
        isActive={activeTab === 'itinerary'} 
        onClick={() => setActiveTab('itinerary')} 
      />
      <NavIcon 
        TabName="currency" 
        Icon={Coins} 
        Label="匯率" 
        isActive={activeTab === 'currency'} 
        onClick={() => setActiveTab('currency')} 
      />
      <NavIcon 
        TabName="info" 
        Icon={Info} 
        Label="資訊" 
        isActive={activeTab === 'info'} 
        onClick={() => setActiveTab('info')} 
      />
      <NavIcon 
        TabName="contact" 
        Icon={Phone} 
        Label="聯絡" 
        isActive={activeTab === 'contact'} 
        onClick={() => setActiveTab('contact')} 
      />
    </div>
  );
};