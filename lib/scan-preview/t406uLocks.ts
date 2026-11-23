import type { T320uHit } from './t320uLocks';
import { t404uResolve } from './t404uLocks';

type Lock = { grade: 'cleared' | 'limited' | 'moderate' | 'high'; counts: boolean; why: string };

const GINSENG = 'Asian ginseng stems and leaves extract is an extract of ginseng. It is included for its plant compounds.';
const THISTLE = 'Asteraceae thistle extracts are extracts of thistle plants. It is included for its plant compounds.';
const AVOCADO = 'Avocado oil is oil from avocado fruit. It is included for its plant compounds. Avocado oil is graded Caution as a fill and Limited when it is the base of the product (EFSA and FDA treat refined fruit oils as distinct from whole-food oils).';
const BACOPA = 'Bacopa monnieri extract is an extract of bacopa. It is included for its plant compounds.';
const BARBERRY = 'Barberry root concentrate extract is an extract of barberry root. It is included for its plant compounds.';
const BERRY = 'Berry fruit concentrate is concentrated berry juice. It is included for its plant compounds.';
const PECTIN = 'Beta pectin is a plant fiber. It is included for its fiber content.';
const ELDER = 'Black elderberry fruit concentrate extract is an extract of elderberry. It is included for its plant compounds.';
const BLACK_SEED = 'Black seed oil is oil from nigella sativa seeds. It is included for its plant compounds. Black seed oil is graded Caution as a fill and Limited when it is the base of the product (EFSA and FDA treat refined seed oils as distinct from whole-food oils).';
const WALNUT = 'Black walnut seed concentrate extract is an extract of black walnut. It is included for its plant compounds.';
const ALGAE = 'Blue-green algae is a plant. It is included for its plant compounds.';
const BROCCOLI = 'Broccoli seed powder extract is an extract of broccoli seeds. It is included for its plant compounds.';
const CAPE = 'Caffeic acid phenethyl ester is a compound from propolis. It is included for its plant compounds.';
const CAMU = 'Camu camu fruit powder is dried camu camu fruit. It is included for its plant compounds.';
const CLAW = 'Cat\'s claw bark concentrate extract is an extract of cat\'s claw bark. It is included for its plant compounds.';
const SALT = 'Celtic sea salt is salt from seawater. It is used as a mineral source.';
const CINNAMON = 'Cinnamon bark concentrate extract is an extract of cinnamon bark. It is included for its plant compounds.';
const ETHANOL = 'Biodynamic organic ethanol is alcohol from organic sources. It is used as a solvent. Ethanol is graded Limited when used as a solvent without a printed strength (FDA and EFSA guidance on alcohol vehicles).';
const STARCH = 'Cassava starch is a starch from cassava. It is used as a filler. Cassava starch is graded Limited as a processed starch (FDA and EFSA treat refined starches as processed ingredients).';

const CLEARED: Array<[string, string]> = [
  ['Asian Ginseng (Panax ginseng) Stems & Leaves Extract', GINSENG],
  ['Asteraceae Thistle extracts', THISTLE],
  ['Bacopa monnieri Extract (whole plant)', BACOPA],
  ['Barberry (Root) Conc. Ext. providing Berberine', BARBERRY],
  ['Berry Fruit Conc.', BERRY],
  ['Beta Pectin', PECTIN],
  ['Black Elderberry (Fruit) Conc. Ext.', ELDER],
  ['Black Walnut (Seed) Conc. Ext.', WALNUT],
  ['Blue-Green Algae', ALGAE],
  ['Broccoli Seed Powder Extract (13% Glucoraphanin Powder)', BROCCOLI],
  ['Caffeic Acid Phenethyl Ester', CAPE],
  ['Camu Camu Fruit Powder (Myrciaria Dubia)', CAMU],
  ['Cat\'s Claw (Bark) Conc. Ext.', CLAW],
  ['Celtic Sea Salt', SALT],
  ['Cinnamon (Bark) Conc. Ext.', CINNAMON],
];

const LIMITED: Array<[string, string]> = [
  ['Biodynamic organic Ethanol', ETHANOL],
  ['Cassava Root Starch', STARCH],
  ['Cassava Starch', STARCH],
];

function keyOf(name: string): string {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
}

