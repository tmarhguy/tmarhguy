import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { getOpenSourceContributions } from '@/data/open-source';

import OpenSourceStrip from '../../Projects/OpenSourceStrip';

describe('OpenSourceStrip', () => {
  it('renders compact one-line entries with pull links and build log', () => {
    render(<OpenSourceStrip contributions={getOpenSourceContributions()} />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Open source' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Verilator' })).toHaveAttribute(
      'href',
      'https://github.com/verilator/verilator',
    );
    expect(screen.getByRole('link', { name: 'LibreLane' })).toHaveAttribute(
      'href',
      'https://github.com/librelane/librelane',
    );
    expect(screen.getByRole('link', { name: '#1015' })).toHaveAttribute(
      'href',
      'https://github.com/librelane/librelane/pull/1015',
    );
    expect(screen.getByRole('link', { name: 'Verilator' })).toHaveAttribute(
      'target',
      '_blank',
    );
    expect(screen.getByRole('link', { name: '#8070' })).toHaveAttribute(
      'href',
      'https://github.com/verilator/verilator/pull/8070',
    );
    expect(screen.getByRole('link', { name: '#8070' })).toHaveAttribute(
      'target',
      '_blank',
    );
    expect(screen.getByRole('link', { name: 'Build log' })).toHaveAttribute(
      'href',
      '/writing/2026-08-11-librelane-verilator-openfpga/',
    );
    expect(screen.getByRole('link', { name: 'Build log' })).not.toHaveAttribute(
      'target',
      '_blank',
    );
  });

  it('exposes stable anchor ids for deep links', () => {
    render(<OpenSourceStrip contributions={getOpenSourceContributions()} />);
    expect(document.getElementById('librelane')).toBeTruthy();
    expect(document.getElementById('verilator')).toBeTruthy();
    expect(document.getElementById('openfpga')).toBeTruthy();
  });
});
