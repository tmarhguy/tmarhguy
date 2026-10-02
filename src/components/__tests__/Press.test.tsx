import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CoverageArchive from '../Press/CoverageArchive';

describe('coverage archive controls', () => {
  it('pins Kobe first without changing its publication date', () => {
    const { container } = render(<CoverageArchive />);
    const first = container.querySelector('.press-year .press-entries > li');
    expect(first).toHaveTextContent('Kobe Boujee');
    expect(first?.querySelector('time')).toHaveAttribute(
      'dateTime',
      '2026-01-31',
    );
    expect(first).toHaveTextContent('Pinned');
    fireEvent.change(screen.getByLabelText('Order'), {
      target: { value: 'oldest' },
    });
    expect(screen.queryByText('Pinned')).not.toBeInTheDocument();
  });
  it('filters, announces empty results, and resets all filters', () => {
    render(<CoverageArchive />);
    fireEvent.change(screen.getByLabelText('Format'), {
      target: { value: 'Social posts' },
    });
    fireEvent.click(screen.getByRole('button', { name: /^Engineering$/ }));
    fireEvent.change(screen.getByLabelText('Search coverage'), {
      target: { value: 'Kobe' },
    });
    expect(
      screen.getByRole('link', {
        name: /Tyrone Marhguy builds a computer brain from scratch/,
      }),
    ).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Search coverage'), {
      target: { value: 'missing-story-xyz' },
    });
    expect(
      screen.getByRole('heading', { name: 'No matching coverage' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent(
      'No matching coverage',
    );
    fireEvent.click(screen.getByRole('button', { name: 'Show all coverage' }));
    expect(screen.getByLabelText('Format')).toHaveValue('All formats');
    expect(screen.getByLabelText('Search coverage')).toHaveValue('');
    expect(
      screen.queryByRole('heading', { name: 'No matching coverage' }),
    ).not.toBeInTheDocument();
    const years = screen.getByRole('navigation', { name: 'Coverage years' });
    expect(within(years).getAllByRole('link')[0]).toHaveAttribute(
      'href',
      '#press-2026',
    );
    fireEvent.change(screen.getByLabelText('Order'), {
      target: { value: 'oldest' },
    });
    expect(within(years).getAllByRole('link')[0]).toHaveAttribute(
      'href',
      '#press-2021',
    );
  }, 15_000);
});
