import React from 'react';
import { MoodKey, MOODS } from '../utils/moodOfAshmeera';

interface MoodAmbientLayerProps {
  mood: MoodKey;
}

export const MoodAmbientLayer: React.FC<MoodAmbientLayerProps> = ({ mood }) => {
  const currentMood = MOODS[mood] || MOODS.dreamy;

  return (
    <div
      id="mood-ambient-layer"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[15] transition-all duration-1000 ease-in-out"
    >
      {/* Primary Mood Radial Gradient (Top Glow) */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-in-out"
        style={{
          background: currentMood.radialPrimary,
        }}
      />

      {/* Secondary Mood Radial Gradient (Bottom/Diagonal Accent) */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-in-out"
        style={{
          background: currentMood.radialSecondary,
        }}
      />

      {/* Whisper-Soft Micro Tint to warm or cool the overall page canvas */}
      <div
        className="absolute inset-0 transition-colors duration-1000 ease-in-out"
        style={{
          backgroundColor: currentMood.subtleTint,
        }}
      />

      {/* Tiny soft atmospheric breathing light for celebratory or dreamy moods */}
      {(mood === 'celebration' || mood === 'dreamy') && (
        <div
          className="absolute inset-0 opacity-30 animate-pulse pointer-events-none transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle at 50% 20%, ${currentMood.glowAura} 0%, transparent 65%)`,
            animationDuration: mood === 'celebration' ? '3.5s' : '5s',
          }}
        />
      )}
    </div>
  );
};
