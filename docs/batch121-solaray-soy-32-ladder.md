# Batch 121 — per-SKU Other Ingredients ladder

Solaray only. The 32 `BATCH120_SKIPPED_NO_OI` SKUs. Stop at the first rung that prints Other Ingredients for the exact pack. Robot / captcha / 403 skips that URL. An AI blurb is never OI or UPC. Walmart search HTTP 200 whose final URL is `/blocked` (title “Robot or human?”) is logged as robot.

Retailer search probe (the 12 SKUs whose solaray.com carousel did not have an exact-pack Supplement Facts image) is in the run log below. Search URLs:

- iHerb `https://www.iherb.com/search?kw=solaray%20{SKU}` — HTTP 403, all 12
- Vitacost `https://www.vitacost.com/search?search=solaray%20{SKU}` — robot, all 12
- Walmart `https://www.walmart.com/search?q=solaray%20{SKU}` — final `https://www.walmart.com/blocked?...` robot, all 12
- Target `https://www.target.com/s?searchTerm=solaray%20{SKU}` — robot, all 12
- Amazon `https://www.amazon.com/s?k=solaray%20{SKU}` — HTTP 503 except 076280012118 and 076280970500 (HTTP 200 search shell, no `/dp/` link, no OI)

## Found on the exact solaray.com Supplement Facts image (later rungs not attempted)

