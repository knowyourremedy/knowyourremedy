import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { T128U_STACK_NOTE } from './t128uTokenWhy';
import { t225uLock } from './t225uLocks';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string; kind?: 'oil' };

export const T240U_STACK_NOTE =
  'This product is Avoid because it contains three or more ingredients that are each graded Limited. When three or more Limited ingredients appear together, the product is graded Avoid.';

const NATURAL_FLAVORS =
  'Natural flavors. It adds flavor to the product. Natural flavors are graded Limited because the exact sources and processing are not fully specified on the panel (FDA 21 CFR 101.22).';
const TITANIUM =
  'Titanium dioxide color. It is a white mineral used to color the product. Titanium dioxide is graded Avoid because of nanoparticle concerns (IARC 2B possible carcinogen).';
const PECTIN = 'Pectin, a plant fiber from fruit. It is used as a gelling agent in gummies.';
const SOYBEAN =
  'Soybean oil, a seed oil. It is used as a carrier or fill. Soybean oil is graded Caution as a fill and Avoid when it is the base of a chewable (highly processed seed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).';
const CORN =
  'Corn oil, a seed oil. It is used as a carrier or fill. Corn oil is graded Caution as a fill and Avoid when it is the base of a chewable (highly processed seed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).';
const VEGETABLE =
  'Vegetable oil. It is used as a carrier or fill. Vegetable oil is graded Avoid when it is the base of a chewable and Caution as a fill (highly processed oil; form-dependent grade under current methodology).';
const RICE =
  'Rice flour. It is used as a filler. Rice flour is graded Limited as a processed rice ingredient (highly refined starch; EFSA and FDA distinguish refined rice products from whole-grain rice).';
const LEMON = 'Lemon oil, a citrus essential oil. It adds lemon flavor and aroma.';
const SUNFLOWER =
  'Sunflower seed oil, a seed oil. It is used as a carrier or fill. Sunflower seed oil is graded Caution as a fill and Avoid when it is the base of a chewable (highly processed seed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).';
const MENTHOL = 'Menthol. It adds a cooling flavor and sensation.';
const BAMBOO = 'Organic bamboo extract. It is used as a source of silica and plant compounds.';
const GUAR = 'Organic guar gum, a plant gum. It thickens and stabilizes the mixture.';
const POTATO = 'Potato starch, a plant starch. It is used as a filler and binder.';
const BEESWAX = 'Beeswax. It is used as a coating.';
const COATING =
  'Cellulose coating (or bare coating). It coats the tablet or capsule. Bare coatings are graded Limited (FDA 21 CFR 172; refined cellulose derivatives used as coatings).';
const CARAMEL =
  'Natural caramel color. It is used to color the product. Caramel color is graded Limited as a processed color (EFSA 2011 re-evaluation of caramel colours).';
const GLAZE =
  'Food glaze. It coats the product. Food glaze is graded Limited as a processed glaze (FDA 21 CFR 172.615; confectioner’s glaze is a refined shellac).';
const LACTIC =
  'Lactic acid. It is added to adjust acidity. Lactic acid is graded Limited as a processed acid (FDA 21 CFR 184.1061; produced by fermentation and purified).';
const SOY_FLOUR =
  'Organic soy flour. It is used as a filler. Soy flour is graded Limited as a processed soy ingredient (FDA and EFSA distinguish soy flour from whole soybeans).';
const FERMENT =
  'Fermentation blend. It is used as a filler. Unspecified fermentation blends are graded Limited (FDA 21 CFR 101; source and processing not fully specified).';
const MONO =
  'Acetylated monoglycerides. It is used as a coating. Acetylated monoglycerides are graded Limited as a processed fat (FDA 21 CFR 172.828).';
const ETHYL =
  'Ethylcellulose. It is used as a coating. Ethylcellulose is graded Limited as a processed cellulose (FDA 21 CFR 172.868).';
const WHEY =
  'Whey. It is used as a protein filler. Whey is graded Limited as a dairy protein (FDA 21 CFR 184.1979; purified dairy fraction).';
