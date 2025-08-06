'use client';

import { useMemo } from 'react';

/**
 * Props for the AnimatedBackground component
 * @interface AnimatedBackgroundProps
 */
interface AnimatedBackgroundProps {
  /** Background animation variant style */
  variant?: 'matrix' | 'circuit' | 'particles' | 'terminal';
  /** Animation intensity level affecting speed and density */
  intensity?: 'low' | 'medium' | 'high';
  /** Optional CSS classes for customization */
  className?: string;
}

// Deterministic pseudo-random function based on seed
const getPseudoRandom = (seed: number, max: number = 1) => {
  const x = Math.sin(seed) * 10000;
  return (x - Math.floor(x)) * max;
};

export default function AnimatedBackground({ 
  variant = 'circuit', 
  intensity = 'medium',
  className = '' 
}: AnimatedBackgroundProps = {}) {
  
  const particleCount = useMemo(() => {
    const baseCount = intensity === 'high' ? 40 : intensity === 'medium' ? 25 : 15;
    return variant === 'particles' ? baseCount : Math.floor(baseCount * 0.6);
  }, [variant, intensity]);

  const lineCount = useMemo(() => {
    return intensity === 'high' ? 10 : intensity === 'medium' ? 7 : 5;
  }, [intensity]);

  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`}>
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 from-gray-100 via-white to-gray-100" />
      
      {/* Matrix Rain Effect */}
      {variant === 'matrix' && (
        <div className="matrix-container w-full h-full overflow-hidden">
          <style jsx>{`
            .matrix-rain {
              position: absolute;
              top: -100%;
              font-family: 'Courier New', monospace;
              font-size: 14px;
              font-weight: bold;
              color: #0f7a5f;
              animation: fall linear infinite;
              white-space: pre;
              opacity: 0.6;
              text-shadow: 0 0 8px rgba(15, 122, 95, 0.6);
              transform: translateZ(0);
              will-change: transform;
            }
            
            @keyframes fall {
              0% { transform: translate3d(0, -100vh, 0); opacity: 1; }
              100% { transform: translate3d(0, 100vh, 0); opacity: 0; }
            }
            
            .matrix-rain:nth-child(odd) { 
              color: #1db584; 
              animation-duration: 4s;
              text-shadow: 0 0 10px rgba(29, 181, 132, 0.7);
            }
            .matrix-rain:nth-child(even) { 
              color: #0f7a5f; 
              animation-duration: 6s;
              text-shadow: 0 0 6px rgba(15, 122, 95, 0.5);
            }
          `}</style>
          
          {Array.from({ length: Math.floor(particleCount * 0.5) }, (_, i) => (
            <div
              key={i}
              className="matrix-rain"
              style={{
                left: `${(i * 50) % 100}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + (i % 3)}s`,
              }}
            >
              {Array.from({ length: 8 }, (_, j) => 
                String.fromCharCode(0x30A0 + Math.floor(getPseudoRandom(i * 100 + j * 10, 96)))
              ).join('\n')}
            </div>
          ))}
        </div>
      )}

      {/* Circuit Pattern */}
      {variant === 'circuit' && (
        <div className="circuit-grid w-full h-full overflow-hidden opacity-30">
          <style jsx>{`
            .circuit-line {
              position: absolute;
              background: linear-gradient(90deg, transparent, #1a7f64, transparent);
              opacity: 0.6;
              animation: pulse 3s ease-in-out infinite;
              transform: translateZ(0);
              will-change: opacity;
            }
            
            .circuit-node {
              position: absolute;
              width: 4px;
              height: 4px;
              background: #1a7f64;
              border-radius: 50%;
              animation: glow 2s ease-in-out infinite alternate;
              transform: translateZ(0);
              will-change: opacity;
            }
            
            @keyframes pulse {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 0.8; }
            }
            
            @keyframes glow {
              0% { 
                opacity: 0.4;
                box-shadow: 0 0 4px #1a7f64;
              }
              100% { 
                opacity: 1;
                box-shadow: 0 0 8px #1a7f64, 0 0 12px #1a7f64;
              }
            }
          `}</style>
          
          {/* Horizontal Lines - Reduced count */}
          {Array.from({ length: lineCount }, (_, i) => (
            <div
              key={`h-${i}`}
              className="circuit-line"
              style={{
                top: `${(i + 1) * (100 / (lineCount + 1))}%`,
                left: 0,
                right: 0,
                height: '1px',
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
          
          {/* Vertical Lines - Reduced count */}
          {Array.from({ length: lineCount }, (_, i) => (
            <div
              key={`v-${i}`}
              className="circuit-line"
              style={{
                left: `${(i + 1) * (100 / (lineCount + 1))}%`,
                top: 0,
                bottom: 0,
                width: '1px',
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
          
          {/* Circuit Nodes - Reduced count */}
          {Array.from({ length: Math.floor(lineCount * 0.8) }, (_, i) => (
            <div
              key={`node-${i}`}
              className="circuit-node"
              style={{
                left: `${20 + (i * 70) % 60}%`,
                top: `${20 + (i * 50) % 60}%`,
                animationDelay: `${i * 0.8}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Particles */}
      {variant === 'particles' && (
        <div className="particles-container w-full h-full overflow-hidden">
          <style jsx>{`
            .particle {
              position: absolute;
              border-radius: 50%;
              background: #1a7f64;
              opacity: 0.6;
              animation: float linear infinite;
              transform: translateZ(0);
              will-change: transform;
            }
            
            @keyframes float {
              0% { 
                transform: translate3d(0, 100vh, 0) scale(0);
                opacity: 0;
              }
              10% {
                opacity: 0.6;
                transform: translate3d(0, 90vh, 0) scale(1);
              }
              90% {
                opacity: 0.6;
                transform: translate3d(0, -10vh, 0) scale(1);
              }
              100% { 
                transform: translate3d(0, -20vh, 0) scale(0);
                opacity: 0;
              }
            }
          `}</style>
          
          {Array.from({ length: particleCount }, (_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${(i * 37 + 11) % 100}%`,
                width: `${2 + ((i * 13) % 3)}px`,
                height: `${2 + ((i * 13) % 3)}px`,
                animationDuration: `${10 + ((i * 17) % 8)}s`,
                animationDelay: `${(i * 23) % 10}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Terminal Effect */}
      {variant === 'terminal' && (
        <div className="terminal-container w-full h-full">
          <style jsx>{`
            .terminal-overlay {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 100%;
              background: linear-gradient(transparent 50%, rgba(26, 127, 100, 0.02) 50%);
              background-size: 100% 4px;
              animation: scanline 0.1s linear infinite;
              pointer-events: none;
              opacity: 0.8;
              transform: translateZ(0);
              will-change: background-position;
            }
            
            @keyframes scanline {
              0% { background-position: 0 0; }
              100% { background-position: 0 4px; }
            }
          `}</style>
          
          <div className="terminal-overlay" />
        </div>
      )}
    </div>
  );
}