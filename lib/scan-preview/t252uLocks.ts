import type { RatingRecord, RiskLevel } from '../ratingRecord';
import { t240uNorm } from './t240uLocks';
import { t250uLock } from './t250uLocks';
import { t251uLock } from './t251uLocks';
import { computeVerdictFromInactiveIngredients, ingredientCountsTowardLimitedStack } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

export const T252U_STACK_NOTE =
  'This product is Avoid because it contains three or more ingredients that are each graded Limited. When three or more Limited ingredients appear together, the product is graded Avoid.';

const MINT = 'Natural mint flavor. It adds mint taste to the product.';
const CITRUS = 'Natural citrus flavor. It adds citrus taste to the product.';
const TOCOPHEROLS = 'Mixed tocopherols, natural. It is added to help keep the product stable.';
const FLAXSEEDS = 'Organic flaxseeds. It is added for its plant fiber and compounds.';
const HA = 'Hyaluronic acid. It is added for its moisture-retaining compounds.';
const OLEA = 'Olea europaea leaf extract. It is added for its plant compounds.';
const SOFTGEL =
  'Softgel made from gelatin, glycerine, sorbitol sorbitan solution, and water, with caramel color. It forms the softgel that holds the ingredients.';
const FLAX_100 =
  '100% unrefined, unfiltered organic flaxseed oil. It is the base of this liquid. Flaxseed oil is graded Limited when it is the base of the product and Caution when it is only a fill (highly processed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).';
const MCT =
  'Medium chain triglyceride oil from coconut and palm. It is used as a fill. Medium chain triglycerides are graded Limited as a processed oil (existing MCT locks; EFSA and FDA treat refined MCT oils as distinct from whole-food oils).';
const COCONUT_COAT =
  'Coconut oil. It is used as a surface coating on the gummies. Coconut oil used as a coating is graded Limited as a processed oil (EFSA and FDA treat refined coconut oil as distinct from whole coconut).';

function fish(fish: string): string {
  return `Fish oil from ${fish}. It is used as a fill or carrier. Fish oil is graded Cleared as a named oil fill.`;
}
function blend(name: string): string {
  return `${name}. It is used as a fill or carrier. The blend is graded Cleared as a named oil and antioxidant fill.`;
}

const VEGAN_BLEND =
  'Total Omega Vegan Oil blend (Ascorbyl Palmitate, Borage Oil, DHA Algal Oil, Flaxseed Oil, Rosemary extract, Sunflower Lecithin, Vitamin E)';
const GREEN_BLEND =
  'Antioxidant Blend (Ascorbyl Palmitate, Green Tea extract, Rosemary extract, Vitamin E)';

const CLEARED = new Map<string, string>([
  ['natural mint flavor', MINT],
  ['natural citrus flavor', CITRUS],
  ['mixed tocopherols natural', TOCOPHEROLS],
  ['organic flaxseeds', FLAXSEEDS],
  ['hyaluronic acid', HA],
  ['olea europaea leaf extract', OLEA],
  ['fish oil anchovy mackerel sardine tuna', fish('Anchovy, Mackerel, Sardine, Tuna')],
  ['fish oil hake pollock', fish('Hake, Pollock')],
  ['softgel caramel color gelatin glycerine sorbitol sorbitan solution water', SOFTGEL],
  [VEGAN_BLEND, blend(VEGAN_BLEND)],
  [GREEN_BLEND, blend(GREEN_BLEND)],
]);

const LIMITED = new Map<string, string>([
  ['medium chain triglyceride oil coconut palm', MCT],
]);

const SOURCE: Record<RiskLevel, string> = {
  cleared: 'Methodology §5 Cleared (founder lock t252u). Does not count toward the t137u stack.',
  moderate: 'Methodology §5 Caution (founder lock t252u). Does not count toward the t137u stack.',
  limited: 'Methodology §5 Limited (founder lock t252u). Counts toward the 3+ Limited stack.',
  high: 'Methodology §5 Avoid (founder lock t252u).',
};

function tokenKey(name: string): string {
  return t240uNorm(name).split(' ').filter(Boolean).sort().join(' ');
}

