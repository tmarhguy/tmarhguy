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
}

const data: ContactItem[] = [
  {
    link: 'https://www.linkedin.com/in/tmarhguy',
    label: 'LinkedIn',
    icon: faLinkedinIn,
  },
  {
    link: 'https://github.com/tmarhguy',
    label: 'GitHub',
    icon: faGithub,
  },
  {
    link: 'https://hackaday.io/tmarhguy',
    label: 'Hackaday',
    icon: faHackaday,
  },
  {
    link: 'https://www.hackster.io/tmarhguy',
    label: 'Hackster',
    icon: faHackster,
  },
  {
    link: 'https://dev.to/tmarhguy',
    label: 'DEV',
    icon: faDev,
  },
  {
    link: 'https://x.com/marhguy_tyrone',
    label: 'X',
    icon: faTwitter,
  },
  {
    link: 'https://tmarhguy.substack.com',
    label: 'Substack',
    icon: faSubstack,
  },
  {
    link: 'https://www.instagram.com/tmarhguy/',
    label: 'Instagram',
    icon: faInstagram,
  },
  {
    link: 'https://www.threads.net/@tmarhguy',
    label: 'Threads',
    icon: faThreads,
  },
  {
    link: 'https://facebook.com/tmarhguy',
    label: 'Facebook',
    icon: faFacebookF,
  },
  {
    link: WIKIPEDIA_URL,
    label: 'Wikipedia',
    icon: faWikipediaW,
  },
  {
    // One public address, shared with the contact CTA and JSON-LD.
    link: `mailto:${profile.email}`,
    label: 'Email',
    icon: faEnvelope,
  },
];

export default data;
