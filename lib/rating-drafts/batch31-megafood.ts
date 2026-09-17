// DRAFT / not verified / batch 31 MegaFood US catalog / methodology
// v1.6 grades only / founder owns final Avoid vs Usable vs Clean.
//
// MegaFood US in-scope OTC / vitamin / supplement drafts. Whole
// in-scope line — not one aisle. Mixed categories · audience adult
// except kids rows · recordStatus is 'unverified' on every row.
// Methodology v1.6 + locked §5 table. Internal keys only:
// clean | caution | avoid. Do NOT invent Clean. Do NOT invent UPCs /
// barcodes / DailyMed set-ids (dietary supplements). Pack sizes share
// formulaId. formulaId == id on every row. Form is labeled on
// cleanAlternatives, not a hard filter (§6). Not wired into Clean
// Picks UI. No live Clean Picks file is edited. Methodology.md /
// PROJECT_NOTES.md / verdictLabels.ts / parkedBrowseIds.ts are
// untouched. Letter tiles only — no photo factory.
//
// REUSE ONLY (do not rewrite / do not regrade):
// - megafood-one-daily in batch14-adult-vitamins.ts = Caution
//   (SiO2 cap). Founder-skimmed. Same One Daily tablet at MegaFood.com
//   / Thrive / Sprouts / Whole Foods / Amazon US is that row — no
//   second Search id.
//
// TALLY (unverified drafts in THIS file): 106 rows — Clean 3 /
// Caution 89 / Avoid 14.
// Independently Clean in THIS batch: Magnesium 300 mg Capsules,
// Liposomal Vitamin C, Berberine Phytosome.
//
// ZINC IS PARKED (Methodology v1.6). Silicon dioxide / silica =
// Caution cap, 0 points, not Avoid alone. Seed/industrial oils in
// gummies / soft chews = High Avoid. Softgel / capsule oil fill ≠
// gummy High. Coconut oil alone is not seed-oil High. Unlabeled
// MCT = Caution opacity, not Avoid. Paprika extract as color =
// Cleared (named spice color). Sodium copper chlorophyllin = Caution.
// Pea protein isolate = Cleared-class. Grape seed extract as
// inactive = Cleared. Agar / agar-agar = Cleared. Unspecified rice
// extract and unspecified rice = Limited opacity (not the rice-hull
// / rice-bran Clean lock).
// FDA/GRAS ≠ Clean. No medical advice / dosing. Pregnancy label
// on-carton only.
//
// OUT OF SCOPE (no rows): collagen peptides; micronized creatine
// powder (protein-aisle tub); Stack & Save bundle. Supplement-aisle
// powders are IN (Daily Turmeric Nutrient Booster Powder).
//
// MegaFood leftovers: none. Founder-confirmed closeout rows now in:
// Creatine Monohydrate Gummies; Turmeric Curcumin Whole Body Minis;
// Turmeric Curcumin Extra Strength Joint; Turmeric Curcumin Extra
// Strength Liver.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const VITAMINS = 'Vitamins';
const SLEEP = 'Sleep';
const DIGESTIVE = 'Digestive';
const IMMUNE = 'Immune Support';
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const VITAMIN = 'Vitamin' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = 'MegaFood';

const US_WIDE = [
  'MegaFood.com',
  'Thrive',
  'Sprouts',
  'Whole Foods',
  'Amazon',
] as const;
const BRAND_AMZ = ['MegaFood.com', 'Amazon'] as const;

const METH = {
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  maltodextrin: 'Methodology §5 Limited-risk (non-organic maltodextrin)',
  seedOilGummies:
    'Methodology §5 High-tier (seed/industrial oils in gummies — soybean, canola, palm, "vegetable oil", sunflower)',
  gums: 'Methodology §5 Cleared (xanthan gum / gum arabic / guar / pectin / acacia — locked v1.6)',
  starches:
    'Methodology §5 Cleared (pregelatinized / corn / potato / tapioca / rice flour / similar simple starches — locked v1.6 housekeeping)',
  riceHull:
    'Methodology §5 Cleared (organic rice hull extract / rice concentrate / ground rice hulls — plant-fiber flow agent; distinct from rice flour; distinct from silicon dioxide; SiO₂ nanoparticle Caution cap does NOT apply)',
  tocopherols:
    'Methodology §5 Cleared (mixed tocopherols / ascorbyl palmitate as antioxidants — locked v1.6)',
  monkFruit:
    'Methodology §5 Cleared (monk fruit / mogrosides, high-purity extract — locked v1.6)',
  lecithin: 'Methodology §5 Cleared (lecithin — soy or sunflower — locked v1.6)',
  calciumLaurate:
    'Methodology §5 Cleared-class (calcium laurate — stearate-family lubricant with magnesium stearate / stearic acid / calcium stearate)',
  capsuleOil:
    'Methodology §5 — oil in a capsule / softgel fill is NOT the gummy seed/industrial-oil High rule',
  paprika:
    'Methodology §5 Cleared (paprika extract / capsanthin as color — named spice color E160c; same posture as turmeric-as-color; locked Sept 14, 2026)',
  blackCarrot:
    'Methodology §5 Cleared (black carrot / juice concentrate as color — named plant color; same posture as paprika / turmeric-as-color; locked Sept 14, 2026)',
  chlorophyllin:
    'Methodology §5 Caution (sodium copper chlorophyllin as color — standalone Caution, not Avoid; founder lock)',
  riceExtract:
    'Methodology §5 Limited-risk (unspecified rice extract — Caution/Limited opacity; label did not name hull, bran, or concentrate)',
  mctUnlabeled:
    'Methodology §5 Limited-risk / Caution opacity (unlabeled MCT — coconut vs palm unknown; not Avoid; founder lock)',
  mctCoconut:
    'Methodology §5 — MCT from coconut is not gummy seed/industrial-oil High (founder lock)',
  peaProtein:
    'Methodology §5 Cleared-class (pea protein isolate — founder lock)',
  agar:
    'Methodology §5 Cleared (agar / agar-agar — seaweed gel; gum/fiber family with pectin; locked Sept 14, 2026)',
  grapeSeed:
    'Methodology §5 Cleared (grape seed extract as inactive — named plant-part food botanical; not grape seed oil unless the label says oil; locked Sept 14, 2026)',
  riceUnspecified:
    'Methodology §5 Limited-risk (rice, unspecified — Caution/Limited opacity; label did not name hull, bran, flour, protein, concentrate, or syrup)',
  beeswax: 'Methodology §5 Cleared (beeswax)',
  cleared: 'Methodology §5 Cleared',
} as const;

const CAPSULE_OIL_TAP =
  'Seed/industrial oils are flagged in gummies. In this capsule/softgel/drop fill they are not that High rule.';

const RICE_EXTRACT_TAP =
  'Label only says rice extract — it doesn’t name hull, bran, or concentrate. We mark that Caution because the form isn’t clear. Named organic rice hull extract, rice concentrate, ground rice hulls, or organic rice bran extract are Cleared.';

const RICE_UNSPECIFIED_TAP =
  'Label only says rice — it doesn’t name hull, bran, flour, protein, concentrate, or syrup. We mark that Caution because the form isn’t clear. Named organic rice hull extract, rice concentrate, ground rice hulls, or organic rice bran extract are Cleared.';

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

const PRENATAL_LABEL =
  'Carton is labeled for prenatal / pregnancy use. No dosing or medical advice in this draft.';

const IRON_OVERDOSE_CARTON =
  'On-carton iron overdose warning (when iron is labeled): accidental overdose of iron-containing products is a leading cause of fatal poisoning in children under 6 — keep out of reach of children.';

const FERMENT_NOTE =
  'Contains ferment / yeast media and/or rice protein — food-state media, not an inactive-grade driver (same treatment as founder-skimmed megafood-one-daily).';

const NO_CLEAN_GUMMY =
  'No independently Clean MegaFood gummy / soft chew exists on main — cleanAlternatives omitted (honest empty; do not invent Clean).';

const UNGRADED_NOT_REQUIRED =
  'Any inactive not yet in Methodology §5 is noted only and is not required to reach this verdict (v1.6 intake; not a new lock).';

const MAG300_ID = 'megafood-magnesium-300-capsules';
const PE_MELATONIN_ID = 'pure-encapsulations-melatonin-sr-3mg';
const THORNE_SUPER_EPA_ID = 'thorne-super-epa-nsf';
const THORNE_MAG_POWDER_ID = 'thorne-magnesium-bisglycinate-powder';
const WH_PRENATAL_ID = 'we-heart-wholesome-prenatal';
const WH_IRON_ID = 'we-heart-wholesome-iron';

const MAG300_ALTS: CleanAlternative[] = [
  {
    productId: MAG300_ID,
    rankReason:
      'Independently Clean in-batch MegaFood Magnesium 300 mg Capsules (hypromellose / ascorbyl palmitate / rice hull concentrate; no SiO2 on the matched no-SiO2 US retailer stack). Form: capsule — labeled, not a hard filter (§6). Confirm the carton is the no-SiO2 twin.',
  },
  {
    productId: THORNE_MAG_POWDER_ID,
    rankReason:
      'Independently Clean Thorne Magnesium Bisglycinate powder already graded on main in batch 25 (citric acid + high-purity monk fruit; no natural flavor). Form: powder — labeled, not a hard filter (§6).',
  },
];

const PRENATAL_ALTS: CleanAlternative[] = [
  {
    productId: WH_PRENATAL_ID,
    rankReason:
      'Independently Clean We Heart Nutrition Wholesome Prenatal already graded on main in batch 26 (HPMC capsule + organic rice hull extract). Form: capsule — labeled, not a hard filter (§6). Same prenatal shelf. Do not invent a Clean MegaFood prenatal.',
  },
];

const IRON_ALTS: CleanAlternative[] = [
  {
    productId: WH_IRON_ID,
    rankReason:
      'Independently Clean We Heart Nutrition Wholesome Iron already graded on main in batch 26 (organic rice flour + HPMC capsule). Form: capsule — labeled, not a hard filter (§6). Same iron-supplement shelf. Do not invent a Clean MegaFood iron.',
  },
];

const OMEGA_ALTS: CleanAlternative[] = [
  {
    productId: THORNE_SUPER_EPA_ID,
    rankReason:
      'Independently Clean Thorne Super EPA NSF already graded on main in batch 28 (gelatin / water / glycerin + mixed tocopherols; no flavor). Form: softgel — labeled, not a hard filter (§6). Do not invent a Clean MegaFood fish oil.',
  },
];

const MELATONIN_ALTS: CleanAlternative[] = [
  {
    productId: PE_MELATONIN_ID,
    rankReason:
      'Independently Clean Pure Encapsulations Melatonin-SR 3 mg already graded on main in batch 24. Form: capsule — labeled, not a hard filter (§6). Same-category adult Sleep peer. Do not invent a Clean MegaFood sleep gummy.',
  },
];

type DraftBase = {
  id: string;
  productName: string;
  category: string;
  form: string;
  audience?: typeof ADULT | typeof KIDS;
  minAge?: number;
  productType: typeof VITAMIN | typeof SUPPLEMENT;
  actives: RatingRecord['activeIngredients'];
  cite: string;
  extraInactives?: IngredientFlag[];
  extraNote?: string;
  retailers?: readonly string[];
  zinc?: boolean;
  prenatal?: boolean;
  ironCarton?: boolean;
  alts?: CleanAlternative[];
  barcode?: string;
};

function sio2Flags(cite: string, extras: string[] = []): IngredientFlag[] {
  return [
    flag('Silicon dioxide', 'cleared', labelCite(cite, METH.sio2)),
    ...extras.map((name) => labelCleared(cite, name)),
  ];
}

function foodStateTabletFlags(cite: string, extraCleared: string[] = []): IngredientFlag[] {
  return sio2Flags(cite, [
    'Microcrystalline cellulose',
    'Stearic acid',
    'Hypromellose',
    'Ferment media (organic brown rice, autolyzed yeast extract, rice protein, yeast [inactive])',
    'Rice protein',
    ...extraCleared,
  ]);
}

function cautionSio2(base: DraftBase & { extras?: string[]; maltodextrin?: boolean }): RatingRecord {
  const extras = base.extras ?? [];
  const inactives: IngredientFlag[] = [
    ...foodStateTabletFlags(base.cite, extras),
    ...(base.maltodextrin
      ? [flag('Maltodextrin', 'limited', labelCite(base.cite, METH.maltodextrin))]
      : []),
    ...(base.extraInactives ?? []),
  ];
  const math = base.maltodextrin
    ? 'Demerit math: maltodextrin Limited 1 pt + SiO2 0-pt Caution cap → Caution (not Avoid).'
    : 'Demerit math: SiO2 nanoparticle Caution cap (0 demerit points). MCC / stearic acid / hypromellose / ferment media are Cleared-class and do not raise the grade. Do not invent Clean on the SiO2 cap.';
  return {
    id: base.id,
    productName: base.productName,
    brand: BRAND,
    category: base.category,
    ...(base.barcode ? { barcode: base.barcode } : {}),
    formulaId: base.id,
    audience: base.audience ?? ADULT,
    minAge: base.minAge ?? (base.audience === KIDS ? 4 : 18),
    form: base.form,
    recordStatus: UNVERIFIED,
    productType: base.productType,
    activeIngredients: base.actives,
    inactiveIngredients: inactives,
    verdict: 'caution',
    honestNote:
      `FOUNDER-STYLE DRAFT: ${base.productName} = Caution. Driver is silicon dioxide (${math}) ${FERMENT_NOTE} No DailyMed drug SPL (dietary supplement). ${
        base.prenatal ? PRENATAL_LABEL + ' ' : ''
      }${base.ironCarton ? IRON_OVERDOSE_CARTON + ' ' : ''}${
        base.zinc ? ZINC_PARKED + ' ' : ''
      }${base.extraNote ?? ''} Pack sizes share formulaId when the other-ingredients list holds. No dosing or medical advice in this draft.`.replace(
        /\s+/g,
        ' ',
      ).trim(),
    retailers: [...(base.retailers ?? US_WIDE)],
    cleanAlternatives: base.alts,
    sourcesGeneral: [`${base.cite} — draft, not verified; no DailyMed drug SPL`],
  };
}

function cautionCustom(base: DraftBase & { inactives: IngredientFlag[]; math: string }): RatingRecord {
  return {
    id: base.id,
    productName: base.productName,
    brand: BRAND,
    category: base.category,
    ...(base.barcode ? { barcode: base.barcode } : {}),
    formulaId: base.id,
    audience: base.audience ?? ADULT,
    minAge: base.minAge ?? (base.audience === KIDS ? 4 : 18),
    form: base.form,
    recordStatus: UNVERIFIED,
    productType: base.productType,
    activeIngredients: base.actives,
    inactiveIngredients: base.inactives,
    verdict: 'caution',
    honestNote:
      `FOUNDER-STYLE DRAFT: ${base.productName} = Caution. ${base.math} ${
        base.prenatal ? PRENATAL_LABEL + ' ' : ''
      }${base.ironCarton ? IRON_OVERDOSE_CARTON + ' ' : ''}${
        base.zinc ? ZINC_PARKED + ' ' : ''
      }${base.extraNote ?? ''} No DailyMed drug SPL (dietary supplement). Pack sizes share formulaId when the other-ingredients list holds. No dosing or medical advice in this draft.`.replace(
        /\s+/g,
        ' ',
      ).trim(),
    retailers: [...(base.retailers ?? US_WIDE)],
    cleanAlternatives: base.alts,
    sourcesGeneral: [`${base.cite} — draft, not verified; no DailyMed drug SPL`],
  };
}

function avoidCustom(base: DraftBase & { inactives: IngredientFlag[]; math: string }): RatingRecord {
  return {
    id: base.id,
    productName: base.productName,
    brand: BRAND,
    category: base.category,
    ...(base.barcode ? { barcode: base.barcode } : {}),
    formulaId: base.id,
    audience: base.audience ?? ADULT,
    minAge: base.minAge ?? (base.audience === KIDS ? 4 : 18),
    form: base.form,
    recordStatus: UNVERIFIED,
    productType: base.productType,
    activeIngredients: base.actives,
    inactiveIngredients: base.inactives,
    verdict: 'avoid',
    honestNote:
      `FOUNDER-STYLE DRAFT: ${base.productName} = Avoid. ${base.math} ${
        base.prenatal ? PRENATAL_LABEL + ' ' : ''
      }${base.ironCarton ? IRON_OVERDOSE_CARTON + ' ' : ''}${
        base.zinc ? ZINC_PARKED + ' ' : ''
      }${base.extraNote ?? ''} No DailyMed drug SPL (dietary supplement). Pack sizes share formulaId when the other-ingredients list holds. No dosing or medical advice in this draft.`.replace(
        /\s+/g,
        ' ',
      ).trim(),
    retailers: [...(base.retailers ?? US_WIDE)],
    cleanAlternatives: base.alts,
    sourcesGeneral: [`${base.cite} — draft, not verified; no DailyMed drug SPL`],
  };
}

