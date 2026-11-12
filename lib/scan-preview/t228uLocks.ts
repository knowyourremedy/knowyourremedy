import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { T128U_STACK_NOTE } from './t128uTokenWhy';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

export const T228U_VITAMIN_C_NOTE =
  'This product is Avoid because it contains three or more ingredients that are each graded Limited. When three or more Limited ingredients appear together, the product is graded Avoid.';

const EXACT = new Map<string, Lock>([
  ['herbal flavoring mixture containing extracts of licorice', {
    grade: 'moderate',
    counts: false,
    why: 'Herbal flavoring mixture containing extracts of licorice. It adds herbal flavor to the product. Natural herbal flavoring mixtures are graded Caution because the exact sources and processing are not fully specified on the panel.',
  }],
  ['alpha lipoic acid', {
    grade: 'cleared',
    counts: false,
    why: 'Alpha lipoic acid, an antioxidant compound. It is added to help keep the product stable.',
  }],
  ['caprylic acid', {
    grade: 'cleared',
    counts: false,
    why: 'Caprylic acid, a medium-chain fatty acid. It is used as a carrier and to help keep the product stable.',
  }],
  ['capric acid', {
    grade: 'cleared',
    counts: false,
    why: 'Capric acid, a medium-chain fatty acid. It is used as a carrier and to help keep the product stable.',
  }],
  ['yellow beeswax', {
    grade: 'cleared',
    counts: false,
    why: 'Yellow beeswax. It is used as a coating and to help the softgel hold its shape.',
  }],
  ['caramel liquid', {
    grade: 'limited',
    counts: true,
    why: 'Caramel liquid, a caramel color. It is used to color the product. Caramel color is graded Limited as a processed color (existing caramel lock).',
  }],
  ['aspartic acid', {
    grade: 'limited',
    counts: true,
    why: 'Aspartic acid, an amino acid. It is used as a filler. Aspartic acid is graded Limited as a free amino acid excipient when not part of a named complex.',
  }],
  ['CanTab Plus® (dextrose and magnesium stearate)', {
    grade: 'limited',
    counts: true,
    why: 'CanTab Plus, a blend of dextrose and magnesium stearate. It is used as a tablet base. Dextrose is graded Limited as a processed sugar.',
  }],
]);

export function t228uLock(name: string): Lock | undefined {
  return EXACT.get(name.trim().replace(/\s+/g, ' '));
}

const SOURCE: Record<RiskLevel, string> = {
  cleared: 'Methodology §5 Cleared (founder lock t228u). Does not count toward the t137u stack.',
  moderate: 'Methodology §5 Caution (founder lock t228u). Does not count toward the t137u stack.',
  limited: 'Methodology §5 Limited (founder lock t228u). Counts toward the 3+ Limited stack.',
  high: 'Methodology §5 Avoid (founder lock t228u).',
};

/** Grades and why text on Professional Formulas rows only. Other brands stay as they are. */
export function applyT228uIngredients(ingredients: readonly IngredientFlag[], record: RatingRecord): IngredientFlag[] {
  if (record.brand !== 'Professional Formulas') return ingredients as IngredientFlag[];
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const lock = t228uLock(ingredient.name);
    if (!lock) return ingredient;
    const exempt = !lock.counts;
    const source = (ingredient.source ?? '').includes('founder lock t228u')
      ? ingredient.source
      : `${ingredient.source ?? 'Panel'}; ${SOURCE[lock.grade]}`;
    if (
      ingredient.riskLevel === lock.grade
      && ingredient.stackCountExempt === exempt
      && ingredient.why === lock.why
      && source === ingredient.source
    ) {
      return ingredient;
    }
    changed = true;
    return { ...ingredient, riskLevel: lock.grade, stackCountExempt: exempt, why: lock.why, source };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

export function applyT228uRow(record: RatingRecord): RatingRecord {
  const inactiveIngredients = applyT228uIngredients(record.inactiveIngredients, record);
  let next = record;
  if (inactiveIngredients !== record.inactiveIngredients) {
    const verdict = record.brand === 'Professional Formulas'
      ? computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag).verdict
      : record.verdict;
    next = { ...record, inactiveIngredients, verdict };
  }
  if (next.id === 'pf-b400-vitamin-c-chewable') {
    if (next.honestNote === T228U_VITAMIN_C_NOTE && next.founderHonestNote === T228U_VITAMIN_C_NOTE) return next;
    return { ...next, honestNote: T228U_VITAMIN_C_NOTE, founderHonestNote: T228U_VITAMIN_C_NOTE };
  }
  if (
    next.id.startsWith('pf-b402-')
    && (next.honestNote === T128U_STACK_NOTE || next.founderHonestNote === T128U_STACK_NOTE)
  ) {
    const cleared = { ...next };
    if (cleared.honestNote === T128U_STACK_NOTE) delete cleared.honestNote;
    if (cleared.founderHonestNote === T128U_STACK_NOTE) delete cleared.founderHonestNote;
    return cleared;
  }
  return next;
}

if (t228uLock('herbal flavoring mixture containing extracts of licorice')?.grade !== 'moderate') throw new Error('t228u herbal');
if (t228uLock('herbal flavoring mixture containing extracts of licorice')?.counts !== false) throw new Error('t228u herbal stack');
if (t228uLock('alpha lipoic acid')?.grade !== 'cleared') throw new Error('t228u ala');
if (t228uLock('caramel liquid')?.counts !== true) throw new Error('t228u caramel');
if (t228uLock('aspartic acid')?.counts !== true) throw new Error('t228u aspartic');
if (t228uLock('CanTab Plus® (dextrose and magnesium stearate)')?.grade !== 'limited') throw new Error('t228u cantab');
if (t228uLock('CanTab Plus (dextrose and magnesium stearate)')) throw new Error('t228u cantab bare');
if (t228uLock('potassium sorbate')) throw new Error('t228u sorbate');
