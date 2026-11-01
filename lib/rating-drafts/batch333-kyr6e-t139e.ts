// DRAFT / not verified / batch 333 KYR6-e (t139e).
// Current brand backs. Larger counts share that formula.
// The 4-count rows stay on MAIN. The Sprouts section is not edited.

import type { ActiveIngredient, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const T139 =
  'Methodology §5 Cleared (founder lock t139e). Does not count toward the t137u stack.';

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
  category: string;
  price: string;
  handle: string;
  actives: ActiveIngredient[];
  inactive: string;
  line: string;
}): RatingRecord {
  const inactive: IngredientFlag = {
    name: args.inactive,
    riskLevel: 'cleared' as RiskLevel,
    source: `The Good Patch brand back. ${args.productName}. Ingredients: ${args.line}; ${T139}`,
  };
  return finish({
    id: args.id,
    productName: args.productName,
    brand: 'The Good Patch',
    category: args.category,
    formulaId: args.id,
    form: 'patch',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['The Good Patch'],
    barcode: '',
    activeIngredients: args.actives,
    inactiveIngredients: [inactive],
    verdict: 'clean',
    honestNote: '',
    sourcesGeneral: [
      `t139e. Brand page https://thegoodpatch.com/products/${args.handle} lists this count in stock at $${args.price}. The back image that opened is the 4-patch pouch and prints Ingredients: ${args.line}. The named ingredients are actives and are not graded. This count is the same formula. The 4-count single is already a MAIN row, so the UPC on that pouch was not copied here. No UPC was printed for this count. Missing UPC. No code was invented.`,
    ],
  });
}

const THINK_LINE =
  "Caffeine, Yerba Mate Leaf Extract (Ilex paraguariensis), Bacopa monnieri Extract, Lion's Mane Extract (Hericium erinaceum), Adhesive Crafted with 10 mg caffeine per patch";
const THINK_ACTIVES: ActiveIngredient[] = [
  { name: 'Caffeine' },
  { name: 'Yerba Mate Leaf Extract (Ilex paraguariensis)' },
  { name: 'Bacopa monnieri Extract' },
  { name: "Lion's Mane Extract (Hericium erinaceum)" },
];
const DREAM_LINE =
  'Melatonin, Hops (Humulus lupulus), Valerian Root (Valeriana officianalis), Black Pepper Extract (Piper nigrum), Adhesive Crafted with 10 mg melatonin per patch';
const DREAM_ACTIVES: ActiveIngredient[] = [
  { name: 'Melatonin' },
  { name: 'Hops (Humulus lupulus)' },
  { name: 'Valerian Root (Valeriana officianalis)' },
  { name: 'Black Pepper Extract (Piper nigrum)' },
];

const SIZES = [
  [16, '44'],
  [28, '84'],
  [40, '90'],
] as const;

export const BATCH333_KYR6E_T139E: RatingRecord[] = [
  ...SIZES.map(([count, price]) =>
    row({
      id: `goodpatch-b333-think-${count}`,
      productName: `The Good Patch Think (${count} patches)`,
      category: 'Herbs',
      price,
      handle: 'think',
      actives: THINK_ACTIVES,
      inactive: 'Adhesive Crafted with 10 mg caffeine per patch',
      line: THINK_LINE,
    }),
  ),
  ...SIZES.map(([count, price]) =>
    row({
      id: `goodpatch-b333-dream-${count}`,
      productName: `The Good Patch Dream (${count} patches)`,
      category: 'Sleep',
      price,
      handle: 'dream',
      actives: DREAM_ACTIVES,
      inactive: 'Adhesive Crafted with 10 mg melatonin per patch',
      line: DREAM_LINE,
    }),
  ),
];

const ROWS = BATCH333_KYR6E_T139E;
if (ROWS.length !== 6) throw new Error(`batch333 count ${ROWS.length}`);
const ids = new Set<string>();
for (const record of ROWS) {
  if (ids.has(record.id)) throw new Error(`batch333 dup ${record.id}`);
  ids.add(record.id);
  if (!record.id.startsWith('goodpatch-b333-')) throw new Error(`batch333 id ${record.id}`);
  if (record.verdict !== 'clean') throw new Error(`batch333 verdict ${record.id} ${record.verdict}`);
  if (record.barcode) throw new Error(`batch333 barcode ${record.id}`);
  if (record.honestNote) throw new Error(`batch333 note ${record.id}`);
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (counted.length !== 0) throw new Error(`batch333 stack ${record.id}`);
  if (mapped.inactiveIngredients.length !== 1) throw new Error(`batch333 inactive ${record.id}`);
  const why = plainIngredientWhy(mapped.inactiveIngredients[0]);
  if (!why || !/t139e/.test(why) || /That is why it is Usable|is on the Cleared list/i.test(why)) {
    throw new Error(`batch333 why ${record.id}: ${why}`);
  }
}
