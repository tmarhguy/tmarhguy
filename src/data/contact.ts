import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faDev } from '@fortawesome/free-brands-svg-icons/faDev';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faSubstack } from '@fortawesome/free-brands-svg-icons/faSubstack';
import { faThreads } from '@fortawesome/free-brands-svg-icons/faThreads';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faWikipediaW } from '@fortawesome/free-brands-svg-icons/faWikipediaW';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';

import { faHackaday, faHackster } from './brand-icons';
import profile from './profile.json';

export const WIKIPEDIA_URL = 'https://en.wikipedia.org/wiki/Tyrone_Marhguy';

export const CONTACT_PERSONAL_EMAIL = 'tmarhguy@gmail.com';

export interface ContactItem {
  link: string;
  label: string;
  icon: IconDefinition;
  /** `work` is LinkedIn, GitHub, X, Wikipedia; `elsewhere` is the rest. */
  group: 'work' | 'elsewhere';
}

const data: ContactItem[] = [
  {
    link: 'https://www.linkedin.com/in/tmarhguy',
    label: 'LinkedIn',
    icon: faLinkedinIn,
    group: 'work',
  },
  {
    link: 'https://github.com/tmarhguy',
    label: 'GitHub',
    icon: faGithub,
    group: 'work',
  },
  {
    link: 'https://x.com/marhguy_tyrone',
    label: 'X',
    icon: faTwitter,
    group: 'work',
  },
  {
    link: WIKIPEDIA_URL,
    label: 'Wikipedia',
    icon: faWikipediaW,
    group: 'work',
  },
  {
    link: 'https://hackaday.io/tmarhguy',
    label: 'Hackaday',
    icon: faHackaday,
    group: 'elsewhere',
  },
  {
    link: 'https://www.hackster.io/tmarhguy',
    label: 'Hackster',
    icon: faHackster,
    group: 'elsewhere',
  },
  {
    link: 'https://dev.to/tmarhguy',
    label: 'DEV',
    icon: faDev,
    group: 'elsewhere',
  },
  {
    link: 'https://tmarhguy.substack.com',
    label: 'Substack',
    icon: faSubstack,
    group: 'elsewhere',
  },
  {
    link: 'https://www.instagram.com/tmarhguy/',
    label: 'Instagram',
    icon: faInstagram,
    group: 'elsewhere',
  },
  {
    link: 'https://www.threads.net/@tmarhguy',
    label: 'Threads',
    icon: faThreads,
    group: 'elsewhere',
  },
  {
    link: 'https://facebook.com/tmarhguy',
    label: 'Facebook',
    icon: faFacebookF,
    group: 'elsewhere',
  },
  {
    // One public address, shared with the contact CTA and JSON-LD.
    link: `mailto:${profile.email}`,
    label: 'Email',
    icon: faEnvelope,
    group: 'work',
  },
];

export function getContactItems({
  includeEmail = true,
  group,
}: {
  includeEmail?: boolean;
  group?: ContactItem['group'];
} = {}): ContactItem[] {
  return data.filter((item) => {
    if (!includeEmail && item.link.startsWith('mailto:')) {
      return false;
    }
    if (group && item.group !== group) {
      return false;
    }
    return true;
  });
}

export default data;
