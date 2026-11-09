import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { isT86uClearedName } from './limitedStackEligibility';
import {
  computeVerdictFromInactiveIngredients,
  replaceLimitedStackHonestNote,
  stripLimitedStackHonestNote,
} from './verdictFromFlags';

export const T86U_CLEARED_SOURCE =
  'Methodology §5 Cleared (t86u). This exact printed string is Cleared and does not stack.';

function panelPrefix(source: string | undefined): string {
  const panel = source?.split(';')[0]?.trim();
  return panel && panel.length > 0 ? panel : 'Panel';
}

function rewriteIngredient(ingredient: IngredientFlag): IngredientFlag {
  if (!isT86uClearedName(ingredient.name)) return ingredient;
  if (ingredient.riskLevel === 'cleared' && ingredient.stackCountExempt) return ingredient;
  return {
    ...ingredient,
    riskLevel: 'cleared',
    stackCountExempt: true,
    source: `${panelPrefix(ingredient.source)}; ${T86U_CLEARED_SOURCE}`,
  };
}

/** Re-grade the t86u exact strings to Cleared. Does not add tokens. */
export function applyT86uRow(record: RatingRecord): RatingRecord {
  let changed = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const next = rewriteIngredient(ingredient);
    if (next !== ingredient) changed = true;
    return next;
  });
  if (!changed) return record;
  const rollup = computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag);
  let honestNote = record.honestNote;
  if (rollup.cause === 'limited_stack') {
    honestNote = replaceLimitedStackHonestNote(honestNote, rollup.limitedStackTokens ?? []);
  } else if (honestNote && /stacking rule \(t137u\)/.test(honestNote)) {
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
