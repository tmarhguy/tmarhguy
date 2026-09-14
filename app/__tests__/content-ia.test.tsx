import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { getOpenSourceContributions } from '@/data/open-source';
import projects, {
  getEarlierProjects,
  getHardwareProjects,
  getHiddenProjects,
  getHomeFeaturedItems,
  getSoftwareProjects,
  getToolsProjects,
} from '@/data/projects';
import {
  getAllLogs,
  getHomeRecentLogs,
  getLogProjectGroupKey,
} from '@/lib/logs';
import HomePage from '../page';
import ProjectsPage from '../projects/page';
import WritingPage from '../writing/page';

describe('writing information architecture', () => {
  it('surfaces featured projects on the homepage', () => {
    const featured = getHomeFeaturedItems();

    render(<HomePage />);

    const section = screen.getByRole('region', { name: 'Projects' });

    expect(section).toBeInTheDocument();
    expect(within(section).queryAllByRole('link')).toHaveLength(
      featured.length + 1,
    );
    expect(
      within(section).getByRole('link', { name: 'View all' }),
    ).toHaveAttribute('href', '/projects/');
    expect(
      [...section.querySelectorAll('.home-project-item h3')].map(
        (heading) => heading.textContent,
      ),
    ).toEqual(featured.map((item) => item.title));
  });

  it('pins the September wallpaper log as the lead recent-writing card on the homepage', () => {
    const expected = getHomeRecentLogs(3);

    expect(expected[0]?.slug).toBe(
      '2026-09-11-wallpaper-polish-and-the-rest-of-the-computer',
    );

    const { container } = render(<HomePage />);
    const section = screen.getByRole('region', { name: 'Recent writing' });
    const cards = container.querySelectorAll('.home-writing-item');

    expect(cards).toHaveLength(expected.length);
    expect(
      [...cards].map((card) => card.querySelector('h3')?.textContent),
    ).toEqual(expected.map((entry) => entry.title));
    expect(
      within(section).getByRole('link', { name: 'View all' }),
    ).toHaveAttribute('href', '/writing/');
  });

  it('groups writing by project on the writing index', () => {
    const { container } = render(<WritingPage />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Writing' }),
    ).toBeInTheDocument();
    expect(container.querySelectorAll('.writing-group')).toHaveLength(
      new Set(getAllLogs().map(getLogProjectGroupKey)).size,
    );
    expect(container.querySelectorAll('.writing-list-item')).toHaveLength(
      getAllLogs().length,
    );
  });

  it('shows project labels on writing cards', () => {
    render(<WritingPage />);

    expect(
      screen.getByRole('heading', { name: 'Tomato CPU — September' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Tomato CPU — August' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Mango Tools' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: '8-bit Discrete Transistor ALU' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Tomato CPU — July' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'FramePort' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Tomato CPU — Earlier' }),
    ).toBeInTheDocument();
  });

  it('lists curated projects on the projects index', () => {
    render(<ProjectsPage />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Projects' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Open source' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Hardware' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Tools' }),
    ).toBeInTheDocument();
    expect(screen.getByText('FramePort')).toBeInTheDocument();
    expect(screen.getByText('Mango Tools')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Software' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Earlier software' }),
    ).toBeInTheDocument();

    const mainCount =
      getHardwareProjects().length +
      getToolsProjects().length +
      getSoftwareProjects().length;
    expect(screen.getAllByRole('article')).toHaveLength(mainCount);

    const visible = [
      ...getHardwareProjects(),
      ...getToolsProjects(),
      ...getSoftwareProjects(),
      ...getEarlierProjects(),
    ];
    expect(visible.length + getHiddenProjects().length).toBe(projects.length);

    for (const project of visible) {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    }

    for (const project of getHiddenProjects()) {
      expect(screen.queryByText(project.title)).not.toBeInTheDocument();
    }

    for (const contribution of getOpenSourceContributions()) {
      expect(
        screen.getAllByRole('link', { name: contribution.title }).length,
      ).toBeGreaterThan(0);
    }
  });
});