const BY_KEY = new Map<string, Lock>();
for (const [name, why] of CLEARED) {
  const key = keyOf(name);
  if (BY_KEY.has(key)) throw new Error(`t406u duplicate ${name}`);
  if (t404uResolve(name, 'liquid') || t404uResolve(name, 'softgel')) throw new Error(`t406u conflict ${name}`);
  BY_KEY.set(key, { grade: 'cleared', counts: false, why });
}
for (const [name, why] of LIMITED) {
  const key = keyOf(name);
  if (BY_KEY.has(key)) throw new Error(`t406u duplicate ${name}`);
  if (t404uResolve(name, 'liquid') || t404uResolve(name, 'softgel')) throw new Error(`t406u conflict ${name}`);
  BY_KEY.set(key, { grade: 'limited', counts: true, why });
}

function isColdPressedBlackSeed(name: string): boolean {
  const key = keyOf(name);
  return key.includes('cold pressed') && key.includes('black seed');
}

function isBareAvocadoOil(name: string): boolean {
  return keyOf(name) === 'avocado oil';
}

function isBareBlackSeedOil(name: string): boolean {
  return keyOf(name) === 'black seed oil';
}

/** Cleared and Limited locks. Avocado Oil keeps the softgel fill lock. Cold-pressed black seed oil stays apart. */
export function t406uResolve(name: string, form?: string): T320uHit | undefined {
  if (isColdPressedBlackSeed(name)) return t404uResolve(name, form);
  if (isBareAvocadoOil(name) || isBareBlackSeedOil(name)) {
    const prior = t404uResolve(name, form);
    if (prior) return prior;
    const why = isBareAvocadoOil(name) ? AVOCADO : BLACK_SEED;
    return { lock: { grade: 'cleared', counts: false, why }, mark: 't406u' };
  }
  const exact = BY_KEY.get(keyOf(name));
  if (exact) return { lock: exact, mark: 't406u' };
  return t404uResolve(name, form);
}

if (!THISTLE.includes('are extracts') || !THISTLE.includes('It is included')) throw new Error('t406u thistle grammar');
for (const [name, why] of CLEARED) {
  const hit = t406uResolve(name, 'liquid');
  if (hit?.mark !== 't406u' || hit.lock.grade !== 'cleared' || hit.lock.counts || hit.lock.why !== why) {
    throw new Error(`t406u cleared ${name}`);
  }
}
for (const [name, why] of LIMITED) {
  const hit = t406uResolve(name, 'liquid');
  if (hit?.mark !== 't406u' || hit.lock.grade !== 'limited' || !hit.lock.counts || hit.lock.why !== why) {
    throw new Error(`t406u limited ${name}`);
  }
}
const avocadoLiquid = t406uResolve('Avocado Oil', 'liquid');
if (avocadoLiquid?.mark !== 't406u' || avocadoLiquid.lock.grade !== 'cleared' || avocadoLiquid.lock.counts || avocadoLiquid.lock.why !== AVOCADO) {
  throw new Error('t406u avocado liquid');
}
const avocadoFill = t406uResolve('Avocado Oil', 'softgel');
if (avocadoFill?.mark === 't406u' || avocadoFill?.lock.grade !== 'moderate') throw new Error('t406u avocado fill');
const avocadoFruit = t406uResolve('Avocado Oil (fruit)', 'softgel');
if (avocadoFruit?.mark === 't406u' || avocadoFruit?.lock.grade !== 'moderate') throw new Error('t406u avocado fruit');
const blackSeed = t406uResolve('Black Seed Oil', 'liquid');
if (blackSeed?.mark !== 't406u' || blackSeed.lock.grade !== 'cleared' || blackSeed.lock.why !== BLACK_SEED) {
  throw new Error('t406u black seed');
}
if (t406uResolve('organic cold pressed Black Seed Oil', 'liquid')?.mark === 't406u') throw new Error('t406u cold pressed');
if (t406uResolve('Cold-pressed black seed oil', 'softgel')?.mark === 't406u') throw new Error('t406u cold pressed softgel');
if (t406uResolve('Bacopa monniera extract', 'liquid')?.mark === 't406u') throw new Error('t406u monniera');
if (t406uResolve('Cassava Syrup', 'liquid')?.mark === 't406u') throw new Error('t406u syrup');
if (t406uResolve('Organic Cassava Syrup', 'liquid')?.mark === 't406u') throw new Error('t406u organic syrup');
if (t406uResolve('Sea Salt', 'liquid')?.mark === 't406u') throw new Error('t406u sea salt');
if (t406uResolve('Pectin', 'liquid')?.mark === 't406u') throw new Error('t406u pectin');
if (t406uResolve('Cinnamon Oil', 'liquid')?.mark === 't406u') throw new Error('t406u cinnamon oil');
if (t406uResolve('Cinnamon Powder', 'liquid')?.mark === 't406u') throw new Error('t406u cinnamon powder');
if (t406uResolve('Ethanol', 'liquid')?.mark === 't406u') throw new Error('t406u bare ethanol');
