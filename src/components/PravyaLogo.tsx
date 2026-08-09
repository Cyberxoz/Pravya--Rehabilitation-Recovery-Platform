import React from 'react';

interface PravyaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  variant?: 'deep-teal' | 'light' | 'dark';
  useGeneratedIcon?: boolean;
}

export const CalligraphicPIcon: React.FC<{ className?: string; sizePx?: number }> = ({
  className = '',
  sizePx = 36,
}) => {
  return (
    <svg
      width={sizePx}
      height={sizePx}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Calligraphic P Logo Symbol"
    >
      {/* Background Soft Rounded Card */}
      <rect width="100" height="100" rx="28" fill="currentColor" fillOpacity="0.08" />
      <rect x="1" y="1" width="98" height="98" rx="27" stroke="currentColor" strokeOpacity="0.12" strokeWidth="2" />
      
      {/* Calligraphic 'P' paths with elegant sweeping strokes */}
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        {/* Main Vertical Stem with Calligraphic Taper */}
        <path
          d="M 32 22 C 30 35, 30 65, 34 82 C 34.5 84, 32.5 86, 30.5 85 C 28.5 84, 28 81, 28 78 C 28 60, 28 38, 30 22 C 30.5 19.5, 33 18.5, 35 19.5 C 38 21, 41 21.5, 45 21.5"
          strokeWidth="5"
          fill="currentColor"
        />
        {/* Swirling Calligraphic Bowl of the P */}
        <path
          d="M 32 23 C 45 14, 76 15, 78 35 C 79.5 48.5, 62 58, 36 57.5"
          strokeWidth="6"
          fill="none"
        />
        {/* Organic flourish curve at the base of loop */}
        <path
          d="M 36 57.5 C 48 57, 60 52, 62 44 C 63.5 38, 56 31, 44 32"
          strokeWidth="3.5"
          strokeOpacity="0.8"
          fill="none"
        />
        {/* Accent flourish dot */}
        <circle cx="70" cy="50" r="3.5" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
};

export const PravyaLogo: React.FC<PravyaLogoProps> = ({
  className = '',
  size = 'md',
  showWordmark = true,
  variant = 'deep-teal',
  useGeneratedIcon = true,
}) => {
  const generatedIconPath = '/src/assets/images/pravya_app_icon_1786205650676.jpg';

  // Size mappings
  const dimensions = {
    sm: { box: 'w-7 h-7', px: 28, text: 'text-sm tracking-[0.2em]' },
    md: { box: 'w-9 h-9', px: 36, text: 'text-lg tracking-[0.22em]' },
    lg: { box: 'w-11 h-11', px: 44, text: 'text-2xl tracking-[0.25em]' },
    xl: { box: 'w-14 h-14', px: 56, text: 'text-3xl tracking-[0.28em]' },
  }[size];

  // Color mappings
  const textColor = {
    'deep-teal': 'text-[#0F4C4A] dark:text-teal-100',
    light: 'text-slate-900 dark:text-white',
    dark: 'text-teal-900 dark:text-teal-200',
  }[variant];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* App Icon (Calligraphic P) */}
      <div className={`relative ${dimensions.box} rounded-2xl overflow-hidden shadow-xs flex items-center justify-center bg-[#FAF8F5] dark:bg-slate-800 border border-[#0F4C4A]/15`}>
        {useGeneratedIcon ? (
          <img
            src={generatedIconPath}
            alt="PRAVYA Calligraphic P Logo"
            className="w-full h-full object-cover rounded-2xl"
            referrerPolicy="no-referrer"
          />
        ) : (
          <CalligraphicPIcon sizePx={dimensions.px} className="text-[#0F4C4A] dark:text-teal-300" />
        )}
      </div>

      {/* Wordmark in clean sans-serif */}
      {showWordmark && (
        <div className="flex flex-col">
          <span className={`font-sans font-semibold uppercase ${dimensions.text} ${textColor}`}>
            PRAVYA
          </span>
        </div>
      )}
    </div>
  );
};

export default PravyaLogo;
