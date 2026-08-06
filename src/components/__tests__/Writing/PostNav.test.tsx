import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { LogEntry } from '@/lib/logs';
import PostNav from '../../Writing/PostNav';

const entry = (slug: string, title: string): LogEntry => ({
  slug,
  title,
  date: '2026-06-10',
  description: 'Test description',
  project: 'tomato',
  projectLabel: 'Tomato CPU',
  projectLink: 'https://github.com/tmarhguy/tomato',
  content: 'Body',
});

describe('PostNav', () => {
  it('renders previous and next links when both neighbours exist', () => {
    render(
      <PostNav
        previous={entry('older-post', 'Older post')}
        next={entry('newer-post', 'Newer post')}
      />,
    );

    const previous = screen.getByRole('link', { name: /previous/i });
    expect(previous).toHaveAttribute('href', '/writing/older-post/');
    expect(previous).toHaveAttribute('rel', 'prev');
    expect(screen.getByText('Older post')).toBeInTheDocument();

    const next = screen.getByRole('link', { name: /next/i });
    expect(next).toHaveAttribute('href', '/writing/newer-post/');
    expect(next).toHaveAttribute('rel', 'next');
    expect(screen.getByText('Newer post')).toBeInTheDocument();
  });

  it('renders nothing when there are no neighbours', () => {
    const { container } = render(<PostNav previous={null} next={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});
