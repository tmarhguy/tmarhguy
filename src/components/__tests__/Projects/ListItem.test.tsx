import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Project } from '@/data/projects';

import ListItem from '../../Projects/ListItem';

describe('ListItem', () => {
  const mockProject: Project = {
    title: 'Test Project',
    subtitle: 'A test subtitle',
    link: 'https://example.com',
    date: '2026-07-01',
    period: 'Jul. 2026',
    desc: 'This is a test project description',
    tech: ['SystemVerilog', 'Python'],
    category: 'hardware',
  };

  it('renders project title and description', () => {
    render(<ListItem data={mockProject} />);
    expect(screen.getByText(mockProject.title)).toBeInTheDocument();
    expect(screen.getByText(mockProject.desc)).toBeInTheDocument();
  });

  it('renders period in the date column', () => {
    render(<ListItem data={mockProject} />);
    expect(screen.getByText('Jul. 2026')).toBeInTheDocument();
  });

  it('links the title when a URL is present', () => {
    render(<ListItem data={mockProject} />);
    const link = screen.getByRole('link', { name: /Test Project/i });
    expect(link).toHaveAttribute('href', mockProject.link);
  });

  it('keeps the live site and GitHub as sibling links', () => {
    render(
      <ListItem
        data={{
          ...mockProject,
          title: 'Tomato — Discrete 32-bit Polymorphic Dual-LUT3 CPU',
          site: 'https://tomato.tmarhguy.com',
          link: 'https://github.com/tmarhguy/tomato',
        }}
      />,
    );

    expect(
      screen.getByRole('link', {
        name: /Tomato — Discrete 32-bit Polymorphic Dual-LUT3 CPU/i,
      }),
    ).toHaveAttribute('href', 'https://tomato.tmarhguy.com');
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/tmarhguy/tomato',
    );
  });

  it('exposes a stable anchor id for deep links from the homepage', () => {
    render(<ListItem data={{ ...mockProject, slug: 'test-project' }} />);
    expect(document.getElementById('test-project')).toBeTruthy();
  });

  it('links to the writing section when the project has build logs', () => {
    render(
      <ListItem
        data={{
          ...mockProject,
          logProject: 'tomato',
        }}
      />,
    );

    const logLink = screen.getByRole('link', { name: /^log$/i });
    expect(logLink).toHaveAttribute('href', '/writing/#writing-tomato-aug');
  });

  it('omits the log link when the project has no build notes', () => {
    render(<ListItem data={mockProject} />);
    expect(
      screen.queryByRole('link', { name: /^log$/i }),
    ).not.toBeInTheDocument();
  });

  it('renders tech tags', () => {
    render(<ListItem data={mockProject} />);
    expect(screen.getByText('SystemVerilog · Python')).toBeInTheDocument();
  });

  it('renders a highlight badge when set', () => {
    render(
      <ListItem data={{ ...mockProject, highlight: 'Favorite project' }} />,
    );
    expect(screen.getByText(/Favorite project/i)).toBeInTheDocument();
    expect(document.querySelector('.project-highlight')).toBeTruthy();
  });
});
