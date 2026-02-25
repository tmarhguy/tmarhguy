import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Github, Linkedin, Twitter, Instagram, Facebook, Mail, ChevronDown, FileText } from 'lucide-react';
import { useIsMobile } from '../../hooks/useMediaQuery';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/verification', label: 'Verification' },
  { to: '/about', label: 'About' },
];

const docsLinks = [
  { href: '/Tyrone_Marhguy_Resume.pdf', label: 'Resume', external: true },
  { href: '/cover-letter', label: 'Cover Letter', external: false },
  { href: '/certifications', label: 'Certifications', external: false },
];

const socialLinks = [
  { href: 'https://github.com/tmarhguy', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com/in/tmarhguy', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://en.wikipedia.org/wiki/Tyrone_Marhguy', icon: WikipediaIcon, label: 'Wikipedia' },
  { href: 'https://twitter.com/tmarhguy', icon: Twitter, label: 'Twitter / X' },
  { href: 'https://instagram.com/tmarhguy', icon: Instagram, label: 'Instagram' },
  { href: 'https://tmarhguy.substack.com', icon: SubstackIcon, label: 'Substack' },
  { href: 'https://facebook.com/tmarhguy', icon: Facebook, label: 'Facebook' },
];

/* Custom Substack Icon */
function SubstackIcon({ size = 16, ...props }: { size?: number; [key: string]: unknown }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      {...props}
    >
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  );
}

/* Wikipedia "W" icon — lucide doesn't have one */
function WikipediaIcon({ size = 16, ...props }: { size?: number; [key: string]: unknown }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 4h2l4.5 13L12 9l2.5 8L19 4h2" />
    </svg>
  );
}

