import React, { useState, useEffect, useRef } from 'react';
import { ASH_CONFIG } from '../config/ashConfig';
import { MoonCycleIndicator } from './MoonCycleIndicator';

interface InteractiveHeroProps {
  onOpenForAsh: () => void;
  onTriggerEasterEgg: () => void;
  onOpenSecretNote: (noteId: string) => void;
}

export const InteractiveHero: React.FC<InteractiveHeroProps> = ({
  onOpenForAsh,
  onTriggerEasterEgg,
  onOpenSecretNote,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [clickCount, setClickCount] = useState(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Parallax tracking with gentle smoothing
  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        setMousePos({ x, y });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleNameClick = () => {
    setClickCount((prev) => {
      const next = prev + 1;
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);

      if (next >= ASH_CONFIG.easterEgg.requiredClicks) {
        onTriggerEasterEgg();
        return 0;
      }

      clickTimeoutRef.current = setTimeout(() => {
        setClickCount(0);
      }, 1200);

      return next;
    });
  };

  return (
    <header className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden">
      {/* Top Bar with subtle "For Ash" button */}
      <div className="absolute top-5 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between z-20 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Secret Note #1 placed discreetly as an ornament */}
          <button
            onClick={() => onOpenSecretNote('note-1')}
            title="A subtle blossom"
            className="group relative p-2 rounded-full hover:bg-[#C9A96E]/10 transition-colors"
            aria-label="Secret flower ornament"
          >
            <svg
              className="w-4 h-4 text-[#C9A96E]/60 group-hover:text-[#C58A93] transition-colors"
              viewBox="-50 -50 100 100"
            >
              <use href="#flower" />
            </svg>
            <span className="sr-only">Secret note ornament</span>
          </button>
        </div>

        {/* Top Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5 pointer-events-auto">
          {/* The "For Ash" unobtrusive secret button */}
          <button
            onClick={onOpenForAsh}
            className="group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full border border-[#C9A96E]/30 hover:border-[#C58A93]/60 bg-white/50 hover:bg-white/90 backdrop-blur-md shadow-xs transition-all duration-300 text-[11px] sm:text-xs font-serif text-[#4A4240]/80 hover:text-[#C58A93]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] group-hover:bg-[#C58A93] transition-colors" />
            <span>For Ash</span>
            <span className="text-[10px] text-[#C9A96E] opacity-70 group-hover:translate-x-0.5 transition-transform">
              →
            </span>
          </button>
        </div>
      </div>

      {/* Subtle Animated Moon-Cycle Indicator at top center of hero section */}
      <div className="absolute top-4 sm:top-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-auto">
        <MoonCycleIndicator />
      </div>

      {/* Parallax Star Background */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 14}px, ${mousePos.y * 14}px, 0)`,
        }}
      >
        <svg
          className="w-[125vmin] h-[125vmin] text-[#C9A96E] opacity-25 animate-[spin_150s_linear_infinite]"
          aria-hidden="true"
        >
          <use href="#star" />
        </svg>
      </div>

      {/* Parallax Flower Decoration 1 (Top-Left) */}
      <div
        className="absolute -top-10 -left-12 pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -18}px, 0) rotate(${mousePos.x * 4}deg)`,
        }}
      >
        <svg
          className="w-56 sm:w-80 text-[#C58A93] opacity-60"
          viewBox="-50 -50 100 100"
          aria-hidden="true"
        >
          <use href="#flower" />
        </svg>
      </div>

      {/* Parallax Flower Decoration 2 (Bottom-Right) */}
      <div
        className="absolute -bottom-14 -right-10 pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 22}px, ${mousePos.y * 22}px, 0) rotate(${mousePos.y * -5}deg)`,
        }}
      >
        <svg
          className="w-64 sm:w-96 text-[#6B7F64] opacity-50"
          viewBox="-50 -50 100 100"
          aria-hidden="true"
        >
          <use href="#flower" />
        </svg>
      </div>

      {/* Central Content */}
      <div className="relative max-w-2xl select-none">
        {/* Arabic Title */}
        <p className="font-arabic text-3xl sm:text-4xl text-[#C9A96E] rise" dir="rtl" lang="ar">
          {ASH_CONFIG.taglineArabic}
        </p>

        {/* Large "Ashmeera." Name with Shimmer & Floating Sparkles */}
        <div className="relative inline-block my-2 sm:my-3">
          {/* Subtle floating particles around the name */}
          <span
            className="golden-sparkle w-1.5 h-1.5"
            style={{ top: '-10%', left: '12%', animationDelay: '0.2s' }}
          />
          <span
            className="golden-sparkle w-2 h-2"
            style={{ top: '20%', right: '-8%', animationDelay: '1.4s' }}
          />
          <span
            className="golden-sparkle w-1 h-1"
            style={{ bottom: '-5%', left: '45%', animationDelay: '0.9s' }}
          />

          <h1
            onClick={handleNameClick}
            title="Click 'Ash' three times for a secret"
            className="shimmer-text cursor-pointer font-serif font-normal text-[clamp(4.2rem,18vw,12.5rem)] leading-[1.05] tracking-tight text-[#4A4240] rise inline-block hover:scale-[1.01] transition-transform duration-500"
            style={
              {
                '--d': '.25s',
                transform: `translateY(${Math.sin(Date.now() / 1500) * 2}px)`,
              } as React.CSSProperties
            }
          >
            {ASH_CONFIG.name}.
          </h1>
        </div>

        {/* Subtitle */}
        <p
          className="font-sans font-light text-lg sm:text-xl tracking-[.28em] text-[#6B7F64] mt-2 rise"
          style={{ '--d': '.6s' } as React.CSSProperties}
        >
          {ASH_CONFIG.taglineEnglish}
        </p>

        {/* Poetic Dedication */}
        <p
          className="font-serif italic text-lg sm:text-xl leading-relaxed text-[#4A4240]/75 mt-8 sm:mt-10 max-w-xl mx-auto rise"
          style={{ '--d': '1s' } as React.CSSProperties}
        >
          {ASH_CONFIG.heroDedication}
        </p>

        {/* Scroll Call to Action */}
        <div className="mt-10 sm:mt-12 flex flex-col items-center gap-2">
          <a
            href="#gallery"
            className="inline-block text-sm text-[#4A4240]/55 hover:text-[#C58A93] transition-colors rise"
            style={{ '--d': '1.4s' } as React.CSSProperties}
          >
            Begin the exhibition ↓
          </a>

          {/* Secret Note #2 placed subtly beneath hero */}
          <button
            onClick={() => onOpenSecretNote('note-2')}
            className="opacity-40 hover:opacity-100 transition-opacity p-1 text-[#C9A96E]"
            title="A subtle star"
          >
            <svg className="w-3.5 h-3.5"><use href="#star" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
};
