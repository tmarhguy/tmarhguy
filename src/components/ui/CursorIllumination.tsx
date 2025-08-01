'use client';

import { useEffect, useRef } from 'react';

interface CursorIlluminationProps {
  size?: number;
  opacity?: number;
}

export default function CursorIllumination({ 
  size = 2000, 
  opacity = 0.1
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
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = opacity.toString();
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = '0';
    };

    // Add passive listeners for better performance
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [size, opacity]);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(circle at center, rgba(255, 255, 255, ${opacity}) 0%, rgba(255, 255, 255, ${opacity * 0.3}) 40%, transparent 70%)`,
        width: `${size}px`,
        height: `${size}px`,
        opacity: 0,
        willChange: 'transform, opacity',
        transform: 'translate3d(-100vw, -100vh, 0)', // Start far off-screen
      }}
    />
  );
}
