import React from "react";

const EmergencySiren = ({ size = 50 }) => {
  // Precompute rotation angles to avoid template literal issues
  const angles = Array.from({ length: 6 }, (_, i) => i * 30 - 90);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 360 360"
      width={size}
      height={size}
      role="img"
      aria-label="Blinking red emergency siren"
    >
      <defs>
        <radialGradient id="domeRadial" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="yellow" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#ff3333" />
          <stop offset="100%" stopColor="#800000" />
        </radialGradient>

        <linearGradient id="domeGloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#333" />
          <stop offset="100%" stopColor="#000" />
        </linearGradient>

        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Rays - Positioned at top */}
      <g transform="translate(180,120)" opacity="0.9">
        <g fill="yellow">
          {angles.map((angle, i) => (
            <rect
              key={i}
              x="-6"
              y="-120"
              width="12"
              height="40"
              rx="3"
              ry="3"
              transform={`rotate(${angle})`} // Use precomputed angle
            >
              <animate
                attributeName="opacity"
                values="1;0.2;1"
                dur="1s"
                begin={`${i * 0.15}s`}
                repeatCount="indefinite"
              />
            </rect>
          ))}
        </g>
      </g>

      {/* Dome */}
      <g filter="url(#glow)">
        <path
          d="M100 150 A80 80 0 0 1 260 150 L260 210 L100 210 Z"
          fill="url(#domeRadial)"
          stroke="#600"
          strokeWidth="2"
        >
          <animate
            attributeName="opacity"
            values="1;0.4;1"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M110 150 A70 70 0 0 1 250 150 L250 190 L110 190 Z"
          fill="url(#domeGloss)"
          opacity="0.5"
        />
      </g>

      {/* Base - Increased height */}
      <rect
        x="90"
        y="180"
        width="180"
        height="60"
        rx="15"
        ry="15"
        fill="url(#baseGrad)"
      />
    </svg>
  );
};

export default EmergencySiren;