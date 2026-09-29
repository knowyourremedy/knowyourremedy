# Batch 137 — Allegra US OTC first slice

Tally: 21 written. Clean 0 / Caution 3 / Avoid 18. NEW 21 / REUSE 7 / SKIPPED no_OI 0 / SKIPPED OUT 26 / REFUSED 1. REUSE 7 = 0 written rows on an existing formula + 7 already-on-MAIN packs.

Allegra-D 12 Hour keeps its own formulaId. It does not share `allegra-b137-film-tablets`. Allegra-D 24 Hour is not written.

## Written

- Allegra Allergy 24 Hour Tablets (5ct) film-coated tablet Avoid. NEW `allegra-b137-film-tablets`. UPC 041167412008, Target primary_barcode field, package quantity 5.
- Allegra Allergy 24 Hour Tablets (45ct) film-coated tablet Avoid. Same film-tablet formula. UPC empty. DailyMed setid 81c1dcbb, NDC 41167-4120-4, one 45-tablet bottle.
- Allegra Allergy 24 Hour Tablets (40ct) film-coated tablet Avoid. Same film-tablet formula. UPC empty. NDC 41167-4121-4, one 40-tablet bottle.
- Allegra Allergy 24 Hour Tablets (60ct) film-coated tablet Avoid. Same film-tablet formula. UPC empty. NDC 41167-4121-1, one 60-tablet bottle. Not the gelcap 60ct.
- Allegra Allergy 24 Hour Tablets (90ct) film-coated tablet Avoid. Same film-tablet formula. UPC 041167412404, Target primary_barcode field, package quantity 90.
- Allegra Allergy 24 Hour Tablets (100ct) film-coated tablet Avoid. Same film-tablet formula. UPC 041167412480, Target primary_barcode field, package quantity 100.
- Allegra Allergy 12 Hour Tablets (12ct) film-coated tablet Avoid. Same film-tablet formula. 60 mg. UPC 041167413128, Target primary_barcode field. Title 12-ct. Other information NDC 41167-4131-2.
- Allegra Allergy 12 Hour Tablets (24ct) film-coated tablet Avoid. Same film-tablet formula. UPC 041167413142, Target primary_barcode field, package quantity 24. Two 12-count blisters in one carton.
- Allegra Allergy 12 Hour Tablets (36ct) film-coated tablet Avoid. Same film-tablet formula. UPC empty. NDC 41167-4131-6, three 12-count blisters in one carton.
- Allegra Hives 24 Hour Tablets (5ct) film-coated tablet Avoid. Same film-tablet formula. UPC empty. DailyMed setid 490b4c5f, NDC 41167-4126-8.
- Allegra Hives 24 Hour Tablets (15ct) film-coated tablet Avoid. Same film-tablet formula. UPC empty. NDC 41167-4126-3, one 15-tablet bottle.
- Allegra Hives 24 Hour Tablets (30ct) film-coated tablet Avoid. Same film-tablet formula. UPC 041167412640, Target primary_barcode field, package quantity 30.
- Allegra Allergy 24 Hour Gelcaps (8ct) gelcap Avoid. NEW `allegra-b137-gelcaps`. UPC empty. DailyMed setid f061d6b1 panel "8 GELCAPS".
- Allegra Allergy 24 Hour Gelcaps (24ct) gelcap Avoid. Same gelcap formula. UPC 041167412213, Target primary_barcode field, package quantity 24.
- Allegra Allergy 24 Hour Gelcaps (60ct) gelcap Avoid. Same gelcap formula. UPC 041167412220, Target primary_barcode field, package quantity 60.
- Children's Allegra Allergy Orally Disintegrating Tablets, Orange Cream (24ct) orally disintegrating tablet Avoid. NEW `allegra-b137-kids-odt`. UPC 041167423264, Target primary_barcode field, package quantity 24. Ages 6+.
- Children's Allegra Allergy Oral Suspension, Berry (8 fl oz) liquid Avoid. NEW `allegra-b137-kids-liquid`. UPC 041167424414, Target primary_barcode field. Title 8 fl oz. Ages 2+.
- Children's Allegra Hives Oral Suspension, Grape (240 mL) liquid Avoid. Same liquid formula. UPC 041167422717, allegra.com schema.org sku field `0-41167-42271-7`. Ages 6+. Carton says grape. Drug facts print flavor.
- Allegra-D 12 Hour (10ct) ER tablet Caution. NEW `allegra-b137-d12`. UPC empty. DailyMed setid b32e172a, NDC 41167-4310-2.
- Allegra-D 12 Hour (20ct) ER tablet Caution. Same 12-hour D formula. UPC empty. Two 10-count blisters in one carton.
- Allegra-D 12 Hour (30ct) ER tablet Caution. Same 12-hour D formula. UPC empty. Panel "30 Tablets".

## Already on MAIN (not rewritten)

