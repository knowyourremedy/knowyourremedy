import type { RatingRecord, RiskLevel } from '../ratingRecord';
import { t240uNorm } from './t240uLocks';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

const VANILLIN =
  'Ethyl vanillin. It adds vanilla flavor to the product. Ethyl vanillin is graded Limited as a synthetic flavor (FDA 21 CFR 182.60; most commercial ethyl vanillin is synthetic).';
const FATTY =
  'Free fatty acids. It is used as a carrier or emulsifier. Free fatty acids are graded Limited as a processed fat fraction (FDA and EFSA treat free fatty acids as refined lipid fractions distinct from whole oils).';

const LOCKS = new Map<string, Lock>([
  [t240uNorm('ethyl vanillin'), { grade: 'limited', counts: true, why: VANILLIN }],
  [t240uNorm('free fatty acids'), { grade: 'limited', counts: true, why: FATTY }],
]);

/** Lipo-Flavonoid batch420 only. Other brands keep their stored grades. */
export function t265uLock(name: string): Lock | undefined {
  return LOCKS.get(t240uNorm(name));
}

export function applyT265uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('lipoflavonoid-b420-')) return record;
  let changed = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const own = t265uLock(ingredient.name);
    if (!own) return ingredient;
    const exempt = !own.counts;
    const stamp = 'Methodology §5 Limited (founder lock t265u). Counts toward the 3+ Limited stack.';
    const source = (ingredient.source ?? '').includes('founder lock t265u')
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
    : { ...record, inactiveIngredients };
  delete next.honestNote;
  delete next.founderHonestNote;
  return next;
}

if (t265uLock('ethyl vanillin')?.why !== VANILLIN) throw new Error('t265u vanillin');
if (t265uLock('ethyl vanillin')?.counts !== true) throw new Error('t265u vanillin count');
if (t265uLock('free fatty acids')?.why !== FATTY) throw new Error('t265u fatty');
if (t265uLock('free fatty acids')?.counts !== true) throw new Error('t265u fatty count');
if (t265uLock('vanillin')) throw new Error('t265u bare vanillin');
