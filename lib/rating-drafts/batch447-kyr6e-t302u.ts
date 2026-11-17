// DRAFT / not verified / batch 447 KYR6-e (t302u).
// NeoCell rows whose other ingredients are already locked. No honest note.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from '../scan-preview/cleanTokenWhy';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { T128U_SILICA_WHY } from '../scan-preview/t128uTokenWhy';
import { t240uLock, t240uNorm } from '../scan-preview/t240uLocks';
import { t252uLock } from '../scan-preview/t252uLocks';
import { t256uResolve } from '../scan-preview/t256uLocks';
import { t292uLock } from '../scan-preview/t292uLocks';
import { t295uLock } from '../scan-preview/t295uLocks';
import { t299uLock } from '../scan-preview/t299uLocks';

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
  if (t240uNorm(name) === 'silica') return fromLock(name, 'moderate', false, T128U_SILICA_WHY, 't160u');
  const own = t299uLock(name, form) ?? t295uLock(name, form) ?? t292uLock(name, form) ?? t252uLock(name, form) ?? t240uLock(name, form);
  if (own?.why) {
    const mark = t299uLock(name, form) ? 't299u' : t295uLock(name, form) ? 't295u' : t292uLock(name, form) ? 't292u' : t252uLock(name, form) ? 't252u' : 't240u';
    return fromLock(name, own.grade, own.counts, own.why, mark);
  }
  const hit = t256uResolve(name, form);
  const why = hit?.lock.why || t134uWhyForName(name) || cleanTokenWhyForName(name);
  if (!hit || !why) throw new Error(`t302u stored ${name} ${form}`);
  return fromLock(name, hit.lock.grade, hit.lock.counts, why, hit.mark === 'stored' ? 't160u' : hit.mark);
}

const mag = stored('Vegetable magnesium stearate');
const silica = stored('Silica');
const cellulose = stored('Cellulose (plant origin)');
const gelatinCap = stored('Gelatin capsule');
const rice = stored('Rice powder');

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

const none = (id: string, name: string, formulaId: string, handle: string, note: string) =>
  row(id, name, formulaId, 'powder', [], 'clean', handle, note);

