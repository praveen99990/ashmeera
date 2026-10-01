import React, { useEffect, useState, useRef } from 'react';
import { MoodKey, MOODS } from '../utils/moodOfAshmeera';

interface Particle {
  id: number;
  left: number; // percentage
  duration: number; // seconds
  delay: number; // seconds
  scale: number;
  opacity: number;
  color: string;
  type: 'petal' | 'sparkle' | 'mote';
}

export interface PetalWordMessage {
  urdu: string;
  transliteration: string;
  meaning: string;
}

const PETAL_WORDS: PetalWordMessage[] = [
  { urdu: 'یاد', transliteration: 'Yaad', meaning: 'Sweet Remembrance' },
  { urdu: 'نور', transliteration: 'Noor', meaning: 'Celestial Radiance' },
  { urdu: 'دعا', transliteration: 'Dua', meaning: 'Sacred Blessing' },
  { urdu: 'وفا', transliteration: 'Wafa', meaning: 'Eternal Loyalty' },
  { urdu: 'عشق', transliteration: 'Ishq', meaning: 'Soul\'s Devotion' },
  { urdu: 'سکون', transliteration: 'Sukoon', meaning: 'Sacred Peace' },
  { urdu: 'ادا', transliteration: 'Ada', meaning: 'Delicate Grace' },
  { urdu: 'جان', transliteration: 'Jaan', meaning: 'My Very Breath' },
  { urdu: 'چاند', transliteration: 'Chaand', meaning: 'Beloved Moon' },
  { urdu: 'حیا', transliteration: 'Haya', meaning: 'Tender Modesty' },
  { urdu: 'شوق', transliteration: 'Shauq', meaning: "Heart's Longing" },
  { urdu: 'محبت', transliteration: 'Mohabbat', meaning: 'Pure Love' },
];

interface EmberParticle {
  id: number;
  tx: number;
  ty: number;
  size: number;
  color: string;
  delay: number;
  rot: number;
  char: string;
}

interface PetalBurst {
  id: number;
  x: number;
  y: number;
  word: PetalWordMessage;
  embers: EmberParticle[];
}

interface FloatingPetalsProps {
  mood?: MoodKey;
}

// Subtle crystalline glass chime via Web Audio API
const playPetalChime = () => {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    // Harmonic chime (E6 / 1318.5Hz and B6 / 1975.5Hz)
    const freqs = [1318.5, 1975.5];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      gain.gain.setValueAtTime(0.045, now + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.65);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.7);
    });

    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 1000);
  } catch {
    // Ignore audio errors gracefully
  }
};

