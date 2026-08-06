export interface LogProject {
  id: string;
  label: string;
  /** Optional link to the live repo or project page */
  link?: string;
}

/** Projects referenced by build logs — ids match frontmatter `project`. Order is the writing index. */
const logProjects: LogProject[] = [
  {
    id: 'itch-hw',
    label: 'NASDAQ ITCH Hardware Parser',
    link: 'https://github.com/tmarhguy/itch-hw',
  },
  {
    id: 'mac',
    label: '16-bit MAC Unit (Sky130)',
    link: 'https://github.com/tmarhguy/mac',
  },
  {
    id: 'tomato',
    label: 'Tomato CPU',
    link: 'https://github.com/tmarhguy/tomato',
  },
  {
    id: 'alu',
    label: '8-bit Discrete Transistor ALU',
    link: 'https://alu.tmarhguy.com',
  },
  {
    id: 'mango',
    label: 'Mango Tools',
    link: 'https://github.com/tmarhguy/tools',
  },
];

export function getLogProject(id: string): LogProject | undefined {
  return logProjects.find((project) => project.id === id);
}

/** Writing index section order — lower comes first. */
export function getLogProjectOrder(id: string): number {
  const index = logProjects.findIndex((project) => project.id === id);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

export default logProjects;
