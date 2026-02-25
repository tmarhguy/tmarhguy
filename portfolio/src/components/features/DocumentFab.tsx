import { useState, useEffect } from 'react';
import { FileText, X, Download, ExternalLink } from 'lucide-react';

/*
 * ─── DOCUMENT URLS ─────────────────────────────────────
 * Update these URLs anytime — no redeploy needed if hosted externally.
 *
 * GOOGLE DRIVE:
 *   1. Upload your PDF to Google Drive
 *   2. Right-click → Share → "Anyone with the link"
 *   3. Copy the file ID from the share link
 *   4. Use: https://drive.google.com/file/d/FILE_ID/preview  (embed)
 *      Or:  https://drive.google.com/uc?export=download&id=FILE_ID  (direct download)
 *
 * GITHUB:
 *   1. Push your PDF to a repo (e.g. github.com/tmarhguy/resume/blob/main/resume.pdf)
 *   2. Use the raw URL: https://raw.githubusercontent.com/tmarhguy/resume/main/resume.pdf
 *
 * For now, these point to your GitHub. Replace with your actual file URLs.
 * ────────────────────────────────────────────────────────
 */
const DOCUMENTS = {
  resume: {
    title: 'Resume',
    subtitle: 'PDF · Hardware Engineering Focus',
    url: '/Tyrone_Marhguy_Resume.pdf',
  },
  coverLetter: {
    title: 'Cover Letter',
    subtitle: 'PDF · Tailored Professional Introduction',
    url: '/Tyrone_Marhguy_Cover_Letter.pdf',
  },
};

export const DocumentFab = () => {
  const [isOpen, setIsOpen] = useState(false);

  /* Lock body scroll when overlay is open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Floating Action Button — bottom-right, glowing gold, safe area aware */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed z-40 flex items-center justify-center transition-all duration-300 cursor-pointer group"
        style={{
          bottom: 'max(env(safe-area-inset-bottom), 1.5rem)',
          right: 'max(env(safe-area-inset-right), 1.5rem)',
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #c9a84c 0%, #8a6e2f 100%)',
          border: 'none',
          boxShadow: '0 0 20px rgba(201,168,76,0.4), 0 0 40px rgba(201,168,76,0.15)',
          animation: 'fabGlow 2.5s ease-in-out infinite',
        }}
        title="Resume & Cover Letter"
        aria-label="Open resume and cover letter"
      >
        <FileText size={22} style={{ color: '#0a0a08' }} className="group-hover:scale-110 transition-transform" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(10,10,8,0.92)', backdropFilter: 'blur(12px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false); }}
        >
          <div
            className="relative w-full max-w-md animate-in fade-in zoom-in-95 duration-300"
            style={{ padding: '0 1.5rem' }}
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-0 right-8 transition-colors cursor-pointer"
              style={{ color: '#9e9282', border: 'none', background: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#c9a84c'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#9e9282'; }}
            >
              <X size={24} />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="eyebrow mb-4 justify-center">Documents</div>
              <h2 className="font-display text-3xl font-bold text-text-primary">
                Get My <em className="italic text-gold-champagne">Documents</em>
              </h2>
            </div>

            {/* Document Cards */}
            <div className="flex flex-col gap-3">
              {/* Resume */}
              <a
                href={DOCUMENTS.resume.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 no-underline transition-all duration-200"
                style={{
                  padding: '1.2rem 1.5rem',
                  background: '#111110',
                  border: '1px solid #1e1e1a',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#c9a84c'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1e1e1a'; }}
              >
                <div
                  className="shrink-0 flex items-center justify-center"
                  style={{
                    width: '42px',
                    height: '42px',
                    background: 'rgba(201,168,76,0.1)',
                    border: '1px solid rgba(201,168,76,0.25)',
                  }}
                >
                  <FileText size={20} style={{ color: '#c9a84c' }} />
                </div>
                <div className="flex-1">
                  <div className="font-display text-base font-bold text-text-primary mb-0.5 group-hover:text-gold-champagne transition-colors">
                    {DOCUMENTS.resume.title}
                  </div>
                  <div className="font-mono text-[0.62rem] text-cream-dim tracking-[0.08em]">
                    {DOCUMENTS.resume.subtitle}
                  </div>
                </div>
                <Download size={16} style={{ color: '#9e9282' }} className="group-hover:text-gold-champagne shrink-0" />
              </a>

              {/* Cover Letter */}
              <a
                href={DOCUMENTS.coverLetter.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 no-underline transition-all duration-200"
                style={{
                  padding: '1.2rem 1.5rem',
                  background: '#111110',
                  border: '1px solid #1e1e1a',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#c9a84c'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1e1e1a'; }}
              >
                <div
                  className="shrink-0 flex items-center justify-center"
                  style={{
                    width: '42px',
                    height: '42px',
                    background: 'rgba(201,168,76,0.1)',
                    border: '1px solid rgba(201,168,76,0.25)',
                  }}
                >
                  <ExternalLink size={20} style={{ color: '#c9a84c' }} />
                </div>
                <div className="flex-1">
                  <div className="font-display text-base font-bold text-text-primary mb-0.5 group-hover:text-gold-champagne transition-colors">
                    {DOCUMENTS.coverLetter.title}
                  </div>
                  <div className="font-mono text-[0.62rem] text-cream-dim tracking-[0.08em]">
                    {DOCUMENTS.coverLetter.subtitle}
                  </div>
                </div>
                <Download size={16} style={{ color: '#9e9282' }} className="group-hover:text-gold-champagne shrink-0" />
              </a>
            </div>

            {/* Footer note */}
            <p className="text-center font-mono text-[0.6rem] text-cream-dim tracking-[0.1em] uppercase mt-6">
              Click outside or press ✕ to close
            </p>
          </div>
        </div>
      )}

      {/* Keyframe animation for the glow pulse */}
      <style>{`
        @keyframes fabGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(201,168,76,0.4), 0 0 40px rgba(201,168,76,0.15);
          }
          50% {
            box-shadow: 0 0 28px rgba(201,168,76,0.6), 0 0 56px rgba(201,168,76,0.25);
          }
        }
      `}</style>
    </>
  );
};
