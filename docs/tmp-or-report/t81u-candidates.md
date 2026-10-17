# t81u — US supplement brand candidates (ladder steps 1–2)

**Branch:** `cursor/t81u-candidates-04e1`  
**Generated:** 2026-10-17T05:40:39.700Z  
**Mode:** READ ONLY enumeration — no catalog rows written.

## Methodology

- **Ladder steps:** (1) DailyMed / official drug label when NDC exists; (2) official brand site — every count tab and accordion. Retailer PDPs are **not** opened in this pass (pending stores).
- **DailyMed:** 0 drug SPLs / no setid for these supplement brands at DailyMed step 1.
- **Excluded MAIN rows (any matching count → `DUP`, not re-listed as write candidates):** `schiff-b189-neuriva-original-30`, `move-free-b188-advanced-80`, `move-free-b189-advanced-msm-120`, `caltrate-b187-600-d3-60`, `caltrate-b187-600-d3-200`, `caltrate-b188-600-d3-120`, `slowfe-b187-iron-60`, `rainbow-b187-womens-one-30`, `rainbow-b187-womens-one-150`, `rainbow-b188-womens-one-60`.
- **Search tabs:** From PROJECT_NOTES night photo aisle order (lines 541–548):
1 Pain & Fever → 2 Cold & Flu → 3 Allergies → 4 Sleep → 5 Immune Support → 6 First Aid → 7 Vitamins → 8 Prenatal → 9 Digestive
- **Tokens:** Token check uses exact Methodology §5 table rows only (PROJECT_NOTES hunt order + METH §5). Actives on Supplement Facts are ungraded per batch187–189 founder rule; row verdict from Other Ingredients only.
- **Calls:** `WRITE-READY (pending stores)` = panel + tokens OK at steps 1–2 but sale/UPC ladder not run; `HOLD-PANEL` / `HOLD-TOKEN` / `NO TAB` / `DUP` as labeled.

## Summary counts (non-DUP candidates)

| Brand | Distinct count-variant candidates |
| --- | ---: |
| Schiff | 144 |
| Move Free | 35 |
| Osteo Bi-Flex | 10 |
| Caltrate | 6 |
| Citracal | 11 |
| Slow Fe | 1 |
| Rainbow Light | 85 |
| **Total non-DUP** | **292** |


---

## Schiff

**Candidates enumerated:** 146 (144 non-DUP, 2 DUP vs MAIN).

Scope: schiffvitamins.com collections excluding Move Free / Osteo Bi-Flex product URLs. Gatsby `page-data.json` parsed for `netContentStatement` count variants.

#### 1. neuriva brain memory 3d — 2 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/neuriva/products/neuriva-brain-memory-3d/

- **30 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **50 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —

#### 2. neuriva original brain health clinically tested brain supporting supplement with natural ingredients (50 pieces)

| Field | Value |
| --- | --- |
| Brand | Schiff |
| Count | 50 |
| Brand URL | https://www.schiffvitamins.com/collections/neuriva/products/neuriva-original-brain-health-clinically-tested-brain-supporting-supplement-with-natural-ingredients/ |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **FULL** — Other Ingredients read from brand HTML at step 2; actives listed as ungraded amounts (typed panel partial or image-backed). |
| Call | **WRITE-READY (pending stores)** |

**Actives (ungraded):** Actives on Supplement Facts — ungraded list; amounts not extracted from Gatsby HTML (often image panel).

**Other Ingredients (verbatim):** rice bran, capsule (hypromellose, carrageenan, titanium dioxide, pectin), microcrystalline cellulose, silicon dioxide

**UPC:** —

**Token check:**
  - LOCKED — rice bran → Methodology §5 (rice bran)
  - LOCKED — capsule (hypromellose → Methodology §5 (hypromellose)
  - LOCKED — carrageenan → Methodology §5 (carrageenan)
  - LOCKED — titanium dioxide → Methodology §5 (titanium dioxide)
  - LOCKED — pectin) → Methodology §5 (pectin)
  - LOCKED — microcrystalline cellulose → Methodology §5 (microcrystalline cellulose)
  - LOCKED — silicon dioxide → Methodology §5 (silicon dioxide)
#### 3. neuriva plus brain health supplement clinically tested brain supporting naturally sourced ingredients — 2 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/neuriva/products/neuriva-plus-brain-health-supplement-clinically-tested-brain-supporting-naturally-sourced-ingredients/

- **30 ct** — Panel FULL; call `HOLD-TOKEN`; OI: capsule (hydroxypropyl methylcellulose, titanium dioxide, carrageenan, pectin), microcrystalline cellulose, rice brain, …
- **50 ct** — Panel FULL; call `HOLD-TOKEN`; OI: capsule (hydroxypropyl methylcellulose, titanium dioxide, carrageenan, pectin), microcrystalline cellulose, rice brain, …

#### 4. neuriva brain health original gummies 50 ct (50 pieces)

| Field | Value |
| --- | --- |
| Brand | Schiff |
| Count | 50 |
| Brand URL | https://www.schiffvitamins.com/collections/neuriva/products/neuriva-brain-health-original-gummies-50-ct/ |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** Actives on Supplement Facts — ungraded list; amounts not extracted from Gatsby HTML (often image panel).

**Other Ingredients (verbatim):** —

**UPC:** —

**Token check:**
  - —
#### 5. neuriva brain health plus gummies 50 ct — 2 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/neuriva/products/neuriva-brain-health-plus-gummies-50-ct/

- **50 ct** — Panel FULL; call `HOLD-TOKEN`; OI: : corn syrup, sugar, water, orange juice concentrate, pectin, natural flavor, citric acid, colors from fruits and vegeta…
- **30 ct** — Panel FULL; call `HOLD-TOKEN`; OI: : corn syrup, sugar, water, orange juice concentrate, pectin, natural flavor, citric acid, colors from fruits and vegeta…

#### 6. neuriva ultra brain supplement — 3 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/neuriva/products/neuriva-ultra-brain-supplement/

- **30 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **50 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **60 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —

#### 7. neuriva sleep plus — 3 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/neuriva/products/neuriva-sleep-plus/

- **30 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **50 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **58 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —

#### 8. megared advanced coq10 100mg — 4 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/megared/products/megared-advanced-coq10-100mg/

- **40 ct** — Panel FULL; call `HOLD-TOKEN`; OI: Hypromellose, calcium carbonate, tricalcium phosphate, microcrystalline cellulose, magnesium stearate, silicon dioxide, …
- **25 ct** — Panel FULL; call `HOLD-TOKEN`; OI: Hypromellose, calcium carbonate, tricalcium phosphate, microcrystalline cellulose, magnesium stearate, silicon dioxide, …
- **80 ct** — Panel FULL; call `HOLD-TOKEN`; OI: Hypromellose, calcium carbonate, tricalcium phosphate, microcrystalline cellulose, magnesium stearate, silicon dioxide, …
- **60 ct** — Panel FULL; call `HOLD-TOKEN`; OI: Hypromellose, calcium carbonate, tricalcium phosphate, microcrystalline cellulose, magnesium stearate, silicon dioxide, …

#### 9. megared 1000mg ultra concentrate pro omega 3 krill oil softgels — 5 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/megared/products/megared-1000mg-ultra-concentrate-pro-omega-3-krill-oil-softgels/

- **40 ct** — Panel FULL; call `HOLD-TOKEN`; OI: gelatin, glycerin, sorbitol, water, ethyl vanillin
- **25 ct** — Panel FULL; call `HOLD-TOKEN`; OI: gelatin, glycerin, sorbitol, water, ethyl vanillin
- **80 ct** — Panel FULL; call `HOLD-TOKEN`; OI: gelatin, glycerin, sorbitol, water, ethyl vanillin
- **60 ct** — Panel FULL; call `HOLD-TOKEN`; OI: gelatin, glycerin, sorbitol, water, ethyl vanillin
- **30 ct** — Panel FULL; call `HOLD-TOKEN`; OI: gelatin, glycerin, sorbitol, water, ethyl vanillin

#### 10. megared advanced 4in1 900mg 40ct — 4 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/megared/products/megared-advanced-4in1-900mg-40ct/

- **40 ct** — Panel FULL; call `HOLD-TOKEN`; OI: gelatin (bovine), glycerin, water, Red 40, ethyl vanillin, mixed tocopherols, caramel color, Blue 1
- **25 ct** — Panel FULL; call `HOLD-TOKEN`; OI: gelatin (bovine), glycerin, water, Red 40, ethyl vanillin, mixed tocopherols, caramel color, Blue 1
- **80 ct** — Panel FULL; call `HOLD-TOKEN`; OI: gelatin (bovine), glycerin, water, Red 40, ethyl vanillin, mixed tocopherols, caramel color, Blue 1
- **60 ct** — Panel FULL; call `HOLD-TOKEN`; OI: gelatin (bovine), glycerin, water, Red 40, ethyl vanillin, mixed tocopherols, caramel color, Blue 1

#### 11. megared advanced 4in1 500mg — 4 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/megared/products/megared-advanced-4in1-500mg/

- **40 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **25 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **80 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **60 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —

#### 12. megared 500mg extra strength — 4 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/megared/products/megared-500mg-extra-strength/

- **40 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **25 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **80 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **60 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —

#### 13. megared advanced 6x better absorption 800mg softgels omega 3 fish oil supplement — 4 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/megared/products/megared-advanced-6x-better-absorption-800mg-softgels-omega-3-fish-oil-supplement/

- **40 ct** — Panel FULL; call `HOLD-TOKEN`; OI: gelatin (bovine), glycerin, water, ethyl vanillin, sorbitol, caramel color, mixed tocopherols
- **25 ct** — Panel FULL; call `HOLD-TOKEN`; OI: gelatin (bovine), glycerin, water, ethyl vanillin, sorbitol, caramel color, mixed tocopherols
- **80 ct** — Panel FULL; call `HOLD-TOKEN`; OI: gelatin (bovine), glycerin, water, ethyl vanillin, sorbitol, caramel color, mixed tocopherols
- **60 ct** — Panel FULL; call `HOLD-TOKEN`; OI: gelatin (bovine), glycerin, water, ethyl vanillin, sorbitol, caramel color, mixed tocopherols

#### 14. megared 350mg omega3 krill oil — 4 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/megared/products/megared-350mg-omega3-krill-oil/

- **40 ct** — Panel FULL; call `HOLD-TOKEN`; OI: gelatin, glycerin, water, ethyl vanillin, sorbitol
- **25 ct** — Panel FULL; call `HOLD-TOKEN`; OI: gelatin, glycerin, water, ethyl vanillin, sorbitol
- **80 ct** — Panel FULL; call `HOLD-TOKEN`; OI: gelatin, glycerin, water, ethyl vanillin, sorbitol
- **60 ct** — Panel FULL; call `HOLD-TOKEN`; OI: gelatin, glycerin, water, ethyl vanillin, sorbitol

#### 15. megared advanced total body refresh 500 mg softgels — 5 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/megared/products/megared-advanced-total-body-refresh-500-mg-softgels/

- **40 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **25 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **80 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **60 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **65 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —

#### 16. digestive advantage lactose defense formula — 4 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/digestive-advantage/products/digestive-advantage-lactose-defense-formula/

- **96 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **32 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **30 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **60 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —

#### 17. digestive advantage intensive bowel support — 4 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/digestive-advantage/products/digestive-advantage-intensive-bowel-support/

- **96 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **32 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **30 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **60 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —

#### 18. digestive advantage fast acting enzymes probiotic — 4 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/digestive-advantage/products/digestive-advantage-fast-acting-enzymes-probiotic/

- **96 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **32 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **30 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **60 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —

#### 19. digestive advantage daily probiotic — 4 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/digestive-advantage/products/digestive-advantage-daily-probiotic/

- **96 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **32 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **30 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **60 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —

#### 20. digestive advantage probiotic gummies — 4 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/digestive-advantage/products/digestive-advantage-probiotic-gummies/

- **96 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **32 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **30 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **60 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —

#### 21. digestive advantage kids daily probiotic gummies — 4 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/digestive-advantage/products/digestive-advantage-kids-daily-probiotic-gummies/

- **96 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **32 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **30 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **60 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —

#### 22. airborne assorted fruit flavored gummies 750mg of vitamin c and minerals herbs immune support — 4 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/airborne/products/airborne-assorted-fruit-flavored-gummies-750mg-of-vitamin-c-and-minerals-herbs-immune-support/

- **63 ct** — Panel FULL; call `HOLD-TOKEN`; OI: corn syrup, sugar, water, gelatin, natural and artificial flavors, pectin, colors from fruits and vegetables
- **10 ct** — Panel FULL; call `HOLD-TOKEN`; OI: corn syrup, sugar, water, gelatin, natural and artificial flavors, pectin, colors from fruits and vegetables
- **50 ct** — Panel FULL; call `HOLD-TOKEN`; OI: corn syrup, sugar, water, gelatin, natural and artificial flavors, pectin, colors from fruits and vegetables
- **32 ct** — Panel FULL; call `HOLD-TOKEN`; OI: corn syrup, sugar, water, gelatin, natural and artificial flavors, pectin, colors from fruits and vegetables

#### 23. airborne kids assorted fruit flavored gummies — 4 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/airborne/products/airborne-kids-assorted-fruit-flavored-gummies/

- **63 ct** — Panel FULL; call `HOLD-TOKEN`; OI: corn syrup, sugar, water, gelatin, natural flavors, pectin, colors from fruits and vegetables","imagePosition":"right","…
- **10 ct** — Panel FULL; call `HOLD-TOKEN`; OI: corn syrup, sugar, water, gelatin, natural flavors, pectin, colors from fruits and vegetables","imagePosition":"right","…
- **50 ct** — Panel FULL; call `HOLD-TOKEN`; OI: corn syrup, sugar, water, gelatin, natural flavors, pectin, colors from fruits and vegetables","imagePosition":"right","…
- **32 ct** — Panel FULL; call `HOLD-TOKEN`; OI: corn syrup, sugar, water, gelatin, natural flavors, pectin, colors from fruits and vegetables","imagePosition":"right","…