- `allegra-allergy-24hr` — 180 mg film-coated tablets. Opened Target size tabs already on this row: 15ct UPC 041167412381, 30ct UPC 041167412510, 70ct UPC 041167412060. The same row also carries UPC 041167412749. That code was not on a Target size tab, and its count was not opened, so it was not reassigned.
- `allegra-d-24hr` — UPC 041167432075. Count not pinned. The current 10ct and 15ct are refused below. This row was not rewritten.
- `childrens-allegra-odt` — UPC 041167423332. That code is not the current 24ct.
- `childrens-allegra-liquid` — UPC 041167424445. Target berry 4 fl oz tab is this code.

## Still-empty UPCs

No 12-digit Product UPC or GTIN was opened for that exact pack. Walgreens search returned 405. Walmart returned a robot wall. CVS returned 403. Kroger did not open. Costco search HTML had no Allegra product. Amazon search did not print a Product UPC field. Target size tabs on the opened tablet page were 5, 15, 30, 70, 90, and 100. Target gelcap tabs were 24 and 60. Target hives tablets opened at 30ct only. Target had no Allegra-D page in this hunt. allegra.com prints one sku per product page, not one sku per count, so those page-level skus were not copied onto a guessed count. DailyMed NDCs were not copied as UPCs.

- 45ct, 40ct, and 60ct film-coated tablets
- 12 Hour tablets 36ct
- Hives tablets 5ct and 15ct
- Gelcaps 8ct
- Allegra-D 12 Hour 10ct, 20ct, and 30ct

## no_OI

None. Every current Chattem pack was written, already on MAIN, OUT, or refused.

## OUT

- Select Consumer Group Allegra tablets. setid 2de81a41.
- Lil' Drug Store / Travel Basix Allegra tablets. setid b82d993a.
- Navajo Manufacturing Allegra tablets. setid e8a00fa1.
- A-S Medication Solutions Allegra-D. setid 705e1087.
- A-S Medication Solutions Allegra tablets. setid b5ce28f8.
- Select Corporation Allegra tablets. setid 78d2742f.
- Physicians Total Care Allegra-D 24 Hour. setid f7036088.
- Physicians Total Care Allegra-D 12 Hour. setid 4021a77c.
- Rebel Distributors Allegra-D 12 Hour. setid 9ab3a26c.
- Stat Rx Allegra-D 24 Hour. setid 741e8b74.
- 45-count bottle 2-pack. NDC 41167-4120-5. Marketing ended 20220701.
- 30-count bottle 2-pack. NDC 41167-4121-5. Marketing ended 20180201.
- 55-count bottle. It exists only as the inner of 2-pack NDC 41167-4124-3.
- Gelcap 40-count 2-pack. NDC 41167-4122-9. Marketing ended 20190623.
- Allergy liquid 3×120 mL cello pack. NDC 41167-4244-7.
- 2-count tablet carton. NDC 41167-4120-1. Marketing ended 20191001.
- 1-count sample pouches and packages. NDC 41167-4121-2, 41167-4121-3, and 41167-4121-0. Marketing ended.
- 37-count bottle. NDC 41167-4121-6. Marketing ended 20170404.
- 54-count bottle. NDC 41167-4121-7. Marketing ended 20170303.
- 84-count bottle. NDC 41167-4124-7. Marketing ended 20230430.
- Gelcap 32-count. NDC 41167-4122-6. Marketing ended 20230101.
- Children's ODT 12-count. NDC 41167-4232-1. Marketing ended 20241201.
- Allegra-D 24 Hour 5-count. NDC 41167-4320-3. Marketing ended 20190301.
- Store-brand fexofenadine (Equate, Amazon, Welmate, HealthA2Z, CVS, Walgreens, and the rest). Not the Allegra brand.
- Canada and EU locale pages on allegra.com (Telfast, Allevia, Allegra Pediátrico). Not US OTC.
- Product code 41167-4246, 120 mL and 240 mL. Same inactive paragraph as 41167-4244. No separate flavor panel was opened, so it is not a second Search row.

## Refused

- `cellulose acetate` on Allegra-D 24 Hour. Current packs not written: 10ct (NDC 41167-4320-5, two 5-count blisters) and 15ct (NDC 41167-4320-7, panel "15 Tablets"). DailyMed setid 1fb77d6a.

7-step for cellulose acetate: EFSA/EU has no locked food-additive grade that maps this polymer. FDA/IID use as an osmotic membrane is context only, not Clean. IARC, NTP, and Prop 65 do not place this string on an existing High row. It is not cellulose, microcrystalline cellulose, hydroxypropyl cellulose, or hypromellose acetate succinate. Primary use on this panel is the semipermeable osmotic membrane. No founder stamp. Exact-string refuse. Acetone, isopropyl alcohol, glycerol triacetate, talc, titanium dioxide, FD&C blue #1 aluminum lake, polyethylene glycol, and propylene glycol on the same panel do map. They are not the blocker. The existing `allegra-d-24hr` row was not rewritten.
