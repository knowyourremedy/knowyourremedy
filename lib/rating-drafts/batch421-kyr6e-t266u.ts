// DRAFT / not verified / batch 421 KYR6-e (t266u).
// Muscle Health + Recovery gummies. One counting Limited ingredient. No honest note.
// Muscle + Heart tablets stay held.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

function flag(name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why?: string): IngredientFlag {
  const meth = grade === 'limited'
    ? 'Methodology §5 Limited (founder lock t240u). Counts toward the 3+ Limited stack.'
    : grade === 'moderate'
      ? 'Methodology §5 Caution (founder lock t160u). Does not count toward the t137u stack.'
      : 'Methodology §5 Cleared (founder lock t160u). Does not count toward the t137u stack.';
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, ...(why ? { why } : {}) };
}

export const BATCH421_KYR6E_T266U: RatingRecord[] = [
  {
    id: 'slowmag-b421-muscle-health-recovery-gummies-60-count',
    productName: 'SlowMag Mg Muscle Health + Recovery Gummies 60 count',
    brand: 'Slow-Mag',
    category: 'Vitamins',
    formulaId: 'slowmag-b421-muscle-health-recovery-gummies-60-count',
    form: 'gummy',
    audience: 'kids',
    minAge: 9,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Slow-Mag'],
    barcode: '367618117606',
    activeIngredients: [{ name: 'Magnesium (as magnesium citrate)', strength: '170 mg' }],
    inactiveIngredients: [
      flag('glucose syrup', 'cleared', false, 'Glucose syrup is a liquid sweetener made from starch.'),
      flag('sugar', 'cleared', false),
      flag('water', 'cleared', false),
      flag('pectin', 'cleared', false, 'Pectin, a plant fiber from fruit. It is used as a gelling agent in gummies.'),
      flag('citric acid', 'cleared', false),
      flag('black carrot concentrate (color)', 'cleared', false),
      flag('trisodium citrate', 'cleared', false),
      flag('natural flavors', 'limited', true, 'Natural flavors. It adds flavor to the product. Natural flavors are graded Limited because the exact sources and processing are not fully specified on the panel (FDA 21 CFR 101.22).'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't266u. https://slowmag.com/slowmag-mg-muscle-recovery-gummies/ package image is the brand panel. SlowMag Mg Muscle Health + Recovery gummies. Serving size 2 gummies. 30 servings. 60 count. Bottle barcode 367618117606. The check digit passes. Other ingredients: glucose syrup, sugar, water, pectin, citric acid, black carrot concentrate (color), trisodium citrate, natural flavors. Counted Limited: natural flavors. No honest note.',
    ],
  },
];
