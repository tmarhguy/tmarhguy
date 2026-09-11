import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TomatoOperations from '../TomatoOperations';

describe('Tomato operation comparison', () => {
  it('changes both traces and counts when selecting an expression, including the RV32I advantage', () => {
    render(<TomatoOperations />);
    expect(screen.getByText('2 instructions')).toBeInTheDocument();
    expect(screen.getByText('1 ALU evaluation')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Compare an expression'), {
      target: { value: '1' },
    });
    expect(screen.getByText('4 instructions')).toBeInTheDocument();
    expect(screen.getByText(/F = Majority/)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Compare an expression'), {
      target: { value: '4' },
    });
    expect(screen.getByText('1 instruction')).toBeInTheDocument();
    expect(screen.getByText('2 ALU evaluations')).toBeInTheDocument();
    expect(screen.getByText('SLT out, A, B')).toBeInTheDocument();
    expect(screen.getByText(/do not measure CPU cycles/)).toBeInTheDocument();
  });
});
