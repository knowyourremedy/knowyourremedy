# KYR5-d Solaray empty-UPC ladder 4

Fourth pass on the 36 Solaray rows that ladder 3 left as source fight (2) or no US UPC found (34). Barcode field only. No new rows. No grade, formula, OI, formulaId, or name edits. The 644 codes from #386, the 13 from #387, and the 42 from #388 were not edited. The 3 already-had rows were not overwritten. The 10 pack-mismatch rows and 16 form-mismatch rows from ladder 3 were not edited. Factory #121–#221, the in-store 73, and old 3P leftover brands were not reopened. Liposomal Multivitamin Universal stays parked: 076280830385 was not attached.

Attached 21. Already-had 3. Still-empty 15 of the 36 (source fight 3 / form mismatch 4 / title-vs-facts 1 / no US UPC found 7). Pack-mismatch and form-mismatch rows from ladder 3 left empty and untouched: 26.

Hunt for every one of the 36, in order:

1. DailyMed `drug_name=solaray` returned 0 SPLs (published Sep 28, 2026). No NDC was padded into a UPC. Official solaray.com front-label crops (magnesium glycinate, tart cherry concentrate, oil of oregano 120, mullein 200, L-theanine 75, oregano + black seed) returned 0 symbols in zbar. Printed digits under the bars were not confirmed on those crops.
2. solaray.com product JSON for each handle: every variant title, SKU, and barcode field. A barcode that only echoes the part number was not attached by itself. Non-echo barcode fields (mullein 200ct `076280898491`, oil of oregano 120ct `076280126709`) were not attached without a retailer carton. Tongkat Ali 180ct barcode field is the ASIN `X003KT6RIN`. L-theanine 75 CT and black cohosh 180ct barcode fields were empty.
3. Opened product JSON, not search pages: the full Vitacost Solaray collection (695) and the full HerbsPro Solaray collection (772), then the matching product `.js` barcode field. HiLife product JSON (`hilifevitamins.com/products/solaray-{code}.js`) was opened where the big collections had no exact pack. Swanson product JSON was opened for the 9.8 oz magnesium glycinate fight. VitaNet product pages were opened where they print a UPC field. iHerb, Walmart, Target, and Amazon PDP fetches stayed bot-walled on this pass. Sprouts house catalog was not written.
4. Google was used only to find cited US pages. No code was copied from an AI blurb. upcitemdb was used only as a pointer; a code was attached only after a retailer barcode field or a printed UPC field was read on the cited page.

## (a) Newly attached

