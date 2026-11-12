import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { t240uNorm } from './t240uLocks';
import { t250uLock } from './t250uLocks';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

const GUAR = 'Guar gum, a plant gum. It thickens and stabilizes the liquid.';
const JUICE = 'Vegetable juice. It is added for color and plant compounds.';
const SOFTGEL =
  'Softgel made from gelatin, glycerine, and water (with caramel color where listed). It forms the softgel that holds the ingredients.';
const FLAX_PART = 'Flaxseed powder (or particulate). It is added for its plant fiber and compounds.';
const FLAX_LIMITED =
  'Flaxseed oil. It is the base of this liquid (or used as a fill). Flaxseed oil is graded Limited when it is the base of the product and Caution when it is only a fill (highly processed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).';
const FLAX_FILL =
  'Flaxseed oil. It is used as a fill in the softgel. Flaxseed oil is graded Caution as a fill and Limited or Avoid when it is the base of the product (highly processed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).';
const CARAMEL =
  'Caramel color. It is used to color the product. Caramel color is graded Limited as a processed color (EFSA 2011 re-evaluation of caramel colours).';
const HEMP =
  'Full spectrum hemp extract. It is added for its hemp compounds. Hemp extract is graded Limited when the exact cannabinoid profile and processing are not fully specified (FDA guidance on hemp products).';
const MALTO =
  'Potato maltodextrin. It is used as a filler. Maltodextrin is graded Limited because it is a highly processed starch (EFSA 2018).';
const COCONUT =
  'Virgin coconut oil. It is the base of this liquid. Virgin coconut oil is graded Limited when it is the base of the product (highly processed oil; EFSA and FDA treat refined coconut oil as distinct from whole coconut).';

function stable(name: string): string {
  return `${name}. It is added to help keep the product stable.`;
}
function plant(name: string): string {
  return `${name}. It is added for its plant compounds.`;
}
function filler(name: string): string {
  return `${name}. It is used as a filler, coating, or added for its plant or nutrient compounds.`;
}
function oil(name: string): string {
  return `${name}. It is used as a fill or carrier in the softgel or liquid. ${name} is graded Cleared as a named oil fill when it is not a seed oil under the Avoid locks.`;
}
function stevia(name: string): string {
  return `${name}. It adds sweetness to the product. Stevia extracts are graded Limited as purified extracts (EFSA 2010 re-evaluation of steviol glycosides).`;
}

function tokenKey(name: string): string {
  return t240uNorm(name).split(' ').filter(Boolean).sort().join(' ');
}

const CLEARED = new Map<string, string>([
  ['guar gum', GUAR],
  ['vitamin e d alpha tocopherol', stable('Vitamin E (D-Alpha-Tocopherol)')],
  ['mixed tocopherols', stable('Mixed Tocopherols')],
  ['ascorbic acid', stable('Ascorbic Acid')],
  ['ascorbyl palmitate', stable('Ascorbyl Palmitate')],
  ['vegetable juice', JUICE],
  ['green tea extract', plant('Green Tea Extract')],
  ['olive leaf extract', plant('Olive Leaf Extract')],
  ['rosemary extract', plant('Rosemary Extract')],
  ['turmeric', plant('Turmeric')],
  ['lycopene', plant('Lycopene')],
  ['blueberry extract', plant('Blueberry Extract')],
  ['grape seed extract', plant('Grape Seed Extract')],
  ['sage leaf extract', plant('Sage leaf extract')],
  ['softgel caramel color gelatin glycerine water', SOFTGEL],
  ['softgel gelatin glycerine water', SOFTGEL],
  ['organic flaxseed particulate', FLAX_PART],
  ['flaxseed powder', FLAX_PART],
  ['flaxseed particulate', FLAX_PART],
  ['tapioca starch', filler('Tapioca Starch')],
  ['corn starch', filler('Corn Starch')],
  ['chicory inulin powder', filler('Chicory Inulin, Powder')],
  ['carnauba wax', filler('Carnauba wax')],
  ['natural lemon flavor', filler('natural Lemon flavor')],
  ['vitamin d3 cholecalciferol', filler('Vitamin D3 (Cholecalciferol)')],
  ['soy isoflavones', filler('Soy Isoflavones')],
  ['astaxanthin natural', filler('Astaxanthin, Natural')],
  ['lutemax 2020 marigold flower extract', filler('Lutemax 2020 (Marigold flower extract)')],
  ['fish oil anchovy mackerel sardine', oil('Fish Oil (Anchovy, Mackerel, Sardine)')],
  ['fish oil pollock', oil('Fish Oil (Pollock)')],
  ['algal oil', oil('Algal Oil')],
  ['krill oil', oil('Krill Oil')],
  ['borage oil', oil('Borage Oil')],
  ['sunflower oil high oleic', oil('Sunflower Oil, High Oleic')],
  ['evening primrose oil', oil('Evening Primrose Oil')],
  ['mct oil coconut palm kernel', oil('MCT Oil (Coconut, Palm Kernel)')],
  ['antioxidant blend ascorbyl palmitate canola oil rosemary extract vitamin e', oil('Antioxidant Blend (Ascorbyl Palmitate, Canola Oil, Rosemary extract, Vitamin E)')],
]);

