# KYR5-d — Claritin US OTC second ladder (barcode-only)

Barcode-only override. No new products, rows, grades, panels, formulas, names, or oil-info. batch70 through batch145 were not edited. batch144 and batch145 still throw if any of their own rows has a barcode.

`lib/scan-preview/previewCatalog.ts` builds `CATALOG` with `uniqueById` and keeps the first record per id. `BATCH146_KYR5D_CLARITIN_UPC_OVERRIDE` is a spread copy of nine existing batch144 / batch145 rows with `barcode` set, and it is placed in `CATALOG` before the batch144 and batch145 spreads. The source arrays are not mutated. Scan browse reads `loadedPreviewDrafts()`, which is that catalog. No other file in `lib/` or `app/` builds a barcode index from the raw batch arrays.

## Attached (9)

| Row id | Code | Source | Evidence |
| --- | --- | --- | --- |
| `claritin-b144-tablets-starch-40` | `041100803634` | batch144 | Walmart ip/36442143 upc; 40ct starch, carton NDC 11523-7237-7 4x10 blister |
| `claritin-b144-tablets-starch-90` | `041100806888` | batch144 | Amazon B001N0LW0S UPC field, 90ct starch panel; buycott agrees |
| `claritin-b144-liquigels-40` | `041100810533` | batch144 | Walmart ip/36442146 upc; carton NDC 11523-7200-8; buycott/upcitemdb agree |
| `claritin-b144-reditabs-60` | `041100598608` | batch144 | Target A-89629472 primary_barcode; CVS prodid-485609 and Walgreens 300441120 spec 04110059860+8 agree |
| `claritin-b144-reditabs-70` | `041100585301` | batch144 | Costco 100501351 item 1347960 upc; Costco Business Delivery agrees; single 70ct carton |
| `claritin-b144-chew-cool-mint-24` | `041100580986` | batch144 | Walgreens 300399128 spec 04110058098 + check 6, 24.0 ea; Amazon B08494W7PP agrees |
| `claritin-b144-kids-syrup-5oz` | `041100811042` | batch144 | Walmart ip/186341930 upc; 5 FL OZ 150 mL grape |
| `claritin-b145-chew-grape-30` | `041100809551` | batch145 | Walmart ip/32180063 upc; 30ct grape, drug facts match dyed formula |
| `claritin-b145-adult-liquid-80ml` | `041100595409` | batch145 | CVS prodid-560929 upcNumber, 2.7 FL OZ 80 mL Cooling Honey; Walgreens 300449079 spec 04110059540+9 agrees |

None of these nine codes was already present in `lib/` on MAIN. Each id exists exactly once in batch144 or batch145, and the source row had no barcode.

## Already on MAIN (14) — not re-added

| Row | Code | Note |
| --- | --- | --- |
| mcc-5 | `041100080226` | Already on MAIN |
| mcc-10 | `041100080165` | Already on MAIN |
| mcc-20 and starch-20 | `041100080189` | Shared code, already on MAIN |
| mcc-30 | `041100810984` | Already on MAIN |
| mcc-45 and b136-tablets-45 | `041100806147` | Shared code, already on MAIN |
| mcc-70 | `041100809643` | Already on MAIN |
| starch-100 | `041100575678` | Already on MAIN (`claritin-b136-tablets-100-mcc`) |
| reditabs-10 | `041100806024` | Already on MAIN |
| d24-talc-10 | `041100810861` | Talc carton FC008192 prints the same GTIN as the ethylcellulose 10ct |
| d24-talc-15 | `041100810885` | Likely shared with the ethylcellulose 15ct |
| grape-10 | `041100810748` | Already on MAIN |
| adult-liquid-240ml | `041100595416` | Already on MAIN (`claritin-allergy-liquid`) |

Those 14 rows were not given a second copy of a code that is already on MAIN.

## Line-unproven (5) — not attached

- starch-85 / mcc-85 `041100581273`. Walmart 571752717 is a 70+15 bonus. PDP text says MCC; the carton image says starch.
- grape-20 `041100806574`. The listing mixes dyed and dye-free `041100598783`.
- grape-40 `041100575685`. DailyMed `f3b9c643` is a different formula.
- grape-50 `041100809810`. Search-index title only.

## Kit / multipack (4) — not attached

- starch-105. Costco 45+60.
- starch-115 `041100595249`. 45+70 two-bottle MCC.
- bubblegum-40 `041100593955`. Grape + bubblegum kit. Walmart `041100570697` shows a 30ct carton.
- grape-80 `041100597878`. BJ's item 306185 outer carton holding two 40ct cartons. Costco `041100603180` is the `f3b9c643` formula.

## Still missing (30 named rows)

The hunt note counted 29. The named list below is 30 rows. None of them received a code.

- mcc-40
- mcc-60
- mcc-85
- starch-15 (Walmart 150670390 10+5 bonus `041100805102` has no image or pack detail)
- starch-25
- starch-35
- starch-55
- starch-60
- starch-80
- starch-108
- starch-110
- liquigels-5
- liquigels-36
- liquigels-70
- liquigels-100
- reditabs-20
- reditabs-40
- reditabs-50
- cool-mint-2
- cool-mint-4
- cool-mint-56 (Kroger PDP unavailable in a real browser)
- cool-mint-64 (`041100581006` only as a nazya.com listing title; barcodeindex Cloudflare-blocked in a real browser)
- kids-syrup-1oz
- kids-syrup-2oz
- kids-syrup-6oz
- b136-d24-ec-5 (discontinued, no GTIN)
- grape-2
- grape-60 (Giant Food 60ct dyed exists but shows no UPC)
- grape-100
- adult-liquid-30ml

## Possible MAIN issues (not changed)

- `041100575678` is on `claritin-b136-tablets-100-mcc` while Walmart lists starch inactives.
- `041100808707` on the 50ct row (`claritin-b136-tablets-50`) is tied by openFDA to the starch label, not to a count.
