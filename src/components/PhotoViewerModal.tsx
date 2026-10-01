import React, { useEffect, useState, useRef } from 'react';
import { GalleryPhotoCard } from '../config/ashConfig';
import { mediaVault } from '../utils/mediaVault';
import { AshImage } from './AshImage';
import {
  MughalCornerOrnaments,
  TajMahalArchCrest,
} from './MughalFrameDecorations';

interface PhotoItem {
  id: string;
  img: string;
  fallbackImg?: string;
  cap?: string;
  albumCaption?: string;
}

interface PhotoViewerModalProps {
  photos: PhotoItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (idx: number) => void;
}

export const PhotoViewerModal: React.FC<PhotoViewerModalProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onSelectIndex,
}) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentPhoto = photos[currentIndex] || photos[0];

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        onSelectIndex((currentIndex + 1) % photos.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        onSelectIndex((currentIndex - 1 + photos.length) % photos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock scroll
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = origOverflow;
    };
  }, [isOpen, currentIndex, photos.length, onClose, onSelectIndex]);

  if (!isOpen || !currentPhoto) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex((currentIndex - 1 + photos.length) % photos.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex((currentIndex + 1) % photos.length);
  };

  // Touch swipe handling
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      // swipe left -> next
      onSelectIndex((currentIndex + 1) % photos.length);
    } else if (diff < -50) {
      // swipe right -> prev
      onSelectIndex((currentIndex - 1 + photos.length) % photos.length);
    }
    setTouchStart(null);
  };

  return (
    <div
      ref={containerRef}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#FCFBF9]/95 backdrop-blur-md px-4 sm:px-8 py-6 sm:py-10 transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Ash's Photo Album Viewer"
    >
      {/* Background subtle Islamic watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#C9A96E_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Top Header Bar */}
      <div
        className="absolute top-4 sm:top-6 left-6 right-6 flex items-center justify-between z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-[#C9A96E]" viewBox="-50 -50 100 100">
            <g fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1">
              <ellipse cy="-24" rx="10" ry="22" />
              <ellipse cy="-24" rx="10" ry="22" transform="rotate(72)" />
              <ellipse cy="-24" rx="10" ry="22" transform="rotate(144)" />
              <ellipse cy="-24" rx="10" ry="22" transform="rotate(216)" />
              <ellipse cy="-24" rx="10" ry="22" transform="rotate(288)" />
            </g>
            <circle r="5" fill="#C9A96E" />
          </svg>
          <span className="font-serif tracking-widest text-lg sm:text-xl text-[#4A4240] font-normal">
            Ash
          </span>
          <span className="text-xs font-sans tracking-widest text-[#C9A96E] uppercase border-l border-[#C9A96E]/40 pl-3">
            Album
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-sans text-xs tracking-widest text-[#4A4240]/50">
            {String(currentIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </span>
          <button
            onClick={onClose}
            aria-label="Close album viewer"
            className="w-10 h-10 rounded-full border border-[#C9A96E]/40 hover:border-[#C58A93] bg-[#FCFBF9] text-[#4A4240] hover:text-[#C58A93] grid place-items-center transition duration-200 shadow-sm"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Luxury Photo Frame Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center p-3 sm:p-6 bg-[#FCFBF9]/95 backdrop-blur-md rounded-3xl border border-[#C9A96E]/35 shadow-[0_20px_60px_-15px_rgba(201,169,110,0.25)] transition-all duration-300 overflow-hidden"
      >
        {/* Corner Ornaments */}
        <MughalCornerOrnaments inset="inset-2.5 sm:inset-3" className="text-[#C9A96E]/55" />

        {/* Taj Mahal Arch Crest at top of modal frame */}
        <div className="pt-1 pb-2">
          <TajMahalArchCrest className="text-[#C9A96E]/50" width="w-20" />
        </div>

        {/* Double Gold Inset Border Accent */}
        <div className="relative w-full flex flex-col items-center">
          <div className="relative group overflow-hidden rounded-2xl border border-[#C9A96E]/30 ring-1 ring-[#C9A96E]/15 ring-offset-2 ring-offset-[#FCFBF9] p-1 sm:p-1.5 bg-[#FCFBF9]">
            <AshImage
              key={currentPhoto.id}
              src={mediaVault.getMediaUrl(currentPhoto.img, currentPhoto.fallbackImg)}
              fallbackSrc={currentPhoto.fallbackImg}
              alt={currentPhoto.cap || 'Ash'}
              className="max-h-[58vh] sm:max-h-[64vh] w-auto max-w-full object-contain rounded-xl shadow-inner transition-transform duration-500 ease-out"
              photoTitle={currentPhoto.cap}
              categoryTag="Ashmeera — Luxury Album"
            />
            {/* Subtle luxury shine overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/20" />
          </div>

          {/* Caption & Poetic Note */}
          <div className="text-center mt-3 sm:mt-4 max-w-xl px-4">
            {currentPhoto.cap && (
              <h3 className="font-serif italic text-lg sm:text-2xl text-[#4A4240]">
                {currentPhoto.cap}
              </h3>
            )}
            {currentPhoto.albumCaption && (
              <p className="font-sans font-light text-xs sm:text-sm text-[#4A4240]/75 mt-1 leading-relaxed">
                {currentPhoto.albumCaption}
              </p>
            )}
          </div>
        </div>

        {/* Previous Button */}
        {photos.length > 1 && (
          <button
            onClick={handlePrev}
            aria-label="Previous photograph"
            className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FCFBF9] border border-[#C9A96E]/50 hover:border-[#C58A93] hover:text-[#C58A93] text-[#4A4240] shadow-md grid place-items-center transition duration-200"
          >
            ←
          </button>
        )}

        {/* Next Button */}
        {photos.length > 1 && (
          <button
            onClick={handleNext}
            aria-label="Next photograph"
            className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FCFBF9] border border-[#C9A96E]/50 hover:border-[#C58A93] hover:text-[#C58A93] text-[#4A4240] shadow-md grid place-items-center transition duration-200"
          >
            →
          </button>
        )}
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-3 text-center pointer-events-none">
        <p className="text-[11px] font-sans tracking-widest text-[#4A4240]/40 uppercase">
          Use arrow keys or swipe to turn the page • Press Esc to close
        </p>
      </div>
    </div>
  );
};
