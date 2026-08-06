import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import profile from '../../../data/profile.json';
import EmailLink from '../../Contact/EmailLink';

const [localPart, domain] = profile.email.split('@');

describe('EmailLink', () => {
  it('renders the Penn engineering email address', () => {
    render(<EmailLink />);

    expect(screen.getByText(localPart)).toBeInTheDocument();
    expect(screen.getByText(`@${domain}`)).toBeInTheDocument();
    expect(profile.email).toBe('tmarhguy@engineering.upenn.edu');
  });

  it('links to the Penn engineering mailto address', () => {
    render(<EmailLink />);

    expect(
      screen.getByRole('link', { name: `Email ${profile.email}` }),
    ).toHaveAttribute('href', `mailto:${profile.email}`);
  });
});
