// DRAFT / not verified / batch 16 365+Sprouts house / founder calls locked /
// R1 reuse only / H6 skipped / methodology untouched / zinc parked /
// pregnancy notes without medical advice / H2 ≠ Mucinex Blue #1 /
// H3 new SSG formulaId not L612.
//
// 365 Whole Foods Market + Sprouts house-brand RatingRecords.
// Mixed categories · audience 'adult' · recordStatus is 'unverified' on every
// row. Founder calls (locked): see notes below. Do NOT invent Clean except
// H3 as locked. Methodology v1.6 grades only — do not change locked
// ingredient grades. Barcodes omitted except KYR5-b catch-up allowlist. Pack sizes
// share formulaId. HFCS is parked (Methodology §5) — mentioned in
// honestNotes only, never graded. Form is labeled on cleanAlternatives,
// not a hard filter (§6).
// Not wired into Clean Picks UI. No live Clean Picks file is edited from
// this draft. Methodology.md / PROJECT_NOTES.md are untouched.
//
// REUSE ONLY (do not regrade / do not add a new grade row):
// - R1 365 Extra Strength Acetaminophen already exists on main as product
//   id `wf-365-acetaminophen-es` sharing formulaId `apap-store-es-l484-peg`
//   (batch 1). Mentioned here only — no new RatingRecord.
//
// FOUNDER CALLS (LOCKED) — approved rows only:
// AVOID
// - H1 365 Ibuprofen 200 mg film-coated = Avoid. TiO2 High (+ iron oxide
//   red/yellow on SPL — ungraded v1.6 intake; PEG Moderate; SiO2 Caution
//   cap). DailyMed setid e914472b.
// - H9 365 Probiotic + Fiber gummies = Avoid. Organic sunflower seed oil
//   = seed/industrial oil High in gummies + natural flavor Limited.
//   WFM product ingredients.
// - H12 TWO rows (both SKUs exist; same TiO2 vegetable coating; separate
//   formulaIds): `365-calcium-d3-tio2` and `365-cal-mag-zinc-d3-tio2`.
//   Avoid TiO2 in vegetable coating. Cite WFM other ingredients. Zinc
//   parked on Cal-Mag-Zinc.
// CAUTION
// - H2 365 Guaifenesin ER 600 mg = Caution. Colloidal silicon dioxide
//   Caution cap only. NO TiO2 / dye. MUST stay separate from
//   `mucinex-er-600-blue1` Avoid. DailyMed setid 7c890031.
// - H4 365 Cetirizine HCl 10 mg dye-free softgels = Caution. PEG Moderate.
//   DailyMed dye-free WFM setid 453b20b5.
// - H5 365 Diphenhydramine HCl 25 mg dye-free softgels = Caution. PEG
//   Moderate. ONE formulaId, ONE category: 'Allergy'. HonestNote may say
//   the same SKU is also sold/used as a nighttime sleep aid — do not
//   invent a second grade or dual category field. DailyMed setid 32352109.
// - H7 365 Elderberry gummies = Caution. Natural flavors Limited; no
//   palm/canola/veg/sunflower oil on matched Fig other-ingredients.
// - H8 365 / Whole Foods Market Health Ultra Strength Natural Antacid
//   Peppermint (CaCO3 1000 mg) = Caution. Maltodextrin + natural flavors
//   Limited; stevia Cleared-class; talc-free. DailyMed setid a2dc800d.
// - H10 365 Adult Once Daily Multi = Caution. SiO2 Caution cap; MCC /
//   stearate / veg coating CMC — no TiO2 on WFM list. Zinc parked if on
//   label.
// - H11 365 Men's One Daily Multi = Caution. Same SiO2 pattern. Zinc
//   parked.
// - H13 365 Prenatal Multi Once Daily = Caution. SiO2. Category Vitamins
//   (prenatal). HonestNote: labeled for pregnancy — no dosing / medical
//   advice. Zinc parked.
// - H14 Sprouts Organic Prenatal Once Daily Whole Food Multi = Caution
//   until full label matched — do NOT invent Clean. Confirm carton for
//   SiO2 / coatings. retailers: ['Sprouts'].
// - H15 Sprouts Organic Prenatal Whole Food Vitamin = Caution until full
//   label matched — do NOT invent Clean. retailers: ['Sprouts'].
// CLEAN
// - H3 365 Loratadine 10 mg tablets = Clean. DailyMed setid bba4e7c8
//   inactives: lactose monohydrate, magnesium stearate, pregelatinized
//   starch (maize), sodium starch glycolate. NOT `loratadine-l612-plain`
//   (lactose / Mg stearate / povidone / pregelatinized starch — HAS
//   povidone, no SSG) and NOT `claritin-allergy-tablets-plain` (corn
//   starch / lactose / Mg stearate — no SSG). New formulaId
//   `365-loratadine-plain-ssg`.
//
// TALLY (unverified drafts): 15 rows — Clean 1 / Caution 10 / Avoid 4.
// R1 is not counted. Independently Clean in THIS batch: H3 loratadine
// SSG only. cleanAlternatives: H3 points at batch 5 Clean plain
// loratadines (`claritin-allergy-tablets-plain`,
// `equate-loratadine-tablets-plain` L612). No loratadine Avoid in this
// batch; cetirizine / DPH are different actives — no same-active H3
// swap. Other categories omit cleanAlternatives (no Clean in-batch swap;
// same pattern as batch 14 / 15).
//
// SKIPPED (founder skip — do not invent Clean / do not write):
// - H6 365 Melatonin gummies (oil not confirmed)
// - Blank Sprouts house OTC with no NDC
// - First-aid house blanks
// - Amazon-only
//
// ZINC IS PARKED (Methodology v1.6): never invent an active-safety grade.
// Grade inactives only. Zinc-containing rows' honestNotes say zinc is
// parked. Silicon dioxide / silica = Caution cap, not Avoid alone.
// Seed / industrial oils in gummies (sunflower, palm, canola, vegetable
// oil, soybean) = High Avoid. Honest notes may say a carton is labeled
// for pregnancy / prenatal use. No dosing. No medical advice.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const VITAMIN = 'Vitamin' as const;
const SUPPLEMENT = 'Supplement' as const;

