import { describe, expect, it } from 'vitest';

import {
  getOpenSourceContributions,
  OPEN_SOURCE_BUILD_LOG_HREF,
} from '../open-source';

describe('open-source data', () => {
  it('lists contributions newest first', () => {
    const entries = getOpenSourceContributions();
    expect(entries.length).toBeGreaterThan(0);

    for (let index = 1; index < entries.length; index += 1) {
      const previous = new Date(entries[index - 1].date).getTime();
      const current = new Date(entries[index].date).getTime();
      expect(previous).toBeGreaterThanOrEqual(current);
    }
  });

  it('includes LibreLane, Verilator, and OpenFPGA with pull links', () => {
    const entries = getOpenSourceContributions();
    const librelane = entries.find((entry) => entry.slug === 'librelane');
    const verilator = entries.find((entry) => entry.slug === 'verilator');
    const openfpga = entries.find((entry) => entry.slug === 'openfpga');

    expect(librelane?.pulls[0]?.href).toContain('/pull/1015');
    expect(verilator?.pulls[0]?.href).toContain('/pull/8070');
    expect(openfpga?.pulls).toHaveLength(2);
  });

  it('exposes the shared build log href', () => {
    expect(OPEN_SOURCE_BUILD_LOG_HREF).toBe(
      '/writing/2026-08-11-librelane-verilator-openfpga/',
    );
  });
});
