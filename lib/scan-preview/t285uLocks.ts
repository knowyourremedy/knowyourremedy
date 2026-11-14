import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { cleanTokenWhyForName } from './cleanTokenWhy';
import { t134uWhyForName } from './t134uTokenWhy';
import { t135uGroup, T135U_EXPECTED_RISK, t135uWhyForName } from './t135uTokenWhy';
import { T128U_SILICA_WHY } from './t128uTokenWhy';
import { t162uGrade } from './t162uLocks';
import { t240uLock, t240uNorm } from './t240uLocks';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string; mark: string };

function existing(name: string): Lock | undefined {
  const key = t240uNorm(name);
  if (key === 'silicon dioxide' || key === 'silica') {
    return { grade: 'moderate', counts: false, why: T128U_SILICA_WHY, mark: 't160u' };
  }
  const rice = key === 'rice flour' ? t240uLock('rice flour') : undefined;
  if (rice) return { grade: rice.grade, counts: rice.counts, why: rice.why, mark: 't160u' };
  if (key === 'vegetable capsule hypromellose') {
    const capsule = t134uWhyForName('hypromellose');
    if (capsule) return { grade: 'cleared', counts: false, why: capsule, mark: 't134u' };
  }
  const why = t134uWhyForName(name);
  if (why) return { grade: 'cleared', counts: false, why, mark: 't134u' };
  const water = key === 'filtered water' ? cleanTokenWhyForName(name) : undefined;
  if (water) return { grade: 'cleared', counts: false, why: water, mark: 't108u' };
  const flavor = t240uLock(name, 'liquid');
  if (flavor && (key === 'natural flavors' || key === 'natural flavor')) {
    return { grade: flavor.grade, counts: flavor.counts, why: flavor.why, mark: 't240u' };
  }
  if (key === 'natural and artificial flavors' && t162uGrade('natural and artificial flavors') === 'limited') {
    return {
      grade: 'limited',
      counts: true,
      why: 'This is a natural and artificial flavor mixture. The label does not list every part of the mixture. It is graded Limited and counts toward a 3+ Limited stack.',
      mark: 't162u',
    };
  }
  const group = t135uGroup(name, 'liquid');
  const groupWhy = t135uWhyForName(name, 'liquid');
  if (group && groupWhy && (group === 'sucralose' || group === 'potassium sorbate' || group === 'sodium benzoate')) {
    const grade = T135U_EXPECTED_RISK[group];
    return { grade, counts: grade === 'limited', why: groupWhy, mark: 't135u' };
  }
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
    source: `${ingredient.source?.split(';')[0] || 'Panel'}; ${meth}`,
  };
}

/** Focus Factor batch433 only. No new lock. Existing locks are restamped and no note is stored. */
export function applyT285uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('focus-factor-b433-')) return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const own = existing(ingredient.name);
    return own ? withGrade(ingredient, own) : ingredient;
  });
  const verdict = computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag).verdict;
  const next: RatingRecord = { ...record, inactiveIngredients, verdict };
  delete next.honestNote;
  delete next.founderHonestNote;
  return next;
}
