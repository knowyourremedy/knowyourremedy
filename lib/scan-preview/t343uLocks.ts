import { t240uNorm } from './t240uLocks';
import { t151uWhyForName } from './t151uTokenWhy';
import { t181uWhyForName } from './t181uTokenWhy';
import type { T320uHit } from './t320uLocks';
import { t342uResolve } from './t342uLocks';

type Lock = { grade: 'cleared' | 'limited' | 'moderate' | 'high'; counts: boolean; why: string };

function cleared(why: string): Lock {
  return { grade: 'cleared', counts: false, why };
}
function fruit(name: string): string {
  return `${name}. It is included for its plant compounds.`;
}
function probiotic(name: string): string {
  return `${name}. It is included for its live bacteria.`;
}

const LOCKS: Array<[string, Lock]> = [
  ['Acai powder', cleared(fruit('Acai powder'))],
  ['Apple powder', cleared(fruit('Apple powder'))],
  ['Banana powder', cleared(fruit('Banana powder'))],
  ['Cherry powder', cleared(fruit('Cherry powder'))],
  ['Cranberry powder', cleared(fruit('Cranberry powder'))],
  ['Lactobacillus salivarius', cleared(probiotic('Lactobacillus salivarius'))],
  ['Streptococcus thermophilus', cleared(probiotic('Streptococcus thermophilus'))],
  ['Malva verticillata', cleared('Malva verticillata is a plant. It is included for its plant compounds.')],
];

const BY_KEY = new Map<string, Lock>();
for (const [name, lock] of LOCKS) {
  const key = t240uNorm(name);
  if (BY_KEY.has(key)) throw new Error(`t343u duplicate ${name}`);
  BY_KEY.set(key, lock);
}

const ALIAS = new Map<string, string>([
  [t240uNorm('Linoleic Acid'), 'Linoleic'],
  [t240uNorm('Oleic Acid'), 'Oleic'],
  [t240uNorm('Para-Aminobenzoic Acid'), 'PABA'],
  [t240uNorm('Glucosamine Hydrochloride'), 'Glucosamine HCl'],
  [t240uNorm('Monoglycerides'), 'Mono- and Diglycerides'],
  [t240uNorm('Diglycerides'), 'Mono- and Diglycerides'],
  [t240uNorm('Vitamin A (as Vitamin A Palmitate)'), 'Vitamin A (as Retinyl Palmitate)'],
]);

function existingWhy(canonical: string, hit: T320uHit): T320uHit {
  if (hit.lock.why) return hit;
  const why = t181uWhyForName(canonical);
  if (!why) return hit;
  return { ...hit, lock: { ...hit.lock, why } };
}

export function t343uResolve(name: string, form?: string): T320uHit | undefined {
  const key = t240uNorm(name);
  const canonical = ALIAS.get(key);
  if (canonical) {
    const hit = t342uResolve(canonical, form);
    return hit ? existingWhy(canonical, hit) : undefined;
  }
  if (key === 'kelp') {
    const why = t151uWhyForName('Kelp', form, 'limited');
    if (!why) return t342uResolve(name, form);
    return { lock: { grade: 'limited', counts: true, why }, mark: 't151u' };
  }
  if (key === 'spirulina extract') {
    const hit = t342uResolve(name, form);
    if (!hit) return undefined;
    return existingWhy('spirulina extract', hit);
  }
  const own = BY_KEY.get(key);
  if (own) return { lock: own, mark: 't343u' };
  return t342uResolve(name, form);
}

for (const [name, lock] of LOCKS) {
  const hit = t343uResolve(name, 'tablet');
  if (hit?.lock.why !== lock.why || hit.lock.grade !== lock.grade || hit.mark !== 't343u') throw new Error(`t343u ${name}`);
}
const linoleic = t343uResolve('Linoleic Acid', 'softgel');
if (linoleic?.mark !== 't342u' || linoleic.lock.why !== t342uResolve('Linoleic')?.lock.why) throw new Error('t343u linoleic');
if (t343uResolve('Oleic Acid')?.lock.why !== t342uResolve('Oleic')?.lock.why) throw new Error('t343u oleic');
if (t343uResolve('Para-Aminobenzoic Acid')?.lock.why !== t342uResolve('PABA')?.lock.why) throw new Error('t343u paba');
if (t343uResolve('Glucosamine Hydrochloride')?.lock.why !== t342uResolve('Glucosamine HCl')?.lock.why) throw new Error('t343u glucosamine');
const mono = t343uResolve('Monoglycerides', 'tablet');
const di = t343uResolve('Diglycerides', 'tablet');
const monoWhy = t181uWhyForName('Mono- and Diglycerides');
if (!mono || !di || mono.lock.grade !== 'limited' || !mono.lock.counts || mono.lock.why !== monoWhy || di.lock.why !== monoWhy || mono.mark === 't343u') {
  throw new Error('t343u glycerides');
}
if (t343uResolve('Vitamin A (as Vitamin A Palmitate)')?.lock.why !== t342uResolve('Vitamin A (as Retinyl Palmitate)')?.lock.why) {
  throw new Error('t343u palmitate');
}
for (const bare of ['Acai', 'Apple', 'Banana', 'Cherry', 'Cranberry', 'Cauliflower', 'Orange']) {
  if (t343uResolve(bare, 'tablet')?.mark === 't343u') throw new Error(`t343u stretched ${bare}`);
}
const kelp = t343uResolve('Kelp', 'tablet');
if (kelp?.mark === 't343u' || kelp?.lock.grade !== 'limited' || !kelp?.lock.counts) throw new Error('t343u kelp');
const spirulina = t343uResolve('Spirulina Extract', 'gummy');
if (spirulina?.mark === 't343u' || spirulina?.lock.grade !== 'limited' || !spirulina?.lock.counts || !spirulina?.lock.why) {
  throw new Error('t343u spirulina');
}
