import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { T128U_SORBITOL_WHY } from './t128uTokenWhy';
import { t240uNorm } from './t240uLocks';
import { ingredientCountsTowardLimitedStack, computeVerdictFromInactiveIngredients } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

const PLANT = [
  'Cranberry powder',
  'rosemary leaf extract',
  'annatto',
  'mango fruit puree',
  'pear fruit juice concentrate',
  'pineapple fruit puree',
  'acerola fruit juice powder',
  'European elder fruit juice powder',
  'pineapple puree',
  'organic red beet juice crystals',
  'organic acerola fruit juice powder',
  'apple juice concentrate',
  'hibiscus extract',
  'passion fruit flavor',
  'natural strawberry flavor',
  'organic red beet crystals',
  'dulse',
  'licorice root',
  'defatted flax seed',
  'defatted sunflower seed',
  'defatted sesame seed',
  'certified organic defatted flax seed',
  'algal oil (Schizochytrium sp.)',
  'mixed tocopherols (Non-GMO)',
] as const;

const MEDIA = ['skim milk', 'soy peptone', 'yeast extract', 'trehalose'] as const;

const MCT = [
  'Medium-chain triglycerides',
  'Medium chain triglycerides',
  'Organic medium chain triglycerides coconut oil',
] as const;

const OILS = [
  'Certified organic flax seed oil',
  'sesame seed oil',
  'evening primrose seed oil',
  'oat bran oil',
] as const;

function plantWhy(name: string): string {
  return `${name}. It is added for its plant compounds, fiber, or nutrient content.`;
}
function mediaWhy(name: string): string {
  return `${name}. It is used as a growth medium or stabilizer for the probiotic.`;
}
function flavorWhy(name: string): string {
  return `${name}. It adds flavor or sweetness to the product. Organic natural flavor and stevia leaf are graded Limited because the exact sources and processing are not fully specified on the panel (FDA 21 CFR 101.22; EFSA 2010 for stevia).`;
}
function molassesWhy(name: string): string {
  return `${name}. It is used as a sweetener. Molasses is graded Limited as a processed sugar (FDA and EFSA treat molasses as a refined sugar product).`;
}
function modifiedWhy(kind: 'corn' | 'food'): string {
  return `Modified ${kind} starch. It is used as a filler and binder. Modified starch is graded Limited as a processed starch (EFSA and FDA treat modified starches as refined ingredients).`;
}
function seedBase(name: string): string {
  return `${name}. It is the base of this liquid (or used as a coating). ${name} is graded Limited when it is the base of the product and Caution when it is only a fill (highly processed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).`;
}
function seedFill(name: string): string {
  return `${name}. It is used as a fill. ${name} is graded Caution as a fill and Limited or Avoid when it is the base of the product (highly processed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).`;
}

const GELLAN = 'Gellan gum, a plant gum. It thickens and stabilizes the mixture.';
const SUCROSE = 'Sucrose. It is used as a sweetener. Sucrose is graded Limited as a refined sugar (FDA and EFSA treat refined sucrose as a processed sweetener).';
const MCT_WHY = 'Medium chain triglycerides. It is used as a fill or carrier. Medium chain triglycerides are graded Limited as a processed oil (EFSA and FDA treat refined MCT oils as distinct from whole-food oils).';
const FLAX_BASE = 'Certified organic flax seed oil. It is the base of this liquid. Flaxseed oil is graded Limited when it is the base of the product and Caution when it is only a fill (highly processed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).';
const SORBITOL = 'Liquid sorbitol simethicone. It is used as a softgel plasticizer. Sorbitol is graded Limited as a sugar alcohol (FDA 21 CFR 184.1835).';

export const T295U_STACK_NOTE =
  'This product is Avoid because it contains three or more ingredients that are each graded Limited. When three or more Limited ingredients appear together, the product is graded Avoid.';

const CLEARED = new Map<string, Lock>();
for (const name of PLANT) CLEARED.set(t240uNorm(name), { grade: 'cleared', counts: false, why: plantWhy(name) });
CLEARED.set(t240uNorm('gellan gum'), { grade: 'cleared', counts: false, why: GELLAN });
for (const name of MEDIA) CLEARED.set(t240uNorm(name), { grade: 'cleared', counts: false, why: mediaWhy(name) });

const LIMITED = new Map<string, Lock>([
  [t240uNorm('sucrose'), { grade: 'limited', counts: true, why: SUCROSE }],
  [t240uNorm('modified corn starch'), { grade: 'limited', counts: true, why: modifiedWhy('corn') }],
  [t240uNorm('modified food starch'), { grade: 'limited', counts: true, why: modifiedWhy('food') }],
  [t240uNorm('organic natural flavor'), { grade: 'limited', counts: true, why: flavorWhy('organic natural flavor') }],
  [t240uNorm('organic stevia leaf'), { grade: 'limited', counts: true, why: flavorWhy('organic stevia leaf') }],
  [t240uNorm('molasses'), { grade: 'limited', counts: true, why: molassesWhy('molasses') }],
  [t240uNorm('blackstrap molasses'), { grade: 'limited', counts: true, why: molassesWhy('blackstrap molasses') }],
  [t240uNorm('liquid sorbitol simethicone'), { grade: 'limited', counts: true, why: SORBITOL }],
]);
for (const name of MCT) LIMITED.set(t240uNorm(name), { grade: 'limited', counts: true, why: MCT_WHY });

