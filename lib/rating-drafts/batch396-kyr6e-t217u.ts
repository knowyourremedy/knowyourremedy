// DRAFT / not verified / batch 396 KYR6-e (t217u).
// CellCore singles whose other ingredients are already locked.
// Protocols, kits, bundles, test vials, the vial case, and Biocidin are not rows.
// No honest notes are stored.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const BRAND = 'CellCore';
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

export const BATCH396_KYR6E_T217U: RatingRecord[] = [
  {
    id: 'cellcore-b396-carboxy',
    productName: 'Carboxy (powder)',
    brand: BRAND,
    category: 'Herbs',
    formulaId: 'cellcore-b396-carboxy',
    form: 'powder',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '810131151508',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [],
    verdict: 'clean',
    sourcesGeneral: [
      't217u. https://cellcore.com/products/carboxy is for sale. Product label PDF prints Other Ingredients: None. Serving size 1 scoop (750 mg). SKU CC-CRBXY-080-BTL-02. Brand variant barcode 810131151508. The check digit passes.',
    ],
  },
  {
    id: 'cellcore-b396-is-bab-4',
    productName: 'IS-BAB (4 fl oz)',
    brand: BRAND,
    category: 'Herbs',
    formulaId: 'cellcore-b396-is-bab-4',
    form: 'liquid',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '810131152123',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('CellCore IS-BAB brand label PDF. 4 fl oz.', 'Purified Water', 'cleared', false),
      flag('CellCore IS-BAB brand label PDF. 4 fl oz.', 'Organic Cane Alcohol', 'cleared', false),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't217u. https://cellcore.com/products/is-bab is for sale. Product label PDF prints Other Ingredients: Purified Water, Organic Cane Alcohol. Contains Walnut is an allergen line and is not graded. SKU CC-BABXX-4OZ-BTL-02. Brand variant barcode 810131152123. The check digit passes.',
    ],
  },
  {
    id: 'cellcore-b396-is-bart-4',
    productName: 'IS-BART (4 fl oz)',
    brand: BRAND,
    category: 'Herbs',
    formulaId: 'cellcore-b396-is-bart-4',
    form: 'liquid',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '810131152147',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('CellCore IS-BART brand label. 4 fl oz.', 'Purified Water', 'cleared', false),
      flag('CellCore IS-BART brand label. 4 fl oz.', 'Organic Cane Alcohol', 'cleared', false),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't217u. https://cellcore.com/products/is-bart is for sale. The label prints Other Ingredients: Purified Water, Organic Cane Alcohol. Contains Walnut is an allergen line and is not graded. The package barcode reads 8 10131 15214 7. SKU CC-BARTX-4OZ-BTL-02. Brand variant barcode 810131152147. The check digit passes.',
    ],
  },
  {
    id: 'cellcore-b396-is-boost-4',
    productName: 'IS-BOOST (4 fl oz)',
    brand: BRAND,
    category: 'Herbs',
    formulaId: 'cellcore-b396-is-boost-4',
    form: 'liquid',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '788000132609',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('CellCore IS-BOOST brand label PDF. 4 fl oz.', 'Purified Water', 'cleared', false),
      flag('CellCore IS-BOOST brand label PDF. 4 fl oz.', 'Organic Cane Alcohol', 'cleared', false),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't217u. https://cellcore.com/products/is-boost is for sale. Product label PDF prints Other Ingredients: Purified Water, Organic Cane Alcohol. Contains Walnut is an allergen line and is not graded. SKU CC-BOOST-4OZ-BTL-02. Brand variant barcode 788000132609. The check digit passes.',
    ],
  },
  {
    id: 'cellcore-b396-para-3-2',
    productName: 'Para 3 (2 fl oz)',
    brand: BRAND,
    category: 'Herbs',
    formulaId: 'cellcore-b396-para-3-2',
    form: 'liquid',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: [BRAND],
    barcode: '810131152062',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('CellCore Para 3 brand label PDF. 2 fl oz.', 'Organic Cane Alcohol', 'cleared', false),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't217u. https://cellcore.com/products/para-3 is for sale. Product label PDF prints Other Ingredients: Organic Cane Alcohol. Contains Walnut is an allergen line and is not graded. Serving size about 25 drops. SKU CC-PARA3-2OZ-BTL-02. Brand variant barcode 810131152062. The check digit passes.',
    ],
  },
];
