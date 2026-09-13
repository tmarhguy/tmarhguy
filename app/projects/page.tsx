import type { Metadata } from 'next';
import EarlierList from '@/components/Projects/EarlierList';
import ListItem from '@/components/Projects/ListItem';
import OpenSourceStrip from '@/components/Projects/OpenSourceStrip';
import { SchemaGraph } from '@/components/Schema';
import PageWrapper from '@/components/Template/PageWrapper';
import { getOpenSourceContributions } from '@/data/open-source';
import {
  getEarlierProjects,
  getHardwareProjects,
  getSoftwareProjects,
  getToolsProjects,
} from '@/data/projects';
import { createPageMetadata } from '@/lib/metadata';
import {
  breadcrumbNode,
  collectionPageNode,
  HOME_URL,
  SITE_URL,
} from '@/lib/schema';
import { AUTHOR_NAME } from '@/lib/utils';

const PROJECTS_URL = `${SITE_URL}/projects/`;

const PROJECTS_DESCRIPTION = `Hardware and software projects by ${AUTHOR_NAME} — RTL, FPGA, ASIC implementation, and full-stack systems.`;

export const metadata: Metadata = createPageMetadata({
  title: 'Projects',
  description: PROJECTS_DESCRIPTION,
  path: '/projects/',
});

export default function ProjectsPage() {
  const hardwareProjects = getHardwareProjects();
  const toolsProjects = getToolsProjects();
  const softwareProjects = getSoftwareProjects();
  const earlierProjects = getEarlierProjects();
  const openSourceContributions = getOpenSourceContributions();

  // Inverted rank: the first project (Tomato) carries the highest number,
  // counting down across sections in display order.
  const totalProjects =
    hardwareProjects.length + toolsProjects.length + softwareProjects.length;
  let rank = totalProjects + 1;
  const ranked = <T,>(projects: T[]): { project: T; number: number }[] =>
    projects.map((project) => ({ project, number: --rank }));

  return (
    <PageWrapper>
      <SchemaGraph
        nodes={[
          collectionPageNode({
            url: PROJECTS_URL,
            name: 'Projects',
            description: PROJECTS_DESCRIPTION,
            hasBreadcrumb: true,
          }),
          breadcrumbNode(PROJECTS_URL, [
            { name: 'Home', url: HOME_URL },
            { name: 'Projects', url: PROJECTS_URL },
          ]),
        ]}
      />
      <section className="projects-page projects-exhibition">
        <header className="projects-header">
          <span className="home-section-kicker">
            Selected builds / Open notebooks / Working systems
          </span>
          <h1 className="page-title">Projects</h1>
          <p className="page-subtitle">
            From the transistor to the terminal. Computers, circuits, and tools
            I wanted to exist—so I started building them.
          </p>
        </header>

        <nav className="project-jump-nav" aria-label="Project categories">
          <a href="#hardware-projects-title">
            Hardware <span>{hardwareProjects.length}</span>
          </a>
          {toolsProjects.length > 0 && (
            <a href="#tools-projects-title">
              Tools <span>{toolsProjects.length}</span>
            </a>
          )}
          {softwareProjects.length > 0 && (
            <a href="#software-projects-title">
              Software <span>{softwareProjects.length}</span>
            </a>
          )}
          {earlierProjects.length > 0 && (
            <a href="#earlier-projects-title">
              Earlier <span>{earlierProjects.length}</span>
            </a>
          )}
          <a href="#open-source-title">Open source</a>
        </nav>

        <section
          className="projects-list-section"
          aria-labelledby="hardware-projects-title"
        >
          <h2 className="projects-section-title" id="hardware-projects-title">
            Hardware
          </h2>
          <div className="project-list">
            {ranked(hardwareProjects).map(({ project, number }) => (
              <ListItem data={project} number={number} key={project.title} />
            ))}
          </div>
        </section>

        {toolsProjects.length > 0 && (
          <section
            className="projects-list-section"
            aria-labelledby="tools-projects-title"
          >
            <h2 className="projects-section-title" id="tools-projects-title">
              Tools
            </h2>
            <div className="project-list">
              {ranked(toolsProjects).map(({ project, number }) => (
                <ListItem data={project} number={number} key={project.title} />
              ))}
            </div>
          </section>
        )}

        {softwareProjects.length > 0 && (
          <section
            className="projects-list-section"
            aria-labelledby="software-projects-title"
          >
            <h2 className="projects-section-title" id="software-projects-title">
              Software
            </h2>
            <div className="project-list">
              {ranked(softwareProjects).map(({ project, number }) => (
                <ListItem data={project} number={number} key={project.title} />
              ))}
            </div>
          </section>
        )}

        {earlierProjects.length > 0 && (
          <section
            className="projects-list-section"
            aria-labelledby="earlier-projects-title"
          >
            <h2 className="projects-section-title" id="earlier-projects-title">
              Earlier software
            </h2>
            <EarlierList projects={earlierProjects} />
          </section>
        )}

        {openSourceContributions.length > 0 && (
          <OpenSourceStrip
            contributions={openSourceContributions}
            showEvidence
          />
        )}
      </section>
    </PageWrapper>
  );
}