const EGG =
  'Pasteurized egg yolk. It is used as an emulsifier. Egg yolk is graded Limited as a processed animal ingredient (FDA and USDA treat pasteurized egg products as processed).';
const VANILLIN =
  'Vanillin. It adds vanilla flavor. Vanillin is graded Limited as a synthetic flavor (FDA 21 CFR 182.60; most commercial vanillin is synthetic).';
const STEARATE =
  'Vegetable magnesium stearate. It is a lubricant that helps the powder flow. Magnesium stearate is graded Limited (FDA 21 CFR 184.1440; purified stearate salt).';
const IRON =
  'Dried ferrous sulfate. It is the iron source. Ferrous sulfate is graded Limited as an iron salt (FDA and USP treat ferrous sulfate as a purified mineral salt).';
const COLORS =
  'Colors. It is used to color the product. Bare “colors” is graded Limited because the specific colors are not named (FDA 21 CFR 101.22 requires specific color declaration).';

function probiotic(name: string): string {
  return `${name}. It is added for its live bacteria.`;
}
function enzyme(name: string): string {
  return `${name}. It is added for its enzyme activity.`;
}
function plant(name: string): string {
  return `${name}. It is added for its plant or yeast compounds.`;
}
function vitamin(name: string): string {
  return `${name}. It is added to help keep the product stable or for its vitamin activity.`;
}
function extract(name: string): string {
  return `${name}. It adds flavor, color, or plant compounds.`;
}
function disintegrant(name: string): string {
  return `${name}. It helps the tablet or capsule break apart. ${name} is graded Limited as a synthetic disintegrant (FDA 21 CFR 182.1745 and related disintegrant listings).`;
}
function acid(name: string): string {
  return `${name}. It is added to adjust acidity or as a preservative. ${name} is graded Limited as a processed acid or salt (FDA GRAS listings for purified acids and salts).`;
}
function sugar(name: string): string {
  return `${name}. It is used as a sweetener and binder. Processed sugars are graded Limited (FDA and EFSA treat refined syrups and invert sugar as processed sweeteners).`;
}
export function t240uOilWhy(name: string): string {
  return `${name}. It is used as a carrier or fill. ${name} is graded Limited or Caution by form as a seed or processed oil (highly processed oils; EFSA and FDA treat refined oils as distinct from whole-food oils).`;
}

