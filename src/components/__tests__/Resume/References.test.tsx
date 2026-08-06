import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import References from '../../Resume/References';

describe('References', () => {
  it('renders the references section', () => {
    render(<References />);

    expect(
      screen.getByText(/professional references available upon request/i),
    ).toBeInTheDocument();
  });

  it('links to the Wikipedia article for background', () => {
    render(<References />);

    const link = screen.getByRole('link', {
      name: /wikipedia article/i,
    });
    expect(link).toHaveAttribute(
      'href',
      'https://en.wikipedia.org/wiki/Tyrone_Marhguy',
    );
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has a link to the contact page', () => {
    render(<References />);

    const link = screen.getByRole('link', {
      name: /get in touch/i,
    });
    expect(link).toHaveAttribute('href', '/contact');
  });

  it('displays references and contact on separate lines', () => {
    const { container } = render(<References />);

    const paragraphs = container.querySelectorAll('.references-copy p');
    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[0]).toHaveTextContent(
      /professional references available upon request/i,
    );
    expect(paragraphs[1]).toHaveTextContent(/get in touch/i);
  });
});
