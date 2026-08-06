import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import projects from '@/data/projects';
import { getAllLogs } from '@/lib/logs';

import BenchStats from '../../Stats/BenchStats';

describe('BenchStats', () => {
  it('renders writing, project, and source-line counts', () => {
    render(<BenchStats />);

    expect(screen.getByText('Writing entries')).toBeInTheDocument();
    expect(screen.getByText('Projects listed')).toBeInTheDocument();
    expect(screen.getByText('TypeScript lines')).toBeInTheDocument();
    expect(
      screen.getByText(getAllLogs().length.toLocaleString('en-US')),
    ).toBeInTheDocument();
    expect(
      screen.getByText(projects.length.toLocaleString('en-US')),
    ).toBeInTheDocument();
  });
});
