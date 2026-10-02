# KYR5-d — Zyrtec missing UPC, five packs

Barcode field only. No new products or rows. batch70–142 were not edited. Grades, formula, formulaId, panel, name, and other ingredients were not edited. No existing barcode was overwritten. `312547204309` (5-count Go-Pack) and `312547204323` (14-count Go-Pack) stay on `zyrtec-allergy-tablets` and were not copied. The 50-count and 70-count were not hunted.

Check digit is the GS1 UPC-A digit. NDC was not used as a UPC. A listing title was not used as a barcode. A photo of a different count was not used for that pack.

None of these five packs has an exact-count row on MAIN. The no-count rows are other packs and were not used as a place to hang a new code.

| Pack | Row id | File | Result | Code | Source | Reason |
| --- | --- | --- | --- | --- | --- | --- |
| Zyrtec Allergy Tablets 10 mg, 75-count | — | — | no-row | `300450204752` | https://www.amazon.com/dp/B071G1V5NZ | No exact-pack row. Code is the Amazon product-details UPC, and the GTIN on the same table is `00300450204752`. Title is 10 mg tablets, 75 Ct. Unit count 75. Number of items 1. Manufacturer Kenvue. Sold by Amazon. Item form Tablet. Inactive line matches the 10 mg film-coated tablet panel. Check digit valid. Not already on any row in `lib/`. Carousel images did not show digits under bars. Not attached, because there is no row. |
| Zyrtec Allergy Dissolve Tabs 10 mg, 66-count | — | — | no-row | — | — | No exact-pack row. `zyrtec-b132-adult-dissolve-12ct` and `zyrtec-b132-adult-dissolve-24ct` are other counts. The 24-count code `300450242242` stays on the 24-count row. |
| Children's Zyrtec Allergy Syrup, 1 fl oz | — | — | no-row | — | — | No exact-pack row. `childrens-zyrtec-liquid` already carries the 4 fl oz codes `300450209269` and `300450209047`. Those were not copied onto a 1 fl oz pack. |
| Children's Zyrtec Chewable Tablets 2.5 mg, 6-count | — | — | no-row | — | — | No exact-pack row. `childrens-zyrtec-chewable` already carries `300450239129`, the 12-count 2.5 mg carton. That code was not copied onto a 6-count. |
| Children's Zyrtec Chewable Tablets 10 mg, 6-count | — | — | no-row | — | — | No exact-pack row. The 24 / 48 / 72 count rows are other packs. |

## 75-count tablets

zyrtec.com `https://www.zyrtec.com/products/zyrtec-tablets` count tabs are 30, 45, 60, 90, and 120. There is no 75-count tab. The only filled `eanUpc` on that page is the 60-count `0030045026602`, already on `zyrtec-allergy-tablets` as `300450206602`. The page GTIN `00312547204361` is the 30-count, already on that same row as `312547204361`.

DailyMed setid `b165db38-b302-4220-8627-77cb07bb078c` package NDC 50580-726-75 is 1 carton and 75 tablets in 1 bottle, marketing start 07/31/2025, no end date on that row. The only carton image is the 30-tablet bottle. Digits under those bars are `3 12547 20436 1` (`312547204361`), already on `zyrtec-allergy-tablets`. NDC is not a UPC.

Target search for “zyrtec 75 count” did not list a 75-count tile (redsky `total_results` 0; the opened search showed other counts). CVS search returned Access Denied. Walgreens search did not open a 75-count tab. The opened Walgreens tablet page is the 60-count (`UPC: 30045020660`, which restores to the code already on `zyrtec-allergy-tablets`). Walmart returned a robot wall. Meijer returned Access Denied.

Amazon `https://www.amazon.com/dp/B071G1V5NZ` is the 75 Ct single. Product details: UPC `300450204752`, Global Trade Identification Number `00300450204752`, Unit Count 75 Count, Number of Items 1. Check digit valid. Grep of `lib/` found no copy of `300450204752`. The image carousel did not show a barcode. ASIN `B071G1V9NZ` is a shirt and was not used.

## Dissolve tabs 66-count

zyrtec.com `https://www.zyrtec.com/products/zyrtec-adult-dissolve-tabs` has a Citrus variant and no 66-count tab. `eanUpc` is empty. The page GTIN `00300450242242` is the 24-count, already on `zyrtec-b132-adult-dissolve-24ct`.

DailyMed setid `6a962a1c-c197-492b-bfa6-e0c28eda1533` package NDC 50580-778-66 is 11 blisters of 6 (66 tablets). Marketing end date on the label is 03/31/2017. The only carton image is the 24-count (NDC 50580-778-24). Digits under those bars are `0 30045 02422 4` (`300450242242`), already on the 24-count row. A second symbol on that image, `400301668205`, fails the UPC-A check digit and was not used.

upcitemdb and Buycott title `300450242662` as 66 orally disintegrating tablets. Check digit is valid, and the last upcitemdb scan date is 2016-10-25. Neither page shows digits under bars. Buycott files the brand as Zyrtec-D. A listing title was not used. Amazon search for the 66-count did not open an exact-pack page. ASIN `B00IP3RIKO` did not open as this pack.

## Children's syrup, 1 fl oz

