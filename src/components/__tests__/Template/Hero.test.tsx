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

  it('summarizes the hardware arc and links key projects and employers', () => {
    const { container } = render(<Hero />);

    const intro = container.querySelector('.hero-intro');
    expect(intro).toHaveTextContent('Computer Engineering Junior');
    expect(intro).toHaveTextContent('University of Pennsylvania');
    expect(intro).toHaveTextContent('The Builds:');
    expect(intro).toHaveTextContent('Open Source Contributions:');
    expect(intro).toHaveTextContent('3.0.8 and 3.0.10 releases');
    expect(intro).toHaveTextContent('Tomato');
    expect(intro).toHaveTextContent('100 Mbps UDP/IP stack');
    expect(intro).toHaveTextContent('NASDAQ ITCH 5.0 FPGA parser');
    expect(intro).toHaveTextContent('3,488 MOSFET ALU');
    expect(intro).toHaveTextContent('The Work:');
    expect(intro).toHaveTextContent('Fluid Silicon');

    expect(
      screen.getByRole('link', { name: /university of pennsylvania/i }),
    ).toHaveAttribute('href', 'https://www.upenn.edu');
    expect(screen.getByRole('link', { name: /3\.0\.8/ })).toHaveAttribute(
      'href',
      'https://github.com/librelane/librelane/releases/tag/3.0.8',
    );
    expect(screen.getByRole('link', { name: /3\.0\.10/ })).toHaveAttribute(
      'href',
      'https://github.com/librelane/librelane/releases/tag/3.0.10',
    );
    expect(screen.getByRole('link', { name: /^tomato$/i })).toHaveAttribute(
      'href',
      'https://tomato.tmarhguy.com',
    );
    expect(
      screen.getByRole('link', { name: /100 mbps udp\/ip stack/i }),
    ).toHaveAttribute('href', 'https://github.com/tmarhguy/udp-stack');
    expect(
      screen.getByRole('link', { name: /nasdaq itch 5\.0 fpga parser/i }),
    ).toHaveAttribute('href', 'https://github.com/tmarhguy/itch-hw');
    expect(
      screen.getByRole('link', { name: /3,488 MOSFET ALU/i }),
    ).toHaveAttribute('href', 'https://alu.tmarhguy.com');
    expect(
      screen.getByRole('link', { name: /sky130 bfloat16 mac/i }),
    ).toHaveAttribute('href', 'https://github.com/tmarhguy/mac');
    expect(
      screen.getByRole('link', { name: /full-custom 22nm sram/i }),
    ).toHaveAttribute('href', 'https://github.com/tmarhguy/64b-sram');
    expect(
      screen.getByRole('link', { name: /fluid silicon/i }),
    ).toHaveAttribute(
      'href',
      'https://penntoday.upenn.edu/news/penn-student-develops-way-computer-chips-run-more-efficiently',
    );
    expect(screen.getByRole('link', { name: /vero electric/i })).toHaveAttribute(
      'href',
      'https://veroelectric.com/',
    );
    expect(screen.getByRole('link', { name: /aragorn ai/i })).toHaveAttribute(
      'href',
      'https://www.aragorn.ai',
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
