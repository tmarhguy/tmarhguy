import { describe, expect, it } from 'vitest';

import projects, {
  FRAMEPORT_OPEN_VSX_ID,
  findProjectByTitle,
  getEarlierProjects,
  getHardwareProjects,
  getHiddenProjects,
  getHomeFeaturedItems,
  getHomeHardwarePicks,
  getHomeSoftwareItems,
  getHomeSoftwarePicks,
  getMoreHardwareProjects,
  getProjectAnchorHrefByTitle,
  getProjectSlug,
  getResumeProjects,
  getSoftwareAndSystemsProjects,
  getSoftwareProjects,
  getSystemsProjects,
  getToolsProjects,
  openVsxDownloadsShieldSrc,
  openVsxVersionShieldSrc,
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

  it('picks four strongest hardware projects for the homepage', () => {
    expect(
      getHomeHardwarePicks().map((project) => getProjectSlug(project)),
    ).toEqual([
      'pineapple-gpu',
      'mac',
      '100mbps-udp-ip-stack',
      'full-custom-sram',
    ]);
    expect(getHomeHardwarePicks().every((project) => project.image)).toBe(true);
  });

  it('picks four strongest software projects for the homepage', () => {
    expect(
      getHomeSoftwarePicks().map((project) => getProjectSlug(project)),
    ).toEqual(['sealion', 'frameport', 'lobster', 'figdb']);
    expect(getHomeSoftwarePicks().every((project) => project.image)).toBe(true);
  });

  it('carries the Open VSX shields onto the FramePort homepage card', () => {
    const frameport = getHomeSoftwareItems().find(
      (item) => item.title === 'FramePort',
    );
    expect(frameport?.openVsx).toBe(FRAMEPORT_OPEN_VSX_ID);
    expect(frameport?.image).toBe('/images/projects/frameport-demo.gif');
    expect(
      getHomeSoftwareItems()
        .filter((item) => item.title !== 'FramePort')
        .every((item) => item.openVsx === undefined),
    ).toBe(true);
  });

  it('leads the homepage strip with open source, then hardware and software rows', () => {
    expect(getHomeFeaturedItems().map((item) => item.title)).toEqual([
      'Open source EDA',
      'Pineapple GPU P1',
      '16-bit MAC Unit (Sky130)',
      '100 Mbps UDP/IP Stack',
      '16×4 SRAM — Full-Custom Analog Design',
      'SeaLion',
      'FramePort',
      'Lobster',
      'FigDB',
    ]);
    expect(getHomeFeaturedItems()[0]?.image).toBe(
      '/images/open-source/librelane1015.png',
    );
    expect(getHomeFeaturedItems()[0]?.desc).toMatch(/3\.0\.8 and 3\.0\.10/);
  });

  it('features the MAC layout preview on the homepage', () => {
    const mac = getHomeHardwarePicks().find(
      (project) => getProjectSlug(project) === 'mac',
    );
    expect(mac?.image).toBe('/images/projects/mac-core.webp');
  });

  it('links flagship manuals beside their GitHub repos', () => {
    const manuals: Array<[string, string]> = [
      ['Lobster', 'https://tmarhguy.github.io/lobster/'],
      ['FigDB', 'https://tmarhguy.github.io/figDB/'],
      ['SeaLion', 'https://tmarhguy.github.io/sealion/'],
      ['Pineapple GPU P1', 'https://tmarhguy.github.io/gpu/'],
      [
        'Out-of-Order RISC-V CPU (RV64IMAC)',
        'https://tmarhguy.github.io/riscv/',
      ],
      ['FramePort', 'https://tmarhguy.github.io/frameport/'],
      ['16-bit MAC Unit (Sky130)', 'https://tmarhguy.github.io/mac/'],
    ];
    for (const [title, site] of manuals) {
      const project = findProjectByTitle(title)!;
      expect(project.site).toBe(site);
      expect(project.link).toMatch(/^https:\/\/github\.com\//);
    }
  });

  it('leads with Tomato, GPU, and ALU while separating UDP and ITCH', () => {
    const slugs = getHardwareProjects().map((project) =>
      getProjectSlug(project),
    );
    expect(slugs.slice(0, 3)).toEqual([
      'tomato',
      'pineapple-gpu',
      '8-bit-discrete-transistor-alu',
    ]);
    const udpIndex = slugs.indexOf('100mbps-udp-ip-stack');
    const itchIndex = slugs.indexOf('nasdaq-itch');
    expect(udpIndex).toBeGreaterThanOrEqual(0);
    expect(itchIndex).toBeGreaterThanOrEqual(0);
    expect(Math.abs(udpIndex - itchIndex)).toBeGreaterThan(1);
  });

  it('keeps the full history in data while curating the wall', () => {
    expect(projects.length).toBeGreaterThanOrEqual(24);
    expect(getHardwareProjects()).toHaveLength(10);
    expect(getSystemsProjects()).toHaveLength(3);
    expect(getSystemsProjects().map((project) => project.title)).toEqual([
      'Lobster',
      'FigDB',
      'SeaLion',
    ]);
    expect(getToolsProjects()).toHaveLength(2);
    expect(getToolsProjects().map((project) => project.title)).toEqual([
      'FramePort',
      'Mango Tools',
    ]);
    expect(getSoftwareProjects()).toHaveLength(3);
    expect(getSoftwareProjects().map((project) => project.title)).toEqual([
      'Envelop',
      'Orange Metrics API',
      'SVD Compression Engine',
    ]);
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
    ).toEqual(['Color Communication Game']);
  });

  it('includes related analog, tooling, and bring-up work', () => {
    const titles = projects.map((project) => project.title);
    expect(titles).toContain('16×4 SRAM — Full-Custom Analog Design');
    expect(titles).toContain('8-bit Discrete Transistor ALU');
    expect(titles).toContain('8-Bit Ripple-Carry Adder — ESE 3700');
    expect(titles).toContain('QueuePaste');
    expect(titles).toContain('Mango Tools');
    expect(titles).toContain('FramePort');
    expect(titles).toContain('Envelop');
    expect(titles).toContain('YT2Spot');
    expect(titles).toContain('Music & You');
    expect(titles).toContain('Color Communication Game');
    expect(titles).toContain('Out-of-Order RISC-V CPU (RV64IMAC)');
    expect(titles).toContain('Pineapple GPU P1');
    expect(titles).toContain('Lobster');
    expect(titles).toContain('FigDB');
    expect(titles).toContain('SeaLion');
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

  it('anchors visible projects and falls back for hidden ones', () => {
    expect(getProjectAnchorHrefByTitle('Mango')).toBe('/projects/#mango-tools');
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
    expect(byTitle['FramePort']).toBe('frameport');
    expect(byTitle.Envelop).toBe('envelop');
    expect(byTitle['SPICE Automation Framework']).toBe('spice-automation');
    expect(byTitle['QueuePaste']).toBeUndefined();
  });

  it('lists FramePort with manual, GitHub, Open VSX, and live download shields', () => {
    const frameport = findProjectByTitle('FramePort')!;
    expect(frameport.site).toBe('https://tmarhguy.github.io/frameport/');
    expect(frameport.link).toBe('https://github.com/tmarhguy/frameport');
    expect(frameport.openVsx).toBe(FRAMEPORT_OPEN_VSX_ID);
    expect(frameport.desc).not.toMatch(/\d+\s+downloads/);
    expect(frameport.desc).not.toMatch(/Marketplace/i);
    expect(frameport.imageCaption).toMatch(/Open VSX/);
    expect(frameport.imageCaption).not.toMatch(/Marketplace/i);
    expect(openVsxVersionShieldSrc(FRAMEPORT_OPEN_VSX_ID)).toBe(
      'https://img.shields.io/open-vsx/v/tmarhguy/frameport?style=flat-square',
    );
    expect(openVsxDownloadsShieldSrc(FRAMEPORT_OPEN_VSX_ID)).toBe(
      'https://img.shields.io/open-vsx/dt/tmarhguy/frameport?style=flat-square',
    );
    expect(frameport.video).toBe('/images/projects/frameport-demo.mp4');
    expect(frameport.videoPoster).toBe(
      '/images/projects/frameport-demo-poster.webp',
    );
  });

  it('lists Envelop with both the live site and the GitHub repo', () => {
    const envelop = findProjectByTitle('Envelop')!;
    expect(envelop.site).toBe('https://envelop.tmarhguy.com');
    expect(envelop.link).toBe('https://github.com/tmarhguy/envelop');
    expect(envelop.image).toBe('/images/envelop/envelop-demo.gif');
  });

  it('plays the UDP bench recording on the project card', () => {
    const udp = findProjectByTitle('100 Mbps UDP/IP Stack')!;
    expect(udp.video).toBe('/images/projects/udp-bench.mp4');
    expect(udp.videoPoster).toBe('/images/projects/udp-bench.webp');
    expect(udp.image).toBe('/images/projects/udp-bench.webp');
    expect(udp.imageCaption).toMatch(/bench recording/);
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
    expect(tools).toHaveLength(2);
    expect(tools.every((project) => project.image)).toBe(true);
  });

  it('lists the new systems projects with repo screenshots', () => {
    const lobster = findProjectByTitle('Lobster')!;
    expect(lobster.category).toBe('systems');
    expect(lobster.link).toBe('https://github.com/tmarhguy/lobster');
    expect(lobster.image).toBe('/images/projects/lobster.webp');

    const figdb = findProjectByTitle('FigDB')!;
    expect(figdb.category).toBe('systems');
    expect(figdb.link).toBe('https://github.com/tmarhguy/figDB');
    expect(figdb.image).toBe('/images/projects/figdb.webp');

    const sealion = findProjectByTitle('SeaLion')!;
    expect(sealion.category).toBe('systems');
    expect(sealion.link).toBe(
      'https://github.com/tmarhguy/sealion-search-engine',
    );
    expect(sealion.image).toBe('/images/projects/sealion-demo.gif');
  });

  it('lists Pineapple GPU with the optimized demo gif', () => {
    const pineapple = findProjectByTitle('Pineapple GPU')!;
    expect(pineapple.category).toBe('hardware');
    expect(pineapple.link).toBe('https://github.com/tmarhguy/PineappleGPU');
    expect(pineapple.image).toBe('/images/projects/pineapple-demo.gif');
    expect(pineapple.imageCaption).toMatch(/HDMI capture/);
  });

  it('names the RISC-V entry plainly and keeps the repo slug', () => {
    const riscv = findProjectByTitle('Out-of-Order RISC-V')!;
    expect(riscv.category).toBe('hardware');
    expect(getProjectSlug(riscv)).toBe('riscv64xO3');
    expect(riscv.tech).toContain('AXI4-Lite');
    expect(riscv.tech).not.toContain('Wishbone');
    expect(riscv.imageCaption).toMatch(/Out-of-order RISC-V core/);
  });

  it('partitions main, earlier, and hidden without overlap', () => {
    const hardware = getHardwareProjects();
    const systems = getSystemsProjects();
    const tools = getToolsProjects();
    const moreHardware = getMoreHardwareProjects();
    const software = getSoftwareProjects();
    const earlier = getEarlierProjects();
    const hidden = getHiddenProjects();

    expect(
      hardware.length +
        systems.length +
        tools.length +
        software.length +
        earlier.length +
        hidden.length,
    ).toBe(projects.length);
    expect(software.every((project) => project.category === 'software')).toBe(
      true,
    );
    expect(systems.every((project) => project.category === 'systems')).toBe(
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

  it('leads with SeaLion and FramePort and separates similar repository images', () => {
    const slugs = getSoftwareAndSystemsProjects().map(getProjectSlug);
    expect(slugs.slice(0, 6)).toEqual([
      'sealion',
      'frameport',
      'lobster',
      'envelop',
      'figdb',
      'mango-tools',
    ]);
    expect(
      Math.abs(slugs.indexOf('lobster') - slugs.indexOf('figdb')),
    ).toBeGreaterThan(1);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('unifies systems, tools, and software into one wall', () => {
    const unified = getSoftwareAndSystemsProjects();
    expect(unified).toHaveLength(
      getSystemsProjects().length +
        getToolsProjects().length +
        getSoftwareProjects().length,
    );
    const titles = unified.map((project) => project.title);
    expect(titles).toContain('Lobster');
    expect(titles).toContain('FigDB');
    expect(titles).toContain('SeaLion');
    expect(titles).toContain('FramePort');
    expect(titles).toContain('Envelop');
  });
});
