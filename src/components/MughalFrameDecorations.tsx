import React from 'react';

/**
 * Reusable minimal Taj Mahal & Mughal Islamic architectural frame motifs.
 * Provides authentic, delicate hairline corner arabesques, subtle cusped ogee arches,
 * and whisper-light jali star lattices inspired by the marble inlay of the Taj Mahal.
 */

interface CornerProps {
  className?: string;
  inset?: string; // e.g. 'inset-2' or 'inset-2.5'
}

export const MughalCornerOrnaments: React.FC<CornerProps> = ({
  className = 'text-[#C9A96E]/60',
  inset = 'inset-2',
}) => {
  return (
    <div className={`absolute ${inset} pointer-events-none z-10`} aria-hidden="true">
      {/* Top-Left Corner */}
      <svg
        viewBox="0 0 28 28"
        fill="none"
        className={`absolute top-0 left-0 w-3.5 h-3.5 sm:w-4 sm:h-4 ${className}`}
      >
        <path d="M 2,16 L 2,4 C 2,2.89 2.89,2 4,2 L 16,2" stroke="currentColor" strokeWidth="1" />
        <path d="M 6,12 L 6,6 C 6,6 6,6 6,6 L 12,6" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.6" />
        <circle cx="4" cy="4" r="1.2" fill="currentColor" />
        <circle cx="8" cy="8" r="0.9" fill="currentColor" opacity="0.8" />
      </svg>

      {/* Top-Right Corner */}
      <svg
        viewBox="0 0 28 28"
        fill="none"
        className={`absolute top-0 right-0 w-3.5 h-3.5 sm:w-4 sm:h-4 -scale-x-100 ${className}`}
      >
        <path d="M 2,16 L 2,4 C 2,2.89 2.89,2 4,2 L 16,2" stroke="currentColor" strokeWidth="1" />
        <path d="M 6,12 L 6,6 C 6,6 6,6 6,6 L 12,6" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.6" />
        <circle cx="4" cy="4" r="1.2" fill="currentColor" />
        <circle cx="8" cy="8" r="0.9" fill="currentColor" opacity="0.8" />
      </svg>

      {/* Bottom-Left Corner */}
      <svg
        viewBox="0 0 28 28"
        fill="none"
        className={`absolute bottom-0 left-0 w-3.5 h-3.5 sm:w-4 sm:h-4 -scale-y-100 ${className}`}
      >
        <path d="M 2,16 L 2,4 C 2,2.89 2.89,2 4,2 L 16,2" stroke="currentColor" strokeWidth="1" />
        <path d="M 6,12 L 6,6 C 6,6 6,6 6,6 L 12,6" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.6" />
        <circle cx="4" cy="4" r="1.2" fill="currentColor" />
        <circle cx="8" cy="8" r="0.9" fill="currentColor" opacity="0.8" />
      </svg>

      {/* Bottom-Right Corner */}
      <svg
        viewBox="0 0 28 28"
        fill="none"
        className={`absolute bottom-0 right-0 w-3.5 h-3.5 sm:w-4 sm:h-4 -scale-x-100 -scale-y-100 ${className}`}
      >
        <path d="M 2,16 L 2,4 C 2,2.89 2.89,2 4,2 L 16,2" stroke="currentColor" strokeWidth="1" />
        <path d="M 6,12 L 6,6 C 6,6 6,6 6,6 L 12,6" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.6" />
        <circle cx="4" cy="4" r="1.2" fill="currentColor" />
        <circle cx="8" cy="8" r="0.9" fill="currentColor" opacity="0.8" />
      </svg>
    </div>
  );
};

/**
 * Subtle Taj Mahal Cusped Ogee Arch Crest with Kalasa Apex Finial.
 * Graceful hairline curve inspired by the main Iwan portal arches of the Taj Mahal.
 */
export const TajMahalArchCrest: React.FC<{ className?: string; width?: string }> = ({
  className = 'text-[#C9A96E]/55',
  width = 'w-20 sm:w-24',
}) => {
  return (
    <div className={`flex flex-col items-center pointer-events-none select-none ${className}`} aria-hidden="true">
      {/* Micro Apex Finial */}
      <div className="w-1 h-1 rounded-full bg-current mb-0.5 shadow-sm opacity-80" />
      <svg viewBox="0 0 120 22" fill="none" className={`${width} h-3.5 stroke-current`}>
        {/* Outer ogee arch line */}
        <path
          d="M 5,20 C 30,20 46,16 54,7 C 57,3 60,1 60,1 C 60,1 63,3 66,7 C 74,16 90,20 115,20"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        {/* Inner delicate cusp line */}
        <path
          d="M 18,20 C 35,20 48,17 55,10 C 58,6 60,4 60,4 C 60,4 62,6 65,10 C 72,17 85,20 102,20"
          strokeWidth="0.5"
          strokeOpacity="0.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

/**
 * Taj Mahal Jali Screen Lattice Watermark (8-Point Star Girih / Khatam).
 * Ultra-light decorative pattern for frame mats.
 */
export const TajMahalJaliWatermark: React.FC<{ className?: string }> = ({
  className = 'opacity-[0.04]',
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle at center, rgba(201, 169, 110, 0.4) 1px, transparent 1px),
          linear-gradient(45deg, rgba(201, 169, 110, 0.15) 25%, transparent 25%, transparent 75%, rgba(201, 169, 110, 0.15) 75%),
          linear-gradient(-45deg, rgba(201, 169, 110, 0.15) 25%, transparent 25%, transparent 75%, rgba(201, 169, 110, 0.15) 75%)`,
        backgroundSize: '20px 20px, 20px 20px, 20px 20px',
      }}
      aria-hidden="true"
    />
  );
};

/**
 * Royal Manuscript Seal Stamp
 * Used for vintage memory and dedication tags in place of plain modern tape.
 */
export const MughalManuscriptSeal: React.FC<{ title?: string; className?: string }> = ({
  title = 'محفوظ',
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FCFBF9] border border-[#C9A96E]/50 shadow-sm text-[#C9A96E] ${className}`}
    >
      <svg viewBox="0 0 100 100" className="w-2.5 h-2.5 fill-none stroke-current" strokeWidth="1.2">
        <rect x="20" y="20" width="60" height="60" />
        <rect x="20" y="20" width="60" height="60" transform="rotate(45 50 50)" />
        <circle cx="50" cy="50" r="14" fill="currentColor" fillOpacity="0.2" />
      </svg>
      <span className="font-urdu text-[11px] leading-tight pt-0.5" dir="rtl" lang="ur">
        {title}
      </span>
    </div>
  );
};