| SKU | Pack | Facts image | Outcome |
| --- | --- | --- | --- |
| 076280174045 | Tart Cherry & Celery Seed 620mg 60ct | `lb_facts_076280174045.png` on https://www.solaray.com/products/tart-cherry-celery-seed | found OI. Write Caution (Silica). |
| 076280446869 | Mega Quercetin 600mg 60ct | `076280446869-Solaray-MegaQuercetin60ct_SFP_Final.png` on https://www.solaray.com/products/mega-quercetin | found OI. Write Caution (Silica). |
| 076280850406 | Spectro Man Multivitamin 120ct | `076280850406-Solaray-SpectroMultivitaminMan120ct-..._SFP.png` on https://www.solaray.com/products/spectro-man-multi-vitamin | found OI. Write Caution. |
| 076280399134 | Holy Basil Aerial Extract 900mg 60ct | `076280399134-Solaray-HolyBasil60ct_SFP_Final.png` on https://www.solaray.com/products/holy-basil-aerial-extract | found OI. Write Clean. |
| 076280731767 | Bacillus Coagulans 60ct | `076280731767-Solaray-BacillusCoagulans60ct_SFP_Final.png` on https://www.solaray.com/products/bacillus-coagulans | found OI. Write Caution (Maltodextrin). |
| 076280105056 | Mushroom Complete 1175mg 60ct | `lbl_facts_076280105056.jpg` on https://www.solaray.com/products/mushroom-complete | found OI. Write Clean. |
| 076280031737 | Black Cohosh Root Extract 80mg 30ct | `lb_facts_076280031737.png` on https://www.solaray.com/products/black-cohosh-root-extract | found OI. Write Caution. |
| 076280031119 | Bilberry Extract 60mg 120ct | `lb_facts_076280031119.png` on https://www.solaray.com/products/copy-of-bilberry-berry-extract | found OI. Write Caution. 120 servings. |
| 076280200553 | Once Daily Active Man 90ct | `0762802005530-Solaray-MultiActiveMan-90ct_SFP_Final.png` on https://www.solaray.com/products/once-daily-active-man-multi-vitamin | found OI. REFUSE `Gum Acacia`. |
| 076280127409 | Vitamin B-6 Timed-Release 60ct / 50 mg | `lb_facts_076280127409.png` on https://www.solaray.com/products/vitamin-b-6-timed-release | found OI. REFUSE Whole Food Base string. |
| 076280127423 | Vitamin B-6 Timed-Release 60ct / 100 mg | `076280127423_lbl_facts.jpg` on the same PDP | found OI. REFUSE same Whole Food Base string. |
| 076280034004 | Echinacea Angustifolia Root Ext 125mg 60ct | `076280034004_lbl_facts.jpg` on https://www.solaray.com/products/echinacea-angustifolia-root-ext | found OI. REFUSE `Maltodextrin (from Non-GMO Corn)`. |
| 076280042405 | Mega Vitamin B-Stress Timed-Release 60ct | `lbl_facts_076280042405.jpg` on https://www.solaray.com/products/mega-vitamin-b-stress-timed-release | found OI. REFUSE Whole Food Base (Pure Aloe Vera Gel). |
| 076280648843 | Cal-Mag Citrate w/D-3 & K-2 180ct | `076280648843-Solaray-Cal-MagCitrate180ct_SFP_Final.png` on https://www.solaray.com/products/cal-mag-citrate-w-d-3-k-2 | found OI. REFUSE Alfalfa Leaf; Watercress Leaf; Dandelion Root. |
| 076280193251 | Liposomal Multivitamin Women's 60ct | `lb_facts_076280193251.png` on https://www.solaray.com/products/liposomal-multivitamin-womens | found OI. REFUSE Lipid Blend from Sunflower Oil and Sustainable Palm Oil; Modified Tapioca Starch. |
| 076280047431 | Multi Energy Two Daily 120ct | `076280047431-Solaray-Multi_Energy-120ct_SFP_Final_....png` on https://www.solaray.com/products/solaray-multi-energy-two-daily-capsule-btl-plastic-120ct | found OI. REFUSE Eleuthero Root; Sucrose; Carrot Juice Powder; Soybean Oil. |
| 076280355307 | Mycrobiome Prebiotic 5.64oz Citrus | `076280355307-Solaray-PrebioticPowderCitrus-..._SFP.png` on https://www.solaray.com/products/mycrobiome-prebiotic | found OI. REFUSE Natural Mandarin Orange Flavor with Other Natural Flavors; Himalayan Pink Salt. |
| 076280874969 | Vitamin K-2 MK-7 50mcg 60ct | `lb_facts_076280874969.png` on https://www.solaray.com/products/vitamin-k-2-mk-7-50mcg | found OI. REFUSE Fermented Defatted Chickpea Flour Extract. |
| 076280045307 | Calcium & Magnesium AAC 2:1 90ct | `lbl_facts_076280045307.jpg` on https://www.solaray.com/products/calcium-magnesium-amino-acid-chelate-2-1-ratio | found OI. REFUSE parenthetical citric acid and the herb strings. |
| 076280047967 | Children's Multivitamin 60ct | `076280047967-Solaray-KidsVitaminsMineralsChewables-..._SFP.png` on https://www.solaray.com/products/childrens-multi-vitamin | found OI. Chewable, not a pour bottle. REFUSE Fructose; Natural Cherry Flavor with other Natural Flavors; Hydrogenated Soybean Oil; Glucono Delta Lactone; Rose Hips; Acerola Cherry. |

## Exact pack still needed a later rung

### 076280031102 Bilberry Extract 60mg 60ct — WRITE Caution

1. https://www.solaray.com/products/copy-of-bilberry-berry-extract — facts tile `lb_facts_076280031119.png` is the 120ct sibling. Not the exact pack.
2. iHerb search — 403.
3. Vitacost search — robot.
4. Walmart search — robot (`/blocked`).
5. Target search — robot.
6. Amazon search — HTTP 503.
7. Opened https://www.swansonvitamins.com/p/solaray-bilberry-extract-60-mg-60-veg-caps — found OI for 60 VegCaps, servings 60. Schema gtin equals the SKU; not read under the bars. UPC blank.

### 076280385847 Vitamin D3 + K2 60ct — WRITE Caution

1. https://www.solaray.com/products/vitamin-d-3-k-2-125-mcg — 60ct tile is a marketing front. SFP on the PDP is the 120ct sibling. Not the exact pack.
2. iHerb / Vitacost / Walmart / Target search — 403 or robot. Amazon search — HTTP 503.
3. Opened https://www.vitacost.com/products/solaray-vitamin-d3-k2-60-vegcaps-70098 — found OI. Page UPC field 076280385847, not read under the bars. Other US pages that add rice bran extract were not merged.

