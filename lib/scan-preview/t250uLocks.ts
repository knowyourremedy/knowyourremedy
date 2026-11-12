import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { t240uNorm } from './t240uLocks';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

const XYLITOL =
  'Xylitol, a sugar alcohol. It is used as a sweetener. Xylitol is graded Caution as a processed sugar alcohol (FDA 21 CFR 172.395; CIR safety assessment of xylitol).';

const LOCKS = new Map<string, Lock>([
  ['xylitol', { grade: 'moderate', counts: false, why: XYLITOL }],
]);

const SOURCE: Record<RiskLevel, string> = {
  cleared: 'Methodology §5 Cleared (founder lock t250u). Does not count toward the t137u stack.',
  moderate: 'Methodology §5 Caution (founder lock t250u). Does not count toward the t137u stack.',
  limited: 'Methodology §5 Limited (founder lock t250u). Counts toward the 3+ Limited stack.',
  high: 'Methodology §5 Avoid (founder lock t250u).',
};

/** Barlean's batch411 only. Other brands keep their stored grades. */
export function t250uLock(name: string): Lock | undefined {
  return LOCKS.get(t240uNorm(name));
}

export function applyT250uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('barleans-b411-')) return record;
  let changed = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const lock = t250uLock(ingredient.name);
    if (!lock) return ingredient;
    const exempt = !lock.counts;
    const stamp = SOURCE[lock.grade];
    const source = (ingredient.source ?? '').includes('founder lock t250u')
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

if (t250uLock('Xylitol')?.grade !== 'moderate') throw new Error('t250u xylitol grade');
if (t250uLock('Xylitol')?.counts !== false) throw new Error('t250u xylitol counts');
if (t250uLock('Xylitol')?.why !== XYLITOL) throw new Error('t250u xylitol why');
if (t250uLock('Sorbitol')) throw new Error('t250u sorbitol');
