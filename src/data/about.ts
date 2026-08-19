import { WIKIPEDIA_URL } from './contact';

export const aboutMarkdown = `# Intro

I'm [Tyrone Iras Marhguy](${WIKIPEDIA_URL}) — a Ghanaian Computer Engineering student at the [University of Pennsylvania](https://www.upenn.edu) on a full scholarship. I build computer systems from discrete MOSFETs through full ASIC tapeout—architecting the boards, writing the RTL, and building the verification frameworks that prove them.

# Early Life

I was born in Ghana on November 24, 2003. I'm a triplet — my [sisters](https://www.myjoyonline.com/siblings-of-rastafarian-refused-admission-to-achimota-school-allegedly-ordered-to-cut-their-hair-at-st-johns-grammar/) are Nikita Marhguy and Amrita Marhguy. We grew up between Kumasi and Accra, and for several years our family lived primarily on a parked bus.

At thirteen, I charged phones with a car battery and nails heated in a coal pot — not because I was curious, but because we needed to survive. That same instinct drives how I build today: understand the physics, verify the design, ship something that works on real silicon and in production code.

Before [Achimota School](https://achimotashs.com/), I studied in Kumasi and at Rising Academy in Ablekuma.

# Achimota

In March 2021, Achimota School denied me admission because I wear dreadlocks as an expression of my Rastafarian faith. My father, Tereo Marhguy, challenged the decision in Ghana's High Court alongside the family of Oheneba Kwaku Nkrabea, who faced the same refusal.

On May 31, 2021, the Human Rights Division ruled in our favor — finding that denying us education over our hair violated our rights to education, dignity, and religious expression. The case drew national debate and international coverage from outlets including the [Associated Press](https://apnews.com/article/africa-religion-education-ghana-186c67bd473f892c054e5d1f9368b555), [Voice of America](https://www.voanews.com/a/rastafarian-teen-fights-to-keep-dreadlocks/6276979.html), and [Deutsche Welle](https://www.dw.com/en/ghana-rastafarians-start-school-after-court-victory/video-57864466). I enrolled, finished secondary school, and the ruling has since been cited in broader conversations about religious freedom in Ghanaian education.

The full story is documented on [Wikipedia](${WIKIPEDIA_URL}) and in the court record for [Marhguy v. Achimota School](https://superlawgh.com/judgements/tyrone-marghuy-v-achimota-school-anor-2021-hc-high-court-%C2%B7-suit-no-hr-0055-2021-%C2%B7-31-may-2021-%C2%B7/).

# Academics

- **2023 WASSCE** — 8 A1s at Achimota School, reported widely in Ghanaian media including [The Voice](https://www.voice-online.co.uk/news/world-news/2023/12/21/rastafarian-student-denied-school-admission-over-his-locks-triumphs-in-exams/) and [Citi Newsroom](https://citinewsroom.com/2023/12/rastafarian-student-rejected-by-achimota-school-excels-in-2023-wassce/).
- **American Mathematics Olympiad** — national top scorer and gold medalist among 150,000+ students worldwide ([MyJoyOnline](https://www.myjoyonline.com/tyrone-marhguy-wins-american-math-olympiad-awards/)).
- **Vanda Science International Olympiad** — silver medal, 38,000+ participants.
- **SAT** — 99th percentile globally.
- **2024** — full scholarship to Penn for Computer Engineering, with additional offers from Duke, Williams, and Franklin & Marshall ([3news](https://3news.com/news/tyrone-iras-marhguy-receives-full-scholarship-to-study-at-university-of-pennsylvania/)).
- **Now** — B.S.E. Computer Engineering at the [University of Pennsylvania](https://www.upenn.edu), expected 2028; concurrent master's coursework in Electrical Engineering.

# Now - (Fall 2026)

- **Hardware Engineering**: This fall I'm joining [Fluid Silicon Inc.](https://penntoday.upenn.edu/news/penn-student-develops-way-computer-chips-run-more-efficiently) at the [Pennovation Center](https://pennovation.upenn.edu) as a Hardware Research Engineer Intern: RTL design in HDL, then verification in emulation and simulation.
- **The Builds**: I'm building [Tomato](https://tomato.tmarhguy.com) ([GitHub](https://github.com/tmarhguy/tomato)) — a Discrete 32-bit Polymorphic Dual-LUT3 CPU from discrete logic through PCB tapeout — and shipping low-latency networking hardware in SystemVerilog. I've also built an [8-bit discrete-transistor ALU](https://alu.tmarhguy.com) from first principles.
- **Open Source Contributions**: I'm a contributor to open-source EDA tools.
  - **[LibreLane](https://github.com/librelane/librelane)**: Merged [PR #1015](https://github.com/librelane/librelane/pull/1015) gating deprecated abc -fast for Yosys ≥ 0.68, shipped as [3.0.8](https://github.com/librelane/librelane/releases/tag/3.0.8). Also merged [PR #1016](https://github.com/librelane/librelane/pull/1016) so Yosys check-error counts include both pre- and post-synthesis reports, shipped as [3.0.10](https://github.com/librelane/librelane/releases/tag/3.0.10).
  - **[OpenROAD](https://github.com/The-OpenROAD-Project/OpenROAD)**: Parsing fixes for LEF58_MINWIDTH ([PR #11107](https://github.com/The-OpenROAD-Project/OpenROAD/pull/11107)).
  - **[Verilator](https://github.com/verilator/verilator)**: Fixed Linux peak memory reporting ([PR #8070](https://github.com/verilator/verilator/pull/8070)).
  - **[OpenFPGA](https://github.com/lnis-uofu/OpenFPGA)**.
- **Software & Teaching**: Professionally, I'm interning with [Aragorn AI](https://www.aragorn.ai/) on production backends and technical documentation. Previously hardware at [Vero Electric](https://veroelectric.com/) on battery management infrastructure. I taught through [Fife-Penn STEM & CS Academy](https://fife.cis.upenn.edu/) and spent Summer 2026 as an AR/VR instructor with [Howard University STEM Achievers](https://education.howard.edu/affiliated-programs/stem-summer-camp-verizon-innovative-learning).

*For press coverage and a fuller biography, see my [Wikipedia article](${WIKIPEDIA_URL}).*

# Hobbies and Interests

- Beach
- Dogs
- Sudoku
- Biking

`;
