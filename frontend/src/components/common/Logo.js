import React from 'react';
import './Logo.scss';

const Logo = ({ variant = 'default', size = 'medium' }) => {
  return (
    <div className={`logo-container logo-${size} logo-${variant}`}>
      <svg 
        className="logo-icon" 
        viewBox="0 0 50 50" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ship body */}
        <path 
          d="M8 30 L15 22 L35 22 L42 30 L40 32 L10 32 Z" 
          fill="currentColor"
          className="ship-body"
        />
        
        {/* Ship deck */}
        <path 
          d="M18 22 L20 18 L30 18 L32 22 Z" 
          fill="currentColor"
          className="ship-deck"
          opacity="0.8"
        />
        
        {/* Containers */}
        <rect x="20" y="24" width="4" height="4" fill="currentColor" opacity="0.9"/>
        <rect x="26" y="24" width="4" height="4" fill="currentColor" opacity="0.9"/>
        
        {/* Speed lines */}
        <path 
          d="M5 28 L12 28 M3 26 L10 26 M2 24 L8 24" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          className="speed-lines"
          opacity="0.6"
        />
        
        {/* Waves */}
        <path 
          d="M8 34 Q 13 32, 18 34 T 28 34 T 38 34 T 48 34" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          fill="none"
          strokeLinecap="round"
          className="waves"
          opacity="0.5"
        />
      </svg>
      <span className="logo-text">
        <span className="logo-swift">Transport </span>
        <span className="logo-ship">Hub</span>
      </span>
    </div>
  );
};

export default Logo;
