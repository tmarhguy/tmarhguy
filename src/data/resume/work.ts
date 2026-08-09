/**
 * Conforms to https://jsonresume.org/schema/
 */
export interface Position {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate?: string;
  /** Accepted role that has not started yet — dates render as "Starting …". */
  upcoming?: boolean;
  summary?: string;
  highlights?: string[];
}

const work: Position[] = [
  {
    name: 'Pennovation Center — University of Pennsylvania',
    position: 'Hardware Research Engineer',
    url: 'https://www.upenn.edu',
    startDate: '2026-08-01',
    upcoming: true,
    summary:
      'Starting Fall 2026. FPGA utilization research — RTL workload characterization and synthesis-flow automation.',
    highlights: [
      'Characterize FPGA RTL workloads across logic, memory, and DSP blocks; automate Vivado/Quartus place-and-route and timing/area extraction in Python/C++.',
      'Develop Python/C++ tooling to parse synthesis reports for reproducible FPGA benchmarking and RTL regression.',
      'Contributor to OpenFPGA — open-source FPGA IP generator with silicon proofs.',
    ],
  },
  {
    name: 'Aragorn AI, Inc.',
    position: 'Software Engineering Intern',
    url: 'https://www.aragorn.ai',
    startDate: '2026-06-01',
    endDate: '2026-08-01',
    highlights: [
      'Shipped production backend services and REST APIs for AI model-integration workflows, extending platform capabilities used in customer-facing releases.',
      'Diagnosed cross-service integration failures blocking release sprints; contributed to architecture and code reviews to harden service boundaries before deployment.',
    ],
  },
  {
    name: 'Vero Electric',
    position: 'Hardware & Firmware Engineer',
    url: 'https://veroelectric.com/',
    startDate: '2026-05-01',
    endDate: '2026-08-01',
    highlights: [
      'Developed embedded C/C++ firmware with real-time fault-detection FSMs and SPI/I²C acquisition; debugged board bring-up with oscilloscope and logic analyzer on prototype units.',
      'Designed BQ79616 sensing front-end in KiCad (0 ERC); integrated into 240 kWh / 120 kW BESS stack with commissioning and acceptance testing.',
    ],
  },
  {
    name: 'Howard University STEM Achievers',
    position: 'STEM Instructor — AR/VR',
    url: 'https://education.howard.edu/affiliated-programs/stem-summer-camp-verizon-innovative-learning',
    startDate: '2026-06-01',
    endDate: '2026-07-31',
    highlights: [
      'Verizon Innovative Learning summer program — immersive media, AR, and design thinking for rising 6th–8th graders.',
      'Taught augmented reality, 3D printing, and digital product modules in Howard’s three-week STEM Achievers camp.',
      'Mentored middle school students through design-thinking projects and hands-on technology labs.',
    ],
  },
  {
    name: 'University of Pennsylvania',
    position: 'Teaching Assistant — CIS 1100: Intro to Programming',
    url: 'https://www.upenn.edu',
    startDate: '2025-08-01',
    endDate: '2025-12-01',
    highlights: [
      'Authored 50+ Pytest autograding suites for 300+ students; designed edge-case, boundary, and regression coverage for weekly assignment releases.',
    ],
  },

  {
    name: 'Fife-Penn STEM & CS Academy',
    position: 'Programming & Engineering Instructor',
    url: 'https://fife.cis.upenn.edu/',
    startDate: '2025-02-01',
    endDate: '2025-05-31',
    highlights: [
      'Taught Python, Scratch, and introductory engineering concepts in free after-school coding clubs for Philadelphia K-8 students.',
      'Designed weekly lesson plans and debugging exercises across partner schools with Penn Engineering peers.',
    ],
  },
];

export default work;
