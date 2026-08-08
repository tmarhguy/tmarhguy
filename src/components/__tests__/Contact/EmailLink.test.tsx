import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { CONTACT_PERSONAL_EMAIL } from '@/data/contact';
import profile from '../../../data/profile.json';
import EmailLink from '../../Contact/EmailLink';

const [localPart, pennDomain] = profile.email.split('@');

describe('EmailLink', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renders the Penn engineering email by default', () => {
    render(<EmailLink />);

    expect(screen.getByText(localPart)).toBeInTheDocument();
    expect(screen.getByText(pennDomain)).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: `Copy ${profile.email} to clipboard`,
      }),
    ).toBeInTheDocument();
  });

  it('auto-rotates between Penn and Gmail', () => {
    render(<EmailLink />);

    act(() => {
      vi.advanceTimersByTime(3_500);
    });

    expect(screen.getByText('gmail.com')).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: `Copy ${CONTACT_PERSONAL_EMAIL} to clipboard`,
      }),
    ).toBeInTheDocument();
  });

  it('copies the active email when clicked', async () => {
    render(<EmailLink />);

    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', {
          name: `Copy ${profile.email} to clipboard`,
        }),
      );
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(profile.email);
    expect(screen.getByText('Copied to clipboard')).toBeInTheDocument();
  });
});
