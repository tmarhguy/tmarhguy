import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  scrollToHashTarget,
  scrollToHashWhenReady,
} from '@/lib/scroll-to-hash';

describe('scrollToHashTarget', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    window.history.replaceState({}, '', '/');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('scrolls to an element by hash', () => {
    const target = document.createElement('article');
    target.id = 'mango-tools';
    target.scrollIntoView = vi.fn();
    document.body.append(target);

    expect(scrollToHashTarget('#mango-tools')).toBe(true);
    expect(target.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'instant',
      block: 'start',
    });
  });

  it('returns false when the fragment target is missing', () => {
    expect(scrollToHashTarget('#missing')).toBe(false);
  });
});

describe('scrollToHashWhenReady', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      callback(0);
      return 1;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('retries until the target exists', () => {
    const target = document.createElement('article');
    target.id = 'tomato';
    target.scrollIntoView = vi.fn();

    let frames = 0;
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      frames += 1;
      if (frames === 2) {
        document.body.append(target);
      }
      callback(0);
      return frames;
    });

    scrollToHashWhenReady('#tomato', 5);

    expect(target.scrollIntoView).toHaveBeenCalled();
  });
});
