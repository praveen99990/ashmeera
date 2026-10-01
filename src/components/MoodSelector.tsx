import React from 'react';
import { MoodKey, MOODS, MOOD_ORDER } from '../utils/moodOfAshmeera';

interface MoodSelectorProps {
  currentMood: MoodKey;
  onSelectMood: (mood: MoodKey) => void;
  className?: string;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  currentMood,
  onSelectMood,
  className = '',
}) => {
  const activeInfo = MOODS[currentMood] || MOODS.dreamy;

  return (
    <div className={`flex flex-col items-center gap-2.5 ${className}`}>
      {/* Subtle refined header badge */}
      <div className="flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase font-sans text-[#4A4240]/50">
        <span className="w-5 h-px bg-[#C9A96E]/40" />
        <span>Mood of Ashmeera • مزاجِ اشمیرا</span>
        <span className="w-5 h-px bg-[#C9A96E]/40" />
      </div>

      {/* Segmented Pill Selector with warm luxury styling */}
      <div
        role="tablist"
        aria-label="Select Mood of Ashmeera"
        className="inline-flex items-center p-1 rounded-full bg-[#FAF8F5]/90 border border-[#C9A96E]/30 shadow-xs backdrop-blur-xs max-w-full overflow-x-auto scrollbar-none"
      >
        {MOOD_ORDER.map((key) => {
          const info = MOODS[key];
          const isCurrent = currentMood === key;
          return (
            <button
              key={key}
              role="tab"
              aria-selected={isCurrent}
              onClick={() => onSelectMood(key)}
              title={`${info.nameEnglish} (${info.nameUrdu}): ${info.poeticNote}`}
              className={`relative px-3 sm:px-4 py-1.5 rounded-full text-xs font-serif transition-all duration-500 whitespace-nowrap flex items-center gap-1.5 ${
                isCurrent
                  ? `${info.pillBg} ${info.pillText} font-medium shadow-xs border ${info.pillBorder} scale-[1.02]`
                  : 'text-[#4A4240]/60 hover:text-[#4A4240] hover:bg-white/40 border border-transparent'
              }`}
            >
              <span className="text-xs transition-transform duration-300">
                {info.symbol}
              </span>
              <span className="tracking-wide">{info.nameEnglish}</span>
              {isCurrent && (
                <span
                  className="w-1.5 h-1.5 rounded-full transition-all duration-500 animate-pulse"
                  style={{ backgroundColor: info.accentBorder }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Poetic description for the currently selected mood */}
      <p className="text-[11px] sm:text-xs font-serif italic text-[#4A4240]/60 transition-all duration-500 text-center max-w-md px-4">
        <span className="font-urdu not-italic text-[13px] text-[#4A4240]/80 mr-1.5">
          {activeInfo.nameUrdu}
        </span>
        <span className="text-[#C9A96E] mr-1.5">—</span>
        <span>{activeInfo.poeticNote}</span>
      </p>
    </div>
  );
};
