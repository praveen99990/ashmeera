import React, { useState, useRef, useEffect } from 'react';
import { ASH_CONFIG, VideoPortraitItem } from '../config/ashConfig';
import { mediaVault } from '../utils/mediaVault';

export const LivingVideoPortraits: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<VideoPortraitItem | null>(null);

  const hasVideos = ASH_CONFIG.videoPortraits.length > 0;

  return (
    <section className="py-24 px-5 sm:px-8 max-w-6xl mx-auto">

      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 text-[#C9A96E] mb-3">
          <span className="w-10 h-px bg-[#C9A96E]/50" />
          <svg className="w-5 h-5"><use href="#star" /></svg>
          <span className="w-10 h-px bg-[#C9A96E]/50" />
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl text-[#4A4240] font-normal">
          Living Portraits
        </h2>
        <p className="font-sans font-light text-[#4A4240]/60 mt-3 text-sm sm:text-base max-w-lg mx-auto">
          Moments captured in motion — wind through her hair, playful laughter, and an unforgettable smile.
        </p>
      </div>

      {!hasVideos ? null : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {ASH_CONFIG.videoPortraits.map((vid: VideoPortraitItem) => {
            const videoSrc = mediaVault.getMediaUrl(vid.src);
            const thumbSrc = mediaVault.getMediaUrl(vid.thumbnail, vid.fallbackThumb);

            return (
              <div
                key={vid.id}
                className="card group relative rounded-2xl bg-white/70 border border-[#C9A96E]/30 p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden flex flex-col justify-between"
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#C9A96E] font-medium">
                      Motion Memory
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#C58A93] font-serif italic">
                        Live
                      </span>
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl text-[#4A4240]">
                    {vid.title}
                  </h3>
                  <p className="font-serif italic text-xs sm:text-sm text-[#6B7F64] mt-0.5">
                    {vid.subtitle}
                  </p>
                </div>

                <div className="relative rounded-xl overflow-hidden aspect-[9/16] sm:aspect-[4/5] bg-black/10 border border-[#C9A96E]/30 flex items-center justify-center shadow-inner group">
                  {videoSrc ? (
                    <video
                      src={videoSrc}
                      poster={thumbSrc}
                      playsInline
                      loop
                      muted
                      autoPlay
                      className="w-full h-full object-cover cursor-pointer transition-transform duration-700 group-hover:scale-105"
                      onClick={() => setActiveVideo(vid)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#FAF8F5]">
                      <svg className="w-10 h-10 text-[#C9A96E] mb-2"><use href="#star" /></svg>
                      <p className="font-serif italic text-base text-[#4A4240]">{vid.title}</p>
                    </div>
                  )}

                  <div
                    onClick={() => setActiveVideo(vid)}
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-between p-5 cursor-pointer transition-opacity duration-300"
                  >
                    <div className="flex justify-between items-center">
                      <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] font-sans text-white/90 tracking-widest uppercase">
                        Living Cinema
                      </span>
                      <span className="w-9 h-9 rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-white grid place-items-center text-xs hover:bg-white/50 transition">
                        ⛶
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-serif italic text-white text-base sm:text-lg drop-shadow">
                          Watch Living Portrait
                        </span>
                        <p className="font-sans text-[11px] text-white/70">
                          Tap for full-screen sound & cinema
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-[#E9C9CB] hover:bg-[#C58A93] text-[#4A4240] hover:text-white grid place-items-center shadow-lg transform group-hover:scale-110 transition-all">
                        ▶
                      </div>
                    </div>
                  </div>
                </div>

                <p className="font-sans font-light text-xs sm:text-sm text-[#4A4240]/80 mt-4 leading-relaxed line-clamp-2">
                  {vid.caption}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Video Modal Player */}
      {activeVideo && (
        <div
          onClick={() => setActiveVideo(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-black rounded-3xl overflow-hidden shadow-2xl border border-[#C9A96E]/40"
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/40 grid place-items-center transition z-20"
            >
              ✕
            </button>
            <video
              src={mediaVault.getMediaUrl(activeVideo.src)}
              controls
              autoPlay
              playsInline
              className="w-full max-h-[80vh] object-contain"
            />
            <div className="p-4 bg-gradient-to-t from-black via-black/80 to-transparent text-white">
              <h3 className="font-serif text-xl">{activeVideo.title}</h3>
              <p className="font-sans text-xs text-white/70 mt-1">{activeVideo.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
