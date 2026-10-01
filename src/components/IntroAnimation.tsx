import React, { useEffect, useState } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'flower' | 'ash' | 'ashmeera' | 'flowerOfHeaven' | 'fadeOut'>('flower');

  useEffect(() => {
    // Stage 1: Flower appears immediately
    const t1 = setTimeout(() => {
      setPhase('ash');
    }, 650);

    // Stage 2: ASH
    const t2 = setTimeout(() => {
      setPhase('ashmeera');
    }, 1400);

    // Stage 3: ASHMEEERA + "The Flower of Heaven"
    const t3 = setTimeout(() => {
      setPhase('flowerOfHeaven');
    }, 2200);

    // Stage 4: Fade out and reveal homepage
    const t4 = setTimeout(() => {
      setPhase('fadeOut');
    }, 3100);

    const t5 = setTimeout(() => {
      onComplete();
    }, 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setPhase('fadeOut');
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FCFBF9] text-[#4A4240] px-6 transition-opacity duration-700 ${
        phase === 'fadeOut' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Welcome intro for Ashmeera"
    >
      {/* Subtle background geometric star */}
      <svg
        className="absolute w-[90vmin] h-[90vmin] text-[#C9A96E] opacity-20 animate-[spin_120s_linear_infinite]"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <g fill="none" stroke="currentColor" strokeWidth="0.8">
          <rect x="20" y="20" width="60" height="60" />
          <rect x="20" y="20" width="60" height="60" transform="rotate(45 50 50)" />
          <circle cx="50" cy="50" r="18" />
          <circle cx="50" cy="50" r="3" />
        </g>
      </svg>

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 font-sans text-xs uppercase tracking-widest text-[#4A4240]/40 hover:text-[#C58A93] transition-colors py-2 px-3 rounded-full hover:bg-black/5"
      >
        Skip ✕
      </button>

      {/* Intro sequence container */}
      <div className="relative text-center flex flex-col items-center justify-center max-w-md">
        {/* Flower */}
        <div
          className={`transition-all duration-700 transform ${
            phase === 'flower'
              ? 'scale-100 opacity-90'
              : 'scale-90 opacity-70 mb-4'
          }`}
        >
          <svg
            className="w-14 h-14 text-[#C9A96E] animate-[spin_30s_linear_infinite]"
            viewBox="-50 -50 100 100"
            aria-hidden="true"
          >
            <g fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1">
              <ellipse cy="-24" rx="10" ry="22" />
              <ellipse cy="-24" rx="10" ry="22" transform="rotate(72)" />
              <ellipse cy="-24" rx="10" ry="22" transform="rotate(144)" />
              <ellipse cy="-24" rx="10" ry="22" transform="rotate(216)" />
              <ellipse cy="-24" rx="10" ry="22" transform="rotate(288)" />
            </g>
            <circle r="5" fill="#C9A96E" />
          </svg>
        </div>

        {/* ASH -> ASHMEEERA */}
        <div className="h-20 sm:h-24 flex items-center justify-center">
          {phase === 'ash' && (
            <h2 className="font-serif text-5xl sm:text-7xl font-normal tracking-[0.25em] text-[#4A4240] animate-[rise_0.6s_ease-out_forwards]">
              ASH
            </h2>
          )}

          {(phase === 'ashmeera' || phase === 'flowerOfHeaven' || phase === 'fadeOut') && (
            <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-[0.18em] text-[#4A4240] animate-[rise_0.7s_ease-out_forwards]">
              ASHMEEERA
            </h1>
          )}
        </div>

        {/* "The Flower of Heaven" */}
        <div className="h-10 mt-2 flex items-center justify-center">
          {(phase === 'flowerOfHeaven' || phase === 'fadeOut') && (
            <p className="font-serif italic text-lg sm:text-xl text-[#6B7F64] tracking-wide animate-[rise_0.8s_ease-out_forwards]">
              "The Flower of Heaven"
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
