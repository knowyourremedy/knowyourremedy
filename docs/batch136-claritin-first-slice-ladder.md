# Batch 136 — Claritin US OTC first slice

Tally: 24 written. Clean 5 / Caution 1 / Avoid 18. NEW 16 / REUSE 15 / SKIPPED no_OI 0 / SKIPPED OUT 11 / REFUSED 0. REUSE 15 = 8 written rows on an existing formula + 7 already-on-MAIN Claritin rows.

Claritin-D 12-hour and both Claritin-D 24-hour panels keep their own formulaIds. They do not share `claritin-allergy-tablets-plain`.

## Written

- Claritin 24-Hour Allergy Tablets (30ct) tablet Clean. REUSE `claritin-allergy-tablets-plain`. UPC 041100810984, Target primary_barcode field.
- Claritin 24-Hour Allergy Tablets (70ct) tablet Clean. REUSE `claritin-allergy-tablets-plain`. UPC 041100809643, Target primary_barcode field.
- Claritin 24-Hour Allergy Tablets (45ct) tablet Clean. REUSE `claritin-allergy-tablets-plain`. UPC empty. DailyMed setid 660ac9df panel "45 Count Window Box".
- Claritin 24-Hour Allergy Tablets (50ct) tablet Clean. REUSE `claritin-allergy-tablets-plain`. UPC empty. DailyMed setid 660ac9df panel "50 Tablet Carton".
- Claritin 24-Hour Allergy Tablets (100ct) tablet Clean. NEW `claritin-b136-tablets-mcc` (lactose monohydrate, magnesium stearate, microcrystalline cellulose, sodium starch glycolate). UPC 041100575678, Target primary_barcode field. DailyMed setid dc65f7ec, 100-tablet bottle.
- Claritin Liqui-Gels (10ct) liquid-filled capsule Avoid. NEW `claritin-b136-liquigels`. UPC 041100806109, Target UPC field.
- Claritin Liqui-Gels (30ct) liquid-filled capsule Avoid. Same liqui-gel formula. UPC 041100807984, Target primary_barcode field.
- Claritin Liqui-Gels (60ct) liquid-filled capsule Avoid. Same liqui-gel formula. UPC 041100576859, Target primary_barcode field.
- Children's Claritin Chewable Tablets, Bubblegum (10ct) chewable tablet Avoid. NEW `claritin-b136-chew-bubblegum`. UPC empty. DailyMed setid 20938e05, 10 chewable tablets.
- Children's Claritin Chewable Tablets, Bubblegum (30ct) chewable tablet Avoid. Same bubblegum formula. UPC 041100598714, Target primary_barcode field.
- Children's Claritin Chewable Tablets, Dye-Free Grape (10ct) chewable tablet Avoid. NEW `claritin-b136-chew-dye-free`. UPC 041100598776, Target primary_barcode field.
- Children's Claritin Chewable Tablets, Dye-Free Grape (30ct) chewable tablet Avoid. Same dye-free formula. UPC 041100598790, Target primary_barcode field.
- Children's Claritin Chewable Tablets, Dye-Free Grape (60ct) chewable tablet Avoid. Same dye-free formula. UPC 041100598813, Target primary_barcode field.
- Children's Claritin Max Strength Chewable Tablets, Dye-Free Grape (30ct) chewable tablet Avoid. Same dye-free formula, 10mg, ages 6+. UPC 041100606303, Target primary_barcode field.
- Children's Claritin RediTabs (30ct) orally disintegrating tablet Caution. REUSE `claritin-reditabs`. UPC 041100593689, Target primary_barcode field. Title says grape. Drug facts print mint flavor.
- Children's Claritin Allergy Syrup, Grape (4 fl oz) liquid Avoid. REUSE `childrens-claritin-liquid`. UPC 041100811028, Target UPC field.
- Claritin Chewable Tablets, Cool Mint (8ct) chewable tablet Avoid. NEW `claritin-b136-chew-cool-mint`. UPC empty. DailyMed setid 98b99bb9, carton 8 count.
- Claritin-D 24 Hour (5ct) ER tablet Avoid. NEW `claritin-b136-d24-ethylcellulose`. UPC empty. DailyMed setid f046a807, "5 EXTENDED RELEASE TABLETS".
- Claritin-D 24 Hour (10ct, ethylcellulose) ER tablet Avoid. Same ethylcellulose formula. UPC empty. NDC 11523-4332-2, 10 tablets in one blister.
- Claritin-D 24 Hour (15ct, ethylcellulose) ER tablet Avoid. Same ethylcellulose formula. UPC empty. One carton of three 5-count blister cards.
- Claritin-D 24 Hour (10ct, talc) ER tablet Avoid. NEW `claritin-b136-d24-talc`. UPC empty. DailyMed setid 3ea6a90b, 10-tablet blister carton.
- Claritin-D 24 Hour (15ct, talc) ER tablet Avoid. Same talc formula. UPC empty. NDC 11523-0102-2, 15 tablets.
- Claritin-D 12 Hour (20ct) ER tablet Avoid. REUSE `claritin-d-12hr-tio2`. UPC empty. Two 10-count blisters in one carton.
- Claritin-D 12 Hour (30ct) ER tablet Avoid. REUSE `claritin-d-12hr-tio2`. UPC empty. Three 10-count blisters in one carton.

