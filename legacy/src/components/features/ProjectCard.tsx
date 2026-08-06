import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../ui/ImageWithFallback';

interface ProjectCardProps {
  tag: string;
  title: string;
  description: string;
  metrics: Array<{ label: string; value: string }>;
  link: string;
  externalLink?: string;
  badge?: string;
  image: string;
  /** When provided, card click opens preview instead of navigating */
  onPreview?: () => void;
}

export const ProjectCard = ({
  tag,
  title,
  description,
  metrics,
  link,
  externalLink,
  badge = 'View Project',
  image,
  onPreview,
}: ProjectCardProps) => {
  const wrapperProps = onPreview
    ? {
        onClick: onPreview,
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onPreview();
          }
        },
        role: 'button' as const,
        tabIndex: 0,
        className: 'group relative bg-bg-void overflow-hidden transition-all duration-200 hover:bg-bg-deep flex flex-col h-full cursor-pointer',
      }
    : {
        className: 'group relative bg-bg-void overflow-hidden transition-all duration-200 hover:bg-bg-deep flex flex-col h-full',
      };

  return (
    <div {...wrapperProps} style={{ padding: '1.5rem 1.5rem' }}>
      {/* Top accent bar — slides in on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 bg-gold-champagne origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"
      />

      {/* Tag */}
      <div className="font-mono text-[0.58rem] text-gold-dim tracking-[0.2em] uppercase mb-3">
        {tag}
      </div>

      {/* Image */}
      {image && (
        <div className="relative h-28 mb-3 overflow-hidden border border-border-subtle">
          <ImageWithFallback
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          />
        </div>
      )}

      {/* Title */}
      <h3
        className="font-display text-base font-bold text-text-primary mb-2 leading-tight group-hover:text-gold-champagne transition-colors"
      >
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-[0.78rem] text-cream-dim leading-relaxed mb-3 flex-1">
        {description}
      </p>
      
      {/* Metrics */}
      <div className="flex flex-col gap-0.5 mb-3">
        {metrics.map((metric, idx) => (
          <div key={idx} className="font-mono text-[0.62rem] tracking-[0.05em]">
            <span className="text-gold-champagne">{metric.value}</span>{' '}
            <span className="text-cream-dim">{metric.label}</span>
          </div>
        ))}
      </div>
      
      {/* Links */}
      <div className="mt-auto pt-4 border-t border-border-subtle flex flex-col gap-3">
        {onPreview ? (
          <span className="inline-flex items-center gap-2 font-mono text-[0.62rem] text-gold-champagne tracking-[0.12em] uppercase w-fit">
            View preview <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
          </span>
        ) : (
          <Link to={link} className="inline-flex items-center gap-2 font-mono text-[0.62rem] text-gold-champagne tracking-[0.12em] uppercase transition-colors hover:text-gold-bright no-underline w-fit">
            View Case Study <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        )}

        {externalLink && (
          <a
            href={externalLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#1e1e1a] text-gold-champagne hover:bg-gold-champagne hover:text-bg-void border border-gold-dim font-mono text-[0.7rem] tracking-[0.1em] uppercase transition-all duration-300 no-underline shadow-[0_0_15px_rgba(201,168,76,0.1)] hover:shadow-[0_0_20px_rgba(201,168,76,0.3)]"
          >
            <ExternalLink size={14} />
            {badge || 'Live Website'}
          </a>
        )}
      </div>
    </div>
  );
};
