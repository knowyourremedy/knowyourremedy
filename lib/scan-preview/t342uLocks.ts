import { t240uNorm } from './t240uLocks';
import { t140uWhyForName } from './t140uTokenWhy';
import type { T320uHit } from './t320uLocks';
import { t341uResolve } from './t341uLocks';

type Lock = { grade: 'cleared' | 'limited' | 'moderate' | 'high'; counts: boolean; why: string };

function cleared(why: string): Lock {
  return { grade: 'cleared', counts: false, why };
}
function named(name: string): string {
  return `${name}. It is included for its nutrient or plant compounds.`;
}
function color(name: string): string {
  return `${name}. It is used to color the product. FD&C Yellow #5 and artificial colors are graded Avoid as synthetic dyes (FDA 21 CFR 74; IARC).`;
}
function oil(name: string): string {
  return `${name}. It is used as a fill or coating. ${name} is graded Limited when it is the base of the product or a surface coating, and Caution when it is only a fill (highly processed oil; EFSA and FDA treat refined seed and palm oils as distinct from whole-food oils).`;
}

const VITAMIN_A = 'Beta-carotene is a form of vitamin A. It is included as a source of vitamin A.';
const FISH_BASE = 'Fish body oil is oil from fish. It is the base of this softgel. Fish oil is graded Caution when it is the base of a softgel and Limited or Avoid when it is the base of a chewable or liquid product (EFSA and FDA treat refined fish oils as distinct from whole-food oils).';

const LOCKS: Array<[string, Lock]> = [
  ['Glucosamine HCl', cleared(named('Glucosamine HCl'))],
  ['Niacin', cleared(named('Niacin'))],
  ['Vitamin A (as Retinyl Palmitate)', cleared(named('Vitamin A (as Retinyl Palmitate)'))],
  ['Linoleic', cleared(named('Linoleic'))],
  ['Oleic', cleared(named('Oleic'))],
  ['Alpha-Linolenic Acid', cleared(named('Alpha-Linolenic Acid'))],
  ['Lactobacillus acidophilus', cleared(named('Lactobacillus acidophilus'))],
  ['Eleuthero', cleared(named('Eleuthero'))],
  ['PABA', cleared(named('PABA'))],
  ['Vitamin C (as Ascorbic Acid, Sodium Ascorbate)', cleared(named('Vitamin C (as Ascorbic Acid, Sodium Ascorbate)'))],
  ['Sodium Hexametaphosphate', { grade: 'limited', counts: true, why: 'Sodium hexametaphosphate is a phosphate salt. It is used as a stabilizer. Sodium hexametaphosphate is graded Limited as a processed phosphate (FDA 21 CFR 182.6760).' }],
  ['Artificial Colors', { grade: 'high', counts: false, why: color('Artificial Colors') }],
  ['Artificial color', { grade: 'high', counts: false, why: color('Artificial color') }],
];

const BY_KEY = new Map<string, Lock>();
for (const [name, lock] of LOCKS) {
  const key = t240uNorm(name);
  if (BY_KEY.has(key)) throw new Error(`t342u duplicate ${name}`);
  BY_KEY.set(key, lock);
}

const OILS = new Map<string, string>([
  [t240uNorm('refined Soybean Oil'), oil('refined Soybean Oil')],
  [t240uNorm('Palm Olein'), oil('Palm Olein')],
]);

const VITAMIN_A_LOCK: Lock = cleared(VITAMIN_A);
const FISH_LOCK: Lock = { grade: 'moderate', counts: false, why: FISH_BASE };

function isFishBody(name: string): boolean {
  return t240uNorm(name) === 'fish body oil';
}
function isVitaminASource(name: string): boolean {
  return t240uNorm(name) === 'vitamin a as beta carotene';
}
function isSoftgelBase(form?: string): boolean {
  const text = (form ?? '').toLowerCase();
  return /\bsoftgel\b/.test(text) && /\bbase\b/.test(text);
}
function oilLock(name: string, form?: string): Lock | undefined {
  const why = OILS.get(t240uNorm(name));
  if (!why) return undefined;
  const text = (form ?? '').toLowerCase();
  const fill = /\bsoftgel\b/.test(text) && !/\bbase\b/.test(text) && !/\bcoating\b/.test(text);
  return fill
    ? { grade: 'moderate', counts: false, why }
    : { grade: 'limited', counts: true, why };
}

