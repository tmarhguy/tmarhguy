import { describe, expect, it } from 'vitest';

import { aboutMarkdown } from '../about';
import { WIKIPEDIA_URL } from '../contact';

describe('about data', () => {
  it('exports aboutMarkdown as a string', () => {
    expect(typeof aboutMarkdown).toBe('string');
    expect(aboutMarkdown.length).toBeGreaterThan(0);
  });

  it('introduces the story and links the public biography', () => {
    expect(aboutMarkdown).toContain('# Growing up in Ghana');
    expect(aboutMarkdown).toContain('University of Pennsylvania');
    expect(aboutMarkdown).toContain('Computer Engineering');
    expect(aboutMarkdown).toContain(`[Wikipedia](${WIKIPEDIA_URL})`);
  });

  it('contains early life and family background', () => {
    expect(aboutMarkdown).toContain('# Growing up in Ghana');
    expect(aboutMarkdown).toContain('triplet');
    expect(aboutMarkdown).toContain('Nikita');
    expect(aboutMarkdown).toContain('Ghana');
  });

  it('contains the Achimota section', () => {
    expect(aboutMarkdown).toContain('# Attending Achimota');
    expect(aboutMarkdown).toContain('Rastafarian');
    expect(aboutMarkdown).toContain('High Court ruled in our favor');
  });

  it('contains the academics section', () => {
    expect(aboutMarkdown).toContain('# School and academic awards');
    expect(aboutMarkdown).toContain('WASSCE');
    expect(aboutMarkdown).toContain('B.S.E. in Computer Engineering');
    expect(aboutMarkdown).toContain('American Mathematics Olympiad');
  });

  it('contains hobbies and interests', () => {
    expect(aboutMarkdown).toContain('# Away from the desk');
    expect(aboutMarkdown).toContain('Sudoku');
    expect(aboutMarkdown).toContain('biking');
  });

  it('contains the now section', () => {
    expect(aboutMarkdown).toContain('# What I’m building now');
    expect(aboutMarkdown).not.toContain('Fluid Silicon');
    expect(aboutMarkdown).toContain('Tomato');
    expect(aboutMarkdown).toContain('https://tomato.tmarhguy.com');
    expect(aboutMarkdown).toContain('LibreLane');
    expect(aboutMarkdown).toContain('OpenROAD');
    expect(aboutMarkdown).toContain('Verilator');
    expect(aboutMarkdown).toContain('Aragorn AI');
    expect(aboutMarkdown).toContain('Vero Electric');
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
