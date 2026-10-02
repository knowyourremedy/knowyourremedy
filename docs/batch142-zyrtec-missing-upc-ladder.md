# Batch 142 — Zyrtec missing-UPC write

Fresh branch from `origin/main` (`8c8d302`). New file only. batch70–141 were not edited. The 10 mg 40-count Avoid and the dye-free 2.5 mg 24-count Caution were not reopened. The 4 fl oz 2-pack and the grape 3-pack were not hunted. Store cetirizine stayed closed.

A row was written only when that exact pack had a 12-digit UPC under the bars or an opened retailer spec. An 11-digit Walgreens spec was stored only after the check digit was restored and checked. NDC is not a UPC. An image filename is not a UPC.

## Written (2)

| Pack | Grade | formulaId | UPC | Source |
| --- | --- | --- | --- | --- |
| Zyrtec Allergy Tablets 10 mg, 3ct | Avoid | `zyrtec-allergy-tablets-tio2` | `300450204431` | Walgreens Product Specifications, travel-size tablets, Size/Count 3.0 Each, UPC `30045020443`. Check digit 1. DailyMed setid `b165db38` package NDC 50580-726-93 is 3 in 1 carton and 1 in 1 pouch. |
| Children's Zyrtec Allergy Syrup, bubble gum, 4 fl oz | Avoid | `childrens-zyrtec-liquid` | `300450205049` | Walgreens Product Specifications, Allergy Syrup Bubble Gum, Size/Count 4.0 fl oz, UPC `30045020504`. Check digit 9. Same inactive line as the syrup setid `9d8e78ea` (flavors, not a grape dye). |

## Still missing (9)

| Pack | What was opened | Why no new code |
| --- | --- | --- |
| Tablets 10 mg, 5ct | Walgreens Go Packs `ID=300468993`, Size/Count 5.0 ea, UPC `31254720430`. | Restored check digit is `312547204309`, already on `zyrtec-allergy-tablets`. Not copied onto a new row. |
| Tablets 10 mg, 14ct | Walgreens Go-Packs `ID=300462622`, Size/Count 14.0 ea, UPC `31254720432`. Dollar General page title is 14 x 1 ct packs; the path ends in that same code and the page body has no UPC field. | Restored check digit is `312547204323`, already on `zyrtec-allergy-tablets`. Not copied onto a new row. |
| Tablets 10 mg, 50ct | DailyMed kit setid `6685a843` lists NDC 50580-726-50 as one part of the 120-count kit (50 + 70). The tablet setid `b165db38` carton image is the 30-count, bars `312547204361`. zyrtec.com tablet tabs are 30 / 45 / 60 / 90 / 120. | No standalone 50-count bar or retailer UPC field. |
| Tablets 10 mg, 70ct | Same kit label. NDC 50580-726-70 is the other part of the 120-count kit. | No standalone 70-count bar or retailer UPC field. |
| Tablets 10 mg, 75ct | DailyMed setid `b165db38` package NDC 50580-726-75 is 75 in 1 bottle, marketing start 07/31/2025. zyrtec.com tablet tabs are 30 / 45 / 60 / 90 / 120. Walgreens Zyrtec list shows 3, 5, 14, 30, 60, 90. | The NDC is not a UPC. No 75-count bar or retailer UPC field. |
| Dissolve tabs 10 mg, 66ct | DailyMed setid `6a962a1c` carton is NDC 50580-778-24, 24 tablets, bars `300450242242`. zyrtec.com dissolve page has one Citrus tab and an empty eanUpc. | Buycott titles UPC `300450242662` as 66 orally disintegrating tablets and labels the brand Zyrtec-D, with no barcode image and no retailer spec. Not used. |
| Children's syrup, 1 fl oz (30 mL) | DailyMed setid `9d8e78ea` carton image is grape 4 fl oz, NDC 50580-730-05, bars `300450209269`. Package NDC 50580-730-01 is 30 mL and has no image. zyrtec.com syrup tabs are 4 oz bubble gum, 4 oz grape, 4 oz 3-pack grape, and 8 oz grape. | No 1 fl oz retailer spec. A product-level UPC that points at the 4 oz bars was not borrowed. |
| Children's chew 2.5 mg, 6ct | DailyMed setid `013ce40e` image is 12 chewable tablets, bars `300450239129`. zyrtec.com tabs are 12 and 24. | The 12-count code is not this pack. No 6-count spec. |
| Children's chew 10 mg, 6ct | DailyMed setid `0fe77356` image is NDC 50580-791 (the 24-count family). zbar returned 8 digits (`30061364`), not a UPC-A. zyrtec.com tabs are 24 / 48 / 72. | No 6-count spec. NDC 50580-791-03 is one blister of 6 and was not turned into a UPC. |

## Ladder

1. DailyMed package images on setids `b165db38`, `6a962a1c`, `9d8e78ea`, `013ce40e`, `0fe77356`. One image each. Extra image names returned empty. Bars decoded with zbar. None of those cartons were the missing counts.
2. zyrtec.com product pages for tablets, adult dissolve, children's syrup, chewables 2+, and chewables 6+. Count tabs and eanUpc fields were read. The missing counts are not tabs. Image filenames were not used as UPCs.
3. Opened Walgreens Product Specifications for the 3-count, the 5-count Go Packs, the 14-count Go-Packs, and the bubble gum 4 fl oz. CVS returned Access Denied. Target redsky returned a block page. Dollar General 14-count body has no UPC field.
