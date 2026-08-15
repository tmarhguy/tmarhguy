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

  it('splits professional profiles from the rest when grouped', () => {
    render(<ContactIcons includeEmail={false} grouped />);

    const lists = document.querySelectorAll('.contact-icon-groups .icons');
    expect(lists).toHaveLength(2);

    const work = lists[0];
    const elsewhere = lists[1];

    expect(
      work.querySelector('a[href="https://github.com/tmarhguy"]'),
    ).toBeTruthy();
    expect(
      work.querySelector('a[href="https://x.com/marhguy_tyrone"]'),
    ).toBeTruthy();
    expect(
      work.querySelector(
        'a[href="https://en.wikipedia.org/wiki/Tyrone_Marhguy"]',
      ),
    ).toBeTruthy();
    expect(work.querySelector('a[href="https://dev.to/tmarhguy"]')).toBeNull();

    expect(
      elsewhere.querySelector('a[href="https://dev.to/tmarhguy"]'),
    ).toBeTruthy();
    expect(
      elsewhere.querySelector('a[href="https://www.instagram.com/tmarhguy/"]'),
    ).toBeTruthy();
    expect(
      elsewhere.querySelector('a[href="https://github.com/tmarhguy"]'),
    ).toBeNull();
    expect(screen.getByText('and')).toBeInTheDocument();
  });
});
