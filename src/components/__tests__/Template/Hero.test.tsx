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

  it('summarizes the hardware/software arc and links mentioned projects', () => {
    const { container } = render(<Hero />);

    const intro = container.querySelector('.hero-intro');
    expect(intro).toHaveTextContent('discrete transistors to tapeout');
    expect(intro).toHaveTextContent('32-bit CPU');
    expect(intro).toHaveTextContent('NASDAQ market data parsers');
    expect(intro).toHaveTextContent('terminal toolbox');

    expect(screen.getByRole('link', { name: /^32-bit CPU$/i })).toHaveAttribute(
      'href',
      '/projects/#tomato',
    );
    expect(
      screen.getByRole('link', { name: /^full-custom SRAM$/i }),
    ).toHaveAttribute('href', '/projects/#full-custom-sram');
    expect(
      screen.getByRole('link', { name: /^NASDAQ market data parsers$/i }),
    ).toHaveAttribute('href', '/projects/#nasdaq-itch');
    expect(
      screen.getByRole('link', { name: /^terminal toolbox$/i }),
    ).toHaveAttribute('href', '/projects/#mango-tools');

    expect(screen.getByRole('link', { name: /^projects$/i })).toHaveAttribute(
      'href',
      '/projects/',
    );
    expect(screen.getByRole('link', { name: /^experience$/i })).toHaveAttribute(
      'href',
      '/resume/',
    );
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
