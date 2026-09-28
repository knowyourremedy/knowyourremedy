# Batch 122 — per-SKU Other Ingredients ladder

Solaray only. Job 1 writes the refused packs the five Sept 28 stamps fully unlock. Job 2 is the two leftover no_OI SKUs. Robot / captcha / 403 skips that URL. An AI blurb is never OI or UPC. Walmart search HTTP 200 whose final URL is a robot wall is logged as robot.

## Job 1 — found on a solaray.com facts image or ingredients accordion

### 076280008685 Peppermint Oil, Enteric Coated 60ct softgel — WRITE Caution

1. https://www.solaray.com/products/peppermint-oil-enteric-coated — facts image `lb_facts_076280008685.png` opened. Serving 1 softgel, 60 servings. Other Ingredients: Soybean Oil, Gelatin, Glycerin, Aqueous Coating, Beeswax, Lecithin (Soy), Chlorophyll, Zinc Oxide and Purified Water. Found OI. Later rungs not attempted. Enteric softgel, not a pour bottle.

### 076280083644 Total Cleanse Kidney 60ct — WRITE Caution

1. https://www.solaray.com/products/total-cleanse-kidney — opened. Only a front image in the carousel. Ingredients accordion lists the blend plus Vegetable Cellulose Capsule, Maltodextrin, Magnesium Sterate, Silica and Cellulose. Found OI. `Magnesium Sterate` was the last unknown token and maps to the stearate lubricant. Later rungs not attempted.

### 076280041637 Vitamin E, Mixed Tocopherols 268mg 100ct softgel — WRITE Clean

1. https://www.solaray.com/products/vitamin-e-d-alpha-tocopherol-268-mg-400-iu — facts image `lb_facts_076280041637.png` opened. Serving 1 softgel, 100 servings. Other Ingredients: Soybean Oil and Softgel (Gelatin and Glycerin). Found OI. Softgel fill, not a pour bottle. Later rungs not attempted.

### 076280041620 Vitamin E, Mixed Tocopherols 268mg 50ct softgel — WRITE Clean (same formula)

1. Same PDP. Variants are 50ct and 100ct. Ingredients accordion opened: Vitamin E (as d-Alpha Tocopherol), Mixed Tocopherols, Soybean Oil, Softgel (Gelatin and Glycerin). 50ct tile `076280041620_4.jpg` is the front (50 softgels) and has no Supplement Facts. The 100ct facts image is the only SFP and matches that accordion line.
2. iHerb search `https://www.iherb.com/search?kw=solaray%20076280041620` — 403 robot.
3. Vitacost search — robot. Walmart search — robot. Target search — robot. Amazon search — HTTP 503.
4. Opened https://vitanetonline.com/description/4162/vitamins/Vitamin-E-Mixed-Tocopherols/ — titled 50ct and prints UPC field 076280041620, but the page is a long generated essay and its mixed-tocopherol amount (5 mg) conflicts with the brand 100ct facts image (67 mg). Not used as OI. Grade uses the brand accordion plus the matching 100ct facts line.

Packs that still have a non-stamped token were not written: Food Carotene 30ct (Mixed Carotenoids; Ascorbyl Palmitate); B-Complex Strawberry gummy and B-Complex Orange gummy (flavors, monoglycerides, diglycerides, stevia, and the tapioca citric-acid string); Multi Energy Two Daily (Eleuthero Root; Sucrose; Carrot Juice Powder). Gummy soybean oil stays Avoid and was not graded while those other tokens remain.

## Job 2

### 076280121551 Red Yeast Rice + CoQ-10 90ct — WRITE Caution

1. https://www.solaray.com/products/red-yeast-rice-plus-coq-10 — variants 60ct `076280088922` and 90ct `076280121551`. 90ct image is a front. The only SFP file is Amazon 100ct `X002IKEK3T`, not this pack. Ingredients accordion opened: Niacin, Red Yeast Rice, Coenzyme Q-10, Vegetable Cellulose Capsule, Rice Flour, Silica and Magnesium Stearate.
2. iHerb search — 403 robot.
3. Vitacost search — robot.
4. Walmart search — robot (`Robot or human?`).
5. Target search — robot.
6. Amazon search — HTTP 503.
7. Google, then opened https://www.swansonvitamins.com/p/solaray-red-yeast-rice-plus-coq10-90-vcaps — 90 VegCaps, servings 90, same Other Ingredients. Schema gtin 076280121551 was not read under the bars. Also opened https://goodsandnaturals.com/solaray-red-yeast-rice-coq-10-90-vegcaps/ — UPC field 076280121551 and the same Other Ingredients. HiLife Canada was not used. A DSLD line that says Cellulose instead of Vegetable Cellulose Capsule was not merged.

### 076280830385 Liposomal Multivitamin Universal 60ct — no_OI leftover

1. https://www.solaray.com/products/liposomal-multivitamin-universal — variant SKU 076280830385. Carousel facts tile is `lb_facts_076280640168.png` (SKU 076280640168). Not this pack. Ingredients accordion on the fetch had no ingredient line.
2. iHerb search `https://www.iherb.com/search?kw=solaray%20076280830385` — 403 robot.
3. Vitacost search — robot.
4. Walmart search — robot.
5. Target search — robot.
6. Amazon search — HTTP 503.
7. Google, then opened https://vitanetonline.com/description/64016/vitamins/Universal-Liposomal-Multivitamin/ — description id 64016 is SKU 076280640168, not 076280830385. Not the exact pack. Search hits for https://thebetterhealthstore.com/solaray-liposomal-multivitamin-universal-60vegcaps print barcode string 0007628064016 (SKU 076280640168). https://hilifevitamins.com/products/solaray-076280640168 is the other SKU. No opened US page printed 076280830385 with an Other Ingredients line.

Hunt-list pour bottles: none. SKIPPED OUT: none.
