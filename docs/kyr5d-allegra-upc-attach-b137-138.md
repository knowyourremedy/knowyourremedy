# KYR5-d — Allegra empty-UPC attach, batches 137–138

Barcode line only on empty Allegra rows in `lib/rating-drafts/batch137-kyr6b-allegra-first-slice.ts`. No grade, formula, formulaId, panel, name, or other-ingredient edit. Batch 138 was not edited. `041167432075` stays on `allegra-d-24hr`. Allegra-D 24 Hour 10ct and 15ct were not hunted.

Check digit is the GS1 GTIN-12 digit. An 11-digit Walgreens Product Specifications UPC is stored as those 11 digits plus that check digit. NDC was not used as a UPC. A page-level allegra.com SKU was not copied onto a count. 12 Hour codes stayed off 24 Hour rows. Hives codes stayed off plain Allegra. Gelcap codes stayed off tablets.

| row id | file | result | code | source URL | reason |
| --- | --- | --- | --- | --- | --- |
| `allegra-b137-tab-40` | `lib/rating-drafts/batch137-kyr6b-allegra-first-slice.ts` | still-missing | — | — | 40-tablet carton image is on DailyMed, but the digits under the bars did not resolve to a 12-digit code. Walgreens search did not open a 40-count tablet PDP. Buycott lists `041167412145` on a bonus-pack title and shows an empty barcode image, so that field was not attached. |
| `allegra-b137-tab-45` | `lib/rating-drafts/batch137-kyr6b-allegra-first-slice.ts` | still-missing | — | https://www.walgreens.com/store/c/allegra-adult-24-hour-allergy-tablets,-non-drowsy-antihistamine/ID=300404265-product | Product Specifications, Size/Count 45.0 ea, one 45-count pack, UPC `04116741274`. Check digit 9 restores `041167412749`. That code is already on `allegra-allergy-24hr` in `lib/rating-drafts/batch5-adult-allergies.ts`. Not copied. |
| `allegra-b137-tab-60` | `lib/rating-drafts/batch137-kyr6b-allegra-first-slice.ts` | still-missing | — | — | No 60-count tablet spec and no 60-tablet carton image. The Walgreens 60-count hit is the gelcap, which stays on `allegra-b137-gel-60` (`041167412220`). |
| `allegra-b137-tab12-36` | `lib/rating-drafts/batch137-kyr6b-allegra-first-slice.ts` | still-missing | — | — | No 36-count 12 Hour tablet spec and no 36-tablet carton image. The opened 12 Hour tablet cards were 24 ea. |
| `allegra-b137-hives-tab-5` | `lib/rating-drafts/batch137-kyr6b-allegra-first-slice.ts` | still-missing | — | — | Walgreens Hives PDP is 30.0 ea (`04116741264` → `041167412640`, already on `allegra-b137-hives-tab-30`). No 5-count tab. DailyMed Hives image is 30 tablets. Dollar General 5 ct page has no UPC field. |
| `allegra-b137-hives-tab-15` | `lib/rating-drafts/batch137-kyr6b-allegra-first-slice.ts` | still-missing | — | — | No 15-count Hives spec and no 15-tablet carton image. The Amazon 15 ct page that search returned did not print a UPC. |
| `allegra-b137-gel-8` | `lib/rating-drafts/batch137-kyr6b-allegra-first-slice.ts` | attached | `041167412206` | https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=f061d6b1-89f7-4d5f-ac59-9c73408517c1&name=allegra-gelcaps-01.jpg | Digits under the bars on the 8 GELCAPS carton, NDC 41167-4122-0, one 8-gelcap blister. Human-readable `0 41167 41220 6`. Check digit passes. Not the 24ct gelcap `041167412213` and not the 60ct gelcap `041167412220`. |
| `allegra-b137-d12-10` | `lib/rating-drafts/batch137-kyr6b-allegra-first-slice.ts` | attached | `041167431023` | https://www.walgreens.com/store/c/allegra-d-12-hour-allergy-and-congestion-relief-tablets-non-drowsy/ID=prod6053001-product | Product Specifications, Brand Allegra-D, 12 Hour, Size/Count 10.0 ea, one 10-count pack, UPC `04116743102`. Check digit 3. |
| `allegra-b137-d12-20` | `lib/rating-drafts/batch137-kyr6b-allegra-first-slice.ts` | attached | `041167431047` | https://www.walgreens.com/store/c/allegra-d-12-hour-allergy-and-congestion-relief-tablets-non-drowsy/ID=prod6053002-product | Product Specifications, Brand Allegra-D, 12 Hour, Size/Count 20.0 ea, one 20-count pack, UPC `04116743104`. Check digit 7. |
| `allegra-b137-d12-30` | `lib/rating-drafts/batch137-kyr6b-allegra-first-slice.ts` | attached | `041167431061` | https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=b32e172a-abf5-4c17-aa39-19e517952b91&name=allegra-d-allergy-and-congestion-12-hr-01.jpg | Digits under the bars on the 30 Tablets carton, NDC 41167-4310-6. Human-readable `0 41167 43106 1`. Check digit passes. Not the 10ct `041167431023` and not the 20ct `041167431047`. |

Attached 4. Already-had 0. Still missing 6. Every hunt row was empty before this pass, so nothing was overwritten.

## Last URLs for still-missing packs

### `allegra-b137-tab-40`

- https://www.walgreens.com/q/allegra+40+count+tablets
- https://www.target.com/p/allegra-adult-treatment-fexofenadine-tablets-5ct/-/A-94466528
- https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=81c1dcbb-28b3-4ad5-9f3d-9ccc16ddd173&name=allegra-allergy-04.jpg
- https://www.buycott.com/upc/041167412145

### `allegra-b137-tab-45`

- https://www.walgreens.com/store/c/allegra-adult-24-hour-allergy-tablets,-non-drowsy-antihistamine/ID=300404265-product
- https://www.walgreens.com/q/allegra+24+hour+45

### `allegra-b137-tab-60`

- https://www.walgreens.com/q/allegra+60+count+tablets
- https://www.walgreens.com/store/c/allegra-adult-24-hour-allergy-gelcaps,-non-drowsy-antihistamine/ID=300404268-product
- https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=81c1dcbb-28b3-4ad5-9f3d-9ccc16ddd173
- https://www.target.com/s?searchTerm=allegra+24+hours

### `allegra-b137-tab12-36`

- https://www.walgreens.com/q/allegra+12+hour+36
- https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=81c1dcbb-28b3-4ad5-9f3d-9ccc16ddd173
- https://www.allegra.com/en-us/products/allergy-relief/12-hour-allergy-relief

### `allegra-b137-hives-tab-5`

- https://www.walgreens.com/q/allegra+hives+5
- https://www.walgreens.com/store/c/allegra-hives-antihistamine-24-hour,-non-drowsy-hive-reduction/ID=300428539-product
- https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=490b4c5f-448b-4563-928b-837117b59b9f&name=allegra-hives-24hr-01.jpg
- https://www.dollargeneral.com/p/allegra-hives-hr-non-drowsy-antihistamine-tablets-ct/41167412701

### `allegra-b137-hives-tab-15`

- https://www.walgreens.com/q/allegra+hives+5
- https://www.walgreens.com/store/c/allegra-hives-antihistamine-24-hour,-non-drowsy-hive-reduction/ID=300428539-product
- https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=490b4c5f-448b-4563-928b-837117b59b9f
- https://www.amazon.com/Allegra-Adult-HIVES-180-24/dp/B09SVRYLR1
