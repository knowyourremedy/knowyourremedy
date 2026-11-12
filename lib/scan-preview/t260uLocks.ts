import type { RatingRecord, RiskLevel } from '../ratingRecord';
import { t240uNorm } from './t240uLocks';
import { t259uGrade, t259uPieces } from './t259uLocks';
import { computeVerdictFromInactiveIngredients, ingredientCountsTowardLimitedStack } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

export const T260U_STACK_NOTE =
  'This product is Avoid because it contains three or more ingredients that are each graded Limited. When three or more Limited ingredients appear together, the product is graded Avoid.';

const FLAX_POWDER =
  'Flaxseed oil. It is used as a powder fill. Flaxseed oil is graded Caution as a fill and Limited or Avoid when it is the base of the product (highly processed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).';

function fruitPowder(name: string): string {
  const fruit = name.replace(/\s+powder$/i, '');
  const named = fruit.charAt(0).toUpperCase() + fruit.slice(1).toLowerCase();
  return `${named} powder. It is added for its plant compounds.`;
}

const POWDERS = [
  'organic Acai powder',
  'organic Acerola powder',
  'organic Camu Camu powder',
  'organic Blueberry powder',
  'organic Raspberry powder',
];

const CLEARED = new Map(POWDERS.map((name) => [t240uNorm(name), fruitPowder(name)]));

function keyOf(name: string): string {
  return t240uNorm(name);
}

/** Barlean's batch419 only. Fruit powders are Cleared. Flaxseed oil is Caution only as a powder fill. */
export function t260uLock(name: string, form?: string): Lock | undefined {
  const cleared = CLEARED.get(keyOf(name));
  if (cleared) return { grade: 'cleared', counts: false, why: cleared };
  if (keyOf(name) === keyOf('Flaxseed Oil') && /\bpowder\b/.test((form ?? '').toLowerCase())) {
    return { grade: 'moderate', counts: false, why: FLAX_POWDER };
  }
  return undefined;
}

export function t260uGrade(name: string, form?: string, panel: string[] = []): { lock: Lock; mark: string } | undefined {
  const own = t260uLock(name, form);
  if (own) return { lock: own, mark: 't260u' };
  return t259uGrade(name, form, panel);
}

export { t259uPieces as t260uPieces };

function stampFor(mark: string, grade: RiskLevel): string | undefined {
  if (mark === 't260u') {
    return grade === 'moderate'
      ? 'Methodology §5 Caution (founder lock t260u). Does not count toward the t137u stack.'
      : 'Methodology §5 Cleared (founder lock t260u). Does not count toward the t137u stack.';
  }
  if (mark === 't259u') {
    return grade === 'limited'
      ? 'Methodology §5 Limited (founder lock t259u). Counts toward the 3+ Limited stack.'
      : grade === 'moderate'
        ? 'Methodology §5 Caution (founder lock t259u). Does not count toward the t137u stack.'
        : 'Methodology §5 Cleared (founder lock t259u). Does not count toward the t137u stack.';
  }
  if (mark === 't250u') return 'Methodology §5 Caution (founder lock t250u). Does not count toward the t137u stack.';
  if (mark === 't251u' || mark === 't252u' || mark === 't253u' || mark === 't254u' || mark === 't255u' || mark === 't256u') {
    return grade === 'limited'
      ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
      : grade === 'moderate'
        ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
        : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  }
  return undefined;
}

/** Barlean's batch419 only. Other brands keep their stored grades. */
export function applyT260uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('barleans-b419-')) return record;
  const panel = record.inactiveIngredients.map((ingredient) => ingredient.name);
  let changed = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const hit = t260uGrade(ingredient.name, record.form, panel);
    const stamp = hit ? stampFor(hit.mark, hit.lock.grade) : undefined;
    if (!hit || !stamp) return ingredient;
    const own = hit.lock;
    const exempt = !own.counts;
    const source = (ingredient.source ?? '').includes(`founder lock ${hit.mark}`)
      ? ingredient.source
      : `${ingredient.source ?? 'Panel'}; ${stamp}`;
    if (
      ingredient.riskLevel === own.grade
      && ingredient.stackCountExempt === exempt
      && ingredient.why === own.why
      && source === ingredient.source
    ) {
      return ingredient;
    }
    changed = true;
    return { ...ingredient, riskLevel: own.grade, stackCountExempt: exempt, why: own.why, source };
  });
  const next: RatingRecord = changed
    ? {
        ...record,
        inactiveIngredients,
        verdict: computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag).verdict,
      }
    : { ...record, inactiveIngredients };
  const counted = next.inactiveIngredients.filter((ingredient) => ingredientCountsTowardLimitedStack(ingredient)).length;
  if (counted >= 3) {
    return { ...next, verdict: 'avoid', honestNote: T260U_STACK_NOTE, founderHonestNote: T260U_STACK_NOTE };
  }
  delete next.honestNote;
  delete next.founderHonestNote;
  return next;
}

if (t260uLock('organic Acai powder')?.why !== 'Organic acai powder. It is added for its plant compounds.') {
  throw new Error('t260u acai why');
}
if (t260uLock('organic Raspberry powder')?.counts !== false) throw new Error('t260u raspberry count');
if (t260uLock('organic Acai')) throw new Error('t260u bare acai stays t259');
if (t260uLock('Flaxseed Oil', 'powder')?.grade !== 'moderate') throw new Error('t260u flax powder');
if (t260uLock('Flaxseed Oil', 'powder')?.counts !== false) throw new Error('t260u flax count');
if (t260uLock('Flaxseed Oil', 'powder')?.why !== FLAX_POWDER) throw new Error('t260u flax why');
if (t260uLock('Flaxseed Oil', 'liquid')) throw new Error('t260u flax liquid stays t259');
if (t260uLock('Flaxseed Oil', 'gummy')) throw new Error('t260u flax gummy stays t259');
if (t260uLock('Flaxseed Oil', 'softgel')) throw new Error('t260u flax softgel stays t259');
