import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { getContactItems } from '@/data/contact';
import profile from '@/data/profile.json';

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
        'Computer Engineering Junior at University of Pennsylvania',
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

  it('groups all Connect links once with visible labels and correct email behavior', () => {
    render(<Footer />);
    const connect = screen.getByRole('navigation', { name: 'Connect' });
    const links = within(connect).getAllByRole('link');
    expect(links).toHaveLength(getContactItems().length);
    expect(new Set(links.map((link) => link.getAttribute('href'))).size).toBe(
      links.length,
    );
    const professional = within(connect).getByRole('list', {
      name: 'Professional',
    });
    expect(
      within(professional)
        .getAllByRole('link')
        .map((link) => link.textContent?.split(' (')[0]),
    ).toEqual(['Email', 'LinkedIn', 'GitHub']);
    expect(
      within(connect).getByRole('list', { name: 'Writing & builds' }),
    ).toBeInTheDocument();
    expect(
      within(connect).getByRole('list', { name: 'Social' }),
    ).toBeInTheDocument();
    const email = within(connect).getByRole('link', { name: 'Email' });
    expect(email).toHaveAttribute('href', `mailto:${profile.email}`);
    expect(email).not.toHaveAttribute('target');
    expect(
      within(connect).getByRole('link', {
        name: 'LinkedIn (opens in new tab)',
      }),
    ).toHaveAttribute('target', '_blank');
  });

  it('has link to home from avatar', () => {
    render(<Footer />);

    const avatarLink = document.querySelector('.footer-avatar');
    expect(avatarLink).toHaveAttribute('href', '/');
  });
});