#### 24. airborne zesty orange effervescent — 4 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/airborne/products/airborne-zesty-orange-effervescent/

- **63 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **10 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **50 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **32 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —

#### 25. airborne elderberry gummies immune support supplement 50 ct — 4 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/airborne/products/airborne-elderberry-gummies-immune-support-supplement-50-ct/

- **50 ct** — Panel FULL; call `HOLD-TOKEN`; OI: sugar, tapioca syrup, water, pectin, citric acid, sodium citrate, natural flavors, maltodextrin
- **63 ct** — Panel FULL; call `HOLD-TOKEN`; OI: sugar, tapioca syrup, water, pectin, citric acid, sodium citrate, natural flavors, maltodextrin
- **10 ct** — Panel FULL; call `HOLD-TOKEN`; OI: sugar, tapioca syrup, water, pectin, citric acid, sodium citrate, natural flavors, maltodextrin
- **32 ct** — Panel FULL; call `HOLD-TOKEN`; OI: sugar, tapioca syrup, water, pectin, citric acid, sodium citrate, natural flavors, maltodextrin

#### 26. airborne citrus chewable tablets — 4 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/airborne/products/airborne-citrus-chewable-tablets/

- **63 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **10 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **50 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **32 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —

#### 27. airborne honey lemon immune support gummies — 5 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/airborne/products/airborne-honey-lemon-immune-support-gummies/

- **63 ct** — Panel FULL; call `HOLD-TOKEN`; OI: sugar, corn syrup, honey, water, pectin, citric acid, natural flavors, sodium citrate
- **10 ct** — Panel FULL; call `HOLD-TOKEN`; OI: sugar, corn syrup, honey, water, pectin, citric acid, natural flavors, sodium citrate
- **50 ct** — Panel FULL; call `HOLD-TOKEN`; OI: sugar, corn syrup, honey, water, pectin, citric acid, natural flavors, sodium citrate
- **32 ct** — Panel FULL; call `HOLD-TOKEN`; OI: sugar, corn syrup, honey, water, pectin, citric acid, natural flavors, sodium citrate
- **42 ct** — Panel FULL; call `HOLD-TOKEN`; OI: sugar, corn syrup, honey, water, pectin, citric acid, natural flavors, sodium citrate

#### 28. airborne very berry effervescent — 4 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/airborne/products/airborne-very-berry-effervescent/

- **63 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **10 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **50 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **32 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —

#### 29. airborne zinc chewables — 4 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/airborne/products/airborne-zinc-chewables/

- **63 ct** — Panel FULL; call `HOLD-TOKEN`; OI: sucrose, sorbitol, maltodextrin, magnesium stearate, fully hydrogenated soybean oil, gum acacia, natural orange flavor, …
- **10 ct** — Panel FULL; call `HOLD-TOKEN`; OI: sucrose, sorbitol, maltodextrin, magnesium stearate, fully hydrogenated soybean oil, gum acacia, natural orange flavor, …
- **50 ct** — Panel FULL; call `HOLD-TOKEN`; OI: sucrose, sorbitol, maltodextrin, magnesium stearate, fully hydrogenated soybean oil, gum acacia, natural orange flavor, …
- **32 ct** — Panel FULL; call `HOLD-TOKEN`; OI: sucrose, sorbitol, maltodextrin, magnesium stearate, fully hydrogenated soybean oil, gum acacia, natural orange flavor, …

#### 30. airborne orange fruit flavored gummies — 4 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/airborne/products/airborne-orange-fruit-flavored-gummies/

- **63 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **10 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **50 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **32 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —

#### 31. airborne berry chewable tablets — 5 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/airborne/products/airborne-berry-chewable-tablets/

- **63 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **10 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **50 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **32 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **64 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —

#### 32. megared advanced 4in1 omega 3 adult gummies — 4 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/megared/products/megared-advanced-4in1-omega-3-adult-gummies/

- **40 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **25 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **80 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **60 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —

#### 33. schiff glucosamine 2000mg hyaluronic 150ct — 6 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/schiff/products/schiff-glucosamine-2000mg-hyaluronic-150ct/

- **150 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **63 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **80 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **30 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **96 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **64 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —

#### 34. schiff glucosamine 1500mg msm hyaluronic 150ct — 6 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/schiff/products/schiff-glucosamine-1500mg-msm-hyaluronic-150ct/

- **150 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **63 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **80 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **30 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **96 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **64 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —

#### 35. airborne immune support effervescent tablets elderberry 20 ct — 5 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/airborne/products/airborne-immune-support-effervescent-tablets-elderberry-20-ct/

- **20 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **63 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **10 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **50 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **32 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —

#### 36. airborne electrolyte replenisher immune support effercescent tablet watermelon — 4 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/airborne/products/airborne-electrolyte-replenisher-immune-support-effercescent-tablet-watermelon/

- **63 ct** — Panel FULL; call `HOLD-TOKEN`; OI: sorbitol, citric acid, natural flavors, hydroxypropyl cellulose, polyethylene glycol, acesulfame potassium, silicon diox…
- **10 ct** — Panel FULL; call `HOLD-TOKEN`; OI: sorbitol, citric acid, natural flavors, hydroxypropyl cellulose, polyethylene glycol, acesulfame potassium, silicon diox…
- **50 ct** — Panel FULL; call `HOLD-TOKEN`; OI: sorbitol, citric acid, natural flavors, hydroxypropyl cellulose, polyethylene glycol, acesulfame potassium, silicon diox…
- **32 ct** — Panel FULL; call `HOLD-TOKEN`; OI: sorbitol, citric acid, natural flavors, hydroxypropyl cellulose, polyethylene glycol, acesulfame potassium, silicon diox…

#### 37. airborne immune essentials effervescent tablet — 5 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/airborne/products/airborne-immune-essentials-effervescent-tablet/

- **63 ct** — Panel FULL; call `HOLD-TOKEN`; OI: sodium bicarbonate, sorbitol, citric acid, potassium bicarbonate, maltodextrin, natural and artificial flavor, polyethyl…
- **10 ct** — Panel FULL; call `HOLD-TOKEN`; OI: sodium bicarbonate, sorbitol, citric acid, potassium bicarbonate, maltodextrin, natural and artificial flavor, polyethyl…
- **50 ct** — Panel FULL; call `HOLD-TOKEN`; OI: sodium bicarbonate, sorbitol, citric acid, potassium bicarbonate, maltodextrin, natural and artificial flavor, polyethyl…
- **32 ct** — Panel FULL; call `HOLD-TOKEN`; OI: sodium bicarbonate, sorbitol, citric acid, potassium bicarbonate, maltodextrin, natural and artificial flavor, polyethyl…
- **30 ct** — Panel FULL; call `HOLD-TOKEN`; OI: sodium bicarbonate, sorbitol, citric acid, potassium bicarbonate, maltodextrin, natural and artificial flavor, polyethyl…

### DUP (excluded MAIN)

- neuriva original brain health clinically tested brain supporting supplement with natural ingredients (30 pieces) → `schiff-b189-neuriva-original-30`
- neuriva brain health original gummies 50 ct (30 pieces) → `schiff-b189-neuriva-original-30`

---

## Move Free

**Candidates enumerated:** 40 (35 non-DUP, 5 DUP vs MAIN).

Scope: movefree.com + Schiff Move Free section. movefree.com `page-data.json` often unavailable; many PDPs are image-only at step 2.

#### 1. move free advanced tamaflex — 4 count variants

**Brand URL:** https://www.movefree.com/collections/move-free/products/move-free-advanced-tamaflex/

- **30 ct** — Panel FULL; call `HOLD-TOKEN`; OI: hydroxypropyl cellulose, microcrystalline cellulose, coating (hydroxypropyl) methylcellulose, glycerin, riboflavin, modi…
- **80 ct** — Panel FULL; call `HOLD-TOKEN`; OI: hydroxypropyl cellulose, microcrystalline cellulose, coating (hydroxypropyl) methylcellulose, glycerin, riboflavin, modi…
- **120 ct** — Panel FULL; call `HOLD-TOKEN`; OI: hydroxypropyl cellulose, microcrystalline cellulose, coating (hydroxypropyl) methylcellulose, glycerin, riboflavin, modi…
- **90 ct** — Panel FULL; call `HOLD-TOKEN`; OI: hydroxypropyl cellulose, microcrystalline cellulose, coating (hydroxypropyl) methylcellulose, glycerin, riboflavin, modi…

#### 2. move free advanced msm glucosamine 120ct — 3 count variants

**Brand URL:** https://www.movefree.com/collections/move-free/products/move-free-advanced-msm-glucosamine-120ct/

- **30 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **80 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **90 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —

#### 3. move free advanced plus msm and vitamin d3 80 ct joint health supplement with glucosamine — 3 count variants

**Brand URL:** https://www.movefree.com/collections/move-free/products/move-free-advanced-plus-msm-and-vitamin-d3-80-ct-joint-health-supplement-with-glucosamine/

- **80 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **30 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **90 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —

#### 4. move free ultra triple action typeiicollagen — 4 count variants

**Brand URL:** https://www.movefree.com/collections/move-free/products/move-free-ultra-triple-action-typeiicollagen/

