import profile from '@/data/profile.json';

const CONTACT_ADDRESS = profile.email;
const [CONTACT_LOCAL_PART, CONTACT_DOMAIN] = CONTACT_ADDRESS.split('@');

export default function EmailLink() {
  return (
    <div className="contact-email-container">
      <a
        href={`mailto:${CONTACT_ADDRESS}`}
        className="contact-email-link"
        aria-label={`Email ${CONTACT_ADDRESS}`}
      >
        <span className="contact-email-prefix">{CONTACT_LOCAL_PART}</span>
        <span className="contact-email-domain">@{CONTACT_DOMAIN}</span>
      </a>
    </div>
  );
}
