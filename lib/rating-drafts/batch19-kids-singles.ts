// DRAFT / not verified / batch 19 kids singles / founder locked /
// kids+minAge / MCT liquid ≠ gummy High / canola lecithin ≠ canola oil
// High / one formulaId for L'il Critters Immune C+D / methodology
// untouched.
//
// Kids vitamin singles only (D3, C, omega / fish oil). No kids multis
// (already batch 17). Vitamins · audience 'kids' · minAge on every row ·
// recordStatus is 'unverified' on every row. Founder calls (locked): see
// notes below. Methodology v1.6 grades only — do not change locked
// ingredient grades.
// Barcodes omitted except KYR5-b catch-up allowlist. Pack sizes share formulaId.
// Form is labeled on cleanAlternatives, not a hard filter (§6).
// Not wired into Clean Picks UI. No live Clean Picks file is edited from
// this draft. Methodology.md / PROJECT_NOTES.md are untouched.
//
// LIQUID / SOFTGEL FILL OILS (LOCKED): MCT (from coconut) as a D3 drop
// carrier, and fish oil / cod liver oil as a liquid omega fill, are NOT
// the gummy seed/industrial-oil High rule. Do not Avoid KD1 or KO2 for
// the carrier oil.
//
// CANOLA LECITHIN (LOCKED): canola lecithin is an emulsifier, NOT bulk
// canola oil. Do NOT apply gummy High for lecithin alone (KO3).
//
// L'IL CRITTERS IMMUNE C + D (LOCKED): one formulaId
// `lil-critters-immune-c-zinc-d-gummies-palm` covers the C + D + zinc
// single. Do not write a second grade for the same SKU.
//
// FOUNDER CALLS (LOCKED) — approved rows only:
// CLEAN
// - KD1 Carlson Kid's Super Daily D3 drops = Clean if inactives are only
//   MCT oil (from coconut). minAge 1. Cite Carlson / IngredientList.
//   Liquid fill ≠ gummy High.
// AVOID
// - KD2/KC1 L'il Critters Immune C Plus Zinc & Vitamin D gummies = Avoid.
//   Blend of oils (coconut and/or palm). minAge 2. Cite Giant. One row
//   only — do not duplicate as two grades.
// - KO1 Nordic Naturals Children's DHA Gummy Chews = Avoid. Canola oil +
//   natural flavor. minAge 2 (brand 2–6 / 2+; confirm carton). Cite
//   Instacart.
// CAUTION
// - KC2 Carlson Kid's Vitamin C Gummies = Caution. Natural flavors +
//   annatto; no palm / canola / sunflower on IngredientList (glucose
//   syrup, sugar, water, pectin, sodium citrate, natural flavors,
//   annatto). minAge 4.
// - KO2 Nordic Naturals Children's DHA liquid (strawberry) = Caution.
//   Natural flavor (+ tocopherol / rosemary Cleared-class). Not gummy
//   oil rule. minAge 1. Cite iHerb / brand.
// - KO3 L'il Critters Omega-3 DHA gummies = Caution. Natural flavors +
//   canola lecithin only — lecithin is NOT bulk canola oil; do NOT use
//   gummy High. Cite Giant / HelloPharmacist. minAge 2.
//
// TALLY (unverified drafts): 6 rows — Clean 1 / Caution 3 / Avoid 2.
// Independently Clean in THIS batch: Carlson Kid's Super Daily D3 drops
// only. cleanAlternatives omitted on every Caution / Avoid row — no
// Clean same-active C or omega swap exists in this set; D3 drops are a
// weak / different-actives swap for the C+D+zinc combo and are not a
// Clean omega. Do not point Caution Nordic DHA liquid as a Clean swap.
//
// SKIPPED (founder skip — do not invent / do not write):
// - MaryRuth Kids C (oil unconfirmed)
// - MaryRuth Kids Vegan Omega (flax unconfirmed)
// - Carlson Kids DHA softgels (shelf / shell unconfirmed)
// - Invented coconut-only D3 / C gummies
// - Unmatched store palm gummies without a specific cite
// - Unmatched liquids
// - Kids multis (batch 17)
// - Protein powder, Amazon-only
//
// ZINC IS PARKED (Methodology v1.6): never invent an active-safety grade.
// Grade inactives only. The Immune C + Zinc SKU honestNote says zinc is
// parked. Silicon dioxide / silica = Caution cap, not Avoid alone.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const VITAMINS = 'Vitamins';
const KIDS = 'kids' as const;
const VITAMIN = 'Vitamin' as const;
const SUPPLEMENT = 'Supplement' as const;

