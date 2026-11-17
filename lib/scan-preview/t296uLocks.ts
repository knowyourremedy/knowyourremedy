import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { t240uNorm } from './t240uLocks';
import { t256uResolve } from './t256uLocks';
import { t259uLock } from './t259uLocks';
import { t295uLock } from './t295uLocks';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

const RASPBERRY = 'Natural raspberry flavor. It adds raspberry taste to the product.';
const CHAMOMILE = 'German chamomile flower. It is added for its plant compounds.';
const ROSE = 'Dog rose fruit (hip). It is added for its plant compounds.';
const ANISE_SEED = 'Anise seed. It is added for its plant compounds.';
const ASTAXANTHIN = 'Astaxanthin complex from Haematococcus pluvialis whole algae extract. It is added for its antioxidant compounds.';
const SPINACH = 'Spinach. It is added for its plant compounds.';
const ANISE = 'Anise. It is added for its plant compounds.';

const LOCKS = new Map<string, Lock>([
  [t240uNorm('natural raspberry flavor'), { grade: 'cleared', counts: false, why: RASPBERRY }],
  [t240uNorm('German chamomile flower'), { grade: 'cleared', counts: false, why: CHAMOMILE }],
  [t240uNorm('dog rose fruit (hip)'), { grade: 'cleared', counts: false, why: ROSE }],
  [t240uNorm('anise seed'), { grade: 'cleared', counts: false, why: ANISE_SEED }],
  [t240uNorm('astaxanthin complex (from Haematococcus pluvialis whole algae extract)'), { grade: 'cleared', counts: false, why: ASTAXANTHIN }],
  [t240uNorm('spinach'), { grade: 'cleared', counts: false, why: SPINACH }],
  [t240uNorm('anise'), { grade: 'cleared', counts: false, why: ANISE }],
]);

/** Exact strings. The aqueous-extract wrappers are not locks. */
export function t296uLock(name: string): Lock | undefined {
  const key = t240uNorm(name);
  if (key.startsWith('aqueous extract')) return undefined;
  return LOCKS.get(key);
}

function withGrade(ingredient: IngredientFlag, own: Lock, mark: string): IngredientFlag {
  const meth = own.grade === 'limited' && own.counts
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

/** Flora batch442 only. No 3+ note is stored. */
export function applyT296uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('flora-b442-')) return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const named = t296uLock(ingredient.name);
    if (named) return withGrade(ingredient, named, 't296u');
    const prior = t295uLock(ingredient.name, record.form);
    if (prior) return withGrade(ingredient, prior, 't295u');
    if (t240uNorm(ingredient.name) === 'maltodextrin') {
      const malto = t259uLock(ingredient.name);
      if (malto?.why) return withGrade(ingredient, malto, 't259u');
    }
    const hit = t256uResolve(ingredient.name, record.form);
    if (hit?.lock.why && (t240uNorm(ingredient.name) === 'xylitol' || t240uNorm(ingredient.name) === 'natural flavors')) {
      return withGrade(ingredient, hit.lock, hit.mark === 'stored' ? 't160u' : hit.mark);
    }
    return ingredient;
  });
  const next: RatingRecord = {
    ...record,
    inactiveIngredients,
    verdict: computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag).verdict,
  };
  delete next.honestNote;
  delete next.founderHonestNote;
  return next;
}

if (t296uLock('natural raspberry flavor')?.why !== RASPBERRY) throw new Error('t296u raspberry');
if (t296uLock('German chamomile flower')?.why !== CHAMOMILE) throw new Error('t296u chamomile');
if (t296uLock('dog rose fruit (hip)')?.why !== ROSE) throw new Error('t296u rose');
if (t296uLock('anise seed')?.why !== ANISE_SEED) throw new Error('t296u anise seed');
if (t296uLock('astaxanthin complex (from Haematococcus pluvialis whole algae extract)')?.why !== ASTAXANTHIN) throw new Error('t296u astaxanthin');
if (t296uLock('spinach')?.why !== SPINACH) throw new Error('t296u spinach');
if (t296uLock('anise')?.why !== ANISE) throw new Error('t296u anise');
if (t296uLock('aqueous extract of spinach and anise')) throw new Error('t296u wrapper');
if (t296uLock('anise')?.counts !== false) throw new Error('t296u anise count');
