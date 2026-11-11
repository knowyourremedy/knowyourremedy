import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

type Lock = { grade: RiskLevel; why: string; counts: boolean };

const ALCOHOL_STRENGTH =
  'Certified organic cane alcohol at the printed strength. It is the liquid that extracts and carries the plant ingredients.';
const GLYCERIN =
  'Organic glycerin from vegetable sources. It keeps the liquid soft and helps ingredients stay mixed.';
const PULLULAN =
  'Organic vegetarian capsule shell made from pullulan. Pullulan is a plant-derived starch polymer used to form vegan capsules.';
const VINEGAR =
  'Organic vinegar. It is used as a mild acid to help extract and preserve the plant ingredients.';
const SWEET_ORANGE =
  'Organic sweet orange essential oil. It adds orange flavor and aroma.';
const CINNAMON =
  'Organic cinnamon essential oil. It adds cinnamon flavor and aroma.';
const LIME =
  'Organic lime essential oil. It adds lime flavor and aroma.';
const ORANGE =
  'Organic orange essential oil. It adds orange flavor and aroma.';
const OLIVE =
  'Organic olive oil. It is used as a carrier oil for the oregano.';
const GINGER =
  'Organic ginger extract. It adds ginger flavor and plant compounds.';
const POTASSIUM =
  'Potassium carbonate. It is used in tiny amounts to adjust the pH of the product.';
const BARE_ALCOHOL =
  'Certified organic cane alcohol. It is the liquid that extracts and carries the plant ingredients. The panel does not print the strength, so the exact concentration is not shown. Alcohol used as a vehicle is graded Limited when the strength is not printed (PROJECT_NOTES alcohol-with-strength rule).';
const MALTODEXTRIN =
  'Maltodextrin from non-GMO corn. It is used as a filler and to help the powder flow. Maltodextrin is graded Limited because it is a highly processed starch (EFSA 2018 re-evaluation; no ADI needed but treated as Limited under the processed-starch rule).';

const EXACT: Record<string, Lock> = {
  'certified organic vegetable glycerin': { grade: 'cleared', counts: false, why: GLYCERIN },
  'Organic vegetarian pullulan capsules': { grade: 'cleared', counts: false, why: PULLULAN },
  'organic vegetarian pullulan capsules': { grade: 'cleared', counts: false, why: PULLULAN },
  'certified organic vinegar': { grade: 'cleared', counts: false, why: VINEGAR },
  'certified organic sweet orange essential oil': { grade: 'cleared', counts: false, why: SWEET_ORANGE },
  'certified organic cinnamon essential oil (4 mg)': { grade: 'cleared', counts: false, why: CINNAMON },
  'certified organic lime essential oil (6 mg)': { grade: 'cleared', counts: false, why: LIME },
  'certified organic orange essential oil (6 mg)': { grade: 'cleared', counts: false, why: ORANGE },
  'certified organic olive oil': { grade: 'cleared', counts: false, why: OLIVE },
  'certified organic ginger extractives (27 mg)': { grade: 'cleared', counts: false, why: GINGER },
  'potassium carbonate USP': { grade: 'cleared', counts: false, why: POTASSIUM },
  'Certified Organic cane alcohol': { grade: 'limited', counts: true, why: BARE_ALCOHOL },
  'Maltodextrin (from non-GMO corn)': { grade: 'limited', counts: true, why: MALTODEXTRIN },
};

const SKIP_EXISTING = new Set([
  'herb-pharm-ashwagandha-af',
  'herb-pharm-kids-immune-avenger-af',
  'herb-pharm-kids-lemon-balm-calm-af',
  'herb-pharm-kids-immune-fortifier-af',
  'herb-pharm-oregano-spirits',
]);

/** Printed strength. Case is not a second token. Bare Certified Organic cane alcohol is not this lock. */
function alcoholStrengthLock(name: string): Lock | undefined {
  const text = name.trim();
  if (/^(?:certified organic cane alcohol|certified organic alcohol) \(\d+-\d+%\)$/i.test(text)) {
    return { grade: 'cleared', counts: false, why: ALCOHOL_STRENGTH };
  }
  return undefined;
}

