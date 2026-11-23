import type { T320uHit } from './t320uLocks';
import { t407uResolve } from './t407uLocks';

type Lock = { grade: 'cleared' | 'limited' | 'moderate' | 'high'; counts: boolean; why: string };

const BLANKET = '[Named plant extract, powder, oil, mineral, or nutrient]. It is included for its plant or nutrient compounds.';
const NECTAR = 'Organic evaporated coconut nectar is a processed sweetener from coconut. It is used as a sweetener. Coconut nectar is graded Limited as a processed sweetener (FDA and EFSA treat refined nectars as processed ingredients).';
const FLAX = 'Organic flax seed glycerin is glycerin from flax seeds. It is used as a humectant. Flax seed glycerin is graded Limited as a processed glycerin (FDA 21 CFR 182.1320).';
const WAX = 'Vegetable waxes are refined plant waxes. They are used as a coating. Vegetable waxes are graded Limited as processed waxes (FDA 21 CFR 172.615).';

/** Exact Cymbiotika strings. Other brands do not take this blanket. */
const BLANKET_NAMES = [
  'Sceletium tortuosum (aerial parts) Extract (Zembrin)',
  'Organic Clove Powder',
  'Organic Cardamom Powder',
  'Fulvic Acid',
  'Organic Blackberry Extract',
  'Organic Raspberry Extract',
  'GIVOMAG Magnesium Glycerophosphate',
  'Magnesium Taurinate',
  'Organic Irish Sea Moss Powder',
  'Organic Inner Leaf Aloe Vera Gel Powder',
  'Fulvic trace mineral complex (as Rejen)',
  'Organic Lemon Extract',
  'Olive (Whole Fruit) Fractionated Oil',
  'Thyme (Aerial) Essence Oil',
  'Clove (Flower Bud) Essence Oil',
  'Oregano (Leaf) Essence Oil',
  'Ginger (Root) Conc. Ext.',
  'Grapefruit (Seed) Conc. Ext.',
  'Wormwood (Stem & Leaf) Conc. Ext.',
  'Silicate Minerals',
  'Niacin (as Nicotinamide)',
  'Moringa oleifera Leaf Powder (Organic)',
  'Cinnamon (Cinnamomum verum) Bark Powder (Organic)',
  'Gymnema sylvestre Leaf Extract',
  'Dandelion Root Extract',
  'Coffee (Coffea arabica) Bean Extract',
  'King Trumpet Mushroom powder',
  'Himalayan Sea Salt',
  'organic Cacao extract',
  'Orange Fruit Juice Concentrate, Powder',
  'Lime Fruit Juice Concentrate, Powder',
  'Vanilla Extract Concentrate',
  'Vitamin B3',
  'Ginger Root Extract Concentrate',
  'Tart Cherry Fruit Extract Concentrate',
  'Frankincense Gum Extract Concentrate',
  'organic Guava extract',
  'organic Moringa extract',
  'organic Turmeric juice freeze dried powder',
  'organic Lemon Myrtle oil',
  'organic Lavender oil',
  'organic cold pressed Sunflower Oil',
  'organic Orange peel Oil',
  'organic cold pressed Black Seed Oil',
  'organic Red Yeast Rice extract',
  'organic Maple extract',
];

const LIMITED: Array<[string, string]> = [
  ['Organic Evaporated Coconut Nectar', NECTAR],
  ['organic Flax Seed Glycerin', FLAX],
  ['Vegetable Waxes', WAX],
];

/** Isolated compounds and bare names that are not a plant extract, powder, oil, mineral, or nutrient. */
export const T409U_HOLDS = [
  'Huperzine A (from Huperzia serrata, whole plant)',
  'Phosphatides (from Sunflower Lecithin)',
  'Monolaurin (Coconut Fruit) Fatty Acid Glyceride',
  'Ellagic Acid',
  'Baicalein',
  'Luteolin',
  'Oleoylethanolamide (OEA)',
  'EGCG',
  'Palmitoylethanolamide',
  'Nobiletin',
  'Tangeretin',
  'Piperine',
  'Lavender',
  'Rose Geranium',
  'organic Vanilla',
];

function keyOf(name: string): string {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
}