const FIXED = new Map<string, Omit<Lock, 'kind'>>([
  ['natural flavors', { grade: 'limited', counts: true, why: NATURAL_FLAVORS }],
  ['natural flavor', { grade: 'limited', counts: true, why: NATURAL_FLAVORS }],
  ['titanium dioxide color', { grade: 'high', counts: false, why: TITANIUM }],
  ['titanium dioxide', { grade: 'high', counts: false, why: TITANIUM }],
  ['pectin', { grade: 'cleared', counts: false, why: PECTIN }],
  ['rice flour', { grade: 'limited', counts: true, why: RICE }],
  ['lemon oil', { grade: 'cleared', counts: false, why: LEMON }],
  ['menthol', { grade: 'cleared', counts: false, why: MENTHOL }],
  ['organic bamboo extract', { grade: 'cleared', counts: false, why: BAMBOO }],
  ['organic guar gum', { grade: 'cleared', counts: false, why: GUAR }],
  ['b bifidum', { grade: 'cleared', counts: false, why: probiotic('B. bifidum') }],
  ['l acidophilus', { grade: 'cleared', counts: false, why: probiotic('L. acidophilus') }],
  ['l rhamnosus', { grade: 'cleared', counts: false, why: probiotic('L. rhamnosus') }],
  ['bromelain', { grade: 'cleared', counts: false, why: enzyme('Bromelain') }],
  ['papain', { grade: 'cleared', counts: false, why: enzyme('Papain') }],
  ['organic alfalfa grass', { grade: 'cleared', counts: false, why: plant('organic Alfalfa Grass') }],
  ['organic carrots', { grade: 'cleared', counts: false, why: plant('organic Carrots') }],
  ['organic oats', { grade: 'cleared', counts: false, why: plant('organic Oats') }],
  ['organic yeast', { grade: 'cleared', counts: false, why: plant('organic Yeast') }],
  ['brewers yeast', { grade: 'cleared', counts: false, why: plant("Brewer's Yeast") }],
  ['ascorbyl palmitate', { grade: 'cleared', counts: false, why: vitamin('Ascorbyl Palmitate') }],
  ['tocopherols', { grade: 'cleared', counts: false, why: vitamin('Tocopherols') }],
  ['d alpha tocopherol', { grade: 'cleared', counts: false, why: vitamin('D-Alpha-Tocopherol') }],
  ['riboflavin', { grade: 'cleared', counts: false, why: vitamin('Riboflavin') }],
  ['turmeric extract', { grade: 'cleared', counts: false, why: extract('Turmeric extract') }],
  ['black carrot extract color', { grade: 'cleared', counts: false, why: extract('Black Carrot extract color') }],
  ['black currant concentrate', { grade: 'cleared', counts: false, why: extract('Black Currant concentrate') }],
  ['citrus pectin', { grade: 'cleared', counts: false, why: extract('Citrus Pectin') }],
  ['luo han guo fruit extract', { grade: 'cleared', counts: false, why: extract('Luo Han Guo fruit extract') }],
  ['natural orange flavors', { grade: 'cleared', counts: false, why: extract('natural Orange flavors') }],
  ['papaya flavors', { grade: 'cleared', counts: false, why: extract('Papaya flavors') }],
  ['tahitian noni powder', { grade: 'cleared', counts: false, why: extract('Tahitian Noni powder') }],
  ['potato starch', { grade: 'cleared', counts: false, why: POTATO }],
  ['beeswax', { grade: 'cleared', counts: false, why: BEESWAX }],
  ['croscarmellose', { grade: 'limited', counts: true, why: disintegrant('Croscarmellose') }],
  ['crospovidone', { grade: 'limited', counts: true, why: disintegrant('Crospovidone') }],
  ['cellulose coating', { grade: 'limited', counts: true, why: COATING }],
  ['coating', { grade: 'limited', counts: true, why: COATING }],
  ['natural caramel color', { grade: 'limited', counts: true, why: CARAMEL }],
  ['food glaze', { grade: 'limited', counts: true, why: GLAZE }],
  ['lactic acid', { grade: 'limited', counts: true, why: LACTIC }],
  ['organic soy flour', { grade: 'limited', counts: true, why: SOY_FLOUR }],
  ['fermentation blend', { grade: 'limited', counts: true, why: FERMENT }],
  ['sodium acid sulfate', { grade: 'limited', counts: true, why: acid('Sodium Acid Sulfate') }],
  ['fumaric acid', { grade: 'limited', counts: true, why: acid('Fumaric Acid') }],
  ['sorbic acid', { grade: 'limited', counts: true, why: acid('Sorbic Acid') }],
  ['sodium ascorbate', { grade: 'limited', counts: true, why: acid('Sodium Ascorbate') }],
  ['sodium gluconate', { grade: 'limited', counts: true, why: acid('Sodium Gluconate') }],
  ['tapioca syrup', { grade: 'limited', counts: true, why: sugar('Tapioca Syrup') }],
  ['invert sugar', { grade: 'limited', counts: true, why: sugar('Invert Sugar') }],
  ['acetylated monoglycerides', { grade: 'limited', counts: true, why: MONO }],
  ['ethylcellulose', { grade: 'limited', counts: true, why: ETHYL }],
  ['whey', { grade: 'limited', counts: true, why: WHEY }],
  ['pasteurized egg yolk', { grade: 'limited', counts: true, why: EGG }],
  ['vanillin', { grade: 'limited', counts: true, why: VANILLIN }],
  ['vegetable mangesium stearate', { grade: 'limited', counts: true, why: STEARATE }],
  ['dried ferrous sulfate', { grade: 'limited', counts: true, why: IRON }],
  ['colors', { grade: 'limited', counts: true, why: COLORS }],
]);

