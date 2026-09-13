import { describe, expect, it } from 'vitest';

import projects, {
  findProjectByTitle,
  getEarlierProjects,
  getFeaturedProjects,
  getHardwareProjects,
  getHiddenProjects,
  getHomeFeaturedItems,
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
        'Tomato — Discrete 32-bit Polymorphic Dual-LUT3 CPU',
      ].sort(),
    );
  });

  it('orders featured homepage projects by cracked-hardware rank', () => {
    expect(
      getFeaturedProjects().map((project) => getProjectSlug(project)),
    ).toEqual(['mac', '100mbps-udp-ip-stack', 'full-custom-sram']);
  });

  it('leads the homepage strip with open source, then MAC and UDP', () => {
    expect(getHomeFeaturedItems().map((item) => item.title)).toEqual([
      'Open source EDA',
      '16-bit MAC Unit (Sky130)',
      '100 Mbps UDP/IP Stack',
      '16×4 SRAM — Full-Custom Analog Design',
    ]);
    expect(getHomeFeaturedItems()[0]?.image).toBe(
      '/images/open-source/librelane1015.png',
    );
    expect(getHomeFeaturedItems()[0]?.desc).toMatch(/3\.0\.8 and 3\.0\.10/);
  });

  it('features the MAC layout preview on the homepage', () => {
    const mac = getFeaturedProjects().find(
      (project) => getProjectSlug(project) === 'mac',
    );
    expect(mac?.image).toBe('/images/projects/mac-core.webp');
  });

  it('curates hardware order: MAC up top, UDP and ITCH never adjacent', () => {
    const slugs = getHardwareProjects().map((project) =>
      getProjectSlug(project),
    );
    expect(slugs.slice(0, 3)).toEqual([
      'tomato',
      'mac',
      '100mbps-udp-ip-stack',
    ]);
    const udpIndex = slugs.indexOf('100mbps-udp-ip-stack');
    const itchIndex = slugs.indexOf('nasdaq-itch');
    expect(udpIndex).toBeGreaterThanOrEqual(0);
    expect(itchIndex).toBeGreaterThanOrEqual(0);
    expect(Math.abs(udpIndex - itchIndex)).toBeGreaterThan(1);
  });

  it('keeps the full history in data while curating the wall', () => {
    expect(projects.length).toBeGreaterThanOrEqual(18);
    expect(getHardwareProjects()).toHaveLength(9);
    expect(getToolsProjects()).toHaveLength(0);
    expect(getSoftwareProjects()).toHaveLength(2);
    expect(getEarlierProjects().map((project) => project.title)).toEqual([
      'Music & You',
      'YT2Spot',
      'MoMo Credit Score',
      'UniBridge Ghana',
      'QueuePaste',
    ]);
    expect(
      getHiddenProjects()
        .map((project) => project.title)
        .sort(),
    ).toEqual(['Color Communication Game', 'Mango Tools']);
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
    expect(getProjectAnchorHrefByTitle('QueuePaste')).toBe(
      '/projects/#queuepaste',
    );
    expect(getProjectSlug(findProjectByTitle('Tomato')!)).toBe('tomato');
  });

  it('falls back to the projects index for curated-off entries', () => {
    expect(getProjectAnchorHrefByTitle('Mango')).toBe('/projects/');
    expect(getProjectAnchorHrefByTitle('Color Communication')).toBe(
      '/projects/',
    );
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

    expect(byTitle['Tomato — Discrete 32-bit Polymorphic Dual-LUT3 CPU']).toBe(
      'tomato',
    );
    expect(byTitle['NASDAQ ITCH 5.0 Hardware Parser']).toBe('itch-hw');
    expect(byTitle['100 Mbps UDP/IP Stack']).toBe('udp-stack');
    expect(byTitle['Orange Metrics API']).toBe('orange');
    expect(byTitle['16-bit MAC Unit (Sky130)']).toBe('mac');
    expect(byTitle['8-bit Discrete Transistor ALU']).toBe('alu');
    expect(byTitle['Mango Tools']).toBe('mango');
    expect(byTitle['SPICE Automation Framework']).toBe('spice-automation');
    expect(byTitle['QueuePaste']).toBeUndefined();
  });

  it('orders category lists with images before text-only entries', () => {
    const hardware = getHardwareProjects();
    const firstWithoutImage = hardware.findIndex((project) => !project.image);
    if (firstWithoutImage !== -1) {
      expect(
        hardware.slice(0, firstWithoutImage).every((project) => project.image),
      ).toBe(true);
      expect(
        hardware.slice(firstWithoutImage).every((project) => !project.image),
      ).toBe(true);
    }

    const tools = getToolsProjects();
    expect(tools).toEqual([]);
  });

  it('partitions main, earlier, and hidden without overlap', () => {
    const hardware = getHardwareProjects();
    const tools = getToolsProjects();
    const moreHardware = getMoreHardwareProjects();
    const software = getSoftwareProjects();
    const earlier = getEarlierProjects();
    const hidden = getHiddenProjects();

    expect(
      hardware.length +
        tools.length +
        software.length +
        earlier.length +
        hidden.length,
    ).toBe(projects.length);
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