const PAIN_FEVER = 'Pain & Fever';
const COLD_FLU = 'Cold & Flu';
const ALLERGY = 'Allergy';
const DIGESTIVE = 'Digestive';
const IMMUNE = 'Immune Support';
const VITAMINS = 'Vitamins';

const METH = {
  tio2: 'Methodology §5 High-tier (titanium dioxide / E171)',
  seedOilGummies:
    'Methodology §5 High-tier (seed/industrial oils in gummies — soybean, canola, palm, "vegetable oil", sunflower)',
  peg: 'Methodology §5 Moderate-risk (PEGs — ethylene-oxide / 1,4-dioxane contamination risk)',
  pg: 'Methodology §5 Moderate-risk (propylene glycol, oral)',
  ps80: 'Methodology §5 Moderate-risk (polysorbate 80)',
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  maltodextrin: 'Methodology §5 Limited-risk (non-organic maltodextrin)',
  mannitol: 'Methodology §5 Limited-risk (sugar alcohols — mannitol)',
  sorbitol: 'Methodology §5 Limited-risk (sugar alcohols — sorbitol)',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  stevia:
    'Methodology §5 Cleared (stevia / steviol glycosides, high-purity extract — locked v1.6; founder Cleared-class on this carton)',
  gums: 'Methodology §5 Cleared (xanthan gum / gum arabic / guar / pectin / acacia — locked v1.6)',
  cleared: 'Methodology §5 Cleared',
} as const;

function flag(
  name: string,
  riskLevel: IngredientFlag['riskLevel'],
  source: string,
): IngredientFlag {
  return { name, riskLevel, source };
}

function dailymed(setid: string, meth: string): string {
  return `DailyMed setid ${setid}; ${meth}`;
}

function cleared(setid: string, name: string): IngredientFlag {
  return flag(name, 'cleared', dailymed(setid, METH.cleared));
}

function labelCite(label: string, meth: string): string {
  return `${label}; ${meth}`;
}

function labelCleared(label: string, name: string): IngredientFlag {
  return flag(name, 'cleared', labelCite(label, METH.cleared));
}

const ZINC_PARKED =
  'Zinc (oxide / citrate / other labeled zinc salts) is parked as of Methodology v1.6 — active-safety-cap review is not done. This draft grades inactives only and does not invent an active-safety grade for zinc.';

const PRENATAL_LABEL =
  'Carton is labeled for prenatal / pregnancy use. No dosing or medical advice in this draft.';

const SET_IBU = 'e914472b-c785-4c73-b37c-4d459166cf41';
const SET_GUAIF = '7c890031-8188-48be-bb69-06db0e01a0c0';
const SET_LORATADINE = 'bba4e7c8-db8e-4522-915c-48ee809e3bce';
const SET_CETIRIZINE = '453b20b5-72a7-ac09-e063-6394a90afc4b';
const SET_DPH = '32352109-31dc-8e6f-e063-6294a90a2f92';
const SET_ANTACID = 'a2dc800d-ac43-4118-9e7b-a55ee7d51c53';

const H3_ID = '365-loratadine-plain-ssg';
const H3_FORMULA = '365-loratadine-plain-ssg';

const WFM_PROBIOTIC_CITE =
  '365 / Whole Foods Market Probiotic + Fiber gummies product ingredients (inulin, organic evaporated cane sugar, pectin, citric acid, natural flavor, sodium citrate, organic sunflower seed oil, organic carnauba wax, colors from juices, cornstarch)';
const FIG_ELDERBERRY_CITE =
  '365 Elderberry gummies Fig other-ingredients (evaporated cane sugar, organic tapioca syrup, pectin, citric acid, sodium citrate, natural flavors — no palm / canola / vegetable / sunflower oil)';
const WFM_CALCIUM_CITE =
  '365 / Whole Foods Market Calcium with Vitamin D3 other ingredients (vegetable coating: HPMC, titanium dioxide [for color], sodium CMC)';
const WFM_CALMAG_CITE =
  '365 / Whole Foods Market Cal-Mag-Zinc with Vitamin D3 other ingredients (same TiO2 vegetable coating as Calcium + D3)';
