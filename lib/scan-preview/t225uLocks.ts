import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

const STRENGTH_WHY = (kind: string) =>
  `${kind} at the printed strength. It is the liquid that extracts and carries the plant ingredients (or keeps the liquid soft).`;

/** Exact strength prints from the Professional Formulas t224 panels. */
const STRENGTH = new Set([
  '10% ethanol',
  '10% vegetable glycerin',
  '15% ethanol',
  '15% vegetable glycerin',
  '15% vegetable glycerin (from soy)',
  '20% ethanol',
  '31% ethanol',
  '40% ethanol',
  '5% ethanol',
  '5% vegetable glycerin',
  '8% vegetable glycerin',
  '8% vegetable glycerin (from soy)',
  'cane alcohol (11%)',
  'cane alcohol (12%)',
  'cane alcohol (13-18%)',
  'cane alcohol (14%)',
  'cane alcohol (2%)',
  'Cane alcohol (28%)',
  'cane alcohol (3%)',
  'cane alcohol (4%)',
  'Cane alcohol (45%)',
  'Cane alcohol (54-55%)',
  'Ethanol (10%)',
  'ethanol (10%)',
  'Ethanol (37%)',
  'Ethanol (40-45%)',
  'Ethanol (44%)',
  'Ethanol (53%)',
  'Ethanol (54%)',
  'grain alcohol (10%)',
  'grain alcohol (12-17%)',
  'Grain alcohol (14-15%)',
  'Grain alcohol (19-24%)',
  'grain alcohol (2%)',
  'Grain alcohol (25-29%)',
  'Grain alcohol (30%)',
  'Grain alcohol (30-35%)',
  'Grain alcohol (32-37%)',
  'Grain alcohol (33-37%)',
  'Grain alcohol (37-41%)',
  'Grain alcohol (40-45%)',
  'Grain alcohol (41%)',
  'Grain alcohol (42%)',
  'Grain alcohol (43%)',
  'Grain alcohol (45%)',
  'Grain alcohol (6-7%)',
  'grain alcohol (7%)',
  'grain alcohol (9-10%)',
  'vegetable glycerin (10%)',
  'vegetable glycerin (20%)',
  'Vegetable glycerin (20%)',
  'vegetable glycerin (45%)',
  'Vegetable glycerin (53%)',
  'Vegetable glycerin (60%)',
  'vegetable glycerin (8%)',
  'Vegetable glycerin (from soy) (20%)',
  'vegetable glycerin (from soy) (45%)',
  'vegetable glycerin (from soy) (8%)',
]);

function strengthKind(name: string): string | undefined {
  const n = name.toLowerCase();
  if (n.includes('ethanol')) return 'Ethanol';
  if (n.includes('grain alcohol')) return 'Grain alcohol';
  if (n.includes('cane alcohol')) return 'Cane alcohol';
  if (n.includes('vegetable glycerin')) return 'Vegetable glycerin';
  return undefined;
}

