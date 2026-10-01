import React from 'react';
import { ASH_CONFIG } from '../config/ashConfig';
import { mediaVault } from '../utils/mediaVault';
import { AshImage } from './AshImage';
import {
  MughalCornerOrnaments,
  TajMahalJaliWatermark,
} from './MughalFrameDecorations';

interface RoyalSehraFeatureProps {
  onOpenPhotoViewer: (photoUrl: string, caption: string) => void;
}

export const RoyalSehraFeature: React.FC<RoyalSehraFeatureProps> = ({
  onOpenPhotoViewer,
}) => {
  const photoUrl = mediaVault.getMediaUrl(ASH_CONFIG.sehraFeature.photo);

  return (
    <section className="relative py-28 px-5 sm:px-8 bg-gradient-to-b from-transparent via-[#E6EDE2]/35 to-transparent overflow-hidden">
      {/* Decorative Arch Watermark */}
      <div className="absolute left-0 bottom-0 w-80 h-80 opacity-15 pointer-events-none text-[#C9A96E]">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="0.8">
          <path d="M 10,90 L 10,45 C 10,20 30,10 50,10 C 70,10 90,20 90,45 L 90,90 Z" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Kicker */}
        <div className="flex items-center justify-center gap-3 text-[#C9A96E] mb-3">
          <span className="w-14 h-px bg-[#C9A96E]/50" />
          <svg className="w-5 h-5"><use href="#star" /></svg>
          <span className="font-sans text-[11px] uppercase tracking-[0.28em] text-[#C9A96E] font-medium">
            {ASH_CONFIG.sehraFeature.romanTitle || 'Her Presence • Wujood-e-Noor'}
          </span>
          <svg className="w-5 h-5"><use href="#star" /></svg>
          <span className="w-14 h-px bg-[#C9A96E]/50" />
        </div>

        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-urdu text-3xl sm:text-5xl text-[#4A4240] leading-[1.8] mb-1" dir="rtl" lang="ur">
            {ASH_CONFIG.sehraFeature.urduHeading || 'حضورِ یار'}
          </h2>
          <p className="font-serif italic text-2xl sm:text-3xl text-[#4A4240]/85">
            {ASH_CONFIG.sehraFeature.heading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-10 sm:gap-14">
          {/* Left Column: The Photograph in Arched Mughal Frame (5 cols) */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative group max-w-sm w-full">
              {/* Soft Ambient Glow */}
              <div className="absolute -inset-2 bg-gradient-to-t from-[#6B7F64]/20 via-[#C9A96E]/25 to-[#EBDDBE]/30 rounded-t-[7.5rem] rounded-b-3xl blur-xl transition-all duration-700 group-hover:scale-105 opacity-80" />

              {/* Taj Mahal Mehrab Arch Frame */}
              <div
                onClick={() => {
                  if (photoUrl) {
                    onOpenPhotoViewer(
                      photoUrl,
                      `${ASH_CONFIG.sehraFeature.hindiLine} — Ash in Royal Blue Saree`
                    );
                  }
                }}
                className={`relative ${
                  photoUrl ? 'cursor-pointer hover:scale-[1.01]' : ''
                } rounded-t-[7rem] rounded-b-3xl overflow-hidden border border-[#C9A96E]/40 p-3 sm:p-3.5 bg-[#FCFBF9] shadow-[0_16px_40px_-12px_rgba(201,169,110,0.18)] transition-all duration-500`}
              >
                {/* Minimal Jali Lattice Watermark */}
                <TajMahalJaliWatermark className="opacity-[0.05]" />

                {/* Taj Mahal Apex Finial */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20 text-[#C9A96E]">
                  <div className="w-1 h-1 rounded-full bg-current mb-0.5 opacity-80" />
                  <svg className="w-3.5 h-3.5"><use href="#star" /></svg>
                </div>

                {/* Bottom Corner Ornaments */}
                <MughalCornerOrnaments inset="inset-2" className="text-[#C9A96E]/50" />

                <div className="relative rounded-t-[6.2rem] rounded-b-2xl overflow-hidden aspect-[9/16] bg-[#FAF8F5] border border-[#C9A96E]/30 ring-1 ring-[#C9A96E]/15 ring-offset-2 ring-offset-[#FCFBF9] flex flex-col items-center justify-center text-center">
                  {photoUrl ? (
                    <>
                      <AshImage
                        src={photoUrl}
                        alt="Ash in Royal Blue Saree"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        photoTitle={ASH_CONFIG.sehraFeature.hindiLine}
                        categoryTag="حضورِ یار"
                      />
                      <div className="ov absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent flex items-end justify-between p-5">
                        <div>
                          <p className="font-urdu text-lg text-white drop-shadow" dir="rtl" lang="ur">
                            حضورِ یار
                          </p>
                          <p className="font-serif italic text-white/90 text-xs">
                            Royal Blue Saree by Ancient Doors
                          </p>
                        </div>
                        <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white text-xs">
                          ↗
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="p-6 text-center">
                      <svg className="w-12 h-12 text-[#C9A96E] mb-4 mx-auto drop-shadow">
                        <use href="#star" />
                      </svg>
                      <p className="font-urdu text-2xl text-[#4A4240]" dir="rtl" lang="ur">
                        میں جو شاعر کبھی ہوتا تیرا سہرا کہتا
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-center pt-3 pb-1">
                  <span className="font-serif italic text-xs text-[#4A4240]/75 tracking-wide">
                    Sehra of pearls and prayers • حضورِ یار
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The Poetry & Sufi Inscription (7 cols) */}
          <div className="md:col-span-7 text-center md:text-left space-y-6">
            {/* Calligraphic Urdu Couplet Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/75 border border-[#C9A96E]/30 backdrop-blur-sm shadow-sm relative">
              <p
                className="font-urdu text-3xl sm:text-4xl text-[#4A4240] leading-[2.2] text-right mb-4 whitespace-pre-line"
                dir="rtl"
                lang="ur"
              >
                {ASH_CONFIG.sehraFeature.urduVerse}
              </p>

              <div className="w-16 h-px bg-[#C9A96E]/50 my-4 mx-auto md:ml-0" />

              <p className="font-serif italic text-sm sm:text-base text-[#6B7F64] leading-relaxed">
                "{ASH_CONFIG.sehraFeature.transliteration}"
              </p>

              <blockquote className="font-sans font-light text-xs sm:text-sm text-[#4A4240]/80 mt-3 leading-relaxed italic border-l-0 md:border-l-2 md:border-[#C9A96E]/50 md:pl-4">
                {ASH_CONFIG.sehraFeature.meaning}
              </blockquote>
            </div>

            <p className="font-serif text-base sm:text-lg text-[#4A4240]/85 italic leading-relaxed px-1">
              Sitting upon those ancient stone steps in that royal blue saree, you did not merely occupy space — you commanded the quiet reverie of the entire palace courtyard. To the soul that beholds you, every verse ever written pales before the serene dignity of your presence.
            </p>

            <div className="pt-2 px-1">
              <span className="inline-flex items-center gap-2 font-serif italic text-sm text-[#C58A93]">
                <span>Crowned with eternal devotion • زهرة الجنة</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
