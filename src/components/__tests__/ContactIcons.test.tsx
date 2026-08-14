import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ContactIcons from '../Contact/ContactIcons';

describe('ContactIcons', () => {
  it('renders contact icons', () => {
    render(<ContactIcons />);

    // Check if GitHub link is present
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      'href',
      expect.stringContaining('github.com'),
    );

    // Check if email link is present
    const emailLink = screen.getByRole('link', { name: /email/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute(
      'href',
      expect.stringContaining('mailto:'),
    );
  });

  it('has correct number of contact links', () => {
    render(<ContactIcons />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('can omit email when the page already has a primary email action', () => {
    render(<ContactIcons includeEmail={false} />);

    expect(
      screen.queryByRole('link', { name: /email/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /hackaday/i })).toHaveAttribute(
      'href',
      'https://hackaday.io/tmarhguy',
    );
    expect(screen.getByRole('link', { name: /hackster/i })).toHaveAttribute(
      'href',
      'https://www.hackster.io/tmarhguy',
    );
    expect(screen.getByRole('link', { name: /^dev /i })).toHaveAttribute(
      'href',
      'https://dev.to/tmarhguy',
    );
    expect(screen.getByRole('link', { name: /threads/i })).toHaveAttribute(
      'href',
      'https://www.threads.net/@tmarhguy',
    );
    expect(screen.getByRole('link', { name: /wikipedia/i })).toHaveAttribute(
      'href',
      'https://en.wikipedia.org/wiki/Tyrone_Marhguy',
    );
  });
});