zyrtec.com `https://www.zyrtec.com/products/zyrtec-children-allergy-syrup` tabs are 4 oz bubble gum, 4 oz grape, 4 oz 3-pack grape, and 8 oz grape. No 1 fl oz tab. `eanUpc` is empty. Page GTIN `00300450209047` is already on `childrens-zyrtec-liquid` as `300450209047`.

DailyMed setid `9d8e78ea-af98-4f7c-8db5-044b49582f80` package NDC 50580-730-01 is 30 mL in 1 bottle, marketing start 01/16/2017, no end date on that row. The only carton image is grape 4 fl oz (118 mL), NDC 50580-730-05. Digits under those bars are `0 30045 02092 6` (`300450209269`), already on `childrens-zyrtec-liquid`.

Target, Amazon, and the brand page did not show a 1 fl oz listing. CVS returned Access Denied. Walmart was a robot wall. Meijer returned Access Denied.

## Children's chewable 2.5 mg, 6-count

zyrtec.com `https://www.zyrtec.com/products/zyrtec-chewables-children-2-plus` tabs are 12 and 24. No 6-count tab. `eanUpc` is empty. The 12-count image filename contains `300450239129`, which is already on `childrens-zyrtec-chewable`. The page GTIN `00300450239242` is the 24-count dye-free chew, already on `zyrtec-b141-kids-chew-25mg-24ct`.

DailyMed setid `013ce40e-37c9-4b84-b530-ed895f60ce0e` package NDC 50580-790-03 is 1 blister of 6. The only carton image says 12 chewable tablets, 2.5 mg. Digits under those bars are `0 30045 02391 2` (`300450239129`), already on `childrens-zyrtec-chewable`. An aggregator page that pastes that same product UPC onto NDC 50580-790-03 was not used.

Amazon search showed 12-count and 24-count chews, not a 6-count. Target search did not open a 6-count tile.

## Children's chewable 10 mg, 6-count

zyrtec.com `https://www.zyrtec.com/products/zyrtec-chewables-children-6-plus` tabs are 24, 48, and 72. No 6-count tab. `eanUpc` is empty. The image filename contains `300450241245`, already on `zyrtec-b132-kids-chew-10mg-24ct`.

DailyMed setid `0fe77356-d945-46a0-882e-b3bbab784556` package NDC 50580-791-03 is 1 blister of 6, marketing start 09/01/2022. The only carton image is the 24-count family (NDC 50580-791-24 printed on that carton). zbar returned Code 128 `30061364`, 8 digits, not a UPC-A. No 12 digits under those bars.

Amazon search showed 24-count and 48-count 10 mg chews, not a 6-count.

## Last URLs for each still-missing pack

75-count tablets (code found, no row):

- https://www.zyrtec.com/products/zyrtec-tablets
- https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=b165db38-b302-4220-8627-77cb07bb078c&name=Zyrtec-1.jpg
- https://www.target.com/s?searchTerm=zyrtec%2075%20count
- https://www.cvs.com/search?searchTerm=zyrtec%2075%20count
- https://www.walgreens.com/store/c/zyrtec-allergy-relief,-cetirizine-hci-10mg-tablets/ID=300471830-product
- https://www.amazon.com/dp/B071G1V5NZ

Dissolve tabs 66-count:

- https://www.zyrtec.com/products/zyrtec-adult-dissolve-tabs
- https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=6a962a1c-c197-492b-bfa6-e0c28eda1533&name=zyrtec-1.jpg
- https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6a962a1c-c197-492b-bfa6-e0c28eda1533
- https://www.upcitemdb.com/upc/300450242662
- https://www.buycott.com/upc/300450242662
- https://www.amazon.com/s?k=zyrtec+dissolve+66

Children's syrup, 1 fl oz:

- https://www.zyrtec.com/products/zyrtec-children-allergy-syrup
- https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=9d8e78ea-af98-4f7c-8db5-044b49582f80&name=Zyrtec-1.jpg
- https://dailymed.nlm.nih.gov/dailymed/services/v2/spls/9d8e78ea-af98-4f7c-8db5-044b49582f80/packaging.json
- https://www.target.com/s?searchTerm=children%27s%20zyrtec%20syrup
- https://www.cvs.com/search?searchTerm=zyrtec
- https://www.amazon.com/s?k=children%27s+zyrtec+syrup+1+fl+oz

Children's chewable 2.5 mg, 6-count:

- https://www.zyrtec.com/products/zyrtec-chewables-children-2-plus
- https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=013ce40e-37c9-4b84-b530-ed895f60ce0e&name=Zyrtec-1.jpg
- https://www.target.com/s?searchTerm=children%27s%20zyrtec%20chewable
- https://www.amazon.com/s?k=children%27s+zyrtec+chewable+2.5+mg+6+count

Children's chewable 10 mg, 6-count:

- https://www.zyrtec.com/products/zyrtec-chewables-children-6-plus
- https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=0fe77356-d945-46a0-882e-b3bbab784556&name=Zyrtec-1.jpg
- https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=0fe77356-d945-46a0-882e-b3bbab784556
- https://www.amazon.com/s?k=children%27s+zyrtec+chewable+10+mg+6+count

Walmart `https://www.walmart.com/search?q=zyrtec%2075%20count` returned a robot wall. Meijer `https://www.meijer.com/shopping/search.html?text=zyrtec%2075` returned Access Denied. Those pages did not open.
