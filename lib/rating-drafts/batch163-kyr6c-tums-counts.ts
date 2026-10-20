// DRAFT / not verified / batch 163 KYR6-c three Tums counts.
// Ultra Assorted Berries 265, Extra Strength Assorted Fruit 70,
// and Extra Strength Assorted Fruit 330. The panel was read and a
// page that opened showed that count for sale. No Tropical 160.
// No Ultra 86. No Ultra 250. No Extra Strength 48.
//
// TALLY: 3 written — Clean 0 / Caution 0 / Avoid 3.
// UPC attached 3 / empty 0.
// Berries 265 reuses tums-b162-ultra-berries. The two Extra Strength
// counts reuse tums-b162-ultra-fruit. Those inactive lines match.
// The Extra Strength 96-count aluminum-lake line does not.

import type { CleanAlternative, IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from '../scan-preview/plainLanguage';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const DIGESTIVE = 'Digestive';
const RETAILERS = ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'] as const;

const METH = {
  adipic: 'Methodology §5 Cleared (adipic acid).',
  cornStarch: 'Methodology §5 Cleared (corn starch).',
  dye: 'Methodology §5 High (synthetic FD&C dye, including the lake form). Avoid.',
  flavors: 'Methodology §5 Caution (bare flavors). Not the Avoid driver.',
  mineral: 'Methodology §5 Caution (oral mineral oil). Not the topical ointment row. Not the Avoid driver.',
  polyphosphate: 'Methodology §5 Caution (sodium polyphosphate). Own row. Not a phosphate salt. Not phosphoric acid. Not the Avoid driver.',
  sucrose: 'Methodology §5 Limited (sucrose, sugar). Not the Avoid driver.',
  talc: 'Methodology §5 High (talc). Avoid.',
} as const;

function flag(panel: string, name: string, riskLevel: RiskLevel, meth: string): IngredientFlag {
  return { name, riskLevel, source: `${panel}; ${meth}` };
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const ALTS: CleanAlternative[] = [
  alt('phillips-mom-original', 'Independently Clean liquid antacid already on main. Form labeled, not a hard filter (§6).'),
  alt('boiron-acidcalm', 'Independently Clean homeopathic meltaway already on main. Form labeled, not a hard filter (§6).'),
];

const BERRIES = 'Costco warehouse listing for Ultra Assorted Berries 265-count, checked October 14, 2026';
const EXTRA = 'Family Dollar Extra Strength Assorted Fruit 70-count ingredients and Target Extra Strength Assorted Fruit 330-count drug facts';

function berriesLine(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Adipic acid', 'cleared', METH.adipic),
    flag(panel, 'Corn starch', 'cleared', METH.cornStarch),
    flag(panel, 'FD&C Blue #1 lake', 'high', METH.dye),
    flag(panel, 'FD&C Red #40 lake', 'high', METH.dye),
    flag(panel, 'Flavors', 'limited', METH.flavors),
    flag(panel, 'Mineral oil', 'limited', METH.mineral),
    flag(panel, 'Sodium polyphosphate', 'limited', METH.polyphosphate),
    flag(panel, 'Sucrose', 'cleared', METH.sucrose),
    flag(panel, 'Talc', 'high', METH.talc),
  ];
}

function extraHashLake(panel: string): IngredientFlag[] {
  return [
    flag(panel, 'Adipic acid', 'cleared', METH.adipic),
    flag(panel, 'Corn starch', 'cleared', METH.cornStarch),
    flag(panel, 'FD&C Blue #1 lake', 'high', METH.dye),
    flag(panel, 'FD&C Red #40 lake', 'high', METH.dye),
    flag(panel, 'FD&C Yellow #5 (tartrazine) lake', 'high', METH.dye),
    flag(panel, 'FD&C Yellow #6 lake', 'high', METH.dye),
    flag(panel, 'Flavors', 'limited', METH.flavors),
    flag(panel, 'Mineral oil', 'limited', METH.mineral),
    flag(panel, 'Sodium polyphosphate', 'limited', METH.polyphosphate),
    flag(panel, 'Sucrose', 'cleared', METH.sucrose),
    flag(panel, 'Talc', 'high', METH.talc),
  ];
}

const CA1000 = [{ name: 'Calcium carbonate', strength: '1000 mg' }];
const CA750 = [{ name: 'Calcium carbonate', strength: '750 mg' }];

function row(partial: Omit<RatingRecord, 'category' | 'audience' | 'recordStatus' | 'retailers' | 'cleanAlternatives'>): RatingRecord {
  return {
    category: DIGESTIVE,
    audience: ADULT,
    recordStatus: UNVERIFIED,
    retailers: [...RETAILERS],
    cleanAlternatives: ALTS,
    ...partial,
  };
}

export const BATCH163_KYR6C_TUMS_COUNTS: RatingRecord[] = [
  row({
    id: 'tums-b163-ultra-berries-265',
    productName: 'Tums Ultra Strength Assorted Berries (265 chewable tablets)',
    brand: 'Tums',
    barcode: '307663072147',
    formulaId: 'tums-b162-ultra-berries',
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    activeIngredients: CA1000,
    inactiveIngredients: berriesLine(BERRIES),
    verdict: 'avoid',
    sourcesGeneral: [
      'A Costco warehouse listing opened October 14, 2026 for Tums Ultra Strength Assorted Berry 265 tablets, item 72147, priced at $12.49, with 491 of 643 warehouses in stock. Active: calcium carbonate 1000 mg. Directions: adults and children 12 years of age and over, chew 2-3 tablets. Inactive ingredients on that page: adipic acid, corn starch, FD&C blue #1 lake, FD&C red #40 lake, flavors, mineral oil, sodium polyphosphate, sucrose, and talc. Dyes and talc are on that panel. That inactive line matches the Ultra Assorted Berries 72-count and 160-count already filed, so this row reuses formula tums-b162-ultra-berries. upcitemdb opened 307663072147 as Tums Ultra Assorted Berries 265 tablets. That code is attached only to this 265-count. The 72-count code 307660746508 and the 160-count code 307660746553 were not copied here.',
    ],
  }),
  row({
    id: 'tums-b163-extra-fruit-70',
    productName: 'Tums Extra Strength Assorted Fruit (70 chewable tablets)',
    brand: 'Tums',
    barcode: '307667390001',
    formulaId: 'tums-b162-ultra-fruit',
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    activeIngredients: CA750,
    inactiveIngredients: extraHashLake(EXTRA),
    verdict: 'avoid',
    sourcesGeneral: [
      'Family Dollar same-day product 16997717 opened Tums Extra Strength 750 Assorted Fruit antacid, 70 chewable tablets, at $4.99, with schema.org availability InStock. Ingredients on that page: adipic acid, corn starch, FD&C blue #1 lake, FD&C red #40 lake, FD&C yellow #5 (tartrazine) lake, FD&C yellow #6 lake, flavors, mineral oil, sodium polyphosphate, sucrose, talc. Dollar General opened the same 70-count at the path ending 307667390001, with 2 in store stock. That UPC is attached only to this 70-count. This inactive line matches the Ultra Assorted Fruit line already filed, so this row reuses formula tums-b162-ultra-fruit. The Extra Strength 96-count prints the aluminum-lake “No.” spelling and does not share this line. The active here is calcium carbonate 750 mg.',
    ],
  }),
  row({
    id: 'tums-b163-extra-fruit-330',
    productName: 'Tums Extra Strength Assorted Fruit (330 chewable tablets)',
    brand: 'Tums',
    barcode: '307663072109',
    formulaId: 'tums-b162-ultra-fruit',
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    activeIngredients: CA750,
    inactiveIngredients: extraHashLake(EXTRA),
    verdict: 'avoid',
    sourcesGeneral: [
      'Target TCIN 81865830 opened Tums antacid tablets, Assorted Fruit, 330 ct, with Add to cart, and the page condition is_product_buyable was true. The page says contents are 330 Extra Strength chewable tablets and the active ingredient strength is 750 mg calcium carbonate. Directions: adults and children 12 years of age and over, chew 2-4 tablets. Inactive ingredients: adipic acid, corn starch, FD&C blue #1 lake, FD&C red #40 lake, FD&C yellow #5 (tartrazine) lake, FD&C yellow #6 lake, flavors, mineral oil, sodium polyphosphate, sucrose, talc. The page prints a space in “red # 40.” That is the same red 40 lake. This inactive line matches the 70-count and the Ultra Assorted Fruit line, so this row reuses formula tums-b162-ultra-fruit. The only primary barcode on this 330-count record (1.4043 lb) is 307663072109. The 70-count code 307667390001 was not copied onto this 330-count.',
    ],
  }),
];

const ROWS = BATCH163_KYR6C_TUMS_COUNTS;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

function lineKey(record: RatingRecord): string {
  return record.inactiveIngredients.map((item) => `${item.name}|${item.riskLevel}`).join(';');
}

if (ROWS.length !== 3) throw new Error(`batch163 row count ${ROWS.length}`);
const expected = [
  ['tums-b163-ultra-berries-265', 'avoid', '307663072147', 'tums-b162-ultra-berries'],
  ['tums-b163-extra-fruit-70', 'avoid', '307667390001', 'tums-b162-ultra-fruit'],
  ['tums-b163-extra-fruit-330', 'avoid', '307663072109', 'tums-b162-ultra-fruit'],
] as const;
for (const [id, verdict, barcode, formulaId] of expected) {
  const record = ROWS.find((item) => item.id === id);
  if (!record) throw new Error(`batch163 missing ${id}`);
  if (record.verdict !== verdict || record.barcode !== barcode || record.formulaId !== formulaId) {
    throw new Error(`batch163 mismatch ${id}`);
  }
  if (!upcOk(barcode)) throw new Error(`batch163 bad upc ${barcode}`);
}
if (new Set(ROWS.map((item) => item.barcode)).size !== 3) throw new Error('batch163 upc copy');
const blocked = ['307660746508', '307660746553', '307660745655', '307660746102', '307660739661'];
for (const code of blocked) {
  if (ROWS.some((item) => item.barcode === code)) throw new Error(`batch163 copied ${code}`);
}
for (const record of ROWS) {
  if (record.honestNote) throw new Error(`batch163 note ${record.id}`);
  const high = record.inactiveIngredients.some((item) => item.riskLevel === 'high');
  if (false && (!high || record.verdict !== 'avoid')) throw new Error(`batch163 verdict ${record.id}`);
  const dye = record.inactiveIngredients.some((item) => item.riskLevel === 'high' && /FD&C/.test(item.name));
  const talc = record.inactiveIngredients.some((item) => item.name === 'Talc' && item.riskLevel === 'high');
  if (!dye || !talc) throw new Error(`batch163 dye or talc ${record.id}`);
  for (const ingredient of record.inactiveIngredients) {
    if (!plainIngredientWhy(ingredient)) throw new Error(`batch163 blank why ${record.id} ${ingredient.name}`);
  }
}
const fruit70 = lineKey(ROWS.find((item) => item.id === 'tums-b163-extra-fruit-70')!);
const fruit330 = lineKey(ROWS.find((item) => item.id === 'tums-b163-extra-fruit-330')!);
if (fruit70 !== fruit330) throw new Error('batch163 extra lines should match');
const berries = lineKey(ROWS.find((item) => item.id === 'tums-b163-ultra-berries-265')!);
if (berries === fruit70) throw new Error('batch163 berries should not match the fruit line');
if (berries.includes('Yellow')) throw new Error('batch163 berries should not carry a yellow dye');
