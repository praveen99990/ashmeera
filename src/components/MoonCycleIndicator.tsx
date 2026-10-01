import React, { useState, useEffect, useRef, useMemo } from 'react';
import { getMoonDynamicReflection } from '../utils/moonPoeticReflections';
import { sarangiAudio } from '../utils/audioPlayer';

interface MoonCycleIndicatorProps {
  className?: string;
  showLabel?: boolean;
}

interface PhaseInfo {
  nameUrdu: string;
  nameEnglish: string;
  poeticNote: string;
  illumination: string;
  reflectionOnLove: string;
  urduReflection: string;
}

const PHASES: PhaseInfo[] = [
  {
    nameUrdu: 'محاق',
    nameEnglish: 'New Moon',
    poeticNote: 'A silent prayer before the dawn',
    illumination: '0% • Darkness & Origin',
    reflectionOnLove:
      'Even in stillness and shadow, love never fades — it gathers strength in quiet devotion, preparing to illuminate the world once more.',
    urduReflection: 'محبت خاموشی میں بھی زندہ رہتی ہے، نئی روشنی کے انتظار میں',
  },
  {
    nameUrdu: 'ہلالِ نو',
    nameEnglish: 'Waxing Crescent',
    poeticNote: 'The first whisper of love',
    illumination: '25% • Tender Beginning',
    reflectionOnLove:
      'Like the first delicate curve of the crescent, every subtle glance of yours kindles an ancient, inextinguishable light in my soul.',
    urduReflection: 'تیری ایک نظر، محبت کی شروعات کا مبارک چاند',
  },
  {
    nameUrdu: 'تربیعِ اول',
    nameEnglish: 'First Quarter',
    poeticNote: 'A promise unfolding in light',
    illumination: '50% • Balanced Surrender',
    reflectionOnLove:
      'Half revealed, entirely faithful. Love finds its true courage in the balance between sacred mystery and complete devotion.',
    urduReflection: 'آدھا عیاں مگر دل تمام تر تیرا، وفا کا عہدِ وفا',
  },
  {
    nameUrdu: 'احدب',
    nameEnglish: 'Waxing Gibbous',
    poeticNote: 'Radiance drawing near',
    illumination: '75% • Growing Splendor',
    reflectionOnLove:
      'Drawing closer to perfection with every breath, the heart swells with joyful anticipation of your radiant presence.',
    urduReflection: 'تیرے دیدار کی آرزو میں روز بروز بڑھتا ہوا نور',
  },
  {
    nameUrdu: 'بدرِ کامل',
    nameEnglish: 'Full Moon',
    poeticNote: 'Noor-e-Ash in complete glory',
    illumination: '100% • Eternal Fulfillment',
    reflectionOnLove:
      'In your radiant fullness, all longing finds peace. You are Noor-e-Ashmeera — turning every night into timeless poetry and celestial grace.',
    urduReflection: 'تو نورِ کامل ہے، رات کی سب سے پاکیزہ اور روشن دعا',
  },
  {
    nameUrdu: 'احدبِ ثانی',
    nameEnglish: 'Waning Gibbous',
    poeticNote: 'A lingering warmth in the soul',
    illumination: '75% • Golden Gratitude',
    reflectionOnLove:
      'Love shares its light with selfless grace, understanding that tenderness grows deeper and purer the more gently it is held.',
    urduReflection: 'محبت جو بانٹ کر بھی کم نہ ہو، وہی سچی لازوال چاہت ہے',
  },
  {
    nameUrdu: 'تربیعِ ثانی',
    nameEnglish: 'Third Quarter',
    poeticNote: 'Quiet grace across the hours',
    illumination: '50% • Serene Certitude',
    reflectionOnLove:
      'Unshakable through passing time and shifting skies, true devotion rests in peaceful certitude and unwavering loyalty.',
    urduReflection: 'وقت کے گزرنے کے ساتھ بھی جو نہ بدلے، وہ تیرا میرا عشق ہے',
  },
  {
    nameUrdu: 'ہلالِ آخر',
    nameEnglish: 'Waning Crescent',
    poeticNote: 'Eternal return to your gaze',
    illumination: '25% • Rebirth & Return',
    reflectionOnLove:
      'The cycle softens into a whisper, reassuring the heart that in love, every ending is merely an embrace waiting to begin again.',
    urduReflection: 'ہر اختتام، تیرے ساتھ ایک نئے سفر کا پیش خیمہ ہے',
  },
];