## Already on MAIN (not rewritten)

- `claritin-allergy-tablets-plain` — starch tablets. Includes Target 5ct UPC 041100080226 and 10ct UPC 041100080165.
- `claritin-reditabs` — includes 10ct UPC 041100806024 and 30ct UPC 041100806048.
- `claritin-chewable` — dyed grape chew, UPC 041100810748.
- `childrens-claritin-chewable` — same dyed grape UPC 041100810748.
- `claritin-allergy-liquid` — adult liquid, UPC 041100595416. No size on that row.
- `childrens-claritin-liquid` — grape syrup. Target 8 fl oz tab is UPC 041100810991, already on this row.
- `claritin-d-12hr` — UPC 041100802088. The 10-count family stays on this row.

## Still-empty UPCs

No 12-digit Product UPC or GTIN was opened on a US retailer PDP for that exact pack. claritin.com returned 403. Walmart was robot-blocked. CVS returned 403. The Kroger Claritin-D 12 Hour 20ct page did not open. DailyMed NDCs were not copied as UPCs. A directionsforme.org digit string for Claritin-D 24 Hour matched the 12-hour barcode already on MAIN and was not used.

- 45ct tablets
- 50ct tablets
- Bubblegum chew 10ct
- Cool Mint chew 8ct
- Claritin-D 24 Hour 5ct, 10ct, and 15ct (ethylcellulose panel)
- Claritin-D 24 Hour 10ct and 15ct (talc panel)
- Claritin-D 12 Hour 20ct and 30ct

## no_OI

None. Every skipped named pack was either written, already on MAIN, or OUT.

## OUT

- Claritin RediTabs 60ct twin pack. DailyMed setid b681ea25 panel "60 Tablet Twin Pack" / "TWIN PACK Two 30ct Cartons". Target also shows a 60ct RediTab (UPC 041100598608). That code was not written as a single 60ct.
- Claritin chewable grape and bubblegum kit. DailyMed setid 0371368b.
- Select Consumer Group Claritin tablets. setid 3c9ad1f8.
- R J General Corporation Claritin tablets. setid a34e8cb7.
- Lil' Drug Store Claritin tablets. setids f0e77162 and f85b0527.
- Navajo Manufacturing Claritin tablets. setids 219ab9c4 and 60a5dc14. The existing plain-tablet row already cites 219ab9c4. It was not rewritten.
- Select Corporation Claritin tablets. setid 677bf76d.
- Savings Distributors Claritin tablets. setid 8d59f35f.
- Children's Claritin syrup 2-pack. DailyMed setid 170061e9, two 180 mL bottles in one carton (NDC 11523-4360-7).
- Store-brand loratadine (up&up and Perrigo) seen on Target. Not the Claritin brand.
- Claritin pillow listing on the Target brand search. Not the drug.

## Refused

None. Caprylic/capric glycerides maps to unlabeled MCT. Menthol on the cool-mint inactive line maps to flavor. Black iron oxide maps to iron oxide as color. Carmine stays Caution.
