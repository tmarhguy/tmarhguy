/**
 * Scroll to a document fragment if the target exists.
 * Returns true when the element was found and scrolled.
 */
export function scrollToHashTarget(hash?: string): boolean {
  const id = (hash ?? window.location.hash).replace(/^#/, '');
  if (!id) {
    return false;
  }

  const target = document.getElementById(id);
  if (!target) {
    return false;
  }

  target.scrollIntoView({ behavior: 'instant', block: 'start' });
  return true;
}

/** Retry across frames so client-navigated pages can paint before scrolling. */
export function scrollToHashWhenReady(hash?: string, attempts = 24): void {
  const resolved = hash ?? window.location.hash;
  const tryScroll = (remaining: number) => {
    if (scrollToHashTarget(resolved)) {
      scheduleSettleCheck(resolved);
      return;
    }

    if (remaining <= 0) {
      return;
    }

    requestAnimationFrame(() => tryScroll(remaining - 1));
  };

  tryScroll(attempts);
}

/**
 * Re-assert the scroll once stylesheets, webfonts, and media settle.
 *
 * The first scroll can run against an unstyled (much taller) layout, and the
 * browser's own late fragment jump can drag the viewport afterwards — on
 * slow mobile loads the settled page then ends up far below the target, down
 * at the footer. Keep correcting until the user gestures or navigates; each
 * correction is a no-op when nothing shifted.
 */
function scheduleSettleCheck(resolvedHash: string): void {
  const id = resolvedHash.replace(/^#/, '');
  if (!id || !document.getElementById(id)) {
    return;
  }

  // Only real gestures disqualify the correction. Scroll-position drift
  // alone is not evidence: the browser's own late fragment jump and
  // in-flight smooth-scroll animations move the viewport without the user.
  let userMoved = false;
  const cleanupGestures = () => {
    window.removeEventListener('wheel', markMoved);
    window.removeEventListener('touchmove', markMoved);
    window.removeEventListener('keydown', markMoved);
  };
  const markMoved = () => {
    userMoved = true;
    cleanupGestures();
  };
  window.addEventListener('wheel', markMoved, { passive: true });
  window.addEventListener('touchmove', markMoved, { passive: true });
  window.addEventListener('keydown', markMoved);

  const reassert = () => {
    // The user took over (or moved to another anchor) — don't yank them back.
    if (window.location.hash !== resolvedHash) {
      return;
    }
    if (userMoved) {
      return;
    }
    scrollToHashTarget(resolvedHash);
  };

  if (document.readyState !== 'complete') {
    window.addEventListener('load', reassert, { once: true });
  }

  // document.fonts is undefined under jsdom and older browsers.
  const fontSet = document.fonts as FontFaceSet | undefined;
  if (fontSet?.ready) {
    void fontSet.ready.then(reassert, () => undefined);
  }

  // Distribution shifts (unstyled headings swapping for styled ones) can
  // move the target without changing body height at all, so no event is
  // guaranteed to fire afterwards. Poll the target position until it is
  // stable, then correct once. Capped so mocked frames always terminate.
  const recordedTop = document.getElementById(id)?.getBoundingClientRect().top;
  const MAX_FRAMES = 240;
  const STABLE_FRAMES = 12;
  let frames = 0;
  let stableFrames = 0;
  let lastTop: number | undefined;
  const poll = () => {
    if (window.location.hash !== resolvedHash) {
      return;
    }
    if (userMoved) {
      cleanupGestures();
      return;
    }
    const top = document.getElementById(id)?.getBoundingClientRect().top;
    if (top !== undefined && top === lastTop) {
      stableFrames += 1;
    } else {
      stableFrames = 0;
      lastTop = top;
    }
    if (stableFrames >= STABLE_FRAMES || frames >= MAX_FRAMES) {
      if (
        top !== undefined &&
        recordedTop !== undefined &&
        Math.abs(top - recordedTop) > 2
      ) {
        reassert();
      }
      return;
    }
    frames += 1;
    requestAnimationFrame(poll);
  };
  requestAnimationFrame(poll);

  // Late stylesheets (slow mobile CSS, dev HMR injection) can shift layout
  // after load and fonts have settled. Body height tracks content shifts;
  // the root element only tracks the viewport, so it would never fire here.
  if (typeof ResizeObserver === 'undefined') {
    return;
  }
  const QUIET_MS = 2000;
  const CAP_MS = 10000;
  let quietTimer: ReturnType<typeof setTimeout> | undefined;
  let observer: ResizeObserver;
  try {
    observer = new ResizeObserver(() => {
      reassert();
      if (quietTimer !== undefined) {
        clearTimeout(quietTimer);
      }
      quietTimer = setTimeout(() => {
        observer.disconnect();
        cleanupGestures();
      }, QUIET_MS);
    });
  } catch {
    // Non-constructible stub (test doubles, fringe browsers) — the load and
    // font backstops above still apply.
    return;
  }
  setTimeout(() => {
    observer.disconnect();
    cleanupGestures();
    if (quietTimer !== undefined) {
      clearTimeout(quietTimer);
    }
  }, CAP_MS);
  observer.observe(document.body);
}
