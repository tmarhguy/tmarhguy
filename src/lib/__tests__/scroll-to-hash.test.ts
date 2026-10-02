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

describe('scrollToHashWhenReady settle correction', () => {
  const HASH = '#settle-target';
  const restorers: Array<() => void> = [];

  /** Temporarily shadow a property, restoring the original descriptor after. */
  function shadow<T extends object>(obj: T, key: string, value: unknown) {
    const original = Object.getOwnPropertyDescriptor(obj, key);
    Object.defineProperty(obj, key, {
      value,
      configurable: true,
      writable: true,
    });
    restorers.push(() => {
      if (original) {
        Object.defineProperty(obj, key, original);
      } else {
        delete (obj as Record<string, unknown>)[key];
      }
    });
  }

  beforeEach(() => {
    document.body.innerHTML = '';
    window.history.replaceState({}, '', `/${HASH}`);
    // The stability poll terminates synchronously under this mock.
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      callback(0);
      return 1;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    let restore: (() => void) | undefined;
    while ((restore = restorers.pop())) {
      restore();
    }
  });

  function mountTarget() {
    const target = document.createElement('article');
    target.id = 'settle-target';
    target.scrollIntoView = vi.fn();
    document.body.append(target);
    return target;
  }

  /** Controllable document.fonts mock (jsdom has none). Resolves on demand. */
  function mockFonts() {
    let resolveReady!: () => void;
    const ready = new Promise<void>((resolve) => {
      resolveReady = resolve;
    });
    shadow(document, 'fonts', { ready });
    return resolveReady;
  }

  it('re-asserts after fonts settle when layout shift moved the target', async () => {
    const target = mountTarget();
    const resolveFonts = mockFonts();

    scrollToHashWhenReady(HASH, 1);
    expect(target.scrollIntoView).toHaveBeenCalledTimes(1);

    // Settling pushes the target far down the page (toward the footer).
    resolveFonts();

    await vi.waitFor(() =>
      expect(target.scrollIntoView).toHaveBeenCalledTimes(2),
    );
  });

  it('re-asserts after fonts settle even when nothing shifted', async () => {
    const target = mountTarget();
    const resolveFonts = mockFonts();

    scrollToHashWhenReady(HASH, 1);
    resolveFonts();
    await Promise.resolve();
    await Promise.resolve();

    // Harmless no-op re-scroll to the same spot.
    expect(target.scrollIntoView).toHaveBeenCalledTimes(2);
  });

  it('does not yank the user back after they scrolled elsewhere', async () => {
    const target = mountTarget();
    const resolveFonts = mockFonts();

    scrollToHashWhenReady(HASH, 1);

    // The user scrolls while fonts are still loading: a real gesture.
    window.dispatchEvent(new Event('wheel'));
    resolveFonts();
    await Promise.resolve();
    await Promise.resolve();

    expect(target.scrollIntoView).toHaveBeenCalledTimes(1);
  });

  it('still corrects after browser-driven drift without any gesture', async () => {
    const target = mountTarget();
    const resolveFonts = mockFonts();

    scrollToHashWhenReady(HASH, 1);

    // The browser's late fragment jump drags the viewport; no gesture fired,
    // so the correction must still apply.
    shadow(window, 'scrollY', 2500);
    resolveFonts();

    await vi.waitFor(() =>
      expect(target.scrollIntoView).toHaveBeenCalledTimes(2),
    );
  });

  it('re-asserts on window load', () => {
    shadow(document, 'readyState', 'loading');
    const target = mountTarget();

    scrollToHashWhenReady(HASH, 1);
    expect(target.scrollIntoView).toHaveBeenCalledTimes(1);

    window.dispatchEvent(new Event('load'));

    expect(target.scrollIntoView).toHaveBeenCalledTimes(2);
  });

  it('re-checks when layout resizes while settling', () => {
    vi.useFakeTimers();
    try {
      let onResize!: () => void;
      shadow(
        globalThis,
        'ResizeObserver',
        class {
          observe() {}
          unobserve() {}
          disconnect() {}
          constructor(callback: () => void) {
            onResize = callback;
          }
        },
      );
      const target = mountTarget();

      scrollToHashWhenReady(HASH, 1);
      expect(target.scrollIntoView).toHaveBeenCalledTimes(1);

      // A late stylesheet shifts the target; the resize fires the re-check.
      onResize();

      expect(target.scrollIntoView).toHaveBeenCalledTimes(2);
    } finally {
      vi.useRealTimers();
    }
  });

  it('corrects once the target stops moving after redistribution', () => {
    const target = mountTarget();
    // Recorded position, one early sample, then the settled position.
    const tops = [0, 0, 500, ...Array<undefined>(13).fill(undefined)];
    vi.spyOn(target, 'getBoundingClientRect').mockImplementation(
      () => ({ top: tops.shift() ?? 500 }) as DOMRect,
    );

    scrollToHashWhenReady(HASH, 1);

    expect(target.scrollIntoView).toHaveBeenCalledTimes(2);
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
