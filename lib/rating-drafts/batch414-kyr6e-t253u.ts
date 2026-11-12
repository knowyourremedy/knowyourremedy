// DRAFT / not verified / batch 414 KYR6-e (t253u).
// Evening primrose softgels. Organic evening primrose oil is Caution as the softgel fill.
// The 120-count uses the non-organic oil, which stays Cleared. No honest notes are stored.
// Liquid bottles that use borage seed oil as the base are not rows.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;
const EPO =
  'organic Evening Primrose Oil. It is used as a fill in the softgel. organic Evening Primrose Oil is graded Caution as a fill and Limited or Avoid when it is the base of the product (highly processed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).';
const SOFTGEL =
  'Softgel made from gelatin, glycerine, and water (with caramel color where listed). It forms the softgel that holds the ingredients.';
const PLAIN =
  'Evening Primrose Oil. It is used as a fill or carrier in the softgel or liquid. Evening Primrose Oil is graded Cleared as a named oil fill when it is not a seed oil under the Avoid locks.';

function flag(name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why?: string): IngredientFlag {
  const meth = grade === 'moderate'
    ? 'Methodology §5 Caution (founder lock t253u). Does not count toward the t137u stack.'
    : 'Methodology §5 Cleared (founder lock t251u). Does not count toward the t137u stack.';
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, ...(why ? { why } : {}) };
}

export const BATCH414_KYR6E_T253U: RatingRecord[] = [
  {
    id: 'barleans-b414-evening-primrose-oil-60-softgel-s',
    productName: 'Evening Primrose Oil 60 Softgel(s)',
    brand: "Barlean's",
    category: 'Vitamins',
    formulaId: 'barleans-b414-evening-primrose-oil-60-softgel-s',
    form: 'softgel',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ["Barlean's"],
    barcode: '705875100175',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('organic Evening Primrose Oil', 'moderate', false, EPO),
      flag('Softgel (Gelatin, Glycerine, Water)', 'cleared', false, SOFTGEL),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't253u. NIH DSLD label 215550 is the other-ingredient panel. The brand site does not print an Other Ingredients line. Barlean\'s Evening Primrose Oil. 60 Softgel(s). Label barcode 705875100175. The check digit passes. Organic evening primrose oil is the softgel fill. Counted Limited tokens: none.',
    ],
  },
  {
    id: 'barleans-b414-evening-primrose-oil-120-softgel-s',
    productName: 'Evening Primrose Oil 120 Softgel(s)',
    brand: "Barlean's",
    category: 'Vitamins',
    formulaId: 'barleans-b414-evening-primrose-oil-120-softgel-s',
    form: 'softgel',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ["Barlean's"],
    barcode: '705875100182',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('Evening Primrose Oil', 'cleared', false, PLAIN),
      flag('Gelatin', 'cleared', false),
      flag('Glycerin', 'cleared', false),
      flag('Water', 'cleared', false),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't253u. NIH DSLD label 291817 is the other-ingredient panel. The brand site does not print an Other Ingredients line. Barlean\'s Evening Primrose Oil. 120 Softgel(s). Label barcode 705875100182. The check digit passes. This count uses Evening Primrose Oil, not the organic string. Counted Limited tokens: none.',
    ],
  },
];
