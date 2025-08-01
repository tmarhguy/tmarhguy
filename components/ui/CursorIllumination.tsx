'use client';

import { useEffect, useRef } from 'react';

interface CursorIlluminationProps {
  size?: number;
  opacity?: number;
}

export default function CursorIllumination({ 
  size = 900, 
  opacity = 0.4
}: CursorIlluminationProps) {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      // Direct transform for instant response
      cursor.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`;
      // Ensure visibility when moving
      cursor.style.opacity = opacity.toString();
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = opacity.toString();
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = '0';
    };

    // Add passive listeners for better performance
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [size, opacity]);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-50 transition-opacity duration-300"
      style={{
        background: `radial-gradient(circle at center, rgba(59, 130, 246, ${opacity}) 0%, rgba(96, 165, 250, ${opacity * 0.5}) 30%, rgba(147, 197, 253, ${opacity * 0.2}) 60%, transparent 80%)`,
        width: `${size}px`,
        height: `${size}px`,
        opacity: 0,
        willChange: 'transform, opacity',
        transform: 'translate3d(-100vw, -100vh, 0)', // Start far off-screen
      }}
    />
  );
}
