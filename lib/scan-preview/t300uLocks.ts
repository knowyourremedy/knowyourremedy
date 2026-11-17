import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { t240uLock, t240uNorm } from './t240uLocks';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

const ETHYL =
  'Ethyl alcohol. It is used as a solvent or carrier. Bare alcohol without a printed strength is graded Limited (FDA and EFSA treat residual or bare alcohol differently from strength-printed vehicles).';

/**
 * Sunflower seed oil form-split is canonical: Avoid as the base of a chewable or gummy,
 * Caution as a fill or carrier. The t166 Limited-and-counts grade and the t167 step-1
 * why for this token are superseded for new lookups. Existing rows are not restamped here.
 */
export function t300uSunflowerFormSplit(name: string, form?: string): Lock | undefined {
  if (t240uNorm(name) !== 'sunflower seed oil') return undefined;
  const split = t240uLock(name, form);
  if (!split) return undefined;
  return { grade: split.grade, counts: split.counts, why: split.why };
}

/** Exact string. ethyl alcohol USP is a different token. */
export function t300uLock(name: string): Lock | undefined {
  if (t240uNorm(name) !== 'ethyl alcohol') return undefined;
  return { grade: 'limited', counts: true, why: ETHYL };
}

function withGrade(ingredient: IngredientFlag, own: Lock): IngredientFlag {
  return {
    ...ingredient,
    riskLevel: own.grade,
    stackCountExempt: !own.counts,
    why: own.why,
    source: 'Panel; Methodology §5 Limited (founder lock t300u). Counts toward the 3+ Limited stack.',
  };
}

/** Renew Life batch445 only. No rows were written this turn. */
export function applyT300uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('renew-life-b445-')) return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const own = t300uLock(ingredient.name);
    return own ? withGrade(ingredient, own) : ingredient;
  });
  const high = inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'high');
  const verdict = high
    ? 'avoid'
    : computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag).verdict;
  const next: RatingRecord = { ...record, inactiveIngredients, verdict };
  delete next.honestNote;
  delete next.founderHonestNote;
  return next;
}

if (t300uLock('ethyl alcohol')?.why !== ETHYL) throw new Error('t300u why');
if (t300uLock('ethyl alcohol')?.grade !== 'limited' || t300uLock('ethyl alcohol')?.counts !== true) {
  throw new Error('t300u grade');
}
if (t300uLock('ethyl alcohol USP')) throw new Error('t300u usp');
if (t300uSunflowerFormSplit('sunflower seed oil', 'gummy')?.grade !== 'high') throw new Error('t300u gummy');
if (t300uSunflowerFormSplit('sunflower seed oil', 'chewable')?.grade !== 'high') throw new Error('t300u chew');
if (t300uSunflowerFormSplit('sunflower seed oil', 'softgel')?.grade !== 'moderate') throw new Error('t300u fill');
if (t300uSunflowerFormSplit('sunflower seed oil', 'softgel')?.counts !== false) throw new Error('t300u fill count');
if (t300uSunflowerFormSplit('sunflower seed oil')) throw new Error('t300u no form');
