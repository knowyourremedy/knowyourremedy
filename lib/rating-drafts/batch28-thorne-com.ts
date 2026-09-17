// DRAFT / not verified / batch 28 Thorne.com extras / founder calls
// locked / methodology untouched.
//
// Thorne.com RatingRecords (Thorne.com extras only). Mixed categories
// (Vitamins + Sleep) · audience adult · recordStatus is 'unverified'
// on every row. Founder calls (locked): see notes below. Methodology
// v1.6 grades only — do not change locked ingredient grades. Do NOT
// invent Clean. Do NOT write FLAG / skipped products. Do NOT invent
// UPCs / barcodes except KYR5-b catch-up allowlist. Pack sizes share formulaId. formulaId == id on every
// row EXCEPT the Super EPA NSF / 90 / 180 twins, which share ONE
// formulaId (`thorne-super-epa`) across separate product rows
// (founder: one formulaId if inactives match; separate barcode /
// SKU rows OK). Form is labeled on cleanAlternatives, not a hard
// filter (§6). Not wired into Clean Picks UI. No live Clean Picks
// file is edited from this draft. Methodology.md / PROJECT_NOTES.md
// are untouched. Existing Thorne rows on main are reuse-only — this
// file does not rewrite them. Softgel fish oil is a RatingRecord,
// not an OilInfoRecord. Softgel carrier ≠ gummy seed-oil High.
//
// REUSE ONLY (do not rewrite): thorne-basic-prenatal ·
// thorne-vitamin-c-ascorbic-acid · thorne-magnesium-bisglycinate-powder ·
// thorne-floramend-prime-probiotic · thorne-magnesium-glycinate-capsules.
// Do not open a new Mag glycinate row just because Thorne.com also
// lists MCT — keep the existing Caution record.
//
// FOUNDER CALLS (LOCKED) — write these 24 rows only. Other-ingredients
// from Thorne.com alias API 2026-09-12 (all InStock):
// CLEAN (20, including 3 Super EPA twin rows sharing formulaId)
// - Women's Multi 50+ VM6W / 180 = Clean. Vitamins · adult · capsule.
//   OI: Hypromellose (derived from cellulose) capsule. Zinc parked.
// - Men's Multi 50+ VM6M / 180 = Clean. OI: Hypromellose (derived
//   from cellulose) capsule; Microcrystalline Cellulose. Zinc parked.
// - Super EPA family twins — ONE shared formulaId (inactives match:
//   gelatin / water / glycerin ± mixed tocopherols / Vitamin E mixed
//   tocopherols). Separate product rows. Vitamins · adult · softgel /
//   gelcap. No flavor. Softgel carrier ≠ gummy seed-oil High.
//   - Super EPA NSF SP608 / 90 — Mixed Tocopherols; Gelatin (bovine),
//     Purified Water and Glycerin (vegetable source) gelcap
//   - Super EPA SP608NC / 90 — Gelatin (bovine), Purified Water and
//     Glycerin gelcap; Vitamin E (mixed tocopherols)
//   - Super EPA SP622NC / 180 — same OI as SP608NC
// - Super EPA Pro SP610 / 120 = Clean. OWN formulaId (OI differs:
//   gelatin / water / glycerin gelcap ONLY; no tocopherols).
// - Omega-3 with CoQ10 SP616 / 90 = Clean if no flavor (confirmed).
//   Own formulaId. Mixed Tocopherols + gelatin / water / glycerin.
// - Vitamin C with Flavonoids C154 / 90 = Clean (no SiO2). Cellulose
//   Powder; Calcium Laurate; HPMC capsule.
// - High Potency Vitamin C buffered powder C155 = Clean. OI: none
//   (API lists only Ca/Mg/K ascorbate + ascorbic acid actives).
// - Ashwagandha SF828 = Clean. MCC; HPMC capsule; Ascorbyl Palmitate.
// - Berberine SF800 = Clean. Calcium Laurate; HPMC capsule.
// - Glycine SA512 = Clean. HPMC capsule; Cellulose Powder; Calcium
//   Laurate.
// - Selenium (selenomethionine) M225 = Clean. MCC; HPMC capsule.
// - Niacinamide B131 = Clean. HPMC capsule; Calcium Laurate.
// - Creatine powder SF903 = Clean. Creatine monohydrate only (no OI).
// - L-Glutamine Powder SA519 = Clean. L-glutamine only.
// - Calcium (DiCalcium Malate) M281 = Clean. HPMC capsule; Calcium
//   Laurate.
// - Phosphatidyl Choline SP605 = Clean. Gelatin (bovine), Purified
//   Water and Glycerin gelcap.
// - Glucosamine & Chondroitin SF767 = Clean. Hypromellose Capsule;
//   Calcium Laurate.
// - NiaCel® 400 SP654 = Clean. HPMC capsule; Ascorbyl Palmitate.
// CAUTION (4)
// Encode SiO2 like batch 15 / 24 / 25 / 27: riskLevel 'cleared' +
// precautionary Caution-cap source string; verdict caution.
// Natural flavors = Limited-risk; verdict caution when that is the
// driver. Calcium laurate = Cleared-by-class with Mg stearate /
// stearic acid / Ca stearate (founder stack, same as Basic Prenatal).
// - Melaton-3 SF788 = Caution (SiO2 cap). Sleep · adult. MCC;
//   Silicon Dioxide; Calcium Laurate; HPMC capsule.
// - Melaton-5 SF780 = Caution (SiO2). HPMC Capsule; MCC; Silicon
//   Dioxide; Calcium Laurate.
// - Advanced Nutrients VMX = Caution (SiO2). Multi. MCC; Silicon
//   Dioxide; Calcium Laurate; HPMC capsule. Zinc parked.
// - Magnesium Citrate powder M286 = Caution (natural flavor only;
//   citric / monk fruit / bicarb Cleared).
//
// TALLY (unverified drafts): 24 rows — Clean 20 (including 3 Super
// EPA twin rows sharing formulaId) / Caution 4 / Avoid 0.
// Independently Clean in THIS batch: Women's Multi 50+; Men's Multi
// 50+; Super EPA NSF / 90 / 180 (shared formulaId); Super EPA Pro;
// Omega-3 with CoQ10; Vitamin C with Flavonoids; High Potency
// Vitamin C powder; Ashwagandha; Berberine; Glycine; Selenium
// (selenomethionine); Niacinamide; Creatine powder; L-Glutamine
// Powder; Calcium (DiCalcium Malate); Phosphatidyl Choline;
// Glucosamine & Chondroitin; NiaCel 400. No independently Clean
// in-batch sleep row — Melaton cleanAlternatives point at existing
// Clean PE Melatonin-SR 3 mg on main (form labeled §6). Do not
// invent a Clean Thorne sleep. Do not invent Clean kids / OTC /
// probiotic this pass.
//
// formulaIds:
// - thorne-womens-multi-50-plus (Clean, Vitamins)
// - thorne-mens-multi-50-plus (Clean, Vitamins)
// - thorne-super-epa (Clean, Vitamins — shared by NSF / 90 / 180 rows)
// - thorne-super-epa-pro (Clean, Vitamins)
// - thorne-omega-3-with-coq10 (Clean, Vitamins)
// - thorne-vitamin-c-with-flavonoids (Clean, Vitamins)
// - thorne-high-potency-vitamin-c-powder (Clean, Vitamins)
// - thorne-ashwagandha (Clean, Vitamins)
// - thorne-berberine (Clean, Vitamins)
// - thorne-glycine (Clean, Vitamins)
// - thorne-selenium-selenomethionine (Clean, Vitamins)
// - thorne-niacinamide (Clean, Vitamins)
// - thorne-creatine-powder (Clean, Vitamins)
// - thorne-l-glutamine-powder (Clean, Vitamins)
// - thorne-calcium-dicalcium-malate (Clean, Vitamins)
// - thorne-phosphatidyl-choline (Clean, Vitamins)
// - thorne-glucosamine-chondroitin (Clean, Vitamins)
// - thorne-niacel-400 (Clean, Vitamins)
// - thorne-melaton-3 (Caution, Sleep)
// - thorne-melaton-5 (Caution, Sleep)
// - thorne-advanced-nutrients (Caution, Vitamins)
// - thorne-magnesium-citrate-powder (Caution, Vitamins)
//
// FLAG / SKIP (do not write rows):
// - Basic Nutrients 2/Day (dicalcium phosphate)
// - Multi-Vitamin Elite (empty OI)
// - Mag CitraMate / D3 liquid / Bacillus / FloraSport (MCT)
// - Women's Daily Probiotic (maltodextrin + rice extract — NOT
//   rice-hull lock)
// - Advanced / Prenatal DHA (mint + rosemary extract)
// - Leucine-stack singles
// - Immune Activator / Brain Factors this pass
// - Kids / OTC
// - B-Alive
// - Amazon-only
// - Dollar Tree
// - graded oils
// - rewrite of REUSE formulaIds (Basic Prenatal / Vitamin C as
//   Ascorbic Acid / Mag bisglycinate powder / FloraMend / Mag
//   glycinate capsules)
//
// ZINC IS PARKED (Methodology v1.6): never invent an active-safety
// grade. Grade inactives only. Every zinc-containing multi honestNote
// says zinc is parked. Silicon dioxide / silica = Caution cap, not
// Avoid alone. No dosing. No medical advice. No "consult your doctor"
// prescriptions.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const SLEEP = 'Sleep';
const VITAMINS = 'Vitamins';
const ADULT = 'adult' as const;
const VITAMIN = 'Vitamin' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = 'Thorne';
const RETAILERS = ['Thorne.com'] as const;

