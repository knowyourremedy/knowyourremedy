// DRAFT / not verified / batch 305 KYR6-d (t111u).
// Founder verification is the source. No brand is closed.
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

const S = {
  olive: 'Methodology §5 Cleared (olive oil).',
  lav: 'Methodology §5 Cleared (Organic Lavender Oil — t108u). Does not count toward the t137u stack.',
  mullein: 'Methodology §5 Cleared (Organic Mullein Extract — t111u). Does not count toward the t137u stack.',
  tea: 'Methodology §5 Cleared (Organic Tea Tree Oil — t108u). Does not count toward the t137u stack.',
  echinacea: 'Methodology §5 Cleared (echinacea extract).',
  garlic: 'Methodology §5 Cleared (Organic Garlic Oil — t108u). Does not count toward the t137u stack.',
  hemp: 'Methodology §5 Cleared (Premium Hemp Extract — t111u). Does not count toward the t137u stack.',
  ashwagandha: 'Methodology §5 Cleared (Ashwagandha — t111u). Does not count toward the t137u stack.',
  passion: 'Methodology §5 Cleared (Passionflower — t111u). Does not count toward the t137u stack.',
} as const;

type MethKey = keyof typeof S;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${S[meth]}` };
}

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

const PW =
  'Founder-confirmed Wally\'s panel. 0.5 fl oz. Each ingredient carries a star. The footnote is Certified Organic Ingredients. t111u founder verification.';
const PG =
  'Founder-confirmed The Good Patch Be Calm panel. 4 count. t111u founder verification.';

const NOTE_W =
  'Counted Limited tokens: none. The star on each ingredient means certified organic. Lavender Oil*, Tea Tree Oil*, and Garlic Oil* are the Cleared locks Organic Lavender Oil, Organic Tea Tree Oil, and Organic Garlic Oil. Mullein Extract* is the Cleared lock Organic Mullein Extract. Olive Oil and Echinacea Extract keep their existing specific whys. None of these stack. This row is the 0.5 fl oz. Hannaford and Meijer print this same line for that size. No UPC was printed. Missing UPC.';
const NOTE_G =
  'Counted Limited tokens: none. Premium Hemp Extract, Ashwagandha, and Passionflower are Cleared and do not stack. Other store lines also print Adhesive, Menthol Lactate, and industrial Hemp Extract. Adhesive is still unlocked and is not on this founder panel. Menthol Lactate and industrial Hemp Extract are already Cleared and are not on this founder panel.';

export const BATCH305_KYR6D_T111U: RatingRecord[] = [
  finish({
    id: 'wallys-b305-ear-oil-05',
    productName: "Wally's Natural Organic Ear Oil (0.5 fl oz)",
    brand: "Wally's Natural",
    category: 'Eye & Ear',
    formulaId: 'wallys-b305-ear-oil',
    form: 'drops',
    audience: ADULT,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ["Wally's Natural"],
    barcode: '',
    activeIngredients: [],
    inactiveIngredients: [
      flag(PW, 'Olive Oil', 'cleared', 'olive'),
      flag(PW, 'Organic Lavender Oil', 'cleared', 'lav'),
      flag(PW, 'Organic Mullein Extract', 'cleared', 'mullein'),
      flag(PW, 'Organic Tea Tree Oil', 'cleared', 'tea'),
      flag(PW, 'Echinacea Extract', 'cleared', 'echinacea'),
      flag(PW, 'Organic Garlic Oil', 'cleared', 'garlic'),
    ],
    verdict: 'clean',
    honestNote: NOTE_W,
    sourcesGeneral: [
      't111u. Founder verification is the source. The panel is Olive Oil*, Lavender Oil*, Mullein Extract*, Tea Tree Oil*, Echinacea Extract*, Garlic Oil*. The footnote is *Certified Organic Ingredients. The 0.5 fl oz is the size Hannaford and Meijer print with this line. No UPC was printed. Missing UPC. No code was invented. The Walmart 0.5 fl oz line that prints oils instead of extracts was not used.',
    ],
  }),
  finish({
    id: 'goodpatch-b305-be-calm-4',
    productName: 'The Good Patch Be Calm (4 patches)',
    brand: 'The Good Patch',
    category: 'Herbs',
    formulaId: 'goodpatch-b305-be-calm-4',
    form: 'patch',
    audience: ADULT,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['The Good Patch'],
    barcode: '850031068131',
    activeIngredients: [],
    inactiveIngredients: [
      flag(PG, 'Premium Hemp Extract', 'cleared', 'hemp'),
      flag(PG, 'Ashwagandha', 'cleared', 'ashwagandha'),
      flag(PG, 'Passionflower', 'cleared', 'passion'),
    ],
    verdict: 'clean',
    honestNote: NOTE_G,
    sourcesGeneral: [
      't111u. Founder verification is the source. The panel is Premium Hemp Extract, Ashwagandha, Passionflower. UPC 850031068131. The check digit passes. Other store lines also print Adhesive, Menthol Lactate, and industrial Hemp Extract. Adhesive is still unlocked and is not graded on this row.',
    ],
  }),
];

const ROWS = BATCH305_KYR6D_T111U;
if (ROWS.length !== 2) throw new Error(`batch305 count ${ROWS.length}`);
const ids = new Set<string>();
for (const record of ROWS) {
  if (ids.has(record.id)) throw new Error(`batch305 dup ${record.id}`);
  ids.add(record.id);
  if (!record.honestNote || record.honestNote.length < 40) throw new Error(`batch305 note ${record.id}`);
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients);
  if (rollup.verdict !== 'clean' || record.verdict !== 'clean') {
    throw new Error(`batch305 verdict ${record.id} ${rollup.verdict} ${rollup.cause}`);
  }
  const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (counted.length !== 0) throw new Error(`batch305 stack ${record.id}`);
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`batch305 blank ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`batch305 generic ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
if (ROWS[1].barcode !== '850031068131') throw new Error('batch305 upc');
