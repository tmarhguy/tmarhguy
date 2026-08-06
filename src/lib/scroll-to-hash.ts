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
  const tryScroll = (remaining: number) => {
    if (scrollToHashTarget(hash)) {
      return;
    }

    if (remaining <= 0) {
      return;
    }

    requestAnimationFrame(() => tryScroll(remaining - 1));
  };

  tryScroll(attempts);
}
