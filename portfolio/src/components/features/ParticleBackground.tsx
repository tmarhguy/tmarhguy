import { useEffect, useRef, useState } from 'react';

interface ParticleBackgroundProps {
  particleCount?: number;
  colors?: string[];
  opacity?: number;
}

/** Reduce particles on mobile for performance (battery, low-end devices) */
function getParticleCount(defaultCount: number): number {
  if (typeof window === 'undefined') return defaultCount;
  const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
  return isMobile ? Math.min(20, defaultCount) : defaultCount;
}

export const ParticleBackground = ({ 
  particleCount = 50, 
  colors = ['#C9A961', '#2E5BFF'], 
  opacity = 0.3 
}: ParticleBackgroundProps) => {
  const [effectiveCount, setEffectiveCount] = useState(() => getParticleCount(particleCount));
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const updateCount = () => setEffectiveCount(getParticleCount(particleCount));
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, [particleCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      dx: number;
      dy: number;
      radius: number;
      color: string;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < effectiveCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          dx: (Math.random() - 0.5) * 0.5,
          dy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = opacity;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [effectiveCount, colors, opacity]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};
