import type { RiskLevel } from '../ratingRecord';
import { t240uNorm } from './t240uLocks';
import { t256uResolve } from './t256uLocks';
import { t259uLock } from './t259uLocks';
import { t267uMaltodextrin } from './t267uLocks';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

function oilWhy(name: string): string {
  return `${name}. It is used as a fill in the softgel. ${name} is graded Caution as a fill and Limited or Avoid when it is the base of the product (highly processed oil; EFSA and FDA treat refined seed and fruit oils as distinct from whole-food oils).`;
}

function sweetWhy(name: string): string {
  return `${name}. It is used as a sweetener, binder, or coating. Processed sugars and purified stevia are graded Limited (FDA and EFSA treat refined syrups and steviol glycosides as processed sweeteners).`;
}

const LOCKS: Array<[string, Lock]> = [
  ["St. John's bread (carob)(color)", { grade: 'cleared', counts: false, why: "St. John's bread is carob, the pod of the carob tree. It is used to color the product." }],
  ['sodium copper chlorophyllin (color)', { grade: 'cleared', counts: false, why: 'Sodium copper chlorophyllin is a copper-containing derivative of chlorophyll. It is used to color the product.' }],
  ['glycine', { grade: 'cleared', counts: false, why: 'Glycine is the simplest amino acid. It is included for its amino acid content.' }],
  ['red cabbage extract (color)', { grade: 'cleared', counts: false, why: 'Red cabbage extract is an extract of the red cabbage plant. It is used to color the product.' }],
  ['glyceryl monooleate', { grade: 'cleared', counts: false, why: 'Glyceryl monooleate is a monoester of glycerol and oleic acid. It is used as an emulsifier.' }],
  ['beta-cyclodextrin', { grade: 'cleared', counts: false, why: 'Beta-cyclodextrin is a ring-shaped oligosaccharide made from starch. It is used as a stabilizer.' }],
  ['carboxymethyl cellulose', { grade: 'cleared', counts: false, why: 'Carboxymethyl cellulose is a water-soluble derivative of cellulose. It is used as a thickener and binder.' }],
  ['BioPerine® Black Pepper extract (95% piperine)(fruit)', { grade: 'cleared', counts: false, why: 'BioPerine is a standardized extract of black pepper fruit that contains piperine. It is included to increase the absorption of other ingredients.' }],
  ['Ginger extract (5% gingerols)(rhizome)', { grade: 'cleared', counts: false, why: 'Ginger extract is an extract of the ginger rhizome standardized to gingerols. It is included for its plant compounds.' }],
  ['ConcenTrace® Trace Mineral Complex', { grade: 'cleared', counts: false, why: 'ConcenTrace is a concentrated trace mineral complex from seawater. It is included for its mineral content.' }],
  ['N,N-Dimethylglycine (DMG) Hydrochloride', { grade: 'cleared', counts: false, why: 'N,N-dimethylglycine hydrochloride is a methylated form of the amino acid glycine. It is included for its amino acid compounds.' }],
  ['CBD (Naturally occurring)', { grade: 'cleared', counts: false, why: 'CBD is cannabidiol, a compound found in hemp. It is included for its plant compounds.' }],
  ['natural peppermint flavor', { grade: 'cleared', counts: false, why: 'Natural peppermint flavor is a flavor derived from peppermint. It adds peppermint taste to the product.' }],
  ['Cold-pressed hemp seed oil', { grade: 'moderate', counts: false, why: oilWhy('Cold-pressed hemp seed oil') }],
  ['Avocado Oil (fruit)', { grade: 'moderate', counts: false, why: oilWhy('Avocado Oil (fruit)') }],
  ['Black Cumin Oil (seed)', { grade: 'moderate', counts: false, why: oilWhy('Black Cumin Oil (seed)') }],
  ['Safflower Oil (seed)', { grade: 'moderate', counts: false, why: oilWhy('Safflower Oil (seed)') }],
  ['Polyglycitol syrup', { grade: 'limited', counts: true, why: sweetWhy('Polyglycitol syrup') }],
  ['sucrose', { grade: 'limited', counts: true, why: sweetWhy('sucrose') }],
  ['stevia', { grade: 'limited', counts: true, why: sweetWhy('stevia') }],
  ['tapioca fiber', { grade: 'limited', counts: true, why: 'Tapioca fiber (or citrus fiber) is a plant fiber. It is used as a binder or coating. Plant fibers are graded Limited when used as a processed coating or binder (EFSA and FDA treat refined plant fibers as processed ingredients).' }],
  ['citrus fiber (coating)', { grade: 'limited', counts: true, why: 'Tapioca fiber (or citrus fiber) is a plant fiber. It is used as a binder or coating. Plant fibers are graded Limited when used as a processed coating or binder (EFSA and FDA treat refined plant fibers as processed ingredients).' }],
];