function avoidOil(
  base: DraftBase & { oilName: string; extras?: IngredientFlag[] },
): RatingRecord {
  const inactives: IngredientFlag[] = [
    flag(base.oilName, 'high', labelCite(base.cite, METH.seedOilGummies)),
    ...(base.extraInactives ?? []),
    ...(base.extras ?? []),
  ];
  return {
    id: base.id,
    productName: base.productName,
    brand: BRAND,
    category: base.category,
    ...(base.barcode ? { barcode: base.barcode } : {}),
    formulaId: base.id,
    audience: base.audience ?? ADULT,
    minAge: base.minAge ?? (base.audience === KIDS ? 4 : 18),
    form: base.form,
    recordStatus: UNVERIFIED,
    productType: base.productType,
    activeIngredients: base.actives,
    inactiveIngredients: inactives,
    verdict: 'avoid',
    honestNote:
      `FOUNDER-STYLE DRAFT: ${base.productName} = Avoid. Driver is ${base.oilName} in a gummy / soft chew (seed/industrial-oil High). Demerit math: High-tier oil = Avoid; SiO2 if present is a 0-pt cap and does not change Avoid. Coconut oil alone is not this High rule — this carton lists ${base.oilName}, not coconut-only. ${
        base.prenatal ? PRENATAL_LABEL + ' ' : ''
      }${base.ironCarton ? IRON_OVERDOSE_CARTON + ' ' : ''}${
        base.zinc ? ZINC_PARKED + ' ' : ''
      }${base.extraNote ?? ''} ${NO_CLEAN_GUMMY} No DailyMed drug SPL (dietary supplement). Pack sizes share formulaId when the other-ingredients list holds. No dosing or medical advice in this draft.`.replace(
        /\s+/g,
        ' ',
      ).trim(),
    retailers: [...(base.retailers ?? US_WIDE)],
    cleanAlternatives: base.alts,
    sourcesGeneral: [`${base.cite} — draft, not verified; no DailyMed drug SPL`],
  };
}

const CITE = {
  oneDailyIF:
    'Professional Supplement Center / Healthy Place MegaFood One Daily Iron Free other-ingredients (ferment media / MCC / SiO2 / rice protein / stearic acid / tapioca starch / hypromellose)',
  womensOD:
    'HelloPharmacist Women\'s One Daily by MegaFood other-ingredients (ferment media / MCC / organic brown rice / rice protein / SiO2 / stearic acid / autolyzed yeast extract / hypromellose)',
  womens40OD:
    'HelloPharmacist Women\'s 40+ One Daily Multivitamin by MegaFood (DSLD 2025; UPC 051494102671) other-ingredients (rice protein / autolyzed yeast extract / yeast / MCC / SiO2 / stearic acid / tapioca starch / hypromellose)',
  womens55OD:
    'HelloPharmacist Women Over 55 One Daily by MegaFood (120 ct; UPC 051494103548) other-ingredients (MCC / ferment media / organic brown rice / SiO2 / rice protein / stearic acid / autolyzed yeast extract / hypromellose)',
  mensOD:
    'Vitacost MegaFood Men\'s One Daily Multivitamin 90 tablets (UPC 051494101087) other-ingredients (ferment media / MCC / stearic acid / SiO2 / rice protein / autolyzed yeast extract / hypromellose)',
  mens40OD:
    'HelloPharmacist Men\'s 40+ One Daily Multivitamin by MegaFood other-ingredients (brown rice / rice protein / autolyzed yeast extract / yeast / SiO2 / stearic acid / tapioca starch / hypromellose)',
  mens55OD:
    'HelloPharmacist Men Over 55 One Daily by MegaFood (120 ct; UPC 051494103579) other-ingredients (MCC / organic brown rice / rice protein / ferment media / SiO2 / stearic acid / autolyzed yeast extract / hypromellose)',
  womensAdv:
    'The Healthy Place MegaFood Women\'s Advanced Multivitamin other-ingredients (ferment media / rice protein / SiO2 / stearic acid / gum acacia / autolyzed yeast extract / hypromellose)',
  womens40Adv:
    'HelloPharmacist Women\'s 40+ Advanced Multivitamin by MegaFood (120 ct; UPC 051494103227; DSLD 2025) other-ingredients (autolyzed yeast extract / rice protein / yeast / SiO2 / stearic acid / gum acacia / hypromellose)',
  womens55Adv:
    'Vitacost MegaFood Women\'s 55+ Advanced Multivitamin 120 tablets (UPC 051494103272) other-ingredients (MCC / ferment media / rice protein / SiO2 / stearic acid / gum acacia / autolyzed yeast extract / hypromellose)',
  mensAdv:
    'iHerb MegaFood Men\'s Advanced Multivitamin 120 tablets other-ingredients (ferment media / SiO2 / rice protein / stearic acid / gum acacia / autolyzed yeast extract / hypromellose)',
  mens40Adv:
    'HelloPharmacist Men\'s 40+ Advanced Multivitamin by MegaFood (120 ct; UPC 051494103180; DSLD 2025) other-ingredients (SiO2 / rice protein / autolyzed yeast extract / yeast / stearic acid / gum acacia / hypromellose)',
  mens55Adv:
    'HelloPharmacist Multi for Men 55+ by MegaFood (60 ct; UPC 051494102732) other-ingredients (MCC / SiO2 / organic brown rice / ferment media / rice protein / stearic acid / autolyzed yeast extract / hypromellose)',
  kidsOD:
    'Swanson MegaFood Kids One Daily 60 tabs (UPC 051494101803) other-ingredients (stearic acid / SiO2 / ferment media / MCC / rice protein / autolyzed yeast extract / hypromellose)',
  kidsB:
    'PureFormulas Kids B Complex by MegaFood (30 mini; UPC 051494102756) other-ingredients (ferment media / MCC / SiO2 / rice protein / stearic acid / autolyzed yeast extract / hypromellose)',
  bloodBuilder:
    'iHerb MegaFood Blood Builder Iron tablets (30/60 ct) / Kroger other-ingredients (ferment media / rice protein / autolyzed yeast / stearic acid / SiO2 / hypromellose)',
  bloodMinis:
    'HelloPharmacist Blood Builder Minis by MegaFood other-ingredients (rice protein / autolyzed yeast extract / yeast / stearic acid / SiO2 / hypromellose)',
  balancedB:
    'Target / Walmart MegaFood Balanced B Complex tablet other-ingredients (MCC / rice protein / autolyzed yeast extract / SiO2 / stearic acid / hypromellose)',
  complexC:
    'HelloPharmacist Complex C by MegaFood (30 ct; UPC 051494101322) other-ingredients (organic brown rice / MCC / stearic acid / SiO2 / rice protein / hypromellose)',
  ultraC:
    'HelloPharmacist Ultra C 400 mg by MegaFood (90 ct; UPC 051494104392; DSLD 2025) other-ingredients (rice protein / MCC / autolyzed yeast extract / SiO2 / stearic acid / hypromellose)',
  xsB12:
    'Target MegaFood Extra Strength Methyl B12 vegan capsules 90 ct other-ingredients (rice flour / hypromellose / SiO2)',
  veganB12:
    'Target MegaFood Vegan B12 tablets 30 ct other-ingredients (autolyzed yeast extract / rice protein / MCC / SiO2 / stearic acid / hypromellose)',
  d3_1000:
    'HelloPharmacist Vitamin D3 1000 IU by MegaFood (90 ct; UPC 051494101155; DSLD 2025) other-ingredients (MCC / stearic acid / SiO2 / rice protein / yeast / autolyzed yeast extract / hypromellose)',
  d3_2000:
    'Vitacost MegaFood Vitamin D3 50 mcg (2,000 IU) 90 tablets (UPC 051494102220) other-ingredients (MCC / SiO2 / stearic acid / ferment media / autolyzed yeast extract / hypromellose)',
  zinc:
    'Vitacost MegaFood Zinc 22.5 mg 120 tablets (UPC 051494104408) / Target 60 ct other-ingredients (ferment media / MCC / stearic acid / SiO2 / autolyzed yeast extract / hypromellose)',
  seleniumTab:
    'MegaFood.com Selenium tablet other-ingredients (MCC / ferment media / stearic acid / SiO2 / hypromellose)',
  magTab:
    'Vitacost MegaFood Magnesium 60 tablets (UPC 051494101872) other-ingredients (ferment media / MCC / stearic acid / hypromellose / SiO2)',
  calMag:
    'Swanson MegaFood Calcium Magnesium Potassium 60 tabs (UPC 051494102312) other-ingredients (ferment media / stearic acid / SiO2 / hypromellose / potassium glycinate)',
  turmericWB:
    'MegaFood.com / HelloPharmacist Turmeric Curcumin Extra Strength Whole Body (120 ct; UPC 051494104103) other-ingredients (MCC / SiO2 / stearic acid / rice protein / maltodextrin / hypromellose)',
  ashwComplex:
    'Target MegaFood Ashwagandha Complex mini tablets 60 ct other-ingredients (MCC / stearic acid / SiO2 / maltodextrin / hypromellose)',
  thyroid:
    'MegaFood.com Thyroid Strength 60 ct other-ingredients (MCC / ferment media / hypromellose / SiO2 / stearic acid / guar gum)',
  adrenal:
    'iHerb MegaFood Adrenal Strength tablets other-ingredients (ferment media / hypromellose / purple corn / SiO2 / stearic acid / rice protein / autolyzed yeast extract)',
  snh2:
    'MegaFood.com / The Healthy Place / iHerb Skin, Nails & Hair 2 other-ingredients (MCC / ferment media / SiO2 / rice protein / stearic acid / hypromellose)',
  bm2prenatal:
    'Target / iHerb / HelloPharmacist MegaFood Baby & Me 2 Prenatal Multi tablets other-ingredients (MCC / ferment media / autolyzed yeast extract / SiO2 / rice protein / stearic acid / hypromellose ± gum acacia)',
  bm2minis:
    'HelloPharmacist Baby & Me 2 Prenatal Multi Minis by MegaFood (120 ct; UPC 051494104477) other-ingredients (MCC / ferment media / organic brown rice / SiO2 / rice protein / stearic acid / autolyzed yeast extract / hypromellose)',
  bm2post:
    'iHerb MegaFood Baby & Me 2 Postnatal Multi 60 tablets other-ingredients (MCC / ferment media / rice protein / stearic acid / SiO2 / autolyzed yeast / hypromellose)',
  xsMagGly:
    'NHC Extra Strength Magnesium Glycinate Capsules by MegaFood other-ingredients (hypromellose / MCC / SiO2 / stearic acid)',
  magGly:
    'Target MegaFood Magnesium Glycinate capsules other-ingredients (hypromellose / MCC / stearic acid / SiO2)',
  mag300:
    'iHerb / Vitacost / Hannaford / Swanson MegaFood Magnesium 300 mg 120 capsules other-ingredients (hypromellose / ascorbyl palmitate / rice hull concentrate — no SiO2 on that stack)',
  k1k2:
    'NHC Vitamin K1 & K2 Capsules by MegaFood other-ingredients (MCC / hypromellose / glycerol monostearate / stearic acid / dicalcium phosphate / SiO2)',
  womensWBCap:
    'Target / NHC MegaFood Women\'s Whole Body Multi Capsules other-ingredients (hypromellose / MCC / SiO2 / stearic acid / citric acid / dicalcium phosphate / maltodextrin)',
  mensWBCap:
    'Target / NHC MegaFood Men\'s Whole Body Multi Capsules other-ingredients (MCC / hypromellose / SiO2 / stearic acid / dicalcium phosphate / citric acid / maltodextrin)',
  hair:
    'NHC Hair Growth by MegaFood other-ingredients (MCC / hypromellose / stearic acid / modified food starch / maltodextrin — no SiO2)',
  nad:
    'NHC / Swanson MegaFood NAD+ Boost other-ingredients (MCC / hypromellose / stearic acid / SiO2)',
  glutathione:
    'Vitacost MegaFood Liposomal Glutathione 60 capsules other-ingredients (gum arabic / hypromellose / sunflower lecithin / MCC / stearic acid / SiO2)',
  coq10:
    'NHC High Absorption CoQ10 by MegaFood other-ingredients (rice powder / hypromellose / dicalcium phosphate / stearic acid / SiO2)',
  fastTurmeric:
    'The Healthy Place / Grove MegaFood Fast Acting Turmeric capsules other-ingredients (hypromellose / stearic acid / SiO2 / MCC)',
  quercetin:
    'NHC / PureFormulas MegaFood Quercetin with Bromelain other-ingredients (hypromellose / MCC / stearic acid / SiO2)',
  shilajit:
    'NHC / Grove / Swanson MegaFood Shilajit with Fulvic Acid other-ingredients (hypromellose / MCC / dextrin / stearic acid / SiO2 / maltodextrin)',
  enzymes:
    'Target MegaFood Dual-Action Digestive Enzymes other-ingredients (maltodextrin / hypromellose / MCC / stearic acid / SiO2)',
  nac:
    'NHC / Vitacost MegaFood NAC (N-Acetyl Cysteine) capsules other-ingredients (hypromellose / stearic acid / SiO2 / MCC)',
  seaMoss:
    'Target MegaFood Sea Moss Complex capsules other-ingredients (MCC / hypromellose / stearic acid / maltodextrin / SiO2)',
  theanine:
    'NHC / The Healthy Place MegaFood L-Theanine & B-Complex tablets other-ingredients (MCC / rice protein / SiO2 / stearic acid / autolyzed yeast extract / hypromellose)',
  magtein:
    'Whole Foods Market / Better Health Market MegaFood Magtein Magnesium L-Threonate other-ingredients (hypromellose / MCC / stearic acid / SiO2)',
  megaflora:
    'MegaFood.com / Target / PureFormulas MegaFlora Original other-ingredients (hypromellose / MCC / L-leucine / SiO2)',
  megafloraPlus:
    'NHC / HelloPharmacist MegaFlora Plus other-ingredients (MCC / hypromellose / L-leucine / SiO2)',
  megafloraW:
    'MegaFood.com MegaFlora Women\'s Probiotic retailer other-ingredients (hypromellose / MCC / SiO2 / calcium laurate)',
  megafloraT:
    'Vitacost / Fullscript MegaFlora Probiotic + Prebiotic with Turmeric other-ingredients (hypromellose / MCC / SiO2 / calcium laurate)',
  megafloraKids:
    'NHC / HelloPharmacist MegaFlora Kids Probiotic other-ingredients (MCC / hypromellose / L-leucine / SiO2)',
  mushStress:
    'Better Health Market MegaFood Superfood Mushroom Stress Relief other-ingredients (hypromellose / MCC / stearic acid / SiO2)',
  mushFocus:
    'The Healthy Place / Grove MegaFood Superfood Mushroom Focus Support other-ingredients (hypromellose / MCC / stearic acid / SiO2)',
  omega3:
    'Target / NHC MegaFood Omega-3 Fish Oil other-ingredients (bovine gelatin / glycerin / purified water / organic lemon oil / mixed tocopherols / rosemary extract)',
  omega369:
    'Target / PureFormulas MegaFood Omega 3-6-9 other-ingredients (Ahiflower / algal oil / rosemary / mixed tocopherols / sunflower lecithin / sunflower oil / ascorbyl palmitate / hypromellose / SiO2 / gellan gum / organic lemon oil)',
  bbLiquid:
    'PureFormulas / Whole Foods Market MegaFood Blood Builder Liquid Iron Orchard Fruit other-ingredients (organic glycerin / water / apple / pear / tart cherry juice concentrates / natural flavors / beetroot juice concentrate / citrus peel extract)',
  relaxRasp:
    'MegaFood.com Relax + Calm Magnesium Powder Raspberry Lemonade other-ingredients (maltodextrin / citric acid / natural flavors / monk fruit extract)',
  relaxBb:
    'Target MegaFood Relax + Calm Magnesium Powder Blackberry Hibiscus Oasis other-ingredients (maltodextrin / natural flavors / citric acid / monk fruit extract)',
  dhaCholine:
    'NHC / PureFormulas / The Healthy Place MegaFood Baby & Me 2 Prenatal DHA & Choline other-ingredients (MCT palm kernel / hypromellose / MCC / SiO2 / sunflower oil / tocopherols / rosemary extract / mono and diglycerides)',
  bm2proOld:
    'The Healthy Place MegaFood MegaFlora Baby & Me 2 Prenatal Probiotic + Prebiotic other-ingredients (MCC / hypromellose / SiO2 / calcium laurate / guar gum)',
  wbGummyW:
    'Vitacost / NHC / The Healthy Place MegaFood Women\'s Whole Body Multi Gummy Strawberry other-ingredients (organic tapioca syrup / organic cane sugar / water / natural flavor / pectin / black carrot concentrate / citric acid / trisodium citrate / carnauba wax)',
  wbGummyM:
    'NHC / The Healthy Place MegaFood Men\'s Whole Body Multi Gummies other-ingredients (organic tapioca syrup / organic cane sugar / water / natural flavor / pectin / black carrot concentrate / citric acid / trisodium citrate / carnauba wax)',
  wbGummyW55:
    'NHC / Target MegaFood Women\'s 55+ Whole Body Multi Gummies other-ingredients (organic tapioca syrup / organic cane sugar / water / natural flavor / pectin / black carrot concentrate / citric acid / trisodium citrate / carnauba wax)',
  wbGummyM55:
    'NHC MegaFood Men\'s 55+ Whole Body Multi Gummies other-ingredients (organic tapioca syrup / organic cane sugar / water / natural flavor / pectin / black carrot concentrate / citric acid / trisodium citrate / carnauba wax)',
  womensProGummy:
    'Vitacost / NHC MegaFood Women\'s Prebiotic + Probiotic Gummies Mixed Berry other-ingredients (chicory root fiber / water / pectin / agar / tapioca starch / natural flavor / black carrot concentrate / trisodium citrate / citric acid / carnauba wax)',
  prebioticGummy:
    'Target MegaFood Prebiotic Fiber Gummies Orange other-ingredients (FOS from chicory / water / pectin / agar / tapioca starch / citric acid / trisodium citrate / natural flavor / paprika extract / carnauba wax)',
  d3k2gummy:
    'Target MegaFood Vitamin D3+K2 5000 IU Gummies Peach other-ingredients (organic cane sugar / organic tapioca syrup / water / pectin / citric acid / natural flavors / sodium citrate / organic tapioca starch / vegetable juice color)',
  magCitGummy:
    'Target / NHC MegaFood High Absorption Magnesium Citrate Gummies Raspberry other-ingredients (chicory root FOS / water / pectin / agar / tapioca starch / natural flavor / citric acid / trisodium citrate / black carrot concentrate / carnauba wax)',
  ironGummy:
    'NHC MegaFood Iron Energy Gummy other-ingredients (organic tapioca syrup / organic sugar / pectin / organic acerola / citric acid / organic fruit and vegetable juice / beet juice / natural flavor / sunflower oil / carnauba wax)',
  b12cran:
    'Target / Vitacost MegaFood B12 Energy Gummies Cranberry other-ingredients (organic tapioca syrup / organic cane sugar / apple pectin / citric acid / sodium citrate / organic beet root powder / organic sunflower oil / organic carnauba wax)',
  b12ginger:
    'Vitacost / The Healthy Place MegaFood B12 Energy Gummies Ginger other-ingredients (organic tapioca syrup / organic cane sugar / apple pectin / citric acid / sodium citrate / organic beet root powder / organic sunflower oil / organic carnauba wax)',
  cDefense:
    'IngredientList / Target MegaFood C Defense Tangy Citrus gummies other-ingredients (organic tapioca syrup / organic cane sugar / apple pectin / sodium citrate / citric acid / organic sunflower oil / organic carnauba wax)',
  melatoninGummy:
    'NHC / iHerb MegaFood Melatonin Berry Good Sleep Gummies 3 mg other-ingredients (organic tapioca syrup / organic cane sugar / apple pectin / citric acid / sodium citrate / organic sunflower oil / organic carnauba wax)',
  bm2gummy:
    'NHC / The Healthy Place MegaFood Baby & Me 2 Prenatal Multi Gummies other-ingredients (organic tapioca syrup / organic cane sugar / apple pectin / citric acid / natural flavors / sodium citrate / organic sunflower oil / organic carnauba wax)',
  kidsGummy:
    'Vitacost / Target MegaFood Kids Multi Berrylicious Gummies other-ingredients (organic tapioca syrup / organic cane sugar / apple pectin / citric acid / natural flavors / sodium citrate / organic sunflower oil / organic carnauba wax)',
  elderGummy:
    'Vitacost / Thrive / Sprouts MegaFood Elderberry Immune Support Gummies other-ingredients (organic tapioca syrup / organic cane sugar / apple pectin / citric acid / sodium citrate / organic maltodextrin / organic sunflower oil / organic carnauba wax)',
  d3gummy:
    'Vitacost / NHC MegaFood D3 2000 IU Mixed Fruit Gummies other-ingredients (organic tapioca syrup / organic cane sugar / apple pectin / citric acid / sodium citrate / organic sunflower oil / organic carnauba wax)',
  relaxGrape:
    'Target / NHC MegaFood Relax + Calm Magnesium Soft Chews Grape other-ingredients (organic rice syrup / organic cane sugar / inulin / palm oil / natural flavors / sunflower lecithin / citric acid / fruit and vegetable juice / glycerin / rosemary leaf extract)',
  relaxStraw:
    'Target / The Healthy Place MegaFood Relax + Calm Magnesium Soft Chews Strawberry other-ingredients (organic rice syrup / organic cane sugar / inulin / natural flavors / sunflower lecithin / palm oil / citric acid / fruit and vegetable juice / glycerin / rosemary leaf extract)',
  kidsChew:
    'Vitacost / Target MegaFood Kids One Daily Multivitamin Soft Chews Grape other-ingredients (organic raw cane sugar / organic rice syrup / palm oil / rice bran / natural flavors / sunflower lecithin / malic acid / fruit and vegetable juice / glycerin / citric acid / rosemary leaf extract)',
  womensChew:
    'The Healthy Place / MegaFood.com Women\'s One Daily Multivitamin Soft Chews Mixed Berry other-ingredients (organic raw cane sugar / organic rice syrup / natural flavors / palm oil / rice bran / sunflower lecithin / malic acid / fruit and vegetable juice / glycerin / citric acid)',
  nauseaChew:
    'Target / Vitacost MegaFood Baby & Me 2 Morning Sickness Nausea Relief Soft Chews other-ingredients (organic rice syrup / organic cane sugar / rice bran / organic wildflower honey / sunflower lecithin / palm oil / organic tapioca starch / natural flavors / glycerin / rosemary leaf extract)',
  womensWBTab:
    'Founder photo of megafood.com Women\'s Whole Body Tablets Supplement Facts (MCC / citric acid / maltodextrin / croscarmellose sodium / SiO2 / stearic acid / dicalcium phosphate / hypromellose)',
  bm2multiDha:
    'Founder photo of megafood.com Baby & Me 2 Prenatal Multi & DHA Supplement Facts (hypromellose / SiO2 / MCC / stearic acid)',
  seleniumCap:
    'MegaFood.com High-Absorption Selenium Capsules brand-site other-ingredients — founder lock (MCC / ferment media / stearic acid / SiO2 / hypromellose)',
  methylB12Tab:
    'MegaFood.com classic Methyl B12 tablet other-ingredients — founder lock (MCC / stearic acid / SiO2 / rice protein / hypromellose / yeast extract)',
  d3_5000:
    'NHC Vitamin D3 5000 IU K & K2 by MegaFood other-ingredients (maltodextrin / hypromellose / dicalcium phosphate / SiO2) — founder lock (maltodextrin + SiO2 + HPMC ± dicalcium phosphate)',
  pppGummy:
    'Target MegaFood Probiotic Prebiotic Postbiotic Gummies Raspberry other-ingredients (tapioca syrup / cane sugar / water / pectin / less than 2% medium chain triglycerides / citric acid / natural flavor / black carrot juice concentrate / sunflower lecithin)',
  ashwGummy:
    'Target / NHC / Better Health Market MegaFood Ashwagandha Gummies Mixed Berry other-ingredients (FOS from chicory inulin / water / pectin / agar-agar / tapioca starch / natural flavor / black carrot concentrate / citric acid / trisodium citrate / sodium copper chlorophyllin / carnauba wax)',
  berberine:
    'NHC / Vitacost / HelloPharmacist MegaFood Berberine Phytosome other-ingredients (hypromellose / pea protein isolate / grape seed extract / MCC / stearic acid)',
  astarte:
    'HelloPharmacist Women\'s Probiotic + Prebiotic by MegaFood shelf-stable ASTARTE (UPC 051494105337) other-ingredients (MCC / hypromellose / rice / rice extract / gum arabic / sunflower oil)',
  bm2proLgg:
    'HelloPharmacist Baby & Me 2 Prenatal Probiotic + Prebiotic by MegaFood shelf-stable LGG other-ingredients (MCC / hypromellose / maltodextrin / rice extract / rice / gum arabic / sunflower oil / SiO2)',
  lipoC:
    'Target / HelloPharmacist / Whole Foods MegaFood Liposomal Vitamin C other-ingredients (sunflower lecithin / MCT oil / hypromellose / beeswax / paprika extract); megafood.com FAQ: MCT derived from coconut',
  turmericPowder:
    'NHC Daily Turmeric Nutrient Booster Powder by MegaFood other-ingredients (silicon dioxide / rice protein)',
  creatineGummy:
    'Founder photo of megafood.com Creatine Monohydrate Gummies Supplement Facts (glucose syrup / sugar / water / less than 2% natural flavor / pectin / black carrot concentrate / citric acid / trisodium citrate / carnauba wax)',
  turmericMinis:
    'Founder photo of megafood.com Turmeric Curcumin Whole Body Minis Supplement Facts (MCC / SiO2 / stearic acid / rice protein / hypromellose)',
  turmericJoint:
    'Founder photo of megafood.com Turmeric Curcumin Extra Strength Joint Supplement Facts (MCC / SiO2 / stearic acid / hypromellose)',
  turmericLiver:
    'Founder photo of megafood.com Turmeric Curcumin Extra Strength Liver Supplement Facts (MCC / stearic acid / SiO2 / hypromellose)',
} as const;

