import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Personal from '../../Stats/Personal';

describe('Personal', () => {
  it('renders compact personal stats', () => {
    render(<Personal />);

    expect(screen.getByText('From')).toBeInTheDocument();
    expect(screen.getByText('Ghana')).toBeInTheDocument();
    expect(screen.getByText('Based in')).toBeInTheDocument();
    expect(screen.getByText('Philadelphia, PA')).toBeInTheDocument();
    expect(screen.getByText('School')).toBeInTheDocument();
    expect(screen.getByText('University of Pennsylvania')).toBeInTheDocument();
    expect(screen.getByText('Previous school')).toBeInTheDocument();
    expect(screen.getByText('Achimota School')).toBeInTheDocument();
    expect(screen.getByText('Degree')).toBeInTheDocument();
    expect(screen.getByText('B.S.E. Computer Engineering')).toBeInTheDocument();
    expect(screen.getByText('Class of')).toBeInTheDocument();
    expect(screen.getByText('2028')).toBeInTheDocument();
    expect(screen.queryByText('Age')).not.toBeInTheDocument();
  });
});