### 076280088922 Red Yeast Rice + CoQ-10 60ct — WRITE Caution

1. https://www.solaray.com/products/red-yeast-rice-plus-coq-10 — carousel SFP file is Amazon 100ct `X002IKEK3T`, not this pack. Ingredients accordion on the same PDP prints Vegetable Cellulose Capsule, Rice Flour, Silica and Magnesium Stearate (product-level, both counts listed).
2. iHerb / Vitacost / Walmart / Target search — 403 or robot. Amazon search — HTTP 503.
3. Opened https://www.nhc.com/products/red-yeast-rice-coq10-by-solaray — 60 veg caps, servings 60, same OI. Used as the exact-pack cite.

### 076280970500 SharpMind Nootropics Mood 30ct — WRITE Caution

1. https://www.solaray.com/products/sharpmind-nootropics-mood — carousel tiles are front/lifestyle. No Supplement Facts.
2. iHerb / Vitacost / Walmart / Target search — 403 or robot. Amazon search HTTP 200, no `/dp/` link, no OI.
3. Opened https://www.pureformulas.com/product/sharpmind-mood/1000062266 — 30 VegCaps, found OI. All tokens locked.

### 076280083637 Cleanse - Liver 60ct — WRITE Caution

1. https://www.solaray.com/products/cleanse-liver — front image only. No OI.
2. iHerb search 403. Vitacost search robot. Walmart `/blocked` robot. Target search robot. Amazon search HTTP 503.
3. Google, then opened https://www.vitacost.com/products/solaray-total-cleanse-liver-60-vegetarian-capsules-25557 — found OI. UPC field 076280083637, not read under the bars. Also opened https://www.nhc.com/products/total-cleanse-liver-formula-by-solaray — same OI, no UPC printed.

### 076280012118 Dandelion Root 1040mg 180ct — REFUSE

1. https://www.solaray.com/products/dandelion-root — facts tile `lb_facts_076280012101.png` is the 100ct. Not this pack.
2. iHerb / Vitacost / Walmart / Target search — 403 or robot. Amazon search HTTP 200, no `/dp/` link, no OI.
3. Opened https://vitanetonline.com/description/1211/vitamins/Dandelion-Root/ — titled 180ct 1040mg. Found OI. REFUSE `Rice Extract Blend`. A conflicting DSLD line was not merged.

### 076280037661 Saw Palmetto & Pygeum 30ct — REFUSE

1. https://www.solaray.com/products/pygeum-bark-saw-palmetto-ext — facts tile `076280037678_lbl_facts.jpg` is the 60ct. Not this pack.
2. iHerb / Vitacost / Walmart / Target search — 403 or robot. Amazon search HTTP 503.
3. Opened https://vitanetonline.com/description/3766/vitamins/One-Daily-Saw-Palmetto-and-Pygeum/ — titled 30ct. Found OI. `Lecithin (Soy)` maps to the Job 1 case alias. REFUSE `Softgel (Gelatin)`; `Pumpkin Seed Oil`; `Nettle Leaf`; `L-Alanine`; `Glutamic Acid`. Softgel, not a pour bottle.

### 076280048018 Super Digestaway 90ct — REFUSE

1. https://www.solaray.com/products/super-digestaway-digestive-enzyme-blend — SFP on the PDP is the 60ct (076280048001). 90ct tile is a front. Not copied.
2. iHerb / Vitacost / Walmart / Target search — 403 or robot. Amazon search HTTP 503.
3. Opened https://www.iherb.com/pr/solaray-super-digestaway-90-vegcaps/70071 — Cloudflare robot.
4. Opened https://vitanetonline.com/description/4801/vitamins/Super-Digestaway/ — titled 90ct. Found OI. REFUSE `Maltodextrin (from Non-GMO Corn)`.