/** Every printed strength of this oil, including the bare name. */
function sweetOrangeLock(name: string): Lock | undefined {
  const text = name.trim();
  if (text === 'certified organic sweet orange essential oil') {
    return { grade: 'cleared', counts: false, why: SWEET_ORANGE };
  }
  if (/^\(≤\d+ mg\) certified organic sweet orange essential oil$/.test(text)) {
    return { grade: 'cleared', counts: false, why: SWEET_ORANGE };
  }
  if (/^certified organic sweet orange essential oil \(\d+(?:\.\d+)?-\d+(?:\.\d+)? mg\)$/.test(text)) {
    return { grade: 'cleared', counts: false, why: SWEET_ORANGE };
  }
  if (/^certified organic sweet orange essential oil \(\d+ mg\)$/.test(text)) {
    return { grade: 'cleared', counts: false, why: SWEET_ORANGE };
  }
  return undefined;
}

export function t215uLock(name: string): Lock | undefined {
  const text = name.trim();
  return EXACT[text] ?? alcoholStrengthLock(text) ?? sweetOrangeLock(text);
}

const SOURCE: Record<RiskLevel, string> = {
  cleared: 'Methodology §5 Cleared (founder lock t215u). Does not count toward the t137u stack.',
  moderate: 'Methodology §5 Caution (founder lock t215u). Does not count toward the t137u stack.',
  limited: 'Methodology §5 Limited (founder lock t215u). Counts toward the 3+ Limited stack.',
  high: 'Methodology §5 Avoid (founder lock t215u).',
};

export function applyT215uIngredients(ingredients: readonly IngredientFlag[]): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const lock = t215uLock(ingredient.name);
    if (!lock) return ingredient;
    const source = (ingredient.source ?? '').includes('founder lock t215u')
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

export function applyT215uTokenWhy(record: RatingRecord): RatingRecord {
  if (SKIP_EXISTING.has(record.id)) return record;
  if (!record.inactiveIngredients.some((ingredient) => t215uLock(ingredient.name))) return record;
  const before = record.inactiveIngredients.map((ingredient) =>
    `${ingredient.name}|${ingredient.riskLevel}|${ingredient.stackCountExempt ?? ''}`).join(';');
  const inactiveIngredients = applyT215uIngredients(record.inactiveIngredients);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  const after = inactiveIngredients.map((ingredient) =>
    `${ingredient.name}|${ingredient.riskLevel}|${ingredient.stackCountExempt ?? ''}`).join(';');
  if (before === after) return { ...record, inactiveIngredients };
  const rollup = computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag);
  return { ...record, inactiveIngredients, verdict: rollup.verdict };
}

if (t215uLock('certified organic cane alcohol (61-71%)')?.grade !== 'cleared') throw new Error('t215u alcohol');
if (t215uLock('Certified Organic cane alcohol (45-55%)')?.why !== ALCOHOL_STRENGTH) throw new Error('t215u alcohol case');
if (t215uLock('certified organic alcohol (49-59%)')?.counts !== false) throw new Error('t215u alcohol no cane');
if (t215uLock('Certified Organic cane alcohol')?.grade !== 'limited' || t215uLock('Certified Organic cane alcohol')?.counts !== true) {
  throw new Error('t215u bare alcohol');
}
if (t215uLock('Certified Organic cane alcohol')?.why !== BARE_ALCOHOL) throw new Error('t215u bare why');
if (t215uLock('Maltodextrin (from non-GMO corn)')?.why !== MALTODEXTRIN) throw new Error('t215u maltodextrin');
if (t215uLock('Organic vegetarian pullulan capsules')?.why !== t215uLock('organic vegetarian pullulan capsules')?.why) {
  throw new Error('t215u pullulan');
}
if (t215uLock('(≤2 mg) certified organic sweet orange essential oil')?.why !== SWEET_ORANGE) throw new Error('t215u orange le');
if (t215uLock('certified organic sweet orange essential oil (1.5-6 mg)')?.grade !== 'cleared') throw new Error('t215u orange range');
if (t215uLock('Regenerative Organic Certified®')) throw new Error('t215u roc');
if (t215uLock('certified organic vegetable glycerin')?.why !== GLYCERIN) throw new Error('t215u glycerin');
