import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { t240uNorm } from './t240uLocks';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

const SOY =
  'Soybean oil. It is used as a fill in the softgel. Soybean oil is graded Caution as a fill and Avoid when it is the base of a chewable (highly processed seed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).';
const SUN =
  'Sunflower oil. It is used as a fill in the softgel. Sunflower oil is graded Caution as a fill and Avoid when it is the base of a chewable (highly processed seed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).';

function fill(form?: string): boolean {
  return /\bsoftgel\b/.test((form ?? '').toLowerCase());
}

/** Softgel fill only. Caution, and it does not count. */
export function t275uLock(name: string, form?: string): Lock | undefined {
  if (!fill(form)) return undefined;
  const key = t240uNorm(name);
  if (key === 'soybean oil') return { grade: 'moderate', counts: false, why: SOY };
  if (key === 'sunflower oil') return { grade: 'moderate', counts: false, why: SUN };
  return undefined;
}

function withGrade(ingredient: IngredientFlag, own: Lock): IngredientFlag {
  const meth = 'Methodology §5 Caution (founder lock t275u). Does not count toward the t137u stack.';
  const source = (ingredient.source ?? '').includes('founder lock t275u')
    ? ingredient.source
    : `${ingredient.source ?? 'Panel'}; ${meth}`;
  return {
    ...ingredient,
    riskLevel: own.grade,
    stackCountExempt: true,
    why: own.why,
    source,
  };
}

/** Blue Light only. The row stays Avoid. No 3+ note. */
export function applyT275uRow(record: RatingRecord): RatingRecord {
  if (record.id !== 'ocuvite-b426-blue-light-30-softgels') return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const own = t275uLock(ingredient.name, record.form);
    return own ? withGrade(ingredient, own) : ingredient;
  });
  const next: RatingRecord = { ...record, inactiveIngredients, verdict: 'avoid' };
  delete next.honestNote;
  delete next.founderHonestNote;
  return next;
}

if (t275uLock('Soybean oil', 'softgel')?.why !== SOY) throw new Error('t275u soy why');
if (t275uLock('sunflower oil', 'softgel')?.why !== SUN) throw new Error('t275u sun why');
if (t275uLock('Soybean oil', 'softgel')?.grade !== 'moderate') throw new Error('t275u soy grade');
if (t275uLock('sunflower oil', 'softgel')?.counts !== false) throw new Error('t275u sun count');
if (t275uLock('Soybean oil', 'gummy')) throw new Error('t275u gummy soy');
if (t275uLock('sunflower oil', 'gummy')) throw new Error('t275u gummy sun');
if (t275uLock('sunflower seed oil', 'softgel')) throw new Error('t275u seed oil');
