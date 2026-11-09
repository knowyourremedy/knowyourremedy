import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { plainIngredientWhy } from './plainLanguage';
import { isT87uClearedName } from './limitedStackEligibility';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  replaceLimitedStackHonestNote,
  stripLimitedStackHonestNote,
} from './verdictFromFlags';

export const T87U_CLEARED_SOURCE =
  'Methodology §5 Cleared (t87u). This exact printed string is Cleared and does not stack.';

function panelPrefix(source: string | undefined): string {
  const panel = source?.split(';')[0]?.trim();
  return panel && panel.length > 0 ? panel : 'Panel';
}

function rewriteIngredient(ingredient: IngredientFlag): IngredientFlag {
  if (!isT87uClearedName(ingredient.name)) return ingredient;
  if (ingredient.riskLevel === 'cleared' && ingredient.stackCountExempt) return ingredient;
  return {
    ...ingredient,
    riskLevel: 'cleared',
    stackCountExempt: true,
    source: `${panelPrefix(ingredient.source)}; ${T87U_CLEARED_SOURCE}`,
  };
}

/** Re-grade the t87u exact strings to Cleared. Does not add tokens. */
export function applyT87uRow(record: RatingRecord): RatingRecord {
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

const locked = [
  'camu camu berries',
  'wild, raw birch bark',
  'organic yacon root powder',
  'Siberian black chaga',
  'cinnamon essential oil powder',
];
const nearby = [
  'wild camu camu',
  'Wild, organic camu camu berries',
  'wild, raw birch bark powder',
  'Wild, raw white birch bark powder',
  'raw, organic yacon root powder',
  'organic yacon powder',
  'organic Peruvian yacon syrup',
  'wild, organic black chaga',
  'wild, raw chaga',
  'Wild black Siberian chaga powder',
  'organic cinnamon extract',
  'organic & wild true Ceylon cinnamon powder',
];
const banned = /is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable|check digit was used|inferred/i;

for (const name of locked) {
  const ingredient: IngredientFlag = { name, riskLevel: 'limited' };
  if (!isT87uClearedName(name) || ingredientCountsTowardLimitedStack(ingredient)) {
    throw new Error(`t87u lock ${name}`);
  }
  const why = plainIngredientWhy({ ...ingredient, riskLevel: 'cleared', stackCountExempt: true });
  if (!why || banned.test(why) || !/cleared/i.test(why)) throw new Error(`t87u why ${name}: ${why}`);
}
for (const name of nearby) {
  if (isT87uClearedName(name)) throw new Error(`t87u nearby ${name}`);
}
