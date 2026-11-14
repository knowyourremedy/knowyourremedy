// DRAFT / not verified / batch 423 KYR6-e (t270u).
// 7-Day Cleanse and Healthy Beets. One or two counting Limited ingredients. No honest note.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

function flag(name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why?: string, mark = 't160u'): IngredientFlag {
  const meth = grade === 'limited'
    ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
    : grade === 'moderate'
      ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
      : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, ...(why ? { why } : {}) };
}

export const BATCH423_KYR6E_T270U: RatingRecord[] = [
  {
    id: 'purelyinspired-b423-7-day-cleanse-42-capsules',
    productName: '7-Day Cleanse 42 Capsules',
    brand: 'Purely Inspired',
    category: 'Vitamins',
    formulaId: 'purelyinspired-b423-7-day-cleanse-42-capsules',
    form: 'capsule',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Purely Inspired'],
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('Hypromellose', 'cleared', false),
      flag('Water', 'cleared', false),
      flag('Microcrystalline Cellulose', 'cleared', false),
      flag('Silicon Dioxide', 'moderate', false),
      flag('Magnesium Stearate', 'cleared', false),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't270u. NIH DSLD labels 317663 and 323232 are the other-ingredient panel. The brand site does not print an Other Ingredients line. Purely Inspired 7-Day Cleanse. 42 capsules. Both on-market labels print the same other ingredients and no UPC. Missing UPC. Counted Limited: none. Silicon dioxide is Caution and does not count. No honest note.',
    ],
  },
  {
    id: 'purelyinspired-b423-healthy-beets-11-25-ounce',
    productName: 'Healthy Beets 11.25 Ounce',
    brand: 'Purely Inspired',
    category: 'Vitamins',
    formulaId: 'purelyinspired-b423-healthy-beets-11-25-ounce',
    form: 'powder',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Purely Inspired'],
    barcode: '631656716474',
    activeIngredients: [{ name: 'Beet root juice', strength: '500 mg' }],
    inactiveIngredients: [
      flag('Maltodextrin', 'limited', true, 'Maltodextrin. It is used as a filler. Maltodextrin is graded Limited because it is a highly processed starch (EFSA 2018).', 't259u'),
      flag('Guar Gum', 'cleared', false, 'Guar gum, a plant gum. It thickens and stabilizes the liquid.', 't251u'),
      flag('Malic Acid', 'cleared', false),
      flag('Citric Acid', 'cleared', false),
      flag('Stevia Leaf Extract', 'limited', true, 'Stevia Leaf Extract. It adds sweetness to the product. Stevia extracts are graded Limited as purified extracts (EFSA 2010 re-evaluation of steviol glycosides).', 't251u'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't270u. NIH DSLD label 293805 is the other-ingredient panel. The brand site does not print an Other Ingredients line. Purely Inspired Healthy Beets. 11.25 ounce. Label barcode 631656716474. The check digit passes. Counted Limited: Maltodextrin; Stevia Leaf Extract. No honest note.',
    ],
  },
];
