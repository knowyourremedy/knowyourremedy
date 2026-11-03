// DRAFT / not verified / batch 340 KYR6-e (t150e).
// Cherry Echinacea lozenges and Elderberry Zinc gummies.
// The Sprouts section is not edited.

import type { ActiveIngredient, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;

const SYRUP = 'Methodology §5 Cleared (brown rice syrup / tapioca syrup).';
const CITRIC = 'Methodology §5 Cleared (citric acid / sodium citrate).';
const WATER = 'Methodology §5 Cleared (purified water).';
const SUGAR = 'Methodology §5 Cleared (cane sugar).';
const PECTIN = 'Methodology §5 Cleared (pectin).';
const CHERRY = 'Methodology §5 Cleared (Natural Cherry Flavor — t150e / t132u named fruit flavor). Does not count toward the t137u stack.';
const BERRY = 'Methodology §5 Caution (Natural Mixed Berry Flavor — t98u). Does not count toward the t137u stack.';
const COCONUT = 'Methodology §5 Cleared (coconut oil). Not the gummy seed-oil rule.';
const SUN = 'Methodology §5 Avoid (sunflower oil in a gummy).';
const WAX = 'Methodology §5 Cleared (carnauba wax — t133u).';
const COLORS = 'Methodology §5 Limited (Natural Colors unspecified — t150e). Counts toward the t137u stack.';

type Ing = readonly [string, RiskLevel, string];

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

function row(args: {
  id: string;
  productName: string;
  form: string;
  audience: 'adult' | 'kids';
  minAge: number;
  ings: Ing[];
  actives: ActiveIngredient[];
  source: string;
}): RatingRecord {
  return finish({
    id: args.id,
    productName: args.productName,
    brand: 'Zand',
    category: 'Cold & Flu',
    formulaId: args.id,
    form: args.form,
    audience: args.audience,
    minAge: args.minAge,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Zand'],
    barcode: '',
    activeIngredients: args.actives,
    inactiveIngredients: args.ings.map(([name, riskLevel, whySource]) => ({
      name,
      riskLevel,
      source: `Zand brand facts image. t150e. ${whySource}`,
    })) as IngredientFlag[],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [args.source],
  });
}

const NO_UPC = ' The variant SKU matches the facts-image filename and the check digit passes. It was not printed as a UPC on the facts image, and no store page printed it, so it was not attached. Missing UPC. No code was invented.';

export const BATCH340_KYR6E_T150E: RatingRecord[] = [
  row({
    id: 'zand-b340-cherry-echinacea-lozenges-45',
    productName: 'Zand Cherry Echinacea Zinc Lozenges (45 lozenges)',
    form: 'lozenge',
    audience: 'adult',
    minAge: 18,
    ings: [
      ['Brown Rice Syrup', 'cleared', SYRUP],
      ['Citric Acid', 'cleared', CITRIC],
      ['Natural Cherry Flavor', 'cleared', CHERRY],
    ],
    actives: [
      { name: 'Zinc (from Zinc Gluconate)', strength: '5 mg' },
      { name: 'Proprietary Blend', strength: '49 mg' },
    ],
    source: 't150e. Brand page https://zand.com/products/cherry-echinacea-zinc is in stock at $9.79. The facts image prints Serving Size 1 Lozenge (3.8 g), Servings Per Container 45. Other Ingredients: Brown Rice Syrup, Citric Acid, Natural Cherry Flavor. Zinc and the proprietary blend are actives and are not graded. Counted Limited tokens: none.' + NO_UPC,
  }),
  row({
    id: 'zand-b340-elderberry-zinc-gummies-60',
    productName: 'Zand Elderberry Zinc Gummies (60 gummies)',
    form: 'gummy',
    audience: 'kids',
    minAge: 4,
    ings: [
      ['Tapioca Syrup', 'cleared', SYRUP],
      ['Cane Sugar', 'cleared', SUGAR],
      ['Purified Water', 'cleared', WATER],
      ['Pectin', 'cleared', PECTIN],
      ['Natural Mixed Berry Flavor', 'moderate', BERRY],
      ['Citric Acid', 'cleared', CITRIC],
      ['Sodium Citrate', 'cleared', CITRIC],
      ['Coconut Oil', 'cleared', COCONUT],
      ['Sunflower Oil', 'high', SUN],
      ['Carnauba Wax', 'cleared', WAX],
      ['Natural Colors', 'limited', COLORS],
    ],
    actives: [
      { name: 'Vitamin C (Ascorbic Acid)', strength: '90 mg' },
      { name: 'Zinc (Zinc Citrate)', strength: '11 mg' },
      { name: 'European Elderberry (Sambucus nigra) Extract', strength: '125 mg' },
    ],
    source: 't150e. Brand page https://zand.com/products/gummies-elderberry-zinc is in stock at $16.79. The facts image prints Serving Size 2 Gummies, Servings Per Container 30. Adults and children 4 years and older. Other Ingredients: Tapioca Syrup, Cane Sugar, Purified Water, Pectin, Natural Mixed Berry Flavor, Citric Acid, Sodium Citrate, Coconut Oil, Sunflower Oil, Carnauba Wax, Natural Colors. Sunflower oil in the gummy is Avoid. Counted Limited token: Natural Colors. Natural Mixed Berry Flavor is Caution and does not stack. Sodium on the facts table is a nutrient and is not graded.' + NO_UPC,
  }),
];

const ROWS = BATCH340_KYR6E_T150E;
if (ROWS.length !== 2) throw new Error(`batch340 count ${ROWS.length}`);
const expect: Record<string, { verdict: RatingRecord['verdict']; limited: string[] }> = {
  'zand-b340-cherry-echinacea-lozenges-45': { verdict: 'clean', limited: [] },
  'zand-b340-elderberry-zinc-gummies-60': { verdict: 'avoid', limited: ['Natural Colors'] },
};
for (const record of ROWS) {
  const want = expect[record.id];
  if (!want) throw new Error(record.id);
  if (record.verdict !== want.verdict) throw new Error(`${record.id} ${record.verdict}`);
  if (record.barcode) throw new Error(`${record.id} barcode`);
  if (record.honestNote) throw new Error(`${record.id} note ${record.honestNote}`);
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i)).map((i) => i.name);
  if (counted.join('|') !== want.limited.join('|')) throw new Error(`${record.id} stack ${counted.join('|')}`);
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`${record.id} blank ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`${record.id} generic ${ingredient.name}: ${why}`);
    }
  }
}
