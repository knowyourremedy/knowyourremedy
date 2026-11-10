import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { isT98CautionName, isT98ClearedName } from './limitedStackEligibility';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
} from './verdictFromFlags';

export const T98_CLEARED_SOURCE =
  'Methodology §5 Cleared (t98). This exact printed string is Cleared and does not stack. A prior lock is not binding for this exact string.';

export const T98_CAUTION_SOURCE =
  'Methodology §5 Caution (t98). This exact printed string is Caution and does not stack.';

function lockRecord(name: string, ingredient: IngredientFlag, verdict: RatingRecord['verdict']): RatingRecord {
  return {
    id: `t98-lock-${name}`,
    productName: name,
    brand: 'Lock check',
    category: 'Digestive Health',
    activeIngredients: [],
    inactiveIngredients: [ingredient],
    verdict,
    retailers: [],
  };
}

function panelPrefix(source: string | undefined): string {
  const panel = source?.split(';')[0]?.trim();
  return panel && panel.length > 0 ? panel : 'Panel';
}

function rewriteIngredient(ingredient: IngredientFlag): IngredientFlag {
  if (isT98ClearedName(ingredient.name)) {
    if (ingredient.riskLevel === 'cleared' && ingredient.stackCountExempt) return ingredient;
    return {
      ...ingredient,
      riskLevel: 'cleared',
      stackCountExempt: true,
      source: `${panelPrefix(ingredient.source)}; ${T98_CLEARED_SOURCE}`,
    };
  }
  if (isT98CautionName(ingredient.name)) {
    if (ingredient.riskLevel === 'moderate' && ingredient.stackCountExempt) return ingredient;
    return {
      ...ingredient,
      riskLevel: 'moderate' as RiskLevel,
      stackCountExempt: true,
      source: `${panelPrefix(ingredient.source)}; ${T98_CAUTION_SOURCE}`,
    };
  }
  return ingredient;
}

/**
 * Re-grade one record for the November 10, 2026 t98 strings.
 * The catalog mapper does not call this. Existing rows stay as stored.
 */
export function applyT98Row(record: RatingRecord): RatingRecord {
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

const cleared = [
  'acacia gum',
  'honey',
  'olive oil',
  'grape juice concentrate',
  'carob',
  'riboflavin',
  'peppermint oil',
  'lemon essential oil',
  'essential oil of lemon grass',
  'bitter orange peel (citrus aurantium) essential oil',
  'molasses',
  'fructose',
];
const caution = [
  'potassium benzoate',
  'hydroxyproyl cellulose',
  'enteric coating (cellulose and methacrylate)',
];
const nearby = [
  'acacia',
  'gum arabic',
  'acacia hydrolysate',
  'organic acacia gum',
  'raw honey',
  'honey powder',
  'extra virgin olive oil',
  'organic olive oil',
  'grape juice',
  'organic grape juice concentrate',
  'carob extract',
  'carob powder',
  'carob (color)',
  'riboflavin (vitamin B2)',
  'peppermint leaf',
  'peppermint flavor',
  'natural peppermint flavor',
  'organic peppermint oil',
  'lemon oil',
  'organic lemon oil',
  'lemongrass oil',
  'essential oil of lemon',
  'bitter orange peel',
  'blackstrap molasses',
  'organic molasses',
  'organic fructose',
  'high fructose corn syrup',
  'potassium benzoate (as preservative)',
  'sodium benzoate',
  'hydroxypropyl cellulose',
  'enteric coating',
];

for (const name of cleared) {
  if (!isT98ClearedName(name) || isT98CautionName(name)) throw new Error(`t98 cleared ${name}`);
  const stored: IngredientFlag = {
    name,
    riskLevel: 'limited',
    source: 'Methodology §5 Limited (prior lock).',
  };
  if (name === 'fructose' && !ingredientCountsTowardLimitedStack(stored)) {
    throw new Error('t98 must not change stored fructose counting');
  }
  if (name === 'peppermint oil' && !ingredientCountsTowardLimitedStack(stored)) {
    throw new Error('t98 must not change stored peppermint oil counting');
  }
  const applied = applyT98Row(lockRecord(name, stored, 'avoid'));
  const next = applied.inactiveIngredients[0];
  if (next.riskLevel !== 'cleared' || !next.stackCountExempt) throw new Error(`t98 apply cleared ${name}`);
  if (ingredientCountsTowardLimitedStack(next)) throw new Error(`t98 apply still stacks ${name}`);
  if (applied.verdict !== 'clean') throw new Error(`t98 apply verdict ${name} ${applied.verdict}`);
}

for (const name of caution) {
  if (!isT98CautionName(name) || isT98ClearedName(name)) throw new Error(`t98 caution ${name}`);
  const applied = applyT98Row(lockRecord(name, { name, riskLevel: 'limited' }, 'clean'));
  const next = applied.inactiveIngredients[0];
  if (next.riskLevel !== 'moderate' || !next.stackCountExempt) throw new Error(`t98 apply caution ${name}`);
  if (ingredientCountsTowardLimitedStack(next)) throw new Error(`t98 caution stacks ${name}`);
}

for (const name of nearby) {
  if (isT98ClearedName(name) || isT98CautionName(name)) throw new Error(`t98 nearby ${name}`);
}

if (!isT98ClearedName('Fructose') || !isT98ClearedName('PEPPERMINT OIL') || !isT98CautionName('Potassium Benzoate')) {
  throw new Error('t98 case');
}
