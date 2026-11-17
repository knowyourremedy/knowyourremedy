import { t240uNorm } from './t240uLocks';

type Lock = { grade: 'cleared' | 'limited'; counts: boolean; why: string };

function plant(name: string): string {
  return `${name}. It is included for its plant compounds.`;
}

function plantOrNutrient(name: string): string {
  return `${name}. It is included for its plant or nutrient compounds.`;
}

const LOCKS: Array<[string, Lock]> = [
  ['Casein Hydrolysate (dairy-based)', {
    grade: 'limited',
    counts: true,
    why: 'Casein hydrolysate is a partially broken-down milk protein. It is included as a protein source. Casein hydrolysate is graded Limited as a processed dairy protein (FDA and EFSA treat hydrolyzed milk proteins as refined ingredients).',
  }],
  ['Thyroid Glandular Powder', {
    grade: 'limited',
    counts: true,
    why: 'Thyroid glandular powder is dried thyroid tissue. It is included for its glandular compounds. Thyroid glandular is graded Limited as an animal-derived ingredient (FDA guidance on glandulars).',
  }],
  ['RYR-VA™ Red Yeast Rice', {
    grade: 'limited',
    counts: true,
    why: 'Red yeast rice is a fermented rice product. It is included for its plant compounds. Red yeast rice is graded Limited because of potential monacolin content (FDA warning on red yeast rice).',
  }],
  ['Lindera aggregata root', { grade: 'cleared', counts: false, why: plant('Lindera aggregata root') }],
  ['Horsetail (Equisetum arvense) aerial parts', { grade: 'cleared', counts: false, why: plant('Horsetail (Equisetum arvense) aerial parts') }],
  ['Cratevox™ (Varuna, Crateva nurvala) stem bark', { grade: 'cleared', counts: false, why: plant('Cratevox™ (Varuna, Crateva nurvala) stem bark') }],
  ['Pumpkin Seed Extract (4:1)', { grade: 'cleared', counts: false, why: plant('Pumpkin Seed Extract (4:1)') }],
  ['Goji Berry Extract 40%', { grade: 'cleared', counts: false, why: plantOrNutrient('Goji Berry Extract 40%') }],
  ['Resveratrol 50%', { grade: 'cleared', counts: false, why: plantOrNutrient('Resveratrol 50%') }],
  ['Cognizin® Citicoline', { grade: 'cleared', counts: false, why: plantOrNutrient('Cognizin® Citicoline') }],
  ['Camu Camu Juice Powder (20% Vitamin C)', { grade: 'cleared', counts: false, why: plantOrNutrient('Camu Camu Juice Powder (20% Vitamin C)') }],
  ['Organic Acai Freeze-Dried Fresh Powder', { grade: 'cleared', counts: false, why: plantOrNutrient('Organic Acai Freeze-Dried Fresh Powder') }],
  ['Goji Berry Extract (40% Polysaccharides)', { grade: 'cleared', counts: false, why: plantOrNutrient('Goji Berry Extract (40% Polysaccharides)') }],
  ['Mangosteen Hull Extract 6:1', { grade: 'cleared', counts: false, why: plantOrNutrient('Mangosteen Hull Extract 6:1') }],
  ['Lutein', { grade: 'cleared', counts: false, why: plantOrNutrient('Lutein') }],
  ['European Bilberry Extract', { grade: 'cleared', counts: false, why: plantOrNutrient('European Bilberry Extract') }],
  ['Zeaxanthin', { grade: 'cleared', counts: false, why: plantOrNutrient('Zeaxanthin') }],
  ['Astaxanthin', { grade: 'cleared', counts: false, why: plantOrNutrient('Astaxanthin') }],
];

/** Founder-named prints. Each points at a base string that is already locked on MAIN. Not a new lock. */
const ALIAS: Array<[string, string]> = [
  ['Camu Camu Juice Powder (Myrciaria dubia) (20% Vitamin C) (Each serving has 200mg of Vitamin C)', 'Camu Camu Juice Powder'],
  ['Vitamin E (from Sunflower-based D-Alpha Tocopherol) (60 IU)', 'Vitamin E (from Sunflower-based D-Alpha Tocopherol)'],
  ['Vitamin E (from Sunflower-based D-Alpha Tocopherol) (15 IU)', 'Vitamin E (from Sunflower-based D-Alpha Tocopherol)'],
  ['Folate (as L-5-Methyltetrahydrofolate Calcium)', 'Folate'],
  ['Coenzyme Q10 (ubiquinone)', 'CoenzymeQ10 (Ubiquinone)'],
  ['Beta-Carotene (1000 IU)', 'Beta-Carotene'],
  ['Riboflavin (as Riboflavin 5-Phosphate)', 'Riboflavin'],
];

const BY_KEY = new Map<string, Lock>(LOCKS.map(([name, lock]) => [t240uNorm(name), lock]));
const ALIAS_KEY = new Map<string, string>(ALIAS.map(([printed, base]) => [t240uNorm(printed), base]));

/** Exact new strings. Limited ones count. Cleared ones do not. */
export function t314uLock(name: string): Lock | undefined {
  return BY_KEY.get(t240uNorm(name));
}

/** Base string for a founder-named variant. The base must already be locked. */
export function t314uAlias(name: string): string | undefined {
  return ALIAS_KEY.get(t240uNorm(name));
}

if (BY_KEY.size !== LOCKS.length) throw new Error('t314u duplicate');
if (ALIAS_KEY.size !== ALIAS.length) throw new Error('t314u alias duplicate');
for (const [name, lock] of LOCKS) {
  const hit = t314uLock(name);
  if (!hit || hit.why !== lock.why || hit.grade !== lock.grade || hit.counts !== lock.counts) throw new Error(`t314u ${name}`);
  if (lock.grade === 'limited' && lock.counts !== true) throw new Error(`t314u count ${name}`);
  if (lock.grade === 'cleared' && lock.counts !== false) throw new Error(`t314u clear ${name}`);
}
for (const [printed, base] of ALIAS) {
  if (t314uAlias(printed) !== base) throw new Error(`t314u alias ${printed}`);
  if (t314uLock(printed)) throw new Error(`t314u alias locked ${printed}`);
}
if (t314uLock("Vitamin D3 (from 2,500 IU's)")) throw new Error('t314u d3');
if (t314uAlias('Meriva® Phytosome Turmeric Root Extract')) throw new Error('t314u phytosome');
if (t314uAlias('Iodine (Potassium Iodide)')) throw new Error('t314u iodine');
if (t314uAlias('Selenium (SelenoExcell®)')) throw new Error('t314u selenium');