const FORM_OILS = new Map<string, string>([
  ['soybean oil', SOYBEAN],
  ['corn oil', CORN],
  ['vegetable oil', VEGETABLE],
  ['sunflower seed oil', SUNFLOWER],
]);

const AMBIGUOUS_OILS = new Set([
  'organic palm oil',
  'organic safflower oil',
  'canola oil',
  'fish liver oil',
  'sesame oil',
  'wheat germ oil',
  'coconut and palm kernel oils',
]);

export function t240uNorm(name: string): string {
  let text = name.trim().toLowerCase();
  text = text.replace(
    /\s*\((?:as |a )?(?:preservative|capsule|capsules|softgel|color|colour|for color|for coloring|for colour|for freshness)\)/g,
    ' ',
  );
  text = text.replace(/&/g, ' and ');
  text = text.replace(/['’]/g, '');
  text = text.replace(/[^a-z0-9]+/g, ' ');
  return text.replace(/\s+/g, ' ').trim();
}

export function t240uOilRole(form: string | undefined): 'chew' | 'fill' | 'other' {
  const text = (form ?? '').toLowerCase();
  if (/gummy|lozenge|chew/.test(text)) return 'chew';
  if (/softgel|capsule|tablet|caplet|liquid|drop/.test(text)) return 'fill';
  return 'other';
}

export function t240uAmbiguousOil(name: string): { why: string } | undefined {
  const key = t240uNorm(name);
  if (!AMBIGUOUS_OILS.has(key)) return undefined;
  return { why: t240uOilWhy(name.trim().replace(/\s+/g, ' ')) };
}

/** Exact founder strings. Singular and plural are the same token only when both are listed. */
export function t240uLock(name: string, form?: string): Lock | undefined {
  const key = t240uNorm(name);
  const fixed = FIXED.get(key);
  if (fixed) return fixed;
  const oilWhy = FORM_OILS.get(key);
  if (!oilWhy) return undefined;
  const role = t240uOilRole(form);
  if (role === 'other') return undefined;
  if (role === 'chew') return { grade: 'high', counts: false, why: oilWhy, kind: 'oil' };
  return { grade: 'moderate', counts: false, why: oilWhy, kind: 'oil' };
}

const SOURCE: Record<RiskLevel, string> = {
  cleared: 'Methodology §5 Cleared (founder lock t240u). Does not count toward the t137u stack.',
  moderate: 'Methodology §5 Caution (founder lock t240u). Does not count toward the t137u stack.',
  limited: 'Methodology §5 Limited (founder lock t240u). Counts toward the 3+ Limited stack.',
  high: 'Methodology §5 Avoid (founder lock t240u).',
};

const AVOID_NOTE_NAMES = new Set([
  'Triple Strength L-Carnitine 1500 mg Watermelon Flavor',
  'Marvel The Amazing Spider-Man Complete',
  'Chewable Vitamin C 500 mg Orange Flavored',
  'Chewable Melatonin 3 mg',
]);

const CAUTION_NO_NOTE_NAMES = new Set([
  'Sublingual Liquid B Complex',
  'B-Complex With B-12 Sublingual',
]);

/** Sundown batch405 only. Other brands, and earlier Sundown rows, keep their stored grades. */
export function applyT240uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('sundown-b405-')) return record;
  let changed = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const sorbate = t240uNorm(ingredient.name) === 'potassium sorbate' ? t225uLock('potassium sorbate') : undefined;
    const lock = sorbate
      ? { grade: sorbate.grade, counts: sorbate.counts, why: sorbate.why }
      : t240uLock(ingredient.name, record.form);
    if (!lock) return ingredient;
    const exempt = !lock.counts;
    const stamp = sorbate
      ? 'Methodology §5 Caution (founder lock t225u). Does not count toward the t137u stack.'
      : SOURCE[lock.grade];
    const source = (ingredient.source ?? '').includes(sorbate ? 'founder lock t225u' : 'founder lock t240u')
      ? ingredient.source
      : `${ingredient.source ?? 'Panel'}; ${stamp}`;
    if (
      ingredient.riskLevel === lock.grade
      && ingredient.stackCountExempt === exempt
      && ingredient.why === lock.why
      && source === ingredient.source
    ) {
      return ingredient;
    }
    changed = true;
    return { ...ingredient, riskLevel: lock.grade, stackCountExempt: exempt, why: lock.why, source };
  });
  let next: RatingRecord = changed ? { ...record, inactiveIngredients } : record;
  if (changed) {
    next = {
      ...next,
      verdict: computeVerdictFromInactiveIngredients(next.inactiveIngredients, next.activeSafetyFlag).verdict,
    };
  }
  if (AVOID_NOTE_NAMES.has(next.productName) && next.verdict === 'avoid') {
    if (next.honestNote !== T240U_STACK_NOTE || next.founderHonestNote !== T240U_STACK_NOTE) {
      return { ...next, honestNote: T240U_STACK_NOTE, founderHonestNote: T240U_STACK_NOTE };
    }
  }
  if (CAUTION_NO_NOTE_NAMES.has(next.productName)) {
    if (next.honestNote === T128U_STACK_NOTE || next.founderHonestNote === T128U_STACK_NOTE || next.honestNote || next.founderHonestNote) {
      const cleared = { ...next };
      delete cleared.honestNote;
      delete cleared.founderHonestNote;
      return cleared;
    }
  }
  if (
    (next.honestNote === T128U_STACK_NOTE || next.founderHonestNote === T128U_STACK_NOTE)
    && !AVOID_NOTE_NAMES.has(next.productName)
  ) {
    const cleared = { ...next };
    if (cleared.honestNote === T128U_STACK_NOTE) delete cleared.honestNote;
    if (cleared.founderHonestNote === T128U_STACK_NOTE) delete cleared.founderHonestNote;
    return cleared;
  }
  return next;
}

