import React from 'react';
import { ASH_CONFIG } from '../config/ashConfig';
import { mediaVault } from '../utils/mediaVault';
import { AshImage } from './AshImage';
import {
  MughalCornerOrnaments,
  TajMahalJaliWatermark,
  MughalManuscriptSeal,
} from './MughalFrameDecorations';

interface AMemorySectionProps {
  onOpenPhotoViewer: (photoUrl: string, caption: string) => void;
  onOpenSecretNote?: (id: string) => void;
}

export const AMemorySection: React.FC<AMemorySectionProps> = ({
  onOpenPhotoViewer,
}) => {
  const childhoodUrl = mediaVault.getMediaUrl(ASH_CONFIG.vintageMemorySection.childhoodPhoto);
  const noteUrl = mediaVault.getMediaUrl(ASH_CONFIG.vintageMemorySection.notePhoto);

  return (
    <section className="relative py-28 px-5 sm:px-8 overflow-hidden bg-gradient-to-b from-transparent via-[#FAF8F5]/80 to-transparent">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Kicker */}
        <div className="flex items-center justify-center gap-3 text-[#C9A96E] mb-3">
          <span className="w-12 h-px bg-[#C9A96E]/50" />
          <svg className="w-4 h-4"><use href="#star" /></svg>
          <span className="font-sans text-[11px] uppercase tracking-[0.28em] text-[#C9A96E] font-medium">
            {ASH_CONFIG.vintageMemorySection.romanTitle}
          </span>
          <svg className="w-4 h-4"><use href="#star" /></svg>
          <span className="w-12 h-px bg-[#C9A96E]/50" />
        </div>

        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-urdu text-3xl sm:text-5xl text-[#4A4240] leading-[1.8] mb-1" dir="rtl" lang="ur">
            {ASH_CONFIG.vintageMemorySection.urduHeading}
          </h2>
          <p className="font-serif italic text-2xl sm:text-3xl text-[#4A4240]/80">
            {ASH_CONFIG.vintageMemorySection.heading}
          </p>
          <p className="font-serif italic text-sm sm:text-base text-[#6B7F64] mt-2">
            {ASH_CONFIG.vintageMemorySection.subheading}
          </p>
        </div>

        {/* Vintage Old-Paper Manuscript Spread */}
        {/* Vintage Old-Paper Manuscript Spread */}
        <div className="relative p-6 sm:p-10 rounded-3xl bg-[#FAF8F5] border border-[#C9A96E]/35 shadow-[0_16px_45px_-15px_rgba(201,169,110,0.18)] overflow-hidden">
          {/* Subtle Taj Mahal Jali Watermark */}
          <TajMahalJaliWatermark className="opacity-[0.05]" />

          {/* Outer Manuscript Corner Ornaments */}
          <MughalCornerOrnaments inset="inset-3 sm:inset-4" className="text-[#C9A96E]/60" />

          {/* Top Calligraphic Ribbon */}
          <div className="text-center pb-8 border-b border-[#C9A96E]/25 relative z-10">
            <p
              className="font-urdu text-2xl sm:text-3xl text-[#4A4240] leading-[2.4] whitespace-pre-line"
              dir="rtl"
              lang="ur"
            >
              {ASH_CONFIG.vintageMemorySection.urduVerse}
            </p>
            <div className="w-16 h-px bg-[#C9A96E]/40 mx-auto my-3" />
            <p className="font-serif italic text-xs sm:text-sm text-[#6B7F64] mt-2">
              {ASH_CONFIG.vintageMemorySection.romanVerse}
            </p>
            <p className="font-sans font-light text-xs text-[#4A4240]/75 mt-1 max-w-lg mx-auto">
              {ASH_CONFIG.vintageMemorySection.meaning}
            </p>
          </div>

          {/* Side-by-Side Vintage Photographic Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 pt-8 relative z-10">
            {/* Card 1: Childhood Nauvari Saree in Vintage Photo Frame */}
            <div className="space-y-4">
              <div
                onClick={() => onOpenPhotoViewer(childhoodUrl, "داستانِ یاد: Little Princess in Nauvari")}
                className="group relative cursor-pointer p-3 sm:p-4 bg-[#FCFBF9] rounded-2xl border border-[#C9A96E]/35 shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              >
                {/* Royal Manuscript Seal */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                  <MughalManuscriptSeal title="بچپن • یادگار" />
                </div>

                {/* Corner Hairlines */}
                <MughalCornerOrnaments inset="inset-2" className="text-[#C9A96E]/45" />

                <div className="relative mt-4 rounded-xl overflow-hidden aspect-[3/4] bg-[#FAF8F5] border border-[#C9A96E]/30 ring-1 ring-[#C9A96E]/15 ring-offset-2 ring-offset-[#FCFBF9]">
                  <AshImage
                    src={childhoodUrl}
                    alt="Little Princess in Nauvari"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    photoTitle="Little Princess in Nauvari"
                    categoryTag="Childhood Innocence"
                  />
                  {/* Subtle warm sepia tint overlay */}
                  <div className="absolute inset-0 bg-[#C9A96E]/10 mix-blend-multiply pointer-events-none" />
                </div>

                <div className="pt-3 px-1 text-center">
                  <p className="font-serif italic text-base text-[#4A4240]">
                    The Innocent Blossom
                  </p>
                  <p className="font-sans text-xs text-[#4A4240]/65 mt-0.5">
                    Young Ash in her Maharashtrian Nauvari saree, holding a flower with the sweetest smile.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Yuvi's Sunflowers & Handwritten Love Note */}
            <div className="space-y-4">
              <div
                onClick={() => onOpenPhotoViewer(noteUrl, "داستانِ یاد: Sunflowers & Yuvi's Handwritten Note")}
                className="group relative cursor-pointer p-3 sm:p-4 bg-[#FCFBF9] rounded-2xl border border-[#C9A96E]/35 shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              >
                {/* Royal Manuscript Seal */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                  <MughalManuscriptSeal title="عشق • تبرک" />
                </div>

                {/* Corner Hairlines */}
                <MughalCornerOrnaments inset="inset-2" className="text-[#C9A96E]/45" />

                <div className="relative mt-4 rounded-xl overflow-hidden aspect-[3/4] bg-[#FAF8F5] border border-[#C9A96E]/30 ring-1 ring-[#C9A96E]/15 ring-offset-2 ring-offset-[#FCFBF9]">
                  <AshImage
                    src={noteUrl}
                    alt="Sunflowers & Yuvi's Note"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    photoTitle="Sunflowers & Yuvi's Note"
                    categoryTag="A Sacred Delivery"
                  />
                  <div className="absolute inset-0 bg-[#C9A96E]/10 mix-blend-multiply pointer-events-none" />
                </div>

                <div className="pt-3 px-1 text-center">
                  <p className="font-serif italic text-base text-[#4A4240]">
                    Sunflowers &amp; Handwritten Words
                  </p>
                  <p className="font-sans text-xs text-[#4A4240]/65 mt-0.5">
                    "These flowers are just a small way to tell you how special you are to me... Keep smiling always. Love, Yuvi."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Manuscript Footer Note */}
          <div className="mt-8 pt-6 border-t border-[#C9A96E]/20 text-center">
            <span className="font-handwriting text-2xl text-[#C9A96E]">
              بچپن کی معصومیت سے لے کر ابد کے سفر تک — تری چاہت کا امین
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