/** Barlean's batch413 only. Borage seed oil and organic evening primrose oil stay unlocked. */
export function t252uLock(name: string, form?: string): Lock | undefined {
  const key = tokenKey(name);
  const text = (form ?? '').toLowerCase();
  const same = (left: string) => tokenKey(left) === key;
  if (same('100% unrefined, unfiltered organic Flaxseed Oil')) {
    if (/\bliquid\b/.test(text)) return { grade: 'limited', counts: true, why: FLAX_100 };
    return undefined;
  }
  if (same('coconut oil') && /\bgummy\b/.test(text)) {
    return { grade: 'limited', counts: true, why: COCONUT_COAT };
  }
  for (const [label, why] of CLEARED) {
    if (same(label)) return { grade: 'cleared', counts: false, why };
  }
  for (const [label, why] of LIMITED) {
    if (same(label)) return { grade: 'limited', counts: true, why };
  }
  return undefined;
}

/** Barlean's batch413 only. Other brands keep their stored grades. */
export function applyT252uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('barleans-b413-')) return record;
  let changed = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const own = t252uLock(ingredient.name, record.form)
      ?? t251uLock(ingredient.name, record.form)
      ?? t250uLock(ingredient.name);
    if (!own) return ingredient;
    const exempt = !own.counts;
    const from252 = t252uLock(ingredient.name, record.form);
    const from250 = !from252 && !t251uLock(ingredient.name, record.form);
    const stamp = from250
      ? 'Methodology §5 Caution (founder lock t250u). Does not count toward the t137u stack.'
      : from252
        ? SOURCE[own.grade]
        : own.grade === 'limited'
          ? 'Methodology §5 Limited (founder lock t251u). Counts toward the 3+ Limited stack.'
          : own.grade === 'moderate'
            ? 'Methodology §5 Caution (founder lock t251u). Does not count toward the t137u stack.'
            : 'Methodology §5 Cleared (founder lock t251u). Does not count toward the t137u stack.';
    const mark = from250 ? 'founder lock t250u' : from252 ? 'founder lock t252u' : 'founder lock t251u';
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
  const counted = inactiveIngredients.filter((ingredient) => ingredientCountsTowardLimitedStack(ingredient)).length;
  const next: RatingRecord = {
    ...(changed
      ? {
          ...record,
          inactiveIngredients,
          verdict: computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag).verdict,
        }
      : { ...record, inactiveIngredients }),
  };
  if (counted >= 3) {
    return { ...next, verdict: 'avoid', honestNote: T252U_STACK_NOTE, founderHonestNote: T252U_STACK_NOTE };
  }
  delete next.honestNote;
  delete next.founderHonestNote;
  return next;
}

if (t252uLock('natural Mint flavor')?.why !== MINT) throw new Error('t252u mint');
if (t252uLock('Citrus Flavor, Natural')?.why !== CITRUS) throw new Error('t252u citrus order');
if (t252uLock('Mint Flavor, Natural')?.why !== MINT) throw new Error('t252u mint order');
if (t252uLock('natural Citrus flavors')) throw new Error('t252u citrus plural');
if (t252uLock('Fish Oil (Hake, Pollock)')?.why !== fish('Hake, Pollock')) throw new Error('t252u hake');
if (t252uLock('100% unrefined, unfiltered organic Flaxseed Oil', 'liquid')?.counts !== true) throw new Error('t252u flax');
if (t252uLock('100% unrefined, unfiltered organic Flaxseed Oil', 'softgel')) throw new Error('t252u flax softgel');
if (t252uLock('Coconut Oil', 'gummy')?.counts !== true) throw new Error('t252u coconut gummy');
if (t252uLock('Coconut Oil', 'softgel')) throw new Error('t252u coconut softgel');
if (t252uLock('Borage seed Oil')) throw new Error('t252u borage mismatch');
if (t252uLock('organic Evening Primrose Oil', 'softgel')) throw new Error('t252u epo mismatch');
if (t252uLock(VEGAN_BLEND)?.grade !== 'cleared') throw new Error('t252u vegan blend');
if (t252uLock(GREEN_BLEND)?.why !== blend(GREEN_BLEND)) throw new Error('t252u green blend');
