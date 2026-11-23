import type { T320uHit } from './t320uLocks';
import { t392uResolve } from './t392uLocks';

type Lock = { grade: 'cleared' | 'limited' | 'moderate' | 'high'; counts: boolean; why: string };

const VANILLA = 'Vanilla extract (or powder) is a flavor from vanilla. It adds vanilla taste to the product.';
const PC = 'Phosphatidylcholine is a phospholipid. It is used as an emulsifier.';
const BAMBOO = 'Bamboo leaf extract is an extract of bamboo leaf. It is included for its plant compounds.';
const TANGERINE = 'Tangerine oil is oil from tangerine peel. It is included for its plant compounds.';
const NUTRIENT = '[Named mineral or amino acid form]. It is included as a source of that nutrient.';
const COCOA_NOT_APPLIED = 'Cocoa extract is an extract of cacao. It is included for its plant compounds.';
const MINERAL = '[Named mineral]. It is included as a source of that mineral.';
const ROWANBERRY = 'Rowanberry fruit extract is an extract of the rowanberry. It is included for its plant compounds.';
const BAICALIN = 'Baicalin is a flavonoid from scutellaria. It is included for its plant compounds.';
const CASSAVA = 'Cassava syrup is a processed sweetener from cassava. It is used as a sweetener. Cassava syrup is graded Limited as a processed sweetener (FDA and EFSA treat refined syrups as processed ingredients).';
const GLYCERIN = 'Coconut glycerin is glycerin from coconut. It is used as a humectant and sweetener. Coconut glycerin is graded Limited as a processed glycerin (FDA 21 CFR 182.1320).';
const NECTAR = 'Coconut nectar is a processed sweetener from coconut. It is used as a sweetener. Coconut nectar is graded Limited as a processed sweetener (FDA and EFSA treat refined nectars as processed ingredients).';

const CLEARED: Array<[string, string]> = [
  ['Vanilla Extract', VANILLA],
  ['Vanilla Powder', VANILLA],
  ['Phosphatidylcholine', PC],
  ['Bamboo Leaf Extract', BAMBOO],
  ['Tangerine Oil', TANGERINE],
  ['Alpha-Ketoglutarate', NUTRIENT],
  ['Arginine Alpha Ketoglutarate', NUTRIENT],
  ['Calcium Bisglycinate', NUTRIENT],
  ['Citrulline Malate', NUTRIENT],
  ['Magnesium Glycinate', NUTRIENT],
  ['Phosphorus', MINERAL],
  ['Potassium Phosphate', MINERAL],
  ['Rowanberry Fruit Extract', ROWANBERRY],
  ['Baicalin', BAICALIN],
];

const LIMITED: Array<[string, string]> = [
  ['Cassava Syrup', CASSAVA],
  ['Coconut Glycerin', GLYCERIN],
  ['Coconut Nectar', NECTAR],
];

const BY_KEY = new Map<string, Lock>();
for (const [name, why] of CLEARED) {
  const key = name.toLowerCase();
  if (BY_KEY.has(key)) throw new Error(`t398u duplicate ${name}`);
  const prior = t392uResolve(name, 'liquid');
  if (prior) throw new Error(`t398u conflict ${name}`);
  BY_KEY.set(key, { grade: 'cleared', counts: false, why });
}
for (const [name, why] of LIMITED) {
  const key = name.toLowerCase();
  if (BY_KEY.has(key)) throw new Error(`t398u duplicate ${name}`);
  const prior = t392uResolve(name, 'liquid');
  if (prior) throw new Error(`t398u conflict ${name}`);
  BY_KEY.set(key, { grade: 'limited', counts: true, why });
}

function organicCore(name: string): string | undefined {
  if (!/\borganic\b/i.test(name)) return undefined;
  const stripped = name.replace(/\b(?:certified\s+)?organic\b/ig, ' ').replace(/\s+/g, ' ').trim();
  return stripped && stripped.toLowerCase() !== name.trim().toLowerCase() ? stripped : undefined;
}

function phosphatidylcholineFromLecithin(name: string): boolean {
  return /^phosphatidylcholine\s*\(\s*from\s+(?:non-gmo\s+)?sunflower lecithin\s*\)$/i.test(name.trim());
}

