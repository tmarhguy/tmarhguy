import Link from 'next/link';
import type { ReactNode } from 'react';

import { getProjectAnchorHrefByTitle } from '@/data/projects';
import work from '@/data/resume/work';

const HOWARD_ACHIEVERS_URL =
  work.find((entry) => entry.name.includes('Howard'))?.url ??
  'https://education.howard.edu/affiliated-programs/stem-summer-camp-verizon-innovative-learning';

function workUrl(match: string): string {
  const job = work.find((entry) => entry.name.includes(match));
  return job?.url ?? '#';
}

function InlineLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: ReactNode;
}) {
  const className = 'hero-inline-link';

  if (external) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function ResumeSummary() {
  return (
    <p className="resume-summary">
      I build computers from{' '}
      <InlineLink href="https://alu.tmarhguy.com" external>
        discrete transistors to tapeout
      </InlineLink>
      — and I write the software to test, automate, and deploy them. Currently
      designing a{' '}
      <InlineLink href={getProjectAnchorHrefByTitle('Tomato')}>
        32-bit CPU
      </InlineLink>{' '}
      that rethinks how FPGAs reconfigure. Contributor to{' '}
      <InlineLink
        href="https://github.com/librelane/librelane/pull/1015"
        external
      >
        LibreLane
      </InlineLink>
      ,{' '}
      <InlineLink href="https://github.com/lnis-uofu/OpenFPGA" external>
        OpenFPGA
      </InlineLink>
      , and{' '}
      <InlineLink
        href="https://github.com/verilator/verilator/pull/8070"
        external
      >
        Verilator
      </InlineLink>
      ; joining Penn for FPGA research this fall; backends at{' '}
      <InlineLink href={workUrl('Aragorn')} external>
        Aragorn AI
      </InlineLink>
      ; battery management at{' '}
      <InlineLink href={workUrl('Vero')} external>
        Vero Electric
      </InlineLink>
      ; AR/VR STEM instruction at Howard University STEM{' '}
      <InlineLink href={HOWARD_ACHIEVERS_URL} external>
        Achievers
      </InlineLink>
      ; and CIS 1100 TA plus Fife-Penn coding clubs at Penn.
    </p>
  );
}
