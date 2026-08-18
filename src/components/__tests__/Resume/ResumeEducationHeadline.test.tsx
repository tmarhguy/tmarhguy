import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ResumeEducationHeadline from '../../Resume/ResumeEducationHeadline';

describe('ResumeEducationHeadline', () => {
  it('shows the degree program, school, and full date range', () => {
    render(<ResumeEducationHeadline />);

    expect(screen.getByText('Computer Engineering')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /university of pennsylvania/i }),
    ).toHaveAttribute('href', 'https://www.upenn.edu');
    expect(screen.getByText('Aug 2024')).toBeInTheDocument();
    expect(screen.getByText('May 2028')).toBeInTheDocument();
  });
});
