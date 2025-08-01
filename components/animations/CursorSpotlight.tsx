"use client";

import { useEffect, useState, useCallback, useRef } from "react";

export default function CursorSpotlight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const rafId = useRef<number | null>(null);

  const updateMousePosition = useCallback((e: MouseEvent) => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    
    rafId.current = requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [updateMousePosition, handleMouseLeave]);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 ease-out"
      style={{
        background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.06), transparent 70%)`,
        opacity: isVisible ? 1 : 0,
        willChange: 'transform, opacity',
      }}
    />
  );
}
