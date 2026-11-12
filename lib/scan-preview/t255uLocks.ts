import type { RatingRecord, RiskLevel } from '../ratingRecord';
import { t240uNorm } from './t240uLocks';
import { t250uLock } from './t250uLocks';
import { t251uLock } from './t251uLocks';
import { t252uLock } from './t252uLocks';
import { t253uLock } from './t253uLocks';
import { t254uLock } from './t254uLocks';
import { computeVerdictFromInactiveIngredients, ingredientCountsTowardLimitedStack } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

export const T255U_STACK_NOTE =
  'This product is Avoid because it contains three or more ingredients that are each graded Limited. When three or more Limited ingredients appear together, the product is graded Avoid.';

const GINSENG = 'Organic Panax ginseng root extract powder. It is added for its plant compounds.';
const ANTIOX =
  'Antioxidant blend of ascorbic acid, ascorbyl palmitate, citric acid, lecithin, mixed tocopherols, and rosemary extract. It is added to help keep the product stable.';
const SOFTGEL =
  'Softgel made from gelatin, glycerin, sorbitol sorbitan solution, and water. It forms the softgel that holds the ingredients.';
const COCOA = 'Cocoa powder (alkalized where listed). It is added for flavor and plant compounds.';
const BLEND =
  'Total Omega oil blend of borage oil, fish oil, and flaxseed oil. It is used as a fill. The blend is graded Limited because it contains borage and flaxseed oils, which are processed seed oils (EFSA and FDA treat refined seed oils as distinct from whole-food oils).';
const FLAX =
  '100% refined, unfiltered organic flaxseed oil. It is the base of this liquid. Flaxseed oil is graded Limited when it is the base of the product and Caution when it is only a fill (highly processed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).';

const CLEARED = new Map<string, string>([
  ['organic panax ginseng root extract powder', GINSENG],
  ['antioxidant blend ascorbic acid ascorbyl palmitate citric acid lecithin mixed tocopherols rosemary extract', ANTIOX],
  ['softgel gelatin glycerin sorbitol sorbitan solution water', SOFTGEL],
  ['alkalized cocoa powder', COCOA],
  ['cocoa powder', COCOA],
]);

const SOURCE: Record<RiskLevel, string> = {
  cleared: 'Methodology §5 Cleared (founder lock t255u). Does not count toward the t137u stack.',
  moderate: 'Methodology §5 Caution (founder lock t255u). Does not count toward the t137u stack.',
  limited: 'Methodology §5 Limited (founder lock t255u). Counts toward the 3+ Limited stack.',
  high: 'Methodology §5 Avoid (founder lock t255u).',
};

function tokenKey(name: string): string {
  return t240uNorm(name);
}

/** Barlean's batch416 only. Hempseed oil and Styrian pumpkin seed oil stay unlocked. */
export function t255uLock(name: string, form?: string): Lock | undefined {
  const key = tokenKey(name);
  const text = (form ?? '').toLowerCase();
  if (key === '100 refined unfiltered organic flaxseed oil') {
    if (/\bliquid\b/.test(text)) return { grade: 'limited', counts: true, why: FLAX };
    return undefined;
  }
  if (key === 'total omega oil blend borage oil fish oil flaxseed oil') {
    return { grade: 'limited', counts: true, why: BLEND };
  }
  const cleared = CLEARED.get(key);
  if (cleared) return { grade: 'cleared', counts: false, why: cleared };
  return undefined;
}

function stampFor(own: Lock, mark: string): string {
  if (mark === 't255u') return SOURCE[own.grade];
  if (mark === 't254u') return own.grade === 'limited'
    ? 'Methodology §5 Limited (founder lock t254u). Counts toward the 3+ Limited stack.'
    : own.grade === 'moderate'
      ? 'Methodology §5 Caution (founder lock t254u). Does not count toward the t137u stack.'
      : 'Methodology §5 Cleared (founder lock t254u). Does not count toward the t137u stack.';
  if (mark === 't253u') return 'Methodology §5 Caution (founder lock t253u). Does not count toward the t137u stack.';
  if (mark === 't252u') return own.grade === 'limited'
    ? 'Methodology §5 Limited (founder lock t252u). Counts toward the 3+ Limited stack.'
    : own.grade === 'moderate'
      ? 'Methodology §5 Caution (founder lock t252u). Does not count toward the t137u stack.'
      : 'Methodology §5 Cleared (founder lock t252u). Does not count toward the t137u stack.';
  if (mark === 't251u') return own.grade === 'limited'
    ? 'Methodology §5 Limited (founder lock t251u). Counts toward the 3+ Limited stack.'
    : own.grade === 'moderate'
      ? 'Methodology §5 Caution (founder lock t251u). Does not count toward the t137u stack.'
      : 'Methodology §5 Cleared (founder lock t251u). Does not count toward the t137u stack.';
  return 'Methodology §5 Caution (founder lock t250u). Does not count toward the t137u stack.';
}

/** Barlean's batch416 only. Other brands keep their stored grades. */
export function applyT255uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('barleans-b416-')) return record;
  let changed = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const chain: Array<[Lock | undefined, string]> = [
      [t255uLock(ingredient.name, record.form), 't255u'],
      [t254uLock(ingredient.name, record.form), 't254u'],
      [t253uLock(ingredient.name, record.form), 't253u'],
      [t252uLock(ingredient.name, record.form), 't252u'],
      [t251uLock(ingredient.name, record.form), 't251u'],
      [t250uLock(ingredient.name), 't250u'],
    ];
    const found = chain.find(([lock]) => lock);
    if (!found || !found[0]) return ingredient;
    const own = found[0];
    const mark = found[1];
    const exempt = !own.counts;
    const stamp = stampFor(own, mark);
    const source = (ingredient.source ?? '').includes(`founder lock ${mark}`)
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
    return { ...next, verdict: 'avoid', honestNote: T255U_STACK_NOTE, founderHonestNote: T255U_STACK_NOTE };
  }
  delete next.honestNote;
  delete next.founderHonestNote;
  return next;
}

if (t255uLock('organic Panax ginseng root extract powder')?.why !== GINSENG) throw new Error('t255u ginseng');
if (t255uLock('Cocoa powder')?.why !== COCOA) throw new Error('t255u cocoa');
if (t255uLock('Alkalized Cocoa powder')?.why !== COCOA) throw new Error('t255u alkalized');
if (t255uLock('100% refined, unfiltered organic Flaxseed Oil', 'liquid')?.counts !== true) throw new Error('t255u flax');
if (t255uLock('100% refined, unfiltered organic Flaxseed Oil', 'softgel')) throw new Error('t255u flax softgel');
if (t255uLock('Total Omega Oil Blend (Borage Oil, Fish Oil, Flaxseed Oil)')?.counts !== true) throw new Error('t255u blend');
if (t255uLock('organic Hempseed Oil')) throw new Error('t255u hemp mismatch');
if (t255uLock('organic Styrian Pumpkin seed oil', 'softgel')) throw new Error('t255u pumpkin mismatch');
if (t255uLock('Softgel (Gelatin, Glycerine, Sorbitol Sorbitan solution, Water)')) throw new Error('t255u glycerine spelling');
