import { describe, expect, it } from 'vitest';

import { categories, skills } from '../resume/skills';

describe('skills data', () => {
  it('exports an array of skills', () => {
    expect(Array.isArray(skills)).toBe(true);
    expect(skills.length).toBeGreaterThan(0);
  });

  it('each skill has required properties', () => {
    for (const skill of skills) {
      expect(skill).toHaveProperty('title');
      expect(skill).toHaveProperty('competency');
      expect(skill).toHaveProperty('category');

      expect(typeof skill.title).toBe('string');
      expect(typeof skill.competency).toBe('number');
      expect(Array.isArray(skill.category)).toBe(true);
    }
  });

  it('competency values are between 1 and 5', () => {
    for (const skill of skills) {
      expect(skill.competency).toBeGreaterThanOrEqual(1);
      expect(skill.competency).toBeLessThanOrEqual(5);
    }
  });

  it('each skill has at least one category', () => {
    for (const skill of skills) {
      expect(skill.category.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('skill categories reference valid category names', () => {
    const categoryNames = categories.map((c) => c.name);

    for (const skill of skills) {
      for (const cat of skill.category) {
        expect(categoryNames).toContain(cat);
      }
    }
  });

  // Data quality: categories should be sorted for consistent UI display
  it('skill categories are sorted alphabetically for UI consistency', () => {
    for (const skill of skills) {
      const sorted = [...skill.category].sort();
      expect(skill.category).toEqual(sorted);
    }
  });
});

describe('categories data', () => {
  it('exports an array of categories', () => {
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
  });

  it('each category has required properties', () => {
    for (const category of categories) {
      expect(category).toHaveProperty('name');
      expect(category).toHaveProperty('color');

      expect(typeof category.name).toBe('string');
      expect(typeof category.color).toBe('string');
    }
  });

  it('category colors are valid CSS colors (hex or CSS variable)', () => {
    const hexColorRegex = /^#[0-9a-fA-F]{6}$/;
    const cssVarRegex = /^var\(--[\w-]+\)$/;

    for (const category of categories) {
      const isValidColor =
        hexColorRegex.test(category.color) || cssVarRegex.test(category.color);
      expect(isValidColor).toBe(true);
    }
  });

  // Data quality: categories should be sorted for filter button display order
  it('categories are sorted alphabetically by name', () => {
    const names = categories.map((c) => c.name);
    const sorted = [...names].sort();

    expect(names).toEqual(sorted);
  });

  it('all skill categories are represented', () => {
    const usedCategories = new Set(skills.flatMap((s) => s.category));
    const availableCategories = new Set(categories.map((c) => c.name));

    for (const used of usedCategories) {
      expect(availableCategories.has(used)).toBe(true);
    }
  });

  it('has unique category names', () => {
    const names = categories.map((c) => c.name);
    const uniqueNames = new Set(names);

    expect(uniqueNames.size).toBe(names.length);
  });
});

describe('project-backed hardware skills', () => {
  const titles = skills.map((skill) => skill.title);

  it('lists unique skill titles', () => {
    expect(new Set(titles).size).toBe(titles.length);
  });

  it('includes verification, EDA, and board skills from shipped projects', () => {
    expect(titles).toEqual(
      expect.arrayContaining([
        'UVM',
        'SVA',
        'Questa',
        'cocotb',
        'Verilator',
        'SymbiYosys',
        'Icarus Verilog',
        'Functional Coverage',
        'Constrained-Random',
        'LibreLane',
        'OpenLane',
        'OpenROAD',
        'OpenFPGA',
        'Yosys',
        'nextpnr',
        'Digital (Hneemann)',
        'Sky130',
        'KiCad',
        'NGSpice',
        'Electric VLSI',
        'RISC-V (RV64IM)',
        'Wishbone B4',
        'RMII / 100 Mbps MAC',
        'SPI/I²C',
        'Next.js',
        'Swift',
        'Arduino',
      ]),
    );
  });

  it('does not list unverified catalog fillers', () => {
    expect(titles).not.toContain('VHDL');
    expect(titles).not.toContain('Quartus');
    expect(titles).not.toContain('Data Structures & Algorithms');
    expect(titles).not.toContain('1 GbE MAC / RGMII');
  });
});
