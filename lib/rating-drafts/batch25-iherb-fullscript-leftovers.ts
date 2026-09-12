// DRAFT / not verified / batch 25 iHerb+Fullscript leftovers /
// founder-approved leftover Cleaner-alt fills / founder calls locked /
// methodology untouched.
//
// Mixed categories (Digestive + Vitamins) · audience adult except Junior
// Nutrients (kids / minAge 4) · recordStatus is 'unverified' on every row.
// Founder calls (locked): see notes below. Methodology v1.6 grades only —
// do not change locked ingredient grades. Do NOT invent Clean. Do NOT
// grade gellan. Do NOT write skipped products. Do NOT grade essential
// oils. Do NOT invent UPCs. Barcodes omitted — match prior rating-draft
// batches. Pack sizes share formulaId. formulaId == id on every row
// (same pattern as prior batches). Form is labeled on cleanAlternatives,
// not a hard filter (§6). Not wired into Clean Picks UI. No live Clean
// Picks file is edited from this draft. Methodology.md / PROJECT_NOTES.md
// are untouched. batch 23 branded oil drafts live elsewhere — this file
// does not touch oil records and does not grade oils. batch 24 already-
// written PE melatonin / D3 / prenatal / Thorne prenatal are not rewritten.
//
// PE PROBIOTIC G.I. LABEL (LOCKED): Current US iHerb / Fullscript /
// DSLD 207959 other-ingredients are hypoallergenic plant fiber (cellulose)
// + vegetarian capsule (cellulose, water) ONLY. Do NOT use older rice-
// starch PDFs / retailer leftovers. No gellan. Cleared-only → Clean.
//
// THORNE VITAMIN C LABEL (LOCKED): Current / on-market hypromellose +
// calcium laurate + cellulose. Founder parallel to Thorne Basic Prenatal
// calcium-laurate Clean stack. Older SiO2 lots would be Caution — not
// this draft.
//
// PE MAGNESIUM (CITRATE) (LOCKED): Write the citrate SKU only — not
// citrate/malate. Founder: one of the two unless inactives differ.
//
// FOUNDER CALLS (LOCKED) — write these 13 rows only:
// CLEAN
// - Pure Encapsulations Probiotic G.I. = Clean. Digestive hole fill.
//   Current US label: hypoallergenic plant fiber (cellulose) + vegetarian
//   capsule (cellulose, water). No gellan. No rice starch on the matched
//   current US label. Cite iHerb + Fullscript US + DSLD 207959.
// - Seeking Health Optimal Multivitamin (240 caps) = Clean. Matched
//   iHerb: hypromellose + water + MCC + ascorbyl palmitate — no SiO2.
//   Zinc parked. No dosing / medical advice.
// - Pure Encapsulations O.N.E. Multivitamin = Clean. Veg capsule
//   (cellulose, water); hypoallergenic plant fiber (cellulose); ascorbyl
//   palmitate; potato starch — all Cleared. MicroActive CoQ10-cyclodextrin
//   is on Supplement Facts as a CoQ10 form / active carrier — notes only;
//   do not invent an inactive grade for cyclodextrin. Zinc parked. Pack
//   sizes share formulaId.
// - Pure Encapsulations Magnesium (glycinate) = Clean. Veg capsule
//   (cellulose, water) + ascorbyl palmitate on matched DSLD 184649 /
//   205309 / iHerb (no separate cellulose-fiber line on those lists).
//   Cite DSLD 184649 / 205309 / iHerb.
// - Designs for Health Magnesium Glycinate Complex = Clean. Cellulose
//   (capsule) + vegetable stearate (Cleared stearate-class; same encoding
//   as batch 24 DFH Prenatal Pro vegetable stearate).
// - Pure Encapsulations Ascorbic Acid 1000 mg = Clean. Veg capsule
//   (cellulose, water) + ascorbyl palmitate.
// - Pure Encapsulations Junior Nutrients = Clean. Vitamins · audience
//   kids · minAge 4 (carton ages 4–13 / 14+). Ascorbyl palmitate +
//   vegetarian capsule (cellulose, water). Zinc parked. DSLD 185030.
// - Thorne Vitamin C as Ascorbic Acid (current label) = Clean.
//   Hypromellose + calcium laurate + cellulose — no SiO2. Founder
//   parallel to Thorne Basic Prenatal calcium-laurate Clean stack.
//   Current / on-market label only; older SiO2 lots would be Caution.
// - Thorne Magnesium Bisglycinate powder = Clean. Citric acid (Cleared)
//   + monk fruit concentrate (Cleared v1.6 high-purity).
// - Pure Encapsulations Magnesium (Citrate) = Clean. Citrate only (not
//   citrate/malate). Veg capsule + ascorbyl palmitate Cleared.
// CAUTION
// - Pure Encapsulations Probiotic-5 (dairy-free) = Caution. Rice starch
//   Cleared + silicon dioxide Caution cap + veg capsule Cleared. Encode
//   SiO2 like batch 15 Nature Made prenatal / batch 24 DFH Prenatal Pro
//   (precautionary Caution cap). cleanAlternatives → PE Probiotic G.I.
//   (form labeled §6).
// - Thorne FloraMend Prime Probiotic = Caution. Delayed-release HPMC /
//   pectin / water Cleared + potato starch Cleared + silica Caution cap.
//   cleanAlternatives → PE Probiotic G.I.
// - Thorne Magnesium Glycinate capsules = Caution. Hypromellose + MCT
//   oil + silicon dioxide. MCT oil is NOT in §5 — notes-only ungraded
//   (v1.6 intake); do not invent riskLevel. SiO2 is the Caution driver.
//   Do not FLAG-skip — founder approved Caution write. cleanAlternatives
//   → PE Mag glycinate / DFH Mag / Thorne Mag powder.
//
// TALLY (unverified drafts): 13 rows — Clean 10 / Caution 3 / Avoid 0.
// Independently Clean in THIS batch: PE Probiotic G.I. (Digestive);
// Seeking Health Optimal Multivitamin; PE O.N.E. Multivitamin; PE
// Magnesium (glycinate); DFH Magnesium Glycinate Complex; PE Ascorbic
// Acid 1000 mg; PE Junior Nutrients (kids); Thorne Vitamin C as Ascorbic
// Acid; Thorne Magnesium Bisglycinate powder; PE Magnesium (Citrate).
// cleanAlternatives on Caution probiotics point at PE Probiotic G.I.
// (form labeled, not a hard filter). Caution Thorne Mg caps point at PE
// Mag glycinate / DFH Mag / Thorne Mag powder. Omitted on Clean rows
// (including in-batch Clean Vit C / multi / Junior peers).
//
// formulaIds:
// - pure-encapsulations-probiotic-gi (Clean, Digestive)
// - seeking-health-optimal-multivitamin (Clean, Vitamins)
// - pure-encapsulations-one-multivitamin (Clean, Vitamins)
// - pure-encapsulations-magnesium-glycinate (Clean, Vitamins)
// - dfh-magnesium-glycinate-complex (Clean, Vitamins)
// - pure-encapsulations-ascorbic-acid-1000 (Clean, Vitamins)
// - pure-encapsulations-junior-nutrients (Clean, Vitamins, kids)
// - thorne-vitamin-c-ascorbic-acid (Clean, Vitamins)
// - thorne-magnesium-bisglycinate-powder (Clean, Vitamins)
// - pure-encapsulations-magnesium-citrate (Clean, Vitamins)
// - pure-encapsulations-probiotic-5 (Caution, Digestive)
// - thorne-floramend-prime-probiotic (Caution, Digestive)
// - thorne-magnesium-glycinate-capsules (Caution, Vitamins)
//
// FLAG / SKIP (do not write rows):
// - Pure Encapsulations Nutrient 950 / Multi T/D / Men’s Nutrients
// - Pure Encapsulations B12 / Folate / B-Complex
// - Pure Encapsulations Women’s Nutrients
// - Gellan probiotics (including batch 24 FLAG PE Probiotic 50B —
//   cellulose + gellan gum; gellan NOT in §5 — ungraded; do not invent
//   Clean)
// - Kids probiotic / D3 / C / Mg
// - Flavor fish oil Clean invent
// - Pure Encapsulations Magnesium (citrate/malate) — founder picked
//   citrate only unless inactives differ
// - Amazon / Dollar Tree / We Heart Nutrition
// - Graded oils
// - Batch 24 already-written PE Melatonin-SR 3 mg / PE D3 5000 IU /
//   PE PreNatal Nutrients / Thorne Basic Prenatal (reuse only; do not
//   rewrite)
//
// ZINC IS PARKED (Methodology v1.6): never invent an active-safety grade.
// Grade inactives only. Every zinc-containing multi honestNote says zinc
// is parked. Silicon dioxide / silica = Caution cap, not Avoid alone.
// No dosing. No medical advice. No "consult your doctor" prescriptions.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const DIGESTIVE = 'Digestive';
const VITAMINS = 'Vitamins';
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const VITAMIN = 'Vitamin' as const;
const SUPPLEMENT = 'Supplement' as const;

