import { t240uNorm } from './t240uLocks';
import { t135uGroup, t135uWhyForName, T135U_EXPECTED_RISK } from './t135uTokenWhy';
import type { T320uHit } from './t320uLocks';
import { t280uLock } from './t280uLocks';
import { t337uResolve } from './t337uLocks';

type Lock = { grade: 'cleared' | 'limited' | 'high'; counts: boolean; why: string };

const NICKEL: Lock = {
  grade: 'cleared',
  counts: false,
  why: 'Nickelous sulfate is a salt of nickel. It is included as a source of nickel.',
};
const TIN: Lock = {
  grade: 'cleared',
  counts: false,
  why: 'Stannous chloride is a salt of tin. It is included as a source of tin.',
};

const BY_KEY = new Map<string, Lock>([
  [t240uNorm('Nickel (as Nickelous Sulfate)'), NICKEL],
  [t240uNorm('Tin (as Stannous Chloride)'), TIN],
]);

export function t338uLock(name: string): Lock | undefined {
  return BY_KEY.get(t240uNorm(name));
}

export function t338uResolve(name: string, form?: string): T320uHit | undefined {
  const own = t338uLock(name);
  if (own) return { lock: own, mark: 't338u' };
  if (t240uNorm(name) === 'hydroxypropyl cellulose') {
    const existing = t280uLock(name);
    if (existing) return { lock: existing, mark: 't280u' };
  }
  const prior = t337uResolve(name, form);
  if (prior) return prior;
  const group = t135uGroup(name, form);
  if (group === 'talc' || group === 'bht') {
    const why = t135uWhyForName(name, form);
    const grade = T135U_EXPECTED_RISK[group];
    if (why && grade === 'high') return { lock: { grade, counts: false, why }, mark: 't135u' };
  }
  return undefined;
}

if (t338uResolve('Nickel (as Nickelous Sulfate)', 'tablet')?.lock.why !== NICKEL.why) throw new Error('t338u nickel');
if (t338uResolve('Tin (as Stannous Chloride)', 'tablet')?.lock.why !== TIN.why) throw new Error('t338u tin');
if (t338uResolve('Hydroxypropyl Cellulose', 'tablet')?.mark !== 't280u') throw new Error('t338u hpc stays');
if (t338uResolve('Magnesium Silicate', 'tablet')?.lock.grade !== 'high') throw new Error('t338u silicate');
if (t338uResolve('Talc', 'tablet')?.lock.grade !== 'high') throw new Error('t338u talc');
if (t338uResolve('BHT', 'tablet')?.lock.grade !== 'high') throw new Error('t338u bht');
if (t338uResolve('Phosphorus (as Dicalcium Phosphate)', 'tablet')?.lock.grade !== 'cleared') throw new Error('t338u phosphorus');
if (t338uLock('Hydroxypropyl Cellulose')) throw new Error('t338u hpc overwrite');
