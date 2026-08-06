import { describe, expect, it } from 'vitest';

import { aboutMarkdown } from '../about';

describe('about data', () => {
  it('exports aboutMarkdown as a string', () => {
    expect(typeof aboutMarkdown).toBe('string');
    expect(aboutMarkdown.length).toBeGreaterThan(0);
  });

  it('contains the intro section', () => {
    expect(aboutMarkdown).toContain('# Intro');
    expect(aboutMarkdown).toContain('University of Pennsylvania');
    expect(aboutMarkdown).toContain('discrete transistors to tapeout');
  });

  it('contains early life and family background', () => {
    expect(aboutMarkdown).toContain('# Early Life');
    expect(aboutMarkdown).toContain('triplet');
    expect(aboutMarkdown).toContain('Nikita');
    expect(aboutMarkdown).toContain('Ghana');
  });

  it('contains the Achimota section', () => {
    expect(aboutMarkdown).toContain('# Achimota');
    expect(aboutMarkdown).toContain('Rastafarian');
    expect(aboutMarkdown).toContain('Marhguy v. Achimota School');
  });

  it('contains the academics section', () => {
    expect(aboutMarkdown).toContain('# Academics');
    expect(aboutMarkdown).toContain('WASSCE');
    expect(aboutMarkdown).toContain('B.S.E. Computer Engineering');
    expect(aboutMarkdown).toContain('American Mathematics Olympiad');
  });

  it('contains hobbies, interests, and fun facts', () => {
    expect(aboutMarkdown).toContain('# Hobbies and Interests');
    expect(aboutMarkdown).toContain('Sudoku');
    expect(aboutMarkdown).toContain('Biking');
    expect(aboutMarkdown).toContain('# Fun Facts');
    expect(aboutMarkdown).toContain('Triplet');
  });

  it('contains the now section', () => {
    expect(aboutMarkdown).toContain('# Now');
    expect(aboutMarkdown).toContain('Tomato');
    expect(aboutMarkdown).toContain('Aragorn AI');
    expect(aboutMarkdown).toContain('Professionally');
    expect(aboutMarkdown).toContain('battery management infrastructure');
  });

  it('contains valid markdown links', () => {
    const linkRegex = /\[.+?\]\(.+?\)/g;
    const links = aboutMarkdown.match(linkRegex);

    expect(links).not.toBeNull();
    expect(links!.length).toBeGreaterThan(3);
  });

  it('contains properly formatted headers', () => {
    const headerRegex = /^#+ .+$/gm;
    const headers = aboutMarkdown.match(headerRegex);

    expect(headers).not.toBeNull();
    expect(headers!.length).toBeGreaterThan(3);
  });
});
