import { t240uNorm } from './t240uLocks';

type Lock = { grade: 'cleared'; counts: false; why: string };

function named(name: string, rest: string): string {
  return `${name}. ${rest}`;
}

const PLANT = 'It is included for its plant compounds.';
const NUTRIENT = 'It is included for its nutrient or antioxidant compounds.';
const IRON = 'It is included as a source of iron.';
const VITAMIN = 'It is included as a source of that nutrient.';

const LOCKS: Array<[string, string]> = [
  ['Albion® Magnesium Bisglycinate Chelate Buffered', 'Magnesium bisglycinate chelate buffered is magnesium bound to glycine with a buffer. It is included as a source of magnesium.'],
  ['Affron® Saffron Extract', 'Affron saffron extract is a standardized extract of saffron. It is included for its plant compounds.'],
  ['Irvingia Gabonensis Extract (seed)', 'Irvingia gabonensis extract is an extract of the African mango seed. It is included for its plant compounds.'],
  ['IGOB 131® Proprietary Extract', 'Irvingia gabonensis extract is an extract of the African mango seed. It is included for its plant compounds.'],
  ['Bergavit®40 Bergamot', named('Bergavit®40 Bergamot', PLANT)],
  ['Pomegranate Extract', named('Pomegranate Extract', PLANT)],
  ['Camu Camu Fruit', named('Camu Camu Fruit', PLANT)],
  ['Amla Fruit Extract', named('Amla Fruit Extract', PLANT)],
  ['Camu Camu Juice Powder', named('Camu Camu Juice Powder', PLANT)],
  ['PACran™ Cranberry Extract (powder)', 'Cranberry extract or powder is an extract or dried form of cranberry. It is included for its plant compounds.'],
  ['Cranberry Powder', 'Cranberry extract or powder is an extract or dried form of cranberry. It is included for its plant compounds.'],
  ['European Ginkgo Biloba Extract', named('European Ginkgo Biloba Extract', PLANT)],
  ['European Grape Seed Extract', named('European Grape Seed Extract', PLANT)],
  ['European Milk Thistle Extract', named('European Milk Thistle Extract', PLANT)],
  ['Meratrim®', named('Meratrim®', PLANT)],
  ['Garcinia Mangostana', named('Garcinia Mangostana', PLANT)],
  ['Sphaeranthus Indicus', named('Sphaeranthus Indicus', PLANT)],
  ['Vitamin E (from Sunflower-based D-Alpha Tocopherol)', named('Vitamin E (from Sunflower-based D-Alpha Tocopherol)', NUTRIENT)],
  ['CoenzymeQ10 (Ubiquinone)', named('CoenzymeQ10 (Ubiquinone)', NUTRIENT)],
  ['Iron', named('Iron', IRON)],
  ['Ferrochel® Ferrous Bisglycinate Chelate', named('Ferrochel® Ferrous Bisglycinate Chelate', IRON)],
  ['Meriva® Turmeric Root Extract', 'Meriva turmeric root extract is a curcumin phytosome. It is included for its plant compounds.'],
  ['Vitamin A (from Palmitate)', named('Vitamin A (from Palmitate)', VITAMIN)],
  ['Biotin', named('Biotin', VITAMIN)],
  ['Iodine (as Potassium Iodide)', named('Iodine (as Potassium Iodide)', VITAMIN)],
  ['Lutein (from Marigold flower)', named('Lutein (from Marigold flower)', VITAMIN)],
];

/** Founder-named prints. Each points at a base string that is already locked. Not a new lock. */
const ALIAS: Array<[string, string]> = [
  ['Bitter Melon Fruit Extract (4:1) (Powder)', 'Bitter Melon Fruit Extract'],
  ['Bitter Melon Fruit Extract (4:1) (Powder) (Momordica Charantia)', 'Bitter Melon Fruit Extract'],
  ["Vitamin D3 (from 2,500 IU's)", 'Vitamin D3'],
  ['RedOrange Complex™ (BIONAP) (Citrus sinensis) (juice)', 'RedOrange Complex™'],
  ['Liposomal NMN™ (nicotinamide mononucleotide)', 'Liposomal NMN™'],
  ['OptiMSM® (MSM) Methylsulfonylmethane', 'MSM (Methylsulfonylmethane)'],
  ['Bromelain (2,400 GDU)', 'Bromelain'],
];

const BY_KEY = new Map<string, Lock>(LOCKS.map(([name, why]) => [t240uNorm(name), { grade: 'cleared', counts: false, why }]));
const ALIAS_KEY = new Map<string, string>(ALIAS.map(([printed, base]) => [t240uNorm(printed), base]));

/** Exact new strings. Cleared. Does not stack. */
export function t312uLock(name: string): Lock | undefined {
  return BY_KEY.get(t240uNorm(name));
}

/** Base string for a founder-named variant. The base must already be locked. */
export function t312uAlias(name: string): string | undefined {
  return ALIAS_KEY.get(t240uNorm(name));
}

if (BY_KEY.size !== LOCKS.length) throw new Error('t312u duplicate');
if (ALIAS_KEY.size !== ALIAS.length) throw new Error('t312u alias duplicate');
for (const [name, why] of LOCKS) {
  const hit = t312uLock(name);
  if (hit?.why !== why || hit.grade !== 'cleared' || hit.counts !== false) throw new Error(`t312u ${name}`);
}
if (t312uLock("Vitamin D3 (from 2,500 IU's)")) throw new Error('t312u d3 lock');
if (t312uAlias('Bitter Melon Fruit Extract (4:1) (Powder)') !== 'Bitter Melon Fruit Extract') throw new Error('t312u bitter');
if (t312uAlias('Bromelain (2,400 GDU)') !== 'Bromelain') throw new Error('t312u gdu');
if (t312uAlias('OptiMSM® (MSM) Methylsulfonylmethane') !== 'MSM (Methylsulfonylmethane)') throw new Error('t312u msm');
if (t312uAlias("Vitamin D3 (from 2,500 IU's)") !== 'Vitamin D3') throw new Error('t312u d3 alias');
