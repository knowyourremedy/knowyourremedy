// DRAFT / not verified / batch 409 KYR6-e (t247u).
// Women's Multi gummies and the Clementine immune packets. Both are Caution.
// Collagen Gummies Grape stays held: three counting Limited tokens and no note text.
// Collagen Peptides capsules UPC 850232005652 stay held. Two DSLD panels. No panel was chosen.
// No honest notes are stored.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';

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

export const BATCH409_KYR6E_T247U: RatingRecord[] = [
  {
    id: 'vitalproteins-b409-womens-multi-gummies-raspberry',
    productName: "Women's Multi Gummies Raspberry",
    brand: 'Vital Proteins',
    category: 'Vitamins',
    formulaId: 'vitalproteins-b409-womens-multi-gummies-raspberry',
    form: 'gummy',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Vital Proteins'],
    barcode: '810089954572',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag("Vital Proteins Women's Multi Gummies Raspberry. NIH DSLD label 309508.", 'Glucose Syrup', 'cleared', false, 'Glucose syrup is a liquid sweetener made from starch.', 't162u'),
      flag("Vital Proteins Women's Multi Gummies Raspberry. NIH DSLD label 309508.", 'Sugar (Beets)', 'cleared', false, 'Sugar from beets. It is used as a sweetener in the gummies.', 't247u'),
      flag("Vital Proteins Women's Multi Gummies Raspberry. NIH DSLD label 309508.", 'Water', 'cleared', false, 'Purified water is plain water with the minerals removed. It is the liquid base of the product.', 't134u'),
      flag("Vital Proteins Women's Multi Gummies Raspberry. NIH DSLD label 309508.", 'Gelatin', 'cleared', false, 'Gelatin is the protein that forms the softgel or gummy shell. It comes from animal collagen and holds the fill.', 't160u'),
      flag("Vital Proteins Women's Multi Gummies Raspberry. NIH DSLD label 309508.", 'Orange Juice Concentrate', 'cleared', false, 'Orange juice concentrate is a named fruit juice used as a plant color or flavor. It is not a synthetic dye.', 't166u'),
      flag("Vital Proteins Women's Multi Gummies Raspberry. NIH DSLD label 309508.", 'Natural flavor', 'limited', true, 'Natural flavors. It adds flavor to the product. Natural flavors are graded Limited because the exact sources and processing are not fully specified on the panel (FDA 21 CFR 101.22).', 't240u'),
      flag("Vital Proteins Women's Multi Gummies Raspberry. NIH DSLD label 309508.", 'Citric Acid', 'cleared', false, 'Citric acid is a natural acid used to set the acidity of the product.', 't160u'),
      flag("Vital Proteins Women's Multi Gummies Raspberry. NIH DSLD label 309508.", 'Carrot', 'cleared', false, 'Carrot. It is added for color and plant compounds.', 't247u'),
      flag("Vital Proteins Women's Multi Gummies Raspberry. NIH DSLD label 309508.", 'Black Currant', 'cleared', false, 'Black currant. It is added for color and plant compounds.', 't247u'),
      flag("Vital Proteins Women's Multi Gummies Raspberry. NIH DSLD label 309508.", 'Pectin (Apple, Citrus)', 'cleared', false, 'Pectin from apple and citrus. It is a plant fiber used as a gelling agent in the gummies.', 't247u'),
      flag("Vital Proteins Women's Multi Gummies Raspberry. NIH DSLD label 309508.", 'Vegetable Oil (Canola, Coconut)', 'limited', true, 'Vegetable oil made from canola and coconut. It is used as a surface coating on the gummies. Vegetable oil used as a coating is graded Limited as a processed oil (EFSA and FDA treat refined seed and coconut oils as distinct from whole-food oils).', 't247u'),
      flag("Vital Proteins Women's Multi Gummies Raspberry. NIH DSLD label 309508.", 'Carnauba leaf wax', 'cleared', false, 'Carnauba leaf wax is a plant wax used as a coating. The FDA lists carnauba wax as GRAS.', 't182u'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      "t247u. NIH DSLD label 309508 is the other-ingredient panel. The brand site does not print an Other Ingredients line. Vital Proteins Women's Multi Gummies Raspberry. 90 Gummy(ies). Label barcode 810089954572. The check digit passes. Counted Limited tokens: Natural flavor; Vegetable Oil (Canola, Coconut).",
    ],
  },
  {
    id: 'vitalproteins-b409-vitality-immune-booster-clementine',
    productName: 'Vitality Immune Booster Clementine',
    brand: 'Vital Proteins',
    category: 'Vitamins',
    formulaId: 'vitalproteins-b409-vitality-immune-booster-clementine',
    form: 'packet',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Vital Proteins'],
    barcode: '850015883545',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('Vital Proteins Vitality Immune Booster Clementine. NIH DSLD label 302836.', 'Natural Flavors', 'limited', true, 'Natural flavors. It adds flavor to the product. Natural flavors are graded Limited because the exact sources and processing are not fully specified on the panel (FDA 21 CFR 101.22).', 't240u'),
      flag('Vital Proteins Vitality Immune Booster Clementine. NIH DSLD label 302836.', 'Himalayan Pink Sea Salt', 'cleared', false, 'Himalayan pink sea salt. It is added for mineral content and flavor.', 't247u'),
      flag('Vital Proteins Vitality Immune Booster Clementine. NIH DSLD label 302836.', 'Citric Acid', 'cleared', false, 'Citric acid is a natural acid used to set the acidity of the product.', 't160u'),
      flag('Vital Proteins Vitality Immune Booster Clementine. NIH DSLD label 302836.', 'Malic Acid', 'cleared', false, 'Malic acid is a natural acid used to set the acidity of the product.', 't160u'),
      flag('Vital Proteins Vitality Immune Booster Clementine. NIH DSLD label 302836.', 'Monk Fruit Extract', 'cleared', false, 'Monk fruit extract is a high-purity sweetener from the monk fruit.', 't138u'),
      flag('Vital Proteins Vitality Immune Booster Clementine. NIH DSLD label 302836.', 'Beta-Carotene', 'limited', true, 'Beta carotene here is used as a color, not as a vitamin dose. It is a purified pigment. The FDA lists beta-carotene as a color additive.', 't169u'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't247u. NIH DSLD label 302836 is the other-ingredient panel. The brand site does not print an Other Ingredients line. Vital Proteins Vitality Immune Booster Clementine. 7.41 Ounce(s). 14 servings. Label barcode 850015883545. The check digit passes. Counted Limited tokens: Natural Flavors; Beta-Carotene.',
    ],
  },
];
