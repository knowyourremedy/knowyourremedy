// DRAFT / not verified / batch 286 KYR6-d (t55u).
// Brand page is the single source. A pack is here only when that page shows the
// 1-pack for sale and every other-ingredient token has a real why.
// Barcodes stay empty when the page showed no code.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;

const S = {
  cleared: (name: string) => `Methodology §5 Cleared (${name}).`,
  citric: 'Methodology §5 Caution (citric acid). Does not count toward the t137u stack.',
  sorbitol: 'Methodology §5 Caution (sorbitol). Does not count toward the t137u stack.',
  isomalt: 'Methodology §5 Caution (isomalt). Does not count toward the t137u stack.',
  berry:
    'Methodology §5 Limited (Natural Berry Flavoring — founder lock t55u Oct 26, 2026). Vague flavor. Counts toward the t137u stack. Not Cleared berry flavoring.',
  stevia:
    'Methodology §5 Limited (Stevia extract / stevia leaf extract — founder lock t159u Oct 21, 2026; same Limited row as Stevia and rebaudioside a extracted and purified; counts toward the t137u stack). Not Cleared organic Rebaudioside A. Not Cleared high-purity steviol glycosides. Not Cleared Rebaudioside M.',
} as const;

type Tok = [string, RiskLevel, string];

function finish(record: RatingRecord): RatingRecord {
  const formNote = contradictionHonestNote(record);
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients);
  const honestNote = [formNote, stackNote].filter((note): note is string => Boolean(note)).join(' ');
  return honestNote ? { ...record, honestNote } : record;
}

function row(
  brand: string,
  partial: Omit<RatingRecord, 'brand' | 'recordStatus' | 'productType' | 'retailers' | 'barcode'> & {
    barcode?: string;
  },
): RatingRecord {
  return finish({
    ...partial,
    brand,
    audience: partial.audience ?? ADULT,
    minAge: partial.minAge ?? 18,
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    retailers: [brand],
    barcode: partial.barcode ?? '',
  });
}

function flags(panel: string, toks: Tok[]): IngredientFlag[] {
  return toks.map(([name, riskLevel, source]) => ({ name, riskLevel, source: `${panel}; ${source}` }));
}

const C = (name: string): Tok => [name, 'cleared', S.cleared(name)];

const PCOLL =
  'Hyalogic brand page. Serving 1 lozenge. Servings per container 30. Hyaluronic acid, biotin, silica, N-acetylcysteine, and methionine are the actives and are not graded. t55u brand-page single source.';
const PIMM =
  'Hyalogic brand page. Serving 1 teaspoon (5 mL). Servings per container 24. The 4 fl oz bottle. Zinc on the facts is the active and is not graded again. t55u brand-page single source.';

export const BATCH286_KYR6D_T55U: RatingRecord[] = [
  row('Hyalogic', {
    id: 'hyalogic-b286-ha-collagen-builder-30',
    productName: 'Hyalogic HA Collagen Builder Lozenge (30 lozenges)',
    category: 'Vitamins',
    formulaId: 'hyalogic-b286-ha-collagen-builder-30',
    form: 'lozenge',
    activeIngredients: [
      { name: 'Hyaluronic Acid', strength: '10 mg' },
      { name: 'Biotin', strength: '5000 mcg' },
      { name: 'Silica', strength: '25 mg' },
      { name: 'N-Acetylcysteine', strength: '20 mg' },
      { name: 'Methionine', strength: '15 g' },
    ],
    inactiveIngredients: flags(PCOLL, [
      ['Sorbitol', 'moderate', S.sorbitol],
      ['Natural Berry Flavoring', 'limited', S.berry],
      ['Isomalt', 'moderate', S.isomalt],
      ['Citric Acid', 'moderate', S.citric],
      C('Vegetable Magnesium Stearate'),
      ['Stevia Extract', 'limited', S.stevia],
    ]),
    verdict: 'caution',
    sourcesGeneral: [
      't55u. Hyalogic brand page is the single source. https://www.hyalogic.com/products/ha-collagen-builder lists the 30 lozenges at $24.95 and for sale. Serving 1 lozenge. Servings per container 30. Counted Limited tokens: Natural Berry Flavoring and Stevia Extract. That is two, so this is not a 3+ stack. No honest note. Sorbitol, isomalt, and citric acid are Caution and do not stack. The page prints methionine 15 g. That figure is copied as printed. Missing UPC. No code was invented. Not the HA gummy.',
    ],
  }),
  row('Hyalogic', {
    id: 'hyalogic-b286-immune-z-4',
    productName: 'Hyalogic Immune Z Liquid (4 fl oz)',
    category: 'Immune Support',
    formulaId: 'hyalogic-b286-immune-z-4',
    form: 'liquid',
    activeIngredients: [{ name: 'Zinc (Zinc Hyaluronate)', strength: '7.5 mg' }],
    inactiveIngredients: flags(PIMM, [
      C('Water'),
      C('Zinc Citrate'),
      C('Sodium Hyaluronate (Hyaluronic Acid)'),
    ]),
    verdict: 'clean',
    sourcesGeneral: [
      't55u. Hyalogic brand page is the single source. https://www.hyalogic.com/products/immune-z-liquid lists the 4 fl oz bottle at $14.95 and for sale. Serving 1 teaspoon (5 mL). Servings per container 24. Zinc citrate and Sodium Hyaluronate (Hyaluronic Acid) are other ingredients. The zinc on the facts stays the active. Counted Limited tokens: none. No honest note. Missing UPC. No code was invented.',
    ],
  }),
];

const ROWS = BATCH286_KYR6D_T55U;

const EXPECTED: Record<string, { verdict: 'clean' | 'caution' | 'avoid'; cause: string; counted: string }> = {
  'hyalogic-b286-ha-collagen-builder-30': {
    verdict: 'caution',
    cause: 'limited_1_2',
    counted: 'Natural Berry Flavoring|Stevia Extract',
  },
  'hyalogic-b286-immune-z-4': {
    verdict: 'clean',
    cause: 'clean',
    counted: '',
  },
};

if (ROWS.length !== 2) throw new Error(`batch286 row count ${ROWS.length}`);

for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch286 unexpected id ${record.id}`);
  const rollup = computeVerdictFromInactiveIngredients(record.inactiveIngredients);
  if (rollup.verdict !== expected.verdict || rollup.cause !== expected.cause || record.verdict !== expected.verdict) {
    throw new Error(`batch286 verdict ${record.id} ${rollup.verdict} ${rollup.cause} ${record.verdict}`);
  }
  const counted = record.inactiveIngredients
    .filter((item) => ingredientCountsTowardLimitedStack(item))
    .map((item) => item.name)
    .join('|');
  if (counted !== expected.counted) throw new Error(`batch286 stack ${record.id} ${counted}`);
  const formNote = contradictionHonestNote(record) ?? '';
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients) ?? '';
  const note = [formNote, stackNote].filter(Boolean).join(' ');
  if ((record.honestNote ?? '') !== note) {
    throw new Error(`batch286 note ${record.id} ${JSON.stringify(record.honestNote)} vs ${JSON.stringify(note)}`);
  }
  if (record.honestNote) throw new Error(`batch286 unexpected note ${record.id}`);
  if (record.barcode) throw new Error(`batch286 upc invented ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch286 blank why ${record.id} ${ingredient.name}`);
    if (/has its own line in the ingredient rules/i.test(why) || /is on the Cleared list/i.test(why)) {
      throw new Error(`batch286 generic why ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
