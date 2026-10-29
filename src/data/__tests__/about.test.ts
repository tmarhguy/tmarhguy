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
    expect(aboutMarkdown).toContain('wind generator');
    expect(aboutMarkdown).toContain('father');
    expect(aboutMarkdown).toContain('/images/about/wind-generator.mp4');
    expect(aboutMarkdown).toContain('first-semester exams');
    expect(aboutMarkdown).toContain('1500');
    expect(aboutMarkdown).toContain('that generator');
    expect(aboutMarkdown).toContain('aggregate of six');
    expect(aboutMarkdown).toContain('3,500');
    expect(aboutMarkdown).toContain('How does this work?');
    expect(aboutMarkdown).toContain('### Copper and magnets');
    expect(aboutMarkdown).toContain('### The same questions');
  });

  it('contains the Achimota section', () => {
    expect(aboutMarkdown).toContain('# Attending Achimota');
    expect(aboutMarkdown).toContain('Rastafarian');
    expect(aboutMarkdown).toContain('High Court ruled in our favor');
  });

  it('contains the academics section', () => {
    expect(aboutMarkdown).toContain('# School and academic awards');
    expect(aboutMarkdown).toContain(
      '[eight A1 grades in the WASSCE](https://www.myjoyonline.com/rastafarian-achimota-student-tyrone-marhguy-scores-8-as-in-wassce/)',
    );
    expect(aboutMarkdown).toContain(
      '[topped my class in Science and Elective Mathematics](https://www.adomonline.com/tyrone-marghuy-tops-class-in-science-elective-maths-despite-admission-woes/)',
    );
    expect(aboutMarkdown).toContain('American Mathematics Olympiad');
    expect(aboutMarkdown).toContain('B.S.E. in Computer Engineering');
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
    expect(aboutMarkdown).toContain('https://alu.tmarhguy.com');
    expect(aboutMarkdown).toContain('https://tmarhguy.github.io/gpu/');
    expect(aboutMarkdown).toContain('SeaLion');
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
