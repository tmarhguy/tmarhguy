import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, CircuitBoard, Activity, ChevronDown, ArrowRight, FileText } from 'lucide-react';
import { ParticleBackground } from '../components/features/ParticleBackground';
import { MetricCard } from '../components/features/MetricCard';
import { ProjectCard } from '../components/features/ProjectCard';
import { ProjectPreviewModal, type ProjectPreviewData } from '../components/features/ProjectPreviewModal';
import { Button } from '../components/ui/Button';

const featuredProjects: ProjectPreviewData[] = [
  {
    tag: 'PROOF OF FIRST PRINCIPLES',
    title: '8-bit Discrete Transistor ALU',
    description: 'Designed and validated from first principles. Schematic → 4-layer PCB → physical bring-up → automated verification.',
    metrics: [
      { label: 'transistors • 19 ops', value: '3,488' },
      { label: 'test vectors', value: '1.24M' },
    ],
    link: '/projects/alu',
    externalLink: 'https://alu.tmarhguy.com',
    badge: 'Interactive 3D Viewer',
    image: '/images/alu-card.png',
  },
  {
    tag: 'SILICON IN FABRICATION',
    title: '16-bit MAC Unit (Sky130)',
    description: 'Machine-learning accelerator ASIC. Full RTL-to-GDS flow using OpenLane. Achieved 50 MHz timing closure with zero DRC/LVS violations.',
    metrics: [
      { label: 'die • Sky130 process', value: '0.11 mm²' },
      { label: 'status', value: 'In fabrication' },
    ],
    link: '/projects/mac-unit',
    badge: 'View Details',
    image: '/images/mac-card.png',
  },
  {
    tag: 'SYSTEM DEPLOYMENT',
    title: '64-bit RISC-V CPU (RV64IM)',
    description: '5-stage pipelined core with custom control logic. 96% ISA compliance. Running bare-metal C via UART bootloader on Artix-7 FPGA.',
    metrics: [
      { label: 'IPC', value: '1.82' },
      { label: 'clock', value: '125 MHz' },
    ],
    link: '/projects/riscv',
    badge: 'Architecture',
    image: '/images/riscv-card.png',
  },
];