export const BATCH447_KYR6E_T302U: RatingRecord[] = [
  none('neocell-b447-advanced-collagen-6-9oz', 'NeoCell Advanced Collagen Peptides + Hyaluronic Acid + C 6.9 oz', 'neocell-b447-advanced-collagen', 'advanced-collagen-peptides-hyaluronic-acid-c-69-oz-195-g-powder-m12958', 'Other ingredients: none. 6.9 oz.'),
  none('neocell-b447-advanced-collagen-13-7oz', 'NeoCell Advanced Collagen Peptides + Hyaluronic Acid + C 13.7 oz', 'neocell-b447-advanced-collagen', 'advanced-collagen-peptides-hyaluronic-acid-c-137-oz-390-g-powder-m13255', 'Other ingredients: none. 13.7 oz. Same other ingredients.'),
  none('neocell-b447-advanced-collagen-20-6oz', 'NeoCell Advanced Collagen Peptides + Hyaluronic Acid + C 20.6 oz', 'neocell-b447-advanced-collagen', 'advanced-collagen-peptides-hyaluronic-acid-c-206-oz-585-g-powder-m13256', 'Other ingredients: none. 20.6 oz. Same other ingredients.'),
  none('neocell-b447-grassfed-peptides-7oz', 'NeoCell Grassfed Collagen Peptides 7 oz', 'neocell-b447-grassfed-peptides', 'grassfed-collagen-peptides-7-oz-200-g-powder-m01986', 'Other ingredients: none. 7 oz.'),
  none('neocell-b447-grassfed-peptides-14oz', 'NeoCell Grassfed Collagen Peptides 14 oz', 'neocell-b447-grassfed-peptides', 'grassfed-collagen-peptides-14-oz-400-g-powder-m12986', 'Other ingredients: none. 14 oz. Same other ingredients.'),
  none('neocell-b447-grassfed-peptides-21oz', 'NeoCell Grassfed Collagen Peptides 21.1 oz', 'neocell-b447-grassfed-peptides', 'grassfed-collagen-peptides-211-oz-600-g-powder-m13259', 'Other ingredients: none. 21.1 oz. Same other ingredients.'),
  none('neocell-b447-grassfed-bio-10oz', 'NeoCell Grassfed Collagen Bio-Peptides 10 oz', 'neocell-b447-grassfed-bio-10oz', 'grassfed-collagen-bio-peptides-10-oz-283-g-powder-m27082', 'Other ingredients: none. 10 oz.'),
  none('neocell-b447-multi-beauty-9oz', 'NeoCell Multi Collagen Advanced Beauty Series 9 oz', 'neocell-b447-multi-beauty-9oz', 'multi-collagen-advanced-beauty-series-9-oz-255-g-powder-m15071', 'Other ingredients: none. Contains egg and fish is an allergen line. 9 oz.'),
  none('neocell-b447-multi-protein-7oz', 'NeoCell Multi Collagen Bio-Peptides Protein 7 oz', 'neocell-b447-multi-protein-7oz', 'multi-collagen-bio-peptides-protein-7-oz-198-g-powder-m15075', 'Other ingredients: none. Contains egg and fish is an allergen line. 7 oz.'),
  none('neocell-b447-multi-unflavored-sticks', 'NeoCell Multi Collagen Bio-Peptides Unflavored 20 Stick Packs', 'neocell-b447-multi-unflavored-sticks', 'multi-collagen-bio-peptides-unflavored-20-stick-packs-m15084', 'Other ingredients: none. Contains egg and fish is an allergen line. 20 stick packs.'),
  none('neocell-b447-multi-advanced-10oz', 'NeoCell Multi Collagen Advanced Bio-Peptides 10 oz', 'neocell-b447-multi-advanced', 'multi-collagen-advanced-bio-peptides-10-oz-283-g-powder-m27322', 'Other ingredients: none. Contains egg and fish is an allergen line. 10 oz.'),
  none('neocell-b447-multi-advanced-22oz', 'NeoCell Multi Collagen Advanced Bio-Peptides 22 oz', 'neocell-b447-multi-advanced', 'multi-collagen-advanced-bio-peptides-22-oz-623-g-powder-m27321', 'Other ingredients: none. Contains egg and fish is an allergen line. 22 oz. Same other ingredients.'),
  none('neocell-b447-multi-advanced-sticks', 'NeoCell Multi Collagen Advanced Bio-Peptides 20 Stick Packs', 'neocell-b447-multi-advanced', 'multi-collagen-advanced-bio-peptides-20-stick-packs-m28973', 'Other ingredients: none. Contains egg and fish is an allergen line. 20 stick packs. Same other ingredients.'),
  none('neocell-b447-marine-msm-7oz', 'NeoCell Marine Collagen Peptides + Hyaluronic Acid, MSM & C 7 oz', 'neocell-b447-marine-msm-7oz', 'marine-collagen-peptides-hyaluronic-acid-msm-c-7-oz-200-g-powder-m13270', 'Other ingredients: none. Contains fish is an allergen line. 7 oz.'),
  none('neocell-b447-marine-bio-8oz', 'NeoCell Marine Collagen Bio-Peptides 8 oz', 'neocell-b447-marine-bio-8oz', 'marine-collagen-bio-peptides-8-oz-226-g-powder-m27771', 'Other ingredients: none. Contains fish is an allergen line. 8 oz.'),
  none('neocell-b447-creatine-collagen-10oz', 'NeoCell Creatine + Multi Collagen Bio-Peptides Protein 10 oz', 'neocell-b447-creatine-collagen-10oz', 'creatine-multi-collagen-bio-peptides-protein-10-oz-285-g-powder-m28531', 'Other ingredients: none. Contains egg and fish is an allergen line. 10 oz.'),
  none('neocell-b447-creatine-collagen-sticks', 'NeoCell Creatine + Multi Collagen Bio-Peptides Protein 20 Stick Packs', 'neocell-b447-creatine-collagen-sticks', 'creatine-multi-collagen-bio-peptides-protein-20-stick-packs-m28591', 'Other ingredients: none. Contains egg and fish is an allergen line. 20 stick packs.'),
  none('neocell-b447-power-creatine', 'NeoCell Power Creatine Monohydrate Micronized 1.1 lb', 'neocell-b447-power-creatine', 'power-creatine-monohydrate-micronized-11-lb-500-g-bottle-m2810', 'Other ingredients: none. 1.1 lb.'),
  none('neocell-b447-colostrum-10oz', 'NeoCell Colostrum Multi Collagen Bio-Peptides Protein 10.58 oz', 'neocell-b447-colostrum-10oz', 'colostrum-multi-collagen-bio-peptides-protein-1058-oz-300-g-powder-m28881', 'Other ingredients: none. Contains milk, egg, and fish is an allergen line. 10.58 oz.'),

  row('neocell-b447-grassfed-c-120-caplets', 'NeoCell Grassfed Collagen Peptides + C 120 Caplets', 'neocell-b447-grassfed-c', 'caplet', [mag], 'clean', 'grassfed-collagen-peptides-c-6000-mg-120-caplets-m12895', 'Other ingredient: vegetable magnesium stearate. 120 caplets.'),
  row('neocell-b447-grassfed-c-250-tablets', 'NeoCell Grassfed Collagen Peptides + C 250 Tablets', 'neocell-b447-grassfed-c-tablets', 'tablet', [mag], 'clean', 'grassfed-collagen-peptides-c-6000-mg-250-tablets-m12896', 'Other ingredient: vegetable magnesium stearate. 250 tablets.'),
  row('neocell-b447-grassfed-c-400-caplets', 'NeoCell Grassfed Collagen Bio-Peptides + Vitamin C 400 Caplets', 'neocell-b447-grassfed-c-400', 'caplet', [mag], 'clean', 'grassfed-collagen-bio-peptides-vitamin-c-6000-mg-per-serving-400-caplets-m12898', 'Other ingredient: vegetable magnesium stearate. 400 caplets.'),
  row('neocell-b447-grassfed-biotin-90-tablets', 'NeoCell Grassfed Collagen Peptides + C & Biotin 90 Tablets', 'neocell-b447-grassfed-biotin-tablets', 'tablet', [mag], 'clean', 'grassfed-collagen-peptides-c-biotin-6000-mg-90-tablets-m12923', 'Other ingredient: vegetable magnesium stearate. 90 tablets.'),
  row('neocell-b447-grassfed-biotin-180-caplets', 'NeoCell Grassfed Collagen Peptides + C & Biotin 180 Caplets', 'neocell-b447-grassfed-biotin-caplets', 'caplet', [mag], 'clean', 'grassfed-collagen-peptides-c-biotin-6000-mg-180-caplets-m13260', 'Other ingredient: vegetable magnesium stearate. 180 caplets.'),
  row('neocell-b447-multi-beauty-120-caplets', 'NeoCell Multi Collagen Advanced Beauty Series 120 Caplets', 'neocell-b447-multi-beauty-120', 'caplet', [mag], 'clean', 'multi-collagen-advanced-beauty-series-120-caplets-m27312', 'Other ingredient: vegetable magnesium stearate. Contains egg and fish is an allergen line. 120 caplets.'),
  row('neocell-b447-multi-advanced-protein-60', 'NeoCell Multi Collagen Advanced Bio-Peptides Protein 60 Caplets', 'neocell-b447-multi-advanced-protein-60', 'caplet', [mag], 'clean', 'multi-collagen-advanced-bio-peptides-protein-60-caplets-m27313', 'Other ingredient: vegetable magnesium stearate. Contains egg and fish is an allergen line. 60 caplets.'),
  row('neocell-b447-multi-protein-90', 'NeoCell Multi Collagen Bio-Peptides Protein 90 Caplets', 'neocell-b447-multi-protein-caplets', 'caplet', [mag], 'clean', 'multi-collagen-bio-peptides-protein-6000-mg-90-caplets-m27315', 'Other ingredient: vegetable magnesium stearate. Contains egg and fish is an allergen line. 90 caplets.'),
  row('neocell-b447-multi-protein-360', 'NeoCell Multi Collagen Bio-Peptides Protein 360 Caplets', 'neocell-b447-multi-protein-caplets', 'caplet', [mag], 'clean', 'multi-collagen-bio-peptides-protein-6000-mg-360-caplets-m27314', 'Other ingredient: vegetable magnesium stearate. Contains egg and fish is an allergen line. 360 caplets. Same other ingredient.'),
  row('neocell-b447-marine-double-180', 'NeoCell Marine Collagen Bio-Peptides Double Strength + Hyaluronic Acid 180 Caplets', 'neocell-b447-marine-double-180', 'caplet', [cellulose, silica, mag], 'caution', 'marine-collagen-bio-peptides-double-strength-hyaluronic-acid-180-caplets-m27862', 'Silica is Caution and does not count. Contains fish is an allergen line. 180 caplets.'),
  row('neocell-b447-ha-100-60', 'NeoCell Hyaluronic Acid 100 mg 60 Vegan Capsules', 'neocell-b447-ha-100-60', 'capsule', [cellulose, gelatinCap, mag, silica], 'caution', 'hyaluronic-acid-100-mg-60-vegan-capsules-m09664', 'Silica is Caution and does not count. 60 capsules.'),
  row('neocell-b447-ha-msm-120', 'NeoCell Hyaluronic Acid + MSM 120 Capsules', 'neocell-b447-ha-msm-120', 'capsule', [gelatinCap, cellulose, mag, silica], 'caution', 'hyaluronic-acid-msm-120-capsules-m15226', 'Silica is Caution and does not count. May contain rice powder is not an other ingredient. 120 capsules.'),
  row('neocell-b447-resveratrol-180', 'NeoCell Resveratrol Ultra Complex 180 Capsules', 'neocell-b447-resveratrol-180', 'capsule', [cellulose, gelatinCap, mag, silica], 'caution', 'resveratrol-ultra-complex-180-capsules-m30524', 'Silica is Caution and does not count. 180 capsules.'),
  row('neocell-b447-beauty-builder-150', 'NeoCell Collagen Beauty Builder 150 Caplets', 'neocell-b447-beauty-builder-150', 'caplet', [cellulose, silica, mag], 'caution', 'collagen-beauty-builder-150-caplets-m12931', 'Silica is Caution and does not count. 150 caplets.'),
  row('neocell-b447-collagen-ha-90', 'NeoCell Collagen + Hyaluronic Acid Advanced Formula 90 Capsules', 'neocell-b447-collagen-ha-90', 'capsule', [gelatinCap, mag, silica, rice], 'caution', 'collagen-hyaluronic-acid-advanced-formula-90-capsules-m16131', 'Counted Limited: rice powder. 90 capsules.'),
  row('neocell-b447-joint-complex-120', 'NeoCell Joint Complex Collagen Type 2 + Hyaluronic Acid 120 Capsules', 'neocell-b447-joint-complex-120', 'capsule', [gelatinCap, mag, rice, silica], 'caution', 'joint-complex-collagen-type-2-hyaluronic-acid-120-capsules-m13284', 'Counted Limited: rice powder. 120 capsules.'),
  row('neocell-b447-biotin-keratin-ala-90', 'NeoCell Biotin + Keratin & Alpha Lipoic Acid 90 Capsules', 'neocell-b447-biotin-keratin-ala-90', 'capsule', [rice, gelatinCap, mag, silica], 'caution', 'biotin-keratin-alpha-lipoic-acid-90-capsules-m23681', 'Counted Limited: rice powder. 90 capsules.'),
  row('neocell-b447-biotin-collagen-keratin-60', 'NeoCell Biotin + Collagen & Keratin 60 Capsules', 'neocell-b447-biotin-collagen-keratin-60', 'capsule', [gelatinCap, mag, rice, silica], 'caution', 'biotin-collagen-keratin-60-capsules-m27931', 'Counted Limited: rice powder. Contains fish is an allergen line. 60 capsules.'),
  row('neocell-b447-ha-complex-120', 'NeoCell Hyaluronic Acid Complex 900 mg 120 Capsules', 'neocell-b447-ha-complex-120', 'capsule', [gelatinCap, mag, silica, rice], 'caution', 'hyaluronic-acid-complex-900-mg-with-collagen-msm-120-capsules-m175', 'Counted Limited: rice powder. 120 capsules.'),
  row('neocell-b447-nad-60', 'NeoCell NAD + Resveratrol Multi Collagen Bio-Peptides 60 Capsules', 'neocell-b447-nad-60', 'capsule', [gelatinCap, mag, rice, silica], 'caution', 'nad-resveratrol-multi-collagen-bio-peptides-1000-mg-60-rapid-release-capsules-m28681', 'Counted Limited: rice powder. Contains egg and fish is an allergen line. 60 capsules.'),
  row('neocell-b447-biotin-gummies-72', 'NeoCell Biotin 10,000 mcg Gummies Peach 72 Gummies', 'neocell-b447-biotin-gummies-72', 'gummy', [
    stored('Glucose syrup', 'gummy'), stored('Sugar', 'gummy'), stored('Pectin', 'gummy'), stored('Citric acid', 'gummy'), stored('Sodium citrate', 'gummy'), stored('Natural flavor', 'gummy'), stored('Carnauba wax', 'gummy'), stored('Palm oil', 'gummy'), stored('Annatto (color)', 'gummy'),
  ], 'caution', 'biotin-10000-mcg-gummies-peach-flavor-72-tasty-vegan-gummies-m18907', 'Counted Limited: natural flavor, palm oil. Palm oil is the gummy base. 72 gummies.'),
];
