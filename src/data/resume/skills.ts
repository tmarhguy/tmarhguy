export interface Skill {
  title: string;
  competency: number;
  category: string[];
}

export interface Category {
  name: string;
  color: string;
}

const skills: Skill[] = [
  // FPGA & HDL
  {
    title: 'SystemVerilog',
    competency: 5,
    category: ['FPGA & HDL'],
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
    title: 'RTL Synthesis',
    competency: 4,
    category: ['FPGA & HDL'],
  },
  {
    title: 'Timing Closure',
    competency: 4,
    category: ['FPGA & HDL'],
  },
  {
    title: 'Quartus',
    competency: 3,
    category: ['FPGA & HDL'],
  },
  {
    title: 'VHDL',
    competency: 3,
    category: ['FPGA & HDL'],
  },
  // Low-Latency & Networking
  {
    title: 'NASDAQ ITCH 5.0',
    competency: 4,
    category: ['Low-Latency & Networking'],
  },
  {
    title: '1 GbE MAC / RGMII',
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
  // Verification
  {
    title: 'cocotb',
    competency: 5,
    category: ['Verification'],
  },
  {
    title: 'SymbiYosys',
    competency: 4,
    category: ['Verification'],
  },
  {
    title: 'Verilator',
    competency: 4,
    category: ['Verification'],
  },
  {
    title: 'Formal Verification',
    competency: 4,
    category: ['Verification'],
  },
  // Platforms & Scripting
  {
    title: 'Python',
    competency: 5,
    category: ['Platforms & Scripting'],
  },
  {
    title: 'C/C++',
    competency: 4,
    category: ['Platforms & Scripting'],
  },
  {
    title: 'Linux',
    competency: 5,
    category: ['Platforms & Scripting'],
  },
  {
    title: 'Tcl',
    competency: 3,
    category: ['Platforms & Scripting'],
  },
  {
    title: 'Bash',
    competency: 4,
    category: ['Platforms & Scripting'],
  },
  // Software
  {
    title: 'Pytest',
    competency: 4,
    category: ['Software'],
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
  {
    title: 'Data Structures & Algorithms',
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
