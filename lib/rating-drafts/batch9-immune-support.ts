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
  acek: 'Methodology §5 Limited (Acesulfame potassium — founder lock t138u Oct 20, 2026; §4 prior-lock re-eval; supersedes prior Moderate-risk label).',
  sucralose: 'Methodology §5 Limited (Sucralose — founder lock t138u Oct 20, 2026; §4 prior-lock re-eval; supersedes prior Moderate-risk label).',
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
        'limited',
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
        'limited',
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
    verdict: 'avoid',
    honestNote: 'Avoid: three or more Limited tokens triggered the stacking rule (t137u): Sucralose, Natural and artificial flavors, Maltodextrin.',

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
        'limited',
        labelCite(EMERGENC_CITE, METH.sio2),
      ),
      flag(
        'Beta-carotene (color)',
        'moderate',
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
      flag('Silica', 'limited', labelCite(SN_TABS_CITE, METH.sio2)),
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
    barcode: '021078014249 021078014256 021078019619 021078014263 021078019626',
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
        'limited',
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
    barcode: '684088232364',
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
    barcode: '898115002749',
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
        'moderate',
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
        'limited',
        dailymed(SET_COLDEEZE_ACEK, METH.acek),
      ),
      flag(
        'Natural flavors',
        'limited',
        dailymed(SET_COLDEEZE_ACEK, METH.flavors),
      ),
      flag('Isomalt', 'moderate', dailymed(SET_COLDEEZE_ACEK, METH.sugarAlcohol)),
      cleared(SET_COLDEEZE_ACEK, 'Glycine'),
    ],
    verdict: 'caution',
    honestNote: '',

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
        'limited',
        dailymed(SET_COLDEEZE_ULTRAMELT, METH.acek),
      ),
      flag(
        'Sucralose',
        'limited',
        dailymed(SET_COLDEEZE_ULTRAMELT, METH.sucralose),
      ),
      flag(
        'Natural flavors',
        'limited',
        dailymed(SET_COLDEEZE_ULTRAMELT, METH.flavors),
      ),
      flag(
        'Xylitol',
        'moderate',
        dailymed(SET_COLDEEZE_ULTRAMELT, METH.xylitol),
      ),
      flag(
        'Erythritol',
        'moderate',
        dailymed(SET_COLDEEZE_ULTRAMELT, METH.erythritol),
      ),
      flag('Isomalt', 'moderate', dailymed(SET_COLDEEZE_ULTRAMELT, METH.sugarAlcohol)),
      cleared(SET_COLDEEZE_ULTRAMELT, 'Glycine'),
      cleared(SET_COLDEEZE_ULTRAMELT, 'Hydroxypropyl cellulose'),
      cleared(SET_COLDEEZE_ULTRAMELT, 'Magnesium stearate'),
    ],
    verdict: 'avoid',

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
        'limited',
        dailymed(SET_ZICAM_RAPIDMELTS_DYED, METH.sucralose),
      ),
      flag(
        'Artificial flavor',
        'moderate',
        dailymed(SET_ZICAM_RAPIDMELTS_DYED, METH.flavors),
      ),
      flag(
        'Mannitol',
        'moderate',
        dailymed(SET_ZICAM_RAPIDMELTS_DYED, METH.mannitol),
      ),
      cleared(SET_ZICAM_RAPIDMELTS_DYED, 'Crospovidone'),
      cleared(SET_ZICAM_RAPIDMELTS_DYED, 'Magnesium stearate'),
      cleared(SET_ZICAM_RAPIDMELTS_DYED, 'Sodium starch glycolate'),
      cleared(SET_ZICAM_RAPIDMELTS_DYED, 'Stearic acid'),
    ],
    verdict: 'avoid',

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
        'limited',
        dailymed(SET_ZICAM_ULTRA, METH.sucralose),
      ),
      flag('Flavor', 'moderate', dailymed(SET_ZICAM_ULTRA, METH.flavors)),
      flag('Mannitol', 'moderate', dailymed(SET_ZICAM_ULTRA, METH.mannitol)),
      cleared(SET_ZICAM_ULTRA, 'Crospovidone'),
      cleared(SET_ZICAM_ULTRA, 'Magnesium stearate'),
      cleared(SET_ZICAM_ULTRA, 'Sodium starch glycolate'),
      cleared(SET_ZICAM_ULTRA, 'Stearic acid'),
    ],
    verdict: 'caution',
    honestNote: '',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: OSCILLO_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_ZICAM_ULTRA} (draft, not verified)`,
      CARLSTON,
    ],
  },
];
