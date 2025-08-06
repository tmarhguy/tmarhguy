import { FlagshipProject, SoftwareProject, HardwareProject } from '@/types/project';

/**
 * Flagship projects data - featured prominently on the homepage
 */
export const flagshipProjects: FlagshipProject[] = [
  {
    id: "cpu-8bit",
    title: "8-bit Transistor CPU",
    description: "Complete CPU built from 700+ discrete 2N7000 NMOS transistors with custom 12-instruction ISA, capable of running assembly programs and measured with logic analyzer for gate propagation delays.",
    image: "/images/transistor-cpu-animated.svg",
    metrics: [
      { label: "Transistors", value: "700+" },
      { label: "Instructions", value: "12-ISA" },
      { label: "Programs", value: "20+" },
      { label: "Verification", value: "100%" },
    ],
    github: "https://github.com/tmarhguy/cpu",
    demo: "/projects/hardware/cpu",
    tags: ["Hardware", "ISA Design", "Digital Logic"],
    status: "In Progress"
  },
  {
    id: "momo-credit",
    title: "MoMo Credit Score Generator - Ghana",
    description: "Ghana's first consumer credit platform processing 1M+ transactions with FastAPI microservices and XGBoost ML pipeline, achieving AUC 0.82 and improving lender approval rates by 32%.",
    image: "/images/momo-credit-animated.svg",
    metrics: [
      { label: "Transactions", value: "1M+" },
      { label: "AUC Score", value: "0.82" },
      { label: "Latency P99", value: "<400ms" },
      { label: "Approval ↑", value: "32%" },
    ],
    github: "https://github.com/tmarhguy/momo-credit-score",
    demo: "/projects/software/momo-csg",
    tags: ["FinTech", "ML", "API"],
    status: "In Progress"
  },
  {
    id: "music-and-you",
    title: "Music & You",
    description: "ML-based music analytics platform (FastAPI, OAuth2) supporting 1M+ users with <2s P95 latency, featuring React interface with async streaming that reduced load times by 40%.",
    image: "/images/music-analytics-animated.svg",
    metrics: [
      { label: "Users", value: "1M+" },
      { label: "Latency P95", value: "<2s" },
      { label: "Load Time ↓", value: "40%" },
      { label: "MTTR", value: "12min" },
    ],
    github: "https://github.com/tmarhguy/music-and-you",
    demo: "https://music-and-you.vercel.app",
    tags: ["AI/ML", "Psychology", "Music"],
    status: "In Progress"
  },
  {
    id: "unibridge-ghana",
    title: "UniBridge - Ghana",
    description: "Ghana's first centralized admissions portal for 350K+ applicants/year using FastAPI, React, Redis, and PostgreSQL, achieving 99.9% uptime and P99 <500ms latency under 10K+ daily requests.",
    image: "/images/unibridge-animated.svg",
    metrics: [
      { label: "Applicants", value: "350K+/yr" },
      { label: "Daily Requests", value: "10K+" },
      { label: "Uptime", value: "99.9%" },
      { label: "Latency P99", value: "<500ms" },
    ],
    github: "https://github.com/tmarhguy/unibridgeGhana",
    demo: "/projects/software/unibridge",
    tags: ["Backend", "API", "Education"],
    status: "In Progress"
  },
];

/**
 * Software projects data
 */
