import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Lightbox, { type LightboxItem } from '../../Media/Lightbox';

const IMAGE_ITEMS: LightboxItem[] = [
  {
    kind: 'image',
    src: '/images/open-source/librelane1015.png',
    alt: 'LibreLane 3.0.8 release',
    width: 1246,
    height: 1199,
    caption: {
      text: 'LibreLane · shipped in 3.0.8',
      href: 'https://github.com/librelane/librelane/releases/tag/3.0.8',
      detail: 'The compatibility fix.',
    },
  },
  {
    kind: 'image',
    src: '/images/open-source/openroad11107.png',
    alt: 'OpenROAD contribution activity',
    width: 2012,
    height: 1084,
  },
];

const VIDEO_ITEMS: LightboxItem[] = [
  {
    kind: 'video',
    src: '/images/os/tomato-demo.mp4',
    poster: '/images/os/tomato-demo-poster.webp',
    label: 'TomatoOS demo',
  },
];

function renderViewer(
  items: LightboxItem[] = IMAGE_ITEMS,
  index = 0,
  onClose: () => void = () => {},
  onIndexChange: (next: number) => void = () => {},
) {
  return render(
    <Lightbox
      items={items}
      index={index}
      onClose={onClose}
      onIndexChange={onIndexChange}
    />,
  );
}

describe('Lightbox', () => {
  it('renders the current image with caption and position', () => {
    renderViewer();

    expect(
      screen.getByRole('img', { name: 'LibreLane 3.0.8 release' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'LibreLane · shipped in 3.0.8' }),
    ).toHaveAttribute(
      'href',
      'https://github.com/librelane/librelane/releases/tag/3.0.8',
    );
    expect(screen.getByText('1 / 2')).toBeInTheDocument();
  });

  it('renders video with playback controls', () => {
    renderViewer(VIDEO_ITEMS);

    const video = document.querySelector(
      '.lightbox-media video',
    ) as HTMLVideoElement | null;
    expect(video).toBeInTheDocument();
    expect(video!.getAttribute('src')).toBe('/images/os/tomato-demo.mp4');
    expect(video!.controls).toBe(true);
    expect(video!.autoplay).toBe(true);
  });

  it('closes on Escape', () => {
    const onClose = vi.fn();
    renderViewer(IMAGE_ITEMS, 0, onClose);

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes on backdrop and close-button clicks', () => {
    const onClose = vi.fn();
    renderViewer(IMAGE_ITEMS, 0, onClose);

    const backdrop = document.querySelector(
      '.lightbox-backdrop',
    ) as HTMLElement;
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: 'Close viewer' }));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('steps through the gallery with buttons and arrow keys', () => {
    const onIndexChange = vi.fn();
    renderViewer(IMAGE_ITEMS, 0, () => {}, onIndexChange);

    fireEvent.click(screen.getByRole('button', { name: 'Next media' }));
    expect(onIndexChange).toHaveBeenCalledWith(1);

    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(onIndexChange).toHaveBeenCalledWith(1);

    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    expect(onIndexChange).toHaveBeenCalledWith(1);
  });

  it('wraps around the ends of the gallery', () => {
    const onIndexChange = vi.fn();
    renderViewer(IMAGE_ITEMS, 0, () => {}, onIndexChange);

    fireEvent.click(screen.getByRole('button', { name: 'Previous media' }));
    expect(onIndexChange).toHaveBeenCalledWith(1);
  });

  it('hides navigation for a single item', () => {
    renderViewer(VIDEO_ITEMS);

    expect(document.querySelector('.lightbox-nav')).not.toBeInTheDocument();
    expect(screen.queryByText(/\/ 1/)).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Close viewer' }),
    ).toBeInTheDocument();
  });
});
