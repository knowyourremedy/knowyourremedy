import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { T128U_SILICA_WHY } from './t128uTokenWhy';
import { ingredientCountsTowardLimitedStack } from './verdictFromFlags';
import { t135uGroup, T135U_EXPECTED_RISK, t135uWhyForName } from './t135uTokenWhy';
import { t160uGrade } from './t160uLocks';
import { t240uLock, t240uNorm } from './t240uLocks';
import { t275uLock } from './t275uLocks';
import { t280uLock } from './t280uLocks';

export const T283U_STACK_NOTE =
  'This product is Avoid because it contains three or more ingredients that are each graded Limited. When three or more Limited ingredients appear together, the product is graded Avoid.';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

const THYME = 'Thyme extract. It is added for its plant compounds.';
const CHLOROPHYLLIN =
  'Sodium copper chlorophyllin, a copper complex of chlorophyll. It is added for color.';
const LINSEED_BASE =
  'Linseed oil. It is used as a fill or coating. Linseed oil is graded Limited when it is the base of the product or a surface coating, and Caution when it is only a fill (highly processed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).';
const LINSEED_FILL =
  'Linseed oil. It is used as a fill in the softgel. Linseed oil is graded Caution as a fill and Limited or Avoid when it is the base of the product (highly processed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).';

const LOCKS = new Map<string, Lock>([
  [t240uNorm('thyme extract'), { grade: 'cleared', counts: false, why: THYME }],
  [t240uNorm('sodium copper chlorophyllin'), { grade: 'cleared', counts: false, why: CHLOROPHYLLIN }],
]);

function isSoftgelFill(form?: string): boolean {
  return /\bsoftgel\b/.test((form ?? '').toLowerCase());
}

/** Exact strings. Linseed oil is Caution only as a softgel fill. silicone dioxide is not a new entry. */
export function t283uLock(name: string, form?: string): Lock | undefined {
  const key = t240uNorm(name);
  if (key === 'linseed oil') {
    if (isSoftgelFill(form)) return { grade: 'moderate', counts: false, why: LINSEED_FILL };
    return { grade: 'limited', counts: true, why: LINSEED_BASE };
  }
  return LOCKS.get(key);
}

/** Spelling variant only. The grade is the existing Silicon Dioxide lock. */
export function t283uSiliconDioxideVariant(name: string): Lock | undefined {
  if (t240uNorm(name) !== 'silicone dioxide') return undefined;
  if (t160uGrade('silicon dioxide') !== 'moderate') return undefined;
  return { grade: 'moderate', counts: false, why: T128U_SILICA_WHY };
}

function withGrade(ingredient: IngredientFlag, own: Lock, mark: string): IngredientFlag {
  const meth = own.grade === 'high'
    ? `Methodology §5 Avoid (founder lock ${mark}).`
    : own.grade === 'limited' && own.counts
      ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
      : own.grade === 'limited'
        ? `Methodology §5 Limited (founder lock ${mark}). Does not count toward the t137u stack.`
        : own.grade === 'moderate'
          ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
          : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  const source = `${ingredient.source ?? 'Panel'}; ${meth}`;
  return {
    ...ingredient,
    riskLevel: own.grade,
    stackCountExempt: !own.counts,
    why: own.why || ingredient.why,
    source,
  };
}

/** PreserVision batch432 only. The chewables note is kept only when the Avoid grade is the 3+ stack. */
export function applyT283uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('preservision-b432-')) return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const silica = t283uSiliconDioxideVariant(ingredient.name);
    if (silica) return withGrade(ingredient, silica, 't160u');
    if (t240uNorm(ingredient.name) === 'mannitol' && t160uGrade(ingredient.name) === 'limited') {
      return withGrade(ingredient, { grade: 'limited', counts: false, why: ingredient.why ?? '' }, 't160u');
    }
    const key = t240uNorm(ingredient.name);
    if (key === 'hydroxypropylcellulose' || key === 'hydroxypropyl cellulose') {
      const hpc = t280uLock('hydroxypropyl cellulose');
      if (hpc) return withGrade(ingredient, hpc, 't280u');
    }
    const own = t283uLock(ingredient.name, record.form);
    if (own) return withGrade(ingredient, own, 't283u');
    const soy = key === 'soybean oil' ? t275uLock(ingredient.name, record.form) : undefined;
    if (soy) return withGrade(ingredient, soy, 't275u');
    const prior = t240uLock(ingredient.name, record.form);
    if (prior && (prior.grade === 'high' || prior.counts || key === 'titanium dioxide' || key === 'natural flavor' || key === 'crospovidone')) {
      return withGrade(ingredient, { grade: prior.grade, counts: prior.counts, why: prior.why }, 't240u');
    }
    const dye = t135uGroup(ingredient.name, record.form);
    if (dye && T135U_EXPECTED_RISK[dye] === 'high') {
      return withGrade(ingredient, { grade: 'high', counts: false, why: t135uWhyForName(ingredient.name, record.form) || ingredient.why || '' }, 't135u');
    }
    if (dye === 'sucralose') {
      return withGrade(ingredient, { grade: 'limited', counts: true, why: t135uWhyForName(ingredient.name, record.form) || ingredient.why || '' }, 't135u');
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
  const counted = next.inactiveIngredients.filter((ingredient) => ingredientCountsTowardLimitedStack(ingredient)).length;
  if (counted >= 3) {
    return { ...next, verdict: 'avoid', honestNote: T283U_STACK_NOTE, founderHonestNote: T283U_STACK_NOTE };
  }
  const cleared: RatingRecord = { ...next };
  delete cleared.honestNote;
  delete cleared.founderHonestNote;
  return cleared;
}

if (t283uLock('thyme extract')?.why !== THYME) throw new Error('t283u thyme');
if (t283uLock('sodium copper chlorophyllin')?.why !== CHLOROPHYLLIN) throw new Error('t283u chlorophyllin');
if (t283uLock('thyme extract')?.counts !== false) throw new Error('t283u thyme count');
if (t283uLock('linseed oil', 'softgel')?.why !== LINSEED_FILL) throw new Error('t283u linseed fill');
if (t283uLock('linseed oil', 'softgel')?.counts !== false) throw new Error('t283u linseed fill count');
if (t283uLock('linseed oil', 'softgel')?.grade !== 'moderate') throw new Error('t283u linseed fill grade');
if (t283uLock('linseed oil', 'capsule')?.why !== LINSEED_BASE) throw new Error('t283u linseed base');
if (t283uLock('linseed oil', 'capsule')?.counts !== true) throw new Error('t283u linseed base count');
if (t283uLock('silicone dioxide')) throw new Error('t283u no silicone entry');
if (t283uSiliconDioxideVariant('silicone dioxide')?.grade !== 'moderate') throw new Error('t283u silica variant');
if (t283uSiliconDioxideVariant('silicone dioxide')?.counts !== false) throw new Error('t283u silica count');