const RICE = 'Organic brown rice. It is used as a filler and base for the powder.';
const STEARATE = 'Vegetable stearate, a plant-derived lubricant. It helps the powder flow into tablets or capsules.';
const GEL_CAP = 'Gelatin capsule made from gelatin and water. Gelatin is an animal-derived protein used to form the capsule that holds the ingredients.';
const CELLUOSE = 'Microcrystalline cellulose, a refined plant fiber. It is used as a filler and to help the tablet or capsule hold its shape.';
const CORN = 'Corn starch, a plant starch. It is used as a filler and binder.';
const TAPIOCA = 'Tapioca flour, a plant starch. It is used as a filler and binder.';
const CITRIC = 'Citric acid, a weak organic acid. It is added to adjust acidity and help keep the product stable.';
const ORANGE = 'Orange juice crystals (or flavor) made from orange. It adds orange taste to the product.';
const CHERRY = 'Cherry extract made from cherries. It adds cherry flavor to the product.';
const FLAVOR_PLANT = 'It adds flavor and plant compounds to the product.';
const HERB = 'It is added for its plant compounds.';
const FRESH = 'It is added to help keep the product fresh or for flavor.';
const MCT = 'Vegetable medium chain triglycerides, a processed oil made from plant fats. It is used as a carrier oil. Medium chain triglycerides are graded Limited as a processed oil (existing MCT lock).';
const FIBERSOL = 'Fibersol, a maltodextrin-based fiber. It is used as a filler. Maltodextrin is graded Limited because it is a highly processed starch (EFSA 2018).';
const RICE_EXTRACT = 'Organic rice extract. It is used as a filler. Rice extract is graded Limited when the form is not named as hull or concentrate (existing rice-extract lock).';
const SOY = 'Highly refined soybean oil, a processed seed oil. It is used as a carrier oil. Highly refined soybean oil is graded Caution as a processed seed oil when not the base of a chewable.';
const SAFFLOWER = 'Safflower oil, a seed oil. It is used as a carrier oil. Safflower oil is graded Caution as a seed oil when not the base of a chewable.';
const BAMBOO = 'Bamboo silica, a form of silicon dioxide. It is used as a flow agent. Silica is graded Caution as a nanoparticle precaution (0-pt cap, does not stack).';
const POLY = 'Polyglycitol syrup, a sugar alcohol. It is used as a sweetener and binder. Polyglycitol is graded Caution as a sugar alcohol.';
const SORBITOL = 'Sorbitol powder, a sugar alcohol. It is used as a sweetener and binder. Sorbitol is graded Caution as a sugar alcohol.';
const FLAVORS = 'Natural flavors made from plant sources. It adds flavor to the product. Natural flavors are graded Caution because the exact sources and processing are not fully specified on the panel.';
const SORBATE = 'Potassium sorbate, a synthetic preservative. It is added to help keep the product fresh. Potassium sorbate is graded Caution as a synthetic preservative (existing t45 lock).';

function named(token: string): string {
  return token.charAt(0).toUpperCase() + token.slice(1);
}

function fruitWhy(fruit: string): string {
  return `Natural ${fruit} flavoring made from ${fruit}. It adds ${fruit} taste to the product.`;
}

const EXACT = new Map<string, Lock>([
  ['organic brown rice', { grade: 'cleared', counts: false, why: RICE }],
  ['Organic brown rice', { grade: 'cleared', counts: false, why: RICE }],
  ['vegetable stearate', { grade: 'cleared', counts: false, why: STEARATE }],
  ['Gelatin capsule (gelatin and water)', { grade: 'cleared', counts: false, why: GEL_CAP }],
  ['Microcrystalline celluose', { grade: 'cleared', counts: false, why: CELLUOSE }],
  ['corn starch', { grade: 'cleared', counts: false, why: CORN }],
  ['tapioca flour', { grade: 'cleared', counts: false, why: TAPIOCA }],
  ['citric acid (0.1%)', { grade: 'cleared', counts: false, why: CITRIC }],
  ['orange juice crystals', { grade: 'cleared', counts: false, why: ORANGE }],
  ['orange juice flavor (from soy)', { grade: 'cleared', counts: false, why: ORANGE }],
  ['orange juice flavors', { grade: 'cleared', counts: false, why: ORANGE }],
  ['5% cherry extract', { grade: 'cleared', counts: false, why: CHERRY }],
  ['10% cherry extract', { grade: 'cleared', counts: false, why: CHERRY }],
  ['cherry juice extract (10%)', { grade: 'cleared', counts: false, why: CHERRY }],
  ['cherry extract (5%)', { grade: 'cleared', counts: false, why: CHERRY }],
  ['natural orange flavoring', { grade: 'cleared', counts: false, why: fruitWhy('orange') }],
  ['natural lime flavor', { grade: 'cleared', counts: false, why: fruitWhy('lime') }],
  ['natural raspberry flavoring', { grade: 'cleared', counts: false, why: fruitWhy('raspberry') }],
]);

