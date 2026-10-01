import React, { useEffect } from 'react';
import { ASH_CONFIG } from '../config/ashConfig';

interface EasterEggToastProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EasterEggToast: React.FC<EasterEggToastProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onClose();
    }, 4500);

    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 max-w-sm w-[90%] sm:w-auto cursor-pointer"
      role="alert"
    >
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-[#FAF8F5] border border-[#C9A96E] shadow-[0_10px_25px_-5px_rgba(197,138,147,0.4)] animate-[rise_0.4s_ease-out_forwards]">
        <svg className="w-5 h-5 text-[#C9A96E] flex-shrink-0 animate-bounce">
          <use href="#flower" />
        </svg>
        <p className="font-serif italic text-sm sm:text-base text-[#4A4240] leading-tight">
          {ASH_CONFIG.easterEgg.message}
        </p>
        <span className="text-[10px] text-[#4A4240]/40 pl-2">✕</span>
      </div>
    </div>
  );
};
