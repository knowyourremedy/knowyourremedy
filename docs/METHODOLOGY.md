# KnowYourRemedy — Clean Rating Methodology

**Status:** v1.3 working draft
**Scope:** OTC medicines, supplements, and natural remedies
**Pending:** attorney review (public "Avoid" labeling + the documented basis behind each high-risk flag)

**Changed in v1.3:** added active-ingredient safety (a documented safety harm in the active can cap the verdict, separate from efficacy, which stays out of scope); added the verdict-cap mechanic; added dose/frequency sensitivity (cumulative vs concurrent harms); added the primary-source standard and the regulator asymmetry; added colloidal silver as the worked example.

---

## 1. What this is

The documented, consistent rule set that turns any product's ingredient label into a cleanliness rating. The same engine powers the Clean Picks content today and the barcode scanner later. Our entire "no agenda" promise rests on this being transparent, evidence-anchored, and applied identically to every product — including the ones we'd tell you to avoid.

## 2. What we rate — and what we don't

We rate the **inactive ingredients** (excipients, fillers, dyes, preservatives, sweeteners), the **form**, and **sourcing**.

We do **not** judge the active drug's medical merit, and we do **not** judge efficacy — whether a remedy *works* is out of scope. "Dye-free acetaminophen is the cleaner acetaminophen" — never "don't take acetaminophen," and never "this homeopathic remedy works." The active ingredient is listed neutrally.

