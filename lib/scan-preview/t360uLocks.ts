import { t240uNorm } from './t240uLocks';
import type { T320uHit } from './t320uLocks';
import { t358uResolve } from './t358uLocks';
import { t359uResolve } from './t359uLocks';

type Lock = { grade: 'cleared' | 'limited'; counts: boolean; why: string };

const FLAX_BASE = 'Cold pressed organic flaxseed oil is oil from flaxseeds. It is the base of this liquid. Flaxseed oil is graded Limited when it is the base of the product and Caution when it is only a fill (EFSA and FDA treat refined seed oils as distinct from whole-food oils).';

function plant(name: string): string {
  return `${name}. It is included for its plant or nutrient compounds.`;
}
function carotenoid(name: string): string {
  return `${name}. It is included for its plant compounds.`;
}

const CAROTENOIDS = ['Alpha-Carotene', 'Cryptoxanthin'];

const BLANKET = [
  'Affron (as Saffron Stigma Extract)',
  'Beta Glucans (as Beta 1-3 Glucan, Beta 1-6 Glucans, Yeast cell wall extract)',
  'ERr 731 (as Rhapontic Rhubarb Root Extract)',
  'L-Carnitine',
  'Niacin (as Niacin, Niacinamide, Vitamin B3)',
  'organic Red Reishi Mushroom extract',
  'organic Red Reishi Mushroom extract (as Beta-Glucans, Triterpenoids)',
  'Pantothenic Acid (as Calcium D-Pantothenate, Pantethine, Vitamin B5)',
  'Policosanol',
  'Potassium Iodide',
  'Pycnogenol',
  'Pycnogenol extract',
  'Pyridoxal 5-Phosphate',
  'Riboflavin 5-Phosphate',
  'total Soy Isoflavones (as Soy germ extract)',
  'Vitamin A (as Beta-Carotene, Retinyl Palmitate)',
  'Vitamin B6 (as Pyridoxal 5-Phosphate, Pyridoxine Hydrochloride)',
  'Vitamin C (as Ester-C)',
];

const BY_KEY = new Map<string, Lock>();
for (const name of CAROTENOIDS) {
  BY_KEY.set(t240uNorm(name), { grade: 'cleared', counts: false, why: carotenoid(name) });
}
for (const name of BLANKET) {
  BY_KEY.set(t240uNorm(name), { grade: 'cleared', counts: false, why: plant(name) });
}

const GINKGO = new Set([
  'ginkgo biloba extract as ginkgoflavoglycosides',
  'standardized ginkgo biloba extract as ginkgo flavonol glycosides',
  'ginkgo biloba leaf extract',
  'ginkgo biloba powder',
]);

function equivalence(name: string, form?: string): T320uHit | undefined {
  const key = t240uNorm(name);
  if (GINKGO.has(key)) return t358uResolve('Ginkgo extract', form);
  if (key === 'l glutamic acid') return t358uResolve('Glutamic Acid', form);
  if (key === 'rose hips extract' || key === 'rose hips powder') return t358uResolve('Rose Hips', form);
  if (key === 'royal jelly concentrate') return t358uResolve('Royal Jelly', form);
  if (key === 'soy protein isolate') return t358uResolve('Soy Protein', form);
  if (key === 'niacin as nicotinic acid') return t358uResolve('Niacin', form);
  return undefined;
}

export function t360uResolve(name: string, form?: string): T320uHit | undefined {
  if (t240uNorm(name) === 'cold pressed organic flaxseed oil') {
    const text = (form ?? '').toLowerCase();
    if (/\bliquid\b/.test(text) && /\bbase\b/.test(text)) {
      return { lock: { grade: 'limited', counts: true, why: FLAX_BASE }, mark: 't360u' };
    }
  }
  const own = BY_KEY.get(t240uNorm(name));
  if (own) return { lock: own, mark: 't360u' };
  const aliased = equivalence(name, form);
  if (aliased?.lock.why) return aliased;
  return t359uResolve(name, form);
}

