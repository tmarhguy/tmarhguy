import { describe, expect, it } from 'vitest';

import {
  formatWritingDate,
  smoothLogContent,
  smoothLogDescription,
  stripDescriptionNoise,
} from '../log-content';

describe('smoothLogContent', () => {
  it('removes duplicate title headings and note metadata', () => {
    const input = `# Falling back to 32b

**Date:** 2026-07-31
**Status:** Decision settled
**Related:** [Other note](/writing/other/)

---

## Context

Body text here.`;

    expect(smoothLogContent(input, 'Falling back to 32b')).toBe(
      '## Context\n\nBody text here.',
    );
  });

  it('converts design-artifact links to inline code', () => {
    const input =
      'See [wb_mux.kicad_sch](hardware/06_data_bus/wb_mux.kicad_sch).';

    expect(smoothLogContent(input, 'Board work')).toBe(
      'See `wb_mux.kicad_sch`.',
    );
  });
});

describe('smoothLogDescription', () => {
  it('strips auto-imported metadata prefixes', () => {
    const description =
      'Date: 2026-08-02 Status: In progress Related: Other note --- I am pushing to design the remaining boards.';

    expect(
      smoothLogDescription(
        description,
        'I am pushing to design the remaining boards.',
        'Designing additional boards',
      ),
    ).toBe('I am pushing to design the remaining boards.');
  });
});

describe('formatWritingDate', () => {
  it('uses a padded day', () => {
    expect(formatWritingDate('2026-08-02')).toBe('Aug 02, 2026');
  });
});

describe('stripDescriptionNoise', () => {
  it('removes leading ISO dates from excerpts', () => {
    expect(stripDescriptionNoise('2026-08-03 Over the last few months')).toBe(
      'Over the last few months',
    );
  });
});
