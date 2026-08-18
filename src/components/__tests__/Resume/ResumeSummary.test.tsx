import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ResumeSummary from '../../Resume/ResumeSummary';

describe('ResumeSummary', () => {
  it('renders the professional summary with key links', () => {
    render(<ResumeSummary />);

    expect(screen.getByText(/Computer Engineering Junior/i)).toBeInTheDocument();
    expect(screen.getByText(/Open Source Contributions:/)).toBeInTheDocument();
    expect(screen.getByText(/The Builds:/)).toBeInTheDocument();
    expect(screen.getByText(/The Work:/)).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: /university of pennsylvania/i }),
    ).toHaveAttribute('href', 'https://www.upenn.edu');
    expect(screen.getByRole('link', { name: /^tomato$/i })).toHaveAttribute(
      'href',
      'https://tomato.tmarhguy.com',
    );
    expect(screen.getByRole('link', { name: /librelane/i })).toHaveAttribute(
      'href',
      'https://github.com/librelane/librelane/pull/1015',
    );
    expect(screen.getByRole('link', { name: /openroad/i })).toHaveAttribute(
      'href',
      'https://github.com/The-OpenROAD-Project/OpenROAD/pull/11107',
    );
    expect(screen.getByRole('link', { name: /openfpga/i })).toHaveAttribute(
      'href',
      'https://github.com/lnis-uofu/OpenFPGA',
    );
    expect(screen.getByRole('link', { name: /verilator/i })).toHaveAttribute(
      'href',
      'https://github.com/verilator/verilator/pull/8070',
    );
    expect(
      screen.getByRole('link', { name: /fluid silicon/i }),
    ).toHaveAttribute(
      'href',
      'https://penntoday.upenn.edu/news/penn-student-develops-way-computer-chips-run-more-efficiently',
    );
    expect(
      screen.getByRole('link', { name: /vero electric/i }),
    ).toHaveAttribute('href', 'https://veroelectric.com/');
    expect(screen.getByRole('link', { name: /aragorn ai/i })).toHaveAttribute(
      'href',
      'https://www.aragorn.ai',
    );
  });
});
