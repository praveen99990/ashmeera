import React, { useEffect } from 'react';
import { ASH_CONFIG } from '../config/ashConfig';

interface SecretNotesManagerProps {
  activeNoteId: string | null;
  onClose: () => void;
}

export const SecretNotesManager: React.FC<SecretNotesManagerProps> = ({
  activeNoteId,
  onClose,
}) => {
  const note = ASH_CONFIG.secretNotes.find((n) => n.id === activeNoteId);

  useEffect(() => {
    if (!activeNoteId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeNoteId, onClose]);

  if (!note) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-[2px] transition-all duration-300"
      role="dialog"
      aria-label="A hidden note for Ash"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-sm w-full bg-[#FAF8F5] border border-[#C9A96E]/50 rounded-2xl p-6 sm:p-7 shadow-[0_15px_35px_-10px_rgba(197,138,147,0.35)] text-center animate-[rise_0.4s_cubic-bezier(0.2,0.7,0.2,1)_forwards]"
      >
        {/* Decorative inner hairline border */}
        <div className="absolute inset-2 border border-[#C9A96E]/20 rounded-xl pointer-events-none" />

        {/* Flower ornament */}
        <div className="flex justify-center mb-3">
          <svg className="w-6 h-6 text-[#C9A96E] animate-pulse">
            <use href="#flower" />
          </svg>
        </div>

        <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#C9A96E] font-medium mb-2">
          A Secret Thought
        </p>

        <p className="font-serif italic text-xl sm:text-2xl text-[#4A4240] leading-relaxed my-3">
          "{note.message}"
        </p>

        <div className="mt-4 pt-3 border-t border-[#C9A96E]/20 flex items-center justify-between">
          <span className="font-sans text-[10px] tracking-wider text-[#4A4240]/40 uppercase">
            Just for Ash
          </span>
          <button
            onClick={onClose}
            className="text-xs font-sans text-[#C58A93] hover:text-[#4A4240] transition-colors py-1 px-3 rounded-full hover:bg-[#C9A96E]/10"
          >
            Close ✕
          </button>
        </div>
      </div>
    </div>
  );
};
