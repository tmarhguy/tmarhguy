import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { getOpenSourceContributions } from '@/data/open-source';
import projects, { getFeaturedProjects } from '@/data/projects';
import { getAllLogs, getLogProjectGroupKey } from '@/lib/logs';
import HomePage from '../page';
import ProjectsPage from '../projects/page';
import WritingPage from '../writing/page';

describe('writing information architecture', () => {
  it('surfaces featured projects on the homepage', () => {
    const featured = getFeaturedProjects();

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
    ).toEqual(featured.map((project) => project.title));
  });

  it('surfaces the three newest writing entries on the homepage', () => {
    const expected = getAllLogs().slice(0, 3);

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
      screen.getByRole('heading', { name: 'Tomato CPU — August' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Tomato CPU — July' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Tomato CPU — Earlier' }),
    ).toBeInTheDocument();
  });

  it('lists all projects on the projects index', () => {
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
    expect(
      screen.getByRole('heading', { level: 2, name: 'Software' }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(projects.length);

    for (const project of projects) {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    }

    for (const contribution of getOpenSourceContributions()) {
      expect(
        screen.getAllByRole('link', { name: contribution.title }).length,
      ).toBeGreaterThan(0);
    }
  });
});
