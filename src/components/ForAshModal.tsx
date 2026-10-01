import React, { useState, useEffect } from 'react';
import { ASH_CONFIG } from '../config/ashConfig';

const parseMarkdown = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i} className="italic">{part.slice(1, -1)}</em>;
    }
    return part;
  });
};

interface ForAshModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForAshModal: React.FC<ForAshModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'cover' | 'letter'>('cover');
  const [paragraphsRevealed, setParagraphsRevealed] = useState<number>(0);

  useEffect(() => {
    if (isOpen) {
      setStep('cover');
      setParagraphsRevealed(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleOpenLetter = () => {
    setStep('letter');
    // Gently reveal paragraphs one after another dynamically
    ASH_CONFIG.letter.paragraphs.forEach((_, idx) => {
      setTimeout(() => setParagraphsRevealed(idx + 1), 350 * (idx + 1));
    });
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#FCFBF9]/95 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-label="Personal dedication for Ash"
    >
      {/* Background Star */}
      <svg
        className="fixed w-[100vmin] h-[100vmin] text-[#C9A96E] opacity-20 pointer-events-none animate-[spin_180s_linear_infinite]"
        viewBox="0 0 100 100"
      >
        <g fill="none" stroke="currentColor" strokeWidth="0.8">
          <rect x="20" y="20" width="60" height="60" />
          <rect x="20" y="20" width="60" height="60" transform="rotate(45 50 50)" />
          <circle cx="50" cy="50" r="18" />
        </g>
      </svg>

      {/* Close button in top corner */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="fixed top-6 right-6 w-10 h-10 rounded-full bg-white/70 border border-[#C9A96E]/40 text-[#4A4240] hover:text-[#C58A93] grid place-items-center transition z-50 shadow-sm"
      >
        ✕
      </button>

      {/* STEP 1: COVER PRESENTATION */}
      {step === 'cover' && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-xl w-full text-center py-12 px-6 flex flex-col items-center animate-[rise_0.6s_cubic-bezier(0.2,0.7,0.2,1)_forwards]"
        >
          {/* Top Rosette */}
          <div className="w-14 h-14 rounded-full border border-[#C9A96E]/50 flex items-center justify-center text-[#C9A96E] mb-8 bg-[#FCFBF9] shadow-sm">
            <svg className="w-7 h-7"><use href="#flower" /></svg>
          </div>

          <p className="font-serif italic text-lg sm:text-2xl text-[#4A4240]/80">
            For the girl who inspired all of this.
          </p>

          <h1 className="font-serif text-4xl sm:text-6xl text-[#4A4240] tracking-wider my-4 font-normal">
            ASHMEEERA
          </h1>

          <p className="font-sans font-light tracking-[0.25em] text-[#6B7F64] text-sm sm:text-base uppercase">
            The Flower of Heaven
          </p>

          {/* Golden Divider */}
          <div className="flex items-center gap-3 my-8 text-[#C9A96E]">
            <span className="w-12 h-px bg-[#C9A96E]/50" />
            <svg className="w-4 h-4"><use href="#star" /></svg>
            <span className="w-12 h-px bg-[#C9A96E]/50" />
          </div>

          {/* Action button to open handwritten letter */}
          <button
            onClick={handleOpenLetter}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#F8EAE8] to-[#FCFBF9] border border-[#C9A96E] text-[#4A4240] hover:text-[#C58A93] hover:border-[#C58A93] shadow-sm hover:shadow-md transition-all duration-300 font-serif italic text-base sm:text-lg"
          >
            <span>Read something I wrote for you</span>
            <span className="text-[#C9A96E] group-hover:text-[#C58A93] group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </div>
      )}

      {/* STEP 2: HANDWRITTEN LETTER ON WARM IVORY PAPER */}
      {step === 'letter' && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-2xl w-full my-auto py-10 px-6 sm:px-12 rounded-2xl letter-paper animate-[rise_0.7s_cubic-bezier(0.2,0.7,0.2,1)_forwards] max-h-[90vh] flex flex-col"
        >
          {/* Subtle floral emblem on top */}
          <div className="flex-shrink-0 flex items-center justify-between border-b border-[#C9A96E]/20 pb-4 mb-6">
            <div className="flex items-center gap-2 text-[#C9A96E]">
              <svg className="w-5 h-5"><use href="#flower" /></svg>
              <span className="font-serif italic text-xs text-[#C9A96E]">
                From my heart to yours
              </span>
            </div>
            <span className="font-sans text-[11px] uppercase tracking-widest text-[#4A4240]/40">
              Personal Letter
            </span>
          </div>

          {/* Letter Body */}
          <div className="font-serif text-[#4A4240] leading-relaxed text-base sm:text-lg space-y-5 overflow-y-auto flex-1 pr-1 sm:pr-2 pb-4">
            {/* Salutation */}
            <h2 className="text-2xl sm:text-3xl text-[#4A4240] font-normal tracking-wide">
              {parseMarkdown(ASH_CONFIG.letter.recipient)}
            </h2>

            {/* Paragraphs with unfolding animation */}
            {ASH_CONFIG.letter.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={`transition-all duration-700 ease-out ${
                  paragraphsRevealed > idx
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
              >
                {parseMarkdown(p)}
              </p>
            ))}

            {/* Signoff */}
            <div
              className={`pt-6 border-t border-[#C9A96E]/20 mt-8 transition-all duration-700 delay-500 ${
                paragraphsRevealed >= ASH_CONFIG.letter.paragraphs.length
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0'
              }`}
            >
              <p className="italic text-[#4A4240]/80">
                {parseMarkdown(ASH_CONFIG.letter.signoff)}
              </p>
              <p className="font-serif text-2xl sm:text-3xl text-[#C58A93] mt-2 italic font-normal">
                {parseMarkdown(ASH_CONFIG.letter.sender)}
              </p>
            </div>
          </div>

          {/* Back button */}
          <div className="flex-shrink-0 mt-6 pt-2 text-center">
            <button
              onClick={() => setStep('cover')}
              className="text-xs font-sans text-[#4A4240]/50 hover:text-[#4A4240] transition"
            >
              ← Back to cover
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
