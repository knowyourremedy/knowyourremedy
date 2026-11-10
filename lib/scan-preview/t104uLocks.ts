import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import {
  isT104uCautionName,
  isT104uClearedName,
  isT104uLimitedName,
} from './limitedStackEligibility';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  replaceLimitedStackHonestNote,
  stripLimitedStackHonestNote,
} from './verdictFromFlags';

export const T104U_CLEARED_SOURCE =
  'Methodology §5 founder lock t104u. This exact printed string is Cleared and does not stack. A prior lock is not binding for this exact string.';

export const T104U_CAUTION_SOURCE =
  'Methodology §5 founder lock t104u. This exact printed string is Caution and does not stack. A prior lock is not binding for this exact string.';

export const T104U_LIMITED_SOURCE =
  'Methodology §5 founder lock t104u. This exact printed string is Limited and counts toward the t137u stack. The printed word is middle, not medium.';

function panelPrefix(source: string | undefined): string {
  const panel = source?.split(';')[0]?.trim();
  return panel && panel.length > 0 ? panel : 'Panel';
}

function rewriteIngredient(ingredient: IngredientFlag): IngredientFlag {
  if (isT104uClearedName(ingredient.name)) {
    if (ingredient.riskLevel === 'cleared' && ingredient.stackCountExempt) return ingredient;
    return {
      ...ingredient,
      riskLevel: 'cleared',
      stackCountExempt: true,
      source: `${panelPrefix(ingredient.source)}; ${T104U_CLEARED_SOURCE}`,
    };
  }
  if (isT104uCautionName(ingredient.name)) {
    if (ingredient.riskLevel === 'moderate' && ingredient.stackCountExempt) return ingredient;
    return {
      ...ingredient,
      riskLevel: 'moderate' as RiskLevel,
      stackCountExempt: true,
      source: `${panelPrefix(ingredient.source)}; ${T104U_CAUTION_SOURCE}`,
    };
  }
  if (isT104uLimitedName(ingredient.name)) {
    if (ingredient.riskLevel === 'limited' && !ingredient.stackCountExempt) return ingredient;
    return {
      ...ingredient,
      riskLevel: 'limited',
      stackCountExempt: undefined,
      source: `${panelPrefix(ingredient.source)}; ${T104U_LIMITED_SOURCE}`,
    };
  }
  return ingredient;
}

function touched(record: RatingRecord): boolean {
  return record.inactiveIngredients.some((ingredient) => (
    isT104uClearedName(ingredient.name)
    || isT104uCautionName(ingredient.name)
    || isT104uLimitedName(ingredient.name)
  ));
}

/** Re-grade the t104u exact strings. Does not add tokens. Other locks stay as they are. */
export function applyT104uRow(record: RatingRecord): RatingRecord {
  if (!touched(record)) return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => rewriteIngredient(ingredient));
  const rollup = computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag);
  let honestNote = record.honestNote;
  if (rollup.cause === 'limited_stack') {
    honestNote = replaceLimitedStackHonestNote(honestNote, rollup.limitedStackTokens ?? []);
  } else if (honestNote && /stacking rule \(t137u\)/.test(honestNote)) {
    const stripped = stripLimitedStackHonestNote(honestNote);
    honestNote = stripped.length > 0 ? stripped : undefined;
  }
  const cautionNames = inactiveIngredients
    .filter((ingredient) => isT104uCautionName(ingredient.name))
    .map((ingredient) => ingredient.name);
  if (rollup.verdict === 'caution' && cautionNames.length > 0) {
    const sentence = cautionNames.map((name) => `${name} is Caution and does not stack.`).join(' ');
    if (!honestNote?.includes(sentence)) {
      honestNote = honestNote ? `${honestNote} ${sentence}` : sentence;
    }
  }
  if (rollup.cause === 'limited_1_2' && /stacking rule \(t137u\)/.test(record.honestNote ?? '')) {
    const counted = inactiveIngredients
      .filter((ingredient) => ingredientCountsTowardLimitedStack(ingredient))
      .map((ingredient) => ingredient.name);
    const sentence = counted.length === 1
      ? `Counted Limited token: ${counted[0]}. That is one, so this is Caution. It is not a three-or-more stack.`
      : `Counted Limited tokens: ${counted.join(' and ')}. That is ${counted.length}, so this is Caution. It is not a three-or-more stack.`;
    if (honestNote && !honestNote.includes('It is not a three-or-more stack.')) {
      honestNote = `${honestNote} ${sentence}`;
    }
  }
  const sameIngredients = inactiveIngredients.every((ingredient, index) => ingredient === record.inactiveIngredients[index]);
  if (sameIngredients && rollup.verdict === record.verdict && honestNote === record.honestNote) return record;
  return {
    ...record,
    inactiveIngredients,
    verdict: rollup.verdict,
    honestNote,
  };
}

