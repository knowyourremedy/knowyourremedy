import { t240uNorm } from './t240uLocks';
import type { T320uHit } from './t320uLocks';
import { t360uResolve } from './t360uLocks';

type Lock = { grade: 'cleared'; counts: false; why: string };

const AMMONIA = 'Ammonium hydroxide is a solution of ammonia in water. It is used as a pH adjuster.';
const CAROTENOIDS = 'Naturally occurring carotenoids are plant pigments. They are included for their plant compounds.';
const PLANTARUM = 'Lactobacillus plantarum is a probiotic strain. It is included for its live bacteria.';
const CARROT = 'Natural black carrot concentrate is concentrated juice from black carrots. It is used as a color.';
const CHERRY = 'Natural black cherry flavor is a flavor from black cherry. It adds black cherry taste to the product.';
const KELP = 'North Atlantic kelp is a seaweed. It is included for its plant compounds.';
const ENZYMES = 'Pectinase and phytase are enzymes. They are included for their enzyme activity.';
const CARROT_VEG = 'Purple carrot is a vegetable. It is included for its plant compounds.';

const LOCKS: Array<[string, Lock]> = [
  ['Ammonium Hydroxide', { grade: 'cleared', counts: false, why: AMMONIA }],
  ['contains naturally occurring Carotenoids', { grade: 'cleared', counts: false, why: CAROTENOIDS }],
  ['Lactobacillus plantarum', { grade: 'cleared', counts: false, why: PLANTARUM }],
  ['Lactobacillus plantarum LP299v', { grade: 'cleared', counts: false, why: PLANTARUM }],
  ['natural Black Carrot concentrate', { grade: 'cleared', counts: false, why: CARROT }],
  ['natural Black Cherry flavor', { grade: 'cleared', counts: false, why: CHERRY }],
  ['North Atlantic Kelp', { grade: 'cleared', counts: false, why: KELP }],
  ['Pectinase, Phytase (as Pectinase, Phytase)', { grade: 'cleared', counts: false, why: ENZYMES }],
  ['Purple Carrot', { grade: 'cleared', counts: false, why: CARROT_VEG }],
];

const BY_KEY = new Map<string, Lock>(LOCKS.map(([name, lock]) => [t240uNorm(name), lock]));

export function t361uResolve(name: string, form?: string): T320uHit | undefined {
  const own = BY_KEY.get(t240uNorm(name));
  if (own) return { lock: own, mark: 't361u' };
  return t360uResolve(name, form);
}

for (const [name, lock] of LOCKS) {
  const hit = t361uResolve(name, 'tablet');
  if (hit?.mark !== 't361u' || hit.lock.why !== lock.why || hit.lock.grade !== 'cleared' || hit.lock.counts) {
    throw new Error(`t361u ${name}`);
  }
}
const beta = t361uResolve('Beta-Carotene', 'capsule');
if (beta?.mark === 't361u' || beta?.lock.grade !== 'limited' || !beta?.lock.counts || beta.lock.why) {
  throw new Error('t361u beta carotene');
}
const source = t361uResolve('Vitamin A (as Beta-Carotene)', 'capsule');
if (source?.mark === 't361u' || source?.lock.grade !== 'cleared' || !source?.lock.why) throw new Error('t361u vitamin a beta');
if (t361uResolve('Kelp', 'tablet')?.mark === 't361u' || t361uResolve('Kelp', 'tablet')?.lock.grade !== 'limited') {
  throw new Error('t361u kelp');
}
if (t361uResolve('Black Carrot Juice Concentrate', 'gummy')?.mark === 't361u') throw new Error('t361u black carrot juice');
if (t361uResolve('Natural flavors', 'liquid')?.mark === 't361u') throw new Error('t361u natural flavors');
if (t361uResolve('Mixed Carotenoids (as Alpha-Carotene, Beta-Carotene, Cryptoxanthin, Lutein, Zeaxanthin)', 'capsule')?.mark === 't361u') {
  throw new Error('t361u mixed carotenoids');
}
if (t361uResolve('Omega 3-6-9 Formulation', 'softgel')?.mark === 't361u') throw new Error('t361u omega formulation');
