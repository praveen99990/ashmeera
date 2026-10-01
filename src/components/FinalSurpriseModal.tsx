import React, { useState, useEffect } from 'react';
import { ASH_CONFIG } from '../config/ashConfig';
import { mediaVault } from '../utils/mediaVault';
import { AshImage } from './AshImage';

interface FinalSurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FinalSurpriseModal: React.FC<FinalSurpriseModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [showAlways, setShowAlways] = useState(false);
  const photoUrl = mediaVault.getMediaUrl(ASH_CONFIG.finalSurprise.photo);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const t = setTimeout(() => {
        setShowAlways(true);
      }, 1600);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = '';
      };
    } else {
      setShowAlways(false);
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#FCFBF9]/95 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-label="A final surprise for Ashmeera"
    >
      {/* Blooming Halo Animations */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          className="w-[120vmin] h-[120vmin] text-[#C9A96E] opacity-20 animate-[spin_160s_linear_infinite]"
          viewBox="0 0 100 100"
        >
          <g fill="none" stroke="currentColor" strokeWidth="0.7">
            <rect x="20" y="20" width="60" height="60" />
            <rect x="20" y="20" width="60" height="60" transform="rotate(45 50 50)" />
            <circle cx="50" cy="50" r="18" />
          </g>
        </svg>

        <svg
          className="w-[85vmin] h-[85vmin] text-[#C58A93] opacity-25 animate-[spin_80s_linear_infinite_reverse]"
          viewBox="-50 -50 100 100"
        >
          <use href="#flower" />
        </svg>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="fixed top-6 right-6 w-10 h-10 rounded-full bg-white/80 border border-[#C9A96E]/40 text-[#4A4240] hover:text-[#C58A93] grid place-items-center transition z-50 shadow-sm"
      >
        ✕
      </button>

      {/* Climax Content Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-xl w-full text-center flex flex-col items-center py-10 px-6 animate-[rise_0.8s_cubic-bezier(0.2,0.7,0.2,1)_forwards]"
      >
        {/* Flower Bloom Halo Framing the Center */}
        <div className="relative mb-6">
          <div className="absolute -inset-6 sm:-inset-8 pointer-events-none flex items-center justify-center">
            <svg
              className="w-full h-full text-[#C9A96E] opacity-40 animate-[spin_60s_linear_infinite]"
              viewBox="-50 -50 100 100"
            >
              <use href="#flower" />
            </svg>
          </div>

          <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full overflow-hidden border border-[#C9A96E]/40 ring-1 ring-[#C9A96E]/20 ring-offset-2 ring-offset-[#FCFBF9] p-1.5 bg-[#FCFBF9] shadow-[0_15px_35px_-10px_rgba(201,169,110,0.3)] flex items-center justify-center">
            {photoUrl ? (
              <AshImage
                src={photoUrl}
                alt="Ashmeera"
                className="w-full h-full object-cover rounded-full"
                photoTitle="Ashmeera"
                categoryTag="The Flower of Heaven"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#F8EAE8] via-[#FAF8F5] to-[#E6EDE2] flex flex-col items-center justify-center p-4 border border-[#C9A96E]/40 text-center">
                <svg className="w-10 h-10 text-[#C9A96E] mb-2 drop-shadow">
                  <use href="#star" />
                </svg>
                <p className="font-arabic text-2xl text-[#C9A96E]" dir="rtl">
                  {ASH_CONFIG.taglineArabic}
                </p>
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#6B7F64] mt-2 font-semibold">
                  {ASH_CONFIG.taglineEnglish}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Ashmeera Title */}
        <p className="font-arabic text-2xl sm:text-3xl text-[#C9A96E] mb-1" dir="rtl">
          {ASH_CONFIG.taglineArabic}
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl tracking-wide text-[#4A4240] font-normal">
          {ASH_CONFIG.finalSurprise.title}
        </h2>
        <p className="font-sans font-light text-xs sm:text-sm tracking-[0.25em] text-[#C58A93] uppercase mt-1">
          {ASH_CONFIG.finalSurprise.subtitle}
        </p>

        {/* Poetic Pledge */}
        <div className="mt-8 space-y-2">
          <p className="font-serif italic text-xl sm:text-2xl text-[#4A4240]/90">
            "{ASH_CONFIG.finalSurprise.quoteLine1}"
          </p>
          <p className="font-serif italic text-xl sm:text-2xl text-[#4A4240]/90">
            "{ASH_CONFIG.finalSurprise.quoteLine2}"
          </p>
        </div>

        {/* Climax Word */}
        <div
          className={`mt-6 transition-all duration-1000 ${
            showAlways ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <span className="font-serif italic text-3xl sm:text-4xl text-[#C58A93] font-semibold tracking-wider drop-shadow">
            {ASH_CONFIG.finalSurprise.climax}
          </span>
          <p className="font-sans text-xs tracking-widest uppercase text-[#C9A96E] mt-2 font-medium">
            With Endless Love, Yuvi ❤️
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-8 px-8 py-2.5 rounded-full border border-[#C9A96E]/40 hover:border-[#C58A93] text-xs font-sans text-[#4A4240]/70 hover:text-[#4A4240] transition"
        >
          Return to sanctuary
        </button>
      </div>
    </div>
  );
};
