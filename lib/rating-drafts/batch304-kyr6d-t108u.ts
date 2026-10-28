// DRAFT / not verified / batch 304 KYR6-d (t108u).
// Brand page is the single source. No UPC was printed.
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

const S = {
  blend:
    'Methodology §5 Cleared (Essential oils of peppermint, eucalyptus, cajeput, wintergreen, juniper and clove — t108u). Does not count toward the t137u stack.',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${S.blend}` };
}

function finish(record: RatingRecord): RatingRecord {
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients, mapped.activeSafetyFlag);
  const stackNote = limitedStackHonestNoteIfAny(mapped.inactiveIngredients);
  let honestNote = record.honestNote ?? '';
  if (stackNote && !honestNote.includes(stackNote)) honestNote = `${stackNote} ${honestNote}`.trim();
  return { ...mapped, verdict: rollup.verdict, honestNote: honestNote || undefined };
}

const PANEL =
  'Olbas brand page. Olbas Oil 0.32 fl oz (10 mL). Ingredients sentence. t108u brand-page single source.';

export const BATCH304_KYR6D_T108U: RatingRecord[] = [
  finish({
    id: 'olbas-b304-oil-032',
    productName: 'Olbas Oil (0.32 fl oz)',
    brand: 'Olbas',
    category: 'Cold & Flu',
    formulaId: 'olbas-b304-oil-032',
    form: 'oil',
    audience: ADULT,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: ['Olbas'],
    barcode: '',
    activeIngredients: [],
    inactiveIngredients: [
      flag(
        PANEL,
        'Essential oils of Peppermint, Eucalyptus, Cajeput, Wintergreen, Juniper and Clove',
        'cleared',
      ),
    ],
    verdict: 'clean',
    honestNote:
      'Counted Limited tokens: none. The ingredient sentence is the whole formula. It is Cleared under the t108u lock and does not stack. The Walmart 0.34 fl oz listing was not used. The brand page prints 0.32 fl oz (10 mL).',
    sourcesGeneral: [
      't108u. Olbas brand page https://olbas.com/product/olbas-oil-0-32-fl-oz-10ml/ lists Olbas Oil 0.32 fl oz (10 mL) at $12.95. Ingredients: Essential oils of Peppermint, Eucalyptus, Cajeput, Wintergreen, Juniper and Clove. That sentence is the t108u Cleared lock. No UPC is printed on the page. Missing UPC. No code was invented. The Walmart 0.34 fl oz page was not used as this row.',
    ],
  }),
];

const ROWS = BATCH304_KYR6D_T108U;
if (ROWS.length !== 1) throw new Error(`batch304 count ${ROWS.length}`);
for (const record of ROWS) {
  if (!record.honestNote || record.honestNote.length < 40) throw new Error('batch304 note');
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients);
  if (rollup.verdict !== 'clean' || rollup.cause !== 'clean') {
    throw new Error(`batch304 verdict ${rollup.verdict} ${rollup.cause}`);
  }
  if (record.verdict !== 'clean') throw new Error('batch304 stored verdict');
  const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (counted.length !== 0) throw new Error(`batch304 stack ${counted.map((i) => i.name).join('|')}`);
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`batch304 blank ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`batch304 generic ${ingredient.name}: ${why}`);
    }
  }
}
