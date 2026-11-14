import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { t135uGroup, T135U_EXPECTED_RISK } from './t135uTokenWhy';
import { t240uLock, t240uNorm } from './t240uLocks';
import { t275uLock } from './t275uLocks';

function withGrade(ingredient: IngredientFlag, grade: IngredientFlag['riskLevel'], counts: boolean, why: string, mark: string): IngredientFlag {
  const meth = grade === 'high'
    ? `Methodology §5 Avoid (founder lock ${mark}).`
    : grade === 'limited'
      ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
      : grade === 'moderate'
        ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
        : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  const source = (ingredient.source ?? '').includes(`founder lock ${mark}`)
    ? ingredient.source
    : `${ingredient.source ?? 'Panel'}; ${meth}`;
  return { ...ingredient, riskLevel: grade, stackCountExempt: !counts, why: why || ingredient.why, source };
}

/** PreserVision batch431 (t282u) only. No new ingredient locks. No 3+ note and no form note. */
export function applyT282uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('preservision-b431-')) return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const key = t240uNorm(ingredient.name);
    if (key === 'soybean oil') {
      const own = t275uLock(ingredient.name, record.form);
      if (own) return withGrade(ingredient, own.grade, own.counts, own.why, 't275u');
    }
    if (key === 'titanium dioxide') {
      const own = t240uLock(ingredient.name, record.form);
      if (own) return withGrade(ingredient, own.grade, own.counts, own.why, 't240u');
    }
    const dye = t135uGroup(ingredient.name, record.form);
    if (dye && T135U_EXPECTED_RISK[dye] === 'high') {
      return withGrade(ingredient, 'high', false, ingredient.why ?? '', 't135u');
    }
    return ingredient;
  });
  const next: RatingRecord = { ...record, inactiveIngredients };
  delete next.honestNote;
  delete next.founderHonestNote;
  return next;
}
