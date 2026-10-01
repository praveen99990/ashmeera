import React, { useRef, useEffect, useState } from 'react';
import { AshImage } from './AshImage';
import { GalleryPhotoCard } from '../config/ashConfig';

interface ParallaxGalleryCardProps {
  photo: GalleryPhotoCard;
  index: number;
  resolvedUrl: string;
  onOpenViewer: (url: string, caption: string) => void;
}

// 4 distinct floating speed profiles to create rich, multi-layered depth across the masonry columns
const SPEED_PROFILES = [
  {
    cssClass: 'parallax-img-slow',
    factor: 0.05,
    baseScale: 1.08,
    description: 'Gentle slow drift',
  },
  {
    cssClass: 'parallax-img-medium',
    factor: 0.09,
    baseScale: 1.12,
    description: 'Floating medium drift',
  },
  {
    cssClass: 'parallax-img-fast',
    factor: 0.14,
    baseScale: 1.16,
    description: 'Breezy dynamic drift',
  },
  {
    cssClass: 'parallax-img-counter',
    factor: -0.06,
    baseScale: 1.10,
    description: 'Delicate counter drift',
  },
];

export const ParallaxGalleryCard: React.FC<ParallaxGalleryCardProps> = ({
  photo,
  index,
  resolvedUrl,
  onOpenViewer,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(0);
  const [supportsNativeViewTimeline, setSupportsNativeViewTimeline] = useState(false);

  const profile = SPEED_PROFILES[index % SPEED_PROFILES.length];

  useEffect(() => {
    // Check if the browser supports native CSS animation-timeline: view()
    const hasNativeSupport =
      typeof window !== 'undefined' &&
      typeof CSS !== 'undefined' &&
      CSS.supports &&
      (CSS.supports('animation-timeline', 'view()') ||
        CSS.supports('animation-timeline', 'scroll()'));

    if (hasNativeSupport) {
      setSupportsNativeViewTimeline(true);
      return;
    }

    // High performance fallback using passive scroll listener with requestAnimationFrame
    let rafId: number | null = null;
    let isTicking = false;

    const updateParallax = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only calculate if the card is visible or near the viewport
      if (rect.bottom >= -150 && rect.top <= windowHeight + 150) {
        const cardCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const delta = cardCenter - viewportCenter;
        const offset = Math.round(delta * profile.factor);
        setTranslateY(offset);
      }
      isTicking = false;
    };

    const onScroll = () => {
      if (!isTicking) {
        isTicking = true;
        rafId = window.requestAnimationFrame(updateParallax);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateParallax();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [profile.factor]);

  return (
    <div ref={cardRef} className="reveal break-inside-avoid">
      <figure
        onClick={() => onOpenViewer(resolvedUrl, photo.cap)}
        className={`card group relative overflow-hidden rounded-2xl shadow-sm border border-[#C9A96E]/25 hover:border-[#C9A96E]/60 bg-[#FCFBF9] cursor-pointer transition-all duration-500 ${photo.ar}`}
      >
        {/* Parallax Image Wrapper: sized with extra bleed to allow fluid floating without clipping seams */}
        <div
          className={`absolute -inset-x-[6%] -inset-y-[10%] w-[112%] h-[120%] pointer-events-none transition-transform duration-200 ease-out ${
            supportsNativeViewTimeline ? profile.cssClass : ''
          }`}
          style={
            !supportsNativeViewTimeline
              ? {
                  transform: `translate3d(0, ${translateY}px, 0) scale(${profile.baseScale})`,
                  willChange: 'transform',
                }
              : undefined
          }
        >
          <AshImage
            src={resolvedUrl}
            fallbackSrc={photo.fallbackImg}
            alt={photo.cap}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            photoTitle={photo.cap}
            categoryTag={photo.category}
          />
        </div>

        {/* Subtle Corner Accents on Hover */}
        <span className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-white/50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        <span className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-white/50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        <span className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-white/50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        <span className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-white/50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

        {/* Gradient Overlay & Poetic Caption */}
        <div className="ov absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent flex items-end justify-between p-5 z-10">
          <div>
            <figcaption className="font-serif italic text-white text-lg sm:text-xl drop-shadow">
              {photo.cap}
            </figcaption>
            <p className="font-sans text-[11px] text-white/80 line-clamp-1 mt-0.5">
              {photo.albumCaption}
            </p>
          </div>

          {/* Tiny gold ornament appearing on hover */}
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#C9A96E] ml-2 flex-shrink-0">
            <svg className="w-4 h-4 drop-shadow">
              <use href="#flower" />
            </svg>
          </span>
        </div>
      </figure>
    </div>
  );
};
