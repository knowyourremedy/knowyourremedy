import type { RatingRecord } from '../ratingRecord';
import { t240uLock, t240uNorm } from './t240uLocks';

/** Estroven batch429 only. No new ingredient locks. Titanium dioxide rows keep no 3+ note. */
export function applyT279uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('estroven-b429-')) return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    if (t240uNorm(ingredient.name) !== 'titanium dioxide') return ingredient;
    const own = t240uLock(ingredient.name, record.form);
    if (!own) return ingredient;
    const meth = 'Methodology §5 Avoid (founder lock t240u).';
    const source = (ingredient.source ?? '').includes('founder lock t240u')
      ? ingredient.source
      : `${ingredient.source ?? 'Panel'}; ${meth}`;
    return {
      ...ingredient,
      riskLevel: own.grade,
      stackCountExempt: !own.counts,
      why: own.why,
      source,
    };
  });
  const next: RatingRecord = { ...record, inactiveIngredients };
  if (next.inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'high')) {
    const avoided: RatingRecord = { ...next, verdict: 'avoid' };
    delete avoided.honestNote;
    delete avoided.founderHonestNote;
    return avoided;
  }
  return next;
}
