// DRAFT / not verified / batch 92 KYR6 missing-OI rescan.
// Methodology v1.6 + MAIN §5. No invented grades. No invented OI.
// No invented UPCs. Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. Existing MAIN Search rows only. Hunt list = Search rows
// whose inactive list is empty, null, or still flagged missing, after
// dropping confirmed-empty cartons (100% powder / “Other Ingredients:
// None” / founder-pinned active-only panel). Named-dry UPC twins were
// not reopened. The empty-UPC list was not hunted. No new products.
//
// Live MAIN after #312 (ccb0b89): Search browse 4087. Empty inactive
// list 146. Confirmed-empty / active-only panels left alone: 144
// (founder lock — not missing-OI). Worklist 2.
//
// now-sports-creatine-monohydrate-8 was the blank Vitacost parse
// (`other-ingredients: .`). Exact pack is the 8 oz / about 45 serving
// powder, UPC-A 733739020307 (SKU 2030). No drug NDC, so no DailyMed
// SPL. Official nowfoods.com supplement facts for that size print
// Other Ingredients: None. Wayback 2026-08-15 of the same page prints
// the same line on the about-45 serving facts, next to the size table
// that ties 8 oz. to 733739020307. Vitacost Ingredients on that UPC is
// the allergen sentence, not a second panel. Amazon US HTML had no
// Other Ingredients line. iHerb US 403. Walmart robot wall. The
// existing Search row is already an empty inactive list and Clean,
// which is what “None” means. No fill. Grade not restaged. UPC already
// on the row — not reattached. Form field on the old row stays as
// written.
//
// sprouts-organic-prenatal-whole-food is the other empty-pending row
// (inactive list left empty on purpose). OUT. No Sprouts hunt. No
// new Sprouts row.
//
// batch1–91 were not edited. No A+Health / HealthA2Z / TIME-Cap /
// GoodSense. No toothpaste. No house Amazon. No factory. No graded
// oil pour bottles.
//
// TALLY: Search fills 0 (Clean 0 / Caution 0 / Avoid 0).
// NEW 0 / REUSE-formula 0 / SKIPPED 1 (no_OI leftover 0 / OUT 1) /
// REFUSED 0. Confirmed-none after hunt 1 (existing row left).
// TALLY is asserted at the bottom.

import type { RatingRecord } from '../ratingRecord';

export const BATCH92_KYR6_MISSING_OI_RESCAN: RatingRecord[] = [];

export const BATCH92_SKIPPED_NO_OI: { sku: string; reason: string }[] = [];

export const BATCH92_SKIPPED_OUT: { sku: string; reason: string }[] = [
  {
    sku: 'sprouts-organic-prenatal-whole-food',
    reason:
      'SKIPPED OUT. Existing MAIN Search row. Inactive list is empty on purpose (full other-ingredients not matched). No Sprouts. Not hunted. Not a no_OI leftover. NO new Search row.',
  },
];

export const BATCH92_REFUSED: { sku: string; reason: string }[] = [];

export const BATCH92_CONFIRMED_NONE: { sku: string; reason: string }[] = [
  {
    sku: 'now-sports-creatine-monohydrate-8',
    reason:
      'Confirmed-empty after hunt. Not a fill. Existing row already has an empty inactive list and Clean. Exact pack: NOW Sports Creatine Monohydrate powder, 8 oz (227 g), about 45 servings, SKU 2030, UPC-A 733739020307. No NDC. nowfoods.com supplement facts (https://www.nowfoods.com/products/sports-nutrition/creatine-monohydrate-powder; Wayback https://web.archive.org/web/20260815082722/https://www.nowfoods.com/products/sports-nutrition/creatine-monohydrate-powder) Other Ingredients: None. Vitacost https://www.vitacost.com/products/now-foods-sports-creatine-monohydrate-8-oz-227-g-4589 Ingredients block is the allergen sentence, not a second OI panel. Amazon US https://www.amazon.com/dp/B0019LTHGM had no Other Ingredients line. iHerb US returned 403. Walmart search returned a robot wall. UPC already on the row — not reattached. Grade not restaged. NO new Search row.',
  },
];

const _ROWS = BATCH92_KYR6_MISSING_OI_RESCAN;
if (_ROWS.length !== 0) throw new Error('batch92 fill tally must stay 0');
if (BATCH92_SKIPPED_NO_OI.length !== 0) throw new Error('batch92 no_OI leftover tally drift');
if (BATCH92_SKIPPED_OUT.length !== 1) throw new Error('batch92 OUT tally drift');
if (BATCH92_REFUSED.length !== 0) throw new Error('batch92 REFUSED tally drift');
if (BATCH92_CONFIRMED_NONE.length !== 1) throw new Error('batch92 confirmed-none tally drift');
if (BATCH92_SKIPPED_OUT[0]?.sku !== 'sprouts-organic-prenatal-whole-food') {
  throw new Error('batch92 OUT must stay the Sprouts prenatal');
}
if (!/SKIPPED OUT/.test(BATCH92_SKIPPED_OUT[0].reason) || !/Not a no_OI leftover/.test(BATCH92_SKIPPED_OUT[0].reason)) {
  throw new Error('batch92 OUT reason must stay out of scope');
}
if (BATCH92_CONFIRMED_NONE[0]?.sku !== 'now-sports-creatine-monohydrate-8') {
  throw new Error('batch92 confirmed-none must stay the NOW creatine 8 oz');
}
if (!/Other Ingredients: None/.test(BATCH92_CONFIRMED_NONE[0].reason)) {
  throw new Error('batch92 confirmed-none must quote the printed panel');
}
if (!/733739020307/.test(BATCH92_CONFIRMED_NONE[0].reason)) {
  throw new Error('batch92 confirmed-none must keep the existing UPC');
}
const _blob = [
  ..._ROWS.map((r) => `${r.brand} ${r.productName} ${r.id}`),
  ...BATCH92_SKIPPED_NO_OI.map((s) => s.sku),
  ...BATCH92_REFUSED.map((s) => s.reason),
].join('\n');
if (/a\+health|healtha2z|time-cap|goodsense|toothpaste|sprouts/i.test(_blob)) {
  throw new Error('batch92 must not write Sprouts, toothpaste, or the held 3P brands');
}
