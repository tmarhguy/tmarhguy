import { HOME_OPEN_SOURCE_FEATURE } from '@/data/open-source';
import { createHeadingId } from '@/lib/anchors';

export type ProjectCategory = 'hardware' | 'software' | 'tools';

export const TOMATO_SITE_URL = 'https://tomato.tmarhguy.com';
export const TOMATO_REPO_URL = 'https://github.com/tmarhguy/tomato';

export interface Project {
  title: string;
  subtitle?: string;
  link?: string;
  /** Live project page when the repo is not the only public URL. */
  site?: string;
  /** Stable anchor on /projects/ — defaults from title when omitted */
  slug?: string;
  /** log-projects id when this project has build notes on /writing/ */
  logProject?: string;
  /** ISO date for sorting */
  date: string;
  /** Human-readable range, aligned with resume formatting */
  period: string;
  desc: string;
  tech: string[];
  category: ProjectCategory;
  /** Matches the three projects on my hardware resume today */
  onResume?: boolean;
  /** Homepage selected work — order via getFeaturedProjects() */
  featured?: boolean;
  /** Short label for a personal standout (e.g. on the projects index) */
  highlight?: string;
  /** Optional thumbnail for featured cards */
  image?: string;
  imageCaption?: string;
  /** Optional autoplay clip — replaces the still on exhibition cards */
  video?: string;
  videoPoster?: string;
  /**
   * Demoted from the main exhibition into the quiet "Earlier software"
   * ledger. History is kept — data, images, and GitHub repos untouched.
   */
  earlier?: boolean;
  /**
   * Removed from the portfolio display entirely. The entry stays in data
   * (and the repo stays on GitHub) — curation, not deletion.
   */
  hidden?: boolean;
}