**Active-ingredient safety (in scope).** A documented *safety harm* in the active ingredient is a different thing from efficacy, and it **is** in scope. A product can have spotless inactives and still warrant a flag if its active carries a citable harm from normal, as-directed use. The boundary that keeps this from swallowing every drug: we flag harm from using the product *as intended*, not the ordinary dose-ceiling cautions of standard drugs used as directed (acetaminophen's liver limit at label dose is standard-of-care, not a flag). The test is "documented harm from as-directed use," never "any risk if misused."

**Wording rule (legal):** flags state facts, never danger. "Contains propylene glycol; clean brands exclude it; here's the cleaner pick" — never "unsafe." (When Genexa implied PG-containing products were unsafe, the National Advertising Division ruled against them: you may underscore your own product's benefits, but not state or imply a competitor's product is dangerous.)

## 3. The output

Three tiers, each shown with its plain-language reasons. No 0–100 score — a number implies a precision we can't defend ingredient by ingredient, and invites "why 72 not 75" arguments. The badge is the glance; the per-ingredient breakdown on click is the proof.

- **Clean** — no flagged additives.
- **Caution** — minor compromises; cleaner options usually exist. Always links to the Clean alternative in the same category.
- **Avoid** — contains a disqualifying additive, or enough minor ones to stack up.

## 4. The scoring rule

Every inactive ingredient sorts into one of four risk levels. The rating is decided two ways at once — the worst additive present, and how many accumulate. Internally it's a simple demerit count (never shown to the user):

| Risk level | Demerit |
|---|---|
| Cleared / risk-free | 0 |
| Limited-risk | 1 point |
| Moderate-risk | 2 points |
| High-risk | automatic Avoid |

- **Any single high-risk additive → Avoid**, regardless of anything else.
- **3+ demerit points → Avoid** (e.g., three limited-risk, or one moderate + one limited).
- **1–2 points → Caution.**
- **0 points → Clean.**

**What qualifies as high-risk.** An additive lands in high when there is **strong evidence of a real harm mechanism** — carcinogenicity, genotoxicity, endocrine disruption, or organ / developmental / neurotoxicity. A regulatory ban or formal carcinogen classification (IARC / NTP) is *sufficient* evidence, but it is **not required**: robust independent science qualifies an additive for high even if the FDA still permits it. We do not treat "legal" or "GRAS" as a baseline for leniency — US regulators permit plenty that shouldn't be. What keeps an ingredient *out* of high is **weak or contested evidence**, never the mere fact that it's allowed.

**Active-ingredient safety — the verdict cap.** Active-safety does not score additive points. It acts as a cap on the verdict, applied alongside the additive count, and the final verdict is the **worse** of the two. So a product with spotless additives (0 points → Clean) but a harmful active is capped down:
- A **manageable or dose-dependent** active harm caps the product at **Caution** (with a mandatory honest note explaining it).
- A **severe, irreversible, or no-safe-threshold** active harm with no offsetting benefit caps it at **Avoid**.

**Dose / frequency sensitivity.** Some harms scale with dose or frequency. Where they do, the verdict reflects realistic use of the product *as sold and marketed* — not the most careful user — and the honest note carries the gradient. Two kinds, handled differently:
- **Cumulative** harms build with total/repeated exposure (e.g., silver → argyria). Genuinely lower with infrequent use; this can justify Caution rather than Avoid, and the note says so.
- **Concurrent / acute** harms fire on a single co-administration (e.g., a drug interaction). **Not** reduced by infrequency — they apply to any single use and hold regardless.

**Context scoping.** A few flags depend on the product form, because the concern only applies to one route:
- Propylene glycol — flagged in **oral/ingested** products.
- Seed / industrial oils — flagged in **gummies**.
- Xylitol / erythritol — flagged in **oral/ingested** products; cleared in topical and nasal (where xylitol is beneficial, not a concern).

**Source standard.** Every flag — additive or active-safety — must carry at least one citable source, shown in the breakdown. Prefer **primary, independent** sources: regulatory classifications, IARC / NTP, EFSA, peer-reviewed studies, NCCIH. The **regulator asymmetry**: a regulator *acting against* a product (ban, warning, refusal to recognize as safe) is a usable harm signal; a regulator *permitting or approving* it is never evidence of safety. No single source — least of all "it's approved" — carries a verdict alone.

## 5. Additive classification table (v1.3)

Anchored to published regulatory and scientific findings. Living document — grows as we rate more products.

### High-risk — any one = Avoid

| Additive | Also appears as | Why high-risk |
|---|---|---|
| Titanium dioxide | E171, "color added" | EU banned as a food additive (2022) after EFSA could not rule out genotoxicity. Still GRAS in the US. |
| Synthetic dyes | FD&C / D&C colors, aluminum lakes | FDA revoked Red No. 3 for food + ingested drugs (Jan 2025; rat carcinogenicity, Delaney Clause; drug deadline Jan 2028). Red 40, Yellow 5/6, Blue 1/2, Green 3 carry EU hyperactivity warning labels (Southampton study) and face state-level bans. |
| Parabens | methyl-, propyl-, butyl-, isobutylparaben | EU banned propylparaben in food (2006); butyl-/isobutylparaben are EU-designated endocrine disruptors. |
| BHA | butylated hydroxyanisole, E320 | Listed by the US National Toxicology Program as "reasonably anticipated to be a human carcinogen"; California Prop 65 listed. |
| BHT | butylated hydroxytoluene, E321 | EU-restricted (2022) specifically for endocrine disruption — a documented harm mechanism, even without a US ban or carcinogen listing. |
| Aspartame | E951, NutraSweet | IARC "possibly carcinogenic to humans" (Group 2B, 2023) — the only sweetener with a current formal carcinogen classification. |
| Seed / industrial oils (gummies) | soybean, canola, "vegetable oil" | Clean-standard exclusion for gummy formulations. |

### Moderate-risk — 2 points each

| Additive | Also appears as | Why moderate-risk |
|---|---|---|
| Propylene glycol (oral) | PG, E1520 | Excluded by clean brands (Genexa lists it on its "never" list) and a marker of conventional products — but the direct evidence of harm is thin, so it weights hard without auto-sinking to Avoid on its own. |
| Sucralose | E955, Splenda | Metabolite/heat form sucralose-6-acetate found genotoxic (DNA-damaging) in a 2023 study; gut-microbiome concerns. Single emerging study — moves up if the evidence hardens. |
| Acesulfame potassium | Ace-K, E950 | Emerging genotoxicity and microbiome signals; thin evidence. |
| Saccharin | E954 | Historical rat bladder-cancer findings, but NTP delisted it (2000) and IARC reclassified it Group 3 / "not classifiable" (1999) — the mechanism was shown not to operate in humans. |
| PEGs | polyethylene glycol 400 / 3350 | Risk of ethylene-oxide / 1,4-dioxane contamination; penetration enhancer. |
| Polysorbate 80 | E433 | Emulsifier with emerging gut-barrier / inflammation signals. |

### Limited-risk — 1 point each

| Additive | Also appears as | Why limited-risk |
|---|---|---|
| Xylitol, erythritol (oral) | — | Sugar alcohols; GI effects at volume, and many clean shoppers avoid them. *Oral/ingested only — cleared in topical and nasal.* |
| Other sugar alcohols | sorbitol, maltitol, mannitol | GI effects at volume; otherwise low concern. |
| Synthetic preservatives | sodium benzoate, potassium sorbate | Generally low risk; benzoate can form trace benzene with vitamin C. |
| "Natural flavors" | natural flavoring | Undisclosed proprietary mixtures — opacity, not a known hazard. |
| Carrageenan | E407 | Contested GI-inflammation debate. |
| Artificial flavors | artificial flavoring | Synthetic; little documented hazard but not "clean." |
| Non-organic maltodextrin | — | Glycemic; minor. |

### Cleared — no demerit

| Additive | Notes |
|---|---|
| Cane sugar, glucose syrup, tapioca syrup / dextrose | Acceptable sweeteners under our standard. |
| Microcrystalline cellulose, croscarmellose sodium | Standard inert disintegrants. |
| Magnesium stearate, stearic acid, silicon dioxide | Standard flow / anticaking agents. |
| Organic agave, organic flavors / colors | Whole-food-derived. |
| Sodium chloride, sodium bicarbonate | Saline bases. |
| Xylitol, erythritol (topical / nasal) | Beneficial in nasal sprays; not a concern by this route. |
| Citric acid, ascorbic acid (vitamin C) | — |
| Lactose, gelatin, carnauba wax, beeswax, purified water | — |

## 6. Posture

- **Harm-first, not regulator-first.** Severity tracks evidence of harm to the body, not whether the FDA got around to banning something. Legality is not a clean bill of health.
- **Evidence-anchored, not maximally strict.** A defensible standard applied identically to everything is what makes us credible — and defensible if challenged. Stricter shoppers are served by full flag transparency now, and a personal strictness setting in the scanner later (e.g., "treat sucralose as an automatic Avoid for me").
- **Brand vs. rating system.** A clean brand can set a zero-tolerance formulation rule for its own products; we're a rating system passing public judgment on everyone's, so each verdict has to be defensible on its own evidence. We honor the clean-brand signal by weighting an additive, not by auto-failing on it without backing.
- **Give every option a fair, honest hearing.** Conventional, natural, and homeopathic products are rated the same way. Cleanliness is judged on ingredients; we never make or imply an efficacy claim. Where the basis is traditional use, say so and cite it (Carlston for homeopathy, Worwood for oils); where clinical evidence exists, cite it and label its strength honestly. The honest broker — not the dismissive regulator, not the hype site.

## 7. Calibration log

- High-tier bar is **harm-evidence**, not regulatory status — a ban/classification is sufficient, not required.
- Propylene glycol → **moderate** (oral-scoped) — direct harm evidence is thin.
- Aspartame → **high** (IARC 2B). Other sweeteners (sucralose, ace-K, saccharin) → moderate.
- BHA and BHT → **high** (BHA: NTP carcinogen listing; BHT: documented endocrine disruption).
- Xylitol / erythritol → **limited** in oral/ingested; cleared in topical/nasal (keeps Xlear and Beekeeper's at Clean).
- **Active-ingredient safety** added as a verdict cap (separate from additive points; final verdict is the worse of the two).
- **Dose/frequency** added: cumulative harms can justify Caution over Avoid; concurrent harms (interactions) hold regardless of frequency.
- **Source asymmetry**: regulator action against a product = usable harm signal; regulator approval ≠ evidence of safety. Primary/independent sources preferred.

**Worked example — colloidal silver.** Additives are typically just silver + water → 0 demerit points → Clean on additives alone. But the active carries documented harm: argyria (permanent bluish-gray discoloration; cumulative; no established safe level), plus concurrent interactions impairing absorption of certain antibiotics and thyroid medication. Sources: NCCIH, Mayo Clinic, peer-reviewed argyria case reports (FDA enforcement as corroboration only — not the basis).
**Verdict: Caution** (active-safety cap), with a mandatory honest note covering the cumulative argyria risk, the absence of a safe threshold, and the antibiotic/thyroid interactions. Rationale for Caution over Avoid: argyria is dose-cumulative (infrequent use is materially lower-risk) and primarily cosmetic. *To set it at Avoid instead, raise the cap on the "Verdict:" line above to Avoid — the pull toward Avoid is the no-safe-threshold, irreversible staining, and the concurrent interactions that frequency doesn't soften.* This is the canonical case the active-safety rule exists for.