for (const name of CAROTENOIDS) {
  const hit = t360uResolve(name, 'capsule');
  if (hit?.mark !== 't360u' || hit.lock.why !== carotenoid(name) || hit.lock.grade !== 'cleared' || hit.lock.counts) {
    throw new Error(`t360u carotenoid ${name}`);
  }
}
for (const name of BLANKET) {
  const hit = t360uResolve(name, 'capsule');
  if (hit?.mark !== 't360u' || hit.lock.why !== plant(name) || hit.lock.grade !== 'cleared' || hit.lock.counts) {
    throw new Error(`t360u blanket ${name}`);
  }
}
const beta = t360uResolve('Beta-Carotene', 'capsule');
if (beta?.mark === 't360u' || beta?.lock.grade !== 'limited' || !beta?.lock.counts) throw new Error('t360u beta carotene');
const vitaminA = t360uResolve('Vitamin A (as Beta-Carotene)', 'capsule');
if (vitaminA?.mark === 't360u' || vitaminA?.lock.grade !== 'cleared') throw new Error('t360u vitamin a beta');
const ginkgo = t360uResolve('Ginkgo biloba extract (as Ginkgoflavoglycosides)', 'capsule');
if (!ginkgo?.lock.why || ginkgo.lock.grade !== 'cleared' || t240uNorm('Ginkgo extract') === '' ) throw new Error('t360u ginkgo');
if (t360uResolve('Ginkgo extract', 'capsule')?.mark === 't360u') throw new Error('t360u ginkgo extract overwritten');
if (t360uResolve('Ginkgo biloba powder', 'capsule')?.lock.why !== t358uResolve('Ginkgo extract')?.lock.why) throw new Error('t360u ginkgo powder');
if (t360uResolve('L-Glutamic Acid', 'tablet')?.lock.why !== t358uResolve('Glutamic Acid')?.lock.why) throw new Error('t360u glutamic');
if (t360uResolve('Rose Hips extract', 'capsule')?.lock.why !== t358uResolve('Rose Hips')?.lock.why) throw new Error('t360u rose extract');
if (t360uResolve('Rose Hips powder', 'capsule')?.lock.why !== t358uResolve('Rose Hips')?.lock.why) throw new Error('t360u rose powder');
if (t360uResolve('Royal Jelly concentrate', 'softgel')?.lock.grade !== 'limited') throw new Error('t360u royal jelly');
if (t360uResolve('Soy Protein isolate', 'tablet')?.lock.why !== t358uResolve('Soy Protein')?.lock.why) throw new Error('t360u soy');
if (t360uResolve('Niacin (as Nicotinic Acid)', 'capsule')?.lock.why !== t358uResolve('Niacin')?.lock.why) throw new Error('t360u niacin');
if (t360uResolve('Carnitine', 'tablet')) throw new Error('t360u carnitine exists');
const flax = t360uResolve('cold pressed organic Flaxseed Oil', 'liquid base');
if (flax?.mark !== 't360u' || flax.lock.grade !== 'limited' || !flax.lock.counts || flax.lock.why !== FLAX_BASE) throw new Error('t360u flax base');
const flaxFill = t360uResolve('cold pressed organic Flaxseed Oil', 'softgel');
if (flaxFill?.mark === 't360u' || flaxFill?.lock.grade !== 'cleared') throw new Error('t360u flax fill');
if (t360uResolve('organic Flaxseed Oil', 'liquid')?.mark === 't360u') throw new Error('t360u organic flax');
if (t360uResolve('Ammonium Hydroxide', 'tablet')?.mark === 't360u') throw new Error('t360u ammonia');
if (t360uResolve('Lactobacillus plantarum', 'capsule')?.mark === 't360u') throw new Error('t360u probiotic');
if (t360uResolve('natural Black Cherry flavor', 'liquid')?.mark === 't360u') throw new Error('t360u flavor');
if (t360uResolve('Omega 3-6-9 Formulation', 'softgel')?.mark === 't360u') throw new Error('t360u omega');