const WFM_ADULT_MULTI_CITE =
  '365 / Whole Foods Market Adult Once Daily Multi other ingredients (MCC / vegetable stearic acid / SiO2 / croscarmellose / vegetable magnesium stearate / vegetable coating sodium CMC — no TiO2 on WFM list)';
const WFM_MENS_MULTI_CITE =
  '365 / Whole Foods Market Men\'s One Daily Multi other ingredients (MCC / SiO2 / vegetable stearic acid / croscarmellose / vegetable magnesium stearate / vegetable coating sodium CMC — no TiO2 on matched Instacart / WFM-family lists)';
const WFM_PRENATAL_CITE =
  '365 Prenatal Multi Once Daily HelloPharmacist / retailer other-ingredients (MCC / stearic acid / SiO2 / croscarmellose / magnesium stearate — no TiO2 on that list)';
const SPROUTS_ONCE_CITE =
  'Sprouts Organic Prenatal Once Daily Whole Food Multi shop.sprouts listing (SKU exists; full other-ingredients not matched)';
const SPROUTS_WHOLE_CITE =
  'Sprouts Organic Prenatal Whole Food Vitamin shop.sprouts listing (SKU exists; full other-ingredients not matched)';

// KYR5-b in-store Sprouts chunk 2 — official shop.sprouts PDP "UPC:" field
// (GTIN-14 00+UPC-A → 12-digit UPC-A). 30 ct + 60 ct Once Daily share formulaId.
// KYR5-b in-store 365 — Amazon UPC/model + HelloPharmacist/DSLD + WFM
// image GTIN (GTIN-13 0+UPC-A → 12-digit UPC-A). Pack extras share formulaId.
const BATCH16_CATCHUP_BARCODES: Record<string, string> = {
  'sprouts-organic-prenatal-once-daily': '646670548536 646670548529',
  'sprouts-organic-prenatal-whole-food': '646670549984',
  '365-adult-once-daily-multi': '099482402075 099482406455',
  '365-mens-one-daily-multi': '099482418502 099482418519',
  '365-prenatal-multi': '099482420819',
  '365-elderberry-gummies': '099482487591',
  '365-probiotic-fiber-gummies-sunflower': '099482476601',
  '365-calcium-d3-tio2': '099482285395',
  '365-cal-mag-zinc-d3-tio2': '099482286972',
  [H3_ID]: '099482540739',
  '365-guaifenesin-er-600': '099482547868',
  '365-cetirizine-softgels-peg': '099482543860',
  '365-diphenhydramine-softgels-peg': '099482553814',
  '365-antacid-peppermint-ultra': '099482488185',
  '365-ibuprofen-200-tio2': '099482470777',
};

const H3_ALTS: CleanAlternative[] = [
  {
    productId: 'claritin-allergy-tablets-plain',
    rankReason:
      'Independently Clean adult plain loratadine 10 mg tablets already graded in batch 5 (corn starch / lactose / magnesium stearate, no TiO2). Form: tablet. Different formula from this 365 SSG row — not reused.',
  },
  {
    productId: 'equate-loratadine-tablets-plain',
    rankReason:
      'Independently Clean L612 store-brand plain loratadine (lactose / magnesium stearate / povidone / pregelatinized starch). Form: tablet. This 365 row is a different SSG formula — do not reuse L612.',
  },
];

