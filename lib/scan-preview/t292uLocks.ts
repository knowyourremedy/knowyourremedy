import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { T252U_STACK_NOTE } from './t252uLocks';
import { t240uNorm } from './t240uLocks';
import { t275uLock } from './t275uLocks';
import { applyT291uRow } from './t291uRows';
import { ingredientCountsTowardLimitedStack, computeVerdictFromInactiveIngredients } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

const STARCH = 'Starch from potato and corn. It is used as a filler and binder.';
const ALGINIC = 'Alginic acid from seaweed. It is used as a binder and thickener.';
const PALM_BASE =
  'Palm oil. It is used as a fill or coating. Palm oil is graded Limited when it is the base of the product or a surface coating, and Caution when it is only a fill (highly processed oil; EFSA and FDA treat refined palm oil as distinct from whole palm).';
const PALM_FILL =
  'Palm oil. It is used as a fill. Palm oil is graded Caution as a fill and Limited or Avoid when it is the base of the product (highly processed oil; EFSA and FDA treat refined palm oil as distinct from whole palm).';
const ALCOHOL =
  'Residual alcohol from extraction. It remains from the extraction process. Residual alcohol is graded Limited as a processing residual (FDA and EFSA treat residual extraction solvents as distinct from intentional alcohol vehicles).';

const CLEARED = new Map<string, Lock>([
  [t240uNorm('starch (potato and corn)'), { grade: 'cleared', counts: false, why: STARCH }],
  [t240uNorm('alginic acid (seaweed)'), { grade: 'cleared', counts: false, why: ALGINIC }],
]);

function palmRole(form?: string): 'fill' | 'base' | undefined {
  const value = (form ?? '').toLowerCase();
  if (/\b(softgel|capsule)\b/.test(value)) return 'fill';
  if (/\b(gummy|gummies|chewable|liquid|oil)\b/.test(value)) return 'base';
  return undefined;
}

/** Exact strings. Palm oil is fill or base only when the form says so. */
export function t292uLock(name: string, form?: string): Lock | undefined {
  const key = t240uNorm(name);
  if (key === 'palm oil') {
    const role = palmRole(form);
    if (role === 'fill') return { grade: 'moderate', counts: false, why: PALM_FILL };
    if (role === 'base') return { grade: 'limited', counts: true, why: PALM_BASE };
    return undefined;
  }
  if (key === 'residual alcohol from extraction') return { grade: 'limited', counts: true, why: ALCOHOL };
  return CLEARED.get(key);
}

function withGrade(ingredient: IngredientFlag, own: Lock, mark: string): IngredientFlag {
  const meth = own.grade === 'high'
    ? `Methodology §5 Avoid (founder lock ${mark}).`
    : own.grade === 'limited' && own.counts
      ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
      : own.grade === 'moderate'
        ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
        : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return {
    ...ingredient,
    riskLevel: own.grade,
    stackCountExempt: !own.counts,
    why: own.why,
    source: `Panel; ${meth}`,
  };
}

const SMART_ID = 'kyolic-b437-smart-mushrooms-60-capsules';

/** Smart Mushrooms+ only. Sunflower oil uses the existing Caution fill lock. No form note. */
export function applyT292uSmartRow(record: RatingRecord): RatingRecord {
  if (record.id !== SMART_ID) return record;
  const base = applyT291uRow(record);
  const sun = t275uLock('sunflower oil', 'softgel');
  const inactiveIngredients = base.inactiveIngredients.map((ingredient) => {
    if (!sun || t240uNorm(ingredient.name) !== 'sunflower oil') return ingredient;
    return withGrade(ingredient, sun, 't275u');
  });
  const next: RatingRecord = {
    ...base,
    inactiveIngredients,
    verdict: 'caution',
    honestNote: '',
    founderHonestNote: '',
  };
  return next;
}

/** Kyolic batch438 only. The 3+ note is stored only on the named Brain Focus row. */
export function applyT292uRow(record: RatingRecord): RatingRecord {
  if (record.id === SMART_ID) return applyT292uSmartRow(record);
  if (!record.id.startsWith('kyolic-b438-')) return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const own = t292uLock(ingredient.name, record.form);
    return own ? withGrade(ingredient, own, 't292u') : ingredient;
  });
  const verdict = computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag).verdict;
  const counted = inactiveIngredients.filter((ingredient) => ingredientCountsTowardLimitedStack(ingredient)).length;
  const high = inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'high');
  const next: RatingRecord = { ...record, inactiveIngredients, verdict: high || counted >= 3 ? 'avoid' : verdict };
  if (!high && counted >= 3 && record.id === 'kyolic-b438-brain-focus-60-caplets') {
    return { ...next, verdict: 'avoid', honestNote: T252U_STACK_NOTE, founderHonestNote: T252U_STACK_NOTE };
  }
  delete next.honestNote;
  delete next.founderHonestNote;
  return next;
}

if (t292uLock('starch (potato and corn)')?.why !== STARCH) throw new Error('t292u starch');
if (t292uLock('alginic acid (seaweed)')?.why !== ALGINIC) throw new Error('t292u alginic');
if (t292uLock('alginic acid')) throw new Error('t292u bare alginic');
if (t292uLock('starch')) throw new Error('t292u bare starch');
if (t292uLock('residual alcohol from extraction')?.why !== ALCOHOL) throw new Error('t292u alcohol');
if (t292uLock('residual alcohol from extraction')?.counts !== true) throw new Error('t292u alcohol count');
if (t292uLock('palm oil', 'capsule')?.why !== PALM_FILL) throw new Error('t292u palm fill');
if (t292uLock('palm oil', 'softgel')?.grade !== 'moderate') throw new Error('t292u palm softgel');
if (t292uLock('palm oil', 'capsule')?.counts !== false) throw new Error('t292u palm fill count');
if (t292uLock('palm oil', 'gummy')?.why !== PALM_BASE) throw new Error('t292u palm base');
if (t292uLock('palm oil', 'gummy')?.counts !== true) throw new Error('t292u palm base count');
if (t292uLock('palm oil', 'tablet')) throw new Error('t292u palm tablet');
if (t292uLock('palm oil')) throw new Error('t292u palm bare');
