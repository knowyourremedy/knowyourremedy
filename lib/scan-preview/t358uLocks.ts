import { t240uNorm } from './t240uLocks';
import type { T320uHit } from './t320uLocks';
import { t356uResolve } from './t356uLocks';

type Lock = { grade: 'cleared' | 'limited'; counts: boolean; why: string };

const VITAMIN_C = 'L-ascorbic acid is a form of vitamin C. It is included as a source of vitamin C.';
const ACEROLA = 'Acerola extract complex is an extract of the acerola fruit. It is included for its plant compounds.';
const PAPRIKA = 'Paprika is dried pepper. It is used as a color.';
const CURCUMIN = 'Full spectrum curcumin is a curcumin extract. It is included for its plant compounds.';
const MSM = 'MSM as OptiMSM is methylsulfonylmethane. It is included as a source of sulfur.';
const WINE = 'Red wine extract is an extract of red wine. It is included for its plant compounds.';
const CHONDROITIN = 'Sodium chondroitin sulfate is a salt of chondroitin. It is included for its cartilage compounds. Sodium chondroitin sulfate is graded Limited as a processed animal-derived ingredient (FDA guidance on cartilage extracts).';

const LOCKS: Array<[string, Lock]> = [
  ['Vitamin C (as L-Ascorbic Acid)', { grade: 'cleared', counts: false, why: VITAMIN_C }],
  ['Acerola extract complex', { grade: 'cleared', counts: false, why: ACEROLA }],
  ['Paprika', { grade: 'cleared', counts: false, why: PAPRIKA }],
  ['Full Spectrum Curcumin', { grade: 'cleared', counts: false, why: CURCUMIN }],
  ['full spectrum Curcumin liquid extract', { grade: 'cleared', counts: false, why: CURCUMIN }],
  ['MSM (as OptiMSM)', { grade: 'cleared', counts: false, why: MSM }],
  ['Red Wine extract', { grade: 'cleared', counts: false, why: WINE }],
  ['Sodium Chondroitin Sulfate', { grade: 'limited', counts: true, why: CHONDROITIN }],
];

const BY_KEY = new Map<string, Lock>(LOCKS.map(([name, lock]) => [t240uNorm(name), lock]));

function equivalence(name: string, form?: string): T320uHit | undefined {
  const key = t240uNorm(name);
  if (key === 'vitamin b1 as thiamine hydrochloride') return t356uResolve('Thiamine (as Thiamine Hydrochloride)', form);
  if (key === 'l proline') return t356uResolve('Proline', form);
  if (key === 'organic red yeast rice powder') return t356uResolve('Red Yeast Rice', form);
  if (key === 'cinnamon powder') return t356uResolve('Cinnamon extract', form);
  if (key === 'anise powder') return t356uResolve('Anise', form);
  if (key === 'standardized milk thistle extract as silymarin') return t356uResolve('Milk Thistle extract', form);
  return undefined;
}

export function t358uResolve(name: string, form?: string): T320uHit | undefined {
  const own = BY_KEY.get(t240uNorm(name));
  if (own) return { lock: own, mark: 't358u' };
  const aliased = equivalence(name, form);
  if (aliased?.lock.why) return aliased;
  return t356uResolve(name, form);
}

for (const [name, lock] of LOCKS) {
  const hit = t358uResolve(name, 'tablet');
  if (hit?.mark !== 't358u' || hit.lock.why !== lock.why || hit.lock.grade !== lock.grade || hit.lock.counts !== lock.counts) {
    throw new Error(`t358u ${name}`);
  }
}
const b1 = t358uResolve('Vitamin B1 (as Thiamine Hydrochloride)', 'tablet');
if (b1?.mark === 't358u' || !b1?.lock.why || b1.lock.grade !== 'cleared') throw new Error('t358u b1');
const proline = t358uResolve('L-Proline', 'capsule');
if (proline?.mark === 't358u' || !proline?.lock.why || proline.lock.grade !== 'cleared') throw new Error('t358u proline');
const yeast = t358uResolve('organic Red Yeast Rice powder', 'capsule');
if (yeast?.mark === 't358u' || yeast?.lock.grade !== 'limited' || !yeast?.lock.counts || !yeast.lock.why) throw new Error('t358u red yeast');
const cinnamon = t358uResolve('Cinnamon powder', 'tablet');
if (cinnamon?.mark === 't358u' || !cinnamon?.lock.why || cinnamon.lock.grade !== 'cleared') throw new Error('t358u cinnamon');
const anise = t358uResolve('Anise powder', 'tablet');
if (anise?.mark === 't358u' || !anise?.lock.why || anise.lock.grade !== 'cleared') throw new Error('t358u anise');
const thistle = t358uResolve('standardized Milk Thistle extract (as Silymarin)', 'capsule');
if (thistle?.mark === 't358u' || !thistle?.lock.why || thistle.lock.grade !== 'cleared') throw new Error('t358u thistle');
if (t358uResolve('MSM', 'tablet')?.mark === 't358u') throw new Error('t358u bare msm');
if (t358uResolve('Vitamin C (as Ascorbic Acid)', 'tablet')?.mark === 't358u') throw new Error('t358u ascorbic');
if (t358uResolve('Red Yeast Rice (Powder)', 'capsule')?.mark === 't358u') throw new Error('t358u red yeast powder');
if (t358uResolve('Cinnamon', 'tablet')?.mark === 't358u') throw new Error('t358u bare cinnamon');
