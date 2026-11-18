import { t240uNorm } from './t240uLocks';
import { t299uLock } from './t299uLocks';
import type { T320uHit } from './t320uLocks';
import { t354uResolve } from './t354uLocks';

type Lock = { grade: 'cleared' | 'limited'; counts: boolean; why: string };

const RICE = 'Rice powder is a simple rice filler. It is not rice flour or an unnamed rice extract.';
const COD = 'Norwegian cod liver oil is oil from cod liver. It is used as a fill in the softgel. Cod liver oil is graded Caution as a fill and Limited or Avoid when it is the base of the product (EFSA and FDA treat refined fish oils as distinct from whole-food oils).';
const CHLOR = 'Chlorophyll as sodium copper chlorophyllin is a copper complex of chlorophyll. It is used as a color.';
const CAPSULE = 'Capsule is the shell that holds the ingredients.';
const TOCOPHEROL = 'D-alpha-tocopheryl acetate is a form of vitamin E. It is included as a source of vitamin E.';
const CARNITINE = 'L-carnitine L-tartrate is a salt form of the amino acid carnitine. It is included for its amino acid content.';
const SALT = 'Sodium chloride is salt. It is used as a filler.';
const VITAMIN_A = 'Vitamin A as cod liver oil and retinyl palmitate is a form of vitamin A. It is included as a source of vitamin A.';
const WAX = 'White beeswax is wax from bees. It is used as a coating or base.';
const STEVIOSIDE = 'Stevioside is a stevia glycoside. It is used as a sweetener. Stevioside is graded Limited as a purified extract (EFSA 2010 re-evaluation of steviol glycosides).';
const RED_YEAST = 'Red yeast rice is a fermented rice product. It is included for its plant compounds. Red yeast rice is graded Limited because of potential monacolin content (FDA warning on red yeast rice).';

function plant(name: string): string {
  return `${name}. It is included for its plant compounds.`;
}
function color(name: string): string {
  return `${name}. It is used to color the product.`;
}
function vitamin(name: string): string {
  return `${name}. It is included as a source of that vitamin.`;
}
function cleared(why: string): Lock {
  return { grade: 'cleared', counts: false, why };
}
function limited(why: string): Lock {
  return { grade: 'limited', counts: true, why };
}

const GINSENG = [
  'American Ginseng Root Extract (as Ginsenosides)',
  'Korean Ginseng Root Extract (as Ginsenosides)',
  'Manchurian Ginseng',
  'Red Chinese Ginseng',
];
const COLORS = ['Annatto Color', 'Red Radish Color'];
const FRUIT = ['Apple fruit Extract', 'Apple juice concentrate', 'Raspberry juice concentrate', 'Tart Cherry'];
const PLANTS = ['Barley Grass', 'Chlorella', 'Lemon Balm', 'Pygeum', 'Spinach whole plant Extract', 'Spirulina', 'Stinging Nettle', 'Wheat Grass'];
const EXTRACTS = [
  'Berberine Hydrochloride (as Barberry extract)',
  'Black Pepper fruit extract (as Piperine)',
  'Cabbage leaf Extract',
  'Celery Juice, Powder',
  'Citrus Bioflavonoid Complex',
  'Saw Palmetto Whole Berry Extract',
  'Tribulus terrestris Fruit Extract',
];
const VITAMINS = ["Niacin (as Brewer's Yeast, Niacinamide)", 'Vitamin B12 (as Brewer\'s Yeast, Cyanocobalamin)'];

const LOCKS: Array<[string, Lock]> = [
  ...GINSENG.map((name): [string, Lock] => [name, cleared(plant(name))]),
  ...COLORS.map((name): [string, Lock] => [name, cleared(color(name))]),
  ...FRUIT.map((name): [string, Lock] => [name, cleared(plant(name))]),
  ...PLANTS.map((name): [string, Lock] => [name, cleared(plant(name))]),
  ...EXTRACTS.map((name): [string, Lock] => [name, cleared(plant(name))]),
  ...VITAMINS.map((name): [string, Lock] => [name, cleared(vitamin(name))]),
  ['Capsule', cleared(CAPSULE)],
  ['D-Alpha-Tocopheryl Acetate', cleared(TOCOPHEROL)],
  ['L-Carnitine (as L-Carnitine L-Tartrate)', cleared(CARNITINE)],
  ['Sodium Chloride', cleared(SALT)],
  ['Vitamin A (as Cod Liver Oil, Retinyl Palmitate)', cleared(VITAMIN_A)],
  ['White Beeswax', cleared(WAX)],
  ['Stevioside', limited(STEVIOSIDE)],
  ['Red Yeast Rice', limited(RED_YEAST)],
];

const BY_KEY = new Map<string, Lock>();
for (const [name, lock] of LOCKS) {
  const key = t240uNorm(name);
  const prior = BY_KEY.get(key);
  if (prior) throw new Error(`t355u duplicate ${name}`);
  BY_KEY.set(key, lock);
}

const ALIAS = new Map<string, string>([
  ['lemon balm as melissa officinalis', 'Lemon Balm'],
  ['citrus bioflavonoid complex as citrus spp', 'Citrus Bioflavonoid Complex'],
  ['saw palmetto whole berry extract as serenoa repens whole berry extract', 'Saw Palmetto Whole Berry Extract'],
]);

