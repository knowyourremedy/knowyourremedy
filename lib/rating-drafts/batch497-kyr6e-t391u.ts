// DRAFT / not verified / batch 497 KYR6-e (t391u).
// Bestie Glow Up, 60 capsules. Brand-site other ingredients.
// Organic Rice Fiber (Nu-FLOW) takes the t135e Cleared lock. The mark is not part of the token.
// No 3+ note. The brand is not closed.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;
const RICE =
  'Organic Rice Fiber (Nu-FLOW) is the exact printed string. The founder locked this token Cleared (t135e). It does not count toward the three-or-more Limited stack. Natural Passionfruit Flavor, Natural Mango Flavor, Natural Pineapple Flavor, and Natural Peach Flavor are named fruit flavors. They are not the exact Limited token Natural Flavors. Malted Rice is not rice extract and it is not rice flour. Organic Rice Fiber (Nu-FLOW®) is not bare Organic Rice Fiber. That is why it is Cleared.';
const HPMC =
  'Hypromellose is a plant-based cellulose used to make vegetarian capsules or as a tablet coating.';

function flag(panel: string, name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why?: string): IngredientFlag {
  const meth = grade === 'high'
    ? 'Methodology §5 Avoid.'
    : grade === 'limited' && counts
      ? 'Methodology §5 Limited. Counts toward the 3+ Limited stack.'
    : grade === 'limited'
      ? 'Methodology §5 Limited. Does not count toward the t137u stack.'
      : grade === 'moderate'
        ? 'Methodology §5 Caution. Does not count toward the t137u stack.'
        : 'Methodology §5 Cleared. Does not count toward the t137u stack.';
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `${panel}; ${meth}`, ...(why ? { why } : {}) };
}

const PANEL = 'Bestie Glow Up. Brand page https://bestiesupplements.com/products/glow-up.';

export const BATCH497_KYR6E_T391U: RatingRecord[] = [
  {
    id: 'bestie-b497-glow-up-60',
    productName: 'Glow Up - The Skin, Hair and Gut Bestie',
    brand: 'Bestie',
    category: 'Vitamins',
    formulaId: 'bestie-b497-glow-up-60',
    form: 'capsule',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Bestie'],
    barcode: '860012739202',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag(PANEL, 'Organic Rice Fiber (Nu-FLOW)', 'cleared', false, RICE),
      flag(PANEL, 'HPMC (vegetable capsule)', 'cleared', false, HPMC),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      't391u. Bestie brand page https://bestiesupplements.com/products/glow-up is the other-ingredient panel. Glow Up - The Skin, Hair and Gut Bestie. 3 capsules per serving. 20 servings. 60 capsules. Label barcode 860012739202. The check digit passes. Other ingredients: Organic Rice Fiber (Nu-FLOW), HPMC (vegetable capsule). Actives are not graded. Organic Rice Fiber (Nu-FLOW) takes the t135e Cleared lock. The registered mark is not part of the token. Counted Limited tokens: none.',
    ],
  },
];

if (BATCH497_KYR6E_T391U.length !== 1) throw new Error('t391u count');
const row = BATCH497_KYR6E_T391U[0];
if (row.verdict !== 'clean' || row.honestNote || row.barcode !== '860012739202') throw new Error('t391u row');
