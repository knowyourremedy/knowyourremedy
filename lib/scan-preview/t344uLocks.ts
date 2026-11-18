import { t240uNorm } from './t240uLocks';
import type { T320uHit } from './t320uLocks';
import { t343uResolve } from './t343uLocks';

type Lock = { grade: 'cleared' | 'limited' | 'moderate' | 'high'; counts: boolean; why: string };

function cleared(why: string): Lock {
  return { grade: 'cleared', counts: false, why };
}
function named(name: string): string {
  return `${name}. It is included for its plant or nutrient compounds.`;
}

const PEG = 'PEG/PVA copolymer is a synthetic polymer. It is used as a coating. PEG/PVA copolymer is graded Limited as a synthetic polymer (FDA 21 CFR 172.820).';

const LOCKS: Array<[string, Lock]> = [
  ['Boswellia serrata', cleared(named('Boswellia serrata'))],
  ['Brussels Sprout', cleared(named('Brussels Sprout'))],
  ['Citrus Bioflavonoids Complex', cleared(named('Citrus Bioflavonoids Complex'))],
  ['DL-Methionine', cleared(named('DL-Methionine'))],
  ['Gamma-Linolenic Acid', cleared(named('Gamma-Linolenic Acid'))],
  ['Magnesium Hydroxide', cleared(named('Magnesium Hydroxide'))],
  ['natural Vanilla flavor', cleared(named('natural Vanilla flavor'))],
  ['Saw Palmetto', cleared(named('Saw Palmetto'))],
  ['Selenium (as Selenium Yeast)', cleared(named('Selenium (as Selenium Yeast)'))],
  ['Selenium (as Sodium Selenite)', cleared(named('Selenium (as Sodium Selenite)'))],
  ['Thiamine (as Thiamine Hydrochloride, Vitamin B1)', cleared(named('Thiamine (as Thiamine Hydrochloride, Vitamin B1)'))],
  ['PEG/PVA Copolymer', { grade: 'limited', counts: true, why: PEG }],
];

const BY_KEY = new Map<string, Lock>();
for (const [name, lock] of LOCKS) {
  const key = t240uNorm(name);
  if (BY_KEY.has(key)) throw new Error(`t344u duplicate ${name}`);
  BY_KEY.set(key, lock);
}

const BARE_POWDER = [
  'Acai',
  'Apple',
  'Banana',
  'Cherry',
  'Cranberry',
  'Cauliflower',
  'Cucumber',
  'Orange',
  'Pea',
  'Pear',
  'Plum',
  'Pomegranate',
  'Raspberry',
  'Strawberry',
];
const POWDER_ALIAS = new Map(BARE_POWDER.map((name) => [t240uNorm(name), `${name} powder`]));

export function t344uResolve(name: string, form?: string): T320uHit | undefined {
  const key = t240uNorm(name);
  if (POWDER_ALIAS.has(key)) return t343uResolve(`${POWDER_ALIAS.get(key)}`, form);
  if (key === t240uNorm('Triple Omega Complex 3-6-9')) return undefined;
  const own = BY_KEY.get(key);
  if (own) return { lock: own, mark: 't344u' };
  return t343uResolve(name, form);
}

for (const [name, lock] of LOCKS) {
  const hit = t344uResolve(name, 'tablet');
  if (hit?.lock.why !== lock.why || hit.lock.grade !== lock.grade || hit.mark !== 't344u') throw new Error(`t344u ${name}`);
}
for (const name of ['Acai', 'Apple', 'Banana', 'Cherry', 'Cranberry']) {
  const hit = t344uResolve(name, 'tablet');
  if (hit?.mark !== 't343u' || hit.lock.grade !== 'cleared' || hit.lock.why !== t343uResolve(`${name} powder`)?.lock.why) {
    throw new Error(`t344u powder ${name}`);
  }
}
const pomegranate = t344uResolve('Pomegranate', 'tablet');
if (pomegranate?.mark !== 't333u' || pomegranate.lock.grade !== 'cleared') throw new Error('t344u pomegranate');
const raspberry = t344uResolve('Raspberry', 'tablet');
if (raspberry?.mark !== 't259u' || raspberry.lock.grade !== 'cleared') throw new Error('t344u raspberry');
for (const bare of ['Cauliflower', 'Cucumber', 'Orange', 'Pea', 'Pear', 'Plum', 'Strawberry']) {
  if (t344uResolve(bare, 'tablet')) throw new Error(`t344u invented ${bare}`);
}
if (t344uResolve('Triple Omega Complex 3-6-9')) throw new Error('t344u blend');
if (t344uResolve('Brussels Sprouts', 'tablet')?.mark === 't344u') throw new Error('t344u brussels plural');
if (t344uResolve('Natural flavors', 'tablet')?.mark === 't344u') throw new Error('t344u flavors');
if (t344uResolve('Saw Palmetto extract', 'tablet')?.mark === 't344u') throw new Error('t344u saw extract');
if (t344uResolve('Selenium', 'tablet')?.mark === 't344u') throw new Error('t344u selenium');
if (t344uResolve('Selenium (as L-Selenomethionine)', 'tablet')?.mark === 't344u') throw new Error('t344u selenomethionine');
if (t344uResolve('PEG', 'tablet')?.mark === 't344u') throw new Error('t344u peg');
if (t344uResolve('L-Methionine', 'tablet')?.mark === 't344u') throw new Error('t344u l methionine');
if (t344uResolve('Citrus Bioflavonoids', 'tablet')?.mark === 't344u') throw new Error('t344u bioflavonoids');
