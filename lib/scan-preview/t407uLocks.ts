import type { T320uHit } from './t320uLocks';
import { t406uResolve } from './t406uLocks';

type Lock = { grade: 'cleared' | 'limited' | 'moderate' | 'high'; counts: boolean; why: string };

const NAD = 'Nicotinamide adenine dinucleotide is NAD+. It is included for its metabolic compounds.';
const ROSE = 'Rose hip fruit extract is an extract of rose hips. It is included for its plant compounds.';
const CITRUS = 'Citrus bioflavonoids are compounds from citrus. It is included for its plant compounds.';
const OAT = 'Organic oat grass powder is dried oat grass. It is included for its plant compounds.';
const LIME = 'Lime extract is an extract of lime. It is included for its plant compounds.';
const MALIC = 'L-malic acid is an organic acid. It is used as a pH adjuster.';
const WHEAT = 'Wheat seed extract is an extract of wheat seeds. It is included for its plant compounds.';
const POLY = 'Polysaccharides are plant carbohydrates. It is included for its fiber content.';
const VANILLA = 'Vanilla powder is dried vanilla. It adds vanilla taste to the product.';
const THREONATE = 'Magnesium L-threonate is magnesium bound to threonate. It is included as a source of magnesium.';
const AVOCADO_LIQUID = 'Avocado oil is oil from avocado fruit. It is included as an ingredient in the liquid. Avocado oil is graded Caution when it is not the base of the product (EFSA and FDA treat refined fruit oils as distinct from whole-food oils).';
const SILVER = 'Silver nanoparticles are particles of silver. It is included for its antimicrobial properties. Silver nanoparticles are graded Limited as a processed metal form (FDA guidance on nanosilver).';

const CLEARED: Array<[string, string]> = [
  ['Nicotinamide Adenine Dinucleotide', NAD],
  ['Rose Hip Fruit Extract (Rosa canina)', ROSE],
  ['Citrus Bioflavinoids', CITRUS],
  ['Organic Oat Grass Powder', OAT],
  ['Lime Extract', LIME],
  ['L-Malic Acid', MALIC],
  ['Wheat Seed Extract (Triticum vulgare) (Ceramosides)', WHEAT],
  ['Polysaccharides', POLY],
  ['Vanilla, Powder, Pure', VANILLA],
  ['Magnesium L-Threonate', THREONATE],
];

function keyOf(name: string): string {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
}

const BY_KEY = new Map<string, Lock>();
for (const [name, why] of CLEARED) {
  const key = keyOf(name);
  if (BY_KEY.has(key)) throw new Error(`t407u duplicate ${name}`);
  if (t406uResolve(name, 'liquid') || t406uResolve(name, 'softgel')) throw new Error(`t407u conflict ${name}`);
  BY_KEY.set(key, { grade: 'cleared', counts: false, why });
}
if (t406uResolve('Silver Nanoparticles', 'liquid') || t406uResolve('Silver Nanoparticles', 'softgel')) {
  throw new Error('t407u conflict Silver Nanoparticles');
}

function isBareAvocadoOil(name: string): boolean {
  return keyOf(name) === 'avocado oil';
}

/** Cleared locks, Silver Nanoparticles Limited, and Caution for Avocado Oil in a liquid when it is not the base. */
export function t407uResolve(name: string, form?: string): T320uHit | undefined {
  if (isBareAvocadoOil(name)) {
    const text = (form ?? '').toLowerCase();
    if (/\bsoftgel\b/.test(text) || /\bbase\b/.test(text)) return t406uResolve(name, form);
    if (/\bliquid\b/.test(text)) {
      return { lock: { grade: 'moderate', counts: false, why: AVOCADO_LIQUID }, mark: 't407u' };
    }
    return t406uResolve(name, form);
  }
  if (keyOf(name) === 'silver nanoparticles') {
    return { lock: { grade: 'limited', counts: true, why: SILVER }, mark: 't407u' };
  }
  const exact = BY_KEY.get(keyOf(name));
  if (exact) return { lock: exact, mark: 't407u' };
  return t406uResolve(name, form);
}

for (const why of [CITRUS, POLY, SILVER]) {
  if (!/\bare\b/.test(why) || !why.includes('It is')) throw new Error('t407u plural grammar');
}
for (const [name, why] of CLEARED) {
  const hit = t407uResolve(name, 'liquid');
  if (hit?.mark !== 't407u' || hit.lock.grade !== 'cleared' || hit.lock.counts || hit.lock.why !== why) {
    throw new Error(`t407u cleared ${name}`);
  }
}
const silver = t407uResolve('Silver Nanoparticles', 'liquid');
if (silver?.mark !== 't407u' || silver.lock.grade !== 'limited' || !silver.lock.counts || silver.lock.why !== SILVER) {
  throw new Error('t407u silver');
}
const avocadoLiquid = t407uResolve('Avocado Oil', 'liquid');
if (avocadoLiquid?.mark !== 't407u' || avocadoLiquid.lock.grade !== 'moderate' || avocadoLiquid.lock.counts || avocadoLiquid.lock.why !== AVOCADO_LIQUID) {
  throw new Error('t407u avocado liquid');
}
const avocadoFill = t407uResolve('Avocado Oil', 'softgel');
if (avocadoFill?.mark === 't407u' || avocadoFill?.lock.grade !== 'moderate' || avocadoFill?.lock.why === AVOCADO_LIQUID) {
  throw new Error('t407u avocado fill');
}
const avocadoFruit = t407uResolve('Avocado Oil (fruit)', 'softgel');
if (avocadoFruit?.mark === 't407u' || avocadoFruit?.lock.grade !== 'moderate') throw new Error('t407u avocado fruit');
const avocadoBase = t407uResolve('Avocado Oil', 'base');
if (avocadoBase?.mark !== 't406u' || avocadoBase.lock.grade !== 'cleared') throw new Error('t407u avocado base');
if (t407uResolve('Citrus Bioflavonoids', 'liquid')?.mark === 't407u') throw new Error('t407u bioflavonoids');
if (t407uResolve('Rose Hip', 'liquid')?.mark === 't407u') throw new Error('t407u rose hip');
if (t407uResolve('Rose Hips', 'liquid')?.mark === 't407u') throw new Error('t407u rose hips');
if (t407uResolve('Malic Acid', 'liquid')?.mark === 't407u') throw new Error('t407u malic');
if (t407uResolve('Vanilla Extract', 'liquid')?.mark === 't407u') throw new Error('t407u vanilla extract');
if (t407uResolve('Vanilla Powder', 'liquid')?.mark === 't407u') throw new Error('t407u vanilla powder');
if (t407uResolve('Magnesium', 'liquid')?.mark === 't407u') throw new Error('t407u magnesium');