if (t240uLock('Natural Flavors')?.grade !== 'limited' || t240uLock('Natural flavor')?.counts !== true) {
  throw new Error('t240u natural flavors');
}
if (t240uLock('natural Orange flavors')?.grade !== 'cleared') throw new Error('t240u orange flavors');
if (t240uLock('natural Orange flavor')) throw new Error('t240u orange flavor singular');
if (t240uLock('Titanium Dioxide color')?.grade !== 'high') throw new Error('t240u titanium');
if (t240uLock('Pectin')?.counts !== false) throw new Error('t240u pectin');
if (t240uLock('Soybean Oil', 'softgel')?.grade !== 'moderate') throw new Error('t240u soy fill');
if (t240uLock('Soybean Oil', 'gummy')?.grade !== 'high') throw new Error('t240u soy chew');
if (t240uLock('Soybean Oil', 'powder')) throw new Error('t240u soy powder');
if (t240uLock('organic Palm Oil', 'softgel')) throw new Error('t240u organic palm graded');
if (!t240uAmbiguousOil('organic Palm Oil')) throw new Error('t240u organic palm why');
if (t240uLock('Croscarmellose')?.why !== disintegrant('Croscarmellose')) throw new Error('t240u croscarmellose why');
if (t240uLock('Coating')?.why !== COATING) throw new Error('t240u coating why');
if (t240uLock('Cellulose Coating')?.why.includes('[Name]')) throw new Error('t240u coating bracket');
if (t240uLock('B. bifidum')?.why !== 'B. bifidum. It is added for its live bacteria.') throw new Error('t240u bifidum');
if (t240uLock("Brewer's Yeast")?.grade !== 'cleared') throw new Error('t240u brewers');
if (t240uLock('Vegetable Mangesium Stearate')?.counts !== true) throw new Error('t240u stearate');
if (t240uLock('highly refined soybean oil')) throw new Error('t240u refined soy');
