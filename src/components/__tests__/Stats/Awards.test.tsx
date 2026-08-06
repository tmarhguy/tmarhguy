import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Awards from '../../Stats/Awards';

describe('Awards', () => {
  it('renders academic and competition highlights', () => {
    render(<Awards />);

    expect(screen.getByText('WASSCE')).toBeInTheDocument();
    expect(screen.getByText('8 A1s (2023)')).toBeInTheDocument();
    expect(
      screen.getByText('American Mathematics Olympiad'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Global Gold; National Top Scorer'),
    ).toBeInTheDocument();
  });
});
