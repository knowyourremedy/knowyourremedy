// DRAFT / not verified / batch 24 iHerb+Fullscript / founder-approved
// Cleaner-alternative fills only / founder calls locked / methodology
// untouched.
//
// Mixed categories (Sleep + Vitamins) · audience 'adult' · recordStatus
// is 'unverified' on every row. Founder calls (locked): see notes below.
// Methodology v1.6 grades only — do not change locked ingredient grades.
// Do NOT invent Clean. Do NOT grade essential oils. Do NOT invent UPCs
// except KYR5-b catch-up allowlist. Pack sizes share
// formulaId. formulaId == id on every row (same pattern as prior batches).
// Form is labeled on cleanAlternatives, not a hard filter (§6).
// Not wired into Clean Picks UI. No live Clean Picks file is edited from
// this draft. Methodology.md / PROJECT_NOTES.md are untouched.
// batch 23 branded oil drafts live elsewhere — this file does not touch
// oil records and does not grade oils.
//
// PE D3 STRENGTHS (LOCKED): This row is the 5000 IU (125 mcg) SKU only.
// Other Pure Encapsulations D3 strengths share this formulaId ONLY when
// the other-ingredients list is the same (hypoallergenic plant fiber
// cellulose + vegetarian capsule cellulose/water). Pack sizes of the
// 5000 IU SKU share formulaId.
//
// FOUNDER CALLS (LOCKED) — write these 6 rows only:
// CLEAN
// - IH5 Pure Encapsulations Melatonin-SR 3 mg = Clean. Sleep hole fill.
//   Cellulose / HPMC / MCC / carnauba Cleared. Sodium alginate is on the
//   label but NOT in Methodology §5 (ungraded; v1.6 intake) — notes only,
//   not a demerit driver (same pattern as batch 10 Gaviscon / Phillips
//   ungraded notes and batch 7 Genexa PM ungraded rice extract). No
//   TiO2 / dye / sucralose. No efficacy claim.
// - IH14 Pure Encapsulations Vitamin D3 5000 IU (125 mcg) = Clean.
//   Hypoallergenic plant fiber (cellulose) + vegetarian capsule
//   (cellulose, water).
// - IH19 Pure Encapsulations PreNatal Nutrients = Clean. Vegetarian
//   capsule (cellulose, water) + ascorbyl palmitate (v1.6 antioxidant
//   lock). CONFIRMED no SiO2 / TiO2 / dye / talc on matched US
//   iHerb / DSLD 186344 label.
// - IH20 Thorne Basic Prenatal = Clean on the CURRENT / on-market label
//   only (iHerb / DSLD 233482): hypromellose + calcium laurate. Founder
//   lock: Clean if hypromellose + calcium laurate. Calcium laurate is
//   the stearate-class lubricant on that founder-approved stack (cite
//   founder call + current label). Older DSLD lots that listed SiO2
//   would be Caution — not this draft. No TiO2 / dye / talc / SiO2 on
//   the current label.
// CAUTION
// - IH16 Nordic Naturals Ultimate Omega lemon softgels = Caution.
//   Natural lemon flavor only flag (Methodology §5 Limited-risk natural
//   flavors → 1 pt Caution). Gelatin / glycerin / water Cleared.
//   RRR-alpha tocopherol / mixed tocopherols Cleared. Rosemary extract
//   is not independently listed in §5 — ungraded (v1.6 intake); omit
//   from the scored array (batch 7 Genexa PM rice-extract pattern).
//   No independently Clean fish-oil row IN THIS batch — cleanAlternatives
//   omitted (honest empty; do not point at Nature Made D3 or batch 18
//   fish oils).
// - IH21 Designs for Health Prenatal Pro = Caution. Founder locked
//   Caution (SiO2). Silicon dioxide is the nanoparticle Caution cap
//   (0 demerit points) — same encoding as batch 15 Nature Made Prenatal
//   Multi tablets. Verdict caution, NOT avoid. Cellulose capsule / MCC /
//   sunflower lecithin / vegetable stearate Cleared.
//
// TALLY (unverified drafts): 6 rows — Clean 5 / Caution 1 / Avoid 0.
// Independently Clean in THIS batch: PE Melatonin-SR 3 mg (Sleep);
// PE D3 5000 IU; PE PreNatal Nutrients; Thorne Basic Prenatal.
// cleanAlternatives on the DFH prenatal Caution row point at the two
// in-batch Clean prenatals (form labeled, not a hard filter). Omitted
// on Clean rows. Omitted on Nordic Ultimate Omega (no Clean fish-oil
// peer in this batch).
//
// formulaIds:
// - pure-encapsulations-melatonin-sr-3mg (Clean, Sleep)
// - pure-encapsulations-d3-5000 (Clean, Vitamins)
// - pure-encapsulations-prenatal-nutrients (Clean, Vitamins)
// - thorne-basic-prenatal (Clean, Vitamins)
// - nordic-naturals-ultimate-omega-lemon (Caution, Vitamins)
// - dfh-prenatal-pro (Caution, Vitamins)
//
// FLAG / SKIP (do not write rows):
// - IH10 Pure Encapsulations Probiotic 50B — FLAG: founder lock was
//   rice starch + veg capsule only; matched US iHerb / DSLD lists
//   cellulose + gellan gum (gellan NOT in §5 — ungraded). Fullscript /
//   CA listings differ (phosphate / trehalose / sucrose etc.). Do not
//   invent Clean.
// - IH2 Genexa Acetaminophen PM — already exists in batch 7 as
//   formulaId `genexa-acetaminophen-pm` Caution; reuse only, do not
//   rewrite; not confirmed on iHerb.
// - Reuse-only channel expands (Genexa ES / Allergy, Oscillo / ColdCalm
//   / Quietude / SleepCalm, Umcka, Alaway PF, MegaFood Caution) — do
//   not touch those files.
// - No Clean conventional IBU / kids cetirizine liquid / antacid chew /
//   elderberry / PE melatonin 20 mg / graded oils.
//
// ZINC IS PARKED (Methodology v1.6): never invent an active-safety grade.
// Grade inactives only. Every zinc-containing prenatal honestNote says
// zinc is parked. Silicon dioxide / silica = Caution cap, not Avoid
// alone. Honest notes may say the carton is labeled for pregnancy /
// prenatal use. No dosing. No medical advice. No "consult your doctor"
// prescriptions. Iron overdose child warning may be noted as on-carton
// when iron is labeled.

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

