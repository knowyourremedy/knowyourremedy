# KYR5-d — Zyrtec UPC audit, batch134

Scope is the Zyrtec search rows added or edited by PR #390 (`e1a0d1a`, batch132) and PR #391 (`491f9f3`, batch133). `previewCatalog` lists batch133 before batch132, so `uniqueById` keeps the batch133 row when the id collides. Already-on-MAIN Zyrtec rows were not in those diffs and were not edited. No new products or rows.

Barcode-only. Check digit is the GS1 GTIN-12 digit. An NDC was not turned into a UPC.

## Rows in scope

| Row id | productName | Pack | Form | Barcode at audit start |
| --- | --- | --- | --- | --- |
| `zyrtec-b132-10mg-45ct` | Zyrtec Allergy Tablets 10mg (45ct) | 45 count | film-coated tablet | `300450204653` |
| `zyrtec-b132-10mg-90ct` | Zyrtec Allergy Tablets 10mg (90ct) | 90 count | film-coated tablet | `300450206909` |
| `zyrtec-b132-10mg-120ct` | Zyrtec Allergy Tablets 10mg (120ct) | 120 count | film-coated tablet | `300450206121` |
| `zyrtec-b132-5mg-15ct` | Zyrtec Allergy Tablets 5mg (15ct) | 15 count | film-coated tablet | empty |
| `zyrtec-b132-5mg-35ct` | Zyrtec Allergy Tablets 5mg (35ct) | 35 count | film-coated tablet | `300450256355` |
| `zyrtec-b132-d-12ct` | Zyrtec-D Allergy + Congestion Extended-Release Tablets (12ct) | 12 count | extended-release tablet | empty on the search row (batch133 wins). Shadowed batch132 copy started with filename code `300450204271` |
| `zyrtec-b132-d-24ct` | Zyrtec-D Allergy + Congestion Extended-Release Tablets (24ct) | 24 count | extended-release tablet | `300450204240` |
| `zyrtec-b132-hives-tab-30ct` | Zyrtec Hives Tablets 10mg (30ct) | 30 count | film-coated tablet | `300450138323` |
| `zyrtec-b132-hives-syrup-4oz` | Children's Zyrtec Hives Syrup (4 fl oz) | 4 fl oz | liquid | `300450139146` |
| `zyrtec-b132-kids-chew-10mg-24ct` | Children's Zyrtec Chewable Tablets 10mg (24ct) | 24 count | chewable tablet | `300450241245` |
| `zyrtec-b132-kids-chew-10mg-48ct` | Children's Zyrtec Chewable Tablets 10mg (48ct) | 48 count | chewable tablet | `300450241481` |
| `zyrtec-b132-kids-chew-10mg-72ct` | Children's Zyrtec Dye-Free Chewable Tablets 10mg (72ct) | 72 count, dye-free | chewable tablet | `300450241283` |
| `zyrtec-b132-dye-free-chew-24ct` | Zyrtec Dye-Free Chewable Tablets 10mg (24ct) | 24 count, dye-free, adult | chewable tablet | `300450250247` |
| `zyrtec-b132-kids-dissolve-24ct` | Children's Zyrtec Dissolve Tabs 10mg (24ct) | 24 count | orally disintegrating tablet | `300450242259` |
| `zyrtec-b132-adult-dissolve-24ct` | Zyrtec Allergy Dissolve Tabs 10mg (24ct) | 24 count | orally disintegrating tablet | `300450242242` |
| `zyrtec-b132-adult-dissolve-12ct` | Zyrtec Allergy Dissolve Tabs 10mg (12ct) | 12 count | orally disintegrating tablet | empty |
| `zyrtec-b132-gels-25ct` | Zyrtec Allergy Liquid Gels 10mg (25ct) | 25 count | liquid gel | `300450204257` |
| `zyrtec-b132-gels-65ct` | Zyrtec Allergy Liquid Gels 10mg (65ct) | 65 count | liquid gel | `300450204677` |
| no row (batch132 `BATCH132_SKIPPED_NO_OI`) | Children's Zyrtec Allergy Syrup 8 fl oz | 8 fl oz | liquid | no row |

## Counts

- Kept: 14
- Blanked: 2
- Newly attached: 1
- Still empty: 3

## Kept

