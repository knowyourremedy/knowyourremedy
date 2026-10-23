import type { RatingRecord, RiskLevel } from '../ratingRecord';
import {
  computeVerdictFromInactiveIngredients,
  replaceLimitedStackHonestNote,
  stripLimitedStackHonestNote,
} from './verdictFromFlags';

export const T22U_SUGAR_ALCOHOL_SOURCE =
  'Methodology §5 Caution (Sugar alcohol printed as a class name — founder lock t22u Oct 23, 2026). Unnamed polyol class. GI effects at volume, the same finding as the named sugar-alcohol rows. Does not count toward the t137u stack. Not xylitol, mannitol, sorbitol, or isomalt.';

function isSugarAlcoholClassName(name: string): boolean {
  return name.trim().toLowerCase() === 'sugar alcohol';
}

/** Re-grade the exact class-name token. Named polyols stay on their own rows. */
export function applyT22uRow(record: RatingRecord): RatingRecord {
  if (!record.inactiveIngredients.some((ingredient) => isSugarAlcoholClassName(ingredient.name))) {
    return record;
  }
  let changed = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    if (!isSugarAlcoholClassName(ingredient.name)) return ingredient;
    if (ingredient.riskLevel === 'moderate' && ingredient.stackCountExempt && /t22u/i.test(ingredient.source ?? '')) {
      return ingredient;
    }
    changed = true;
    const panel = ingredient.source?.split(';')[0]?.trim() || 'Panel';
    return {
      ...ingredient,
      riskLevel: 'moderate' as RiskLevel,
      stackCountExempt: true,
      source: `${panel}; ${T22U_SUGAR_ALCOHOL_SOURCE}`,
    };
  });
  if (!changed) return record;
  const rollup = computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag);
  let honestNote = record.honestNote;
  if (rollup.cause === 'limited_stack') {
    honestNote = replaceLimitedStackHonestNote(honestNote, rollup.limitedStackTokens ?? []);
  } else if (honestNote) {
    const stripped = stripLimitedStackHonestNote(honestNote);
    honestNote = stripped.length > 0 ? stripped : undefined;
  }
  return {
    ...record,
    inactiveIngredients,
    verdict: rollup.verdict,
    honestNote,
  };
}
