import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { type ContactItem, getContactItems } from '@/data/contact';

interface ContactIconsProps {
  includeEmail?: boolean;
  /** Split professional profiles from the rest. Used on the contact page. */
  grouped?: boolean;
}

function IconList({
  items,
  className = 'icons',
}: {
  items: ContactItem[];
  className?: string;
}) {
  return (
    <ul className={className}>
      {items.map((s) => {
        // A mailto: hands off to a mail client, so it neither opens a tab nor
        // needs the warning — announcing one was simply wrong.
        const isMailto = s.link.startsWith('mailto:');

        return (
          <li key={s.label}>
            <a
              href={s.link}
              aria-label={isMailto ? s.label : `${s.label} (opens in new tab)`}
              {...(isMailto
                ? {}
                : { target: '_blank', rel: 'noopener noreferrer' })}
            >
              <FontAwesomeIcon icon={s.icon} className="size-5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default function ContactIcons({
  includeEmail = true,
  grouped = false,
}: ContactIconsProps) {
  if (!grouped) {
    return <IconList items={getContactItems({ includeEmail })} />;
  }

  const work = getContactItems({ includeEmail, group: 'work' });
  const elsewhere = getContactItems({ includeEmail, group: 'elsewhere' });

  return (
    <div className="contact-icon-groups">
      <IconList items={work} className="icons icons--work" />
      {elsewhere.length > 0 && (
        <>
          <div className="contact-divider contact-divider--secondary">
            <span>and</span>
          </div>
          <IconList items={elsewhere} className="icons icons--elsewhere" />
        </>
      )}
    </div>
  );
}
