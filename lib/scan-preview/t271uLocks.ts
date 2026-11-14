import type { RatingRecord, RiskLevel } from '../ratingRecord';
import { t240uNorm } from './t240uLocks';
import { computeVerdictFromInactiveIngredients, ingredientCountsTowardLimitedStack } from './verdictFromFlags';

export const T271U_STACK_NOTE =
  'This product is Avoid because it contains three or more ingredients that are each graded Limited. When three or more Limited ingredients appear together, the product is graded Avoid.';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

const COLLAGEN = 'Hydrolyzed collagen peptides. It is added as a protein source.';
const COCOA = 'Cocoa. It is added for flavor and plant compounds.';
const LACTOSPORE = 'LactoSpore, a probiotic strain. It is added for its live bacteria.';
const STEVIOL =
  'Steviol glycosides. It adds sweetness to the product. Steviol glycosides are graded Limited as a purified stevia extract (EFSA 2010 re-evaluation of steviol glycosides).';
const BROWN_RICE =
  'Brown rice protein. It is used as a protein filler. Brown rice protein is graded Limited as a processed plant protein (EFSA and FDA treat isolated rice protein as distinct from whole brown rice).';
const RICE_SYRUP =
  'Rice syrup solids. It is used as a sweetener and binder. Rice syrup solids are graded Limited as a processed sugar (FDA and EFSA treat refined rice syrups as processed sweeteners).';
const CANE =
  'Cane sugar. It is used as a sweetener. Cane sugar is graded Limited as a refined sugar (FDA and EFSA treat refined cane sugar as a processed sweetener).';

function plantOrSalt(name: string): string {
  return `${name}. It is added for its plant compounds or mineral content.`;
}

const LOCKS = new Map<string, Lock>([
  [t240uNorm('hydrolyzed Collagen Peptides'), { grade: 'cleared', counts: false, why: COLLAGEN }],
  [t240uNorm('Cocoa'), { grade: 'cleared', counts: false, why: COCOA }],
  [t240uNorm('Spinach'), { grade: 'cleared', counts: false, why: plantOrSalt('Spinach') }],
  [t240uNorm('Broccoli'), { grade: 'cleared', counts: false, why: plantOrSalt('Broccoli') }],
  [t240uNorm('Alfalfa extract'), { grade: 'cleared', counts: false, why: plantOrSalt('Alfalfa extract') }],
  [t240uNorm('Sea Salt'), { grade: 'cleared', counts: false, why: plantOrSalt('Sea Salt') }],
  [t240uNorm('LactoSpore'), { grade: 'cleared', counts: false, why: LACTOSPORE }],
  [t240uNorm('Steviol Glycosides'), { grade: 'limited', counts: true, why: STEVIOL }],
  [t240uNorm('Brown Rice Protein'), { grade: 'limited', counts: true, why: BROWN_RICE }],
  [t240uNorm('Rice Syrup Solids'), { grade: 'limited', counts: true, why: RICE_SYRUP }],
  [t240uNorm('Cane Sugar'), { grade: 'limited', counts: true, why: CANE }],
]);

/** Exact strings. "Rice Syrup, Solids" is the same token as "Rice Syrup Solids". */
export function t271uLock(name: string): Lock | undefined {
  return LOCKS.get(t240uNorm(name));
}

/** Purely Inspired batch424 only. Other brands keep their stored grades. */
export function applyT271uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('purelyinspired-b424-')) return record;
  let changed = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const own = t271uLock(ingredient.name);
    if (!own) return ingredient;
    const exempt = !own.counts;
    const stamp = own.grade === 'limited'
      ? 'Methodology §5 Limited (founder lock t271u). Counts toward the 3+ Limited stack.'
      : 'Methodology §5 Cleared (founder lock t271u). Does not count toward the t137u stack.';
    const source = (ingredient.source ?? '').includes('founder lock t271u')
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
  const next: RatingRecord = changed ? { ...record, inactiveIngredients } : { ...record };
  const hasAvoidIngredient = next.inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'high');
  if (hasAvoidIngredient) {
    const avoided: RatingRecord = {
      ...next,
      verdict: 'avoid',
      inactiveIngredients: next.inactiveIngredients,
    };
    delete avoided.honestNote;
    delete avoided.founderHonestNote;
    return avoided;
  }
  const counted = next.inactiveIngredients.filter((ingredient) => ingredientCountsTowardLimitedStack(ingredient)).length;
  if (counted >= 3) {
    return {
      ...next,
      inactiveIngredients: next.inactiveIngredients,
      verdict: 'avoid',
      honestNote: T271U_STACK_NOTE,
      founderHonestNote: T271U_STACK_NOTE,
    };
  }
  const rolled = computeVerdictFromInactiveIngredients(next.inactiveIngredients, next.activeSafetyFlag).verdict;
  const cleared: RatingRecord = { ...next, inactiveIngredients: next.inactiveIngredients, verdict: rolled };
  delete cleared.honestNote;
  delete cleared.founderHonestNote;
  return cleared;
}

if (t240uNorm('Rice Syrup, Solids') !== t240uNorm('Rice Syrup Solids')) throw new Error('t271u rice syrup variant');
if (t271uLock('Rice Syrup, Solids')?.why !== RICE_SYRUP) throw new Error('t271u rice syrup comma');
if (t271uLock('Rice Syrup Solids')?.counts !== true) throw new Error('t271u rice syrup count');
if (t271uLock('Steviol Glycosides')?.why !== STEVIOL) throw new Error('t271u steviol');
if (t271uLock('Steviol Glycosides')?.counts !== true) throw new Error('t271u steviol count');
if (t271uLock('Brown Rice Protein')?.why !== BROWN_RICE) throw new Error('t271u rice protein');
if (t271uLock('Cane Sugar')?.why !== CANE) throw new Error('t271u cane');
if (t271uLock('hydrolyzed Collagen Peptides')?.why !== COLLAGEN) throw new Error('t271u collagen');
if (t271uLock('hydrolyzed Collagen Peptides')?.counts !== false) throw new Error('t271u collagen count');
if (t271uLock('Cocoa')?.why !== COCOA) throw new Error('t271u cocoa');
if (t271uLock('LactoSpore')?.why !== LACTOSPORE) throw new Error('t271u lactospore');
if (t271uLock('Spinach')?.why !== 'Spinach. It is added for its plant compounds or mineral content.') throw new Error('t271u spinach');
if (t271uLock('Broccoli')?.why !== 'Broccoli. It is added for its plant compounds or mineral content.') throw new Error('t271u broccoli');
if (t271uLock('Alfalfa extract')?.why !== 'Alfalfa extract. It is added for its plant compounds or mineral content.') throw new Error('t271u alfalfa');
if (t271uLock('Sea Salt')?.why !== 'Sea Salt. It is added for its plant compounds or mineral content.') throw new Error('t271u salt');
if (t271uLock('Sea Salt')?.counts !== false) throw new Error('t271u salt count');
