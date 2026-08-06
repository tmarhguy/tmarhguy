import type { Metadata } from 'next';

import ListItem from '@/components/Projects/ListItem';
import { SchemaGraph } from '@/components/Schema';
import PageWrapper from '@/components/Template/PageWrapper';
import {
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

const PROJECTS_DESCRIPTION = `Hardware and software projects by ${AUTHOR_NAME} — RTL, FPGA, ASIC tapeouts, and full-stack systems.`;

export const metadata: Metadata = createPageMetadata({
  title: 'Projects',
  description: PROJECTS_DESCRIPTION,
  path: '/projects/',
});

export default function ProjectsPage() {
  const hardwareProjects = getHardwareProjects();
  const toolsProjects = getToolsProjects();
  const softwareProjects = getSoftwareProjects();

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
      <section className="projects-page">
        <header className="projects-header">
          <h1 className="page-title">Projects</h1>
          <p className="page-subtitle">
            RTL through tapeout, terminal tools, and software systems — the full
            build log.
          </p>
        </header>

        <section
          className="projects-list-section"
          aria-labelledby="hardware-projects-title"
        >
          <h2 className="projects-section-title" id="hardware-projects-title">
            Hardware
          </h2>
          <div className="project-list">
            {hardwareProjects.map((project) => (
              <ListItem data={project} key={project.title} />
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
              {toolsProjects.map((project) => (
                <ListItem data={project} key={project.title} />
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
              {softwareProjects.map((project) => (
                <ListItem data={project} key={project.title} />
              ))}
            </div>
          </section>
        )}
      </section>
    </PageWrapper>
  );
}
