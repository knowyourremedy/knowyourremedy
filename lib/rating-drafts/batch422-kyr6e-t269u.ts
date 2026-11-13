// DRAFT / not verified / batch 422 KYR6-e (t269u).
// Muscle + Heart tablets, three counts, one panel. Avoid from locked Avoid ingredients.
// No 3+ Limited note. Titanium dioxide, FD&C Blue #2 Lake, and Talc are already Avoid.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;
const FORMULA = 'slowmag-b422-muscle-heart-tablets';

function flag(name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why: string, mark: string): IngredientFlag {
  const meth = grade === 'limited'
    ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
    : grade === 'high'
      ? `Methodology §5 Avoid (founder lock ${mark}).`
      : grade === 'moderate'
        ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
        : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, ...(why ? { why } : {}) };
}

const INACTIVE: IngredientFlag[] = [
  flag('Methacrylic Acid Copolymer', 'limited', true, 'This is an enteric coating polymer. It is graded Limited and counts toward a 3+ Limited stack.', 't165u'),
  flag('Polyvinylpyrrolidone', 'limited', true, 'Polyvinylpyrrolidone. It is used as a binder and disintegrant. Polyvinylpyrrolidone is graded Limited as a synthetic polymer (FDA 21 CFR 173.55; used as a tablet binder).', 't267u'),
  flag('Triacetin', 'cleared', false, 'Triacetin is a plasticizer used in tablet coatings.', 't138u'),
  flag('Microcrystalline Cellulose', 'cleared', false, '', 't160u'),
  flag('Hypromellose', 'cleared', false, '', 't160u'),
  flag('Titanium Dioxide', 'high', false, 'Titanium dioxide color. It is a white mineral used to color the product. Titanium dioxide is graded Avoid because of nanoparticle concerns (IARC 2B possible carcinogen).', 't135u'),
  flag('Acacia', 'cleared', false, 'Acacia, a plant gum. It is used as a binder and thickener.', 't267u'),
  flag('Maltodextrin', 'limited', true, 'Maltodextrin. It is used as a filler. Maltodextrin is graded Limited because it is a highly processed starch (EFSA 2018).', 't259u'),
  flag('Magnesium Stearate', 'cleared', false, '', 't160u'),
  flag('Stearic Acid', 'cleared', false, '', 't160u'),
  flag('Mineral Oil', 'cleared', false, 'Mineral oil is a purified petroleum product used as an ointment base.', 't162u'),
  flag('Carnauba Wax', 'cleared', false, 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).', 't133u'),
  flag('Croscarmellose Sodium', 'cleared', false, '', 't160u'),
  flag('Sodium Lauryl Sulfate', 'limited', true, 'Sodium lauryl sulfate is a foaming agent. Skin studies use it as a standard irritant. It can irritate skin or the mouth.', 't162u'),
  flag('FD&C Blue #2 Lake', 'high', false, '', 't138u'),
  flag('Pharmaceutical Glaze', 'limited', true, 'Pharmaceutical glaze. It coats the tablet. Pharmaceutical glaze is graded Limited as a processed glaze (FDA 21 CFR 172.615; confectioner’s glaze is a refined shellac).', 't267u'),
  flag('Propylene Glycol', 'limited', true, 'Propylene glycol is a synthetic solvent. It is graded Limited and counts toward a 3+ Limited stack.', 't135u'),
  flag('Talc', 'high', false, 'Talc is a mineral powder. The World Health Organization’s cancer research agency classifies it as probably carcinogenic to humans.', 't135u'),
];

function row(id: string, count: string): RatingRecord {
  return {
    id,
    productName: `SlowMag Mg Muscle + Heart ${count}`,
    brand: 'Slow-Mag',
    category: 'Vitamins',
    formulaId: FORMULA,
    form: 'tablet',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Slow-Mag'],
    activeIngredients: [
      { name: 'Magnesium', strength: '143 mg' },
      { name: 'Calcium', strength: '238 mg' },
    ],
    inactiveIngredients: INACTIVE,
    verdict: 'avoid',
    sourcesGeneral: [
      `t269u. https://slowmag.com/slowmag-mg-muscle-heart/ 120-count carton is the brand panel. SlowMag Mg Muscle + Heart tablets. Serving size 2 tablets. The 120-count carton has 60 servings. Sold in 60, 120, and 180 count. This row is the ${count}. No barcode on the carton images. Missing UPC. Counted Limited: Methacrylic Acid Copolymer; Polyvinylpyrrolidone; Maltodextrin; Sodium Lauryl Sulfate; Pharmaceutical Glaze; Propylene Glycol.`,
    ],
  };
}

export const BATCH422_KYR6E_T269U: RatingRecord[] = [
  row('slowmag-b422-muscle-heart-60-count', '60 count'),
  row('slowmag-b422-muscle-heart-120-count', '120 count'),
  row('slowmag-b422-muscle-heart-180-count', '180 count'),
];
