import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import {
  isT144eCautionName,
  isT83uBareShellLimitedName,
  isT83uClearedName,
  isT83uHydrogenatedPeanutOilName,
} from './limitedStackEligibility';
import {
  computeVerdictFromInactiveIngredients,
  limitedStackHonestNoteIfAny,
  replaceLimitedStackHonestNote,
  stripLimitedStackHonestNote,
} from './verdictFromFlags';

export const T83U_CLEARED_SOURCE =
  'Methodology §5 Cleared (t83u). This exact printed string is Cleared and does not stack.';

function panelPrefix(source: string | undefined): string {
  const panel = source?.split(';')[0]?.trim();
  return panel && panel.length > 0 ? panel : 'Panel';
}

function rewriteIngredient(ingredient: IngredientFlag): IngredientFlag {
  if (!isT83uClearedName(ingredient.name)) return ingredient;
  if (ingredient.riskLevel === 'cleared') return ingredient;
  return {
    ...ingredient,
    riskLevel: 'cleared',
    stackCountExempt: true,
    source: `${panelPrefix(ingredient.source)}; ${T83U_CLEARED_SOURCE}`,
  };
}

export const T83U_BARE_SHELL_SOURCE =
  'Methodology §5 Limited (t83 decision). This exact bare shell counts toward the t137u stack. It is not a named polymer capsule.';

export const T83U_PEANUT_OIL_SOURCE =
  'Methodology §5 Avoid (hydrogenated peanut oil — t83 decision). This replaces the t141e Caution call. One Avoid token makes the product Avoid.';

export const T83U_CASTOR_OIL_SOURCE =
  'Methodology §5 Caution (Hydrogenated Castor Oil — t83 decision). This confirms the t144e call and replaces the Oct 15 Avoid family for this exact oil. It does not stack.';

function rewriteDecision(ingredient: IngredientFlag): IngredientFlag {
  if (isT83uBareShellLimitedName(ingredient.name)) {
    if (ingredient.riskLevel === 'limited' && !ingredient.stackCountExempt) return ingredient;
    return {
      ...ingredient,
      riskLevel: 'limited' as RiskLevel,
      stackCountExempt: undefined,
      source: `${panelPrefix(ingredient.source)}; ${T83U_BARE_SHELL_SOURCE}`,
    };
  }
  if (isT83uHydrogenatedPeanutOilName(ingredient.name)) {
    if (ingredient.riskLevel === 'high') return ingredient;
    return {
      ...ingredient,
      riskLevel: 'high' as RiskLevel,
      stackCountExempt: undefined,
      source: `${panelPrefix(ingredient.source)}; ${T83U_PEANUT_OIL_SOURCE}`,
    };
  }
  if (isT144eCautionName(ingredient.name)) {
    if (ingredient.riskLevel === 'moderate' && ingredient.stackCountExempt) return ingredient;
    return {
      ...ingredient,
      riskLevel: 'moderate' as RiskLevel,
      stackCountExempt: true,
      source: `${panelPrefix(ingredient.source)}; ${T83U_CASTOR_OIL_SOURCE}`,
    };
  }
  return ingredient;
}

function decisionTouches(record: RatingRecord): boolean {
  return record.inactiveIngredients.some((ingredient) => (
    isT83uBareShellLimitedName(ingredient.name)
    || isT83uHydrogenatedPeanutOilName(ingredient.name)
    || isT144eCautionName(ingredient.name)
  ));
}

/** Apply the t83 founder answers. Does not add tokens. */
export function applyT83DecisionRow(record: RatingRecord): RatingRecord {
  if (!decisionTouches(record)) return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => rewriteDecision(ingredient));
  const rollup = computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag);
  let honestNote = record.honestNote;
  if (rollup.cause === 'limited_stack') {
    honestNote = replaceLimitedStackHonestNote(honestNote, rollup.limitedStackTokens ?? []);
  } else if (honestNote && /stacking rule \(t137u\)/.test(honestNote)) {
    const stripped = stripLimitedStackHonestNote(honestNote);
    honestNote = stripped.length > 0 ? stripped : undefined;
  }
  const stackNote = limitedStackHonestNoteIfAny(inactiveIngredients);
  if (stackNote && !(honestNote ?? '').includes('stacking rule (t137u)')) {
    honestNote = `${stackNote} ${honestNote ?? ''}`.trim();
  }
  return {
    ...record,
    inactiveIngredients,
    verdict: rollup.verdict,
    honestNote,
  };
}

/** Re-grade the t83u exact strings to Cleared. Does not add tokens. */
export function applyT83uRow(record: RatingRecord): RatingRecord {
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
