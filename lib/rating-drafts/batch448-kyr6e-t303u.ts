// DRAFT / not verified / batch 448 KYR6-e (t303u).
// NeoCell rows unlocked by the t303 locks. The 3+ note is applied only when Avoid comes solely from three or more counting Limited ingredients.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from '../scan-preview/cleanTokenWhy';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { t135uWhyForName } from '../scan-preview/t135uTokenWhy';
import { t178uWhyForName } from '../scan-preview/t178uTokenWhy';
import { T128U_SILICA_WHY } from '../scan-preview/t128uTokenWhy';
import { t225uLock } from '../scan-preview/t225uLocks';
import { t240uLock, t240uNorm } from '../scan-preview/t240uLocks';
import { t252uLock } from '../scan-preview/t252uLocks';
import { t256uResolve } from '../scan-preview/t256uLocks';
import { t259uLock } from '../scan-preview/t259uLocks';
import { t292uLock } from '../scan-preview/t292uLocks';
import { t295uLock } from '../scan-preview/t295uLocks';
import { t299uLock } from '../scan-preview/t299uLocks';
import { t303uLock } from '../scan-preview/t303uLocks';

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

function stored(name: string, form = 'capsule'): IngredientFlag {
  const stripped = name.replace(/\s*\(for freshness\)/gi, '').trim();
  const candidates = [name, stripped, stripped.toLowerCase()];
  for (const candidate of candidates) {
    if (t240uNorm(candidate) === 'silica') return fromLock(name, 'moderate', false, T128U_SILICA_WHY, 't160u');
    const own = t303uLock(candidate, form) ?? t299uLock(candidate, form) ?? t295uLock(candidate, form) ?? t292uLock(candidate, form) ?? t252uLock(candidate, form) ?? t259uLock(candidate) ?? t240uLock(candidate, form) ?? t225uLock(candidate);
    if (own?.why) {
      const mark = t303uLock(candidate, form) ? 't303u' : t299uLock(candidate, form) ? 't299u' : t295uLock(candidate, form) ? 't295u' : t292uLock(candidate, form) ? 't292u' : t252uLock(candidate, form) ? 't252u' : t259uLock(candidate)?.why ? 't259u' : t225uLock(candidate) ? 't225u' : 't240u';
      return fromLock(name, own.grade, own.counts, own.why, mark);
    }
    const hit = t256uResolve(candidate, form);
    const why = hit?.lock.why || t134uWhyForName(candidate) || t135uWhyForName(candidate, form) || t178uWhyForName(candidate) || cleanTokenWhyForName(candidate);
    if (hit && why) return fromLock(name, hit.lock.grade, hit.lock.counts, why, hit.mark === 'stored' ? 't160u' : hit.mark);
  }
  throw new Error(`t303u stored ${name} ${form}`);
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

const gummy = (name: string) => stored(name, 'gummy');
const chew = (name: string) => stored(name, 'chewable');

const WOMENS = [
  gummy('Sugar'), gummy('Glucose syrup'), gummy('Pectin'), gummy('Apple juice concentrate'), gummy('Natural flavors'), gummy('Citric acid'), gummy('Orange juice concentrate'), gummy('Sodium citrate'), gummy('Lactic acid'), gummy('fruit and vegetable juice (color)'), gummy('Carnauba wax'), gummy('Coconut oil'),
];

export const BATCH448_KYR6E_T303U: RatingRecord[] = [
  row('neocell-b448-womens-gummies-120', "NeoCell Women's Multi Gummies Advanced 120 Gummies", 'neocell-b448-womens-gummies', 'gummy', WOMENS, 'avoid', 'womens-multi-gummies-advanced-berry-licious-beauty-flavor-120-tasty-gummies-m27652', 'Counted Limited: natural flavors, lactic acid, coconut oil. No Avoid ingredient. 120 gummies.'),
  row('neocell-b448-womens-gummies-80', "NeoCell Women's Multi Gummies Advanced 80 Gummies", 'neocell-b448-womens-gummies', 'gummy', WOMENS, 'avoid', 'womens-multi-gummies-advanced-berry-licious-beauty-flavor-80-tasty-gummies-m27651', 'Same other ingredients. Counted Limited: natural flavors, lactic acid, coconut oil. 80 gummies.'),
  row('neocell-b448-beauty-builder-gummies-60', 'NeoCell Beauty Builder Hair, Skin & Nails Gummies 60 Gummies', 'neocell-b448-beauty-builder-gummies-60', 'gummy', [
    gummy('Organic tapioca syrup'), gummy('Organic sugar'), gummy('Pectin'), gummy('Citric acid'), gummy('Natural flavors'), gummy('Sodium citrate'), gummy('Carnauba wax'), gummy('Coconut oil'), gummy('Turmeric (color)'), gummy('stevia extract'),
  ], 'avoid', 'beauty-builder-hair-skin-nails-gummies-lemon-flavor-60-tasty-gummies-m13266', 'Counted Limited: Organic tapioca syrup, organic sugar, natural flavors, coconut oil, stevia extract. No Avoid ingredient. 60 gummies.'),
  row('neocell-b448-biotin-chews-30', 'NeoCell Biotin Beauty Acai Berry 30 Soft Chews', 'neocell-b448-biotin-chews-30', 'chewable', [
    chew('Sugar'), chew('rice syrup'), chew('Maltodextrin'), chew('Natural flavors'), chew('Sunflower lecithin'), chew('Sunflower seed oil'), chew('Malic acid'), chew('Citric acid'), chew('Vegetable glycerin'), chew('fruit & vegetable juice (color)'), chew('rebaudioside A (from stevia leaf extract)'),
  ], 'avoid', 'biotin-beauty-acai-berry-flavor-30-tasty-soft-chews-m12960', 'Sunflower seed oil is the base of this chew. No 3+ note. 30 soft chews.'),
  row('neocell-b448-ha-125-60', 'NeoCell Hyaluronic Acid 125 mg 60 Vegan Capsules', 'neocell-b448-ha-125-60', 'capsule', [
    stored('Organic oat hull'), stored('Vegan capsule'), stored('Organic rice fiber'), stored('organic rice extract blend'),
  ], 'caution', 'hyaluronic-acid-125-mg-60-vegan-capsules-m12965', 'Counted Limited: organic rice extract blend. 60 capsules.'),
  row('neocell-b448-keratin-60', 'NeoCell Keratin Hair Volumizer 60 Capsules', 'neocell-b448-keratin-60', 'capsule', [
    stored('Gelatin capsule'), stored('Organic rice fiber'), stored('organic rice extract blend'), stored('Organic oat hull fiber'),
  ], 'caution', 'keratin-hair-volumizer-60-capsules-m12929', 'Counted Limited: organic rice extract blend. 60 capsules.'),
  row('neocell-b448-phytoceramides-60', 'NeoCell Phytoceramides Complex Advanced Formula 60 Vegan Capsules', 'neocell-b448-phytoceramides-60', 'capsule', [
    stored('Vegan capsule'), stored('organic rice extract blend'), stored('Organic rice fiber'),
  ], 'caution', 'phytoceramides-complex-advanced-formula-60-vegan-capsules-m8062', 'Counted Limited: organic rice extract blend. 60 capsules.'),
  row('neocell-b448-marine-120', 'NeoCell Marine Collagen Peptides + Hyaluronic Acid 120 Capsules', 'neocell-b448-marine-fish-gelatin', 'capsule', [
    stored('Marine gelatin capsule'), stored('Vegetable magnesium stearate'), stored('Silica'),
  ], 'caution', 'marine-collagen-peptides-hyaluronic-acid-120-fish-gelatin-capsules-m12900', 'Silica is Caution and does not count. Contains fish is an allergen line. 120 capsules.'),
  row('neocell-b448-marine-300', 'NeoCell Marine Collagen Peptides + Hyaluronic Acid 300 Capsules', 'neocell-b448-marine-fish-gelatin', 'capsule', [
    stored('Marine gelatin capsule'), stored('Vegetable magnesium stearate'), stored('Silica'),
  ], 'caution', 'marine-collagen-peptides-hyaluronic-acid-300-fish-gelatin-capsules-m12902', 'Silica is Caution and does not count. Contains fish is an allergen line. 300 capsules. Same other ingredients.'),
  row('neocell-b448-biotin-fastdissolve-180', 'NeoCell Biotin 10,000 MCG Fast Dissolve 180 Tablets', 'neocell-b448-biotin-fastdissolve-180', 'tablet', [
    stored('Mannitol', 'tablet'), stored('Natural flavors', 'tablet'), stored('Crospovidone', 'tablet'), stored('beet root (color)', 'tablet'), stored('Cellulose (plant origin)', 'tablet'), stored('Dextrose', 'tablet'), stored('Vegetable stearic acid', 'tablet'), stored('Vegetable magnesium stearate', 'tablet'), stored('sucralose', 'tablet'), stored('Silica', 'tablet'),
  ], 'avoid', 'biotin-10000-mcg-fast-dissolve-180-fast-dissolve-tablets-m5516', 'Counted Limited: natural flavors, crospovidone, sucralose. No Avoid ingredient. 180 tablets.'),
  row('neocell-b448-berry-lemon-6-7oz', 'NeoCell Grassfed Collagen Peptides Berry Lemon 6.7 oz', 'neocell-b448-berry-lemon-6-7oz', 'powder', [
    stored('Natural flavor', 'powder'), stored('Citric acid', 'powder'), stored('Stevia leaf extract', 'powder'), stored('beet root juice (color)', 'powder'),
  ], 'caution', 'grassfed-collagen-peptides-berry-lemon-flavor-67-oz-190-g-powder-m12990', 'Counted Limited: natural flavor, stevia leaf extract. 6.7 oz.'),
  row('neocell-b448-beauty-drops-2oz', 'NeoCell Biotin + Collagen Beauty Drops 2 fl oz', 'neocell-b448-beauty-drops-2oz', 'liquid', [
    stored('Demineralized water', 'liquid'), stored('Organic vegetable glycerin', 'liquid'), stored('Citric acid', 'liquid'), stored('Organic flavors', 'liquid'), stored('Xanthan gum', 'liquid'), stored('Potassium sorbate (for freshness)', 'liquid'), stored('Sodium benzoate (for freshness)', 'liquid'),
  ], 'caution', 'biotin-collagen-beauty-drops-citrus-fusion-flavor-2-fl-oz-59-ml-liquid-m28351', 'Counted Limited: organic flavors. 2 fl oz.'),
  row('neocell-b448-vials-6', 'NeoCell Multi Collagen Bio-Peptides Protein 6 Vials', 'neocell-b448-vials-6', 'liquid', [
    stored('Demineralized water', 'liquid'), stored('Organic sugar', 'liquid'), stored('Citric acid', 'liquid'), stored('Natural flavors', 'liquid'), stored('Potassium sorbate (for freshness)', 'liquid'), stored('Sodium benzoate (for freshness)', 'liquid'),
  ], 'caution', 'multi-collagen-bio-peptides-protein-6-vials-liquid-m27952', 'Counted Limited: organic sugar, natural flavors. Potassium sorbate does not count. Contains egg and fish is an allergen line. 6 vials.'),
  row('neocell-b448-fruit-liquid-16', 'NeoCell Multi Collagen Bio-Peptides Protein + Biotin Delicious Fruit 16 fl oz', 'neocell-b448-collagen-liquid', 'liquid', [
    stored('Demineralized water', 'liquid'), stored('Organic sugar', 'liquid'), stored('Citric acid', 'liquid'), stored('Natural flavor', 'liquid'), stored('Potassium sorbate (for freshness)', 'liquid'), stored('Sodium benzoate (for freshness)', 'liquid'), stored('Organic stevia extract (Rebaudioside A)', 'liquid'),
  ], 'avoid', 'multi-collagen-bio-peptides-protein-biotin-delicious-fruit-flavor-16-437-ml-fl-oz-m28103', 'Counted Limited: organic sugar, natural flavor, organic stevia extract (rebaudioside A). No Avoid ingredient. 16 fl oz.'),
  row('neocell-b448-fruit-punch-liquid-16', 'NeoCell Multi Collagen + Biotin Liquid Advanced Fruit Punch 16 oz', 'neocell-b448-collagen-liquid', 'liquid', [
    stored('Demineralized water', 'liquid'), stored('Organic sugar', 'liquid'), stored('Citric acid', 'liquid'), stored('Natural flavor', 'liquid'), stored('Potassium sorbate (for freshness)', 'liquid'), stored('Sodium benzoate (for freshness)', 'liquid'), stored('Organic stevia extract (Rebaudioside A)', 'liquid'),
  ], 'avoid', 'multi-collagen-biotin-liquid-advanced-delicious-fruit-punch-flavor-16-oz-liquid-m28102', 'Same other ingredients. Counted Limited: organic sugar, natural flavor, organic stevia extract (rebaudioside A). 16 oz.'),
];
