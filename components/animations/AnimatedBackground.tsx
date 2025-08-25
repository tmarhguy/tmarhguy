'use client';

import { useMemo } from 'react';

interface AnimatedBackgroundProps {
  variant?: 'matrix' | 'circuit' | 'particles' | 'terminal';
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export default function AnimatedBackground({ 
  variant = 'circuit', 
  intensity = 'medium',
  className = '' 
}: AnimatedBackgroundProps = {}) {
  
  const particleCount = useMemo(() => {
    // Reduced particle counts for better performance
    const baseCount = intensity === 'high' ? 15 : intensity === 'medium' ? 8 : 4;
    return variant === 'particles' ? baseCount : Math.floor(baseCount * 0.5);
  }, [variant, intensity]);

  const lineCount = useMemo(() => {
    // Reduced line counts for cleaner look
    return intensity === 'high' ? 6 : intensity === 'medium' ? 4 : 2;
  }, [intensity]);

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      {/* Base gradient background - simplified */}
      <div className="absolute inset-0 bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 from-gray-100 via-white to-gray-100" />
      
      {/* Matrix Rain Effect - simplified and reduced */}
      {variant === 'matrix' && (
        <div className="matrix-container w-full h-full overflow-hidden">
          <style jsx>{`
            .matrix-rain {
              position: absolute;
              top: -100%;
              font-family: 'Courier New', monospace;
              font-size: 12px;
              color: #0f7a5f;
              animation: fall linear infinite;
              white-space: pre;
              opacity: 0.4;
              text-shadow: 0 0 4px rgba(15, 122, 95, 0.4);
            }
            
            @keyframes fall {
              0% { transform: translateY(-100vh); opacity: 1; }
              100% { transform: translateY(100vh); opacity: 0; }
            }
          `}</style>
          
          {Array.from({ length: Math.floor(particleCount * 0.3) }, (_, i) => (
            <div
              key={i}
              className="matrix-rain"
              style={{
                left: `${(i * 70) % 100}%`,
                animationDelay: `${i * 1.2}s`,
                animationDuration: `${6 + (i % 2)}s`,
              }}
            >
              {Array.from({ length: 6 }).map(() =>
                String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))
              ).join('\n')}
            </div>
          ))}
        </div>
      )}

      {/* Circuit Pattern - simplified and cleaner */}
      {variant === 'circuit' && (
        <div className="circuit-grid w-full h-full overflow-hidden opacity-20">
          <style jsx>{`
            .circuit-line {
              position: absolute;
              background: linear-gradient(90deg, transparent, #1a7f64, transparent);
              opacity: 0.5;
              animation: pulse 4s ease-in-out infinite;
            }
            
            .circuit-node {
              position: absolute;
              width: 3px;
              height: 3px;
              background: #1a7f64;
              border-radius: 50%;
              animation: glow 3s ease-in-out infinite alternate;
            }
            
            @keyframes pulse {
              0%, 100% { opacity: 0.2; }
              50% { opacity: 0.6; }
            }
            
            @keyframes glow {
              0% { 
                opacity: 0.3;
                box-shadow: 0 0 3px #1a7f64;
              }
              100% { 
                opacity: 0.8;
                box-shadow: 0 0 6px #1a7f64;
              }
            }
          `}</style>
          
          {/* Horizontal Lines - minimal count */}
          {Array.from({ length: lineCount }, (_, i) => (
            <div
              key={`h-${i}`}
              className="circuit-line"
              style={{
                top: `${(i + 1) * (100 / (lineCount + 1))}%`,
                left: 0,
                right: 0,
                height: '1px',
                animationDelay: `${i * 0.8}s`,
              }}
            />
          ))}
          
          {/* Vertical Lines - minimal count */}
          {Array.from({ length: lineCount }, (_, i) => (
            <div
              key={`v-${i}`}
              className="circuit-line"
              style={{
                left: `${(i + 1) * (100 / (lineCount + 1))}%`,
                top: 0,
                bottom: 0,
                width: '1px',
                animationDelay: `${i * 0.8}s`,
              }}
            />
          ))}
          
          {/* Circuit Nodes - minimal count */}
          {Array.from({ length: Math.floor(lineCount * 0.6) }, (_, i) => (
            <div
              key={`node-${i}`}
              className="circuit-node"
              style={{
                left: `${25 + (i * 60) % 50}%`,
                top: `${25 + (i * 60) % 50}%`,
                animationDelay: `${i * 1.2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Particles - simplified and reduced */}
      {variant === 'particles' && (
        <div className="particles-container w-full h-full overflow-hidden">
          <style jsx>{`
            .particle {
              position: absolute;
              border-radius: 50%;
              background: #1a7f64;
              opacity: 0.4;
              animation: float linear infinite;
            }
            
            @keyframes float {
              0% { 
                transform: translateY(100vh) scale(0);
                opacity: 0;
              }
              10% {
                opacity: 0.4;
                transform: translateY(90vh) scale(1);
              }
              90% {
                opacity: 0.4;
                transform: translateY(-10vh) scale(1);
              }
              100% { 
                transform: translateY(-20vh) scale(0);
                opacity: 0;
              }
            }
          `}</style>
          
          {Array.from({ length: particleCount }, (_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${(i * 40 + 15) % 100}%`,
                width: `${2 + ((i * 13) % 2)}px`,
                height: `${2 + ((i * 13) % 2)}px`,
                animationDuration: `${12 + ((i * 17) % 6)}s`,
                animationDelay: `${(i * 25) % 8}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Terminal Effect - simplified */}
      {variant === 'terminal' && (
        <div className="terminal-container w-full h-full">
          <style jsx>{`
            .terminal-overlay {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 100%;
              background: linear-gradient(transparent 50%, rgba(26, 127, 100, 0.015) 50%);
              background-size: 100% 6px;
              animation: scanline 0.15s linear infinite;
              pointer-events: none;
              opacity: 0.6;
            }
            
            @keyframes scanline {
              0% { background-position: 0 0; }
              100% { background-position: 0 6px; }
            }
          `}</style>
          
          <div className="terminal-overlay" />
        </div>
      )}
    </div>
  );
}