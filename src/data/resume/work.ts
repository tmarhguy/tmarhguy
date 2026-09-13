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
    name: 'Fluid Silicon Inc.',
    position: 'Hardware Research Engineer Intern',
    url: 'https://penntoday.upenn.edu/news/penn-student-develops-way-computer-chips-run-more-efficiently',
    startDate: '2026-08-25',
    endDate: '2026-12-07',
    summary:
      'Fall 2026 term at [Pennovation Center](https://pennovation.upenn.edu), Philadelphia.',
    highlights: [
      'Automated floorplanning, P&R, PPA extraction, timing constraints, and synthesis-to-layout handoff in Tcl/Python; built parsers that improved utilization models by 15%.',
    ],
  },
  {
    name: 'Aragorn AI, Inc.',
    position: 'Software Engineering Intern',
    url: 'https://www.aragorn.ai',
    startDate: '2026-06-01',
    endDate: '2026-08-31',
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
      'Developed embedded C/C++ fault-detection firmware and a BQ79616 16-channel battery-monitoring front end for a 240 kWh / 120 kW system; closed PCB ERC with 0 errors and debugged bring-up with lab instruments.',
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
