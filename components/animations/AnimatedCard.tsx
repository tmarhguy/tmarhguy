"use client";

import { ReactNode, useState } from 'react';

// Deterministic pseudo-random function based on seed
const getPseudoRandom = (seed: number, max: number = 1) => {
  const x = Math.sin(seed) * 10000;
  return (x - Math.floor(x)) * max;
};

/**
 * Props for the AnimatedCard component with interactive visual effects
 * @interface AnimatedCardProps
 */
interface AnimatedCardProps {
  /** Child components to render inside the animated card */
  children: ReactNode;
  /** Optional CSS classes to apply to the card */
  className?: string;
  /** Enable/disable glow effect on hover (default: true) */
  glowEffect?: boolean;
  /** Enable/disable scanline animation effect (default: false) */
  scanlineEffect?: boolean;
  /** Enable/disable 3D tilt effect on hover (default: true) */
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
            ? `perspective(1000px) rotateX(${(mousePosition.y - 150) * 0.05}deg) rotateY(${(mousePosition.x - 150) * 0.05}deg)` 
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
          transformOrigin: 'center',
          transformStyle: 'preserve-3d',
        }}
      >
      {/* Glow effect */}
      {glowEffect && (
        <div 
          className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(26, 127, 100, 0.3) 0%, transparent 50%)`,
          }}
        />
      )}

      {/* Scanline effect */}
      {scanlineEffect && (
        <div className="absolute inset-0 pointer-events-none">
          <style jsx>{`
            .scanline-effect {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 2px;
              background: linear-gradient(90deg, transparent, #1a7f64, transparent);
              animation: scanlineMove 2s ease-in-out infinite;
              opacity: ${isHovered ? 0.6 : 0};
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

      {/* Border glow */}
      <div 
        className={`absolute inset-0 rounded-lg border transition-all duration-300 ${
          isHovered 
            ? 'border-brand-400/50 shadow-lg shadow-brand-400/20' 
            : 'border-gray-700/50'
        }`}
      />

        {/* Content */}
        <div className="relative z-10 h-full">
          {children}
        </div>

      {/* Floating particles on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-brand-400 rounded-full opacity-60"
              style={{
                left: `${getPseudoRandom(i * 17, 100)}%`,
                top: `${getPseudoRandom(i * 23, 100)}%`,
                animation: `float ${1 + getPseudoRandom(i * 29, 1)}s ease-in-out infinite`,
                animationDelay: `${getPseudoRandom(i * 31, 0.5)}s`,
              }}
            />
          ))}
          <style jsx>{`
            @keyframes float {
              0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
              50% { transform: translateY(-10px) scale(1.2); opacity: 1; }
            }
          `}</style>
          </div>
        )}
      </div>
    </div>
  );
}