for (const token of [
  'lemon juice powder',
  'lemon fruit juice powder',
  'raspberry fruit juice powder',
  'rosehips',
  'acerola',
  'papaya',
  'honey powder',
  'honey granules',
  'beet root powder',
  'anise seed extract',
  'anise',
]) {
  EXACT.set(token, { grade: 'cleared', counts: false, why: `${named(token)}. ${FLAVOR_PLANT}` });
}

for (const token of [
  'Withania',
  'Hypericum',
  'Turnera aphrodisiaca',
  'Verbena hastata',
  'Scutellaria lateriflora',
  'Panax ginseng',
  'Glycyrrhiza glabra root extract (1:1)',
  'polygala tenuifolia root extract (1:1)',
  'grindelia camporum aerial parts extract (1:1)',
  'inula helenium root extract (1:1)',
  'thymus vulgaris leaves extract (1:1)',
  'verbascum thapsus leaves extract (1:2)',
  'asclepias tuberosa root extract (1:1)',
  'zingiber officinale root extract (1:1)',
  'pimpinella anisum seed extract (1:1)',
  'alfalfa (Medicago sativa) extract',
  'dulse (Rhodymenia palmata) extract',
]) {
  EXACT.set(token, { grade: 'cleared', counts: false, why: `${named(token)}. ${HERB}` });
}

for (const token of ['mixed tocopherols', 'peppermint essential oil', 'D-limonene oil']) {
  EXACT.set(token, { grade: 'cleared', counts: false, why: `${named(token)}. ${FRESH}` });
}

EXACT.set('vegetable medium chain triglycerides', { grade: 'limited', counts: true, why: MCT });
EXACT.set('fibersol (maltodextrin)', { grade: 'limited', counts: true, why: FIBERSOL });
EXACT.set('organic rice extract', { grade: 'limited', counts: true, why: RICE_EXTRACT });

EXACT.set('highly refined soybean oil', { grade: 'moderate', counts: false, why: SOY });
EXACT.set('Highly refined soybean oil', { grade: 'moderate', counts: false, why: SOY });
EXACT.set('Safflower oil', { grade: 'moderate', counts: false, why: SAFFLOWER });
EXACT.set('safflower oil', { grade: 'moderate', counts: false, why: SAFFLOWER });
EXACT.set('bamboo silica', { grade: 'moderate', counts: false, why: BAMBOO });
EXACT.set('polyglycitol syrup', { grade: 'moderate', counts: false, why: POLY });
EXACT.set('sorbitol powder', { grade: 'moderate', counts: false, why: SORBITOL });
EXACT.set('natural flavors (key lime, lemon, raspberry)', { grade: 'moderate', counts: false, why: FLAVORS });
EXACT.set('natural flavors (raspberry, lemon, and key lime)', { grade: 'moderate', counts: false, why: FLAVORS });
EXACT.set('herbal flavoring mixture', { grade: 'moderate', counts: false, why: FLAVORS });
EXACT.set('potassium sorbate', { grade: 'moderate', counts: false, why: SORBATE });
EXACT.set('potassium sorbate (0.1%)', { grade: 'moderate', counts: false, why: SORBATE });

/** A trailing percentage or ratio in parentheses is the same token as the words before it. */
function percentageCore(name: string): string | undefined {
  const match = name.match(/^(.*)\s+\((?:\d+(?:\.\d+)?%|\d+(?:\.\d+)?\s*:\s*\d+(?:\.\d+)?)\)\s*$/);
  const core = match?.[1]?.trim();
  return core || undefined;
}

export function t225uLock(name: string): Lock | undefined {
  const text = name.trim().replace(/\s+/g, ' ');
  if (STRENGTH.has(text)) {
    const kind = strengthKind(text);
    if (!kind) return undefined;
    return { grade: 'cleared', counts: false, why: STRENGTH_WHY(kind) };
  }
  const exact = EXACT.get(text);
  if (exact) return exact;
  const core = percentageCore(text);
  return core ? EXACT.get(core) : undefined;
}

const SOURCE: Record<RiskLevel, string> = {
  cleared: 'Methodology §5 Cleared (founder lock t225u). Does not count toward the t137u stack.',
  moderate: 'Methodology §5 Caution (founder lock t225u). Does not count toward the t137u stack.',
  limited: 'Methodology §5 Limited (founder lock t225u). Counts toward the 3+ Limited stack.',
  high: 'Methodology §5 Avoid (founder lock t225u).',
};