function oilRole(form?: string): 'fill' | 'base' | undefined {
  const value = (form ?? '').toLowerCase();
  if (/\b(softgel|capsule)\b/.test(value)) return 'fill';
  if (/\b(liquid|oil|gummy|gummies|chewable)\b/.test(value)) return 'base';
  return undefined;
}

/** Exact strings. The four seed oils are fill or base only when the form says so. */
export function t295uLock(name: string, form?: string): Lock | undefined {
  const key = t240uNorm(name);
  if (OILS.some((oil) => t240uNorm(oil) === key)) {
    const role = oilRole(form);
    if (role === 'base' && key === t240uNorm('Certified organic flax seed oil')) {
      return { grade: 'limited', counts: true, why: FLAX_BASE };
    }
    if (role === 'base') return { grade: 'limited', counts: true, why: seedBase(name.trim()) };
    if (role === 'fill') return { grade: 'moderate', counts: false, why: seedFill(name.trim()) };
    return undefined;
  }
  return LIMITED.get(key) ?? CLEARED.get(key);
}

const NAMED_ALGAE = new Set([
  'flora-b441-dha-vegan-algae-60-softgels',
  'flora-b441-omega-3-vegan-algae-60-softgels',
]);

function withGrade(ingredient: IngredientFlag, own: Lock): IngredientFlag {
  const meth = own.grade === 'limited' && own.counts
    ? 'Methodology §5 Limited (founder lock t295u). Counts toward the 3+ Limited stack.'
    : own.grade === 'moderate'
      ? 'Methodology §5 Caution (founder lock t295u). Does not count toward the t137u stack.'
      : 'Methodology §5 Cleared (founder lock t295u). Does not count toward the t137u stack.';
  return {
    ...ingredient,
    riskLevel: own.grade,
    stackCountExempt: !own.counts,
    why: own.why,
    source: `Panel; ${meth}`,
  };
}

/** Flora batch441 only. The 3+ note is stored only on the two named algae rows. */
export function applyT295uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('flora-b441-')) return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    if (t240uNorm(ingredient.name) === 'sorbitol') {
      return {
        ...ingredient,
        riskLevel: 'limited' as const,
        stackCountExempt: true,
        why: T128U_SORBITOL_WHY,
        source: 'Panel; Methodology §5 Limited (founder lock t160u). Does not count toward the t137u stack.',
      };
    }
    const own = t295uLock(ingredient.name, record.form);
    return own ? withGrade(ingredient, own) : ingredient;
  });
  const high = inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'high');
  const counted = inactiveIngredients.filter((ingredient) => ingredientCountsTowardLimitedStack(ingredient)).length;
  const verdict = high || counted >= 3
    ? 'avoid'
    : computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag).verdict;
  const next: RatingRecord = { ...record, inactiveIngredients, verdict };
  if (!high && counted >= 3 && NAMED_ALGAE.has(record.id)) {
    return { ...next, verdict: 'avoid', honestNote: T295U_STACK_NOTE, founderHonestNote: T295U_STACK_NOTE };
  }
  delete next.honestNote;
  delete next.founderHonestNote;
  return next;
}

if (t295uLock('Cranberry powder')?.why !== plantWhy('Cranberry powder')) throw new Error('t295u cranberry');
if (t295uLock('gellan gum')?.why !== GELLAN) throw new Error('t295u gellan');
if (t295uLock('skim milk')?.why !== mediaWhy('skim milk')) throw new Error('t295u milk');
if (t295uLock('sucrose')?.counts !== true) throw new Error('t295u sucrose');
if (t295uLock('Medium-chain triglycerides')?.why !== MCT_WHY) throw new Error('t295u mct');
if (t295uLock('modified corn starch')?.why !== modifiedWhy('corn')) throw new Error('t295u corn');
if (t295uLock('modified food starch')?.why !== modifiedWhy('food')) throw new Error('t295u food');
if (t295uLock('Certified organic flax seed oil', 'liquid')?.why !== FLAX_BASE) throw new Error('t295u flax base');
if (t295uLock('Certified organic flax seed oil', 'softgel')?.grade !== 'moderate') throw new Error('t295u flax fill');
if (t295uLock('sesame seed oil', 'liquid')?.why !== seedBase('sesame seed oil')) throw new Error('t295u sesame base');
if (t295uLock('oat bran oil', 'capsule')?.why !== seedFill('oat bran oil')) throw new Error('t295u oat fill');
if (t295uLock('sesame seed oil', 'tablet')) throw new Error('t295u sesame tablet');
if (t295uLock('organic stevia leaf')?.why !== flavorWhy('organic stevia leaf')) throw new Error('t295u stevia');
if (t295uLock('blackstrap molasses')?.why !== molassesWhy('blackstrap molasses')) throw new Error('t295u molasses');
if (t295uLock('liquid sorbitol simethicone')?.why !== SORBITOL) throw new Error('t295u sorbitol');
