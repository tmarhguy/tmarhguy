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
        <article>
          <h3>Verilator</h3>
          <p>
            Using peak resident memory for Linux statistics, so reported memory
            reflects the process’s physical footprint.
          </p>
          <a href="https://github.com/verilator/verilator/pull/8070">
            Inspect the patch
          </a>
        </article>
      </div>
      <a className="home-contributions-all" href="/projects/#open-source-title">
        More contributions, including OpenFPGA
      </a>
    </section>
  );
}
