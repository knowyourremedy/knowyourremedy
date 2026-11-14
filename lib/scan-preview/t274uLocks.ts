import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { t135uGroup, T135U_EXPECTED_RISK } from './t135uTokenWhy';
import { t141uGroup } from './t141uTokenWhy';
import { t165uGrade } from './t165uLocks';
import { t240uLock, t240uNorm } from './t240uLocks';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

const TOCOPHEROLS = 'Natural tocopherols. It is added to help keep the product stable.';
const FISH =
  'Fish oil from anchovies, sardines, mackerel, and tuna. It is used as a fill or carrier. Fish oil is graded Cleared as a named oil fill.';

const LOCKS = new Map<string, Lock>([
  [t240uNorm('natural tocopherols'), { grade: 'cleared', counts: false, why: TOCOPHEROLS }],
  [t240uNorm('Fish oil (from Anchovies, Sardines, Mackerel, Tuna)'), { grade: 'cleared', counts: false, why: FISH }],
]);

/** Exact strings. Both are Cleared and do not count. */
export function t274uLock(name: string): Lock | undefined {
  return LOCKS.get(t240uNorm(name));
}

function withGrade(ingredient: IngredientFlag, own: Lock, mark: string): IngredientFlag {
  const meth = own.grade === 'high'
    ? `Methodology §5 Avoid (founder lock ${mark}).`
    : own.grade === 'limited'
      ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
      : own.grade === 'moderate'
        ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
        : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  const source = (ingredient.source ?? '').includes(`founder lock ${mark}`)
    ? ingredient.source
    : `${ingredient.source ?? 'Panel'}; ${meth}`;
  return {
    ...ingredient,
    riskLevel: own.grade,
    stackCountExempt: !own.counts,
    why: own.why || ingredient.why,
    source,
  };
}

/** Ocuvite batch426 only. Avoid ingredients stay Avoid. No 3+ note is stored. */
export function applyT274uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('ocuvite-b426-')) return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const own = t274uLock(ingredient.name);
    if (own) return withGrade(ingredient, own, 't274u');
    const key = t240uNorm(ingredient.name);
    const oil = t240uLock(ingredient.name, record.form);
    if (oil && (key === 'soybean oil' || key === 'titanium dioxide' || key === 'natural flavor')) {
      return withGrade(ingredient, { grade: oil.grade, counts: oil.counts, why: oil.why }, 't240u');
    }
    const dye = t135uGroup(ingredient.name, record.form);
    if (dye && T135U_EXPECTED_RISK[dye] === 'high') {
      return withGrade(ingredient, { grade: 'high', counts: false, why: ingredient.why ?? '' }, 't135u');
    }
    if (t141uGroup(ingredient.name, record.form) === 'caramel') {
      return withGrade(ingredient, { grade: 'moderate', counts: false, why: ingredient.why ?? '' }, 't141u');
    }
    if (key === 'carmine' && t165uGrade(ingredient.name) === 'limited') {
      return withGrade(ingredient, { grade: 'limited', counts: true, why: ingredient.why ?? '' }, 't165u');
    }
    if (key === 'sunflower oil') {
      return withGrade(ingredient, { grade: 'cleared', counts: false, why: ingredient.why ?? '' }, 'clean alias');
    }
    return ingredient;
  });
  const next: RatingRecord = { ...record, inactiveIngredients };
  if (next.inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'high')) {
    const avoided: RatingRecord = { ...next, verdict: 'avoid' };
    delete avoided.honestNote;
    delete avoided.founderHonestNote;
    return avoided;
  }
  return next;
}

if (t274uLock('natural tocopherols')?.why !== TOCOPHEROLS) throw new Error('t274u tocopherols why');
if (t274uLock('natural tocopherols')?.counts !== false) throw new Error('t274u tocopherols count');
if (t274uLock('natural tocopherols')?.grade !== 'cleared') throw new Error('t274u tocopherols grade');
if (t274uLock('Fish oil (from Anchovies, Sardines, Mackerel, Tuna)')?.why !== FISH) throw new Error('t274u fish why');
if (t274uLock('Fish oil (from Anchovies, Sardines, Mackerel, Tuna)')?.counts !== false) throw new Error('t274u fish count');
if (t274uLock('Fish oil')) throw new Error('t274u bare fish oil');
