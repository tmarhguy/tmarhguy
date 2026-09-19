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
    name: 'Vero Electric',
    position: 'Hardware & Firmware Engineer',
    url: 'https://veroelectric.com/',
    startDate: '2026-05-01',
    endDate: '2026-08-01',
    highlights: [
      'Designed/routed a BQ79616 16-channel battery-monitoring front end for a 240 kWh / 120 kW energy-storage system; closed PCB ERC/DRC with zero errors.',
      'Developed embedded C/C++ fault-detection and SPI/I2C acquisition firmware; supported board bring-up with oscilloscopes and logic analyzers.',
    ],
  },
  {
    name: 'Aragorn AI, Inc.',
    position: 'Software Engineer Intern',
    url: 'https://www.aragorn.ai',
    startDate: '2026-05-01',
    endDate: '2026-08-31',
    highlights: [
      'Contributed to production backend/API-integration workflows for AI services; debugged cross-service issues and documented service interfaces for production integrations.',
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
