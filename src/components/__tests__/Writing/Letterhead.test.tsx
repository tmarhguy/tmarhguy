import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Letterhead from '../../Writing/Letterhead';

describe('Letterhead', () => {
  it('renders project link and padded date on index rows', () => {
    render(
      <Letterhead
        date="2026-08-02"
        projectLabel="Tomato CPU"
        projectLink="https://github.com/tmarhguy/tomato"
        variant="index"
      />,
    );

    expect(screen.getByText('Aug 02, 2026')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /project/i });
    expect(link).toHaveAttribute('href', 'https://github.com/tmarhguy/tomato');
  });

  it('keeps the live Tomato site next to GitHub on post pages', () => {
    render(
      <Letterhead
        date="2026-08-02"
        projectLabel="Tomato CPU"
        projectLink="https://github.com/tmarhguy/tomato"
        projectSite="https://tomato.tmarhguy.com"
        variant="post"
      />,
    );

    expect(screen.getByRole('link', { name: /Tomato CPU/i })).toHaveAttribute(
      'href',
      'https://tomato.tmarhguy.com',
    );
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/tmarhguy/tomato',
    );
  });

  it('shows the project label on post pages in a meta row with the date', () => {
    render(
      <Letterhead
        date="2026-08-02"
        projectLabel="Tomato CPU"
        projectLink="https://github.com/tmarhguy/tomato"
        variant="post"
      />,
    );

    const link = screen.getByRole('link', { name: /Tomato CPU/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('target', '_blank');
    expect(screen.getByText('Aug 02, 2026')).toBeInTheDocument();
    expect(link.closest('.writing-letterhead--row')).toBeTruthy();
  });

  it('keeps on-site project links in the same tab', () => {
    render(
      <Letterhead
        date="2026-08-11"
        projectLabel="Open Source"
        projectLink="/projects/#open-source-title"
        variant="post"
      />,
    );

    const link = screen.getByRole('link', { name: /Open Source/i });
    expect(link).toHaveAttribute('href', '/projects/#open-source-title');
    expect(link).not.toHaveAttribute('target');
  });
});
