import { describe, expect, it, vi } from 'vitest';

import { copyText } from '@/lib/copy-to-clipboard';

describe('copyText', () => {
  it('uses the clipboard API when available', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });

    await expect(copyText('hello@example.com')).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith('hello@example.com');
  });
});