function own(name: string): Lock | undefined {
  if (phosphatidylcholineFromLecithin(name)) return BY_KEY.get('phosphatidylcholine');
  const exact = BY_KEY.get(name.trim().toLowerCase());
  if (exact) return exact;
  const core = organicCore(name);
  if (!core) return undefined;
  return BY_KEY.get(core.toLowerCase());
}

/** New t398u locks. Organic maps onto these strings. A sunflower-lecithin source parenthetical maps to Phosphatidylcholine. */
export function t398uResolve(name: string, form?: string): T320uHit | undefined {
  const hit = own(name);
  if (hit) return { lock: hit, mark: 't398u' };
  return t392uResolve(name, form);
}

if (BY_KEY.size !== CLEARED.length + LIMITED.length) throw new Error('t398u size');
for (const [name, why] of [...CLEARED, ...LIMITED]) {
  const hit = t398uResolve(name, 'liquid');
  if (hit?.mark !== 't398u' || hit.lock.why !== why) throw new Error(`t398u ${name}`);
}
if (!VANILLA.includes('Vanilla extract (or powder)')) throw new Error('t398u vanilla why');
if (NUTRIENT !== '[Named mineral or amino acid form]. It is included as a source of that nutrient.') {
  throw new Error('t398u nutrient placeholder');
}
if (MINERAL !== '[Named mineral]. It is included as a source of that mineral.') throw new Error('t398u mineral placeholder');
if (t398uResolve('Organic Vanilla Extract', 'liquid')?.lock.why !== VANILLA) throw new Error('t398u organic vanilla');
if (t398uResolve('organic Vanilla extract', 'liquid')?.lock.why !== VANILLA) throw new Error('t398u vanilla case');
if (t398uResolve('Organic Vanilla Powder', 'liquid')?.lock.why !== VANILLA) throw new Error('t398u organic powder');
if (t398uResolve('Organic Cassava Syrup', 'liquid')?.lock.why !== CASSAVA) throw new Error('t398u organic cassava');
if (t398uResolve('Organic Tangerine Oil', 'liquid')?.lock.why !== TANGERINE) throw new Error('t398u organic tangerine');
if (t398uResolve('organic Coconut Glycerin', 'liquid')?.lock.why !== GLYCERIN) throw new Error('t398u organic glycerin');
if (t398uResolve('Organic Coconut Nectar', 'liquid')?.lock.why !== NECTAR) throw new Error('t398u organic nectar');
if (t398uResolve('Bamboo leaf extract', 'liquid')?.lock.why !== BAMBOO) throw new Error('t398u bamboo case');
if (t398uResolve('Phosphatidylcholine (from Sunflower Lecithin)', 'liquid')?.lock.why !== PC) throw new Error('t398u pc');
if (t398uResolve('Phosphatidylcholine (from Non-GMO Sunflower Lecithin)', 'liquid')?.lock.why !== PC) throw new Error('t398u pc nongmo');
const powder = t398uResolve('Vanilla Extract Powder', 'powder');
if (powder?.mark === 't398u' || powder?.lock.why === VANILLA) throw new Error('t398u vanilla powder lock');
for (const apart of [
  'Rowanberry Extract',
  'Organic Evaporated Coconut Nectar',
  'Phosphatides',
  'Phosphatides (from Sunflower Lecithin)',
  'Cacao extract',
  'organic Cacao extract',
  'Cassava Starch',
  'Cassava Root Starch',
  'organic sprouted Almond Butter',
  'Vanilla Extract Concentrate',
  'Vanilla, Powder, Pure',
  'Potassium Phosphate 3x',
]) {
  if (t398uResolve(apart, 'liquid')?.mark === 't398u') throw new Error(`t398u apart ${apart}`);
}
if (t398uResolve('Almond Butter', 'liquid')?.mark === 't398u') throw new Error('t398u almond overwrite');
if (t398uResolve('Cocoa Extract', 'liquid')?.mark === 't398u') throw new Error('t398u cocoa overwrite');
if (t398uResolve('Organic Cocoa Extract', 'liquid')?.mark === 't398u') throw new Error('t398u organic cocoa');
if (t398uResolve('Rebaudioside M', 'liquid')?.mark === 't398u') throw new Error('t398u reb overwrite');
if (COCOA_NOT_APPLIED === BY_KEY.get('cocoa extract')?.why) throw new Error('t398u cocoa stored');
