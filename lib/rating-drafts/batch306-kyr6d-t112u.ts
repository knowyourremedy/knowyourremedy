// DRAFT / not verified / batch 306 KYR6-d (t112u).
// Walmart and Target agree. No UPC was printed.
// No brand is closed. The Sprouts section is not edited.

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

const PANEL =
  'Target and Walmart. The Good Patch Dream, 4 patches. Other ingredient: Adhesive. t112u two US sources.';

export const BATCH306_KYR6D_T112U: RatingRecord[] = [
  (() => {
    const record: RatingRecord = {
      id: 'goodpatch-b306-dream-4',
      productName: 'The Good Patch Dream (4 patches)',
      brand: 'The Good Patch',
      category: 'Sleep',
      formulaId: 'goodpatch-b306-dream-4',
      form: 'patch',
      audience: ADULT,
      recordStatus: UNVERIFIED,
      productType: 'Supplement',
      retailers: ['Target', 'Walmart'],
      barcode: '',
      activeIngredients: [
        { name: 'Melatonin', strength: '10 mg' },
        { name: 'Hops (Humulus lupulus)' },
        { name: 'Valerian Root (Valeriana officinalis)' },
        { name: 'Black Pepper Extract (Piper nigrum)' },
      ],
      inactiveIngredients: [
        {
          name: 'Adhesive',
          riskLevel: 'cleared' as RiskLevel,
          source:
            PANEL +
            '; Methodology §5 Cleared (Adhesive — t112u). Does not count toward the t137u stack.',
        },
      ],
      verdict: 'clean',
      honestNote:
        'Counted Limited tokens: none. Adhesive is Cleared and does not stack. Melatonin, hops, valerian root, and black pepper extract are actives and are not graded. Target prints Adhesive as the other ingredient. Walmart prints the same four actives and Adhesive in one line. Walmart capitalizes Officinalis and Lupulus. That is the same wording. No UPC was printed. Missing UPC.',
      sourcesGeneral: [
        't112u. Two US sources. Target https://www.target.com/p/the-good-patch-dream-plant-powered-patches-4ct/-/A-80138243 prints Melatonin, Hops (Humulus lupulus), Valerian Root (Valeriana officinalis), Black Pepper Extract (Piper nigrum). Other Ingredients: Adhesive. Walmart https://www.walmart.com/ip/The-Good-Patch-Dream-4-Patches/926023078 is in stock for shipping and prints 10 mg Melatonin, Hops (Humulus Lupulus), Valerian Root (Valeriana Officinalis), Black Pepper Extract (Piper Nigrum), Adhesive. No UPC was printed on either page. Missing UPC. No code was invented.',
      ],
    };
    const mapped = applyT54uRow(record);
    const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients);
    const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
    let honestNote = record.honestNote ?? '';
    if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
    return { ...mapped, verdict: rollup.verdict, honestNote };
  })(),
];

const ROWS = BATCH306_KYR6D_T112U;
if (ROWS.length !== 1) throw new Error(`batch306 count ${ROWS.length}`);
const record = ROWS[0];
if (record.verdict !== 'clean') throw new Error(`batch306 verdict ${record.verdict}`);
if (!record.honestNote || record.honestNote.length < 40) throw new Error('batch306 note');
const mapped = applyT54uRow(record);
const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
if (counted.length !== 0) throw new Error('batch306 stack');
for (const ingredient of mapped.inactiveIngredients) {
  const why = plainIngredientWhy(ingredient);
  if (!why || !why.trim()) throw new Error(`batch306 blank ${ingredient.name}`);
  if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
    throw new Error(`batch306 generic ${ingredient.name}: ${why}`);
  }
}