const METH = {
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  namedFruitFlavor:
    'Methodology §5 Cleared (named Natural [fruit] Flavor — founder lock t132u Oct 20, 2026; §4 natural takes best of two options).',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  tocopherols:
    'Methodology §5 Cleared (mixed tocopherols / ascorbyl palmitate as antioxidants — locked v1.6)',
  lecithin:
    'Methodology §5 Cleared (lecithin — soy or sunflower — locked v1.6)',
  calciumLaurate:
    'Methodology §5 Cleared-class (calcium laurate — stearate-family lubricant on the founder-approved hypromellose + calcium laurate Clean stack; cite founder call + current on-market label, not a new High lock)',
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

const PE_MELATONIN_ID = 'pure-encapsulations-melatonin-sr-3mg';
const PE_D3_ID = 'pure-encapsulations-d3-5000';
const PE_PRENATAL_ID = 'pure-encapsulations-prenatal-nutrients';
const THORNE_PRENATAL_ID = 'thorne-basic-prenatal';
const NORDIC_OMEGA_ID = 'nordic-naturals-ultimate-omega-lemon';
const DFH_PRENATAL_ID = 'dfh-prenatal-pro';

const BATCH24_CATCHUP_BARCODES: Record<string, string> = {
  [DFH_PRENATAL_ID]: '879452002623',
};

const PE_MELATONIN_CITE =
  'Pure Encapsulations Melatonin-SR 3 mg iHerb product page / DSLD 185040 / pureencapsulationspro PDF PURE_PIS_MelatoninSR.pdf (microcrystalline cellulose; vegetarian capsule cellulose/water; hypoallergenic plant fiber cellulose; hydroxypropyl methylcellulose / HPMC; sodium alginate; carnauba wax)';
const PE_D3_CITE =
  'Pure Encapsulations Vitamin D3 125 mcg (5,000 IU) iHerb other-ingredients (hypoallergenic plant fiber (cellulose), vegetarian capsule (cellulose, water))';
const PE_PRENATAL_CITE =
  'Pure Encapsulations PreNatal Nutrients US iHerb / DSLD 186344 other-ingredients (vegetarian capsule (cellulose, water), ascorbyl palmitate; no SiO2 / TiO2 / dye / talc)';
const THORNE_PRENATAL_CITE =
  'Thorne Basic Prenatal current / on-market iHerb / DSLD 233482 other-ingredients (hypromellose (derived from cellulose) capsule, calcium laurate; no SiO2 / TiO2 / dye / talc)';
const NORDIC_OMEGA_CITE =
  'Nordic Naturals Ultimate Omega lemon softgels iHerb (640 mg total omega-3 per softgel / 1280 mg per 2-softgel serving) other-ingredients (purified deep sea fish oil; soft gel capsule (gelatin, glycerin, water, natural flavor); natural flavor; RRR-alpha tocopherol (antioxidant); rosemary extract (a natural preservative))';
const DFH_PRENATAL_CITE =
  'Designs for Health Prenatal Pro iHerb / Fullscript other-ingredients (cellulose (capsule), microcrystalline cellulose, sunflower lecithin, vegetable stearate, silicon dioxide)';

const PRENATAL_ALTS: CleanAlternative[] = [
  {
    productId: PE_PRENATAL_ID,
    rankReason:
      'Independently Clean in-batch Pure Encapsulations PreNatal Nutrients (vegetarian capsule cellulose/water + ascorbyl palmitate; no SiO2 / TiO2 / dye / talc). Form: capsule — labeled, not a hard filter (§6).',
  },
  {
    productId: THORNE_PRENATAL_ID,
    rankReason:
      'Independently Clean in-batch Thorne Basic Prenatal (current on-market hypromellose + calcium laurate; no SiO2 / TiO2 / dye / talc). Form: capsule — labeled, not a hard filter (§6).',
  },
];

export const BATCH24_IHERB_FULLSCRIPT: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  {
    id: PE_MELATONIN_ID,
    productName: 'Pure Encapsulations Melatonin-SR 3 mg',
    brand: 'Pure Encapsulations',
    category: SLEEP,
    barcode: '766298017891 766298023724',
    formulaId: PE_MELATONIN_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Melatonin (sustained-release)', strength: '3mg' },
    ],
    inactiveIngredients: [
      labelCleared(PE_MELATONIN_CITE, 'Microcrystalline cellulose'),
      labelCleared(PE_MELATONIN_CITE, 'Vegetarian capsule (cellulose, water)'),
      labelCleared(PE_MELATONIN_CITE, 'Hypoallergenic plant fiber (cellulose)'),
      labelCleared(PE_MELATONIN_CITE, 'Hydroxypropyl methylcellulose (HPMC)'),
      labelCleared(PE_MELATONIN_CITE, 'Carnauba wax'),
    ],
    verdict: 'clean',

    retailers: ['iHerb', 'Fullscript'],
    sourcesGeneral: [
      `${PE_MELATONIN_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: PE_D3_ID,
    productName: 'Pure Encapsulations Vitamin D3 5000 IU (125 mcg)',
    brand: 'Pure Encapsulations',
    category: VITAMINS,
    barcode: '766298008172 766298008165 766298013497 766298024103',
    formulaId: PE_D3_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Vitamin D3 (cholecalciferol)', strength: '125mcg (5000 IU)' },
    ],
    inactiveIngredients: [
      labelCleared(PE_D3_CITE, 'Hypoallergenic plant fiber (cellulose)'),
      labelCleared(PE_D3_CITE, 'Vegetarian capsule (cellulose, water)'),
    ],
    verdict: 'clean',

    retailers: ['iHerb', 'Fullscript'],
    sourcesGeneral: [
      `${PE_D3_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: PE_PRENATAL_ID,
    productName: 'Pure Encapsulations PreNatal Nutrients',
    brand: 'Pure Encapsulations',
    category: VITAMINS,
    barcode: '766298016276 766298016269 766298024844 766298024851',
    formulaId: PE_PRENATAL_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Prenatal multivitamin / multimineral', strength: '2 capsules (label serving)' },
      { name: 'Folate (as Metafolin, L-5-MTHF)', strength: '1667mcg DFE (1000 mcg L-5-MTHF)' },
      { name: 'Iron (as iron glycinate)', strength: '27mg' },
      { name: 'Zinc (as zinc citrate)', strength: '15mg' },
    ],
    inactiveIngredients: [
      labelCleared(PE_PRENATAL_CITE, 'Vegetarian capsule (cellulose, water)'),
      flag(
        'Ascorbyl palmitate',
        'cleared',
        labelCite(PE_PRENATAL_CITE, METH.tocopherols),
      ),
    ],
    verdict: 'clean',

    retailers: ['iHerb', 'Fullscript'],
    sourcesGeneral: [
      `${PE_PRENATAL_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: THORNE_PRENATAL_ID,
    productName: 'Thorne Basic Prenatal',
    brand: 'Thorne',
    category: VITAMINS,
    barcode: '693749015048',
    formulaId: THORNE_PRENATAL_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Prenatal multivitamin / multimineral', strength: '3 capsules (label serving)' },
      {
        name: 'Folate (as L-5-methyltetrahydrofolate)',
        strength: '1.7mg DFE (1 mg L-5-MTHF)',
      },
      { name: 'Iron (as Ferrochel ferrous bisglycinate chelate)', strength: '45mg' },
      { name: 'Zinc (as TRAACS zinc bisglycinate chelate)', strength: '25mg' },
    ],
    inactiveIngredients: [
      labelCleared(THORNE_PRENATAL_CITE, 'Hypromellose (derived from cellulose) capsule'),
      flag(
        'Calcium laurate',
        'cleared',
        labelCite(THORNE_PRENATAL_CITE, METH.calciumLaurate),
      ),
    ],
    verdict: 'clean',

    retailers: ['iHerb', 'Fullscript'],
    sourcesGeneral: [
      `${THORNE_PRENATAL_CITE} — draft, not verified; current on-market label only; no DailyMed drug SPL`,
    ],
  },

  // ── Caution ──────────────────────────────────────────────
  {
    id: NORDIC_OMEGA_ID,
    productName: 'Nordic Naturals Ultimate Omega (lemon)',
    brand: 'Nordic Naturals',
    category: VITAMINS,
    barcode: '768990017902 768990017971 768990017919 768990027901 768990037900',
    formulaId: NORDIC_OMEGA_ID,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [
      {
        name: 'Fish oil / total omega-3s (EPA + DHA)',
        strength: '640mg per softgel (1280mg per 2-softgel serving as labeled)',
      },
      { name: 'EPA (eicosapentaenoic acid)', strength: '325mg per softgel (650mg per 2-softgel serving)' },
      { name: 'DHA (docosahexaenoic acid)', strength: '225mg per softgel (450mg per 2-softgel serving)' },
    ],
    inactiveIngredients: [
      flag('Natural lemon flavor', 'cleared', labelCite(NORDIC_OMEGA_CITE, METH.namedFruitFlavor)),
      labelCleared(NORDIC_OMEGA_CITE, 'Gelatin'),
      labelCleared(NORDIC_OMEGA_CITE, 'Glycerin'),
      labelCleared(NORDIC_OMEGA_CITE, 'Water'),
      flag(
        'RRR-alpha tocopherol (antioxidant)',
        'cleared',
        labelCite(NORDIC_OMEGA_CITE, METH.tocopherols),
      ),
    ],
    verdict: 'clean',

    retailers: ['iHerb'],
    sourcesGeneral: [
      `${NORDIC_OMEGA_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
  {
    id: DFH_PRENATAL_ID,
    productName: 'Designs for Health Prenatal Pro',
    brand: 'Designs for Health',
    category: VITAMINS,
    barcode: BATCH24_CATCHUP_BARCODES[DFH_PRENATAL_ID],
    formulaId: DFH_PRENATAL_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Prenatal multivitamin / multimineral', strength: '4 capsules (label serving)' },
      {
        name: 'Folate (as Quatrefolic [6S]-5-methyltetrahydrofolate)',
        strength: '1360mcg DFE',
      },
      { name: 'Iron (as Ferrochel ferrous bisglycinate chelate)', strength: '27mg' },
      { name: 'Zinc (as zinc bisglycinate chelate)', strength: '13mg' },
    ],
    inactiveIngredients: [
      flag('Silicon dioxide', 'cleared', labelCite(DFH_PRENATAL_CITE, METH.sio2)),
      labelCleared(DFH_PRENATAL_CITE, 'Cellulose (capsule)'),
      labelCleared(DFH_PRENATAL_CITE, 'Microcrystalline cellulose'),
      flag(
        'Sunflower lecithin',
        'cleared',
        labelCite(DFH_PRENATAL_CITE, METH.lecithin),
      ),
      labelCleared(DFH_PRENATAL_CITE, 'Vegetable stearate'),
    ],
    verdict: 'caution',

    retailers: ['iHerb', 'Fullscript'],
    cleanAlternatives: PRENATAL_ALTS,
    sourcesGeneral: [
      `${DFH_PRENATAL_CITE} — draft, not verified; no DailyMed drug SPL`,
    ],
  },
];

for (const record of BATCH24_IHERB_FULLSCRIPT) {
  const expected = BATCH24_CATCHUP_BARCODES[record.id];
  if (expected && record.barcode !== expected) {
    throw new Error(`batch 24 catch-up UPC drift on ${record.id}`);
  }
}
