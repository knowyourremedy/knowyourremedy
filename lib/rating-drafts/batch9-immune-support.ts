// DRAFT / not verified / batch 9 Immune Support (adult + kids)
// Immune Support · audience 'adult' | 'kids' · recordStatus is 'unverified'
// on every row. Founder calls (locked): see notes below. Do NOT invent Clean.
// Methodology v1.6 grades only — do not change locked ingredient grades.
// Homeopathic rows set productSubtype + homeopathicSubtype = 'homeopathic'.
// Barcodes omitted — do not invent UPCs. Pack sizes share formulaId.
// HFCS is parked (Methodology §5) — mentioned in honestNotes only, never graded.
// Form is labeled on cleanAlternatives, not a hard filter (§6).
// Not wired into Clean Picks UI. No live Immune / Cold & Flu picks file is
// edited from this draft. Methodology.md / PROJECT_NOTES.md are untouched.
//
// BATCH 3 WINS on shared formulaIds (do not invent a second grade):
// - Oscillococcinum Immune row REUSES formulaId `boiron-oscillococcinum-200ck`
//   (batch 3 Clean). Same Clean grade. STRONG 200CK Avogadro note kept /
//   strengthened. Immune aisle minAge 2 from kids 2+ chart (setid 11a2f33d).
//   Do NOT create a second formulaId.
// - Sambucol Original Syrup Immune row REUSES formulaId `sambucol-original-syrup`
//   (batch 3 Caution, potassium sorbate). Same Caution grade. Aisle-coverage
//   row like batch 8 Benadryl Sleep. minAge 4 (kids chart). Do not change grade.
// - ColdCalm: SKIP entirely (already in Cold & Flu).
// - Umcka: SKIP all new grades. Batch 3 already has
//   `umcka-coldcare-alcohol-free-sorbate`, `umcka-menthol-syrup`,
//   `umcka-fastactives-berry` (Caution). No Clean aronia Umcka row exists in
//   batch 3 — do NOT invent one.
//
// FOUNDER CALLS (LOCKED) — approved rows only:
// - I1 Oscillococcinum Immune = Clean. Shared formulaId
//   `boiron-oscillococcinum-200ck`. Lactose + sucrose. STRONG 200CK note.
//   Audience adult; minAge 2 (setid 11a2f33d 2+ chart).
// - I2 Sambucol Original Syrup Immune = Caution (sorbate). Shared formulaId
//   `sambucol-original-syrup`. minAge 4.
// - I3 Nature's Way Sambucus Kids gummies (coconut-only) = Caution. Natural
//   flavors + coconut oil only (current naturesway.com). Separate formulaId
//   from the palm / vegetable-oil Avoid twin. minAge 2. Zinc parked.
// - I4 Sambucol Cold & Flu Relief homeopathic tablets = Caution. Maltodextrin
//   + elderberry flavor. setid 4dc2088f. Zincum gluconate is an active —
//   parked-zinc note only. minAge 12.
// - I5 Cold-EEZE classic lozenge = Caution. Natural flavors. setid 016937dd.
//   Zinc parked. minAge 12.
// - I6 Airborne chewable = Caution. Sucralose + flavors + SiO2 (± maltodextrin).
//   Raw 2+1 math is 3 pts Avoid — draft follows the approved Caution call
//   (SiO2 is a 0-pt cap, not a softener). Zinc parked. minAge 12.
// - I7 Airborne gummies = Caution. Current retailer lists have no seed / veg
//   oil; do not invent Avoid. Honest note flags the carton (a later oil
//   listing is a different formula). Zinc parked. minAge 12.
// - I8 Emergen-C Super Orange = Caution. Maltodextrin + natural flavors +
//   SiO2. Brand PDF inactives. Zinc ascorbate is an active — parked. minAge 14.
// - I9 Source Naturals Wellness Formula tabs = Caution. Silica / SiO2 locked
//   nanoparticle cap. Inactives: MCC, dibasic Ca phosphate, HPC, modified
//   cellulose gum, stearic acid, Mg stearate, silica. Separate formulaId
//   from caps. Zinc parked.
// - I10 Source Naturals Wellness Formula caps = Caution. Colloidal silicon
//   dioxide (± gelatin). Separate formulaId from tabs. Zinc parked.
// - I11 Sovereign Silver Bio-Active Silver Hydrosol = Caution. Silver +
//   purified water. LOCKED active-safety Caution cap (argyria). Do not
//   invent Clean even though additives are 0 pts.
// - I12 Zarbee's Kids Immune syrup = Caution. Flavor + potassium sorbate;
//   no seed oil. Brand page confirmed. minAge 2. Zinc parked.
// - I13 Zarbee's Kids Immune gummies = Caution (not Avoid). Flavor +
//   maltodextrin; current kids brand list has NO seed / veg oil. minAge 2.
//   Zinc parked. A later oil carton is a different formula.
// - I14 Sambucol elderberry gummies = Avoid. Vegetable oil in gummies (US
//   brand / CVS listings). Zinc parked.
// - I15 Nature's Way Sambucus Kids gummies (veg oil / palm + coconut) =
//   Avoid. Separate formulaId from coconut-only Caution. minAge 2. Zinc parked.
// - I16 Cold-EEZE Ace-K lozenge = Avoid. Ace-K (Moderate 2) + flavors
//   (Limited 1) = 3 → Avoid per founder (2+1 points). setid 0326ab93.
//   Zinc parked. minAge 12.
// - I17 Cold-EEZE UltraMELT dyed = Avoid. Red 40 + Yellow 5 lakes. setid
//   04b6992d. Zinc parked. minAge 12.
// - I18 Zicam RapidMelts dyed (Cherry, representative SPL) = Avoid. Red 40
//   lake + sucralose + flavor. setid bbf032cc. Zinc parked. minAge 12.
// - I19 Zicam Ultra RapidMelts = Avoid. Sucralose + flavor (founder lock
//   even without dye). setid 6216d5f2. Zinc parked. minAge 12.
//
// TALLY (unverified drafts): 19 rows — Clean 1 / Caution 12 / Avoid 6.
// Independently Clean in THIS batch only: Oscillococcinum (shared formulaId
// with batch 3). Caution / Avoid rows offer that homeopathic pellet as the
// §6 alternative (form labeled). Note the 200CK limitation in rankReason.
//
// SKIPPED (founder skip — do not invent Clean / do not write):
// - ColdCalm (already in Cold & Flu)
// - All new Umcka grades (batch 3 wins; no Clean aronia invented)
// - Equate / up&up elderberry syrup (no confirmed brick-and-mortar sorbate
//   / flavor-only label — unlabeled, skip)
// - Store-brand elderberry gummies without a concrete store SKU + confirmed
//   seed / veg oil (up&up current list has no oil)
// - Amazon-only / club SKUs
//
// ZINC IS PARKED (Methodology v1.6): never invent an active-safety grade.
// Grade inactives only. Every zinc-containing row's honestNote says zinc is
// parked. Colloidal silver = locked Caution active-safety cap even if
// additives are Clean. Silicon dioxide / silica = Caution cap (Nanoparticle
// Precautionary Rule), not Avoid alone. Seed / industrial oils in gummies
// (vegetable oil, palm, canola, sunflower, soybean) = High Avoid. Coconut
// oil alone ≠ that High rule.
//
// NATURE'S WAY CARTON SPLIT: coconut-only (current brand page) = Caution;
// vegetable oil (palm and coconut) / generic vegetable oil = Avoid.
// Separate formulaIds. Do not merge them.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const IMMUNE = 'Immune Support';
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const HOMEOPATHIC = 'homeopathic' as const;
const HERBAL = 'herbal' as const;