const METH = {
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  tocopherols:
    'Methodology §5 Cleared (mixed tocopherols / ascorbyl palmitate as antioxidants — locked v1.6)',
  calciumLaurate:
    'Methodology §5 Cleared-class (calcium laurate — stearate-family lubricant on the founder-approved hypromellose + calcium laurate Clean stack; cite founder call + current on-market label, not a new High lock)',
  monkFruit:
    'Methodology §5 Cleared (monk fruit / mogrosides, high-purity extract — locked v1.6)',
  starches:
    'Methodology §5 Cleared (pregelatinized / corn / potato / similar simple starches — locked v1.6 housekeeping)',
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
  'Zinc (oxide / citrate / bisglycinate / other labeled zinc salts) is parked as of Methodology v1.6 — active-safety-cap review is not done. This draft grades inactives only and does not invent an active-safety grade for zinc.';

const PE_PROBIOTIC_GI_ID = 'pure-encapsulations-probiotic-gi';
const SEEKING_HEALTH_MULTI_ID = 'seeking-health-optimal-multivitamin';
const PE_ONE_MULTI_ID = 'pure-encapsulations-one-multivitamin';
const PE_MAG_GLYCINATE_ID = 'pure-encapsulations-magnesium-glycinate';
const DFH_MAG_ID = 'dfh-magnesium-glycinate-complex';
const PE_ASCORBIC_ID = 'pure-encapsulations-ascorbic-acid-1000';
const PE_JUNIOR_ID = 'pure-encapsulations-junior-nutrients';
const THORNE_C_ID = 'thorne-vitamin-c-ascorbic-acid';
const THORNE_MAG_POWDER_ID = 'thorne-magnesium-bisglycinate-powder';
const PE_MAG_CITRATE_ID = 'pure-encapsulations-magnesium-citrate';
const PE_PROBIOTIC_5_ID = 'pure-encapsulations-probiotic-5';
const THORNE_FLORAMEND_ID = 'thorne-floramend-prime-probiotic';
const THORNE_MAG_CAPS_ID = 'thorne-magnesium-glycinate-capsules';

const PE_PROBIOTIC_GI_CITE =
  'Pure Encapsulations Probiotic G.I. current US iHerb / Fullscript / DSLD 207959 other-ingredients (hypoallergenic plant fiber (cellulose), vegetarian capsule (cellulose, water); no rice starch / no gellan / no SiO2)';
const SEEKING_HEALTH_MULTI_CITE =
  'Seeking Health Optimal Multivitamin 240 capsules iHerb / Fullscript other-ingredients (vegetarian capsule (hypromellose and water), microcrystalline cellulose, ascorbyl palmitate; no SiO2)';
const PE_ONE_MULTI_CITE =
  'Pure Encapsulations O.N.E. Multivitamin iHerb / Fullscript other-ingredients (vegetarian capsule (cellulose, water), hypoallergenic plant fiber (cellulose), ascorbyl palmitate, potato starch)';
const PE_MAG_GLYCINATE_CITE =
  'Pure Encapsulations Magnesium (glycinate) DSLD 184649 / DSLD 205309 / iHerb other-ingredients (vegetarian capsule (cellulose, water), ascorbyl palmitate)';
const DFH_MAG_CITE =
  'Designs for Health Magnesium Glycinate Complex Fullscript / iHerb other-ingredients (cellulose (capsule), vegetable stearate)';
const PE_ASCORBIC_CITE =
  'Pure Encapsulations Ascorbic Acid 1000 mg iHerb / Fullscript other-ingredients (vegetarian capsule (cellulose, water), ascorbyl palmitate)';
const PE_JUNIOR_CITE =
  'Pure Encapsulations Junior Nutrients US iHerb / Fullscript / DSLD 185030 other-ingredients (vegetarian capsule (cellulose, water), ascorbyl palmitate)';
const THORNE_C_CITE =
  'Thorne Vitamin C as Ascorbic Acid current / on-market iHerb / Fullscript other-ingredients (hypromellose (derived from cellulose) capsule, calcium laurate, cellulose; no SiO2)';
const THORNE_MAG_POWDER_CITE =
  'Thorne Magnesium Bisglycinate powder iHerb / Fullscript other-ingredients (citric acid, monk fruit concentrate (Tate and Lyle Purefruit Select™ high-purity monk fruit))';
const PE_MAG_CITRATE_CITE =
  'Pure Encapsulations Magnesium (Citrate) iHerb / Fullscript other-ingredients (vegetarian capsule (cellulose, water), ascorbyl palmitate) — citrate SKU only, not citrate/malate';
const PE_PROBIOTIC_5_CITE =
  'Pure Encapsulations Probiotic-5 (dairy-free) iHerb / Fullscript other-ingredients (rice starch, silicon dioxide, vegetarian capsule (cellulose, water))';
const THORNE_FLORAMEND_CITE =
  'Thorne FloraMend Prime Probiotic iHerb / Fullscript other-ingredients (delayed-release (hydroxypropyl methylcellulose, pectin, water) capsule, potato starch, silica)';
const THORNE_MAG_CAPS_CITE =
  'Thorne Magnesium Glycinate capsules iHerb / Fullscript other-ingredients (hypromellose (derived from cellulose) capsule, medium chain triglyceride oil, silicon dioxide)';

const PROBIOTIC_ALTS: CleanAlternative[] = [
  {
    productId: PE_PROBIOTIC_GI_ID,
    rankReason:
      'Independently Clean in-batch Pure Encapsulations Probiotic G.I. (current US hypoallergenic plant fiber cellulose + vegetarian capsule cellulose/water; no rice starch / no gellan / no SiO2). Form: capsule — labeled, not a hard filter (§6).',
  },
];

const MAG_ALTS: CleanAlternative[] = [
  {
    productId: PE_MAG_GLYCINATE_ID,
    rankReason:
      'Independently Clean in-batch Pure Encapsulations Magnesium (glycinate) (vegetarian capsule cellulose/water + ascorbyl palmitate; no SiO2). Form: capsule — labeled, not a hard filter (§6).',
  },
  {
    productId: DFH_MAG_ID,
    rankReason:
      'Independently Clean in-batch Designs for Health Magnesium Glycinate Complex (cellulose capsule + vegetable stearate; no SiO2). Form: capsule — labeled, not a hard filter (§6).',
  },
  {
    productId: THORNE_MAG_POWDER_ID,
    rankReason:
      'Independently Clean in-batch Thorne Magnesium Bisglycinate powder (citric acid + high-purity monk fruit concentrate). Form: powder — labeled, not a hard filter (§6).',
  },
];

export const BATCH25_IHERB_FULLSCRIPT_LEFTOVERS: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  {
    id: PE_PROBIOTIC_GI_ID,
    productName: 'Pure Encapsulations Probiotic G.I.',
    brand: 'Pure Encapsulations',
    category: DIGESTIVE,
    formulaId: PE_PROBIOTIC_GI_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Probiotic blend (B. lactis Bl-04, L. acidophilus La-14, L. salivarius Ls-33, L. casei Lc-11, S. thermophilus St-21, B. bifidum Bb-06)',
        strength: '10 billion CFU per capsule',
      },
    ],
    inactiveIngredients: [
      labelCleared(PE_PROBIOTIC_GI_CITE, 'Hypoallergenic plant fiber (cellulose)'),
      labelCleared(PE_PROBIOTIC_GI_CITE, 'Vegetarian capsule (cellulose, water)'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Pure Encapsulations Probiotic G.I. = Clean. Current US iHerb / Fullscript / DSLD 207959 other-ingredients: hypoallergenic plant fiber (cellulose), vegetarian capsule (cellulose, water). That matched current US list has no rice starch, no gellan, and no silicon dioxide — Cleared-only → Clean. Do NOT use older rice-starch PDFs / leftover retailer panels; those are a different formula, not this row. No gellan grade is invented (gellan products, including PE Probiotic 50B, stay FLAG / skip). Cleanliness grade only; no efficacy claim. Pack sizes share formulaId. No DailyMed drug SPL (dietary supplement). Adults.',
    retailers: ['iHerb', 'Fullscript'],
    sourcesGeneral: [
      `${PE_PROBIOTIC_GI_CITE} — draft, not verified; current US label only; do not use older rice-starch PDFs; no DailyMed drug SPL`,
    ],
  },
  {
    id: SEEKING_HEALTH_MULTI_ID,
    productName: 'Seeking Health Optimal Multivitamin (240 capsules)',
    brand: 'Seeking Health',
    category: VITAMINS,
    formulaId: SEEKING_HEALTH_MULTI_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Adult multivitamin / multimineral', strength: '8 capsules (label serving)' },
      { name: 'Zinc (as zinc bisglycinate chelate)', strength: '20mg' },
    ],
    inactiveIngredients: [
      labelCleared(SEEKING_HEALTH_MULTI_CITE, 'Vegetarian capsule (hypromellose and water)'),
      labelCleared(SEEKING_HEALTH_MULTI_CITE, 'Microcrystalline cellulose'),
      flag(
        'Ascorbyl palmitate',
        'cleared',
        labelCite(SEEKING_HEALTH_MULTI_CITE, METH.tocopherols),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Seeking Health Optimal Multivitamin (240 caps) = Clean. Matched iHerb / Fullscript other-ingredients: vegetarian capsule (hypromellose and water), microcrystalline cellulose, ascorbyl palmitate — no silicon dioxide. Hypromellose / water / MCC are Cleared. Ascorbyl palmitate is Cleared (v1.6 antioxidant lock). Pack sizes share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. ' +
      ZINC_PARKED,
    retailers: ['iHerb', 'Fullscript'],
    sourcesGeneral: [
      `${SEEKING_HEALTH_MULTI_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: PE_ONE_MULTI_ID,
    productName: 'Pure Encapsulations O.N.E. Multivitamin',
    brand: 'Pure Encapsulations',
    category: VITAMINS,
    formulaId: PE_ONE_MULTI_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Once-daily multivitamin / multimineral', strength: '1 capsule (label serving)' },
      { name: 'Zinc (as zinc citrate)', strength: '25mg' },
      {
        name: 'Coenzyme Q10 (as CoQ10 and as 18% from sustained-release MicroActive Q10-cyclodextrin complex)',
        strength: '50mg',
      },
    ],
    inactiveIngredients: [
      labelCleared(PE_ONE_MULTI_CITE, 'Vegetarian capsule (cellulose, water)'),
      labelCleared(PE_ONE_MULTI_CITE, 'Hypoallergenic plant fiber (cellulose)'),
      flag(
        'Ascorbyl palmitate',
        'cleared',
        labelCite(PE_ONE_MULTI_CITE, METH.tocopherols),
      ),
      flag(
        'Potato starch',
        'cleared',
        labelCite(PE_ONE_MULTI_CITE, METH.starches),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Pure Encapsulations O.N.E. Multivitamin = Clean. iHerb / Fullscript other-ingredients: vegetarian capsule (cellulose, water), hypoallergenic plant fiber (cellulose), ascorbyl palmitate, potato starch — all Cleared-class. MicroActive Q10-cyclodextrin complex is listed on Supplement Facts as a CoQ10 form / active carrier, not as an other-ingredients inactive — this draft does not invent an inactive grade for cyclodextrin. 30-ct / 60-ct / 120-ct packs share formulaId. No DailyMed drug SPL (dietary supplement). Adults. ' +
      ZINC_PARKED,
    retailers: ['iHerb', 'Fullscript'],
    sourcesGeneral: [
      `${PE_ONE_MULTI_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: PE_MAG_GLYCINATE_ID,
    productName: 'Pure Encapsulations Magnesium (glycinate)',
    brand: 'Pure Encapsulations',
    category: VITAMINS,
    formulaId: PE_MAG_GLYCINATE_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Magnesium (as magnesium glycinate)', strength: '120mg' },
    ],
    inactiveIngredients: [
      labelCleared(PE_MAG_GLYCINATE_CITE, 'Vegetarian capsule (cellulose, water)'),
      flag(
        'Ascorbyl palmitate',
        'cleared',
        labelCite(PE_MAG_GLYCINATE_CITE, METH.tocopherols),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Pure Encapsulations Magnesium (glycinate) = Clean. Matched DSLD 184649 / DSLD 205309 / iHerb other-ingredients: vegetarian capsule (cellulose, water), ascorbyl palmitate. Ascorbyl palmitate is Cleared (v1.6 antioxidant lock). Those matched lists do not add a separate hypoallergenic plant-fiber (cellulose) line — cellulose fiber is Cleared if a later matched carton lists it, but this draft does not invent that inactive. Pack sizes share formulaId. No DailyMed drug SPL (dietary supplement). Adults.',
    retailers: ['iHerb', 'Fullscript'],
    sourcesGeneral: [
      `${PE_MAG_GLYCINATE_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: DFH_MAG_ID,
    productName: 'Designs for Health Magnesium Glycinate Complex',
    brand: 'Designs for Health',
    category: VITAMINS,
    formulaId: DFH_MAG_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Magnesium (as TRAACS magnesium bisglycinate chelate buffered)',
        strength: '300mg per 2-capsule serving',
      },
    ],
    inactiveIngredients: [
      labelCleared(DFH_MAG_CITE, 'Cellulose (capsule)'),
      labelCleared(DFH_MAG_CITE, 'Vegetable stearate'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Designs for Health Magnesium Glycinate Complex = Clean. Fullscript / iHerb other-ingredients: cellulose (capsule), vegetable stearate. Vegetable stearate is Cleared stearate-class — same Cleared encoding as batch 24 DFH Prenatal Pro vegetable stearate (`labelCleared` / Methodology §5 Cleared). No silicon dioxide / TiO2 / dye / talc on that matched list. 60-ct / 120-ct / 240-ct packs share formulaId. No DailyMed drug SPL (dietary supplement). Adults.',
    retailers: ['iHerb', 'Fullscript'],
    sourcesGeneral: [
      `${DFH_MAG_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: PE_ASCORBIC_ID,
    productName: 'Pure Encapsulations Ascorbic Acid 1000 mg',
    brand: 'Pure Encapsulations',
    category: VITAMINS,
    formulaId: PE_ASCORBIC_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [{ name: 'Vitamin C (as ascorbic acid)', strength: '1000mg' }],
    inactiveIngredients: [
      labelCleared(PE_ASCORBIC_CITE, 'Vegetarian capsule (cellulose, water)'),
      flag(
        'Ascorbyl palmitate',
        'cleared',
        labelCite(PE_ASCORBIC_CITE, METH.tocopherols),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Pure Encapsulations Ascorbic Acid 1000 mg = Clean. iHerb / Fullscript other-ingredients: vegetarian capsule (cellulose, water), ascorbyl palmitate. Ascorbyl palmitate is Cleared (v1.6 antioxidant lock). Pack sizes share formulaId. No DailyMed drug SPL (dietary supplement). Adults.',
    retailers: ['iHerb', 'Fullscript'],
    sourcesGeneral: [
      `${PE_ASCORBIC_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: PE_JUNIOR_ID,
    productName: 'Pure Encapsulations Junior Nutrients',
    brand: 'Pure Encapsulations',
    category: VITAMINS,
    formulaId: PE_JUNIOR_ID,
    audience: KIDS,
    minAge: 4,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      {
        name: 'Kids multivitamin / multimineral (without iron)',
        strength: '2 capsules (label serving)',
      },
      { name: 'Zinc (as zinc citrate)', strength: '7.5mg' },
    ],
    inactiveIngredients: [
      flag(
        'Ascorbyl palmitate',
        'cleared',
        labelCite(PE_JUNIOR_CITE, METH.tocopherols),
      ),
      labelCleared(PE_JUNIOR_CITE, 'Vegetarian capsule (cellulose, water)'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Pure Encapsulations Junior Nutrients = Clean. US iHerb / Fullscript / DSLD 185030 other-ingredients: vegetarian capsule (cellulose, water), ascorbyl palmitate. Ascorbyl palmitate is Cleared (v1.6 antioxidant lock). Carton age chart: ages 4–13 and ages 14+ (minAge 4 from the 4–13 floor). No iron on the matched formula. Pack sizes share formulaId. No DailyMed drug SPL (dietary supplement). Audience kids. No dosing or medical advice in this draft. ' +
      ZINC_PARKED,
    retailers: ['iHerb', 'Fullscript'],
    sourcesGeneral: [
      `${PE_JUNIOR_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: THORNE_C_ID,
    productName: 'Thorne Vitamin C as Ascorbic Acid',
    brand: 'Thorne',
    category: VITAMINS,
    formulaId: THORNE_C_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [{ name: 'Vitamin C (as ascorbic acid)', strength: '1g (1000mg)' }],
    inactiveIngredients: [
      labelCleared(THORNE_C_CITE, 'Hypromellose (derived from cellulose) capsule'),
      flag(
        'Calcium laurate',
        'cleared',
        labelCite(THORNE_C_CITE, METH.calciumLaurate),
      ),
      labelCleared(THORNE_C_CITE, 'Cellulose'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Thorne Vitamin C as Ascorbic Acid = Clean on the CURRENT / on-market label. iHerb / Fullscript other-ingredients: hypromellose (derived from cellulose) capsule, calcium laurate, cellulose — no silicon dioxide. Founder parallel to the Thorne Basic Prenatal hypromellose + calcium laurate Clean stack (batch 24). Calcium laurate is treated as Cleared on that founder-approved stack (stearate-family lubricant; cite founder call + current label — not independently listed in the §5 Cleared table and not a new High lock). This draft is the current formula only. Historical / older lots that listed silicon dioxide are a different formula — old lots with SiO2 would be Caution (nanoparticle cap), not this Clean row. Pack sizes share formulaId. Separate formulaId from Thorne Vitamin C with Flavonoids (not this row). No DailyMed drug SPL (dietary supplement). Adults.',
    retailers: ['iHerb', 'Fullscript'],
    sourcesGeneral: [
      `${THORNE_C_CITE} — draft, not verified; current on-market label only; no DailyMed drug SPL`,
    ],
  },
  {
    id: THORNE_MAG_POWDER_ID,
    productName: 'Thorne Magnesium Bisglycinate powder',
    brand: 'Thorne',
    category: VITAMINS,
    formulaId: THORNE_MAG_POWDER_ID,
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Magnesium (as TRAACS magnesium bisglycinate chelate taste free)',
        strength: '200mg per scoop',
      },
    ],
    inactiveIngredients: [
      labelCleared(THORNE_MAG_POWDER_CITE, 'Citric acid'),
      flag(
        'Monk fruit concentrate',
        'cleared',
        labelCite(THORNE_MAG_POWDER_CITE, METH.monkFruit),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Thorne Magnesium Bisglycinate powder = Clean. iHerb / Fullscript other-ingredients: citric acid, monk fruit concentrate. Citric acid is Cleared. Monk fruit concentrate is Cleared (v1.6 high-purity extract lock; matched listings specify Tate and Lyle Purefruit Select™). Pack sizes share formulaId. Separate formulaId from Thorne Magnesium Glycinate capsules (Caution, SiO2). No DailyMed drug SPL (dietary supplement). Adults.',
    retailers: ['iHerb', 'Fullscript'],
    sourcesGeneral: [
      `${THORNE_MAG_POWDER_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: PE_MAG_CITRATE_ID,
    productName: 'Pure Encapsulations Magnesium (Citrate)',
    brand: 'Pure Encapsulations',
    category: VITAMINS,
    formulaId: PE_MAG_CITRATE_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Magnesium (as magnesium citrate)', strength: '150mg' },
    ],
    inactiveIngredients: [
      labelCleared(PE_MAG_CITRATE_CITE, 'Vegetarian capsule (cellulose, water)'),
      flag(
        'Ascorbyl palmitate',
        'cleared',
        labelCite(PE_MAG_CITRATE_CITE, METH.tocopherols),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Pure Encapsulations Magnesium (Citrate) = Clean. Write the citrate SKU only — not Magnesium (citrate/malate). iHerb / Fullscript other-ingredients: vegetarian capsule (cellulose, water), ascorbyl palmitate. Veg capsule + ascorbyl palmitate are Cleared. Founder: pick one of the two PE citrate / citrate-malate SKUs unless inactives differ; this draft is citrate. Pack sizes share formulaId. No DailyMed drug SPL (dietary supplement). Adults.',
    retailers: ['iHerb', 'Fullscript'],
    sourcesGeneral: [
      `${PE_MAG_CITRATE_CITE} — draft, not verified; citrate SKU only; no DailyMed drug SPL`,
    ],
  },

  // ── Caution ──────────────────────────────────────────────
  {
    id: PE_PROBIOTIC_5_ID,
    productName: 'Pure Encapsulations Probiotic-5 (dairy-free)',
    brand: 'Pure Encapsulations',
    category: DIGESTIVE,
    formulaId: PE_PROBIOTIC_5_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Probiotic blend (L. acidophilus La-14, L. rhamnosus Lr-32, B. longum Bl-05, B. lactis Bl-04, B. bifidum Bb-06)',
        strength: '10 billion CFU per capsule',
      },
    ],
    inactiveIngredients: [
      flag(
        'Rice starch',
        'cleared',
        labelCite(PE_PROBIOTIC_5_CITE, METH.starches),
      ),
      flag('Silicon dioxide', 'cleared', labelCite(PE_PROBIOTIC_5_CITE, METH.sio2)),
      labelCleared(PE_PROBIOTIC_5_CITE, 'Vegetarian capsule (cellulose, water)'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Pure Encapsulations Probiotic-5 (dairy-free) = Caution (SiO2). iHerb / Fullscript other-ingredients: rice starch, silicon dioxide, vegetarian capsule (cellulose, water). Rice starch is Cleared-class (v1.6 simple-starch housekeeping). Vegetarian capsule is Cleared. Silicon dioxide is the nanoparticle Caution cap (0 demerit points) — same encoding as batch 15 Nature Made Prenatal Multi tablets and batch 24 DFH Prenatal Pro (`riskLevel: \'cleared\'` + METH.sio2 source; verdict caution, NOT avoid). Do not invent Clean on the SiO2 cap. Pack sizes share formulaId. No DailyMed drug SPL (dietary supplement). Adults.',
    retailers: ['iHerb', 'Fullscript'],
    cleanAlternatives: PROBIOTIC_ALTS,
    sourcesGeneral: [
      `${PE_PROBIOTIC_5_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: THORNE_FLORAMEND_ID,
    productName: 'Thorne FloraMend Prime Probiotic',
    brand: 'Thorne',
    category: DIGESTIVE,
    formulaId: THORNE_FLORAMEND_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Proprietary probiotic blend (L. gasseri KS-13, B. longum MM-2, B. bifidum G9-1)',
        strength: '5 billion live cells per capsule',
      },
    ],
    inactiveIngredients: [
      labelCleared(
        THORNE_FLORAMEND_CITE,
        'Delayed-release capsule (hydroxypropyl methylcellulose, pectin, water)',
      ),
      flag(
        'Potato starch',
        'cleared',
        labelCite(THORNE_FLORAMEND_CITE, METH.starches),
      ),
      flag('Silica', 'cleared', labelCite(THORNE_FLORAMEND_CITE, METH.sio2)),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Thorne FloraMend Prime Probiotic = Caution (silica). iHerb / Fullscript other-ingredients: delayed-release (hydroxypropyl methylcellulose, pectin, water) capsule, potato starch, silica. Delayed-release HPMC / pectin / water are Cleared-class (pectin is the v1.6 gums lock). Potato starch is Cleared (v1.6 simple-starch housekeeping). Silica / silicon dioxide is the nanoparticle Caution cap (0 demerit points) — same encoding as batch 15 Nature Made prenatal / batch 24 DFH (`riskLevel: \'cleared\'` + METH.sio2 source; verdict caution, NOT avoid). Pack sizes share formulaId. No DailyMed drug SPL (dietary supplement). Adults.',
    retailers: ['iHerb', 'Fullscript'],
    cleanAlternatives: PROBIOTIC_ALTS,
    sourcesGeneral: [
      `${THORNE_FLORAMEND_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: THORNE_MAG_CAPS_ID,
    productName: 'Thorne Magnesium Glycinate capsules',
    brand: 'Thorne',
    category: VITAMINS,
    formulaId: THORNE_MAG_CAPS_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Magnesium (as magnesium glycinate)', strength: '120mg' },
    ],
    inactiveIngredients: [
      labelCleared(THORNE_MAG_CAPS_CITE, 'Hypromellose (derived from cellulose) capsule'),
      flag('Silicon dioxide', 'cleared', labelCite(THORNE_MAG_CAPS_CITE, METH.sio2)),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Thorne Magnesium Glycinate capsules = Caution (SiO2). iHerb / Fullscript other-ingredients: hypromellose (derived from cellulose) capsule, medium chain triglyceride oil, silicon dioxide. Hypromellose is Cleared. Medium chain triglyceride oil is present on the label but is not in Methodology §5 (ungraded; v1.6 intake) — omitted from the scored inactiveIngredients array (same notes-only pattern as batch 24 PE Melatonin-SR sodium alginate and Nordic rosemary extract); not a demerit driver; no invented riskLevel. Silicon dioxide is the nanoparticle Caution cap (0 demerit points) and the Caution driver — same encoding as batch 15 Nature Made prenatal / batch 24 DFH. Do not FLAG-skip this SKU; founder approved the Caution write. Separate formulaId from Clean Thorne Magnesium Bisglycinate powder. Pack sizes share formulaId. No DailyMed drug SPL (dietary supplement). Adults.',
    retailers: ['iHerb', 'Fullscript'],
    cleanAlternatives: MAG_ALTS,
    sourcesGeneral: [
      `${THORNE_MAG_CAPS_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
];