| row id | product name | pack | form | UPC | source URL | ladder step | how read |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `solaray-b117-076280001105` | Solaray Alfalfa Leaf 860mg (100ct) | 100 ct | capsule | `076280001105` | https://hilifevitamins.com/products/solaray-076280001105 | 3 retailer spec | spec field. HiLife barcode. Facts: serving 2 veg caps, alfalfa leaf 860 mg, 100 veg caps, other ingredients vegetable cellulose capsule. HerbsPro titles the same barcode as 430 mg per capsule; that is the per-capsule half of this 2-cap serving, not a second bottle. |
| `solaray-b117-076280012408` | Solaray Echinacea Angustifolia 450mg (100ct) | 100 ct | capsule | `076280012408` | https://hilifevitamins.com/products/solaray-076280012408 | 3 retailer spec | spec field. HiLife title Echinacea Angustifolia, 450 mg, 100 veg caps, barcode 076280012408. Directions: 1 veg cap. |
| `solaray-b117-076280014006` | Solaray Myrrh Gum 620mg (100ct) | 100 ct | capsule | `076280014006` | https://hilifevitamins.com/products/solaray-076280014006 | 3 retailer spec | spec field. HiLife title Myrrh Gum, 620 mg, 100 veg caps. Other ingredients vegetable cellulose capsule and magnesium stearate. |
| `solaray-b117-076280016703` | Solaray Wild Yam Root 400mg (100ct) | 100 ct | capsule | `076280016703` | https://hilifevitamins.com/products/solaray-076280016703 | 3 retailer spec | spec field. HiLife title Wild Yam, 400 mg, 100 veg caps. Other ingredients vegetable cellulose capsule. |
| `solaray-b117-076280017038` | Solaray Black Cohosh Root 540mg (180ct) | 180 ct | capsule | `076280017038` | https://hilifevitamins.com/products/solaray-076280017038 | 3 retailer spec | spec field. HiLife facts: black cohosh root 540 mg, 1 veg cap, barcode on the 180 veg-cap title. The 100ct code 076280001709 was not copied. |
| `solaray-b117-076280037036` | Solaray Milk Thistle Seed Extract 350mg (30ct) | 30 ct | capsule | `076280037036` | https://hilifevitamins.com/products/solaray-076280037036 | 3 retailer spec | spec field. HiLife facts: seed extract 350 mg (280 mg silymarin), 30 veg caps. Other ingredients vegetable cellulose capsule, organic rice extract blend, whole rice concentrate and silica, matching this row. |
| `solaray-b117-076280048261` | Solaray Acidophilus 3 Strain Probiotic & Prebiotic Carrot Juice (60ct) | 60 ct | capsule | `076280048261` | https://hilifevitamins.com/products/solaray-076280048261 | 3 retailer spec | spec field. HiLife barcode on Freeze Dried Acidophilus & Prebiotic Carrot Juice, 3 billion CFU, 60 veg caps. Other ingredients maltodextrin, vegetable cellulose capsule, silica and stearic acid. |
| `solaray-b117-076280048278` | Solaray Acidophilus 3 Strain Probiotic & Prebiotic Carrot Juice (120ct) | 120 ct | capsule | `076280048278` | https://hilifevitamins.com/products/solaray-076280048278 | 3 retailer spec | spec field. HiLife barcode on the 120 veg-cap carrot-juice bottle. Same vegetable-cellulose panel as the 60ct. The 30ct gelatin page was not copied here. |
| `solaray-b117-076280192421` | Solaray Echinacea Purpurea 900mg (100ct) | 100 ct | capsule | `076280192421` | https://hilifevitamins.com/products/solaray-076280192421 | 3 retailer spec | spec field. HiLife facts: serving 2 capsules, organic echinacea purpurea root 900 mg, 100 count. The 450 mg in the title is the per-capsule half of that serving. |
| `solaray-b117-076280366624` | Solaray Huperzine A - 50mcg (60ct) | 60 ct | capsule | `076280366624` | https://hilifevitamins.com/products/solaray-076280366624 ; https://vitanetonline.com/description/36662/vitamins/Huperzine-A/ | 3 retailer spec | two-source agreement. HiLife facts: Hup A 50 mcg, eleuthero root 225 mg, 60 veg caps, barcode 076280366624. VitaNet UPC field on Huperzine A 60ct 50 mcg is the same code. |
| `solaray-b120-076280008524` | Solaray MSM & Glucosamine (90ct) | 90 ct | capsule | `076280008524` | https://hilifevitamins.com/products/solaray-076280008524 | 3 retailer spec | spec field. HiLife title MSM & Glucosamine, 90 veg caps. Facts: 2 veg caps, 45 servings, MSM 1000 mg, glucosamine sulfate 500 mg. The 180ct code 076280008562 was not copied. |
| `solaray-b121-076280105056` | Solaray Mushroom Complete 1175mg (60ct) | 60 ct | capsule | `076280105056` | https://hilifevitamins.com/products/solaray-076280105056 | 3 retailer spec | spec field. HiLife facts on 60 vegetarian capsules, serving 2 capsules. The listed mushroom amounts add to 1,175 mg. The fermented 600 mg sibling was not copied. |
| `solaray-b123-076280037814` | Solaray Saw Palmetto Berry Extract 160mg (30ct) | 30 ct | softgel | `076280037814` | https://www.herbspro.com/products/vital-extracts-saw-palmetto-123471 ; https://hilifevitamins.com/products/solaray-076280037814 | 3 retailer spec | two-source agreement. HerbsPro and HiLife both barcode 076280037814 on saw palmetto berry extract 160 mg, 30 softgels. Other ingredients softgel (gelatin and glycerin) and virgin olive oil. |
| `solaray-b123-076280041132` | Solaray Food Carotene, Vit A as Beta C (30ct) | 30 ct | capsule | `076280041132` | https://hilifevitamins.com/products/solaray-076280041132 | 3 retailer spec | spec field. HiLife facts: vitamin A as natural beta carotene 500 mcg (supplying 10,000 IU), carotenoid complex 80 mg, 30 capsules. Other ingredients gelatin capsule, soybean oil, stearic acid, mixed carotenoids, ascorbyl palmitate and mixed tocopherols, matching this row. |
| `solaray-b124-076280355307` | Solaray Mycrobiome Prebiotic, Citrus (5.64 oz / 160 g) | 5.64 oz | powder | `076280355307` | https://www.herbspro.com/products/citrus-prebiotic-powder-243127 ; https://vitanetonline.com/description/35530/vitamins/Citrus-Prebiotic-Powder/ | 3 retailer spec | two-source agreement. HerbsPro barcode on Citrus Prebiotic Powder, 5.64 oz, is 076280355307. VitaNet UPC and gtin fields on Citrus Prebiotic Powder 5.64 oz are the same code. The unflavored sibling 076280266191 was not copied. |
| `solaray-b125-076280047875` | Solaray Baby Me Now Prenatal Multivitamin (150ct) | 150 ct | tablet | `076280047875` | https://hilifevitamins.com/products/solaray-076280047875 | 3 retailer spec | spec field. HiLife title Pre-Natal Multi, 150 tablets. Description names Solaray Baby Me Now Prenatal Multivitamin and says take five tablets daily. The Babylife powder was not copied. |
| `solaray-b126-076280037692` | Solaray Pygeum & Saw Palmetto w/CranActin (90ct) | 90 ct | capsule | `076280037692` | https://hilifevitamins.com/products/solaray-076280037692 | 3 retailer spec | spec field. HiLife title pygeum and saw palmetto with CranActin, 90 veg caps. Other ingredients start with vegetable cellulose capsule, pumpkin seeds, cellulose, beet root. |
| `solaray-b126-076280047004` | Solaray Zinc Asporotate 15mg (100ct) | 100 ct | capsule | `076280047004` | https://hilifevitamins.com/products/solaray-076280047004 | 3 retailer spec | spec field. HiLife title Zinc Asporotate, 15 mg, 100 veg caps. |
| `solaray-b126-076280083996` | Solaray CranActin Cranberry Extract 400mg (30ct) | 30 ct | capsule | `076280083996` | https://www.herbspro.com/products/cranactin-4 ; https://hilifevitamins.com/products/solaray-076280083996 | 3 retailer spec | two-source agreement. HerbsPro and HiLife both barcode 076280083996 on CranActin 400 mg, 30 veg caps. HerbsPro other ingredients match this row (vegetable cellulose, maltodextrin, tricalcium phosphate, magnesium hydroxide, rice bran extract, cellulose, magnesium oxide, vegetable juice concentrate, silica). The 700 mg complex barcode 076280379969 was not copied. |
| `solaray-b126-076280254921` | Solaray Immufight Ultimate Immune Support (90ct) | 90 ct | capsule | `076280254921` | https://hilifevitamins.com/products/solaray-076280254921 | 3 retailer spec | spec field. HiLife title ImmuFight Ultimate Immune, 90 veg caps. Immune Response and Maximum Daily Defense were not copied. |
| `solaray-b128-076280002775` | Solaray Menopause Blend SP-7D (100 ct) | 100 ct | capsule | `076280002775` | https://hilifevitamins.com/products/solaray-076280002775 | 3 retailer spec | spec field. HiLife title Menopause Blend SP-7D, 100 veg caps. Her Life Stages menopause 60-count was not copied. |

