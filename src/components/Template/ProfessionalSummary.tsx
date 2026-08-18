import Link from 'next/link';
import type { ReactNode } from 'react';

import { TOMATO_SITE_URL } from '@/data/projects';
import work from '@/data/resume/work';

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

interface ProfessionalSummaryProps {
  className?: string;
}

export default function ProfessionalSummary({
  className,
}: ProfessionalSummaryProps) {
  return (
    <ul className={`professional-summary-list${className ? ` ${className}` : ''}`}>
      <li>
        Computer Engineering Junior at the{' '}
        <InlineLink href="https://www.upenn.edu" external>
          University of Pennsylvania
        </InlineLink>
        . I build and verify hardware—routing complex discrete-MOSFET PCBs
        and hardening RTL via the Sky130 ASIC flow.
      </li>
      <li>
        <strong>Open Source Contributions:</strong> Writing core C++/Python
        patches for open-source EDA tools, including code shipped in the latest
        LibreLane{' '}
        <InlineLink
          href="https://github.com/librelane/librelane/releases/tag/3.0.8"
          external
        >
          3.0.8
        </InlineLink>{' '}
        and{' '}
        <InlineLink
          href="https://github.com/librelane/librelane/releases/tag/3.0.10"
          external
        >
          3.0.10
        </InlineLink>{' '}
        releases (
        <InlineLink
          href="https://github.com/verilator/verilator/pull/8070"
          external
        >
          Verilator
        </InlineLink>
        ,{' '}
        <InlineLink
          href="https://github.com/librelane/librelane/pull/1015"
          external
        >
          LibreLane
        </InlineLink>
        ,{' '}
        <InlineLink
          href="https://github.com/The-OpenROAD-Project/OpenROAD/pull/11107"
          external
        >
          OpenROAD
        </InlineLink>
        ,{' '}
        <InlineLink href="https://github.com/lnis-uofu/OpenFPGA" external>
          OpenFPGA
        </InlineLink>
        ).
      </li>
      <li>
        <strong>The Builds:</strong> Discrete 32-bit Polymorphic Dual-LUT3 CPU (
        <InlineLink href={TOMATO_SITE_URL} external>
          Tomato
        </InlineLink>
        ), a{' '}
        <InlineLink href="https://github.com/tmarhguy/udp-stack" external>
          100 Mbps UDP/IP stack
        </InlineLink>
        , a{' '}
        <InlineLink href="https://github.com/tmarhguy/itch-hw" external>
          NASDAQ ITCH 5.0 FPGA parser
        </InlineLink>
        , a{' '}
        <InlineLink href="https://alu.tmarhguy.com" external>
          3,488 MOSFET ALU
        </InlineLink>
        , a{' '}
        <InlineLink href="https://github.com/tmarhguy/mac" external>
          Sky130 BFloat16 MAC
        </InlineLink>
        , and a{' '}
        <InlineLink href="https://github.com/tmarhguy/64b-sram" external>
          full-custom 22nm SRAM
        </InlineLink>
        . All proven with UVM, cocotb, and formal verification against millions
        of test vectors.
      </li>
      <li>
        <strong>The Work:</strong> Hardware Research Intern at{' '}
        <InlineLink href={workUrl('Fluid Silicon')} external>
          Fluid Silicon
        </InlineLink>{' '}
        (HDL & FPGA emulation). Past roles spanning hardware at{' '}
        <InlineLink href={workUrl('Vero')} external>
          Vero Electric
        </InlineLink>{' '}
        and software engineering at{' '}
        <InlineLink href={workUrl('Aragorn')} external>
          Aragorn AI
        </InlineLink>
        .
      </li>
    </ul>
  );
}