const METH = {
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  tocopherols:
    'Methodology §5 Cleared (mixed tocopherols / ascorbyl palmitate as antioxidants — locked v1.6)',
  calciumLaurate:
    'Methodology §5 Cleared-class (calcium laurate — stearate-family lubricant on the founder-approved hypromellose + calcium laurate Clean stack; cite founder call + current on-market label, not a new High lock)',
  monkFruit:
    'Methodology §5 Cleared (monk fruit / mogrosides, high-purity extract — locked v1.6)',
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

const WOMENS_MULTI_ID = 'thorne-womens-multi-50-plus';
const MENS_MULTI_ID = 'thorne-mens-multi-50-plus';
const SUPER_EPA_FORMULA_ID = 'thorne-super-epa';
const SUPER_EPA_NSF_ID = 'thorne-super-epa-nsf';
const SUPER_EPA_90_ID = 'thorne-super-epa-90';
const SUPER_EPA_180_ID = 'thorne-super-epa-180';
const SUPER_EPA_PRO_ID = 'thorne-super-epa-pro';
const OMEGA_COQ10_ID = 'thorne-omega-3-with-coq10';
const VIT_C_FLAV_ID = 'thorne-vitamin-c-with-flavonoids';
const BUFFERED_C_ID = 'thorne-high-potency-vitamin-c-powder';
const ASHWAGANDHA_ID = 'thorne-ashwagandha';
const BERBERINE_ID = 'thorne-berberine';
const GLYCINE_ID = 'thorne-glycine';
const SELENIUM_ID = 'thorne-selenium-selenomethionine';
const NIACINAMIDE_ID = 'thorne-niacinamide';
const CREATINE_ID = 'thorne-creatine-powder';
const GLUTAMINE_ID = 'thorne-l-glutamine-powder';
const CALCIUM_ID = 'thorne-calcium-dicalcium-malate';
const PC_ID = 'thorne-phosphatidyl-choline';
const GLUCOSAMINE_ID = 'thorne-glucosamine-chondroitin';
const NIACEL_ID = 'thorne-niacel-400';
const MELATON_3_ID = 'thorne-melaton-3';
const MELATON_5_ID = 'thorne-melaton-5';
const ADVANCED_NUTRIENTS_ID = 'thorne-advanced-nutrients';
const MAG_CITRATE_ID = 'thorne-magnesium-citrate-powder';

const PE_MELATONIN_ID = 'pure-encapsulations-melatonin-sr-3mg';
const THORNE_MAG_POWDER_ID = 'thorne-magnesium-bisglycinate-powder';

const WOMENS_MULTI_CITE =
  'Thorne.com alias API 2026-09-12 https://www.thorne.com/products/dp/womens-multi-50 SKU VM6W / 180 InStock other-ingredients (Hypromellose (derived from cellulose) capsule; no SiO2 / no flavor)';
const MENS_MULTI_CITE =
  'Thorne.com alias API 2026-09-12 https://www.thorne.com/products/dp/mens-multi-50 SKU VM6M / 180 InStock other-ingredients (Hypromellose (derived from cellulose) capsule; Microcrystalline Cellulose; no SiO2 / no flavor)';
const SUPER_EPA_NSF_CITE =
  'Thorne.com alias API 2026-09-12 https://www.thorne.com/products/dp/super-epa SKU SP608 / 90 InStock other-ingredients (Mixed Tocopherols; Gelatin (bovine), Purified Water and Glycerin (vegetable source) gelcap; no flavor)';
const SUPER_EPA_90_CITE =
  'Thorne.com alias API 2026-09-12 https://www.thorne.com/products/dp/super-epa-sp608nc SKU SP608NC / 90 InStock other-ingredients (Gelatin (bovine), Purified Water and Glycerin (vegetable source) gelcap; Vitamin E (mixed tocopherols); no flavor)';
const SUPER_EPA_180_CITE =
  'Thorne.com alias API 2026-09-12 https://www.thorne.com/products/dp/super-epa-180 SKU SP622NC / 180 InStock other-ingredients (Gelatin (bovine), Purified Water and Glycerin (vegetable source) gelcap; Vitamin E (mixed tocopherols); no flavor)';
const SUPER_EPA_PRO_CITE =
  'Thorne.com alias API 2026-09-12 https://www.thorne.com/products/dp/super-epa-pro-60-s-1 SKU SP610 / 120 InStock other-ingredients (Gelatin (bovine), Purified Water and Glycerin (vegetable source) gelcap ONLY; no tocopherols / no flavor)';
const OMEGA_COQ10_CITE =
  'Thorne.com alias API 2026-09-12 https://www.thorne.com/products/dp/omega-3-w-coq10 SKU SP616 / 90 InStock other-ingredients (Mixed Tocopherols; Gelatin (bovine), Purified Water and Glycerin (vegetable source) gelcap; no flavor)';
const VIT_C_FLAV_CITE =
  'Thorne.com alias API 2026-09-12 https://www.thorne.com/products/dp/vit-c-w-flavonoids SKU C154 / 90 InStock other-ingredients (Cellulose Powder; Calcium Laurate; Hypromellose (derived from cellulose) capsule; no SiO2)';
const BUFFERED_C_CITE =
  'Thorne.com alias API 2026-09-12 https://www.thorne.com/products/dp/buffered-c-powder SKU C155 InStock other-ingredients (none — API lists only Calcium (Ascorbate), Magnesium (Ascorbate), Potassium (Ascorbate), Vitamin C (as Ascorbic Acid) actives)';
const ASHWAGANDHA_CITE =
  'Thorne.com alias API 2026-09-12 https://www.thorne.com/products/dp/ashwagandha SKU SF828 InStock other-ingredients (Microcrystalline Cellulose; Hypromellose (derived from cellulose) capsule; Ascorbyl Palmitate)';
const BERBERINE_CITE =
  'Thorne.com alias API 2026-09-12 https://www.thorne.com/products/dp/berberine-500 SKU SF800 InStock other-ingredients (Calcium Laurate; Hypromellose (derived from cellulose) capsule)';
const GLYCINE_CITE =
  'Thorne.com alias API 2026-09-12 https://www.thorne.com/products/dp/glycine SKU SA512 InStock other-ingredients (Hypromellose (derived from cellulose) capsule; Cellulose Powder; Calcium Laurate)';
const SELENIUM_CITE =
  'Thorne.com alias API 2026-09-12 https://www.thorne.com/products/dp/selenomethionine SKU M225 InStock other-ingredients (Microcrystalline Cellulose; Hypromellose (derived from cellulose) capsule)';
const NIACINAMIDE_CITE =
  'Thorne.com alias API 2026-09-12 https://www.thorne.com/products/dp/niacinamide SKU B131 InStock other-ingredients (Hypromellose (derived from cellulose) capsule; Calcium Laurate)';
const CREATINE_CITE =
  'Thorne.com alias API 2026-09-12 https://www.thorne.com/products/dp/creatine SKU SF903 InStock other-ingredients (none — creatine monohydrate only)';
const GLUTAMINE_CITE =
  'Thorne.com alias API 2026-09-12 https://www.thorne.com/products/dp/l-glutamine-powder SKU SA519 InStock other-ingredients (none — L-glutamine only)';
const CALCIUM_CITE =
  'Thorne.com alias API 2026-09-12 https://www.thorne.com/products/dp/dicalcium-malate SKU M281 InStock other-ingredients (Hypromellose (derived from cellulose) capsule; Calcium Laurate)';
const PC_CITE =
  'Thorne.com alias API 2026-09-12 https://www.thorne.com/products/dp/phosphatidyl-choline SKU SP605 InStock other-ingredients (Gelatin (bovine), Purified Water and Glycerin (vegetable source) gelcap)';
const GLUCOSAMINE_CITE =
  'Thorne.com alias API 2026-09-12 https://www.thorne.com/products/dp/glucosamine-chondroitin SKU SF767 InStock other-ingredients (Hypromellose Capsule; Calcium Laurate)';
const NIACEL_CITE =
  'Thorne.com alias API 2026-09-12 https://www.thorne.com/products/dp/niacel-400 SKU SP654 InStock other-ingredients (Hypromellose (derived from cellulose) capsule; Ascorbyl Palmitate)';
const MELATON_3_CITE =
  'Thorne.com alias API 2026-09-12 https://www.thorne.com/products/dp/melaton-3-trade SKU SF788 InStock other-ingredients (Microcrystalline Cellulose; Silicon Dioxide; Calcium Laurate; Hypromellose (derived from cellulose) capsule)';
const MELATON_5_CITE =
  'Thorne.com alias API 2026-09-12 https://www.thorne.com/products/dp/melaton-5-trade SKU SF780 InStock other-ingredients (Hypromellose Capsule; Microcrystalline Cellulose; Silicon Dioxide; Calcium Laurate)';
const ADVANCED_NUTRIENTS_CITE =
  'Thorne.com alias API 2026-09-12 https://www.thorne.com/products/dp/extra-nutrients SKU VMX InStock other-ingredients (Microcrystalline Cellulose; Silicon Dioxide; Calcium Laurate; Hypromellose (derived from cellulose) capsule)';
const MAG_CITRATE_CITE =
  'Thorne.com alias API 2026-09-12 https://www.thorne.com/products/dp/magnesium-citrate-m286 SKU M286 InStock other-ingredients (Natural Flavor; Citric Acid; Monk Fruit extract; Sodium Bicarbonate)';

// KYR5-b online-only chunk 1 — Thorne.com exact SKU / 180-ct or
// labeled bottle UPC-A (clinic / iHerb tiles match brand SKU).
const BATCH28_CATCHUP_BARCODES: Record<string, string> = {
  [WOMENS_MULTI_ID]: '693749011316',
  [MENS_MULTI_ID]: '693749011323',
  [BERBERINE_ID]: '693749048008',
  [GLYCINE_ID]: '693749512028',
  [NIACEL_ID]: '693749012085',
};

const MELATON_ALTS: CleanAlternative[] = [
  {
    productId: PE_MELATONIN_ID,
    rankReason:
      'Independently Clean Pure Encapsulations Melatonin-SR 3 mg already graded on main in batch 24 (MCC + vegetarian capsule cellulose/water + cellulose fiber + HPMC + carnauba; sodium alginate notes-only ungraded; no SiO2). Form: capsule — labeled, not a hard filter (§6). Same-category adult Sleep peer. No independently Clean in-batch Thorne sleep — do not invent one.',
  },
];

const ADVANCED_NUTRIENTS_ALTS: CleanAlternative[] = [
  {
    productId: WOMENS_MULTI_ID,
    rankReason:
      'Independently Clean in-batch Thorne Women\'s Multi 50+ (hypromellose capsule only on the 2026-09-12 Thorne.com alias API; no SiO2). Form: capsule — labeled, not a hard filter (§6). Age-labeled 50+ women; same-store Thorne.com multi.',
  },
  {
    productId: MENS_MULTI_ID,
    rankReason:
      'Independently Clean in-batch Thorne Men\'s Multi 50+ (hypromellose capsule + microcrystalline cellulose; no SiO2). Form: capsule — labeled, not a hard filter (§6). Age-labeled 50+ men; same-store Thorne.com multi.',
  },
];

const MAG_CITRATE_ALTS: CleanAlternative[] = [
  {
    productId: THORNE_MAG_POWDER_ID,
    rankReason:
      'Independently Clean Thorne Magnesium Bisglycinate powder already graded on main in batch 25 (citric acid + high-purity monk fruit concentrate; no natural flavor). Form: powder — labeled, not a hard filter (§6). Same-brand Thorne powder magnesium. Do not rewrite that reuse formulaId.',
  },
];

export const BATCH28_THORNE_COM: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  {
    id: WOMENS_MULTI_ID,
    productName: 'Women\'s Multi 50+',
    brand: BRAND,
    category: VITAMINS,
    barcode: BATCH28_CATCHUP_BARCODES[WOMENS_MULTI_ID],
    formulaId: WOMENS_MULTI_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      {
        name: 'Women\'s 50+ multivitamin / multimineral',
        strength: '3–6 capsules (label serving; API amounts per 6-capsule serving)',
      },
      { name: 'Vitamin C (as ascorbic acid)', strength: '850mg' },
      { name: 'Vitamin D (as cholecalciferol) (D3)', strength: '50mcg' },
      { name: 'Folate', strength: '1700mcg DFE' },
      { name: 'Zinc (as zinc bisglycinate)', strength: '15mg' },
    ],
    inactiveIngredients: [
      labelCleared(
        WOMENS_MULTI_CITE,
        'Hypromellose (derived from cellulose) capsule',
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Thorne Women\'s Multi 50+ = Clean. Thorne.com alias API 2026-09-12 SKU VM6W / 180 InStock other-ingredients: Hypromellose (derived from cellulose) capsule. HPMC capsule is Cleared. CONFIRMED no silicon dioxide / silica, titanium dioxide, synthetic dye, talc, calcium laurate, or flavor on that matched other-ingredients list — do not invent calcium laurate from third-party listings. Labeled actives listed neutrally from the alias API (not an efficacy claim): 23 nutrients as labeled including Vitamin C 850mg, Vitamin D3 50mcg, folate 1.7mg DFE, zinc (as zinc bisglycinate) 15mg per 6-capsule serving. This draft grades inactives only. Pack sizes share formulaId when the other-ingredients list holds. Separate formulaId from reuse-only Thorne Basic Prenatal (`thorne-basic-prenatal`). No DailyMed drug SPL (dietary supplement). Adults (50+ labeled). No dosing or medical advice in this draft. ' +
      ZINC_PARKED,
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${WOMENS_MULTI_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: MENS_MULTI_ID,
    productName: 'Men\'s Multi 50+',
    brand: BRAND,
    category: VITAMINS,
    barcode: BATCH28_CATCHUP_BARCODES[MENS_MULTI_ID],
    formulaId: MENS_MULTI_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      {
        name: 'Men\'s 50+ multivitamin / multimineral',
        strength: '3–6 capsules (label serving; API amounts per 6-capsule serving)',
      },
      { name: 'Vitamin C (as ascorbic acid)', strength: '850mg' },
      { name: 'Vitamin D (as cholecalciferol) (D3)', strength: '25mcg' },
      { name: 'Folate', strength: '1700mcg DFE' },
      { name: 'Zinc (as zinc bisglycinate)', strength: '30mg' },
    ],
    inactiveIngredients: [
      labelCleared(
        MENS_MULTI_CITE,
        'Hypromellose (derived from cellulose) capsule',
      ),
      labelCleared(MENS_MULTI_CITE, 'Microcrystalline cellulose'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Thorne Men\'s Multi 50+ = Clean. Thorne.com alias API 2026-09-12 SKU VM6M / 180 InStock other-ingredients: Hypromellose (derived from cellulose) capsule; Microcrystalline Cellulose. HPMC / MCC are Cleared. CONFIRMED no silicon dioxide / silica, titanium dioxide, synthetic dye, talc, or flavor on that matched list. Separate formulaId from in-batch Women\'s Multi 50+ (different OI stack and labeled mineral mix). Labeled actives listed neutrally from the alias API (not an efficacy claim): including Vitamin C 850mg, Vitamin D3 25mcg, folate 1.7mg DFE, zinc (as zinc bisglycinate) 30mg, lycopene 15mg per 6-capsule serving. This draft grades inactives only. Pack sizes share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults (50+ labeled). No dosing or medical advice in this draft. ' +
      ZINC_PARKED,
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${MENS_MULTI_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: SUPER_EPA_NSF_ID,
    productName: 'Super EPA NSF',
    brand: BRAND,
    category: VITAMINS,
    barcode: '693749608059',
    formulaId: SUPER_EPA_FORMULA_ID,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'EPA (eicosapentaenoic acid)', strength: '425mg per gelcap' },
      { name: 'DHA (docosahexaenoic acid)', strength: '270mg per gelcap' },
    ],
    inactiveIngredients: [
      flag(
        'Mixed tocopherols',
        'cleared',
        labelCite(SUPER_EPA_NSF_CITE, METH.tocopherols),
      ),
      labelCleared(
        SUPER_EPA_NSF_CITE,
        'Gelatin (bovine), purified water and glycerin (vegetable source) gelcap',
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Thorne Super EPA NSF / 90 / 180 twins share ONE formulaId (`thorne-super-epa`) because inactives match (gelatin / water / glycerin ± mixed tocopherols / Vitamin E mixed tocopherols). This row is Super EPA NSF SKU SP608 / 90. Thorne.com alias API 2026-09-12 other-ingredients: Mixed Tocopherols; Gelatin (bovine), Purified Water and Glycerin (vegetable source) gelcap. Mixed tocopherols are Cleared-class antioxidants (v1.6 lock). Gelatin / purified water / glycerin softgel carriers are Cleared. Softgel / gelcap carrier is NOT the gummy seed/industrial-oil High rule and is not an OilInfoRecord. CONFIRMED no natural flavor on this SKU. Separate product id (`thorne-super-epa-nsf`) from the 90 / 180 twins; shared formulaId. Labeled actives: EPA 425mg / DHA 270mg per gelcap as labeled. Contains fish. Contains bovine gelatin. NSF Certified for Sport is a third-party sport-cert claim, not a cleanliness grade driver. Pack sizes of this unflavored gelcap share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${SUPER_EPA_NSF_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: SUPER_EPA_90_ID,
    productName: 'Super EPA (90 gelcaps)',
    brand: BRAND,
    category: VITAMINS,
    barcode: '693749006909',
    formulaId: SUPER_EPA_FORMULA_ID,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'EPA (eicosapentaenoic acid)', strength: '425mg per gelcap' },
      { name: 'DHA (docosahexaenoic acid)', strength: '270mg per gelcap' },
    ],
    inactiveIngredients: [
      labelCleared(
        SUPER_EPA_90_CITE,
        'Gelatin (bovine), purified water and glycerin (vegetable source) gelcap',
      ),
      flag(
        'Vitamin E (mixed tocopherols)',
        'cleared',
        labelCite(SUPER_EPA_90_CITE, METH.tocopherols),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Thorne Super EPA NSF / 90 / 180 twins share ONE formulaId (`thorne-super-epa`) because inactives match. This row is Super EPA SKU SP608NC / 90. Thorne.com alias API 2026-09-12 other-ingredients: Gelatin (bovine), Purified Water and Glycerin (vegetable source) gelcap; Vitamin E (mixed tocopherols). Vitamin E (mixed tocopherols) is Cleared-class antioxidant (v1.6 lock) — same antioxidant class as Mixed Tocopherols on the NSF twin. Gelatin / purified water / glycerin are Cleared. Softgel / gelcap carrier is NOT the gummy seed-oil High rule and is not an OilInfoRecord. CONFIRMED no natural flavor. Separate product id (`thorne-super-epa-90`) from NSF / 180; shared formulaId. Labeled actives: EPA 425mg / DHA 270mg per gelcap as labeled. Contains fish. Contains bovine gelatin. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${SUPER_EPA_90_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: SUPER_EPA_180_ID,
    productName: 'Super EPA (180 gelcaps)',
    brand: BRAND,
    category: VITAMINS,
    barcode: '693749015727',
    formulaId: SUPER_EPA_FORMULA_ID,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'EPA (eicosapentaenoic acid)', strength: '425mg per gelcap' },
      { name: 'DHA (docosahexaenoic acid)', strength: '270mg per gelcap' },
    ],
    inactiveIngredients: [
      labelCleared(
        SUPER_EPA_180_CITE,
        'Gelatin (bovine), purified water and glycerin (vegetable source) gelcap',
      ),
      flag(
        'Vitamin E (mixed tocopherols)',
        'cleared',
        labelCite(SUPER_EPA_180_CITE, METH.tocopherols),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Thorne Super EPA NSF / 90 / 180 twins share ONE formulaId (`thorne-super-epa`) because inactives match. This row is Super EPA SKU SP622NC / 180 — same other-ingredients list as SP608NC. Thorne.com alias API 2026-09-12 other-ingredients: Gelatin (bovine), Purified Water and Glycerin (vegetable source) gelcap; Vitamin E (mixed tocopherols). Vitamin E (mixed tocopherols) is Cleared-class antioxidant. Gelatin / purified water / glycerin are Cleared. Softgel / gelcap carrier is NOT the gummy seed-oil High rule and is not an OilInfoRecord. CONFIRMED no natural flavor. Separate product id (`thorne-super-epa-180`) from NSF / 90; shared formulaId. Labeled actives: EPA 425mg / DHA 270mg per gelcap as labeled. Contains fish. Contains bovine gelatin. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${SUPER_EPA_180_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: SUPER_EPA_PRO_ID,
    productName: 'Super EPA Pro',
    brand: BRAND,
    category: VITAMINS,
    barcode: '693749610014',
    formulaId: SUPER_EPA_PRO_ID,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'EPA (eicosapentaenoic acid)', strength: '1300mg per 2-gelcap serving' },
      { name: 'DHA (docosahexaenoic acid)', strength: '320mg per 2-gelcap serving' },
    ],
    inactiveIngredients: [
      labelCleared(
        SUPER_EPA_PRO_CITE,
        'Gelatin (bovine), purified water and glycerin (vegetable source) gelcap',
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Thorne Super EPA Pro = Clean. OWN formulaId (`thorne-super-epa-pro`) because OI differs from the Super EPA twins (gelatin / water / glycerin gelcap ONLY — no tocopherols). Thorne.com alias API 2026-09-12 SKU SP610 / 120 InStock other-ingredients: Gelatin (bovine), Purified Water and Glycerin (vegetable source) gelcap. Gelatin / purified water / glycerin are Cleared. Softgel / gelcap carrier is NOT the gummy seed-oil High rule and is not an OilInfoRecord. CONFIRMED no mixed tocopherols / Vitamin E and no natural flavor on this SKU. Do not merge with `thorne-super-epa`. Labeled actives: EPA 1300mg / DHA 320mg per 2-gelcap serving as labeled. Contains fish. Contains bovine gelatin. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${SUPER_EPA_PRO_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: OMEGA_COQ10_ID,
    productName: 'Omega-3 with CoQ10',
    brand: BRAND,
    category: VITAMINS,
    barcode: '693749616030',
    formulaId: OMEGA_COQ10_ID,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'EPA (eicosapentaenoic acid)', strength: '450mg per gelcap' },
      { name: 'DHA (docosahexaenoic acid)', strength: '180mg per gelcap' },
      { name: 'Coenzyme Q10', strength: '30mg per gelcap' },
    ],
    inactiveIngredients: [
      flag(
        'Mixed tocopherols',
        'cleared',
        labelCite(OMEGA_COQ10_CITE, METH.tocopherols),
      ),
      labelCleared(
        OMEGA_COQ10_CITE,
        'Gelatin (bovine), purified water and glycerin (vegetable source) gelcap',
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Thorne Omega-3 with CoQ10 = Clean if no flavor (confirmed). Own formulaId. Thorne.com alias API 2026-09-12 SKU SP616 / 90 InStock other-ingredients: Mixed Tocopherols; Gelatin (bovine), Purified Water and Glycerin (vegetable source) gelcap. Mixed tocopherols are Cleared-class antioxidants. Gelatin / purified water / glycerin are Cleared. Softgel / gelcap carrier is NOT the gummy seed-oil High rule and is not an OilInfoRecord. CONFIRMED no natural flavor on this SKU — do not merge with mint / rosemary Advanced or Prenatal DHA (FLAG this pass). Separate formulaId from Super EPA twins and Super EPA Pro. Labeled actives: EPA 450mg / DHA 180mg / CoQ10 30mg per gelcap as labeled. Contains fish. Contains bovine gelatin. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${OMEGA_COQ10_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: VIT_C_FLAV_ID,
    productName: 'Vitamin C with Flavonoids',
    brand: BRAND,
    category: VITAMINS,
    barcode: '693749012481',
    formulaId: VIT_C_FLAV_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Vitamin C (as ascorbic acid)', strength: '500mg' },
      { name: 'Citrus bioflavonoids', strength: '75mg' },
    ],
    inactiveIngredients: [
      labelCleared(VIT_C_FLAV_CITE, 'Cellulose powder'),
      flag(
        'Calcium laurate',
        'cleared',
        labelCite(VIT_C_FLAV_CITE, METH.calciumLaurate),
      ),
      labelCleared(
        VIT_C_FLAV_CITE,
        'Hypromellose (derived from cellulose) capsule',
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Thorne Vitamin C with Flavonoids = Clean (no SiO2). Thorne.com alias API 2026-09-12 SKU C154 / 90 InStock other-ingredients: Cellulose Powder; Calcium Laurate; Hypromellose (derived from cellulose) capsule. Cellulose powder / HPMC are Cleared. Calcium laurate is Cleared-by-class with magnesium stearate / stearic acid / calcium stearate (founder stack, same as Basic Prenatal). CONFIRMED no silicon dioxide on that matched list. Separate formulaId from reuse-only Thorne Vitamin C as Ascorbic Acid (`thorne-vitamin-c-ascorbic-acid`) — do not rewrite that row. Labeled actives: Vitamin C (as ascorbic acid) 500mg + citrus bioflavonoids 75mg as labeled. Pack sizes share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${VIT_C_FLAV_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: BUFFERED_C_ID,
    productName: 'High Potency Vitamin C (buffered powder)',
    brand: BRAND,
    category: VITAMINS,
    barcode: '693749155027',
    formulaId: BUFFERED_C_ID,
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Vitamin C (as ascorbic acid)', strength: '2.35g per scoop' },
      { name: 'Calcium (ascorbate)', strength: '350mg' },
      { name: 'Magnesium (ascorbate)', strength: '350mg' },
      { name: 'Potassium (ascorbate)', strength: '99mg' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Thorne High Potency Vitamin C buffered powder = Clean. Thorne.com alias API 2026-09-12 SKU C155 InStock other-ingredients: none — API lists only Calcium (Ascorbate), Magnesium (Ascorbate), Potassium (Ascorbate), and Vitamin C (as Ascorbic Acid) as actives. Pure / actives-only powder with no scored inactives. Form: powder. Separate formulaId from in-batch Vitamin C with Flavonoids and from reuse-only Thorne Vitamin C as Ascorbic Acid. Labeled actives from the alias API: Vitamin C 2.35g + calcium ascorbate 350mg + magnesium ascorbate 350mg + potassium ascorbate 99mg per scoop as labeled. Pack sizes share formulaId when the other-ingredients list holds (still empty). No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${BUFFERED_C_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: ASHWAGANDHA_ID,
    productName: 'Ashwagandha',
    brand: BRAND,
    category: VITAMINS,
    barcode: '693749015543',
    formulaId: ASHWAGANDHA_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Ashwagandha extract (root, leaf)', strength: '120mg' },
    ],
    inactiveIngredients: [
      labelCleared(ASHWAGANDHA_CITE, 'Microcrystalline cellulose'),
      labelCleared(
        ASHWAGANDHA_CITE,
        'Hypromellose (derived from cellulose) capsule',
      ),
      flag(
        'Ascorbyl palmitate',
        'cleared',
        labelCite(ASHWAGANDHA_CITE, METH.tocopherols),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Thorne Ashwagandha = Clean. Thorne.com alias API 2026-09-12 SKU SF828 InStock other-ingredients: Microcrystalline Cellulose; Hypromellose (derived from cellulose) capsule; Ascorbyl Palmitate. MCC / HPMC are Cleared. Ascorbyl palmitate is Cleared-class antioxidant (v1.6 lock). Cleared-only OI → Clean. Labeled active: ashwagandha extract (root, leaf) 120mg as labeled. This draft grades inactives only and makes no efficacy claim. Pack sizes share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${ASHWAGANDHA_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: BERBERINE_ID,
    productName: 'Berberine',
    brand: BRAND,
    category: VITAMINS,
    barcode: BATCH28_CATCHUP_BARCODES[BERBERINE_ID],
    formulaId: BERBERINE_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Berberine HCl (from Indian Barberry extract) (root)',
        strength: '450mg per serving as labeled',
      },
      { name: 'Berberine phytosome', strength: '550mg per serving as labeled' },
    ],
    inactiveIngredients: [
      flag(
        'Calcium laurate',
        'cleared',
        labelCite(BERBERINE_CITE, METH.calciumLaurate),
      ),
      labelCleared(
        BERBERINE_CITE,
        'Hypromellose (derived from cellulose) capsule',
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Thorne Berberine = Clean. Thorne.com alias API 2026-09-12 SKU SF800 InStock other-ingredients: Calcium Laurate; Hypromellose (derived from cellulose) capsule. HPMC is Cleared. Calcium laurate is Cleared-by-class (founder stack, same as Basic Prenatal). Cleared-only OI → Clean. Labeled actives from the alias API: berberine HCl 450mg + berberine phytosome 550mg per serving as labeled. This draft grades inactives only and makes no efficacy claim. Pack sizes share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${BERBERINE_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: GLYCINE_ID,
    productName: 'Glycine',
    brand: BRAND,
    category: VITAMINS,
    barcode: BATCH28_CATCHUP_BARCODES[GLYCINE_ID],
    formulaId: GLYCINE_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Glycine', strength: '1g' }],
    inactiveIngredients: [
      labelCleared(
        GLYCINE_CITE,
        'Hypromellose (derived from cellulose) capsule',
      ),
      labelCleared(GLYCINE_CITE, 'Cellulose powder'),
      flag(
        'Calcium laurate',
        'cleared',
        labelCite(GLYCINE_CITE, METH.calciumLaurate),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Thorne Glycine = Clean. Thorne.com alias API 2026-09-12 SKU SA512 InStock other-ingredients: Hypromellose (derived from cellulose) capsule; Cellulose Powder; Calcium Laurate. HPMC / cellulose powder are Cleared. Calcium laurate is Cleared-by-class (founder stack, same as Basic Prenatal). Cleared-only OI → Clean. Labeled active: glycine 1g as labeled. Pack sizes share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${GLYCINE_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: SELENIUM_ID,
    productName: 'Selenium (selenomethionine)',
    brand: BRAND,
    category: VITAMINS,
    barcode: '693749225010',
    formulaId: SELENIUM_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Selenium (selenomethionine)', strength: '200mcg' },
    ],
    inactiveIngredients: [
      labelCleared(SELENIUM_CITE, 'Microcrystalline cellulose'),
      labelCleared(
        SELENIUM_CITE,
        'Hypromellose (derived from cellulose) capsule',
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Thorne Selenium (selenomethionine) = Clean. Thorne.com alias API 2026-09-12 SKU M225 InStock other-ingredients: Microcrystalline Cellulose; Hypromellose (derived from cellulose) capsule. MCC / HPMC are Cleared. Cleared-only OI → Clean. Labeled active: selenium (selenomethionine) 200mcg as labeled. Pack sizes share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${SELENIUM_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: NIACINAMIDE_ID,
    productName: 'Niacinamide',
    brand: BRAND,
    category: VITAMINS,
    barcode: '693749131021',
    formulaId: NIACINAMIDE_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Niacin (as niacinamide)', strength: '500mg' },
    ],
    inactiveIngredients: [
      labelCleared(
        NIACINAMIDE_CITE,
        'Hypromellose (derived from cellulose) capsule',
      ),
      flag(
        'Calcium laurate',
        'cleared',
        labelCite(NIACINAMIDE_CITE, METH.calciumLaurate),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Thorne Niacinamide = Clean. Thorne.com alias API 2026-09-12 SKU B131 InStock other-ingredients: Hypromellose (derived from cellulose) capsule; Calcium Laurate. HPMC is Cleared. Calcium laurate is Cleared-by-class (founder stack, same as Basic Prenatal). Cleared-only OI → Clean. Labeled active: niacin (as niacinamide) 500mg as labeled. Pack sizes share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${NIACINAMIDE_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: CREATINE_ID,
    productName: 'Creatine powder',
    brand: BRAND,
    category: VITAMINS,
    barcode: '693749006350 693749015239',
    formulaId: CREATINE_ID,
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Creatine monohydrate', strength: '5g per scoop' },
    ],
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Thorne Creatine powder = Clean. Thorne.com alias API 2026-09-12 SKU SF903 InStock other-ingredients: none — creatine monohydrate only. Pure powder with no scored inactives. Form: powder. Labeled active: creatine monohydrate 5g per scoop as labeled. Pack sizes share formulaId when the other-ingredients list holds (still empty). No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${CREATINE_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: GLUTAMINE_ID,
    productName: 'L-Glutamine Powder',
    brand: BRAND,
    category: VITAMINS,
    barcode: '693749519027',
    formulaId: GLUTAMINE_ID,
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'L-Glutamine', strength: '5g per scoop' }],
    inactiveIngredients: [],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Thorne L-Glutamine Powder = Clean. Thorne.com alias API 2026-09-12 SKU SA519 InStock other-ingredients: none — L-glutamine only. Pure powder with no scored inactives. Form: powder. Labeled active: L-glutamine 5g per scoop as labeled. Pack sizes share formulaId when the other-ingredients list holds (still empty). No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${GLUTAMINE_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: CALCIUM_ID,
    productName: 'Calcium (DiCalcium Malate)',
    brand: BRAND,
    category: VITAMINS,
    barcode: '693749006503',
    formulaId: CALCIUM_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Calcium (as DiCalcium Malate)', strength: '250mg' },
    ],
    inactiveIngredients: [
      labelCleared(
        CALCIUM_CITE,
        'Hypromellose (derived from cellulose) capsule',
      ),
      flag(
        'Calcium laurate',
        'cleared',
        labelCite(CALCIUM_CITE, METH.calciumLaurate),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Thorne Calcium (DiCalcium Malate) = Clean. Thorne.com alias API 2026-09-12 SKU M281 InStock other-ingredients: Hypromellose (derived from cellulose) capsule; Calcium Laurate. HPMC is Cleared. Calcium laurate is Cleared-by-class (founder stack, same as Basic Prenatal). Cleared-only OI → Clean. Labeled active: calcium (as DiCalcium Malate) 250mg as labeled. Pack sizes share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${CALCIUM_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: PC_ID,
    productName: 'Phosphatidyl Choline',
    brand: BRAND,
    category: VITAMINS,
    barcode: '693749605010',
    formulaId: PC_ID,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Phosphatidylcholine', strength: '420mg per gelcap' },
    ],
    inactiveIngredients: [
      labelCleared(
        PC_CITE,
        'Gelatin (bovine), purified water and glycerin (vegetable source) gelcap',
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Thorne Phosphatidyl Choline = Clean. Thorne.com alias API 2026-09-12 SKU SP605 InStock other-ingredients: Gelatin (bovine), Purified Water and Glycerin (vegetable source) gelcap. Gelatin / purified water / glycerin softgel carriers are Cleared. Softgel / gelcap carrier is NOT the gummy seed-oil High rule and is not an OilInfoRecord. CONFIRMED no flavor / tocopherols on that matched list. Labeled active: phosphatidylcholine 420mg per gelcap as labeled. Contains bovine gelatin. Pack sizes share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${PC_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: GLUCOSAMINE_ID,
    productName: 'Glucosamine & Chondroitin',
    brand: BRAND,
    category: VITAMINS,
    barcode: '693749767022',
    formulaId: GLUCOSAMINE_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Glucosamine sulfate (potassium chloride)',
        strength: '500mg',
      },
      { name: 'Chondroitin sulfate', strength: '250mg' },
    ],
    inactiveIngredients: [
      labelCleared(GLUCOSAMINE_CITE, 'Hypromellose capsule'),
      flag(
        'Calcium laurate',
        'cleared',
        labelCite(GLUCOSAMINE_CITE, METH.calciumLaurate),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Thorne Glucosamine & Chondroitin = Clean. Thorne.com alias API 2026-09-12 SKU SF767 InStock other-ingredients: Hypromellose Capsule; Calcium Laurate. HPMC capsule is Cleared. Calcium laurate is Cleared-by-class (founder stack, same as Basic Prenatal). Cleared-only OI → Clean. Labeled actives: glucosamine sulfate (potassium chloride) 500mg + chondroitin sulfate 250mg as labeled. This draft grades inactives only and makes no efficacy claim. Pack sizes share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${GLUCOSAMINE_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: NIACEL_ID,
    productName: 'NiaCel® 400',
    brand: BRAND,
    category: VITAMINS,
    barcode: BATCH28_CATCHUP_BARCODES[NIACEL_ID],
    formulaId: NIACEL_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Nicotinamide riboside hydrogen malate',
        strength: '415mg',
      },
      {
        name: 'Betaine anhydrous (trimethylglycine)',
        strength: '85mg',
      },
    ],
    inactiveIngredients: [
      labelCleared(
        NIACEL_CITE,
        'Hypromellose (derived from cellulose) capsule',
      ),
      flag(
        'Ascorbyl palmitate',
        'cleared',
        labelCite(NIACEL_CITE, METH.tocopherols),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Thorne NiaCel® 400 = Clean. Thorne.com alias API 2026-09-12 SKU SP654 InStock other-ingredients: Hypromellose (derived from cellulose) capsule; Ascorbyl Palmitate. HPMC is Cleared. Ascorbyl palmitate is Cleared-class antioxidant (v1.6 lock). Cleared-only OI → Clean. Labeled actives: nicotinamide riboside hydrogen malate 415mg + betaine anhydrous (trimethylglycine) 85mg as labeled. This draft grades inactives only and makes no efficacy claim. Pack sizes share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    sourcesGeneral: [
      `${NIACEL_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },

  // ── Caution ──────────────────────────────────────────────
  {
    id: MELATON_3_ID,
    productName: 'Melaton-3',
    brand: BRAND,
    category: SLEEP,
    barcode: '693749788027',
    formulaId: MELATON_3_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Melatonin', strength: '3mg' }],
    inactiveIngredients: [
      labelCleared(MELATON_3_CITE, 'Microcrystalline cellulose'),
      flag('Silicon dioxide', 'cleared', labelCite(MELATON_3_CITE, METH.sio2)),
      flag(
        'Calcium laurate',
        'cleared',
        labelCite(MELATON_3_CITE, METH.calciumLaurate),
      ),
      labelCleared(
        MELATON_3_CITE,
        'Hypromellose (derived from cellulose) capsule',
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Thorne Melaton-3 = Caution (SiO2 cap). Sleep · adult. Thorne.com alias API 2026-09-12 SKU SF788 InStock other-ingredients: Microcrystalline Cellulose; Silicon Dioxide; Calcium Laurate; Hypromellose (derived from cellulose) capsule. MCC / HPMC are Cleared. Calcium laurate is Cleared-by-class (founder stack, same as Basic Prenatal) and does not raise the grade. Silicon dioxide is the nanoparticle Caution cap (0 demerit points) — same encoding as batch 15 / 24 / 25 / 27 (`riskLevel: \'cleared\'` + METH.sio2 source; verdict caution, NOT avoid). Do not invent Clean on the SiO2 cap. Separate formulaId from Melaton-5 (different strength; OI wording also differs). Active is melatonin 3mg as labeled. Cleanliness grade only; no efficacy claim. Pack sizes share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. No independently Clean in-batch Thorne sleep — cleanAlternatives point at existing Clean PE Melatonin-SR 3 mg on main (form labeled §6).',
    retailers: [...RETAILERS],
    cleanAlternatives: MELATON_ALTS,
    sourcesGeneral: [
      `${MELATON_3_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: MELATON_5_ID,
    productName: 'Melaton-5',
    brand: BRAND,
    category: SLEEP,
    barcode: '693749780021',
    formulaId: MELATON_5_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Melatonin', strength: '5mg' }],
    inactiveIngredients: [
      labelCleared(MELATON_5_CITE, 'Hypromellose capsule'),
      labelCleared(MELATON_5_CITE, 'Microcrystalline cellulose'),
      flag('Silicon dioxide', 'cleared', labelCite(MELATON_5_CITE, METH.sio2)),
      flag(
        'Calcium laurate',
        'cleared',
        labelCite(MELATON_5_CITE, METH.calciumLaurate),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Thorne Melaton-5 = Caution (SiO2). Sleep · adult. Thorne.com alias API 2026-09-12 SKU SF780 InStock other-ingredients: Hypromellose Capsule; Microcrystalline Cellulose; Silicon Dioxide; Calcium Laurate. HPMC / MCC are Cleared. Calcium laurate is Cleared-by-class and does not raise the grade. Silicon dioxide is the nanoparticle Caution cap (0 demerit points) — same encoding as batch 15 / 24 / 25 / 27 (`riskLevel: \'cleared\'` + METH.sio2 source; verdict caution, NOT avoid). Do not invent Clean on the SiO2 cap. Separate formulaId from Melaton-3. Active is melatonin 5mg as labeled. Cleanliness grade only; no efficacy claim. Pack sizes share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. No independently Clean in-batch Thorne sleep — cleanAlternatives point at existing Clean PE Melatonin-SR 3 mg on main (form labeled §6).',
    retailers: [...RETAILERS],
    cleanAlternatives: MELATON_ALTS,
    sourcesGeneral: [
      `${MELATON_5_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: ADVANCED_NUTRIENTS_ID,
    productName: 'Advanced Nutrients',
    brand: BRAND,
    category: VITAMINS,
    barcode: '693749017066',
    formulaId: ADVANCED_NUTRIENTS_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      {
        name: 'Advanced Nutrients multivitamin / multimineral',
        strength: '4 capsules (label serving)',
      },
      { name: 'Vitamin C (as ascorbic acid)', strength: '425mg' },
      { name: 'Vitamin D (as cholecalciferol) (D3)', strength: '25mcg' },
      {
        name: 'Folate (as L-5-methyltetrahydrofolate from L-5-methyltetrahydrofolic acid, glucosamine salt)',
        strength: '850mcg DFE',
      },
      { name: 'Zinc (as zinc bisglycinate)', strength: '7.5mg' },
    ],
    inactiveIngredients: [
      labelCleared(ADVANCED_NUTRIENTS_CITE, 'Microcrystalline cellulose'),
      flag(
        'Silicon dioxide',
        'cleared',
        labelCite(ADVANCED_NUTRIENTS_CITE, METH.sio2),
      ),
      flag(
        'Calcium laurate',
        'cleared',
        labelCite(ADVANCED_NUTRIENTS_CITE, METH.calciumLaurate),
      ),
      labelCleared(
        ADVANCED_NUTRIENTS_CITE,
        'Hypromellose (derived from cellulose) capsule',
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Thorne Advanced Nutrients = Caution (SiO2). Multi. Thorne.com alias API 2026-09-12 SKU VMX InStock other-ingredients: Microcrystalline Cellulose; Silicon Dioxide; Calcium Laurate; Hypromellose (derived from cellulose) capsule. MCC / HPMC are Cleared. Calcium laurate is Cleared-by-class and does not raise the grade. Silicon dioxide is the nanoparticle Caution cap (0 demerit points) — same encoding as batch 15 / 24 / 25 / 27 (`riskLevel: \'cleared\'` + METH.sio2 source; verdict caution, NOT avoid). Do not invent Clean on the SiO2 cap. Separate formulaId from in-batch Clean Women\'s / Men\'s Multi 50+. Labeled actives listed neutrally from the alias API (not an efficacy claim): 4-capsule serving including Vitamin C 425mg, Vitamin D3 25mcg, folate 850mcg DFE, zinc (as zinc bisglycinate) 7.5mg as labeled. This draft grades inactives only. Pack sizes share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft. ' +
      ZINC_PARKED,
    retailers: [...RETAILERS],
    cleanAlternatives: ADVANCED_NUTRIENTS_ALTS,
    sourcesGeneral: [
      `${ADVANCED_NUTRIENTS_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: MAG_CITRATE_ID,
    productName: 'Magnesium Citrate powder',
    brand: BRAND,
    category: VITAMINS,
    barcode: '693749015987',
    formulaId: MAG_CITRATE_ID,
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Magnesium (as magnesium citrate)',
        strength: '250mg per scoop',
      },
    ],
    inactiveIngredients: [
      flag(
        'Natural flavor',
        'limited',
        labelCite(MAG_CITRATE_CITE, METH.flavors),
      ),
      labelCleared(MAG_CITRATE_CITE, 'Citric acid'),
      flag(
        'Monk fruit extract',
        'cleared',
        labelCite(MAG_CITRATE_CITE, METH.monkFruit),
      ),
      labelCleared(MAG_CITRATE_CITE, 'Sodium bicarbonate'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Thorne Magnesium Citrate powder = Caution (natural flavor only). Thorne.com alias API 2026-09-12 SKU M286 InStock other-ingredients: Natural Flavor; Citric Acid; Monk Fruit extract; Sodium Bicarbonate. Driver is natural flavor (Limited-risk opacity) — verdict caution when that is the driver. Citric acid is Cleared. Monk fruit extract is Cleared (v1.6 high-purity extract lock). Sodium bicarbonate is Cleared. Do not invent Clean on the flavor. Do not open a new Mag glycinate row and do not rewrite reuse-only `thorne-magnesium-glycinate-capsules` (existing Caution; Thorne.com MCT listing is already notes-only on that row). Separate formulaId from reuse-only Clean Thorne Magnesium Bisglycinate powder. Form: powder. Active is magnesium (as magnesium citrate) 250mg per scoop as labeled. Pack sizes share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...RETAILERS],
    cleanAlternatives: MAG_CITRATE_ALTS,
    sourcesGeneral: [
      `${MAG_CITRATE_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
];

for (const record of BATCH28_THORNE_COM) {
  const expected = BATCH28_CATCHUP_BARCODES[record.id];
  if (expected && record.barcode !== expected) {
    throw new Error(`batch 28 catch-up UPC drift on ${record.id}`);
  }
}
