import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { T128U_STACK_NOTE } from './t128uTokenWhy';
import { t225uLock } from './t225uLocks';
import { t240uLock, t240uNorm } from './t240uLocks';
import { t242uLock } from './t242uLocks';
import { computeVerdictFromInactiveIngredients, ingredientCountsTowardLimitedStack } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

export const T243U_STACK_NOTE =
  'This product is Avoid because it contains three or more ingredients that are each graded Limited. When three or more Limited ingredients appear together, the product is graded Avoid.';

function liquidBaseWhy(name: string): string {
  return `${name}. It is the base of this liquid. ${name} is graded Avoid when it is the base of the product and Caution when it is only a fill (highly processed oil; EFSA and FDA treat refined oils as distinct from whole-food oils).`;
}

const BEAD_WHY =
  'Coconut and palm kernel oils. They are used as a carrier in the beads. Coconut and Palm Kernel Oils is graded Caution as a carrier and Avoid when it is the base of a chewable (highly processed oil; EFSA and FDA treat refined oils as distinct from whole-food oils).';

const LIQUID_BASE = new Map<string, string>([
  ['sesame oil', 'Sesame Oil'],
  ['wheat germ oil', 'Wheat Germ Oil'],
]);

/** Sesame and wheat germ are Avoid as the base of a liquid. The bead oil is Caution and does not stack. */
export function t243uLock(name: string, form?: string): Lock | undefined {
  const key = t240uNorm(name);
  const text = (form ?? '').toLowerCase();
  const label = LIQUID_BASE.get(key);
  if (label && /liquid/.test(text) && !/gummy|lozenge|chew|softgel|tablet/.test(text)) {
    return { grade: 'high', counts: false, why: liquidBaseWhy(label) };
  }
  if (key === 'coconut and palm kernel oils' && /bead/.test(text)) {
    return { grade: 'moderate', counts: false, why: BEAD_WHY };
  }
  return undefined;
}

/** Sundown batch407 only. Other brands, and earlier Sundown rows, keep their stored grades. */
export function applyT243uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('sundown-b407-')) return record;
  let changed = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const sorbate = t240uNorm(ingredient.name) === 'potassium sorbate' ? t225uLock('potassium sorbate') : undefined;
    const lock = sorbate
      ? { grade: sorbate.grade, counts: sorbate.counts, why: sorbate.why }
      : t243uLock(ingredient.name, record.form)
        ?? t242uLock(ingredient.name, record.form)
        ?? t240uLock(ingredient.name, record.form);
    if (!lock) return ingredient;
    const exempt = !lock.counts;
    const own = t243uLock(ingredient.name, record.form);
    const stamp = sorbate
      ? 'Methodology §5 Caution (founder lock t225u). Does not count toward the t137u stack.'
      : own
        ? own.grade === 'high'
          ? 'Methodology §5 Avoid (founder lock t243u).'
          : 'Methodology §5 Caution (founder lock t243u). Does not count toward the t137u stack.'
        : lock.grade === 'limited'
          ? 'Methodology §5 Limited (founder lock t240u). Counts toward the 3+ Limited stack.'
          : lock.grade === 'high'
            ? 'Methodology §5 Avoid (founder lock t240u).'
            : lock.grade === 'moderate'
              ? 'Methodology §5 Caution (founder lock t240u). Does not count toward the t137u stack.'
              : 'Methodology §5 Cleared (founder lock t240u). Does not count toward the t137u stack.';
    const mark = sorbate ? 'founder lock t225u' : own ? 'founder lock t243u' : 'founder lock t240u';
    const source = (ingredient.source ?? '').includes(mark)
      ? ingredient.source
      : `${ingredient.source ?? 'Panel'}; ${stamp}`;
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
  let next: RatingRecord = changed ? { ...record, inactiveIngredients } : record;
  if (changed) {
    next = {
      ...next,
      verdict: computeVerdictFromInactiveIngredients(next.inactiveIngredients, next.activeSafetyFlag).verdict,
    };
  }
  const counted = next.inactiveIngredients.filter((ingredient) => ingredientCountsTowardLimitedStack(ingredient)).length;
  if (counted >= 3) {
    return { ...next, verdict: 'avoid', honestNote: T243U_STACK_NOTE, founderHonestNote: T243U_STACK_NOTE };
  }
  if (
    next.honestNote === T243U_STACK_NOTE
    || next.founderHonestNote === T243U_STACK_NOTE
    || next.honestNote === T128U_STACK_NOTE
    || next.founderHonestNote === T128U_STACK_NOTE
  ) {
    const cleared = { ...next };
    delete cleared.honestNote;
    delete cleared.founderHonestNote;
    return cleared;
  }
  return next;
}

if (t243uLock('Sesame Oil', 'liquid')?.grade !== 'high') throw new Error('t243u sesame');
if (t243uLock('Wheat Germ Oil', 'liquid')?.why.startsWith('Wheat Germ Oil. It is the base of this liquid.') !== true) {
  throw new Error('t243u wheat why');
}
if (t243uLock('Sesame Oil', 'tablet')) throw new Error('t243u sesame tablet');
if (t243uLock('Coconut and Palm Kernel Oils', 'bead')?.grade !== 'moderate') throw new Error('t243u beads');
if (t243uLock('Coconut and Palm Kernel Oils', 'bead')?.counts !== false) throw new Error('t243u beads count');
if (t243uLock('Coconut and Palm Kernel Oils', 'liquid')) throw new Error('t243u beads liquid');
if (!t243uLock('Coconut and Palm Kernel Oils', 'bead')?.why.startsWith('Coconut and palm kernel oils. They are used as a carrier in the beads. Coconut and Palm Kernel Oils is graded Caution')) {
  throw new Error('t243u bead why');
}
