import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { t240uNorm } from './t240uLocks';
import { t250uLock } from './t250uLocks';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

const SHELL = 'Vegan capsule shell. It forms the capsule that holds the ingredients.';
const CRANBERRY = 'Cranberry fruit juice powder. It is added for its plant compounds.';
const ACACIA = 'Organic acacia, a plant gum. It is used as a binder and thickener.';
const MCT = 'MCT, medium chain triglycerides. It is used as a fill or carrier. Medium chain triglycerides are graded Limited as a processed oil (EFSA and FDA treat refined MCT oils as distinct from whole-food oils).';
const SUGAR = 'Organic sugar. It is used as a sweetener. Organic sugar is graded Limited as a refined sugar (FDA and EFSA treat refined sugars as processed sweeteners).';
const RICE = 'Rice powder. It is used as a filler. Rice powder is graded Limited as a processed rice ingredient (EFSA and FDA distinguish refined rice products from whole-grain rice).';
const ENTERIC = 'Enteric coating. It coats the softgel so it dissolves in the intestine. Enteric coatings are graded Limited as a processed coating (FDA 21 CFR 172; refined cellulose or polymer coatings).';
const CARAMEL = 'Caramel (color). It is used to color the product. Caramel color is graded Limited as a processed color (EFSA 2011 re-evaluation of caramel colours).';
const SUNFLOWER_GUMMY = 'Sunflower seed oil. It is the base of this gummy. Sunflower seed oil is graded Avoid when it is the base of a chewable or gummy and Caution when it is only a fill (highly processed seed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).';

function fiberWhy(name: string): string {
  return `${name}. It is used as a filler and source of fiber.`;
}
function sweetWhy(name: string): string {
  return `${name}. It adds sweetness to the product. Stevia extract and monk fruit extract are graded Limited as purified extracts (EFSA 2010 re-evaluation of steviol glycosides; FDA GRAS for monk fruit).`;
}

const SHELLS = [
  'Non-GMO Vegan Capsule',
  'Non-GMO Vegetarian capsule',
  'Vegetarian Capsule',
  'Vegan Capsule',
  'Organic Vegetarian Capsule',
];

const LOCKS = new Map<string, Lock>();
for (const name of SHELLS) LOCKS.set(t240uNorm(name), { grade: 'cleared', counts: false, why: SHELL });
LOCKS.set(t240uNorm('Cranberry Fruit Juice Powder'), { grade: 'cleared', counts: false, why: CRANBERRY });
LOCKS.set(t240uNorm('Organic Acacia'), { grade: 'cleared', counts: false, why: ACACIA });
LOCKS.set(t240uNorm('Organic Rice Fiber'), { grade: 'cleared', counts: false, why: fiberWhy('Organic Rice Fiber') });
LOCKS.set(t240uNorm('Organic Oat Hull Fiber'), { grade: 'cleared', counts: false, why: fiberWhy('Organic Oat Hull Fiber') });
LOCKS.set(t240uNorm('MCT'), { grade: 'limited', counts: true, why: MCT });
LOCKS.set(t240uNorm('Organic Sugar'), { grade: 'limited', counts: true, why: SUGAR });
LOCKS.set(t240uNorm('Organic Stevia Extract (Rebaudioside A)'), { grade: 'limited', counts: true, why: sweetWhy('Organic Stevia Extract (Rebaudioside A)') });
LOCKS.set(t240uNorm('Organic Monk Fruit Extract'), { grade: 'limited', counts: true, why: sweetWhy('Organic Monk Fruit Extract') });
LOCKS.set(t240uNorm('Rice Powder'), { grade: 'limited', counts: true, why: RICE });
LOCKS.set(t240uNorm('enteric coating'), { grade: 'limited', counts: true, why: ENTERIC });
LOCKS.set(t240uNorm('caramel (color)'), { grade: 'limited', counts: true, why: CARAMEL });

/** Exact strings. Sunflower seed oil is Avoid only as a gummy base. The fill stays the existing Caution lock. */
export function t299uLock(name: string, form?: string): Lock | undefined {
  const key = t240uNorm(name);
  if (key === 'sunflower seed oil') {
    if (/gummy|gummies/.test((form ?? '').toLowerCase())) {
      return { grade: 'high', counts: false, why: SUNFLOWER_GUMMY };
    }
    return undefined;
  }
  if (key === 'organic rice extract blend') return undefined;
  return LOCKS.get(key);
}

function withGrade(ingredient: IngredientFlag, own: Lock): IngredientFlag {
  const meth = own.grade === 'high'
    ? 'Methodology §5 Avoid (founder lock t299u).'
    : own.grade === 'limited' && own.counts
      ? 'Methodology §5 Limited (founder lock t299u). Counts toward the 3+ Limited stack.'
      : own.grade === 'moderate'
        ? 'Methodology §5 Caution (founder lock t299u). Does not count toward the t137u stack.'
        : 'Methodology §5 Cleared (founder lock t299u). Does not count toward the t137u stack.';
  return {
    ...ingredient,
    riskLevel: own.grade,
    stackCountExempt: !own.counts,
    why: own.why,
    source: `Panel; ${meth}`,
  };
}

/** Renew Life batch444 only. Avoid rows do not get a 3+ note. */
export function applyT299uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('renew-life-b444-')) return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const own = t299uLock(ingredient.name, record.form);
    if (own) return withGrade(ingredient, own);
    if (t240uNorm(ingredient.name) === 'xylitol') {
      const xylitol = t250uLock(ingredient.name);
      if (xylitol) {
        return {
          ...ingredient,
          riskLevel: xylitol.grade,
          stackCountExempt: !xylitol.counts,
          why: xylitol.why,
          source: 'Panel; Methodology §5 Caution (founder lock t250u). Does not count toward the t137u stack.',
        };
      }
    }
    return ingredient;
  });
  const high = inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'high');
  const verdict = high
    ? 'avoid'
    : computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag).verdict;
  const next: RatingRecord = { ...record, inactiveIngredients, verdict };
  delete next.honestNote;
  delete next.founderHonestNote;
  return next;
}

if (t299uLock('Non-GMO Vegan Capsule')?.why !== SHELL) throw new Error('t299u shell');
if (t299uLock('Organic Rice Fiber')?.why !== fiberWhy('Organic Rice Fiber')) throw new Error('t299u rice fiber');
if (t299uLock('Organic Oat Hull Fiber')?.why !== fiberWhy('Organic Oat Hull Fiber')) throw new Error('t299u oat');
if (t299uLock('MCT')?.why !== MCT || t299uLock('MCT')?.counts !== true) throw new Error('t299u mct');
if (t299uLock('Organic Sugar')?.why !== SUGAR) throw new Error('t299u sugar');
if (t299uLock('Organic Monk Fruit Extract')?.why !== sweetWhy('Organic Monk Fruit Extract')) throw new Error('t299u monk');
if (t299uLock('Organic Stevia Extract (Rebaudioside A)')?.why !== sweetWhy('Organic Stevia Extract (Rebaudioside A)')) throw new Error('t299u stevia');
if (t299uLock('sunflower seed oil', 'gummy')?.grade !== 'high') throw new Error('t299u sunflower gummy');
if (t299uLock('sunflower seed oil', 'gummy')?.why !== SUNFLOWER_GUMMY) throw new Error('t299u sunflower why');
if (t299uLock('sunflower seed oil', 'softgel')) throw new Error('t299u sunflower fill');
if (t299uLock('Organic Rice Extract Blend')) throw new Error('t299u blend');
