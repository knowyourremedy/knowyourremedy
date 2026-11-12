// DRAFT / not verified / batch 417 KYR6-e (t256u).
// Joint Remedy softgels are Clean. The glycerin softgel string uses the existing glycerine lock.
// Organic hempseed oil and organic Styrian pumpkin seed oil are Caution only as a softgel fill.
// No honest note is stored.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';

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

export const BATCH417_KYR6E_T256U: RatingRecord[] = [
  {
    id: 'barleans-b417-joint-remedy-30-softgel-s',
    productName: 'Joint Remedy 30 Softgel(s)',
    brand: "Barlean's",
    category: 'Vitamins',
    formulaId: 'barleans-b417-joint-remedy-30-softgel-s',
    form: 'softgel',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ["Barlean's"],
    barcode: '705875060035',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('Fish Oil (Anchovy, Menhaden)', 'cleared', false, 'Fish oil from anchovy and menhaden. It is used as a fill or carrier. Fish oil is graded Cleared as a named oil fill.', 't254u'),
      flag('Softgel (Caramel color, Gelatin, Glycerin, Sorbitol Sorbitan solution, Water)', 'cleared', false, 'Softgel made from gelatin, glycerine, sorbitol sorbitan solution, and water, with caramel color. It forms the softgel that holds the ingredients.', 't252u'),
      flag('Hyaluronic Acid', 'cleared', false, 'Hyaluronic acid. It is added for its moisture-retaining compounds.', 't252u'),
      flag('Beeswax', 'cleared', false, 'Beeswax is a natural wax used as a coating or softgel plasticizer.', 't240u'),
      flag('Sunflower Lecithin', 'cleared', false, 'Lecithin is a phospholipid used as an emulsifier so oils and water stay mixed. Sunflower lecithin is the sunflower form.', 't121u'),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      "t256u. NIH DSLD label 69568 is the other-ingredient panel. The brand site does not print an Other Ingredients line. Barlean's Joint Remedy. 30 Softgel(s). Label barcode 705875060035. The check digit passes. Counted Limited tokens: none. Softgel (Caramel color, Gelatin, Glycerin, Sorbitol Sorbitan solution, Water) uses the existing glycerine lock.",
    ],
  },
];
