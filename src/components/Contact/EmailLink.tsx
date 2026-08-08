'use client';

import { useEffect, useState } from 'react';

import { CONTACT_PERSONAL_EMAIL } from '@/data/contact';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { copyText } from '@/lib/copy-to-clipboard';
import profile from '@/data/profile.json';

const PENN_EMAIL = profile.email;
const [CONTACT_LOCAL_PART] = PENN_EMAIL.split('@');
const ROTATION_MS = 3_500;
const COPIED_RESET_MS = 2_000;

type EmailVariant = 'penn' | 'personal';

const EMAIL_BY_VARIANT: Record<EmailVariant, string> = {
  penn: PENN_EMAIL,
  personal: CONTACT_PERSONAL_EMAIL,
};

const DOMAIN_BY_VARIANT: Record<EmailVariant, string> = {
  penn: 'engineering.upenn.edu',
  personal: 'gmail.com',
};

export default function EmailLink() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [variant, setVariant] = useState<EmailVariant>('penn');
  const [copied, setCopied] = useState(false);
  const email = EMAIL_BY_VARIANT[variant];
  const domain = DOMAIN_BY_VARIANT[variant];

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setVariant((current) => (current === 'penn' ? 'personal' : 'penn'));
    }, ROTATION_MS);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timer = window.setTimeout(() => setCopied(false), COPIED_RESET_MS);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    const didCopy = await copyText(email);
    if (didCopy) {
      setCopied(true);
    }
  };

  return (
    <div className="contact-email-container">
      <button
        type="button"
        className="contact-email-link"
        onClick={() => {
          void handleCopy();
        }}
        aria-label={`Copy ${email} to clipboard`}
      >
        <span className="contact-email-local">
          <span className="contact-email-prefix">{CONTACT_LOCAL_PART}</span>
          <span className="contact-email-at">@</span>
        </span>
        <span className="contact-email-domain-slot">
          <span
            key={domain}
            className={`contact-email-domain${
              prefersReducedMotion ? '' : ' contact-email-domain--animated'
            }`}
          >
            {domain}
          </span>
        </span>
      </button>
      <p className="contact-hint" aria-live="polite">
        {copied ? 'Copied to clipboard' : 'Click to copy email'}
      </p>
    </div>
  );
}
