// DRAFT / not verified / batch 135 KYR6-b Children's Zyrtec Allergy Syrup 8 fl oz.
// OI is the Giant Food 8 oz pkg PDP. The 4 oz DailyMed carton was not copied.
// Inactive list matches childrens-zyrtec-liquid, so that formulaId is reused.
// batch70–134 were not edited.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const KIDS = 'kids' as const;
const OTC = 'OTC' as const;
const RETAILERS = ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'] as const;

const METH = {
  sucralose: 'Methodology §5 Moderate (sucralose).',
  pg: 'Methodology §5 Moderate (oral propylene glycol).',
  flavor: 'Methodology §5 Limited (flavor / flavors).',
  sorbitol: 'Methodology §5 Limited (sorbitol / sorbitol solution).',
  benzoate: 'Methodology §5 Limited (sodium benzoate).',
  cleared: 'Methodology §5 Cleared.',
} as const;

const GIANT =
  'Giant Food PDP https://giantfood.com/groceries/product/zyrtec-childrens-indoor-outdoor-allergy-relief-grape-syrup-sugar-free-8-oz-pkg/290857 size 8 oz pkg';

function flag(name: string, riskLevel: IngredientFlag['riskLevel'], meth: string): IngredientFlag {
  return { name, riskLevel, source: `${GIANT}; ${meth}` };
}

const KIDS_ALTS: CleanAlternative[] = [
  {
    productId: 'boiron-allergycalm-meltaways',
    rankReason: 'Independently Clean homeopathic meltaway already on main. Form labeled, not a hard filter (§6).',
  },
  {
    productId: 'genexa-kids-allergy-dph-liquid',
    rankReason: 'Independently Clean kids diphenhydramine liquid already on main. Form labeled, not a hard filter (§6).',
  },
];

export const BATCH135_KYR6B_ZYRTEC_8OZ_SYRUP: RatingRecord[] = [
  {
    id: 'zyrtec-b135-kids-syrup-8oz',
    productName: "Children's Zyrtec Allergy Syrup (8 fl oz)",
    brand: 'Zyrtec',
    category: 'Allergies',
    barcode: '300450209146',
    formulaId: 'childrens-zyrtec-liquid',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Cetirizine HCl', strength: '5 mg / 5 mL' }],
    inactiveIngredients: [
      flag('Sucralose', 'moderate', METH.sucralose),
      flag('Propylene glycol', 'moderate', METH.pg),
      flag('Flavors', 'limited', METH.flavor),
      flag('Sorbitol Solution', 'limited', METH.sorbitol),
      flag('Sodium benzoate', 'limited', METH.benzoate),
      flag('Anhydrous citric acid', 'cleared', METH.cleared),
      flag('Purified water', 'cleared', METH.cleared),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER-LOCK DRAFT: Avoid. Drivers are sucralose and oral propylene glycol. Dye-free is not Clean. The 8 oz grape syrup PDP prints the same inactive list as childrens-zyrtec-liquid, so this row reuses that formula. The 4 fl oz row was not rewritten. Ages 2+.',
    retailers: [...RETAILERS],
    cleanAlternatives: KIDS_ALTS,
    sourcesGeneral: [
      `${GIANT}. Inactive ingredients: anhydrous citric acid, flavors, propylene glycol, purified water, sodium benzoate, sorbitol solution, sucralose. UPC 300450209146 is the Kenvue Product UPC cell for 1mg Grape Syrup Dye/Sugar-Free, 8 fl oz, on https://www.activaterewards.com/newyear/participating-products (draft, not verified).`,
    ],
  },
];
