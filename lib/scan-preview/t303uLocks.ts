import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { T128U_SILICA_WHY } from './t128uTokenWhy';
import { t160uGrade } from './t160uLocks';
import { t225uLock } from './t225uLocks';
import { t240uLock, t240uNorm } from './t240uLocks';
import { t252uLock } from './t252uLocks';
import { t259uLock } from './t259uLocks';
import { t292uLock } from './t292uLocks';
import { t295uLock, T295U_STACK_NOTE } from './t295uLocks';
import { t299uLock } from './t299uLocks';
import { computeVerdictFromInactiveIngredients, ingredientCountsTowardLimitedStack } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

function added(name: string): string {
  return `${name}. It is added for color, mineral content, or to form the capsule.`;
}
function sweet(name: string): string {
  return `${name}. It is used as a sweetener and binder. Processed sugars and purified stevia extracts are graded Limited (FDA and EFSA treat refined syrups and steviol glycosides as processed sweeteners; EFSA 2010 for stevia).`;
}

const PALM = 'Sustainable palm oil. It is the base of this gummy. Palm oil is graded Limited or Avoid when it is the base of a chewable or gummy and Caution when it is only a fill (highly processed oil; EFSA and FDA treat refined palm oil as distinct from whole palm).';
const RICE = 'Organic rice extract blend. It is used as a filler. Organic rice extract blend is graded Limited as a processed rice ingredient (EFSA and FDA distinguish refined rice extracts from whole-grain rice).';
const SUCRALOSE = 'Sucralose. It adds sweetness to the product. Sucralose is graded Limited as a synthetic sweetener (FDA 21 CFR 172.831).';
const MIX = 'Rice bran oil, sunflower oil, or safflower oil. It is used as a fill in the softgel. These seed oils are graded Caution as a fill and Avoid when they are the base of a chewable (highly processed seed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).';

const CLEARED = [
  'fruit and vegetable juice (color)',
  'fruit & vegetable juice (color)',
  'beet root (color)',
  'beet root juice (color)',
  'organic beet root (color)',
  'sea salt',
  'Demineralized water',
  'organic oat hull',
  'Marine gelatin capsule',
];
const SWEETS = [
  'Organic tapioca syrup',
  'rice syrup',
  'cane sugar',
  'stevia extract',
  'rebaudioside A (from stevia leaf extract)',
];

const PRINTED = new Map<string, { grade: RiskLevel; counts: boolean; why: string; form?: 'softgel' | 'gummy' }>();
for (const name of CLEARED) PRINTED.set(name, { grade: 'cleared', counts: false, why: added(name) });
for (const name of SWEETS) PRINTED.set(name, { grade: 'limited', counts: true, why: sweet(name) });
PRINTED.set('sustainable palm oil', { grade: 'limited', counts: true, why: PALM, form: 'gummy' });
PRINTED.set('organic rice extract blend', { grade: 'limited', counts: true, why: RICE });
PRINTED.set('sucralose', { grade: 'limited', counts: true, why: SUCRALOSE });
PRINTED.set('Rice bran oil and/or sunflower oil and/or safflower oil', { grade: 'moderate', counts: false, why: MIX, form: 'softgel' });

function printedKey(name: string): string {
  return name.trim().replace(/\s+/g, ' ').toLowerCase();
}

/** Exact printed strings. Capitalization does not make a new token. The and/or oil applies only as a softgel fill. Sustainable palm oil applies only as a gummy base. Organic argan oil, wheat germ oil, grapeseed oil, and organic sesame seed oil are not in this lock. */
export function t303uLock(name: string, form?: string): Lock | undefined {
  const own = [...PRINTED.entries()].find(([label]) => printedKey(label) === printedKey(name))?.[1];
  if (!own) return undefined;
  const text = (form ?? '').toLowerCase();
  if (own.form === 'softgel' && !/softgel/.test(text)) return undefined;
  if (own.form === 'gummy' && !/gummy|gummies/.test(text)) return undefined;
  return { grade: own.grade, counts: own.counts, why: own.why };
}

function withGrade(ingredient: IngredientFlag, own: Lock, mark: string): IngredientFlag {
  const meth = own.grade === 'high'
    ? `Methodology §5 Avoid (founder lock ${mark}).`
    : own.grade === 'limited' && own.counts
      ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
      : own.grade === 'moderate'
        ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
        : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { ...ingredient, riskLevel: own.grade, stackCountExempt: !own.counts, why: own.why, source: `Panel; ${meth}` };
}

