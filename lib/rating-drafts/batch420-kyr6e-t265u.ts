// DRAFT / not verified / batch 420 KYR6-e (t265u).
// Ear Ringing and Balance Support. No honest note is stored.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

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

export const BATCH420_KYR6E_T265U: RatingRecord[] = [
  {
    id: "lipoflavonoid-b420-ear-ringing-150-count",
    productName: "Ear Ringing 150 Count",
    brand: 'Lipo-Flavonoid',
    category: 'Vitamins',
    formulaId: "lipoflavonoid-b420-ear-ringing-150-count",
    form: 'caplet',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Lipo-Flavonoid'],
    
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag("Microcrystalline cellulose", 'cleared', false, "", 't160u'),
      flag("stearic acid", 'cleared', false, "", 't160u'),
      flag("partially hydrogenated vegetable oil", 'high', false, "The panel says hydrogenated. It does not say partial or fully. Partial is the form the agencies banned, because it is the trans-fat source. This app cannot tell which form is in the box, so the grade goes to the harder one. That is why it is High risk.", 't107u'),
      flag("croscarmellose sodium", 'cleared', false, "", 't160u'),
      flag("povidone", 'cleared', false, "", 't160u'),
      flag("magnesium stearate", 'cleared', false, "", 't160u'),
      flag("hypromellose", 'cleared', false, "", 't160u'),
      flag("polyvinyl alcohol", 'cleared', false, "Polyvinyl alcohol is a film used to coat a tablet.", 't138u'),
      flag("silicon dioxide", 'moderate', false, "", 't160u'),
      flag("titanium dioxide", 'high', false, "Titanium dioxide is a white color. In 2022 the European Union stopped allowing it in food after its food-safety agency could not rule out damage to DNA.", 't135u'),
      flag("talc", 'high', false, "Talc is a mineral powder. The World Health Organization’s cancer research agency classifies it as probably carcinogenic to humans.", 't135u'),
      flag("ethyl vanillin", 'limited', true, "Ethyl vanillin. It adds vanilla flavor to the product. Ethyl vanillin is graded Limited as a synthetic flavor (FDA 21 CFR 182.60; most commercial ethyl vanillin is synthetic).", 't265u'),
      flag("triacetin", 'cleared', false, "Triacetin is a plasticizer used in tablet coatings.", 't138u'),
      flag("FD&C red #40 lake", 'high', false, "This is a synthetic dye. European labels warn that this dye family can affect activity and attention in children.", 't135u'),
      flag("carnauba wax", 'cleared', false, "Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).", 't133u'),
      flag("FD&C blue #1 lake", 'high', false, "This is a synthetic dye. European labels warn that this dye family can affect activity and attention in children.", 't135u')
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      "t265u. https://lipoflavonoid.com/products/ear-ringing is the brand panel. Ear Ringing 150 count, SKU 510150A. No barcode on the brand variant. Missing UPC. The 150 and 500 counts share this Other Ingredients line. The may-contain line is not graded as a definite ingredient. Counted Limited: ethyl vanillin.",
    ],
  },
  {
    id: "lipoflavonoid-b420-ear-ringing-500-count",
    productName: "Ear Ringing 500 Count",
    brand: 'Lipo-Flavonoid',
    category: 'Vitamins',
    formulaId: "lipoflavonoid-b420-ear-ringing-500-count",
    form: 'caplet',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Lipo-Flavonoid'],
    
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag("Microcrystalline cellulose", 'cleared', false, "", 't160u'),
      flag("stearic acid", 'cleared', false, "", 't160u'),
      flag("partially hydrogenated vegetable oil", 'high', false, "The panel says hydrogenated. It does not say partial or fully. Partial is the form the agencies banned, because it is the trans-fat source. This app cannot tell which form is in the box, so the grade goes to the harder one. That is why it is High risk.", 't107u'),
      flag("croscarmellose sodium", 'cleared', false, "", 't160u'),
      flag("povidone", 'cleared', false, "", 't160u'),
      flag("magnesium stearate", 'cleared', false, "", 't160u'),
      flag("hypromellose", 'cleared', false, "", 't160u'),
      flag("polyvinyl alcohol", 'cleared', false, "Polyvinyl alcohol is a film used to coat a tablet.", 't138u'),
      flag("silicon dioxide", 'moderate', false, "", 't160u'),
      flag("titanium dioxide", 'high', false, "Titanium dioxide is a white color. In 2022 the European Union stopped allowing it in food after its food-safety agency could not rule out damage to DNA.", 't135u'),
      flag("talc", 'high', false, "Talc is a mineral powder. The World Health Organization’s cancer research agency classifies it as probably carcinogenic to humans.", 't135u'),
      flag("ethyl vanillin", 'limited', true, "Ethyl vanillin. It adds vanilla flavor to the product. Ethyl vanillin is graded Limited as a synthetic flavor (FDA 21 CFR 182.60; most commercial ethyl vanillin is synthetic).", 't265u'),
      flag("triacetin", 'cleared', false, "Triacetin is a plasticizer used in tablet coatings.", 't138u'),
      flag("FD&C red #40 lake", 'high', false, "This is a synthetic dye. European labels warn that this dye family can affect activity and attention in children.", 't135u'),
      flag("carnauba wax", 'cleared', false, "Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).", 't133u'),
      flag("FD&C blue #1 lake", 'high', false, "This is a synthetic dye. European labels warn that this dye family can affect activity and attention in children.", 't135u')
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      "t265u. https://lipoflavonoid.com/products/ear-ringing is the brand panel. Ear Ringing 500 count, SKU 510500. No barcode on the brand variant. Missing UPC. The 150 and 500 counts share this Other Ingredients line. The may-contain line is not graded as a definite ingredient. Counted Limited: ethyl vanillin.",
    ],
  },
  {
    id: "lipoflavonoid-b420-balance-support-30-count",
    productName: "Balance Support 30 Count",
    brand: 'Lipo-Flavonoid',
    category: 'Vitamins',
    formulaId: "lipoflavonoid-b420-balance-support-30-count",
    form: 'caplet',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Lipo-Flavonoid'],
    barcode: "889476513005",
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag("Microcrystalline cellulose", 'cleared', false, "", 't160u'),
      flag("croscarmellose sodium", 'cleared', false, "", 't160u'),
      flag("stearic acid", 'cleared', false, "", 't160u'),
      flag("dicalcium phosphate", 'cleared', false, "", 't162u'),
      flag("polyvinyl alcohol", 'cleared', false, "Polyvinyl alcohol is a film used to coat a tablet.", 't138u'),
      flag("magnesium stearate", 'cleared', false, "", 't160u'),
      flag("talc", 'high', false, "Talc is a mineral powder. The World Health Organization’s cancer research agency classifies it as probably carcinogenic to humans.", 't135u'),
      flag("silicon dioxide", 'moderate', false, "", 't160u'),
      flag("povidone", 'cleared', false, "", 't160u'),
      flag("soy lecithin", 'cleared', false, "Sunflower lecithin is a phospholipid from sunflower seeds used as an emulsifier so oils and water stay mixed.", 'alias'),
      flag("free fatty acids", 'limited', true, "Free fatty acids. It is used as a carrier or emulsifier. Free fatty acids are graded Limited as a processed fat fraction (FDA and EFSA treat free fatty acids as refined lipid fractions distinct from whole oils).", 't265u'),
      flag("xanthan gum", 'cleared', false, "", 't160u'),
      flag("tricalcium phosphate", 'cleared', false, "Calcium phosphate is a mineral salt used as a filler so the tablet holds its shape.", 'alias'),
      flag("carnauba wax", 'cleared', false, "Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).", 't133u')
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      "t265u. https://lipoflavonoid.com/products/balance-support is the brand panel. Balance Support 30 count, SKU 510300. Label barcode 889476513005. The check digit passes. The 30, 60, and 90 counts share this Other Ingredients line. Counted Limited: free fatty acids.",
    ],
  },
  {
    id: "lipoflavonoid-b420-balance-support-60-count",
    productName: "Balance Support 60 Count",
    brand: 'Lipo-Flavonoid',
    category: 'Vitamins',
    formulaId: "lipoflavonoid-b420-balance-support-60-count",
    form: 'caplet',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Lipo-Flavonoid'],
    
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag("Microcrystalline cellulose", 'cleared', false, "", 't160u'),
      flag("croscarmellose sodium", 'cleared', false, "", 't160u'),
      flag("stearic acid", 'cleared', false, "", 't160u'),
      flag("dicalcium phosphate", 'cleared', false, "", 't162u'),
      flag("polyvinyl alcohol", 'cleared', false, "Polyvinyl alcohol is a film used to coat a tablet.", 't138u'),
      flag("magnesium stearate", 'cleared', false, "", 't160u'),
      flag("talc", 'high', false, "Talc is a mineral powder. The World Health Organization’s cancer research agency classifies it as probably carcinogenic to humans.", 't135u'),
      flag("silicon dioxide", 'moderate', false, "", 't160u'),
      flag("povidone", 'cleared', false, "", 't160u'),
      flag("soy lecithin", 'cleared', false, "Sunflower lecithin is a phospholipid from sunflower seeds used as an emulsifier so oils and water stay mixed.", 'alias'),
      flag("free fatty acids", 'limited', true, "Free fatty acids. It is used as a carrier or emulsifier. Free fatty acids are graded Limited as a processed fat fraction (FDA and EFSA treat free fatty acids as refined lipid fractions distinct from whole oils).", 't265u'),
      flag("xanthan gum", 'cleared', false, "", 't160u'),
      flag("tricalcium phosphate", 'cleared', false, "Calcium phosphate is a mineral salt used as a filler so the tablet holds its shape.", 'alias'),
      flag("carnauba wax", 'cleared', false, "Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).", 't133u')
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      "t265u. https://lipoflavonoid.com/products/balance-support is the brand panel. Balance Support 60 count, SKU 510322VB. No barcode on the brand variant. Missing UPC. The 30, 60, and 90 counts share this Other Ingredients line. Counted Limited: free fatty acids.",
    ],
  },
  {
    id: "lipoflavonoid-b420-balance-support-90-count",
    productName: "Balance Support 90 Count",
    brand: 'Lipo-Flavonoid',
    category: 'Vitamins',
    formulaId: "lipoflavonoid-b420-balance-support-90-count",
    form: 'caplet',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Lipo-Flavonoid'],
    
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag("Microcrystalline cellulose", 'cleared', false, "", 't160u'),
      flag("croscarmellose sodium", 'cleared', false, "", 't160u'),
      flag("stearic acid", 'cleared', false, "", 't160u'),
      flag("dicalcium phosphate", 'cleared', false, "", 't162u'),
      flag("polyvinyl alcohol", 'cleared', false, "Polyvinyl alcohol is a film used to coat a tablet.", 't138u'),
      flag("magnesium stearate", 'cleared', false, "", 't160u'),
      flag("talc", 'high', false, "Talc is a mineral powder. The World Health Organization’s cancer research agency classifies it as probably carcinogenic to humans.", 't135u'),
      flag("silicon dioxide", 'moderate', false, "", 't160u'),
      flag("povidone", 'cleared', false, "", 't160u'),
      flag("soy lecithin", 'cleared', false, "Sunflower lecithin is a phospholipid from sunflower seeds used as an emulsifier so oils and water stay mixed.", 'alias'),
      flag("free fatty acids", 'limited', true, "Free fatty acids. It is used as a carrier or emulsifier. Free fatty acids are graded Limited as a processed fat fraction (FDA and EFSA treat free fatty acids as refined lipid fractions distinct from whole oils).", 't265u'),
      flag("xanthan gum", 'cleared', false, "", 't160u'),
      flag("tricalcium phosphate", 'cleared', false, "Calcium phosphate is a mineral salt used as a filler so the tablet holds its shape.", 'alias'),
      flag("carnauba wax", 'cleared', false, "Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).", 't133u')
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      "t265u. https://lipoflavonoid.com/products/balance-support is the brand panel. Balance Support 90 count, SKU 510333VB. No barcode on the brand variant. Missing UPC. The 30, 60, and 90 counts share this Other Ingredients line. Counted Limited: free fatty acids.",
    ],
  }
];
