// DRAFT / not verified / batch 331 KYR6-e (t137e).
// Wooden Spoon Herbs brand facts images are the single source.
// The Sprouts section is not edited. No brand is closed.
// Ids: woodenspoon-b331-

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

function flag(panel: string, name: string, riskLevel: RiskLevel, whySource: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${whySource}` };
}

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

const CELL =
  'Methodology §5 Cleared (vegetarian capsule shell — t130u). Does not count toward the t137u stack.';
const GLYC =
  'Methodology §5 Cleared (Glycerin / vegetable glycerin / organic glycerin).';
const WATER = 'Methodology §5 Cleared (deionized water).';

export const BATCH331_KYR6E_T137E: RatingRecord[] = [
  finish({
    id: 'woodenspoon-b331-stress-savior-90',
    productName: 'Wooden Spoon Herbs Stress Savior (90 capsules)',
    brand: 'Wooden Spoon Herbs',
    category: 'Herbs',
    formulaId: 'woodenspoon-b331-stress-savior-90',
    form: 'capsule',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Wooden Spoon Herbs'],
    barcode: '',
    activeIngredients: [
      { name: 'Organic Ashwagandha root' },
      { name: 'Organic Eleuthero root' },
      { name: 'Organic Cordyceps mycelium' },
      { name: 'Organic Schisandra berry' },
      { name: 'Rhodiola root extract (3% rosavins)' },
      { name: 'American Ginseng root' },
      { name: 'Red Asian Ginseng root' },
    ],
    inactiveIngredients: [
      flag(
        'Wooden Spoon Herbs brand facts image. Stress Savior, 90 capsules.',
        'Modified vegetable cellulose (vegetarian capsule)',
        'cleared',
        CELL,
      ),
    ],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [
      't137e. Brand page https://woodenspoonherbs.com/products/stress-savior is in stock at $34. SKU cap-stress-90. The facts image prints Other ingredients: Modified vegetable cellulose (vegetarian capsule). Serving size 1 capsule, 90 servings. The proprietary herbal blend is the active and is not graded. No UPC was printed. Missing UPC. Target, Walmart, iHerb, and Vitacost searches did not list this pack. Amazon US was opened and blocked before a product page: Continued access by an unauthorized AI agent violates Amazon\'s Conditions of Use, to which our customers have agreed. Google was opened. The AI overview named the herbal blend and did not show a photographed other-ingredients line. The brand facts image is the row. No code was invented.',
    ],
  }),
  finish({
    id: 'woodenspoon-b331-elderberry-lung',
    productName: 'Wooden Spoon Herbs Elderberry Lung Support (about 23 servings)',
    brand: 'Wooden Spoon Herbs',
    category: 'Herbs',
    formulaId: 'woodenspoon-b331-elderberry-lung',
    form: 'liquid',
    audience: ADULT,
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Wooden Spoon Herbs'],
    barcode: '',
    activeIngredients: [
      { name: 'Organic Mullein leaf' },
      { name: 'Organic Marshmallow root' },
      { name: 'Organic European Elderberry fruit' },
      { name: 'Organic Elderflower' },
      { name: 'Organic Rosehip fruit' },
    ],
    inactiveIngredients: [
      flag(
        'Wooden Spoon Herbs brand facts image. Elderberry Lung Support.',
        'Organic Vegetable Glycerin',
        'cleared',
        GLYC,
      ),
      flag(
        'Wooden Spoon Herbs brand facts image. Elderberry Lung Support.',
        'Deionized Water',
        'cleared',
        WATER,
      ),
    ],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [
      't137e. Brand page https://woodenspoonherbs.com/products/elderberry-lung-support is in stock at $34. SKU tinc-elder-8. The facts image prints Other ingredients: Organic Vegetable Glycerin, Deionized Water. Serving size 10 mL (2 teaspoons), about 23 servings. The proprietary herbal blend is the active and is not graded. No UPC was printed. Missing UPC. Target, Walmart, and Vitacost searches did not list this pack. iHerb stopped on a security check. Amazon US was already blocked this pass: Continued access by an unauthorized AI agent violates Amazon\'s Conditions of Use, to which our customers have agreed. Google was opened. The AI overview text said Organic Vegetable glycerin, Organic Deionized water. That is not a photographed panel, and it is not the brand line, so it was not graded. The brand facts image is the row. No code was invented.',
    ],
  }),
];

const ROWS = BATCH331_KYR6E_T137E;
if (ROWS.length !== 2) throw new Error(`batch331 count ${ROWS.length}`);
const ids = new Set<string>();
for (const record of ROWS) {
  if (ids.has(record.id)) throw new Error(`batch331 dup ${record.id}`);
  ids.add(record.id);
  if (!record.id.startsWith('woodenspoon-b331-')) throw new Error(`batch331 id ${record.id}`);
  if (record.verdict !== 'clean') throw new Error(`batch331 verdict ${record.id} ${record.verdict}`);
  if (record.barcode) throw new Error(`batch331 barcode ${record.id}`);
  if (record.honestNote) throw new Error(`batch331 note ${record.id}`);
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (counted.length !== 0) throw new Error(`batch331 stack ${record.id}`);
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`batch331 blank ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`batch331 generic ${record.id} ${ingredient.name}: ${why}`);
    }
    if (!/t130u|Glycerin|water/i.test(why)) {
      throw new Error(`batch331 why ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