function restamp(ingredient: IngredientFlag, form: string | undefined): IngredientFlag {
  const key = t240uNorm(ingredient.name);
  if (key === 'silica' || key === 'silicon dioxide') return withGrade(ingredient, { grade: 'moderate', counts: false, why: T128U_SILICA_WHY }, 't160u');
  if (key === 'mannitol' && t160uGrade(ingredient.name) === 'limited' && ingredient.why) {
    return withGrade(ingredient, { grade: 'limited', counts: false, why: ingredient.why }, 't160u');
  }
  const own = t303uLock(ingredient.name, form);
  if (own) return withGrade(ingredient, own, 't303u');
  const stripped = ingredient.name.replace(/\s*\(for freshness\)/gi, '').trim();
  const sorbate = t225uLock(stripped) ?? t225uLock(stripped.toLowerCase());
  if (sorbate?.why && /sorbate|benzoate/i.test(stripped)) return withGrade(ingredient, sorbate, 't225u');
  const sun = t240uLock(ingredient.name, form);
  if (sun?.why && /sunflower seed oil|natural flavor|lactic acid/i.test(ingredient.name)) return withGrade(ingredient, sun, 't240u');
  const later = t299uLock(ingredient.name, form) ?? t295uLock(ingredient.name, form) ?? t292uLock(ingredient.name, form) ?? t252uLock(ingredient.name, form) ?? t259uLock(ingredient.name);
  if (later?.why) {
    const mark = t299uLock(ingredient.name, form) ? 't299u' : t295uLock(ingredient.name, form) ? 't295u' : t292uLock(ingredient.name, form) ? 't292u' : t252uLock(ingredient.name, form) ? 't252u' : 't259u';
    return withGrade(ingredient, later, mark);
  }
  return ingredient;
}

/** NeoCell batch448 only. The 3+ note is stored only when Avoid comes solely from three or more counting Limited ingredients. */
export function applyT303uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('neocell-b448-')) return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => restamp(ingredient, record.form));
  const high = inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'high');
  const count = inactiveIngredients.filter(ingredientCountsTowardLimitedStack).length;
  const verdict = high ? 'avoid' : computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag).verdict;
  const next: RatingRecord = { ...record, inactiveIngredients, verdict };
  delete next.honestNote;
  delete next.founderHonestNote;
  if (!high && count >= 3 && verdict === 'avoid') {
    next.honestNote = T295U_STACK_NOTE;
    next.founderHonestNote = T295U_STACK_NOTE;
  }
  return next;
}

if (t303uLock('fruit and vegetable juice (color)')?.why !== added('fruit and vegetable juice (color)')) throw new Error('t303u juice and');
if (t303uLock('fruit & vegetable juice (color)')?.why !== added('fruit & vegetable juice (color)')) throw new Error('t303u juice amp');
if (t303uLock('Demineralized water')?.grade !== 'cleared') throw new Error('t303u water');
for (const oil of ['organic argan oil', 'wheat germ oil', 'grapeseed oil', 'organic sesame seed oil']) {
  if (t303uLock(oil, 'softgel') || t303uLock(oil, 'liquid') || t303uLock(oil, 'gummy') || t303uLock(oil)) {
    throw new Error(`t303u unlocked ${oil}`);
  }
}
if (t303uLock('Organic tapioca syrup')?.why !== sweet('Organic tapioca syrup') || t303uLock('Organic tapioca syrup')?.counts !== true) throw new Error('t303u tapioca');
if (t303uLock('rebaudioside A (from stevia leaf extract)')?.why !== sweet('rebaudioside A (from stevia leaf extract)')) throw new Error('t303u reb');
if (t303uLock('sustainable palm oil', 'gummy')?.why !== PALM) throw new Error('t303u palm');
if (t303uLock('sustainable palm oil', 'capsule')) throw new Error('t303u palm capsule');
if (t303uLock('organic rice extract blend')?.why !== RICE) throw new Error('t303u rice');
if (t303uLock('sucralose')?.why !== SUCRALOSE) throw new Error('t303u sucralose');
if (t303uLock('Rice bran oil and/or sunflower oil and/or safflower oil', 'softgel')?.why !== MIX) throw new Error('t303u mix');
if (t303uLock('Rice bran oil and/or sunflower oil and/or safflower oil', 'gummy')) throw new Error('t303u mix gummy');
