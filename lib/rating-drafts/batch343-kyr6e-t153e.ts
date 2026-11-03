// DRAFT / not verified / batch 343 KYR6-e (t153e).
// Nature's Answer Gentle Iron 8 oz, opened by the Postassium Sorbate lock.
// The Sprouts section is not edited. Nature's Answer stays open.

import type { ActiveIngredient, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;

const GLYC = 'Methodology §5 Cleared (glycerin / vegetable glycerin).';
const WATER = 'Methodology §5 Cleared (water / purified water).';
const CITRIC = 'Methodology §5 Cleared (citric acid).';
const SORBATE = 'Methodology §5 Caution (t45u). Postassium Sorbate (as preservative) is the misspelled printed form of potassium sorbate. Zero-point Caution cap. Does not count toward the t137u stack.';
const BERRY = 'Methodology §5 Caution (Natural Mixed Berry Flavor — t98u). Does not count toward the t137u stack.';
const XANTHAN = 'Methodology §5 Cleared (xanthan gum — t98u). Does not count toward the t137u stack.';

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
  barcode: string;
  ings: Ing[];
  actives: ActiveIngredient[];
  source: string;
}): RatingRecord {
  return finish({
    id: args.id,
    productName: args.productName,
    brand: "Nature's Answer",
    category: 'Vitamins',
    formulaId: args.id,
    form: args.form,
    audience: args.audience,
    minAge: args.minAge,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ["Nature's Answer"],
    barcode: args.barcode,
    activeIngredients: args.actives,
    inactiveIngredients: args.ings.map(([name, riskLevel, whySource]) => ({
      name,
      riskLevel,
      source: `Nature's Answer brand facts image. t153e. ${whySource}`,
    })) as IngredientFlag[],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [args.source],
  });
}

export const BATCH343_KYR6E_T153E: RatingRecord[] = [
  row({
    id: 'naturesanswer-b343-gentle-iron-8',
    productName: "Nature's Answer Gentle Iron Alcohol Free (8 oz)",
    form: 'liquid',
    audience: 'adult',
    minAge: 18,
    barcode: '083000269257',
    ings: [
      ['Vegetable Glycerin', 'cleared', GLYC],
      ['Purified Water', 'cleared', WATER],
      ['Citric ACid', 'cleared', CITRIC],
      ['Postassium Sorbate (as preservative)', 'moderate', SORBATE],
      ['Natural Mixed Berry Flavor', 'moderate', BERRY],
      ['Xanthan Gum', 'cleared', XANTHAN],
    ],
    actives: [{ name: 'Iron (as Ferrous Bisglycinate Chelate)', strength: '18 mg' }],
    source:
      't153e. Brand page https://naturesanswer.com/products/gentle-iron-liquid-8oz lists the 8 oz at $18.99 and in stock. The carousel facts image prints Serving Size 1 Tablespoon (15 mL), Servings Per Container 16. Other Ingredients: Vegetable Glycerin, Purified Water, Citric ACid, Postassium Sorbate (as preservative), Natural Mixed Berry Flavor, Xanthan Gum. Citric ACid is the printed spelling. The NO line under the panel is a free-from list and is not graded. Counted Limited tokens: none. Natural Mixed Berry Flavor is Caution and does not stack. The facts image does not print a barcode. The brand variant barcode field lists 083000269257. The check digit passes. No store page opened a second code. Not Nature\'s Bounty Gentle Iron.',
  }),
];

function upcCheck(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  const sum = [...code.slice(0, 11)].reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

const ROWS = BATCH343_KYR6E_T153E;
if (ROWS.length !== 1) throw new Error(`batch343 count ${ROWS.length}`);
const record = ROWS[0];
if (record.id !== 'naturesanswer-b343-gentle-iron-8') throw new Error(record.id);
if (record.verdict !== 'caution') throw new Error(record.verdict);
if (record.barcode !== '083000269257' || !upcCheck(record.barcode)) throw new Error(record.barcode);
if (record.honestNote) throw new Error(record.honestNote);
const mapped = applyT54uRow(record);
const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i)).map((i) => i.name);
if (counted.length !== 0) throw new Error(counted.join('|'));
for (const ingredient of mapped.inactiveIngredients) {
  const why = plainIngredientWhy(ingredient);
  if (!why || !why.trim()) throw new Error(`blank ${ingredient.name}`);
  if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
    throw new Error(`generic ${ingredient.name}: ${why}`);
  }
  if (ingredient.name === 'Postassium Sorbate (as preservative)') {
    if (ingredient.riskLevel !== 'moderate') throw new Error(ingredient.riskLevel);
    if (!/misspelled printed form of potassium sorbate/i.test(why)) throw new Error(why);
    if (!/Caution \(t45u\)/i.test(why)) throw new Error(why);
  }
}
