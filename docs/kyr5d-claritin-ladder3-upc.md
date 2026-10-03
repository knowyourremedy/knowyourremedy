# KYR5-d — Claritin US OTC ladder 3 (barcode-only)

Barcode-only override. No new products, rows, grades, panels, formulas, names, or oil-info. batch70 through batch146 were not edited. Notes files were not edited.

`lib/scan-preview/previewCatalog.ts` builds `CATALOG` with `uniqueById` and keeps the first record per id. `BATCH147_KYR5D_CLARITIN_UPC_OVERRIDE_3` is a spread copy of three existing rows (`{...record, barcode}`) with `barcode` set. It is placed in `CATALOG` before `BATCH136_KYR6B_CLARITIN_FIRST_SLICE` and before `BATCH146_KYR5D_CLARITIN_UPC_OVERRIDE`. batch136 sits earlier than batch146, so the override has to precede batch136 for first-id-wins on `claritin-b136-d24-ec-5`. The other two ids live in batch144, which is later. No earlier spread contains these three ids: the only record definitions are in batch136 and batch144. Source arrays are not mutated. Load throws on a missing or duplicate id, a bad UPC-A check digit, a duplicate code, a source row that already has a barcode, or an id that is already in batch146.

batch136 self-checks (row count 24, duplicate barcode, 12-digit width) run on batch136's own array. They are unchanged.

Scan browse reads `loadedPreviewDrafts()`, which is that catalog. A grep of `lib/` and `app/` on MAIN found none of these three codes.

## Attached (3)

| Row id | Code | Source | Evidence |
| --- | --- | --- | --- |
| `claritin-b144-chew-cool-mint-56` | `041100580993` | batch144 | Kroger product image set GTIN 0004110058099 bottom face: bars decode 0041100580993, printed `0 41100 58099 3`; front/side `Cool Mint 56 CHEWABLE TABLETS`; Drug Facts inactives aspartame, FD&C Blue 1 Al lake, menthol, MCC, sodium starch glycolate (cool-mint line); row NDC 11523-4364-4, 7 blisters of 8. |
| `claritin-b136-d24-ec-5` | `041100080493` | batch136 | DailyMed setid 3ea6a90b-8cb1-46b0-9ff7-be7090245e53 version 1 zip image claritin-01.jpg: bars decode 041100080493, printed `0 41100 08049 3`, carton `5 EXTENDED RELEASE TABLETS`, NDC 11523-4332-1, inactives carnauba wax, ethylcellulose (matches the row's EC formula). Kroger GTIN 0004110081084 (041100810847) is a newer 5ct front-only photo, not used. |
| `claritin-b144-tablets-starch-80` | `041100810830` | batch144 | Walmart ip/110629410 product.upc 041100810830 and Kroger PDP kroger.com/p/claritin/0004110081083 UPC field 0004110081083, title `Claritin Allergy Relief Tablets Loratadine, 70+10 count`, one bottle `80 [70] / 10 FREE`, inactives corn starch, lactose monohydrate, magnesium stearate (starch line, not MCC). |

## Still empty (31)

### Code found but not attached (8)

- starch-15 `041100805102`: Walmart 150670390 + Kroger; 10+5 bonus carton NDC 11523-7160-2, but the row is NDC 7237-6, 3 blisters of 5, so a different package.
- starch-60 `041100808332`: Kroger image GTIN key + front only, NDC 7160-9; Kroger PDP `Product Unavailable`; no UPC field or bars.
- reditabs-40 `041100806413`: Kroger front only, 30+10 bonus NDC 7157-9 vs row 7157-7 4x10; a Google-cited Amazon snippet calls this code a 30ct.
- grape-60 `041100585196`: Kroger PDP UPC field 0004110058519 with dyed inactives (D&C Red 27, FD&C Blue 2), but it is a single Kroger-family source; Meijer's 60ct grape shows a different code 041100598813 and an eBay listing carries both, so the code is not proven unique to this pack.
- grape-20 `041100806574`: Kroger PDP `CLAR CHLD CHEW W/ ALT EAS & CPN 20CT 3DZ` (coupon/display pack title), no inactives; Walgreens 20ct is dye-free 041100598783.
- starch-85 `041100581273`: Kroger 70+15 bonus, no inactives; Walmart text MCC vs carton starch.
- grape-40 `041100575685`: Amazon lists it as Dye-free 40; DailyMed f3b9c643 different formula.
- grape-50 `041100809810`: barcodeindex extract only.

### No code found (23)

- mcc-40
- mcc-60
- mcc-85
- starch-25
- starch-35
- starch-55
- starch-108
- starch-110
- liquigels-5
- liquigels-36
- liquigels-70
- liquigels-100
- reditabs-20
- reditabs-50
- cool-mint-2
- cool-mint-4
- cool-mint-64 (`041100581006` only in a lookup database)
- kids-syrup-1oz
- kids-syrup-2oz
- kids-syrup-6oz
- grape-2
- grape-100
- adult-liquid-30ml

## Ladder opened

DailyMed all 147 versions of 17 Bayer setids (zbar + visual); claritin.com sitemap + 42 product pages (no count tabs/UPC fields); CVS 12 product ids via API; Walgreens product API 18 ids; Target 22 PDPs; Walmart 27 searches; Amazon 14 PDPs; Kroger image CDN ~6,300 GTINs + 7 rendered PDPs; Giant 376655; Meijer search (18 Claritin items); Google with cited pages. Blocked in a real browser on 2026-10-02: Amazon (unauthorized-agent wall), Target PDP and Walmart (press-and-hold failed), Walgreens search (challenge), CVS search (placeholders only), eBay search (challenge). Packs whose ladder hit those blocks remain open.

## OUT, not re-hunted

The 4 kit/multipack rows (starch-105, starch-115, bubblegum-40, grape-80). Leave `041100575678` and `041100808707` unchanged.
