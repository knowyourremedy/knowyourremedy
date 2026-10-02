# Batch 145 — Claritin held packs and UPC ladder

Fresh branch from `origin/main`. New file only. batch70–144 were not edited. No UPC was attached. Every 12-digit code read this pass already sits on another row.

## Part A — written (12)

New formula `claritin-b145-chew-grape-dye`. Avoid. Drivers are D&C Red No. 27 aluminum lake, FD&C Blue No. 2 aluminum lake, and aspartame. The five added tokens (citric acid anhydrous, magnesium stearate, microcrystalline cellulose, sodium starch glycolate, stearic acid) are Cleared and are not the driver. Panel: DailyMed setid `37732ca2`. UPC empty on every count. The drug-facts image decoded to `041100810748`, already on `claritin-chewable` and `childrens-claritin-chewable`. Not copied.

- Children's Claritin Chewable Tablets, Grape (2ct) chewable tablet. NDC 11523-4328-4.
- Children's Claritin Chewable Tablets, Grape (10ct) chewable tablet. NDC 11523-4328-1. Front image prints 10 CHEWABLE TABLETS.
- Children's Claritin Chewable Tablets, Grape (20ct) chewable tablet. NDC 11523-4328-2.
- Children's Claritin Chewable Tablets, Grape (30ct) chewable tablet. NDC 11523-4328-3.
- Children's Claritin Chewable Tablets, Grape (40ct) chewable tablet. NDCs 11523-4328-9 and 11523-4331-1.
- Children's Claritin Chewable Tablets, Grape (50ct) chewable tablet. NDC 11523-4328-5.
- Children's Claritin Chewable Tablets, Grape (60ct) chewable tablet. NDC 11523-4331-2.
- Children's Claritin Chewable Tablets, Grape (80ct) chewable tablet. NDC 11523-4331-6.
- Children's Claritin Chewable Tablets, Grape (100ct) chewable tablet. NDC 11523-4328-6, 50 pouches of 2.

New formula `claritin-b145-adult-liquid`. Caution. Driver is phosphoric acid. No High-tier inactive. Sucralose and oral propylene glycol stay Moderate and are not the Avoid driver. Menthol is in the inactive list and is Caution. Sodium phosphate is Cleared phosphate salt, not phosphoric acid. Panel: DailyMed setid `19afd658`. claritin.com Liquid 24 Hour prints the same inactive line and no UPC. UPC empty.

- Claritin Allergy Liquid (30 mL) liquid. NDC 11523-0101-1.
- Claritin Allergy Liquid (80 mL) liquid. NDC 11523-0101-2.
- Claritin Allergy Liquid (240 mL) liquid. NDC 11523-0101-3. Cooling Honey carton prints 8 FL OZ (240 mL). Bars read `041100595416`, already on `claritin-allergy-liquid`. Not copied.

`claritin-chewable`, `childrens-claritin-chewable`, and `claritin-allergy-liquid` were not rewritten. Children's grape syrup rows were not rewritten.

## Part B — UPCs attached

None.

Codes read and not attached, because they already sit on another row:

- Starch 45ct carton (`claritin-b136-tablets-45`) bars `041100806147`, already on `claritin-allergy-tablets-plain`.
- Grape 10ct drug-facts image `041100810748`, already on the two founder grape rows.
- Adult liquid 240 mL carton `041100595416`, already on `claritin-allergy-liquid`.
- Walgreens tablets 10.0 ea spec `04110008016` restores to `041100080165` (check digit 5). Already on the starch plain row. Inactives were not printed, so it was not moved onto the MCC 10ct.
- Walgreens Liqui-Gels 10.0 ea spec `04110080610` restores to `041100806109` (check digit 9). Already on `claritin-b136-liquigels-10`.
- Walgreens Claritin-D 15.0 ea spec `04110081088` restores to `041100810885` (check digit 5). Already on `claritin-b136-d24-ec-15`. The page did not print talc versus ethylcellulose, so it was not put on the talc 15ct.

## Still missing

Same ladder for every empty pack below.

Tried: DailyMed media for setids 37732ca2, 19afd658, acf2d393, dc65f7ec, 660ac9df, ac32d6f9, 8e14b61f, b681ea25, 20938e05, 98b99bb9, 170061e9, f046a807, 3ea6a90b, 7dc04b48. zbar on every image. claritin.com curl returned 403 on the tablets, liqui-gels, reditabs, syrup, and liquid paths. WebFetch opened tablets-24hour and liquid. Those pages have no UPC field and no count tabs in the rendered text. Liqui-gels and chewables URLs returned 404. Target RediTabs 10ct page opened with no barcode field. Walmart 40ct tablets page opened with no UPC. CVS shop search timed out. Amazon search returned an error page. Walgreens Product Specifications opened for tablets 10ct, Liqui-Gels 10ct, and Claritin-D 15ct (results above). Walgreens search curl failed. Meijer search opened and listed no products. Google last was not used as a code source. A setid-level UPC list that repeated the 45ct and 50ct codes was not copied onto other counts.

Batch 144, all 45, UPC still empty: MCC 5, 10, 20, 30, 40, 45, 60, 70, 85; starch 15, 20, 25, 35, 40, 55, 60, 80, 85, 90, 100, 105, 108, 110, 115; Liqui-Gels 5, 36, 40, 70, 100; RediTabs 10, 20, 40, 50, 60, 70; bubblegum 40; cool mint 2, 4, 24, 56, 64; grape syrup 1, 2, 5, 6 fl oz.

The MCC 10ct carton image is on setid acf2d393. zbar returned no UPC-A. The other MCC counts have no carton image. Starch images on setid 660ac9df are the 10ct (no bars), the 50ct (code already on the 50ct row), and the 45ct (code already on the plain row). The 70ct window box code is already on the 70ct row. Liqui-gel images are the 30ct only. RediTabs images decoded `02719405` and `02719805`, not UPC-A. Bubblegum image is the 10ct. Cool mint image is the 8ct and zbar returned nothing. Syrup image is the code already on the 8 fl oz row. Claritin-D ethylcellulose images are the 10ct. Talc image zbar returned nothing. OCR shows 10 extended-release tablets.

Batch 136 still empty: `claritin-b136-tablets-45`, `claritin-b136-d24-ec-5`, `claritin-b136-d24-talc-10`, `claritin-b136-d24-talc-15`.

Part A, all 12, UPC still empty. Listed above.

## OUT

- Dyed grape combination pack. NDC 11523-4328-7. Package form is combination. No row.

## Token packet

None. Phosphoric acid, sodium phosphate, menthol, the lake dyes, aspartame, and the five added chew tokens are locked.
