export interface Skill {
  title: string;
  competency: number;
  category: string[];
}

export interface Category {
  name: string;
  color: string;
}

/**
 * Skills a hardware recruiter can map to a project, not a course catalog.
 *
 * FPGA / RTL / verification internships: Tomato UVM+SVA + FOSS FPGA
 * (Yosys/nextpnr), ITCH/UDP cocotb, RISC-V Wishbone, Vivado P&R.
 * ASIC / EDA: LibreLane, OpenROAD, OpenFPGA, Sky130 MAC.
 * Board / analog: KiCad, NGSpice, Electric. Embedded: Vero SPI/I²C, Arduino.
 * Software: Next.js sites, Swift (QueuePaste), FastAPI/Postgres.
 */
const skills: Skill[] = [
  // FPGA & HDL
  {
    title: 'SystemVerilog',
    competency: 5,
    category: ['FPGA & HDL', 'Verification'],
  },
  {
    title: 'Verilog',
    competency: 5,
    category: ['FPGA & HDL'],
  },
  {
    title: 'Vivado',
    competency: 5,
    category: ['FPGA & HDL'],
  },
  {
    title: 'Xilinx Artix-7',
    competency: 5,
    category: ['FPGA & HDL'],
  },
  {
    title: 'Nexys A7',
    competency: 5,
    category: ['FPGA & HDL'],
  },
  {
    title: 'RTL Synthesis',
    competency: 4,
    category: ['FPGA & HDL'],
  },
  {
    title: 'Place & Route',
    competency: 4,
    category: ['FPGA & HDL'],
  },
  {
    title: 'Timing Closure',
    competency: 4,
    category: ['FPGA & HDL'],
  },
  {
    title: 'XDC Constraints',
    competency: 4,
    category: ['FPGA & HDL'],
  },
  {
    title: 'Clock Domain Crossing',
    competency: 4,
    category: ['FPGA & HDL'],
  },
  {
    title: 'BRAM',
    competency: 4,
    category: ['FPGA & HDL'],
  },
  {
    title: 'RISC-V (RV64IM)',
    competency: 4,
    category: ['FPGA & HDL'],
  },
  {
    title: 'Wishbone B4',
    competency: 4,
    category: ['FPGA & HDL'],
  },
  {
    title: 'Yosys',
    competency: 4,
    category: ['ASIC & EDA', 'FPGA & HDL'],
  },
  {
    title: 'nextpnr',
    competency: 4,
    category: ['FPGA & HDL'],
  },
  {
    title: 'openFPGALoader',
    competency: 3,
    category: ['FPGA & HDL'],
  },
  {
    title: 'Digital (Hneemann)',
    competency: 5,
    category: ['FPGA & HDL'],
  },
  // Low-Latency & Networking
  {
    title: 'NASDAQ ITCH 5.0',
    competency: 4,
    category: ['Low-Latency & Networking'],
  },
  {
    title: 'MoldUDP64',
    competency: 4,
    category: ['Low-Latency & Networking'],
  },
  {
    title: 'RMII / 100 Mbps MAC',
    competency: 4,
    category: ['Low-Latency & Networking'],
  },
  {
    title: 'AXI4-Stream',
    competency: 4,
    category: ['Low-Latency & Networking'],
  },
  {
    title: 'ARP/IP/UDP',
    competency: 4,
    category: ['Low-Latency & Networking'],
  },
  {
    title: 'LAN8720 MDIO',
    competency: 4,
    category: ['Low-Latency & Networking'],
  },
  // Verification — Tomato UVM/Questa/SVA; ITCH/UDP/MAC cocotb; RISC-V Verilator
  {
    title: 'UVM',
    competency: 4,
    category: ['Verification'],
  },
  {
    title: 'SVA',
    competency: 4,
    category: ['Verification'],
  },
  {
    title: 'cocotb',
    competency: 5,
    category: ['Verification'],
  },
  {
    title: 'Questa',
    competency: 4,
    category: ['Verification'],
  },
  {
    title: 'Verilator',
    competency: 4,
    category: ['Verification'],
  },
  {
    title: 'SymbiYosys',
    competency: 4,
    category: ['Verification'],
  },
  {
    title: 'Formal Verification',
    competency: 4,
    category: ['Verification'],
  },
  {
    title: 'Icarus Verilog',
    competency: 4,
    category: ['Verification'],
  },
  {
    title: 'Functional Coverage',
    competency: 4,
    category: ['Verification'],
  },
  {
    title: 'Constrained-Random',
    competency: 4,
    category: ['Verification'],
  },
  {
    title: 'Golden-Model Scoreboards',
    competency: 4,
    category: ['Verification'],
  },
  // ASIC & EDA
  {
    title: 'LibreLane',
    competency: 4,
    category: ['ASIC & EDA'],
  },
  {
    title: 'OpenLane',
    competency: 4,
    category: ['ASIC & EDA'],
  },
  {
    title: 'OpenROAD',
    competency: 4,
    category: ['ASIC & EDA'],
  },
  {
    title: 'OpenFPGA',
    competency: 3,
    category: ['ASIC & EDA'],
  },
  {
    title: 'Sky130',
    competency: 4,
    category: ['ASIC & EDA'],
  },
  {
    title: 'TinyTapeout',
    competency: 3,
    category: ['ASIC & EDA'],
  },
  {
    title: 'Tcl',
    competency: 3,
    category: ['ASIC & EDA', 'FPGA & HDL'],
  },
  // PCB & Analog
  {
    title: 'KiCad',
    competency: 5,
    category: ['PCB & Analog'],
  },
  {
    title: 'NGSpice',
    competency: 4,
    category: ['PCB & Analog'],
  },
  {
    title: 'Electric VLSI',
    competency: 4,
    category: ['PCB & Analog'],
  },
  {
    title: '6T SRAM',
    competency: 4,
    category: ['PCB & Analog'],
  },
  // Embedded — Vero firmware + RISC-V UART bootloader
  {
    title: 'Embedded C/C++',
    competency: 4,
    category: ['Embedded'],
  },
  {
    title: 'SPI/I²C',
    competency: 4,
    category: ['Embedded'],
  },
  {
    title: 'UART',
    competency: 4,
    category: ['Embedded'],
  },
  {
    title: 'Arduino',
    competency: 3,
    category: ['Embedded'],
  },
  {
    title: 'FSMs',
    competency: 4,
    category: ['Embedded', 'FPGA & HDL'],
  },
  // Software
  {
    title: 'Python',
    competency: 5,
    category: ['Software', 'Verification'],
  },
  {
    title: 'C/C++',
    competency: 4,
    category: ['Embedded', 'Software'],
  },
  {
    title: 'Linux',
    competency: 5,
    category: ['Software'],
  },
  {
    title: 'Bash',
    competency: 4,
    category: ['Software'],
  },
  {
    title: 'TypeScript',
    competency: 4,
    category: ['Software'],
  },
  {
    title: 'Next.js',
    competency: 4,
    category: ['Software'],
  },
  {
    title: 'Swift',
    competency: 3,
    category: ['Software'],
  },
  {
    title: 'FastAPI',
    competency: 4,
    category: ['Software'],
  },
  {
    title: 'PostgreSQL',
    competency: 4,
    category: ['Software'],
  },
  {
    title: 'Pytest',
    competency: 4,
    category: ['Software', 'Verification'],
  },
  {
    title: 'Docker',
    competency: 3,
    category: ['Software'],
  },
  {
    title: 'Git',
    competency: 5,
    category: ['Software'],
  },
  {
    title: 'REST APIs',
    competency: 4,
    category: ['Software'],
  },
].map((skill) => ({ ...skill, category: skill.category.sort() }));

/**
 * Build categories from skills, all using the accent color token.
 */
function buildCategories(skillsList: Skill[]): Category[] {
  const uniqueCategories = Array.from(
    new Set(skillsList.flatMap(({ category }) => category)),
  ).sort();

  return uniqueCategories.map((category) => ({
    name: category,
    color: 'var(--color-accent)',
  }));
}

const categories: Category[] = buildCategories(skills);

export { categories, skills };
