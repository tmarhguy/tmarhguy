export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectSection {
  title: string;
  body: string;
}

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  metrics: ProjectMetric[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  content: ProjectSection[];
  // Card-display fields for the Projects listing page
  category: 'silicon' | 'software';
  cardDescription: string;
  cardBadge?: string;
  cardExternalLink?: string;
}

export const projectsData: Record<string, ProjectData> = {
  'alu': {
    id: 'alu',
    title: '8-bit Discrete Transistor ALU',
    subtitle: 'Designed and validated from first principles. Schematic → 4-layer PCB → physical bring-up → automated verification.',
    tag: 'PROOF OF FIRST PRINCIPLES',
    image: '/images/alu-card.png',
    category: 'silicon',
    cardDescription: 'Designed and validated from first principles. Schematic → 4-layer PCB → physical bring-up → automated verification.',
    cardBadge: 'Interactive 3D Website',
    cardExternalLink: 'https://alu.tmarhguy.com',
    githubUrl: 'https://github.com/tmarhguy/alu',
    liveUrl: 'https://alu.tmarhguy.com',
    metrics: [
      { label: 'transistors • 19 ops', value: '3,488' },
      { label: 'test vectors', value: '1.24M' },
    ],
    techStack: ['Discrete Transistors', 'KiCad', 'Python', 'Formal Verification'],
    content: [
      {
        title: 'Project Overview',
        body: 'A fully discrete 8-bit ALU built from 3,488 individual transistors, hand-soldered on a 4-layer PCB. Supports 19 arithmetic and logic operations with complete formal verification.'
      },
    ],
  },
  'mac-unit': {
    id: 'mac-unit',
    title: '16-bit MAC Unit (Sky130)',
    subtitle: 'ML acceleration ASIC currently in fabrication. Full OpenLane RTL-to-GDS flow.',
    tag: 'SILICON IN FABRICATION',
    image: '/images/mac-card.png',
    category: 'silicon',
    cardDescription: 'Machine-learning accelerator ASIC. Full RTL-to-GDS flow using OpenLane. 50 MHz timing closure, zero DRC/LVS violations.',
    cardBadge: 'View Details',
    metrics: [
      { label: 'die • Sky130', value: '0.11 mm²' },
      { label: 'status', value: 'In fabrication' },
    ],
    techStack: ['Verilog', 'OpenLane', 'Sky130', 'Magic', 'Tcl'],
    githubUrl: 'https://github.com/tmarhguy/mac',
    content: [
      {
        title: 'Project Overview',
        body: 'Designed for machine learning acceleration, this 16-bit Multiply-Accumulate (MAC) unit targets the SkyWater 130nm process node. The project demonstrates a complete physical design and ASIC tapeout lifecycle executed with open-source tools.'
      },
      {
        title: 'Physical Design & Tapeout',
        body: 'Ran the full OpenLane RTL-to-GDS flow encompassing synthesis, floorplanning, placement, clock tree synthesis (CTS), and routing. Closed timing at 50 MHz with zero DRC and LVS violations within a compact 0.11mm² footprint.'
      },
      {
        title: 'Power Distribution',
        body: 'Engineered a robust on-chip power distribution network designed to handle 150mA peak current bursts. Automated power rail verification across over 1,000 distinct corners using custom Tcl scripts, ensuring IR drops remained strictly below 50mV.'
      }
    ]
  },
  'riscv': {
    id: 'riscv',
    title: '64-bit RISC-V CPU (RV64IM)',
    subtitle: '5-stage pipelined processor deployed on Artix-7 FPGA.',
    tag: 'SYSTEM DEPLOYMENT',
    image: '/images/riscv-card.png',
    category: 'silicon',
    cardDescription: '5-stage pipelined core with custom control logic. 96% ISA compliance. Bare-metal C via UART bootloader on Artix-7 FPGA.',
    cardBadge: 'Architecture',
    metrics: [
      { label: 'IPC', value: '1.82' },
      { label: 'clock', value: '125 MHz' },
    ],
    techStack: ['SystemVerilog', 'Artix-7 FPGA', 'C', 'GCC', 'Assembly'],
    githubUrl: 'https://github.com/tmarhguy/riscv',
    content: [
      {
        title: 'Architecture details',
        body: 'A fully custom 64-bit RISC-V processor implementing the RV64IM instruction set. The core utilizes a classic 5-stage pipeline (Fetch, Decode, Execute, Memory, Writeback) and operates reliably at 100 MHz on a Xilinx Artix-7 FPGA.'
      },
      {
        title: 'Digital Systems Integration',
        body: 'Developed custom SPI controllers and debugged complex I2C timing violations down to the nanosecond using a logic analyzer. Achieved 96% ISA compliance when verified against the official riscv-tests suite.'
      },
      {
        title: 'Hardware-Software Interface',
        body: 'To close the loop between RTL and software, I wrote a custom UART bootloader. This allows the processor to seamlessly load and execute bare-metal C programs compiled via GCC directly on the FPGA.'
      }
    ]
  },
  'unibridge': {
    id: 'unibridge',
    title: 'UniBridge Ghana',
    subtitle: 'Centralized university admissions and placement platform.',
    tag: 'SYSTEMS',
    image: '/images/unibridge.png',
    category: 'software',
    cardDescription: 'Centralized admissions platform. FastAPI microservices.',
    cardBadge: 'View Code',
    cardExternalLink: 'https://github.com/tmarhguy/unibridgeGhana',
    metrics: [
      { label: 'P99', value: '<200ms' },
      { label: 'users', value: '10K+' },
    ],
    techStack: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/tmarhguy/unibridgeGhana',
    liveUrl: 'https://github.com/tmarhguy/unibridgeGhana',
    content: [
      {
        title: 'The Challenge',
        body: 'Admissions processes in Ghana are often fragmented across institutions. UniBridge was built to provide a centralized placement interface leveraging scalable microservices to handle traffic spikes during result release periods.'
      },
      {
        title: 'System Architecture',
        body: 'Designed a highly concurrent backend using Python FastAPI connected to a PostgreSQL database. The system limits latency to under 200ms at the P99 tail, even when subjected to heavy read loads from thousands of concurrent applicants.'
      }
    ]
  },
  'momo': {
    id: 'momo',
    title: 'MoMo Credit Score',
    subtitle: 'Alternative credit scoring engine using Mobile Money transactional data.',
    tag: 'ML PIPELINE',
    image: '/images/momo.png',
    category: 'software',
    cardDescription: 'XGBoost, AUC 0.82. SHAP explainability dashboard.',
    cardBadge: 'View Code',
    cardExternalLink: 'https://github.com/tmarhguy/momo-credit-score',
    metrics: [
      { label: 'AUC', value: '0.82' },
      { label: 'P99', value: '<400ms' },
    ],
    techStack: ['Python', 'XGBoost', 'Pandas', 'Scikit-learn', 'React'],
    githubUrl: 'https://github.com/tmarhguy/momo-credit-score',
    liveUrl: 'https://github.com/tmarhguy/momo-credit-score',
    content: [
      {
        title: 'Machine Learning Model',
        body: 'Developed an XGBoost-based classification model to predict default probabilities based on behavioral spending and mobile money transaction velocity. The model achieved a strong 0.82 Area Under the ROC Curve (AUC).'
      },
      {
        title: 'Explainability',
        body: 'Built a real-time dashboard that not only outputs the credit score but provides SHAP-value explanations, allowing loan officers to understand exactly which behavioral features influenced the automated decision.'
      }
    ]
  },
  'svd': {
    id: 'svd',
    title: 'SVD Compression Engine',
    subtitle: 'Real-time image compression via Singular Value Decomposition.',
    tag: 'SIGNAL PROC',
    image: '/images/svd.png',
    category: 'software',
    cardDescription: 'SVD from scratch. Cache-optimized matrix operations.',
    cardBadge: 'View Demo',
    cardExternalLink: 'https://svd.tmarhguy.com',
    metrics: [
      { label: 'speedup', value: '45%' },
      { label: 'max', value: '20MB' },
    ],
    techStack: ['C++', 'NumPy', 'Linear Algebra', 'WASM'],
    liveUrl: 'https://svd.tmarhguy.com',
    content: [
      {
        title: 'Mathematical Optimization',
        body: 'Implemented Singular Value Decomposition (SVD) from scratch to compress high-resolution images by discarding low-variance singular values, maintaining visual fidelity while drastically reducing file size.'
      },
      {
        title: 'Performance',
        body: 'Achieved a 45% algorithmic speedup compared to naive implementations by optimizing the underlying matrix multiplication routines for memory contiguity and CPU cache lines.'
      }
    ]
  }
};

// Ordered array for the Projects listing page — add new projects here
export const projectsList = Object.values(projectsData);