export const Navigation = () => {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const location = useLocation();
  const contactRef = useRef<HTMLDivElement>(null);
  const docsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(event.target as Node)) {
        setIsContactOpen(false);
      }
      if (docsRef.current && !docsRef.current.contains(event.target as Node)) {
        setIsDocsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change (deferred to satisfy set-state-in-effect lint)
  useEffect(() => {
    const id = setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsContactOpen(false);
      setIsDocsOpen(false);
    }, 0);
    return () => clearTimeout(id);
  }, [location.pathname]);

  // Close mobile menu when switching to desktop (e.g. window resize)
  useEffect(() => {
    if (!isMobile) setIsMobileMenuOpen(false);
  }, [isMobile]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        paddingTop: isScrolled ? '1rem' : '1.4rem',
        paddingBottom: isScrolled ? '1rem' : '1.4rem',
        paddingLeft: 'max(env(safe-area-inset-left), clamp(1rem, 4vw, 3rem))',
        paddingRight: 'max(env(safe-area-inset-right), clamp(1rem, 4vw, 3rem))',
        background: 'rgba(10,10,8,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid #1e1e1a',
      }}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="font-mono text-[0.75rem] tracking-[0.2em] uppercase no-underline transition-colors duration-200"
          style={{ color: location.pathname === '/' ? '#c9a84c' : '#9e9282' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#c9a84c'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = location.pathname === '/' ? '#c9a84c' : '#9e9282'; }}
        >
          Tyrone Marhguy
        </Link>

        {/* Desktop: Page nav + Social icons — only when NOT mobile */}
        {!isMobile && (
        <div className="flex items-center gap-4">
          {/* Page nav pills + Docs dropdown */}
          <div className="flex items-center gap-0 border border-border-subtle overflow-visible" style={{ borderRadius: '3px' }}>
            {navLinks.map((link) => {
              const isActive = link.to === '/' ? location.pathname === '/' : (location.pathname === link.to || (link.to === '/projects' && location.pathname.startsWith('/projects')));
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="font-mono text-[0.7rem] tracking-[0.12em] uppercase transition-all duration-200 no-underline"
                  style={{
                    padding: '0.5rem 1.2rem',
                    color: isActive ? '#0a0a08' : '#9e9282',
                    background: isActive ? '#c9a84c' : 'transparent',
                  }}
                  onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.color = '#f0e8d5'; e.currentTarget.style.background = '#1e1e1a'; } }}
                  onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.color = '#9e9282'; e.currentTarget.style.background = 'transparent'; } }}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="relative border-l border-border-subtle" ref={docsRef}>
              <button
                onClick={() => setIsDocsOpen(!isDocsOpen)}
                className="font-mono text-[0.7rem] tracking-[0.12em] uppercase transition-all duration-200 flex items-center gap-1.5 cursor-pointer outline-none w-full"
                style={{
                  padding: '0.5rem 1.2rem',
                  color: isDocsOpen || location.pathname === '/cover-letter' || location.pathname === '/certifications' ? '#0a0a08' : '#9e9282',
                  background: isDocsOpen || location.pathname === '/cover-letter' || location.pathname === '/certifications' ? '#c9a84c' : 'transparent',
                }}
                onMouseEnter={(e) => { if (!isDocsOpen && location.pathname !== '/cover-letter' && location.pathname !== '/certifications') { e.currentTarget.style.color = '#f0e8d5'; e.currentTarget.style.background = '#1e1e1a'; } }}
                onMouseLeave={(e) => { if (!isDocsOpen && location.pathname !== '/cover-letter' && location.pathname !== '/certifications') { e.currentTarget.style.color = '#9e9282'; e.currentTarget.style.background = 'transparent'; } }}
              >
                Docs <ChevronDown size={14} className={`transition-transform duration-200 ${isDocsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDocsOpen && (
                <div
                  className="absolute left-0 top-[calc(100%+0.25rem)] min-w-[200px] flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50"
                  style={{
                    background: 'rgba(10,10,8,0.95)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid #1e1e1a',
                    borderRadius: '3px',
                  }}
                >
                  {docsLinks.map((doc) =>
                    doc.external ? (
                      <a
                        key={doc.label}
                        href={doc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 font-mono text-[0.65rem] tracking-[0.1em] uppercase transition-colors duration-200 no-underline"
                        style={{ padding: '0.8rem 1.2rem', color: '#9e9282' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#1e1e1a'; e.currentTarget.style.color = '#c9a84c'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9e9282'; }}
                      >
                        <FileText size={14} /> {doc.label}
                      </a>
                    ) : (
                      <Link
                        key={doc.label}
                        to={doc.href}
                        className="flex items-center gap-3 font-mono text-[0.65rem] tracking-[0.1em] uppercase transition-colors duration-200 no-underline"
                        style={{ padding: '0.8rem 1.2rem', color: '#9e9282' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#1e1e1a'; e.currentTarget.style.color = '#c9a84c'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9e9282'; }}
                        onClick={() => setIsDocsOpen(false)}
                      >
                        <FileText size={14} /> {doc.label}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Separator */}
          <div style={{ width: '1px', height: '18px', background: '#1e1e1a' }} />

          {/* Connect Dropdown */}
          <div className="relative" ref={contactRef}>
            <button
              onClick={() => setIsContactOpen(!isContactOpen)}
              className="font-mono text-[0.7rem] tracking-[0.12em] uppercase transition-all duration-200 flex items-center gap-1.5 cursor-pointer outline-none"
              style={{
                padding: '0.5rem 1.2rem',
                color: isContactOpen ? '#c9a84c' : '#9e9282',
                background: isContactOpen ? '#1e1e1a' : 'transparent',
                borderRadius: '3px',
                border: '1px solid',
                borderColor: isContactOpen ? '#1e1e1a' : 'transparent',
              }}
              onMouseEnter={(e) => { if (!isContactOpen) { e.currentTarget.style.color = '#f0e8d5'; e.currentTarget.style.background = '#1e1e1a'; } }}
              onMouseLeave={(e) => { if (!isContactOpen) { e.currentTarget.style.color = '#9e9282'; e.currentTarget.style.background = 'transparent'; } }}
            >
              Connect <ChevronDown size={14} className={`transition-transform duration-200 ${isContactOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isContactOpen && (
              <div 
                className="absolute right-0 top-[calc(100%+0.5rem)] min-w-[180px] flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                style={{
                  background: 'rgba(10,10,8,0.95)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid #1e1e1a',
                  borderRadius: '3px',
                }}
              >
                <a 
                  href="mailto:tmarhguy@seas.upenn.edu"
                  className="flex items-center gap-3 font-mono text-[0.65rem] tracking-[0.1em] uppercase transition-colors duration-200 no-underline border-b border-border-subtle"
                  style={{ padding: '0.8rem 1.2rem', color: '#f0e8d5' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#1e1e1a'; e.currentTarget.style.color = '#c9a84c'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#f0e8d5'; }}
                >
                  <Mail size={14} /> Email
                </a>
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 font-mono text-[0.65rem] tracking-[0.1em] uppercase transition-colors duration-200 no-underline"
                    style={{ padding: '0.8rem 1.2rem', color: '#9e9282' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#1e1e1a'; e.currentTarget.style.color = '#c9a84c'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9e9282'; }}
                  >
                    <social.icon size={14} /> {social.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        )}

        {/* Mobile Menu Button — only render when isMobile (never on desktop) */}
        {isMobile && (
        <button
          className="touch-target -mr-2"
          style={{ color: '#f0e8d5' }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        )}
      </div>

      {/* Mobile Menu — only when hamburger exists and is open */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="absolute top-full left-0 right-0 flex flex-col gap-0 border-b border-border-subtle"
          style={{ background: 'rgba(10,10,8,0.95)', backdropFilter: 'blur(16px)' }}
        >
          {navLinks.map((link) => {
            const isActive = link.to === '/' ? location.pathname === '/' : (location.pathname === link.to || (link.to === '/projects' && location.pathname.startsWith('/projects')));
            return (
              <Link
                key={link.to}
                to={link.to}
                className="font-mono text-[0.8rem] tracking-[0.15em] uppercase border-b border-border-subtle no-underline"
                style={{ padding: '1.2rem 2rem', color: isActive ? '#c9a84c' : '#9e9282' }}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="flex flex-col border-b border-border-subtle">
            <div className="font-mono text-[0.6rem] tracking-[0.2em] text-gold-dim uppercase border-b border-border-subtle" style={{ padding: '1.2rem 2rem 0.6rem' }}>
              Docs
            </div>
            {docsLinks.map((doc) =>
              doc.external ? (
                <a
                  key={doc.label}
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 font-mono text-[0.8rem] tracking-[0.15em] uppercase border-b border-border-subtle no-underline"
                  style={{ padding: '1.0rem 2rem', color: '#9e9282' }}
                >
                  <FileText size={16} /> {doc.label}
                </a>
              ) : (
                <Link
                  key={doc.label}
                  to={doc.href}
                  className="flex items-center gap-4 font-mono text-[0.8rem] tracking-[0.15em] uppercase border-b border-border-subtle no-underline"
                  style={{ padding: '1.0rem 2rem', color: '#9e9282' }}
                >
                  <FileText size={16} /> {doc.label}
                </Link>
              )
            )}
          </div>
          {/* Mobile Contact Section */}
          <div className="flex flex-col border-b border-border-subtle pb-4">
            <div className="font-mono text-[0.6rem] tracking-[0.2em] text-gold-dim uppercase border-b border-border-subtle" style={{ padding: '1.2rem 2rem 0.6rem' }}>
              Connect
            </div>
            <a
              href="mailto:tmarhguy@seas.upenn.edu"
              className="flex items-center gap-4 font-mono text-[0.8rem] tracking-[0.15em] uppercase border-b border-border-subtle no-underline"
              style={{ padding: '1.0rem 2rem', color: '#f0e8d5' }}
            >
              <Mail size={16} /> Email
            </a>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 font-mono text-[0.8rem] tracking-[0.15em] uppercase border-b border-border-subtle no-underline"
                style={{ padding: '1.0rem 2rem', color: '#9e9282' }}
              >
                <social.icon size={16} /> {social.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
