// DRAFT / not verified / batch 307 KYR6-d (t113u).
// Founder verification is the source. The named ingredients are actives.
// The graded inactive is Adhesive. No UPC was printed.
// No brand is closed. The Sprouts section is not edited.

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

const ADHESIVE =
  'Methodology §5 Cleared (Adhesive — t112u). Does not count toward the t137u stack.';

function adhesive(panel: string): IngredientFlag {
  return { name: 'Adhesive', riskLevel: 'cleared' as RiskLevel, source: `${panel}; ${ADHESIVE}` };
}

function row(
  id: string,
  productName: string,
  category: string,
  actives: ActiveIngredient[],
  panel: string,
  honestNote: string,
  source: string,
): RatingRecord {
  const record: RatingRecord = {
    id,
    productName,
    brand: 'The Good Patch',
    category,
    formulaId: id,
    form: 'patch',
    audience: ADULT,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['The Good Patch'],
    barcode: '',
    activeIngredients: actives,
    inactiveIngredients: [adhesive(panel)],
    verdict: 'clean',
    honestNote,
    sourcesGeneral: [source],
  };
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let note = record.honestNote ?? '';
  if (stackNote && !note.includes(stackNote)) note = `${stackNote} ${note}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: note };
}

const BASE =
  'The panel is founder-confirmed. The named ingredients are actives and are not graded. The other ingredient is Adhesive. Adhesive is Cleared and does not stack. Counted Limited tokens: none. No UPC was printed. Missing UPC.';

export const BATCH307_KYR6D_T113U: RatingRecord[] = [
  row(
    'goodpatch-b307-relax-4',
    'The Good Patch Relax (4 patches)',
    'Herbs',
    [{ name: 'Ashwagandha' }, { name: 'Passionflower' }],
    'Founder-confirmed Relax panel. Actives Ashwagandha and Passionflower. Other ingredient Adhesive. t113u founder verification.',
    `${BASE} iHerb prints a longer other-ingredients line that also names rhodiola extract, menthyl lactate, ginger root extract, L-theanine, GABA, magnesium beta hydroxybutyrate, CoQ10, black pepper extract, and B vitamins. That longer line was not graded. Designer Drugs Labs also prints Adhesive as an other ingredient.`,
    't113u. Founder verification is the source. Actives: Ashwagandha, Passionflower. The graded other ingredient is Adhesive, which iHerb and Designer Drugs Labs both print for the 4-patch Relax. iHerb merges a longer line. That longer line was not graded. No UPC was printed. Missing UPC. No code was invented.',
  ),
  row(
    'goodpatch-b307-rescue-4',
    'The Good Patch Rescue (4 patches)',
    'Cold & Flu',
    [{ name: 'DHM' }, { name: 'Green Tea Extract' }, { name: 'Vitamin B1' }],
    'Founder-confirmed Rescue panel. Actives DHM, Green Tea Extract, and Vitamin B1. Other ingredient Adhesive. t113u founder verification.',
    `${BASE} iHerb prints a longer other-ingredients line: 15 mg dhm (dihydromyricetin from ampelopsis grossedentata extract), green tea extract (camellia sinsensis), vitamin b1 (thiamine), black pepper extract (piper nigrum), adhesive. That longer line was not graded. The founder panel names DHM, Green Tea Extract, and Vitamin B1 as the actives.`,
    't113u. Founder verification is the source. Actives: DHM, Green Tea Extract, Vitamin B1. iHerb prints adhesive at the end of a longer line for the 4-patch Rescue. The longer line was not graded. No UPC was printed. Missing UPC. No code was invented.',
  ),
  row(
    'goodpatch-b307-think-4',
    'The Good Patch Think (4 patches)',
    'Herbs',
    [{ name: 'Yerba Mate' }, { name: 'Bacopa' }, { name: "Lion's Mane" }],
    'Founder-confirmed Think panel. Actives Yerba Mate, Bacopa, and Lion\'s Mane. Other ingredient Adhesive. t113u founder verification.',
    `${BASE} iHerb does not print the word Adhesive alone. It prints “adhesive crafted with 10 mg caffeine per patch,” and it also names caffeine, yerba mate leaf extract, bacopa monnieri extract, and lion's mane extract. That longer adhesive phrase was not graded as its own token. The founder panel names Yerba Mate, Bacopa, and Lion's Mane as the actives.`,
    't113u. Founder verification is the source. Actives: Yerba Mate, Bacopa, Lion\'s Mane. The graded other ingredient is Adhesive. iHerb prints “adhesive crafted with 10 mg caffeine per patch” instead of the word Adhesive alone. That longer phrase was not graded. No UPC was printed. Missing UPC. No code was invented.',
  ),
];

const ROWS = BATCH307_KYR6D_T113U;
if (ROWS.length !== 3) throw new Error(`batch307 count ${ROWS.length}`);
const ids = new Set<string>();
for (const record of ROWS) {
  if (ids.has(record.id)) throw new Error(`batch307 dup ${record.id}`);
  ids.add(record.id);
  if (record.verdict !== 'clean') throw new Error(`batch307 verdict ${record.id} ${record.verdict}`);
  if (!record.honestNote || record.honestNote.length < 40) throw new Error(`batch307 note ${record.id}`);
  if (!record.honestNote.includes('founder-confirmed')) throw new Error(`batch307 founder ${record.id}`);
  if (!/not graded/i.test(record.honestNote)) throw new Error(`batch307 actives ${record.id}`);
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (counted.length !== 0) throw new Error(`batch307 stack ${record.id}`);
  if (mapped.inactiveIngredients.length !== 1 || mapped.inactiveIngredients[0].name !== 'Adhesive') {
    throw new Error(`batch307 inactive ${record.id}`);
  }
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`batch307 blank ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`batch307 generic ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
