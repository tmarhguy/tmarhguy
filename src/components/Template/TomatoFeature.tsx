import Image from 'next/image';
import Link from 'next/link';
import { TOMATO_REPO_URL, TOMATO_SITE_URL } from '@/data/projects';
import TomatoOperations from './TomatoOperations';

export default function TomatoFeature() {
  return (
    <section className="tomato-feature" aria-labelledby="tomato-title">
      <div className="home-section-header">
        <span className="home-section-kicker">01 / The independent build</span>
        <span className="home-section-kicker">
          Architecture / boards / software
        </span>
      </div>
      <div className="tomato-heading">
        <h2 id="tomato-title">
          Meet Tomato.
          <br />
          <span>A computer of my own.</span>
        </h2>
        <p>
          It started with a question: could I build a computer from individual
          transistors? That became an ALU, a rethink, and a 32-bit architecture.
          Today, my FPGA implementation boots TomatoOS and runs games over HDMI.
          I’m building the discrete machine board by board.
        </p>
      </div>
      <div className="tomato-media-grid">
        <figure className="tomato-demo">
          {/* The clip shows the display only; the adjacent caption describes its visual content. */}
          <div className="tomato-media-frame">
            <video
              controls
              playsInline
              preload="none"
              poster="/images/os/hdmi-demo-poster.webp"
              aria-label="TomatoOS games and desktop running over HDMI"
            >
              <source
                src="/images/os/hdmi-demo-games-ui.mp4"
                type="video/mp4"
              />
              <a href="/images/os/hdmi-demo-games-ui.mp4">
                Watch the TomatoOS demo
              </a>
            </video>
          </div>
          <figcaption>
            <span>Running / FPGA</span> My CPU. My assembler. TomatoOS on the
            screen. Play the demo to see the desktop and games.
          </figcaption>
        </figure>
        <figure className="tomato-board">
          <div className="tomato-media-frame">
            <Image
              src="/images/home/tomato-soldering.webp"
              alt="Soldering components onto the Tomato Dual-LUT ALU board"
              fill
              sizes="(max-width: 735px) 100vw, 50vw"
            />
          </div>
          <figcaption>
            <span>On the bench / Discrete hardware</span> The ALU board is
            fabricated and being assembled. The complete discrete CPU is in
            progress.
          </figcaption>
        </figure>
      </div>
      <div className="tomato-links">
        <a className="button" href={TOMATO_SITE_URL}>
          Explore Tomato
        </a>
        <a href={TOMATO_REPO_URL}>Architecture & source</a>
        <Link href="/writing/2026-08-18-first-phase-of-assembly/">
          From the soldering bench
        </Link>
      </div>
      <TomatoOperations />
      <div className="tomato-depth">
        <div className="tomato-capacity">
          <span className="home-section-kicker">
            An intentionally outsized register file
          </span>
          <h3>
            Half a Blackwell SM’s
            <br />
            register capacity.
          </h3>
          <p>
            The discrete register-file design addresses{' '}
            <strong>32,768 × 32-bit locations</strong>: 128 KiB of logical
            storage, with 256 registers visible per instruction window.
          </p>
          <div
            className="capacity-bars"
            aria-label="Logical register capacity: Tomato design 128 KiB; one Blackwell SM 256 KiB"
          >
            <div>
              <span>Tomato design</span>
              <b>128 KiB</b>
              <i className="capacity-tomato" />
            </div>
            <div>
              <span>One Blackwell SM</span>
              <b>256 KiB</b>
              <i />
            </div>
          </div>
          <p className="tomato-note">
            Capacity comparison only. Tomato uses banked, mirrored SRAM; a GPU
            SM has different porting, bandwidth, latency, and scheduling. This
            is a design specification, not a GPU performance claim.
          </p>
          <div className="tomato-source-links">
            <Link href="/writing/2026-08-29-register-upgrade/">
              Why 32,768?
            </Link>
            <a href="https://docs.nvidia.com/cuda/blackwell-tuning-guide/index.html#occupancy">
              NVIDIA reference
            </a>
          </div>
        </div>
        <div className="tomato-decision">
          <span className="home-section-kicker">
            A decision from the build log
          </span>
          <h3>
            I widened the design.
            <br />
            Then went back to 32 bits.
          </h3>
          <p>
            A 40-bit instruction looked clean on paper. It also meant wider
            fields and more board work. I returned to 32 bits so the design
            could move forward on the bench.
          </p>
          <p>
            The journal follows the reasoning: what I tried, what complicated
            the hardware, and what changed.
          </p>
          <Link href="/writing/2026-07-31-falling-back-to-32b/">
            Read the architectural rethink
          </Link>
        </div>
      </div>
    </section>
  );
}
