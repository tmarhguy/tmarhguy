import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Footer from '../../Template/Footer';

describe('Footer', () => {
  it('renders the footer with correct structure', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('displays the name and role', () => {
    render(<Footer />);

    expect(screen.getByText('Tyrone Marhguy')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Hardware Research Engineer Intern at Fluid Silicon Inc.',
      ),
    ).toBeInTheDocument();
  });

  it('does not introduce unrelated headings into the page outline', () => {
    render(<Footer />);

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('displays the current year in copyright', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear().toString();
    expect(
      screen.getByText(new RegExp(`© ${currentYear}`)),
    ).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Footer />);

    const explore = document.querySelector('.footer-links-grid');
    expect(explore).toBeInTheDocument();

    expect(explore?.querySelector('a[href="/about"]')).toHaveTextContent(
      /about/i,
    );
    expect(explore?.querySelector('a[href="/resume"]')).toHaveTextContent(
      /resume/i,
    );
    // Labelled "Projects" to match the nav and the page's own heading;
    // the route stays /projects.
    expect(explore?.querySelector('a[href="/projects"]')).toHaveTextContent(
      /projects/i,
    );
    expect(explore?.querySelector('a[href="/contact"]')).toHaveTextContent(
      /contact/i,
    );
    expect(
      explore?.querySelector('a[href="https://github.com/tmarhguy"]'),
    ).toHaveTextContent(/github/i);
  });

  it('renders contact icons section', () => {
    render(<Footer />);

    // Contact icons are rendered via ContactIcons component
    const socialSection = document.querySelector('.footer-social');
    expect(socialSection).toBeInTheDocument();
    expect(screen.getByText('Connect')).toBeInTheDocument();
  });

  it('has link to home from avatar', () => {
    render(<Footer />);

    const avatarLink = document.querySelector('.footer-avatar');
    expect(avatarLink).toHaveAttribute('href', '/');
  });
});
