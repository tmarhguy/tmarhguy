import { WIKIPEDIA_URL } from '@/data/contact';

const AUTHOR_NAMES = ['Tyrone Iras Marhguy', 'Tyrone Marhguy'] as const;

const MARKDOWN_LINK = /(\[[^\]]+\]\([^)]+\))/g;

/** Link plain-text author name mentions without disturbing existing markdown links. */
export function linkAuthorNameInMarkdown(
  markdown: string,
  wikiUrl: string = WIKIPEDIA_URL,
): string {
  return markdown
    .split(MARKDOWN_LINK)
    .map((segment, index) => {
      if (index % 2 === 1) {
        return segment;
      }

      let text = segment;
      for (const name of AUTHOR_NAMES) {
        const linked = `[${name}](${wikiUrl})`;
        if (text.includes(linked)) {
          continue;
        }
        text = text.replaceAll(name, linked);
      }
      return text;
    })
    .join('');
}