const METH = {
  dyes: 'Methodology §5 High-tier (synthetic dyes, including lake forms)',
  seedOilGummies:
    'Methodology §5 High-tier (seed/industrial oils in gummies — soybean, canola, palm, "vegetable oil", sunflower)',
  acek: 'Methodology §5 Moderate-risk (acesulfame potassium)',
  sucralose: 'Methodology §5 Moderate-risk (sucralose)',
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  maltodextrin: 'Methodology §5 Limited-risk (non-organic maltodextrin)',
  sorbate: 'Methodology §5 Limited-risk (synthetic preservatives — potassium sorbate)',
  sorbitol: 'Methodology §5 Limited-risk (sugar alcohols — sorbitol)',
  xylitol: 'Methodology §5 Limited-risk (xylitol, oral)',
  erythritol: 'Methodology §5 Limited-risk (xylitol, erythritol — oral sugar alcohols)',
  mannitol: 'Methodology §5 Limited-risk (sugar alcohols — mannitol)',
  sugarAlcohol:
    'Methodology §5 Limited-risk (other sugar alcohols — isomalt / sugar-alcohol class)',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  betaCaroteneColor:
    'Methodology §5 Caution (beta-carotene as a color additive — standalone Caution, not additive-scored, not Avoid)',
  gums: 'Methodology §5 Cleared (xanthan gum / gum arabic / guar / pectin / acacia — locked v1.6)',
  tocopherols:
    'Methodology §5 Cleared (mixed tocopherols / ascorbyl palmitate as antioxidants — locked v1.6)',
  organicFlavor: 'Methodology §5 Cleared (organic agave / organic flavors)',
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

const CARLSTON =
  'Carlston M (ed), Classical Homeopathy, Churchill Livingstone 2003 — homeopathic eligibility is cleanliness + documented evidentiary framework only; no efficacy claim.';

const ZINC_PARKED =
  'Zinc (gluconate / acetate / citrate / oxide / ascorbate, including homeopathic zincum gluconicum) is parked as of Methodology v1.6 — active-safety-cap review is not done. This draft grades inactives only and does not invent an active-safety grade for zinc.';

const AVOGADRO_200CK =
  'STRONG HONEST NOTE: 200CK is far beyond Avogadro\'s number — no measurable active remains. Cleanliness grade only; no efficacy claim.';

const OSCILLO_ID = 'oscillococcinum';
const OSCILLO_FORMULA = 'boiron-oscillococcinum-200ck';
const SAMBUCOL_SYRUP_FORMULA = 'sambucol-original-syrup';

const SET_OSCILLO_2PLUS = '11a2f33d-1c66-422e-9ec0-fbb114007080';
const SET_OSCILLO_BATCH3 = '209c4ec1-e06c-5679-e063-6394a90a793a';
const SET_SAMBUCOL_HOMEOPATHIC = '4dc2088f-3f13-4e49-83e4-44c2a26d195f';
const SET_COLDEEZE_CLASSIC = '016937dd-6599-849a-e063-6294a90a24d3';
const SET_COLDEEZE_ACEK = '0326ab93-0b3b-7f29-e063-6294a90a01be';
const SET_COLDEEZE_ULTRAMELT = '04b6992d-c7c5-56c7-e063-6394a90ae8d0';
const SET_ZICAM_RAPIDMELTS_DYED = 'bbf032cc-4895-2271-e053-2a95a90ad68e';
const SET_ZICAM_ULTRA = '6216d5f2-d6a0-4681-a3b1-1b60d1f008d5';

const NW_COCONUT_CITE =
  "Nature's Way brand page (Sambucus Kids Elderberry Immune Gummies; coconut oil only)";
const NW_VEG_CITE =
  "Nature's Way Sambucus Kids retailer listings (vegetable oil (palm and coconut) / generic vegetable oil)";
const SAMBUCOL_GUMMY_CITE =
  'Sambucol USA / CVS Black Elderberry Gummies listings (vegetable oil)';
const SAMBUCOL_SYRUP_CITE =
  'Sambucol / Clean Picks + batch 3 label (Original Syrup; no DailyMed SPL)';
const AIRBORNE_CHEW_CITE =
  'Airborne chewable retailer / rbNA ingredient pages (citrus chewable)';
const AIRBORNE_GUMMY_CITE =
  'Airborne Original Gummies retailer listings (Instacart / Swanson; carton oil flag)';
const EMERGENC_CITE =
  'Emergen-C Super Orange brand PDF lbl-00000524 (fructose / maltodextrin / flavors / SiO2)';
const SN_TABS_CITE =
  'Source Naturals Wellness Formula tablets (MCC / dibasic Ca phosphate / HPC / silica)';
const SN_CAPS_CITE =
  'Source Naturals Wellness Formula capsules (gelatin / colloidal silicon dioxide)';
const SILVER_CITE =
  'Sovereign Silver Bio-Active Silver Hydrosol brand page (silver + purified water)';
const ZARBEES_SYRUP_CITE =
  "Zarbee's.com Children's Daily Immune Support syrup (flavor + potassium sorbate)";
const ZARBEES_GUMMY_CITE =
  "Zarbee's.com Children's Elderberry Immune Support gummies (mighty-bee; no seed oil)";

// Independently Clean rows in THIS batch only. Form is labeled, not a hard
// filter (§6). Oscillo is the only Clean analog here (200CK limitation).
const OSCILLO_ALTS: CleanAlternative[] = [
  {
    productId: OSCILLO_ID,
    rankReason:
      'Independently Clean Immune Support analog in this batch (Boiron Oscillococcinum, homeopathic meltaway pellets; shared formulaId with batch 3). Form: meltaway pellets — labeled, not a hard filter (§6). 200CK limitation: far beyond Avogadro\'s number — no measurable active remains; cleanliness only, not an efficacy swap.',
  },
];

export const BATCH9_IMMUNE_SUPPORT: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  {
    id: OSCILLO_ID,
    productName: 'Boiron Oscillococcinum',
    brand: 'Boiron',
    category: IMMUNE,
    formulaId: OSCILLO_FORMULA,
    audience: ADULT,
    minAge: 2,
    form: 'meltaway pellets',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      {
        name: 'Anas barbariae hepatis et cordis extractum',
        strength: '200CK HPUS',
      },
    ],
    inactiveIngredients: [
      cleared(SET_OSCILLO_2PLUS, 'Lactose'),
      cleared(SET_OSCILLO_2PLUS, 'Sucrose'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Oscillococcinum Immune Support row = Clean. SAME formulaId `boiron-oscillococcinum-200ck` and SAME Clean grade as batch 3 — do not invent a second grade. Draft Clean on inactives only (lactose, sucrose). ' +
      AVOGADRO_200CK +
      ' ' +
      CARLSTON +
      ' Immune aisle coverage: audience stays adult (standard drugstore SKU) with minAge 2 from the kids 2+ chart on setid 11a2f33d (under 2: ask a doctor). Batch 3 Cold & Flu row used setid 209c4ec1 with 12+ directions; inactives match. Contains lactose. Pack sizes share formulaId.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Whole Foods'],
    sourcesGeneral: [
      `DailyMed setid ${SET_OSCILLO_2PLUS} (2+ chart; draft, not verified)`,
      `DailyMed setid ${SET_OSCILLO_BATCH3} (batch 3 adult 12+ twin; same inactives)`,
      CARLSTON,
    ],
  },

  // ── Caution ──────────────────────────────────────────────
  {
    id: 'sambucol-original-syrup',
    productName: 'Sambucol Black Elderberry Original Syrup',
    brand: 'Sambucol',
    category: IMMUNE,
    barcode: '896116001112',
    formulaId: SAMBUCOL_SYRUP_FORMULA,
    audience: ADULT,
    minAge: 4,
    form: 'syrup',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: HERBAL,
    activeIngredients: [
      {
        name: 'Black elderberry extract',
        strength: '16,720mg per max serving (label)',
      },
    ],
    inactiveIngredients: [
      flag(
        'Potassium sorbate',
        'limited',
        labelCite(SAMBUCOL_SYRUP_CITE, METH.sorbate),
      ),
      flag(
        'Glucose syrup',
        'cleared',
        labelCite(SAMBUCOL_SYRUP_CITE, METH.cleared),
      ),
      flag(
        'Purified water',
        'cleared',
        labelCite(SAMBUCOL_SYRUP_CITE, METH.cleared),
      ),
      flag(
        'Citric acid',
        'cleared',
        labelCite(SAMBUCOL_SYRUP_CITE, METH.cleared),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Sambucol Original Syrup Immune row = Caution (potassium sorbate). SAME formulaId `sambucol-original-syrup` and SAME Caution grade as batch 3 — aisle-coverage row (batch 8 Benadryl Sleep pattern). Do not change the grade. Glucose syrup is Cleared. Immune aisle minAge 4 (kids chart on the Original Syrup carton; adult audience for the standard drugstore SKU). Gummies with vegetable oil are a different formula (`sambucol-elderberry-gummies`) and are not this row. No DailyMed SPL (dietary supplement).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Whole Foods', 'Sprouts'],
    cleanAlternatives: OSCILLO_ALTS,
    sourcesGeneral: [
      'Batch 3 `sambucol-original-syrup` + Sambucol Original Syrup label (draft, not verified; no DailyMed SPL)',
    ],
  },
  {
    id: 'natures-way-sambucus-kids-gummies-coconut',
    productName: "Nature's Way Sambucus Kids Elderberry Immune Gummies (coconut-only)",
    brand: "Nature's Way",
    category: IMMUNE,
    barcode: '033674123461 033674122853',
    formulaId: 'natures-way-sambucus-kids-gummies-coconut',
    audience: KIDS,
    minAge: 2,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: HERBAL,
    activeIngredients: [
      { name: 'Vitamin C (ascorbic acid)', strength: '60mg per 2 gummies' },
      { name: 'Zinc (as zinc citrate)', strength: '2.2mg per 2 gummies' },
      {
        name: 'Black elder (Sambucus nigra L.) extract (berry)',
        strength: '50mg per 2 gummies',
      },
    ],
    inactiveIngredients: [
      flag('Natural flavors', 'limited', labelCite(NW_COCONUT_CITE, METH.flavors)),
      flag(
        'Coconut oil',
        'cleared',
        labelCite(
          NW_COCONUT_CITE,
          `${METH.cleared} — coconut oil only; not the gummy seed/industrial-oil High rule`,
        ),
      ),
      flag(
        'Organic tapioca syrup',
        'cleared',
        labelCite(NW_COCONUT_CITE, METH.cleared),
      ),
      flag('Cane sugar', 'cleared', labelCite(NW_COCONUT_CITE, METH.cleared)),
      flag('Purified water', 'cleared', labelCite(NW_COCONUT_CITE, METH.cleared)),
      flag('Pectin', 'cleared', labelCite(NW_COCONUT_CITE, METH.gums)),
      flag('Citric acid', 'cleared', labelCite(NW_COCONUT_CITE, METH.cleared)),
      flag('Sodium citrate', 'cleared', labelCite(NW_COCONUT_CITE, METH.cleared)),
      flag('Beeswax', 'cleared', labelCite(NW_COCONUT_CITE, METH.cleared)),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Nature\'s Way Sambucus Kids gummies (coconut-only, current brand page) = Caution. Driver is natural flavors (Limited). Coconut oil alone is NOT the gummy seed/industrial-oil High rule. Separate formulaId from the palm / vegetable-oil Avoid twin — do not merge them. Confirm the carton: naturesway.com currently lists coconut oil + beeswax, not palm. No DailyMed drug SPL (dietary supplement). Ages 2+ (under 2: choking hazard / not for use). ' +
      ZINC_PARKED,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Whole Foods', 'Grocery'],
    cleanAlternatives: OSCILLO_ALTS,
    sourcesGeneral: [
      "naturesway.com Sambucus Kids Elderberry Immune Gummies (organic tapioca syrup, cane sugar, purified water, pectin, natural flavors, citric acid, sodium citrate, coconut oil, beeswax) — draft, not verified; no DailyMed drug SPL",
    ],
  },
  {
    id: 'sambucol-cold-flu-relief-homeopathic',
    productName: 'Sambucol Cold and Flu Relief',
    brand: 'Sambucol',
    category: IMMUNE,
    barcode: '896116001501',
    formulaId: 'sambucol-cold-flu-relief-homeopathic',
    audience: ADULT,
    minAge: 12,
    form: 'orally disintegrating tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Bryonia', strength: '6X HPUS' },
      { name: 'Gelsemium sempervirens', strength: '6X, 12X, 30X HPUS' },
      { name: 'Sambucus nigra', strength: '3X, 6X HPUS' },
      { name: 'Sulphur', strength: '12X HPUS' },
      { name: 'Zincum gluconicum', strength: '2X, 6X HPUS' },
    ],
    inactiveIngredients: [
      flag(
        'Elderberry flavor',
        'limited',
        dailymed(SET_SAMBUCOL_HOMEOPATHIC, METH.flavors),
      ),
      flag(
        'Maltodextrin',
        'limited',
        dailymed(SET_SAMBUCOL_HOMEOPATHIC, METH.maltodextrin),
      ),
      cleared(SET_SAMBUCOL_HOMEOPATHIC, 'Black carrot extract (colorant)'),
      cleared(SET_SAMBUCOL_HOMEOPATHIC, 'Croscarmellose sodium'),
      cleared(SET_SAMBUCOL_HOMEOPATHIC, 'Lactose'),
      cleared(SET_SAMBUCOL_HOMEOPATHIC, 'Magnesium stearate'),
      cleared(SET_SAMBUCOL_HOMEOPATHIC, 'Microcrystalline cellulose'),
      cleared(SET_SAMBUCOL_HOMEOPATHIC, 'Sucrose'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Sambucol Cold & Flu Relief homeopathic tablets = Caution. Drivers are maltodextrin (Limited) + elderberry flavor (Limited). Homeopathic ODT — cleanliness only, no efficacy claim. ' +
      CARLSTON +
      ' Contains lactose. Ages 12+ (dissolve; do not chew). Zincum gluconicum is an active on this SPL. ' +
      ZINC_PARKED,
    retailers: ['CVS', 'Walgreens', 'Walmart'],
    cleanAlternatives: OSCILLO_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_SAMBUCOL_HOMEOPATHIC} (draft, not verified)`,
      CARLSTON,
    ],
  },
  {
    id: 'cold-eeze-lozenge-classic',
    productName: 'Cold-EEZE Cold Remedy Original Lozenge',
    brand: 'Cold-EEZE',
    category: IMMUNE,
    barcode: '091108320251',
    formulaId: 'cold-eeze-lozenge-classic',
    audience: ADULT,
    minAge: 12,
    form: 'lozenge',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Zinc gluconate', strength: '2X HPUS (13.3mg zinc)' },
    ],
    inactiveIngredients: [
      flag(
        'Natural flavors',
        'limited',
        dailymed(SET_COLDEEZE_CLASSIC, METH.flavors),
      ),
      cleared(SET_COLDEEZE_CLASSIC, 'Corn syrup'),
      cleared(SET_COLDEEZE_CLASSIC, 'Glycine'),
      cleared(SET_COLDEEZE_CLASSIC, 'Sucrose'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Cold-EEZE classic lozenge = Caution. Driver is natural flavors (Limited). Drug Facts list corn syrup, glycine, natural flavors, sucrose (structured inactive table omits flavors — draft follows the Drug Facts line). Homeopathic zinc lozenge — cleanliness only, no efficacy claim. ' +
      CARLSTON +
      ' Ages 12+ (under 12: ask a doctor). Sugar-free Ace-K twin is a different formula (`cold-eeze-lozenge-acek`, Avoid). ' +
      ZINC_PARKED,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Grocery'],
    cleanAlternatives: OSCILLO_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_COLDEEZE_CLASSIC} (draft, not verified)`,
      CARLSTON,
    ],
  },
  {
    id: 'airborne-chewable',
    productName: 'Airborne Immune Support Chewable Tablets (Citrus)',
    brand: 'Airborne',
    category: IMMUNE,
    barcode: '647865962977',
    formulaId: 'airborne-chewable',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: 'Vitamin',
    activeIngredients: [
      { name: 'Vitamin C', strength: '1,000mg per 4 tablets (label)' },
      { name: 'Zinc', strength: 'label serving' },
      { name: 'Proprietary herbal blend', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag(
        'Sucralose',
        'moderate',
        labelCite(AIRBORNE_CHEW_CITE, METH.sucralose),
      ),
      flag(
        'Natural and artificial flavors',
        'limited',
        labelCite(AIRBORNE_CHEW_CITE, METH.flavors),
      ),
      flag(
        'Maltodextrin',
        'limited',
        labelCite(AIRBORNE_CHEW_CITE, METH.maltodextrin),
      ),
      flag(
        'Silicon dioxide',
        'cleared',
        labelCite(AIRBORNE_CHEW_CITE, METH.sio2),
      ),
      flag('Dextrose', 'cleared', labelCite(AIRBORNE_CHEW_CITE, METH.cleared)),
      flag(
        'Magnesium stearate',
        'cleared',
        labelCite(AIRBORNE_CHEW_CITE, METH.cleared),
      ),
      flag(
        'Microcrystalline cellulose',
        'cleared',
        labelCite(AIRBORNE_CHEW_CITE, METH.cleared),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Airborne chewable = Caution. Drivers are sucralose + flavors + SiO2 (± maltodextrin on some cartons / rbNA). Raw demerit math is sucralose 2 + flavors 1 (± maltodextrin 1) → 3–4 pts Avoid — draft follows the approved Caution call, not a 3-pt Avoid stack. Silicon dioxide is the nanoparticle Caution cap (0 demerit points) and does not by itself raise or soften the grade. No DailyMed drug SPL expected (dietary supplement). Ages 12+. ' +
      ZINC_PARKED,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: OSCILLO_ALTS,
    sourcesGeneral: [
      'Airborne citrus chewable retailer pages + rbNA ingredient list (dextrose, flavors, sucralose, MCC, SiO2, ± maltodextrin / HPMC) — draft, not verified; no DailyMed drug SPL',
    ],
  },
  {
    id: 'airborne-gummies',
    productName: 'Airborne Original Gummies',
    brand: 'Airborne',
    category: IMMUNE,
    barcode: '647865962991',
    formulaId: 'airborne-gummies',
    audience: ADULT,
    minAge: 12,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: 'Vitamin',
    activeIngredients: [
      { name: 'Vitamin C', strength: '750mg per 3 gummies (label)' },
      { name: 'Zinc', strength: 'label serving' },
      { name: 'Proprietary herbal blend', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag(
        'Natural flavors',
        'limited',
        labelCite(AIRBORNE_GUMMY_CITE, METH.flavors),
      ),
      flag('Sugar', 'cleared', labelCite(AIRBORNE_GUMMY_CITE, METH.cleared)),
      flag('Corn syrup', 'cleared', labelCite(AIRBORNE_GUMMY_CITE, METH.cleared)),
      flag('Water', 'cleared', labelCite(AIRBORNE_GUMMY_CITE, METH.cleared)),
      flag('Gelatin', 'cleared', labelCite(AIRBORNE_GUMMY_CITE, METH.cleared)),
      flag('Pectin', 'cleared', labelCite(AIRBORNE_GUMMY_CITE, METH.gums)),
      flag(
        'Colors from fruits and vegetables',
        'cleared',
        labelCite(AIRBORNE_GUMMY_CITE, METH.cleared),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Airborne gummies = Caution (do not invent Avoid). Current Instacart / Swanson-style lists are sugar, corn syrup, water, gelatin, pectin, natural flavors, fruit/vegetable colors — no seed / vegetable oil on those snapshots. CARTON FLAG: confirm the physical bottle. A carton that lists vegetable / sunflower / canola / palm / soybean oil is a different formula (High Avoid) — not this row. Some older / other-barcode dumps show “vegetable oil”; that is not scored here because it is not confirmed on the current listings used for this draft. HFCS, if a later carton shows it, is notes-only (parked; never graded). Herbal-blend maltodextrin, if present, is Limited and still Caution on this approved row. No DailyMed drug SPL. Ages 12+. ' +
      ZINC_PARKED,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: OSCILLO_ALTS,
    sourcesGeneral: [
      'Airborne Original Gummies retailer listings (sugar / corn syrup / gelatin / pectin / natural flavors; no oil on those snapshots) — draft, not verified; carton oil flag; no DailyMed drug SPL',
    ],
  },
  {
    id: 'emergenc-super-orange',
    productName: 'Emergen-C Super Orange',
    brand: 'Emergen-C',
    category: IMMUNE,
    barcode: '885898330251',
    formulaId: 'emergenc-super-orange',
    audience: ADULT,
    minAge: 14,
    form: 'powder packet',
    recordStatus: UNVERIFIED,
    productType: 'Vitamin',
    activeIngredients: [
      { name: 'Vitamin C', strength: '1,000mg' },
      { name: 'Zinc (as zinc ascorbate)', strength: '2mg' },
      { name: 'B vitamins', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag(
        'Maltodextrin',
        'limited',
        labelCite(EMERGENC_CITE, METH.maltodextrin),
      ),
      flag(
        'Natural flavors',
        'limited',
        labelCite(EMERGENC_CITE, METH.flavors),
      ),
      flag(
        'Silicon dioxide',
        'cleared',
        labelCite(EMERGENC_CITE, METH.sio2),
      ),
      flag(
        'Beta-carotene (color)',
        'cleared',
        labelCite(EMERGENC_CITE, METH.betaCaroteneColor),
      ),
      flag('Fructose', 'cleared', labelCite(EMERGENC_CITE, METH.cleared)),
      flag('Citric acid', 'cleared', labelCite(EMERGENC_CITE, METH.cleared)),
      flag('Acacia', 'cleared', labelCite(EMERGENC_CITE, METH.gums)),
      flag(
        'Tocopherols (to preserve freshness)',
        'cleared',
        labelCite(EMERGENC_CITE, METH.tocopherols),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Emergen-C Super Orange = Caution. Brand PDF inactives: maltodextrin (Limited) + natural flavors (Limited) + silicon dioxide (nanoparticle Caution cap, 0 pts). Beta-carotene is listed as a color additive — standalone Caution class (not additive-scored, not Avoid). Malic acid, tartaric acid, glycine, L-aspartic acid, orange oil, and orange juice concentrate appear on the PDF and are not in Methodology §5 (ungraded; v1.6 intake) — not required to reach Caution. Fructose / acacia / tocopherols are Cleared-class. Ages 14+ (not formulated under 14). Zinc ascorbate is an active. ' +
      ZINC_PARKED,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: OSCILLO_ALTS,
    sourcesGeneral: [
      'Emergen-C Super Orange brand PDF lbl-00000524 (fructose, maltodextrin, citric acid, malic acid; <2% acacia, beta-carotene color, glycine, L-aspartic acid, natural flavors, orange juice concentrate, orange oil, silicon dioxide, tartaric acid, tocopherols) — draft, not verified',
    ],
  },
  {
    id: 'source-naturals-wellness-formula-tabs',
    productName: 'Source Naturals Wellness Formula Tablets',
    brand: 'Source Naturals',
    category: IMMUNE,
    barcode: '021078000228 021078000211 021078019596',
    formulaId: 'source-naturals-wellness-formula-tabs',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: HERBAL,
    activeIngredients: [
      { name: 'Vitamin C', strength: 'label serving' },
      { name: 'Zinc', strength: 'label serving' },
      {
        name: 'Herbal immune blend (garlic, propolis, echinacea, elderberry, olive leaf, andrographis, astragalus)',
        strength: 'label serving',
      },
    ],
    inactiveIngredients: [
      flag('Silica', 'cleared', labelCite(SN_TABS_CITE, METH.sio2)),
      flag(
        'Microcrystalline cellulose',
        'cleared',
        labelCite(SN_TABS_CITE, METH.cleared),
      ),
      flag(
        'Dibasic calcium phosphate',
        'cleared',
        labelCite(SN_TABS_CITE, METH.cleared),
      ),
      flag(
        'Hydroxypropyl cellulose',
        'cleared',
        labelCite(SN_TABS_CITE, METH.cleared),
      ),
      flag(
        'Modified cellulose gum',
        'cleared',
        labelCite(SN_TABS_CITE, METH.cleared),
      ),
      flag('Stearic acid', 'cleared', labelCite(SN_TABS_CITE, METH.cleared)),
      flag(
        'Magnesium stearate',
        'cleared',
        labelCite(SN_TABS_CITE, METH.cleared),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Source Naturals Wellness Formula tablets = Caution. Silica / silicon dioxide is the locked nanoparticle Caution cap (0 demerit points) — not Avoid alone. Other listed inactives (MCC, dibasic calcium phosphate, hydroxypropyl cellulose, modified cellulose gum, stearic acid, magnesium stearate) are Cleared-class tablet fillers. Separate formulaId from the capsule row. Pregnancy warning on the brand label (do not use if pregnant, may become pregnant, or breastfeeding) is a label warning, not an inactive grade. Contains soy on some Wellness Formula SKUs — confirm the bottle. No DailyMed drug SPL. Adult Immune aisle. ' +
      ZINC_PARKED,
    retailers: ['Whole Foods', 'Sprouts', 'Walmart', 'Grocery'],
    cleanAlternatives: OSCILLO_ALTS,
    sourcesGeneral: [
      'Source Naturals Wellness Formula tablets other-ingredients listings (MCC, dibasic calcium phosphate, HPC, modified cellulose gum, stearic acid, magnesium stearate, silica) — draft, not verified; no DailyMed drug SPL',
    ],
  },
  {
    id: 'source-naturals-wellness-formula-caps',
    productName: 'Source Naturals Wellness Formula Capsules',
    brand: 'Source Naturals',
    category: IMMUNE,
    formulaId: 'source-naturals-wellness-formula-caps',
    audience: ADULT,
    minAge: 12,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: HERBAL,
    activeIngredients: [
      { name: 'Vitamin C', strength: 'label serving' },
      { name: 'Zinc', strength: 'label serving' },
      {
        name: 'Herbal immune blend (garlic, propolis, echinacea, elderberry, olive leaf, andrographis, astragalus)',
        strength: 'label serving',
      },
    ],
    inactiveIngredients: [
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        labelCite(SN_CAPS_CITE, METH.sio2),
      ),
      flag('Gelatin (capsule)', 'cleared', labelCite(SN_CAPS_CITE, METH.cleared)),
      flag(
        'Magnesium stearate',
        'cleared',
        labelCite(SN_CAPS_CITE, METH.cleared),
      ),
      flag(
        'Dibasic calcium phosphate',
        'cleared',
        labelCite(SN_CAPS_CITE, METH.cleared),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Source Naturals Wellness Formula capsules = Caution. Colloidal silicon dioxide / silica is the locked nanoparticle Caution cap (0 demerit points) — not Avoid alone. Gelatin capsule is Cleared. Separate formulaId from the tablet row — do not merge them. Some bottle lists say “silica” rather than “colloidal silicon dioxide”; same Caution cap. Contains soy (allergen disclosure). Pregnancy warning on the brand label. Live Clean Picks Cold & Flu Caution draft describes the capsule pattern; this Immune row is the matching draft. No DailyMed drug SPL. Adult Immune aisle. ' +
      ZINC_PARKED,
    retailers: ['Whole Foods', 'Sprouts', 'Walmart', 'Grocery'],
    cleanAlternatives: OSCILLO_ALTS,
    sourcesGeneral: [
      'Source Naturals Wellness Formula capsules other-ingredients listings (gelatin, magnesium stearate, silica / colloidal silicon dioxide, dibasic calcium phosphate) — draft, not verified; no DailyMed drug SPL',
    ],
  },
  {
    id: 'sovereign-silver-hydrosol',
    productName: 'Sovereign Silver Bio-Active Silver Hydrosol',
    brand: 'Sovereign Silver',
    category: IMMUNE,
    formulaId: 'sovereign-silver-hydrosol',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    activeIngredients: [
      { name: 'Silver (bio-active silver hydrosol)', strength: 'label ppm' },
    ],
    inactiveIngredients: [
      flag(
        'Purified water',
        'cleared',
        labelCite(SILVER_CITE, METH.cleared),
      ),
    ],
    activeSafetyFlag: {
      description:
        'Argyria risk — permanent, cumulative, no established safe level; concurrent antibiotic / thyroid interactions',
      cappedAt: 'caution',
      source:
        'Methodology §4 / §5 worked example — colloidal silver Caution cap (NCCIH, Mayo, peer-reviewed argyria case reports)',
    },
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL / LOCKED: Sovereign Silver hydrosol = Caution (active-safety cap). Additives are silver + purified water (0 demerit points) and would otherwise read Clean — do NOT invent Clean. Colloidal silver is the Methodology v1.3/v1.6 worked example: argyria (permanent, cumulative, no established safe level) plus concurrent antibiotic / thyroid interactions caps the verdict at Caution. This is not an inactive-table grade. Adult Immune aisle. First-aid gels under the same brand are a different formula (not this row).',
    retailers: ['Whole Foods', 'Sprouts', 'Grocery'],
    cleanAlternatives: OSCILLO_ALTS,
    sourcesGeneral: [
      'Sovereign Silver brand page (99.999% pure silver + pharmaceutical-grade purified water) — draft, not verified',
      'Methodology §4 / §5 colloidal-silver worked example (NCCIH, Mayo, argyria case reports)',
    ],
  },
  {
    id: 'zarbees-kids-immune-syrup',
    productName: "Zarbee's Children's Daily Immune Support Syrup",
    brand: "Zarbee's",
    category: IMMUNE,
    barcode: '850007424893',
    formulaId: 'zarbees-kids-immune-syrup',
    audience: KIDS,
    minAge: 2,
    form: 'syrup',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: HERBAL,
    activeIngredients: [
      { name: 'Vitamin C (ascorbic acid)', strength: 'label serving' },
      { name: 'Zinc (as zinc gluconate)', strength: 'label serving' },
      { name: 'Black elderberry fruit extract', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag(
        'Natural flavors',
        'limited',
        labelCite(ZARBEES_SYRUP_CITE, METH.flavors),
      ),
      flag(
        'Potassium sorbate',
        'limited',
        labelCite(ZARBEES_SYRUP_CITE, METH.sorbate),
      ),
      flag(
        'Organic agave syrup',
        'cleared',
        labelCite(ZARBEES_SYRUP_CITE, METH.organicFlavor),
      ),
      flag('Citric acid', 'cleared', labelCite(ZARBEES_SYRUP_CITE, METH.cleared)),
    ],
    verdict: 'caution',
    honestNote:
      "FOUNDER CALL: Zarbee's Children's Daily Immune Support syrup = Caution. Brand page confirmed: organic agave + natural flavors + potassium sorbate + citric acid — no seed oil. Drivers are natural flavors (Limited) + potassium sorbate (Limited) = 2 pts Caution. Separate from batch 4 `zarbees-childrens-cough-immune` (cough + immune honey syrup). No DailyMed drug SPL. Ages 2+ (under 2: not recommended). " +
      ZINC_PARKED,
    retailers: ['CVS', 'Walgreens', 'Target', 'Walmart', 'Grocery'],
    cleanAlternatives: OSCILLO_ALTS,
    sourcesGeneral: [
      "Zarbee's.com Children's Daily Immune Support syrup (organic agave, natural flavors, potassium sorbate, citric acid) — draft, not verified; no DailyMed drug SPL",
    ],
  },
  {
    id: 'zarbees-kids-immune-gummies',
    productName: "Zarbee's Children's Elderberry Immune Support Gummies",
    brand: "Zarbee's",
    category: IMMUNE,
    formulaId: 'zarbees-kids-immune-gummies',
    audience: KIDS,
    minAge: 2,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: HERBAL,
    activeIngredients: [
      { name: 'Vitamin A', strength: 'label serving' },
      { name: 'Vitamin C', strength: 'label serving' },
      { name: 'Vitamin D3', strength: 'label serving' },
      { name: 'Vitamin E', strength: 'label serving' },
      { name: 'Zinc (as zinc gluconate)', strength: 'label serving' },
      { name: 'Black elderberry fruit extract', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag(
        'Natural flavor',
        'limited',
        labelCite(ZARBEES_GUMMY_CITE, METH.flavors),
      ),
      flag(
        'Maltodextrin',
        'limited',
        labelCite(ZARBEES_GUMMY_CITE, METH.maltodextrin),
      ),
      flag('Sugar', 'cleared', labelCite(ZARBEES_GUMMY_CITE, METH.cleared)),
      flag(
        'Glucose syrup',
        'cleared',
        labelCite(ZARBEES_GUMMY_CITE, METH.cleared),
      ),
      flag('Water', 'cleared', labelCite(ZARBEES_GUMMY_CITE, METH.cleared)),
      flag('Pectin', 'cleared', labelCite(ZARBEES_GUMMY_CITE, METH.gums)),
      flag('Citric acid', 'cleared', labelCite(ZARBEES_GUMMY_CITE, METH.cleared)),
      flag(
        'Maqui berry juice concentrate (color)',
        'cleared',
        labelCite(ZARBEES_GUMMY_CITE, METH.cleared),
      ),
    ],
    verdict: 'caution',
    honestNote:
      "FOUNDER CALL: Zarbee's Children's Elderberry Immune Support gummies = Caution, not Avoid. Current kids brand page (mighty-bee) has NO sunflower / canola / vegetable / palm oil — flavor + maltodextrin only (2 pts Caution). Do not invent a seed-oil Avoid on this formulaId. If a later carton shows seed / industrial oil, that is a different formula (not this row). Adult 12+ Zarbee's elderberry gummies on a different URL are not this kids row. No DailyMed drug SPL. Ages 2+ (2–3: 1 gummy; 4–12: 2 gummies). " +
      ZINC_PARKED,
    retailers: ['CVS', 'Target', 'Walmart', 'Grocery'],
    cleanAlternatives: OSCILLO_ALTS,
    sourcesGeneral: [
      "Zarbee's.com Children's Elderberry Immune Support gummies (sugar, glucose syrup, water, maltodextrin, pectin, citric acid, natural flavor, maqui berry color) — draft, not verified; no DailyMed drug SPL",
    ],
  },

  // ── Avoid ────────────────────────────────────────────────
  {
    id: 'sambucol-elderberry-gummies',
    productName: 'Sambucol Black Elderberry Gummies',
    brand: 'Sambucol',
    category: IMMUNE,
    barcode: '896116001228',
    formulaId: 'sambucol-elderberry-gummies',
    audience: ADULT,
    minAge: 4,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: HERBAL,
    activeIngredients: [
      { name: 'Black elderberry extract', strength: 'label serving' },
      { name: 'Vitamin C', strength: 'label serving' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag(
        'Vegetable oil',
        'high',
        labelCite(SAMBUCOL_GUMMY_CITE, METH.seedOilGummies),
      ),
      flag(
        'Natural flavors (raspberry, lemon)',
        'limited',
        labelCite(SAMBUCOL_GUMMY_CITE, METH.flavors),
      ),
      flag('Cane sugar', 'cleared', labelCite(SAMBUCOL_GUMMY_CITE, METH.cleared)),
      flag(
        'Tapioca syrup',
        'cleared',
        labelCite(SAMBUCOL_GUMMY_CITE, METH.cleared),
      ),
      flag(
        'Purified water',
        'cleared',
        labelCite(SAMBUCOL_GUMMY_CITE, METH.cleared),
      ),
      flag('Pectin', 'cleared', labelCite(SAMBUCOL_GUMMY_CITE, METH.gums)),
      flag('Citric acid', 'cleared', labelCite(SAMBUCOL_GUMMY_CITE, METH.cleared)),
      flag(
        'Sodium citrate',
        'cleared',
        labelCite(SAMBUCOL_GUMMY_CITE, METH.cleared),
      ),
      flag(
        'Carnauba wax',
        'cleared',
        labelCite(SAMBUCOL_GUMMY_CITE, METH.cleared),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Sambucol elderberry gummies = Avoid. Vegetable oil in a gummy is High-tier (seed/industrial oils in gummies). US brand page + CVS listings. Separate formula from Original Syrup (Caution, shared batch 3 formulaId). Natural flavors are also Limited (not needed to reach Avoid). No DailyMed drug SPL. Carton is 4+; audience stays adult for the standard drugstore SKU. ' +
      ZINC_PARKED,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Grocery'],
    cleanAlternatives: OSCILLO_ALTS,
    sourcesGeneral: [
      'Sambucol USA Black Elderberry Gummies + CVS ingredient page (vegetable oil, carnauba wax) — draft, not verified; no DailyMed drug SPL',
    ],
  },
  {
    id: 'natures-way-sambucus-kids-gummies-veg-oil',
    productName:
      "Nature's Way Sambucus Kids Elderberry Immune Gummies (vegetable oil / palm)",
    brand: "Nature's Way",
    category: IMMUNE,
    formulaId: 'natures-way-sambucus-kids-gummies-veg-oil',
    audience: KIDS,
    minAge: 2,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: HERBAL,
    activeIngredients: [
      { name: 'Vitamin C (ascorbic acid)', strength: '60mg per 2 gummies' },
      { name: 'Zinc (as zinc citrate)', strength: '2.2mg per 2 gummies' },
      {
        name: 'Black elder (Sambucus nigra L.) extract (berry)',
        strength: '50mg per 2 gummies',
      },
    ],
    inactiveIngredients: [
      flag(
        'Vegetable oil (palm and coconut)',
        'high',
        labelCite(NW_VEG_CITE, METH.seedOilGummies),
      ),
      flag('Natural flavors', 'limited', labelCite(NW_VEG_CITE, METH.flavors)),
      flag(
        'Organic tapioca syrup',
        'cleared',
        labelCite(NW_VEG_CITE, METH.cleared),
      ),
      flag('Cane sugar', 'cleared', labelCite(NW_VEG_CITE, METH.cleared)),
      flag('Pectin', 'cleared', labelCite(NW_VEG_CITE, METH.gums)),
      flag('Citric acid', 'cleared', labelCite(NW_VEG_CITE, METH.cleared)),
      flag('Sodium citrate', 'cleared', labelCite(NW_VEG_CITE, METH.cleared)),
      flag('Beeswax', 'cleared', labelCite(NW_VEG_CITE, METH.cleared)),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Nature\'s Way Sambucus Kids gummies with vegetable oil (palm and coconut) / generic vegetable oil = Avoid. Palm / “vegetable oil” in a gummy is High-tier. Separate formulaId from the coconut-only Caution twin (current naturesway.com listing) — do not merge them. Coconut oil on the same “palm and coconut” line does not clear the palm High. Confirm the carton; the current brand page is the coconut-only row, not this one. No DailyMed drug SPL. Ages 2+. ' +
      ZINC_PARKED,
    retailers: ['Grocery'],
    cleanAlternatives: OSCILLO_ALTS,
    sourcesGeneral: [
      "Nature's Way Sambucus Kids retailer listings with vegetable oil (palm and coconut) — draft, not verified; no DailyMed drug SPL",
    ],
  },
  {
    id: 'cold-eeze-lozenge-acek',
    productName: 'Cold-EEZE Cold Remedy Sugar Free Lozenge',
    brand: 'Cold-EEZE',
    category: IMMUNE,
    barcode: '091108324259',
    formulaId: 'cold-eeze-lozenge-acek',
    audience: ADULT,
    minAge: 12,
    form: 'lozenge',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Zinc gluconate', strength: '2X HPUS (13.3mg zinc)' },
    ],
    inactiveIngredients: [
      flag(
        'Acesulfame potassium',
        'moderate',
        dailymed(SET_COLDEEZE_ACEK, METH.acek),
      ),
      flag(
        'Natural flavors',
        'limited',
        dailymed(SET_COLDEEZE_ACEK, METH.flavors),
      ),
      flag('Isomalt', 'limited', dailymed(SET_COLDEEZE_ACEK, METH.sugarAlcohol)),
      cleared(SET_COLDEEZE_ACEK, 'Glycine'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Cold-EEZE Ace-K (sugar-free) lozenge = Avoid. Ace-K is Moderate (2 pts) + natural flavors Limited (1 pt) = 3 → Avoid per founder (2+1 points). Drug Facts: acesulfame-K, glycine, isomalt, natural flavors (structured table omits flavors — draft follows Drug Facts). Isomalt is scored in the oral sugar-alcohol Limited class; not needed to reach Avoid once 2+1 is met. Separate formulaId from the classic Caution lozenge. Homeopathic zinc lozenge — cleanliness only. ' +
      CARLSTON +
      ' Ages 12+ (under 12: ask a doctor). ' +
      ZINC_PARKED,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Grocery'],
    cleanAlternatives: OSCILLO_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_COLDEEZE_ACEK} (draft, not verified)`,
      CARLSTON,
    ],
  },
  {
    id: 'cold-eeze-ultramelt-dyed',
    productName: 'Cold-EEZE Cold Remedy UltraMELT Chews',
    brand: 'Cold-EEZE',
    category: IMMUNE,
    barcode: '091108350241',
    formulaId: 'cold-eeze-ultramelt-dyed',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Zinc gluconate', strength: '1X HPUS (13.3mg zinc)' },
    ],
    inactiveIngredients: [
      flag(
        'FD&C Red No. 40 aluminum lake',
        'high',
        dailymed(SET_COLDEEZE_ULTRAMELT, METH.dyes),
      ),
      flag(
        'FD&C Yellow No. 5 (tartrazine) aluminum lake',
        'high',
        dailymed(SET_COLDEEZE_ULTRAMELT, METH.dyes),
      ),
      flag(
        'Acesulfame potassium',
        'moderate',
        dailymed(SET_COLDEEZE_ULTRAMELT, METH.acek),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed(SET_COLDEEZE_ULTRAMELT, METH.sucralose),
      ),
      flag(
        'Natural flavors',
        'limited',
        dailymed(SET_COLDEEZE_ULTRAMELT, METH.flavors),
      ),
      flag(
        'Xylitol',
        'limited',
        dailymed(SET_COLDEEZE_ULTRAMELT, METH.xylitol),
      ),
      flag(
        'Erythritol',
        'limited',
        dailymed(SET_COLDEEZE_ULTRAMELT, METH.erythritol),
      ),
      flag('Isomalt', 'limited', dailymed(SET_COLDEEZE_ULTRAMELT, METH.sugarAlcohol)),
      cleared(SET_COLDEEZE_ULTRAMELT, 'Glycine'),
      cleared(SET_COLDEEZE_ULTRAMELT, 'Hydroxypropyl cellulose'),
      cleared(SET_COLDEEZE_ULTRAMELT, 'Magnesium stearate'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Cold-EEZE UltraMELT dyed = Avoid. Red 40 + Yellow 5 aluminum lakes are High-tier. Ace-K, sucralose, flavors, xylitol, and erythritol also score; dyes alone reach Avoid. SPL Drug Facts typo “sucarlose” = sucralose. Homeopathic zinc chew — cleanliness only. ' +
      CARLSTON +
      ' Ages 12+ (under 12: ask a doctor). ' +
      ZINC_PARKED,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Grocery'],
    cleanAlternatives: OSCILLO_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_COLDEEZE_ULTRAMELT} (draft, not verified)`,
      CARLSTON,
    ],
  },
  {
    id: 'zicam-rapidmelts-dyed',
    productName: 'Zicam Cold Remedy RapidMelts Cherry',
    brand: 'Zicam',
    category: IMMUNE,
    barcode: '732216300048',
    formulaId: 'zicam-rapidmelts-dyed',
    audience: ADULT,
    minAge: 12,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Zincum aceticum', strength: '2X HPUS' },
      { name: 'Zincum gluconicum', strength: '1X HPUS' },
    ],
    inactiveIngredients: [
      flag(
        'FD&C Red No. 40 aluminum lake',
        'high',
        dailymed(SET_ZICAM_RAPIDMELTS_DYED, METH.dyes),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed(SET_ZICAM_RAPIDMELTS_DYED, METH.sucralose),
      ),
      flag(
        'Artificial flavor',
        'limited',
        dailymed(SET_ZICAM_RAPIDMELTS_DYED, METH.flavors),
      ),
      flag(
        'Mannitol',
        'limited',
        dailymed(SET_ZICAM_RAPIDMELTS_DYED, METH.mannitol),
      ),
      cleared(SET_ZICAM_RAPIDMELTS_DYED, 'Crospovidone'),
      cleared(SET_ZICAM_RAPIDMELTS_DYED, 'Magnesium stearate'),
      cleared(SET_ZICAM_RAPIDMELTS_DYED, 'Sodium starch glycolate'),
      cleared(SET_ZICAM_RAPIDMELTS_DYED, 'Stearic acid'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Zicam RapidMelts dyed (representative Cherry SPL) = Avoid. Red 40 aluminum lake is High-tier; sucralose + flavor also score. Monoammonium glycyrrhizinate is on the SPL and is not in Methodology §5 (ungraded; v1.6 intake) — not the Avoid driver. Homeopathic zinc RapidMelt — cleanliness only. ' +
      CARLSTON +
      ' Ages 12+ (under 12: ask a doctor). Ultra RapidMelts (dye-free, sucralose + flavor lock) are a different formulaId. ' +
      ZINC_PARKED,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: OSCILLO_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_ZICAM_RAPIDMELTS_DYED} (Cherry RapidMelts; representative dyed SPL; draft, not verified)`,
      CARLSTON,
    ],
  },
  {
    id: 'zicam-ultra-rapidmelts',
    productName: 'Zicam Ultra Cold Remedy RapidMelts',
    brand: 'Zicam',
    category: IMMUNE,
    barcode: '732216300925',
    formulaId: 'zicam-ultra-rapidmelts',
    audience: ADULT,
    minAge: 12,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Zincum aceticum', strength: '2X HPUS' },
      { name: 'Zincum gluconicum', strength: '1X HPUS' },
    ],
    inactiveIngredients: [
      flag(
        'Sucralose',
        'moderate',
        dailymed(SET_ZICAM_ULTRA, METH.sucralose),
      ),
      flag('Flavor', 'limited', dailymed(SET_ZICAM_ULTRA, METH.flavors)),
      flag('Mannitol', 'limited', dailymed(SET_ZICAM_ULTRA, METH.mannitol)),
      cleared(SET_ZICAM_ULTRA, 'Crospovidone'),
      cleared(SET_ZICAM_ULTRA, 'Magnesium stearate'),
      cleared(SET_ZICAM_ULTRA, 'Sodium starch glycolate'),
      cleared(SET_ZICAM_ULTRA, 'Stearic acid'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Zicam Ultra RapidMelts = Avoid. Sucralose + flavor is a founder lock even without dye (Moderate 2 + Limited 1 = 3 pts Avoid). Carton markets sugar-free / dye-free — dye-free is not Clean. Mannitol is also Limited (not needed to reach Avoid). Monoammonium glycyrrhizinate is on the SPL and is not in Methodology §5 (ungraded; v1.6 intake). Homeopathic zinc RapidMelt — cleanliness only. ' +
      CARLSTON +
      ' Ages 12+ (under 12: ask a doctor). Separate from dyed Cherry RapidMelts. ' +
      ZINC_PARKED,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: OSCILLO_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_ZICAM_ULTRA} (draft, not verified)`,
      CARLSTON,
    ],
  },
];
