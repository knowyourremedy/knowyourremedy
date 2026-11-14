import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { t134uWhyForName } from './t134uTokenWhy';
import { t135uGroup, T135U_EXPECTED_RISK, t135uWhyForName } from './t135uTokenWhy';
import { t141uGroup, T141U_EXPECTED_RISK, t141uWhyForName } from './t141uTokenWhy';
import { T128U_SILICA_WHY } from './t128uTokenWhy';
import { t162uGrade } from './t162uLocks';
import { t240uLock, t240uNorm } from './t240uLocks';
import { t251uLock } from './t251uLocks';
import { t286uLock } from './t286uLocks';
import { ingredientCountsTowardLimitedStack } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string; mark: string };

export const T287U_STACK_NOTE =
  'This product is Avoid because it contains three or more ingredients that are each graded Limited. When three or more Limited ingredients appear together, the product is graded Avoid.';

const MIXED =
  'This is a natural and artificial flavor mixture. The label does not list every part of the mixture. It is graded Limited and counts toward a 3+ Limited stack.';

function existing(name: string, form?: string): Lock | undefined {
  const own = t286uLock(name);
  if (own) return { ...own, mark: 't286u' };
  const key = t240uNorm(name);
  if (key === 'silicon dioxide' || key === 'silica') {
    return { grade: 'moderate', counts: false, why: T128U_SILICA_WHY, mark: 't160u' };
  }
  const flavor = t240uLock(name, form);
  if (flavor && (key === 'natural flavors' || key === 'natural flavor')) {
    return { grade: flavor.grade, counts: flavor.counts, why: flavor.why, mark: 't240u' };
  }
  if (key === 'natural and artificial flavors' && t162uGrade('natural and artificial flavors') === 'limited') {
    return { grade: 'limited', counts: true, why: MIXED, mark: 't162u' };
  }
  const caramel = key === 'caramel color' ? t251uLock('caramel color') : undefined;
  if (caramel) return { grade: caramel.grade, counts: caramel.counts, why: caramel.why, mark: 't251u' };
  const cane = t141uGroup(name, form);
  const caneWhy = t141uWhyForName(name, form);
  if ((cane === 'fructose' || cane === 'cane sugar') && caneWhy) {
    const grade = T141U_EXPECTED_RISK[cane];
    return { grade, counts: grade === 'limited', why: caneWhy, mark: 't141u' };
  }
  const group = t135uGroup(name, form);
  const groupWhy = t135uWhyForName(name, form);
  if (group && groupWhy && (group === 'sucralose' || group === 'acesulfame potassium' || group === 'potassium sorbate' || group === 'sodium benzoate')) {
    const grade = T135U_EXPECTED_RISK[group];
    return { grade, counts: grade === 'limited', why: groupWhy, mark: 't135u' };
  }
  const why = t134uWhyForName(name);
  if (why) return { grade: 'cleared', counts: false, why, mark: 't134u' };
  return undefined;
}

function withGrade(ingredient: IngredientFlag, own: Lock): IngredientFlag {
  const meth = own.grade === 'limited' && own.counts
    ? `Methodology §5 Limited (founder lock ${own.mark}). Counts toward the 3+ Limited stack.`
    : own.grade === 'moderate'
      ? `Methodology §5 Caution (founder lock ${own.mark}). Does not count toward the t137u stack.`
      : `Methodology §5 Cleared (founder lock ${own.mark}). Does not count toward the t137u stack.`;
  return {
    ...ingredient,
    riskLevel: own.grade,
    stackCountExempt: !own.counts,
    why: own.why,
    source: `Panel; ${meth}`,
  };
}

/** Focus Factor batch434 only. The named 3+ note is kept when Avoid comes only from the stack. */
export function applyT287uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('focus-factor-b434-')) return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const own = existing(ingredient.name, record.form);
    return own ? withGrade(ingredient, own) : ingredient;
  });
  const next: RatingRecord = { ...record, inactiveIngredients };
  if (next.inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'high')) {
    const avoided: RatingRecord = { ...next, verdict: 'avoid' };
    delete avoided.honestNote;
    delete avoided.founderHonestNote;
    return avoided;
  }
  const counted = next.inactiveIngredients.filter((ingredient) => ingredientCountsTowardLimitedStack(ingredient)).length;
  if (counted >= 3) {
    return { ...next, verdict: 'avoid', honestNote: T287U_STACK_NOTE, founderHonestNote: T287U_STACK_NOTE };
  }
  const cleared: RatingRecord = { ...next };
  delete cleared.honestNote;
  delete cleared.founderHonestNote;
  return cleared;
}
