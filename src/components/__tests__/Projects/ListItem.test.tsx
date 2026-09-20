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
    expect(screen.getByText('2026')).toBeInTheDocument();
  });

  it('links the title when a URL is present', () => {
    render(<ListItem data={mockProject} />);
    const link = screen.getByRole('link', { name: /Test Project/i });
    expect(link).toHaveAttribute('href', mockProject.link);
  });

  it('puts live Open VSX shields beside the title and points them at the listing', () => {
    render(
      <ListItem
        data={{
          ...mockProject,
          title: 'FramePort',
          site: 'https://open-vsx.org/extension/tmarhguy/frameport',
          link: 'https://github.com/tmarhguy/frameport',
          openVsx: 'tmarhguy/frameport',
        }}
      />,
    );

    expect(screen.getByRole('link', { name: 'FramePort' })).toHaveAttribute(
      'href',
      'https://open-vsx.org/extension/tmarhguy/frameport',
    );
    const versionBadge = screen.getByRole('img', {
      name: 'FramePort Open VSX version',
    });
    const downloadsBadge = screen.getByRole('img', {
      name: 'FramePort Open VSX downloads',
    });
    expect(versionBadge).toHaveAttribute(
      'src',
      'https://img.shields.io/open-vsx/v/tmarhguy/frameport?style=flat-square',
    );
    expect(downloadsBadge).toHaveAttribute(
      'src',
      'https://img.shields.io/open-vsx/dt/tmarhguy/frameport?style=flat-square',
    );
    expect(versionBadge.closest('a')).toHaveAttribute(
      'href',
      'https://open-vsx.org/extension/tmarhguy/frameport',
    );
    expect(downloadsBadge.closest('a')).toBe(versionBadge.closest('a'));
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/tmarhguy/frameport',
    );
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
    expect(logLink).toHaveAttribute('href', '/writing/#writing-tomato-sep');
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

  it('links the exhibit image to the same destination as the title', () => {
    const { container } = render(
      <ListItem
        data={{
          ...mockProject,
          image: '/images/projects/mac-core.webp',
          imageCaption: 'MAC core preview',
        }}
      />,
    );

    const mediaLink = container.querySelector(
      '.project-exhibit-media-link',
    ) as HTMLAnchorElement | null;
    expect(mediaLink).toBeInTheDocument();
    expect(mediaLink).toHaveAttribute('href', mockProject.link);
    expect(mediaLink).toHaveAttribute('aria-label', 'Open Test Project');
  });

  it('autoplays the demo video instead of the still when set', () => {
    const { container } = render(
      <ListItem
        data={{
          ...mockProject,
          video: '/images/os/tomato-demo.mp4',
          videoPoster: '/images/os/tomato-demo-poster.webp',
        }}
      />,
    );
    const video = container.querySelector(
      '.project-exhibit-media video',
    ) as HTMLVideoElement | null;
    expect(video).toBeInTheDocument();
    expect(video!.autoplay).toBe(true);
    expect(video!.muted).toBe(true);
    expect(video!.loop).toBe(true);
    expect(video!.playsInline).toBe(true);
    expect(video!.getAttribute('poster')).toBe(
      '/images/os/tomato-demo-poster.webp',
    );
    expect(video!.querySelector('source')).toHaveAttribute(
      'src',
      '/images/os/tomato-demo.mp4',
    );
    expect(container.querySelector('.project-exhibit-media img')).toBeNull();
    expect(
      container.querySelector('.project-exhibit-media-link'),
    ).toHaveAttribute('href', mockProject.link);
  });
});
