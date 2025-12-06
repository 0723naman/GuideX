import React from 'react';

const Logo = ({ className, iconClassName, textClassName, showText = true }) => {
    return (
        <div className={`flex items-center gap-2 ${className || ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className={`relative flex items-center justify-center ${iconClassName || ''}`}>
                <svg
                    width="44"
                    height="40"
                    viewBox="0 0 44 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-11 h-10"
                >
                    {/* Heart Shape */}
                    <path
                        d="M16 28.5L14.6593 27.279C9.72124 22.842 6.5 19.957 6.5 16.3C6.5 13.332 8.79051 11 11.758 11C13.4352 11 15.0441 11.789 16 13.067C16.9559 11.789 18.5648 11 20.242 11C23.2095 11 25.5 13.332 25.5 16.3C25.5 19.957 22.2788 22.842 17.3407 27.279L16 28.5Z"
                        fill="url(#heart-gradient)"
                        stroke="#b91c1c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Face: Eyes */}
                    <circle cx="13" cy="16" r="1.5" fill="white" />
                    <circle cx="19" cy="16" r="1.5" fill="white" />

                    {/* Face: Smile */}
                    <path
                        d="M14 19.5C14 19.5 15 21 17 21C19 21 20 19.5 20 19.5"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Hand: Thumbs Up (extending from right side) */}
                    {/* Arm */}
                    <path d="M24 18Q28 18 30 20" stroke="#b91c1c" strokeWidth="1.5" strokeLinecap="round" />

                    {/* Hand Shape */}
                    <path
                        d="M30 20V24C30 24.55 30.45 25 31 25H35C35.55 25 36 24.55 36 24V21C36 20.45 35.55 20 35 20"
                        fill="#fcd34d"
                        stroke="#b45309"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    {/* Thumb */}
                    <path
                        d="M30 20L31 16C31.2 15.5 31.8 15.5 32 16L32.5 20"
                        fill="#fcd34d"
                        stroke="#b45309"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    <defs>
                        <linearGradient id="heart-gradient" x1="6.5" y1="11" x2="25.5" y2="28.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#f43f5e" />
                            <stop offset="1" stopColor="#fb7185" />
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