## (b) Already-had

Unchanged from #386, #387, and #388. Not overwritten.

| row id | product name | pack | UPC |
| --- | --- | --- | --- |
| `solaray-b119-076280194104` | Solaray Organic Nettle Leaf 900mg (100 ct) | 100 ct | `076280194104` |
| `solaray-b131-076280041026` | Solaray Astaxanthin 1mg (60ct) | 60 ct | `076280041026` |
| `solaray-b131-076280008074` | Solaray Flaxseed Oil 1000mg (240ct) | 240 ct | `076280008074` |

## (c) Still empty among the 36

Parked, not a Search row: Liposomal Multivitamin Universal. 076280830385 not attached. https://solaray.com/products/liposomal-multivitamin-universal

DailyMed for every row below: https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?drug_name=solaray (0 SPLs).

| row id | product name | pack/form | class | reason | last URLs |
| --- | --- | --- | --- | --- | --- |
| `solaray-b116-magnesium-glycinate-powder-9-8oz` | Solaray Magnesium Glycinate Powder (9.8 oz) | powder | source fight | Same code 076280709711 on two packs. Swanson 9.8 oz product JSON barcode 076280709711. HerbsPro 9.8 oz barcode 076280709711, but that page's ingredients block is BioPerine, not this row's citric acid. Vitacost, Target, and HiLife put 076280709711 on the 6 oz (179 g) bottle whose scoop is 3.57 g. Official front label, zbar 0 symbols. Not attached. | https://solaray.com/products/magnesium-glycinate-powder https://www.swansonvitamins.com/products/solaray-magnesium-glycinate-powder-unflavored-350-mg-9-8-oz-pwdr https://www.herbspro.com/products/magnesium-glycinate-316746 https://hilifevitamins.com/products/solaray-076280709711 https://www.vitacost.com/products/solaray-high-absorption-magnesium-glycinate-unflavored-6-oz-179-g-145107 |
| `solaray-b116-tart-cherry-concentrate-16floz` | Solaray Tart Cherry Concentrate (16 fl oz) | liquid | source fight | HerbsPro page titled Organic Tart Cherry Juice, 16 oz, barcode 076280985221, facts empty. The opened facts page (juice concentrate 31.5 g) is barcode 076280502596, already on the juice row. No second US carton confirmed 36 g concentrate on 076280985221. Front label, zbar 0 symbols. | https://solaray.com/products/tart-cherry-16oz https://www.herbspro.com/products/organic-tart-cherry-juice-347610 https://www.herbspro.com/products/organic-tart-cherry |
| `solaray-b117-076280261691` | Solaray CoQ-10 (30ct / 200 mg) | capsule | source fight | Same code 076280261691 on two opened panels. HiLife facts: CoQ-10 200 mg, vegetable cellulose capsule, 30 capsules. HerbsPro facts on that barcode: CoQ-10 100 mg, gelatin capsule, hawthorn and lecithin. Not attached. The phytosome code 076280931471 was not copied. | https://solaray.com/products/coq-10 https://hilifevitamins.com/products/solaray-076280261691 https://www.herbspro.com/products/coq10-138906 |
| `solaray-b117-076280034707` | Solaray Garlic Bulb Extract, Odor-Free 500mg (60ct) | capsule | form mismatch | HiLife garlic 500 mg, 60 caps, barcode 076280034707, other ingredients gelatin capsule and cellulose. This row is the odor-free vegetable-cellulose panel. Gelatin was not attached. | https://solaray.com/products/garlic-bulb-extract-odor-free https://hilifevitamins.com/products/solaray-076280034707 https://www.herbspro.com/products/garlic-2 |
| `solaray-b117-076280048254` | Solaray Acidophilus 3 Strain Probiotic & Prebiotic Carrot Juice (30ct) | capsule | form mismatch | HiLife 30-count page barcode 076280048254 lists gelatin capsule. This row's panel is vegetable cellulose capsule. The 60ct and 120ct vegetable-cellulose codes were attached on those rows and were not copied here. | https://solaray.com/products/acidophilus-3-strain-probiotic-prebiotic-carrot-juice https://hilifevitamins.com/products/solaray-076280048254 |
| `solaray-b117-076280375756` | Solaray Olive Leaf Ext Double Strength 500mg (30ct) | capsule | form mismatch | HiLife and HerbsPro both barcode 076280375756 on olive leaf extract 500 mg, 30 count, and both other-ingredient lines say gelatin capsule. This row is vegetable cellulose capsule. | https://solaray.com/products/olive-leaf-ext-double-strength https://hilifevitamins.com/products/solaray-076280375756 https://www.herbspro.com/products/olive-leaf-two-daily |
| `solaray-b128-076280002805` | Solaray Heart Blend SP-8 (100ct) | capsule | form mismatch | Opened UPC field 076280002805 is on a gelatin-capsule Heart Blend SP-8, 100 caps. This row is vegetable cellulose capsule with rice flour. HiLife had no page for this code. | https://solaray.com/products/heart-blend-sp-8 https://ingvitamin.store.turbify.net/076280002805.html |
| `solaray-b129-076280045772` | Solaray Boron Citrate 3mg (60ct) | capsule | title vs facts | HiLife title says Boron BioCitrate 500 mcg, 60 veg caps, barcode 076280045772. The same page's facts say boron citrate complex 3 mg. Title and facts disagree, so the code was not attached. The separate 500 mcg BioCitrate listing was not copied. | https://solaray.com/products/boron-citrate https://hilifevitamins.com/products/solaray-076280045772 https://www.herbspro.com/products/biocitrate-boron |
| `solaray-b117-076280399011` | Solaray Arjuna Bark Extract (60ct) | capsule | no US UPC found | No arjuna hit in the Vitacost or HerbsPro Solaray collections. HiLife `solaray-076280399011` returned 404. solaray.com barcode echoes the part number. | https://solaray.com/products/arjuna-bark-extract |
| `solaray-b117-X003KT6RIN` | Solaray Tongkat Ali 400mg (180ct) | capsule | no US UPC found | Opened tongkat ali 400 mg is 60 veg caps. solaray.com 180ct barcode field is the ASIN, not a GTIN-12. The 60ct code was not copied. | https://solaray.com/products/tongkat-ali-root https://www.vitacost.com/products/solaray-tongkat-ali-400-mg-60-vegcaps-99983 |
| `solaray-b117-X0042AEJKH` | Solaray Mullein Leaf 330mg (200ct) | capsule | no US UPC found | solaray.com 200ct barcode field is 076280898491. HerbsPro Mullein 200 veg caps barcode field is the ASIN. HiLife has the 100ct only (076280013900), already on that row. Front label, zbar 0 symbols. | https://solaray.com/products/mullein-leaf https://www.herbspro.com/products/mullein-347600 |
| `solaray-b123-076280733495` | Solaray Oregano + Black Seed Oil | softgel | no US UPC found | No oregano-plus-black-seed listing in the Vitacost or HerbsPro Solaray collections. HiLife `solaray-076280733495` returned 404. Front label, zbar 0 symbols. Oregano oil and black seed oil singles were not copied. | https://solaray.com/products/oregano-black-seed-oil |
| `solaray-b126-076280370201` | Solaray Immufight Daily Defense (60ct) | capsule | no US UPC found | HiLife title is ImmuFight Daily Defense, 60 veg caps, barcode field 076280370201, and the description is empty, so the panel was not read. Not attached. The 90ct Maximum Daily Defense code was not copied. | https://solaray.com/products/immufight-daily-defense https://hilifevitamins.com/products/solaray-076280370201 |
| `solaray-b126-X003KT6VTD` | Solaray Sugar-Free L-Theanine Chewable, Lemon-Lime Flavor (75 CT) | chewable | no US UPC found | Opened lemon-lime chewable is 30 count. solaray.com 75 CT barcode field is empty. Front label, zbar 0 symbols. The 30-count code was not copied. | https://solaray.com/products/solaray-l-theanine-chewable-supplement-200-mg-30-count |
| `solaray-b130-X0042AF2L7` | Solaray Oil Of Oregano 150mg (120ct) | softgel | no US UPC found | solaray.com 120ct barcode field is 076280126709. HerbsPro Oil of Oregano 120 softgels barcode field is the ASIN. HiLife `solaray-076280126709` returned 404. Vitacost and Swanson list the 60 softgel only (076280082524). Front label, zbar 0 symbols. The 60ct code was not copied. | https://solaray.com/products/oil-of-oregano https://www.herbspro.com/products/oil-of-oregano-347559 https://www.vitacost.com/products/solaray-true-herbs-oil-of-oregano-150-mg-60-softgels-18956 |

