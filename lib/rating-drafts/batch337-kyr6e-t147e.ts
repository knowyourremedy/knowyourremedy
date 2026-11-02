// DRAFT / not verified / batch 337 KYR6-e (t147e).
// Two Zand singles whose brand facts images are fully locked.
// The Sprouts section is not edited.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;

const CAPSULE = 'Methodology §5 Cleared (vegetable cellulose capsule).';
const RICE_FLOUR = 'Methodology §5 Caution (rice flour). Does not count toward the t137u stack.';
const CELLULOSE = 'Methodology §5 Cleared (cellulose).';
const MAG = 'Methodology §5 Cleared (magnesium stearate).';
const SILICA = 'Methodology §5 Caution (silica / silicon dioxide — 0-pt Caution cap). Does not count toward the t137u stack.';
const MALTO = 'Methodology §5 Limited (maltodextrin). Counts toward the t137u stack.';
const GDL = 'Methodology §5 Cleared (glucono delta lactone — t51u). Does not count toward the t137u stack.';

type Ing = readonly [string, RiskLevel, string];

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

function row(
  id: string,
  productName: string,
  minAge: number,
  panel: string,
  ings: Ing[],
  actives: { name: string; strength?: string }[],
  source: string,
): RatingRecord {
  return finish({
    id,
    productName,
    brand: 'Zand',
    category: 'Herbs',
    formulaId: id,
    form: 'capsule',
    audience: ADULT,
    minAge,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Zand'],
    barcode: '',
    activeIngredients: actives,
    inactiveIngredients: ings.map(([name, riskLevel, whySource]) => ({
      name,
      riskLevel,
      source: `${panel}; ${whySource}`,
    })) as IngredientFlag[],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [source],
  });
}

export const BATCH337_KYR6E_T147E: RatingRecord[] = [
  row(
    'zand-b337-bee-pollen-150',
    'Zand Bee Pollen (150 capsules)',
    1,
    'Zand Bee Pollen facts image. 150 capsules.',
    [['Vegetable Cellulose (Capsule)', 'cleared', CAPSULE]],
    [{ name: 'Bee Pollen', strength: '500 mg' }],
    't147e. Brand page https://zand.com/products/bee-pollen is in stock. The facts image prints Serving Size 1 Capsule and Other Ingredients: Vegetable Cellulose (Capsule). Bee Pollen 500 mg is the active and is not graded. The variant SKU 731111101446 matches the facts-image filename and the check digit passes. It was not printed as a UPC on the facts image, so it was not attached. Missing UPC. No code was invented.',
  ),
  row(
    'zand-b337-insure-herbal-120',
    'Zand Insure Herbal Capsules (120 capsules)',
    12,
    'Zand Insure Herbal Capsules bottle back. 120 capsules.',
    [
      ['Rice Flour', 'moderate', RICE_FLOUR],
      ['Vegetable Cellulose Capsule', 'cleared', CAPSULE],
      ['Cellulose', 'cleared', CELLULOSE],
      ['Magnesium Stearate', 'cleared', MAG],
      ['Silica', 'moderate', SILICA],
      ['Maltodextrin', 'limited', MALTO],
      ['Glucono Delta Lactone', 'cleared', GDL],
    ],
    [
      { name: 'Vitamin C (from calcium ascorbate)', strength: '120 mg' },
      { name: 'Zinc (from zinc carbonate)', strength: '2 mg' },
      { name: 'Echinacea angustifolia (root extract)', strength: '40 mg' },
      { name: 'Echinacea purpurea (aerial extract)', strength: '40 mg' },
      { name: 'Echinacea angustifolia (root)', strength: '20 mg' },
      { name: 'Echinacea purpurea (aerial)', strength: '20 mg' },
      { name: 'Proprietary Blend', strength: '264 mg' },
    ],
    't147e. Brand page https://zand.com/products/insure-herbal-caps is in stock. The bottle back prints 120 capsules, Serving Size 2 VegCaps, Servings Per Container 60. Other Ingredients: Rice Flour, Vegetable Cellulose Capsule, Cellulose, Magnesium Stearate, Silica, Maltodextrin, and Glucono Delta Lactone. The vitamin, mineral, echinacea, and proprietary blend lines are actives and are not graded. Counted Limited token: Maltodextrin. Rice flour is Caution and does not stack. Silica is the 0-point Caution cap and does not stack. Directions say adults and children over 12. The variant SKU 041954010714 matches the bottle-image filename and the check digit passes. It was not printed as a UPC on the panel that was read, so it was not attached. Missing UPC. No code was invented.',
  ),
];

const ROWS = BATCH337_KYR6E_T147E;
if (ROWS.length !== 2) throw new Error(`batch337 count ${ROWS.length}`);
const expect: Record<string, { verdict: RatingRecord['verdict']; limited: number }> = {
  'zand-b337-bee-pollen-150': { verdict: 'clean', limited: 0 },
  'zand-b337-insure-herbal-120': { verdict: 'caution', limited: 1 },
};
for (const record of ROWS) {
  const want = expect[record.id];
  if (!want) throw new Error(record.id);
  if (record.verdict !== want.verdict) throw new Error(`${record.id} ${record.verdict}`);
  if (record.barcode) throw new Error(`${record.id} barcode`);
  if (record.honestNote) throw new Error(`${record.id} note ${record.honestNote}`);
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (counted.length !== want.limited) {
    throw new Error(`${record.id} stack ${counted.map((i) => i.name).join(' | ')}`);
  }
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`${record.id} blank ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`${record.id} generic ${ingredient.name}: ${why}`);
    }
  }
}
