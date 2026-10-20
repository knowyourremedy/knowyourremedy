// DRAFT / not verified / batch 11 kids Digestive
// Digestive · audience 'kids' · recordStatus is 'unverified' on every row.
// Founder calls (locked): see notes below. Do NOT invent Clean. Methodology v1.6
// grades only — do not change locked ingredient grades.
// Homeopathic rows set productSubtype + homeopathicSubtype = 'homeopathic'.
// Barcodes omitted except KYR5-b catch-up allowlist. Pack sizes share formulaId.
// HFCS is parked (Methodology §5) — mentioned in honestNotes only, never graded.
// Form is labeled on cleanAlternatives, not a hard filter (§6).
// Not wired into Clean Picks UI. No live Digestive / Clean Picks file is edited
// from this draft. Methodology.md / PROJECT_NOTES.md are untouched.
//
// FOUNDER CALLS (LOCKED) — approved rows only:
// CLEAN
// - KD1 Boiron Gasalia meltaways = Clean. setid 3f93dfdc. Croscarmellose /
//   lactose / Mg stearate. Homeopathic. minAge 6.
// - KD2 Boiron Gasalia pellets = Clean. setid de99ffbf. Lactose + sucrose.
//   Homeopathic. minAge 6. Separate formulaId from meltaways.
// - KD3 Boiron NauseaCalm = Clean. SHARE formulaId `boiron-nauseacalm` with
//   adult batch 10 (same inactives; setid 1e8e0388). Do not invent a second
//   formulaId. Kids audience + minAge 2 per SPL 2+ chart.
// - KD4 Boiron MotionCalm = Clean. SHARE formulaId `boiron-motioncalm` with
//   adult batch 10 (same inactives; setid 1ea4de81). Kids audience + minAge 2.
// - KD5 Pedialyte Classic Unflavored = Clean. Abbott US carton confirmed:
//   water / dextrose / citrate / salts only — no sucralose, Ace-K, or dye.
//   Zinc gluconate is parked (inactives only). Infant-usable unflavored.
// CAUTION
// - KD6 Genexa Kids Tummy Relief = Caution. Live Genexa.com OI (batch 32):
//   organic beet root + organic rice bran extract Cleared (Sept 14 locks);
//   organic flavors Cleared; organic maltodextrin Limited 1 pt matching
//   locked Genexa chew siblings. Recalculated: still Caution. minAge 2.
// - KD7 Little Remedies Gas Relief Drops, Natural Berry = Caution.
//   Target panel. Sucralose and oral propylene glycol are Moderate.
//   Natural flavor and sodium benzoate are Limited. No High. Infant / 0+
//   as labeled. Barcode stays 756184120415. The strawberry line is not
//   this row.
// - KD8 Culturelle Kids probiotic gummies coconut-only = Caution. Natural
//   flavors + fractionated coconut oil. Coconut oil alone is NOT the gummy
//   seed-oil High rule. Separate from a palm / veg-oil Avoid twin (none
//   written — no concrete SKU). Ages 2–3 as labeled (some Veggie Fiber
//   cartons are 3+).
// - KD13 Mylicon Infants Dye-Free = Caution. setid 3324139a. Limited-only
//   stack (natural flavor + potassium sorbate + sodium benzoate +
//   sorbitol). Limited-only never Avoid. Dye-free is not Clean.
// - KD14 CVS Health Infants Dye-Free Gas / Walgreens twin = Caution.
//   Same Limited-only stack (CVS setid 088993c1; Walgreens 05d2a37f).
//   Shared store-family formulaId.
// AVOID
// - KD9 Pepto Kids (calcium carbonate) = Avoid. setid 673c45dc. Red #27
//   lake + talc + flavor. minAge 2. Adult Pepto bismuth is not this row.
// - KD10 Children's Mylicon Tummy Relief chews = Avoid. setid 432d5b4c.
//   Red 27 + sucralose. minAge 2.
// - KD11 Children's Mylicon All-in-One liquid = Avoid. setid 0952eba8.
//   Red 28 + sucralose. minAge 2.
// - KD12 Mylicon Infants Original = Avoid. setid 395be942. Red 22 + Red 28.
//   Infant / 0+.
// - KD15 Dramamine for Kids = Avoid. setid 12bc3f17. Aspartame High.
//   minAge 2.
// - KD16 Pedialyte Classic flavored = Avoid. Sucralose + Ace-K ± dyes
//   (Abbott US Classic grape / strawberry / mixed fruit / fruit punch /
//   coconut burst family). Zinc parked. Separate formulaId from Unflavored.
// - KD17 Pedialyte Freezer Pops = Avoid. Sucralose + Ace-K ± dyes (plus
//   flavor + sorbate + benzoate). minAge 1 (not for under 1 year).
// - KD18 Culturelle Kids Purely Probiotics packets = Avoid. Sucralose +
//   natural flavor (2+1). minAge 1. Current “No Flavor Added” mannitol +
//   inulin carton is a different formula — not this row; Clean is not
//   invented.
//
// TALLY (unverified drafts): 19 rows — Clean 5 / Caution 6 / Avoid 8.
// Independently Clean in THIS batch only: Gasalia meltaways, Gasalia
// pellets, NauseaCalm (shared adult formulaId), MotionCalm (shared adult
// formulaId), Pedialyte Classic Unflavored. Caution / Avoid rows offer
// those as §6 alternatives (form labeled). Gas Avoid → Gasalia. Nausea /
// motion Avoid → NauseaCalm / MotionCalm. Electrolyte Avoid → Unflavored.
// No independently Clean kids simethicone / calcium-carbonate antacid /
// probiotic exists here — those rows still point at the closest Clean
// Digestive peer (form + age labeled).
//
// LIMITED MATH: Limited-only (any count) stays Caution. Avoid requires
// a High-tier inactive (or an explicit founder/active-safety cap).
// SiO2 is a 0-pt cap and does not push Avoid. Worked example: natural
// flavor + potassium sorbate + sodium benzoate + sorbitol = Caution,
// not Avoid. Organic flavors = Cleared. Non-organic maltodextrin =
// Limited. Aspartame / dyes / talc / TiO2 = High Avoid. Sucralose /
// Ace-K = Moderate. Seed / veg oils in gummies = High Avoid.
// Coconut oil alone ≠ that High rule.
//
// SHARED ADULT FORMULA IDs: NauseaCalm + MotionCalm reuse batch 10
// formulaIds exactly (`boiron-nauseacalm`, `boiron-motioncalm`) so the
// Clean grade propagates conceptually. Do not invent a second formulaId.
//
// ZINC: Pedialyte zinc gluconate (when present) is parked — this draft
// grades inactives only and does not invent an active-safety grade.
//
// SKIPPED (founder skip — do not invent Clean / do not write):
// - Hyland's Baby Colic
// - ColicCalm
// - Amazon-only SKUs
// - Aluminum hydroxide kids rows
// - Adult Pepto-Bismol bismuth under-12
// - Optional kids probiotic gummies with palm / vegetable oil (no
//   concrete brick-and-mortar SKU confirmed this batch)
// - Optional kids probiotic caps with TiO2 (no confirmed labeled SKU)

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const DIGESTIVE = 'Digestive';
const KIDS = 'kids' as const;
const HOMEOPATHIC = 'homeopathic' as const;

