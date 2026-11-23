// DRAFT / not verified / batch 499 KYR6-e (t398u).
// Cymbiotika D3 + K2 + CoQ10. Brand-site panel. Two counts, one panel.
// Two counting Limited tokens. Caution. No 3+ note.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients } from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

const VANILLA = 'Vanilla extract (or powder) is a flavor from vanilla. It adds vanilla taste to the product.';
const CASSAVA = 'Cassava syrup is a processed sweetener from cassava. It is used as a sweetener. Cassava syrup is graded Limited as a processed sweetener (FDA and EFSA treat refined syrups as processed ingredients).';
const TANGERINE = 'Tangerine oil is oil from tangerine peel. It is included for its plant compounds.';
const ROWANBERRY = 'Rowanberry fruit extract is an extract of the rowanberry. It is included for its plant compounds.';
const PC = 'Phosphatidylcholine is a phospholipid. It is used as an emulsifier.';

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

function ingredients(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Vitamin D (as Cholecalciferol from Lichen)', 'cleared', false, 'Vitamin D. It is included for its nutrient compounds.'),
    flag(panel, 'Vitamin K2 (MK-4 and MK-7)', 'cleared', false, 'Vitamin K2 is a form of vitamin K. It is included as a source of vitamin K.'),
    flag(panel, 'Phosphatidylcholine (from Sunflower Lecithin)', 'cleared', false, PC),
    flag(panel, 'Coenzyme Q10', 'cleared', false, 'Coenzyme Q10 is a coenzyme. It is included for its antioxidant compounds.'),
    flag(panel, 'Glycerin', 'cleared', false, 'Glycerin is a sweet, syrupy liquid that keeps the product moist and helps other ingredients mix.'),
    flag(panel, 'Water', 'cleared', false, 'This is plain water used as the liquid base. Spring or artesian water is groundwater that rises naturally.'),
    flag(panel, 'Organic Cassava Syrup', 'limited', true, CASSAVA),
    flag(panel, 'Pectin', 'cleared', false, 'Pectin, a plant fiber from fruit. It is used as a gelling agent in gummies.'),
    flag(panel, 'Organic Vanilla Extract', 'cleared', false, VANILLA),
    flag(panel, 'Malic Acid', 'cleared', false, 'Malic acid is a natural acid used to set the acidity of the product.'),
    flag(panel, 'Organic Tangerine Oil', 'cleared', false, TANGERINE),
    flag(panel, 'D-Alpha-Tocopherol', 'cleared', false, 'D-Alpha-Tocopherol. It is added to help keep the product stable or for its vitamin activity.'),
    flag(panel, 'Sodium Alginate', 'cleared', false, 'Sodium alginate is a thickener from seaweed. It is Cleared.'),
    flag(panel, 'Rowanberry Fruit Extract', 'cleared', false, ROWANBERRY),
    flag(panel, 'Organic Vanilla Powder', 'cleared', false, VANILLA),
    flag(panel, 'Calcium Lactate', 'cleared', false, 'Calcium lactate is a salt of calcium. It is included as a source of calcium.'),
    flag(panel, 'Beta Carotene (color)', 'limited', true, 'Beta-carotene is a plant pigment. It is included for its plant compounds. Beta-carotene is graded Limited when it is used as a carotenoid part rather than as the vitamin A source (EFSA and FDA distinguish refined carotenoid fractions from whole-food sources).'),
  ];
}

function row(id: string, count: string, barcode: string): RatingRecord {
  const panel = `Cymbiotika D3 + K2 + CoQ10, ${count}. Brand site https://cymbiotika.com/en-us.`;
  return {
    id,
    productName: `D3 + K2 + CoQ10, ${count}`,
    brand: 'Cymbiotika',
    category: 'Vitamins',
    formulaId: id,
    form: 'liquid',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Cymbiotika'],
    barcode,
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: ingredients(panel),
    verdict: 'caution',
    sourcesGeneral: [
      `t398u. Cymbiotika brand site https://cymbiotika.com/en-us is the panel. D3 + K2 + CoQ10. Serving size 5 mL. ${count}. iHerb barcode ${barcode}. The check digit passes. The same panel is used for the other count. Graded ingredients: Vitamin D (as Cholecalciferol from Lichen), Vitamin K2 (MK-4 and MK-7), Phosphatidylcholine (from Sunflower Lecithin), Coenzyme Q10, Glycerin, Water, Organic Cassava Syrup, Pectin, Organic Vanilla Extract, Malic Acid, Organic Tangerine Oil, D-Alpha-Tocopherol, Sodium Alginate, Rowanberry Fruit Extract, Organic Vanilla Powder, Calcium Lactate, Beta Carotene (color). Organic Cassava Syrup takes Cassava Syrup. Organic Vanilla Extract and Organic Vanilla Powder take Vanilla Extract and Vanilla Powder. Organic Tangerine Oil takes Tangerine Oil. Phosphatidylcholine (from Sunflower Lecithin) takes Phosphatidylcholine. Counted Limited tokens: Organic Cassava Syrup; Beta Carotene (color). That is two, so no 3+ note is stored.`,
    ],
  };
}

export const BATCH499_KYR6E_T398U: RatingRecord[] = [
  row('cymbiotika-b499-d3-k2-coq10-28', '28 Count', '850025187527'),
  row('cymbiotika-b499-d3-k2-coq10-12', '12 Count', '850025187565'),
];

if (BATCH499_KYR6E_T398U.length !== 2) throw new Error('t398u count');
for (const item of BATCH499_KYR6E_T398U) {
  if (item.verdict !== 'caution' || item.honestNote) throw new Error(`t398u grade ${item.id}`);
  const limited = item.inactiveIngredients.filter((ingredient) => ingredient.riskLevel === 'limited' && !ingredient.stackCountExempt);
  if (limited.length !== 2) throw new Error(`t398u limited ${item.id}`);
  if (item.inactiveIngredients.some((ingredient) => ingredient.riskLevel === 'high')) throw new Error(`t398u avoid ${item.id}`);
  const rollup = computeVerdictFromInactiveIngredients(item.inactiveIngredients);
  if (rollup.verdict !== 'caution' || rollup.cause !== 'limited_1_2') throw new Error(`t398u rollup ${item.id} ${rollup.verdict}`);
}
const barcodes = BATCH499_KYR6E_T398U.map((item) => item.barcode);
if (barcodes[0] !== '850025187527' || barcodes[1] !== '850025187565') throw new Error('t398u upc');
