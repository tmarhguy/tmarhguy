import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import StatGrid from '../../Stats/StatGrid';

describe('StatGrid', () => {
  it('renders stat cards in a definition list', () => {
    render(
      <StatGrid
        items={[
          { label: 'Stars', value: '12', link: 'https://example.com' },
          { label: 'Repos', value: '4' },
        ]}
      />,
    );

    expect(screen.getByText('Stars')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('Repos')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '12' })).toHaveAttribute(
      'href',
      'https://example.com',
    );
  });
});