const METH = {
  dyes: 'Methodology §5 High-tier (synthetic dyes, including lake forms)',
  talc: 'Methodology §5 High-tier (talc — IARC 2A; no pharma-grade exception)',
  aspartame:
    'Methodology §5 High-tier (aspartame — IARC 2B; locked Avoid, §0 override)',
  seedOilGummies:
    'Methodology §5 High-tier (seed/industrial oils in gummies — soybean, canola, "vegetable oil", sunflower, palm)',
  sucralose: 'Methodology §5 Limited (Sucralose — founder lock t138u Oct 20, 2026; §4 prior-lock re-eval; supersedes prior Moderate-risk label).',
  acek: 'Methodology §5 Limited (Acesulfame potassium — founder lock t138u Oct 20, 2026; §4 prior-lock re-eval; supersedes prior Moderate-risk label).',
  flavors: 'Methodology §5 Limited-risk (natural flavor / natural flavors — opacity). Exact natural flavors stays Limited. A named flavor is a different line.',
  maltodextrin: 'Methodology §5 Limited-risk (non-organic maltodextrin)',
  sorbitol: 'Methodology §5 Limited-risk (sugar alcohols — sorbitol)',
  mannitol: 'Methodology §5 Limited-risk (sugar alcohols — mannitol)',
  xylitol: 'Methodology §5 Limited-risk (xylitol, oral)',
  benzoate: 'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate)',
  sorbate: 'Methodology §5 Limited-risk (synthetic preservatives — potassium sorbate)',
  benzoic:
    'Methodology §5 Limited-risk (synthetic preservatives — benzoic acid / benzoate class)',
  benzyl:
    'Methodology §5 Caution (benzyl alcohol — general oral OTC; standalone Caution, not additive-scored, not Avoid on this population)',
  gums: 'Methodology §5 Cleared (xanthan gum / gum arabic / guar / pectin / acacia — locked v1.6)',
  pg: 'Methodology §5 Limited (Propylene glycol (oral) — founder lock t138u Oct 20, 2026; §4 prior-lock re-eval; supersedes prior Moderate-risk label).',
  cmc: 'Methodology §5 Cleared (carboxymethylcellulose, cellulose gum family).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose).',
  citric: 'Methodology §5 Cleared (citric acid).',
  water: 'Methodology §5 Cleared (water / purified water).',
  organicFlavor: 'Methodology §5 Cleared (organic flavors / organic colors)',
  beet: 'Methodology §5 Cleared-class (organic beet root — whole-food; Sept 14 lock)',
  riceBran:
    'Methodology §5 Cleared (organic rice bran extract — hull/concentrate family; locked Sept 14, 2026)',
  coconutOil:
    'Methodology §5 — coconut oil / fractionated coconut oil alone is NOT the gummy seed/industrial-oil High rule',
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

function homeopathicFields() {
  return {
    productType: 'OTC' as const,
    productSubtype: HOMEOPATHIC,
    homeopathicSubtype: HOMEOPATHIC,
  };
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const CARLSTON =
  'Carlston M (ed), Classical Homeopathy, Churchill Livingstone 2003 — homeopathic eligibility is cleanliness + documented evidentiary framework only; no efficacy claim.';

const GASALIA_MELTAWAYS = 'boiron-gasalia-meltaways';
const GASALIA_PELLETS = 'boiron-gasalia-pellets';
const NAUSEACALM = 'boiron-nauseacalm';
const MOTIONCALM = 'boiron-motioncalm';
const PEDIALYTE_UNFL = 'pedialyte-classic-unflavored';
const STORE_INFANTS_GAS_DYEFREE = 'store-infants-gas-dyefree';

const SET_GASALIA_MELT = '3f93dfdc-8edb-4e4b-a571-4cd202e02113';
const SET_GASALIA_PELL = 'de99ffbf-cb1d-80bf-e053-2a95a90ac99d';
const SET_NAUSEACALM = '1e8e0388-c5c8-d4da-e063-6394a90ab294';
const SET_MOTIONCALM = '1ea4de81-3ec0-e9e4-e063-6294a90a7ac9';
const SET_GENEXA_TUMMY = '4f9db9dc-6b78-d123-e063-6294a90ae38d';
const SET_PEPTO_KIDS = '673c45dc-84fd-5b45-e053-2a91aa0adea8';
const SET_MYLICON_CHEW = '432d5b4c-a69b-45f9-b7f0-216726a3eead';
const SET_MYLICON_AIO = '0952eba8-6de2-4a77-956d-339fab437472';
const SET_MYLICON_ORIG = '395be942-d883-4bcb-8811-6fe1521d5a92';
const SET_MYLICON_DYEFREE = '3324139a-ed22-43af-859d-e7af19a24ee9';
const SET_CVS_GAS_DYEFREE = '088993c1-31f0-4270-a3df-a585e7c8d511';
const SET_WAG_GAS_DYEFREE = '05d2a37f-f47d-40e6-a799-120d846bf5d6';
const SET_DRAM_KIDS = '12bc3f17-ed62-4d0d-9b1e-3835579e711b';

const PEDIALYTE_UNFL_CITE =
  'Abbott Nutrition US Pedialyte Classic / Oral Electrolyte Solution Unflavored (abbottnutrition.com) — water, dextrose; less than 0.5–2% potassium citrate, salt, sodium citrate, citric acid, zinc gluconate. No sucralose, Ace-K, or dye.';
const PEDIALYTE_FLAV_CITE =
  'Abbott Nutrition US Pedialyte Classic flavored (abbottnutrition.com) — sucralose + acesulfame potassium + flavor ± FD&C dyes; zinc gluconate';
const PEDIALYTE_POPS_CITE =
  'Abbott Nutrition US Pedialyte Freezer Pops (abbottnutrition.com) — sucralose + acesulfame potassium + flavor + potassium sorbate + sodium benzoate. Variety-pack retailer sleeves also list Red 40 / Blue 1 / Yellow 6.';
const CULTURELLE_GUMMY_CITE =
  'Culturelle Kids Probiotic + Veggie Fiber / Daily Probiotic + Prebiotic gummies (culturelle.com + CVS other-ingredients) — natural flavors + fractionated coconut oil (containing carnauba wax)';
const GAS_DROPS_PANEL =
  'Target panel, Little Remedies Gas Relief Drops, Natural Berry, 1 fl oz';
const CULTURELLE_PKT_CITE =
  'Culturelle Kids + Baby HCP sheet (CKEP11565) — Kids Purely Probiotics packets other ingredients include sucralose + natural flavor (xylitol, mannitol, HPC, stearic acid, magnesium stearate, citric acid, vegetable juice color, malic acid)';

// KYR5-b in-store 3s brands — coconut-only Kids Veggie Fiber / Daily
// Probiotic + Prebiotic 30-ct (iHerb CTL-40091 + Target/CVS successive
// UPC). Fractionated coconut oil + carnauba wax; no palm / canola.
const BATCH11_CATCHUP_BARCODES: Record<string, string> = {
  'culturelle-kids-gummies-coconut': '049100400914 049100401010',
  'walgreens-infants-gas-dyefree': '311917179162',
};

const GAS_UNDER6_ALTS: CleanAlternative[] = [
  alt(
    GASALIA_MELTAWAYS,
    'Closest independently Clean kids gas analog in this batch (Boiron Gasalia meltaways). Form: meltaway tablet vs drops / liquid / chewable — labeled, not a hard filter (§6). minAge 6 — higher than this infant / 2+ product; not an age-matched swap under 6. No independently Clean infant simethicone exists here.',
  ),
  alt(
    GASALIA_PELLETS,
    'Independently Clean kids-usable Gasalia pellets (minAge 6 — not age-matched under 6). Form: pellets — labeled, not a hard filter (§6).',
  ),
];

const TUMMY_ALTS: CleanAlternative[] = [
  alt(
    GASALIA_MELTAWAYS,
    'No independently Clean conventional kids calcium-carbonate antacid in this batch. Closest independently Clean Digestive / gas peer is Boiron Gasalia meltaways (minAge 6 — higher than this 2+ product). Form: meltaway tablet vs chewable / liquid — labeled, not a hard filter (§6). Cleanliness only; not an efficacy swap.',
  ),
  alt(
    GASALIA_PELLETS,
    'Independently Clean kids-usable Gasalia pellets (minAge 6). Form: pellets — labeled, not a hard filter (§6).',
  ),
];

const NAUSEA_ALTS: CleanAlternative[] = [
  alt(
    NAUSEACALM,
    'Closest independently Clean kids nausea analog in this batch (Boiron NauseaCalm, shared formulaId with adult batch 10). Form: pellets vs chewable — labeled, not a hard filter (§6). Cleanliness only; no efficacy claim. Age-matched for 2+.',
  ),
  alt(
    MOTIONCALM,
    'Independently Clean kids-usable MotionCalm pellets (shared formulaId with adult batch 10; minAge 2). Form: pellets — labeled, not a hard filter (§6).',
  ),
];

const ELECTROLYTE_ALTS: CleanAlternative[] = [
  alt(
    PEDIALYTE_UNFL,
    'Independently Clean kids electrolyte analog in this batch (Pedialyte Classic Unflavored). Form: liquid — labeled, not a hard filter (§6). Same brand family; no sucralose / Ace-K / dye.',
  ),
];

const PROBIOTIC_ALTS: CleanAlternative[] = [
  alt(
    PEDIALYTE_UNFL,
    'No independently Clean kids probiotic in this batch. Closest independently Clean Digestive peer that is age-matched for 1–2+ is Pedialyte Classic Unflavored (electrolyte liquid). Form: liquid vs gummy / powder — labeled, not a hard filter (§6). Cleanliness peer only; not an efficacy swap.',
  ),
  alt(
    NAUSEACALM,
    'Independently Clean kids-usable NauseaCalm pellets (shared formulaId with adult batch 10; minAge 2). Form: pellets — labeled, not a hard filter (§6). Cleanliness only.',
  ),
];

function dyeFreeInfantGasRow(opts: {
  id: string;
  productName: string;
  brand: string;
  retailers: string[];
  setid: string;
  noteBrand: string;
  barcode?: string;
}): RatingRecord {
  return {
    id: opts.id,
    productName: opts.productName,
    brand: opts.brand,
    category: DIGESTIVE,
    ...(opts.barcode ? { barcode: opts.barcode } : {}),
    formulaId: STORE_INFANTS_GAS_DYEFREE,
    audience: KIDS,
    minAge: 0,
    form: 'drops',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Simethicone', strength: '20mg / dose' }],
    inactiveIngredients: [
      flag('Natural flavors', 'limited', dailymed(opts.setid, METH.flavors)),
      flag(
        'Potassium sorbate',
        'limited',
        dailymed(opts.setid, METH.sorbate),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed(opts.setid, METH.benzoate),
      ),
      flag('Sorbitol', 'limited', dailymed(opts.setid, METH.sorbitol)),
      flag('Xanthan gum', 'cleared', dailymed(opts.setid, METH.gums)),
      cleared(opts.setid, 'Carboxymethylcellulose sodium'),
      cleared(opts.setid, 'Citric acid'),
      cleared(opts.setid, 'Microcrystalline cellulose'),
      cleared(opts.setid, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'Avoid: three or more Limited tokens triggered the stacking rule (t137u): Natural flavors, Potassium sorbate, Sodium benzoate, Sorbitol.',

    retailers: opts.retailers,
    cleanAlternatives: GAS_UNDER6_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${opts.setid} (draft, not verified)`,
    ],
  };
}

export const BATCH11_KIDS_DIGESTIVE: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  {
    id: GASALIA_MELTAWAYS,
    productName: 'Boiron Gasalia Meltaway Tablets',
    brand: 'Boiron',
    category: DIGESTIVE,
    barcode: '306969136041',
    formulaId: GASALIA_MELTAWAYS,
    audience: KIDS,
    minAge: 6,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Carbo vegetabilis', strength: '6C HPUS' },
      { name: 'Lycopodium clavatum', strength: '6C HPUS' },
      { name: 'Nux moschata', strength: '6C HPUS' },
      { name: 'Raphanus sativus', strength: '6C HPUS' },
    ],
    inactiveIngredients: [
      cleared(SET_GASALIA_MELT, 'Croscarmellose sodium'),
      cleared(SET_GASALIA_MELT, 'Lactose'),
      cleared(SET_GASALIA_MELT, 'Magnesium stearate'),
    ],
    verdict: 'clean',

    retailers: ['CVS', 'Walgreens', 'Whole Foods', 'Sprouts'],
    sourcesGeneral: [
      `DailyMed setid ${SET_GASALIA_MELT} (draft, not verified)`,
      CARLSTON,
    ],
  },
  {
    id: GASALIA_PELLETS,
    productName: 'Boiron Gasalia Pellets',
    brand: 'Boiron',
    category: DIGESTIVE,
    barcode: '306969096420',
    formulaId: GASALIA_PELLETS,
    audience: KIDS,
    minAge: 6,
    form: 'pellets',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Carbo vegetabilis', strength: '6C HPUS' },
      { name: 'Lycopodium clavatum', strength: '6C HPUS' },
      { name: 'Nux moschata', strength: '6C HPUS' },
      { name: 'Raphanus sativus', strength: '6C HPUS' },
    ],
    inactiveIngredients: [
      cleared(SET_GASALIA_PELL, 'Lactose'),
      cleared(SET_GASALIA_PELL, 'Sucrose'),
    ],
    verdict: 'clean',

    retailers: ['CVS', 'Walgreens', 'Whole Foods', 'Sprouts'],
    sourcesGeneral: [
      `DailyMed setid ${SET_GASALIA_PELL} (draft, not verified)`,
      CARLSTON,
    ],
  },
  {
    id: NAUSEACALM,
    productName: 'Boiron NauseaCalm',
    brand: 'Boiron',
    category: DIGESTIVE,
    barcode: '306969245422',
    formulaId: NAUSEACALM,
    audience: KIDS,
    minAge: 2,
    form: 'pellets',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Tabacum', strength: '4C HPUS' },
      { name: 'Petroleum', strength: '4C HPUS' },
      { name: 'Ipecacuanha', strength: '4C HPUS' },
      { name: 'Nux vomica', strength: '4C HPUS' },
      { name: 'Cocculus indicus', strength: '4C HPUS' },
    ],
    inactiveIngredients: [
      cleared(SET_NAUSEACALM, 'Lactose'),
      cleared(SET_NAUSEACALM, 'Sucrose'),
    ],
    verdict: 'clean',

    retailers: ['CVS', 'Walgreens', 'Whole Foods', 'Sprouts'],
    sourcesGeneral: [
      `DailyMed setid ${SET_NAUSEACALM} (draft, not verified)`,
      CARLSTON,
    ],
  },
  {
    id: MOTIONCALM,
    productName: 'Boiron MotionCalm',
    brand: 'Boiron',
    category: DIGESTIVE,
    barcode: '306969235423',
    formulaId: MOTIONCALM,
    audience: KIDS,
    minAge: 2,
    form: 'pellets',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Ipecacuanha', strength: '4C HPUS' },
      { name: 'Cocculus indicus', strength: '4C HPUS' },
      { name: 'Nux vomica', strength: '4C HPUS' },
      { name: 'Tabacum', strength: '4C HPUS' },
      { name: 'Petroleum', strength: '4C HPUS' },
    ],
    inactiveIngredients: [
      cleared(SET_MOTIONCALM, 'Lactose'),
      cleared(SET_MOTIONCALM, 'Sucrose'),
    ],
    verdict: 'clean',

    retailers: ['CVS', 'Walgreens', 'Whole Foods', 'Sprouts'],
    sourcesGeneral: [
      `DailyMed setid ${SET_MOTIONCALM} (draft, not verified)`,
      CARLSTON,
    ],
  },
  {
    id: PEDIALYTE_UNFL,
    productName: 'Pedialyte Classic Unflavored',
    brand: 'Pedialyte',
    category: DIGESTIVE,
    formulaId: PEDIALYTE_UNFL,
    audience: KIDS,
    minAge: 0,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    activeIngredients: [
      { name: 'Dextrose / sodium / potassium / citrate electrolytes', strength: 'as labeled' },
      { name: 'Zinc gluconate', strength: 'parked — not graded' },
    ],
    inactiveIngredients: [
      flag('Water', 'cleared', labelCite(PEDIALYTE_UNFL_CITE, METH.cleared)),
      flag('Dextrose', 'cleared', labelCite(PEDIALYTE_UNFL_CITE, METH.cleared)),
      flag(
        'Potassium citrate',
        'cleared',
        labelCite(PEDIALYTE_UNFL_CITE, METH.cleared),
      ),
      flag('Salt (sodium chloride)', 'cleared', labelCite(PEDIALYTE_UNFL_CITE, METH.cleared)),
      flag(
        'Sodium citrate',
        'cleared',
        labelCite(PEDIALYTE_UNFL_CITE, METH.cleared),
      ),
      flag('Citric acid', 'cleared', labelCite(PEDIALYTE_UNFL_CITE, METH.cleared)),
    ],
    verdict: 'clean',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      PEDIALYTE_UNFL_CITE + ' — draft, not verified; no DailyMed drug SPL',
    ],
  },

  // ── Caution ──────────────────────────────────────────────
  {
    id: 'genexa-kids-tummy-relief',
    barcode: '857630006694',
    productName: 'Genexa Kids Tummy Relief',
    brand: 'Genexa',
    category: DIGESTIVE,
    formulaId: 'genexa-kids-tummy-relief',
    audience: KIDS,
    minAge: 2,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Calcium carbonate', strength: '400mg' }],
    inactiveIngredients: [
      flag(
        'Maltodextrin (organic)',
        'limited',
        labelCite(
          'https://www.genexa.com/products/kids-tummy-relief',
          `${METH.maltodextrin} — live carton is organic maltodextrin; still the Limited chew-sibling driver (do not invent Clean)`,
        ),
      ),
      flag(
        'Organic beet root',
        'cleared',
        labelCite('https://www.genexa.com/products/kids-tummy-relief', METH.beet),
      ),
      flag(
        'Organic rice bran extract',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/kids-tummy-relief',
          METH.riceBran,
        ),
      ),
      flag(
        'Flavors (organic)',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/kids-tummy-relief',
          METH.organicFlavor,
        ),
      ),
      flag(
        'Organic carnauba wax',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/kids-tummy-relief',
          METH.cleared,
        ),
      ),
      flag(
        'Non-GMO dextrose',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/kids-tummy-relief',
          METH.cleared,
        ),
      ),
    ],
    verdict: 'caution',

    retailers: ['CVS', 'Target', 'Walmart', 'Whole Foods', 'Walgreens'],
    cleanAlternatives: TUMMY_ALTS,
    sourcesGeneral: [
      'https://www.genexa.com/products/kids-tummy-relief (live OI; draft, not verified)',
      `DailyMed setid ${SET_GENEXA_TUMMY} (prior SPL; draft, not verified)`,
    ],
  },
  {
    id: 'little-remedies-gas-drops',
    productName: 'Little Remedies Gas Relief Drops, Natural Berry (1 fl oz)',
    brand: 'Little Remedies',
    category: DIGESTIVE,
    barcode: '756184120415',
    formulaId: 'little-remedies-gas-drops',
    audience: KIDS,
    minAge: 0,
    form: 'drops',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Simethicone', strength: '20mg / 0.3mL' },
    ],
    inactiveIngredients: [
      flag(
        'Carboxymethyl cellulose sodium',
        'cleared',
        labelCite(GAS_DROPS_PANEL, METH.cmc),
      ),
      flag('Citric acid', 'cleared', labelCite(GAS_DROPS_PANEL, METH.citric)),
      flag(
        'Microcrystalline cellulose',
        'cleared',
        labelCite(GAS_DROPS_PANEL, METH.mcc),
      ),
      flag(
        'Natural flavor',
        'limited',
        labelCite(GAS_DROPS_PANEL, METH.flavors),
      ),
      flag('Propylene glycol', 'limited', labelCite(GAS_DROPS_PANEL, METH.pg)),
      flag('Purified water', 'cleared', labelCite(GAS_DROPS_PANEL, METH.water)),
      flag(
        'Sodium benzoate',
        'limited',
        labelCite(GAS_DROPS_PANEL, METH.benzoate),
      ),
      flag('Sucralose', 'limited', labelCite(GAS_DROPS_PANEL, METH.sucralose)),
      flag('Xanthan gum', 'cleared', labelCite(GAS_DROPS_PANEL, METH.gums)),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER-LOCK DRAFT: Caution on the prior panel read; t138u moved propylene glycol and sucralose to Limited and t137u stack makes this Avoid. Avoid: three or more Limited tokens triggered the stacking rule (t137u): Natural flavor, Propylene glycol, Sodium benzoate, Sucralose.',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: GAS_UNDER6_ALTS,
    sourcesGeneral: [
      'Target panel for Little Remedies Gas Relief Drops, Natural Berry, 1 fl oz. Simethicone 20 mg per 0.3 mL. Inactive ingredients: carboxymethyl cellulose sodium, citric acid, microcrystalline cellulose, natural flavor, propylene glycol, purified water, sodium benzoate, sucralose, xanthan gum. Newborns and infants under 2 years, and children 2 and over. Barcode 756184120415 stays on this Natural Berry 1 fl oz. The strawberry 1 fl oz is a different row.',
    ],
  },
  {
    id: 'culturelle-kids-gummies-coconut',
    productName: 'Culturelle Kids Probiotic Gummies (coconut-only)',
    brand: 'Culturelle',
    category: DIGESTIVE,
    barcode: BATCH11_CATCHUP_BARCODES['culturelle-kids-gummies-coconut'],
    formulaId: 'culturelle-kids-gummies-coconut',
    audience: KIDS,
    minAge: 2,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    activeIngredients: [
      {
        name: 'Bacillus subtilis DE111 / Bacillus coagulans MTCC 5856',
        strength: '1 billion CFU (label serving)',
      },
    ],
    inactiveIngredients: [
      flag(
        'Natural flavors',
        'limited',
        labelCite(CULTURELLE_GUMMY_CITE, METH.flavors),
      ),
      flag(
        'Fractionated coconut oil (containing carnauba wax)',
        'cleared',
        labelCite(CULTURELLE_GUMMY_CITE, METH.coconutOil),
      ),
      flag('Pectin', 'cleared', labelCite(CULTURELLE_GUMMY_CITE, METH.gums)),
      flag(
        'Organic cane sugar',
        'cleared',
        labelCite(CULTURELLE_GUMMY_CITE, METH.cleared),
      ),
      flag('Water', 'cleared', labelCite(CULTURELLE_GUMMY_CITE, METH.cleared)),
      flag(
        'Colors from fruits and vegetables',
        'cleared',
        labelCite(CULTURELLE_GUMMY_CITE, METH.cleared),
      ),
      flag(
        'Corn starch',
        'cleared',
        labelCite(CULTURELLE_GUMMY_CITE, METH.cleared),
      ),
    ],
    verdict: 'caution',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: PROBIOTIC_ALTS,
    sourcesGeneral: [
      CULTURELLE_GUMMY_CITE + ' — draft, not verified; no DailyMed drug SPL',
    ],
  },

  // ── Avoid ────────────────────────────────────────────────
  {
    id: 'pepto-kids',
    productName: 'Pepto Kids',
    brand: 'Pepto',
    category: DIGESTIVE,
    barcode: '301490039663',
    formulaId: 'pepto-kids',
    audience: KIDS,
    minAge: 2,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Calcium carbonate', strength: '400mg' }],
    inactiveIngredients: [
      flag(
        'D&C Red No. 27 aluminum lake',
        'high',
        dailymed(SET_PEPTO_KIDS, METH.dyes),
      ),
      flag('Talc', 'high', dailymed(SET_PEPTO_KIDS, METH.talc)),
      flag('Flavor', 'limited', dailymed(SET_PEPTO_KIDS, METH.flavors)),
      flag('Mannitol', 'limited', dailymed(SET_PEPTO_KIDS, METH.mannitol)),
      flag('Sorbitol', 'limited', dailymed(SET_PEPTO_KIDS, METH.sorbitol)),
      cleared(SET_PEPTO_KIDS, 'Magnesium stearate'),
      cleared(SET_PEPTO_KIDS, 'Povidone'),
      cleared(SET_PEPTO_KIDS, 'Sugar'),
    ],
    verdict: 'avoid',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: TUMMY_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_PEPTO_KIDS} (draft, not verified)`,
    ],
  },
  {
    id: 'mylicon-tummy-relief-chew',
    productName: "Children's Mylicon Tummy Relief Chewable Tablets",
    brand: 'Mylicon',
    category: DIGESTIVE,
    barcode: '819903010555',
    formulaId: 'mylicon-tummy-relief-chew',
    audience: KIDS,
    minAge: 2,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Calcium carbonate', strength: '400mg' },
      { name: 'Simethicone', strength: '40mg' },
    ],
    inactiveIngredients: [
      flag('D&C Red No. 27', 'high', dailymed(SET_MYLICON_CHEW, METH.dyes)),
      flag(
        'Sucralose',
        'limited',
        dailymed(SET_MYLICON_CHEW, METH.sucralose),
      ),
      flag('Flavors', 'limited', dailymed(SET_MYLICON_CHEW, METH.flavors)),
      flag(
        'Maltodextrin',
        'limited',
        dailymed(SET_MYLICON_CHEW, METH.maltodextrin),
      ),
      cleared(SET_MYLICON_CHEW, 'Adipic acid'),
      cleared(SET_MYLICON_CHEW, 'Crospovidone'),
      cleared(SET_MYLICON_CHEW, 'Dextrose'),
      cleared(SET_MYLICON_CHEW, 'Magnesium stearate'),
    ],
    verdict: 'avoid',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: TUMMY_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_MYLICON_CHEW} (draft, not verified)`,
    ],
  },
  {
    id: 'mylicon-all-in-one-liquid',
    productName: "Children's Mylicon All-in-One Tummy Relief Liquid",
    brand: 'Mylicon',
    category: DIGESTIVE,
    barcode: '819903010739',
    formulaId: 'mylicon-all-in-one-liquid',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Calcium carbonate', strength: '400mg / 5mL' },
      { name: 'Simethicone', strength: '40mg / 5mL' },
    ],
    inactiveIngredients: [
      flag('D&C Red No. 28', 'high', dailymed(SET_MYLICON_AIO, METH.dyes)),
      flag('Sucralose', 'limited', dailymed(SET_MYLICON_AIO, METH.sucralose)),
      flag('Flavor', 'limited', dailymed(SET_MYLICON_AIO, METH.flavors)),
      flag('Sorbitol', 'limited', dailymed(SET_MYLICON_AIO, METH.sorbitol)),
      flag(
        'Benzyl alcohol',
        'cleared',
        dailymed(SET_MYLICON_AIO, METH.benzyl),
      ),
      flag('Xanthan gum', 'cleared', dailymed(SET_MYLICON_AIO, METH.gums)),
      cleared(SET_MYLICON_AIO, 'Carboxymethylcellulose sodium'),
      cleared(SET_MYLICON_AIO, 'Glycerin'),
      cleared(SET_MYLICON_AIO, 'Microcrystalline cellulose'),
      cleared(SET_MYLICON_AIO, 'Purified water'),
      cleared(SET_MYLICON_AIO, 'Sodium carbonate'),
    ],
    verdict: 'avoid',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: TUMMY_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_MYLICON_AIO} (draft, not verified)`,
    ],
  },
  {
    id: 'mylicon-infants-original',
    productName: 'Mylicon Infants Gas Relief Original',
    brand: 'Mylicon',
    category: DIGESTIVE,
    barcode: '819903010210',
    formulaId: 'mylicon-infants-original',
    audience: KIDS,
    minAge: 0,
    form: 'drops',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Simethicone', strength: '20mg / dose' }],
    inactiveIngredients: [
      flag('D&C Red No. 22', 'high', dailymed(SET_MYLICON_ORIG, METH.dyes)),
      flag('D&C Red No. 28', 'high', dailymed(SET_MYLICON_ORIG, METH.dyes)),
      flag('Natural flavors', 'limited', dailymed(SET_MYLICON_ORIG, METH.flavors)),
      flag(
        'Potassium sorbate',
        'limited',
        dailymed(SET_MYLICON_ORIG, METH.sorbate),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed(SET_MYLICON_ORIG, METH.benzoate),
      ),
      flag('Sorbitol', 'limited', dailymed(SET_MYLICON_ORIG, METH.sorbitol)),
      flag('Xanthan gum', 'cleared', dailymed(SET_MYLICON_ORIG, METH.gums)),
      cleared(SET_MYLICON_ORIG, 'Carboxymethylcellulose sodium'),
      cleared(SET_MYLICON_ORIG, 'Citric acid'),
      cleared(SET_MYLICON_ORIG, 'Microcrystalline cellulose'),
      cleared(SET_MYLICON_ORIG, 'Purified water'),
    ],
    verdict: 'avoid',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: GAS_UNDER6_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_MYLICON_ORIG} (draft, not verified)`,
    ],
  },
  {
    id: 'mylicon-infants-dyefree',
    productName: 'Mylicon Infants Gas Relief Dye-Free',
    brand: 'Mylicon',
    category: DIGESTIVE,
    barcode: '819903010234',
    formulaId: 'mylicon-infants-dyefree',
    audience: KIDS,
    minAge: 0,
    form: 'drops',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Simethicone', strength: '20mg / dose' }],
    inactiveIngredients: [
      flag(
        'Natural flavors',
        'limited',
        dailymed(SET_MYLICON_DYEFREE, METH.flavors),
      ),
      flag(
        'Potassium sorbate',
        'limited',
        dailymed(SET_MYLICON_DYEFREE, METH.sorbate),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed(SET_MYLICON_DYEFREE, METH.benzoate),
      ),
      flag('Sorbitol', 'limited', dailymed(SET_MYLICON_DYEFREE, METH.sorbitol)),
      flag('Xanthan gum', 'cleared', dailymed(SET_MYLICON_DYEFREE, METH.gums)),
      cleared(SET_MYLICON_DYEFREE, 'Carboxymethylcellulose sodium'),
      cleared(SET_MYLICON_DYEFREE, 'Citric acid'),
      cleared(SET_MYLICON_DYEFREE, 'Microcrystalline cellulose'),
      cleared(SET_MYLICON_DYEFREE, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote: 'Avoid: three or more Limited tokens triggered the stacking rule (t137u): Natural flavors, Potassium sorbate, Sodium benzoate, Sorbitol.',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: GAS_UNDER6_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_MYLICON_DYEFREE} (draft, not verified)`,
    ],
  },
  dyeFreeInfantGasRow({
    id: 'cvs-infants-gas-dyefree',
    productName: 'CVS Health Infant Gas Relief Dye-Free Drops',
    brand: 'CVS Health',
    retailers: ['CVS'],
    setid: SET_CVS_GAS_DYEFREE,
    noteBrand: 'CVS Health',
    barcode: '050428620663',
  }),
  dyeFreeInfantGasRow({
    id: 'walgreens-infants-gas-dyefree',
    productName: "Walgreens Infants Dye-Free Gas Relief Drops",
    brand: 'Walgreens',
    retailers: ['Walgreens'],
    setid: SET_WAG_GAS_DYEFREE,
    noteBrand: 'Walgreens',
    barcode: BATCH11_CATCHUP_BARCODES['walgreens-infants-gas-dyefree'],
  }),
  {
    id: 'dramamine-for-kids',
    barcode: '831248003016',
    productName: 'Dramamine for Kids',
    brand: 'Dramamine',
    category: DIGESTIVE,
    formulaId: 'dramamine-for-kids',
    audience: KIDS,
    minAge: 2,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Dimenhydrinate', strength: '25mg' }],
    inactiveIngredients: [
      flag('Aspartame', 'high', dailymed(SET_DRAM_KIDS, METH.aspartame)),
      flag('Flavor', 'limited', dailymed(SET_DRAM_KIDS, METH.flavors)),
      flag('Sorbitol', 'limited', dailymed(SET_DRAM_KIDS, METH.sorbitol)),
      cleared(SET_DRAM_KIDS, 'Citric acid'),
      cleared(SET_DRAM_KIDS, 'Magnesium stearate'),
      cleared(SET_DRAM_KIDS, 'Methacrylic acid copolymer'),
    ],
    verdict: 'avoid',
    honestNote: 'Avoid: three or more Limited tokens triggered the stacking rule (t137u): Natural flavors, Potassium sorbate, Sodium benzoate, Sorbitol.',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: NAUSEA_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_DRAM_KIDS} (draft, not verified)`,
    ],
  },
  {
    id: 'pedialyte-classic-flavored',
    productName: 'Pedialyte Classic Flavored',
    brand: 'Pedialyte',
    category: DIGESTIVE,
    formulaId: 'pedialyte-classic-flavored',
    audience: KIDS,
    minAge: 1,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    activeIngredients: [
      { name: 'Dextrose / sodium / potassium / citrate electrolytes', strength: 'as labeled' },
      { name: 'Zinc gluconate', strength: 'parked — not graded' },
    ],
    inactiveIngredients: [
      flag(
        'Sucralose',
        'limited',
        labelCite(PEDIALYTE_FLAV_CITE, METH.sucralose),
      ),
      flag(
        'Acesulfame potassium',
        'limited',
        labelCite(PEDIALYTE_FLAV_CITE, METH.acek),
      ),
      flag(
        'Natural and artificial flavors',
        'limited',
        labelCite(PEDIALYTE_FLAV_CITE, METH.flavors),
      ),
      flag(
        'FD&C dyes (Red 40 / Blue 1 / Yellow 6 on dyed flavors)',
        'high',
        labelCite(PEDIALYTE_FLAV_CITE, METH.dyes),
      ),
      flag('Water', 'cleared', labelCite(PEDIALYTE_FLAV_CITE, METH.cleared)),
      flag('Dextrose', 'cleared', labelCite(PEDIALYTE_FLAV_CITE, METH.cleared)),
      flag('Citric acid', 'cleared', labelCite(PEDIALYTE_FLAV_CITE, METH.cleared)),
    ],
    verdict: 'avoid',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ELECTROLYTE_ALTS,
    sourcesGeneral: [
      PEDIALYTE_FLAV_CITE + ' — draft, not verified; no DailyMed drug SPL',
    ],
  },
  {
    id: 'pedialyte-freezer-pops',
    productName: 'Pedialyte Freezer Pops',
    brand: 'Pedialyte',
    category: DIGESTIVE,
    formulaId: 'pedialyte-freezer-pops',
    audience: KIDS,
    minAge: 1,
    form: 'freezer pop',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    activeIngredients: [
      { name: 'Dextrose / sodium / potassium / citrate electrolytes', strength: 'as labeled' },
    ],
    inactiveIngredients: [
      flag(
        'Sucralose',
        'limited',
        labelCite(PEDIALYTE_POPS_CITE, METH.sucralose),
      ),
      flag(
        'Acesulfame potassium',
        'limited',
        labelCite(PEDIALYTE_POPS_CITE, METH.acek),
      ),
      flag(
        'Natural and artificial flavor',
        'limited',
        labelCite(PEDIALYTE_POPS_CITE, METH.flavors),
      ),
      flag(
        'Potassium sorbate',
        'limited',
        labelCite(PEDIALYTE_POPS_CITE, METH.sorbate),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        labelCite(PEDIALYTE_POPS_CITE, METH.benzoate),
      ),
      flag(
        'FD&C dyes on variety-pack sleeves (Red 40 / Blue 1 / Yellow 6)',
        'high',
        labelCite(PEDIALYTE_POPS_CITE, METH.dyes),
      ),
      flag('Water', 'cleared', labelCite(PEDIALYTE_POPS_CITE, METH.cleared)),
      flag('Dextrose', 'cleared', labelCite(PEDIALYTE_POPS_CITE, METH.cleared)),
      flag(
        'Cellulose gum',
        'cleared',
        labelCite(PEDIALYTE_POPS_CITE, METH.gums),
      ),
    ],
    verdict: 'avoid',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ELECTROLYTE_ALTS,
    sourcesGeneral: [
      PEDIALYTE_POPS_CITE + ' — draft, not verified; no DailyMed drug SPL',
    ],
  },
  {
    id: 'culturelle-kids-packets',
    productName: 'Culturelle Kids Purely Probiotics Packets',
    brand: 'Culturelle',
    category: DIGESTIVE,
    formulaId: 'culturelle-kids-packets',
    audience: KIDS,
    minAge: 1,
    form: 'powder packet',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    activeIngredients: [
      { name: 'Lactobacillus rhamnosus GG', strength: '5 billion CFU' },
    ],
    inactiveIngredients: [
      flag(
        'Sucralose',
        'limited',
        labelCite(CULTURELLE_PKT_CITE, METH.sucralose),
      ),
      flag(
        'Natural flavor',
        'limited',
        labelCite(CULTURELLE_PKT_CITE, METH.flavors),
      ),
      flag('Xylitol', 'limited', labelCite(CULTURELLE_PKT_CITE, METH.xylitol)),
      flag('Mannitol', 'limited', labelCite(CULTURELLE_PKT_CITE, METH.mannitol)),
      flag(
        'Vegetable juice (color)',
        'cleared',
        labelCite(CULTURELLE_PKT_CITE, METH.cleared),
      ),
      flag(
        'Magnesium stearate',
        'cleared',
        labelCite(CULTURELLE_PKT_CITE, METH.cleared),
      ),
    ],
    verdict: 'avoid',
    honestNote: 'Avoid: three or more Limited tokens triggered the stacking rule (t137u): Sucralose, Natural flavor, Xylitol, Mannitol.',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: PROBIOTIC_ALTS,
    sourcesGeneral: [
      CULTURELLE_PKT_CITE + ' — draft, not verified; no DailyMed drug SPL',
      'culturelle.com Kids Purely Probiotics Packets (current No Flavor Added / mannitol + inulin carton is a different formula)',
    ],
  },
];

for (const record of BATCH11_KIDS_DIGESTIVE) {
  const expected = BATCH11_CATCHUP_BARCODES[record.id];
  if (expected && record.barcode !== expected) {
    throw new Error(`batch 11 catch-up UPC drift on ${record.id}`);
  }
}

const gasDrops = BATCH11_KIDS_DIGESTIVE.find((record) => record.id === 'little-remedies-gas-drops');
if (!gasDrops || gasDrops.barcode !== '756184120415' || gasDrops.verdict !== 'avoid') {
  throw new Error('Natural Berry gas drops must be Avoid (t137u stack) on 756184120415');
}
if (
  !gasDrops.honestNote?.includes('stacking rule (t137u)')
  || !/Propylene glycol|Sucralose|Natural flavor/.test(gasDrops.honestNote ?? '')
) {
  throw new Error('Natural Berry gas drops must carry t137u stack honest note');
}
if (gasDrops.inactiveIngredients.some((item) => /strawberry/i.test(item.name))) {
  throw new Error('Natural Berry gas drops must not keep the strawberry flavor line');
}
if (!gasDrops.inactiveIngredients.some((item) => item.name === 'Natural flavor' && item.riskLevel === 'limited')) {
  throw new Error('Natural Berry gas drops must list natural flavor');
}
if (/756184000137/.test(JSON.stringify(gasDrops))) {
  throw new Error('Natural Berry gas drops must not carry the strawberry code');
}
