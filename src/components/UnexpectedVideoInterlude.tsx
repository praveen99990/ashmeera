import React, { useState, useRef, useEffect } from 'react';
import { mediaVault } from '../utils/mediaVault';
import {
  MughalCornerOrnaments,
  TajMahalArchCrest,
  TajMahalJaliWatermark,
} from './MughalFrameDecorations';

export interface VideoInterludeProps {
  id: string;
  kicker: string;
  urduTitle: string;
  romanTitle: string;
  urduVerse: string;
  romanVerse: string;
  translation: string;
  videoSrc: string;
  thumbnailSrc?: string;
  alignment?: 'left' | 'right' | 'center';
}

export const UnexpectedVideoInterlude: React.FC<VideoInterludeProps> = ({
  id,
  kicker,
  urduTitle,
  romanTitle,
  urduVerse,
  romanVerse,
  translation,
  videoSrc,
  thumbnailSrc,
  alignment = 'right',
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);


  const resolvedVideo = mediaVault.getMediaUrl(videoSrc);
  const resolvedThumb = mediaVault.getMediaUrl(thumbnailSrc);

  // Auto-play when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
              setHasStarted(true);
            })
            .catch(() => {
              // Autoplay policy: stay muted
              setIsPlaying(false);
            });
        } else if (!entry.isIntersecting && videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [resolvedVideo]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      });
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <section
      ref={containerRef}
      id={id}
      className="relative py-28 px-5 sm:px-8 overflow-hidden bg-gradient-to-b from-transparent via-[#E6EDE2]/30 to-transparent"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Subtle Decorative Star Kicker */}
        <div className="flex items-center justify-center gap-3 text-[#C9A96E] mb-4">
          <span className="w-12 h-px bg-[#C9A96E]/50" />
          <svg className="w-4 h-4"><use href="#star" /></svg>
          <span className="font-sans text-[11px] uppercase tracking-[0.26em] text-[#C9A96E] font-medium">
            {kicker}
          </span>
          <svg className="w-4 h-4"><use href="#star" /></svg>
          <span className="w-12 h-px bg-[#C9A96E]/50" />
        </div>

        {/* Content Layout */}
        <div
          className={`grid grid-cols-1 md:grid-cols-12 items-center gap-10 lg:gap-14 ${
            alignment === 'left' ? '' : 'md:flex-row-reverse'
          }`}
        >
          {/* Poetry Column (6 or 7 cols) */}
          <div
            className={`md:col-span-7 space-y-6 text-center ${
              alignment === 'left' ? 'md:order-2 md:text-left' : 'md:order-1 md:text-left'
            }`}
          >
            <div>
              <p
                className="font-urdu text-3xl sm:text-4xl text-[#4A4240] leading-[2.2] mb-2"
                dir="rtl"
                lang="ur"
              >
                {urduTitle}
              </p>
              <h3 className="font-serif italic text-2xl sm:text-3xl text-[#4A4240]">
                {romanTitle}
              </h3>
            </div>

            {/* Urdu Couplet Box */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white/75 border border-[#C9A96E]/30 shadow-sm backdrop-blur-sm relative">
              <p
                className="font-urdu text-2xl sm:text-3xl text-[#4A4240] leading-[2.4] text-right"
                dir="rtl"
                lang="ur"
              >
                {urduVerse.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>

              <div className="w-14 h-px bg-[#C9A96E]/50 my-3 ml-auto md:ml-0" />

              <p className="font-serif italic text-xs sm:text-sm text-[#6B7F64] leading-relaxed">
                {romanVerse}
              </p>

              <p className="font-sans font-light text-xs sm:text-sm text-[#4A4240]/80 mt-2.5 leading-relaxed">
                {translation}
              </p>
            </div>

            <p className="font-serif italic text-sm text-[#4A4240]/70 max-w-lg">
              Not all memories are still photographs. Some breathe, smile, and whisper across the silent screen like a living dream.
            </p>
          </div>

          {/* Living Video Frame (5 cols) */}
          <div
            className={`md:col-span-5 flex justify-center ${
              alignment === 'left' ? 'md:order-1' : 'md:order-2'
            }`}
          >
            <div className="relative group w-full max-w-xs sm:max-w-sm">
              {/* Soft Golden Ambient Glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#C9A96E]/25 via-[#E9C9CB]/30 to-[#A8B8A0]/20 rounded-3xl blur-lg transition-transform duration-700 group-hover:scale-105 opacity-80" />

              {/* Taj Mahal & Mughal Manuscript Video Frame */}
              <div className="relative p-3 sm:p-3.5 bg-[#FCFBF9] rounded-3xl border border-[#C9A96E]/35 shadow-[0_16px_40px_-12px_rgba(201,169,110,0.18)] transition-all duration-500 overflow-hidden">
                {/* Minimal Jali Lattice Watermark */}
                <TajMahalJaliWatermark className="opacity-[0.05]" />

                {/* Delicate Hairline Corner Ornaments */}
                <MughalCornerOrnaments inset="inset-2" className="text-[#C9A96E]/60" />

                {/* Subtle Taj Mahal Cusped Arch Crest */}
                <div className="pt-0.5 pb-2">
                  <TajMahalArchCrest className="text-[#C9A96E]/50" width="w-20" />
                </div>

                <div className="relative rounded-2xl overflow-hidden aspect-[9/16] bg-black/90 border border-[#C9A96E]/30 ring-1 ring-[#C9A96E]/15 ring-offset-2 ring-offset-[#FCFBF9]">
                  {resolvedVideo && !loadError ? (
                    <>
                      <video
                        ref={videoRef}
                        src={resolvedVideo}
                        poster={resolvedThumb}
                        playsInline
                        loop
                        muted={isMuted}
                        onError={() => setLoadError(true)}
                        className="w-full h-full object-cover"
                      />

                      {/* Video Vignette & Gold Frame Overlay */}
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/30 border border-white/10" />

                      {/* Video Controls Bar */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20">
                        {/* Play/Pause Button */}
                        <button
                          onClick={togglePlay}
                          aria-label={isPlaying ? 'Pause video' : 'Play video'}
                          className="w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/30 text-white flex items-center justify-center text-xs transition-transform hover:scale-105"
                        >
                          {isPlaying ? '⏸' : '▶'}
                        </button>

                        {/* Sound Toggle Button */}
                        <button
                          onClick={toggleSound}
                          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                          className="px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/30 text-white flex items-center gap-1.5 text-xs transition-transform hover:scale-105"
                        >
                          <span>{isMuted ? '🔇' : '🔊'}</span>
                          <span className="font-sans text-[10px] tracking-wider uppercase">
                            {isMuted ? 'Muted' : 'Sound'}
                          </span>
                        </button>
                      </div>
                    </>
                  ) : (
                    /* Fallback / Vault Prompt Frame if file not yet uploaded */
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#1E1B18] via-[#2A2521] to-[#1E1B18] text-[#EBDDBE]">
                      <svg className="w-12 h-12 text-[#C9A96E] mb-3 opacity-80" viewBox="-50 -50 100 100">
                        <use href="#flower" />
                      </svg>
                      <p className="font-urdu text-2xl text-[#C9A96E] mb-1" dir="rtl" lang="ur">
                        {urduTitle}
                      </p>
                      <p className="font-serif italic text-sm text-white/90 mb-4">
                        {romanTitle}
                      </p>
                      <p className="font-sans font-light text-xs text-white/60 mb-5 leading-relaxed">
                        No video found.
                      </p>
                    </div>
                  )}
                </div>

                {/* Subtitle Under Video */}
                <div className="text-center pt-2.5 pb-0.5">
                  <span className="font-serif italic text-xs text-[#4A4240]/75 tracking-wide">
                    {urduTitle} • Living Memory
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
