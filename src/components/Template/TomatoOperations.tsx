'use client';

import { useId, useState } from 'react';
import TomatoComparisonChart from './TomatoComparisonChart';

const examples = [
  {
    name: 'Mask + add',
    expression: 'A + (B & C)',
    rv: ['AND t0, B, C', 'ADD out, A, t0'],
    tomato: ['F = A · G = B & C', 'out = F + G'],
    passes: 1,
    note: 'The mask feeds the adder directly. Both operations share one trip through the ALU.',
  },
  {
    name: 'Majority',
    expression: '(A & B) | (C & (A ^ B))',
    rv: ['AND t1, A, B', 'XOR t2, A, B', 'AND t2, C, t2', 'OR out, t1, t2'],
    tomato: ['F = Majority(A, B, C) · G = 0', 'out = F + G'],
    passes: 1,
    note: 'One truth table computes the majority of three input bits. This is a building block used in SHA-256, not a complete hash.',
  },
  {
    name: 'Two Boolean planes',
    expression: '(A ^ B ^ C) + (A & B & C)',
    rv: [
      'XOR t1, A, B',
      'XOR t1, t1, C',
      'AND t2, A, B',
      'AND t2, t2, C',
      'ADD out, t1, t2',
    ],
    tomato: ['F = A ^ B ^ C · G = A & B & C', 'out = F + G'],
    passes: 1,
    note: 'Independent Boolean functions flow into the same adder. Five instructions in this base-RV32I sequence become one Tomato ALU evaluation.',
  },
  {
    name: 'Addition',
    expression: 'A + B',
    rv: ['ADD out, A, B'],
    tomato: ['F = A · G = B', 'out = F + G'],
    passes: 1,
    note: 'A tie. Ordinary addition already takes one step on both paths.',
  },
  {
    name: 'Signed comparison',
    expression: 'signed(A) < signed(B)',
    rv: ['SLT out, A, B'],
    tomato: ['1. A − B → latch LT flag', '2. 0 + 0 + LT → out'],
    passes: 2,
    note: 'RV32I is more direct here. Its SLT writes a Boolean immediately; this Tomato sequence subtracts, then materializes the flag.',
  },
];

export default function TomatoOperations() {
  const [selected, setSelected] = useState(0);
  const selectId = useId();
  const example = examples[selected];
  return (
    <div className="tomato-operations">
      <TomatoComparisonChart />
      <div className="operations-intro">
        <span className="home-section-kicker">The idea inside the machine</span>
        <h3>
          Change the logic.
          <br />
          Keep the datapath.
        </h3>
        <p>
          Two programmable truth tables feed one adder. An instruction can
          combine Boolean logic and arithmetic instead of sending the result
          back for another operation.
        </p>
        <div className="operation-equation">
          f(A, B, C) + g(A, B, C) + carry
        </div>
        <p className="tomato-note">
          <strong>524,288 control configurations</strong> = 256 × 256
          truth-table pairs × 8 carry selections. Multiple settings can
          implement the same function; the instruction ROM selects a practical
          subset.
        </p>
        <a href="https://tomato.tmarhguy.com/playground.html">
          Try the full 32-bit playground
        </a>
      </div>
      <div className="operation-explorer">
        <label htmlFor={selectId}>Compare an expression</label>
        <select
          id={selectId}
          value={selected}
          onChange={(event) => setSelected(Number(event.target.value))}
        >
          {examples.map((item, index) => (
            <option value={index} key={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <div aria-live="polite" aria-atomic="true">
          <p className="operation-expression">
            <code>{example.expression}</code>
          </p>
          <div className="operation-paths">
            <div>
              <span>Base RV32I</span>
              <strong>
                {example.rv.length}{' '}
                {example.rv.length === 1 ? 'instruction' : 'instructions'}
              </strong>
              <pre>{example.rv.join('\n')}</pre>
            </div>
            <div>
              <span>Tomato Dual-LUT</span>
              <strong>
                {example.passes} ALU{' '}
                {example.passes === 1 ? 'evaluation' : 'evaluations'}
              </strong>
              <pre>{example.tomato.join('\n')}</pre>
            </div>
          </div>
          <p>{example.note}</p>
        </div>
        <p className="tomato-note">
          Illustrative instruction sequences versus ALU evaluations, with
          operands already available. These counts do not measure CPU cycles or
          whole-program speed; ISA extensions and implementation choices can
          change the comparison.
        </p>
        <a href="https://tomato.tmarhguy.com/">Full comparison & methodology</a>
      </div>
    </div>
  );
}
