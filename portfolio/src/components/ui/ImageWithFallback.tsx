import { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackClassName?: string;
}

/** Renders image with styled placeholder when src fails to load (e.g. 404) */
export const ImageWithFallback = ({
  src,
  alt,
  fallbackClassName,
  className,
  ...props
}: ImageWithFallbackProps) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={fallbackClassName ?? className}
        style={{
          background: '#111110',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #1e1e1a',
        }}
        aria-label={alt}
      >
        <span className="font-mono text-[0.6rem] text-cream-dim/50 uppercase tracking-widest">
          {alt || 'Image'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  );
};
