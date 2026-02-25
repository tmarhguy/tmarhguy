import { useInView } from '../../hooks/useInView';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
}

/**
 * Wraps children in a div that fades + slides up when it enters the viewport.
 */
export function FadeIn({ children, className = '', delay = 0 }: FadeInProps) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
