import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

type Lock = { grade: RiskLevel; why: string; counts: boolean };

const LEUCINE =
  'L-leucine complex, an amino acid blend. It is used to help the powder flow and to keep the capsule from sticking.';
const STEVIA =
  'Stevia leaf extract. It adds sweetness to the product. Stevia leaf extract is graded Limited because it is a purified extract of the stevia leaf (EFSA 2010 re-evaluation of steviol glycosides; treated as Limited under the stevia-extract lock).';
const STEVIOL =
  'Steviol glycosides from rebaudioside M. It adds sweetness to the product. Steviol glycosides are graded Limited because they are the purified sweet compounds from stevia (EFSA 2010 re-evaluation; same Limited lock as stevia leaf extract).';

export const T220U: Record<string, Lock> = {
  'Vegetable Cellulose (Capsule)': {
    grade: 'cleared',
    counts: false,
    why: 'Capsule shell made from vegetable cellulose. Cellulose is a plant fiber used to form the capsule that holds the ingredients.',
  },
  'L-Leucine Complex': { grade: 'cleared', counts: false, why: LEUCINE },
  'L- Leucine Complex': { grade: 'cleared', counts: false, why: LEUCINE },
  'Beta-Carotene (color)': {
    grade: 'cleared',
    counts: false,
    why: 'Beta-carotene used as a color. It is a plant-derived pigment that gives the product its color.',
  },
  'Crystallized Orange Flavor (citric acid, orange fruit juice, orange peel oil)': {
    grade: 'cleared',
    counts: false,
    why: 'Crystallized orange flavor made from citric acid, orange fruit juice, and orange peel oil. It adds orange taste to the product.',
  },
  'Organic Fermented Dextrose (to preserve freshness)': {
    grade: 'cleared',
    counts: false,
    why: 'Organic fermented dextrose. It is used to help keep the product fresh.',
  },
  'Organic Gum Blend (Gum Arabic, Tapioca, Guar Gum)': {
    grade: 'cleared',
    counts: false,
    why: 'Organic gum blend of gum arabic, tapioca, and guar gum. It thickens and stabilizes the mixture so the ingredients stay evenly mixed.',
  },
  'Stevia Leaf Extract': { grade: 'limited', counts: true, why: STEVIA },
  'Steviol Glycosides (Rebaudioside M)': { grade: 'limited', counts: true, why: STEVIOL },
};

export function t220uLock(name: string): Lock | undefined {
  return T220U[name.trim()];
}

const SOURCE: Record<RiskLevel, string> = {
  cleared: 'Methodology §5 Cleared (founder lock t220u). Does not count toward the t137u stack.',
  moderate: 'Methodology §5 Caution (founder lock t220u). Does not count toward the t137u stack.',
  limited: 'Methodology §5 Limited (founder lock t220u). Counts toward the 3+ Limited stack.',
  high: 'Methodology §5 Avoid (founder lock t220u).',
};

export function applyT220uIngredients(ingredients: readonly IngredientFlag[]): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const lock = t220uLock(ingredient.name);
    if (!lock) return ingredient;
    const source = (ingredient.source ?? '').includes('founder lock t220u')
      ? ingredient.source
      : ingredient.source ? `${ingredient.source}; ${SOURCE[lock.grade]}` : SOURCE[lock.grade];
    const exempt = !lock.counts;
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
  return changed ? next : ingredients as IngredientFlag[];
}

export function applyT220uTokenWhy(record: RatingRecord): RatingRecord {
  if (!record.inactiveIngredients.some((ingredient) => t220uLock(ingredient.name))) return record;
  const before = record.inactiveIngredients.map((ingredient) =>
    `${ingredient.name}|${ingredient.riskLevel}|${ingredient.stackCountExempt ?? ''}`).join(';');
  const inactiveIngredients = applyT220uIngredients(record.inactiveIngredients);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  const after = inactiveIngredients.map((ingredient) =>
    `${ingredient.name}|${ingredient.riskLevel}|${ingredient.stackCountExempt ?? ''}`).join(';');
  if (before === after) return { ...record, inactiveIngredients };
  const rollup = computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag);
  return { ...record, inactiveIngredients, verdict: rollup.verdict };
}

if (t220uLock('L-Leucine Complex')?.why !== t220uLock('L- Leucine Complex')?.why) throw new Error('t220u leucine');
if (t220uLock('Stevia Leaf Extract')?.grade !== 'limited' || t220uLock('Stevia Leaf Extract')?.counts !== true) {
  throw new Error('t220u stevia');
}
if (t220uLock('Steviol Glycosides (Rebaudioside M)')?.why !== STEVIOL) throw new Error('t220u steviol');
if (t220uLock('Beta-Carotene (color)')?.grade !== 'cleared') throw new Error('t220u carotene');
if (t220uLock('rebaudioside m')) throw new Error('t220u bare reb');
if (t220uLock('beta carotene')) throw new Error('t220u bare carotene');
