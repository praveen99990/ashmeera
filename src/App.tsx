import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ASH_CONFIG,
  GalleryPhotoCard,
} from './config/ashConfig';
import { mediaVault } from './utils/mediaVault';
import { AshImage } from './components/AshImage';
import { IntroAnimation } from './components/IntroAnimation';
import { InteractiveHero } from './components/InteractiveHero';
import { HerSmileSection } from './components/HerSmileSection';
import { UnexpectedVideoInterlude } from './components/UnexpectedVideoInterlude';
import { RoyalSehraFeature } from './components/RoyalSehraFeature';
import { HerEyesSection } from './components/HerEyesSection';
import { HerBeautySection } from './components/HerBeautySection';
import { AMemorySection } from './components/AMemorySection';
import { OurStoryTimeline } from './components/OurStoryTimeline';
import { PhotoViewerModal } from './components/PhotoViewerModal';
import { MusicPlayer } from './components/MusicPlayer';
import { ForAshModal } from './components/ForAshModal';
import { FinalSurpriseModal } from './components/FinalSurpriseModal';
import { SecretNotesManager } from './components/SecretNotesManager';
import { EasterEggToast } from './components/EasterEggToast';
import { FloatingPetals } from './components/FloatingPetals';
import { ScrollProgress } from './components/ScrollProgress';
import { ParallaxGalleryCard } from './components/ParallaxGalleryCard';
import { MoonlightAmbientLayer } from './components/MoonlightAmbientLayer';
import { MoodAmbientLayer } from './components/MoodAmbientLayer';
import { MoodSelector } from './components/MoodSelector';
import { MoodKey, MOODS, MOOD_ORDER } from './utils/moodOfAshmeera';
import { sarangiAudio } from './utils/audioPlayer';

// Category filter tabs
type PhotoCategory = 'all' | 'traditional' | 'childhood' | 'romantic' | 'candid';

const CATEGORIES: Array<{ key: PhotoCategory; label: string; count: number }> = [
  { key: 'all', label: 'All Photographs', count: ASH_CONFIG.realPhotos.length },
  {
    key: 'traditional',
    label: 'Traditional & Gajra',
    count: ASH_CONFIG.realPhotos.filter((p) => p.category === 'traditional').length,
  },
  {
    key: 'romantic',
    label: 'Yuvi & Celebrations',
    count: ASH_CONFIG.realPhotos.filter((p) => p.category === 'romantic').length,
  },
  {
    key: 'candid',
    label: 'Playful & Candid',
    count: ASH_CONFIG.realPhotos.filter((p) => p.category === 'candid').length,
  },
  {
    key: 'childhood',
    label: 'Childhood Memories',
    count: ASH_CONFIG.realPhotos.filter((p) => p.category === 'childhood').length,
  },
];