- **30 ct** — Panel FULL; call `HOLD-TOKEN`; OI: microcrystalline cellulose, hydroxypropyl cellulose, croscarmellose sodium, coating (hydroxypropyl methylcellulose, modi…
- **80 ct** — Panel FULL; call `HOLD-TOKEN`; OI: microcrystalline cellulose, hydroxypropyl cellulose, croscarmellose sodium, coating (hydroxypropyl methylcellulose, modi…
- **120 ct** — Panel FULL; call `HOLD-TOKEN`; OI: microcrystalline cellulose, hydroxypropyl cellulose, croscarmellose sodium, coating (hydroxypropyl methylcellulose, modi…
- **90 ct** — Panel FULL; call `HOLD-TOKEN`; OI: microcrystalline cellulose, hydroxypropyl cellulose, croscarmellose sodium, coating (hydroxypropyl methylcellulose, modi…

#### 5. neuriva brain memory 3d — 2 count variants

**Brand URL:** https://www.movefree.com/collections/neuriva/products/neuriva-brain-memory-3d/

- **30 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **50 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —

#### 6. move free ultra triple action typeiicollagen — 4 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/move-free/products/move-free-ultra-triple-action-typeiicollagen/

- **30 ct** — Panel FULL; call `HOLD-TOKEN`; OI: microcrystalline cellulose, hydroxypropyl cellulose, croscarmellose sodium, coating (hydroxypropyl methylcellulose, modi…
- **80 ct** — Panel FULL; call `HOLD-TOKEN`; OI: microcrystalline cellulose, hydroxypropyl cellulose, croscarmellose sodium, coating (hydroxypropyl methylcellulose, modi…
- **120 ct** — Panel FULL; call `HOLD-TOKEN`; OI: microcrystalline cellulose, hydroxypropyl cellulose, croscarmellose sodium, coating (hydroxypropyl methylcellulose, modi…
- **90 ct** — Panel FULL; call `HOLD-TOKEN`; OI: microcrystalline cellulose, hydroxypropyl cellulose, croscarmellose sodium, coating (hydroxypropyl methylcellulose, modi…

#### 7. move free advanced glucosamine — 3 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/move-free/products/move-free-advanced-glucosamine/

- **30 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **120 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **90 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —

#### 8. move free advanced plus msm and vitamin d3 80 ct joint health supplement with glucosamine — 3 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/move-free/products/move-free-advanced-plus-msm-and-vitamin-d3-80-ct-joint-health-supplement-with-glucosamine/

- **80 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **30 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **90 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —

#### 9. move free advanced msm glucosamine 120ct — 3 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/move-free/products/move-free-advanced-msm-glucosamine-120ct/

- **30 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **80 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **90 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —

#### 10. move free advanced tamaflex — 4 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/move-free/products/move-free-advanced-tamaflex/

- **30 ct** — Panel FULL; call `HOLD-TOKEN`; OI: hydroxypropyl cellulose, microcrystalline cellulose, coating (hydroxypropyl) methylcellulose, glycerin, riboflavin, modi…
- **80 ct** — Panel FULL; call `HOLD-TOKEN`; OI: hydroxypropyl cellulose, microcrystalline cellulose, coating (hydroxypropyl) methylcellulose, glycerin, riboflavin, modi…
- **120 ct** — Panel FULL; call `HOLD-TOKEN`; OI: hydroxypropyl cellulose, microcrystalline cellulose, coating (hydroxypropyl) methylcellulose, glycerin, riboflavin, modi…
- **90 ct** — Panel FULL; call `HOLD-TOKEN`; OI: hydroxypropyl cellulose, microcrystalline cellulose, coating (hydroxypropyl) methylcellulose, glycerin, riboflavin, modi…

#### 11. neuriva brain memory 3d — 2 count variants

**Brand URL:** https://www.schiffvitamins.com/collections/neuriva/products/neuriva-brain-memory-3d/

- **30 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **50 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —

### DUP (excluded MAIN)

- move free advanced msm glucosamine 120ct (120 pieces) → `move-free-b189-advanced-msm-120`
- move free advanced plus msm and vitamin d3 80 ct joint health supplement with glucosamine (120 pieces) → `move-free-b189-advanced-msm-120`
- move free advanced glucosamine (80 pieces) → `move-free-b188-advanced-80`
- move free advanced plus msm and vitamin d3 80 ct joint health supplement with glucosamine (120 pieces) → `move-free-b189-advanced-msm-120`
- move free advanced msm glucosamine 120ct (120 pieces) → `move-free-b189-advanced-msm-120`

---

## Osteo Bi-Flex

**Candidates enumerated:** 10 (10 non-DUP, 0 DUP vs MAIN).

#### 1. Triple Strength

| Field | Value |
| --- | --- |
| Brand | Osteo Bi-Flex |
| Count | — |
| Brand URL | https://www.osteobiflex.com/products/triple-strength |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **TRUNCATED** — Supplement Facts appear as carton images only; no typed Other Ingredients on osteobiflex.com HTML. |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** —

**Token check:**
  - —
#### 2. Triple Strength MSM

| Field | Value |
| --- | --- |
| Brand | Osteo Bi-Flex |
| Count | — |
| Brand URL | https://www.osteobiflex.com/products/triple-strength-msm |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **TRUNCATED** — Supplement Facts appear as carton images only; no typed Other Ingredients on osteobiflex.com HTML. |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** —

**Token check:**
  - —
#### 3. Triple Strength + Magnesium

| Field | Value |
| --- | --- |
| Brand | Osteo Bi-Flex |
| Count | — |
| Brand URL | https://www.osteobiflex.com/products/triple-strength-plus-magnesium |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **TRUNCATED** — Supplement Facts appear as carton images only; no typed Other Ingredients on osteobiflex.com HTML. |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** —

**Token check:**
  - —
#### 4. Triple Strength Plus Turmeric

| Field | Value |
| --- | --- |
| Brand | Osteo Bi-Flex |
| Count | — |
| Brand URL | https://www.osteobiflex.com/products/triple-strength-plus-turmeric |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **TRUNCATED** — Supplement Facts appear as carton images only; no typed Other Ingredients on osteobiflex.com HTML. |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** —

**Token check:**
  - —
#### 5. Triple Strength with Vitamin D

| Field | Value |
| --- | --- |
| Brand | Osteo Bi-Flex |
| Count | — |
| Brand URL | https://www.osteobiflex.com/products/triple-strength-with-vitamin-d |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **TRUNCATED** — Supplement Facts appear as carton images only; no typed Other Ingredients on osteobiflex.com HTML. |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** —

**Token check:**
  - —
#### 6. One Per Day

| Field | Value |
| --- | --- |
| Brand | Osteo Bi-Flex |
| Count | — |
| Brand URL | https://www.osteobiflex.com/products/one-per-day |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **TRUNCATED** — Supplement Facts appear as carton images only; no typed Other Ingredients on osteobiflex.com HTML. |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** —

**Token check:**
  - —
#### 7. One Per Day Inflammatory Response

| Field | Value |
| --- | --- |
| Brand | Osteo Bi-Flex |
| Count | — |
| Brand URL | https://www.osteobiflex.com/products/one-per-day-inflammatory-response |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **TRUNCATED** — Supplement Facts appear as carton images only; no typed Other Ingredients on osteobiflex.com HTML. |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** —

**Token check:**
  - —
#### 8. Regular Strength

| Field | Value |
| --- | --- |
| Brand | Osteo Bi-Flex |
| Count | — |
| Brand URL | https://www.osteobiflex.com/products/regular-strength |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **TRUNCATED** — Supplement Facts appear as carton images only; no typed Other Ingredients on osteobiflex.com HTML. |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** —

**Token check:**
  - —
#### 9. Ease

| Field | Value |
| --- | --- |
| Brand | Osteo Bi-Flex |
| Count | — |
| Brand URL | https://www.osteobiflex.com/products/ease |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **TRUNCATED** — Supplement Facts appear as carton images only; no typed Other Ingredients on osteobiflex.com HTML. |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** —

**Token check:**
  - —
#### 10. Advanced Omega-3 Joint Complex

| Field | Value |
| --- | --- |
| Brand | Osteo Bi-Flex |
| Count | — |
| Brand URL | https://www.osteobiflex.com/products/advanced-omega-3-joint-complex |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **TRUNCATED** — Supplement Facts appear as carton images only; no typed Other Ingredients on osteobiflex.com HTML. |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** —

**Token check:**
  - —

---

## Caltrate

**Candidates enumerated:** 6 (6 non-DUP, 0 DUP vs MAIN).

#### 1. Caltrate

| Field | Value |
| --- | --- |
| Brand | Caltrate |
| Count | — |
| Brand URL | https://www.caltrate.com/calcium-supplement-products/600d3/ |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** —

**Token check:**
  - —
#### 2. Caltrate

| Field | Value |
| --- | --- |
| Brand | Caltrate |
| Count | — |
| Brand URL | https://www.caltrate.com/calcium-supplement-products/600d3-soft-chews/ |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** —

**Token check:**
  - —
#### 3. Caltrate

| Field | Value |
| --- | --- |
| Brand | Caltrate |
| Count | — |
| Brand URL | https://www.caltrate.com/calcium-supplement-products/gummy-bites/ |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** —

**Token check:**
  - —
#### 4. Caltrate

| Field | Value |
| --- | --- |
| Brand | Caltrate |
| Count | — |
| Brand URL | https://www.caltrate.com/calcium-supplement-products/600d3-plus-minerals/ |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** —

**Token check:**
  - —
#### 5. Caltrate

| Field | Value |
| --- | --- |
| Brand | Caltrate |
| Count | — |
| Brand URL | https://www.caltrate.com/calcium-supplement-products/600d3-plus-minerals-chewables/ |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** —

**Token check:**
  - —
#### 6. Caltrate

| Field | Value |
| --- | --- |
| Brand | Caltrate |
| Count | — |
| Brand URL | https://www.caltrate.com/calcium-supplement-products/600d3-plus-minerals-minis/ |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** —

**Token check:**
  - —

---

## Citracal

**Candidates enumerated:** 11 (11 non-DUP, 0 DUP vs MAIN).

Scope: citracal.com blocked (403/maintenance). Counts from [DSLD brand-products Citracal](https://dsld.od.nih.gov/brand-products/Citracal) (On Market rows).

#### 1. Calcium Supplement Petites +D3 — 11 count variants

**Brand URL:** https://www.citracal.com/

- **200 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **60 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **120 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **280 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **80 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **200 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **70 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **70 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **180 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **100 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —
- **70 ct** — Panel MISSING; call `HOLD-PANEL`; OI: —


---

## Slow Fe

**Candidates enumerated:** 1 (1 non-DUP, 0 DUP vs MAIN).

Scope: **30-count only** per task. slowfe.com 404 in VM; panel from DSLD label family (see batch187 60ct citation).

#### 1. Slow Fe Slow Release Iron (30 tablets)

| Field | Value |
| --- | --- |
| Brand | Slow Fe |
| Count | 30 |
| Brand URL | https://www.slowfe.com/ |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **FULL** — slowfe.com returned 404 in VM; panel from DSLD label 240265 (same formula family as 60ct on MAIN). |
| Call | **HOLD-TOKEN** |

**Actives (ungraded):** Iron (as ferrous sulfate): 45 mg

**Other Ingredients (verbatim):** Dibasic calcium phosphate, silicied microcrystalline cellulose, hypromellose, carbomer homopolymer, ascorbic acid, magnesium stearate, tribasic calcium phosphate, polyvinyl alcohol, polyethylene glycol, talc, titanium dioxide, FD&C Red 40 Lake, FD&C Yellow 6 Lake, FD&C Blue 1 Lake.

**UPC:** —

**Token check:**
  - LOCKED — silicied microcrystalline cellulose → Methodology §5 (microcrystalline cellulose)
  - LOCKED — hypromellose → Methodology §5 (hypromellose)
  - LOCKED — carbomer homopolymer → Methodology §5 (carbomer)
  - LOCKED — ascorbic acid → Methodology §5 (ascorbic acid)
  - LOCKED — magnesium stearate → Methodology §5 (magnesium stearate)
  - LOCKED — polyvinyl alcohol → Methodology §5 (polyvinyl alcohol)
  - LOCKED — polyethylene glycol → Methodology §5 (polyethylene glycol)
  - LOCKED — talc → Methodology §5 (talc)
  - LOCKED — titanium dioxide → Methodology §5 (titanium dioxide)
  - UNGRADED — Dibasic calcium phosphate
  - UNGRADED — tribasic calcium phosphate
  - UNGRADED — FD&C Red 40 Lake
  - UNGRADED — FD&C Yellow 6 Lake
  - UNGRADED — FD&C Blue 1 Lake.

---

## Rainbow Light

**Candidates enumerated:** 89 (85 non-DUP, 4 DUP vs MAIN).

Scope: [products.json](https://www.rainbowlight.com/products.json?limit=250) (89 products). PDP supplement-facts images linked; typed OI when present in HTML.

#### 1. NAD+ Trans-Resveratrol Multi Collagen, 60 Rapid Release Capsules

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 60 |
| Brand URL | https://www.rainbowlight.com/products/nad-trans-resveratrol-multi-collagen-60-rapid-release-capsules-rl28681 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584888 — Rainbow product JSON embedded on PDP: "barcode":"850068584888"

**Token check:**
  - —
#### 2. Super Concentrated Echinacea, 2 fl oz (59 mL) Dropper Bottle

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 2 |
| Brand URL | https://www.rainbowlight.com/products/super-concentrated-echinacea-2-fl-oz-59-ml-dropper-bottle-rl39549 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Immune Support |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** —

**Token check:**
  - —
#### 3. Echinacea + Goldenseal, 2 fl oz (59 mL) Dropper Bottle

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 2 |
| Brand URL | https://www.rainbowlight.com/products/echinacea-goldenseal-2-fl-oz-59-ml-dropper-bottle-rl39548 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Immune Support |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850086437029 — Rainbow product JSON embedded on PDP: "barcode":"850086437029"

**Token check:**
  - —
#### 4. CoQ10 200 mg, 30 Quick Release Softgels

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/coq10-200-mg-30-quick-release-softgels-rl915 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850086437159 — Rainbow product JSON embedded on PDP: "barcode":"850086437159"

**Token check:**
  - —
#### 5. Melatonin 12 mg Natural Berry Flavor, 90 Fast Dissolve Tablets

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/melatonin-12-mg-natural-berry-flavor-90-fast-dissolve-tablets-rl7395 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Sleep |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850086437173 — Rainbow product JSON embedded on PDP: "barcode":"850086437173"

**Token check:**
  - —
#### 6. Daily Fiber + Probiotic Powder Delicious Raspberry Lemon Flavor, 11 oz. (312 g) Powder

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/daily-fiber-probiotic-powder-delicious-raspberry-lemon-flavor-11-oz-312-g-powder-rl29532 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Digestive |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584994 — Rainbow product JSON embedded on PDP: "barcode":"850068584994"

**Token check:**
  - —
#### 7. NAD+ Advanced Gummies Delicious Peach Flavor, 60 Vegan Gummies

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/nad-advanced-gummies-delicious-peach-flavor-60-vegan-gummies-rl28941 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850086437081 — Rainbow product JSON embedded on PDP: "barcode":"850086437081"

**Token check:**
  - —
#### 8. 10 Magnesium Complex, 90 Vegan Capsules

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/10-magnesium-complex-90-vegan-capsules-rl24214 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850086437135 — Rainbow product JSON embedded on PDP: "barcode":"850086437135"

**Token check:**
  - —
#### 9. High Potency Vitamin D3 10,000 IU, 100 Quick Release Softgels

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/high-potency-vitamin-d3-10000-iu-100-quick-release-softgels-rl11391 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850086437128 — Rainbow product JSON embedded on PDP: "barcode":"850086437128"

**Token check:**
  - —
#### 10. L-Methylfolate 15 mg + Methyl B12 & Saffron, 60 Vegan Capsules

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/l-methylfolate-15-mg-methyl-b12-saffron-60-vegan-capsules-rl28721 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** —

**Token check:**
  - —
#### 11. Lugol's Iodine (2%) Solution, 2 fl oz (59 mL) Liquid

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 2 |
| Brand URL | https://www.rainbowlight.com/products/lugols-iodine-2-solution-2-fl-oz-59-ml-liquid-rl40053 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584147 — Rainbow product JSON embedded on PDP: "barcode":"850068584147"

**Token check:**
  - —
#### 12. Women's One 50+ plus Real Food Nutrients, 120 Vegetarian Caplets

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 120 |
| Brand URL | https://www.rainbowlight.com/products/womens-one-50-plus-real-food-nutrients-120-vegetarian-caplets-rl20424 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888204243 — Rainbow product JSON embedded on PDP: "barcode":"021888204243"

**Token check:**
  - —
#### 13. Men's One 50+ plus Real Food Nutrients, 120 Vegetarian Caplets

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 120 |
| Brand URL | https://www.rainbowlight.com/products/mens-one-50-plus-real-food-nutrients-120-vegetarian-caplets-rl20405 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888204052 — Rainbow product JSON embedded on PDP: "barcode":"021888204052"

**Token check:**
  - —
#### 14. Prenatal One + Real Food Nutrients, 60 Vegan Caplets

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/prenatal-one-real-food-nutrients-60-vegan-caplets-rl20429 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Prenatal |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888217236 — Rainbow product JSON embedded on PDP: "barcode":"021888217236"

**Token check:**
  - —
#### 15. Counter Attack, 90 Vegan Caplets

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/counter-attack-90-vegan-caplets-rl20132 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888201327 — Rainbow product JSON embedded on PDP: "barcode":"021888201327"

**Token check:**
  - —
#### 16. Nettle Leaf Liquid Extract Alcohol Free, 2 fl oz (59 mL) Liquid

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 2 |
| Brand URL | https://www.rainbowlight.com/products/nettle-leaf-liquid-extract-alcohol-free-2-fl-oz-59-ml-liquid-rl40414 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584314 — Rainbow product JSON embedded on PDP: "barcode":"850068584314"

**Token check:**
  - —
#### 17. Magnesium Glycinate 325 mg, 120 Vegan Capsules

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/magnesium-glycinate-325-mg-120-vegan-capsules-rl4399 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584529 — Rainbow product JSON embedded on PDP: "barcode":"850068584529"

**Token check:**
  - —
#### 18. Counter Attack, 30 Vegan Caplets

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/counter-attack-30-vegan-caplets-rl11601 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888116010 — Rainbow product JSON embedded on PDP: "barcode":"021888116010"

**Token check:**
  - —
#### 19. Calcium Citrate Mini-Tablets + Real Food Nutrients, 120 Vegan Mini-Tablets

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/calcium-citrate-mini-tablets-real-food-nutrients-120-vegan-mini-tablets-rl20211 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888202119 — Rainbow product JSON embedded on PDP: "barcode":"021888202119"

**Token check:**
  - —
#### 20. Men's One 50+ plus Real Food Nutrients, 150 Vegetarian Caplets

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 150 |
| Brand URL | https://www.rainbowlight.com/products/mens-one-50-plus-real-food-nutrients-150-vegetarian-caplets-rl20406 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888204069 — Rainbow product JSON embedded on PDP: "barcode":"021888204069"

**Token check:**
  - —
#### 21. Berberine Complex 1000 mg, 60 Vegan Capsules

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/berberine-complex-1000-mg-60-vegan-capsules-rl27031 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584031 — Rainbow product JSON embedded on PDP: "barcode":"850068584031"

**Token check:**
  - —
#### 22. Pumpkin Seed Oil + Biotin & Saw Palmetto, 90 Softgels

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 90 |
| Brand URL | https://www.rainbowlight.com/products/pumpkin-seed-oil-biotin-saw-palmetto-90-softgels-rl28731 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584949 — Rainbow product JSON embedded on PDP: "barcode":"850068584949"

**Token check:**
  - —
#### 23. NMN Complex, 60 Capsules

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 60 |
| Brand URL | https://www.rainbowlight.com/products/nmn-complex-60-capsules-rl29142 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** —

**Token check:**
  - —
#### 24. Women's One 50+ plus Real Food Nutrients, 90 Vegetarian Caplets

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 90 |
| Brand URL | https://www.rainbowlight.com/products/womens-one-50-plus-real-food-nutrients-90-vegetarian-caplets-rl20423 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888204236 — Rainbow product JSON embedded on PDP: "barcode":"021888204236"

**Token check:**
  - —
#### 25. Daily Prebiotic + Probiotic Powder (Organic), 20 Billion CFU, 4.76 oz Bottle

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/daily-prebiotic-probiotic-powder-organic-20-billion-cfu-476-oz-bottle-rl1550073 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Digestive |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584765 — Rainbow product JSON embedded on PDP: "barcode":"850068584765"

**Token check:**
  - —
#### 26. Vitamin D3 + K2 as MK-7, 2 fl oz (59 mL) Liquid

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 2 |
| Brand URL | https://www.rainbowlight.com/products/vitamin-d3-k2-as-mk-7-2-fl-oz-59-ml-liquid-rl18621 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** —

**Token check:**
  - —
#### 27. Lion's Mane Mushroom Alcohol Free, 2 fl oz (59 mL) Liquid

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 2 |
| Brand URL | https://www.rainbowlight.com/products/lions-mane-mushroom-alcohol-free-2-fl-oz-59-ml-liquid-rl32152 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850086437036 — Rainbow product JSON embedded on PDP: "barcode":"850086437036"

**Token check:**
  - —
#### 28. Magnesium Glycinate 250 mg, 60 Quick Release Softgels

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/magnesium-glycinate-250-mg-60-quick-release-softgels-rl24123 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** —

**Token check:**
  - —
#### 29. Beef Organs for Women, 120 Capsules

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 120 |
| Brand URL | https://www.rainbowlight.com/products/beef-organs-for-women-120-capsules-rl28692 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850086437067 — Rainbow product JSON embedded on PDP: "barcode":"850086437067"

**Token check:**
  - —
#### 30. All-Zyme Double Strength, 90 Vegan Capsules

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/all-zyme-double-strength-90-vegan-capsules-rl35101 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888351015 — Rainbow product JSON embedded on PDP: "barcode":"021888351015"

**Token check:**
  - —
#### 31. Creatine + Multi Collagen Powder, 10 oz (285 g) Bottle

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/creatine-multi-collagen-powder-10-oz-285-g-bottle-rl28641 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584512 — Rainbow product JSON embedded on PDP: "barcode":"850068584512"

**Token check:**
  - —
#### 32. Oil of Oregano + Black Seed Oil 8000 mg, 90 Softgels

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 90 |
| Brand URL | https://www.rainbowlight.com/products/oil-of-oregano-black-seed-oil-8000-mg-90-softgels-rl28602 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584659 — Rainbow product JSON embedded on PDP: "barcode":"850068584659"

**Token check:**
  - —
#### 33. Liquid Chlorophyll 100 mg Natural Peppermint Flavor, 16 fl. oz. (473 mL) Liquid

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/liquid-chlorophyll-100-mg-natural-peppermint-flavor-16-fl-oz-473-ml-liquid-rl11960 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584703 — Rainbow product JSON embedded on PDP: "barcode":"850068584703"

**Token check:**
  - —
#### 34. Pasture Raised Beef Organ Complex, 120 Capsules

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 120 |
| Brand URL | https://www.rainbowlight.com/products/pasture-raised-beef-organ-complex-120-capsules-rl17651 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850086437074 — Rainbow product JSON embedded on PDP: "barcode":"850086437074"

**Token check:**
  - —
#### 35. Magnesium Glycinate Gummies 100 mg Sour Grape Flavor, 60 Vegan Gummies

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/magnesium-glycinate-gummies-100-mg-sour-grape-flavor-60-vegan-gummies-rl27432 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584567 — Rainbow product JSON embedded on PDP: "barcode":"850068584567"

**Token check:**
  - —
#### 36. Fulvic Acid Liquid Alcohol Free, 2 fl. oz. (59 mL) Liquid

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/fulvic-acid-liquid-alcohol-free-2-fl-oz-59-ml-liquid-rl24621 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584680 — Rainbow product JSON embedded on PDP: "barcode":"850068584680"

**Token check:**
  - —
#### 37. Colloidal Minerals Raspberry Flavor, 32 fl. oz (946 mL) Liquid

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/colloidal-minerals-raspberry-flavor-32-fl-oz-946-ml-liquid-rl39388 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584673 — Rainbow product JSON embedded on PDP: "barcode":"850068584673"

**Token check:**
  - —
#### 38. Men's One 50+ plus Real Food Nutrients, 90 Vegetarian Caplets

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 90 |
| Brand URL | https://www.rainbowlight.com/products/mens-one-50-plus-real-food-nutrients-90-vegetarian-caplets-rl20404 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **TRUNCATED** — Supplement Facts on brand site are image/carousel only (//www.rainbowlight.com/cdn/shop/files/resizedRL20404Mens20One20502090ctRev20ASquare20ThumbnailSupplement20Facts.jpg?v=1774546093&width=1536); Other Ingredients not in HTML. |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888204045 — Rainbow product JSON embedded on PDP: "barcode":"021888204045"

**Token check:**
  - —
#### 39. High Potency Vitamin C Gummies Citrus Flavor, 60 Vegan Gummies

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/high-potency-vitamin-c-gummies-citrus-flavor-60-vegan-gummies-rl20398 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888203987 — Rainbow product JSON embedded on PDP: "barcode":"021888203987"

**Token check:**
  - —
#### 40. Prenatal One + Real Food Nutrients, 150 Vegan Caplets

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/prenatal-one-real-food-nutrients-150-vegan-caplets-rl20432 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Prenatal |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888109760 — Rainbow product JSON embedded on PDP: "barcode":"021888109760"

**Token check:**
  - —
#### 41. Triple Strength Astaxanthin from Micoalgae 12 mg, 60 Quick Release Softgels

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/triple-strength-astaxanthin-from-micoalgae-12-mg-60-quick-release-softgels-rl12322 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584635 — Rainbow product JSON embedded on PDP: "barcode":"850068584635"

**Token check:**
  - —
#### 42. Algae-Derived Astaxanthin 10mg, 60 Softgels

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 60 |
| Brand URL | https://www.rainbowlight.com/products/algae-derived-astaxanthin-10mg-60-softgels-rl250 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584628 — Rainbow product JSON embedded on PDP: "barcode":"850068584628"

**Token check:**
  - —
#### 43. Baby Probiotic Drops 2.5 Billion CFU, .5 fl oz (15mL) Liquid

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 5 |
| Brand URL | https://www.rainbowlight.com/products/baby-probiotic-drops-25-billion-cfu-5-fl-oz-15ml-liquid-rl28361 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Digestive |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584727 — Rainbow product JSON embedded on PDP: "barcode":"850068584727"

**Token check:**
  - —
#### 44. Himalayan Shilajit 2,000 mg, 60 Quick Release Capsules

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/himalayan-shilajit-2000-mg-60-quick-release-capsules-rl8115 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584895 — Rainbow product JSON embedded on PDP: "barcode":"850068584895"

**Token check:**
  - —
#### 45. 35+ Mom & Baby + Real Food Nutrients, 60 Caplets

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 60 |
| Brand URL | https://www.rainbowlight.com/products/35-mom-baby-real-food-nutrients-60-caplets-rl20312 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888203123 — Rainbow product JSON embedded on PDP: "barcode":"021888203123"

**Token check:**
  - —
#### 46. Ashwagandha KSM-66 600 mg with L-Theanine, 60 Vegan Caplets

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/ashwagandha-ksm-66-600-mg-with-l-theanine-60-vegan-caplets-rl19032 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **FULL** — Other Ingredients read from brand HTML at step 2; actives listed as ungraded amounts (typed panel partial or image-backed). |
| Call | **HOLD-TOKEN** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** , it helps support a calm, balanced state.*

**UPC:** 850068584598 — Rainbow product JSON embedded on PDP: "barcode":"850068584598"

**Token check:**
  - UNGRADED — it helps support a calm
  - UNGRADED — balanced state.*
#### 47. Valerian Root Liquid Herbal Extract Alcohol Free, 2 fl oz (59 mL) Liquid

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 2 |
| Brand URL | https://www.rainbowlight.com/products/valerian-root-liquid-herbal-extract-alcohol-free-2-fl-oz-59-ml-liquid-rl39552 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584284 — Rainbow product JSON embedded on PDP: "barcode":"850068584284"

**Token check:**
  - —
#### 48. Saffron+ Magnesium Glycinate with B12, 90 Vegan Capsules

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/saffron-magnesium-glycinate-with-b12-90-vegan-capsules-rl28741 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584901 — Rainbow product JSON embedded on PDP: "barcode":"850068584901"

**Token check:**
  - —
#### 49. Women's One + Real Food Nutrients, 120 Vegetarian Caplets

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 120 |
| Brand URL | https://www.rainbowlight.com/products/womens-one-real-food-nutrients-120-vegetarian-caplets-rl20416 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **TRUNCATED** — Supplement Facts on brand site are image/carousel only (//www.rainbowlight.com/cdn/shop/files/resizedRL20416Womens20One20120ctRev20ASquare20ThumbnailSupplement20Facts.jpg?v=1776735086&width=1536); Other Ingredients not in HTML. |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888217052 — Rainbow product JSON embedded on PDP: "barcode":"021888217052"

**Token check:**
  - —
#### 50. Ionic Magnesium Liquid, 4 fl oz (118 mL) Liquid

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 4 |
| Brand URL | https://www.rainbowlight.com/products/ionic-magnesium-liquid-4-fl-oz-118-ml-liquid-rl24241 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584581 — Rainbow product JSON embedded on PDP: "barcode":"850068584581"

**Token check:**
  - —
#### 51. Lithium Orotate, 5 mg, 120 Vegan Capsules

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/lithium-orotate-5-mg-120-vegan-capsules-rl15233 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **FULL** — Other Ingredients read from brand HTML at step 2; actives listed as ungraded amounts (typed panel partial or image-backed). |
| Call | **HOLD-TOKEN** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** include rice powder, vegan capsule, and vegetable magnesium stearate to ensure consistent capsule quality

**UPC:** 850068584697 — Rainbow product JSON embedded on PDP: "barcode":"850068584697"

**Token check:**
  - LOCKED — and vegetable magnesium stearate to ensure consistent capsule quality → Methodology §5 (magnesium stearate)
  - UNGRADED — include rice powder
  - UNGRADED — vegan capsule
#### 52. Super Yohimbe Liquid Extract Alcohol Free, 2 fl oz (59 mL) Liquid

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 2 |
| Brand URL | https://www.rainbowlight.com/products/super-yohimbe-liquid-extract-alcohol-free-2-fl-oz-59-ml-liquid-rl40411 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584307 — Rainbow product JSON embedded on PDP: "barcode":"850068584307"

**Token check:**
  - —
#### 53. Apple Cider Vinegar Gummies (Organic) Apple Flavor, 50 Vegan Gummies

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/apple-cider-vinegar-gummies-organic-apple-flavor-50-vegan-gummies-rl27761 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584505 — Rainbow product JSON embedded on PDP: "barcode":"850068584505"

**Token check:**
  - —
#### 54. Active Health Teen with DermaComplex + Real Food Nutrients, 45 Vegan Caplets

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/active-health-teen-with-dermacomplex-real-food-nutrients-45-vegan-caplets-rl30221 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888302215 — Rainbow product JSON embedded on PDP: "barcode":"021888302215"

**Token check:**
  - —
#### 55. Biotin Collagen + Hyaluronic Acid Vanilla Citrus Flavor, 2 fl oz (59 mL) Liquid

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 2 |
| Brand URL | https://www.rainbowlight.com/products/biotin-collagen-hyaluronic-acid-vanilla-citrus-flavor-2-fl-oz-59-ml-liquid-rl28351 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584758 — Rainbow product JSON embedded on PDP: "barcode":"850068584758"

**Token check:**
  - —
#### 56. Magnesium Glycinate Raspberry Lemonade Flavor, 5 oz (142 g) Powder

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/magnesium-glycinate-raspberry-lemonade-flavor-5-oz-142-g-powder-rl24492 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584543 — Rainbow product JSON embedded on PDP: "barcode":"850068584543"

**Token check:**
  - —
#### 57. Kid’s One Multi + Real Food Nutrients Fruit Punch, 90 Chewable Vegan Tablets

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/kids-one-multi-real-food-nutrients-fruit-punch-90-chewable-vegan-tablets-rl10982 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888109821 — Rainbow product JSON embedded on PDP: "barcode":"021888109821"

**Token check:**
  - —
#### 58. Active Health Teen with DermaComplex + Real Food Nutrients, 90 Vegan Caplets

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/active-health-teen-with-dermacomplex-real-food-nutrients-90-vegan-caplets-rl11202 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888112029 — Rainbow product JSON embedded on PDP: "barcode":"021888112029"

**Token check:**
  - —
#### 59. Ashwagandha Gummies 500 mg Tropical Flavor, 60 Vegan Gummies

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/ashwagandha-gummies-500-mg-tropical-flavor-60-vegan-gummies-rl18131 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584611 — Rainbow product JSON embedded on PDP: "barcode":"850068584611"

**Token check:**
  - —
#### 60. Men's One + Real Food Nutrients, 150 Vegetarian Caplets

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 150 |
| Brand URL | https://www.rainbowlight.com/products/mens-one-real-food-nutrients-150-vegetarian-caplets-rl20395 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888108930 — Rainbow product JSON embedded on PDP: "barcode":"021888108930"

**Token check:**
  - —
#### 61. Calcium Magnesium and Vegan D3 + Real Food Nutrients, 180 Vegan Caplets

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/calcium-magnesium-and-vegan-d3-real-food-nutrients-180-vegan-caplets-rl10952 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888109524 — Rainbow product JSON embedded on PDP: "barcode":"021888109524"

**Token check:**
  - —
#### 62. Kid’s One Multi + Real Food Nutrients Fruit Punch, 50 Chewable Vegan Tablets

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/kids-one-multi-real-food-nutrients-fruit-punch-50-chewable-vegan-tablets-rl30231 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** —

**Token check:**
  - —
#### 63. Certified Women's + Real Food Nutrients Multi, 120 Vegetarian Capsules

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/certified-womens-real-food-nutrients-multi-120-vegetarian-capsules-rl80001 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888800018 — Rainbow product JSON embedded on PDP: "barcode":"021888800018"

**Token check:**
  - —
#### 64. Beet Root Soft Chews Mixed Berry Flavor, 60 Soft Chews

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/beet-root-soft-chews-mixed-berry-flavor-60-soft-chews-rl28421 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584864 — Rainbow product JSON embedded on PDP: "barcode":"850068584864"

**Token check:**
  - —
#### 65. L-Methylfolate 15 mg with Organic Glycerin Berry Flavor, 2 fl oz (59 mL) Liquid

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 2 |
| Brand URL | https://www.rainbowlight.com/products/l-methylfolate-15-mg-with-organic-glycerin-berry-flavor-2-fl-oz-59-ml-liquid-rl31631 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584789 — Rainbow product JSON embedded on PDP: "barcode":"850068584789"

**Token check:**
  - —
#### 66. Prenatal One + Real Food Nutrients, 120 Vegan Caplets

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/prenatal-one-real-food-nutrients-120-vegan-caplets-rl20431 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Prenatal |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888217250 — Rainbow product JSON embedded on PDP: "barcode":"021888217250"

**Token check:**
  - —
#### 67. Oil of Oregano Extract, 2000 mg, 90 Softgels

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 90 |
| Brand URL | https://www.rainbowlight.com/products/oil-of-oregano-extract-2000-mg-90-softgels-rl3580 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **FULL** — Other Ingredients read from brand HTML at step 2; actives listed as ungraded amounts (typed panel partial or image-backed). |
| Call | **HOLD-TOKEN** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** include extra virgin olive oil, gelatin, and vegetable glycerin for additional support

**UPC:** 850068584642 — Rainbow product JSON embedded on PDP: "barcode":"850068584642"

**Token check:**
  - LOCKED — gelatin → Methodology §5 (gelatin)
  - LOCKED — and vegetable glycerin for additional support → Methodology §5 (glycerin)
  - UNGRADED — include extra virgin olive oil
#### 68. Men's One + Real Food Nutrients, 120 Vegetarian Caplets

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 120 |
| Brand URL | https://www.rainbowlight.com/products/mens-one-real-food-nutrients-120-vegetarian-caplets-rl20394 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888217151 — Rainbow product JSON embedded on PDP: "barcode":"021888217151"

**Token check:**
  - —
#### 69. 10 Mushroom Power Complex Gummies Blueberry Flavor, 60 Vegan Gummies

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/10-mushroom-power-complex-gummies-blueberry-flavor-60-vegan-gummies-rl25483 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584857 — Rainbow product JSON embedded on PDP: "barcode":"850068584857"

**Token check:**
  - —
#### 70. Magnesium Glycinate + Ashwagandha, 120 Vegan Capsules

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/magnesium-glycinate-ashwagandha-120-vegan-capsules-rl27015 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584925 — Rainbow product JSON embedded on PDP: "barcode":"850068584925"

**Token check:**
  - —
#### 71. Graviola (Soursop), 60 Capsules

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 60 |
| Brand URL | https://www.rainbowlight.com/products/graviola-soursop-60-capsules-rl6075 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584802 — Rainbow product JSON embedded on PDP: "barcode":"850068584802"

**Token check:**
  - —
#### 72. Mucuna Ashwagandha 3000mg, 200 Vegan Capsules

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/mucuna-ashwagandha-3000mg-200-vegan-capsules-rl24262 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **FULL** — Other Ingredients read from brand HTML at step 2; actives listed as ungraded amounts (typed panel partial or image-backed). |
| Call | **HOLD-TOKEN** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** include rice powder, vegan capsule, vegetable magnesium stearate, and silica for additional support

**UPC:** 850068584604 — Rainbow product JSON embedded on PDP: "barcode":"850068584604"

**Token check:**
  - LOCKED — vegetable magnesium stearate → Methodology §5 (magnesium stearate)
  - LOCKED — and silica for additional support → Methodology §5 (silicon dioxide)
  - UNGRADED — include rice powder
  - UNGRADED — vegan capsule
#### 73. Certified Men's Multivitamin, 120 Vegetarian Capsules

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/certified-mens-multivitamin-120-vegetarian-capsules-rl80011 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888800117 — Rainbow product JSON embedded on PDP: "barcode":"021888800117"

**Token check:**
  - —
#### 74. Prenatal Daily Duo Multivitamin & DHA, 2 Bottles

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/prenatal-daily-duo-multivitamin-dha-2-bottles-rl20435 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Prenatal |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888600069 — Rainbow product JSON embedded on PDP: "barcode":"021888600069"

**Token check:**
  - —
#### 75. Probiolicious Probiotic Gummies Berry Flavor, 50 Vegan Gummies

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/probiolicious-probiotic-gummies-berry-flavor-50-vegan-gummies-rl12121 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Digestive |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888121212 — Rainbow product JSON embedded on PDP: "barcode":"021888121212"

**Token check:**
  - —
#### 76. Gummy Vitamin C Slices 250 mg Tangy Orange Flavor, 90 Vegan Gummies

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/gummy-vitamin-c-slices-250-mg-tangy-orange-flavor-90-vegan-gummies-rl12033 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888120338 — Rainbow product JSON embedded on PDP: "barcode":"021888120338"

**Token check:**
  - —
#### 77. Prenatal DHA Ultra Omega-3 Fish Oil, 180 Softgels

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 180 |
| Brand URL | https://www.rainbowlight.com/products/prenatal-dha-ultra-omega-3-fish-oil-180-softgels-rl27263 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Prenatal |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584093 — Rainbow product JSON embedded on PDP: "barcode":"850068584093"

**Token check:**
  - —
#### 78. 10 Mushroom Power Complex, 60 Vegan Capsules

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/10-mushroom-power-complex-60-vegan-capsules-rl25613 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584048 — Rainbow product JSON embedded on PDP: "barcode":"850068584048"

**Token check:**
  - —
#### 79. Pumpkin Seed Oil Cold Pressed (Organic), 16 fl oz (473 mL) Liquid

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 16 |
| Brand URL | https://www.rainbowlight.com/products/pumpkin-seed-oil-cold-pressed-organic-16-fl-oz-473-ml-liquid-rl8720 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Cold & Flu |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584369 — Rainbow product JSON embedded on PDP: "barcode":"850068584369"

**Token check:**
  - —
#### 80. Men's One + Real Food Nutrients, 60 Vegetarian Caplets

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 60 |
| Brand URL | https://www.rainbowlight.com/products/mens-one-real-food-nutrients-60-vegetarian-caplets-rl20392 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **TRUNCATED** — Supplement Facts on brand site are image/carousel only (//www.rainbowlight.com/cdn/shop/files/RL20392Mens20OneRev20BSquare20ThumbnailSupplement20Factsv2.jpg?v=1776735020&width=1536); Other Ingredients not in HTML. |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888217137 — Rainbow product JSON embedded on PDP: "barcode":"021888217137"

**Token check:**
  - —
#### 81. Oil of Oregano Liquid Extract Alcohol Free (Organic), 2 fl oz (59 mL) Liquid

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 2 |
| Brand URL | https://www.rainbowlight.com/products/oil-of-oregano-liquid-extract-alcohol-free-organic-2-fl-oz-59-ml-liquid-rl30261 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584352 — Rainbow product JSON embedded on PDP: "barcode":"850068584352"

**Token check:**
  - —
#### 82. Dandelion Root Liquid Extract Alcohol Free, 2 fl oz (59 mL) Liquid

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 2 |
| Brand URL | https://www.rainbowlight.com/products/dandelion-root-liquid-extract-alcohol-free-2-fl-oz-59-ml-liquid-rl40351 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 850068584277 — Rainbow product JSON embedded on PDP: "barcode":"850068584277"

**Token check:**
  - —
#### 83. Postnatal Multivitamin Superfood Blend & Probiotics, 120 Vegetarian Capsules

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/postnatal-multivitamin-superfood-blend-probiotics-120-vegetarian-capsules-rl78161 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Digestive |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888781614 — Rainbow product JSON embedded on PDP: "barcode":"021888781614"

**Token check:**
  - —
#### 84. Calcium Magnesium and Vegan D3 + Real Food Nutrients, 90 Vegan Caplets

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | — |
| Brand URL | https://www.rainbowlight.com/products/calcium-magnesium-and-vegan-d3-real-food-nutrients-90-vegan-caplets-rl10951 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Vitamins |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888109517 — Rainbow product JSON embedded on PDP: "barcode":"021888109517"

**Token check:**
  - —
#### 85. Prenatal DHA Ultra Omega-3 Fish Oil, 60 Softgels

| Field | Value |
| --- | --- |
| Brand | Rainbow Light |
| Count | 60 |
| Brand URL | https://www.rainbowlight.com/products/prenatal-dha-ultra-omega-3-fish-oil-60-softgels-rl11332 |
| DailyMed setid | none (0 drug SPLs for supplement brands at step 1) |
| Search tab | Prenatal |
| Panel | **MISSING** — Brand page did not print Supplement Facts text or Other Ingredients (step 2). |
| Call | **HOLD-PANEL** |

**Actives (ungraded):** — (not extracted at step 2)

**Other Ingredients (verbatim):** —

**UPC:** 021888113323 — Rainbow product JSON embedded on PDP: "barcode":"021888113323"

**Token check:**
  - —
### DUP (excluded MAIN)

- Women's One + Real Food Nutrients, 30 Vegetarian Caplets → `rainbow-b187-womens-one-30`
- Women's One 50+ plus Real Food Nutrients, 150 Vegetarian Caplets → `rainbow-b187-womens-one-150`
- Women's One + Real Food Nutrients, 150 Vegetarian Caplets → `rainbow-b187-womens-one-150`
- Women's One + Real Food Nutrients, 60 Vegetarian Caplets → `rainbow-b188-womens-one-60`

---

## UNGRADED token packet (aggregate)

Tokens appearing on at least one candidate without an exact §5 lock match in automated pass. Founder 7-step before write.

- **: corn syrup** — 2 candidate(s) (e.g. Schiff: neuriva brain health plus gummies 50 ct (50 pieces); Schiff: neuriva brain health plus gummies 50 ct (30 pieces))
- **"align":"start"** — 4 candidate(s) (e.g. Schiff: airborne kids assorted fruit flavored gummies (63 pieces); Schiff: airborne kids assorted fruit flavored gummies (10 pieces))
- **"content":"** — 4 candidate(s) (e.g. Schiff: airborne kids assorted fruit flavored gummies (63 pieces); Schiff: airborne kids assorted fruit flavored gummies (10 pieces))
- **"content":[{"image":[]** — 4 candidate(s) (e.g. Schiff: airborne kids assorted fruit flavored gummies (63 pieces); Schiff: airborne kids assorted fruit flavored gummies (10 pieces))
- **"disabled":false** — 4 candidate(s) (e.g. Schiff: airborne kids assorted fruit flavored gummies (63 pieces); Schiff: airborne kids assorted fruit flavored gummies (10 pieces))
- **"imageposition":"right"** — 4 candidate(s) (e.g. Schiff: airborne kids assorted fruit flavored gummies (63 pieces); Schiff: airborne kids assorted fruit flavored gummies (10 pieces))
- **"imagewidth":""}]}** — 4 candidate(s) (e.g. Schiff: airborne kids assorted fruit flavored gummies (63 pieces); Schiff: airborne kids assorted fruit flavored gummies (10 pieces))
- **{"accordiontitle":"directions"** — 4 candidate(s) (e.g. Schiff: airborne kids assorted fruit flavored gummies (63 pieces); Schiff: airborne kids assorted fruit flavored gummies (10 pieces))
- **acesulfame potassium** — 9 candidate(s) (e.g. Schiff: airborne electrolyte replenisher immune support effercescent tablet watermelon (63 pieces); Schiff: airborne electrolyte replenisher immune support effercescent tablet watermelon (10 pieces))
- **balanced state.*** — 1 candidate(s) (e.g. Rainbow Light: Ashwagandha KSM-66 600 mg with L-Theanine, 60 Vegan Caplets)
- **blue 1** — 4 candidate(s) (e.g. Schiff: megared advanced 4in1 900mg 40ct (40 pieces); Schiff: megared advanced 4in1 900mg 40ct (25 pieces))
- **calcium carbonate** — 4 candidate(s) (e.g. Schiff: megared advanced coq10 100mg (40 pieces); Schiff: megared advanced coq10 100mg (25 pieces))
- **carmine color** — 4 candidate(s) (e.g. Schiff: airborne electrolyte replenisher immune support effercescent tablet watermelon (63 pieces); Schiff: airborne electrolyte replenisher immune support effercescent tablet watermelon (10 pieces))
- **coconut and canola oil** — 2 candidate(s) (e.g. Schiff: neuriva brain health plus gummies 50 ct (50 pieces); Schiff: neuriva brain health plus gummies 50 ct (30 pieces))
- **colors from fruits and vegetables** — 6 candidate(s) (e.g. Schiff: neuriva brain health plus gummies 50 ct (50 pieces); Schiff: neuriva brain health plus gummies 50 ct (30 pieces))
- **colors from fruits and vegetables"** — 4 candidate(s) (e.g. Schiff: airborne kids assorted fruit flavored gummies (63 pieces); Schiff: airborne kids assorted fruit flavored gummies (10 pieces))
- **corn syrup** — 13 candidate(s) (e.g. Schiff: airborne assorted fruit flavored gummies 750mg of vitamin c and minerals herbs immune support (63 pieces); Schiff: airborne assorted fruit flavored gummies 750mg of vitamin c and minerals herbs immune support (10 pieces))
- **dibasic calcium phosphate** — 1 candidate(s) (e.g. Slow Fe: Slow Fe Slow Release Iron (30 tablets))
- **ethyl vanillin** — 17 candidate(s) (e.g. Schiff: megared 1000mg ultra concentrate pro omega 3 krill oil softgels (40 pieces); Schiff: megared 1000mg ultra concentrate pro omega 3 krill oil softgels (25 pieces))
- **fd&c blue 1 lake.** — 1 candidate(s) (e.g. Slow Fe: Slow Fe Slow Release Iron (30 tablets))
- **fd&c red 40 lake** — 1 candidate(s) (e.g. Slow Fe: Slow Fe Slow Release Iron (30 tablets))
- **fd&c yellow 6 lake** — 1 candidate(s) (e.g. Slow Fe: Slow Fe Slow Release Iron (30 tablets))
- **fully hydrogenated soybean oil** — 4 candidate(s) (e.g. Schiff: airborne zinc chewables (63 pieces); Schiff: airborne zinc chewables (10 pieces))
- **ginger root powder** — 4 candidate(s) (e.g. Schiff: airborne zinc chewables (63 pieces); Schiff: airborne zinc chewables (10 pieces))
- **gum acacia** — 4 candidate(s) (e.g. Schiff: airborne zinc chewables (63 pieces); Schiff: airborne zinc chewables (10 pieces))
- **honey** — 5 candidate(s) (e.g. Schiff: airborne honey lemon immune support gummies (63 pieces); Schiff: airborne honey lemon immune support gummies (10 pieces))
- **include extra virgin olive oil** — 1 candidate(s) (e.g. Rainbow Light: Oil of Oregano Extract, 2000 mg, 90 Softgels)
- **include rice powder** — 2 candidate(s) (e.g. Rainbow Light: Lithium Orotate, 5 mg, 120 Vegan Capsules; Rainbow Light: Mucuna Ashwagandha 3000mg, 200 Vegan Capsules)
- **it helps support a calm** — 1 candidate(s) (e.g. Rainbow Light: Ashwagandha KSM-66 600 mg with L-Theanine, 60 Vegan Caplets)
- **mica [color]** — 4 candidate(s) (e.g. Move Free: move free ultra triple action typeiicollagen (30 pieces); Move Free: move free ultra triple action typeiicollagen (80 pieces))
- **natural and artificial flavor** — 5 candidate(s) (e.g. Schiff: airborne immune essentials effervescent tablet (63 pieces); Schiff: airborne immune essentials effervescent tablet (10 pieces))
- **natural and artificial flavors** — 4 candidate(s) (e.g. Schiff: airborne assorted fruit flavored gummies 750mg of vitamin c and minerals herbs immune support (63 pieces); Schiff: airborne assorted fruit flavored gummies 750mg of vitamin c and minerals herbs immune support (10 pieces))
- **natural orange flavor** — 4 candidate(s) (e.g. Schiff: airborne zinc chewables (63 pieces); Schiff: airborne zinc chewables (10 pieces))
- **orange juice concentrate** — 2 candidate(s) (e.g. Schiff: neuriva brain health plus gummies 50 ct (50 pieces); Schiff: neuriva brain health plus gummies 50 ct (30 pieces))
- **potassium bicarbonate** — 5 candidate(s) (e.g. Schiff: airborne immune essentials effervescent tablet (63 pieces); Schiff: airborne immune essentials effervescent tablet (10 pieces))
- **red 40** — 4 candidate(s) (e.g. Schiff: megared advanced 4in1 900mg 40ct (40 pieces); Schiff: megared advanced 4in1 900mg 40ct (25 pieces))
- **riboflavin** — 4 candidate(s) (e.g. Move Free: move free advanced tamaflex (30 pieces); Move Free: move free advanced tamaflex (80 pieces))
- **rice brain** — 2 candidate(s) (e.g. Schiff: neuriva plus brain health supplement clinically tested brain supporting naturally sourced ingredients (30 pieces); Schiff: neuriva plus brain health supplement clinically tested brain supporting naturally sourced ingredients (50 pieces))
- **sodium bicarbonate** — 5 candidate(s) (e.g. Schiff: airborne immune essentials effervescent tablet (63 pieces); Schiff: airborne immune essentials effervescent tablet (10 pieces))
- **sodium citrate** — 9 candidate(s) (e.g. Schiff: airborne elderberry gummies immune support supplement 50 ct (50 pieces); Schiff: airborne elderberry gummies immune support supplement 50 ct (63 pieces))
- **sorbitol** — 26 candidate(s) (e.g. Schiff: megared 1000mg ultra concentrate pro omega 3 krill oil softgels (40 pieces); Schiff: megared 1000mg ultra concentrate pro omega 3 krill oil softgels (25 pieces))
- **sucralose** — 9 candidate(s) (e.g. Schiff: airborne electrolyte replenisher immune support effercescent tablet watermelon (63 pieces); Schiff: airborne electrolyte replenisher immune support effercescent tablet watermelon (10 pieces))
- **sucrose** — 4 candidate(s) (e.g. Schiff: airborne zinc chewables (63 pieces); Schiff: airborne zinc chewables (10 pieces))
- **sugar** — 19 candidate(s) (e.g. Schiff: neuriva brain health plus gummies 50 ct (50 pieces); Schiff: neuriva brain health plus gummies 50 ct (30 pieces))
- **tapioca syrup** — 4 candidate(s) (e.g. Schiff: airborne elderberry gummies immune support supplement 50 ct (50 pieces); Schiff: airborne elderberry gummies immune support supplement 50 ct (63 pieces))
- **tribasic calcium phosphate** — 1 candidate(s) (e.g. Slow Fe: Slow Fe Slow Release Iron (30 tablets))
- **tricalcium phosphate** — 4 candidate(s) (e.g. Schiff: megared advanced coq10 100mg (40 pieces); Schiff: megared advanced coq10 100mg (25 pieces))
- **vegan capsule** — 2 candidate(s) (e.g. Rainbow Light: Lithium Orotate, 5 mg, 120 Vegan Capsules; Rainbow Light: Mucuna Ashwagandha 3000mg, 200 Vegan Capsules)
- **water** — 36 candidate(s) (e.g. Schiff: neuriva brain health plus gummies 50 ct (50 pieces); Schiff: neuriva brain health plus gummies 50 ct (30 pieces))

---

## Compact candidate table (non-DUP)

| Brand | Product | Count | Panel | Tab | Call |
| --- | --- | ---: | --- | --- | --- |
| Schiff | neuriva brain memory 3d (30 pieces) | 30 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | neuriva brain memory 3d (50 pieces) | 50 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | neuriva original brain health clinically tested brain supporting suppl | 50 | FULL | Vitamins | WRITE-READY (pending stores) |
| Schiff | neuriva plus brain health supplement clinically tested brain supportin | 30 | FULL | Vitamins | HOLD-TOKEN |
| Schiff | neuriva plus brain health supplement clinically tested brain supportin | 50 | FULL | Vitamins | HOLD-TOKEN |
| Schiff | neuriva brain health original gummies 50 ct (50 pieces) | 50 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | neuriva brain health plus gummies 50 ct (50 pieces) | 50 | FULL | Vitamins | HOLD-TOKEN |
| Schiff | neuriva brain health plus gummies 50 ct (30 pieces) | 30 | FULL | Vitamins | HOLD-TOKEN |
| Schiff | neuriva ultra brain supplement (30 pieces) | 30 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | neuriva ultra brain supplement (50 pieces) | 50 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | neuriva ultra brain supplement (60 pieces) | 60 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | neuriva sleep plus (30 pieces) | 30 | MISSING | Sleep | HOLD-PANEL |
| Schiff | neuriva sleep plus (50 pieces) | 50 | MISSING | Sleep | HOLD-PANEL |
| Schiff | neuriva sleep plus (58 pieces) | 58 | MISSING | Sleep | HOLD-PANEL |
| Schiff | megared advanced coq10 100mg (40 pieces) | 40 | FULL | Vitamins | HOLD-TOKEN |
| Schiff | megared advanced coq10 100mg (25 pieces) | 25 | FULL | Vitamins | HOLD-TOKEN |
| Schiff | megared advanced coq10 100mg (80 pieces) | 80 | FULL | Vitamins | HOLD-TOKEN |
| Schiff | megared advanced coq10 100mg (60 pieces) | 60 | FULL | Vitamins | HOLD-TOKEN |
| Schiff | megared 1000mg ultra concentrate pro omega 3 krill oil softgels (40 pi | 40 | FULL | Vitamins | HOLD-TOKEN |
| Schiff | megared 1000mg ultra concentrate pro omega 3 krill oil softgels (25 pi | 25 | FULL | Vitamins | HOLD-TOKEN |
| Schiff | megared 1000mg ultra concentrate pro omega 3 krill oil softgels (80 pi | 80 | FULL | Vitamins | HOLD-TOKEN |
| Schiff | megared 1000mg ultra concentrate pro omega 3 krill oil softgels (60 pi | 60 | FULL | Vitamins | HOLD-TOKEN |
| Schiff | megared 1000mg ultra concentrate pro omega 3 krill oil softgels (30 pi | 30 | FULL | Vitamins | HOLD-TOKEN |
| Schiff | megared advanced 4in1 900mg 40ct (40 pieces) | 40 | FULL | Vitamins | HOLD-TOKEN |
| Schiff | megared advanced 4in1 900mg 40ct (25 pieces) | 25 | FULL | Vitamins | HOLD-TOKEN |
| Schiff | megared advanced 4in1 900mg 40ct (80 pieces) | 80 | FULL | Vitamins | HOLD-TOKEN |
| Schiff | megared advanced 4in1 900mg 40ct (60 pieces) | 60 | FULL | Vitamins | HOLD-TOKEN |
| Schiff | megared advanced 4in1 500mg (40 pieces) | 40 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | megared advanced 4in1 500mg (25 pieces) | 25 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | megared advanced 4in1 500mg (80 pieces) | 80 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | megared advanced 4in1 500mg (60 pieces) | 60 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | megared 500mg extra strength (40 pieces) | 40 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | megared 500mg extra strength (25 pieces) | 25 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | megared 500mg extra strength (80 pieces) | 80 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | megared 500mg extra strength (60 pieces) | 60 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | megared advanced 6x better absorption 800mg softgels omega 3 fish oil  | 40 | FULL | Vitamins | HOLD-TOKEN |
| Schiff | megared advanced 6x better absorption 800mg softgels omega 3 fish oil  | 25 | FULL | Vitamins | HOLD-TOKEN |
| Schiff | megared advanced 6x better absorption 800mg softgels omega 3 fish oil  | 80 | FULL | Vitamins | HOLD-TOKEN |
| Schiff | megared advanced 6x better absorption 800mg softgels omega 3 fish oil  | 60 | FULL | Vitamins | HOLD-TOKEN |
| Schiff | megared 350mg omega3 krill oil (40 pieces) | 40 | FULL | Vitamins | HOLD-TOKEN |
| Schiff | megared 350mg omega3 krill oil (25 pieces) | 25 | FULL | Vitamins | HOLD-TOKEN |
| Schiff | megared 350mg omega3 krill oil (80 pieces) | 80 | FULL | Vitamins | HOLD-TOKEN |
| Schiff | megared 350mg omega3 krill oil (60 pieces) | 60 | FULL | Vitamins | HOLD-TOKEN |
| Schiff | megared advanced total body refresh 500 mg softgels (40 pieces) | 40 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | megared advanced total body refresh 500 mg softgels (25 pieces) | 25 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | megared advanced total body refresh 500 mg softgels (80 pieces) | 80 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | megared advanced total body refresh 500 mg softgels (60 pieces) | 60 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | megared advanced total body refresh 500 mg softgels (65 pieces) | 65 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | digestive advantage lactose defense formula (96 pieces) | 96 | MISSING | Digestive | HOLD-PANEL |
| Schiff | digestive advantage lactose defense formula (32 pieces) | 32 | MISSING | Digestive | HOLD-PANEL |
| Schiff | digestive advantage lactose defense formula (30 pieces) | 30 | MISSING | Digestive | HOLD-PANEL |
| Schiff | digestive advantage lactose defense formula (60 pieces) | 60 | MISSING | Digestive | HOLD-PANEL |
| Schiff | digestive advantage intensive bowel support (96 pieces) | 96 | MISSING | Digestive | HOLD-PANEL |
| Schiff | digestive advantage intensive bowel support (32 pieces) | 32 | MISSING | Digestive | HOLD-PANEL |
| Schiff | digestive advantage intensive bowel support (30 pieces) | 30 | MISSING | Digestive | HOLD-PANEL |
| Schiff | digestive advantage intensive bowel support (60 pieces) | 60 | MISSING | Digestive | HOLD-PANEL |
| Schiff | digestive advantage fast acting enzymes probiotic (96 pieces) | 96 | MISSING | Digestive | HOLD-PANEL |
| Schiff | digestive advantage fast acting enzymes probiotic (32 pieces) | 32 | MISSING | Digestive | HOLD-PANEL |
| Schiff | digestive advantage fast acting enzymes probiotic (30 pieces) | 30 | MISSING | Digestive | HOLD-PANEL |
| Schiff | digestive advantage fast acting enzymes probiotic (60 pieces) | 60 | MISSING | Digestive | HOLD-PANEL |
| Schiff | digestive advantage daily probiotic (96 pieces) | 96 | MISSING | Digestive | HOLD-PANEL |
| Schiff | digestive advantage daily probiotic (32 pieces) | 32 | MISSING | Digestive | HOLD-PANEL |
| Schiff | digestive advantage daily probiotic (30 pieces) | 30 | MISSING | Digestive | HOLD-PANEL |
| Schiff | digestive advantage daily probiotic (60 pieces) | 60 | MISSING | Digestive | HOLD-PANEL |
| Schiff | digestive advantage probiotic gummies (96 pieces) | 96 | MISSING | Digestive | HOLD-PANEL |
| Schiff | digestive advantage probiotic gummies (32 pieces) | 32 | MISSING | Digestive | HOLD-PANEL |
| Schiff | digestive advantage probiotic gummies (30 pieces) | 30 | MISSING | Digestive | HOLD-PANEL |
| Schiff | digestive advantage probiotic gummies (60 pieces) | 60 | MISSING | Digestive | HOLD-PANEL |
| Schiff | digestive advantage kids daily probiotic gummies (96 pieces) | 96 | MISSING | Digestive | HOLD-PANEL |
| Schiff | digestive advantage kids daily probiotic gummies (32 pieces) | 32 | MISSING | Digestive | HOLD-PANEL |
| Schiff | digestive advantage kids daily probiotic gummies (30 pieces) | 30 | MISSING | Digestive | HOLD-PANEL |
| Schiff | digestive advantage kids daily probiotic gummies (60 pieces) | 60 | MISSING | Digestive | HOLD-PANEL |
| Schiff | airborne assorted fruit flavored gummies 750mg of vitamin c and minera | 63 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne assorted fruit flavored gummies 750mg of vitamin c and minera | 10 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne assorted fruit flavored gummies 750mg of vitamin c and minera | 50 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne assorted fruit flavored gummies 750mg of vitamin c and minera | 32 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne kids assorted fruit flavored gummies (63 pieces) | 63 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne kids assorted fruit flavored gummies (10 pieces) | 10 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne kids assorted fruit flavored gummies (50 pieces) | 50 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne kids assorted fruit flavored gummies (32 pieces) | 32 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne zesty orange effervescent (63 pieces) | 63 | MISSING | Immune Support | HOLD-PANEL |
| Schiff | airborne zesty orange effervescent (10 pieces) | 10 | MISSING | Immune Support | HOLD-PANEL |
| Schiff | airborne zesty orange effervescent (50 pieces) | 50 | MISSING | Immune Support | HOLD-PANEL |
| Schiff | airborne zesty orange effervescent (32 pieces) | 32 | MISSING | Immune Support | HOLD-PANEL |
| Schiff | airborne elderberry gummies immune support supplement 50 ct (50 pieces | 50 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne elderberry gummies immune support supplement 50 ct (63 pieces | 63 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne elderberry gummies immune support supplement 50 ct (10 pieces | 10 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne elderberry gummies immune support supplement 50 ct (32 pieces | 32 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne citrus chewable tablets (63 pieces) | 63 | MISSING | Immune Support | HOLD-PANEL |
| Schiff | airborne citrus chewable tablets (10 pieces) | 10 | MISSING | Immune Support | HOLD-PANEL |
| Schiff | airborne citrus chewable tablets (50 pieces) | 50 | MISSING | Immune Support | HOLD-PANEL |
| Schiff | airborne citrus chewable tablets (32 pieces) | 32 | MISSING | Immune Support | HOLD-PANEL |
| Schiff | airborne honey lemon immune support gummies (63 pieces) | 63 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne honey lemon immune support gummies (10 pieces) | 10 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne honey lemon immune support gummies (50 pieces) | 50 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne honey lemon immune support gummies (32 pieces) | 32 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne honey lemon immune support gummies (42 pieces) | 42 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne very berry effervescent (63 pieces) | 63 | MISSING | Immune Support | HOLD-PANEL |
| Schiff | airborne very berry effervescent (10 pieces) | 10 | MISSING | Immune Support | HOLD-PANEL |
| Schiff | airborne very berry effervescent (50 pieces) | 50 | MISSING | Immune Support | HOLD-PANEL |
| Schiff | airborne very berry effervescent (32 pieces) | 32 | MISSING | Immune Support | HOLD-PANEL |
| Schiff | airborne zinc chewables (63 pieces) | 63 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne zinc chewables (10 pieces) | 10 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne zinc chewables (50 pieces) | 50 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne zinc chewables (32 pieces) | 32 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne orange fruit flavored gummies (63 pieces) | 63 | MISSING | Immune Support | HOLD-PANEL |
| Schiff | airborne orange fruit flavored gummies (10 pieces) | 10 | MISSING | Immune Support | HOLD-PANEL |
| Schiff | airborne orange fruit flavored gummies (50 pieces) | 50 | MISSING | Immune Support | HOLD-PANEL |
| Schiff | airborne orange fruit flavored gummies (32 pieces) | 32 | MISSING | Immune Support | HOLD-PANEL |
| Schiff | airborne berry chewable tablets (63 pieces) | 63 | MISSING | Immune Support | HOLD-PANEL |
| Schiff | airborne berry chewable tablets (10 pieces) | 10 | MISSING | Immune Support | HOLD-PANEL |
| Schiff | airborne berry chewable tablets (50 pieces) | 50 | MISSING | Immune Support | HOLD-PANEL |
| Schiff | airborne berry chewable tablets (32 pieces) | 32 | MISSING | Immune Support | HOLD-PANEL |
| Schiff | airborne berry chewable tablets (64 pieces) | 64 | MISSING | Immune Support | HOLD-PANEL |
| Schiff | megared advanced 4in1 omega 3 adult gummies (40 pieces) | 40 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | megared advanced 4in1 omega 3 adult gummies (25 pieces) | 25 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | megared advanced 4in1 omega 3 adult gummies (80 pieces) | 80 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | megared advanced 4in1 omega 3 adult gummies (60 pieces) | 60 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | schiff glucosamine 2000mg hyaluronic 150ct (150 pieces) | 150 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | schiff glucosamine 2000mg hyaluronic 150ct (63 pieces) | 63 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | schiff glucosamine 2000mg hyaluronic 150ct (80 pieces) | 80 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | schiff glucosamine 2000mg hyaluronic 150ct (30 pieces) | 30 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | schiff glucosamine 2000mg hyaluronic 150ct (96 pieces) | 96 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | schiff glucosamine 2000mg hyaluronic 150ct (64 pieces) | 64 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | schiff glucosamine 1500mg msm hyaluronic 150ct (150 pieces) | 150 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | schiff glucosamine 1500mg msm hyaluronic 150ct (63 pieces) | 63 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | schiff glucosamine 1500mg msm hyaluronic 150ct (80 pieces) | 80 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | schiff glucosamine 1500mg msm hyaluronic 150ct (30 pieces) | 30 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | schiff glucosamine 1500mg msm hyaluronic 150ct (96 pieces) | 96 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | schiff glucosamine 1500mg msm hyaluronic 150ct (64 pieces) | 64 | MISSING | Vitamins | HOLD-PANEL |
| Schiff | airborne immune support effervescent tablets elderberry 20 ct (20 piec | 20 | MISSING | Immune Support | HOLD-PANEL |
| Schiff | airborne immune support effervescent tablets elderberry 20 ct (63 piec | 63 | MISSING | Immune Support | HOLD-PANEL |
| Schiff | airborne immune support effervescent tablets elderberry 20 ct (10 piec | 10 | MISSING | Immune Support | HOLD-PANEL |
| Schiff | airborne immune support effervescent tablets elderberry 20 ct (50 piec | 50 | MISSING | Immune Support | HOLD-PANEL |
| Schiff | airborne immune support effervescent tablets elderberry 20 ct (32 piec | 32 | MISSING | Immune Support | HOLD-PANEL |
| Schiff | airborne electrolyte replenisher immune support effercescent tablet wa | 63 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne electrolyte replenisher immune support effercescent tablet wa | 10 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne electrolyte replenisher immune support effercescent tablet wa | 50 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne electrolyte replenisher immune support effercescent tablet wa | 32 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne immune essentials effervescent tablet (63 pieces) | 63 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne immune essentials effervescent tablet (10 pieces) | 10 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne immune essentials effervescent tablet (50 pieces) | 50 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne immune essentials effervescent tablet (32 pieces) | 32 | FULL | Immune Support | HOLD-TOKEN |
| Schiff | airborne immune essentials effervescent tablet (30 pieces) | 30 | FULL | Immune Support | HOLD-TOKEN |
| Move Free | move free advanced tamaflex (30 pieces) | 30 | FULL | Vitamins | HOLD-TOKEN |
| Move Free | move free advanced tamaflex (80 pieces) | 80 | FULL | Vitamins | HOLD-TOKEN |
| Move Free | move free advanced tamaflex (120 pieces) | 120 | FULL | Vitamins | HOLD-TOKEN |
| Move Free | move free advanced tamaflex (90 pieces) | 90 | FULL | Vitamins | HOLD-TOKEN |
| Move Free | move free advanced msm glucosamine 120ct (30 pieces) | 30 | MISSING | Vitamins | HOLD-PANEL |
| Move Free | move free advanced msm glucosamine 120ct (80 pieces) | 80 | MISSING | Vitamins | HOLD-PANEL |
| Move Free | move free advanced msm glucosamine 120ct (90 pieces) | 90 | MISSING | Vitamins | HOLD-PANEL |
| Move Free | move free advanced plus msm and vitamin d3 80 ct joint health suppleme | 80 | MISSING | Vitamins | HOLD-PANEL |
| Move Free | move free advanced plus msm and vitamin d3 80 ct joint health suppleme | 30 | MISSING | Vitamins | HOLD-PANEL |
| Move Free | move free advanced plus msm and vitamin d3 80 ct joint health suppleme | 90 | MISSING | Vitamins | HOLD-PANEL |
| Move Free | move free ultra triple action typeiicollagen (30 pieces) | 30 | FULL | Vitamins | HOLD-TOKEN |
| Move Free | move free ultra triple action typeiicollagen (80 pieces) | 80 | FULL | Vitamins | HOLD-TOKEN |
| Move Free | move free ultra triple action typeiicollagen (120 pieces) | 120 | FULL | Vitamins | HOLD-TOKEN |
| Move Free | move free ultra triple action typeiicollagen (90 pieces) | 90 | FULL | Vitamins | HOLD-TOKEN |
| Move Free | neuriva brain memory 3d (30 pieces) | 30 | MISSING | Vitamins | HOLD-PANEL |
| Move Free | neuriva brain memory 3d (50 pieces) | 50 | MISSING | Vitamins | HOLD-PANEL |
| Move Free | move free ultra triple action typeiicollagen (30 pieces) | 30 | FULL | Vitamins | HOLD-TOKEN |
| Move Free | move free ultra triple action typeiicollagen (80 pieces) | 80 | FULL | Vitamins | HOLD-TOKEN |
| Move Free | move free ultra triple action typeiicollagen (120 pieces) | 120 | FULL | Vitamins | HOLD-TOKEN |
| Move Free | move free ultra triple action typeiicollagen (90 pieces) | 90 | FULL | Vitamins | HOLD-TOKEN |
| Move Free | move free advanced glucosamine (30 pieces) | 30 | MISSING | Vitamins | HOLD-PANEL |
| Move Free | move free advanced glucosamine (120 pieces) | 120 | MISSING | Vitamins | HOLD-PANEL |
| Move Free | move free advanced glucosamine (90 pieces) | 90 | MISSING | Vitamins | HOLD-PANEL |
| Move Free | move free advanced plus msm and vitamin d3 80 ct joint health suppleme | 80 | MISSING | Vitamins | HOLD-PANEL |
| Move Free | move free advanced plus msm and vitamin d3 80 ct joint health suppleme | 30 | MISSING | Vitamins | HOLD-PANEL |
| Move Free | move free advanced plus msm and vitamin d3 80 ct joint health suppleme | 90 | MISSING | Vitamins | HOLD-PANEL |
| Move Free | move free advanced msm glucosamine 120ct (30 pieces) | 30 | MISSING | Vitamins | HOLD-PANEL |
| Move Free | move free advanced msm glucosamine 120ct (80 pieces) | 80 | MISSING | Vitamins | HOLD-PANEL |
| Move Free | move free advanced msm glucosamine 120ct (90 pieces) | 90 | MISSING | Vitamins | HOLD-PANEL |
| Move Free | move free advanced tamaflex (30 pieces) | 30 | FULL | Vitamins | HOLD-TOKEN |
| Move Free | move free advanced tamaflex (80 pieces) | 80 | FULL | Vitamins | HOLD-TOKEN |
| Move Free | move free advanced tamaflex (120 pieces) | 120 | FULL | Vitamins | HOLD-TOKEN |
| Move Free | move free advanced tamaflex (90 pieces) | 90 | FULL | Vitamins | HOLD-TOKEN |
| Move Free | neuriva brain memory 3d (30 pieces) | 30 | MISSING | Vitamins | HOLD-PANEL |
| Move Free | neuriva brain memory 3d (50 pieces) | 50 | MISSING | Vitamins | HOLD-PANEL |
| Osteo Bi-Flex | Triple Strength |  | TRUNCATED | Vitamins | HOLD-PANEL |
| Osteo Bi-Flex | Triple Strength MSM |  | TRUNCATED | Vitamins | HOLD-PANEL |
| Osteo Bi-Flex | Triple Strength + Magnesium |  | TRUNCATED | Vitamins | HOLD-PANEL |
| Osteo Bi-Flex | Triple Strength Plus Turmeric |  | TRUNCATED | Vitamins | HOLD-PANEL |
| Osteo Bi-Flex | Triple Strength with Vitamin D |  | TRUNCATED | Vitamins | HOLD-PANEL |
| Osteo Bi-Flex | One Per Day |  | TRUNCATED | Vitamins | HOLD-PANEL |
| Osteo Bi-Flex | One Per Day Inflammatory Response |  | TRUNCATED | Vitamins | HOLD-PANEL |
| Osteo Bi-Flex | Regular Strength |  | TRUNCATED | Vitamins | HOLD-PANEL |
| Osteo Bi-Flex | Ease |  | TRUNCATED | Vitamins | HOLD-PANEL |
| Osteo Bi-Flex | Advanced Omega-3 Joint Complex |  | TRUNCATED | Vitamins | HOLD-PANEL |
| Caltrate | Caltrate |  | MISSING | Vitamins | HOLD-PANEL |
| Caltrate | Caltrate |  | MISSING | Vitamins | HOLD-PANEL |
| Caltrate | Caltrate |  | MISSING | Vitamins | HOLD-PANEL |
| Caltrate | Caltrate |  | MISSING | Vitamins | HOLD-PANEL |
| Caltrate | Caltrate |  | MISSING | Vitamins | HOLD-PANEL |
| Caltrate | Caltrate |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | NAD+ Trans-Resveratrol Multi Collagen, 60 Rapid Release Capsules | 60 | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Super Concentrated Echinacea, 2 fl oz (59 mL) Dropper Bottle | 2 | MISSING | Immune Support | HOLD-PANEL |
| Rainbow Light | Echinacea + Goldenseal, 2 fl oz (59 mL) Dropper Bottle | 2 | MISSING | Immune Support | HOLD-PANEL |
| Rainbow Light | CoQ10 200 mg, 30 Quick Release Softgels |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Melatonin 12 mg Natural Berry Flavor, 90 Fast Dissolve Tablets |  | MISSING | Sleep | HOLD-PANEL |
| Rainbow Light | Daily Fiber + Probiotic Powder Delicious Raspberry Lemon Flavor, 11 oz |  | MISSING | Digestive | HOLD-PANEL |
| Rainbow Light | NAD+ Advanced Gummies Delicious Peach Flavor, 60 Vegan Gummies |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | 10 Magnesium Complex, 90 Vegan Capsules |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | High Potency Vitamin D3 10,000 IU, 100 Quick Release Softgels |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | L-Methylfolate 15 mg + Methyl B12 & Saffron, 60 Vegan Capsules |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Lugol's Iodine (2%) Solution, 2 fl oz (59 mL) Liquid | 2 | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Women's One 50+ plus Real Food Nutrients, 120 Vegetarian Caplets | 120 | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Men's One 50+ plus Real Food Nutrients, 120 Vegetarian Caplets | 120 | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Prenatal One + Real Food Nutrients, 60 Vegan Caplets |  | MISSING | Prenatal | HOLD-PANEL |
| Rainbow Light | Counter Attack, 90 Vegan Caplets |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Nettle Leaf Liquid Extract Alcohol Free, 2 fl oz (59 mL) Liquid | 2 | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Magnesium Glycinate 325 mg, 120 Vegan Capsules |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Counter Attack, 30 Vegan Caplets |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Calcium Citrate Mini-Tablets + Real Food Nutrients, 120 Vegan Mini-Tab |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Men's One 50+ plus Real Food Nutrients, 150 Vegetarian Caplets | 150 | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Berberine Complex 1000 mg, 60 Vegan Capsules |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Pumpkin Seed Oil + Biotin & Saw Palmetto, 90 Softgels | 90 | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | NMN Complex, 60 Capsules | 60 | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Women's One 50+ plus Real Food Nutrients, 90 Vegetarian Caplets | 90 | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Daily Prebiotic + Probiotic Powder (Organic), 20 Billion CFU, 4.76 oz  |  | MISSING | Digestive | HOLD-PANEL |
| Rainbow Light | Vitamin D3 + K2 as MK-7, 2 fl oz (59 mL) Liquid | 2 | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Lion's Mane Mushroom Alcohol Free, 2 fl oz (59 mL) Liquid | 2 | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Magnesium Glycinate 250 mg, 60 Quick Release Softgels |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Beef Organs for Women, 120 Capsules | 120 | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | All-Zyme Double Strength, 90 Vegan Capsules |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Creatine + Multi Collagen Powder, 10 oz (285 g) Bottle |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Oil of Oregano + Black Seed Oil 8000 mg, 90 Softgels | 90 | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Liquid Chlorophyll 100 mg Natural Peppermint Flavor, 16 fl. oz. (473 m |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Pasture Raised Beef Organ Complex, 120 Capsules | 120 | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Magnesium Glycinate Gummies 100 mg Sour Grape Flavor, 60 Vegan Gummies |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Fulvic Acid Liquid Alcohol Free, 2 fl. oz. (59 mL) Liquid |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Colloidal Minerals Raspberry Flavor, 32 fl. oz (946 mL) Liquid |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Men's One 50+ plus Real Food Nutrients, 90 Vegetarian Caplets | 90 | TRUNCATED | Vitamins | HOLD-PANEL |
| Rainbow Light | High Potency Vitamin C Gummies Citrus Flavor, 60 Vegan Gummies |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Prenatal One + Real Food Nutrients, 150 Vegan Caplets |  | MISSING | Prenatal | HOLD-PANEL |
| Rainbow Light | Triple Strength Astaxanthin from Micoalgae 12 mg, 60 Quick Release Sof |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Algae-Derived Astaxanthin 10mg, 60 Softgels | 60 | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Baby Probiotic Drops 2.5 Billion CFU, .5 fl oz (15mL) Liquid | 5 | MISSING | Digestive | HOLD-PANEL |
| Rainbow Light | Himalayan Shilajit 2,000 mg, 60 Quick Release Capsules |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | 35+ Mom & Baby + Real Food Nutrients, 60 Caplets | 60 | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Ashwagandha KSM-66 600 mg with L-Theanine, 60 Vegan Caplets |  | FULL | Vitamins | HOLD-TOKEN |
| Rainbow Light | Valerian Root Liquid Herbal Extract Alcohol Free, 2 fl oz (59 mL) Liqu | 2 | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Saffron+ Magnesium Glycinate with B12, 90 Vegan Capsules |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Women's One + Real Food Nutrients, 120 Vegetarian Caplets | 120 | TRUNCATED | Vitamins | HOLD-PANEL |
| Rainbow Light | Ionic Magnesium Liquid, 4 fl oz (118 mL) Liquid | 4 | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Lithium Orotate, 5 mg, 120 Vegan Capsules |  | FULL | Vitamins | HOLD-TOKEN |
| Rainbow Light | Super Yohimbe Liquid Extract Alcohol Free, 2 fl oz (59 mL) Liquid | 2 | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Apple Cider Vinegar Gummies (Organic) Apple Flavor, 50 Vegan Gummies |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Active Health Teen with DermaComplex + Real Food Nutrients, 45 Vegan C |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Biotin Collagen + Hyaluronic Acid Vanilla Citrus Flavor, 2 fl oz (59 m | 2 | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Magnesium Glycinate Raspberry Lemonade Flavor, 5 oz (142 g) Powder |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Kid’s One Multi + Real Food Nutrients Fruit Punch, 90 Chewable Vegan T |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Active Health Teen with DermaComplex + Real Food Nutrients, 90 Vegan C |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Ashwagandha Gummies 500 mg Tropical Flavor, 60 Vegan Gummies |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Men's One + Real Food Nutrients, 150 Vegetarian Caplets | 150 | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Calcium Magnesium and Vegan D3 + Real Food Nutrients, 180 Vegan Caplet |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Kid’s One Multi + Real Food Nutrients Fruit Punch, 50 Chewable Vegan T |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Certified Women's + Real Food Nutrients Multi, 120 Vegetarian Capsules |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Beet Root Soft Chews Mixed Berry Flavor, 60 Soft Chews |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | L-Methylfolate 15 mg with Organic Glycerin Berry Flavor, 2 fl oz (59 m | 2 | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Prenatal One + Real Food Nutrients, 120 Vegan Caplets |  | MISSING | Prenatal | HOLD-PANEL |
| Rainbow Light | Oil of Oregano Extract, 2000 mg, 90 Softgels | 90 | FULL | Vitamins | HOLD-TOKEN |
| Rainbow Light | Men's One + Real Food Nutrients, 120 Vegetarian Caplets | 120 | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | 10 Mushroom Power Complex Gummies Blueberry Flavor, 60 Vegan Gummies |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Magnesium Glycinate + Ashwagandha, 120 Vegan Capsules |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Graviola (Soursop), 60 Capsules | 60 | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Mucuna Ashwagandha 3000mg, 200 Vegan Capsules |  | FULL | Vitamins | HOLD-TOKEN |
| Rainbow Light | Certified Men's Multivitamin, 120 Vegetarian Capsules |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Prenatal Daily Duo Multivitamin & DHA, 2 Bottles |  | MISSING | Prenatal | HOLD-PANEL |
| Rainbow Light | Probiolicious Probiotic Gummies Berry Flavor, 50 Vegan Gummies |  | MISSING | Digestive | HOLD-PANEL |
| Rainbow Light | Gummy Vitamin C Slices 250 mg Tangy Orange Flavor, 90 Vegan Gummies |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Prenatal DHA Ultra Omega-3 Fish Oil, 180 Softgels | 180 | MISSING | Prenatal | HOLD-PANEL |
| Rainbow Light | 10 Mushroom Power Complex, 60 Vegan Capsules |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Pumpkin Seed Oil Cold Pressed (Organic), 16 fl oz (473 mL) Liquid | 16 | MISSING | Cold & Flu | HOLD-PANEL |
| Rainbow Light | Men's One + Real Food Nutrients, 60 Vegetarian Caplets | 60 | TRUNCATED | Vitamins | HOLD-PANEL |
| Rainbow Light | Oil of Oregano Liquid Extract Alcohol Free (Organic), 2 fl oz (59 mL)  | 2 | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Dandelion Root Liquid Extract Alcohol Free, 2 fl oz (59 mL) Liquid | 2 | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Postnatal Multivitamin Superfood Blend & Probiotics, 120 Vegetarian Ca |  | MISSING | Digestive | HOLD-PANEL |
| Rainbow Light | Calcium Magnesium and Vegan D3 + Real Food Nutrients, 90 Vegan Caplets |  | MISSING | Vitamins | HOLD-PANEL |
| Rainbow Light | Prenatal DHA Ultra Omega-3 Fish Oil, 60 Softgels | 60 | MISSING | Prenatal | HOLD-PANEL |
| Citracal | Calcium Supplement Petites +D3 (200 coated caplets or gummies as label | 200 | MISSING | Vitamins | HOLD-PANEL |
| Citracal | Citracal Maximum Calcium Citrate (60 coated caplets or gummies as labe | 60 | MISSING | Vitamins | HOLD-PANEL |
| Citracal | Citracal Maximum Plus (120 coated caplets or gummies as labeled) | 120 | MISSING | Vitamins | HOLD-PANEL |
| Citracal | Citracal Maximum Plus (280 coated caplets or gummies as labeled) | 280 | MISSING | Vitamins | HOLD-PANEL |
| Citracal | Citracal Slow Release 1200 (80 coated caplets or gummies as labeled) | 80 | MISSING | Vitamins | HOLD-PANEL |
| Citracal | Citracal Petites (200 coated caplets or gummies as labeled) | 200 | MISSING | Vitamins | HOLD-PANEL |
| Citracal | Citracal Gummies (70 coated caplets or gummies as labeled) | 70 | MISSING | Vitamins | HOLD-PANEL |
| Citracal | Citracel Gummies (70 coated caplets or gummies as labeled) | 70 | MISSING | Vitamins | HOLD-PANEL |
| Citracal | Citracel Maximum Plus (180 coated caplets or gummies as labeled) | 180 | MISSING | Vitamins | HOLD-PANEL |
| Citracal | Citracal Petites Calcium Citrate (100 coated caplets or gummies as lab | 100 | MISSING | Vitamins | HOLD-PANEL |
| Citracal | Citracal Calcium Pearls (70 coated caplets or gummies as labeled) | 70 | MISSING | Vitamins | HOLD-PANEL |
| Slow Fe | Slow Fe Slow Release Iron (30 tablets) | 30 | FULL | Vitamins | HOLD-TOKEN |