export const FloatingPetals: React.FC<FloatingPetalsProps> = ({ mood = 'dreamy' }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [bursts, setBursts] = useState<PetalBurst[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const wordIndexRef = useRef(0);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);

      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);

      if (!mediaQuery.matches) {
        const theme = MOODS[mood] || MOODS.dreamy;
        const colors = theme.particleColors;
        const speedMult = theme.particleSpeedMultiplier;

        // Generate 8 slow-drifting particles adapted to the mood
        const list: Particle[] = Array.from({ length: 8 }).map((_, i) => {
          let pType: 'petal' | 'sparkle' | 'mote' = 'petal';
          if (mood === 'dreamy') {
            pType = i % 2 === 0 ? 'sparkle' : 'petal';
          } else if (mood === 'serene') {
            pType = i % 2 === 0 ? 'mote' : 'petal';
          } else if (mood === 'nostalgic') {
            pType = i % 3 === 0 ? 'mote' : 'petal';
          } else if (mood === 'celebration') {
            pType = i % 2 === 0 ? 'sparkle' : 'petal';
          } else {
            pType = 'petal';
          }

          return {
            id: i,
            left: 5 + Math.floor((i * 13 + (i * 7) % 19) % 88),
            duration: Math.max(12, (15 + i * 2.2) * speedMult),
            delay: -(i * 2.5),
            scale: 0.65 + (i % 3) * 0.18,
            opacity: 0.35 + (i % 3) * 0.16,
            color: colors[i % colors.length],
            type: pType,
          };
        });

        setParticles(list);
      }

      return () => {
        mediaQuery.removeEventListener('change', listener);
      };
    }
  }, [mood]);

  // Petal Touch Interaction: burst into golden embers and reveal an Urdu romantic message
  const handlePetalTouch = (e: React.MouseEvent<HTMLDivElement>, particleId: number) => {
    e.stopPropagation();
    e.preventDefault();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Pick next romantic Urdu word sequentially
    const word = PETAL_WORDS[wordIndexRef.current % PETAL_WORDS.length];
    wordIndexRef.current += 1;

    // Generate 14 radiant golden embers flying radially outward
    const emberPalette = ['#FFE8A3', '#F5B950', '#DFC38C', '#E9C9CB', '#FFFDF9', '#E58A36'];
    const emberSymbols = ['✦', '✧', '•', '⋆'];
    const embers: EmberParticle[] = Array.from({ length: 14 }).map((_, i) => {
      const angle = (i / 14) * Math.PI * 2 + (Math.random() - 0.5) * 0.45;
      const distance = 32 + Math.random() * 45;
      return {
        id: i,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
        size: 8 + Math.floor(Math.random() * 7),
        color: emberPalette[i % emberPalette.length],
        delay: Math.random() * 0.12,
        rot: Math.floor(Math.random() * 360),
        char: emberSymbols[i % emberSymbols.length],
      };
    });

    // Crystalline chime
    playPetalChime();

    // Trigger burst state
    const burstId = Date.now() + Math.random();
    setBursts((prev) => [...prev, { id: burstId, x, y, word, embers }]);

    // Remove touched particle from floating list immediately
    setParticles((prev) => prev.filter((p) => p.id !== particleId));

    // Respawn a fresh petal after 2.6s to keep the garden alive
    setTimeout(() => {
      setParticles((prev) => {
        const theme = MOODS[mood] || MOODS.dreamy;
        const colors = theme.particleColors;
        const newParticle: Particle = {
          id: Date.now() + Math.floor(Math.random() * 1000),
          left: 6 + Math.floor(Math.random() * 86),
          duration: 16 + Math.random() * 8,
          delay: 0,
          scale: 0.7 + Math.random() * 0.3,
          opacity: 0.35 + Math.random() * 0.25,
          color: colors[Math.floor(Math.random() * colors.length)],
          type: 'petal',
        };
        return [...prev, newParticle];
      });
    }, 2600);

    // Clean up burst after 2.4s animation completes
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== burstId));
    }, 2400);
  };

  if (reducedMotion || (particles.length === 0 && bursts.length === 0)) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden transition-opacity duration-1000"
      aria-hidden="false"
    >
      {/* 1. Floating Drifting Petals (Touch-enabled) */}
      {particles.map((p) => (
        <div
          key={`${mood}-${p.id}`}
          className="floating-petal group touch-manipulation focus:outline-none"
          role="button"
          tabIndex={0}
          aria-label="Floating petal — click to touch and reveal a hidden whisper"
          title="Petal Touch ✦ Click to reveal a whisper of love"
          onClick={(e) => handlePetalTouch(e, p.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handlePetalTouch(e as unknown as React.MouseEvent<HTMLDivElement>, p.id);
            }
          }}
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        >
          <div style={{ transform: `scale(${p.scale})` }}>
            <div className="relative p-2.5 -m-2.5 transition-transform duration-300 group-hover:scale-125">
              {/* Subtle luminous halo on hover */}
              <div className="absolute inset-0 rounded-full bg-[#C9A96E]/0 group-hover:bg-[#C9A96E]/20 blur-xs transition-colors duration-300 pointer-events-none" />

            {p.type === 'sparkle' ? (
              // Delicate four-point celestial star sparkle
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="filter drop-shadow-xs animate-pulse"
                style={{ animationDuration: '3s' }}
              >
                <path
                  d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z"
                  fill={p.color}
                  fillOpacity="0.85"
                />
                <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" fillOpacity="0.9" />
              </svg>
            ) : p.type === 'mote' ? (
              // Soft rounded luminescent ambient mote / pearl
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="filter drop-shadow-xs"
              >
                <circle cx="10" cy="10" r="7" fill={p.color} fillOpacity="0.75" />
                <circle cx="9" cy="9" r="3" fill="#FFFFFF" fillOpacity="0.6" />
              </svg>
            ) : (
              // Classical Mughal rose / jasmine petal
              <svg
                width="26"
                height="32"
                viewBox="0 0 26 32"
                fill="none"
                className="filter drop-shadow-xs"
              >
                <path
                  d="M13 1C7 7 1 15 1 21C1 27 6 31 13 31C20 31 25 27 25 21C25 15 19 7 13 1Z"
                  fill={p.color}
                  fillOpacity="0.8"
                />
                {/* Center vein with antique gold shimmer */}
                <path
                  d="M13 3C13 12 12.5 24 13 29"
                  stroke="#C9A96E"
                  strokeWidth="0.6"
                  strokeOpacity="0.45"
                />
              </svg>
            )}
          </div>
          </div>
        </div>
      ))}

      {/* 2. Active Petal Touch Bursts: Golden Embers & Hidden One-Word Urdu Whispers */}
      {bursts.map((burst) => (
        <div
          key={burst.id}
          className="fixed pointer-events-none z-50 select-none"
          style={{
            left: `${burst.x}px`,
            top: `${burst.y}px`,
          }}
        >
          {/* Golden Ember Sparks radiating outward */}
          {burst.embers.map((em) => (
            <span
              key={em.id}
              className="absolute ember-scatter-anim flex items-center justify-center font-serif leading-none"
              style={
                {
                  '--tx': `${em.tx}px`,
                  '--ty': `${em.ty}px`,
                  '--rot': `${em.rot}deg`,
                  color: em.color,
                  fontSize: `${em.size}px`,
                  animationDelay: `${em.delay}s`,
                  filter: 'drop-shadow(0 0 6px rgba(245, 185, 80, 0.9))',
                } as React.CSSProperties
              }
            >
              {em.char}
            </span>
          ))}

          {/* Soft Luminous Golden-Rose Core Aura */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full pointer-events-none animate-ping"
            style={{
              background:
                'radial-gradient(circle, rgba(245, 185, 80, 0.45) 0%, rgba(197, 138, 147, 0.25) 45%, transparent 70%)',
              animationDuration: '1.2s',
              animationIterationCount: 1,
            }}
          />

          {/* Hidden One-Word Urdu Romantic Message */}
          <div className="absolute petal-word-anim flex flex-col items-center justify-center text-center whitespace-nowrap pointer-events-none">
            {/* Celestial Golden Starlet */}
            <span className="text-[#DFC38C] text-[10px] animate-pulse">✦</span>

            {/* Nastaliq Urdu Romantic Word */}
            <span
              className="font-arabic text-3xl sm:text-4xl font-bold tracking-wide my-0.5"
              style={{
                color: '#FAF8F5',
                textShadow:
                  '0 0 10px rgba(201, 169, 110, 0.95), 0 0 22px rgba(245, 185, 80, 0.8), 0 0 32px rgba(197, 138, 147, 0.6), 0 2px 4px rgba(74, 66, 64, 0.6)',
              }}
              dir="rtl"
            >
              {burst.word.urdu}
            </span>

            {/* English Transliteration & Meaning Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF8F5]/92 border border-[#C9A96E]/50 shadow-sm backdrop-blur-xs">
              <span className="font-serif font-semibold text-[11px] sm:text-xs text-[#7A5A20] tracking-wide">
                {burst.word.transliteration}
              </span>
              <span className="text-[#C9A96E]/50 text-[9px]">•</span>
              <span className="font-serif italic text-[10px] sm:text-[11px] text-[#4A4240]/80">
                {burst.word.meaning}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
