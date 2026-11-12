// DRAFT / not verified / batch 399 KYR6-e (t224u).
// Professional Formulas packs whose other ingredients are already locked.
// Test kits, empty vials, and the not-purchasable catalog entries are not rows.
// No honest notes are stored. No UPC was printed on these pages.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const BRAND = 'Professional Formulas';
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;

function flag(panel: string, name: string, grade: IngredientFlag['riskLevel'], counts: boolean): IngredientFlag {
  const meth = grade === 'limited'
    ? 'Methodology §5 Limited. Counts toward the 3+ Limited stack.'
    : grade === 'moderate'
      ? 'Methodology §5 Caution. Does not count toward the t137u stack.'
      : 'Methodology §5 Cleared. Does not count toward the t137u stack.';
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `${panel}; ${meth}` };
}

export const BATCH399_KYR6E_T224U: RatingRecord[] = [
  {
    id: 'pf-b399-grapefruit-seed-extract-2',
    productName: 'Grapefruit Seed Extract (2 fl oz)',
    brand: BRAND,
    category: 'Herbs',
    formulaId: 'pf-b399-grapefruit-seed-extract-2',
    form: 'liquid',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('Professional Formulas Grapefruit Seed Extract brand page. 2 fl oz.', 'Vegetable glycerin', 'cleared', false),
      flag('Professional Formulas Grapefruit Seed Extract brand page. 2 fl oz.', 'purified water', 'cleared', false),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't224u. https://professionalformulas.com/product/grapefruit-seed-extract/ is for sale on backorder at $26. Product code SGSE. 2 fl oz (59 mL). Other ingredients: Vegetable glycerin and purified water. Serving size 10 drops (0.3 mL). Actives are not graded. No UPC was printed. Missing UPC.',
    ],
  },
  {
    id: 'pf-b399-d-ribose-180',
    productName: 'D-Ribose (180 capsules)',
    brand: BRAND,
    category: 'Herbs',
    formulaId: 'pf-b399-d-ribose-180',
    form: 'capsule',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('Professional Formulas D-Ribose brand page. 180 capsules.', 'Vegetarian capsule (hypromellose and water)', 'cleared', false),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't224u. https://professionalformulas.com/product/d-ribose/ is in stock at $32. Product code SRIB. 180 capsules. Other ingredients: Vegetarian capsule (hypromellose and water). Serving size 2 capsules. Actives are not graded. No UPC was printed. Missing UPC.',
    ],
  },
  {
    id: 'pf-b399-probiotic-complex-60',
    productName: 'Probiotic Complex (60 capsules)',
    brand: BRAND,
    category: 'Herbs',
    formulaId: 'pf-b399-probiotic-complex-60',
    form: 'capsule',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('Professional Formulas Probiotic Complex brand page. 60 capsules.', 'Microcrystalline cellulose', 'cleared', false),
      flag('Professional Formulas Probiotic Complex brand page. 60 capsules.', 'vegetarian capsule (hypromellose and water)', 'cleared', false),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't224u. https://professionalformulas.com/product/probiotic-complex/ is in stock at $36. Product code SAB12. 60 capsules. Other ingredients: Microcrystalline cellulose and vegetarian capsule (hypromellose and water). Serving size one capsule. Actives are not graded. No UPC was printed. Missing UPC.',
    ],
  },
  {
    id: 'pf-b399-evening-primrose-oil-90',
    productName: 'Evening Primrose Oil (90 perles)',
    brand: BRAND,
    category: 'Herbs',
    formulaId: 'pf-b399-evening-primrose-oil-90',
    form: 'softgel',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('Professional Formulas Evening Primrose Oil brand page. 90 perles.', 'Gelatin', 'cleared', false),
      flag('Professional Formulas Evening Primrose Oil brand page. 90 perles.', 'glycerin', 'cleared', false),
      flag('Professional Formulas Evening Primrose Oil brand page. 90 perles.', 'purified water', 'cleared', false),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't224u. https://professionalformulas.com/product/evening-primrose-oil/ is in stock at $32. Product code BEPOCP. 90 perles. Other ingredients: Gelatin, glycerin, and purified water. The oil is the perle fill and is not an other ingredient. Serving size 1 perle. Actives are not graded. No UPC was printed. Missing UPC.',
    ],
  },
];
