import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { t240uLock, t240uNorm } from './t240uLocks';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

const CARROT = 'Black carrot extract. It is added for color and plant compounds.';
const VANILLA = 'Natural vanilla powder. It adds vanilla flavor to the product.';
const HPC =
  'Hydroxypropyl cellulose. It is used as a coating and binder. Hydroxypropyl cellulose is graded Limited as a processed cellulose derivative (FDA 21 CFR 172.870).';
const MCT =
  'Medium chain triglycerides from safflower oil. It is used as a fill or coating. Medium chain triglycerides are graded Limited as a processed oil (EFSA and FDA treat refined MCT oils as distinct from whole-food oils).';
const PEG =
  'Polyethylene glycol. It is used as a coating and plasticizer. Polyethylene glycol is graded Limited as a synthetic polymer (FDA 21 CFR 172.820).';

const LOCKS = new Map<string, Lock>([
  [t240uNorm('Black Carrot Extract'), { grade: 'cleared', counts: false, why: CARROT }],
  [t240uNorm('natural vanilla powder'), { grade: 'cleared', counts: false, why: VANILLA }],
  [t240uNorm('hydroxypropyl cellulose'), { grade: 'limited', counts: true, why: HPC }],
  [t240uNorm('medium chain triglycerides (safflower oil)'), { grade: 'limited', counts: true, why: MCT }],
  [t240uNorm('polyethylene glycol'), { grade: 'limited', counts: true, why: PEG }],
]);

/** Exact strings. Cleared locks do not count. The three Limited locks do. */
export function t280uLock(name: string): Lock | undefined {
  return LOCKS.get(t240uNorm(name));
}

function withGrade(ingredient: IngredientFlag, own: Lock, mark: string): IngredientFlag {
  const meth = own.grade === 'high'
    ? `Methodology §5 Avoid (founder lock ${mark}).`
    : own.grade === 'limited'
      ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
      : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  const source = (ingredient.source ?? '').includes(`founder lock ${mark}`)
    ? ingredient.source
    : `${ingredient.source ?? 'Panel'}; ${meth}`;
  return {
    ...ingredient,
    riskLevel: own.grade,
    stackCountExempt: !own.counts,
    why: own.why,
    source,
  };
}

/** Estroven batch430 only. Avoid ingredients stay Avoid. No 3+ note. */
export function applyT280uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('estroven-b430-')) return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const own = t280uLock(ingredient.name);
    if (own) return withGrade(ingredient, own, 't280u');
    const prior = t240uLock(ingredient.name, record.form);
    if (prior && (prior.grade === 'high' || t240uNorm(ingredient.name) === 'titanium dioxide')) {
      return withGrade(ingredient, { grade: prior.grade, counts: prior.counts, why: prior.why }, 't240u');
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
  return next;
}

if (t280uLock('Black Carrot Extract')?.why !== CARROT) throw new Error('t280u carrot');
if (t280uLock('natural vanilla powder')?.why !== VANILLA) throw new Error('t280u vanilla');
if (t280uLock('hydroxypropyl cellulose')?.why !== HPC) throw new Error('t280u hpc');
if (t280uLock('medium chain triglycerides (safflower oil)')?.why !== MCT) throw new Error('t280u mct');
if (t280uLock('polyethylene glycol')?.why !== PEG) throw new Error('t280u peg');
if (t280uLock('Black Carrot Extract')?.counts !== false) throw new Error('t280u carrot count');
if (t280uLock('hydroxypropyl cellulose')?.counts !== true) throw new Error('t280u hpc count');
if (t280uLock('medium chain triglycerides (safflower oil)')?.grade !== 'limited') throw new Error('t280u mct grade');
if (t280uLock('polyethylene glycol')?.counts !== true) throw new Error('t280u peg count');
if (t280uLock('medium chain triglycerides')) throw new Error('t280u bare mct');