/** Grades and why text on Professional Formulas rows only. Other brands stay as they are. */
export function applyT225uIngredients(ingredients: readonly IngredientFlag[], record: RatingRecord): IngredientFlag[] {
  if (record.brand !== 'Professional Formulas') return ingredients as IngredientFlag[];
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const lock = t225uLock(ingredient.name);
    if (!lock) return ingredient;
    const exempt = !lock.counts;
    const source = (ingredient.source ?? '').includes('founder lock t225u')
      ? ingredient.source
      : `${ingredient.source ?? 'Panel'}; ${SOURCE[lock.grade]}`;
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
  return changed ? next : ingredients as IngredientFlag[];
}

export function applyT225uTokenWhy(record: RatingRecord): RatingRecord {
  const inactiveIngredients = applyT225uIngredients(record.inactiveIngredients, record);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  const verdict = computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag).verdict;
  return { ...record, inactiveIngredients, verdict };
}

if (t225uLock('20% ethanol')?.why !== STRENGTH_WHY('Ethanol')) throw new Error('t225u ethanol why');
if (t225uLock('Grain alcohol (40-45%)')?.why !== STRENGTH_WHY('Grain alcohol')) throw new Error('t225u grain why');
if (t225uLock('8% vegetable glycerin (from soy)')?.why !== STRENGTH_WHY('Vegetable glycerin')) throw new Error('t225u glycerin why');
if (t225uLock('Cane alcohol (45%)')?.grade !== 'cleared' || t225uLock('Cane alcohol (45%)')?.counts !== false) throw new Error('t225u cane');
if (t225uLock('Cane Alcohol 22-28%')) throw new Error('t225u energetix');
if (t225uLock('Organic Cane Alcohol (45-55% by volume)')) throw new Error('t225u volume');
if (t225uLock('organic brown rice')?.why !== t225uLock('Organic brown rice')?.why) throw new Error('t225u rice case');
if (t225uLock('natural lime flavor')?.why !== 'Natural lime flavoring made from lime. It adds lime taste to the product.') throw new Error('t225u lime');
if (t225uLock('natural orange flavoring')?.why !== 'Natural orange flavoring made from orange. It adds orange taste to the product.') throw new Error('t225u orange flavor');
if (t225uLock('polygala tenuifolia root extract (1:1)')?.why !== 'Polygala tenuifolia root extract (1:1). It is added for its plant compounds.') throw new Error('t225u herb');
if (t225uLock('anise seed extract')?.why !== 'Anise seed extract. It adds flavor and plant compounds to the product.') throw new Error('t225u anise');
if (t225uLock('anise seed extract (1%)')?.why !== t225uLock('anise seed extract')?.why) throw new Error('t225u anise paren');
if (t225uLock('anise seed extract (1%)')?.grade !== 'cleared' || t225uLock('anise seed extract (1%)')?.counts !== false) throw new Error('t225u anise paren grade');
if (t225uLock('anise (2%)')?.why !== t225uLock('anise')?.why) throw new Error('t225u anise 2');
if (t225uLock('herbal flavoring mixture containing extracts of licorice and anise (2%)')) throw new Error('t225u herbal anise');
if (t225uLock('herbal flavoring mixture containing extracts of licorice')) throw new Error('t225u herbal long');
if (t225uLock('herbal flavoring mixture')?.grade !== 'moderate') throw new Error('t225u herbal');
if (t225uLock('potassium sorbate')?.grade !== 'moderate' || t225uLock('potassium sorbate')?.counts !== false) throw new Error('t225u sorbate');
if (t225uLock('potassium sorbate (0.1%)')?.why !== SORBATE) throw new Error('t225u sorbate pct');
if (t225uLock('vegetable medium chain triglycerides')?.counts !== true) throw new Error('t225u mct');
if (STRENGTH.size !== 58) throw new Error(`t225u strength ${STRENGTH.size}`);
