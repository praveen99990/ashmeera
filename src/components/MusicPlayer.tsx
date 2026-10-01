import React, { useState, useEffect, useRef } from 'react';
import { ASH_CONFIG } from '../config/ashConfig';
import { ghazalAudio } from '../utils/audioPlayer';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(180);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [statusText, setStatusText] = useState('Tap to play');

  useEffect(() => {
    ghazalAudio.init(ASH_CONFIG.music.src);

    const unsubscribe = ghazalAudio.subscribe((playing, current, dur, muted) => {
      const active = playing && !muted;
      setIsPlaying(active);
      if (dur > 0) {
        setProgress((current / dur) * 100);
        setDuration(dur);
      }
      setStatusText(active ? 'Now playing' : muted ? 'Muted' : 'Tap to play');
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 280);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleTogglePlay = async () => {
    try {
      const playing = await ghazalAudio.togglePlay();
      setIsPlaying(playing);
    } catch {
      setStatusText('Audio ready');
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    ghazalAudio.setVolume(val);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    ghazalAudio.seek(ratio);
    setProgress(ratio * 100);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 transition-all duration-300 ${
        isScrolled ? 'scale-95 sm:scale-90 origin-bottom-right' : 'scale-100'
      } ${isPlaying ? 'playing' : ''}`}
    >
      <div className="flex flex-col rounded-3xl bg-white/60 hover:bg-white/80 backdrop-blur-xl border border-white/80 shadow-[0_10px_30px_-10px_rgba(197,138,147,0.4)] transition-all p-2.5 sm:p-3">
        {/* Main Bar */}
        <div className="flex items-center gap-3">
          {/* Spinning Vinyl Record */}
          <div className="vinyl" aria-hidden="true" />

          {/* Titles */}
          <div className="leading-tight max-w-[8.5rem] sm:max-w-[10.5rem]">
            <p className="font-serif text-sm text-[#4A4240] truncate font-medium">
              {ASH_CONFIG.music.title}
            </p>
            <p className="font-sans text-[11px] text-[#4A4240]/55 truncate mt-0.5">
              {statusText}
            </p>
          </div>

          {/* Sound Wave Animation */}
          <div className="wave hidden sm:flex" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={handleTogglePlay}
            aria-label={isPlaying ? 'Pause Ghazal' : 'Play Ghazal'}
            className="w-10 h-10 rounded-full bg-[#E9C9CB]/75 hover:bg-[#E9C9CB] text-[#4A4240] grid place-items-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9A96E] shadow-sm"
          >
            {isPlaying ? (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 4v16l13-8z" />
              </svg>
            )}
          </button>
        </div>

        {/* Progress & Volume Controls (Revealed on Hover or during active play) */}
        {(showControls || isPlaying) && (
          <div className="mt-2.5 pt-2 border-t border-[#C9A96E]/20 transition-all duration-300">
            {/* Progress track */}
            <div
              onClick={handleSeek}
              className="relative w-full h-1.5 bg-[#4A4240]/10 hover:h-2 rounded-full cursor-pointer transition-all overflow-hidden"
              title="Click to seek"
            >
              <div
                className="h-full bg-gradient-to-r from-[#C9A96E] to-[#C58A93] rounded-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Volume & Time metadata */}
            <div className="flex items-center justify-between mt-1.5 text-[10px] text-[#4A4240]/60 font-sans">
              <span>{formatTime((progress / 100) * duration)}</span>

              {/* Volume Slider */}
              <div className="flex items-center gap-1.5 ml-auto mr-2">
                <svg className="w-3 h-3 text-[#C9A96E]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                </svg>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-12 h-1 accent-[#C9A96E] cursor-pointer"
                  title="Adjust volume"
                />
              </div>

              <span>{formatTime(duration)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
