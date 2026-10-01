import React from 'react';
import { ASH_CONFIG, MemoryItem } from '../config/ashConfig';
import { mediaVault } from '../utils/mediaVault';
import { AshImage } from './AshImage';
import { TajMahalJaliWatermark } from './MughalFrameDecorations';

interface OurStoryTimelineProps {
  onOpenPhotoViewer: (photoUrl: string, caption: string) => void;
  onOpenSecretNote: (noteId: string) => void;
}

const URDU_CHAPTERS = [
  "منزلِ اول • The Little Blossom",
  "منزلِ دوم • Sunflowers & Words",
  "منزلِ سوم • Sibling Smiles & Mall Day",
  "منزلِ چہارم • Lilies & Celebration",
  "منزلِ پنجم • Today & Always",
];

export const OurStoryTimeline: React.FC<OurStoryTimelineProps> = ({
  onOpenPhotoViewer,
  onOpenSecretNote,
}) => {
  return (
    <section className="relative py-28 px-5 sm:px-8 max-w-5xl mx-auto overflow-hidden">
      {/* Section Header with Pakistani Sufi Inscription */}
      <div className="text-center mb-20">
        <div className="flex items-center justify-center gap-3 text-[#C9A96E] mb-3">
          <span className="w-12 h-px bg-[#C9A96E]/50" />
          <svg className="w-5 h-5"><use href="#star" /></svg>
          <span className="text-[11px] font-sans uppercase tracking-[0.28em] text-[#C9A96E] font-medium">
            Safar-e-Ishq • The Journey
          </span>
          <svg className="w-5 h-5"><use href="#star" /></svg>
          <span className="w-12 h-px bg-[#C9A96E]/50" />
        </div>

        <h2 className="font-urdu text-4xl sm:text-5xl text-[#4A4240] leading-[1.8] mb-1" dir="rtl" lang="ur">
          سفرِ عشق
        </h2>
        <p className="font-serif italic text-2xl sm:text-3xl text-[#4A4240]/80">
          Our Story
        </p>

        {/* Sufi Couplet */}
        <div className="mt-4 max-w-lg mx-auto">
          <p className="font-urdu text-xl text-[#6B7F64] leading-[2.2]" dir="rtl" lang="ur">
            ازل سے ابد تک جو دل نے لکھی ہے
            <br />
            یہ تیری کہانی، مری زندگی ہے
          </p>
          <p className="font-serif italic text-xs text-[#4A4240]/70 mt-1">
            Azal se abad tak jo dil ne likhi hai / Yeh teri kahani, meri zindagi hai
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Central Golden Thread of Destiny */}
        <div className="absolute left-6 sm:left-1/2 top-4 bottom-8 -translate-x-1/2 w-[1px] bg-gradient-to-b from-[#C9A96E]/10 via-[#C9A96E]/60 to-[#C9A96E]/10 pointer-events-none" />

        <div className="space-y-16 sm:space-y-24">
          {ASH_CONFIG.memories.map((mem: MemoryItem, idx: number) => {
            const isEven = idx % 2 === 0;
            const memPhotoUrl = mediaVault.getMediaUrl(mem.photo);
            const chapterLabel = URDU_CHAPTERS[idx] || mem.tag;

            return (
              <div
                key={mem.id}
                className="relative flex flex-col sm:flex-row items-start sm:items-center group"
              >
                {/* Central Star Node */}
                <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FCFBF9] border border-[#C9A96E] flex items-center justify-center text-[#C9A96E] z-10 shadow-sm group-hover:scale-110 group-hover:text-[#C58A93] group-hover:border-[#C58A93] transition-all duration-300">
                  <svg className="w-4 h-4"><use href="#star" /></svg>
                </div>

                {/* Content Layout - Left or Right */}
                <div
                  className={`w-full sm:w-1/2 pl-14 sm:pl-0 ${
                    isEven ? 'sm:pr-14 sm:text-right' : 'sm:pl-14 sm:ml-auto sm:text-left'
                  }`}
                >
                  <div className="card relative overflow-hidden rounded-2xl bg-[#FCFBF9]/90 border border-[#C9A96E]/30 p-5 sm:p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#C9A96E]/60">
                    {/* Subtle Taj Mahal Jali Watermark */}
                    <TajMahalJaliWatermark className="opacity-[0.04]" />

                    {/* Chapter Tag */}
                    <div
                      className={`flex items-center gap-2 mb-2 relative z-10 ${
                        isEven ? 'sm:justify-end' : 'sm:justify-start'
                      }`}
                    >
                      <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-[#C9A96E] font-medium">
                        {chapterLabel}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="font-serif text-xl sm:text-2xl text-[#4A4240] relative z-10">
                      {mem.title}
                    </h3>
                    <p className="font-serif italic text-xs sm:text-sm text-[#6B7F64] mt-1 mb-3 relative z-10">
                      {mem.dateOrSubtitle}
                    </p>

                    {/* Photograph with hover ornament IF available */}
                    {memPhotoUrl ? (
                      <div
                        onClick={() => onOpenPhotoViewer(memPhotoUrl, `${mem.tag}: ${mem.title}`)}
                        className="relative my-3 cursor-pointer overflow-hidden rounded-xl border border-[#C9A96E]/30 ring-1 ring-[#C9A96E]/15 ring-offset-2 ring-offset-[#FCFBF9] group/photo aspect-[16/10] bg-[#FAF8F5] z-10"
                      >
                        <AshImage
                          src={memPhotoUrl}
                          alt={mem.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/photo:scale-105"
                          photoTitle={mem.title}
                          categoryTag={mem.tag}
                        />
                        <div className="ov absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent flex items-end justify-between p-4">
                          <span className="font-serif italic text-white text-xs sm:text-sm drop-shadow-sm">
                            View memory in album
                          </span>
                          <svg className="w-4 h-4 text-[#C9A96E] drop-shadow">
                            <use href="#flower" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`my-3 flex items-center gap-2.5 text-[#C9A96E]/50 ${
                          isEven ? 'sm:justify-end' : 'sm:justify-start'
                        }`}
                      >
                        <span className="w-8 h-px bg-[#C9A96E]/30" />
                        <svg className="w-3.5 h-3.5"><use href="#flower" /></svg>
                        <span className="w-8 h-px bg-[#C9A96E]/30" />
                      </div>
                    )}

                    {/* Description */}
                    <p className="font-sans font-light text-xs sm:text-sm text-[#4A4240]/80 leading-relaxed mt-2">
                      {mem.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secret Note #4 at bottom of timeline */}
        <div className="text-center mt-12">
          <button
            onClick={() => onOpenSecretNote('note-4')}
            className="p-2 text-[#C9A96E]/50 hover:text-[#C58A93] transition-colors"
            title="A subtle golden flourish"
          >
            <svg className="w-4 h-4"><use href="#flower" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
};
