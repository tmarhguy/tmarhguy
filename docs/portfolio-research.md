# Engineering portfolio research — September 8, 2026

These are useful examples, not a ranking of engineers. The changes adopt presentation principles rather than other people's design or claims.

| Reference                                                                      | What works                                                                                  | Applied here                                                                       |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [Matilda Dingemans](https://matildadingemans.com/) — Penn                      | Plain-language project descriptions, photographs, and detailed hardware/software breakdowns | Image-led project collection with real artifacts and captions                      |
| [Daniel Sanchez](https://people.csail.mit.edu/sanchez/) — MIT CSAIL            | Clear architecture research focus and direct paper/code/talk links                          | Explain the Dual-LUT idea and link to implementation and methodology               |
| [Christopher Batten](https://www.csl.cornell.edu/~cbatten/) — Cornell, MIT PhD | Prototypes explicitly connect architectural research to physical implementation             | Keep FPGA and discrete hardware evidence visible with specific captions            |
| [Nolan Chu](https://nolanchu.com/) — Virginia Tech                             | Publication, code, artifact, and explainer are adjacent                                     | Put conceptual explanation and inspectable evidence together                       |
| [Jay Lang](https://web.mit.edu/jaytlang/www/) — MIT                            | A personal voice alongside hardware and systems interests                                   | Preserve the builder's biography and breadth rather than reducing the site to a CV |

## Tomato expansion

[Tomato's current homepage](https://tomato.tmarhguy.com/) documents compound operations, programmable Boolean planes, the hardware search FSM, and register organization. The portfolio now includes an interactive sequence comparison: mask+add, majority, two Boolean planes, addition, and signed comparison. It explicitly labels base-RV32I instruction counts versus Tomato ALU evaluations. These are illustrative sequences, not measured CPU cycle counts or speedups. The signed comparison deliberately includes a sequence where RV32I uses fewer steps.

The existing Blackwell capacity comparison remains. The number 524,288 is control configurations, not unique functions or implemented instructions. No ISA compatibility claim is added.

## Media provenance

- About hero: local `alu/media/me_working_from_dorm.png`, converted to WebP at 1400 px.
- ITCH: local `itch-hw/media/impl_design_diagram.png`, converted to WebP at 1200 px.
- Adder: local `full-adder/media/fig8bit_schematic.png`, converted to WebP at 1200 px.
- Other project imagery uses the previously recorded Tomato, SRAM, UDP, and Mango assets.
- No borrowed portfolio photographs or invented screenshots.

Aragorn's end month is corrected to August 2026 per the user's instruction; the date field uses August 31 for the month-based display.

Fluid Silicon is no longer marked incoming, per the user’s follow-up correction.

## Chart and media refinement

The ten-expression comparison chart is adapted from `tomato/web/index.html`, preserving all counts, the signed-comparison counterexample, and the discrete-example qualification. It sits above the operation explorer and scrolls within its own container on narrow screens.

Project images now use README assets: `itch-hw/media/a7_fpga.jpeg`, `udp-stack/media/a7_running.gif` (first frame), `64b-sram/media/readme/fig4.png`, `alu/media/pcb/renders/alu_full_3d.png`, and `tomato/web/assets/pcb/alu_8b_board.webp`. Homepage thumbnails are capped at 170 px (150 px on mobile); project images at 240 px, flagship 320 px, and 200 px on mobile. Decorative link arrows are removed; arithmetic dataflow remains intact.
