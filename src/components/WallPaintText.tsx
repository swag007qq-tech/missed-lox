import React from 'react';

export const WallPaintText: React.FC = () => {
  return (
    <div
      className="relative w-full max-w-[660px] px-4 flex justify-center pointer-events-none select-none"
      aria-label="МИСЕД ГАВНО"
    >
      <svg
        viewBox="0 0 760 155"
        className="w-full h-auto max-h-[16vh] sm:max-h-[19vh] overflow-visible drop-shadow-[0_2px_1px_rgba(255,214,170,0.08)]"
        role="img"
        aria-label="МИСЕД ГАВНО"
      >
        <defs>
          {/* Rough hand-painted brush edge filter */}
          <filter id="brush-rough" x="-5%" y="-10%" width="110%" height="130%">
            <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          {/* Dark brown paint sheen gradient */}
          <linearGradient id="brown-paint-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B1D0C" />
            <stop offset="45%" stopColor="#2A1307" />
            <stop offset="100%" stopColor="#1E0C03" />
          </linearGradient>

          {/* Subtle wet paint highlight */}
          <linearGradient id="paint-sheen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#613318" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#753E1E" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#4D2610" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Subtle wall absorption shadow behind paint */}
        <g filter="url(#brush-rough)" opacity="0.35" transform="translate(2, 3)">
          <text
            x="380"
            y="88"
            textAnchor="middle"
            fill="#140702"
            fontFamily="'Rubik', 'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="74"
            letterSpacing="3"
            transform="rotate(-1.3 380 80)"
          >
            МИСЕД ГАВНО
          </text>
        </g>

        {/* Main brown paint lettering */}
        <g filter="url(#brush-rough)">
          <text
            x="380"
            y="88"
            textAnchor="middle"
            fill="url(#brown-paint-grad)"
            stroke="#1A0A03"
            strokeWidth="1.5"
            fontFamily="'Rubik', 'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="74"
            letterSpacing="3"
            transform="rotate(-1.3 380 80)"
          >
            МИСЕД ГАВНО
          </text>

          {/* Inner brush-stroke texture highlight */}
          <text
            x="380"
            y="86"
            textAnchor="middle"
            fill="none"
            stroke="url(#paint-sheen)"
            strokeWidth="2.2"
            fontFamily="'Rubik', 'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="74"
            letterSpacing="3"
            transform="rotate(-1.3 380 80)"
          >
            МИСЕД ГАВНО
          </text>

          {/* Realistic brown paint drips hanging from letters */}
          {/* Drip under М */}
          <path d="M98 90 C97 104, 94 114, 97 119 C100 123, 103 117, 102 104 L102 90 Z" fill="#261106" />
          {/* Drip under И */}
          <path d="M168 88 C167 108, 165 126, 168 131 C171 135, 174 126, 172 108 L172 88 Z" fill="#291206" />
          {/* Short drip under Е */}
          <path d="M275 87 C275 98, 273 105, 276 108 C279 110, 281 103, 280 94 L279 87 Z" fill="#261106" />
          {/* Drip under Г */}
          <path d="M405 85 C404 102, 401 118, 405 122 C408 125, 411 117, 409 101 L409 85 Z" fill="#2B1307" />
          {/* Long drip under В */}
          <path d="M542 84 C541 106, 538 129, 542 135 C546 140, 549 128, 547 106 L546 84 Z" fill="#241005" />
          {/* Small splatter dots */}
          <circle cx="170" cy="141" r="2.6" fill="#261106" />
          <circle cx="544" cy="145" r="2.2" fill="#241005" />
          <circle cx="336" cy="96" r="2.1" fill="#2A1307" />
          <circle cx="662" cy="93" r="2.5" fill="#261106" />
        </g>
      </svg>
    </div>
  );
};