function sortByDateDesc(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const highlightDiff =
      Number(Boolean(b.highlight)) - Number(Boolean(a.highlight));
    if (highlightDiff !== 0) {
      return highlightDiff;
    }

    const imageDiff = Number(Boolean(b.image)) - Number(Boolean(a.image));
    if (imageDiff !== 0) {
      return imageDiff;
    }

    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

const data: Project[] = [
  {
    title: 'NASDAQ ITCH 5.0 Hardware Parser',
    subtitle: 'Market data FPGA',
    slug: 'nasdaq-itch',
    logProject: 'itch-hw',
    link: 'https://github.com/tmarhguy/itch-hw',
    image: '/images/projects/itch-bench.webp',
    imageCaption: 'ITCH parser on Nexys A7 · bench photo',
    date: '2026-07-01',
    period: 'Jul. 2026',
    desc: 'Streaming 8-bit FSM decodes ITCH 5.0 with cocotb golden-model verification; dual-sided 512-entry BRAM limit book on Artix-7 at 100 MHz.',
    tech: ['SystemVerilog', 'Vivado', 'cocotb', 'Verilator'],
    category: 'hardware',
    onResume: true,
  },
  {
    title: '100 Mbps UDP/IP Stack',
    subtitle: 'Low-latency datapath',
    slug: '100mbps-udp-ip-stack',
    logProject: 'udp-stack',
    link: 'https://github.com/tmarhguy/udp-stack',
    image: '/images/projects/udp-bench.webp',
    imageCaption: 'Nexys A7 running the UDP stack · README bench recording',
    date: '2026-08-01',
    period: 'Jul. 2026 — Aug. 2026',
    desc: 'Deterministic 100 Mbps RMII pipeline — MAC, ARP/IP/UDP on Nexys A7 Artix-7; sub-200 ns RX-to-TX loopback with 100% cocotb coverage.',
    tech: ['SystemVerilog', 'RMII', 'cocotb', 'AXI4-Stream'],
    category: 'hardware',
    onResume: true,
    featured: true,
  },
  {
    title: 'Tomato — Discrete 32-bit Polymorphic Dual-LUT3 CPU',
    subtitle: 'First-principles computer',
    slug: 'tomato',
    logProject: 'tomato',
    site: TOMATO_SITE_URL,
    link: TOMATO_REPO_URL,
    image: '/images/projects/tomato-half-soldered.webp',
    imageCaption: 'Half-soldered ALU board · assembly in progress',
    video: '/images/os/tomato-demo.mp4',
    videoPoster: '/images/os/tomato-demo-poster.webp',
    date: '2025-08-01',
    period: 'Aug. 2025 — Present',
    desc: 'Custom 32-bit architecture with a working FPGA computer, assembler, and TomatoOS over HDMI. Discrete ALU board fabricated; the complete discrete machine is in progress.',
    tech: ['SystemVerilog', 'UVM', 'SymbiYosys', 'KiCad'],
    category: 'hardware',
    onResume: true,
    featured: true,
    highlight: 'Favorite project',
  },
  {
    title: '16-bit MAC Unit (Sky130)',
    subtitle: 'RTL-to-GDS',
    slug: 'mac',
    logProject: 'mac',
    image: '/images/projects/mac-core.webp',
    imageCaption: 'MAC core · physical layout preview',
    link: 'https://github.com/tmarhguy/mac',
    date: '2026-01-01',
    period: 'Jan. 2026 — Present',
    desc: 'BFloat16 MAC with FP32 accumulator and 4-cycle streaming I/O; cocotb-verified RTL with a local LibreLane flow targeting SkyWater 130 nm. Shuttle submission is a later milestone.',
    tech: ['SystemVerilog', 'LibreLane', 'Sky130', 'cocotb'],
    category: 'hardware',
    featured: true,
  },
  {
    title: '16×4 SRAM — Full-Custom Analog Design',
    subtitle: '6T bitcell + StrongARM SA',
    slug: 'full-custom-sram',
    link: 'https://github.com/tmarhguy/64b-sram',
    date: '2026-05-01',
    period: 'Apr. 2026 — May. 2026',
    desc: 'Full-custom 6T SRAM macro in 22 nm HP with clocked StrongARM sense amp; 4.571 GHz f_max with NGSpice functional readback.',
    tech: ['Electric VLSI', 'NGSpice', 'Python'],
    category: 'hardware',
    image: '/images/projects/sram-organization.webp',
    imageCaption: '16 × 4 organization · architecture figure from the report',
    featured: true,
  },
  {
    title: '8-Bit Ripple-Carry Adder — ESE 3700',
    image: '/images/projects/adder-schematic.webp',
    imageCaption: '8-bit adder schematic · design study',
    subtitle: '22 nm HP CMOS · Spring 2026',
    link: 'https://github.com/tmarhguy/ese-370-8b-adder',
    date: '2026-04-01',
    period: 'Mar. 2026 — Apr. 2026',
    desc: 'ESE 3700 full-adder study — baseline vs. delay-optimized 8-bit RCA in 22 nm HP with TG-XOR2, alternating carry polarity, and six-metric SPICE characterization (~55% delay reduction).',
    tech: ['Electric VLSI', 'NGSpice', 'LaTeX'],
    category: 'hardware',
  },
  {
    title: '64-bit RISC-V CPU (RV64IM)',
    subtitle: '5-stage pipelined core',
    link: 'https://github.com/tmarhguy/riscv',
    image: '/images/projects/riscv64.webp',
    imageCaption: 'RV64IM core · 5-stage pipeline',
    date: '2025-10-01',
    period: '2025',
    desc: 'Custom RV64IM processor on Artix-7 at 125 MHz with 96% ISA compliance; bare-metal C via UART bootloader.',
    tech: ['SystemVerilog', 'RISC-V', 'Wishbone', 'cocotb'],
    category: 'hardware',
  },
  {
    title: '8-bit Discrete Transistor ALU',
    image: '/images/projects/alu-render.webp',
    imageCaption: 'Hybrid CMOS ALU · PCB render',
    subtitle: '3,488 transistors',
    logProject: 'alu',
    link: 'https://alu.tmarhguy.com',
    date: '2025-06-01',
    period: 'Jun. 2025',
    desc: 'Hybrid CMOS ALU design: 624 discrete MOSFETs plus 2,864 transistors inside 74HC logic. Schematics, PCB layout, and 1.24M automated simulation vectors.',
    tech: ['Discrete Transistors', 'KiCad', 'Python', 'Formal Verification'],
    category: 'hardware',
  },
  {
    title: 'SPICE Automation Framework',
    subtitle: 'Parametric analog optimization',
    slug: 'spice-automation',
    logProject: 'spice-automation',
    link: 'https://github.com/tmarhguy/spice-automation',
    image: '/images/projects/spice-automation.webp',
    imageCaption: 'SPICE Automation Framework · parametric sweep report',
    date: '2026-01-01',
    period: 'Jan. 2026 — May. 2026',
    desc: 'Python pipeline driving NGSpice runs with binary-search F_max convergence; automated parametric sweeps and comparative statistical reports.',
    tech: ['Python', 'NGSpice', 'C++'],
    category: 'hardware',
  },
  {
    title: 'Mango Tools',
    subtitle: 'Offline CLI utilities',
    slug: 'mango-tools',
    hidden: true,
    image: '/images/mango/main_menu.png',
    imageCaption: 'The terminal interface · Mango',
    logProject: 'mango',
    link: 'https://github.com/tmarhguy/tools',
    date: '2026-08-11',
    period: 'Aug. 2026 — Present',
    desc: 'Offline video, PDF, and image conversion behind a `mango` terminal menu — now a system-wide call from any working directory, not locked to the repo path.',
    tech: ['Bash', 'Python', 'FFmpeg', 'Ghostscript'],
    category: 'tools',
  },
  {
    title: 'QueuePaste',
    subtitle: 'Clipboard automation',
    slug: 'queuepaste',
    earlier: true,
    link: 'https://github.com/tmarhguy/QueuePaste',
    image: '/images/projects/queuepaste.webp',
    imageCaption: 'QueuePaste · Prepare list and sequential paste',
    date: '2024-01-01',
    period: '2024 — Present',
    desc: 'Native macOS utility — load a list once, then paste each item into any app with ⌥ Space; roughly 6× faster on thousand-entry data-entry runs.',
    tech: ['Swift', 'SwiftUI', 'AppKit', 'macOS'],
    category: 'tools',
  },
  {
    title: 'YT2Spot',
    subtitle: 'YouTube Music → Spotify migration',
    slug: 'yt2spot',
    earlier: true,
    link: 'https://github.com/tmarhguy/ytmusic-spotify-migrator',
    image: '/images/projects/yt2spot.webp',
    imageCaption: 'YT2Spot Migration Studio · choose source platform',
    date: '2025-08-04',
    period: 'Jul. 2025 — Aug. 2025',
    desc: 'Full-stack migration tool with fuzzy matching (~74% auto-match), OAuth Spotify auth, live progress UI, and CLI batch processing for large playlists.',
    tech: ['Python', 'FastAPI', 'React', 'TypeScript'],
    category: 'tools',
  },
  {
    title: 'Music & You',
    subtitle: 'Music psychology + ML',
    earlier: true,
    link: 'https://github.com/tmarhguy/music-and-you',
    image: '/images/projects/music-and-you.webp',
    imageCaption: 'Music & You · listening personality dashboard',
    date: '2025-10-14',
    period: 'Jul. 2025 — Oct. 2025',
    desc: 'Full-stack app predicting Big Five personality traits from Spotify listening patterns — SHAP explainability, conversational insights, and a Next.js dashboard.',
    tech: ['Python', 'FastAPI', 'Next.js', 'scikit-learn', 'SHAP'],
    category: 'software',
  },
  {
    title: 'Color Communication Game',
    subtitle: 'Psychology experiment',
    slug: 'color-comm',
    hidden: true,
    link: 'https://github.com/tmarhguy/Psych_Color_Game_Experiment',
    image: '/images/projects/color-comm.webp',
    imageCaption: 'Color Communication Game · sender round and match history',
    date: '2025-07-20',
    period: 'Apr. 2025 — Jul. 2025',
    desc: 'Research-grade React experiment studying color–concept communication through animal associations — demographics, timed sender/receiver rounds, and JSON export for analysis.',
    tech: ['React', 'JavaScript', 'CSS'],
    category: 'software',
  },
  {
    title: 'Orange Metrics API',
    subtitle: 'PPA benchmarking backend',
    slug: 'orange',
    logProject: 'orange',
    link: 'https://github.com/tmarhguy/metrics-api',
    image: '/images/projects/orange-metrics.webp',
    imageCaption: 'Orange Metrics API · PPA ingestion dashboard',
    date: '2026-03-01',
    period: 'In progress',
    desc: 'FastAPI + PostgreSQL service ingesting Vivado and OpenLane synthesis PPA metrics; Dockerized with Pytest-covered ingestion pipeline.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    category: 'software',
  },
  {
    title: 'UniBridge Ghana',
    subtitle: 'Admissions platform',
    earlier: true,
    link: 'https://github.com/tmarhguy/unibridgeGhana',
    image: '/images/projects/unibridge.webp',
    imageCaption: 'UniBridge Ghana · admissions platform',
    date: '2024-06-01',
    period: '2024',
    desc: 'Centralized university admissions platform with FastAPI microservices; sub-200 ms P99 under heavy read load during result releases.',
    tech: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Docker'],
    category: 'software',
  },
  {
    title: 'MoMo Credit Score',
    subtitle: 'Alternative credit scoring',
    earlier: true,
    link: 'https://github.com/tmarhguy/momo-credit-score',
    image: '/images/projects/momo-credit.webp',
    imageCaption: 'MoMo Credit Score · explainability dashboard',
    date: '2025-08-03',
    period: 'Jul. 2025 — Aug. 2025',
    desc: 'XGBoost credit scoring for mobile money users with SHAP explainability dashboard and sub-400 ms P99 latency.',
    tech: ['Python', 'XGBoost', 'Pandas', 'React'],
    category: 'software',
  },
  {
    title: 'SVD Compression Engine',
    subtitle: 'Real-time image compression',
    link: 'https://svd.tmarhguy.com',
    image: '/images/projects/svd-compression.webp',
    imageCaption: 'SVD Compression Engine · interactive demo',
    date: '2024-09-01',
    period: '2024',
    desc: 'Singular Value Decomposition from scratch with cache-optimized matrix ops; 45% speedup over naive implementations.',
    tech: ['C++', 'NumPy', 'Linear Algebra', 'WASM'],
    category: 'software',
  },
];

export function getResumeProjects(): Project[] {
  return sortByDateDesc(data.filter((project) => project.onResume));
}

/** Main exhibition wall — curated; earlier and hidden entries live elsewhere. */
function isMainExhibition(project: Project): boolean {
  return !project.hidden && !project.earlier;
}

/**
 * Hardware exhibition order — curated so the two Nexys bench shots (UDP and
 * ITCH) never sit adjacent, with the MAC up among the first rows. Slugs must
 * match getProjectSlug(); hardware added later without a list entry appends
 * after, newest first, so nothing ever drops off the page.
 */
const HARDWARE_ORDER = [
  'tomato',
  'mac',
  '100mbps-udp-ip-stack',
  'full-custom-sram',
  'nasdaq-itch',
  '8-bit-ripple-carry-adder-ese-3700',
  'spice-automation',
  '64-bit-risc-v-cpu-rv64im',
  '8-bit-discrete-transistor-alu',
] as const;

export function getHardwareProjects(): Project[] {
  const hardware = data.filter(
    (project) => project.category === 'hardware' && isMainExhibition(project),
  );
  const bySlug = new Map(
    hardware.map((project) => [getProjectSlug(project), project]),
  );
  const ordered = HARDWARE_ORDER.map((slug) => {
    const project = bySlug.get(slug);
    if (!project) {
      throw new Error(`Missing hardware project for order entry: ${slug}`);
    }
    bySlug.delete(slug);
    return project;
  });
  return [...ordered, ...sortByDateDesc([...bySlug.values()])];
}

export function getToolsProjects(): Project[] {
  return sortByDateDesc(
    data.filter(
      (project) => project.category === 'tools' && isMainExhibition(project),
    ),
  );
}

/** @deprecated Use getHardwareProjects and filter by onResume instead */
export function getMoreHardwareProjects(): Project[] {
  return sortByDateDesc(
    data.filter(
      (project) => project.category === 'hardware' && !project.onResume,
    ),
  );
}

/** Quiet "Earlier software" ledger — demoted breadth, newest first. */
export function getEarlierProjects(): Project[] {
  return sortByDateDesc(
    data.filter((project) => project.earlier && !project.hidden),
  );
}

/** Curated off the portfolio entirely; data and GitHub history preserved. */
export function getHiddenProjects(): Project[] {
  return sortByDateDesc(data.filter((project) => project.hidden));
}

export function getSoftwareProjects(): Project[] {
  return sortByDateDesc(
    data.filter(
      (project) => project.category === 'software' && isMainExhibition(project),
    ),
  );
}

export function getProjectSlug(project: Project): string {
  return project.slug ?? createHeadingId(project.title);
}

const FEATURED_PROJECT_SLUGS = [
  'mac',
  '100mbps-udp-ip-stack',
  'full-custom-sram',
] as const;

/** Homepage selected work — explicit cracked-hardware order. */
export function getFeaturedProjects(): Project[] {
  return FEATURED_PROJECT_SLUGS.map((slug) => {
    const project = data.find((entry) => getProjectSlug(entry) === slug);
    if (!project?.featured) {
      throw new Error(`Missing featured project: ${slug}`);
    }
    return project;
  });
}

export interface HomeFeaturedItem {
  title: string;
  period: string;
  desc: string;
  image: string;
  imageAlt: string;
  href: string;
  external?: boolean;
}

/** Homepage projects strip: open source lead, then featured builds. */
export function getHomeFeaturedItems(): HomeFeaturedItem[] {
  return [
    {
      title: HOME_OPEN_SOURCE_FEATURE.title,
      period: HOME_OPEN_SOURCE_FEATURE.period,
      desc: HOME_OPEN_SOURCE_FEATURE.desc,
      image: HOME_OPEN_SOURCE_FEATURE.image,
      imageAlt: HOME_OPEN_SOURCE_FEATURE.imageAlt,
      href: HOME_OPEN_SOURCE_FEATURE.href,
    },
    ...getFeaturedProjects().map((project) => {
      const href = project.site ?? project.link;
      if (!href) {
        throw new Error(`Featured project missing link: ${project.title}`);
      }

      return {
        title: project.title,
        period: project.period,
        desc: project.desc,
        image: project.image!,
        imageAlt: `${project.title} — project screenshot`,
        href,
        external: true,
      };
    }),
  ];
}

export function getProjectAnchorHref(project: Project): string {
  return `/projects/#${getProjectSlug(project)}`;
}

export function findProjectByTitle(titleIncludes: string): Project | undefined {
  return data.find((project) =>
    project.title.toLowerCase().includes(titleIncludes.toLowerCase()),
  );
}

export function getProjectAnchorHrefByTitle(titleIncludes: string): string {
  const project = findProjectByTitle(titleIncludes);
  if (!project || project.hidden) {
    return '/projects/';
  }
  return getProjectAnchorHref(project);
}

export default data;
