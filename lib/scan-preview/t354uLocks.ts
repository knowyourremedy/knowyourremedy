import { t240uNorm } from './t240uLocks';
import type { T320uHit } from './t320uLocks';
import { t352uResolve } from './t352uLocks';

type Lock = { grade: 'cleared' | 'limited'; counts: boolean; why: string };

const ASHWA = 'Ashwagandha is a plant root. It is included for its plant compounds.';
const CARROT = 'Black carrot juice concentrate is concentrated juice from black carrots. It is used as a color.';
const ALOE = 'Aloe vera is the gel from the aloe plant. It is included for its plant compounds.';
const CARNITINE = 'L-carnitine tartrate is a salt form of the amino acid carnitine. It is included for its amino acid content.';
const CHLOROPHYLLIN = 'Sodium copper chlorophyllin is a copper complex of chlorophyll. It is used as a color.';
const PALM = 'Palm leaf glaze is a refined palm coating. It coats the tablet or softgel. Palm leaf glaze is graded Limited as a processed glaze (FDA 21 CFR 172.615).';

const LOCKS: Array<[string, Lock]> = [
  ['Ashwagandha', { grade: 'cleared', counts: false, why: ASHWA }],
  ['Black Carrot Juice Concentrate', { grade: 'cleared', counts: false, why: CARROT }],
  ['Aloe Vera', { grade: 'cleared', counts: false, why: ALOE }],
  ['Aloe vera (as Aloe barbadensis)', { grade: 'cleared', counts: false, why: ALOE }],
  ['L-Carnitine Tartrate', { grade: 'cleared', counts: false, why: CARNITINE }],
  ['Sodium Copper Chlorophyllin Compex', { grade: 'cleared', counts: false, why: CHLOROPHYLLIN }],
  ['Palm Leaf Glaze, Natural', { grade: 'limited', counts: true, why: PALM }],
  ['natural Palm leaf glaze', { grade: 'limited', counts: true, why: PALM }],
];

const BY_KEY = new Map<string, Lock>();
for (const [name, lock] of LOCKS) {
  const key = t240uNorm(name);
  const prior = BY_KEY.get(key);
  if (prior && (prior.why !== lock.why || prior.grade !== lock.grade || prior.counts !== lock.counts)) {
    throw new Error(`t354u duplicate ${name}`);
  }
  BY_KEY.set(key, lock);
}

function carnitineTartrate(name: string): boolean {
  const key = t240uNorm(name);
  return key === 'l carnitine tartrate' || key === 'l carnitine as l carnitine tartrate';
}

export function t354uResolve(name: string, form?: string): T320uHit | undefined {
  if (carnitineTartrate(name)) {
    return { lock: { grade: 'cleared', counts: false, why: CARNITINE }, mark: 't354u' };
  }
  const own = BY_KEY.get(t240uNorm(name));
  if (own) return { lock: own, mark: 't354u' };
  return t352uResolve(name, form);
}

for (const [name, lock] of LOCKS) {
  const hit = t354uResolve(name, 'gummy');
  if (hit?.mark !== 't354u' || hit.lock.why !== lock.why || hit.lock.grade !== lock.grade || hit.lock.counts !== lock.counts) {
    throw new Error(`t354u ${name}`);
  }
}
const carnitineAs = t354uResolve('L-Carnitine (as L-Carnitine Tartrate)', 'gummy');
if (carnitineAs?.mark !== 't354u' || carnitineAs.lock.why !== CARNITINE || carnitineAs.lock.counts) {
  throw new Error('t354u carnitine as tartrate');
}
if (t354uResolve('L-Carnitine (as L-Carnitine L-Tartrate)', 'gummy')?.mark === 't354u') {
  throw new Error('t354u l-tartrate');
}
if (t354uResolve('L-Carnitine', 'gummy')?.mark === 't354u') throw new Error('t354u bare carnitine');
if (t354uResolve('Rice, Powder', 'tablet')?.mark === 't354u') throw new Error('t354u rice');
if (t354uResolve('Rice Powder', 'tablet')?.mark === 't354u') throw new Error('t354u rice powder');
const chlorophyllin = t354uResolve('Sodium Copper Chlorophyllin', 'gummy');
if (chlorophyllin?.mark === 't354u' || chlorophyllin?.lock.why === CHLOROPHYLLIN) throw new Error('t354u chlorophyllin');
if (t354uResolve('Chlorophyll (as Sodium Copper Chlorophyllin)', 'liquid')?.mark === 't354u') {
  throw new Error('t354u chlorophyll as');
}
if (t354uResolve('Ashwagandha powder', 'capsule')?.mark === 't354u') throw new Error('t354u ashwagandha powder');
if (t354uResolve('Ashwagandha extract', 'capsule')?.mark === 't354u') throw new Error('t354u ashwagandha extract');
if (t354uResolve('Aloe vera gel', 'softgel')?.mark === 't354u') throw new Error('t354u aloe gel');
if (t354uResolve('Palm Leaf Glaze', 'gummy')?.mark === 't354u') throw new Error('t354u bare palm');
