export const CoverLetter = () => {
  return (
    <div className="min-h-screen bg-bg-void" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
      {/* ── MAIN LAYOUT ── */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-[1fr_260px] gap-16 relative">
        
        {/* ── MAIN LETTER ── */}
        <main className="pb-12">
          
          {/* HEADER */}
          <section className="mb-16 pb-12 border-b border-border-subtle animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="eyebrow mb-6">General Application</div>
            <h1 className="font-display font-black text-4xl md:text-5xl text-text-primary mb-8 leading-tight">
              Letter on how I <em className="italic text-gold-champagne">work.</em>
            </h1>
            
            <div className="flex flex-wrap gap-10">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[0.58rem] tracking-[0.2em] text-gold-dim uppercase">From</span>
                <span className="font-mono text-[0.75rem] text-cream-dim tracking-[0.05em]">Tyrone Iras Marhguy</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[0.58rem] tracking-[0.2em] text-gold-dim uppercase">Email</span>
                <a href="mailto:tmarhguy@seas.upenn.edu" className="font-mono text-[0.75rem] text-cream-dim tracking-[0.05em] hover:text-gold-champagne transition-colors no-underline">
                  tmarhguy@seas.upenn.edu
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[0.58rem] tracking-[0.2em] text-gold-dim uppercase">Phone</span>
                <span className="font-mono text-[0.75rem] text-cream-dim tracking-[0.05em]">+1 (267) 320-2734</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[0.58rem] tracking-[0.2em] text-gold-dim uppercase">Location</span>
                <span className="font-mono text-[0.75rem] text-cream-dim tracking-[0.05em]">Philadelphia, PA</span>
              </div>
            </div>
          </section>

          {/* BODY */}
          <div className="animate-fade-up flex flex-col pt-10" style={{ animationDelay: '0.1s' }}>
            <div className="font-mono text-[0.78rem] tracking-[0.1em] text-cream-dim mb-10">
              Dear Hiring Manager,
            </div>

            <p className="text-[1.08rem] text-cream leading-[1.95] mb-7">
              I grew up in Ghana as one of triplets. When I was thirteen, our family lived on a parked bus for over two years. I had no textbooks for circuits, but I had broken radios, a 12V car battery, and a lot of free time. To keep our old mobile phones charged, I figured out how to step 12V down to 5V using LM7805 regulators and Zener diodes I bought with spare change.
            </p>

            <div className="border-l-2 border-gold-champagne pl-8 my-10 italic font-display text-xl text-text-primary leading-relaxed">
              "Lacking a soldering iron, I extracted carbon rods from dead Type D batteries — eventually switching to iron nails, heating them in the same coal pot we used for cooking just to melt solder onto the joints."
            </div>

            <p className="text-base text-cream-dim leading-[1.95] mb-7">
              I didn't know much about formal electronics then. I just knew that <strong className="text-text-primary font-bold">understanding the physics of a system from first principles could solve our problems.</strong>
            </p>

            <p className="text-base text-cream-dim leading-[1.95] mb-7">
              Today, as a Computer Engineering sophomore at the University of Pennsylvania, that same scrappy, first-principles instinct drives how I build hardware. The stakes have shifted from charging phones to closing timing on a processor — but my approach remains unchanged: I don't just study abstractions. I build them, break them, and debug them at 2 AM until they work.
            </p>

            {/* TECHNICAL BLOCK 1 */}
            <div className="bg-bg-surface border border-border-subtle border-l-2 border-l-gold-dim p-8 my-8 group hover:border-l-gold-champagne transition-colors">
              <div className="flex items-center gap-3 font-mono text-[0.62rem] tracking-[0.25em] text-gold-champagne uppercase mb-4 before:content-[''] before:flex-1 before:h-[1px] before:bg-border-subtle after:content-[''] after:flex-1 after:h-[1px] after:bg-border-subtle">
                Full-Cycle PCB Development & Bring-Up
              </div>
              <p className="text-[0.92rem] text-cream-dim leading-relaxed mb-5">
                For my 8-bit discrete transistor ALU — built entirely in my dorm room — I executed the complete hardware lifecycle. I designed the schematics across 76 CMOS logic gates using 3,488 discrete MOSFETs, routed a 4-layer KiCad PCB with dedicated power planes, and managed fabrication. Bring-up involved oscilloscope debugging of a 400ns worst-case propagation delay, identifying ground bounce from layout errors, and reworking the board with decoupling capacitors. The project earned unsolicited fabrication sponsorship, giving me failure-mode intuition that coursework simply cannot teach.
              </p>
              <div className="flex flex-wrap gap-8 pt-5 mt-5 border-t border-border-subtle">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[0.9rem] text-gold-champagne font-medium">3,488</span>
                  <span className="font-mono text-[0.55rem] tracking-[0.15em] text-cream-dim uppercase">Discrete MOSFETs</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[0.9rem] text-gold-champagne font-medium">1.24M</span>
                  <span className="font-mono text-[0.55rem] tracking-[0.15em] text-cream-dim uppercase">Automated test vectors</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[0.9rem] text-gold-champagne font-medium">400ns</span>
                  <span className="font-mono text-[0.55rem] tracking-[0.15em] text-cream-dim uppercase">Worst-case propagation</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[0.9rem] text-gold-champagne font-medium">41 ★</span>
                  <span className="font-mono text-[0.55rem] tracking-[0.15em] text-cream-dim uppercase">GitHub stars</span>
                </div>
              </div>
            </div>

            {/* TECHNICAL BLOCK 2 */}
            <div className="bg-bg-surface border border-border-subtle border-l-2 border-l-gold-dim p-8 my-8 group hover:border-l-gold-champagne transition-colors">
              <div className="flex items-center gap-3 font-mono text-[0.62rem] tracking-[0.25em] text-gold-champagne uppercase mb-4 before:content-[''] before:flex-1 before:h-[1px] before:bg-border-subtle after:content-[''] after:flex-1 after:h-[1px] after:bg-border-subtle">
                Physical Design & ASIC Tapeout
              </div>
              <p className="text-[0.92rem] text-cream-dim leading-relaxed mb-5">
                For my BFloat16 MAC unit targeting the Sky130 130nm process, I ran the full OpenLane RTL-to-GDS flow — synthesis, floorplanning, placement, CTS, and routing. I achieved 50 MHz timing closure with zero DRC/LVS violations in a 0.11mm² footprint, designed on-chip power distribution for 150mA peak bursts at &lt;50mV IR drop, and automated power rail verification across 1,000+ corners with Tcl scripting.
              </p>
              <div className="flex flex-wrap gap-8 pt-5 mt-5 border-t border-border-subtle">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[0.9rem] text-gold-champagne font-medium">50 MHz</span>
                  <span className="font-mono text-[0.55rem] tracking-[0.15em] text-cream-dim uppercase">Timing closure</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[0.9rem] text-gold-champagne font-medium">0.11mm²</span>
                  <span className="font-mono text-[0.55rem] tracking-[0.15em] text-cream-dim uppercase">Footprint</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[0.9rem] text-gold-champagne font-medium">0</span>
                  <span className="font-mono text-[0.55rem] tracking-[0.15em] text-cream-dim uppercase">DRC / LVS violations</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[0.9rem] text-gold-champagne font-medium">1,000+</span>
                  <span className="font-mono text-[0.55rem] tracking-[0.15em] text-cream-dim uppercase">Corners verified</span>
                </div>
              </div>
            </div>

            {/* TECHNICAL BLOCK 3 */}
            <div className="bg-bg-surface border border-border-subtle border-l-2 border-l-gold-dim p-8 my-8 group hover:border-l-gold-champagne transition-colors">
              <div className="flex items-center gap-3 font-mono text-[0.62rem] tracking-[0.25em] text-gold-champagne uppercase mb-4 before:content-[''] before:flex-1 before:h-[1px] before:bg-border-subtle after:content-[''] after:flex-1 after:h-[1px] after:bg-border-subtle">
                Digital Systems & Hardware–Software Integration
              </div>
              <p className="text-[0.92rem] text-cream-dim leading-relaxed mb-5">
                For my 64-bit RISC-V processor (RV64IM, 5-stage pipeline, 100 MHz on Artix-7), I implemented SPI controllers, debugged I2C timing violations with a logic analyzer, and verified 96% ISA compliance against the official riscv-tests suite. A custom UART bootloader enabled bare-metal C programs compiled with GCC — closing the loop between RTL and tangible software execution.
              </p>
              <div className="flex flex-wrap gap-8 pt-5 mt-5 border-t border-border-subtle">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[0.9rem] text-gold-champagne font-medium">100 MHz</span>
                  <span className="font-mono text-[0.55rem] tracking-[0.15em] text-cream-dim uppercase">On Artix-7 FPGA</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[0.9rem] text-gold-champagne font-medium">96%</span>
                  <span className="font-mono text-[0.55rem] tracking-[0.15em] text-cream-dim uppercase">ISA compliance</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[0.9rem] text-gold-champagne font-medium">RV64IM</span>
                  <span className="font-mono text-[0.55rem] tracking-[0.15em] text-cream-dim uppercase">5-stage pipeline</span>
                </div>
              </div>
            </div>

            {/* CLOSING */}
            <div className="mt-12 pt-10 border-t border-border-subtle">
              <p className="text-base text-cream leading-[1.95] mb-7">
                I am a fast, self-directed learner who is most energized when working at the edge of my knowledge. I build hardware the same way I've approached every hard problem in my life — not by waiting for the right tools, but by understanding the system deeply enough to build those tools myself. That instinct doesn't turn off when the problem is a timing closure instead of a dead battery.
              </p>
              <p className="text-base text-cream leading-[1.95] mb-10">
                I would welcome the opportunity to bring this drive to your team.
              </p>

              <div className="mt-10">
                <div className="font-display text-2xl font-bold italic text-text-primary mb-1">Tyrone Iras Marhguy</div>
                <div className="font-mono text-[0.68rem] tracking-[0.15em] text-cream-dim uppercase mb-4">B.S. Computer Engineering · University of Pennsylvania</div>
                <div className="flex flex-wrap gap-6 pt-2">
                  <a href="mailto:tmarhguy@seas.upenn.edu" className="font-mono text-[0.68rem] text-cream-dim tracking-[0.08em] hover:text-gold-champagne transition-colors no-underline">
                    tmarhguy@seas.upenn.edu
                  </a>
                  <a href="https://github.com/tmarhguy" target="_blank" rel="noopener noreferrer" className="font-mono text-[0.68rem] text-cream-dim tracking-[0.08em] hover:text-gold-champagne transition-colors no-underline">
                    github.com/tmarhguy
                  </a>
                  <a href="https://linkedin.com/in/tmarhguy" target="_blank" rel="noopener noreferrer" className="font-mono text-[0.68rem] text-cream-dim tracking-[0.08em] hover:text-gold-champagne transition-colors no-underline">
                    linkedin.com/in/tmarhguy
                  </a>
                  <a href="https://tmarhguy.com" target="_blank" rel="noopener noreferrer" className="font-mono text-[0.68rem] text-cream-dim tracking-[0.08em] hover:text-gold-champagne transition-colors no-underline">
                    tmarhguy.com
                  </a>
                </div>
              </div>
            </div>

          </div>
        </main>

        {/* ── SIDEBAR ── */}
        <aside className="hidden md:block pt-2 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="sticky top-24 flex flex-col gap-8">

            <div className="bg-bg-surface border border-border-subtle p-6">
              <div className="font-mono text-[0.6rem] tracking-[0.2em] text-gold-champagne uppercase mb-4">By the numbers</div>
              <div className="flex flex-col gap-1 py-3 border-b border-border-subtle">
                <span className="font-display text-[1.4rem] font-bold text-gold-champagne leading-none">3,488</span>
                <span className="font-mono text-[0.58rem] tracking-[0.15em] text-cream-dim uppercase">MOSFETs · 8-bit ALU</span>
              </div>
              <div className="flex flex-col gap-1 py-3 border-b border-border-subtle">
                <span className="font-display text-[1.4rem] font-bold text-gold-champagne leading-none">1.24M</span>
                <span className="font-mono text-[0.58rem] tracking-[0.15em] text-cream-dim uppercase">Test vectors validated</span>
              </div>
              <div className="flex flex-col gap-1 py-3 border-b border-border-subtle">
                <span className="font-display text-[1.4rem] font-bold text-gold-champagne leading-none">50 MHz</span>
                <span className="font-mono text-[0.58rem] tracking-[0.15em] text-cream-dim uppercase">ASIC timing closure</span>
              </div>
              <div className="flex flex-col gap-1 py-3 border-b border-border-subtle">
                <span className="font-display text-[1.4rem] font-bold text-gold-champagne leading-none">96%</span>
                <span className="font-mono text-[0.58rem] tracking-[0.15em] text-cream-dim uppercase">RISC-V ISA compliance</span>
              </div>
              <div className="flex flex-col gap-1 py-3 border-b border-border-subtle">
                <span className="font-display text-[1.4rem] font-bold text-gold-champagne leading-none">99th</span>
                <span className="font-mono text-[0.58rem] tracking-[0.15em] text-cream-dim uppercase">Percentile · SAT</span>
              </div>
              <div className="flex flex-col gap-1 pt-3">
                <span className="font-display text-[1.4rem] font-bold text-gold-champagne leading-none">8 A1s</span>
                <span className="font-mono text-[0.58rem] tracking-[0.15em] text-cream-dim uppercase">WASSCE 2023</span>
              </div>
            </div>

            <div className="bg-bg-surface border border-border-subtle p-6">
              <div className="font-mono text-[0.6rem] tracking-[0.2em] text-gold-champagne uppercase mb-4">Context</div>
              <p className="text-[0.8rem] text-cream-dim leading-relaxed">
                This is a <strong className="text-cream font-bold">general cover letter</strong> that outlines how I work and what I build. For application-specific versions tailored to your team's focus, reach out directly.
              </p>
            </div>

            <div className="bg-bg-surface border border-border-subtle p-6">
              <div className="font-mono text-[0.6rem] tracking-[0.2em] text-gold-champagne uppercase mb-4">Background</div>
              <p className="text-[0.8rem] text-cream-dim leading-relaxed">
                Full scholarship to Penn Engineering. Former subject of a landmark Ghanaian High Court ruling on religious freedom in education. Covered by <strong className="text-cream font-bold">BBC, AP, DW, and VOA.</strong>
              </p>
            </div>

          </div>
        </aside>

      </div>
    </div>
  );
};