const METH = {
  seedOilGummies:
    'Methodology §5 High-tier (seed/industrial oils in gummies — soybean, canola, palm, "vegetable oil", sunflower)',
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  xylitol: 'Methodology §5 Limited-risk (xylitol, oral)',
  sorbitol: 'Methodology §5 Limited-risk (sugar alcohols — sorbitol)',
  annatto:
    'Methodology §5 Caution (annatto — allergenic; standalone Caution, not additive-scored, not Avoid)',
  gums: 'Methodology §5 Cleared (xanthan gum / gum arabic / guar / pectin / acacia — locked v1.6)',
  tocopherols:
    'Methodology §5 Cleared (mixed tocopherols / ascorbyl palmitate as antioxidants — locked v1.6)',
  canolaLecithin:
    'Methodology §5 Cleared (lecithin — canola lecithin is an emulsifier, NOT bulk canola oil; do NOT apply the gummy seed/industrial-oil High rule for lecithin alone)',
  stevia:
    'Methodology §5 Cleared (stevia / steviol glycosides, high-purity extract — locked v1.6)',
  turmericColor:
    'Methodology §5 Cleared (turmeric / curcumin as a color only — locked v1.6)',
  liquidMct:
    'Methodology §5 — MCT oil (from coconut) as a LIQUID D3 drop carrier is NOT the gummy seed/industrial-oil High rule',
  rosemary:
    'Methodology §5 Cleared-class (rosemary extract as antioxidant / preservative — founder Cleared-class on this liquid; not a new High lock)',
  cleared: 'Methodology §5 Cleared',
} as const;

function flag(
  name: string,
  riskLevel: IngredientFlag['riskLevel'],
  source: string,
): IngredientFlag {
  return { name, riskLevel, source };
}

function labelCite(label: string, meth: string): string {
  return `${label}; ${meth}`;
}

function labelCleared(label: string, name: string): IngredientFlag {
  return flag(name, 'cleared', labelCite(label, METH.cleared));
}

const ZINC_PARKED =
  'Zinc (oxide / citrate / gluconate / sulfate / other labeled zinc salts) is parked as of Methodology v1.6 — active-safety-cap review is not done. This draft grades inactives only and does not invent an active-safety grade for zinc.';

const NO_CLEAN_SAME_ACTIVE =
  'No independently Clean same-active swap exists in this draft set (only Clean is Carlson Kid\'s Super Daily D3 drops) — cleanAlternatives omitted (honest empty; do not point at Caution Nordic DHA liquid as Clean, and do not invent a same-active C / omega Clean).';

const CARLSON_D3_CITE =
  "Carlson Kid's Super Daily D3 drops Carlson / IngredientList other-ingredients (medium chain triglyceride oil (from coconut) only)";
const LIL_IMMUNE_C_CITE =
  "L'il Critters Immune C Plus Zinc & Vitamin D gummies Giant other-ingredients (glucose syrup, sugar, water, gelatin; less than 2% blend of oils (coconut and/or palm) with beeswax and/or carnauba wax, citric acid, colors (annatto extract, purple carrot juice concentrate, turmeric), lactic acid, natural flavors, pectin)";
const NORDIC_DHA_GUMMY_CITE =
  "Nordic Naturals Children's DHA Gummy Chews (tropical punch) Instacart other-ingredients (purified deep sea fish oil (from anchovies and sardines), xylitol, purified water, sorbitol, gelatin, sodium citrate, malic acid, natural flavor, paprika extract (for color), stevia, canola oil)";
const CARLSON_C_CITE =
  "Carlson Kid's Vitamin C Gummies IngredientList / brand other-ingredients (glucose syrup, sugar, water, pectin, sodium citrate, natural flavors, annatto (for color) — no palm / canola / sunflower)";
const NORDIC_DHA_LIQUID_CITE =
  "Nordic Naturals Children's DHA liquid (strawberry) iHerb / brand other-ingredients (purified arctic cod liver oil, natural flavor, RRR-alpha tocopherol (antioxidant), rosemary extract (a natural preservative))";
