// DRAFT / not verified / batch 295 KYR6-d (t95u).
// Founder override covers the panel and the UPC for these two droppers.
// The Good Day 80-count is already goodday-b282-kids-sleep-80 and is not repeated.
// No brand is closed. The Sprouts section is not edited.
// t95u requires a full honest note on every row.

import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { contradictionHonestNote, plainIngredientWhy } from '../scan-preview/plainLanguage';
import { applyT54uRow } from '../scan-preview/t54uLocks';
import {
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  limitedStackHonestNoteIfAny,
} from '../scan-preview/verdictFromFlags';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;

const S = {
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin).',
  water: 'Methodology §5 Cleared (water / purified water).',
} as const;

type MethKey = keyof typeof S;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: MethKey): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${S[meth]}` };
}

function finish(record: RatingRecord): RatingRecord {
  if (record.honestNote) return record;
  const formNote = contradictionHonestNote(record);
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients);
  const honestNote = [formNote, stackNote].filter((note): note is string => Boolean(note)).join(' ');
  return honestNote ? { ...record, honestNote } : record;
}

function row(
  partial: Omit<RatingRecord, 'recordStatus' | 'productType' | 'retailers' | 'barcode'> & {
    barcode?: string;
    productType?: RatingRecord['productType'];
  },
): RatingRecord {
  return finish({
    ...partial,
    audience: partial.audience ?? ADULT,
    minAge: partial.minAge ?? 18,
    recordStatus: UNVERIFIED,
    productType: partial.productType ?? 'OTC',
    retailers: [partial.brand],
    barcode: partial.barcode ?? '',
  });
}

const FLOWERS = [
  { name: 'Cherry Plum (Prunus cerasifera)', strength: '5X HPUS' },
  { name: 'Clematis (Clematis vitalba)', strength: '5X HPUS' },
  { name: 'Impatiens (Impatiens glandulifera)', strength: '5X HPUS' },
  { name: 'Rock Rose (Helianthemum nummularium)', strength: '5X HPUS' },
  { name: 'Star of Bethlehem (Ornithogalum umbellatum)', strength: '5X HPUS' },
];

const P20 =
  'Nelsons US brand page. https://www.nelsons.com/en-us/products/rescue-remedy-dropper-non-alcohol-20ml. The 20 mL non-alcohol dropper. Inactive ingredients: Glycerin [vegetable], purified water. The five flowers are the actives and are not graded. t95u founder override of the panel and UPC. Brand page agrees.';
const PSLEEP =
  'Nelsons US brand page. https://www.nelsons.com/en-us/products/rescue-sleep-kids-dropper-10ml. RESCUE Sleep Kids Dropper 10 mL. Inactive ingredients: Glycerin [vegetable], purified water. White Chestnut is an active. t95u founder override of the panel and UPC. Brand page agrees.';

const NOTE_20 =
  'Glycerin [vegetable] and purified water are Cleared. Counted Limited tokens: none. This is the non-alcohol 20 mL. It is not bach-b280-rescue-dropper-10, which is the alcohol 10 mL.';
const NOTE_SLEEP =
  'The Sleep formula includes White Chestnut. White Chestnut is an active and is not graded. Glycerin [vegetable] and purified water are Cleared. Counted Limited tokens: none. This is the pack the earlier hold called Kids Night Dropper 10 mL. The carton image is named Kids Night Dropper. There was no hunt-list bullet for that name.';

function glycerinWater(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Glycerin [vegetable]', 'cleared', 'glycerin'),
    flag(panel, 'Purified Water', 'cleared', 'water'),
  ];
}

export const BATCH295_KYR6D_T95U: RatingRecord[] = [
  row({
    id: 'bach-b295-rescue-dropper-nonalcohol-20',
    productName: 'Bach RESCUE Remedy Non-Alcohol Dropper (20 mL)',
    brand: 'Bach',
    category: 'Sleep',
    formulaId: 'bach-b295-rescue-dropper-nonalcohol-20',
    form: 'liquid drops',
    minAge: 2,
    productSubtype: 'homeopathic',
    homeopathicSubtype: 'homeopathic',
    barcode: '741273401230',
    activeIngredients: FLOWERS,
    inactiveIngredients: glycerinWater(P20),
    verdict: 'clean',
    honestNote: NOTE_20,
    sourcesGeneral: [
      't95u. Nelsons US brand page is the single source. https://www.nelsons.com/en-us/products/rescue-remedy-dropper-non-alcohol-20ml lists the 20 mL at $23.99 and in stock. SKU 3004051. The barcode field is empty. Founder-supplied UPC 741273401230. The check digit passes. Add 4 drops. Children under 2: ask a doctor. About 130 doses. Inactive ingredients: Glycerin [vegetable], purified water. The five flowers are the actives, each 5X HPUS, and are not graded. Counted Limited tokens: none. The 10 mL non-alcohol variant on the same page is price $0 and is not this row. Not bach-b280-rescue-dropper-10. Not the alcohol 20 mL variant whose price is $0.',
    ],
  }),
  row({
    id: 'bach-b295-rescue-sleep-kids-dropper-10',
    productName: 'Bach RESCUE Sleep Kids Dropper (10 mL)',
    brand: 'Bach',
    category: 'Sleep',
    formulaId: 'bach-b295-rescue-sleep-kids-dropper-10',
    form: 'liquid drops',
    audience: KIDS,
    minAge: 2,
    productSubtype: 'homeopathic',
    homeopathicSubtype: 'homeopathic',
    barcode: '741273400844',
    activeIngredients: [
      ...FLOWERS,
      { name: 'White Chestnut (Aesculus hippocastanum)', strength: '5X HPUS' },
    ],
    inactiveIngredients: glycerinWater(PSLEEP),
    verdict: 'clean',
    honestNote: NOTE_SLEEP,
    sourcesGeneral: [
      't95u. Nelsons US brand page is the single source. https://www.nelsons.com/en-us/products/rescue-sleep-kids-dropper-10ml lists the 10 mL at $16.99 and in stock. SKU 3003414. The barcode field is empty. Founder-supplied UPC 741273400844. The check digit passes. Ages 2 and up. Add 4 drops. About 65 doses. Active ingredients include White Chestnut (Aesculus hippocastanum) 5X HPUS. The Sleep formula includes White Chestnut. It is an active and is not graded. Inactive ingredients: Glycerin [vegetable], purified water. Counted Limited tokens: none. The carton image file is named Kids Night Dropper. This is the pack the earlier hold called Kids Night Dropper 10 mL. There was no hunt-list bullet under that name. Not the raspberry night dropper whose US page returned 404.',
    ],
  }),
];

const ROWS = BATCH295_KYR6D_T95U;

const EXPECTED: Record<string, { verdict: 'clean' | 'caution' | 'avoid'; cause: string; counted: string; note: string; barcode: string }> = {
  'bach-b295-rescue-dropper-nonalcohol-20': {
    verdict: 'clean',
    cause: 'clean',
    counted: '',
    note: NOTE_20,
    barcode: '741273401230',
  },
  'bach-b295-rescue-sleep-kids-dropper-10': {
    verdict: 'clean',
    cause: 'clean',
    counted: '',
    note: NOTE_SLEEP,
    barcode: '741273400844',
  },
};

if (ROWS.length !== 2) throw new Error(`batch295 row count ${ROWS.length}`);

for (const record of ROWS) {
  const expected = EXPECTED[record.id];
  if (!expected) throw new Error(`batch295 unexpected id ${record.id}`);
  const mapped = applyT54uRow(record);
  const rollup = computeVerdictFromInactiveIngredients(mapped.inactiveIngredients);
  if (rollup.verdict !== expected.verdict || rollup.cause !== expected.cause || mapped.verdict !== expected.verdict) {
    throw new Error(`batch295 verdict ${record.id} ${rollup.verdict} ${rollup.cause} ${mapped.verdict}`);
  }
  const counted = mapped.inactiveIngredients
    .filter((item) => ingredientCountsTowardLimitedStack(item))
    .map((item) => item.name)
    .join('|');
  if (counted !== expected.counted) throw new Error(`batch295 stack ${record.id} ${counted}`);
  if ((mapped.honestNote ?? '') !== expected.note) throw new Error(`batch295 note ${record.id} ${JSON.stringify(mapped.honestNote)}`);
  if ((mapped.barcode ?? '') !== expected.barcode) throw new Error(`batch295 upc ${record.id} ${mapped.barcode}`);
  const formNote = contradictionHonestNote(record);
  const stackNote = limitedStackHonestNoteIfAny(record.inactiveIngredients);
  if (formNote && !expected.note.startsWith(formNote)) throw new Error(`batch295 form note ${record.id} ${formNote}`);
  if (stackNote && !expected.note.includes(stackNote)) throw new Error(`batch295 stack note ${record.id} ${stackNote}`);
  for (const ingredient of mapped.inactiveIngredients) {
    const why = plainIngredientWhy(ingredient);
    if (!why) throw new Error(`batch295 blank why ${record.id} ${ingredient.name}`);
    if (/is on the Cleared list/i.test(why) || /is on the Limited list/i.test(why)) {
      throw new Error(`batch295 generic why ${record.id} ${ingredient.name}: ${why}`);
    }
  }
}