export const MoonCycleIndicator: React.FC<MoonCycleIndicatorProps> = ({
  className = '',
  showLabel = true,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [manualOffset, setManualOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTooltipPinned, setIsTooltipPinned] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [justClicked, setJustClicked] = useState(false);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronized state with Sarangi music for the golden flame breathing effect
  const [isMusicPlaying, setIsMusicPlaying] = useState(() => {
    return sarangiAudio.getIsPlaying() && !sarangiAudio.getIsMuted();
  });

  useEffect(() => {
    const unsub = sarangiAudio.subscribe((playing, _cur, _dur, muted) => {
      setIsMusicPlaying(playing && !muted);
    });
    return () => unsub();
  }, []);

  // Target angle based on scroll
  const targetThetaRef = useRef(Math.PI);
  const [smoothedTheta, setSmoothedTheta] = useState(Math.PI);

  const showTooltip = isHovered || isFocused || isTooltipPinned;

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  // Smooth scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? window.scrollY / docHeight : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update target angle whenever scroll or manual offset changes
  useEffect(() => {
    // 2 complete lunar cycles across the full page scroll
    const totalCycles = 2;
    const target = Math.PI + (scrollProgress * Math.PI * 2 * totalCycles) + manualOffset;
    targetThetaRef.current = target;
  }, [scrollProgress, manualOffset]);

  // Smooth lerp loop for dreamlike celestial transitions
  useEffect(() => {
    let animId: number;

    const lerpLoop = () => {
      setSmoothedTheta((prev) => {
        const diff = targetThetaRef.current - prev;
        if (Math.abs(diff) < 0.001) return targetThetaRef.current;
        return prev + diff * 0.12; // silky smooth 12% convergence per frame
      });
      animId = requestAnimationFrame(lerpLoop);
    };

    animId = requestAnimationFrame(lerpLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Normalize smoothedTheta to [0, 2*PI)
  const normalizedTheta = useMemo(() => {
    const norm = smoothedTheta % (Math.PI * 2);
    return norm < 0 ? norm + Math.PI * 2 : norm;
  }, [smoothedTheta]);

  // Determine closest poetic phase
  const phaseIndex = useMemo(() => {
    const slice = (Math.PI * 2) / 8;
    const adjusted = (normalizedTheta + slice / 2) % (Math.PI * 2);
    return Math.floor(adjusted / slice) % 8;
  }, [normalizedTheta]);

  const currentPhase = PHASES[phaseIndex];

  // Click to advance one phase forward with subtle sparkle and open tooltip reflection
  const handleMoonClick = () => {
    setManualOffset((prev) => prev + Math.PI / 4);
    setJustClicked(true);
    setIsTooltipPinned(true);
    setTimeout(() => setJustClicked(false), 700);

    // Keep tooltip open for comfortable reading (dismiss after 5s if user moves on)
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setIsTooltipPinned(false);
    }, 5000);
  };

  // Geometry calculations for exact SVG moon phase mask
  const CX = 28;
  const CY = 28;
  const R = 20.5;
  const k = Math.cos(normalizedTheta); // range [-1, 1]
  const rx = Math.max(0.1, R * Math.abs(k));
  const isWaxing = normalizedTheta < Math.PI;

  // Real-time calculated illumination percentage & dynamic Urdu reflection on love
  const illuminationPercent = Math.round(((1 - Math.cos(normalizedTheta)) / 2) * 100);
  const dynamicReflection = useMemo(() => {
    return getMoonDynamicReflection(illuminationPercent, isWaxing);
  }, [illuminationPercent, isWaxing]);

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none group cursor-pointer ${className}`}
      onClick={handleMoonClick}
      onMouseEnter={() => {
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => {
        setIsFocused(false);
        setIsTooltipPinned(false);
      }}
      title={`Moon Phase: ${currentPhase.nameEnglish} (${currentPhase.nameUrdu}) — Click to advance phase`}
      role="button"
      tabIndex={0}
      aria-expanded={showTooltip}
      aria-label={`Moon Phase: ${currentPhase.nameEnglish} (${currentPhase.nameUrdu}). Click to advance phase and explore reflection on love's cycle.`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleMoonClick();
        } else if (e.key === 'Escape') {
          setIsTooltipPinned(false);
          setIsFocused(false);
        }
      }}
    >
      {/* Celestial Talisman Outer Assembly */}
      <div className="relative flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
        {/* Pulsing Golden Fire of Love Halo (Breathes in sync with Sarangi Music) */}
        <div
          className={`absolute -inset-3.5 sm:-inset-4.5 rounded-full pointer-events-none transition-all duration-700 ${
            isMusicPlaying ? 'sarangi-fire-pulse' : 'opacity-30 scale-95'
          }`}
          style={{
            background:
              'radial-gradient(circle, rgba(245, 185, 80, 0.48) 0%, rgba(229, 138, 54, 0.28) 45%, rgba(201, 169, 110, 0.15) 70%, transparent 88%)',
          }}
          aria-hidden="true"
        />

        {/* Secondary Inner Warm Flame Ember Core */}
        <div
          className={`absolute -inset-1.5 rounded-full pointer-events-none transition-opacity duration-700 blur-xs ${
            isMusicPlaying ? 'opacity-90' : 'opacity-40'
          }`}
          style={{
            background:
              'radial-gradient(circle, rgba(240, 168, 64, 0.55) 0%, rgba(201, 169, 110, 0.25) 60%, transparent 82%)',
          }}
          aria-hidden="true"
        />

        {/* Soft Ambient Lunar Halo */}
        <div
          className="absolute inset-0 rounded-full bg-[#C9A96E]/20 blur-md pointer-events-none transition-opacity duration-700"
          style={{
            opacity: 0.3 + (1 - Math.abs(k)) * 0.45 + (isHovered ? 0.35 : 0),
          }}
        />

        {/* Floating Golden Ember Sparks when music breathes */}
        {isMusicPlaying && (
          <div className="absolute inset-0 pointer-events-none overflow-visible" aria-hidden="true">
            <span
              className="absolute -top-1 left-2 text-[9px] text-[#E5B84B] sarangi-ember select-none"
              style={{ animationDelay: '0s' }}
            >
              ✦
            </span>
            <span
              className="absolute -top-2 right-2 text-[8px] text-[#E68A36] sarangi-ember select-none"
              style={{ animationDelay: '1.4s' }}
            >
              ✧
            </span>
            <span
              className="absolute top-1 left-1/2 -translate-x-1/2 text-[7px] text-[#F5C26B] sarangi-ember select-none"
              style={{ animationDelay: '2.1s' }}
            >
              •
            </span>
          </div>
        )}

        {/* Astrolabe / Celestial Bezel SVG */}
        <svg
          className="w-12 h-12 sm:w-14 sm:h-14 overflow-visible drop-shadow-[0_2px_8px_rgba(201,169,110,0.22)]"
          viewBox="0 0 56 56"
          aria-hidden="true"
        >
          <defs>
            {/* Lunar surface texture & luminous lighting */}
            <radialGradient id="lunarSurface" cx="38%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#FFFDF9" />
              <stop offset="40%" stopColor="#F9F1E4" />
              <stop offset="75%" stopColor="#EDE1CE" />
              <stop offset="100%" stopColor="#DAC6AE" />
            </radialGradient>

            {/* Dark cosmic night sky / unlit side */}
            <radialGradient id="lunarShadow" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#251E28" />
              <stop offset="85%" stopColor="#1B1520" />
              <stop offset="100%" stopColor="#120D16" />
            </radialGradient>

            {/* Golden celestial rim glow */}
            <linearGradient id="astrolabeGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DFC38C" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#C9A96E" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#AA8245" stopOpacity="0.8" />
            </linearGradient>

            {/* Fire of Love Astrolabe Gold Gradient (Harmonized with Sarangi) */}
            <linearGradient id="fireAstrolabeGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8D388" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#E58A36" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#C9A96E" stopOpacity="0.9" />
            </linearGradient>

            {/* Mathematically continuous Moon Phase Mask */}
            <mask id="smoothMoonMask">
              <rect x="0" y="0" width="56" height="56" fill="black" />

              {isWaxing ? (
                // WAXING: illuminated side is on the right
                k > 0 ? (
                  // Crescent: Right half white, minus elliptical cutout (black)
                  <>
                    <path
                      d={`M ${CX} ${CY - R} A ${R} ${R} 0 0 1 ${CX} ${CY + R} Z`}
                      fill="white"
                    />
                    <ellipse cx={CX} cy={CY} rx={rx} ry={R} fill="black" />
                  </>
                ) : (
                  // Gibbous: Right half white, plus elliptical addition (white) on left
                  <>
                    <path
                      d={`M ${CX} ${CY - R} A ${R} ${R} 0 0 1 ${CX} ${CY + R} Z`}
                      fill="white"
                    />
                    <ellipse cx={CX} cy={CY} rx={rx} ry={R} fill="white" />
                  </>
                )
              ) : (
                // WANING: illuminated side is on the left
                k <= 0 ? (
                  // Gibbous: Left half white, plus elliptical addition (white) on right
                  <>
                    <path
                      d={`M ${CX} ${CY - R} A ${R} ${R} 0 0 0 ${CX} ${CY + R} Z`}
                      fill="white"
                    />
                    <ellipse cx={CX} cy={CY} rx={rx} ry={R} fill="white" />
                  </>
                ) : (
                  // Crescent: Left half white, minus elliptical cutout (black)
                  <>
                    <path
                      d={`M ${CX} ${CY - R} A ${R} ${R} 0 0 0 ${CX} ${CY + R} Z`}
                      fill="white"
                    />
                    <ellipse cx={CX} cy={CY} rx={rx} ry={R} fill="black" />
                  </>
                )
              )}
            </mask>
          </defs>

          {/* Outer Astrolabe Hairline Ring with micro-dashes */}
          <circle
            cx={CX}
            cy={CY}
            r="26.5"
            fill="none"
            stroke={isMusicPlaying ? 'url(#fireAstrolabeGold)' : 'url(#astrolabeGold)'}
            strokeWidth="0.65"
            strokeDasharray="2 3"
            className="opacity-70 group-hover:opacity-100 transition-opacity"
          />

          {/* Inner Astrolabe Hairline Ring */}
          <circle
            cx={CX}
            cy={CY}
            r="23.5"
            fill="none"
            stroke="#C9A96E"
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />

          {/* Cardinal Astrolabe Ticks (North, East, South, West) */}
          <line x1={CX} y1="0.5" x2={CX} y2="3.2" stroke="#C9A96E" strokeWidth="0.9" strokeOpacity="0.85" />
          <line x1={CX} y1="52.8" x2={CX} y2="55.5" stroke="#C9A96E" strokeWidth="0.9" strokeOpacity="0.85" />
          <line x1="0.5" y1={CY} x2="3.2" y2={CY} stroke="#C9A96E" strokeWidth="0.9" strokeOpacity="0.85" />
          <line x1="52.8" y1={CY} x2="55.5" y2={CY} stroke="#C9A96E" strokeWidth="0.9" strokeOpacity="0.85" />

          {/* 4 Diagonal Micro-Stars (45 deg) */}
          <circle cx="10" cy="10" r="0.75" fill="#C9A96E" opacity="0.6" />
          <circle cx="46" cy="10" r="0.75" fill="#C9A96E" opacity="0.6" />
          <circle cx="10" cy="46" r="0.75" fill="#C9A96E" opacity="0.6" />
          <circle cx="46" cy="46" r="0.75" fill="#C9A96E" opacity="0.6" />

          {/* 1. Base Dark Sky Orb (Unlit Moon Face) */}
          <circle cx={CX} cy={CY} r={R} fill="url(#lunarShadow)" />

          {/* Subtle Crater Texture on unlit body */}
          <circle cx={CX - 6} cy={CY - 4} r="2.8" fill="#2E2532" opacity="0.4" />
          <circle cx={CX + 7} cy={CY + 5} r="3.5" fill="#2E2532" opacity="0.35" />
          <circle cx={CX + 2} cy={CY - 8} r="2.2" fill="#2E2532" opacity="0.3" />

          {/* 2. Illuminated Lunar Surface (masked smoothly by phase angle) */}
          <g mask="url(#smoothMoonMask)">
            <circle cx={CX} cy={CY} r={R} fill="url(#lunarSurface)" />

            {/* Subtle Maria / Sea formations on lit side */}
            <circle cx={CX - 5} cy={CY - 5} r="3.8" fill="#DFC9B0" opacity="0.32" />
            <circle cx={CX + 6} cy={CY + 6} r="4.2" fill="#DFC9B0" opacity="0.28" />
            <circle cx={CX + 3} cy={CY - 7} r="2.8" fill="#DFC9B0" opacity="0.22" />
            <circle cx={CX - 8} cy={CY + 4} r="3" fill="#DFC9B0" opacity="0.18" />

            {/* Luminous Inner Moon Rim Highlight */}
            <circle
              cx={CX}
              cy={CY}
              r={R}
              fill="none"
              stroke="#FFFBF2"
              strokeWidth="0.9"
              opacity="0.65"
            />
          </g>

          {/* Thin Gold Boundary Hairline */}
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="#C9A96E"
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />

          {/* Center Pivot Jewel Star */}
          <circle
            cx={CX}
            cy={CY}
            r="0.75"
            fill="#C9A96E"
            className="opacity-70 group-hover:opacity-100 transition-opacity"
          />
        </svg>

        {/* Click Sparkle Flash */}
        {justClicked && (
          <span className="absolute -top-1.5 right-0 text-[10px] text-[#C9A96E] animate-ping pointer-events-none">
            ✦
          </span>
        )}
      </div>

      {/* Poetic Indicator Label */}
      {showLabel && (
        <div className="mt-1 flex flex-col items-center text-center transition-all duration-300">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px]">
            {/* Urdu phase name */}
            <span className="font-arabic text-[#C9A96E] text-xs font-medium tracking-wide">
              {currentPhase.nameUrdu}
            </span>
            <span className="text-[#C9A96E]/40 text-[8px]">•</span>
            {/* English phase name */}
            <span className="font-serif italic text-[#4A4240]/80 tracking-wide text-[10px] sm:text-[11px]">
              {currentPhase.nameEnglish}
            </span>
          </div>

          {/* Delicate Timeless Metaphor Note */}
          <p className="font-serif text-[8.5px] sm:text-[9.5px] text-[#6B7F64] tracking-widest uppercase mt-0.5 opacity-65 group-hover:opacity-100 transition-opacity">
            {currentPhase.poeticNote}
          </p>
        </div>
      )}

      {/* Luxury Poetic Tooltip with Current Moon Phase & Reflection on Love's Cycle */}
      <div
        role="tooltip"
        aria-hidden={!showTooltip}
        className={`absolute top-full mt-2.5 left-1/2 -translate-x-1/2 w-64 sm:w-72 p-3.5 sm:p-4 rounded-2xl bg-[#FAF8F5]/98 border border-[#C9A96E]/45 shadow-[0_16px_36px_rgba(74,66,64,0.16),0_2px_12px_rgba(201,169,110,0.22)] backdrop-blur-md z-50 text-center transition-all duration-300 pointer-events-auto ${
          showTooltip
            ? 'opacity-100 translate-y-0 visible scale-100'
            : 'opacity-0 -translate-y-2 invisible scale-95 pointer-events-none'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Upward Pointer Triangle */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#FAF8F5] border-t border-l border-[#C9A96E]/45 rotate-45" />

        {/* Phase Header: English & Urdu */}
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#C9A96E]/20">
          <div className="flex items-center gap-1.5 text-left">
            <span className="text-[#C9A96E] text-xs">🌙</span>
            <span className="font-serif font-medium text-xs text-[#4A4240]">
              {currentPhase.nameEnglish}
            </span>
          </div>
          <span className="font-arabic text-[#C9A96E] text-sm font-semibold" dir="rtl">
            {currentPhase.nameUrdu}
          </span>
        </div>

        {/* Illumination & State Badge */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF2DF]/90 border border-[#C9A96E]/35 text-[9px] font-sans tracking-widest text-[#7A5A20] uppercase font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
            <span>
              {illuminationPercent}% Illuminated • {isWaxing ? 'Waxing' : 'Waning'}
            </span>
          </div>

          {/* Fire of Love Harmonic Breathing Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF0E6]/90 border border-[#E58A36]/35 text-[8.5px] font-sans tracking-wide text-[#7A4B1A]">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                isMusicPlaying
                  ? 'bg-[#E58A36] animate-pulse shadow-[0_0_6px_#E58A36]'
                  : 'bg-[#C9A96E]/40'
              }`}
            />
            <span className="font-medium">
              {isMusicPlaying
                ? 'Fire of Love • Breathing with Sarangi'
                : 'Fire of Love • Resting Ember'}
            </span>
          </div>
        </div>

        {/* Dynamic Poetic Reflection on Love's Cycle mapped to percentage */}
        <div className="mt-2.5">
          <span className="text-[8.5px] uppercase tracking-[0.2em] font-sans text-[#4A4240]/55 block font-medium">
            {dynamicReflection.poeticTheme}
          </span>
          <p className="mt-1.5 text-xs font-serif italic text-[#4A4240]/90 leading-relaxed">
            "{dynamicReflection.poeticReflection}"
          </p>
          <p className="mt-1.5 text-xs font-arabic text-[#8A5A62] leading-normal" dir="rtl">
            {dynamicReflection.urduReflection}
          </p>
          <span className="mt-1 block text-[9px] font-serif text-[#C9A96E] italic">
            ✦ {dynamicReflection.devotionNote}
          </span>
        </div>

        {/* Micro-interaction Whisper */}
        <div className="mt-2.5 pt-1.5 border-t border-[#C9A96E]/15 flex items-center justify-center gap-1 text-[8.5px] font-sans text-[#4A4240]/45">
          <span className="text-[#C9A96E]">✦</span>
          <span>Cycles with scroll • Click moon to advance phase</span>
        </div>
      </div>
    </div>
  );
};