| Row id | Product | Pack | Form | UPC | Source URL | How read |
| --- | --- | --- | --- | --- | --- | --- |
| `zyrtec-b132-10mg-45ct` | Zyrtec Allergy Tablets 10mg (45ct) | 45 count | film-coated tablet | `300450204653` | https://www.activaterewards.com/newyear/participating-products | Kenvue Product UPC cell: 10mg Tablets, 45 ct. zyrtec.com 45-count `eanUpc` is empty; the image filename was not the source. |
| `zyrtec-b132-10mg-90ct` | Zyrtec Allergy Tablets 10mg (90ct) | 90 count | film-coated tablet | `300450206909` | https://www.target.com/p/zyrtec-24-hour-allergy-relief-tablets-cetirizine-hcl-90ct/-/A-79847257 | Target `primary_barcode` on the 90ct tablet PDP. Same code in the Kenvue Product UPC cell for 10mg Tablets, 90 ct. |
| `zyrtec-b132-10mg-120ct` | Zyrtec Allergy Tablets 10mg (120ct) | 120 count | film-coated tablet | `300450206121` | https://www.activaterewards.com/newyear/participating-products | Kenvue Product UPC cell: 120 ct. 10mg Tablets. zyrtec.com 120-count `eanUpc` is empty. |
| `zyrtec-b132-5mg-35ct` | Zyrtec Allergy Tablets 5mg (35ct) | 35 count | film-coated tablet | `300450256355` | https://www.target.com/p/zyrtec-adult-treatment-5mg-cetirizine-tablet-35ct/-/A-94505519 | Target `primary_barcode` on the 5 mg 35ct tablet PDP. Same code in the Kenvue Product UPC cell for Tablet 5mg, 35 ct. |
| `zyrtec-b132-d-24ct` | Zyrtec-D 24-count | 24 count | extended-release tablet | `300450204240` | https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=f1ecf9ba-1c03-7fb7-e053-2a95a90a875a&name=Zyrtec-1.jpg | Pre-confirmed retailer GTIN. DailyMed label image decodes EAN-13 `0300450204240` on NDC 50580-719-24. Not blanked. |
| `zyrtec-b132-hives-tab-30ct` | Zyrtec Hives Tablets 10mg (30ct) | 30 count | film-coated tablet | `300450138323` | https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=31136e3a-94fa-0860-e063-6394a90a008d&name=zyrtec-1.jpg | DailyMed label image decodes EAN-13 `0300450138323` on the 30-tablet hives carton (NDC 50580-116-30). zyrtec.com `eanUpc` / `gtin12` and the Kenvue Product UPC cell match. |
| `zyrtec-b132-hives-syrup-4oz` | Children's Zyrtec Hives Syrup (4 fl oz) | 4 fl oz | liquid | `300450139146` | https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=31400cb2-fe85-ef74-e063-6294a90a11fb&name=zyrtec_1+.jpg | Digits under the bars on the DailyMed label read `300450139146` next to 4 fl oz (118 mL) grape hives syrup. Kenvue Product UPC cell: Hives Defence Liquid Grape, 4 fl oz. |
| `zyrtec-b132-kids-chew-10mg-24ct` | Children's Zyrtec Chewable Tablets 10mg (24ct) | 24 count, dye-free grape, ages 6+ | chewable tablet | `300450241245` | https://www.target.com/p/zyrtec-children-39-s-dye-free-cetirizine-10mg-chewables-grape-24ct/-/A-86213580 | Target `primary_barcode` on Children's Dye Free 10 mg grape chewables, 24ct. Kenvue Product UPC cell matches under Children's Zyrtec, 6 yrs & older. |
| `zyrtec-b132-kids-chew-10mg-48ct` | Children's Zyrtec Chewable Tablets 10mg (48ct) | 48 count, dye-free grape, ages 6+ | chewable tablet | `300450241481` | https://www.activaterewards.com/newyear/participating-products | Kenvue Product UPC cell under Children's Zyrtec, 6 yrs & older: Dye-Free Chewable Tabs Grape Flavor, 48 ct. The 2.5 mg chews are a separate 2-years-and-older block. |
| `zyrtec-b132-kids-chew-10mg-72ct` | Children's Zyrtec Dye-Free Chewable Tablets 10mg (72ct) | 72 count, dye-free grape | chewable tablet | `300450241283` | https://www.costco.com/p/-/childrens-zyrtec-allergy-cetirizine-hcl-10-mg-dye-free-grape-flavored-chewables-72-tablets/1794121 | Costco `upc` field `300450241283` on the 72-tablet dye-free grape chewables item. Pre-confirmed. Not blanked. |
| `zyrtec-b132-dye-free-chew-24ct` | Zyrtec Dye-Free Chewable Tablets 10mg (24ct) | 24 count, adult dye-free | chewable tablet | `300450250247` | https://www.target.com/p/zyrtec-adult-dye-free-cetirizine-10mg-chewables-24ct/-/A-86213579 | Target `primary_barcode` on the adult dye-free 10 mg chewables, 24ct. zyrtec.com `eanUpc` and `gtin12` match. Not the children's grape chew. |
| `zyrtec-b132-kids-dissolve-24ct` | Children's Zyrtec Dissolve Tabs 10mg (24ct) | 24 count, citrus | orally disintegrating tablet | `300450242259` | https://www.target.com/p/children-39-s-zyrtec-allergy-relief-cetirizine-dissolving-tablets-citrus-24ct/-/A-51813387 | Target `primary_barcode` on the children's citrus dissolve 24ct PDP. Kenvue Product UPC cell matches. The children's 12ct code `300450242136` stays on the MAIN row. |
| `zyrtec-b132-adult-dissolve-24ct` | Zyrtec Allergy Dissolve Tabs 10mg (24ct) | 24 count, citrus | orally disintegrating tablet | `300450242242` | https://www.activaterewards.com/newyear/participating-products | Kenvue Product UPC cell: 10mg Dissolve Tabs Citrus Flavor, 24 ct. zyrtec.com JSON-LD `gtin` `00300450242242` is the same code. |
| `zyrtec-b132-gels-25ct` | Zyrtec Allergy Liquid Gels 10mg (25ct) | 25 count | liquid gel | `300450204257` | https://www.target.com/p/zyrtec-24-hour-allergy-relief-capsules-cetirizine-hcl-25ct/-/A-12050382 | Target `primary_barcode` on the 25ct liquid-gel PDP. Kenvue Product UPC cell: Liquid Gels, 25 ct. The DailyMed gel image barcode `300450204318` is the 12-count liquid gel (Kenvue size 12 ct.), not this row. |

