import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import { getContactItems } from '@/data/contact';
import profile from '@/data/profile.json';
import routes from '@/data/routes';
import { externalAnchorProps, isExternalHref } from '@/lib/external-link';
import { AUTHOR_NAME } from '@/lib/utils';

import ThemePortrait from './ThemePortrait';

const connectGroups = [
  { label: 'Professional', links: ['Email', 'LinkedIn', 'GitHub'] },
  {
    label: 'Writing & builds',
    links: ['Hackaday', 'Hackster', 'DEV', 'Substack'],
  },
  { label: 'Social', links: ['X', 'Instagram', 'Threads', 'Facebook'] },
];

export default function Footer() {
  const contacts = getContactItems();
  const wikipedia = contacts.find((item) => item.label === 'Wikipedia');
  const currentRole = `${profile.role} at ${profile.employer}`;

  return (
    <footer className="site-footer-new">
      <div className="footer-content">
        <div className="footer-identity">
          <Link href="/" className="footer-avatar">
            <ThemePortrait width={80} height={80} />
          </Link>
          <div className="footer-info">
            <span className="footer-name">{AUTHOR_NAME}</span>
            <p className="footer-role">{currentRole}</p>
            <p className="footer-copyright">
              &copy; {new Date().getFullYear()} ·{' '}
              <a
                href="https://github.com/tmarhguy/tmarhguy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </p>
          </div>
        </div>

        <div className="footer-right">
          {/* Driven from the same route registry as the header, which had
              drifted: the footer was missing Writing and Stats entirely.
              These are group labels, not document sections, so they are
              spans rather than headings. */}
          <nav className="footer-links" aria-labelledby="footer-links-heading">
            <span id="footer-links-heading" className="footer-links-label">
              Explore
            </span>
            <div className="footer-links-grid">
              {routes
                .filter((route) => !route.index)
                .map((route) =>
                  isExternalHref(route.path) ? (
                    <a
                      key={route.path}
                      href={route.path}
                      {...externalAnchorProps(route.path)}
                    >
                      {route.label}
                      <span className="sr-only"> (opens in new tab)</span>
                    </a>
                  ) : (
                    <Link key={route.path} href={route.path}>
                      {route.label}
                    </Link>
                  ),
                )}
            </div>
          </nav>

          <nav
            className="footer-social"
            aria-labelledby="footer-social-heading"
          >
            <span id="footer-social-heading" className="footer-social-label">
              Connect
            </span>
            {wikipedia && (
              <a
                className="footer-wikipedia"
                href={wikipedia.link}
                aria-label="Wikipedia (opens in new tab)"
                {...externalAnchorProps(wikipedia.link)}
              >
                <FontAwesomeIcon icon={wikipedia.icon} aria-hidden="true" />
                <span>
                  <strong>Wikipedia</strong>
                  <span className="footer-wikipedia-caption">
                    Profile & background
                  </span>
                </span>
              </a>
            )}
            <div className="footer-connect-groups">
              {connectGroups.map((group) => (
                <div key={group.label} className="footer-connect-group">
                  <span className="footer-connect-group-label">
                    {group.label}
                  </span>
                  <ul aria-label={group.label} className="footer-connect-list">
                    {group.links.map((label) => {
                      const contact = contacts.find(
                        (item) => item.label === label,
                      );
                      if (!contact) return null;
                      const external = isExternalHref(contact.link);
                      return (
                        <li key={label}>
                          <a
                            href={contact.link}
                            aria-label={
                              external ? `${label} (opens in new tab)` : label
                            }
                            {...externalAnchorProps(contact.link)}
                          >
                            <FontAwesomeIcon
                              icon={contact.icon}
                              aria-hidden="true"
                            />
                            <span>{label}</span>
                            {external && (
                              <span className="sr-only">
                                {' '}
                                (opens in new tab)
                              </span>
                            )}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}
