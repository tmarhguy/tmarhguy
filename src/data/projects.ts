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
}

function sortByDateDesc(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const highlightDiff =
      Number(Boolean(b.highlight)) - Number(Boolean(a.highlight));
    if (highlightDiff !== 0) {
      return highlightDiff;
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
    image: '/images/projects/mac-card.png',
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
    image: '/images/projects/riscv-card.png',
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
    image: '/images/projects/alu-card.png',
    date: '2025-08-01',
    period: 'Aug. 2025 — Present',
    desc: '8-board Discrete 32-bit Polymorphic Dual-LUT3 CPU from discrete logic through PCB tapeout; FPGA prototype at 58 MHz with SymbiYosys formal verification.',
    tech: ['SystemVerilog', 'UVM', 'SymbiYosys', 'KiCad'],
    category: 'hardware',
    onResume: true,
    featured: true,
    highlight: 'Favorite project',
  },
  {
    title: '16-bit MAC Unit (Sky130)',
    subtitle: 'ASIC tapeout',
    logProject: 'mac',
    link: 'https://github.com/tmarhguy/mac',
    date: '2026-01-01',
    period: 'Jan. 2026 — Present',
    desc: 'BFloat16 MAC with FP32 accumulator and 4-cycle streaming I/O; taped out via OpenLane to TinyTapeout 07 / SkyWater 130 nm.',
    tech: ['SystemVerilog', 'LibreLane', 'Sky130', 'cocotb'],
    category: 'hardware',
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
    featured: true,
    image: '/images/projects/mac-card.png',
  },
  {
    title: '8-Bit Ripple-Carry Adder — ESE 3700',
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
    date: '2025-10-01',
    period: '2025',
    desc: 'Custom RV64IM processor on Artix-7 at 125 MHz with 96% ISA compliance; bare-metal C via UART bootloader.',
    tech: ['SystemVerilog', 'RISC-V', 'Wishbone', 'cocotb'],
    category: 'hardware',
  },
  {
    title: '8-bit Discrete Transistor ALU',
    subtitle: '3,488 transistors',
    logProject: 'alu',
    link: 'https://alu.tmarhguy.com',
    date: '2025-06-01',
    period: 'Jun. 2025',
    desc: 'Designed and validated from first principles — schematic, 4-layer PCB, physical bring-up, and 1.24M automated test vectors.',
    tech: ['Discrete Transistors', 'KiCad', 'Python', 'Formal Verification'],
    category: 'hardware',
  },
  {
    title: 'SPICE Automation Framework',
    subtitle: 'Parametric analog optimization',
    slug: 'spice-automation',
    logProject: 'spice-automation',
    link: 'https://github.com/tmarhguy/spice-automation',
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
    link: 'https://github.com/tmarhguy/QueuePaste',
    date: '2024-01-01',
    period: '2024 — Present',
    desc: 'Native macOS utility — load a list once, then paste each item into any app with ⌥ Space; roughly 6× faster on thousand-entry data-entry runs.',
    tech: ['Swift', 'SwiftUI', 'AppKit', 'macOS'],
    category: 'tools',
  },
  {
    title: 'YT2Spot',
    subtitle: 'YouTube Music → Spotify migration',
    link: 'https://github.com/tmarhguy/ytmusic-spotify-migrator',
    date: '2025-08-04',
    period: 'Jul. 2025 — Aug. 2025',
    desc: 'Full-stack migration tool with fuzzy matching (~74% auto-match), OAuth Spotify auth, live progress UI, and CLI batch processing for large playlists.',
    tech: ['Python', 'FastAPI', 'React', 'TypeScript'],
    category: 'tools',
  },
  {
    title: 'Music & You',
    subtitle: 'Music psychology + ML',
    link: 'https://github.com/tmarhguy/music-and-you',
    date: '2025-10-14',
    period: 'Jul. 2025 — Oct. 2025',
    desc: 'Full-stack app predicting Big Five personality traits from Spotify listening patterns — SHAP explainability, conversational insights, and a Next.js dashboard.',
    tech: ['Python', 'FastAPI', 'Next.js', 'scikit-learn', 'SHAP'],
    category: 'software',
  },
  {
    title: 'Color Communication Game',
    subtitle: 'Psychology experiment',
    link: 'https://github.com/tmarhguy/Psych_Color_Game_Experiment',
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
    date: '2026-03-01',
    period: 'In progress',
    desc: 'FastAPI + PostgreSQL service ingesting Vivado and OpenLane synthesis PPA metrics; Dockerized with Pytest-covered ingestion pipeline.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    category: 'software',
  },
  {
    title: 'UniBridge Ghana',
    subtitle: 'Admissions platform',
    link: 'https://github.com/tmarhguy/unibridgeGhana',
    date: '2024-06-01',
    period: '2024',
    desc: 'Centralized university admissions platform with FastAPI microservices; sub-200 ms P99 under heavy read load during result releases.',
    tech: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Docker'],
    category: 'software',
  },
  {
    title: 'MoMo Credit Score',
    subtitle: 'Alternative credit scoring',
    link: 'https://github.com/tmarhguy/momo-credit-score',
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

export function getHardwareProjects(): Project[] {
  return sortByDateDesc(
    data.filter((project) => project.category === 'hardware'),
  );
}

export function getToolsProjects(): Project[] {
  return sortByDateDesc(data.filter((project) => project.category === 'tools'));
}

/** @deprecated Use getHardwareProjects and filter by onResume instead */
export function getMoreHardwareProjects(): Project[] {
  return sortByDateDesc(
    data.filter(
      (project) => project.category === 'hardware' && !project.onResume,
    ),
  );
}

export function getSoftwareProjects(): Project[] {
  return sortByDateDesc(
    data.filter((project) => project.category === 'software'),
  );
}

export function getProjectSlug(project: Project): string {
  return project.slug ?? createHeadingId(project.title);
}

const FEATURED_PROJECT_SLUGS = [
  'tomato',
  'full-custom-sram',
  '100mbps-udp-ip-stack',
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
  return project ? getProjectAnchorHref(project) : '/projects/';
}

export default data;
