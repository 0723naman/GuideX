import React from 'react';

const Logo = ({ className, iconClassName, textClassName, showText = true }) => {
    return (
        <div className={`flex items-center gap-2 ${className || ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className={`relative flex items-center justify-center ${iconClassName || ''}`}>
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                >
                    {/* Main Shield/G Shape */}
                    <path
                        d="M16 2L4 7V15C4 22.5 9.5 28.5 16 30C22.5 28.5 28 22.5 28 15V7L16 2Z"
                        fill="url(#logo-gradient)"
                        stroke="#0b1120"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    {/* Inner Compass/X Mark */}
                    <path
                        d="M16 8V22M9 15H23"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <circle cx="16" cy="15" r="3" fill="white" />

                    <defs>
                        <linearGradient id="logo-gradient" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#89b0f3" />
                            <stop offset="1" stopColor="#f8c4c4" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            {showText && (
                <span className={`font-bold text-xl tracking-tight ${textClassName || ''}`} style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0b1120' }}>
                    GuideX
                </span>
            )}
        </div>
    );
};

export default Logo;
