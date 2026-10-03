// DRAFT / not verified / batch 147 KYR5-d Claritin US OTC ladder 3.
// Barcode-only override. Copies selected batch136 and batch144 rows and
// sets barcode. Does not mutate those arrays. previewCatalog places this
// array before batch136 and before batch146 so uniqueById (first wins)
// keeps these barcodes. batch136 self-checks run on batch136's own array.
// batch144 still throws if any of its own rows has a barcode. Throws if
// any attached id is already in batch146. batch70–146 were not edited.
// No new products, grades, panels, formulas, names, or oil-info.

import type { RatingRecord } from '../ratingRecord';
import { BATCH136_KYR6B_CLARITIN_FIRST_SLICE } from './batch136-kyr6b-claritin-first-slice';
import { BATCH144_KYR6B_CLARITIN_US_OTC } from './batch144-kyr6b-claritin-us-otc';
import { BATCH146_KYR5D_CLARITIN_UPC_OVERRIDE } from './batch146-kyr5d-claritin-upc-override';

const ATTACH: { id: string; barcode: string }[] = [
  { id: 'claritin-b144-chew-cool-mint-56', barcode: '041100580993' },
  { id: 'claritin-b136-d24-ec-5', barcode: '041100080493' },
  { id: 'claritin-b144-tablets-starch-80', barcode: '041100810830' },
];

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

function selectSource(id: string): RatingRecord {
  if (BATCH146_KYR5D_CLARITIN_UPC_OVERRIDE.some((record) => record.id === id)) {
    throw new Error(`batch147 id ${id} is already in batch146`);
  }
  const hits = [...BATCH136_KYR6B_CLARITIN_FIRST_SLICE, ...BATCH144_KYR6B_CLARITIN_US_OTC].filter(
    (record) => record.id === id,
  );
  if (hits.length === 0) throw new Error(`batch147 id not found in batch136/144: ${id}`);
  if (hits.length !== 1) throw new Error(`batch147 id ${id} found ${hits.length} times in batch136/144`);
  if (hits[0].barcode) throw new Error(`batch147 source ${id} already has a barcode`);
  return hits[0];
}

const seenIds = new Set<string>();
const seenCodes = new Set<string>();

export const BATCH147_KYR5D_CLARITIN_UPC_OVERRIDE_3: RatingRecord[] = ATTACH.map(({ id, barcode }) => {
  if (seenIds.has(id)) throw new Error(`batch147 duplicate id ${id}`);
  seenIds.add(id);
  if (!upcOk(barcode)) throw new Error(`batch147 barcode failed UPC-A check on ${id}: ${barcode}`);
  if (seenCodes.has(barcode)) throw new Error(`batch147 duplicate barcode ${barcode}`);
  seenCodes.add(barcode);
  const record = selectSource(id);
  return { ...record, barcode };
});

if (BATCH147_KYR5D_CLARITIN_UPC_OVERRIDE_3.length !== ATTACH.length) {
  throw new Error(`batch147 attach count ${BATCH147_KYR5D_CLARITIN_UPC_OVERRIDE_3.length}`);
}

for (const row of BATCH147_KYR5D_CLARITIN_UPC_OVERRIDE_3) {
  const source = selectSource(row.id);
  if (source === row) throw new Error(`batch147 did not copy ${row.id}`);
  if (source.barcode) throw new Error(`batch147 mutated source ${row.id}`);
  if (row.barcode !== ATTACH.find((item) => item.id === row.id)?.barcode) {
    throw new Error(`batch147 barcode drift on ${row.id}`);
  }
}