export const BATCH16_365_SPROUTS: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  {
    id: H3_ID,
    productName: '365 Whole Foods Market Loratadine 10 mg Tablets',
    brand: '365 Whole Foods Market',
    category: ALLERGY,
    barcode: BATCH16_CATCHUP_BARCODES[H3_ID],
    formulaId: H3_FORMULA,
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Loratadine', strength: '10mg' }],
    inactiveIngredients: [
      cleared(SET_LORATADINE, 'Lactose monohydrate'),
      cleared(SET_LORATADINE, 'Magnesium stearate'),
      cleared(SET_LORATADINE, 'Pregelatinized starch (maize)'),
      cleared(SET_LORATADINE, 'Sodium starch glycolate'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: 365 Loratadine 10 mg tablets = Clean if inactives are only lactose / magnesium stearate / starch / SSG. DailyMed setid bba4e7c8 lists lactose monohydrate, magnesium stearate, pregelatinized starch (maize), sodium starch glycolate — match. This is NOT `loratadine-l612-plain` (lactose / Mg stearate / povidone / pregelatinized starch — HAS povidone, no SSG) and NOT `claritin-allergy-tablets-plain` (corn starch / lactose / Mg stearate — no SSG). New formulaId `365-loratadine-plain-ssg`. Other Clean plain loratadines already exist in batch 5; cleanAlternatives point at those productIds. Contains lactose. Ages 6+.',
    retailers: ['Whole Foods'],
    cleanAlternatives: H3_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_LORATADINE} (365 loratadine SSG plain; draft, not verified)`,
    ],
  },

  // ── Caution ──────────────────────────────────────────────
  {
    id: '365-guaifenesin-er-600',
    productName: '365 Whole Foods Market Guaifenesin ER 600 mg',
    brand: '365 Whole Foods Market',
    category: COLD_FLU,
    barcode: BATCH16_CATCHUP_BARCODES['365-guaifenesin-er-600'],
    formulaId: '365-guaifenesin-er-600',
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Guaifenesin', strength: '600mg' }],
    inactiveIngredients: [
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET_GUAIF, METH.sio2),
      ),
      cleared(SET_GUAIF, 'Hypromellose'),
      cleared(SET_GUAIF, 'Magnesium stearate'),
      cleared(SET_GUAIF, 'Microcrystalline cellulose'),
      cleared(SET_GUAIF, 'Povidone'),
      cleared(SET_GUAIF, 'Pregelatinized starch (maize)'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: 365 Guaifenesin ER 600 mg = Caution. Driver is colloidal silicon dioxide (nanoparticle Caution cap, 0 demerit points). DailyMed setid 7c890031 lists colloidal silicon dioxide, hypromellose, magnesium stearate, microcrystalline cellulose, povidone, pregelatinized starch (maize) — NO titanium dioxide and NO synthetic dye. MUST stay a separate formulaId from `mucinex-er-600-blue1` (Avoid; Blue #1 lake). Do not merge them. Ages 12+ (under 12: do not use).',
    retailers: ['Whole Foods'],
    sourcesGeneral: [
      `DailyMed setid ${SET_GUAIF} (365 guaifenesin ER 600; draft, not verified) — not mucinex-er-600-blue1`,
    ],
  },
  {
    id: '365-cetirizine-softgels-peg',
    productName: '365 Whole Foods Market Cetirizine HCl 10 mg Dye-Free Softgels',
    brand: '365 Whole Foods Market',
    category: ALLERGY,
    barcode: BATCH16_CATCHUP_BARCODES['365-cetirizine-softgels-peg'],
    formulaId: '365-cetirizine-softgels-peg',
    audience: ADULT,
    minAge: 6,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Cetirizine HCl', strength: '10mg' }],
    inactiveIngredients: [
      flag('Polyethylene glycol', 'moderate', dailymed(SET_CETIRIZINE, METH.peg)),
      flag('Mannitol', 'limited', dailymed(SET_CETIRIZINE, METH.mannitol)),
      flag('Sorbitol', 'limited', dailymed(SET_CETIRIZINE, METH.sorbitol)),
      cleared(SET_CETIRIZINE, 'Gelatin'),
      cleared(SET_CETIRIZINE, 'Glycerin'),
      cleared(SET_CETIRIZINE, 'Purified water'),
      cleared(SET_CETIRIZINE, 'Sodium hydroxide'),
      cleared(SET_CETIRIZINE, 'Sorbitan'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: 365 Cetirizine HCl 10 mg dye-free softgels = Caution (PEG Moderate). DailyMed setid 453b20b5 (dye-free WFM) lists gelatin, glycerin, mannitol, pharmaceutical ink, polyethylene glycol, purified water, sodium hydroxide, sorbitan, sorbitol — no TiO2 / synthetic dye. Raw demerit math is PEG 2 + mannitol 1 + sorbitol 1 = 4 pts Avoid — draft follows the locked Caution call. Pharmaceutical ink is ungraded appearance ink (v1.6 intake; not a second grade). Cetirizine is a different active from H3 loratadine — no same-active Clean swap in this batch; cleanAlternatives omitted. Ages 6+.',
    retailers: ['Whole Foods'],
    sourcesGeneral: [
      `DailyMed setid ${SET_CETIRIZINE} (365 dye-free cetirizine softgels; draft, not verified)`,
    ],
  },
  {
    id: '365-diphenhydramine-softgels-peg',
    productName:
      '365 Whole Foods Market Diphenhydramine HCl 25 mg Dye-Free Softgels',
    brand: '365 Whole Foods Market',
    category: ALLERGY,
    barcode: BATCH16_CATCHUP_BARCODES['365-diphenhydramine-softgels-peg'],
    formulaId: '365-diphenhydramine-softgels-peg',
    audience: ADULT,
    minAge: 6,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '25mg' }],
    inactiveIngredients: [
      flag('Polyethylene glycol 400', 'moderate', dailymed(SET_DPH, METH.peg)),
      flag('Propylene glycol', 'moderate', dailymed(SET_DPH, METH.pg)),
      flag('Sorbitol', 'limited', dailymed(SET_DPH, METH.sorbitol)),
      cleared(SET_DPH, 'Gelatin'),
      cleared(SET_DPH, 'Glycerin'),
      cleared(SET_DPH, 'Purified water'),
      cleared(SET_DPH, 'Sorbitol sorbitan solution'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: 365 Diphenhydramine HCl 25 mg dye-free softgels = Caution (PEG Moderate). ONE formulaId (`365-diphenhydramine-softgels-peg`), ONE category: Allergy. DailyMed setid 32352109 lists gelatin, glycerin, polyethylene glycol 400, propylene glycol, purified water, sorbitol sorbitan solution — dye-free. The same SKU is also sold / used as a nighttime sleep aid (SPL sleeplessness stop-use language) — do not invent a second grade, dual category field, or Sleep-aisle formulaId. Raw demerit math is PEG 2 + oral PG 2 + sorbitol 1 — draft follows the locked Caution call, not a 3-pt Avoid stack. First-generation / sedating — cleanliness note only. DPH is a different active from H3 loratadine — no same-active Clean swap; cleanAlternatives omitted. Ages 6+ (under 6: do not use).',
    retailers: ['Whole Foods'],
    sourcesGeneral: [
      `DailyMed setid ${SET_DPH} (365 dye-free DPH softgels; draft, not verified) — single Allergy row, not a dual Sleep grade`,
    ],
  },
  {
    id: '365-elderberry-gummies',
    productName: '365 Whole Foods Market Elderberry Gummies',
    brand: '365 Whole Foods Market',
    category: IMMUNE,
    formulaId: '365-elderberry-gummies',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Elderberry extract', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag('Natural flavors', 'limited', labelCite(FIG_ELDERBERRY_CITE, METH.flavors)),
      labelCleared(FIG_ELDERBERRY_CITE, 'Evaporated cane sugar'),
      labelCleared(FIG_ELDERBERRY_CITE, 'Organic tapioca syrup'),
      flag('Pectin', 'cleared', labelCite(FIG_ELDERBERRY_CITE, METH.gums)),
      labelCleared(FIG_ELDERBERRY_CITE, 'Citric acid'),
      labelCleared(FIG_ELDERBERRY_CITE, 'Sodium citrate'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: 365 Elderberry gummies = Caution. Driver is natural flavors (Limited). Matched Fig other-ingredients are evaporated cane sugar, organic tapioca syrup, pectin, citric acid, sodium citrate, natural flavors — no palm / canola / vegetable / sunflower oil. Do not invent a seed-oil Avoid on this formulaId. A later carton that lists seed / industrial oil is a different formula. No DailyMed drug SPL (dietary supplement). Adults. No independently Clean Immune swap in this batch — cleanAlternatives omitted.',
    retailers: ['Whole Foods'],
    barcode: BATCH16_CATCHUP_BARCODES['365-elderberry-gummies'],
    sourcesGeneral: [
      `${FIG_ELDERBERRY_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: '365-antacid-peppermint-ultra',
    productName:
      '365 / Whole Foods Market Health Ultra Strength Natural Antacid Peppermint',
    brand: '365 Whole Foods Market',
    category: DIGESTIVE,
    barcode: BATCH16_CATCHUP_BARCODES['365-antacid-peppermint-ultra'],
    formulaId: '365-antacid-peppermint-ultra',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Calcium carbonate', strength: '1000mg' }],
    inactiveIngredients: [
      flag('Maltodextrin', 'limited', dailymed(SET_ANTACID, METH.maltodextrin)),
      flag('Natural flavors', 'limited', dailymed(SET_ANTACID, METH.flavors)),
      flag(
        'Stevia extract (stevia rebaudiana leaf)',
        'cleared',
        dailymed(SET_ANTACID, METH.stevia),
      ),
      cleared(SET_ANTACID, 'Dextrose'),
      cleared(SET_ANTACID, 'Starch'),
      cleared(SET_ANTACID, 'Stearic acid'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: 365 / Whole Foods Market Health Ultra Strength Natural Antacid Peppermint (CaCO3 1000 mg) = Caution. Drivers are maltodextrin + natural flavors (Limited). Stevia is Cleared-class on this founder call. DailyMed setid a2dc800d lists dextrose, maltodextrin, natural flavors, starch, stearic acid, stevia extract (stevia rebaudiana leaf) — talc-free (carton states Talc Free). Ages 12+. No independently Clean Digestive swap in this batch — cleanAlternatives omitted.',
    retailers: ['Whole Foods'],
    sourcesGeneral: [
      `DailyMed setid ${SET_ANTACID} (WFM Health Ultra Strength Natural Antacid Peppermint; draft, not verified)`,
    ],
  },
  {
    id: '365-adult-once-daily-multi',
    productName: '365 Whole Foods Market Adult Once Daily Multi',
    brand: '365 Whole Foods Market',
    category: VITAMINS,
    formulaId: '365-adult-once-daily-multi',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Multivitamin / multimineral', strength: '1 tablet (label serving)' },
      { name: 'Zinc', strength: 'label serving when labeled' },
    ],
    inactiveIngredients: [
      flag('Silicon dioxide', 'cleared', labelCite(WFM_ADULT_MULTI_CITE, METH.sio2)),
      labelCleared(WFM_ADULT_MULTI_CITE, 'Microcrystalline cellulose'),
      labelCleared(WFM_ADULT_MULTI_CITE, 'Stearic acid (vegetable source)'),
      labelCleared(WFM_ADULT_MULTI_CITE, 'Croscarmellose sodium'),
      labelCleared(WFM_ADULT_MULTI_CITE, 'Magnesium stearate (vegetable source)'),
      labelCleared(
        WFM_ADULT_MULTI_CITE,
        'Vegetable coating (sodium carboxymethylcellulose)',
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: 365 Adult Once Daily Multi = Caution. Driver is silicon dioxide (nanoparticle Caution cap, 0 demerit points). WFM other-ingredients are MCC / vegetable stearic acid / SiO2 / croscarmellose / vegetable magnesium stearate / vegetable coating (sodium CMC) — no titanium dioxide on that list. Do not invent Clean on the SiO2 cap. Confirm the carton. No DailyMed drug SPL (dietary supplement). Adults. ' +
      ZINC_PARKED +
      ' No independently Clean multi in this batch — cleanAlternatives omitted.',
    retailers: ['Whole Foods'],
    barcode: BATCH16_CATCHUP_BARCODES['365-adult-once-daily-multi'],
    sourcesGeneral: [
      `${WFM_ADULT_MULTI_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: '365-mens-one-daily-multi',
    productName: "365 Whole Foods Market Men's One Daily Multi",
    brand: '365 Whole Foods Market',
    category: VITAMINS,
    formulaId: '365-mens-one-daily-multi',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: "Men's multivitamin / multimineral", strength: '1 tablet (label serving)' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag('Silicon dioxide', 'cleared', labelCite(WFM_MENS_MULTI_CITE, METH.sio2)),
      labelCleared(WFM_MENS_MULTI_CITE, 'Microcrystalline cellulose'),
      labelCleared(WFM_MENS_MULTI_CITE, 'Stearic acid (vegetable source)'),
      labelCleared(WFM_MENS_MULTI_CITE, 'Croscarmellose sodium'),
      labelCleared(WFM_MENS_MULTI_CITE, 'Magnesium stearate (vegetable source)'),
      labelCleared(
        WFM_MENS_MULTI_CITE,
        'Vegetable coating (sodium carboxymethylcellulose)',
      ),
    ],
    verdict: 'caution',
    honestNote:
      "FOUNDER CALL: 365 Men's One Daily Multi = Caution. Same SiO2 Caution-cap pattern as the Adult Once Daily Multi (MCC / stearate / veg coating CMC; no TiO2 on matched Instacart / WFM-family lists). Separate formulaId — do not merge the two multis. Do not invent Clean on the SiO2 cap. Confirm the carton. No DailyMed drug SPL. Adults. " +
      ZINC_PARKED +
      ' No independently Clean multi in this batch — cleanAlternatives omitted.',
    retailers: ['Whole Foods'],
    barcode: BATCH16_CATCHUP_BARCODES['365-mens-one-daily-multi'],
    sourcesGeneral: [
      `${WFM_MENS_MULTI_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: '365-prenatal-multi',
    productName: '365 Whole Foods Market Prenatal Multi Once Daily',
    brand: '365 Whole Foods Market',
    category: VITAMINS,
    formulaId: '365-prenatal-multi',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Prenatal multivitamin / multimineral', strength: '1 tablet (label serving)' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag('Silicon dioxide', 'cleared', labelCite(WFM_PRENATAL_CITE, METH.sio2)),
      labelCleared(WFM_PRENATAL_CITE, 'Microcrystalline cellulose'),
      labelCleared(WFM_PRENATAL_CITE, 'Stearic acid'),
      labelCleared(WFM_PRENATAL_CITE, 'Croscarmellose sodium'),
      labelCleared(WFM_PRENATAL_CITE, 'Magnesium stearate'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: 365 Prenatal Multi Once Daily = Caution (SiO2). HelloPharmacist / retailer other-ingredients list MCC / stearic acid / silicon dioxide / croscarmellose / magnesium stearate — no TiO2 on that list. Do not invent Clean. Category is Vitamins (prenatal aisle coverage). Audience adult. ' +
      PRENATAL_LABEL +
      ' ' +
      ZINC_PARKED +
      ' No independently Clean prenatal in this batch — cleanAlternatives omitted. No DailyMed drug SPL.',
    retailers: ['Whole Foods'],
    barcode: BATCH16_CATCHUP_BARCODES['365-prenatal-multi'],
    sourcesGeneral: [
      `${WFM_PRENATAL_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'sprouts-organic-prenatal-once-daily',
    productName: 'Sprouts Organic Prenatal Once Daily Whole Food Multi',
    brand: 'Sprouts',
    category: VITAMINS,
    formulaId: 'sprouts-organic-prenatal-once-daily',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      {
        name: 'Organic whole-food prenatal multivitamin',
        strength: '1 tablet (label serving)',
      },
    ],
    inactiveIngredients: [],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Sprouts Organic Prenatal Once Daily Whole Food Multi = Caution until the full label is matched — do NOT invent Clean. Shop.sprouts lists the SKU (organic / gluten-free / Sprouts brand) but does not publish other-ingredients. Confirm the carton for silicon dioxide and coatings before any later grade change. Inactive list left empty on purpose — do not invent SiO2 / oil / coating flags. Separate formulaId from `sprouts-organic-prenatal-whole-food`. ' +
      PRENATAL_LABEL +
      ' ' +
      ZINC_PARKED +
      ' No independently Clean prenatal in this batch — cleanAlternatives omitted.',
    retailers: ['Sprouts'],
    barcode: BATCH16_CATCHUP_BARCODES['sprouts-organic-prenatal-once-daily'],
    sourcesGeneral: [
      `${SPROUTS_ONCE_CITE} — draft, not verified; carton-confirm required; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'sprouts-organic-prenatal-whole-food',
    productName: 'Sprouts Organic Prenatal Whole Food Vitamin',
    brand: 'Sprouts',
    category: VITAMINS,
    formulaId: 'sprouts-organic-prenatal-whole-food',
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      {
        name: 'Organic whole-food prenatal vitamin',
        strength: 'label serving',
      },
    ],
    inactiveIngredients: [],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Sprouts Organic Prenatal Whole Food Vitamin = Caution until the full label is matched — do NOT invent Clean. Shop.sprouts lists a separate SKU from the Once Daily Whole Food Multi. Confirm the carton for SiO2 / coatings. Inactive list left empty on purpose — do not invent flags. Separate formulaId from `sprouts-organic-prenatal-once-daily`. ' +
      PRENATAL_LABEL +
      ' ' +
      ZINC_PARKED +
      ' No independently Clean prenatal in this batch — cleanAlternatives omitted.',
    retailers: ['Sprouts'],
    barcode: BATCH16_CATCHUP_BARCODES['sprouts-organic-prenatal-whole-food'],
    sourcesGeneral: [
      `${SPROUTS_WHOLE_CITE} — draft, not verified; carton-confirm required; no DailyMed drug SPL`,
    ],
  },

  // ── Avoid ────────────────────────────────────────────────
  {
    id: '365-ibuprofen-200-tio2',
    productName: '365 Whole Foods Market Ibuprofen 200 mg (film-coated)',
    brand: '365 Whole Foods Market',
    category: PAIN_FEVER,
    barcode: BATCH16_CATCHUP_BARCODES['365-ibuprofen-200-tio2'],
    formulaId: '365-ibuprofen-200-tio2',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Ibuprofen', strength: '200mg' }],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', dailymed(SET_IBU, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET_IBU, METH.peg)),
      flag('Polysorbate 80', 'moderate', dailymed(SET_IBU, METH.ps80)),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET_IBU, METH.sio2),
      ),
      cleared(SET_IBU, 'Corn starch'),
      cleared(SET_IBU, 'Croscarmellose sodium'),
      cleared(SET_IBU, 'Hypromellose'),
      cleared(SET_IBU, 'Microcrystalline cellulose'),
      cleared(SET_IBU, 'Stearic acid'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: 365 Whole Foods Market Ibuprofen 200 mg film-coated = Avoid. DailyMed setid e914472b lists titanium dioxide (High) plus polyethylene glycol (Moderate), polysorbate 80 (Moderate), and colloidal silicon dioxide (Caution cap). Iron oxide red and iron oxide yellow are on the SPL and are not in Methodology §5 (ungraded; v1.6 intake) — Avoid already stands on TiO2. Ages 12+. No independently Clean ibuprofen in this batch — cleanAlternatives omitted.',
    retailers: ['Whole Foods'],
    sourcesGeneral: [
      `DailyMed setid ${SET_IBU} (365 ibuprofen 200 mg film-coated; draft, not verified)`,
    ],
  },
  {
    id: '365-probiotic-fiber-gummies-sunflower',
    productName: '365 Whole Foods Market Probiotic + Fiber Gummies',
    brand: '365 Whole Foods Market',
    category: DIGESTIVE,
    formulaId: '365-probiotic-fiber-gummies-sunflower',
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Bacillus coagulans (LactoSpore)', strength: '2 billion CFU (label serving)' },
      { name: 'Inulin (from chicory root)', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag(
        'Organic sunflower seed oil',
        'high',
        labelCite(WFM_PROBIOTIC_CITE, METH.seedOilGummies),
      ),
      flag('Natural flavor', 'limited', labelCite(WFM_PROBIOTIC_CITE, METH.flavors)),
      labelCleared(WFM_PROBIOTIC_CITE, 'Inulin (from chicory root)'),
      labelCleared(WFM_PROBIOTIC_CITE, 'Organic evaporated cane sugar'),
      flag('Pectin', 'cleared', labelCite(WFM_PROBIOTIC_CITE, METH.gums)),
      labelCleared(WFM_PROBIOTIC_CITE, 'Citric acid'),
      labelCleared(WFM_PROBIOTIC_CITE, 'Sodium citrate'),
      labelCleared(WFM_PROBIOTIC_CITE, 'Organic carnauba wax'),
      labelCleared(
        WFM_PROBIOTIC_CITE,
        'Colors (genipap juice concentrate, watermelon juice concentrate)',
      ),
      labelCleared(WFM_PROBIOTIC_CITE, 'Cornstarch'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: 365 Probiotic + Fiber gummies = Avoid. Organic sunflower seed oil in a gummy is High-tier (seed/industrial oils in gummies). Natural flavor is Limited (not needed to reach Avoid). WFM ingredients: inulin (from chicory root), organic evaporated cane sugar, pectin, citric acid, natural flavor, sodium citrate, organic sunflower seed oil, organic carnauba wax, colors from juices, cornstarch. No DailyMed drug SPL. Adults. No independently Clean Digestive swap in this batch — cleanAlternatives omitted.',
    retailers: ['Whole Foods'],
    barcode: BATCH16_CATCHUP_BARCODES['365-probiotic-fiber-gummies-sunflower'],
    sourcesGeneral: [
      `${WFM_PROBIOTIC_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: '365-calcium-d3-tio2',
    productName: '365 Whole Foods Market Calcium with Vitamin D3',
    brand: '365 Whole Foods Market',
    category: VITAMINS,
    formulaId: '365-calcium-d3-tio2',
    audience: ADULT,
    minAge: 18,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Calcium', strength: 'label serving' },
      { name: 'Vitamin D3', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag('Titanium dioxide (for color)', 'high', labelCite(WFM_CALCIUM_CITE, METH.tio2)),
      flag('Silicon dioxide', 'cleared', labelCite(WFM_CALCIUM_CITE, METH.sio2)),
      labelCleared(WFM_CALCIUM_CITE, 'Stearic acid (vegetable source)'),
      labelCleared(WFM_CALCIUM_CITE, 'Croscarmellose sodium'),
      labelCleared(WFM_CALCIUM_CITE, 'Hydroxypropyl methylcellulose'),
      labelCleared(WFM_CALCIUM_CITE, 'Sodium carboxymethylcellulose'),
      labelCleared(WFM_CALCIUM_CITE, 'Microcrystalline cellulose'),
      labelCleared(WFM_CALCIUM_CITE, 'Magnesium stearate (vegetable source)'),
      labelCleared(WFM_CALCIUM_CITE, 'Hydroxypropylcellulose'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: 365 Calcium with Vitamin D3 = Avoid (TiO2 in vegetable coating). WFM other-ingredients: stearic acid (vegetable source), croscarmellose sodium, vegetable coating (HPMC, titanium dioxide [for color], sodium CMC), MCC, magnesium stearate (vegetable source), silicon dioxide, hydroxypropylcellulose. Separate formulaId from Cal-Mag-Zinc (`365-cal-mag-zinc-d3-tio2`) — same coat family, different actives; do not merge. Confirm the carton still lists titanium dioxide. No DailyMed drug SPL. Adults. No independently Clean calcium in this batch — cleanAlternatives omitted.',
    retailers: ['Whole Foods'],
    barcode: BATCH16_CATCHUP_BARCODES['365-calcium-d3-tio2'],
    sourcesGeneral: [
      `${WFM_CALCIUM_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: '365-cal-mag-zinc-d3-tio2',
    productName: '365 Whole Foods Market Cal-Mag-Zinc with Vitamin D3',
    brand: '365 Whole Foods Market',
    category: VITAMINS,
    formulaId: '365-cal-mag-zinc-d3-tio2',
    audience: ADULT,
    minAge: 18,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Calcium', strength: '1000mg (2-tablet label serving)' },
      { name: 'Magnesium', strength: '500mg (2-tablet label serving)' },
      { name: 'Zinc', strength: '25mg (2-tablet label serving)' },
      { name: 'Vitamin D3', strength: '200 IU (2-tablet label serving)' },
    ],
    inactiveIngredients: [
      flag('Titanium dioxide (for color)', 'high', labelCite(WFM_CALMAG_CITE, METH.tio2)),
      flag('Silicon dioxide', 'cleared', labelCite(WFM_CALMAG_CITE, METH.sio2)),
      labelCleared(WFM_CALMAG_CITE, 'Stearic acid (vegetable source)'),
      labelCleared(WFM_CALMAG_CITE, 'Croscarmellose sodium'),
      labelCleared(WFM_CALMAG_CITE, 'Hydroxypropyl methylcellulose'),
      labelCleared(WFM_CALMAG_CITE, 'Sodium carboxymethylcellulose'),
      labelCleared(WFM_CALMAG_CITE, 'Microcrystalline cellulose'),
      labelCleared(WFM_CALMAG_CITE, 'Magnesium stearate (vegetable source)'),
      labelCleared(WFM_CALMAG_CITE, 'Hydroxypropylcellulose'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: 365 Cal-Mag-Zinc with Vitamin D3 = Avoid (same TiO2 vegetable coating as Calcium + D3). WFM other-ingredients match the HPMC / titanium dioxide [for color] / sodium CMC coat. Separate formulaId from `365-calcium-d3-tio2`. Confirm the carton. No DailyMed drug SPL. Adults. ' +
      ZINC_PARKED +
      ' No independently Clean mineral tablet in this batch — cleanAlternatives omitted.',
    retailers: ['Whole Foods'],
    barcode: BATCH16_CATCHUP_BARCODES['365-cal-mag-zinc-d3-tio2'],
    sourcesGeneral: [
      `${WFM_CALMAG_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
];

for (const record of BATCH16_365_SPROUTS) {
  const expected = BATCH16_CATCHUP_BARCODES[record.id];
  if (expected) {
    if (record.barcode !== expected) {
      throw new Error(`batch 16 catch-up UPC drift on ${record.id}`);
    }
  } else if (
    record.barcode &&
    (record.brand === 'Sprouts' || record.brand === '365 Whole Foods Market')
  ) {
    throw new Error(`batch 16 must not invent barcodes on ${record.id}`);
  }
}