function gummyBaseFlags(cite: string, withFlavor: boolean): IngredientFlag[] {
  const out: IngredientFlag[] = [
    labelCleared(cite, 'Organic tapioca syrup'),
    labelCleared(cite, 'Organic cane sugar'),
    labelCleared(cite, 'Pectin'),
    labelCleared(cite, 'Citric acid'),
    labelCleared(cite, 'Carnauba wax'),
  ];
  if (withFlavor) {
    out.unshift(flag('Natural flavor', 'limited', labelCite(cite, METH.flavors)));
  }
  return out;
}

export const BATCH31_MEGAFOOD: RatingRecord[] = [
  // ── Clean ───────────────────────────────────────────────
  {
    id: MAG300_ID,
    barcode: '051494103968',
    productName: 'Magnesium 300 mg Capsules',
    brand: BRAND,
    category: VITAMINS,
    formulaId: MAG300_ID,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Magnesium (glycinate / malate / citrate)', strength: '300mg' },
    ],
    inactiveIngredients: [
      labelCleared(CITE.mag300, 'Hypromellose'),
      flag('Ascorbyl palmitate', 'cleared', labelCite(CITE.mag300, METH.tocopherols)),
      flag('Rice hull concentrate', 'cleared', labelCite(CITE.mag300, METH.riceHull)),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER-STYLE DRAFT: MegaFood Magnesium 300 mg Capsules = Clean on the matched no-SiO2 US retailer stack (iHerb / Vitacost / Hannaford / Swanson): hypromellose, ascorbyl palmitate, rice hull concentrate. Demerit math: every listed inactive is §5 Cleared (HPMC; ascorbyl palmitate antioxidant lock; rice hull concentrate / rice concentrate plant-fiber flow agent — SiO2 nanoparticle cap does NOT apply). CONFIRMED no silicon dioxide / silica, titanium dioxide, dye, talc, or flavor on that stack. A Whole Foods snapshot that also lists silicon dioxide is a different unmatched formula — not this Clean row; confirm the carton. Do not invent Clean for the SiO2 twin. No DailyMed drug SPL (dietary supplement). Adults. No dosing or medical advice in this draft.',
    retailers: [...US_WIDE],
    sourcesGeneral: [`${CITE.mag300} — draft, not verified; no DailyMed drug SPL`],
  },

  // ── Caution — classic FoodState tablets ─────────────────
  cautionSio2({
    id: 'megafood-one-daily-iron-free',
    barcode: '051494101735 051494101742 051494101940',
    productName: 'One Daily Iron Free Multivitamin',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [
      { name: 'Food-state multivitamin / multimineral (iron-free)', strength: '1 tablet (label serving)' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    cite: CITE.oneDailyIF,
    extras: ['Tapioca food starch'],
    zinc: true,
    extraNote:
      'Separate formulaId from reused megafood-one-daily (that row has iron). Iron-free design is not a cleanliness demerit.',
  }),
  cautionSio2({
    id: 'megafood-womens-one-daily',
    barcode: '051494101032 051494101049 051494101056 051494103012 051494104255',
    productName: 'Women\'s One Daily Multivitamin',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [
      { name: 'Women\'s food-state multivitamin / multimineral', strength: '1 tablet (label serving)' },
      { name: 'Iron', strength: '9mg' },
      { name: 'Zinc', strength: '9mg' },
    ],
    cite: CITE.womensOD,
    zinc: true,
    ironCarton: true,
  }),
  cautionSio2({
    id: 'megafood-womens-40-one-daily',
    barcode: '051494102657 051494102664 051494102671',
    productName: 'Women\'s 40+ One Daily Multivitamin',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [
      { name: 'Women\'s 40+ food-state multivitamin / multimineral', strength: '1 tablet (label serving)' },
      { name: 'Iron', strength: 'label serving' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    cite: CITE.womens40OD,
    extras: ['Tapioca starch'],
    zinc: true,
    ironCarton: true,
  }),
  cautionSio2({
    id: 'megafood-womens-55-one-daily',
    barcode: '051494103524 051494103531 051494103548',
    productName: 'Women\'s 55+ One Daily Multivitamin',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [
      { name: 'Women\'s 55+ food-state multivitamin / multimineral', strength: '1 tablet (label serving)' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    cite: CITE.womens55OD,
    zinc: true,
  }),
  cautionSio2({
    id: 'megafood-mens-one-daily',
    barcode: '051494101063 051494101070 051494101087',
    productName: 'Men\'s One Daily Multivitamin',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [
      { name: 'Men\'s food-state multivitamin / multimineral', strength: '1 tablet (label serving)' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    cite: CITE.mensOD,
    zinc: true,
    extraNote:
      'Matched to the current Vitacost methylfolate / methyl B12 stack. An older Swanson folic-acid / cyanocobalamin + tapioca snapshot is a different label — not this row.',
  }),
  cautionSio2({
    id: 'megafood-mens-40-one-daily',
    barcode: '051494102701',
    productName: 'Men\'s 40+ One Daily Multivitamin',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [
      { name: 'Men\'s 40+ food-state multivitamin / multimineral', strength: '1 tablet (label serving)' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    cite: CITE.mens40OD,
    extras: ['Tapioca starch'],
    zinc: true,
  }),
  cautionSio2({
    id: 'megafood-mens-55-one-daily',
    barcode: '051494103555 051494103562 051494103579',
    productName: 'Men\'s 55+ One Daily Multivitamin',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [
      { name: 'Men\'s 55+ food-state multivitamin / multimineral', strength: '1 tablet (label serving)' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    cite: CITE.mens55OD,
    zinc: true,
  }),
  cautionSio2({
    id: 'megafood-womens-advanced',
    barcode: '051494103234 051494103241',
    productName: 'Women\'s Advanced Multivitamin',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [
      { name: 'Women\'s advanced food-state multivitamin / multimineral', strength: '2 tablets (label serving)' },
      { name: 'Iron', strength: '15mg' },
      { name: 'Zinc', strength: '15mg' },
    ],
    cite: CITE.womensAdv,
    extraInactives: [flag('Gum acacia', 'cleared', labelCite(CITE.womensAdv, METH.gums))],
    zinc: true,
    ironCarton: true,
  }),
  cautionSio2({
    id: 'megafood-womens-40-advanced',
    barcode: '051494103227',
    productName: 'Women\'s 40+ Advanced Multivitamin',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [
      { name: 'Women\'s 40+ advanced food-state multivitamin / multimineral', strength: '2 tablets (label serving)' },
      { name: 'Iron', strength: 'label serving' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    cite: CITE.womens40Adv,
    extraInactives: [flag('Gum acacia', 'cleared', labelCite(CITE.womens40Adv, METH.gums))],
    zinc: true,
    ironCarton: true,
  }),
  cautionSio2({
    id: 'megafood-womens-55-advanced',
    barcode: '051494102718',
    productName: 'Women\'s 55+ Advanced Multivitamin',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [
      { name: 'Women\'s 55+ advanced food-state multivitamin / multimineral', strength: '2 tablets (label serving)' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    cite: CITE.womens55Adv,
    extraInactives: [flag('Gum acacia', 'cleared', labelCite(CITE.womens55Adv, METH.gums))],
    zinc: true,
  }),
  cautionSio2({
    id: 'megafood-mens-advanced',
    barcode: '051494103203',
    productName: 'Men\'s Advanced Multivitamin',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [
      { name: 'Men\'s advanced food-state multivitamin / multimineral', strength: '2 tablets (label serving)' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    cite: CITE.mensAdv,
    extraInactives: [flag('Gum acacia', 'cleared', labelCite(CITE.mensAdv, METH.gums))],
    zinc: true,
  }),
  cautionSio2({
    id: 'megafood-mens-40-advanced',
    barcode: '051494103180',
    productName: 'Men\'s 40+ Advanced Multivitamin',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [
      { name: 'Men\'s 40+ advanced food-state multivitamin / multimineral', strength: '2 tablets (label serving)' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    cite: CITE.mens40Adv,
    extraInactives: [flag('Gum acacia', 'cleared', labelCite(CITE.mens40Adv, METH.gums))],
    zinc: true,
    extraNote:
      'HelloPharmacist / DSLD 2025 stack (includes gum acacia). MegaFood.com marketing copy that omits gum acacia is not a second grade — confirm the carton.',
  }),
  cautionSio2({
    id: 'megafood-mens-55-advanced',
    barcode: '051494102732',
    productName: 'Men\'s 55+ Advanced Multivitamin',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [
      { name: 'Men\'s 55+ advanced food-state multivitamin / multimineral', strength: '2 tablets (label serving)' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    cite: CITE.mens55Adv,
    zinc: true,
  }),
  cautionSio2({
    id: 'megafood-kids-one-daily-mini',
    barcode: '051494101797 051494101803',
    productName: 'Kids One Daily Mini Multivitamin',
    category: VITAMINS,
    form: 'mini tablet',
    audience: KIDS,
    minAge: 4,
    productType: VITAMIN,
    actives: [
      { name: 'Kids food-state multivitamin / multimineral', strength: '1 mini tablet (label serving)' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    cite: CITE.kidsOD,
    zinc: true,
    extraNote: 'No independently Clean kids multi on main — cleanAlternatives omitted.',
  }),
  cautionSio2({
    id: 'megafood-kids-b-complex-minis',
    barcode: '051494102756',
    productName: 'Kids B Complex Minis',
    category: VITAMINS,
    form: 'mini tablet',
    audience: KIDS,
    minAge: 4,
    productType: VITAMIN,
    actives: [{ name: 'B-complex vitamins', strength: '1 mini tablet (label serving)' }],
    cite: CITE.kidsB,
  }),
  cautionSio2({
    id: 'megafood-blood-builder',
    barcode: '051494101186 051494101704 051494101711 051494101957',
    productName: 'Blood Builder Iron Supplement',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [
      { name: 'Iron (fermented iron bisglycinate)', strength: '26mg' },
      { name: 'Vitamin C', strength: '15mg' },
      { name: 'Folate', strength: '680mcg DFE' },
      { name: 'Vitamin B12', strength: '30mcg' },
    ],
    cite: CITE.bloodBuilder,
    ironCarton: true,
    alts: IRON_ALTS,
    extraNote: 'Older NIH DSLD “stearic acid, cellulose” PDF is not this current stack.',
  }),
  cautionSio2({
    id: 'megafood-blood-builder-minis',
    barcode: '051494103371',
    productName: 'Blood Builder Minis Iron Supplement',
    category: VITAMINS,
    form: 'mini tablet',
    productType: VITAMIN,
    actives: [{ name: 'Iron (fermented iron bisglycinate)', strength: 'label serving' }],
    cite: CITE.bloodMinis,
    ironCarton: true,
    alts: IRON_ALTS,
  }),
  cautionSio2({
    id: 'megafood-balanced-b-complex',
    barcode: '051494101667 051494101674 051494101681',
    productName: 'Balanced B Complex',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [{ name: 'B-complex vitamins (including methylfolate and methyl B12)', strength: '1 tablet (label serving)' }],
    cite: CITE.balancedB,
  }),
  cautionSio2({
    id: 'megafood-complex-c',
    barcode: '051494101322 051494101339 051494101353',
    productName: 'Complex C',
    category: IMMUNE,
    form: 'tablet',
    productType: VITAMIN,
    actives: [{ name: 'Vitamin C', strength: '250mg' }],
    cite: CITE.complexC,
  }),
  cautionSio2({
    id: 'megafood-ultra-c-400',
    barcode: '051494101841 051494104392',
    productName: 'Ultra C 400 mg',
    category: IMMUNE,
    form: 'tablet',
    productType: VITAMIN,
    actives: [{ name: 'Vitamin C', strength: '400mg' }],
    cite: CITE.ultraC,
  }),
  cautionCustom({
    id: 'megafood-extra-strength-methyl-b12',
    barcode: '051494105672',
    productName: 'Extra Strength Methyl B12',
    category: VITAMINS,
    form: 'capsule',
    productType: VITAMIN,
    actives: [{ name: 'Vitamin B12 (methylcobalamin)', strength: 'label serving' }],
    cite: CITE.xsB12,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.xsB12, METH.sio2)),
      labelCleared(CITE.xsB12, 'Hypromellose'),
      flag('Rice flour', 'cleared', labelCite(CITE.xsB12, METH.starches)),
    ],
    math: 'Driver is silicon dioxide (0-pt Caution cap). Rice flour is treated as a simple starch (Cleared housekeeping class; distinct from the rice-hull lock and from SiO2). Demerit math: 0 pts + Caution cap.',
  }),
  cautionSio2({
    id: 'megafood-vegan-b12',
    barcode: '051494120019',
    productName: 'Vegan B12',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [
      { name: 'Vitamin B12', strength: '500mcg' },
      { name: 'Vitamin B6', strength: '20mg' },
      { name: 'Folate', strength: '680mcg DFE' },
    ],
    cite: CITE.veganB12,
  }),
  cautionSio2({
    id: 'megafood-vitamin-d3-1000',
    barcode: '051494101148 051494101155',
    productName: 'Vitamin D3 1000 IU (25 mcg)',
    category: IMMUNE,
    form: 'tablet',
    productType: VITAMIN,
    actives: [{ name: 'Vitamin D3 (cholecalciferol)', strength: '25mcg (1000 IU)' }],
    cite: CITE.d3_1000,
  }),
  cautionSio2({
    id: 'megafood-vitamin-d3-2000',
    barcode: '051494102206 051494102213 051494102220',
    productName: 'Vitamin D3 2000 IU (50 mcg)',
    category: IMMUNE,
    form: 'tablet',
    productType: VITAMIN,
    actives: [{ name: 'Vitamin D3 (cholecalciferol)', strength: '50mcg (2000 IU)' }],
    cite: CITE.d3_2000,
  }),
  cautionSio2({
    id: 'megafood-zinc-bisglycinate',
    barcode: '051494104408',
    productName: 'Zinc Bisglycinate',
    category: IMMUNE,
    form: 'tablet',
    productType: VITAMIN,
    actives: [{ name: 'Zinc (fermented zinc bisglycinate)', strength: '22.5mg' }],
    cite: CITE.zinc,
    zinc: true,
  }),
  cautionSio2({
    id: 'megafood-selenium-tablet',
    barcode: '051494101865',
    productName: 'Selenium',
    category: IMMUNE,
    form: 'tablet',
    productType: VITAMIN,
    actives: [{ name: 'Selenium (fermented selenium glycinate)', strength: '50mcg' }],
    cite: CITE.seleniumTab,
    extraNote:
      'Classic FoodState selenium tablet — separate formulaId from High-Absorption Selenium Capsules (L-selenomethionine).',
  }),
  cautionSio2({
    id: 'megafood-magnesium-tablet',
    barcode: '051494101209 051494101872',
    productName: 'Magnesium',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [{ name: 'Magnesium', strength: 'label serving' }],
    cite: CITE.magTab,
    alts: MAG300_ALTS,
  }),
  cautionSio2({
    id: 'megafood-calcium-magnesium',
    barcode: '051494102312',
    productName: 'Calcium & Magnesium',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [
      { name: 'Calcium', strength: 'label serving' },
      { name: 'Magnesium', strength: 'label serving' },
    ],
    cite: CITE.calMag,
    extraNote:
      'Swanson lists potassium glycinate with other-ingredients — treated as a labeled mineral, not a second inactive grade. ' +
      UNGRADED_NOT_REQUIRED,
    alts: MAG300_ALTS,
  }),
  cautionSio2({
    id: 'megafood-turmeric-whole-body',
    barcode: '051494100066 051494100103',
    productName: 'Turmeric Curcumin Whole Body',
    category: VITAMINS,
    form: 'tablet',
    productType: SUPPLEMENT,
    actives: [{ name: 'Curcuminoids', strength: '475mg' }],
    cite: CITE.turmericWB,
    maltodextrin: true,
  }),
  cautionSio2({
    id: 'megafood-ashwagandha-complex',
    barcode: '051494104330',
    productName: 'Ashwagandha Complex',
    category: VITAMINS,
    form: 'mini tablet',
    productType: SUPPLEMENT,
    actives: [{ name: 'Ashwagandha (KSM-66) with schisandra / astragalus / holy basil', strength: 'label serving' }],
    cite: CITE.ashwComplex,
    maltodextrin: true,
  }),
  cautionSio2({
    id: 'megafood-thyroid-strength',
    barcode: '051494200278 051494200292',
    productName: 'Thyroid Strength',
    category: VITAMINS,
    form: 'tablet',
    productType: SUPPLEMENT,
    actives: [{ name: 'Thyroid-support nutrient / herb blend', strength: 'label serving' }],
    cite: CITE.thyroid,
    extraInactives: [flag('Guar gum', 'cleared', labelCite(CITE.thyroid, METH.gums))],
  }),
  cautionSio2({
    id: 'megafood-adrenal-strength',
    barcode: '051494200216 051494200223 051494200230',
    productName: 'Adrenal Strength',
    category: VITAMINS,
    form: 'tablet',
    productType: SUPPLEMENT,
    actives: [{ name: 'Sensoril ashwagandha / rhodiola / holy basil / adrenal-support blend', strength: 'label serving' }],
    cite: CITE.adrenal,
    extraNote:
      'Purple corn appears on the iHerb other-ingredients list as a color — not in Methodology §5 (ungraded; v1.6 intake) and not required to reach the SiO2 Caution cap. Not a new color lock.',
  }),
  cautionSio2({
    id: 'megafood-skin-nails-hair-2',
    barcode: '051494102800 051494102817',
    productName: 'Skin, Nails & Hair 2',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [
      { name: 'Vitamin C', strength: '200mg' },
      { name: 'Biotin', strength: '300mcg' },
      { name: 'Zinc', strength: '15mg' },
    ],
    cite: CITE.snh2,
    zinc: true,
  }),
  cautionSio2({
    id: 'megafood-baby-me-2-prenatal-multi',
    barcode: '051494103142 051494103159',
    productName: 'Baby & Me 2 Prenatal Multi',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [
      { name: 'Prenatal multivitamin / multimineral', strength: '2 tablets (label serving)' },
      { name: 'Iron', strength: '18mg' },
      { name: 'Choline', strength: '300mg' },
      { name: 'Zinc', strength: '15mg' },
    ],
    cite: CITE.bm2prenatal,
    extraInactives: [flag('Gum acacia', 'cleared', labelCite(CITE.bm2prenatal, METH.gums))],
    zinc: true,
    prenatal: true,
    ironCarton: true,
    alts: PRENATAL_ALTS,
    extraNote:
      'Batch 15 skipped MegaFood Baby & Me as not confirmed in-store. Current US Target / iHerb / HelloPharmacist other-ingredients now match. Some HelloPharmacist snapshots list gum acacia; Target / iHerb lists omit it — both stay Caution on SiO2. Not a Clean invent.',
  }),
  cautionSio2({
    id: 'megafood-baby-me-2-prenatal-minis',
    barcode: '051494104477',
    productName: 'Baby & Me 2 Prenatal Multi Minis',
    category: VITAMINS,
    form: 'mini tablet',
    productType: VITAMIN,
    actives: [
      { name: 'Prenatal multivitamin / multimineral', strength: 'label serving' },
      { name: 'Iron', strength: 'label serving' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    cite: CITE.bm2minis,
    zinc: true,
    prenatal: true,
    ironCarton: true,
    alts: PRENATAL_ALTS,
  }),
  cautionSio2({
    id: 'megafood-baby-me-2-postnatal-multi',
    barcode: '051494104286 051494104309',
    productName: 'Baby & Me 2 Postnatal Multi',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [
      { name: 'Postnatal multivitamin / multimineral', strength: '2 tablets (label serving)' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    cite: CITE.bm2post,
    zinc: true,
    extraNote:
      'Carton is labeled for postnatal / nursing use. No dosing or medical advice in this draft. Not the prenatal Search shelf (name has no “prenatal”).',
  }),

  // ── Caution — newer capsules ────────────────────────────
  cautionCustom({
    id: 'megafood-extra-strength-magnesium-glycinate',
    barcode: '051494106204',
    productName: 'Extra Strength Magnesium Glycinate Capsules',
    category: VITAMINS,
    form: 'capsule',
    productType: VITAMIN,
    actives: [{ name: 'Magnesium (glycinate)', strength: '350mg elemental' }],
    cite: CITE.xsMagGly,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.xsMagGly, METH.sio2)),
      labelCleared(CITE.xsMagGly, 'Hypromellose'),
      labelCleared(CITE.xsMagGly, 'Microcrystalline cellulose'),
      labelCleared(CITE.xsMagGly, 'Stearic acid'),
    ],
    math: 'Driver is silicon dioxide (0-pt Caution cap). HPMC / MCC / stearic acid are Cleared. Demerit math: 0 pts + Caution cap.',
    alts: MAG300_ALTS,
    retailers: BRAND_AMZ,
  }),
  cautionCustom({
    id: 'megafood-magnesium-glycinate',
    barcode: '051494105597',
    productName: 'Magnesium Glycinate',
    category: VITAMINS,
    form: 'capsule',
    productType: VITAMIN,
    actives: [{ name: 'Magnesium (glycinate)', strength: '60mg elemental per 2 capsules as labeled' }],
    cite: CITE.magGly,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.magGly, METH.sio2)),
      labelCleared(CITE.magGly, 'Hypromellose'),
      labelCleared(CITE.magGly, 'Microcrystalline cellulose'),
      labelCleared(CITE.magGly, 'Stearic acid'),
    ],
    math: 'Driver is silicon dioxide (0-pt Caution cap). Separate formulaId from Extra Strength Magnesium Glycinate (different elemental amount / other-ingredients order).',
    alts: MAG300_ALTS,
  }),
  cautionCustom({
    id: 'megafood-vitamin-k1-k2',
    barcode: '051494106136',
    productName: 'Vitamin K1 & K2 Capsules',
    category: VITAMINS,
    form: 'capsule',
    productType: VITAMIN,
    actives: [
      { name: 'Vitamin K1 (phytonadione)', strength: '120mcg' },
      { name: 'Vitamin K2 (MK-7 / MK-4)', strength: '150mcg' },
    ],
    cite: CITE.k1k2,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.k1k2, METH.sio2)),
      labelCleared(CITE.k1k2, 'Microcrystalline cellulose'),
      labelCleared(CITE.k1k2, 'Hypromellose'),
      labelCleared(CITE.k1k2, 'Stearic acid'),
      labelCleared(CITE.k1k2, 'Dicalcium phosphate'),
    ],
    math: 'Driver is silicon dioxide (0-pt Caution cap). Glycerol monostearate is not in Methodology §5 (ungraded; v1.6 intake; same class note as glyceryl monostearate on prior batches) and is not required to reach Caution.',
    extraNote: UNGRADED_NOT_REQUIRED,
    retailers: BRAND_AMZ,
  }),
  cautionCustom({
    id: 'megafood-womens-whole-body-capsules',
    barcode: '051494106068',
    productName: 'Women\'s Whole Body Multi Capsules',
    category: VITAMINS,
    form: 'capsule',
    productType: VITAMIN,
    actives: [
      { name: 'Women\'s multivitamin / multimineral', strength: 'label serving' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    cite: CITE.womensWBCap,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.womensWBCap, METH.sio2)),
      flag('Maltodextrin', 'limited', labelCite(CITE.womensWBCap, METH.maltodextrin)),
      labelCleared(CITE.womensWBCap, 'Hypromellose'),
      labelCleared(CITE.womensWBCap, 'Microcrystalline cellulose'),
      labelCleared(CITE.womensWBCap, 'Stearic acid'),
      labelCleared(CITE.womensWBCap, 'Citric acid'),
      labelCleared(CITE.womensWBCap, 'Dicalcium phosphate'),
    ],
    math: 'Demerit math: maltodextrin Limited 1 pt + SiO2 0-pt Caution cap → Caution.',
    zinc: true,
  }),
  cautionCustom({
    id: 'megafood-mens-whole-body-capsules',
    barcode: '051494106051',
    productName: 'Men\'s Whole Body Multi Capsules',
    category: VITAMINS,
    form: 'capsule',
    productType: VITAMIN,
    actives: [
      { name: 'Men\'s multivitamin / multimineral', strength: 'label serving' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    cite: CITE.mensWBCap,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.mensWBCap, METH.sio2)),
      flag('Maltodextrin', 'limited', labelCite(CITE.mensWBCap, METH.maltodextrin)),
      labelCleared(CITE.mensWBCap, 'Hypromellose'),
      labelCleared(CITE.mensWBCap, 'Microcrystalline cellulose'),
      labelCleared(CITE.mensWBCap, 'Stearic acid'),
      labelCleared(CITE.mensWBCap, 'Citric acid'),
      labelCleared(CITE.mensWBCap, 'Dicalcium phosphate'),
    ],
    math: 'Demerit math: maltodextrin Limited 1 pt + SiO2 0-pt Caution cap → Caution.',
    zinc: true,
  }),
  cautionCustom({
    id: 'megafood-hair-growth-capsules',
    barcode: '051494106082',
    productName: 'Hair Growth Capsules',
    category: VITAMINS,
    form: 'capsule',
    productType: VITAMIN,
    actives: [
      { name: 'Biotin', strength: '10000mcg' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    cite: CITE.hair,
    inactives: [
      flag('Maltodextrin', 'limited', labelCite(CITE.hair, METH.maltodextrin)),
      labelCleared(CITE.hair, 'Microcrystalline cellulose'),
      labelCleared(CITE.hair, 'Hypromellose'),
      labelCleared(CITE.hair, 'Stearic acid'),
      flag('Modified food starch', 'cleared', labelCite(CITE.hair, METH.starches)),
    ],
    math: 'CONFIRMED no silicon dioxide on the NHC panel. Driver is maltodextrin Limited (1 pt) → Caution. Do not invent Clean.',
    zinc: true,
    retailers: BRAND_AMZ,
  }),
  cautionCustom({
    id: 'megafood-nad-boost',
    barcode: '051494105979',
    productName: 'NAD+ Boost',
    category: VITAMINS,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Nicotinamide riboside', strength: '400mg' },
      { name: 'Trans-resveratrol', strength: 'label serving' },
    ],
    cite: CITE.nad,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.nad, METH.sio2)),
      labelCleared(CITE.nad, 'Microcrystalline cellulose'),
      labelCleared(CITE.nad, 'Hypromellose'),
      labelCleared(CITE.nad, 'Stearic acid'),
    ],
    math: 'Driver is silicon dioxide (0-pt Caution cap).',
    retailers: BRAND_AMZ,
  }),
  cautionCustom({
    id: 'megafood-liposomal-glutathione',
    barcode: '051494106044',
    productName: 'High Absorption Liposomal Glutathione',
    category: IMMUNE,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [{ name: 'Glutathione (liposomal)', strength: 'label serving' }],
    cite: CITE.glutathione,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.glutathione, METH.sio2)),
      flag('Gum arabic', 'cleared', labelCite(CITE.glutathione, METH.gums)),
      flag('Sunflower lecithin', 'cleared', labelCite(CITE.glutathione, METH.lecithin)),
      labelCleared(CITE.glutathione, 'Hypromellose'),
      labelCleared(CITE.glutathione, 'Microcrystalline cellulose'),
      labelCleared(CITE.glutathione, 'Stearic acid'),
    ],
    math: 'Driver is silicon dioxide (0-pt Caution cap). Sunflower lecithin is Cleared (v1.6) and is not gummy seed-oil High. Gum arabic is Cleared.',
    extraNote: METH.capsuleOil + '.',
    retailers: BRAND_AMZ,
  }),
  cautionCustom({
    id: 'megafood-high-absorption-coq10',
    barcode: '051494105696',
    productName: 'High Absorption CoQ10',
    category: VITAMINS,
    form: 'capsule',
    productType: VITAMIN,
    actives: [{ name: 'CoQ10 (ubiquinone)', strength: '200mg' }],
    cite: CITE.coq10,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.coq10, METH.sio2)),
      labelCleared(CITE.coq10, 'Hypromellose'),
      labelCleared(CITE.coq10, 'Dicalcium phosphate'),
      labelCleared(CITE.coq10, 'Stearic acid'),
    ],
    math: 'Driver is silicon dioxide (0-pt Caution cap). Rice powder is not in Methodology §5 (ungraded; v1.6 intake) and is not required to reach Caution.',
    extraNote: UNGRADED_NOT_REQUIRED,
    retailers: BRAND_AMZ,
  }),
  cautionCustom({
    id: 'megafood-fast-acting-turmeric',
    barcode: '051494105689',
    productName: 'Fast Acting Turmeric',
    category: VITAMINS,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [{ name: 'Curcuminoids (TamaFlex)', strength: '1000mg' }],
    cite: CITE.fastTurmeric,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.fastTurmeric, METH.sio2)),
      labelCleared(CITE.fastTurmeric, 'Hypromellose'),
      labelCleared(CITE.fastTurmeric, 'Stearic acid'),
      labelCleared(CITE.fastTurmeric, 'Microcrystalline cellulose'),
    ],
    math: 'Driver is silicon dioxide (0-pt Caution cap).',
    retailers: BRAND_AMZ,
  }),
  cautionCustom({
    id: 'megafood-quercetin-bromelain',
    barcode: '051494105627',
    productName: 'Quercetin with Bromelain',
    category: IMMUNE,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Quercetin', strength: '500mg' },
      { name: 'Bromelain', strength: '165mg' },
    ],
    cite: CITE.quercetin,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.quercetin, METH.sio2)),
      labelCleared(CITE.quercetin, 'Hypromellose'),
      labelCleared(CITE.quercetin, 'Microcrystalline cellulose'),
      labelCleared(CITE.quercetin, 'Stearic acid'),
    ],
    math: 'Driver is silicon dioxide (0-pt Caution cap).',
    retailers: BRAND_AMZ,
  }),
  cautionCustom({
    id: 'megafood-shilajit',
    barcode: '051494105986',
    productName: 'Shilajit',
    category: VITAMINS,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [{ name: 'Shilajit extract (PrimaVie)', strength: 'label serving' }],
    cite: CITE.shilajit,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.shilajit, METH.sio2)),
      flag('Maltodextrin', 'limited', labelCite(CITE.shilajit, METH.maltodextrin)),
      labelCleared(CITE.shilajit, 'Hypromellose'),
      labelCleared(CITE.shilajit, 'Microcrystalline cellulose'),
      labelCleared(CITE.shilajit, 'Stearic acid'),
    ],
    math: 'Demerit math: maltodextrin Limited 1 pt + SiO2 0-pt Caution cap → Caution. Dextrin is not in Methodology §5 (ungraded; v1.6 intake) and is not required to reach Caution.',
    extraNote: UNGRADED_NOT_REQUIRED,
    retailers: BRAND_AMZ,
  }),
  cautionCustom({
    id: 'megafood-dual-action-digestive-enzymes',
    barcode: '051494105887',
    productName: 'Dual-Action Digestive Enzymes',
    category: DIGESTIVE,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [{ name: 'Digestive enzyme blend (DigeZyme)', strength: '1 capsule (label serving)' }],
    cite: CITE.enzymes,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.enzymes, METH.sio2)),
      flag('Maltodextrin', 'limited', labelCite(CITE.enzymes, METH.maltodextrin)),
      labelCleared(CITE.enzymes, 'Hypromellose'),
      labelCleared(CITE.enzymes, 'Microcrystalline cellulose'),
      labelCleared(CITE.enzymes, 'Stearic acid'),
    ],
    math: 'Demerit math: maltodextrin Limited 1 pt + SiO2 0-pt Caution cap → Caution.',
    retailers: BRAND_AMZ,
  }),
  cautionCustom({
    id: 'megafood-nac',
    barcode: '051494105993',
    productName: 'NAC (N-Acetyl Cysteine)',
    category: IMMUNE,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [{ name: 'N-acetyl cysteine', strength: '600mg' }],
    cite: CITE.nac,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.nac, METH.sio2)),
      labelCleared(CITE.nac, 'Hypromellose'),
      labelCleared(CITE.nac, 'Stearic acid'),
      labelCleared(CITE.nac, 'Microcrystalline cellulose'),
    ],
    math: 'Driver is silicon dioxide (0-pt Caution cap). Amino-acid capsule — not a protein powder.',
    extraNote: 'Brand-site inventory has been flaky; NHC / Vitacost other-ingredients are the current US cite.',
    retailers: BRAND_AMZ,
  }),
  cautionCustom({
    id: 'megafood-sea-moss-complex',
    barcode: '051494105832',
    productName: 'Sea Moss Complex',
    category: IMMUNE,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [{ name: 'Irish sea moss / bladderwrack / burdock / ashwagandha complex', strength: 'label serving' }],
    cite: CITE.seaMoss,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.seaMoss, METH.sio2)),
      flag('Maltodextrin', 'limited', labelCite(CITE.seaMoss, METH.maltodextrin)),
      labelCleared(CITE.seaMoss, 'Microcrystalline cellulose'),
      labelCleared(CITE.seaMoss, 'Hypromellose'),
      labelCleared(CITE.seaMoss, 'Stearic acid'),
    ],
    math: 'Demerit math: maltodextrin Limited 1 pt + SiO2 0-pt Caution cap → Caution. Marketing “black seed oil” is a 20:1 extract on the panel, not an oil fill.',
    retailers: BRAND_AMZ,
  }),
  cautionSio2({
    id: 'megafood-l-theanine-b-complex',
    barcode: '051494105450',
    productName: 'L-Theanine & B-Complex',
    category: VITAMINS,
    form: 'tablet',
    productType: SUPPLEMENT,
    actives: [
      { name: 'L-theanine', strength: '200mg' },
      { name: 'B-complex vitamins', strength: 'label serving' },
    ],
    cite: CITE.theanine,
  }),
  cautionCustom({
    id: 'megafood-magtein-magnesium-l-threonate',
    barcode: '051494105801',
    productName: 'Magtein Magnesium L-Threonate',
    category: SLEEP,
    form: 'capsule',
    productType: VITAMIN,
    actives: [{ name: 'Magnesium L-threonate (Magtein)', strength: '2000mg Magtein' }],
    cite: CITE.magtein,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.magtein, METH.sio2)),
      labelCleared(CITE.magtein, 'Hypromellose'),
      labelCleared(CITE.magtein, 'Microcrystalline cellulose'),
      labelCleared(CITE.magtein, 'Stearic acid'),
    ],
    math: 'Driver is silicon dioxide (0-pt Caution cap).',
    alts: MAG300_ALTS,
  }),
  cautionCustom({
    id: 'megafood-megaflora-original',
    barcode: '051494102046 051494102053 051494102282',
    productName: 'MegaFlora Probiotic Original',
    category: DIGESTIVE,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [{ name: 'Probiotic blend (14 strains)', strength: '20 billion CFU' }],
    cite: CITE.megaflora,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.megaflora, METH.sio2)),
      labelCleared(CITE.megaflora, 'Hypromellose'),
      labelCleared(CITE.megaflora, 'Microcrystalline cellulose'),
    ],
    math: 'Driver is silicon dioxide (0-pt Caution cap). L-leucine as a capsule flow aid is not in Methodology §5 (ungraded; v1.6 intake) and is not required to reach Caution.',
    extraNote: UNGRADED_NOT_REQUIRED,
  }),
  cautionCustom({
    id: 'megafood-megaflora-plus',
    barcode: '051494102176',
    productName: 'MegaFlora Probiotic Plus',
    category: DIGESTIVE,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [{ name: 'Probiotic blend (14 strains)', strength: '50 billion CFU' }],
    cite: CITE.megafloraPlus,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.megafloraPlus, METH.sio2)),
      labelCleared(CITE.megafloraPlus, 'Hypromellose'),
      labelCleared(CITE.megafloraPlus, 'Microcrystalline cellulose'),
    ],
    math: 'Driver is silicon dioxide (0-pt Caution cap). L-leucine ungraded; not required to reach Caution.',
    extraNote: UNGRADED_NOT_REQUIRED,
  }),
  cautionCustom({
    id: 'megafood-megaflora-womens',
    barcode: '051494100226',
    productName: 'MegaFlora Women\'s Probiotic + Prebiotic',
    category: DIGESTIVE,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [{ name: 'Women\'s probiotic blend (14 strains)', strength: '50 billion CFU' }],
    cite: CITE.megafloraW,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.megafloraW, METH.sio2)),
      flag('Calcium laurate', 'cleared', labelCite(CITE.megafloraW, METH.calciumLaurate)),
      labelCleared(CITE.megafloraW, 'Hypromellose'),
      labelCleared(CITE.megafloraW, 'Microcrystalline cellulose'),
    ],
    math: 'Driver is silicon dioxide (0-pt Caution cap). Calcium laurate is Cleared-by-class with the stearate family (same founder stack as Thorne).',
    extraNote:
      'AllStarHealth marks this SKU discontinued at that retailer; MegaFood.com still lists it. Not the shelf-stable ASTARTE probiotic (separate formulaId; rice / rice extract Caution).',
  }),
  cautionCustom({
    id: 'megafood-megaflora-turmeric',
    barcode: '051494100233 051494100257',
    productName: 'MegaFlora Probiotic + Prebiotic with Turmeric',
    category: DIGESTIVE,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [{ name: 'Probiotic blend with turmeric', strength: 'label serving' }],
    cite: CITE.megafloraT,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.megafloraT, METH.sio2)),
      flag('Calcium laurate', 'cleared', labelCite(CITE.megafloraT, METH.calciumLaurate)),
      labelCleared(CITE.megafloraT, 'Hypromellose'),
      labelCleared(CITE.megafloraT, 'Microcrystalline cellulose'),
    ],
    math: 'Driver is silicon dioxide (0-pt Caution cap). Calcium laurate Cleared-by-class. PureFormulas also lists guar gum on one snapshot — Cleared if present; not a second grade.',
  }),
  cautionCustom({
    id: 'megafood-megaflora-kids',
    barcode: '051494102152',
    productName: 'MegaFlora Kids Probiotic',
    category: DIGESTIVE,
    form: 'capsule',
    audience: KIDS,
    minAge: 5,
    productType: SUPPLEMENT,
    actives: [{ name: 'Kids probiotic blend (14 strains)', strength: '5 billion CFU' }],
    cite: CITE.megafloraKids,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.megafloraKids, METH.sio2)),
      labelCleared(CITE.megafloraKids, 'Hypromellose'),
      labelCleared(CITE.megafloraKids, 'Microcrystalline cellulose'),
    ],
    math: 'Driver is silicon dioxide (0-pt Caution cap). L-leucine ungraded; not required to reach Caution. Brand inventory has been sold-out; NHC / HelloPharmacist other-ingredients are the current US cite.',
    extraNote: UNGRADED_NOT_REQUIRED,
  }),
  cautionCustom({
    id: 'megafood-mushroom-stress-relief',
    barcode: '051494105474',
    productName: 'Superfood Mushroom Stress Relief',
    category: VITAMINS,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [
      { name: 'KSM-66 ashwagandha', strength: '600mg' },
      { name: 'Reishi mushroom', strength: '400mg' },
    ],
    cite: CITE.mushStress,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.mushStress, METH.sio2)),
      labelCleared(CITE.mushStress, 'Hypromellose'),
      labelCleared(CITE.mushStress, 'Microcrystalline cellulose'),
      labelCleared(CITE.mushStress, 'Stearic acid'),
    ],
    math: 'Driver is silicon dioxide (0-pt Caution cap).',
    retailers: BRAND_AMZ,
  }),
  cautionCustom({
    id: 'megafood-mushroom-focus-support',
    barcode: '051494105467',
    productName: 'Superfood Mushroom Focus Support',
    category: VITAMINS,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [
      { name: "Lion's mane mushroom", strength: '700mg' },
      { name: 'Bacopa (Bacognize)', strength: '300mg' },
    ],
    cite: CITE.mushFocus,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.mushFocus, METH.sio2)),
      labelCleared(CITE.mushFocus, 'Hypromellose'),
      labelCleared(CITE.mushFocus, 'Microcrystalline cellulose'),
      labelCleared(CITE.mushFocus, 'Stearic acid'),
    ],
    math: 'Driver is silicon dioxide (0-pt Caution cap).',
    retailers: BRAND_AMZ,
  }),
  cautionCustom({
    id: 'megafood-omega-3-fish-oil',
    barcode: '051494105948',
    productName: 'Omega-3 Fish Oil',
    category: VITAMINS,
    form: 'softgel',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Fish oil', strength: '2000mg' },
      { name: 'EPA + DHA', strength: '1200mg' },
    ],
    cite: CITE.omega3,
    inactives: [
      flag('Organic lemon oil', 'limited', labelCite(CITE.omega3, METH.flavors)),
      flag('Mixed tocopherols', 'cleared', labelCite(CITE.omega3, METH.tocopherols)),
      labelCleared(CITE.omega3, 'Bovine gelatin'),
      labelCleared(CITE.omega3, 'Glycerin'),
      labelCleared(CITE.omega3, 'Purified water'),
    ],
    math: 'Driver is organic lemon oil as natural-flavor Limited (1 pt) → Caution. Gelatin / glycerin / water / mixed tocopherols are Cleared. Softgel fish-oil fill is NOT the gummy seed-oil High rule. Rosemary extract is not in Methodology §5 (ungraded; v1.6 intake) and is not required to reach Caution. Contains fish. Contains bovine gelatin.',
    extraNote: METH.capsuleOil + '. ' + UNGRADED_NOT_REQUIRED,
    alts: OMEGA_ALTS,
  }),
  cautionCustom({
    id: 'megafood-omega-3-6-9',
    barcode: '051494105399',
    productName: 'Omega 3-6-9',
    category: VITAMINS,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [{ name: 'Ahiflower seed oil and algal oil omega blend', strength: 'label serving' }],
    cite: CITE.omega369,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.omega369, METH.sio2)),
      flag('Organic lemon oil', 'limited', labelCite(CITE.omega369, METH.flavors)),
      flag('Mixed tocopherols', 'cleared', labelCite(CITE.omega369, METH.tocopherols)),
      flag('Ascorbyl palmitate', 'cleared', labelCite(CITE.omega369, METH.tocopherols)),
      flag('Sunflower lecithin', 'cleared', labelCite(CITE.omega369, METH.lecithin)),
      flag('Gellan gum', 'cleared', labelCite(CITE.omega369, METH.gums)),
      labelCleared(CITE.omega369, 'Hypromellose'),
    ],
    math: 'Demerit math: lemon oil Limited 1 pt + SiO2 0-pt Caution cap → Caution. Sunflower oil in this delayed-release oil capsule is NOT the gummy seed-oil High rule.',
    extraNote: METH.capsuleOil + '.',
  }),
  cautionCustom({
    id: 'megafood-blood-builder-liquid',
    barcode: '051494103678',
    productName: 'Blood Builder Liquid Iron Once Daily',
    category: VITAMINS,
    form: 'liquid',
    productType: VITAMIN,
    actives: [{ name: 'Iron', strength: 'label serving' }],
    cite: CITE.bbLiquid,
    inactives: [
      flag('Natural flavors', 'limited', labelCite(CITE.bbLiquid, METH.flavors)),
      labelCleared(CITE.bbLiquid, 'Organic glycerin'),
      labelCleared(CITE.bbLiquid, 'Water'),
    ],
    math: 'Driver is natural flavors Limited (1 pt) → Caution. Juice concentrates and citrus peel extract are not in Methodology §5 (ungraded; v1.6 intake) and are not required to reach Caution.',
    extraNote: UNGRADED_NOT_REQUIRED,
    ironCarton: true,
    alts: IRON_ALTS,
  }),
  cautionCustom({
    id: 'megafood-relax-calm-powder-raspberry',
    barcode: '051494601716',
    productName: 'Relax + Calm Magnesium Powder - Raspberry Lemonade',
    category: SLEEP,
    form: 'powder',
    productType: VITAMIN,
    actives: [{ name: 'Magnesium', strength: 'label serving' }],
    cite: CITE.relaxRasp,
    inactives: [
      flag('Natural flavors', 'limited', labelCite(CITE.relaxRasp, METH.flavors)),
      flag('Maltodextrin', 'limited', labelCite(CITE.relaxRasp, METH.maltodextrin)),
      flag('Monk fruit extract', 'cleared', labelCite(CITE.relaxRasp, METH.monkFruit)),
      labelCleared(CITE.relaxRasp, 'Citric acid'),
    ],
    math: 'Demerit math: natural flavors Limited 1 + maltodextrin Limited 1 → 2 pts Caution (not the 3-pt Avoid stack). Monk fruit high-purity extract is Cleared.',
    alts: MAG300_ALTS,
    retailers: BRAND_AMZ,
  }),
  cautionCustom({
    id: 'megafood-relax-calm-powder-blackberry',
    barcode: '051494601709',
    productName: 'Relax + Calm Magnesium Powder - Blackberry Hibiscus Oasis',
    category: SLEEP,
    form: 'powder',
    productType: VITAMIN,
    actives: [{ name: 'Magnesium', strength: 'label serving' }],
    cite: CITE.relaxBb,
    inactives: [
      flag('Natural flavors', 'limited', labelCite(CITE.relaxBb, METH.flavors)),
      flag('Maltodextrin', 'limited', labelCite(CITE.relaxBb, METH.maltodextrin)),
      flag('Monk fruit extract', 'cleared', labelCite(CITE.relaxBb, METH.monkFruit)),
      labelCleared(CITE.relaxBb, 'Citric acid'),
    ],
    math: 'Demerit math: natural flavors Limited 1 + maltodextrin Limited 1 → 2 pts Caution. Separate flavor SKU from Raspberry Lemonade; same inactive grade family.',
    extraNote: 'Flavor names differ on-carton so these two powders keep separate ids; grade is the same.',
    alts: MAG300_ALTS,
  }),
  cautionCustom({
    id: 'megafood-baby-me-2-prenatal-dha-choline',
    barcode: '051494104293',
    productName: 'Baby & Me 2 Prenatal DHA & Choline',
    category: VITAMINS,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [
      { name: 'DHA', strength: '250–400mg as labeled' },
      { name: 'Choline', strength: '200–300mg as labeled' },
    ],
    cite: CITE.dhaCholine,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.dhaCholine, METH.sio2)),
      labelCleared(CITE.dhaCholine, 'Hypromellose'),
      labelCleared(CITE.dhaCholine, 'Microcrystalline cellulose'),
      flag('Mixed tocopherols', 'cleared', labelCite(CITE.dhaCholine, METH.tocopherols)),
    ],
    math: 'Driver is silicon dioxide (0-pt Caution cap) on the current published NHC / PureFormulas / Healthy Place panel. MCT (palm kernel) and sunflower oil are capsule fills — NOT the gummy seed-oil High rule. Mono- and diglycerides / rosemary extract are not in Methodology §5 (ungraded; v1.6 intake) and are not required to reach Caution. A later lemon-oil infusion carton is a different unmatched formula — not this row.',
    extraNote: METH.capsuleOil + '. ' + UNGRADED_NOT_REQUIRED,
    prenatal: true,
    alts: PRENATAL_ALTS,
  }),
  cautionCustom({
    id: 'megafood-baby-me-2-prenatal-probiotic-refrigerated',
    barcode: '051494100271',
    productName: 'Baby & Me 2 Prenatal Probiotic + Prebiotic',
    category: DIGESTIVE,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [{ name: 'Prenatal probiotic / prebiotic blend', strength: 'label serving' }],
    cite: CITE.bm2proOld,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.bm2proOld, METH.sio2)),
      flag('Calcium laurate', 'cleared', labelCite(CITE.bm2proOld, METH.calciumLaurate)),
      flag('Guar gum', 'cleared', labelCite(CITE.bm2proOld, METH.gums)),
      labelCleared(CITE.bm2proOld, 'Hypromellose'),
      labelCleared(CITE.bm2proOld, 'Microcrystalline cellulose'),
    ],
    math: 'Driver is silicon dioxide (0-pt Caution cap) on The Healthy Place refrigerated MegaFlora-style panel. Calcium laurate Cleared-by-class. Not the newer shelf-stable LGG carton (separate formulaId; rice / rice extract + maltodextrin + SiO2).',
    extraNote: PRENATAL_LABEL,
    prenatal: true,
  }),
  cautionCustom({
    id: 'megafood-womens-whole-body-gummies',
    barcode: '051494105719',
    productName: "Women's Whole Body Multi Gummies",
    category: VITAMINS,
    form: 'gummy',
    productType: VITAMIN,
    actives: [
      { name: "Women's multivitamin / multimineral", strength: 'label serving' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    cite: CITE.wbGummyW,
    inactives: [
      ...gummyBaseFlags(CITE.wbGummyW, true),
      flag('Black carrot concentrate (color)', 'cleared', labelCite(CITE.wbGummyW, METH.blackCarrot)),
      labelCleared(CITE.wbGummyW, 'Water'),
    ],
    math: 'Driver is natural flavor Limited (1 pt) → Caution. CONFIRMED no sunflower / canola / palm / vegetable oil on Vitacost / NHC / Healthy Place. Named black carrot concentrate as color is now §5 Cleared. Trisodium citrate is a citrate-salt filler (Cleared-by-class) and is not required to reach Caution. Do not invent a seed-oil Avoid on this formulaId.',
    extraNote: UNGRADED_NOT_REQUIRED + ' ' + NO_CLEAN_GUMMY,
    zinc: true,
  }),
  cautionCustom({
    id: 'megafood-mens-whole-body-gummies',
    barcode: '051494105726',
    productName: "Men's Whole Body Multi Gummies",
    category: VITAMINS,
    form: 'gummy',
    productType: VITAMIN,
    actives: [
      { name: "Men's multivitamin / multimineral", strength: 'label serving' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    cite: CITE.wbGummyM,
    inactives: [
      ...gummyBaseFlags(CITE.wbGummyM, true),
      flag('Black carrot concentrate (color)', 'cleared', labelCite(CITE.wbGummyM, METH.blackCarrot)),
      labelCleared(CITE.wbGummyM, 'Water'),
    ],
    math: 'Driver is natural flavor Limited (1 pt) → Caution. CONFIRMED no seed/industrial oil on NHC / Healthy Place. Named black carrot as color is now §5 Cleared. Trisodium citrate is a citrate-salt filler (Cleared-by-class) and is not required to reach Caution.',
    extraNote: UNGRADED_NOT_REQUIRED + ' ' + NO_CLEAN_GUMMY,
    zinc: true,
  }),
  cautionCustom({
    id: 'megafood-womens-55-whole-body-gummies',
    barcode: '051494105733',
    productName: "Women's 55+ Whole Body Multi Gummies",
    category: VITAMINS,
    form: 'gummy',
    productType: VITAMIN,
    actives: [
      { name: "Women's 55+ multivitamin / multimineral", strength: 'label serving' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    cite: CITE.wbGummyW55,
    inactives: [...gummyBaseFlags(CITE.wbGummyW55, true), labelCleared(CITE.wbGummyW55, 'Water')],
    math: 'Driver is natural flavor Limited (1 pt) → Caution. No seed/industrial oil on NHC / Target.',
    extraNote: UNGRADED_NOT_REQUIRED + ' ' + NO_CLEAN_GUMMY,
    zinc: true,
  }),
  cautionCustom({
    id: 'megafood-mens-55-whole-body-gummies',
    barcode: '051494105740',
    productName: "Men's 55+ Whole Body Multi Gummies",
    category: VITAMINS,
    form: 'gummy',
    productType: VITAMIN,
    actives: [
      { name: "Men's 55+ multivitamin / multimineral", strength: 'label serving' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    cite: CITE.wbGummyM55,
    inactives: [...gummyBaseFlags(CITE.wbGummyM55, true), labelCleared(CITE.wbGummyM55, 'Water')],
    math: 'Driver is natural flavor Limited (1 pt) → Caution. No seed/industrial oil on NHC.',
    extraNote: UNGRADED_NOT_REQUIRED + ' ' + NO_CLEAN_GUMMY,
    zinc: true,
  }),
  cautionCustom({
    id: 'megafood-womens-prebiotic-probiotic-gummies',
    barcode: '051494105931',
    productName: "Women's Prebiotic + Probiotic Gummies",
    category: DIGESTIVE,
    form: 'gummy',
    productType: SUPPLEMENT,
    actives: [{ name: 'Probiotic (B. coagulans) with prebiotic fiber and cranberry', strength: 'label serving' }],
    cite: CITE.womensProGummy,
    inactives: [
      flag('Natural flavor', 'limited', labelCite(CITE.womensProGummy, METH.flavors)),
      flag('Black carrot concentrate (color)', 'cleared', labelCite(CITE.womensProGummy, METH.blackCarrot)),
      flag('Agar', 'cleared', labelCite(CITE.womensProGummy, METH.agar)),
      flag('Pectin', 'cleared', labelCite(CITE.womensProGummy, METH.gums)),
      flag('Tapioca starch', 'cleared', labelCite(CITE.womensProGummy, METH.starches)),
      labelCleared(CITE.womensProGummy, 'Citric acid'),
      labelCleared(CITE.womensProGummy, 'Carnauba wax'),
      labelCleared(CITE.womensProGummy, 'Water'),
    ],
    math: 'Driver is natural flavor Limited (1 pt) → Caution. CONFIRMED no seed/industrial oil. Named black carrot as color is §5 Cleared. Agar is now §5 Cleared (0 pt) and does not change Caution.',
    extraNote: NO_CLEAN_GUMMY,
  }),
  cautionCustom({
    id: 'megafood-prebiotic-fiber-gummies',
    barcode: '051494105870',
    productName: 'Prebiotic Fiber Gummies',
    category: DIGESTIVE,
    form: 'gummy',
    productType: SUPPLEMENT,
    minAge: 4,
    actives: [{ name: 'Prebiotic fiber (chicory root FOS)', strength: '5g' }],
    cite: CITE.prebioticGummy,
    inactives: [
      flag('Natural flavor', 'limited', labelCite(CITE.prebioticGummy, METH.flavors)),
      flag('Paprika extract (color)', 'cleared', labelCite(CITE.prebioticGummy, METH.paprika)),
      flag('Agar', 'cleared', labelCite(CITE.prebioticGummy, METH.agar)),
      flag('Pectin', 'cleared', labelCite(CITE.prebioticGummy, METH.gums)),
      flag('Tapioca starch', 'cleared', labelCite(CITE.prebioticGummy, METH.starches)),
      labelCleared(CITE.prebioticGummy, 'Citric acid'),
      labelCleared(CITE.prebioticGummy, 'Carnauba wax'),
      labelCleared(CITE.prebioticGummy, 'Water'),
    ],
    math: 'Driver is natural flavor Limited (1 pt) → Caution. No seed/industrial oil on Target. Named paprika extract as color is §5 Cleared. Agar is now §5 Cleared (0 pt) and does not change Caution. Labeled for adults, teens, and kids 4+ — adult Digestive aisle row (minAge 4).',
    extraNote: NO_CLEAN_GUMMY,
    retailers: BRAND_AMZ,
  }),
  cautionCustom({
    id: 'megafood-vitamin-d3-k2-5000-gummies',
    barcode: '051494106037',
    productName: 'Vitamin D3+ K2 5000 IU Gummies',
    category: IMMUNE,
    form: 'gummy',
    productType: VITAMIN,
    actives: [
      { name: 'Vitamin D3', strength: '125mcg (5000 IU)' },
      { name: 'Vitamin K2', strength: 'label serving' },
    ],
    cite: CITE.d3k2gummy,
    inactives: [
      flag('Natural flavors', 'limited', labelCite(CITE.d3k2gummy, METH.flavors)),
      labelCleared(CITE.d3k2gummy, 'Organic cane sugar'),
      labelCleared(CITE.d3k2gummy, 'Organic tapioca syrup'),
      labelCleared(CITE.d3k2gummy, 'Water'),
      flag('Pectin', 'cleared', labelCite(CITE.d3k2gummy, METH.gums)),
      labelCleared(CITE.d3k2gummy, 'Citric acid'),
      flag('Organic tapioca starch', 'cleared', labelCite(CITE.d3k2gummy, METH.starches)),
    ],
    math: 'Driver is natural flavors Limited (1 pt) → Caution. CONFIRMED no sunflower / palm / vegetable oil on Target. Vegetable juice color / sodium citrate ungraded; not required to reach Caution.',
    extraNote: UNGRADED_NOT_REQUIRED + ' ' + NO_CLEAN_GUMMY,
    retailers: BRAND_AMZ,
  }),
  cautionCustom({
    id: 'megafood-magnesium-citrate-gummies',
    barcode: '051494105917',
    productName: 'High Absorption Magnesium Citrate Gummies',
    category: VITAMINS,
    form: 'gummy',
    productType: VITAMIN,
    minAge: 4,
    actives: [{ name: 'Magnesium (citrate)', strength: 'label serving' }],
    cite: CITE.magCitGummy,
    inactives: [
      flag('Natural flavor', 'limited', labelCite(CITE.magCitGummy, METH.flavors)),
      flag('Black carrot concentrate (color)', 'cleared', labelCite(CITE.magCitGummy, METH.blackCarrot)),
      flag('Agar', 'cleared', labelCite(CITE.magCitGummy, METH.agar)),
      flag('Pectin', 'cleared', labelCite(CITE.magCitGummy, METH.gums)),
      flag('Tapioca starch', 'cleared', labelCite(CITE.magCitGummy, METH.starches)),
      labelCleared(CITE.magCitGummy, 'Citric acid'),
      labelCleared(CITE.magCitGummy, 'Carnauba wax'),
      labelCleared(CITE.magCitGummy, 'Water'),
    ],
    math: 'Driver is natural flavor Limited (1 pt) → Caution. CONFIRMED no seed/industrial oil on US Target / NHC. Named black carrot as color is §5 Cleared. Agar is now §5 Cleared (0 pt) and does not change Caution. UAE sugared listing is a different formula — not this row.',
    extraNote: NO_CLEAN_GUMMY,
    alts: MAG300_ALTS,
  }),
  avoidOil({
    id: 'megafood-iron-energy-gummies',
    barcode: '051494104583',
    productName: 'Iron Energy Gummies',
    category: VITAMINS,
    form: 'gummy',
    productType: VITAMIN,
    minAge: 4,
    actives: [
      { name: 'Iron', strength: '4mg' },
      { name: 'B vitamins', strength: 'label serving' },
    ],
    cite: CITE.ironGummy,
    oilName: 'Sunflower oil',
    extraInactives: [
      flag('Natural flavor', 'limited', labelCite(CITE.ironGummy, METH.flavors)),
      ...gummyBaseFlags(CITE.ironGummy, false),
    ],
    ironCarton: true,
    extraNote: 'Labeled for kids 4+ and adults — adult Vitamins aisle with minAge 4.',
  }),
  avoidOil({
    id: 'megafood-b12-energy-gummies-cranberry',
    barcode: '051494104095 051494104323',
    productName: 'B12 Energy Gummies (Cranberry)',
    category: VITAMINS,
    form: 'gummy',
    productType: VITAMIN,
    actives: [{ name: 'Vitamin B12 (methylcobalamin)', strength: 'label serving' }],
    cite: CITE.b12cran,
    oilName: 'Organic sunflower oil',
    extraInactives: gummyBaseFlags(CITE.b12cran, false),
  }),
  avoidOil({
    id: 'megafood-b12-energy-gummies-ginger',
    barcode: '051494103463 051494104101',
    productName: 'B12 Energy Gummies (Ginger)',
    category: VITAMINS,
    form: 'gummy',
    productType: VITAMIN,
    actives: [{ name: 'Vitamin B12 (methylcobalamin)', strength: 'label serving' }],
    cite: CITE.b12ginger,
    oilName: 'Organic sunflower oil',
    extraInactives: gummyBaseFlags(CITE.b12ginger, false),
    extraNote: 'Separate flavor SKU from cranberry; same sunflower-oil Avoid family but own formulaId because beet-root color listing differs on-carton.',
  }),
  avoidOil({
    id: 'megafood-c-defense-gummies',
    barcode: '051494103494 051494104118',
    productName: 'C Defense Daily Immune Support Gummies',
    category: IMMUNE,
    form: 'gummy',
    productType: VITAMIN,
    minAge: 4,
    actives: [{ name: 'Vitamin C', strength: '180mg' }],
    cite: CITE.cDefense,
    oilName: 'Organic sunflower oil',
    extraInactives: gummyBaseFlags(CITE.cDefense, false),
    extraNote: 'Some US copy says “flavor with other natural flavors”; the matched IngredientList / Target other-ingredients panel has no flavor line. Avoid is the sunflower oil either way.',
  }),
  avoidOil({
    id: 'megafood-melatonin-sleep-gummies',
    barcode: '051494104156',
    productName: 'Melatonin Sleep Gummies, 3mg',
    category: SLEEP,
    form: 'gummy',
    productType: SUPPLEMENT,
    actives: [{ name: 'Melatonin', strength: '3mg' }],
    cite: CITE.melatoninGummy,
    oilName: 'Organic sunflower oil',
    extraInactives: gummyBaseFlags(CITE.melatoninGummy, false),
    alts: MELATONIN_ALTS,
  }),
  avoidOil({
    id: 'megafood-baby-me-2-prenatal-gummies',
    barcode: '051494104378',
    productName: 'Baby & Me 2 Prenatal Multi Gummies',
    category: VITAMINS,
    form: 'gummy',
    productType: VITAMIN,
    actives: [{ name: 'Prenatal multivitamin', strength: 'label serving' }],
    cite: CITE.bm2gummy,
    oilName: 'Organic sunflower oil',
    extraInactives: gummyBaseFlags(CITE.bm2gummy, true),
    prenatal: true,
    extraNote: NO_CLEAN_GUMMY,
  }),
  avoidOil({
    id: 'megafood-kids-multi-gummies',
    barcode: '051494104361',
    productName: 'Kids Multi Gummies',
    category: VITAMINS,
    form: 'gummy',
    audience: KIDS,
    minAge: 4,
    productType: VITAMIN,
    actives: [
      { name: 'Kids multivitamin', strength: '2 gummies (label serving)' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    cite: CITE.kidsGummy,
    oilName: 'Organic sunflower oil',
    extraInactives: gummyBaseFlags(CITE.kidsGummy, true),
    zinc: true,
    extraNote: 'megafood.com is Sold out — not treated as discontinued; Target / Vitacost / Amazon still list a current US panel.',
    retailers: ['MegaFood.com', 'Amazon'],
  }),
  avoidOil({
    id: 'megafood-elderberry-immune-gummies',
    barcode: '051494104149',
    productName: 'Elderberry Immune Support Gummies',
    category: IMMUNE,
    form: 'gummy',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Elderberry', strength: 'label serving' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    cite: CITE.elderGummy,
    oilName: 'Organic sunflower oil',
    extraInactives: [
      ...gummyBaseFlags(CITE.elderGummy, false),
      flag('Organic maltodextrin', 'limited', labelCite(CITE.elderGummy, METH.maltodextrin)),
    ],
    zinc: true,
    extraNote: 'megafood.com is Sold out — not treated as discontinued; Vitacost / Amazon / Thrive / Sprouts still list a current US panel. Organic maltodextrin is still Limited in this draft (no organic-maltodextrin exception is locked).',
    retailers: ['MegaFood.com', 'Thrive', 'Sprouts', 'Amazon'],
  }),
  avoidOil({
    id: 'megafood-d3-2000-gummies',
    barcode: '051494104125',
    productName: 'D3 2000 IU Gummies (50 mcg)',
    category: IMMUNE,
    form: 'gummy',
    productType: VITAMIN,
    actives: [{ name: 'Vitamin D3 (cholecalciferol)', strength: '50mcg (2000 IU) per 2-gummy serving' }],
    cite: CITE.d3gummy,
    oilName: 'Organic sunflower oil',
    extraInactives: gummyBaseFlags(CITE.d3gummy, false),
    extraNote: 'megafood.com is Sold out — not treated as discontinued; Vitacost / Amazon still list a current US panel. Handle on-site is d3-1000-iu-gummies; labeled strength is 2000 IU per serving.',
    retailers: ['MegaFood.com', 'Amazon'],
  }),
  avoidOil({
    id: 'megafood-relax-calm-soft-chews-grape',
    barcode: '051494103999',
    productName: 'Relax + Calm Magnesium Soft Chews - Grape',
    category: SLEEP,
    form: 'soft chew',
    productType: VITAMIN,
    actives: [{ name: 'Magnesium (malate and citrate)', strength: '250mg per 2 chews' }],
    cite: CITE.relaxGrape,
    oilName: 'Palm oil',
    extraInactives: [
      flag('Natural flavors', 'limited', labelCite(CITE.relaxGrape, METH.flavors)),
      flag('Sunflower lecithin', 'cleared', labelCite(CITE.relaxGrape, METH.lecithin)),
      labelCleared(CITE.relaxGrape, 'Organic cane sugar'),
      labelCleared(CITE.relaxGrape, 'Organic rice syrup'),
      labelCleared(CITE.relaxGrape, 'Glycerin'),
      labelCleared(CITE.relaxGrape, 'Citric acid'),
    ],
    extraNote: 'Sustainably sourced palm oil is still palm — gummy/chew seed-industrial High. Sunflower lecithin is Cleared and is not bulk sunflower oil.',
  }),
  avoidOil({
    id: 'megafood-relax-calm-soft-chews-strawberry',
    barcode: '051494105436',
    productName: 'Relax + Calm Magnesium Soft Chews - Strawberry',
    category: SLEEP,
    form: 'soft chew',
    productType: VITAMIN,
    actives: [{ name: 'Magnesium (malate and citrate)', strength: '250mg per 2 chews' }],
    cite: CITE.relaxStraw,
    oilName: 'Palm oil',
    extraInactives: [
      flag('Natural flavors', 'limited', labelCite(CITE.relaxStraw, METH.flavors)),
      flag('Sunflower lecithin', 'cleared', labelCite(CITE.relaxStraw, METH.lecithin)),
      labelCleared(CITE.relaxStraw, 'Organic cane sugar'),
      labelCleared(CITE.relaxStraw, 'Organic rice syrup'),
      labelCleared(CITE.relaxStraw, 'Glycerin'),
      labelCleared(CITE.relaxStraw, 'Citric acid'),
    ],
    extraNote: 'Separate flavor SKU from grape; same palm-oil Avoid family.',
  }),
  avoidOil({
    id: 'megafood-kids-one-daily-soft-chews',
    barcode: '051494103746',
    productName: 'Kids One Daily Multivitamin Soft Chews',
    category: VITAMINS,
    form: 'soft chew',
    audience: KIDS,
    minAge: 4,
    productType: VITAMIN,
    actives: [
      { name: 'Kids multivitamin', strength: '1 soft chew (label serving)' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    cite: CITE.kidsChew,
    oilName: 'Palm oil',
    extraInactives: [
      flag('Natural flavors', 'limited', labelCite(CITE.kidsChew, METH.flavors)),
      flag('Sunflower lecithin', 'cleared', labelCite(CITE.kidsChew, METH.lecithin)),
      labelCleared(CITE.kidsChew, 'Organic raw cane sugar'),
      labelCleared(CITE.kidsChew, 'Organic rice syrup'),
      labelCleared(CITE.kidsChew, 'Glycerin'),
      labelCleared(CITE.kidsChew, 'Citric acid'),
    ],
    zinc: true,
  }),
  avoidOil({
    id: 'megafood-womens-one-daily-soft-chews',
    barcode: '051494103722',
    productName: "Women's One Daily Multivitamin Soft Chews - Mixed Berry",
    category: VITAMINS,
    form: 'soft chew',
    productType: VITAMIN,
    actives: [
      { name: "Women's multivitamin", strength: '1 soft chew (label serving)' },
      { name: 'Iron', strength: 'label serving' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    cite: CITE.womensChew,
    oilName: 'Palm oil',
    extraInactives: [
      flag('Natural flavors', 'limited', labelCite(CITE.womensChew, METH.flavors)),
      flag('Sunflower lecithin', 'cleared', labelCite(CITE.womensChew, METH.lecithin)),
      labelCleared(CITE.womensChew, 'Organic raw cane sugar'),
      labelCleared(CITE.womensChew, 'Organic rice syrup'),
      labelCleared(CITE.womensChew, 'Glycerin'),
      labelCleared(CITE.womensChew, 'Citric acid'),
    ],
    zinc: true,
    ironCarton: true,
    extraNote: 'Healthy Place omits rosemary leaf extract; MegaFood.com indexed panels include it. Palm oil is on both — Avoid either way.',
  }),
  avoidOil({
    id: 'megafood-baby-me-2-nausea-soft-chews',
    barcode: '051494103975',
    productName: 'Baby & Me 2 Prenatal Morning Sickness Nausea Relief Soft Chews',
    category: VITAMINS,
    form: 'soft chew',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Vitamin B6', strength: 'label serving' },
      { name: 'Ginger', strength: 'label serving' },
    ],
    cite: CITE.nauseaChew,
    oilName: 'Palm oil',
    extraInactives: [
      flag('Natural flavors', 'limited', labelCite(CITE.nauseaChew, METH.flavors)),
      flag('Sunflower lecithin', 'cleared', labelCite(CITE.nauseaChew, METH.lecithin)),
      labelCleared(CITE.nauseaChew, 'Organic cane sugar'),
      labelCleared(CITE.nauseaChew, 'Organic rice syrup'),
      labelCleared(CITE.nauseaChew, 'Glycerin'),
      flag('Organic tapioca starch', 'cleared', labelCite(CITE.nauseaChew, METH.starches)),
    ],
    prenatal: true,
    extraNote: 'Carton is labeled for morning-sickness / pregnancy use. No dosing or medical advice in this draft. ' + NO_CLEAN_GUMMY,
  }),

  // ── Closeout leftovers (founder cartons + locks) ────────
  cautionCustom({
    id: 'megafood-womens-whole-body-tablets',
    productName: "Women's Whole Body Tablets",
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [
      { name: "Women's multivitamin / multimineral", strength: '1 tablet (label serving)' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    cite: CITE.womensWBTab,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.womensWBTab, METH.sio2)),
      flag('Maltodextrin', 'limited', labelCite(CITE.womensWBTab, METH.maltodextrin)),
      labelCleared(CITE.womensWBTab, 'Microcrystalline cellulose'),
      labelCleared(CITE.womensWBTab, 'Citric acid'),
      labelCleared(CITE.womensWBTab, 'Croscarmellose sodium'),
      labelCleared(CITE.womensWBTab, 'Stearic acid'),
      labelCleared(CITE.womensWBTab, 'Dicalcium phosphate'),
      labelCleared(CITE.womensWBTab, 'Hypromellose'),
    ],
    math: 'Demerit math: maltodextrin Limited 1 pt + SiO2 0-pt Caution cap → Caution (not Clean; not Avoid).',
    extraNote:
      'Vitamin E “from sunflower seed oil” is the active carrier — NOT the gummy seed-oil High / Avoid rule. Separate formulaId from Women\'s Whole Body Multi Capsules and from Women\'s Whole Body Multi Gummies. Do not reuse those formulaIds.',
    zinc: true,
  }),
  cautionCustom({
    id: 'megafood-baby-me-2-prenatal-multi-dha',
    barcode: '051494106143',
    productName: 'Baby & Me 2 Prenatal Multi & DHA',
    category: VITAMINS,
    form: 'capsule',
    productType: VITAMIN,
    actives: [
      { name: 'Prenatal multivitamin / multimineral', strength: 'label serving' },
      { name: 'DHA (from fish oil powder)', strength: 'label serving' },
      { name: 'Iron', strength: 'label serving' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    cite: CITE.bm2multiDha,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.bm2multiDha, METH.sio2)),
      labelCleared(CITE.bm2multiDha, 'Hypromellose'),
      labelCleared(CITE.bm2multiDha, 'Microcrystalline cellulose'),
      labelCleared(CITE.bm2multiDha, 'Stearic acid'),
    ],
    math: 'Driver is silicon dioxide (0-pt Caution cap only). MCC / hypromellose / stearic acid are Cleared. Do not invent Clean on the SiO2 cap.',
    extraNote:
      'Contains fish (anchovies & sardines) — honest note only; not an inactive-grade driver. DHA from fish oil powder is the active — capsule fill is not the gummy seed-oil High rule. Separate formulaId from Baby & Me 2 Prenatal Multi tablets, Minis, Gummies, and DHA & Choline.',
    zinc: true,
    prenatal: true,
    ironCarton: true,
    alts: PRENATAL_ALTS,
  }),
  cautionSio2({
    id: 'megafood-high-absorption-selenium-capsules',
    productName: 'High-Absorption Selenium Capsules',
    category: IMMUNE,
    form: 'capsule',
    productType: VITAMIN,
    actives: [{ name: 'Selenium (L-selenomethionine)', strength: '200mcg' }],
    cite: CITE.seleniumCap,
    extraNote:
      'Founder lock: brand-site other-ingredients are MCC / ferment media / stearic acid / SiO2 / hypromellose → Caution. Separate formulaId from the classic FoodState Selenium tablet.',
  }),
  cautionSio2({
    id: 'megafood-methyl-b12',
    barcode: '051494103333',
    productName: 'Methyl B12',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [{ name: 'Vitamin B12 (methylcobalamin) with B vitamins as labeled', strength: 'label serving' }],
    cite: CITE.methylB12Tab,
    extraNote:
      'Founder lock: classic tablet other-ingredients are MCC / stearic acid / SiO2 / rice protein / hypromellose / yeast extract → Caution. Separate formulaId from Extra Strength Methyl B12 capsules (rice flour / HPMC / SiO2). Do not copy that capsule row.',
  }),
  cautionCustom({
    id: 'megafood-vitamin-d3-5000-k-k2',
    barcode: '051494104385 051494104415',
    productName: 'Vitamin D3 5000 IU (125 mcg) plus K & K2',
    category: IMMUNE,
    form: 'capsule',
    productType: VITAMIN,
    actives: [
      { name: 'Vitamin D3 (cholecalciferol)', strength: '125mcg (5000 IU)' },
      { name: 'Vitamin K (phytonadione)', strength: '120mcg' },
      { name: 'Vitamin K2 (menaquinone-7)', strength: '80mcg' },
    ],
    cite: CITE.d3_5000,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.d3_5000, METH.sio2)),
      flag('Maltodextrin', 'limited', labelCite(CITE.d3_5000, METH.maltodextrin)),
      labelCleared(CITE.d3_5000, 'Hypromellose'),
      labelCleared(CITE.d3_5000, 'Dicalcium phosphate'),
    ],
    math: 'Demerit math: maltodextrin Limited 1 pt + SiO2 0-pt Caution cap → Caution. HPMC / dicalcium phosphate are Cleared. Founder lock: maltodextrin + SiO2 + HPMC ± dicalcium phosphate.',
    extraNote:
      'US NHC panel lists dicalcium phosphate. EU Greatlife copy omits it and still has maltodextrin + HPMC + SiO2 — same Caution family. Separate formulaId from D3 1000/2000 tablets and from D3+K2 5000 IU gummies.',
    retailers: BRAND_AMZ,
  }),
  cautionCustom({
    id: 'megafood-probiotic-prebiotic-postbiotic-gummies',
    barcode: '051494106273',
    productName: 'Probiotic, Prebiotic & Postbiotic Gummies',
    category: DIGESTIVE,
    form: 'gummy',
    productType: SUPPLEMENT,
    actives: [{ name: 'Probiotic / prebiotic / postbiotic blend', strength: 'label serving' }],
    cite: CITE.pppGummy,
    inactives: [
      flag('Natural flavor', 'limited', labelCite(CITE.pppGummy, METH.flavors)),
      flag('Medium chain triglycerides (source unlabeled)', 'limited', labelCite(CITE.pppGummy, METH.mctUnlabeled)),
      flag('Black carrot juice concentrate (color)', 'cleared', labelCite(CITE.pppGummy, METH.blackCarrot)),
      flag('Sunflower lecithin', 'cleared', labelCite(CITE.pppGummy, METH.lecithin)),
      flag('Pectin', 'cleared', labelCite(CITE.pppGummy, METH.gums)),
      labelCleared(CITE.pppGummy, 'Tapioca syrup'),
      labelCleared(CITE.pppGummy, 'Cane sugar'),
      labelCleared(CITE.pppGummy, 'Water'),
      labelCleared(CITE.pppGummy, 'Citric acid'),
    ],
    math: 'Drivers are natural flavor Limited (1 pt) + unlabeled MCT Caution opacity → Caution, not Avoid. Coconut-only MCT is not gummy seed-oil High; this carton does not name coconut or palm. Named black carrot juice concentrate as color is now §5 Cleared. Sunflower lecithin is Cleared and is not bulk sunflower oil.',
    extraNote: NO_CLEAN_GUMMY,
  }),
  cautionCustom({
    id: 'megafood-ashwagandha-gummies',
    barcode: '051494106099',
    productName: 'Ashwagandha Gummies',
    category: VITAMINS,
    form: 'gummy',
    productType: SUPPLEMENT,
    actives: [{ name: 'Ashwagandha (KSM-66)', strength: 'label serving' }],
    cite: CITE.ashwGummy,
    inactives: [
      flag('Natural flavor', 'limited', labelCite(CITE.ashwGummy, METH.flavors)),
      flag('Sodium copper chlorophyllin (color)', 'cleared', labelCite(CITE.ashwGummy, METH.chlorophyllin)),
      flag('Black carrot concentrate (color)', 'cleared', labelCite(CITE.ashwGummy, METH.blackCarrot)),
      flag('Agar-agar', 'cleared', labelCite(CITE.ashwGummy, METH.agar)),
      flag('Pectin', 'cleared', labelCite(CITE.ashwGummy, METH.gums)),
      flag('Tapioca starch', 'cleared', labelCite(CITE.ashwGummy, METH.starches)),
      labelCleared(CITE.ashwGummy, 'Citric acid'),
      labelCleared(CITE.ashwGummy, 'Carnauba wax'),
      labelCleared(CITE.ashwGummy, 'Water'),
    ],
    math: 'Drivers are natural flavor Limited (1 pt) + sodium copper chlorophyllin standalone Caution (not Avoid; founder lock) → Caution. Named black carrot as color is §5 Cleared. Agar-agar is now §5 Cleared (0 pt) and does not change Caution. CONFIRMED no sunflower / palm / vegetable oil on Target / NHC / Better Health.',
    extraNote:
      'Separate formulaId from Ashwagandha Complex mini tablets. ' + NO_CLEAN_GUMMY,
  }),
  {
    id: 'megafood-berberine-phytosome',
    barcode: '051494105634',
    productName: 'Berberine Phytosome',
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'megafood-berberine-phytosome',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    activeIngredients: [{ name: 'Berberine phytosome (Berbevis)', strength: 'label serving' }],
    inactiveIngredients: [
      flag('Pea protein isolate', 'cleared', labelCite(CITE.berberine, METH.peaProtein)),
      flag('Grape seed extract', 'cleared', labelCite(CITE.berberine, METH.grapeSeed)),
      labelCleared(CITE.berberine, 'Hypromellose'),
      labelCleared(CITE.berberine, 'Microcrystalline cellulose'),
      labelCleared(CITE.berberine, 'Stearic acid'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER-STYLE DRAFT: Berberine Phytosome = Clean. Pea protein isolate is §5 Cleared. Grape seed extract as inactive is now §5 Cleared (named plant-part food botanical; not grape seed oil). HPMC / MCC / stearic acid are Cleared. Demerit math: 0 pts. Target label PDF (pea protein / sunflower lecithin / grape seed / vegetable cellulose / organic rice flour / magnesium stearate) is a different unmatched formula — not this row. No DailyMed drug SPL (dietary supplement). Pack sizes share formulaId. No dosing or medical advice in this draft.',
    retailers: [...US_WIDE],
    sourcesGeneral: [`${CITE.berberine} — draft, not verified; no DailyMed drug SPL`],
  },
  cautionCustom({
    id: 'megafood-womens-probiotic-astarte-shelf-stable',
    barcode: '051494105337',
    productName: "Women's Probiotic + Prebiotic - Shelf Stable",
    category: DIGESTIVE,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [{ name: 'ASTARTE probiotic blend with prebiotic', strength: 'label serving' }],
    cite: CITE.astarte,
    inactives: [
      flag('Rice extract', 'limited', `${CITE.astarte}; ${METH.riceExtract}. ${RICE_EXTRACT_TAP}`),
      flag('Rice (unspecified)', 'limited', `${CITE.astarte}; ${METH.riceUnspecified}. ${RICE_UNSPECIFIED_TAP}`),
      flag('Sunflower oil', 'cleared', `${CITE.astarte}; ${METH.capsuleOil}. ${CAPSULE_OIL_TAP}`),
      flag('Gum arabic', 'cleared', labelCite(CITE.astarte, METH.gums)),
      labelCleared(CITE.astarte, 'Microcrystalline cellulose'),
      labelCleared(CITE.astarte, 'Hypromellose'),
    ],
    math: 'Demerit math: unspecified rice extract Limited/Caution opacity 1 pt + unspecified rice Limited/Caution opacity 1 pt → Caution (2 pts, not Avoid). Do not invent Clean — neither string names hull, bran, flour, protein, concentrate, or syrup. Sunflower oil is a capsule fill — not the gummy seed-oil High rule.',
    extraNote: 'Separate formulaId from MegaFlora Women\'s (SiO2 / calcium laurate).',
  }),
  cautionCustom({
    id: 'megafood-baby-me-2-prenatal-probiotic-lgg',
    barcode: '051494105351',
    productName: 'Baby & Me 2 Prenatal Probiotic + Prebiotic - Shelf Stable LGG',
    category: DIGESTIVE,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Prenatal probiotic (LGG) / prebiotic blend', strength: 'label serving' },
      { name: 'Vitamin B6', strength: '30mg' },
    ],
    cite: CITE.bm2proLgg,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.bm2proLgg, METH.sio2)),
      flag('Maltodextrin', 'limited', labelCite(CITE.bm2proLgg, METH.maltodextrin)),
      flag('Rice extract', 'limited', `${CITE.bm2proLgg}; ${METH.riceExtract}. ${RICE_EXTRACT_TAP}`),
      flag('Rice (unspecified)', 'limited', `${CITE.bm2proLgg}; ${METH.riceUnspecified}. ${RICE_UNSPECIFIED_TAP}`),
      flag('Sunflower oil', 'cleared', `${CITE.bm2proLgg}; ${METH.capsuleOil}. ${CAPSULE_OIL_TAP}`),
      flag('Gum arabic', 'cleared', labelCite(CITE.bm2proLgg, METH.gums)),
      labelCleared(CITE.bm2proLgg, 'Microcrystalline cellulose'),
      labelCleared(CITE.bm2proLgg, 'Hypromellose'),
    ],
    math: 'Demerit math: maltodextrin Limited 1 pt + unspecified rice extract Limited opacity 1 pt + unspecified rice Limited opacity 1 pt + SiO2 0-pt cap → Caution (Limited-only; SiO2 does not push Avoid). Avoid requires High. Sunflower oil is a capsule fill — not the gummy seed-oil High rule.',
    extraNote:
      'Separate formulaId from the refrigerated MegaFlora-style Baby & Me 2 Prenatal Probiotic + Prebiotic row.',
    prenatal: true,
    alts: PRENATAL_ALTS,
  }),
  {
    id: 'megafood-liposomal-vitamin-c',
    barcode: '051494105863',
    productName: 'Liposomal Vitamin C',
    brand: BRAND,
    category: IMMUNE,
    formulaId: 'megafood-liposomal-vitamin-c',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    recordStatus: UNVERIFIED,
    productType: VITAMIN,
    activeIngredients: [{ name: 'Vitamin C (liposomal ascorbic acid)', strength: '1000mg' }],
    inactiveIngredients: [
      flag('Paprika extract (color)', 'cleared', labelCite(CITE.lipoC, METH.paprika)),
      flag('Medium chain triglycerides (from coconut)', 'cleared', `${CITE.lipoC}; ${METH.mctCoconut}. ${CAPSULE_OIL_TAP}`),
      flag('Sunflower lecithin', 'cleared', labelCite(CITE.lipoC, METH.lecithin)),
      flag('Beeswax', 'cleared', labelCite(CITE.lipoC, METH.beeswax)),
      labelCleared(CITE.lipoC, 'Hypromellose'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER-STYLE DRAFT: Liposomal Vitamin C = Clean. Named paprika extract as color is now §5 Cleared (same posture as turmeric-as-color) — that was the leftover Caution driver. Coconut-only MCT and sunflower lecithin are capsule fill / Cleared, not the gummy seed-oil High rule. Beeswax and hypromellose are Cleared. Demerit math: 0 pts. No DailyMed drug SPL (dietary supplement). Pack sizes share formulaId. No dosing or medical advice in this draft.',
    retailers: [...US_WIDE],
    sourcesGeneral: [`${CITE.lipoC} — draft, not verified; no DailyMed drug SPL`],
  },
  cautionCustom({
    id: 'megafood-daily-turmeric-nutrient-booster-powder',
    barcode: '051494601389',
    productName: 'Daily Turmeric Nutrient Booster Powder',
    category: VITAMINS,
    form: 'powder',
    productType: SUPPLEMENT,
    actives: [{ name: 'Turmeric / curcuminoid nutrient booster blend', strength: 'label serving' }],
    cite: CITE.turmericPowder,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.turmericPowder, METH.sio2)),
      labelCleared(CITE.turmericPowder, 'Rice protein'),
    ],
    math: 'Driver is silicon dioxide (0-pt Caution cap) on the current NHC panel (SiO2 / rice protein). Rice protein is food-state media, not vague rice extract and not the rice-hull Clean lock.',
    extraNote:
      'Supplement-aisle powder — in scope (founder lock). Protein-aisle tubs stay out. Older HelloPharmacist snapshots also list maltodextrin (still Caution). Confirm the carton. Separate formulaId from Turmeric Curcumin Whole Body tablets and Fast Acting Turmeric capsules.',
  }),
  cautionCustom({
    id: 'megafood-creatine-monohydrate-gummies',
    productName: 'Creatine Monohydrate Gummies',
    category: VITAMINS,
    form: 'gummy',
    productType: SUPPLEMENT,
    actives: [{ name: 'Creatine monohydrate', strength: 'label serving' }],
    cite: CITE.creatineGummy,
    inactives: [
      flag('Natural flavor', 'limited', labelCite(CITE.creatineGummy, METH.flavors)),
      labelCleared(CITE.creatineGummy, 'Glucose syrup'),
      labelCleared(CITE.creatineGummy, 'Sugar'),
      labelCleared(CITE.creatineGummy, 'Water'),
      flag('Pectin', 'cleared', labelCite(CITE.creatineGummy, METH.gums)),
      flag('Black carrot concentrate (color)', 'cleared', labelCite(CITE.creatineGummy, METH.blackCarrot)),
      labelCleared(CITE.creatineGummy, 'Citric acid'),
      labelCleared(CITE.creatineGummy, 'Carnauba wax'),
    ],
    math: 'Demerit math: natural flavor Limited 1 pt. Named black carrot concentrate as color is now §5 Cleared. Rest of the scored panel is Cleared-class (glucose syrup / sugar / water / pectin / citric acid / carnauba wax) → Caution. CONFIRMED no sunflower / canola / palm / vegetable oil on the founder photo. Do not invent a seed-oil Avoid on this formulaId.',
    extraNote: UNGRADED_NOT_REQUIRED + ' ' + NO_CLEAN_GUMMY,
  }),
  cautionCustom({
    id: 'megafood-turmeric-whole-body-minis',
    productName: 'Turmeric Curcumin Whole Body Minis',
    category: IMMUNE,
    form: 'mini tablet',
    productType: SUPPLEMENT,
    actives: [{ name: 'Curcuminoids', strength: 'label serving' }],
    cite: CITE.turmericMinis,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.turmericMinis, METH.sio2)),
      labelCleared(CITE.turmericMinis, 'Microcrystalline cellulose'),
      labelCleared(CITE.turmericMinis, 'Stearic acid'),
      labelCleared(CITE.turmericMinis, 'Rice protein'),
      labelCleared(CITE.turmericMinis, 'Hypromellose'),
    ],
    math: 'Driver is silicon dioxide (0-pt Caution cap only). MCC / stearic acid / hypromellose / rice protein are Cleared-class and do not raise the grade. Do not invent Clean on the SiO2 cap.',
    extraNote:
      FERMENT_NOTE +
      ' Separate formulaId from Turmeric Curcumin Whole Body tablets (maltodextrin + SiO2), Fast Acting Turmeric capsules, Extra Strength Joint, Extra Strength Liver, and Daily Turmeric Nutrient Booster Powder.',
  }),
  cautionCustom({
    id: 'megafood-turmeric-extra-strength-joint',
    barcode: '051494103104',
    productName: 'Turmeric Curcumin Extra Strength Joint',
    category: IMMUNE,
    form: 'tablet',
    productType: SUPPLEMENT,
    actives: [{ name: 'Turmeric / curcuminoids joint-support blend', strength: 'label serving' }],
    cite: CITE.turmericJoint,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.turmericJoint, METH.sio2)),
      labelCleared(CITE.turmericJoint, 'Microcrystalline cellulose'),
      labelCleared(CITE.turmericJoint, 'Stearic acid'),
      labelCleared(CITE.turmericJoint, 'Hypromellose'),
    ],
    math: 'Driver is silicon dioxide (0-pt Caution cap only). MCC / stearic acid / hypromellose are Cleared-class and do not raise the grade. Do not invent Clean on the SiO2 cap.',
    extraNote:
      'Separate formulaId from Turmeric Curcumin Whole Body tablets, Whole Body Minis, Fast Acting Turmeric, Extra Strength Liver, and Daily Turmeric Nutrient Booster Powder.',
  }),
  cautionCustom({
    id: 'megafood-turmeric-extra-strength-liver',
    barcode: '051494103074',
    productName: 'Turmeric Curcumin Extra Strength Liver',
    category: IMMUNE,
    form: 'tablet',
    productType: SUPPLEMENT,
    actives: [
      { name: 'Turmeric / curcuminoids', strength: 'label serving' },
      { name: 'Milk thistle', strength: 'label serving' },
      { name: 'Schisandra', strength: 'label serving' },
    ],
    cite: CITE.turmericLiver,
    inactives: [
      flag('Silicon dioxide', 'cleared', labelCite(CITE.turmericLiver, METH.sio2)),
      labelCleared(CITE.turmericLiver, 'Microcrystalline cellulose'),
      labelCleared(CITE.turmericLiver, 'Stearic acid'),
      labelCleared(CITE.turmericLiver, 'Hypromellose'),
    ],
    math: 'Driver is silicon dioxide (0-pt Caution cap only). MCC / stearic acid / hypromellose are Cleared-class and do not raise the grade. Do not invent Clean on the SiO2 cap.',
    extraNote:
      'Milk thistle and schisandra are labeled actives — not a second inactive grade. Separate formulaId from Turmeric Curcumin Whole Body tablets, Whole Body Minis, Fast Acting Turmeric, Extra Strength Joint, and Daily Turmeric Nutrient Booster Powder.',
  }),
];
