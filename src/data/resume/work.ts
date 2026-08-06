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
    name: 'University of Pennsylvania',
    position: 'Teaching Assistant — CIS 1100: Intro to Programming',
    url: 'https://www.upenn.edu',
    startDate: '2025-08-01',
    endDate: '2025-12-01',
    highlights: [
      'Authored 50+ Pytest autograding suites for 300+ students; designed edge-case, boundary, and regression coverage for weekly assignment releases.',
    ],
  },
];

export default work;
