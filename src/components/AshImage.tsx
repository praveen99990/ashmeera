import React, { useState, useEffect } from 'react';

interface AshImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  categoryTag?: string;
  photoTitle?: string;
}

export const AshImage: React.FC<AshImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className,
  categoryTag,
  photoTitle,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src || fallbackSrc);
  const [hasAttemptedFallback, setHasAttemptedFallback] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCurrentSrc(src || fallbackSrc);
    setHasAttemptedFallback(false);
    setIsFailed(false);
    setIsLoaded(false);
  }, [src, fallbackSrc]);

  const handleError = () => {
    // If we haven't tried fallbackSrc yet and it's different from the failing src
    if (!hasAttemptedFallback && fallbackSrc && fallbackSrc !== currentSrc) {
      setHasAttemptedFallback(true);
      setCurrentSrc(fallbackSrc);
    } else {
      setIsFailed(true);
    }
  };

  // If all image attempts fail, display an exquisite Mughal aesthetic frame
  if (isFailed || !currentSrc) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#F8EAE8] via-[#FAF8F5] to-[#E6EDE2] border border-[#C9A96E]/30 relative overflow-hidden ${
          className || ''
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(#C9A96E_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
        <svg
          className="w-10 h-10 text-[#C9A96E] mb-2.5 drop-shadow-sm"
          viewBox="-50 -50 100 100"
        >
          <use href="#flower" />
        </svg>
        <p className="font-serif italic text-base text-[#4A4240] font-medium leading-tight px-2">
          {photoTitle || alt || 'The Flower of Heaven'}
        </p>
        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#6B7F64] mt-2 font-semibold">
          {categoryTag || 'Ashmeera'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt || photoTitle || 'Ashmeera'}
      onError={handleError}
      onLoad={() => setIsLoaded(true)}
      className={`${className || ''} ${
        isLoaded ? 'opacity-100' : 'opacity-90'
      } transition-opacity duration-500`}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
};

