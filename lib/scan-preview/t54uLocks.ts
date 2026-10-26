import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import {
  isT54uClearedFlavorName,
  isT54uLimitedFlavorName,
} from './limitedStackEligibility';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  replaceLimitedStackHonestNote,
  stripLimitedStackHonestNote,
} from './verdictFromFlags';

export const T54U_LIMITED_FLAVOR_SOURCE =
  'Methodology §5 Limited (t54u natural-flavor rule). A documented product that uses this exact wording contains a Limited carrier, solvent, or other docked component.';

export const T54U_CLEARED_FLAVOR_SOURCE =
  'Methodology §5 Cleared (t54u natural-flavor rule). No documented product that uses this exact wording contains a Limited carrier, solvent, or other docked component.';

function panelPrefix(source: string | undefined): string {
  const panel = source?.split(';')[0]?.trim();
  return panel && panel.length > 0 ? panel : 'Panel';
}

function rewriteIngredient(ingredient: IngredientFlag): IngredientFlag {
  const limited = isT54uLimitedFlavorName(ingredient.name);
  const cleared = isT54uClearedFlavorName(ingredient.name);
  if (!limited && !cleared) return ingredient;
  if (limited) {
    if (
      ingredient.riskLevel === 'limited'
      && !ingredient.stackCountExempt
      && ingredientCountsTowardLimitedStack(ingredient)
    ) {
      return ingredient;
    }
    return {
      ...ingredient,
      riskLevel: 'limited' as RiskLevel,
      stackCountExempt: undefined,
      source: `${panelPrefix(ingredient.source)}; ${T54U_LIMITED_FLAVOR_SOURCE}`,
    };
  }
  if (ingredient.riskLevel === 'cleared' && /t54u natural-flavor rule/i.test(ingredient.source ?? '')) {
    return ingredient;
  }
  if (ingredient.riskLevel === 'cleared' && !/Methodology §5 Limited/i.test(ingredient.source ?? '')) {
    return ingredient;
  }
  return {
    ...ingredient,
    riskLevel: 'cleared' as RiskLevel,
    stackCountExempt: true,
    source: `${panelPrefix(ingredient.source)}; ${T54U_CLEARED_FLAVOR_SOURCE}`,
  };
}

/** Re-grade locked natural-flavor wordings under the t54u carrier rule. Does not add tokens. */
export function applyT54uRow(record: RatingRecord): RatingRecord {
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
