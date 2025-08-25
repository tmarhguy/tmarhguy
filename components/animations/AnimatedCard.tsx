"use client";

import { ReactNode, useState } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  glowEffect?: boolean;
  scanlineEffect?: boolean;
  tiltEffect?: boolean;
}

export default function AnimatedCard({ 
  children, 
  className = '',
  glowEffect = true,
  scanlineEffect = false,
  tiltEffect = true 
}: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltEffect) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className="relative overflow-hidden transition-all duration-300 h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        style={{
          transform: tiltEffect && isHovered 
            ? `perspective(1000px) rotateX(${(mousePosition.y - 150) * 0.02}deg) rotateY(${(mousePosition.x - 150) * 0.02}deg)` 
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
          transformOrigin: 'center',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Subtle glow effect */}
        {glowEffect && (
          <div 
            className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${
              isHovered ? 'opacity-60' : 'opacity-0'
            }`}
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(26, 127, 100, 0.15) 0%, transparent 60%)`,
            }}
          />
        )}

        {/* Simple scanline effect - only if explicitly requested */}
        {scanlineEffect && (
          <div className="absolute inset-0 pointer-events-none">
            <style jsx>{`
              .scanline-effect {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 1px;
                background: linear-gradient(90deg, transparent, #1a7f64, transparent);
                animation: scanlineMove 3s ease-in-out infinite;
                opacity: ${isHovered ? 0.4 : 0};
                transition: opacity 0.3s ease;
              }
              
              @keyframes scanlineMove {
                0% { transform: translateY(0); }
                100% { transform: translateY(300px); }
              }
            `}</style>
            <div className="scanline-effect" />
          </div>
        )}

        {/* Subtle border glow */}
        <div 
          className={`absolute inset-0 rounded-lg border transition-all duration-300 ${
            isHovered 
              ? 'border-brand-400/30 shadow-md shadow-brand-400/10' 
              : 'border-gray-700/30'
          }`}
        />

        {/* Content */}
        <div className="relative z-10 h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
