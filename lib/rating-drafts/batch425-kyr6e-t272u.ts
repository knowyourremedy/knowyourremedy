// DRAFT / not verified / batch 425 KYR6-e (t272u).
// Organic Greens Unflavored is Avoid because three Limited ingredients count.
// No Avoid ingredient is on the panel. The exact 3+ note is stored.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { T271U_STACK_NOTE } from '../scan-preview/t271uLocks';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

function flag(name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why: string, mark: string): IngredientFlag {
  const meth = grade === 'limited'
    ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
    : grade === 'moderate'
      ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
      : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, why };
}

export const BATCH425_KYR6E_T272U: RatingRecord[] = [
  {
    id: 'purelyinspired-b425-organic-greens-unflavored-8-54-ounce',
    productName: 'Organic Greens Unflavored 8.54 Ounce',
    brand: 'Purely Inspired',
    category: 'Vitamins',
    formulaId: 'purelyinspired-b425-organic-greens-unflavored-8-54-ounce',
    form: 'powder',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Purely Inspired'],
    barcode: '631656708837',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('Rebaudioside A', 'limited', true, 'Rebaudioside A is a purified steviol glycoside from the stevia plant. High-purity forms have FDA GRAS status, but the bare form is graded Limited.', 't169u'),
      flag('Steviol Glycosides', 'limited', true, 'Steviol glycosides. It adds sweetness to the product. Steviol glycosides are graded Limited as a purified stevia extract (EFSA 2010 re-evaluation of steviol glycosides).', 't271u'),
      flag('Maltodextrin', 'limited', true, 'Maltodextrin. It is used as a filler. Maltodextrin is graded Limited because it is a highly processed starch (EFSA 2018).', 't259u'),
      flag('Sunflower Lecithin', 'cleared', false, 'Sunflower lecithin is a phospholipid from sunflower seeds used as an emulsifier so oils and water stay mixed.', 'clean alias'),
      flag('Corn Starch', 'cleared', false, 'Corn Starch. It is used as a filler, coating, or added for its plant or nutrient compounds.', 't251u'),
      flag('Silicon Dioxide', 'moderate', false, 'Silica is an anti-caking powder that keeps ingredients from clumping. Some forms raise questions about nanoparticle absorption.', 't160u'),
    ],
    verdict: 'avoid',
    honestNote: T271U_STACK_NOTE,
    founderHonestNote: T271U_STACK_NOTE,
    sourcesGeneral: [
      't272u. NIH DSLD label 323235 is the other-ingredient panel. The brand site does not print an Other Ingredients line. Purely Inspired Organic Greens Unflavored. 8.54 ounce. Label barcode 631656708837. The check digit passes. Counted Limited: Rebaudioside A; Steviol Glycosides; Maltodextrin. No Avoid ingredient. The exact 3+ note is stored.',
    ],
  },
];
