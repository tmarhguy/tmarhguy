export default function HomeContributions() {
  return (
    <section
      className="home-contributions"
      aria-labelledby="contributions-title"
    >
      <div className="home-section-header">
        <div>
          <span className="home-section-kicker">
            02 / Beyond my own workbench
          </span>
          <h2 id="contributions-title">I also fix the tools I build with.</h2>
        </div>
      </div>
      <div className="contribution-grid">
        <article>
          <h3>Coyote</h3>
          <p>
            Dropping stale RDMA metadata and the unused RAW path so the shell
            always segments RDMA.
          </p>
          <a href="https://github.com/fpgasystems/Coyote/pull/259">
            Merged #259 · 0.3.0
          </a>
        </article>
        <article>
          <h3>LibreLane</h3>
          <p>
            Keeping the chip implementation flow compatible with newer Yosys
            versions, and making synthesis errors count correctly.
          </p>
          <a href="https://github.com/librelane/librelane/releases/tag/3.0.8">
            Released in 3.0.8
          </a>
          <a href="https://github.com/librelane/librelane/releases/tag/3.0.10">
            Released in 3.0.10
          </a>
        </article>
        <article>
          <h3>OpenROAD</h3>
          <p>
            A parser fix for technology files with trailing whitespace, so valid
            LEF58 input can load.
          </p>
          <a href="https://github.com/The-OpenROAD-Project/OpenROAD/pull/11107">
            Inspect the patch
          </a>
        </article>
      </div>
      <a className="home-contributions-all" href="/projects/#open-source-title">
        More contributions, including Verilator and OpenFPGA
      </a>
    </section>
  );
}
