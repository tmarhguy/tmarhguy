import { useEffect } from 'react';
import { setCanonical, setDocumentTitle, setMeta, setMetaProperty } from '../utils/seo';

export const Verification = () => {
  useEffect(() => {
    setDocumentTitle('Verification First — Formal Proofs, Simulation & Physical Validation | Tyrone Marhguy');
    setMeta(
      'description',
      "Tyrone Marhguy's hardware verification methodology: SymbiYosys formal proofs, 1.24M+ exhaustive cocotb simulation vectors, UVM testbenches, SPICE corner analysis, and oscilloscope physical validation. Every design mathematically proven correct before fabrication."
    );
    setMeta(
      'keywords',
      'hardware formal verification, SymbiYosys formal proof, cocotb testbench, UVM verification, exhaustive simulation, SPICE corner analysis, LVS DRC clean, hardware verification methodology, RTL verification student, formal methods hardware, model checking Verilog, bounded model checking, property checking SystemVerilog, assertion based verification'
    );
    setCanonical('https://tmarhguy.com/verification');

    setMetaProperty(
      'og:title',
      'Verification First — Formal Proofs to Physical Validation | Tyrone Marhguy'
    );
    setMetaProperty(
      'og:description',
      'Industrial-grade verification: mathematical proofs + exhaustive simulation + hardware validation. Every design proven correct before fabrication.'
    );
    setMetaProperty('og:image', 'https://tmarhguy.com/images/tyrone.jpg');
    setMetaProperty('og:url', 'https://tmarhguy.com/verification');

    setMeta(
      'twitter:title',
      'Verification First — Formal Proofs to Physical Validation | Tyrone Marhguy'
    );
    setMeta(
      'twitter:description',
      'Industrial-grade verification: mathematical proofs + exhaustive simulation + hardware validation.'
    );
    setMeta('twitter:image', 'https://tmarhguy.com/images/tyrone.jpg');
  }, []);

  return (
    <div className="min-h-screen bg-bg-void" style={{ paddingTop: '80px' }}>
      
      {/* Hero */}
      <section className="text-center section-padding" style={{ borderBottom: '1px solid #1e1e1a' }}>
        <div className="eyebrow mb-3 justify-center animate-in fade-in duration-700">Methodology</div>
        <h1 className="font-display font-bold text-4xl md:text-5xl text-text-primary mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          Verification First
        </h1>
        <p className="text-[1.05rem] text-cream-dim leading-relaxed max-w-[620px] mx-auto mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          Industrial-grade testing: formal proofs + exhaustive simulation + hardware validation.
          Every design is mathematically proven correct before fabrication.
        </p>
      </section>

      {/* Three Pillars */}
      <section className="section-padding" style={{ paddingTop: 'clamp(3rem, 8vw, 5rem)', paddingBottom: 'clamp(3rem, 8vw, 5rem)', borderBottom: '1px solid #1e1e1a' }}>
        <div className="content-max-width mx-auto">
          <div className="section-title-editorial justify-center">The Three Pillars</div>
          <div className="projects-grid-editorial max-w-5xl mx-auto">
            {/* Formal Proofs */}
            <div className="bg-bg-void transition-colors duration-200 hover:bg-bg-deep text-center" style={{ padding: '1.5rem 1.5rem' }}>
              <div className="font-mono text-[0.58rem] text-gold-dim tracking-[0.2em] uppercase mb-3">01 / FORMAL</div>
              <div className="font-display text-base font-bold text-text-primary mb-2 leading-tight">Mathematical Proofs</div>
              <p className="text-[0.8rem] text-cream-dim leading-relaxed mb-4">
                SVA and formal solvers verify that for every possible input, the design produces the correct output — exhaustively.
              </p>
              <div className="flex flex-col gap-0.5 items-center">
                <div className="font-mono text-[0.62rem]"><span className="text-gold-champagne">100%</span> <span className="text-cream-dim">assertion coverage</span></div>
                <div className="font-mono text-[0.62rem]"><span className="text-gold-champagne">SVA</span> <span className="text-cream-dim">property checking</span></div>
              </div>
            </div>

            {/* Simulation */}
            <div className="bg-bg-void transition-colors duration-200 hover:bg-bg-deep text-center" style={{ padding: '1.5rem 1.5rem' }}>
              <div className="font-mono text-[0.58rem] text-gold-dim tracking-[0.2em] uppercase mb-3">02 / SIMULATION</div>
              <div className="font-display text-base font-bold text-text-primary mb-2 leading-tight">Exhaustive Simulation</div>
              <p className="text-[0.8rem] text-cream-dim leading-relaxed mb-4">
                Cocotb testbenches generate millions of randomized test vectors. Corner cases and stress conditions explored.
              </p>
              <div className="flex flex-col gap-0.5 items-center">
                <div className="font-mono text-[0.62rem]"><span className="text-gold-champagne">1.24M+</span> <span className="text-cream-dim">test vectors</span></div>
                <div className="font-mono text-[0.62rem]"><span className="text-gold-champagne">Cocotb</span> <span className="text-cream-dim">Python</span></div>
              </div>
            </div>

            {/* Hardware */}
            <div className="bg-bg-void transition-colors duration-200 hover:bg-bg-deep text-center" style={{ padding: '1.5rem 1.5rem' }}>
              <div className="font-mono text-[0.58rem] text-gold-dim tracking-[0.2em] uppercase mb-3">03 / HARDWARE</div>
              <div className="font-display text-base font-bold text-text-primary mb-2 leading-tight">Physical Validation</div>
              <p className="text-[0.8rem] text-cream-dim leading-relaxed mb-4">
                Oscilloscope measurements validate propagation delay, power integrity, and signal quality on real hardware.
              </p>
              <div className="flex flex-col gap-0.5 items-center">
                <div className="font-mono text-[0.62rem]"><span className="text-gold-champagne">0</span> <span className="text-cream-dim">DRC / LVS violations</span></div>
                <div className="font-mono text-[0.62rem]"><span className="text-gold-champagne">400ns</span> <span className="text-cream-dim">measured</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="text-center section-padding" style={{ paddingTop: 'clamp(3rem, 8vw, 5rem)', paddingBottom: 'clamp(3rem, 8vw, 5rem)', borderBottom: '1px solid #1e1e1a' }}>
        <div className="max-w-2xl mx-auto">
          <div className="section-title-editorial justify-center">Philosophy</div>
          <p className="text-lg italic text-cream leading-relaxed mb-6" style={{ lineHeight: '1.7' }}>
            "If a design hasn't been verified at every level of abstraction — from formal proof to oscilloscope trace — then it's just a hypothesis, not hardware."
          </p>
          <p className="text-[0.95rem] text-cream-dim leading-relaxed">
            My verification workflow closes the loop between mathematical proof and physical measurement. 
            Formal methods prove correctness exhaustively. Simulation stress-tests the implementation. 
            And hardware validation confirms that theory survives contact with reality.
          </p>
        </div>
      </section>

      {/* Verification Milestones */}
      <section className="section-padding" style={{ paddingTop: 'clamp(3rem, 8vw, 5rem)', paddingBottom: 'clamp(3rem, 8vw, 5rem)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="section-title-editorial justify-center">Verification Milestones</div>
          <ul className="list-none m-0 p-0">
            {[
              { icon: 'ALU', title: '8-Bit ALU — 1.24M Automated Test Vectors', desc: 'Every opcode × every operand combination. Validated against golden model, confirmed on physical hardware.' },
              { icon: 'MAC', title: 'BFloat16 MAC — 1,000+ Corner Analysis', desc: 'Tcl-scripted power rail verification across PVT corners. Zero DRC, zero LVS violations.' },
              { icon: 'CPU', title: 'RISC-V CPU — 96% ISA Compliance', desc: 'Official riscv-tests suite. Remaining 4% relates to optional CSR instructions.' },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4 border-b border-border-subtle" style={{ padding: '1.2rem 0' }}>
                <span className="font-mono text-[0.65rem] text-gold-champagne bg-bg-deep border border-gold-dim tracking-[0.1em] shrink-0" style={{ padding: '0.3rem 0.5rem', marginTop: '0.1rem' }}>
                  {item.icon}
                </span>
                <div>
                  <strong className="block text-text-primary font-display text-base mb-1">{item.title}</strong>
                  <span className="text-[0.83rem] text-cream-dim leading-relaxed">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};
