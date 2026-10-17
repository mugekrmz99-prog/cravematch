import React from 'react';

interface CraveLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  layout?: 'horizontal' | 'vertical';
  className?: string;
  onClick?: () => void;
}

export const CraveLogo: React.FC<CraveLogoProps> = ({
  size = 'md',
  showText = true,
  layout = 'vertical',
  className = '',
  onClick
}) => {
  // Dimensions map
  const sizeMap = {
    xs: { cardW: 24, cardH: 24, font: 'text-sm', gap: 'gap-1' },
    sm: { cardW: 36, cardH: 36, font: 'text-lg', gap: 'gap-1.5' },
    md: { cardW: 52, cardH: 48, font: 'text-xl', gap: 'gap-2' },
    lg: { cardW: 76, cardH: 70, font: 'text-3xl', gap: 'gap-3' },
    xl: { cardW: 104, cardH: 96, font: 'text-4xl', gap: 'gap-4' }
  };

  const { cardW, cardH, font, gap } = sizeMap[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center justify-center select-none ${
        layout === 'vertical' ? 'flex-col' : 'flex-row'
      } ${gap} ${onClick ? 'cursor-pointer hover:opacity-95 transition-opacity' : ''} ${className}`}
    >
      {/* Cards SVG Graphic */}
      <svg
        width={cardW}
        height={cardH}
        viewBox="0 0 140 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible drop-shadow-sm"
      >
        <defs>
          {/* Bite mask for the right card */}
          <mask id="bite-mask">
            <rect width="200" height="200" fill="white" />
            {/* Bite teeth marks at top right of the rotated card */}
            <circle cx="106" cy="24" r="13" fill="black" />
            <circle cx="114" cy="38" r="9" fill="black" />
            <circle cx="98" cy="14" r="7" fill="black" />
          </mask>
          {/* Subtle gradient for depth */}
          <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#357A8B" />
            <stop offset="100%" stopColor="#235A68" />
          </linearGradient>
          <linearGradient id="terracottaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E66548" />
            <stop offset="100%" stopColor="#D54E31" />
          </linearGradient>
        </defs>

        {/* BACK CARD - Dark Teal with Heart & Arrow */}
        <g transform="translate(42, 62) rotate(-14) translate(-42, -62)">
          {/* Card Body */}
          <rect
            x="20"
            y="14"
            width="48"
            height="72"
            rx="12"
            fill="url(#tealGrad)"
            stroke="#FFFFFF"
            strokeWidth="3.5"
          />
          {/* Inner glossy highlight */}
          <rect
            x="24"
            y="18"
            width="40"
            height="14"
            rx="6"
            fill="#FFFFFF"
            fillOpacity="0.16"
          />
          {/* Heart with Arrow in Terracotta */}
          <g transform="translate(44, 50) scale(0.9)">
            <path
              d="M0 -6 C -5 -14, -15 -10, -15 0 C -15 8, -4 14, 0 18 C 4 14, 15 8, 15 0 C 15 -10, 5 -14, 0 -6 Z"
              fill="#E05A3D"
            />
            {/* Arrow piercing heart */}
            <path
              d="M-18 10 L18 -10"
              stroke="#F7F5F2"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Arrow tip */}
            <path
              d="M13 -13 L19 -11 L17 -5"
              stroke="#F7F5F2"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Arrow fletching */}
            <path
              d="M-19 6 L-17 12 L-11 11"
              stroke="#F7F5F2"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* FRONT CARD - Terracotta with Cutlery & Bite */}
        <g
          transform="translate(82, 60) rotate(11) translate(-82, -60)"
          mask="url(#bite-mask)"
        >
          {/* Card Body */}
          <rect
            x="60"
            y="12"
            width="50"
            height="74"
            rx="13"
            fill="url(#terracottaGrad)"
            stroke="#FFFFFF"
            strokeWidth="4"
          />
          {/* Inner glossy highlight */}
          <rect
            x="64"
            y="16"
            width="42"
            height="15"
            rx="6"
            fill="#FFFFFF"
            fillOpacity="0.22"
          />

          {/* Cutlery (Fork & Knife) in Teal */}
          <g transform="translate(85, 49) scale(0.95)">
            {/* Fork */}
            <g transform="translate(-7, 0)">
              <rect x="-1" y="-2" width="2" height="15" rx="1" fill="#2B6777" />
              <path
                d="M-4.5 -13 L-4.5 -6 C-4.5 -3.5 -2.5 -2 0 -2 C2.5 -2 4.5 -3.5 4.5 -6 L4.5 -13"
                stroke="#2B6777"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
              <line x1="-1.5" y1="-13" x2="-1.5" y2="-3" stroke="#2B6777" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="1.5" y1="-13" x2="1.5" y2="-3" stroke="#2B6777" strokeWidth="1.6" strokeLinecap="round" />
            </g>
            {/* Knife */}
            <g transform="translate(7, 0)">
              <rect x="-1" y="-2" width="2" height="15" rx="1" fill="#2B6777" />
              <path
                d="M-1.5 -13 C 4 -10, 4 -4, 0 -2 L-1.5 -2 Z"
                fill="#2B6777"
              />
            </g>
          </g>
        </g>
      </svg>

      {/* Typography: "Crave" in Terracotta, "Match" in Teal */}
      {showText && (
        <div className={`font-black tracking-tight leading-none ${font} font-['Outfit',sans-serif]`}>
          <span className="text-[#E05A3D]">Crave</span>
          <span className="text-[#2B6777]">Match</span>
        </div>
      )}
    </div>
  );
};
