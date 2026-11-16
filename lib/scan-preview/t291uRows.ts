import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { cleanTokenWhyForName } from './cleanTokenWhy';
import { t134uWhyForName } from './t134uTokenWhy';
import { t139uWhyForName } from './t139uTokenWhy';
import { t135uWhyForName } from './t135uTokenWhy';
import { T128U_SILICA_WHY } from './t128uTokenWhy';
import { t240uLock, t240uNorm } from './t240uLocks';
import { t256uResolve } from './t256uLocks';
import { t259uLock } from './t259uLocks';
import { t280uLock } from './t280uLocks';
import { ingredientCountsTowardLimitedStack, computeVerdictFromInactiveIngredients } from './verdictFromFlags';

type Stamped = { grade: RiskLevel; counts: boolean; why: string; mark: string };

function existing(name: string, form?: string): Stamped | undefined {
  const key = t240uNorm(name);
  if (key === 'silicon dioxide' || key === 'silica') {
    return { grade: 'moderate', counts: false, why: T128U_SILICA_WHY, mark: 't160u' };
  }
  const hpc = key === 'hydroxypropylcellulose' || key === 'hydroxypropyl cellulose' ? t280uLock('hydroxypropyl cellulose') : undefined;
  if (hpc) return { grade: hpc.grade, counts: hpc.counts, why: hpc.why, mark: 't280u' };
  const whey = key === 'whey' ? t240uLock('whey') : undefined;
  if (whey) return { grade: whey.grade, counts: whey.counts, why: whey.why, mark: 't240u' };
  const malto = key === 'maltodextrin' ? t259uLock(name) : undefined;
  if (malto) return { grade: malto.grade, counts: malto.counts, why: malto.why, mark: 't259u' };
  if (key === 'rice extract') {
    const why = t135uWhyForName(name, form);
    if (why) return { grade: 'limited', counts: true, why, mark: 't135u' };
  }
  const hit = t256uResolve(name, form);
  if (hit) {
    const why = hit.lock.why || cleanTokenWhyForName(name) || t134uWhyForName(name) || t139uWhyForName(name);
    if (why) return { grade: hit.lock.grade, counts: hit.lock.counts, why, mark: hit.mark === 'stored' ? 't160u' : hit.mark };
  }
  const cleared = t134uWhyForName(name);
  if (cleared) return { grade: 'cleared', counts: false, why: cleared, mark: 't134u' };
  return undefined;
}

function withGrade(ingredient: IngredientFlag, own: Stamped): IngredientFlag {
  const meth = own.grade === 'high'
    ? `Methodology §5 Avoid (founder lock ${own.mark}).`
    : own.grade === 'limited' && own.counts
      ? `Methodology §5 Limited (founder lock ${own.mark}). Counts toward the 3+ Limited stack.`
      : own.grade === 'moderate'
        ? `Methodology §5 Caution (founder lock ${own.mark}). Does not count toward the t137u stack.`
        : `Methodology §5 Cleared (founder lock ${own.mark}). Does not count toward the t137u stack.`;
  return { ...ingredient, riskLevel: own.grade, stackCountExempt: !own.counts, why: own.why, source: `Panel; ${meth}` };
}

/** Kyolic batch437 only. No 3+ note is stored on these rows. */
export function applyT291uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('kyolic-b437-')) return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const own = existing(ingredient.name, record.form);
    return own ? withGrade(ingredient, own) : ingredient;
  });
  const verdict = computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag).verdict;
  const counted = inactiveIngredients.filter((ingredient) => ingredientCountsTowardLimitedStack(ingredient)).length;
  const next: RatingRecord = { ...record, inactiveIngredients, verdict: counted >= 3 ? 'avoid' : verdict };
  delete next.honestNote;
  delete next.founderHonestNote;
  return next;
}