export function t355uResolve(name: string, form?: string): T320uHit | undefined {
  if (t240uNorm(name) === 'rice powder') {
    return { lock: { grade: 'cleared', counts: false, why: RICE }, mark: 't157u' };
  }
  if (t240uNorm(name) === 'norwegian cod liver oil') {
    const text = (form ?? '').toLowerCase();
    if (/\bbase\b/.test(text) || !/\bsoftgel\b/.test(text)) return undefined;
    return { lock: { grade: 'cleared', counts: false, why: COD }, mark: 't355u' };
  }
  if (t240uNorm(name) === 'chlorophyll as sodium copper chlorophyllin') {
    const prior = t354uResolve(name, form);
    if (prior?.lock.why) return prior;
    return { lock: { grade: 'cleared', counts: false, why: CHLOR }, mark: 't355u' };
  }
  const aliased = ALIAS.get(t240uNorm(name));
  const own = BY_KEY.get(t240uNorm(aliased ?? name));
  if (own) return { lock: own, mark: 't355u' };
  const latin = name.match(/^(.*?)\s*\(as\s+([A-Z][a-z]+ [a-z]+)\)\s*$/);
  if (latin) {
    const hit = t354uResolve(latin[1].trim(), form);
    if (hit?.lock.why) return hit;
  }
  return t354uResolve(name, form);
}

for (const [name, lock] of LOCKS) {
  const hit = t355uResolve(name, 'softgel');
  if (hit?.mark !== 't355u' || hit.lock.why !== lock.why || hit.lock.grade !== lock.grade || hit.lock.counts !== lock.counts) {
    throw new Error(`t355u ${name}`);
  }
}
const rice = t355uResolve('Rice, Powder', 'capsule');
if (rice?.mark !== 't157u' || rice.lock.grade !== 'cleared' || rice.lock.counts || rice.lock.why !== RICE) {
  throw new Error('t355u rice');
}
const renew = t299uLock('Rice Powder');
if (renew?.grade !== 'limited' || !renew.counts || !renew.why.startsWith('Rice powder. It is used as a filler.')) {
  throw new Error('t355u renew life rice');
}
if (t355uResolve('Lemon Balm (as Melissa officinalis)', 'gummy')?.lock.why !== plant('Lemon Balm')) {
  throw new Error('t355u lemon balm');
}
if (t355uResolve('Citrus Bioflavonoid Complex (as Citrus spp.)', 'tablet')?.lock.why !== plant('Citrus Bioflavonoid Complex')) {
  throw new Error('t355u citrus');
}
if (t355uResolve('Saw Palmetto Whole Berry Extract (as Serenoa repens Whole Berry Extract)', 'capsule')?.lock.why !== plant('Saw Palmetto Whole Berry Extract')) {
  throw new Error('t355u saw palmetto extract');
}
if (t355uResolve('Tribulus terrestris Fruit Extract (as Saponins)', 'capsule')?.mark === 't355u') {
  throw new Error('t355u tribulus saponins');
}
const rose = t355uResolve('Rose Hip (as Rosa canina)', 'tablet');
if (rose?.mark === 't355u' || !rose?.lock.why) throw new Error('t355u rose hip');
const saw = t355uResolve('Saw Palmetto (as Serenoa repens)', 'capsule');
if (saw?.mark === 't355u' || !saw?.lock.why) throw new Error('t355u saw palmetto latin');
if (t355uResolve('Citrus Bioflavonoids Complex', 'tablet')?.mark === 't355u') throw new Error('t355u citrus plural');
if (t355uResolve('Saw Palmetto', 'capsule')?.mark === 't355u') throw new Error('t355u saw palmetto');
if (t355uResolve('Red Yeast Rice (Powder)', 'capsule')?.mark === 't355u') throw new Error('t355u red yeast powder');
if (t355uResolve('Spirulina extract', 'capsule')?.mark === 't355u') throw new Error('t355u spirulina extract');
if (t355uResolve('Yellow Beeswax', 'softgel')?.mark === 't355u') throw new Error('t355u yellow beeswax');
if (t355uResolve('Stevia', 'gummy')?.mark === 't355u') throw new Error('t355u stevia');
if (t355uResolve('L-Carnitine Tartrate', 'capsule')?.mark === 't355u') throw new Error('t355u carnitine tartrate');
if (t355uResolve('Sodium Copper Chlorophyllin', 'gummy')?.mark === 't355u') throw new Error('t355u chlorophyllin');
const filled = t355uResolve('Chlorophyll (as Sodium Copper Chlorophyllin)', 'liquid');
if (filled?.mark !== 't355u' || filled.lock.grade !== 'cleared' || filled.lock.counts || filled.lock.why !== CHLOR) {
  throw new Error('t355u chlorophyll');
}
if (t355uResolve('Norwegian Cod Liver Oil', 'softgel base')) throw new Error('t355u cod base');
const codFill = t355uResolve('Norwegian Cod Liver Oil', 'softgel');
if (codFill?.mark !== 't355u' || codFill.lock.grade !== 'cleared' || codFill.lock.counts || codFill.lock.why !== COD) {
  throw new Error('t355u cod fill');
}
if (t355uResolve('Norwegian Cod Liver Oil', 'capsule')) throw new Error('t355u cod capsule');