export function t342uLock(name: string, form?: string): Lock | undefined {
  if (isFishBody(name)) return isSoftgelBase(form) ? FISH_LOCK : undefined;
  if (isVitaminASource(name)) return VITAMIN_A_LOCK;
  const oilHit = oilLock(name, form);
  if (oilHit) return oilHit;
  return BY_KEY.get(t240uNorm(name));
}

export function t342uResolve(name: string, form?: string): T320uHit | undefined {
  if (isFishBody(name)) {
    const own = t342uLock(name, form);
    return own ? { lock: own, mark: 't342u' } : t341uResolve(name, form);
  }
  if (t240uNorm(name) === 'fd and c yellow 5') {
    const why = t140uWhyForName(name);
    if (why) return { lock: { grade: 'high', counts: false, why }, mark: 't140u' };
  }
  const own = t342uLock(name, form);
  if (own) return { lock: own, mark: 't342u' };
  return t341uResolve(name, form);
}

for (const [name, lock] of LOCKS) {
  const hit = t342uResolve(name, 'tablet');
  if (hit?.lock.why !== lock.why || hit.lock.grade !== lock.grade || hit.mark !== 't342u') throw new Error(`t342u ${name}`);
}
const vitamin = t342uResolve('Vitamin A (as Beta-Carotene)', 'tablet');
if (vitamin?.mark !== 't342u' || vitamin.lock.grade !== 'cleared' || vitamin.lock.counts || vitamin.lock.why !== VITAMIN_A) {
  throw new Error('t342u vitamin a');
}
if (t342uResolve('Vitamin A (as Beta Carotene)', 'tablet')?.lock.why !== VITAMIN_A) throw new Error('t342u vitamin a space');
if (t342uResolve('Beta-Carotene', 'tablet')?.mark === 't342u') throw new Error('t342u bare carotene');
if (t342uResolve('Beta Carotene (for color)', 'tablet')?.mark === 't342u') throw new Error('t342u color carotene');
if (t342uResolve('Beta-Carotene (color)', 'tablet')?.mark === 't342u') throw new Error('t342u color paren');
if (t342uResolve('Fish Body Oil', 'softgel base')?.lock.why !== FISH_BASE) throw new Error('t342u fish base');
if (t342uResolve('Fish Body Oil', 'softgel')?.mark !== 't341u') throw new Error('t342u fish fill');
if (t342uResolve('Fish Body Oil', 'liquid') || t342uResolve('Fish Body Oil', 'chewable')) throw new Error('t342u fish other');
if (t342uResolve('refined Soybean Oil', 'softgel')?.lock.grade !== 'moderate') throw new Error('t342u soy fill');
if (t342uResolve('refined Soybean Oil', 'tablet')?.lock.grade !== 'limited') throw new Error('t342u soy base');
if (t342uResolve('Soybean Oil', 'softgel')?.mark === 't342u') throw new Error('t342u soy oil');
if (t342uResolve('Palm Olein', 'tablet')?.lock.grade !== 'limited') throw new Error('t342u palm');
if (t342uResolve('Palm Oil', 'tablet')?.mark === 't342u') throw new Error('t342u palm oil');
if (t342uResolve('FD&C Yellow #5', 'tablet')?.mark !== 't140u') throw new Error('t342u yellow');
if (t342uResolve('FD&C Yellow No. 5', 'tablet')?.mark === 't342u') throw new Error('t342u yellow no');
for (const held of ['Linoleic Acid', 'Oleic Acid', 'Para-Aminobenzoic Acid', 'Glucosamine Hydrochloride', 'Monoglycerides', 'Diglycerides', 'Vitamin A (as Vitamin A Palmitate)', 'Spirulina Extract', 'Kelp', 'Mono- and Diglycerides']) {
  if (t342uResolve(held, 'tablet')?.mark === 't342u') throw new Error(`t342u stretched ${held}`);
}
