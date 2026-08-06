import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { projectsData } from '../data/projects';
import { ALUViralGallery } from '../components/features/ALUViralGallery';
import { setCanonical, setDocumentTitle, setJsonLd, setMeta, setMetaProperty } from '../utils/seo';

export const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = id ? projectsData[id] : undefined;
  const baseUrl = 'https://tmarhguy.com';
  const projectUrl = project ? `${baseUrl}/projects/${project.id}` : '';
  const ogImage = project ? `${baseUrl}${project.image}` : '';

  useEffect(() => {
    if (!project) return;
    // Common SEO for all projects
    setDocumentTitle(`${project.title} — ${project.subtitle} | Tyrone Marhguy`);
    setMeta('description', project.subtitle);
    setMeta('keywords', project.techStack.join(', '));
    setCanonical(projectUrl);
    setMetaProperty('og:title', `${project.title} | Tyrone Marhguy`);
    setMetaProperty('og:description', project.subtitle);
    setMetaProperty('og:image', ogImage);
    setMetaProperty('og:url', projectUrl);
    setMeta('twitter:title', `${project.title} | Tyrone Marhguy`);
    setMeta('twitter:description', project.subtitle);
    setMeta('twitter:image', ogImage);

    // ALU-specific: extended SEO + JSON-LD
    if (project.id === 'alu') {
      setDocumentTitle('8-Bit Discrete Transistor ALU — 3,488 MOSFETs, Formally Verified | Tyrone Marhguy');
      setMeta(
        'description',
        'Complete documentation of an 8-bit ALU built from 3,488 discrete CMOS MOSFETs in a university dorm room. 4-layer KiCad PCB, 76 logic gates, 400ns propagation delay, 1.24M exhaustive test vectors, SymbiYosys formal verification, and Sky130 GDS tapeout via TinyTapeout.'
      );
      setMetaProperty(
        'og:title',
        '8-Bit Discrete Transistor ALU — Built from 3,488 MOSFETs | Tyrone Marhguy'
      );
      setMetaProperty(
        'og:description',
        'Full build log: schematic design, 4-layer PCB routing, oscilloscope bring-up, 1.24M test vectors, formal proofs, and Sky130 tapeout. 41 GitHub stars. Fabrication sponsored.'
      );
      setMeta('twitter:title', '8-Bit Discrete Transistor ALU — Built from 3,488 MOSFETs | Tyrone Marhguy');
      setMeta(
        'twitter:description',
        'Full build log: schematic design, 4-layer PCB routing, oscilloscope bring-up, 1.24M test vectors, formal proofs, and Sky130 tapeout.'
      );

      setJsonLd('alu-tech-article-schema', {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: '8-Bit Discrete Transistor ALU — Built from 3,488 MOSFETs',
        description:
          'Complete design documentation for an 8-bit arithmetic logic unit built from 3,488 discrete CMOS MOSFETs, including schematic, PCB layout, bring-up log, verification results, and ASIC tapeout.',
        url: projectUrl,
        image: ogImage,
        author: { '@type': 'Person', name: 'Tyrone Iras Marhguy' },
        datePublished: '2026-01-01',
        dateModified: '2026-02-01',
        keywords: 'ALU, CMOS, discrete transistor, PCB design, formal verification, KiCad, Sky130, TinyTapeout',
        technicalAudience: 'Hardware Engineers, RTL Designers, VLSI Students',
        proficiencyLevel: 'Expert',
      });

      setJsonLd('alu-breadcrumbs-schema', {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tmarhguy.com' },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://tmarhguy.com/projects' },
          { '@type': 'ListItem', position: 3, name: '8-Bit ALU', item: projectUrl },
        ],
      });

      setJsonLd('alu-source-code-schema', {
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: '8-Bit Discrete Transistor ALU',
        description:
          'Complete hardware design files for an 8-bit ALU built from 3,488 discrete CMOS MOSFETs. Includes KiCad schematics, PCB layout, Verilog RTL, cocotb testbenches, SymbiYosys formal verification proofs, and Sky130 GDS tapeout.',
        url: 'https://github.com/tmarhguy/alu',
        codeRepository: 'https://github.com/tmarhguy/alu',
        programmingLanguage: ['Verilog', 'SystemVerilog', 'Python', 'Tcl'],
        runtimePlatform: 'KiCad, OpenLane, Verilator, cocotb, SymbiYosys',
        author: { '@type': 'Person', name: 'Tyrone Iras Marhguy' },
        license: 'https://opensource.org/licenses/MIT',
        keywords: 'ALU, discrete transistor, CMOS, PCB, FPGA, ASIC, formal verification',
      });
    }
  }, [project, projectUrl, ogImage]);

  if (!id || !project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="min-h-screen bg-bg-void" style={{ paddingTop: '60px' }}>
      
      {/* Hero */}
      <section className="text-center section-padding" style={{ borderBottom: '1px solid #1e1e1a' }}>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 font-mono text-[0.72rem] text-gold-champagne hover:text-gold-bright tracking-[0.15em] uppercase no-underline transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back to Projects
        </Link>

        <div className="eyebrow mb-6 justify-center">{project.tag}</div>
        <h1 className="text-hero text-text-primary mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {project.title}
        </h1>
        <p className="text-[1.05rem] text-cream-dim leading-relaxed max-w-[620px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          {project.subtitle}
        </p>
      </section>

      <div className="content-max-width mx-auto">
        {/* Tech Stack — centered */}
        <div className="flex flex-wrap gap-2 py-6 justify-center" style={{ borderBottom: '1px solid #1e1e1a' }}>
          {project.techStack.map(tech => (
            <span key={tech} className="font-mono text-[0.72rem] text-cream-dim tracking-[0.08em] bg-bg-deep border border-border-subtle" style={{ padding: '0.35rem 0.75rem' }}>
              {tech}
            </span>
          ))}
        </div>

        {/* Metrics — centered grid */}
        <div className="flex flex-wrap gap-8 justify-center py-8" style={{ borderBottom: '1px solid #1e1e1a' }}>
          {project.metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="text-metric text-2xl mb-1">
                {metric.value}
              </div>
              <div className="font-mono text-[0.58rem] text-cream-dim tracking-[0.12em] uppercase">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Content sections — centered */}
        <div className="max-w-3xl mx-auto">
          {project.content.map((section, idx) => (
            <div key={idx} className="text-center" style={{ padding: '2rem 0', borderBottom: '1px solid #1e1e1a' }}>
              <div className="font-mono text-[0.65rem] text-gold-dim tracking-[0.2em] uppercase mb-2">
                {String(idx + 1).padStart(2, '0')}
              </div>
              <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
                {section.title}
              </h2>
              <p className="text-[0.95rem] text-cream-dim leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* Resources — centered */}
        <div className="flex flex-wrap gap-6 justify-center py-8">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-cream-dim hover:text-text-primary transition-colors no-underline group">
              <div className="p-2 bg-bg-deep border border-border-subtle group-hover:border-gold-dim transition-colors">
                <Github size={16} />
              </div>
              <span className="font-mono text-[0.72rem] tracking-[0.08em] uppercase">View Source Code</span>
            </a>
          )}
          
          {project.liveUrl && project.id !== 'alu' && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-cream-dim hover:text-text-primary transition-colors no-underline group">
              <div className="p-2 bg-bg-deep border border-border-subtle group-hover:border-gold-dim transition-colors">
                <ExternalLink size={16} />
              </div>
              <span className="font-mono text-[0.72rem] tracking-[0.08em] uppercase">Live Demonstration</span>
            </a>
          )}

          {project.liveUrl && project.id === 'alu' && (
             <div className="w-full flex justify-center mt-2 mb-4">
               <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 px-10 py-5 bg-[#c9a84c] text-[#0a0a08] hover:bg-[#e0c56a] transition-all duration-300 no-underline group shadow-[0_0_30px_rgba(201,168,76,0.2)] hover:shadow-[0_0_45px_rgba(201,168,76,0.35)] hover:-translate-y-1 rounded-[2px]">
                 <ExternalLink size={24} />
                 <div className="flex flex-col text-left">
                   <span className="font-display font-bold text-[1.2rem] tracking-wide leading-tight">Interactive 3D Website</span>
                   <span className="font-mono text-[0.65rem] tracking-[0.15em] opacity-80 uppercase mt-0.5">Explore the dorm-room project directly</span>
                 </div>
               </a>
             </div>
          )}

          {!project.githubUrl && !project.liveUrl && (
            <div className="text-[0.82rem] text-cream-dim italic text-center">
              Source code and documentation available upon request during technical interviews.
            </div>
          )}
        </div>
      </div>

      {/* Conditionally render ALU gallery */}
      {project.id === 'alu' && <ALUViralGallery />}
    </div>
  );
};
