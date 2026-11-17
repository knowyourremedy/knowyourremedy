import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { t240uLock, t240uNorm } from './t240uLocks';
import { t225uLock } from './t225uLocks';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

function baseWhy(name: string): string {
  return `${name}. It is the base of this product. ${name} is graded Avoid when it is the base of the product and Caution when it is only a fill (highly processed oil; EFSA and FDA treat refined seed and nut oils as distinct from whole-food oils).`;
}

const PALM = 'Sustainable palm oil. It is the base of this soft chew. Palm oil is graded Avoid when it is the base of a chewable or gummy and Caution when it is only a fill (highly processed oil; EFSA and FDA treat refined palm oil as distinct from whole palm).';
const LECITHIN = 'Soy lecithin or sunflower lecithin. It is used as an emulsifier. Lecithin is graded Caution as a processed phospholipid (FDA 21 CFR 184.1400; refined soy or sunflower fraction).';

const BASE_OILS = [
  'organic argan oil',
  'wheat germ oil',
  'grapeseed oil',
  'organic sesame seed oil',
];

function printedKey(name: string): string {
  return name.trim().replace(/\s+/g, ' ').toLowerCase();
}

/** Liquid-base oils and soft-chew palm are Avoid. Softgel fill of the four oils stays unlocked. */
export function t304uLock(name: string, form?: string): Lock | undefined {
  const key = printedKey(name);
  const text = (form ?? '').toLowerCase();
  if (BASE_OILS.includes(key)) {
    if (/softgel/.test(text)) return undefined;
    if (!/liquid|\boil\b|base/.test(text)) return undefined;
    return { grade: 'high', counts: false, why: baseWhy(key) };
  }
  if (key === 'sustainable palm oil') {
    if (!/chew|soft chew/.test(text) || /gummy|gummies/.test(text)) return undefined;
    return { grade: 'high', counts: false, why: PALM };
  }
  if (key === 'soy lecithin and/or sunflower lecithin') {
    return { grade: 'moderate', counts: false, why: LECITHIN };
  }
  return undefined;
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

/** NeoCell batch449 only. An Avoid ingredient does not get a 3+ note. */
export function applyT304uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('neocell-b449-')) return record;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const own = t304uLock(ingredient.name, record.form);
    if (own) return withGrade(ingredient, own, 't304u');
    const sun = t240uLock(ingredient.name, record.form);
    if (sun?.why && /sunflower seed oil|lemon oil|natural flavor|tapioca syrup/i.test(ingredient.name)) {
      return withGrade(ingredient, sun, 't240u');
    }
    const stripped = ingredient.name.replace(/\s*\(for freshness\)/gi, '').trim();
    const sorbate = t225uLock(stripped) ?? t225uLock(stripped.toLowerCase());
    if (sorbate?.why && /sorbate|benzoate/i.test(stripped)) return withGrade(ingredient, sorbate, 't225u');
    if (t240uNorm(ingredient.name) === 'silica') return ingredient;
    return ingredient;
  });
  const high = inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'high');
  const verdict = high ? 'avoid' : computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag).verdict;
  const next: RatingRecord = { ...record, inactiveIngredients, verdict };
  delete next.honestNote;
  delete next.founderHonestNote;
  if (record.id === 'neocell-b449-vitamin-e-oil-2-5oz' || record.id === 'neocell-b449-biotin-hair-300') {
    next.honestNote = '';
    next.founderHonestNote = '';
  }
  return next;
}

if (t304uLock('organic argan oil', 'liquid')?.grade !== 'high') throw new Error('t304u argan');
if (t304uLock('organic argan oil', 'liquid')?.why !== baseWhy('organic argan oil')) throw new Error('t304u argan why');
if (t304uLock('wheat germ oil', 'oil')?.why !== baseWhy('wheat germ oil')) throw new Error('t304u wheat');
if (t304uLock('grapeseed oil', 'liquid')?.why !== baseWhy('grapeseed oil')) throw new Error('t304u grape');
if (t304uLock('organic sesame seed oil', 'liquid')?.why !== baseWhy('organic sesame seed oil')) throw new Error('t304u sesame');
if (t304uLock('organic argan oil', 'softgel')) throw new Error('t304u argan fill');
if (t304uLock('grapeseed oil', 'softgel')) throw new Error('t304u grape fill');
if (t304uLock('sustainable palm oil', 'chewable')?.why !== PALM) throw new Error('t304u palm');
if (t304uLock('sustainable palm oil', 'chewable')?.grade !== 'high') throw new Error('t304u palm grade');
if (t304uLock('sustainable palm oil', 'gummy')) throw new Error('t304u palm gummy');
if (t304uLock('soy lecithin and/or sunflower lecithin')?.why !== LECITHIN) throw new Error('t304u lecithin');
if (t304uLock('soy lecithin and/or sunflower lecithin')?.counts !== false) throw new Error('t304u lecithin count');