const cleared = [
  'peppermint oil',
  'lemon oil (named)',
  'Named lemon oil as flavor',
  'organic lemon oil',
  'orange essential oil (flavor)',
  'essential oil of lemon grass',
  'lemon essential oil',
];
const caution = [
  'potassium benzoate',
  'hydroxyproyl cellulose',
  'hydroxypropyl cellulose',
  'enteric coating (cellulose and methacrylate)',
  'enteric coating',
];
const nearby = [
  'hydroxypropyl methylcellulose',
  'hydroxypropyl methylcellulose (capsule)',
  'lemon oil',
  'lemon juice',
  'medium chain triglycerides',
  'sodium benzoate',
  'enteric coating (hypromellose)',
  'peppermint leaf',
  'organic peppermint oil',
];

function lockRecord(name: string, ingredient: IngredientFlag, verdict: RatingRecord['verdict']): RatingRecord {
  return {
    id: `t104u-lock-${name}`,
    productName: name,
    brand: 'Lock check',
    category: 'Herbs',
    activeIngredients: [],
    inactiveIngredients: [ingredient],
    verdict,
    retailers: [],
  };
}

for (const name of cleared) {
  if (!isT104uClearedName(name) || isT104uCautionName(name) || isT104uLimitedName(name)) {
    throw new Error(`t104u cleared ${name}`);
  }
  const applied = applyT104uRow(lockRecord(name, { name, riskLevel: 'limited' }, 'avoid'));
  const next = applied.inactiveIngredients[0];
  if (next.riskLevel !== 'cleared' || !next.stackCountExempt || ingredientCountsTowardLimitedStack(next)) {
    throw new Error(`t104u apply cleared ${name}`);
  }
}
for (const name of caution) {
  if (!isT104uCautionName(name) || isT104uClearedName(name)) throw new Error(`t104u caution ${name}`);
  const applied = applyT104uRow(lockRecord(name, { name, riskLevel: 'cleared' }, 'clean'));
  const next = applied.inactiveIngredients[0];
  if (next.riskLevel !== 'moderate' || !next.stackCountExempt || ingredientCountsTowardLimitedStack(next)) {
    throw new Error(`t104u apply caution ${name}`);
  }
  if (applied.verdict !== 'caution') throw new Error(`t104u caution verdict ${name} ${applied.verdict}`);
}
const middle = applyT104uRow(lockRecord('middle chain triglycerides', { name: 'middle chain triglycerides', riskLevel: 'cleared' }, 'clean'));
if (middle.inactiveIngredients[0]?.riskLevel !== 'limited' || !ingredientCountsTowardLimitedStack(middle.inactiveIngredients[0])) {
  throw new Error('t104u middle chain');
}
if (isT104uLimitedName('medium chain triglycerides')) throw new Error('t104u medium alias');
for (const name of nearby) {
  if (isT104uClearedName(name) || isT104uCautionName(name) || isT104uLimitedName(name)) {
    throw new Error(`t104u nearby ${name}`);
  }
}
