// DRAFT / not verified / batch 339 KYR6-e (t149e), revised.
// Rows that used a reverted t149e lock are removed and held.
// Lemon Zinc Lozenges and Immune Fast Sweet Elderberry used none of those locks.
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
const ADULT = 'adult' as const;

const SYRUP = 'Methodology §5 Cleared (brown rice syrup / food syrup).';
const CITRIC = 'Methodology §5 Cleared (citric acid).';
const LEMON_OIL = 'Methodology §5 Cleared (named lemon oil).';
const MENTHOL = 'Methodology §5 Cleared (Menthol — t122e). Does not count toward the t137u stack.';
const XYL = 'Methodology §5 Caution (xylitol — swallowed sugar alcohol). Does not count toward the t137u stack.';
const CELL = 'Methodology §5 Cleared (cellulose).';
const POWDER = 'Methodology §5 Cleared (coconut oil powder). Not the gummy seed-oil rule.';
const STEARIC = 'Methodology §5 Cleared (stearic acid).';
const MALTO = 'Methodology §5 Limited (maltodextrin). Counts toward the t137u stack.';
const FLAVORS = 'Methodology §5 Limited (Natural Flavors — t54u). Counts toward the t137u stack.';
const SILICA = 'Methodology §5 Caution (silica / silicon dioxide — 0-pt Caution cap). Does not count toward the t137u stack.';
const STEVIA = 'Methodology §5 Limited (stevia leaf extract — t159u). Counts toward the t137u stack.';

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
    audience: ADULT,
    minAge: args.minAge,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Zand'],
    barcode: '',
    activeIngredients: args.actives,
    inactiveIngredients: args.ings.map(([name, riskLevel, whySource]) => ({
      name,
      riskLevel,
      source: `Zand brand facts image. t149e. ${whySource}`,
    })) as IngredientFlag[],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [args.source],
  });
}

const NO_UPC = ' The variant SKU matches the facts-image filename and the check digit passes. It was not printed as a UPC on the facts image, and no store page printed it, so it was not attached. Missing UPC. No code was invented.';

export const BATCH339_KYR6E_T149E: RatingRecord[] = [
  row({
    id: 'zand-b339-lemon-zinc-lozenges-45',
    productName: 'Zand Lemon Zinc Lozenges (45 lozenges)',
    form: 'lozenge',
    minAge: 18,
    ings: [
      ['Brown Rice Syrup', 'cleared', SYRUP],
      ['Lemon Oil', 'cleared', LEMON_OIL],
      ['Citric Acid', 'cleared', CITRIC],
      ['Menthol', 'cleared', MENTHOL],
    ],
    actives: [
      { name: 'Zinc (from Zinc Gluconate)', strength: '5 mg' },
      { name: 'Proprietary Blend', strength: '24 mg' },
    ],
    source: 't149e. Brand page https://zand.com/products/herbalozenge-lemon-zinc is in stock at $9.79. The facts image prints Serving Size 1 Lozenge (3.8 g), Servings Per Container 45. Other Ingredients: Brown Rice Syrup, Lemon Oil, Citric Acid, Menthol. Zinc and the proprietary blend are actives and are not graded. Counted Limited tokens: none.' + NO_UPC,
  }),
  row({
    id: 'zand-b339-immune-fast-elderberry-30',
    productName: 'Zand Immune Fast Sweet Elderberry (30 chewables)',
    form: 'tablet',
    minAge: 18,
    ings: [
      ['Xylitol', 'moderate', XYL],
      ['Cellulose', 'cleared', CELL],
      ['Coconut Oil Powder', 'cleared', POWDER],
      ['Stearic Acid', 'cleared', STEARIC],
      ['Maltodextrin', 'limited', MALTO],
      ['Natural Flavors', 'limited', FLAVORS],
      ['Silica', 'moderate', SILICA],
      ['Stevia (leaf extract)', 'limited', STEVIA],
      ['Citric Acid', 'cleared', CITRIC],
    ],
    actives: [
      { name: 'Vitamin C (as ascorbic acid and sodium ascorbate)', strength: '1,000 mg' },
      { name: 'Zinc (from zinc citrate)', strength: '11 mg' },
      { name: 'EpiCor Dried Fermentate', strength: '500 mg' },
      { name: 'Black Elderberry (Sambucus nigra) Berry Extract 4:1', strength: '200 mg' },
    ],
    source: 't149e. Brand page https://zand.com/products/immune-fast-sweet-elderberry is in stock at $17.89. The back image prints Serving Size 3 Chewable Tablets, Servings Per Container 10. Other Ingredients: Xylitol, Cellulose, Coconut Oil Powder, Stearic Acid, Maltodextrin, Natural Flavors, Silica, Stevia (leaf extract), Citric Acid. Counted Limited tokens: Maltodextrin, Natural Flavors, and Stevia (leaf extract). Silica does not stack. Xylitol is Caution and does not stack. The sugar-alcohol line on the nutrition table is the xylitol disclosure and is not graded again.' + NO_UPC,
  }),
];

const ROWS = BATCH339_KYR6E_T149E;
if (ROWS.length !== 2) throw new Error(`batch339 count ${ROWS.length}`);
const expect: Record<string, { verdict: RatingRecord['verdict']; limited: number; note: boolean }> = {
  'zand-b339-lemon-zinc-lozenges-45': { verdict: 'clean', limited: 0, note: false },
  'zand-b339-immune-fast-elderberry-30': { verdict: 'avoid', limited: 3, note: true },
};
for (const record of ROWS) {
  const want = expect[record.id];
  if (!want) throw new Error(record.id);
  if (record.verdict !== want.verdict) throw new Error(`${record.id} ${record.verdict}`);
  if (record.barcode) throw new Error(`${record.id} barcode`);
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (counted.length !== want.limited) throw new Error(`${record.id} stack ${counted.map((i) => i.name).join('|')}`);
  if (want.note) {
    if (!record.honestNote || !/t137u/.test(record.honestNote)) throw new Error(`${record.id} note ${record.honestNote}`);
    for (const name of ['Maltodextrin', 'Natural Flavors', 'Stevia (leaf extract)']) {
      if (!record.honestNote.includes(name)) throw new Error(`${record.id} missing ${name}`);
    }
  } else if (record.honestNote) {
    throw new Error(`${record.id} unexpected note ${record.honestNote}`);
  }
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`${record.id} blank ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`${record.id} generic ${ingredient.name}: ${why}`);
    }
  }
}