### 076280048025 Super Digestaway 180ct — REFUSE

1. Same solaray PDP. 180ct tile is a front. 60ct SFP not copied.
2. iHerb / Vitacost / Walmart / Target search — 403 or robot. Amazon search HTTP 503.
3. Opened https://www.vitacost.com/products/solaray-super-digestaway-180-vegcaps-18993 — UPC field 076280048025, 180 count, same unknown. REFUSE `Maltodextrin (from Non-GMO Corn)`.

### 076280083644 Total Cleanse Kidney 60ct — REFUSE

1. https://www.solaray.com/products/total-cleanse-kidney — opened. Ingredients accordion lists the blend plus Vegetable Cellulose Capsule, Maltodextrin, Magnesium Sterate, Silica and Cellulose. Found OI. REFUSE exact string `Magnesium Sterate` (not the magnesium stearate lock).
2. iHerb search 403. Direct https://www.iherb.com/pr/solaray-total-cleanse-kidneys-60-vegcaps/37557 — Cloudflare robot.
3. Vitacost search robot. Walmart `/blocked` robot. Amazon search HTTP 503.
4. Opened https://www.target.com/p/solaray-total-cleanse-kidneys-60-vegcaps/-/A-1002538795 — page returned without an ingredients line. No OI on that fetch.
5. Google snippets repeat “magnesium sterate”. Not used as a second panel.

### 076280121551 Red Yeast Rice + CoQ-10 90ct — no_OI leftover

1. https://www.solaray.com/products/red-yeast-rice-plus-coq-10 — SFP file is Amazon 100ct, not 90ct. Ingredients accordion is one product line for both counts. Not copied onto the 90ct.
2. iHerb / Vitacost / Walmart / Target search — 403 or robot. Amazon search HTTP 503.
3. Opened https://www.betterlife.com/product/red-yeast-rice-plus-coq10-600-slash-30-mg/30916 — page says the content was generated by AI. Not used.
4. Google: https://thesupplementshop.com.au/products/solaray-red-yeast-rice-coq-10-90-vegcaps and https://www.nahdionline.com/en-ae/103211708/pdp/103211708 are not US. https://vitanetonline.com/description/8892/vitamins/Red-Yeast-Rice-Plus-CoQ10/ is the 60ct SKU 076280088922. No US non-AI page for 076280121551 was opened.

### 076280830385 Liposomal Multivitamin Universal 60ct — no_OI leftover

1. https://www.solaray.com/products/liposomal-multivitamin-universal — facts tile `lb_facts_076280640168.png` is a different SKU. Not this pack.
2. iHerb / Vitacost / Walmart / Target search — 403 or robot. Amazon search HTTP 503.
3. Opened https://vitanetonline.com/description/64016/vitamins/Universal-Liposomal-Multivitamin/ — description id 64016 matches SKU 076280640168, not 076280830385. Not the exact pack.
4. Opened https://www.nhc.com/products/high-potency-liposomal-multivitamin-universal-by-solaray — 60 VegCaps, no UPC printed. Not tied to 076280830385.
5. Opened https://www.keepbodyhealth.com/product/solaray-liposomal-universal-multivitamin/ — OI present, no SKU and no count printed. Not the exact pack.
6. Opened https://betterhealthmarket.com/solaray-liposomal-multivitamin-universal-60vegcaps — barcode string `0007628064016` is SKU 076280640168. Not this pack. Facts table is garbled.
7. Google also surfaced https://duocpham.com.vn/solaray-liposomal-multivitamin-universal-120-vegcaps-076280830385 — not US, and the title says 120 VegCaps. Not opened as an OI source.

## Job 1

`Lecithin (Soy)` was stamped. It does not fully unlock a refused row. Peppermint Oil, Enteric Coated 076280008685 still has Soybean Oil, Aqueous Coating, Chlorophyll, and Zinc Oxide. Job 1 writes = 0.

Hunt-list pour bottles: none. SKIPPED OUT: none.
