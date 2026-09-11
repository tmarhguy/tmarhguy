// Adapted from tomato/web/index.html, compound-work. Counts and labels preserved.
export default function TomatoComparisonChart() {
  return (
    <figure className="compound-trend">
      <figcaption>
        <span className="rv-key">RISC-V RV32I · instructions</span>
        <span className="tomato-key">Tomato · ALU evaluations</span>
      </figcaption>
      <div
        className="compound-chart-scroll"
        tabIndex={0}
        role="region"
        aria-label="Operation comparison chart; scroll horizontally on small screens"
      >
        <svg
          viewBox="0 0 1060 365"
          role="img"
          aria-labelledby="compound-chart-title compound-chart-desc"
        >
          <title id="compound-chart-title">
            Operation counts: ties, a RISC-V advantage, and compound-work
            advantages for Tomato.
          </title>
          <desc id="compound-chart-desc">
            Vertical axis starts at zero. Each expression has one point per
            architecture. Ten examples compare RV32I instruction counts with
            Tomato ALU evaluations. Complete sequences are documented on the
            Tomato site.
          </desc>
          <text x="48" y="30" className="axis-title">
            Operation count · lower is fewer
          </text>
          <line className="chart-grid" x1="60" x2="1010" y1="295" y2="295" />
          <text x="45" y="299" textAnchor="end">
            0
          </text>
          <line className="chart-grid" x1="60" x2="1010" y1="267" y2="267" />
          <text x="45" y="271" textAnchor="end">
            1
          </text>
          <line className="chart-grid" x1="60" x2="1010" y1="239" y2="239" />
          <text x="45" y="243" textAnchor="end">
            2
          </text>
          <line className="chart-grid" x1="60" x2="1010" y1="211" y2="211" />
          <text x="45" y="215" textAnchor="end">
            3
          </text>
          <line className="chart-grid" x1="60" x2="1010" y1="183" y2="183" />
          <text x="45" y="187" textAnchor="end">
            4
          </text>
          <line className="chart-grid" x1="60" x2="1010" y1="155" y2="155" />
          <text x="45" y="159" textAnchor="end">
            5
          </text>
          <line className="chart-grid" x1="60" x2="1010" y1="127" y2="127" />
          <text x="45" y="131" textAnchor="end">
            6
          </text>
          <line className="chart-grid" x1="60" x2="1010" y1="99" y2="99" />
          <text x="45" y="103" textAnchor="end">
            7
          </text>
          <line className="chart-grid" x1="60" x2="1010" y1="71" y2="71" />
          <text x="45" y="75" textAnchor="end">
            8
          </text>
          <polyline
            className="rv-line"
            points="85,267 184,267 283,239 382,239 481,211 580,183 679,155 778,127 877,127 976,71"
          />
          <circle className="rv-dot" cx="85" cy="267" r="5" />
          <text x="85" y="253" textAnchor="middle">
            1
          </text>
          <circle className="rv-dot" cx="184" cy="267" r="5" />
          <text x="184" y="288" textAnchor="middle">
            1
          </text>
          <circle className="rv-dot" cx="283" cy="239" r="5" />
          <text x="283" y="225" textAnchor="middle">
            2
          </text>
          <circle className="rv-dot" cx="382" cy="239" r="5" />
          <text x="382" y="225" textAnchor="middle">
            2
          </text>
          <circle className="rv-dot" cx="481" cy="211" r="5" />
          <text x="481" y="197" textAnchor="middle">
            3
          </text>
          <circle className="rv-dot" cx="580" cy="183" r="5" />
          <text x="580" y="169" textAnchor="middle">
            4
          </text>
          <circle className="rv-dot" cx="679" cy="155" r="5" />
          <text x="679" y="141" textAnchor="middle">
            5
          </text>
          <circle className="rv-dot" cx="778" cy="127" r="5" />
          <text x="778" y="113" textAnchor="middle">
            6
          </text>
          <circle className="rv-dot" cx="877" cy="127" r="5" />
          <text x="877" y="113" textAnchor="middle">
            6
          </text>
          <circle className="rv-dot" cx="976" cy="71" r="5" />
          <text x="976" y="57" textAnchor="middle">
            8
          </text>
          <polyline
            className="tomato-line"
            points="85,267 184,239 283,267 382,267 481,267 580,267 679,267 778,239 877,239 976,239"
          />
          <circle className="tomato-dot" cx="85" cy="267" r="5" />
          <text x="85" y="288" textAnchor="middle">
            1
          </text>
          <circle className="tomato-dot" cx="184" cy="239" r="5" />
          <text x="184" y="225" textAnchor="middle">
            2
          </text>
          <circle className="tomato-dot" cx="283" cy="267" r="5" />
          <text x="283" y="288" textAnchor="middle">
            1
          </text>
          <circle className="tomato-dot" cx="382" cy="267" r="5" />
          <text x="382" y="288" textAnchor="middle">
            1
          </text>
          <circle className="tomato-dot" cx="481" cy="267" r="5" />
          <text x="481" y="288" textAnchor="middle">
            1
          </text>
          <circle className="tomato-dot" cx="580" cy="267" r="5" />
          <text x="580" y="288" textAnchor="middle">
            1
          </text>
          <circle className="tomato-dot" cx="679" cy="267" r="5" />
          <text x="679" y="288" textAnchor="middle">
            1
          </text>
          <circle className="tomato-dot" cx="778" cy="239" r="5" />
          <text x="778" y="260" textAnchor="middle">
            2
          </text>
          <circle className="tomato-dot" cx="877" cy="239" r="5" />
          <text x="877" y="260" textAnchor="middle">
            2
          </text>
          <circle className="tomato-dot" cx="976" cy="239" r="5" />
          <text x="976" y="260" textAnchor="middle">
            2
          </text>
          <text className="expression-label" x="85" y="325" textAnchor="middle">
            <tspan x="85" dy="0">
              Add
            </tspan>
          </text>
          <text
            className="expression-label"
            x="184"
            y="325"
            textAnchor="middle"
          >
            <tspan x="184" dy="0">
              Signed
            </tspan>
            <tspan x="184" dy="15">
              less-than
            </tspan>
          </text>
          <text
            className="expression-label"
            x="283"
            y="325"
            textAnchor="middle"
          >
            <tspan x="283" dy="0">
              Mask
            </tspan>
            <tspan x="283" dy="15">
              + add
            </tspan>
          </text>
          <text
            className="expression-label"
            x="382"
            y="325"
            textAnchor="middle"
          >
            <tspan x="382" dy="0">
              Mask
            </tspan>
            <tspan x="382" dy="15">
              − subtract
            </tspan>
          </text>
          <text
            className="expression-label"
            x="481"
            y="325"
            textAnchor="middle"
          >
            <tspan x="481" dy="0">
              Choose
            </tspan>
          </text>
          <text
            className="expression-label"
            x="580"
            y="325"
            textAnchor="middle"
          >
            <tspan x="580" dy="0">
              Majority
            </tspan>
          </text>
          <text
            className="expression-label"
            x="679"
            y="325"
            textAnchor="middle"
          >
            <tspan x="679" dy="0">
              XOR3
            </tspan>
            <tspan x="679" dy="15">
              + AND3
            </tspan>
          </text>
          <text
            className="expression-label"
            x="778"
            y="325"
            textAnchor="middle"
          >
            <tspan x="778" dy="0">
              Two
            </tspan>
            <tspan x="778" dy="15">
              selections
            </tspan>
          </text>
          <text
            className="expression-label"
            x="877"
            y="325"
            textAnchor="middle"
          >
            <tspan x="877" dy="0">
              Vote, mask
            </tspan>
            <tspan x="877" dy="15">
              + add
            </tspan>
          </text>
          <text
            className="expression-label"
            x="976"
            y="325"
            textAnchor="middle"
          >
            <tspan x="976" dy="0">
              Two-stage
            </tspan>
            <tspan x="976" dy="15">
              vote
            </tspan>
          </text>
        </svg>
      </div>
      <p className="chart-reading-note">
        Expressions run left to right. Lines connect discrete examples; this is
        not a scaling or timing curve.
      </p>
      <a href="https://tomato.tmarhguy.com/#compound-work">
        See all ten expressions and their instruction sequences
      </a>
    </figure>
  );
}
