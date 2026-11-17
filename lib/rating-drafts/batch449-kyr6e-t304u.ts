// DRAFT / not verified / batch 449 KYR6-e (t304u).
// NeoCell rows unlocked by the t304 locks. Avoid ingredients do not get a 3+ note.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from '../scan-preview/cleanTokenWhy';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { t135uWhyForName } from '../scan-preview/t135uTokenWhy';
import { t178uWhyForName } from '../scan-preview/t178uTokenWhy';
import { T128U_SILICA_WHY } from '../scan-preview/t128uTokenWhy';
import { t225uLock } from '../scan-preview/t225uLocks';
import { t228uLock } from '../scan-preview/t228uLocks';
import { t240uLock, t240uNorm } from '../scan-preview/t240uLocks';
import { t252uLock } from '../scan-preview/t252uLocks';
import { t256uResolve } from '../scan-preview/t256uLocks';
import { t259uLock } from '../scan-preview/t259uLocks';
import { t292uLock } from '../scan-preview/t292uLocks';
import { t295uLock } from '../scan-preview/t295uLocks';
import { t299uLock } from '../scan-preview/t299uLocks';
import { t303uLock } from '../scan-preview/t303uLocks';
import { t304uLock } from '../scan-preview/t304uLocks';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;
const SITE = 'https://www.neocell.com/products';

function fromLock(name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why: string, mark: string): IngredientFlag {
  const meth = grade === 'high'
    ? `Methodology §5 Avoid (founder lock ${mark}).`
    : grade === 'limited' && counts
      ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
      : grade === 'moderate'
        ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
        : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, why };
}

function stored(name: string, form: string): IngredientFlag {
  const stripped = name.replace(/\s*\(for freshness\)/gi, '').trim();
  const candidates = [name, stripped, stripped.toLowerCase()];
  for (const candidate of candidates) {
    if (t240uNorm(candidate) === 'silica') return fromLock(name, 'moderate', false, T128U_SILICA_WHY, 't160u');
    const own = t304uLock(candidate, form) ?? t303uLock(candidate, form) ?? t299uLock(candidate, form) ?? t295uLock(candidate, form) ?? t292uLock(candidate, form) ?? t252uLock(candidate, form) ?? t259uLock(candidate) ?? t228uLock(candidate) ?? t225uLock(candidate) ?? t240uLock(candidate, form);
    if (own?.why) {
      const mark = t304uLock(candidate, form) ? 't304u' : t303uLock(candidate, form) ? 't303u' : t299uLock(candidate, form) ? 't299u' : t295uLock(candidate, form) ? 't295u' : t292uLock(candidate, form) ? 't292u' : t252uLock(candidate, form) ? 't252u' : t259uLock(candidate)?.why ? 't259u' : t228uLock(candidate) ? 't228u' : t225uLock(candidate) ? 't225u' : 't240u';
      return fromLock(name, own.grade, own.counts, own.why, mark);
    }
    const hit = t256uResolve(candidate, form);
    const why = hit?.lock.why || t134uWhyForName(candidate) || t135uWhyForName(candidate, form) || t178uWhyForName(candidate) || cleanTokenWhyForName(candidate);
    if (hit && why) return fromLock(name, hit.lock.grade, hit.lock.counts, why, hit.mark === 'stored' ? 't160u' : hit.mark);
  }
  throw new Error(`t304u stored ${name} ${form}`);
}

function row(id: string, name: string, formulaId: string, form: string, ingredients: IngredientFlag[], verdict: RatingRecord['verdict'], handle: string, note: string): RatingRecord {
  return {
    id, productName: name, brand: 'NeoCell', category: 'Vitamins', formulaId, form,
    audience: 'adult', minAge: 18, recordStatus: UNVERIFIED, productType: SUPPLEMENT,
    retailers: ['NeoCell'],
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: ingredients, verdict,
    sourcesGeneral: [`${SITE}/${handle} ${note} No sourced UPC. Missing UPC.`],
  };
}

export const BATCH449_KYR6E_T304U: RatingRecord[] = [
  row('neocell-b449-biotin-liquid-2oz', 'NeoCell Biotin 10,000 MCG Fast Acting Liquid 2 fl oz', 'neocell-b449-biotin-liquid-2oz', 'liquid', [
    stored('Demineralized water', 'liquid'), stored('Vegetable glycerin', 'liquid'), stored('Organic beet root (color)', 'liquid'), stored('Xanthan gum', 'liquid'), stored('Natural flavors', 'liquid'), stored('Organic argan oil', 'liquid'), stored('Sodium benzoate (for freshness)', 'liquid'), stored('Potassium sorbate (for freshness)', 'liquid'), stored('Citric acid', 'liquid'),
  ], 'avoid', 'biotin-10000-mcg-fast-acting-liquid-berry-flavor-2-fl-oz-59-ml-liquid-m14101', 'Organic argan oil is the liquid base. No 3+ note. 2 fl oz.'),
  row('neocell-b449-vitamin-e-oil-2-5oz', 'NeoCell Vitamin E Oil Fast Acting 2.5 fl oz', 'neocell-b449-vitamin-e-oil-2-5oz', 'liquid', [
    stored('Sunflower seed oil', 'liquid'), stored('Wheat germ oil', 'liquid'), stored('Grapeseed oil', 'liquid'), stored('Organic sesame seed oil', 'liquid'), stored('Lemon oil', 'liquid'),
  ], 'avoid', 'vitamin-e-oil-fast-acting-30000-iu-25-fl-oz-74-ml-liquid-m24791', 'Wheat germ oil, grapeseed oil, and organic sesame seed oil are the liquid base. No 3+ note. 2.5 fl oz.'),
  row('neocell-b449-beauty-bursts-60', 'NeoCell Collagen Beauty Bursts Fruit Punch 60 Soft Chews', 'neocell-b449-beauty-bursts-60', 'chewable', [
    stored('Tapioca syrup', 'chewable'), stored('Cane sugar', 'chewable'), stored('Sustainable palm oil', 'chewable'), stored('Natural flavors', 'chewable'), stored('Sunflower lecithin', 'chewable'), stored('Citric acid', 'chewable'), stored('Fruit and vegetable juice (color)', 'chewable'), stored('Sea salt', 'chewable'),
  ], 'avoid', 'collagen-beauty-bursts-fruit-punch-flavor-60-tasty-soft-chews-m12939', 'Sustainable palm oil is the base of this soft chew. No 3+ note. 60 soft chews.'),
  row('neocell-b449-biotin-hair-300', 'NeoCell Biotin Hair Revitalizer 300 Softgels', 'neocell-b449-biotin-hair-300', 'softgel', [
    stored('Rice bran oil and/or sunflower oil and/or safflower oil', 'softgel'), stored('Gelatin', 'softgel'), stored('Vegetable glycerin', 'softgel'), stored('Yellow beeswax', 'softgel'), stored('Calcium carbonate', 'softgel'), stored('Soy lecithin and/or sunflower lecithin', 'softgel'),
  ], 'caution', 'biotin-hair-revitalizer-10000-mcg-300-softgels-m16927', 'The oil blend and the lecithin are Caution and do not count. Contains soy is an allergen line. 300 softgels.'),
];
