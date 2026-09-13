import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { getEarlierProjects } from '@/data/projects';

import EarlierList from '../../Projects/EarlierList';

describe('EarlierList', () => {
  it('renders one shelf row per demoted project, newest first', () => {
    const { container } = render(
      <EarlierList projects={getEarlierProjects()} />,
    );

    const rows = container.querySelectorAll('.earlier-item');
    expect(rows).toHaveLength(5);
    expect(
      [...rows].map((row) => row.querySelector('.earlier-head a')?.textContent),
    ).toEqual([
      'Music & You',
      'YT2Spot',
      'MoMo Credit Score',
      'UniBridge Ghana',
      'QueuePaste',
    ]);
    expect(
      screen.getAllByRole('button', { name: /Open screenshot:/ }),
    ).toHaveLength(5);
    expect(document.getElementById('queuepaste')).toBeTruthy();
  });

  it('links titles out and shows period with description', () => {
    render(<EarlierList projects={getEarlierProjects()} />);

    expect(screen.getByRole('link', { name: 'QueuePaste' })).toHaveAttribute(
      'href',
      'https://github.com/tmarhguy/QueuePaste',
    );
    expect(
      screen.getByText('XGBoost credit scoring', { exact: false }),
    ).toBeInTheDocument();
  });

  it('opens the cover in the viewer and closes on Escape', () => {
    render(<EarlierList projects={getEarlierProjects()} />);

    fireEvent.click(
      screen.getByRole('button', { name: /Prepare list and sequential paste/ }),
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByRole('img', {
        name: /QueuePaste · Prepare list and sequential paste/,
      }),
    ).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders nothing without projects', () => {
    const { container } = render(<EarlierList projects={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
