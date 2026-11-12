import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { T128U_STACK_NOTE } from './t128uTokenWhy';
import { t225uLock } from './t225uLocks';
import { t240uLock, t240uNorm } from './t240uLocks';
import { computeVerdictFromInactiveIngredients, ingredientCountsTowardLimitedStack } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

export const T242U_STACK_NOTE =
  'This product is Avoid because it contains three or more ingredients that are each graded Limited. When three or more Limited ingredients appear together, the product is graded Avoid.';

function oilWhy(name: string): string {
  return `${name}. It is used as a carrier or fill. ${name} is graded Caution as a fill and Avoid when it is the base of a chewable (highly processed oil; EFSA and FDA treat refined oils as distinct from whole-food oils).`;
}

const OILS = new Map<string, string>([
  ['organic palm oil', 'Organic Palm Oil'],
  ['organic safflower oil', 'Organic Safflower Oil'],
  ['fish liver oil', 'Fish Liver Oil'],
  ['canola oil', 'Canola Oil'],
  ['coconut and palm kernel oils', 'Coconut and Palm Kernel Oils'],
  ['sesame oil', 'Sesame Oil'],
  ['wheat germ oil', 'Wheat Germ Oil'],
]);

/** Caution, does not stack, only for a tablet or softgel fill. Other forms stay unlocked. */
export function t242uLock(name: string, form?: string): Lock | undefined {
  const label = OILS.get(t240uNorm(name));
  if (!label) return undefined;
  const text = (form ?? '').toLowerCase();
  if (/gummy|lozenge|chew|liquid|bead|powder|packet/.test(text)) return undefined;
  const tablet = /tablet|caplet|pill/.test(text);
  const softgel = /softgel/.test(text);
  if (!tablet && !softgel) return undefined;
  return { grade: 'moderate', counts: false, why: oilWhy(label) };
}

const SOURCE = 'Methodology §5 Caution (founder lock t242u). Does not count toward the t137u stack.';

/** Sundown batch406 only. Other brands, and earlier Sundown rows, keep their stored grades. */
export function applyT242uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('sundown-b406-')) return record;
  let changed = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const sorbate = t240uNorm(ingredient.name) === 'potassium sorbate' ? t225uLock('potassium sorbate') : undefined;
    const oil = t242uLock(ingredient.name, record.form);
    const prior = t240uLock(ingredient.name, record.form);
    const lock = sorbate
      ? { grade: sorbate.grade, counts: sorbate.counts, why: sorbate.why }
      : oil ?? prior;
    if (!lock) return ingredient;
    const exempt = !lock.counts;
    const stamp = sorbate
      ? 'Methodology §5 Caution (founder lock t225u). Does not count toward the t137u stack.'
      : oil
        ? SOURCE
        : lock.grade === 'limited'
          ? 'Methodology §5 Limited (founder lock t240u). Counts toward the 3+ Limited stack.'
          : lock.grade === 'high'
            ? 'Methodology §5 Avoid (founder lock t240u).'
            : lock.grade === 'moderate'
              ? 'Methodology §5 Caution (founder lock t240u). Does not count toward the t137u stack.'
              : 'Methodology §5 Cleared (founder lock t240u). Does not count toward the t137u stack.';
    const mark = sorbate ? 'founder lock t225u' : oil ? 'founder lock t242u' : 'founder lock t240u';
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
    return {
      ...next,
      verdict: 'avoid',
      honestNote: T242U_STACK_NOTE,
      founderHonestNote: T242U_STACK_NOTE,
    };
  }
  if (next.honestNote === T242U_STACK_NOTE || next.founderHonestNote === T242U_STACK_NOTE || next.honestNote === T128U_STACK_NOTE || next.founderHonestNote === T128U_STACK_NOTE) {
    const cleared = { ...next };
    if (cleared.honestNote === T128U_STACK_NOTE) delete cleared.honestNote;
    if (cleared.founderHonestNote === T128U_STACK_NOTE) delete cleared.founderHonestNote;
    return cleared;
  }
  return next;
}

if (t242uLock('organic Palm Oil', 'tablet')?.grade !== 'moderate') throw new Error('t242u palm tablet');
if (t242uLock('organic Palm Oil', 'tablet')?.counts !== false) throw new Error('t242u palm counts');
if (t242uLock('Fish Liver Oil', 'softgel')?.why.startsWith('Fish Liver Oil.') !== true) throw new Error('t242u fish why');
if (t242uLock('Sesame Oil', 'liquid')) throw new Error('t242u sesame liquid');
if (t242uLock('Wheat Germ Oil', 'liquid')) throw new Error('t242u wheat liquid');
if (t242uLock('Coconut and Palm Kernel Oils', 'bead')) throw new Error('t242u beads');
if (t242uLock('organic Palm Oil', 'gummy')) throw new Error('t242u palm gummy');
if (!t242uLock('organic Safflower Oil', 'Tablet or Pill')?.why.includes('Organic Safflower Oil is graded Caution as a fill')) {
  throw new Error('t242u safflower why');
}
