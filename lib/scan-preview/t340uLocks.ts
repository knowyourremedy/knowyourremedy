import { t240uNorm } from './t240uLocks';
import { t135uGroup, t135uWhyForName, T135U_EXPECTED_RISK } from './t135uTokenWhy';
import type { T320uHit } from './t320uLocks';
import { t280uLock } from './t280uLocks';
import { t338uResolve } from './t338uLocks';

/** Reaches existing locks that the later chain does not. No new why text. */
export function t340uResolve(name: string, form?: string): T320uHit | undefined {
  if (t240uNorm(name) === 'polyethylene glycol') {
    const peg = t280uLock(name);
    if (peg) return { lock: peg, mark: 't280u' };
  }
  const prior = t338uResolve(name, form);
  if (prior) return prior;
  const group = t135uGroup(name, form);
  if (group === 'red 40' || group === 'blue 1' || group === 'polyethylene glycol') {
    const why = t135uWhyForName(name, form);
    const grade = T135U_EXPECTED_RISK[group];
    if (why) return { lock: { grade, counts: grade === 'limited', why }, mark: 't135u' };
  }
  return undefined;
}

if (t340uResolve('Polyethylene Glycol', 'tablet')?.mark !== 't280u') throw new Error('t340u peg');
if (t340uResolve('FD&C Red #40', 'tablet')?.lock.grade !== 'high') throw new Error('t340u red');
if (t340uResolve('Polysorbate', 'tablet')) throw new Error('t340u bare polysorbate');
