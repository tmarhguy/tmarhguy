import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ResumeSummary from '../../Resume/ResumeSummary';

describe('ResumeSummary', () => {
  it('links ALU, Tomato, Aragorn, Vero, and Howard Achievers', () => {
    render(<ResumeSummary />);

    expect(
      screen.getByRole('link', { name: /discrete transistors to tapeout/i }),
    ).toHaveAttribute('href', 'https://alu.tmarhguy.com');
    expect(screen.getByRole('link', { name: /32-bit cpu/i })).toHaveAttribute(
      'href',
      '/projects/#tomato',
    );
    expect(screen.getByRole('link', { name: /aragorn ai/i })).toHaveAttribute(
      'href',
      'https://www.aragorn.ai',
    );
    expect(
      screen.getByRole('link', { name: /vero electric/i }),
    ).toHaveAttribute('href', 'https://veroelectric.com/');
    expect(screen.getByRole('link', { name: /^achievers$/i })).toHaveAttribute(
      'href',
      'https://education.howard.edu/affiliated-programs/stem-summer-camp-verizon-innovative-learning',
    );
    expect(screen.getAllByRole('link')).toHaveLength(5);
  });
});
