import React, { useState } from 'react';
import { Phone, Copy, CheckCircle } from 'lucide-react';
import { COLORS, emergencyContact } from '../constants';

export const ContactView: React.FC = () => {
  const [showCopyToast, setShowCopyToast] = useState(false);

  const handleCopy = (text: string) => {
    // Try using the modern clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        setShowCopyToast(true);
        setTimeout(() => setShowCopyToast(false), 2000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  };

  const fallbackCopy = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 2000);
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className={`p-5 h-full flex flex-col items-center justify-center space-y-8 ${COLORS.bg} no-scrollbar`}>
      <div className="text-center">
         <h2 className="text-2xl font-bold text-stone-800 mb-2 font-serif">遇到問題？</h2>
         <p className="text-stone-500">點擊下方按鈕複製或聯絡</p>
      </div>

      <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-xl border-t-4 border-[#556B2F]">
        <div className="flex flex-col items-center">
          <div className="bg-[#F5F6F0] p-4 rounded-full mb-4">
            <Phone size={40} className="text-[#556B2F]" />
          </div>
          <h3 className="text-xl font-bold text-stone-800 mb-1">當地緊急聯絡人</h3>
          <p className="text-stone-500 text-sm mb-4">{emergencyContact.name}</p>
          
          <div className="bg-stone-100 px-6 py-3 rounded-xl mb-6 w-full text-center">
            <span className="text-2xl font-mono font-bold text-stone-800 tracking-wider">
              {emergencyContact.phone}
            </span>
          </div>

          <button 
            onClick={() => handleCopy(emergencyContact.phone)}
            className="w-full bg-[#556B2F] hover:bg-[#4a5d29] active:bg-[#3e4f22] text-white text-xl py-4 rounded-xl font-bold shadow-lg transform transition active:scale-95 flex items-center justify-center gap-3"
          >
            <Copy size={24} />
            複製電話號碼
          </button>

          <p className="mt-4 text-sm text-stone-400 text-center">
            建議使用 WhatsApp 聯絡
          </p>
        </div>
      </div>
      
       {showCopyToast && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#2F2F2F]/90 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-2xl z-50 animate-bounce">
            <CheckCircle className="text-[#556B2F]" />
            <span>已複製電話號碼！</span>
          </div>
        )}
    </div>
  );
};