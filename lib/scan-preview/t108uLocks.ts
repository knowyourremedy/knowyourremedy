import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { isT108uClearedName } from './limitedStackEligibility';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
} from './verdictFromFlags';

export const T108U_CLEARED_SOURCE =
  'Methodology §5 founder lock t108u. This exact printed string is Cleared and does not stack. A prior lock is not binding for this exact string.';

function panelPrefix(source: string | undefined): string {
  const panel = source?.split(';')[0]?.trim();
  return panel && panel.length > 0 ? panel : 'Panel';
}

function rewriteIngredient(ingredient: IngredientFlag): IngredientFlag {
  if (!isT108uClearedName(ingredient.name)) return ingredient;
  if (ingredient.riskLevel === 'cleared' && ingredient.stackCountExempt) return ingredient;
  return {
    ...ingredient,
    riskLevel: 'cleared',
    stackCountExempt: true,
    source: `${panelPrefix(ingredient.source)}; ${T108U_CLEARED_SOURCE}`,
  };
}

/** Re-grade the t108u exact strings. Does not add tokens. */
export function applyT108uRow(record: RatingRecord): RatingRecord {
  let changed = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const next = rewriteIngredient(ingredient);
    if (next !== ingredient) changed = true;
    return next;
  });
  if (!changed) return record;
  const rollup = computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag);
  return {
    ...record,
    inactiveIngredients,
    verdict: rollup.verdict,
  };
}

const locked = [
  'Rocky Mountain artesian spring water',
  'Rocky Mountain spring water',
  'organic glycerine',
  'organic apple cider vinegar',
  'organic vinegar',
  'locally sourced honey',
  'organic alcohol',
  '<10% organic alcohol',
];
const nearby = [
  'organic glycerin',
  'vegetable glycerine',
  'honey',
  'apple cider vinegar',
  'organic apple cider',
  'purified water',
  'distilled water',
];

function lockRecord(name: string): RatingRecord {
  return {
    id: `t108u-lock-${name}`,
    productName: name,
    brand: 'Lock check',
    category: 'Herbs',
    activeIngredients: [],
    inactiveIngredients: [{ name, riskLevel: 'limited' }],
    verdict: 'avoid',
    retailers: [],
  };
}

for (const name of locked) {
  if (!isT108uClearedName(name)) throw new Error(`t108u cleared ${name}`);
  const applied = applyT108uRow(lockRecord(name));
  const next = applied.inactiveIngredients[0];
  if (next?.riskLevel !== 'cleared' || !next.stackCountExempt || ingredientCountsTowardLimitedStack(next)) {
    throw new Error(`t108u apply ${name}`);
  }
  if (applied.verdict !== 'clean') throw new Error(`t108u verdict ${name} ${applied.verdict}`);
}
for (const name of nearby) {
  if (isT108uClearedName(name)) throw new Error(`t108u nearby ${name}`);
}
