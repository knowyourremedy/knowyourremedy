// DRAFT / not verified / batch 146 KYR5-d Claritin US OTC second ladder.
// Barcode-only override. Copies selected batch144 and batch145 rows and
// sets barcode. Does not mutate those arrays. previewCatalog places this
// array before batch144 and batch145 so uniqueById (first wins) keeps
// these barcodes. batch144 and batch145 throw if any of their own rows
// has a barcode, so those arrays stay empty. batch70–145 were not edited.
// No new products, grades, panels, formulas, names, or oil-info.

import type { RatingRecord } from '../ratingRecord';
import { BATCH144_KYR6B_CLARITIN_US_OTC } from './batch144-kyr6b-claritin-us-otc';
import { BATCH145_KYR6B_CLARITIN_HELD_UPC } from './batch145-kyr6b-claritin-held-upc';

const ATTACH: { id: string; barcode: string }[] = [
  { id: 'claritin-b144-tablets-starch-40', barcode: '041100803634' },
  { id: 'claritin-b144-tablets-starch-90', barcode: '041100806888' },
  { id: 'claritin-b144-liquigels-40', barcode: '041100810533' },
  { id: 'claritin-b144-reditabs-60', barcode: '041100598608' },
  { id: 'claritin-b144-reditabs-70', barcode: '041100585301' },
  { id: 'claritin-b144-chew-cool-mint-24', barcode: '041100580986' },
  { id: 'claritin-b144-kids-syrup-5oz', barcode: '041100811042' },
  { id: 'claritin-b145-chew-grape-30', barcode: '041100809551' },
  { id: 'claritin-b145-adult-liquid-80ml', barcode: '041100595409' },
];

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

function selectSource(id: string): RatingRecord {
  const hits = [...BATCH144_KYR6B_CLARITIN_US_OTC, ...BATCH145_KYR6B_CLARITIN_HELD_UPC].filter(
    (record) => record.id === id,
  );
  if (hits.length === 0) throw new Error(`batch146 id not found in batch144/145: ${id}`);
  if (hits.length !== 1) throw new Error(`batch146 id ${id} found ${hits.length} times in batch144/145`);
  if (hits[0].barcode) throw new Error(`batch146 source ${id} already has a barcode`);
  return hits[0];
}

const seenIds = new Set<string>();
const seenCodes = new Set<string>();

export const BATCH146_KYR5D_CLARITIN_UPC_OVERRIDE: RatingRecord[] = ATTACH.map(({ id, barcode }) => {
  if (seenIds.has(id)) throw new Error(`batch146 duplicate id ${id}`);
  seenIds.add(id);
  if (!upcOk(barcode)) throw new Error(`batch146 barcode failed UPC-A check on ${id}: ${barcode}`);
  if (seenCodes.has(barcode)) throw new Error(`batch146 duplicate barcode ${barcode}`);
  seenCodes.add(barcode);
  const record = selectSource(id);
  return { ...record, barcode };
});

if (BATCH146_KYR5D_CLARITIN_UPC_OVERRIDE.length !== ATTACH.length) {
  throw new Error(`batch146 attach count ${BATCH146_KYR5D_CLARITIN_UPC_OVERRIDE.length}`);
}

for (const row of BATCH146_KYR5D_CLARITIN_UPC_OVERRIDE) {
  const source = selectSource(row.id);
  if (source === row) throw new Error(`batch146 did not copy ${row.id}`);
  if (source.barcode) throw new Error(`batch146 mutated source ${row.id}`);
  if (row.barcode !== ATTACH.find((item) => item.id === row.id)?.barcode) {
    throw new Error(`batch146 barcode drift on ${row.id}`);
  }
}