## (d) Pack and form mismatches left empty, untouched

These 26 rows are the ladder 3 pack-mismatch (10) and form-mismatch (16) rows. No barcode was written. No field was edited.

| row id | product name | ladder 3 class |
| --- | --- | --- |
| `solaray-b116-oat-fiber-2-63oz` | Solaray Oat Fiber (2.63 oz / 74.7 g) | pack mismatch |
| `solaray-b116-psyllium-husk-fiber-6oz` | Solaray Psyllium Husk Fiber (6 oz, Unflavored) | pack mismatch |
| `solaray-b116-psyllium-whole-husk-350g` | Solaray Psyllium Whole Husk (350 g, Unflavored) | pack mismatch |
| `solaray-b117-076280116632` | Solaray Cinnamon Bark 1000mg (60ct) | pack mismatch |
| `solaray-b117-076280505139` | Solaray Extended-Release Melatonin with L-Glycine (30 ct) | pack mismatch |
| `solaray-b117-076280661668` | Solaray Maca Root Powder (7.4 oz / 210 g) | pack mismatch |
| `solaray-b121-076280399134` | Solaray Holy Basil Aerial Extract 900mg (60ct) | pack mismatch |
| `solaray-b123-076280043549` | Solaray Biotin Lozenge 1000mcg (60ct) | pack mismatch |
| `solaray-b124-076280222548` | Solaray Electrolyte Recovery, Pink Lemonade (249 g) | pack mismatch |
| `solaray-b124-076280739503` | Solaray Extra-Strength Magnesium Glycinate Powder 500 mg, Lemon Lime (279 g) | pack mismatch |
| `solaray-b117-076280044546` | Solaray Vitamin C With Rose Hips & Acerola 1000mg (250ct) | form mismatch |
| `solaray-b120-076280045888` | Solaray Chromium Picolinate 200mcg (50 ct) | form mismatch |
| `solaray-b120-076280045895` | Solaray Chromium Picolinate 200mcg (100 ct) | form mismatch |
| `solaray-b123-076280042658` | Solaray Vitamin B-Complex - Strawberry (50ct) | form mismatch |
| `solaray-b123-076280043457` | Solaray Vitamin B-12 1000mcg (90ct) | form mismatch |
| `solaray-b123-076280043501` | Solaray Vitamin B-12 2000mcg (90ct) | form mismatch |
| `solaray-b123-076280043518` | Solaray Vitamin B-12, (5000mcg) (30ct) | form mismatch |
| `solaray-b123-076280084245` | Solaray CranActin Chewables (60ct) | form mismatch |
| `solaray-b123-076280265354` | Solaray Papaya Enzyme (90ct) | form mismatch |
| `solaray-b123-076280293371` | Solaray Methyl B-12 - Lemon-Raspberry (60ct) | form mismatch |
| `solaray-b123-076280406207` | Solaray Vitamin B-Complex - Orange (50ct) | form mismatch |
| `solaray-b123-076280462128` | Solaray Papaya Enzyme (180ct) | form mismatch |
| `solaray-b123-076280578959` | Solaray Methyl Folate 1000mcg (60ct) | form mismatch |
| `solaray-b123-076280685206` | Solaray Methyl B-12 & Methyl Folate (60ct) | form mismatch |
| `solaray-b123-076280796452` | Solaray Vitamin D-3, 50mcg (60ct) | form mismatch |
| `solaray-b123-076280938449` | Solaray Choline | form mismatch |

## Counts

- Newly attached: 21
- Already-had: 3
- Still-empty of the 36: 15
- source fight: 3
- form mismatch (inside the 36): 4
- title vs facts: 1
- no US UPC found: 7
- pack + form mismatches left empty, untouched: 26
- in-store 73: not touched