export const softwareProjects: SoftwareProject[] = [
  {
    id: "unibridge-fullstack",
    title: "UniBridge-Ghana",
    description: "Full-stack student platforms (NextJS, Express, MongoDB) handling 800+ MAU with automated scheduling, real-time chat, and SPA with multi-course management.",
    image: "/images/unibridge-animated.svg",
    github: "https://github.com/tmarhguy",
    demo: "/projects/software/unibridge",
    tags: ["NextJS", "Full Stack", "MongoDB"],
    status: "In Progress",
    category: "web"
  },
  {
    id: "momo-credit-software",
    title: "MoMo Credit Score Generator - Ghana",
    description: "Ghana's first consumer credit platform processing 1M+ transactions with FastAPI microservices and XGBoost ML pipeline, achieving AUC 0.82 and improving lender approval rates by 32%.",
    image: "/images/momo-credit-animated.svg",
    github: "https://github.com/tmarhguy/momo-credit-score",
    demo: "/projects/software/momo-csg",
    tags: ["FinTech", "XGBoost", "FastAPI"],
    status: "In Progress",
    category: "ml"
  },
  {
    id: "music-you-software",
    title: "Music & You",
    description: "ML-based music analytics platform (FastAPI, OAuth2) supporting 1M+ users with <2s P95 latency, featuring React interface with async streaming that reduced load times by 40%.",
    image: "/images/music-analytics-animated.svg",
    github: "https://github.com/tmarhguy/music-and-you",
    demo: "https://music-and-you.vercel.app",
    tags: ["ML Analytics", "OAuth2", "React"],
    status: "In Progress",
    category: "ml"
  },
  {
    id: "atom-assembler",
    title: "AtomAssembler",
    description: "Two-pass assembler translating 20+ mnemonics to Intel-HEX for custom 8-bit CPU, reducing firmware build time by 70% with automated testbench validating 50+ programs at 100% pass rate.",
    image: "/images/atom-assembler-animated.svg",
    github: "https://github.com/tmarhguy/atomassembler",
    demo: "/projects/software/atom-assembler",
    tags: ["Assembler", "CLI Tools", "Testing"],
    status: "In Progress",
    category: "tools"
  },
  {
    id: "color-game",
    title: "Color Communication Game",
    description: "Multiplayer psychology-based game where users develop shared language using color patterns, exploring behavioral communication and emergent semantics.",
    image: "/images/color-game-animated.svg",
    github: "https://github.com/tmarhguy/Psych_Color_Game_Experiment",
    demo: "/projects/software/color-game",
    tags: ["Flutter", "Psychology", "Real-time"],
    status: "In Progress",
    category: "web"
  },
  {
    id: "yt-spotify-migrator",
    title: "YouTube to Spotify Migrator",
    description: "CLI tool for seamless playlist and liked songs migration from YouTube Music to Spotify using OAuth and API automation.",
    image: "/images/youtube-spotify-migrator-animated.svg",
    github: "https://github.com/tmarhguy/ytmusic-spotify-migrator",
    demo: "/projects/software/migrator",
    tags: ["Python", "CLI", "Automation"],
    status: "Complete",
    category: "tools"
  },
];

/**
 * Hardware projects data
 */
export const hardwareProjects: HardwareProject[] = [
  {
    id: "cpu-8bit-hardware",
    title: "8-bit Transistor CPU",
    description: "Complete CPU built from 700+ discrete 2N7000 NMOS transistors with custom 12-instruction ISA, capable of running assembly programs and measured with logic analyzer for gate propagation delays.",
    image: "/images/transistor-cpu-animated.svg",
    github: "https://github.com/tmarhguy/cpu",
    demo: "/projects/hardware/cpu",
    tags: ["Discrete Logic", "ISA Design", "Assembly"],
    status: "In Progress",
    specs: {
      components: "700+ 2N7000 NMOS transistors",
      frequency: "Variable clock speed",
    }
  },
  {
    id: "memory-16bit",
    title: "16-Bit Transistor Memory Module",
    description: "16-bit addressable memory from ~350 discrete transistors using D-flip-flop latch arrays, integrated with Arduino microcontroller achieving stable operation over 1,000+ access cycles.",
    image: "/images/memory-module-animated.svg",
    github: "https://github.com/tmarhguy/memory-drive",
    demo: "/projects/hardware/memory",
    tags: ["Memory Systems", "Bus Control", "Microcontroller"],
    status: "In Progress",
    specs: {
      components: "~350 discrete transistors",
    }
  },
  {
    id: "clock-oscillator",
    title: "Precision Clock Oscillator",
    description: "RC multivibrator delivering 1 kHz clock with <1% drift, tuned for stable duty cycle and temperature resilience using discrete components.",
    image: "/images/clock-oscillator-animated.svg",
    github: "https://github.com/tmarhguy/custom-clock",
    demo: "/projects/hardware/clock",
    tags: ["Oscillators", "Timing", "Analog Design"],
    status: "In Progress",
    specs: {
      frequency: "1 kHz",
    }
  },
  {
    id: "transistor-calculator",
    title: "Transistor-Logic Calculator",
    description: "Four-function calculator using ripple-carry adders and custom 7-segment decoder with power management, achieving <5ns propagation latency for all 16-bit operations.",
    image: "/images/calculator-animated.svg",
    github: "https://github.com/tmarhguy/custom-calculator",
    demo: "/projects/hardware/calculator",
    tags: ["Adders", "Display Logic", "Power Management"],
    status: "In Progress",
    specs: {
      components: "Ripple-carry adders, 7-segment decoder",
    }
  },
];

/**
 * All projects combined
 */
export const allProjects = [
  ...flagshipProjects,
  ...softwareProjects.filter(p => !flagshipProjects.find(fp => fp.id === p.id)),
  ...hardwareProjects.filter(p => !flagshipProjects.find(fp => fp.id === p.id)),
];