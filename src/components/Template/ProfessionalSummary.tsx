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
    <div
      className={`professional-summary-list${className ? ` ${className}` : ''}`}
    >
      <p className="resume-summary-intro">
        <strong>
          I build computer systems from discrete logic through RTL-to-GDS flows.
        </strong>
        <br />
        Computer Engineering junior at the{' '}
        <InlineLink href="https://www.upenn.edu" external>
          University of Pennsylvania
        </InlineLink>{' '}
        specializing in computer architecture, RTL design, and hardware
        verification. I design boards, write SystemVerilog, and verify systems
        with constrained-random testing.
      </p>
      <ul className="resume-summary-details">
        <li>
          <strong>Open source</strong>
          <span>
            {' '}
            Writing core C++/Python patches for open-source EDA tools (
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
            ), including fixes shipped in the LibreLane{' '}
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
            releases.
          </span>
        </li>
        <li>
          <strong>Selected builds</strong>
          <span>
            {' '}
            Discrete 32-bit Polymorphic Dual-LUT3 CPU (
            <InlineLink href={TOMATO_SITE_URL} external>
              Tomato
            </InlineLink>
            ), a{' '}
            <InlineLink href="https://tmarhguy.github.io/gpu/" external>
              Pineapple GPU
            </InlineLink>
            , a{' '}
            <InlineLink href="https://github.com/tmarhguy/udp-stack" external>
              100 Mbps UDP/IP stack
            </InlineLink>
            , a{' '}
            <InlineLink href="https://github.com/tmarhguy/itch-hw" external>
              NASDAQ ITCH 5.0 FPGA parser
            </InlineLink>
            , a{' '}
            <InlineLink href="https://alu.tmarhguy.com" external>
              hybrid transistor ALU
            </InlineLink>
            , a{' '}
            <InlineLink href="https://tmarhguy.github.io/mac/" external>
              Sky130 BFloat16 MAC
            </InlineLink>
            , and a{' '}
            <InlineLink href="https://github.com/tmarhguy/64b-sram" external>
              full-custom 22nm SRAM
            </InlineLink>
            . Verification work spans{' '}
            <strong>UVM, cocotb, and formal methods</strong>, with
            project-specific test records linked above.
          </span>
        </li>
        <li>
          <strong>Experience</strong>
          <span>
            {' '}
            Software Engineer Intern at{' '}
            <InlineLink href={workUrl('Aragorn')} external>
              Aragorn AI
            </InlineLink>
            . Hardware & Firmware Engineer at{' '}
            <InlineLink href={workUrl('Vero')} external>
              Vero Electric
            </InlineLink>{' '}
            (PCB design & Board bring-up).
          </span>
        </li>
      </ul>
    </div>
  );
}
