import type { RatingRecord, RiskLevel } from '../ratingRecord';
import { t240uNorm } from './t240uLocks';
import { t250uLock } from './t250uLocks';
import { t251uLock } from './t251uLocks';
import { t252uLock } from './t252uLocks';
import { t253uLock } from './t253uLocks';
import { computeVerdictFromInactiveIngredients, ingredientCountsTowardLimitedStack } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

export const T254U_STACK_NOTE =
  'This product is Avoid because it contains three or more ingredients that are each graded Limited. When three or more Limited ingredients appear together, the product is graded Avoid.';

const BORAGE =
  'Borage seed oil. It is the base of this liquid. Borage seed oil is graded Limited when it is the base of the product and Caution when it is only a fill (highly processed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).';
const OMEGA7 =
  'Omega-7 oil blend of fish oil and sunflower oil. It is used as a fill. The blend is graded Limited because it contains sunflower oil, a processed seed oil (EFSA and FDA treat refined seed oils as distinct from whole-food oils).';
const CITRUS = 'Natural citrus flavors. It adds citrus taste to the product.';
const SOFTGEL = 'Softgel made from gelatin, glycerin, and water. It forms the softgel that holds the ingredients.';
const LECITHIN = 'Lecithin from soy and sunflower. It is used as an emulsifier.';
const CHIA = 'Organic chia. It is added for its plant fiber and compounds.';
const COCONUT = 'Organic coconut. It is added for its plant compounds.';
const ANTIOX =
  'Antioxidant blend of ascorbyl palmitate, rosemary extract, and vitamin E. It is added to help keep the product stable.';
const ROSEMARY = 'Rosemary. It is added for its plant compounds.';
const LIGNAN = 'Flaxseed particulate with lignans. It is added for its plant fiber and compounds.';
const ISOFLAVONES = 'Isoflavones and saponins from soy. It is added for its plant compounds.';
const FISH = 'Fish oil from anchovy and menhaden. It is used as a fill or carrier. Fish oil is graded Cleared as a named oil fill.';

const CLEARED = new Map<string, string>([
  ['natural citrus flavors', CITRUS],
  ['softgel gelatin glycerin water', SOFTGEL],
  ['lecithin soy sunflower', LECITHIN],
  ['organic chia', CHIA],
  ['organic coconut', COCONUT],
  ['antioxidant blend ascorbyl palmitate rosemary extract vitamin e', ANTIOX],
  ['rosemary', ROSEMARY],
  ['flaxseed particulate lignans', LIGNAN],
  ['isoflavones and saponins soy', ISOFLAVONES],
  ['fish oil anchovy menhaden', FISH],
]);

const SOURCE: Record<RiskLevel, string> = {
  cleared: 'Methodology §5 Cleared (founder lock t254u). Does not count toward the t137u stack.',
  moderate: 'Methodology §5 Caution (founder lock t254u). Does not count toward the t137u stack.',
  limited: 'Methodology §5 Limited (founder lock t254u). Counts toward the 3+ Limited stack.',
  high: 'Methodology §5 Avoid (founder lock t254u).',
};

function tokenKey(name: string): string {
  return t240uNorm(name).split(' ').filter(Boolean).sort().join(' ');
}

/** Barlean's batch415 only. Liquid borage seed oil counts. The softgel fill stays the t253u Caution lock. */
export function t254uLock(name: string, form?: string): Lock | undefined {
  const key = tokenKey(name);
  const text = (form ?? '').toLowerCase();
  const same = (left: string) => tokenKey(left) === key;
  if (same('borage seed oil') || same('herbicide and pesticide-free Borage seed oil')) {
    if (/\bliquid\b/.test(text)) return { grade: 'limited', counts: true, why: BORAGE };
    return undefined;
  }
  if (same('Omega-7 Oil Blend (Fish Oil, Sunflower Oil)')) {
    return { grade: 'limited', counts: true, why: OMEGA7 };
  }
  for (const [label, why] of CLEARED) {
    if (same(label)) return { grade: 'cleared', counts: false, why };
  }
  return undefined;
}

/** Barlean's batch415 only. Other brands keep their stored grades. */
export function applyT254uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('barleans-b415-')) return record;
  let changed = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const from254 = t254uLock(ingredient.name, record.form);
    const from253 = !from254 && t253uLock(ingredient.name, record.form);
    const from252 = !from254 && !from253 && t252uLock(ingredient.name, record.form);
    const from251 = !from254 && !from253 && !from252 && t251uLock(ingredient.name, record.form);
    const own = from254 ?? from253 ?? from252 ?? from251 ?? t250uLock(ingredient.name);
    if (!own) return ingredient;
    const stamp = from254
      ? SOURCE[own.grade]
      : from253
        ? 'Methodology §5 Caution (founder lock t253u). Does not count toward the t137u stack.'
        : from252
          ? own.grade === 'limited'
            ? 'Methodology §5 Limited (founder lock t252u). Counts toward the 3+ Limited stack.'
            : own.grade === 'moderate'
              ? 'Methodology §5 Caution (founder lock t252u). Does not count toward the t137u stack.'
              : 'Methodology §5 Cleared (founder lock t252u). Does not count toward the t137u stack.'
          : from251
            ? own.grade === 'limited'
              ? 'Methodology §5 Limited (founder lock t251u). Counts toward the 3+ Limited stack.'
              : own.grade === 'moderate'
                ? 'Methodology §5 Caution (founder lock t251u). Does not count toward the t137u stack.'
                : 'Methodology §5 Cleared (founder lock t251u). Does not count toward the t137u stack.'
            : 'Methodology §5 Caution (founder lock t250u). Does not count toward the t137u stack.';
    const mark = from254 ? 'founder lock t254u' : from253 ? 'founder lock t253u' : from252 ? 'founder lock t252u' : from251 ? 'founder lock t251u' : 'founder lock t250u';
    const exempt = !own.counts;
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
  const next: RatingRecord = changed
    ? {
        ...record,
        inactiveIngredients,
        verdict: computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag).verdict,
      }
    : { ...record, inactiveIngredients };
  if (counted >= 3) {
    return { ...next, verdict: 'avoid', honestNote: T254U_STACK_NOTE, founderHonestNote: T254U_STACK_NOTE };
  }
  delete next.honestNote;
  delete next.founderHonestNote;
  return next;
}

if (t254uLock('Borage seed Oil', 'liquid')?.grade !== 'limited') throw new Error('t254u borage liquid');
if (t254uLock('Borage seed Oil', 'liquid')?.counts !== true) throw new Error('t254u borage count');
if (t254uLock('Borage seed Oil', 'softgel')) throw new Error('t254u borage softgel');
if (t254uLock('herbicide and pesticide-free Borage seed oil', 'liquid')?.why !== BORAGE) throw new Error('t254u herbicide');
if (t254uLock('Omega-7 Oil Blend (Fish Oil, Sunflower Oil)')?.counts !== true) throw new Error('t254u omega7');
if (t254uLock('natural Citrus flavors')?.why !== CITRUS) throw new Error('t254u citrus');
if (t254uLock('natural Citrus flavor')) throw new Error('t254u citrus singular');
if (t254uLock('Coconut Oil', 'gummy')) throw new Error('t254u coconut stays t252');
