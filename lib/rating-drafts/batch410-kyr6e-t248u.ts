// DRAFT / not verified / batch 410 KYR6-e (t248u).
// Collagen Gummies Grape is Avoid. Three counting Limited tokens.
// The note is the founder sentence. No panel was invented.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { T248U_STACK_NOTE } from '../scan-preview/t247uLocks';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

function flag(panel: string, name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why: string, lock: string): IngredientFlag {
  const meth = grade === 'limited'
    ? `Methodology §5 Limited (founder lock ${lock}). Counts toward the 3+ Limited stack.`
    : grade === 'moderate'
      ? `Methodology §5 Caution (founder lock ${lock}). Does not count toward the t137u stack.`
      : grade === 'high'
        ? `Methodology §5 Avoid (founder lock ${lock}).`
        : `Methodology §5 Cleared (founder lock ${lock}). Does not count toward the t137u stack.`;
  return { name, riskLevel: grade, stackCountExempt: !counts, why, source: `${panel}; ${meth}` };
}

const PANEL = 'Vital Proteins Collagen Gummies Grape. NIH DSLD label 323183.';

export const BATCH410_KYR6E_T248U: RatingRecord[] = [
  {
    id: 'vitalproteins-b410-collagen-gummies-grape',
    productName: 'Collagen Gummies Grape',
    brand: 'Vital Proteins',
    category: 'Vitamins',
    formulaId: 'vitalproteins-b410-collagen-gummies-grape',
    form: 'gummy',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Vital Proteins'],
    barcode: '850019568769',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag(PANEL, 'Glucose Syrup', 'cleared', false, 'Glucose syrup is a liquid sweetener made from starch.', 't162u'),
      flag(PANEL, 'Sugar (Beet)', 'cleared', false, 'Sugar from beet. It is used as a sweetener in the gummies.', 't247u'),
      flag(PANEL, 'Water', 'cleared', false, 'Purified water is plain water with the minerals removed. It is the liquid base of the product.', 't134u'),
      flag(PANEL, 'Gelatin', 'cleared', false, 'Gelatin is the protein that forms the softgel or gummy shell. It comes from animal collagen and holds the fill.', 't160u'),
      flag(PANEL, 'Lactic Acid', 'limited', true, 'Lactic acid. It is added to adjust acidity. Lactic acid is graded Limited as a processed acid (FDA 21 CFR 184.1061; produced by fermentation and purified).', 't240u'),
      flag(PANEL, 'Citric Acid', 'cleared', false, 'Citric acid is a natural acid used to set the acidity of the product.', 't160u'),
      flag(PANEL, 'Natural Flavors', 'limited', true, 'Natural flavors. It adds flavor to the product. Natural flavors are graded Limited because the exact sources and processing are not fully specified on the panel (FDA 21 CFR 101.22).', 't240u'),
      flag(PANEL, 'Orange juice concentrate', 'cleared', false, 'Orange juice concentrate is a named fruit juice used as a plant color or flavor. It is not a synthetic dye.', 't166u'),
      flag(PANEL, 'Pectin (Apple, Citrus)', 'cleared', false, 'Pectin from apple and citrus. It is a plant fiber used as a gelling agent in the gummies.', 't247u'),
      flag(PANEL, 'Carrot', 'cleared', false, 'Carrot. It is added for color and plant compounds.', 't247u'),
      flag(PANEL, 'Blueberry', 'cleared', false, 'Blueberry. It is added for color and plant compounds.', 't247u'),
      flag(PANEL, 'Vegetable Oil (Canola Oil, Coconut Oil)', 'limited', true, 'Vegetable oil made from canola oil and coconut oil. It is used as a surface coating on the gummies. Vegetable oil used as a coating is graded Limited as a processed oil (EFSA and FDA treat refined seed and coconut oils as distinct from whole-food oils).', 't247u'),
      flag(PANEL, 'Carnauba leaf wax', 'cleared', false, 'Carnauba leaf wax is a plant wax used as a coating. The FDA lists carnauba wax as GRAS.', 't182u'),
    ],
    verdict: 'avoid',
    honestNote: T248U_STACK_NOTE,
    founderHonestNote: T248U_STACK_NOTE,
    sourcesGeneral: [
      't248u. NIH DSLD label 323183 is the other-ingredient panel. The brand site does not print an Other Ingredients line. Vital Proteins Collagen Gummies Grape. 120 Gummy(ies). Label barcode 850019568769. The check digit passes. Counted Limited tokens: Lactic Acid; Natural Flavors; Vegetable Oil (Canola Oil, Coconut Oil).',
    ],
  },
];
