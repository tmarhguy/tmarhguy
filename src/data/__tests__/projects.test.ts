import { describe, expect, it } from 'vitest';

import projects, {
  findProjectByTitle,
  getFeaturedProjects,
  getHardwareProjects,
  getMoreHardwareProjects,
  getProjectAnchorHrefByTitle,
  getProjectSlug,
  getResumeProjects,
  getSoftwareProjects,
  getToolsProjects,
} from '../projects';

describe('projects data', () => {
  it('exports an array of projects', () => {
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it('each project has required properties', () => {
    for (const project of projects) {
      expect(project).toHaveProperty('title');
      expect(project).toHaveProperty('date');
      expect(project).toHaveProperty('period');
      expect(project).toHaveProperty('desc');
      expect(project).toHaveProperty('tech');
      expect(project).toHaveProperty('category');

      expect(typeof project.title).toBe('string');
      expect(typeof project.date).toBe('string');
      expect(typeof project.period).toBe('string');
      expect(typeof project.desc).toBe('string');
      expect(Array.isArray(project.tech)).toBe(true);
    }
  });

  it('project titles are non-empty', () => {
    for (const project of projects) {
      expect(project.title.trim().length).toBeGreaterThan(0);
    }
  });

  it('project descriptions are non-empty', () => {
    for (const project of projects) {
      expect(project.desc.trim().length).toBeGreaterThan(0);
    }
  });

  it('dates are valid date strings', () => {
    for (const project of projects) {
      const date = new Date(project.date);
      expect(date.toString()).not.toBe('Invalid Date');
    }
  });

  it('links are valid URLs when present', () => {
    const urlRegex = /^https?:\/\/.+/;

    for (const project of projects) {
      if (project.link) {
        expect(project.link).toMatch(urlRegex);
      }
      if (project.site) {
        expect(project.site).toMatch(urlRegex);
      }
    }
  });

  it('featured projects have card images', () => {
    for (const project of projects.filter((entry) => entry.featured)) {
      expect(project.image?.startsWith('/')).toBe(true);
    }
  });

  it('has unique project titles', () => {
    const titles = projects.map((p) => p.title);
    const uniqueTitles = new Set(titles);

    expect(uniqueTitles.size).toBe(titles.length);
  });

  it('featured is boolean when present', () => {
    for (const project of projects) {
      if (project.featured !== undefined) {
        expect(typeof project.featured).toBe('boolean');
      }
    }
  });

  it('has three resume projects matching the hardware resume', () => {
    const resumeProjects = getResumeProjects();
    expect(resumeProjects).toHaveLength(3);
    expect(resumeProjects.map((project) => project.title).sort()).toEqual(
      [
        '100 Mbps UDP/IP Stack',
        'NASDAQ ITCH 5.0 Hardware Parser',
        'Tomato — Custom 32-Bit CPU',
      ].sort(),
    );
  });

  it('orders featured homepage projects by cracked-hardware rank', () => {
    expect(
      getFeaturedProjects().map((project) => getProjectSlug(project)),
    ).toEqual(['tomato', 'full-custom-sram', '100mbps-udp-ip-stack']);
  });

  it('includes hardware, tools, and software lanes from resume work', () => {
    expect(projects.length).toBeGreaterThanOrEqual(18);
    expect(getHardwareProjects().length).toBeGreaterThanOrEqual(8);
    expect(getToolsProjects().length).toBeGreaterThanOrEqual(3);
    expect(getSoftwareProjects().length).toBeGreaterThanOrEqual(6);
  });

  it('includes related analog, tooling, and bring-up work', () => {
    const titles = projects.map((project) => project.title);
    expect(titles).toContain('16×4 SRAM — Full-Custom Analog Design');
    expect(titles).toContain('8-bit Discrete Transistor ALU');
    expect(titles).toContain('8-Bit Ripple-Carry Adder — ESE 3700');
    expect(titles).toContain('QueuePaste');
    expect(titles).toContain('Mango Tools');
    expect(titles).toContain('YT2Spot');
    expect(titles).toContain('Music & You');
    expect(titles).toContain('Color Communication Game');
    expect(titles).toContain('64-bit RISC-V CPU (RV64IM)');
    expect(titles).toContain('UniBridge Ghana');
  });

  it('resolves homepage project mentions to anchored project rows', () => {
    expect(getProjectAnchorHrefByTitle('Tomato')).toBe('/projects/#tomato');
    expect(getProjectAnchorHrefByTitle('NASDAQ')).toBe(
      '/projects/#nasdaq-itch',
    );
    expect(getProjectAnchorHrefByTitle('SRAM')).toBe(
      '/projects/#full-custom-sram',
    );
    expect(getProjectAnchorHrefByTitle('Mango')).toBe('/projects/#mango-tools');
    expect(getProjectSlug(findProjectByTitle('Tomato')!)).toBe('tomato');
  });

  it('lists Tomato with both the live site and the GitHub repo', () => {
    const tomato = findProjectByTitle('Tomato')!;
    expect(tomato.site).toBe('https://tomato.tmarhguy.com');
    expect(tomato.link).toBe('https://github.com/tmarhguy/tomato');
  });

  it('maps portfolio projects with writing to log project ids', () => {
    const byTitle = Object.fromEntries(
      projects.map((project) => [project.title, project.logProject]),
    );

    expect(byTitle['Tomato — Custom 32-Bit CPU']).toBe('tomato');
    expect(byTitle['NASDAQ ITCH 5.0 Hardware Parser']).toBe('itch-hw');
    expect(byTitle['100 Mbps UDP/IP Stack']).toBe('udp-stack');
    expect(byTitle['Orange Metrics API']).toBe('orange');
    expect(byTitle['16-bit MAC Unit (Sky130)']).toBe('mac');
    expect(byTitle['8-bit Discrete Transistor ALU']).toBe('alu');
    expect(byTitle['Mango Tools']).toBe('mango');
    expect(byTitle['SPICE Automation Framework']).toBe('spice-automation');
    expect(byTitle['QueuePaste']).toBeUndefined();
  });

  it('partitions hardware, tools, and software without overlap', () => {
    const hardware = getHardwareProjects();
    const tools = getToolsProjects();
    const moreHardware = getMoreHardwareProjects();
    const software = getSoftwareProjects();

    expect(hardware.length + tools.length + software.length).toBe(
      projects.length,
    );
    expect(software.every((project) => project.category === 'software')).toBe(
      true,
    );
    expect(tools.every((project) => project.category === 'tools')).toBe(true);
    expect(hardware.every((project) => project.category === 'hardware')).toBe(
      true,
    );
    expect(moreHardware.length).toBe(
      hardware.length - getResumeProjects().length,
    );
  });
});
