// DRAFT / not verified / batch 411 KYR6-e (t250u).
// Barlean's mood drops. Xylitol is Caution and does not count.
// Counted Limited tokens: Natural Flavors and Sorbic Acid. The product is Caution.
// No honest note is stored. The brand site does not print Other Ingredients.
// Panels are on-market NIH DSLD label records.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;
const XYLITOL =
  'Xylitol, a sugar alcohol. It is used as a sweetener. Xylitol is graded Caution as a processed sugar alcohol (FDA 21 CFR 172.395; CIR safety assessment of xylitol).';

function flag(panel: string, name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why?: string): IngredientFlag {
  const meth = grade === 'limited'
    ? 'Methodology §5 Limited. Counts toward the 3+ Limited stack.'
    : grade === 'moderate'
      ? 'Methodology §5 Caution (founder lock t250u). Does not count toward the t137u stack.'
      : 'Methodology §5 Cleared. Does not count toward the t137u stack.';
  return {
    name,
    riskLevel: grade,
    stackCountExempt: !counts,
    source: `${panel}; ${meth}`,
    ...(why ? { why } : {}),
  };
}

function row(id: string, productName: string, dsld: string, upc: string): RatingRecord {
  const panel = `Barlean's ${productName}. NIH DSLD label ${dsld}.`;
  return {
    id,
    productName,
    brand: "Barlean's",
    category: 'Vitamins',
    formulaId: id,
    form: 'liquid',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ["Barlean's"],
    barcode: upc,
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag(panel, 'Water, Purified', 'cleared', false),
      flag(panel, 'Glycerin', 'cleared', false),
      flag(panel, 'Xylitol', 'moderate', false, XYLITOL),
      flag(panel, 'Natural Flavors', 'limited', true),
      flag(panel, 'Citric Acid', 'cleared', false),
      flag(panel, 'Sorbic Acid', 'limited', true),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      `t250u. NIH DSLD label ${dsld} is the other-ingredient panel. The brand site does not print an Other Ingredients line. Barlean's ${productName}. 1.5 Fluid Ounce(s). Label barcode ${upc}. The check digit passes. Other ingredients: Water, Purified; Glycerin; Xylitol; Natural Flavors; Citric Acid; Sorbic Acid. Xylitol is Caution and does not count. Counted Limited tokens: Natural Flavors; Sorbic Acid.`,
    ],
  };
}

export const BATCH411_KYR6E_T250U: RatingRecord[] = [
  row('barleans-b411-mood-drops-to-thrive', 'Mood Drops to Thrive', '337674', '705875802307'),
  row('barleans-b411-mood-drops-to-perform', 'Mood Drops to Perform', '337671', '705875802284'),
  row('barleans-b411-mood-drops-to-de-stress', 'Mood Drops to De-Stress', '337670', '705875802253'),
];
