import { t240uNorm } from './t240uLocks';
import { t181uWhyForName } from './t181uTokenWhy';
import type { T320uHit } from './t320uLocks';
import { t345uResolve } from './t345uLocks';

type Lock = { grade: 'cleared' | 'limited'; counts: boolean; why: string };

function cleared(why: string): Lock {
  return { grade: 'cleared', counts: false, why };
}
function nutrient(name: string): string {
  return `${name}. It is included for its nutrient or plant compounds.`;
}
function probiotic(name: string): string {
  return `${name}. It is included for its live bacteria.`;
}
function plant(name: string): string {
  return `${name}. It is included for its plant compounds.`;
}
function fiber(name: string): string {
  return `${name}. It is included as a source of fiber.`;
}
function polymer(name: string): string {
  return `${name}. It is used as a coating or filler. ${name} is graded Limited as a processed polymer or fiber (FDA 21 CFR 172).`;
}

const JUICE = 'Vegetable and fruit juice is juice from vegetables and fruit. It is included for its plant compounds.';
const BENZYL = 'Benzyl benzoate is an organic compound. It is used as a solvent.';

const LOCKS: Array<[string, Lock]> = [
  ['Allicin', cleared(nutrient('Allicin'))],
  ['Black Catechu', cleared(nutrient('Black Catechu'))],
  ['Carrot Concentrate', cleared(nutrient('Carrot Concentrate'))],
  ['Citrus Bioflavonoid', cleared(nutrient('Citrus Bioflavonoid'))],
  ['deodorized Garlic', cleared(nutrient('deodorized Garlic'))],
  ['Dehydroepiandrosterone (Pure)', cleared(nutrient('Dehydroepiandrosterone (Pure)'))],
  ['DNA', cleared(nutrient('DNA'))],
  ['Oyster extract', cleared(nutrient('Oyster extract'))],
  ['Red Yeast Rice (Powder)', cleared(nutrient('Red Yeast Rice (Powder)'))],
  ['RNA', cleared(nutrient('RNA'))],
  ['Soy Protein', cleared(nutrient('Soy Protein'))],
  ['Bifidobacterium animalis lactis', cleared(probiotic('Bifidobacterium animalis lactis'))],
  ['Bifidobacterium longum', cleared(probiotic('Bifidobacterium longum'))],
  ['Lactobacillus casei', cleared(probiotic('Lactobacillus casei'))],
  ['Lactobacillus delbrueckii', cleared(probiotic('Lactobacillus delbrueckii'))],
  ['Lactobacillus rhamnosus', cleared(probiotic('Lactobacillus rhamnosus'))],
  ['Chinese skullcap', cleared(plant('Chinese skullcap'))],
  ['Damiana', cleared(plant('Damiana'))],
  ['Dong Quai', cleared(plant('Dong Quai'))],
  ['Horsetail', cleared(plant('Horsetail'))],
  ['Nettle', cleared(plant('Nettle'))],
  ['Oat Straw', cleared(plant('Oat Straw'))],
  ['Parsley', cleared(plant('Parsley'))],
  ['Red Raspberry', cleared(plant('Red Raspberry'))],
  ['Rose Hip', cleared(plant('Rose Hip'))],
  ['Watercress', cleared(plant('Watercress'))],
  ['Polygonum cuspidatum', cleared(plant('Polygonum cuspidatum'))],
  ['Vitis vinifera', cleared(plant('Vitis vinifera'))],
  ['Psyllium', cleared(fiber('Psyllium'))],
  ['Soluble Fiber', cleared(fiber('Soluble Fiber'))],
  ['Vegetable and Fruit Juice', cleared(JUICE)],
  ['Benzyl Benzoate', cleared(BENZYL)],
  ['Palmitoleic Acid Copolymer', { grade: 'limited', counts: true, why: polymer('Palmitoleic Acid Copolymer') }],
  ['Polyethylene Glycol Copolymer', { grade: 'limited', counts: true, why: polymer('Polyethylene Glycol Copolymer') }],
  ['PVA Copolymer', { grade: 'limited', counts: true, why: polymer('PVA Copolymer') }],
  ['Sodium Carboxymethycellulose', { grade: 'limited', counts: true, why: polymer('Sodium Carboxymethycellulose') }],
  ['Sodium Carboxymethylcellulose', { grade: 'limited', counts: true, why: polymer('Sodium Carboxymethylcellulose') }],
];

const EXACT = new Map<string, Lock>();
const BY_KEY = new Map<string, Lock>();
for (const [name, lock] of LOCKS) {
  if (EXACT.has(name)) throw new Error(`t346u duplicate ${name}`);
  EXACT.set(name, lock);
  const key = t240uNorm(name);
  if (BY_KEY.has(key)) throw new Error(`t346u duplicate key ${name}`);
  BY_KEY.set(key, lock);
}

