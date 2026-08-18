import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import resumeOpenSource from '@/data/resume/open-source';

import OpenSource from '../../Resume/OpenSource';

describe('OpenSource', () => {
  it('renders the open source section with linked project entries', () => {
    render(<OpenSource data={resumeOpenSource} />);

    expect(
      screen.getByRole('heading', { name: /open source/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'LibreLane' })).toHaveAttribute(
      'href',
      'https://github.com/librelane/librelane',
    );
    expect(screen.getByRole('link', { name: '3.0.8' })).toHaveAttribute(
      'href',
      'https://github.com/librelane/librelane/releases/tag/3.0.8',
    );
    expect(screen.getByRole('link', { name: '#1015' })).toHaveAttribute(
      'href',
      'https://github.com/librelane/librelane/pull/1015',
    );
    expect(screen.getByRole('link', { name: '3.0.10' })).toHaveAttribute(
      'href',
      'https://github.com/librelane/librelane/releases/tag/3.0.10',
    );
    expect(screen.getByRole('link', { name: '#1016' })).toHaveAttribute(
      'href',
      'https://github.com/librelane/librelane/pull/1016',
    );
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
    expect(screen.getByRole('link', { name: 'OpenFPGA' })).toHaveAttribute(
      'href',
      'https://github.com/lnis-uofu/OpenFPGA',
    );
    expect(screen.getByRole('link', { name: '#2683' })).toHaveAttribute(
      'href',
      'https://github.com/lnis-uofu/OpenFPGA/pull/2683',
    );
    expect(screen.getByRole('link', { name: '#2682' })).toHaveAttribute(
      'href',
      'https://github.com/lnis-uofu/OpenFPGA/pull/2682',
    );
    expect(screen.getByText(/chk\.rpt/)).toBeInTheDocument();
    expect(
      document.querySelectorAll('.open-source .jobs-container')[0]
        ?.querySelectorAll('.points li').length,
    ).toBe(2);
    expect(
      document.querySelectorAll('.open-source .jobs-container')[3]
        ?.querySelectorAll('.points li').length,
    ).toBe(2);
  });
});
