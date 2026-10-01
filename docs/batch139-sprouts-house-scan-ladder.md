# Batch 139 — Sprouts house scan ladder

Founder override for this batch only. Sprouts house supplements were scanned. A Search row was added only when that exact pack had both a real other-ingredients panel and a 12-digit UPC.

## Path

1. DailyMed `spls.json` drug_name search for Sprouts N-Acetyl Cysteine (and the same house-brand pattern) returned `total_elements: 0` on 2026-10-01. No SPL was copied.
2. shop.sprouts.com collection `rc-sprouts-brand-vitamins` at Leesburg store #888. The Items payload `retailerLookupCodeString` is the official `UPC:` field (GTIN-14). A 14-digit value with two leading zeros was kept only after the UPC-A check digit matched. Product pages were opened from that shop session. Every carousel tile that rendered was opened. The Details text was read. `ProductNutritionalInfo` was null, so ingredients were taken from the label photo, not from an API blurb.
3. Google was not used as the source of any other-ingredients list or any UPC on a written row.

NDC was not treated as a UPC. Image filenames were not treated as UPCs. A sibling pack's panel was not copied. The magnesium glycinate 180 ct front was not given the 90 ct panel.

## Written

| Pack | Grade | formulaId | UPC | UPC source |
|---|---|---|---|---|
| Sprouts N-Acetyl Cysteine 600 mg, 60 ct | Caution | sprouts-b139-nac-600 | 646670671616 | PDP UPC field 00646670671616, check digit ok. Gallery 2 of 2. |
| Sprouts Magnesium Glycinate 400 mg, 90 ct | Caution | sprouts-b139-mag-glycinate-400 | 646670673368 | PDP UPC field 00646670673368, check digit ok. Gallery 2 of 2. |
| Sprouts Neem Powder Cap, 90 ct | Clean | sprouts-b139-neem | 646670621291 | PDP UPC field 00646670621291, check digit ok. Gallery 2 of 2. |
| Sprouts Blood Sugar Harmony Powder Cap, 90 ct | Clean | sprouts-b139-blood-sugar-harmony | 646670620164 | PDP UPC field 00646670620164, check digit ok. Gallery 2 of 2. |

## Held

Grain alcohol, do not write: Sprouts Garlic 1 fl oz 646670121401; Sprouts Parasite Cleanse 1 fl oz 646670631405; Sprouts Detox 1 fl oz 646670116513. The shop UPC field matched those three codes. The 1 fl oz parasite and detox codes are already on the existing liquid rows.

Chlorophyll Glycerite 1 fl oz, UPC field 00646670620201 (646670620201, check digit ok). Gallery 2 of 2 other ingredients: vegetable glycerin, deionized water. Vegetable glycerin is Cleared. Deionized water is still an unstamped token (Solaray refuse lists through batch122). No row.

## Missing other ingredients (panel not on the opened PDP)

Front or facts image only. UPC field was present. No other-ingredients line.

- Sprouts Plant Based Liver Detox Complex, 60 ct. Facts image has the blend and no Other Ingredients line. UPC 646670673276.
- Sprouts Organic Once Daily Men's Multivitamin, 60 ct. One front image. Details text names the caplet and count only. UPC 646670548550.
- Sprouts UT Support Probiotic Blend For Women 50 Billion CFU, 30 ct. One front image. This is the capsule, not the refused liquid. UPC 646670699122.
- Sprouts Magnesium Glycinate 400 mg, 180 ct. One front image. UPC 646670545764.
- Sprouts Activated K2 75 mcg, 60 ct. One front image. UPC 646670528651.

## Missing UPC

Rows already exist. Shop search and the vitamin collection did not show a code under the bars for these packs. No new row.

- Sprouts Lion's Mane Liquid
- Sprouts Moringa 100% Powder
- Sprouts Saw Palmetto Powder Cap

## Missing both

- Sprouts UT Support liquid. Not in the 253-item vitamin collection. Shop search returned the 30 ct probiotic, not a liquid. No panel and no UPC opened.

## Not written

Oils wall (name and front only, no row): Organic MCT Oil, Organic Coconut Oil, Organic Oregano Oil 1 fl oz, Raw Black Seed Oil, Flaxseed Oil. Prenatal Once Daily 60 ct is already written. Reishi 60 ct UPC 646670549199 is already on `sprouts-reishi-cap`.
