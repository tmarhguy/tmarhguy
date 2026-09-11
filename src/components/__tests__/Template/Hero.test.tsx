import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Hero from '../../Template/Hero';

describe('Hero', () => {
  it('renders the hero section', () => {
    render(<Hero />);

    const heroSection = document.querySelector('.hero');
    expect(heroSection).toBeInTheDocument();
  });

  it('displays the name as heading', () => {
    render(<Hero />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Tyrone Marhguy');
  });

  it('introduces the builder and links to the project and professional context', () => {
    const { container } = render(<Hero />);
    const intro = container.querySelector('.hero-intro');
    expect(intro).toHaveTextContent('from first principles.');
    expect(intro).toHaveTextContent('Computer Engineering junior');
    expect(intro).not.toHaveTextContent('incoming');
    expect(screen.getByRole('link', { name: /^Tomato$/ })).toHaveAttribute(
      'href',
      'https://tomato.tmarhguy.com',
    );
    expect(
      screen.getByRole('link', { name: /University of Pennsylvania/ }),
    ).toHaveAttribute('href', 'https://www.upenn.edu');
    expect(
      screen.getByRole('link', { name: /Fluid Silicon/ }),
    ).toBeInTheDocument();
  });

  it('keeps personal stats and incomplete credential lists off the homepage', () => {
    const { container } = render(<Hero />);

    expect(container.querySelector('.telemetry')).not.toBeInTheDocument();
    expect(container.querySelector('.hero-chips')).not.toBeInTheDocument();
    expect(screen.queryByText('Countries visited')).not.toBeInTheDocument();
    expect(screen.queryByText('Computing since')).not.toBeInTheDocument();
    expect(screen.queryByText('Based in')).not.toBeInTheDocument();
    expect(screen.queryByText('YC Alum')).not.toBeInTheDocument();
    expect(screen.queryByText('Stanford ICME')).not.toBeInTheDocument();
  });

  it('renders projects as the primary CTA and resume as the quieter link', () => {
    render(<Hero />);

    const projectsButton = screen.getByRole('link', { name: /view projects/i });
    expect(projectsButton).toHaveAttribute('href', '/projects/');
    expect(projectsButton).toHaveClass('button');

    const resumeButton = screen.getByRole('link', { name: /view resume/i });
    expect(resumeButton).toHaveAttribute('href', '/resume/');
    expect(resumeButton).toHaveClass('hero-resume-link');
    expect(resumeButton).not.toHaveClass('button');
  });

  it('has decorative background elements', () => {
    render(<Hero />);

    const bg = document.querySelector('.hero-bg');
    expect(bg).toBeInTheDocument();
    expect(bg).toHaveAttribute('aria-hidden', 'true');
  });
});