const FATTY = new Map<string, string>([
  [t240uNorm('Docosahexaenoic Acid (as Omega-3 Fatty Acids)'), 'Docosahexaenoic Acid'],
  [t240uNorm('Eicosapentaenoic Acid (as Omega-3 Fatty Acids)'), 'Eicosapentaenoic Acid'],
  [t240uNorm('Mono/Diglycerides'), 'Mono- and Diglycerides'],
]);

function withWhy(canonical: string, hit: T320uHit): T320uHit {
  if (hit.lock.why) return hit;
  const why = t181uWhyForName(canonical);
  return why ? { ...hit, lock: { ...hit.lock, why } } : hit;
}

export function t346uResolve(name: string, form?: string): T320uHit | undefined {
  const key = t240uNorm(name);
  if (key === t240uNorm('Red Wine Matrix (as Polygonum cuspidatum, Vitis vinifera)')) return undefined;
  if (key === t240uNorm('Phospholipids')) return undefined;
  if (key === t240uNorm('Maltodextrain')) return t345uResolve('Maltodextrin', form);
  if (key === t240uNorm('Medium Chain Triglyceride')) return t345uResolve(name, form);
  const fatty = FATTY.get(key);
  if (fatty) {
    const hit = t345uResolve(fatty, form);
    return hit ? withWhy(fatty, hit) : undefined;
  }
  const exact = EXACT.get(name) ?? BY_KEY.get(key);
  if (exact) return { lock: exact, mark: 't346u' };
  return t345uResolve(name, form);
}

for (const [name, lock] of LOCKS) {
  const hit = t346uResolve(name, 'tablet');
  if (hit?.mark !== 't346u' || hit.lock.why !== lock.why || hit.lock.grade !== lock.grade || hit.lock.counts !== lock.counts) {
    throw new Error(`t346u ${name}`);
  }
}
const dha = t346uResolve('Docosahexaenoic Acid (as Omega-3 Fatty Acids)', 'softgel');
if (dha?.mark !== 't341u' || dha.lock.grade !== 'cleared' || dha.lock.why !== t345uResolve('Docosahexaenoic Acid')?.lock.why) throw new Error('t346u dha');
const epa = t346uResolve('Eicosapentaenoic Acid (as Omega-3 Fatty Acids)', 'softgel');
if (epa?.mark !== 't341u' || epa.lock.grade !== 'cleared') throw new Error('t346u epa');
const mono = t346uResolve('Mono/Diglycerides', 'tablet');
if (!mono || mono.mark === 't346u' || mono.lock.grade !== 'limited' || !mono.lock.counts || mono.lock.why !== t181uWhyForName('Mono- and Diglycerides')) throw new Error('t346u mono');
const malt = t346uResolve('Maltodextrain', 'tablet');
if (!malt || malt.mark === 't346u' || malt.lock.grade !== 'limited' || !malt.lock.counts || malt.lock.why !== t345uResolve('Maltodextrin')?.lock.why) throw new Error('t346u malt');
const mct = t346uResolve('Medium Chain Triglyceride', 'softgel');
if (!mct || mct.mark === 't346u' || mct.lock.grade !== 'limited' || !mct.lock.counts) throw new Error('t346u mct');
if (t346uResolve('Phospholipids')) throw new Error('t346u phospholipids');
if (t346uResolve('Red Wine Matrix (as Polygonum cuspidatum, Vitis vinifera)')) throw new Error('t346u matrix');
if (t346uResolve('Garlic', 'tablet')?.mark === 't346u') throw new Error('t346u garlic');
if (t346uResolve('Rose Hips', 'tablet')?.mark === 't346u') throw new Error('t346u rose hips');
if (t346uResolve('Horsetail, Powder', 'tablet')?.mark === 't346u') throw new Error('t346u horsetail powder');
if (t346uResolve('Polyethylene Glycol', 'tablet')?.mark === 't346u') throw new Error('t346u peg');
if (t346uResolve('Maltodextrin', 'tablet')?.mark === 't346u') throw new Error('t346u maltodextrin');
if (t346uResolve('Dehydroepiandrosterone, Pure')?.lock.why !== t346uResolve('Dehydroepiandrosterone (Pure)')?.lock.why) throw new Error('t346u dhea print');
if (t346uResolve('Red Yeast Rice, Powder')?.lock.why !== t346uResolve('Red Yeast Rice (Powder)')?.lock.why) throw new Error('t346u ryr print');