export default function App() {
  // Check if intro has been seen before
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const seen = localStorage.getItem('ash_intro_completed_v2');
    return !seen;
  });

  // Filter state
  const [activeCategory, setActiveCategory] = useState<PhotoCategory>('all');

  // Photo viewer state
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  // Modals & Popovers
  const [forAshOpen, setForAshOpen] = useState(false);
  const [finalSurpriseOpen, setFinalSurpriseOpen] = useState(false);
  const [activeSecretNote, setActiveSecretNote] = useState<string | null>(null);
  const [easterEggOpen, setEasterEggOpen] = useState(false);

  // Full-screen Moonlight Ambient Layer state (persisted)
  const [moonlightActive, setMoonlightActive] = useState<boolean>(() => {
    try {
      return localStorage.getItem('ash_moonlight_ambient') === 'true';
    } catch {
      return false;
    }
  });

  const toggleMoonlight = () => {
    setMoonlightActive((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('ash_moonlight_ambient', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Mood of Ashmeera interactive atmosphere state (Dreamy, Romantic, Serene, Nostalgic, Celebration)
  const [activeMood, setActiveMood] = useState<MoodKey>(() => {
    try {
      const saved = localStorage.getItem('ash_mood_preference');
      if (saved && saved in MOODS) {
        return saved as MoodKey;
      }
    } catch {
      // ignore
    }
    return 'dreamy';
  });

  const handleSelectMood = (mood: MoodKey) => {
    setActiveMood(mood);
    try {
      localStorage.setItem('ash_mood_preference', mood);
    } catch {
      // ignore
    }
  };

  const cycleNextMood = () => {
    const idx = MOOD_ORDER.indexOf(activeMood);
    const nextMood = MOOD_ORDER[(idx + 1) % MOOD_ORDER.length];
    handleSelectMood(nextMood);
  };

  // Sarangi Background Music Loop state (synchronized with audio engine)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    sarangiAudio.init(ASH_CONFIG.music.src);
    const unsub = sarangiAudio.subscribe((playing, _cur, _dur, muted) => {
      setIsMusicPlaying(playing && !muted);
    });
    return unsub;
  }, []);

  const handleToggleMusic = async () => {
    try {
      if (isMusicPlaying) {
        sarangiAudio.pause();
      } else {
        await sarangiAudio.play();
      }
    } catch {
      // Audio autoplay restrictions will resolve gracefully
    }
  };



  // Filtered photos
  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'all') return ASH_CONFIG.realPhotos;
    return ASH_CONFIG.realPhotos.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Compile full photo album list for the luxury photo viewer modal (all 27 photos)
  const allPhotos = useMemo(() => {
    return ASH_CONFIG.realPhotos.map((p) => ({
      id: p.id,
      img: p.img,
      fallbackImg: p.fallbackImg,
      cap: p.cap,
      albumCaption: p.albumCaption,
    }));
  }, []);

  const openPhotoViewerWithUrl = (url: string, caption?: string) => {
    const foundIdx = allPhotos.findIndex(
      (p) =>
        mediaVault.getMediaUrl(p.img, p.fallbackImg) === url ||
        p.img === url ||
        p.fallbackImg === url
    );
    if (foundIdx >= 0) {
      setCurrentPhotoIdx(foundIdx);
    } else {
      setCurrentPhotoIdx(0);
    }
    setViewerOpen(true);
  };

  const handleIntroComplete = () => {
    localStorage.setItem('ash_intro_completed_v2', 'true');
    setShowIntro(false);
  };

  // Setup intersection observer for .reveal elements with automatic fallback for iframe environments
  useEffect(() => {
    if (showIntro) return;

    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    reveals.forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${(i % 3) * 80}ms`;
      observer.observe(el);
    });

    // Guarantee visibility in iframe/mobile if intersection doesn't trigger
    const timer = setTimeout(() => {
      reveals.forEach((el) => el.classList.add('in'));
    }, 600);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [showIntro, activeCategory]);

  // Blossoming entrance animation for Mirza Ghalib blockquote
  const ghalibRef = useRef<HTMLQuoteElement>(null);
  const [isGhalibBlossomed, setIsGhalibBlossomed] = useState(false);

  useEffect(() => {
    if (!ghalibRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsGhalibBlossomed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(ghalibRef.current);

    // Fail-safe for embedded preview / fast scrolling
    const fallbackTimer = setTimeout(() => {
      setIsGhalibBlossomed(true);
    }, 1600);

    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen text-[#4A4240] selection:bg-[#E9C9CB] selection:text-[#4A4240]">
      {/* Reusable SVG Definitions for Mughal/Pakistani aesthetics */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <symbol id="star" viewBox="0 0 100 100">
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="20" y="20" width="60" height="60" />
              <rect
                x="20"
                y="20"
                width="60"
                height="60"
                transform="rotate(45 50 50)"
              />
              <circle cx="50" cy="50" r="18" />
              <circle cx="50" cy="50" r="3" />
            </g>
          </symbol>
          <symbol id="flower" viewBox="-50 -50 100 100">
            <g
              fill="currentColor"
              fillOpacity=".13"
              stroke="currentColor"
              strokeWidth="1"
            >
              <ellipse cy="-24" rx="10" ry="22" />
              <ellipse cy="-24" rx="10" ry="22" transform="rotate(72)" />
              <ellipse cy="-24" rx="10" ry="22" transform="rotate(144)" />
              <ellipse cy="-24" rx="10" ry="22" transform="rotate(216)" />
              <ellipse cy="-24" rx="10" ry="22" transform="rotate(288)" />
            </g>
            <circle r="5" fill="#C9A96E" />
          </symbol>
        </defs>
      </svg>

      {/* 2. Intro Animation (Shown once on first visit) */}
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}

      {/* 12. Ultra-thin elegant scroll progress */}
      <ScrollProgress />

      {/* 11. Subtle Floating Particles & Petals (Mood-reactive) */}
      <FloatingPetals mood={activeMood} />

      {/* Subtle Mood of Ashmeera Ambient Layer */}
      <MoodAmbientLayer mood={activeMood} />

      {/* Full-Screen Moonlight Ambient Layer */}
      <MoonlightAmbientLayer isActive={moonlightActive} />

      <main>
        {/* 1. Enhanced Interactive Hero */}
        <InteractiveHero
          onOpenForAsh={() => setForAshOpen(true)}
          onTriggerEasterEgg={() => setEasterEggOpen(true)}
          onOpenSecretNote={(id) => setActiveSecretNote(id)}
        />

        {/* 2. SPECIAL FRAME 1: HER SMILE (Noor-e-Tabassum / Soft Floral Frame) */}
        <HerSmileSection
          onOpenPhotoViewer={openPhotoViewerWithUrl}
          onOpenSecretNote={(id) => setActiveSecretNote(id)}
        />

        {/* 3. UNEXPECTED LIVING MEMORY 1: "The Wink & A Thousand Kisses" (Nazakat / ادا) */}
        <UnexpectedVideoInterlude
          id="living-interlude-1"
          kicker="A Living Memory • ناز و ادا"
          urduTitle="وہ شوخ ادا اور تِرچھی نگاہِ ناز"
          romanTitle="The Wink & A Thousand Kisses"
          urduVerse={"اک شوخ ادا تیری دل میں یوں اتر گئی\nجیسے تشنہ لب کو چشمہِ آب مل گیا"}
          romanVerse="Ik shokh adaa teri dil mein yoon utar gayi / Jaise tishna lab ko chashma-e-aab mil gaya"
          translation="A playful grace of yours settled into my heart so deeply, like desert sands blessed by the sudden mercy of cool mountain rain."
          videoSrc="WhatsApp Video 2026-09-27 at 00.29.18.mp4"
          thumbnailSrc="WhatsApp Image 2026-09-27 at 00.29.18.jpeg"
          alignment="right"
        />

        {/* 4. SPECIAL FRAME 2: HER PRESENCE (Wujood-e-Noor / Tera Sehra Kehta) */}
        <RoyalSehraFeature onOpenPhotoViewer={openPhotoViewerWithUrl} />

        {/* 5. THE GRAND EXHIBITION: ALL 45 REAL PHOTOGRAPHS OF ASH */}
        <section id="gallery" className="max-w-6xl mx-auto px-5 sm:px-8 py-24">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 text-[#C9A96E] mb-3">
              <span className="w-10 h-px bg-[#C9A96E]/50" />
              <svg className="w-4 h-4"><use href="#star" /></svg>
              <span className="w-10 h-px bg-[#C9A96E]/50" />
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#4A4240] font-normal">
              The Grand Exhibition
            </h2>
            <p className="font-sans font-light text-[#4A4240]/60 mt-3 text-sm sm:text-base max-w-md mx-auto">
              Every smile, every glance, every cherished memory of Ashmeera.
            </p>
          </div>



          {/* Interactive Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 rounded-full font-serif text-xs sm:text-sm tracking-wide transition-all duration-300 border ${
                    isActive
                      ? 'bg-[#E9C9CB] border-[#C58A93] text-[#4A4240] shadow-sm scale-105'
                      : 'bg-white/60 hover:bg-white border-[#C9A96E]/30 text-[#4A4240]/70 hover:text-[#4A4240]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="text-[10px] ml-1.5 opacity-60">
                    ({cat.count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Photo Gallery Grid or Cleared State */}
          {filteredPhotos.length === 0 ? (
            <div className="py-16 px-6 text-center max-w-lg mx-auto rounded-3xl bg-white/70 border border-[#C9A96E]/30 shadow-sm backdrop-blur-sm">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F8EAE8] border border-[#C9A96E]/40 flex items-center justify-center text-[#C9A96E]">
                <svg className="w-8 h-8"><use href="#flower" /></svg>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#4A4240] mb-2">
                No memories found here
              </h3>
              <p className="font-sans font-light text-sm text-[#4A4240]/70 mb-6 leading-relaxed">
                There are no photographs in this category yet.
              </p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredPhotos.map((photo: GalleryPhotoCard, index: number) => {
                const resolvedUrl = mediaVault.getMediaUrl(photo.img, photo.fallbackImg);

                return (
                  <ParallaxGalleryCard
                    key={photo.id}
                    photo={photo}
                    index={index}
                    resolvedUrl={resolvedUrl}
                    onOpenViewer={openPhotoViewerWithUrl}
                  />
                );
              })}
            </div>
          )}
        </section>

        {/* 6. UNEXPECTED LIVING MEMORY 2: "That Unforgettable Gaze" (Sukoon-e-Rooh / سکونِ روح) */}
        {/* 6. UNEXPECTED LIVING MEMORY 2: "That Unforgettable Gaze" (Sukoon-e-Rooh / سکونِ روح) */}
        <UnexpectedVideoInterlude
          id="living-interlude-2"
          kicker="A Living Memory • سکونِ روح"
          urduTitle="تری خاموش نگاہ میں ہے سمندر کا قرار"
          romanTitle="That Unforgettable Gaze"
          urduVerse={"تیری نگاہ کا جادو ہے کچھ عجیب ایسا\nکہ خاموش رہ کے بھی دل کی ہر بات کہہ دے"}
          romanVerse="Teri nigah ka jaadu hai kuchh ajeeb aisa / Ke khamosh reh ke bhi dil ki har baat keh de"
          translation="Such is the tranquil majesty of your gaze, that in sacred silence it recites all that the heart longs to hear."
          videoSrc="WhatsApp Video 2026-09-27 at 01.02.14.mp4"
          thumbnailSrc="WhatsApp Image 2026-09-27 at 00.29.20 (1).jpeg"
          alignment="left"
        />

        {/* 7. SPECIAL FRAME 3: HER EYES (Chashm-e-Hoor / چشمِ یار) */}
        <HerEyesSection
          onOpenPhotoViewer={openPhotoViewerWithUrl}
          onOpenSecretNote={(id) => setActiveSecretNote(id)}
        />

        {/* 8. SPECIAL FRAME 4: HER BEAUTY (Noor-e-Gajra / حُسنِ کامل & Ornate Mirror) */}
        <HerBeautySection
          onOpenPhotoViewer={openPhotoViewerWithUrl}
          onOpenSecretNote={(id) => setActiveSecretNote(id)}
        />

        {/* 9. UNEXPECTED LIVING MEMORY 3: "Monochrome Breeze by the Window" (Vintage Grace / وقارِ خاموشی) */}
        <UnexpectedVideoInterlude
          id="living-interlude-3"
          kicker="A Living Memory • وقارِ خاموشی"
          urduTitle="کھڑکی سے چھنتی روشنی اور زلفوں کی مہک"
          romanTitle="Monochrome Breeze by the Window"
          urduVerse={"زلف کو چھو کر جو گزری ہے صبا شام کے بعد\nدل نے محسوس کیا ہے ترے آنے کا خمار"}
          romanVerse="Zulf ko chhoo kar jo guzri hai saba shaam ke baad / Dil ne mehsoos kiya hai tere aane ka khumaar"
          translation="The quiet breeze that drifted past your dark tresses in the twilight carried straight to my soul the intoxicating peace of your presence."
          videoSrc="WhatsApp Video 2026-09-27 at 01.05.11.mp4"
          thumbnailSrc="WhatsApp Image 2026-09-27 at 00.29.19 (3).jpeg"
          alignment="right"
        />

        {/* 10. SPECIAL FRAME 5: A MEMORY (Dastaan-e-Yaad / داستانِ یاد — Vintage Manuscript) */}
        <AMemorySection
          onOpenPhotoViewer={openPhotoViewerWithUrl}
          onOpenSecretNote={(id) => setActiveSecretNote(id)}
        />

        {/* 11. SPECIAL SECTION 6: OUR STORY (Safar-e-Ishq / سفرِ عشق Cinematic Timeline) */}
        <OurStoryTimeline
          onOpenPhotoViewer={openPhotoViewerWithUrl}
          onOpenSecretNote={(id) => setActiveSecretNote(id)}
        />

        {/* 7. EXHIBITION OF LOVE (Aatish-e-Ishq Poetry Section) */}
        <section className="px-6 py-28 sm:py-36 bg-gradient-to-b from-transparent via-[#F8EAE8]/60 to-transparent">
          <h2 className="sr-only">Exhibition of Love</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-[auto_1fr_auto] items-center gap-8 md:gap-14 text-center">
            <div
              className="flex md:flex-col items-center justify-center gap-3 text-[#C9A96E]"
              aria-hidden="true"
            >
              <span className="w-16 h-px md:w-px md:h-20 bg-[#C9A96E]/60" />
              <svg className="w-9 h-9"><use href="#star" /></svg>
              <span className="w-16 h-px md:w-px md:h-20 bg-[#C9A96E]/60" />
            </div>

            <div className="flex flex-col items-center w-full">
              <blockquote
                ref={ghalibRef}
                className={`ghalib-blockquote ghalib-blossom ${
                  isGhalibBlossomed ? 'blossomed' : ''
                } group relative p-7 sm:p-11 rounded-3xl border border-[#C9A96E]/25 bg-[#FAF8F5]/60 backdrop-blur-xs transition-all duration-700 cursor-pointer overflow-hidden shadow-xs hover:border-[#C9A96E]/60 w-full`}
              >
                {/* Golden blossom flare expanding softly across the card on entrance */}
                <div className="blossom-flare absolute inset-0 rounded-3xl pointer-events-none opacity-0 bg-[radial-gradient(circle_at_center,rgba(201,169,110,0.3)_0%,rgba(233,201,203,0.15)_45%,transparent_75%)]" />

                {/* Radial golden warmth aura that blooms and breathes on hover */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(201,169,110,0.18)_0%,rgba(233,201,203,0.1)_45%,transparent_75%)]" />

                {/* Delicate corner ornamental hairlines */}
                <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#C9A96E]/40 group-hover:border-[#C9A96E] transition-colors duration-500 pointer-events-none" />
                <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#C9A96E]/40 group-hover:border-[#C9A96E] transition-colors duration-500 pointer-events-none" />
                <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#C9A96E]/40 group-hover:border-[#C9A96E] transition-colors duration-500 pointer-events-none" />
                <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#C9A96E]/40 group-hover:border-[#C9A96E] transition-colors duration-500 pointer-events-none" />

                {/* The Sacred Verse */}
                <p
                  className="relative z-10 font-urdu text-2xl sm:text-4xl leading-[2.6] text-[#4A4240] transition-all duration-500 group-hover:text-[#2A2321] group-hover:[text-shadow:0_0_18px_rgba(201,169,110,0.45)]"
                  dir="rtl"
                  lang="ur"
                >
                  یہ آگ وہ ہے جو روح کے چراغ جلاتی ہے
                  <br />
                  نہ موسموں کی محتاج، نہ طوفاں سے بجھتی ہے
                  <br />
                  محبت تو ازل کی اک خاموش نذر ہے
                  <br />
                  جو دل میں اتر جائے تو فنا سے بھی آگے جیتی ہے
                </p>
                <p className="relative z-10 font-serif italic text-[#4A4240]/60 mt-6 text-sm sm:text-base transition-colors duration-500 group-hover:text-[#4A4240]/90">
                  Yeh aag woh hai jo rooh ke charagh jalati hai
                  <br />
                  Na mausamon ki mohtaj, na toofan se bujhti hai
                  <br />
                  Mohabbat to azal ki ik khamosh nazr hai
                  <br />
                  Jo dil mein utar jaaye to fana se bhi aage jeeti hai
                </p>
                <p className="relative z-10 font-sans font-light text-[#4A4240]/75 mt-6 max-w-md mx-auto leading-relaxed text-sm sm:text-base transition-colors duration-500 group-hover:text-[#4A4240]">
                  This is that sacred fire which illuminates the quiet lamps of the spirit — beholden to no fleeting season, extinguished by no mortal tempest. An eternal offering of devotion; once it takes root within the soul, it lives beyond eternity itself.
                </p>
                <footer className="relative z-10 font-serif text-[#C9A96E] mt-6 text-sm font-medium flex items-center justify-center gap-2 transition-all duration-500 group-hover:text-[#B38C4A]">
                  <span className="w-6 h-px bg-[#C9A96E]/40 group-hover:bg-[#C9A96E] transition-colors duration-500" />
                  <span className="font-urdu text-base" dir="rtl">کلامِ دل</span>
                  <span className="text-xs font-serif italic">• An Inscription of the Soul</span>
                  <span className="w-6 h-px bg-[#C9A96E]/40 group-hover:bg-[#C9A96E] transition-colors duration-500" />
                </footer>
              </blockquote>

              {/* Elegant handwritten-style signature note fading in when the blockquote blossoms */}
              <div
                className={`mt-4 sm:mt-5 flex flex-col items-center justify-center transition-all duration-1000 delay-500 ease-out ${
                  isGhalibBlossomed
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-3 pointer-events-none'
                }`}
                aria-label="Handwritten note from Yuvi to Ashmeera"
              >
                <div className="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#FAF8F5]/85 border border-[#C9A96E]/30 shadow-xs backdrop-blur-xs -rotate-1 hover:rotate-0 transition-transform duration-300">
                  <span className="text-[#C9A96E] text-xs opacity-75">❦</span>
                  <span className="font-handwriting text-xl sm:text-2xl text-[#8A5A62] tracking-wide select-none">
                    For my Ashmeera...
                  </span>
                  <span className="font-serif text-[10px] text-[#C9A96E]/60">•</span>
                  <span className="font-handwriting text-2xl sm:text-3xl text-[#C58A93] tracking-wide font-normal select-none">
                    Forever your Yuvi
                  </span>
                  <span className="text-[#C58A93] text-xs">❤️</span>
                </div>
                <span className="font-serif italic text-[11px] sm:text-xs text-[#4A4240]/55 mt-1.5 tracking-wider">
                  (A quiet whisper written in the margins for you)
                </span>
              </div>
            </div>

            <div
              className="flex md:flex-col items-center justify-center gap-3 text-[#C9A96E]"
              aria-hidden="true"
            >
              <span className="w-16 h-px md:w-px md:h-20 bg-[#C9A96E]/60" />
              <button
                onClick={() => setActiveSecretNote('note-6')}
                title="A quiet prayer"
                className="hover:text-[#C58A93] transition-colors p-1"
              >
                <svg className="w-9 h-9"><use href="#star" /></svg>
              </button>
              <span className="w-16 h-px md:w-px md:h-20 bg-[#C9A96E]/60" />
            </div>
          </div>
        </section>

        {/* 8. Before You Leave... Final Interactive Surprise Prompt */}
        <section className="text-center py-12 px-6">
          <p className="font-serif italic text-base sm:text-lg text-[#4A4240]/60 mb-3">
            {ASH_CONFIG.finalSurprise.prelude}
          </p>
          <button
            onClick={() => setFinalSurpriseOpen(true)}
            className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full border border-[#C9A96E]/40 hover:border-[#C58A93] bg-[#FCFBF9] text-[#4A4240] hover:text-[#C58A93] shadow-sm hover:shadow transition-all duration-300 font-serif italic text-base sm:text-lg"
          >
            <span>{ASH_CONFIG.finalSurprise.buttonText}</span>
            <span className="text-[#C9A96E] group-hover:text-[#C58A93] group-hover:translate-x-0.5 transition-transform">
              ✨
            </span>
          </button>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="text-center px-6 pt-10 pb-44 sm:pb-36">
        <button
          onClick={() => setActiveSecretNote('note-7')}
          title="A cherished jewel"
          className="mx-auto block text-[#C58A93] hover:scale-110 transition-transform p-1"
        >
          <svg
            className="w-12 h-12 mx-auto"
            viewBox="-50 -50 100 100"
            aria-hidden="true"
          >
            <use href="#flower" />
          </svg>
        </button>

        <p className="font-serif italic text-[#4A4240]/75 mt-4 inline-flex items-center gap-2 text-sm sm:text-base">
          Curated with love by Yuvi, for his Ash.
          <svg
            className="heart w-4 h-4 text-[#C58A93]"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-label="heart"
          >
            <path d="M12 21s-7.5-4.6-9.6-9.4C.9 8 3 4.5 6.4 4.5c2 0 3.7 1.1 5.6 3.3 1.9-2.2 3.6-3.3 5.6-3.3C21 4.5 23.1 8 21.6 11.6 19.5 16.4 12 21 12 21z" />
          </svg>
        </p>

        {/* Ambient & Music Controls Cluster */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {/* Soft Instrumental Sarangi Audio Loop Toggle Button */}
          <button
            onClick={handleToggleMusic}
            aria-pressed={isMusicPlaying}
            className={`group inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-serif tracking-wide transition-all duration-500 border ${
              isMusicPlaying
                ? 'bg-[#F8EAE8]/90 text-[#4A4240] border-[#C58A93] shadow-[0_0_18px_rgba(197,138,147,0.35)]'
                : 'bg-white/60 text-[#4A4240]/70 hover:text-[#4A4240] border-[#C9A96E]/30 hover:border-[#C9A96E]/60 hover:bg-white'
            }`}
            title={isMusicPlaying ? 'Mute Sarangi background music' : 'Play soft Sarangi background music'}
          >
            <span className="text-sm transition-transform duration-300 group-hover:scale-110">
              {isMusicPlaying ? '🎻' : '🔇'}
            </span>
            <span>
              {isMusicPlaying ? 'Mute Music' : 'Play Sarangi'}
            </span>
            <span
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                isMusicPlaying
                  ? 'bg-[#C58A93] animate-pulse shadow-[0_0_8px_#C58A93]'
                  : 'bg-[#C9A96E]/40'
              }`}
            />
          </button>

          {/* Moonlight Ambient Layer Toggle Button */}
          <button
            onClick={toggleMoonlight}
            aria-pressed={moonlightActive}
            className={`group inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-serif tracking-wide transition-all duration-500 border ${
              moonlightActive
                ? 'bg-[#EBF3FA]/90 text-[#305274] border-[#93BEDE] shadow-[0_0_18px_rgba(147,190,222,0.45)]'
                : 'bg-white/60 text-[#4A4240]/70 hover:text-[#4A4240] border-[#C9A96E]/30 hover:border-[#C9A96E]/60 hover:bg-white'
            }`}
          >
            <span
              className={`text-sm transition-transform duration-500 ${
                moonlightActive
                  ? 'scale-115 rotate-[-12deg]'
                  : 'opacity-70 group-hover:scale-110'
              }`}
            >
              🌙
            </span>
            <span>
              {moonlightActive ? 'Moonlight Active' : 'Enable Moonlight'}
            </span>
            <span
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                moonlightActive
                  ? 'bg-[#4B84B5] shadow-[0_0_8px_#4B84B5]'
                  : 'bg-[#C9A96E]/40'
              }`}
            />
          </button>

          {/* Quick Mood Cycle Button */}
          <button
            onClick={cycleNextMood}
            aria-label={`Current Mood: ${MOODS[activeMood]?.nameEnglish}`}
            title={`Mood of Ashmeera (${MOODS[activeMood]?.nameEnglish} • ${MOODS[activeMood]?.nameUrdu}): Click to cycle mood`}
            className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-serif tracking-wide transition-all duration-500 border ${MOODS[activeMood]?.pillBg} ${MOODS[activeMood]?.pillText} ${MOODS[activeMood]?.pillBorder} shadow-sm hover:shadow hover:scale-[1.02]`}
          >
            <span className="text-sm transition-transform duration-500 group-hover:scale-115">
              {MOODS[activeMood]?.symbol}
            </span>
            <span className="font-medium">
              Mood: {MOODS[activeMood]?.nameEnglish}
            </span>
            <span className="text-[10px] opacity-65 font-sans">
              ↻
            </span>
          </button>
        </div>

        {/* Interactive Mood of Ashmeera Selector */}
        <MoodSelector
          currentMood={activeMood}
          onSelectMood={handleSelectMood}
          className="mt-6"
        />

        {/* Replay intro, Vault, Music, Moonlight & Mood links */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] font-sans text-[#4A4240]/40">
          <button
            onClick={() => setShowIntro(true)}
            className="hover:text-[#C9A96E] transition-colors"
          >
            Replay introduction ↻
          </button>
          <span>•</span>
          <button
            onClick={handleToggleMusic}
            className="hover:text-[#C58A93] transition-colors flex items-center gap-1"
          >
            <span>Sarangi Loop</span>
            <span className={isMusicPlaying ? 'text-[#C58A93] font-semibold' : ''}>
              ({isMusicPlaying ? 'Playing' : 'Muted'})
            </span>
          </button>
          <span>•</span>
          <button
            onClick={toggleMoonlight}
            className="hover:text-[#4B84B5] transition-colors flex items-center gap-1"
          >
            <span>Moonlight</span>
            <span className={moonlightActive ? 'text-[#4B84B5] font-semibold' : ''}>
              ({moonlightActive ? 'On' : 'Off'})
            </span>
          </button>
          <span>•</span>
          <button
            onClick={cycleNextMood}
            className="hover:text-[#C58A93] transition-colors flex items-center gap-1.5"
            title="Click to cycle Mood of Ashmeera"
          >
            <span>Mood:</span>
            <span className="font-semibold text-[#874D57]">
              {MOODS[activeMood]?.nameEnglish}
            </span>
            <span>{MOODS[activeMood]?.symbol}</span>
          </button>
        </div>
      </footer>

      {/* 7. MUSIC PLAYER */}
      <MusicPlayer />

      {/* 3. LUXURY PHOTO VIEWER MODAL (Contains all 27 photos) */}
      <PhotoViewerModal
        photos={allPhotos}
        currentIndex={currentPhotoIdx}
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        onSelectIndex={(idx) => setCurrentPhotoIdx(idx)}
      />



      {/* 8 & 9. FOR ASH DEDICATION & PERSONAL LETTER */}
      <ForAshModal
        isOpen={forAshOpen}
        onClose={() => setForAshOpen(false)}
      />

      {/* 13. FINAL SURPRISE CLIMAX MODAL */}
      <FinalSurpriseModal
        isOpen={finalSurpriseOpen}
        onClose={() => setFinalSurpriseOpen(false)}
      />

      {/* 6. SECRET NOTES MANAGER */}
      <SecretNotesManager
        activeNoteId={activeSecretNote}
        onClose={() => setActiveSecretNote(null)}
      />

      {/* 14. EASTER EGG NOTIFICATION */}
      <EasterEggToast
        isOpen={easterEggOpen}
        onClose={() => setEasterEggOpen(false)}
      />
    </div>
  );
}