export const Home = () => {
  const [docsOpen, setDocsOpen] = useState(false);
  const [previewProject, setPreviewProject] = useState<ProjectPreviewData | null>(null);
  const docsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (docsRef.current && !docsRef.current.contains(e.target as Node)) setDocsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Hero Section — responsive padding */}
      <section className="relative min-h-screen bg-transparent overflow-hidden flex flex-col items-center justify-center" style={{ paddingTop: 'clamp(80px, 15vw, 100px)', paddingBottom: 'clamp(24px, 5vw, 32px)' }}>
        <ParticleBackground />
        
        <div className="relative z-10 content-max-width flex flex-col items-center text-center" style={{ paddingLeft: 'clamp(1rem, 4vw, 1.5rem)', paddingRight: 'clamp(1rem, 4vw, 1.5rem)' }}>
          {/* Identity block */}
          <h1 className="text-hero text-text-primary mb-4 tracking-tight animate-in fade-in zoom-in duration-700">
            Tyrone Marhguy
          </h1>

          {/* Tagline — engineering leads */}
          <p className="text-lg md:text-xl text-cream font-display font-semibold leading-relaxed max-w-2xl mx-auto mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Designing compute systems from transistor to architecture.
          </p>

          {/* Credibility block — story + press */}
          <div className="flex flex-col items-center gap-3 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            <a
              href="https://en.wikipedia.org/wiki/Tyrone_Marhguy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm md:text-base text-cream-dim hover:text-gold-champagne transition-colors no-underline"
            >
              Won a constitutional case at 17. Featured in BBC, AP, VOA, DW.
            </a>
            <div
              className="flex flex-col items-center gap-1.5"
              title="Coverage from the landmark Ghanaian High Court ruling on religious freedom in education"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[0.58rem] text-cream-dim uppercase tracking-[0.25em]">As featured in</span>
                <Link to="/about#press" className="font-mono text-[0.5rem] text-gold-dim hover:text-gold-champagne transition-colors no-underline" title="Coverage from the landmark Ghanaian High Court ruling on religious freedom in education">
                  Why?
                </Link>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-5">
                 <a href="https://www.bbc.co.uk/programmes/p09k80yx" target="_blank" rel="noopener noreferrer" className="text-base font-display font-bold text-cream tracking-widest no-underline hover:text-gold-champagne transition-colors">BBC</a>
                 <span className="text-cream-dim text-xs">·</span>
                 <a href="https://apnews.com/article/africa-religion-education-ghana-186c67bd473f892c054e5d1f9368b555" target="_blank" rel="noopener noreferrer" className="text-base font-display font-bold text-cream tracking-widest no-underline hover:text-gold-champagne transition-colors">AP</a>
                 <span className="text-cream-dim text-xs">·</span>
                 <a href="https://www.voanews.com/a/rastafarian-teen-fights-to-keep-dreadlocks/6276979.html" target="_blank" rel="noopener noreferrer" className="text-base font-display font-bold text-cream tracking-widest no-underline hover:text-gold-champagne transition-colors">VOA</a>
                 <span className="text-cream-dim text-xs">·</span>
                 <a href="https://www.dw.com/en/ghana-rastafarians-start-school-after-court-victory/video-57864466" target="_blank" rel="noopener noreferrer" className="text-base font-display font-bold text-cream tracking-widest no-underline hover:text-gold-champagne transition-colors">DW</a>
                 <span className="text-cream-dim text-xs">·</span>
                 <a href="https://en.wikipedia.org/wiki/Tyrone_Marhguy" target="_blank" rel="noopener noreferrer" className="text-base font-display font-bold text-cream tracking-widest no-underline hover:text-gold-champagne transition-colors">Wikipedia</a>
              </div>
            </div>
          </div>

          {/* Context — school + location */}
          <div className="flex items-center gap-2 mb-12 text-xs font-mono text-cream-dim animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200" style={{ letterSpacing: '0.08em' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-champagne opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-champagne"></span>
            </span>
            Penn Engineering · Philadelphia, PA · Hardware Design
          </div>

          {/* Metrics block */}
          <div className="flex flex-col md:flex-row gap-5 justify-center mb-12 w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <MetricCard
              number="3,488"
              label="Transistors"
              sublabel="Hand-routed ALU"
              icon={<Cpu className="w-6 h-6" />}
              link="https://alu.tmarhguy.com"
            />
            <MetricCard
              number="Sky130"
              label="ASIC Tapeout"
              sublabel="16-bit MAC Unit"
              icon={<CircuitBoard className="w-6 h-6" />}
              link="/projects/mac-unit"
            />
            <MetricCard
              number="125 MHz"
              label="RISC-V CPU"
              sublabel="FPGA Production"
              icon={<Activity className="w-6 h-6" />}
              link="/projects/riscv"
            />
          </div>
          
          {/* CTA block */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 items-center">
            <Link to="/projects">
              <Button>View Projects <ArrowRight size={18} className="ml-2 inline" /></Button>
            </Link>
            <div className="relative" ref={docsRef}>
              <Button
                variant="secondary"
                onClick={() => setDocsOpen(!docsOpen)}
                className="inline-flex items-center gap-2"
              >
                <FileText size={16} /> Docs <ChevronDown size={14} className={`transition-transform duration-200 ${docsOpen ? 'rotate-180' : ''}`} />
              </Button>
              {docsOpen && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+0.5rem)] min-w-[200px] flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50"
                  style={{
                    background: 'rgba(10,10,8,0.95)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid #1e1e1a',
                    borderRadius: '3px',
                  }}
                >
                  <a
                    href="/Tyrone_Marhguy_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 font-mono text-[0.65rem] tracking-[0.1em] uppercase transition-colors duration-200 no-underline border-b border-border-subtle"
                    style={{ padding: '0.8rem 1.2rem', color: '#9e9282' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#1e1e1a'; e.currentTarget.style.color = '#c9a84c'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9e9282'; }}
                    onClick={() => setDocsOpen(false)}
                  >
                    <FileText size={14} /> Resume
                  </a>
                  <Link
                    to="/cover-letter"
                    className="flex items-center gap-3 font-mono text-[0.65rem] tracking-[0.1em] uppercase transition-colors duration-200 no-underline"
                    style={{ padding: '0.8rem 1.2rem', color: '#9e9282' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#1e1e1a'; e.currentTarget.style.color = '#c9a84c'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9e9282'; }}
                    onClick={() => setDocsOpen(false)}
                  >
                    <FileText size={14} /> Cover Letter
                  </Link>
                </div>
              )}
            </div>
          </div>


        </div>

        <div className="absolute bottom-10 animate-bounce text-gold-champagne/50">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Featured Work Section — responsive padding */}
      <section style={{ padding: 'clamp(3rem, 10vw, 6rem) 0', borderTop: '1px solid #1e1e1a' }}>
        <div className="content-max-width">
          <div className="text-center mb-16">
            <div className="font-mono text-[0.62rem] text-gold-champagne mb-4 tracking-[0.2em] uppercase">Portfolio</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">Featured Work</h2>
            <p className="text-body text-cream-dim max-w-2xl mx-auto">
              From discrete transistors to ASIC tapeout. Complete hardware designs with formal verification and physical validation.
            </p>
          </div>

          <div className="projects-grid-editorial max-w-7xl mx-auto">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.title}
                tag={project.tag}
                title={project.title}
                description={project.description}
                metrics={project.metrics}
                link={project.link ?? ''}
                externalLink={project.externalLink}
                badge={project.badge}
                image={project.image}
                onPreview={() => setPreviewProject(project)}
              />
            ))}
          </div>

          {previewProject && (
            <ProjectPreviewModal
              project={previewProject}
              onClose={() => setPreviewProject(null)}
            />
          )}

          <div className="text-center mt-16">
            <Link to="/projects">
              <Button variant="ghost">View All Projects <ArrowRight size={18} className="ml-2 inline" /></Button>
            </Link>
          </div>
        </div>
      </section>

    </>
  );
};
