import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-[#C9A96E]/50 via-[#C9A96E] to-[#C58A93] transition-[width] duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
