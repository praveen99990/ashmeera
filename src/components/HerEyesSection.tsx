import React, { useState, useRef, useEffect } from 'react';
import { ASH_CONFIG } from '../config/ashConfig';
import { mediaVault } from '../utils/mediaVault';
import { AshImage } from './AshImage';
import {
  MughalCornerOrnaments,
  TajMahalArchCrest,
  TajMahalJaliWatermark,
} from './MughalFrameDecorations';

interface HerEyesSectionProps {
  onOpenPhotoViewer: (photoUrl: string, caption: string) => void;
  onOpenSecretNote: (noteId: string) => void;
}

export const HerEyesSection: React.FC<HerEyesSectionProps> = ({
  onOpenPhotoViewer,
  onOpenSecretNote,
}) => {
  const [inView, setInView] = useState(false);
  const [reflectionPos, setReflectionPos] = useState({ x: 50, y: 50 });
  const [revealedMessage, setRevealedMessage] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const photoCardRef = useRef<HTMLDivElement>(null);


  const photoUrl =
    mediaVault.getMediaUrl(ASH_CONFIG.eyesSection.photo) ||
    mediaVault.getMediaUrl('WhatsApp Image 2026-09-27 at 00.29.20 (3).jpeg') ||
    mediaVault.getMediaUrl('WhatsApp Image 2026-09-27 at 00.29.20 (1).jpeg');

  useEffect(() => {
    const timer = setTimeout(() => setInView(true), 500);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!photoCardRef.current) return;
    const rect = photoCardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setReflectionPos({ x, y });
  };

  const handleCardClick = () => {
    setRevealedMessage(true);
    if (photoUrl) {
      onOpenPhotoViewer(
        photoUrl,
        `${ASH_CONFIG.eyesSection.urduHeading} — ${ASH_CONFIG.eyesSection.heading}`
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`py-28 px-6 transition-all duration-1000 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Decorative Top Flourish */}
        <div className="flex items-center justify-center gap-3 text-[#C9A96E] mb-3">
          <span className="w-12 h-px bg-[#C9A96E]/50" />
          <svg className="w-5 h-5"><use href="#star" /></svg>
          <span className="text-[11px] font-sans uppercase tracking-[0.28em] text-[#C9A96E] font-medium">
            {ASH_CONFIG.eyesSection.romanTitle}
          </span>
          <svg className="w-5 h-5"><use href="#star" /></svg>
          <span className="w-12 h-px bg-[#C9A96E]/50" />
        </div>

        {/* Urdu Calligraphy Heading */}
        <h2 className="font-urdu text-4xl sm:text-5xl text-[#4A4240] leading-[1.8] mb-1" dir="rtl" lang="ur">
          {ASH_CONFIG.eyesSection.urduHeading}
        </h2>

        {/* English Heading */}
        <p className="font-serif italic text-2xl sm:text-3xl text-[#4A4240]/80">
          {ASH_CONFIG.eyesSection.heading}
        </p>

        {/* Subtitle */}
        <p className="font-serif italic text-sm sm:text-base text-[#6B7F64] mt-2 mb-8">
          "{ASH_CONFIG.eyesSection.subheading}"
        </p>

        {/* Calligraphic Couplet Card */}
        <div className="max-w-2xl w-full p-5 sm:p-6 mb-8 rounded-2xl bg-white/70 border border-[#C9A96E]/30 backdrop-blur-sm shadow-sm">
          <p
            className="font-urdu text-2xl sm:text-3xl text-[#4A4240] leading-[2.4] whitespace-pre-line"
            dir="rtl"
            lang="ur"
          >
            {ASH_CONFIG.eyesSection.urduVerse}
          </p>
          <div className="w-12 h-px bg-[#C9A96E]/40 mx-auto my-3" />
          <p className="font-serif italic text-xs sm:text-sm text-[#6B7F64]">
            {ASH_CONFIG.eyesSection.romanVerse}
          </p>
          <p className="font-sans font-light text-xs text-[#4A4240]/75 mt-1">
            {ASH_CONFIG.eyesSection.meaning}
          </p>
        </div>

        {/* Interactive Eye Card with Taj Mahal Manuscript Styling */}
        <div className="relative max-w-xl sm:max-w-2xl w-full">
          <div
            ref={photoCardRef}
            onMouseMove={handleMouseMove}
            onClick={handleCardClick}
            className="group relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl border border-[#C9A96E]/35 p-2.5 sm:p-3.5 bg-[#FCFBF9] shadow-[0_14px_35px_-15px_rgba(201,169,110,0.16)] transition-all duration-500 hover:scale-[1.01]"
          >
            {/* Minimal Jali Lattice Watermark */}
            <TajMahalJaliWatermark className="opacity-[0.05]" />

            {/* Corner Ornamental Hairlines */}
            <MughalCornerOrnaments inset="inset-2 sm:inset-2.5" className="text-[#C9A96E]/60" />

            {/* Subtle Taj Mahal Cusped Arch Crest */}
            <div className="pt-0.5 pb-2 flex justify-center items-center">
              <TajMahalArchCrest className="text-[#C9A96E]/50" width="w-20 sm:w-24" />
            </div>

            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl h-[238px] w-full bg-[#FAF8F5] border border-[#C9A96E]/30 ring-1 ring-[#C9A96E]/15 ring-offset-2 ring-offset-[#FCFBF9]">
              {photoUrl ? (
                <>
                  <AshImage
                    src={photoUrl}
                    alt="Her Eyes"
                    loading="lazy"
                    style={{ height: '238px', objectPosition: 'center 58%' }}
                    className="w-full h-[238px] object-cover object-[center_58%] filter contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
                    photoTitle="Her Eyes"
                    categoryTag="چشمِ یار"
                  />
                  {/* Dynamic Light Reflection Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-90 mix-blend-soft-light"
                    style={{
                      background: `radial-gradient(circle 200px at ${reflectionPos.x}% ${reflectionPos.y}%, rgba(255, 255, 255, 0.9) 0%, rgba(201, 169, 110, 0.3) 40%, transparent 80%)`,
                    }}
                  />
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                  <div className="absolute inset-0 bg-[radial-gradient(#C9A96E_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
                  <svg className="w-8 h-8 text-[#C9A96E] mb-2 drop-shadow">
                    <use href="#flower" />
                  </svg>
                  <p className="font-serif italic text-sm sm:text-base text-[#4A4240] max-w-md mx-auto leading-relaxed relative z-10">
                    {ASH_CONFIG.eyesSection.caption}
                  </p>
                </div>
              )}

              {/* Click prompt overlay if not clicked yet */}
              {!revealedMessage && (
                <div className="absolute bottom-2.5 right-3.5 font-sans text-[10px] sm:text-[11px] tracking-wider text-[#4A4240]/80 bg-white/85 backdrop-blur-sm px-3 py-0.5 rounded-full pointer-events-none border border-[#C9A96E]/40 shadow-xs transition-opacity">
                  Tap for a secret thought ✨
                </div>
              )}
            </div>

            {/* Subtle Poetic Caption Under Frame */}
            <div className="text-center pt-2 pb-0.5">
              <span className="font-serif italic text-xs text-[#4A4240]/70 tracking-wide">
                A glance touched by divine illumination • چشمِ یار
              </span>
            </div>
          </div>

          {/* Hidden Message Unveiled on Click */}
          <div
            className={`mt-6 transition-all duration-700 ease-out overflow-hidden ${
              revealedMessage
                ? 'max-h-36 opacity-100 translate-y-0'
                : 'max-h-0 opacity-0 -translate-y-2'
            }`}
          >
            <div className="inline-flex flex-col items-center px-6 py-4 rounded-xl bg-[#FAF8F5] border border-[#C9A96E]/40 shadow-sm">
              <svg className="w-5 h-5 text-[#C9A96E] mb-2 animate-pulse">
                <use href="#star" />
              </svg>
              <p className="font-serif italic text-lg sm:text-xl text-[#4A4240]">
                "{ASH_CONFIG.eyesSection.hiddenMessage}"
              </p>
              <p className="font-sans text-xs tracking-widest text-[#C58A93] uppercase mt-2">
                A quiet truth • Dedicated by Yuvi
              </p>
            </div>
          </div>
        </div>

        {/* Secret Note #3 at bottom of Eyes Section */}
        <button
          onClick={() => onOpenSecretNote('note-3')}
          className="mt-10 p-2 text-[#C9A96E]/50 hover:text-[#C58A93] transition-colors"
          title="A secret bloom"
        >
          <svg className="w-5 h-5"><use href="#flower" /></svg>
        </button>
      </div>
    </section>
  );
};
