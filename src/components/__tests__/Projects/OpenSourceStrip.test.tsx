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
    expect(screen.getByRole('link', { name: 'OpenROAD' })).toHaveAttribute(
      'href',
      'https://github.com/The-OpenROAD-Project/OpenROAD',
    );
    expect(screen.getByRole('link', { name: '#11107' })).toHaveAttribute(
      'href',
      'https://github.com/The-OpenROAD-Project/OpenROAD/pull/11107',
    );
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
    expect(
      screen.getByRole('link', { name: 'shipped as 3.0.8' }),
    ).toHaveAttribute(
      'href',
      'https://github.com/librelane/librelane/releases/tag/3.0.8',
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
      '/writing/#writing-open-source',
    );
    expect(screen.getByRole('link', { name: 'Build log' })).not.toHaveAttribute(
      'target',
      '_blank',
    );
    expect(screen.getByText('production LEF files load').tagName).toBe(
      'STRONG',
    );
    expect(screen.getByText('synthesis does not die').tagName).toBe('STRONG');
    expect(screen.getByText('shipped as 3.0.8').tagName).toBe('A');
    expect(screen.getByText('--stats matches real RSS').tagName).toBe('STRONG');
    expect(screen.getByText('syntax matches the parser').tagName).toBe(
      'STRONG',
    );
    expect(
      screen.getByRole('img', { name: 'OpenROAD GitHub stars' }),
    ).toHaveAttribute(
      'src',
      'https://img.shields.io/github/stars/The-OpenROAD-Project/OpenROAD?style=flat-square',
    );
    expect(
      screen.getByRole('img', { name: 'LibreLane GitHub stars' }),
    ).toHaveAttribute(
      'src',
      'https://img.shields.io/github/stars/librelane/librelane?style=flat-square',
    );
  });

  it('exposes stable anchor ids for deep links', () => {
    render(<OpenSourceStrip contributions={getOpenSourceContributions()} />);
    expect(document.getElementById('openroad')).toBeTruthy();
    expect(document.getElementById('librelane')).toBeTruthy();
    expect(document.getElementById('verilator')).toBeTruthy();
    expect(document.getElementById('openfpga')).toBeTruthy();
  });
});
