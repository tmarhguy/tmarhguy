import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { X, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { ImageWithFallback } from '../ui/ImageWithFallback';

export interface ProjectPreviewData {
  tag: string;
  title: string;
  description: string;
  metrics: Array<{ label: string; value: string }>;
  image: string;
  link?: string;
  externalLink?: string;
  badge?: string;
}

interface ProjectPreviewModalProps {
  project: ProjectPreviewData;
  onClose: () => void;
}

export const ProjectPreviewModal = ({ project, onClose }: ProjectPreviewModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const modal = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        padding: 'max(env(safe-area-inset-top), 1rem) max(env(safe-area-inset-right), 1rem) max(env(safe-area-inset-bottom), 1rem) max(env(safe-area-inset-left), 1rem)',
      }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bg-void/90 backdrop-blur-sm animate-in fade-in duration-200"
        aria-hidden
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg bg-bg-deep border border-border-subtle overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        style={{ borderRadius: '4px', boxShadow: '0 0 60px rgba(0,0,0,0.5)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 touch-target text-cream-dim hover:text-gold-champagne transition-colors rounded"
          aria-label="Close preview"
        >
          <X size={20} />
        </button>

        {/* Image */}
        {project.image && (
          <div className="relative h-48 overflow-hidden border-b border-border-subtle">
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <div className="font-mono text-[0.58rem] text-gold-dim tracking-[0.2em] uppercase mb-2">
            {project.tag}
          </div>
          <h3 className="font-display text-xl font-bold text-text-primary mb-3">
            {project.title}
          </h3>
          <p className="text-sm text-cream-dim leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Metrics */}
          <div className="flex flex-wrap gap-x-6 gap-y-1 mb-6">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="font-mono text-[0.7rem]">
                <span className="text-gold-champagne">{metric.value}</span>{' '}
                <span className="text-cream-dim">{metric.label}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            {project.link && (
              <Link to={project.link}>
                <Button className="w-full justify-center">
                  View full case study <ArrowRight size={16} className="ml-2 inline" />
                </Button>
              </Link>
            )}
            {project.externalLink && (
              <a
                href={project.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#1e1e1a] text-gold-champagne hover:bg-gold-champagne hover:text-bg-void border border-gold-dim font-mono text-[0.7rem] tracking-[0.1em] uppercase transition-all duration-300 no-underline"
              >
                <ExternalLink size={14} />
                {project.badge || 'Open link'}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};
