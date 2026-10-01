import React from 'react';

interface MoonlightAmbientLayerProps {
  isActive: boolean;
}

export const MoonlightAmbientLayer: React.FC<MoonlightAmbientLayerProps> = ({ isActive }) => {
  return (
    <div
      id="moonlight-ambient-layer"
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-20 transition-opacity duration-1000 ease-in-out ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Primary Cool-Toned Moonlight Radial Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 95% 70% at 50% 0%, rgba(178, 212, 242, 0.32) 0%, rgba(145, 188, 226, 0.18) 35%, rgba(115, 158, 202, 0.08) 65%, transparent 90%),
            radial-gradient(circle 900px at 85% 85%, rgba(170, 205, 238, 0.16) 0%, rgba(130, 175, 220, 0.06) 55%, transparent 80%),
            radial-gradient(circle 800px at 15% 55%, rgba(180, 214, 244, 0.14) 0%, transparent 70%)
          `,
        }}
      />

      {/* Soft Silver Moonbeam Sheen (Soft-light blend) */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(ellipse 65% 50% at 50% 12%, rgba(225, 240, 255, 0.5) 0%, rgba(180, 215, 245, 0.18) 48%, transparent 80%)
          `,
          mixBlendMode: 'soft-light',
        }}
      />

      {/* Subtle Moonlit Mist Tint */}
      <div className="absolute inset-0 bg-[#3a5d82]/[0.025]" />
    </div>
  );
};