const LIL_OMEGA_CITE =
  "L'il Critters Omega-3 DHA gummies Giant / HelloPharmacist other-ingredients (glucose syrup, sugar, water, gelatin; less than 2% canola lecithin, citric acid, colors (blueberry and carrot concentrates, purple carrot juice concentrate, turmeric), fumaric acid, lactic acid, natural flavors)";

// KYR5-b in-store 3s brands — Immune C 190-ct coconut-and/or-palm
// (iHerb LIL-01945 / Giant / Cub UPC). Do not steal soy-lecithin Omega-3.
const BATCH19_CATCHUP_BARCODES: Record<string, string> = {
  'lil-critters-immune-c-zinc-d-gummies-palm': '027917019451',
  // KYR5-b in-store 1s/2s — PureFormulas Tropical Punch gummy chews
  // with canola last (do not steal a later no-canola carton).
  'nordic-naturals-childrens-dha-gummies-canola': '768990017094',
};

export const BATCH19_KIDS_SINGLES: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  {
    id: 'carlson-kids-super-daily-d3-drops',
    productName: "Carlson Kid's Super Daily D3 Drops",
    brand: 'Carlson',
    category: VITAMINS,
    formulaId: 'carlson-kids-super-daily-d3-drops',
    audience: KIDS,
    minAge: 1,
    form: 'liquid drops',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      {
        name: 'Vitamin D3 (cholecalciferol)',
        strength: '15mcg (600 IU) per drop (400 IU twin shares formulaId when MCT-from-coconut inactives match)',
      },
    ],
    inactiveIngredients: [
      flag(
        'Medium chain triglyceride oil (from coconut)',
        'cleared',
        labelCite(CARLSON_D3_CITE, METH.liquidMct),
      ),
    ],
    verdict: 'clean',
    honestNote:
      "FOUNDER CALL: Carlson Kid's Super Daily D3 drops = Clean if inactives are only MCT oil (from coconut). Carlson / IngredientList other-ingredients: medium chain triglyceride oil (from coconut). Liquid / drop MCT fill is NOT the gummy seed/industrial-oil High rule — do not Avoid this bottle for the carrier oil. 90-drop and 365-drop packs share this formulaId when the list holds. 400 IU and 600 IU kids Super Daily D3 share this formulaId ONLY when the other-ingredients line is still MCT from coconut (strength differs in active amount only). Older snapshots that list MCT oil (coconut and palm source) are a different formula — not this Clean row; do not invent a coconut-and-palm Clean. Kid's Super Daily D3 + K2 is a different product (not this row). Confirm the carton. No DailyMed drug SPL (dietary supplement). Ages 1+: one drop daily as labeled. Contains coconut (MCT source) — confirm the allergen line.",
    retailers: ['Vitamin shops', 'iHerb', 'Grocery'],
    sourcesGeneral: [
      `${CARLSON_D3_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },

  // ── Caution ──────────────────────────────────────────────
  {
    id: 'carlson-kids-vitamin-c-gummies',
    productName: "Carlson Kid's Vitamin C Gummies",
    brand: 'Carlson',
    category: VITAMINS,
    barcode: '088395490309',
    formulaId: 'carlson-kids-vitamin-c-gummies',
    audience: KIDS,
    minAge: 4,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Vitamin C (ascorbic acid)', strength: '125mg per gummy' },
    ],
    inactiveIngredients: [
      flag('Natural flavors', 'limited', labelCite(CARLSON_C_CITE, METH.flavors)),
      flag('Annatto (for color)', 'cleared', labelCite(CARLSON_C_CITE, METH.annatto)),
      labelCleared(CARLSON_C_CITE, 'Glucose syrup'),
      labelCleared(CARLSON_C_CITE, 'Sugar'),
      labelCleared(CARLSON_C_CITE, 'Water'),
      flag('Pectin', 'cleared', labelCite(CARLSON_C_CITE, METH.gums)),
      labelCleared(CARLSON_C_CITE, 'Sodium citrate'),
    ],
    verdict: 'caution',
    honestNote:
      "FOUNDER CALL: Carlson Kid's Vitamin C Gummies = Caution. Drivers are natural flavors (Limited) + annatto (standalone Caution, not Avoid, not additive-scored). IngredientList / brand other-ingredients: glucose syrup, sugar, water, pectin, sodium citrate, natural flavors, annatto (for color). That list has NO palm / canola / sunflower / vegetable oil — do not invent a seed-oil Avoid on this formulaId. Do not invent a coconut-only Clean / Caution twin. MaryRuth Kids C skipped (oil unconfirmed). Confirm the carton. No DailyMed drug SPL. Ages 4+: one gummy daily at mealtime as labeled. " +
      NO_CLEAN_SAME_ACTIVE,
    retailers: ['Vitamin shops', 'iHerb', 'Grocery'],
    sourcesGeneral: [
      `${CARLSON_C_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'nordic-naturals-childrens-dha-liquid',
    productName: "Nordic Naturals Children's DHA Liquid (strawberry)",
    brand: 'Nordic Naturals',
    category: VITAMINS,
    barcode: '768990567803 768990027239',
    formulaId: 'nordic-naturals-childrens-dha-liquid',
    audience: KIDS,
    minAge: 1,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Purified arctic cod liver oil', strength: '½ teaspoon (~2.5mL) label serving' },
      { name: 'Omega-3 fatty acids (DHA + EPA)', strength: '530mg (255mg DHA + 170mg EPA typical iHerb strawberry liquid)' },
    ],
    inactiveIngredients: [
      flag('Natural flavor', 'limited', labelCite(NORDIC_DHA_LIQUID_CITE, METH.flavors)),
      flag(
        'RRR-alpha tocopherol (antioxidant)',
        'cleared',
        labelCite(NORDIC_DHA_LIQUID_CITE, METH.tocopherols),
      ),
      flag(
        'Rosemary extract (a natural preservative)',
        'cleared',
        labelCite(NORDIC_DHA_LIQUID_CITE, METH.rosemary),
      ),
    ],
    verdict: 'caution',
    honestNote:
      "FOUNDER CALL: Nordic Naturals Children's DHA liquid (strawberry) = Caution. Driver is natural flavor (Limited). iHerb / brand other-ingredients: purified arctic cod liver oil, natural flavor, RRR-alpha tocopherol (antioxidant), rosemary extract (a natural preservative). Tocopherol and rosemary are Cleared-class on this founder call. Liquid fish-oil / cod-liver-oil fill is NOT the gummy seed-oil High rule — do not Avoid this bottle for the oil. Some cartons say “natural strawberry flavor”; that is the same Limited flavor class. Chewable Children's DHA softgels are a different formula (not this row; Carlson Kids DHA softgels skipped — shelf / shell unconfirmed). This Caution liquid is NOT a Clean swap for the canola DHA gummy. Confirm the carton. Contains fish. No DailyMed drug SPL. Ages 1+: ½ teaspoon daily with food as labeled. " +
      NO_CLEAN_SAME_ACTIVE,
    retailers: ['Vitamin shops', 'iHerb', 'Target', 'Grocery'],
    sourcesGeneral: [
      `${NORDIC_DHA_LIQUID_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'lil-critters-omega3-gummies-lecithin',
    productName: "L'il Critters Omega-3 DHA Gummies",
    brand: "L'il Critters",
    category: VITAMINS,
    formulaId: 'lil-critters-omega3-gummies-lecithin',
    audience: KIDS,
    minAge: 2,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Omega-3 fatty acids (EPA / DHA + ALA)', strength: '50mg per gummy (100mg per 2-gummy ages-4+ serving when labeled)' },
      { name: 'Vitamin C / E (antioxidant amounts when labeled)', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag('Natural flavors', 'limited', labelCite(LIL_OMEGA_CITE, METH.flavors)),
      flag('Canola lecithin', 'cleared', labelCite(LIL_OMEGA_CITE, METH.canolaLecithin)),
      labelCleared(LIL_OMEGA_CITE, 'Glucose syrup'),
      labelCleared(LIL_OMEGA_CITE, 'Sugar'),
      labelCleared(LIL_OMEGA_CITE, 'Water'),
      labelCleared(LIL_OMEGA_CITE, 'Gelatin'),
      labelCleared(LIL_OMEGA_CITE, 'Citric acid'),
      labelCleared(
        LIL_OMEGA_CITE,
        'Colors (blueberry and carrot concentrates, purple carrot juice concentrate)',
      ),
      flag('Turmeric (color)', 'cleared', labelCite(LIL_OMEGA_CITE, METH.turmericColor)),
      labelCleared(LIL_OMEGA_CITE, 'Fumaric acid'),
      labelCleared(LIL_OMEGA_CITE, 'Lactic acid'),
    ],
    verdict: 'caution',
    honestNote:
      "FOUNDER CALL: L'il Critters Omega-3 DHA gummies = Caution. Drivers are natural flavors (Limited). Giant / HelloPharmacist other-ingredients: glucose syrup, sugar, water, gelatin; less than 2% canola lecithin, citric acid, colors (blueberry and carrot concentrates, purple carrot juice concentrate, turmeric), fumaric acid, lactic acid, natural flavors. Canola lecithin is an emulsifier — it is NOT bulk canola oil and is NOT the gummy seed-oil High rule; do not Avoid this formulaId for lecithin alone. No palm / canola oil / sunflower / vegetable oil on that matched list. Older soy-lecithin Gummy Fish twins are a different formula (not this row) — confirm the carton says canola lecithin. Contains fish (anchovy and/or sardine with mackerel and/or herring). No DailyMed drug SPL. Ages 2–3: 1 gummy; 4+: 2 gummies as labeled. Not recommended under 2 (choking). " +
      NO_CLEAN_SAME_ACTIVE,
    retailers: ['Giant', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      `${LIL_OMEGA_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },

  // ── Avoid ────────────────────────────────────────────────
  {
    id: 'lil-critters-immune-c-zinc-d-gummies-palm',
    productName: "L'il Critters Immune C Plus Zinc & Vitamin D Gummies",
    brand: "L'il Critters",
    category: VITAMINS,
    barcode: BATCH19_CATCHUP_BARCODES['lil-critters-immune-c-zinc-d-gummies-palm'],
    formulaId: 'lil-critters-immune-c-zinc-d-gummies-palm',
    audience: KIDS,
    minAge: 2,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      {
        name: 'Vitamin C (as ascorbic acid and sodium ascorbate)',
        strength: '60mg per gummy (120mg per 2-gummy ages-4+ serving)',
      },
      { name: 'Vitamin D (as cholecalciferol)', strength: '5mcg (200 IU) per gummy (10mcg / 400 IU per 2-gummy serving)' },
      { name: 'Zinc (as zinc gluconate)', strength: '1.2mg per gummy (2.3mg per 2-gummy serving)' },
    ],
    inactiveIngredients: [
      flag(
        'Blend of oils (coconut and/or palm)',
        'high',
        labelCite(LIL_IMMUNE_C_CITE, METH.seedOilGummies),
      ),
      flag('Natural flavors', 'limited', labelCite(LIL_IMMUNE_C_CITE, METH.flavors)),
      flag('Annatto extract (color)', 'cleared', labelCite(LIL_IMMUNE_C_CITE, METH.annatto)),
      labelCleared(LIL_IMMUNE_C_CITE, 'Glucose syrup'),
      labelCleared(LIL_IMMUNE_C_CITE, 'Sugar'),
      labelCleared(LIL_IMMUNE_C_CITE, 'Water'),
      labelCleared(LIL_IMMUNE_C_CITE, 'Gelatin'),
      labelCleared(LIL_IMMUNE_C_CITE, 'Beeswax and/or carnauba wax'),
      labelCleared(LIL_IMMUNE_C_CITE, 'Citric acid'),
      labelCleared(LIL_IMMUNE_C_CITE, 'Purple carrot juice concentrate (color)'),
      flag('Turmeric (color)', 'cleared', labelCite(LIL_IMMUNE_C_CITE, METH.turmericColor)),
      labelCleared(LIL_IMMUNE_C_CITE, 'Lactic acid'),
      flag('Pectin', 'cleared', labelCite(LIL_IMMUNE_C_CITE, METH.gums)),
    ],
    verdict: 'avoid',
    honestNote:
      "FOUNDER CALL: L'il Critters Immune C Plus Zinc & Vitamin D gummies = Avoid. Giant other-ingredients list blend of oils (coconut and/or palm) with beeswax and/or carnauba wax + natural flavors. Palm on that and/or line is the gummy seed/industrial-oil High rule. This is NOT a coconut-only Caution — coconut on the same and/or line does not clear the palm High. One formulaId for this C + D + zinc SKU — do not write a second C or D grade for the same carton. Natural flavors are Limited (not needed to reach Avoid). Annatto as color is a standalone Caution note only on this already-Avoid palm row. Do not invent a coconut-only Clean / Caution twin. Carlson Super Daily D3 drops are the only in-batch Clean and are a weak / different-actives swap (D3-only vs C+D+zinc) — cleanAlternatives omitted. Contains coconut (tree nut). No DailyMed drug SPL. Ages 2–3: 1 gummy; 4+: 2 gummies as labeled. Not recommended under 2 (choking). " +
      ZINC_PARKED +
      ' ' +
      NO_CLEAN_SAME_ACTIVE,
    retailers: ['Giant', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      `${LIL_IMMUNE_C_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'nordic-naturals-childrens-dha-gummies-canola',
    productName: "Nordic Naturals Children's DHA Gummy Chews",
    brand: 'Nordic Naturals',
    category: VITAMINS,
    barcode: BATCH19_CATCHUP_BARCODES['nordic-naturals-childrens-dha-gummies-canola'],
    formulaId: 'nordic-naturals-childrens-dha-gummies-canola',
    audience: KIDS,
    minAge: 2,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Omega-3 fatty acids (from purified deep sea fish oil)',
        strength: '600mg per gummy (typical tropical punch; ~355mg DHA + ~145mg EPA)',
      },
    ],
    inactiveIngredients: [
      flag('Canola oil', 'high', labelCite(NORDIC_DHA_GUMMY_CITE, METH.seedOilGummies)),
      flag('Natural flavor', 'limited', labelCite(NORDIC_DHA_GUMMY_CITE, METH.flavors)),
      flag('Xylitol', 'limited', labelCite(NORDIC_DHA_GUMMY_CITE, METH.xylitol)),
      flag('Sorbitol', 'limited', labelCite(NORDIC_DHA_GUMMY_CITE, METH.sorbitol)),
      labelCleared(NORDIC_DHA_GUMMY_CITE, 'Purified water'),
      labelCleared(NORDIC_DHA_GUMMY_CITE, 'Gelatin'),
      labelCleared(NORDIC_DHA_GUMMY_CITE, 'Sodium citrate'),
      labelCleared(NORDIC_DHA_GUMMY_CITE, 'Malic acid'),
      labelCleared(NORDIC_DHA_GUMMY_CITE, 'Paprika extract (for color)'),
      flag('Stevia', 'cleared', labelCite(NORDIC_DHA_GUMMY_CITE, METH.stevia)),
    ],
    verdict: 'avoid',
    honestNote:
      "FOUNDER CALL: Nordic Naturals Children's DHA Gummy Chews = Avoid. Instacart other-ingredients list canola oil + natural flavor (plus xylitol, purified water, sorbitol, gelatin, sodium citrate, malic acid, paprika extract, stevia). Canola oil in a gummy is High-tier. Natural flavor is Limited (not needed to reach Avoid). Oral xylitol / sorbitol are Limited sugar alcohols (not needed to reach Avoid). Stevia is Cleared-class (high-purity extract). Fish oil here is the omega active / fill, not a second gummy-oil High. Some retailer pages omit canola — Instacart (and matched carton reviews) list it last; confirm the physical carton still has canola. A later no-canola carton would be a different formulaId (not written). Children's Eye Health Gummy Chews are a different SKU (not this row). The strawberry DHA liquid (`nordic-naturals-childrens-dha-liquid`) is Caution, not Clean — do not list it as a cleanAlternative. minAge 2 from the brand 2–6 / ages 2+ chart (Instacart / brand / Target); confirm the carton. Contains fish. No DailyMed drug SPL. " +
      NO_CLEAN_SAME_ACTIVE,
    retailers: ['Instacart', 'Target', 'Vitamin shops', 'Grocery'],
    sourcesGeneral: [
      `${NORDIC_DHA_GUMMY_CITE} — draft, not verified; carton-confirm required (canola + age); no DailyMed drug SPL`,
    ],
  },
];

for (const record of BATCH19_KIDS_SINGLES) {
  const expected = BATCH19_CATCHUP_BARCODES[record.id];
  if (expected && record.barcode !== expected) {
    throw new Error(`batch 19 catch-up UPC drift on ${record.id}`);
  }
}