## Blanked

| Row id | Old code | Why |
| --- | --- | --- |
| `zyrtec-b132-gels-65ct` | `300450204677` | zyrtec.com 65-count `eanUpc` is empty. The digits sit in the image filename and image title. The only Product UPC field that contains this code is a 15 pc tray of "65 ct. 10mg LIQUID GELS (25 + 40)" on the Kenvue rewards list, which is a tray of the 25-count plus 40-count combo, not a single 65-count carton spec. DailyMed setid `0face45c` decodes `300450204318`, the 12-count liquid gel. Blanked. |
| `zyrtec-b132-d-12ct` (shadowed batch132 copy) | `300450204271` | Filename and image-title only on zyrtec.com. The search row is the batch133 copy, which already had no barcode. The `barcode` line on the batch132 copy was removed. The `source` string still names that code; no test asserts it. |

## Newly attached

| Row id | Product | Pack | Form | UPC | Source URL | How read |
| --- | --- | --- | --- | --- | --- | --- |
| `zyrtec-b132-5mg-15ct` | Zyrtec Allergy Tablets 5mg (15ct) | 15 count | film-coated tablet | `300450256157` | https://www.activaterewards.com/newyear/participating-products | Kenvue Product UPC cell: Tablet 5mg, 15 ct. The DailyMed 5 mg label image (setid `2c1ecee3-c2c1-25a2-e063-6294a90aad54`, `zyrtec-01.jpg`) is 15 portable pouches, one 5 mg tablet per pouch, and the bars decode to the same EAN-13 `0300450256157`. Not used for the 35-count. Check digit valid. Not present elsewhere in `lib/`. |

## Still empty

| Row id | Reason | Last URLs tried |
| --- | --- | --- |
| `zyrtec-b132-d-12ct` | Search row stays empty. 12-count `eanUpc` on zyrtec.com is empty. The filename code `300450204271` was blanked on the shadowed batch132 copy (see Blanked) and was not attached here. The page JSON-LD GTIN `00300450204240` is the 24-count. No 12-count Product UPC cell on the Kenvue list. | https://www.zyrtec.com/products/zyrtec-d ; https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f1ecf9ba-1c03-7fb7-e053-2a95a90a875a ; https://www.activaterewards.com/newyear/participating-products |
| `zyrtec-b132-adult-dissolve-12ct` | Current adult dissolve page has a Citrus 24-count variant. `eanUpc` for a 12-count adult dissolve did not open. `300450242136` is the children's 12ct dissolve already on MAIN. | https://www.zyrtec.com/products/zyrtec-adult-dissolve-tabs ; https://www.target.com/p/zyrtec-oral-allergy-and-sinus-dissolve-cetirizine-tablets-24ct/-/A-93368630 (404) ; https://www.activaterewards.com/newyear/participating-products |
| no row — Children's Zyrtec Allergy Syrup 8 fl oz | Still `no_OI`. No row was added. A Product UPC cell does exist for Children's Zyrtec 1 mg/mL grape dye/sugar-free syrup, 8 fl oz, `300450209146`. Attaching it would create a product row. The zyrtec.com "8 ounces" image title is the hives 4 fl oz file (`300450139146`), so that image was not used. | https://www.zyrtec.com/products/zyrtec-children-allergy-syrup ; https://www.activaterewards.com/newyear/participating-products ; https://www.cvs.com/search?searchTerm=zyrtec%2045%20count (403) |

## Sites that did not return a pack spec

Walmart search returned a robot wall. Amazon search returned 503. Meijer and CVS returned 403. Kroger fetch returned no body. H-E-B and Sam's Club returned bot checks. Rite Aid search did not land on a Zyrtec PDP. Those misses are why 12-count Zyrtec-D, 12-count adult dissolve, and the unwritten 8 fl oz syrup stay empty, and why the 65-count was not reassigned from the tray row.