const BY_KEY = new Map<string, Lock>();
for (const name of BLANKET_NAMES) {
  const key = keyOf(name);
  if (BY_KEY.has(key)) throw new Error(`t409u duplicate ${name}`);
  const forms = name === 'Oregano (Leaf) Essence Oil' ? ['liquid', 'capsule'] : ['liquid', 'softgel', 'capsule'];
  for (const form of forms) {
    if (t407uResolve(name, form)) throw new Error(`t409u conflict ${name} ${form}`);
  }
  BY_KEY.set(key, { grade: 'cleared', counts: false, why: BLANKET });
}
for (const [name, why] of LIMITED) {
  const key = keyOf(name);
  if (BY_KEY.has(key)) throw new Error(`t409u duplicate ${name}`);
  if (t407uResolve(name, 'liquid') || t407uResolve(name, 'softgel')) throw new Error(`t409u conflict ${name}`);
  BY_KEY.set(key, { grade: 'limited', counts: true, why });
}

function isOreganoEssence(name: string): boolean {
  return keyOf(name) === 'oregano leaf essence oil';
}

/** Cymbiotika exact strings only. A prior lock wins. Other brands are not restamped. */
export function t409uResolve(name: string, form?: string): T320uHit | undefined {
  if (isOreganoEssence(name)) {
    const prior = t407uResolve(name, form);
    if (prior) return prior;
  }
  const exact = BY_KEY.get(keyOf(name));
  if (exact) return { lock: exact, mark: 't409u' };
  return t407uResolve(name, form);
}

if (BLANKET !== '[Named plant extract, powder, oil, mineral, or nutrient]. It is included for its plant or nutrient compounds.') {
  throw new Error('t409u placeholder');
}
if (BLANKET_NAMES.length !== 46) throw new Error('t409u blanket count');
if (T409U_HOLDS.length !== 15) throw new Error('t409u hold count');
for (const name of BLANKET_NAMES) {
  const form = name === 'Oregano (Leaf) Essence Oil' ? 'capsule' : 'liquid';
  const hit = t409uResolve(name, form);
  if (hit?.mark !== 't409u' || hit.lock.grade !== 'cleared' || hit.lock.counts || hit.lock.why !== BLANKET) {
    throw new Error(`t409u blanket ${name}`);
  }
}
for (const [name, why] of LIMITED) {
  const hit = t409uResolve(name, 'liquid');
  if (hit?.mark !== 't409u' || hit.lock.grade !== 'limited' || !hit.lock.counts || hit.lock.why !== why) {
    throw new Error(`t409u limited ${name}`);
  }
}
for (const name of T409U_HOLDS) {
  if (t409uResolve(name, 'liquid')?.mark === 't409u') throw new Error(`t409u held ${name}`);
}
const oreganoFill = t409uResolve('Oregano (Leaf) Essence Oil', 'softgel');
if (oreganoFill?.mark === 't409u' || oreganoFill?.lock.grade !== 'moderate') throw new Error('t409u oregano fill');
if (t409uResolve('Coconut Nectar', 'liquid')?.mark === 't409u') throw new Error('t409u coconut nectar');
if (t409uResolve('Organic Coconut Nectar', 'liquid')?.mark === 't409u') throw new Error('t409u organic nectar');
if (t409uResolve('Cocoa Extract', 'liquid')?.mark === 't409u') throw new Error('t409u cocoa');
if (t409uResolve('organic Cocoa Extract', 'liquid')?.mark === 't409u') throw new Error('t409u organic cocoa');
if (t409uResolve('Black Seed Oil', 'liquid')?.mark === 't409u') throw new Error('t409u black seed');
if (t409uResolve('Orange Oil', 'liquid')?.mark === 't409u') throw new Error('t409u orange oil');
if (t409uResolve('Vanilla Extract', 'liquid')?.mark === 't409u') throw new Error('t409u vanilla');
if (t409uResolve('Ginger Root Extract', 'liquid')?.mark === 't409u') throw new Error('t409u ginger root');
if (t409uResolve('Red Yeast Rice', 'liquid')?.mark === 't409u') throw new Error('t409u red yeast');
if (t409uResolve('Glycerin', 'liquid')?.mark === 't409u') throw new Error('t409u glycerin');
