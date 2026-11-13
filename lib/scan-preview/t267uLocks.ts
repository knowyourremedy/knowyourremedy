import type { RatingRecord, RiskLevel } from '../ratingRecord';
import { t240uNorm } from './t240uLocks';
import { t259uLock } from './t259uLocks';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

const ACACIA = 'Acacia, a plant gum. It is used as a binder and thickener.';
const PVP =
  'Polyvinylpyrrolidone. It is used as a binder and disintegrant. Polyvinylpyrrolidone is graded Limited as a synthetic polymer (FDA 21 CFR 173.55; used as a tablet binder).';
const GLAZE =
  'Pharmaceutical glaze. It coats the tablet. Pharmaceutical glaze is graded Limited as a processed glaze (FDA 21 CFR 172.615; confectioner’s glaze is a refined shellac).';

const LOCKS = new Map<string, Lock>([
  [t240uNorm('Acacia'), { grade: 'cleared', counts: false, why: ACACIA }],
  [t240uNorm('Polyvinylpyrrolidone'), { grade: 'limited', counts: true, why: PVP }],
  [t240uNorm('Pharmaceutical Glaze'), { grade: 'limited', counts: true, why: GLAZE }],
]);

/** Slow-Mag rows only. Maltodextrin stays the existing t259u lock. */
export function t267uLock(name: string): Lock | undefined {
  if (t240uNorm(name) === t240uNorm('Maltodextrin')) return undefined;
  return LOCKS.get(t240uNorm(name));
}

/** Existing maltodextrin Limited lock. No new maltodextrin entry. */
export function t267uMaltodextrin(name: string): Lock | undefined {
  if (t240uNorm(name) !== t240uNorm('Maltodextrin')) return undefined;
  return t259uLock(name);
}

export function applyT267uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('slowmag-b422-')) return record;
  let changed = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const own = t267uLock(ingredient.name) ?? t267uMaltodextrin(ingredient.name);
    if (!own) return ingredient;
    const from259 = !t267uLock(ingredient.name);
    const exempt = !own.counts;
    const stamp = from259
      ? 'Methodology §5 Limited (founder lock t259u). Counts toward the 3+ Limited stack.'
      : own.grade === 'limited'
        ? 'Methodology §5 Limited (founder lock t267u). Counts toward the 3+ Limited stack.'
        : 'Methodology §5 Cleared (founder lock t267u). Does not count toward the t137u stack.';
    const mark = from259 ? 'founder lock t259u' : 'founder lock t267u';
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

if (t267uLock('Acacia')?.why !== ACACIA) throw new Error('t267u acacia');
if (t267uLock('Acacia')?.counts !== false) throw new Error('t267u acacia count');
if (t267uLock('Polyvinylpyrrolidone')?.counts !== true) throw new Error('t267u pvp');
if (t267uLock('Polyvinylpyrrolidone')?.why !== PVP) throw new Error('t267u pvp why');
if (t267uLock('Pharmaceutical Glaze')?.why !== GLAZE) throw new Error('t267u glaze');
if (t267uLock('Maltodextrin')) throw new Error('t267u maltodextrin stays t259');
if (t267uMaltodextrin('Maltodextrin')?.counts !== true) throw new Error('t267u maltodextrin count');
if (t267uMaltodextrin('Maltodextrin')?.why !== 'Maltodextrin. It is used as a filler. Maltodextrin is graded Limited because it is a highly processed starch (EFSA 2018).') {
  throw new Error('t267u maltodextrin why');
}
