# KYR5-d — Zyrtec leftover UPC, second ladder

Barcode-only. Existing empty rows only. No new products. Check digit is the GS1 GTIN-12 digit. NDC was not used as a UPC. Image filenames were not used as UPCs. The 24-count Zyrtec-D code `300450204240` was not copied onto the 12-count. The children's dissolve 12-count code `300450242136` was not copied onto the adult row.

## `zyrtec-b132-d-12ct`

Zyrtec-D Allergy + Congestion Extended-Release Tablets (12ct). Formula `zyrtec-b133-zyrtec-d` (search row is the batch133 copy). Shadowed batch132 copy of the same id got the same barcode.

| Result | Code | Where |
| --- | --- | --- |
| attached | `300450204271` | Fry's 12.00 ct Product UPC field `0030045020427` on https://www.frysfood.com/p/zyrtec-d-12-hour-allergy-relief-nasal-decongestant-tablets/0030045020427 — line under the title: `12.00 ct` `UPC: 0030045020427`. Same 12 ct item slug on Fred Meyer: https://www.fredmeyer.com/p/zyrtec-d-12-hour-allergy-relief-nasal-decongestant-tablets/0030045020427 |

Kroger prints `00` plus the 11-digit body (check digit dropped). The sibling 24.00 ct item on the same chain is `0030045020424`, which restores to the already-kept 24-count `300450204240`. The 12.00 ct body `30045020427` restores to `300450204271`. Check digit valid. Not already on another MAIN barcode.

Not used: zyrtec.com 12 Count `eanUpc` is empty, and that variant's `gtin` is the 24-count `00300450204240`. The 12ct image filename that contains `300450204271` was not the source. DailyMed setid `f1ecf9ba` has one label image and it is the 24-tablet carton (bars `0300450204240`). Setid `1e8eb279` image is also the 24-tablet carton (NDC 50580-728-24). Kenvue Product UPC list has no Zyrtec-D 12 ct cell. Walmart 12 Ct PDP https://www.walmart.com/ip/Zyrtec-D-12-Hour-Allergy-Relief-Nasal-Decongestant-Tablets-12-Ct/15716830 has a 12 / 24 count selector and no UPC row. CVS 12 CT sku `810037` (https://www.cvs.com/shop/zyrtec-d-12-hour-allergy-medicine-nasal-decongestant-tablets-prodid-7200025?skuId=810037) returned Access Denied; the reviews spec table has no UPC row. Target search showed no Zyrtec-D 12-count tile. Walgreens, Kroger.com, H-E-B, Meijer, Sam's, Amazon, and Albertsons returned robot walls or no body.

## `zyrtec-b132-adult-dissolve-12ct`

Zyrtec Allergy Dissolve Tabs 10 mg (12ct), orally disintegrating, adult. Formula `zyrtec-b132-dissolve-10mg`. Left empty.

| Result | Code | Why | Last URLs |
| --- | --- | --- | --- |
| still empty | — | No GTIN on a US PDP for the adult 12-count single. The live adult page is the 24-count citrus carton only. | https://www.zyrtec.com/products/zyrtec-adult-dissolve-tabs ; https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=6a962a1c-c197-492b-bfa6-e0c28eda1533&name=zyrtec-1.jpg ; https://www.activaterewards.com/newyear/participating-products ; https://www.walmart.com/c/kp/zyrtec-dissolve-tablets ; https://www.target.com/s?searchTerm=zyrtec%20allergy%20dissolve%2012 |

DailyMed adult image is the 24-count carton; bars decode to `0300450242242` (`300450242242`), already on the 24-count row. Packaging lists NDC 50580-778-12, which is not a UPC. Kenvue Product UPC cell for adult 10 mg Dissolve Tabs Citrus is 24 ct only (`300450242242`). The 12 ct dissolve cell on that list is children's (`300450242136`) and stays on the children's row. Walmart adult dissolve tile is 24 count. The "Citrus 12 ea (Pack of 2)" listing is a multipack; its model number is the children's code and its seller UPC is `191566066590`. Target dissolve search showed children's 24-count and adult tablets, not an adult 12-count single. CVS search was Access Denied. Walgreens did not load.
