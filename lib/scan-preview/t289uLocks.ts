import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { cleanTokenWhyForName } from './cleanTokenWhy';
import { t134uWhyForName } from './t134uTokenWhy';
import { t135uGroup, T135U_EXPECTED_RISK, t135uWhyForName } from './t135uTokenWhy';
import { T128U_SORBITOL_WHY } from './t128uTokenWhy';
import { T252U_STACK_NOTE } from './t252uLocks';
import { t240uNorm } from './t240uLocks';
import { t251uLock } from './t251uLocks';
import { t252uLock } from './t252uLocks';
import { t160uGrade } from './t160uLocks';
import { t265uLock } from './t265uLocks';
import { ingredientCountsTowardLimitedStack } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

const CARMINE =
  'Carmine color, a red color from cochineal. It is used to color the product. Carmine is graded Limited as a processed insect-derived color (FDA 21 CFR 73.100).';

const LOCKS = new Map<string, Lock>([
  [t240uNorm('carmine color'), { grade: 'limited', counts: true, why: CARMINE }],
]);

/** Exact string. Carmine color counts. ethyl vanillin stays the existing t265u lock. */
export function t289uLock(name: string): Lock | undefined {
  return LOCKS.get(t240uNorm(name));
}

type Stamped = Lock & { mark: string };

function existing(name: string, form?: string): Stamped | undefined {
  const own = t289uLock(name);
  if (own) return { ...own, mark: 't289u' };
  const vanillin = t265uLock(name);
  if (vanillin) return { ...vanillin, mark: 't265u' };
  const key = t240uNorm(name);
  if (key === 'sorbitol' && t160uGrade(name) === 'limited') {
    return { grade: 'limited', counts: true, why: T128U_SORBITOL_WHY, mark: 't160u' };
  }
  const natural = t252uLock(name, form);
  if (natural && key === 'natural mixed tocopherols') return { ...natural, mark: 't252u' };
  const prior = t251uLock(name, form);
  if (prior && (key === 'caramel color' || key === 'mixed tocopherols')) return { ...prior, mark: 't251u' };
  const dye = t135uGroup(name, form);
  const dyeWhy = t135uWhyForName(name, form);
  if (dye && dyeWhy && (dye === 'red 40' || dye === 'blue 1')) {
    return { grade: T135U_EXPECTED_RISK[dye], counts: false, why: dyeWhy, mark: 't135u' };
  }
  if (key === 'water') {
    const why = cleanTokenWhyForName(name);
    if (why) return { grade: 'cleared', counts: false, why, mark: 't108u' };
  }
  const cleared = t134uWhyForName(name);
  if (cleared && (key === 'gelatin' || key === 'gelatin bovine' || key === 'glycerin')) {
    return { grade: 'cleared', counts: false, why: cleared, mark: 't134u' };
  }
  return undefined;
}

function withGrade(ingredient: IngredientFlag, own: Stamped): IngredientFlag {
  const meth = own.grade === 'high'
    ? `Methodology §5 Avoid (founder lock ${own.mark}).`
    : own.grade === 'limited' && own.counts
      ? `Methodology §5 Limited (founder lock ${own.mark}). Counts toward the 3+ Limited stack.`
      : own.grade === 'moderate'
        ? `Methodology §5 Caution (founder lock ${own.mark}). Does not count toward the t137u stack.`
        : `Methodology §5 Cleared (founder lock ${own.mark}). Does not count toward the t137u stack.`;
  return {
    ...ingredient,
    riskLevel: own.grade,
    stackCountExempt: !own.counts,
    why: own.why,
    source: `Panel; ${meth}`,
  };
}

/** MegaRed batch436 only. The 3+ note is stored only when no Avoid ingredient is present. */
export function applyT289uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('megared-b436-')) return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const own = existing(ingredient.name, record.form);
    return own ? withGrade(ingredient, own) : ingredient;
  });
  const next: RatingRecord = { ...record, inactiveIngredients };
  if (next.inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'high')) {
    const avoided: RatingRecord = { ...next, verdict: 'avoid' };
    delete avoided.honestNote;
    delete avoided.founderHonestNote;
    return avoided;
  }
  const counted = next.inactiveIngredients.filter((ingredient) => ingredientCountsTowardLimitedStack(ingredient)).length;
  if (counted >= 3) {
    return { ...next, verdict: 'avoid', honestNote: T252U_STACK_NOTE, founderHonestNote: T252U_STACK_NOTE };
  }
  const caution: RatingRecord = { ...next, verdict: counted > 0 || next.inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'moderate' || ingredient.riskLevel === 'limited') ? 'caution' : 'clean' };
  delete caution.honestNote;
  delete caution.founderHonestNote;
  return caution;
}

if (t289uLock('carmine color')?.why !== CARMINE) throw new Error('t289u carmine');
if (t289uLock('carmine color')?.counts !== true) throw new Error('t289u carmine count');
if (t289uLock('carmine color')?.grade !== 'limited') throw new Error('t289u carmine grade');
if (t289uLock('carmine')) throw new Error('t289u bare carmine');
if (t265uLock('ethyl vanillin')?.grade !== 'limited' || t265uLock('ethyl vanillin')?.counts !== true) {
  throw new Error('t289u ethyl vanillin lock');
}
