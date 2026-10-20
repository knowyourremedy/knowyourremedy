import type { RatingRecord, RiskLevel } from '../ratingRecord';

export type VerdictRollup = {
  verdict: RatingRecord['verdict'];
  /** Primary driver for grade-change reporting */
  driver: string;
  /** When Avoid is from t137u Limited stack */
  limitedStackTokens?: string[];
  cause:
    | 'high'
    | 'limited_stack'
    | 'moderate'
    | 'limited_1_2'
    | 'silicon_dioxide_cap'
    | 'active_safety_avoid'
    | 'active_safety_caution'
    | 'clean';
};

/** Silicon dioxide family: 0-pt Caution cap; does not count toward the Limited stack (t137u). */
export function isSiliconDioxideStackExempt(name: string): boolean {
  const n = name.trim().toLowerCase();
  if (/calcium silicate/.test(n)) return false;
  return (
    n === 'silicon dioxide'
    || n === 'silica'
    || n === 'colloidal silicon dioxide'
    || /^silicon dioxide\b/.test(n)
  );
}

type IngredientLevel = { name: string; riskLevel: RiskLevel };

function verdictRank(verdict: RatingRecord['verdict']): number {
  if (verdict === 'avoid') return 2;
  if (verdict === 'caution') return 1;
  return 0;
}

export function computeVerdictFromInactiveIngredients(
  inactiveIngredients: IngredientLevel[],
  activeSafetyFlag?: RatingRecord['activeSafetyFlag'],
): VerdictRollup {
  const highNames = inactiveIngredients.filter((i) => i.riskLevel === 'high').map((i) => i.name);
  if (highNames.length > 0) {
    return {
      verdict: 'avoid',
      driver: highNames[0],
      cause: 'high',
    };
  }

  const stackLimited = inactiveIngredients.filter(
    (i) => i.riskLevel === 'limited' && !isSiliconDioxideStackExempt(i.name),
  );
  if (stackLimited.length >= 3) {
    return {
      verdict: 'avoid',
      driver: '3+ Limited tokens (t137u stack)',
      limitedStackTokens: stackLimited.map((i) => i.name),
      cause: 'limited_stack',
    };
  }

  let rollup: VerdictRollup = { verdict: 'clean', driver: 'All Cleared', cause: 'clean' };

  const moderateNames = inactiveIngredients.filter((i) => i.riskLevel === 'moderate').map((i) => i.name);
  if (moderateNames.length > 0) {
    rollup = {
      verdict: 'caution',
      driver: moderateNames[0],
      cause: 'moderate',
    };
  }

  const limitedNames = inactiveIngredients.filter((i) => i.riskLevel === 'limited').map((i) => i.name);
  const stackCount = stackLimited.length;
  if (stackCount >= 1 && stackCount <= 2) {
    rollup = {
      verdict: 'caution',
      driver: stackLimited.map((i) => i.name).join('; '),
      cause: 'limited_1_2',
    };
  }

  const sio2Cap = inactiveIngredients.some(
    (i) => i.riskLevel === 'limited' && isSiliconDioxideStackExempt(i.name),
  );
  if (sio2Cap && rollup.verdict === 'clean') {
    rollup = {
      verdict: 'caution',
      driver: 'Silicon dioxide (0-pt cap)',
      cause: 'silicon_dioxide_cap',
    };
  }

  const cap = activeSafetyFlag?.cappedAt;
  if (cap === 'avoid' || rollup.verdict === 'avoid') {
    return {
      ...rollup,
      verdict: 'avoid',
      driver: cap === 'avoid' ? 'activeSafetyFlag.cappedAt=avoid' : rollup.driver,
      cause: cap === 'avoid' ? 'active_safety_avoid' : rollup.cause,
    };
  }
  if (cap === 'caution' && verdictRank(rollup.verdict) < verdictRank('caution')) {
    return {
      ...rollup,
      verdict: 'caution',
      driver: 'activeSafetyFlag.cappedAt=caution',
      cause: 'active_safety_caution',
    };
  }

  return rollup;
}

export function verdictFromFlagsStrict(record: RatingRecord): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(
    record.inactiveIngredients,
    record.activeSafetyFlag,
  ).verdict;
}

export function verdictFromFlagSpecs(
  specs: readonly (readonly [string, RiskLevel, ...unknown[]])[],
): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(
    specs.map(([name, riskLevel]) => ({ name, riskLevel })),
  ).verdict;
}

export function verdictFromRiskLevels(levels: RiskLevel[]): RatingRecord['verdict'] {
  return computeVerdictFromInactiveIngredients(
    levels.map((riskLevel, idx) => ({ name: `__level_${idx}`, riskLevel })),
  ).verdict;
}

export function appendLimitedStackHonestNote(
  existingNote: string | undefined,
  tokens: string[],
): string {
  const line = `Avoid: three or more Limited tokens triggered the stacking rule (t137u): ${tokens.join(', ')}.`;
  const base = (existingNote ?? '').trim();
  if (base.includes('stacking rule (t137u)')) return base;
  return base ? `${base} ${line}` : line;
}
