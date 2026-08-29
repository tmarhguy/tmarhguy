'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import routes from '@/data/routes';
import { externalAnchorProps, isExternalHref } from '@/lib/external-link';
import { isActiveRoute } from '@/lib/routes';
import { AUTHOR_NAME } from '@/lib/utils';

import Hamburger from './Hamburger';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link href="/" className="site-logo" aria-label={`${AUTHOR_NAME} — home`}>
        <span className="logo-text">TM</span>
      </Link>

      <nav className="nav-links" aria-label="Primary">
        {routes
          .filter((l) => !l.index && l.primary !== false)
          .map((l) => {
            const active = isActiveRoute(pathname, l.path);
            const className = `nav-link ${active ? 'active' : ''}`;

            if (isExternalHref(l.path)) {
              return (
                <a
                  key={l.label}
                  href={l.path}
                  className={className}
                  {...externalAnchorProps(l.path)}
                >
                  {l.label}
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              );
            }

            return (
              <Link
                key={l.label}
                href={l.path}
                className={className}
                aria-current={active ? 'page' : undefined}
              >
                {l.label}
              </Link>
            );
          })}
      </nav>

      <div className="nav-actions">
        <ThemeToggle />
        <Hamburger />
      </div>
    </header>
  );
}
