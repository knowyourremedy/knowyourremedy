// DRAFT / not verified / batch 402 KYR6-e (t228u).
// The last Professional Formulas holds whose tokens are now locked.
// The 27 packs with no panel stay held. No extra honest notes are stored.
// No UPC was printed.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const BRAND = 'Professional Formulas';
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;

function flag(panel: string, name: string, grade: IngredientFlag['riskLevel'], counts: boolean): IngredientFlag {
  const meth = grade === 'limited'
    ? 'Methodology §5 Limited (founder lock t228u). Counts toward the 3+ Limited stack.'
    : grade === 'moderate'
      ? 'Methodology §5 Caution (founder lock t228u). Does not count toward the t137u stack.'
      : 'Methodology §5 Cleared (founder lock t228u). Does not count toward the t137u stack.';
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `${panel}; ${meth}` };
}

export const BATCH402_KYR6E_T228U: RatingRecord[] = [
  {
    id: 'pf-b402-liquid-dhea-2',
    productName: 'Liquid DHEA (2 fl oz)',
    brand: BRAND,
    category: 'Herbs',
    formulaId: 'pf-b402-liquid-dhea-2',
    form: 'liquid',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('Professional Formulas Liquid DHEA brand page. 2 fl oz.', 'Ethanol (53%)', 'cleared', false),
      flag('Professional Formulas Liquid DHEA brand page. 2 fl oz.', 'vegetable glycerin (45%)', 'cleared', false),
      flag('Professional Formulas Liquid DHEA brand page. 2 fl oz.', 'herbal flavoring mixture containing extracts of licorice', 'moderate', false),
      flag('Professional Formulas Liquid DHEA brand page. 2 fl oz.', 'anise (2%)', 'cleared', false),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't228u. https://professionalformulas.com/product/liquid-dhea/ is in stock at $44. Product code SLD2. 2 fl oz (59 mL). Other ingredients: Ethanol (53%), vegetable glycerin (45%), and herbal flavoring mixture containing extracts of licorice and anise (2%). anise (2%) uses the anise lock. Actives are not graded. Counted Limited tokens: none. No UPC was printed. Missing UPC.',
    ],
  },
  {
    id: 'pf-b402-ubiquinol-100-60',
    productName: 'Ubiquinol 100 (CoQ10) (60 perles)',
    brand: BRAND,
    category: 'Herbs',
    formulaId: 'pf-b402-ubiquinol-100-60',
    form: 'softgel',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('Professional Formulas Ubiquinol 100 brand page. 60 perles.', 'D-limonene oil', 'cleared', false),
      flag('Professional Formulas Ubiquinol 100 brand page. 60 perles.', 'gelatin', 'cleared', false),
      flag('Professional Formulas Ubiquinol 100 brand page. 60 perles.', 'glycerin', 'cleared', false),
      flag('Professional Formulas Ubiquinol 100 brand page. 60 perles.', 'purified water', 'cleared', false),
      flag('Professional Formulas Ubiquinol 100 brand page. 60 perles.', 'caprylic acid', 'cleared', false),
      flag('Professional Formulas Ubiquinol 100 brand page. 60 perles.', 'capric acid', 'cleared', false),
      flag('Professional Formulas Ubiquinol 100 brand page. 60 perles.', 'caramel liquid', 'limited', true),
      flag('Professional Formulas Ubiquinol 100 brand page. 60 perles.', 'alpha lipoic acid', 'cleared', false),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't228u. https://professionalformulas.com/product/ubiquinol-100/ is in stock at $60. Product code SUB. 60 perles. Other ingredients: D-limonene oil, gelatin, glycerin, purified water, caprylic acid, capric acid, caramel liquid, alpha lipoic acid. The Q+ and Kaneka sentences are trademarks, not ingredients. Actives are not graded. Counted Limited: caramel liquid. No UPC was printed. Missing UPC.',
    ],
  },
  {
    id: 'pf-b402-alka-calm',
    productName: 'Alka Calm (8 oz)',
    brand: BRAND,
    category: 'Herbs',
    formulaId: 'pf-b402-alka-calm',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('Professional Formulas Alka Calm brand page. 8 oz.', 'Citric acid', 'cleared', false),
      flag('Professional Formulas Alka Calm brand page. 8 oz.', 'lemon fruit juice powder', 'cleared', false),
      flag('Professional Formulas Alka Calm brand page. 8 oz.', 'malic acid', 'cleared', false),
      flag('Professional Formulas Alka Calm brand page. 8 oz.', 'tartaric acid', 'cleared', false),
      flag('Professional Formulas Alka Calm brand page. 8 oz.', 'natural flavors (raspberry, lemon, and key lime)', 'moderate', false),
      flag('Professional Formulas Alka Calm brand page. 8 oz.', 'silicon dioxide', 'moderate', false),
      flag('Professional Formulas Alka Calm brand page. 8 oz.', 'raspberry fruit juice powder', 'cleared', false),
      flag('Professional Formulas Alka Calm brand page. 8 oz.', 'aspartic acid', 'limited', true),
      flag('Professional Formulas Alka Calm brand page. 8 oz.', 'stevia leaf extract', 'limited', true),
      flag('Professional Formulas Alka Calm brand page. 8 oz.', 'fibersol (maltodextrin)', 'limited', true),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't228u. https://professionalformulas.com/product/alka-calm/ is in stock at $24. Product code MALKA. 8 oz (226 g). Other ingredients: Citric acid, lemon fruit juice powder, malic acid, tartaric acid, natural flavors (raspberry, lemon, and key lime), silicon dioxide, raspberry fruit juice powder, aspartic acid, stevia leaf extract, and fibersol (maltodextrin). Actives are not graded. Counted Limited: aspartic acid; stevia leaf extract; fibersol (maltodextrin). That is three, so this is Avoid. No honest note is stored. No UPC was printed. Missing UPC.',
    ],
  },
  {
    id: 'pf-b402-chewable-vitamin-mineral-complex-90',
    productName: 'Chewable Vitamin Mineral Complex (90 tablets)',
    brand: BRAND,
    category: 'Herbs',
    formulaId: 'pf-b402-chewable-vitamin-mineral-complex-90',
    form: 'chewable',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('Professional Formulas Chewable Vitamin Mineral Complex brand page. 90 tablets.', 'Fructose', 'limited', true),
      flag('Professional Formulas Chewable Vitamin Mineral Complex brand page. 90 tablets.', 'CanTab Plus® (dextrose and magnesium stearate)', 'limited', true),
      flag('Professional Formulas Chewable Vitamin Mineral Complex brand page. 90 tablets.', 'orange juice flavor (from soy)', 'cleared', false),
      flag('Professional Formulas Chewable Vitamin Mineral Complex brand page. 90 tablets.', 'papaya', 'cleared', false),
      flag('Professional Formulas Chewable Vitamin Mineral Complex brand page. 90 tablets.', 'silica', 'moderate', false),
      flag('Professional Formulas Chewable Vitamin Mineral Complex brand page. 90 tablets.', 'honey powder', 'cleared', false),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't228u. https://professionalformulas.com/product/chewable-vitamin-mineral-complex/ is in stock at $34. Product code VCMC. 90 tablets. Other ingredients: Fructose, CanTab Plus® (dextrose and magnesium stearate), orange juice flavor (from soy), papaya, silica, and honey powder. Actives are not graded. Counted Limited: Fructose; CanTab Plus® (dextrose and magnesium stearate). That is two, so this is Caution. No safflower oil or highly refined soybean oil is on the panel. No UPC was printed. Missing UPC.',
    ],
  },
  {
    id: 'pf-b402-natural-beta-carotene-mulsion-120',
    productName: 'Natural Beta-Carotene Mulsion (120 perles)',
    brand: BRAND,
    category: 'Herbs',
    formulaId: 'pf-b402-natural-beta-carotene-mulsion-120',
    form: 'softgel',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('Professional Formulas Natural Beta-Carotene Mulsion brand page. 120 perles.', 'Gelatin', 'cleared', false),
      flag('Professional Formulas Natural Beta-Carotene Mulsion brand page. 120 perles.', 'highly refined soybean oil', 'moderate', false),
      flag('Professional Formulas Natural Beta-Carotene Mulsion brand page. 120 perles.', 'glycerin', 'cleared', false),
      flag('Professional Formulas Natural Beta-Carotene Mulsion brand page. 120 perles.', 'purified water', 'cleared', false),
      flag('Professional Formulas Natural Beta-Carotene Mulsion brand page. 120 perles.', 'yellow beeswax', 'cleared', false),
      flag('Professional Formulas Natural Beta-Carotene Mulsion brand page. 120 perles.', 'soy lecithin', 'cleared', false),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't228u. https://professionalformulas.com/product/natural-beta-carotene-mulsion/ is in stock at $30. Product code VBAM. 120 perles. Other ingredients: Gelatin, highly refined soybean oil, glycerin, purified water, yellow beeswax, and soy lecithin. The oil is the perle fill, not the base of a chewable. Actives are not graded. Counted Limited tokens: none. No UPC was printed. Missing UPC.',
    ],
  },
];
