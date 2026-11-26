import type { T320uHit } from './t320uLocks';
import { t409uResolve } from './t409uLocks';

type Lock = { grade: 'cleared' | 'limited' | 'moderate' | 'high'; counts: boolean; why: string };

const HUPERZINE = 'Huperzine A is a compound from huperzia. It is included for its plant compounds.';
const PHOSPHATIDES = 'Phosphatides are phospholipids from sunflower lecithin. They are used as an emulsifier.';
const MONOLAURIN = 'Monolaurin is a monoglyceride from coconut. It is included for its lipid compounds.';
const PLANT_COMPOUND = '[Named compound]. It is included for its plant compounds.';
const LIPID_COMPOUND = '[Named compound]. It is included for its lipid compounds.';
const EGCG = 'EGCG is a catechin from green tea. It is included for its plant compounds.';
const PLANT = '[Named plant]. It is included for its plant compounds.';
const VANILLA = 'Organic vanilla is a flavor from vanilla. It adds vanilla taste to the product.';

const CLEARED: Array<[string, string]> = [
  ['Huperzine A (from Huperzia serrata, whole plant)', HUPERZINE],
  ['Phosphatides (from Sunflower Lecithin)', PHOSPHATIDES],
  ['Monolaurin (Coconut Fruit) Fatty Acid Glyceride', MONOLAURIN],
  ['Ellagic Acid', PLANT_COMPOUND],
  ['Baicalein', PLANT_COMPOUND],
  ['Luteolin', PLANT_COMPOUND],
  ['Nobiletin', PLANT_COMPOUND],
  ['Tangeretin', PLANT_COMPOUND],
  ['Piperine', PLANT_COMPOUND],
  ['Oleoylethanolamide (OEA)', LIPID_COMPOUND],
  ['Palmitoylethanolamide', LIPID_COMPOUND],
  ['EGCG', EGCG],
  ['Lavender', PLANT],
  ['Rose Geranium', PLANT],
  ['organic Vanilla', VANILLA],
];

function keyOf(name: string): string {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
}

const BY_KEY = new Map<string, Lock>();
for (const [name, why] of CLEARED) {
  const key = keyOf(name);
  if (BY_KEY.has(key)) throw new Error(`t410u duplicate ${name}`);
  if (t409uResolve(name, 'liquid') || t409uResolve(name, 'softgel') || t409uResolve(name, 'capsule')) {
    throw new Error(`t410u conflict ${name}`);
  }
  BY_KEY.set(key, { grade: 'cleared', counts: false, why });
}

/** Cleared locks for the remaining Cymbiotika hold strings. A prior lock wins. */
export function t410uResolve(name: string, form?: string): T320uHit | undefined {
  const exact = BY_KEY.get(keyOf(name));
  if (exact) return { lock: exact, mark: 't410u' };
  return t409uResolve(name, form);
}

if (PLANT_COMPOUND !== '[Named compound]. It is included for its plant compounds.') throw new Error('t410u plant placeholder');
if (LIPID_COMPOUND !== '[Named compound]. It is included for its lipid compounds.') throw new Error('t410u lipid placeholder');
if (PLANT !== '[Named plant]. It is included for its plant compounds.') throw new Error('t410u named plant placeholder');
if (!PHOSPHATIDES.includes('are phospholipids') || !PHOSPHATIDES.includes('They are used')) throw new Error('t410u phosphatides grammar');
for (const [name, why] of CLEARED) {
  const hit = t410uResolve(name, 'liquid');
  if (hit?.mark !== 't410u' || hit.lock.grade !== 'cleared' || hit.lock.counts || hit.lock.why !== why) {
    throw new Error(`t410u ${name}`);
  }
}
if (t410uResolve('Baicalin', 'liquid')?.mark === 't410u') throw new Error('t410u baicalin');
if (t410uResolve('Phosphatidylcholine', 'liquid')?.mark === 't410u') throw new Error('t410u pc');
if (t410uResolve('Phosphatidylcholine (from Sunflower Lecithin)', 'liquid')?.mark === 't410u') throw new Error('t410u pc sunflower');
if (t410uResolve('Vanilla Extract', 'liquid')?.mark === 't410u') throw new Error('t410u vanilla extract');
if (t410uResolve('Vanilla Powder', 'liquid')?.mark === 't410u') throw new Error('t410u vanilla powder');
if (t410uResolve('organic Lavender oil', 'liquid')?.mark === 't410u') throw new Error('t410u lavender oil');
if (t410uResolve('Green Tea extract', 'liquid')?.mark === 't410u') throw new Error('t410u green tea');
if (t410uResolve('Piperine', 'liquid')?.lock.why !== PLANT_COMPOUND) throw new Error('t410u piperine why');
if (t410uResolve('Oleoylethanolamide (OEA)', 'liquid')?.lock.why !== LIPID_COMPOUND) throw new Error('t410u oea why');
if (t410uResolve('Lavender', 'liquid')?.lock.why !== PLANT) throw new Error('t410u lavender why');