const LIMITED = new Map<string, string>([
  ['caramel color', CARAMEL],
  ['full spectrum hemp extract', HEMP],
  ['potato maltodextrin', MALTO],
  ['rebaudioside a stevia rebaudiana', stevia('Rebaudioside A (Stevia rebaudiana)')],
  ['stevia leaf extract', stevia('Stevia Leaf Extract')],
]);

const FLAX = new Set(['flaxseed oil', 'organic flaxseed oil']);

const SOURCE: Record<RiskLevel, string> = {
  cleared: 'Methodology §5 Cleared (founder lock t251u). Does not count toward the t137u stack.',
  moderate: 'Methodology §5 Caution (founder lock t251u). Does not count toward the t137u stack.',
  limited: 'Methodology §5 Limited (founder lock t251u). Counts toward the 3+ Limited stack.',
  high: 'Methodology §5 Avoid (founder lock t251u).',
};

/** Barlean's batch412 only. Liquid flaxseed oil counts. A softgel fill does not. */
export function t251uLock(name: string, form?: string): Lock | undefined {
  const key = tokenKey(name);
  const text = (form ?? '').toLowerCase();
  const same = (left: string) => tokenKey(left) === key;
  if ([...FLAX].some(same)) {
    if (/\bliquid\b/.test(text)) return { grade: 'limited', counts: true, why: FLAX_LIMITED };
    if (/\bsoftgel\b/.test(text)) return { grade: 'moderate', counts: false, why: FLAX_FILL };
    return undefined;
  }
  if (same('virgin coconut oil')) {
    if (/\bliquid\b/.test(text)) return { grade: 'limited', counts: true, why: COCONUT };
    return undefined;
  }
  for (const [label, why] of CLEARED) {
    if (same(label)) return { grade: 'cleared', counts: false, why };
  }
  for (const [label, why] of LIMITED) {
    if (same(label)) return { grade: 'limited', counts: true, why };
  }
  return undefined;
}

/** Barlean's batch412 only. Other brands keep their stored grades. */
export function applyT251uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('barleans-b412-')) return record;
  let changed = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const own = t251uLock(ingredient.name, record.form) ?? t250uLock(ingredient.name);
    if (!own) return ingredient;
    const exempt = !own.counts;
    const stamp = own === t250uLock(ingredient.name) && !t251uLock(ingredient.name, record.form)
      ? 'Methodology §5 Caution (founder lock t250u). Does not count toward the t137u stack.'
      : SOURCE[own.grade];
    const mark = stamp.includes('t250u') ? 'founder lock t250u' : 'founder lock t251u';
    const source = (ingredient.source ?? '').includes(mark)
      ? ingredient.source
      : `${ingredient.source ?? 'Panel'}; ${stamp}`;
    if (
      ingredient.riskLevel === own.grade
      && ingredient.stackCountExempt === exempt
      && ingredient.why === own.why
      && source === ingredient.source
    ) {
      return ingredient;
    }
    changed = true;
    return { ...ingredient, riskLevel: own.grade, stackCountExempt: exempt, why: own.why, source };
  });
  const next: RatingRecord = changed
    ? {
        ...record,
        inactiveIngredients,
        verdict: computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag).verdict,
      }
    : { ...record };
  delete next.honestNote;
  delete next.founderHonestNote;
  return next;
}

if (t251uLock('Guar Gum')?.why !== GUAR) throw new Error('t251u guar');
if (t251uLock('Flaxseed Oil', 'liquid')?.grade !== 'limited') throw new Error('t251u flax liquid');
if (t251uLock('Flaxseed Oil', 'liquid')?.counts !== true) throw new Error('t251u flax liquid count');
if (t251uLock('organic Flaxseed Oil', 'softgel')?.grade !== 'moderate') throw new Error('t251u flax softgel');
if (t251uLock('organic Flaxseed Oil', 'softgel')?.counts !== false) throw new Error('t251u flax softgel count');
if (t251uLock('Flaxseed Oil', 'softgel')?.why !== FLAX_FILL) throw new Error('t251u flax fill why');
if (t251uLock('Flaxseed Oil', 'gummy')) throw new Error('t251u flax gummy');
if (t251uLock('virgin Coconut Oil', 'liquid')?.counts !== true) throw new Error('t251u coconut');
if (t251uLock('virgin Coconut Oil', 'softgel')) throw new Error('t251u coconut softgel');
if (t251uLock('Green Tea extract')?.grade !== 'cleared') throw new Error('t251u green tea case');
if (t251uLock('Sunflower Oil, High Oleic')?.grade !== 'cleared') throw new Error('t251u sunflower');
if (t251uLock('high Oleic Sunflower Oil')?.why !== t251uLock('Sunflower Oil, High Oleic')?.why) {
  throw new Error('t251u sunflower order');
}
if (!t251uLock('Fish Oil (Anchovy, Mackerel, Sardine)')?.why.includes('Fish Oil (Anchovy, Mackerel, Sardine) is graded Cleared')) {
  throw new Error('t251u fish why');
}
if (t251uLock('Mixed Tocopherols, Natural')) throw new Error('t251u mixed natural');
if (t251uLock('Fish Oil (Anchovy, Mackerel, Sardine, Tuna)')) throw new Error('t251u fish tuna');
