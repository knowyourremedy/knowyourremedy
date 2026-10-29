// DRAFT / not verified / batch 309 KYR6-d (t117u resume).
// Brand page is the single source. Same starred line as the written 0.5 fl oz.
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
  olive: 'Methodology §5 Cleared (olive oil).',
  lav: 'Methodology §5 Cleared (Organic Lavender Oil — t108u). Does not count toward the t137u stack.',
  mullein: 'Methodology §5 Cleared (Organic Mullein Extract — t111u). Does not count toward the t137u stack.',
  tea: 'Methodology §5 Cleared (Organic Tea Tree Oil — t108u). Does not count toward the t137u stack.',
  echinacea: 'Methodology §5 Cleared (echinacea extract).',
  garlic: 'Methodology §5 Cleared (Organic Garlic Oil — t108u). Does not count toward the t137u stack.',
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

const PANEL =
  'Brand page Wally\'s Natural Organic Ear Oil, 1.0 fl oz. Ingredients: Olive Oil*, Lavender Oil*, Mullein Extract*, Tea Tree Oil*, Echinacea Extract*, Garlic Oil*. Footnote *Certified Organic Ingredients. t117u brand page.';

export const BATCH309_KYR6D_T117U: RatingRecord[] = [
  finish({
    id: 'wallys-b309-ear-oil-10',
    productName: "Wally's Natural Organic Ear Oil (1.0 fl oz)",
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
      flag(PANEL, 'Olive Oil', 'cleared', 'olive'),
      flag(PANEL, 'Organic Lavender Oil', 'cleared', 'lav'),
      flag(PANEL, 'Organic Mullein Extract', 'cleared', 'mullein'),
      flag(PANEL, 'Organic Tea Tree Oil', 'cleared', 'tea'),
      flag(PANEL, 'Echinacea Extract', 'cleared', 'echinacea'),
      flag(PANEL, 'Organic Garlic Oil', 'cleared', 'garlic'),
    ],
    verdict: 'clean',
    honestNote:
      'Counted Limited tokens: none. The star on each ingredient means certified organic. Lavender Oil*, Tea Tree Oil*, and Garlic Oil* are the Cleared locks Organic Lavender Oil, Organic Tea Tree Oil, and Organic Garlic Oil. Mullein Extract* is the Cleared lock Organic Mullein Extract. Olive Oil and Echinacea Extract keep their existing specific whys. None of these stack. This row is the 1.0 fl oz. It is the same starred line as the written 0.5 fl oz and it is not that row. No UPC was printed. Missing UPC.',
    sourcesGeneral: [
      't117u. Brand page https://www.wallysnatural.com/product/organic-ear-oil/ is in stock at $15.43 with Add to cart. The ingredient line is Olive Oil*, Lavender Oil*, Mullein Extract*, Tea Tree Oil*, Echinacea Extract*, Garlic Oil*, with the footnote Certified Organic Ingredients. That is the same line as wallys-b305-ear-oil-05. This pack is 1.0 fl oz (30 mL). No UPC was printed. Missing UPC. No code was invented.',
    ],
  }),
];

const ROWS = BATCH309_KYR6D_T117U;
if (ROWS.length !== 1) throw new Error(`batch309 count ${ROWS.length}`);
for (const record of ROWS) {
  if (record.verdict !== 'clean') throw new Error(`batch309 verdict ${record.id} ${record.verdict}`);
  if (record.barcode) throw new Error(`batch309 barcode ${record.id}`);
  if (!record.honestNote || !record.honestNote.includes('1.0 fl oz')) throw new Error(`batch309 note ${record.id}`);
  const mapped = applyT54uRow(record);
  const counted = mapped.inactiveIngredients.filter((i) => ingredientCountsTowardLimitedStack(i));
  if (counted.length !== 0) throw new Error(`batch309 stack ${record.id}`);
  if (mapped.inactiveIngredients.length !== 6) throw new Error(`batch309 inactive ${record.id}`);
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why || !why.trim()) throw new Error(`batch309 blank ${ingredient.name}`);
    if (/is on the Cleared list|is on the Limited list|has its own line|That is why it is Usable/i.test(why)) {
      throw new Error(`batch309 generic ${ingredient.name}: ${why}`);
    }
  }
}
