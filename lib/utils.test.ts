import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    const result = cn('base-class', 'additional-class');
    expect(result).toBe('base-class additional-class');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    const result = cn('base', isActive && 'active');
    expect(result).toBe('base active');
  });

  it('filters out falsy values', () => {
    const result = cn('base', false, null, undefined, '', 'valid');
    expect(result).toBe('base valid');
  });

  it('merges Tailwind classes correctly', () => {
    // tailwind-merge should handle conflicting classes
    const result = cn('p-4', 'p-8');
    expect(result).toBe('p-8');
  });

  it('handles arrays of classes', () => {
    const result = cn(['base', 'array'], 'additional');
    expect(result).toBe('base array additional');
  });

  it('handles object notation', () => {
    const result = cn({
      'base': true,
      'active': true,
      'disabled': false,
    });
    expect(result).toBe('base active');
  });

  it('combines multiple argument types', () => {
    const isActive = true;
    const result = cn(
      'base',
      ['array1', 'array2'],
      { 'object-class': true },
      isActive && 'conditional',
      undefined,
      'final'
    );
    expect(result).toContain('base');
    expect(result).toContain('array1');
    expect(result).toContain('conditional');
    expect(result).toContain('final');
  });

  it('handles empty input', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('preserves important Tailwind utilities', () => {
    const result = cn('!p-4', 'p-8');
    expect(result).toContain('!p-4');
  });
});