import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ContactPage from '../contact/page';

describe('contact page', () => {
  it('uses the main region as the centering surface without a duplicate footer', () => {
    render(<ContactPage />);

    expect(screen.getByRole('main')).toHaveClass('page-main--contact');
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /copy .+@.+ to clipboard/i }),
    ).toBeInTheDocument();
    expect(document.querySelectorAll('.contact-content .icons')).toHaveLength(
      2,
    );
    expect(screen.getByText('and')).toBeInTheDocument();
  });
});
