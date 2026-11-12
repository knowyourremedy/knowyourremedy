import type { RatingRecord, RiskLevel } from '../ratingRecord';
import { t240uNorm } from './t240uLocks';
import { t250uLock } from './t250uLocks';
import { t251uLock } from './t251uLocks';
import { t252uLock } from './t252uLocks';
import { computeVerdictFromInactiveIngredients, ingredientCountsTowardLimitedStack } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

function fillWhy(name: string): string {
  return `${name}. It is used as a fill in the softgel. ${name} is graded Caution as a fill and Limited or Avoid when it is the base of the product (highly processed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).`;
}

const OILS = new Map<string, string>([
  ['borage seed oil', fillWhy('Borage seed Oil')],
  ['organic evening primrose oil', fillWhy('organic Evening Primrose Oil')],
]);

function tokenKey(name: string): string {
  return t240uNorm(name).split(' ').filter(Boolean).sort().join(' ');
}

/** Caution, no stack, only as a softgel fill. A liquid base stays unlocked. */
export function t253uLock(name: string, form?: string): Lock | undefined {
  const key = tokenKey(name);
  const why = [...OILS.entries()].find(([label]) => tokenKey(label) === key)?.[1];
  if (!why) return undefined;
  if (!/\bsoftgel\b/.test((form ?? '').toLowerCase())) return undefined;
  return { grade: 'moderate', counts: false, why };
}

/** Barlean's batch414 only. Other brands keep their stored grades. */
export function applyT253uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('barleans-b414-')) return record;
  let changed = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const own = t253uLock(ingredient.name, record.form)
      ?? t252uLock(ingredient.name, record.form)
      ?? t251uLock(ingredient.name, record.form)
      ?? t250uLock(ingredient.name);
    if (!own) return ingredient;
    const from253 = t253uLock(ingredient.name, record.form);
    const from252 = !from253 && t252uLock(ingredient.name, record.form);
    const from251 = !from253 && !from252 && t251uLock(ingredient.name, record.form);
    const stamp = from253
      ? 'Methodology §5 Caution (founder lock t253u). Does not count toward the t137u stack.'
      : from252
        ? own.grade === 'limited'
          ? 'Methodology §5 Limited (founder lock t252u). Counts toward the 3+ Limited stack.'
          : own.grade === 'moderate'
            ? 'Methodology §5 Caution (founder lock t252u). Does not count toward the t137u stack.'
            : 'Methodology §5 Cleared (founder lock t252u). Does not count toward the t137u stack.'
        : from251
          ? own.grade === 'limited'
            ? 'Methodology §5 Limited (founder lock t251u). Counts toward the 3+ Limited stack.'
            : own.grade === 'moderate'
              ? 'Methodology §5 Caution (founder lock t251u). Does not count toward the t137u stack.'
              : 'Methodology §5 Cleared (founder lock t251u). Does not count toward the t137u stack.'
          : 'Methodology §5 Caution (founder lock t250u). Does not count toward the t137u stack.';
    const mark = from253 ? 'founder lock t253u' : from252 ? 'founder lock t252u' : from251 ? 'founder lock t251u' : 'founder lock t250u';
    const exempt = !own.counts;
    const source = (ingredient.source ?? '').includes(mark)
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
  const counted = inactiveIngredients.filter((ingredient) => ingredientCountsTowardLimitedStack(ingredient)).length;
  const next: RatingRecord = changed
    ? {
        ...record,
        inactiveIngredients,
        verdict: computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag).verdict,
      }
    : { ...record, inactiveIngredients };
  if (counted >= 3) {
    return next;
  }
  delete next.honestNote;
  delete next.founderHonestNote;
  return next;
}

if (t253uLock('Borage seed Oil', 'softgel')?.grade !== 'moderate') throw new Error('t253u borage');
if (t253uLock('Borage seed Oil', 'softgel')?.counts !== false) throw new Error('t253u borage count');
if (t253uLock('Borage seed Oil', 'liquid')) throw new Error('t253u borage liquid');
if (t253uLock('organic Evening Primrose Oil', 'softgel')?.why.startsWith('organic Evening Primrose Oil. It is used as a fill in the softgel.') !== true) {
  throw new Error('t253u epo why');
}
if (t253uLock('organic Evening Primrose Oil', 'liquid')) throw new Error('t253u epo liquid');
if (t253uLock('Evening Primrose Oil', 'softgel')) throw new Error('t253u bare epo');
if (t253uLock('herbicide and pesticide-free Borage seed oil', 'softgel')) throw new Error('t253u extra words');
