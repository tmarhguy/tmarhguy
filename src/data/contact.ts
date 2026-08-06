import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faSubstack } from '@fortawesome/free-brands-svg-icons/faSubstack';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faWikipediaW } from '@fortawesome/free-brands-svg-icons/faWikipediaW';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';

import profile from './profile.json';

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
    link: 'https://facebook.com/tmarhguy',
    label: 'Facebook',
    icon: faFacebookF,
  },
  {
    link: 'https://en.wikipedia.org/wiki/Tyrone_Marhguy',
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
