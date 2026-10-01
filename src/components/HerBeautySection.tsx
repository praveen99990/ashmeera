import React from 'react';
import { ASH_CONFIG } from '../config/ashConfig';
import { mediaVault } from '../utils/mediaVault';
import { AshImage } from './AshImage';
import {
  MughalCornerOrnaments,
  TajMahalArchCrest,
  TajMahalJaliWatermark,
} from './MughalFrameDecorations';

interface HerBeautySectionProps {
  onOpenPhotoViewer: (photoUrl: string, caption: string) => void;
  onOpenSecretNote?: (id: string) => void;
}

export const HerBeautySection: React.FC<HerBeautySectionProps> = ({
  onOpenPhotoViewer,
  onOpenSecretNote,
}) => {
  const photoUrl = mediaVault.getMediaUrl(ASH_CONFIG.beautySection.photo);

  return (
    <section className="relative py-28 px-5 sm:px-8 overflow-hidden bg-gradient-to-b from-transparent via-[#F8EAE8]/30 to-transparent">
      {/* Background Soft Rosette Motif */}
      <div className="absolute left-1/2 -translate-x-1/2 top-10 w-[600px] h-[600px] pointer-events-none opacity-10 text-[#C9A96E]">
        <svg viewBox="-50 -50 100 100" className="w-full h-full fill-current">
          <use href="#flower" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Kicker */}
        <div className="flex items-center justify-center gap-3 text-[#C9A96E] mb-3">
          <span className="w-12 h-px bg-[#C9A96E]/50" />
          <svg className="w-4 h-4"><use href="#star" /></svg>
          <span className="font-sans text-[11px] uppercase tracking-[0.28em] text-[#C9A96E] font-medium">
            {ASH_CONFIG.beautySection.romanTitle}
          </span>
          <svg className="w-4 h-4"><use href="#star" /></svg>
          <span className="w-12 h-px bg-[#C9A96E]/50" />
        </div>

        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-urdu text-3xl sm:text-5xl text-[#4A4240] leading-[1.8] mb-1" dir="rtl" lang="ur">
            {ASH_CONFIG.beautySection.urduHeading}
          </h2>
          <p className="font-serif italic text-2xl sm:text-3xl text-[#4A4240]/80">
            {ASH_CONFIG.beautySection.heading}
          </p>
          <p className="font-serif italic text-sm sm:text-base text-[#6B7F64] mt-2">
            {ASH_CONFIG.beautySection.subheading}
          </p>
        </div>

        {/* Cinematic Presentation: Left Ornate Mirror Frame / Right Sufi Ode */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-10 lg:gap-14">
          {/* Left Column: Ornate Mirror Frame (5 cols) */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative group max-w-sm w-full">
              {/* Soft Rose Glow */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#C58A93]/25 via-[#C9A96E]/20 to-[#E9C9CB]/35 rounded-[2.5rem] blur-xl transition-all duration-700 group-hover:scale-105 opacity-80" />

              {/* Taj Mahal & Mughal Manuscript Mirror Frame */}
              <div className="relative p-3 sm:p-4 bg-[#FCFBF9] rounded-[2.5rem] border border-[#C9A96E]/35 shadow-[0_16px_40px_-12px_rgba(201,169,110,0.18)] transition-all duration-500 overflow-hidden">
                {/* Minimal Jali Lattice Watermark */}
                <TajMahalJaliWatermark className="opacity-[0.05]" />

                {/* Delicate Corner Ornaments */}
                <MughalCornerOrnaments inset="inset-2.5" className="text-[#C9A96E]/60" />

                {/* Subtle Taj Mahal Cusped Arch Crest */}
                <div className="pt-0.5 pb-2">
                  <TajMahalArchCrest className="text-[#C9A96E]/50" width="w-20" />
                </div>

                <div
                  onClick={() => onOpenPhotoViewer(photoUrl, `${ASH_CONFIG.beautySection.urduHeading} — ${ASH_CONFIG.beautySection.heading}`)}
                  className="relative cursor-pointer overflow-hidden rounded-[2rem] aspect-[3/4] bg-[#FAF8F5] border border-[#C9A96E]/30 ring-1 ring-[#C9A96E]/15 ring-offset-2 ring-offset-[#FCFBF9]"
                >
                  <AshImage
                    src={photoUrl}
                    alt={ASH_CONFIG.beautySection.heading}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    photoTitle={ASH_CONFIG.beautySection.heading}
                    categoryTag="دستِ نازک"
                  />

                  {/* Glass Reflective Shine Across Mirror */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-white/30" />

                  {/* Gradient Overlay with Inscription */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent flex items-end justify-between p-5 opacity-90 group-hover:opacity-100 transition-opacity">
                    <div>
                      <p className="font-urdu text-xl text-white drop-shadow" dir="rtl" lang="ur">
                        {ASH_CONFIG.beautySection.urduHeading}
                      </p>
                      <p className="font-serif italic text-white/90 text-sm drop-shadow">
                        The Scarlet Rose Gajra
                      </p>
                    </div>

                    <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white text-xs group-hover:scale-110 transition-transform">
                      ↗
                    </span>
                  </div>
                </div>

                <div className="text-center pt-3 pb-1">
                  <span className="font-serif italic text-xs text-[#4A4240]/75 tracking-wide">
                    Fragrance of paradise upon her wrist • حُسنِ کامل
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sufi Poetry & Devotional Reflection (7 cols) */}
          <div className="md:col-span-7 space-y-6 text-center md:text-left">
            {/* Calligraphic Urdu Couplet Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/75 border border-[#C9A96E]/30 backdrop-blur-sm shadow-sm relative">
              <p
                className="font-urdu text-2xl sm:text-3xl text-[#4A4240] leading-[2.4] text-right mb-4 whitespace-pre-line"
                dir="rtl"
                lang="ur"
              >
                {ASH_CONFIG.beautySection.urduVerse}
              </p>

              <div className="w-16 h-px bg-[#C9A96E]/50 my-4 mx-auto md:ml-0" />

              <p className="font-serif italic text-sm sm:text-base text-[#6B7F64] leading-relaxed">
                {ASH_CONFIG.beautySection.romanVerse}
              </p>

              <p className="font-sans font-light text-xs sm:text-sm text-[#4A4240]/80 mt-3 leading-relaxed">
                {ASH_CONFIG.beautySection.meaning}
              </p>
            </div>

            {/* Prose Reflection */}
            <div className="space-y-4 px-2">
              <p className="font-serif text-base sm:text-lg text-[#4A4240]/85 italic leading-relaxed">
                There is a sacred quietness in the way red roses rest against the warmth of your skin. Golden bangles, delicate fingers, and petals woven with pure devotion — true beauty is never loud. It is the peace of your soul reflected in every tiny detail.
              </p>

              {onOpenSecretNote && (
                <div className="pt-2">
                  <button
                    onClick={() => onOpenSecretNote('note-1')}
                    className="inline-flex items-center gap-2 text-xs font-serif italic text-[#C58A93] hover:text-[#4A4240] transition-colors underline decoration-[#C9A96E]/40 underline-offset-4"
                  >
                    <span>✦ Read the secret note inscribed for this gajra</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