const FILL_OILS = new Set(LOCKS.filter(([, lock]) => lock.grade === 'moderate').map(([name]) => t240uNorm(name)));
const BY_KEY = new Map<string, Lock>(LOCKS.map(([name, lock]) => [t240uNorm(name), lock]));

/** New strings. The four oils are Caution only as a softgel fill. */
export function t320uLock(name: string, form?: string): Lock | undefined {
  const key = t240uNorm(name);
  const lock = BY_KEY.get(key);
  if (!lock) return undefined;
  if (FILL_OILS.has(key) && !/\bsoftgel\b/.test((form ?? '').toLowerCase())) return undefined;
  return lock;
}

export type T320uHit = { lock: Lock; mark: string; from?: string };

/**
 * The five founder matches. Each returns a lock that already exists.
 * Not a new lock entry.
 */
export function t320uExisting(name: string, form?: string): T320uHit | undefined {
  const key = t240uNorm(name);
  if (key === t240uNorm('maltodextrin') || key === t240uNorm('Maltodextrin')) {
    const lock = t267uMaltodextrin('Maltodextrin') ?? t259uLock('Maltodextrin');
    if (lock?.why) return { lock, mark: 't259u', from: 'Maltodextrin' };
  }
  if (key === t240uNorm('Medium Chain Triglyceride (MCT) Oil')) {
    const lock = t259uLock('Medium Chain Triglycerides (MCT) Oil', form);
    if (lock?.why) return { lock, mark: 't259u', from: 'Medium Chain Triglycerides (MCT) Oil' };
  }
  if (key === t240uNorm('Hemp Oil (seed)')) {
    const hit = t256uResolve('organic Hempseed Oil', form);
    if (hit?.lock.why) return { lock: hit.lock, mark: hit.mark, from: 'organic Hempseed Oil' };
  }
  if (key === t240uNorm('Flaxseed Oil (seed)')) {
    const hit = t256uResolve('Flaxseed Oil', form);
    if (hit?.lock.why) return { lock: hit.lock, mark: hit.mark, from: 'Flaxseed Oil' };
  }
  if (key === t240uNorm('Coconut Oil (copra)')) {
    const hit = t256uResolve('Coconut Oil', form);
    if (hit) return { lock: hit.lock, mark: hit.mark, from: 'Coconut Oil' };
  }
  return undefined;
}

/** Irwin rows only. Other brands are not restamped. */
export function t320uResolve(name: string, form?: string): T320uHit | undefined {
  const own = t320uLock(name, form);
  if (own) return { lock: own, mark: 't320u' };
  const existing = t320uExisting(name, form);
  if (existing) return existing;
  const hit = t256uResolve(name, form);
  if (!hit) return undefined;
  return { lock: hit.lock, mark: hit.mark, from: hit.from };
}

if (BY_KEY.size !== LOCKS.length) throw new Error('t320u duplicate');
for (const [name, lock] of LOCKS) {
  const form = lock.grade === 'moderate' ? 'softgel' : undefined;
  const hit = t320uLock(name, form);
  if (hit?.why !== lock.why || hit.grade !== lock.grade || hit.counts !== lock.counts) throw new Error(`t320u ${name}`);
}
if (t320uLock('Cold-pressed hemp seed oil', 'liquid')) throw new Error('t320u hemp base');
if (t320uLock('Avocado Oil (fruit)', 'softgel')?.grade !== 'moderate') throw new Error('t320u avocado');
const malto = t320uExisting('maltodextrin', 'softgel');
if (malto?.lock.grade !== 'limited' || malto.lock.counts !== true) throw new Error('t320u maltodextrin');
const mct = t320uExisting('Medium Chain Triglyceride (MCT) Oil', 'softgel');
if (mct?.lock.grade !== 'limited' || mct.lock.counts !== true) throw new Error('t320u mct');
const flax = t320uExisting('Flaxseed Oil (seed)', 'softgel');
if (flax?.lock.grade !== 'moderate' || flax.lock.counts !== false) throw new Error('t320u flax');
const coconut = t320uExisting('Coconut Oil (copra)', 'softgel');
if (coconut?.lock.grade !== 'cleared') throw new Error('t320u coconut');
const hemp = t320uExisting('Hemp Oil (seed)', 'softgel');
if (hemp?.lock.grade !== 'moderate' || hemp.lock.counts !== false) throw new Error('t320u hemp');
if (t320uExisting('Hemp Oil (seed)', 'liquid')) throw new Error('t320u hemp liquid');
