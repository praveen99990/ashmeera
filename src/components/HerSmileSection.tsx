import React, { useState } from 'react';
import { ASH_CONFIG } from '../config/ashConfig';
import { mediaVault } from '../utils/mediaVault';
import { AshImage } from './AshImage';
import {
  MughalCornerOrnaments,
  TajMahalArchCrest,
  TajMahalJaliWatermark,
} from './MughalFrameDecorations';

interface HerSmileSectionProps {
  onOpenPhotoViewer: (photoUrl: string, caption: string) => void;
  onOpenSecretNote?: (id: string) => void;
}

export const HerSmileSection: React.FC<HerSmileSectionProps> = ({
  onOpenPhotoViewer,
}) => {
  const [whisperRevealed, setWhisperRevealed] = useState(false);
  const photoUrl = mediaVault.getMediaUrl(ASH_CONFIG.smileSection.photo);

  return (
    <section className="relative py-28 px-5 sm:px-8 overflow-hidden bg-gradient-to-b from-transparent via-[#F8EAE8]/35 to-transparent">
      {/* Decorative Sufi Floral Watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none opacity-20 text-[#C58A93]">
        <svg viewBox="-50 -50 100 100" className="w-full h-full fill-current">
          <use href="#flower" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Poetic Kicker */}
        <div className="flex items-center justify-center gap-3 text-[#C9A96E] mb-3">
          <span className="w-12 h-px bg-[#C9A96E]/50" />
          <svg className="w-4 h-4"><use href="#star" /></svg>
          <span className="text-[11px] font-sans uppercase tracking-[0.28em] text-[#C9A96E] font-medium">
            {ASH_CONFIG.smileSection.romanTitle}
          </span>
          <svg className="w-4 h-4"><use href="#star" /></svg>
          <span className="w-12 h-px bg-[#C9A96E]/50" />
        </div>

        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="font-urdu text-3xl sm:text-5xl text-[#4A4240] leading-[1.8] mb-1" dir="rtl" lang="ur">
            {ASH_CONFIG.smileSection.urduHeading}
          </h2>
          <p className="font-serif italic text-2xl sm:text-3xl text-[#4A4240]/80">
            {ASH_CONFIG.smileSection.heading}
          </p>
        </div>

        {/* Cinematic Grid: Left Poetic Verse / Right Floral Frame */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-10 lg:gap-14">
          {/* Left Column: Sufi Poetry & Reflection (7 cols) */}
          <div className="md:col-span-7 order-2 md:order-1 text-center md:text-left space-y-6">
            {/* Calligraphic Urdu Couplet */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/70 border border-[#C9A96E]/30 backdrop-blur-sm shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(ellipse_at_top_right,#E9C9CB_0%,transparent_70%)] pointer-events-none" />
              
              <p
                className="font-urdu text-2xl sm:text-3xl text-[#4A4240] leading-[2.4] text-right mb-4 whitespace-pre-line"
                dir="rtl"
                lang="ur"
              >
                {ASH_CONFIG.smileSection.urduVerse}
              </p>

              <div className="w-16 h-px bg-[#C9A96E]/50 my-4 mx-auto md:ml-0" />

              <p className="font-serif italic text-sm sm:text-base text-[#6B7F64] leading-relaxed">
                {ASH_CONFIG.smileSection.romanVerse}
              </p>

              <p className="font-sans font-light text-xs sm:text-sm text-[#4A4240]/80 mt-3 leading-relaxed">
                {ASH_CONFIG.smileSection.meaning}
              </p>
            </div>

            {/* Devotional Note / Heart's Thought */}
            <div className="space-y-4 px-2">
              <p className="font-serif text-base sm:text-lg text-[#4A4240]/85 italic leading-relaxed">
                In a world that rushes past without pausing, your smile is the quiet sanctuary where the soul stops and breathes. Resting your chin upon your delicate hand, sunlight catching the mirrorwork of your yellow Lucknowi kurti — you are that sacred serenity I prayed for in silence.
              </p>

              {/* Interactive Whisper Button */}
              <div className="pt-2">
                {!whisperRevealed ? (
                  <button
                    onClick={() => setWhisperRevealed(true)}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FAF8F5] hover:bg-[#F8EAE8] border border-[#C9A96E]/40 text-[#4A4240] text-xs font-serif italic tracking-wide transition-all duration-300 hover:border-[#C58A93] hover:shadow-sm"
                  >
                    <span>✦ Tap to unfold the heart's quiet whisper</span>
                  </button>
                ) : (
                  <div className="p-4 rounded-xl bg-[#F8EAE8]/70 border border-[#C58A93]/40 animate-fadeIn">
                    <p className="font-serif italic text-sm text-[#4A4240] leading-relaxed">
                      "{ASH_CONFIG.smileSection.whisper}"
                    </p>
                    <span className="block mt-1 text-[11px] font-sans uppercase tracking-[0.2em] text-[#C58A93] font-medium">
                      — For Ashmeera
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Taj Mahal Manuscript Framed Photograph (5 cols) */}
          <div className="md:col-span-5 order-1 md:order-2 flex justify-center">
            <div className="relative group max-w-sm w-full">
              {/* Soft Rose Glow Behind Frame */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#C58A93]/15 via-[#E9C9CB]/25 to-[#C9A96E]/15 rounded-3xl blur-xl transition-all duration-700 group-hover:scale-105 opacity-70" />

              {/* Taj Mahal & Mughal Islamic Manuscript Frame */}
              <div className="relative p-3 sm:p-4 bg-[#FCFBF9] rounded-3xl border border-[#C9A96E]/35 shadow-[0_12px_36px_-12px_rgba(201,169,110,0.18)] transition-all duration-500 overflow-hidden">
                {/* Minimal Jali Lattice Watermark */}
                <TajMahalJaliWatermark className="opacity-[0.05]" />

                {/* Delicate Hairline Corner Ornaments */}
                <MughalCornerOrnaments inset="inset-2.5" className="text-[#C9A96E]/60" />

                {/* Subtle Taj Mahal Cusped Arch Crest at Top */}
                <div className="pt-1 pb-2">
                  <TajMahalArchCrest className="text-[#C9A96E]/50" width="w-20" />
                </div>

                <div
                  onClick={() => onOpenPhotoViewer(photoUrl, `${ASH_CONFIG.smileSection.urduHeading} — ${ASH_CONFIG.smileSection.heading}`)}
                  className="relative cursor-pointer overflow-hidden rounded-2xl aspect-[3/4] bg-[#FAF8F5] border border-[#C9A96E]/30 ring-1 ring-[#C9A96E]/15 ring-offset-2 ring-offset-[#FCFBF9]"
                >
                  <AshImage
                    src={photoUrl}
                    alt={ASH_CONFIG.smileSection.heading}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    photoTitle={ASH_CONFIG.smileSection.heading}
                    categoryTag="تبسمِ جاں"
                  />

                  {/* Gradient Overlay with Urdu inscription */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-between p-5 opacity-90 group-hover:opacity-100 transition-opacity">
                    <div>
                      <p className="font-urdu text-xl text-white drop-shadow" dir="rtl" lang="ur">
                        {ASH_CONFIG.smileSection.urduHeading}
                      </p>
                      <p className="font-serif italic text-white/90 text-sm drop-shadow">
                        Sunshine in Yellow
                      </p>
                    </div>

                    <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white text-xs group-hover:scale-110 transition-transform">
                      ↗
                    </span>
                  </div>
                </div>

                {/* Subtitle Under Card */}
                <div className="text-center pt-3 pb-1">
                  <span className="font-serif italic text-xs text-[#4A4240]/70 tracking-wide">
                    A smile that crowns the heavens • نورِ تبسم
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
