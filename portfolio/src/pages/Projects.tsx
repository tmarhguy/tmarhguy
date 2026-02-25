import { useEffect, useState } from 'react';
import { ProjectCard } from '../components/features/ProjectCard';
import { ProjectPreviewModal, type ProjectPreviewData } from '../components/features/ProjectPreviewModal';
import { projectsList } from '../data/projects';
import { setCanonical, setDocumentTitle, setJsonLd, setMeta, setMetaProperty } from '../utils/seo';

type FilterType = 'all' | 'silicon' | 'software';

export const Projects = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [previewProject, setPreviewProject] = useState<ProjectPreviewData | null>(null);

  const siliconProjects = projectsList.filter(p => p.category === 'silicon');
  const softwareProjects = projectsList.filter(p => p.category === 'software');

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All Projects' },
    { key: 'silicon', label: `Silicon (${siliconProjects.length})` },
    { key: 'software', label: `Software (${softwareProjects.length})` },
  ];

  useEffect(() => {
    setDocumentTitle('Projects — RTL Design, ASIC Tapeout & FPGA Systems | Tyrone Marhguy');
    setMeta(
      'description',
      'Hardware projects by Tyrone Marhguy: 8-bit discrete transistor ALU (3,488 MOSFETs, 1.24M test vectors), BFloat16 MAC unit ASIC tapeout on Sky130 (50MHz, 0.11mm²), and 64-bit RISC-V CPU (100MHz Artix-7, 96% ISA compliance). Full RTL-to-silicon documentation.'
    );
    setMeta(
      'keywords',
      '8-bit ALU transistors, discrete transistor ALU, CMOS ALU from scratch, BFloat16 MAC unit, ML accelerator ASIC, Sky130 tapeout student, OpenLane flow, RISC-V CPU implementation, RV64IM pipeline, Artix-7 FPGA project, KiCad PCB hardware, hardware engineering projects, RTL design projects, ASIC student project, formal verification project, cocotb testbench, UVM verification'
    );
    setCanonical('https://tmarhguy.com/projects');

    setMetaProperty(
      'og:title',
      'Hardware Projects — Discrete ALU · ASIC Tapeout · RISC-V CPU | Tyrone Marhguy'
    );
    setMetaProperty(
      'og:description',
      'From 3,488 discrete MOSFETs to a taped-out ASIC on Sky130. Full project documentation including schematics, RTL, verification results, and GDS files.'
    );
    setMetaProperty('og:image', 'https://tmarhguy.com/images/alu-card.png');
    setMetaProperty('og:url', 'https://tmarhguy.com/projects');

    setMeta(
      'twitter:title',
      'Hardware Projects — Discrete ALU · ASIC Tapeout · RISC-V | Tyrone Marhguy'
    );
    setMeta(
      'twitter:description',
      '3,488-transistor ALU. BFloat16 MAC tapeout on Sky130. 64-bit RISC-V at 100MHz. Full documentation.'
    );
    setMeta('twitter:image', 'https://tmarhguy.com/images/alu-card.png');

    setJsonLd('projects-collection-schema', {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Hardware Engineering Projects — Tyrone Marhguy',
      url: 'https://tmarhguy.com/projects',
      description:
        'A collection of hardware engineering projects by Tyrone Iras Marhguy including discrete transistor logic, ASIC physical design, and FPGA processor implementation.',
      author: { '@type': 'Person', name: 'Tyrone Iras Marhguy' },
      hasPart: [
        {
          '@type': 'CreativeWork',
          name: '8-Bit Discrete Transistor ALU',
          url: 'https://tmarhguy.com/projects/alu',
          description:
            'An 8-bit arithmetic logic unit built from 3,488 discrete CMOS MOSFETs, routed on a 4-layer KiCad PCB, validated with 1.24M automated test vectors and formal verification.',
          keywords: 'discrete transistor ALU, CMOS logic, KiCad PCB, formal verification, SymbiYosys',
        },
        {
          '@type': 'CreativeWork',
          name: '16-Bit BFloat16 MAC Unit — ASIC Tapeout (Sky130)',
          url: 'https://tmarhguy.com/projects/mac-unit',
          description:
            'A BFloat16 multiply-accumulate unit for ML inference hardened via OpenLane RTL-to-GDS flow on Skywater 130nm. 50MHz timing closure, zero DRC/LVS violations, 0.11mm² footprint.',
          keywords: 'BFloat16 MAC, ASIC tapeout, Sky130, OpenLane, RTL to GDS, ML accelerator',
        },
        {
          '@type': 'CreativeWork',
          name: '64-Bit RISC-V CPU Core (IronCore)',
          url: 'https://tmarhguy.com/projects/riscv',
          description:
            'RV64IM 5-stage pipelined processor with full data forwarding, hazard detection, and custom UART bootloader. 100MHz on Artix-7 FPGA, 96% ISA compliance.',
          keywords: 'RISC-V, RV64IM, 5-stage pipeline, FPGA, Artix-7, UART bootloader',
        },
      ],
    });
  }, []);

  return (
    <div className="min-h-screen bg-bg-void" style={{ paddingTop: '60px' }}>
      
      {/* Hero */}
      <section className="text-center section-padding" style={{ borderBottom: '1px solid #1e1e1a' }}>
        <div className="eyebrow mb-3 justify-center animate-in fade-in duration-700">Portfolio</div>
        <h1 className="font-display font-bold text-4xl md:text-5xl text-text-primary mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          Projects
        </h1>
        <p className="text-[1.05rem] text-cream-dim leading-relaxed max-w-2xl mx-auto mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          Hardware designs from transistor-level to ASIC tapeout, plus full-stack systems demonstrating performance optimization and verification rigor.
        </p>

        {/* Filter Toggle */}
        <div className="flex gap-0 border border-border-subtle overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 w-fit mx-auto" style={{ borderRadius: '3px' }}>
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="font-mono text-[0.7rem] tracking-[0.12em] uppercase transition-all duration-200 cursor-pointer"
              style={{
                padding: '0.5rem 1.2rem',
                color: filter === f.key ? '#0a0a08' : '#9e9282',
                background: filter === f.key ? '#c9a84c' : 'transparent',
                border: 'none',
              }}
              onMouseEnter={(e) => { if (filter !== f.key) { e.currentTarget.style.color = '#f0e8d5'; e.currentTarget.style.background = '#1e1e1a'; } }}
              onMouseLeave={(e) => { if (filter !== f.key) { e.currentTarget.style.color = '#9e9282'; e.currentTarget.style.background = 'transparent'; } }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Silicon Projects */}
      {(filter === 'all' || filter === 'silicon') && (
        <section className="section-padding" style={{ borderBottom: '1px solid #1e1e1a' }}>
          <div className="content-max-width mx-auto">
            <div className="section-title-editorial justify-center">Silicon Projects</div>
            <div className="projects-grid-editorial max-w-5xl mx-auto">
              {siliconProjects.map((p) => (
                <ProjectCard
                  key={p.id}
                  tag={p.tag}
                  title={p.title}
                  description={p.cardDescription}
                  metrics={p.metrics}
                  link={`/projects/${p.id}`}
                  externalLink={p.cardExternalLink}
                  badge={p.cardBadge}
                  image={p.image}
                  onPreview={() =>
                    setPreviewProject({
                      tag: p.tag,
                      title: p.title,
                      description: p.cardDescription,
                      metrics: p.metrics,
                      image: p.image,
                      link: `/projects/${p.id}`,
                      externalLink: p.cardExternalLink,
                      badge: p.cardBadge,
                    })
                  }
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Software Projects */}
      {(filter === 'all' || filter === 'software') && (
        <section className="section-padding" style={{ borderBottom: '1px solid #1e1e1a' }}>
          <div className="content-max-width mx-auto">
            <div className="section-title-editorial justify-center">Software & Systems</div>
            <div className="projects-grid-editorial max-w-5xl mx-auto">
              {softwareProjects.map((p) => (
                <ProjectCard
                  key={p.id}
                  tag={p.tag}
                  title={p.title}
                  description={p.cardDescription}
                  metrics={p.metrics}
                  link={`/projects/${p.id}`}
                  externalLink={p.cardExternalLink}
                  badge={p.cardBadge}
                  image={p.image}
                  onPreview={() =>
                    setPreviewProject({
                      tag: p.tag,
                      title: p.title,
                      description: p.cardDescription,
                      metrics: p.metrics,
                      image: p.image,
                      link: `/projects/${p.id}`,
                      externalLink: p.cardExternalLink,
                      badge: p.cardBadge,
                    })
                  }
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {previewProject && (
        <ProjectPreviewModal
          project={previewProject}
          onClose={() => setPreviewProject(null)}
        />
      )}
    </div>
  );
};
