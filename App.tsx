import React, { useState } from 'react';
import { Calendar, MapPin, Phone, Info, Coins } from 'lucide-react';
import { COLORS } from './constants';
import { Navigation } from './components/Navigation';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { DayView } from './components/DayView';
import { CurrencyView } from './components/CurrencyView';
import { InfoView } from './components/InfoView';
import { ContactView } from './components/ContactView';

// App is the container that manages the main view state
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [currentDay, setCurrentDay] = useState(0);

  // Render the appropriate view based on activeTab
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeView 
            setActiveTab={setActiveTab} 
            setCurrentDay={setCurrentDay} 
          />
        );
      case 'itinerary':
        return (
          <DayView 
            currentDay={currentDay} 
            setCurrentDay={setCurrentDay} 
          />
        );
      case 'currency':
        return <CurrencyView />;
      case 'info':
        return <InfoView />;
      case 'contact':
        return <ContactView />;
      default:
        return <HomeView setActiveTab={setActiveTab} setCurrentDay={setCurrentDay} />;
    }
  };

  return (
    <div className={`max-w-md mx-auto h-screen ${COLORS.bg} flex flex-col font-sans relative overflow-hidden text-stone-800 shadow-2xl`}>
      
      {/* Header is only shown on Home tab */}
      {activeTab === 'home' && <Header />}
      
      {/* Main Scrollable Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;