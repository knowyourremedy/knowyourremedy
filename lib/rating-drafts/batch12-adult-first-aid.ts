// DRAFT / not verified / batch 12 adult First Aid / Skin (topical)
// First Aid · audience 'adult' · recordStatus is 'unverified' on every row.
// Founder calls (locked): see notes below. Do NOT invent Clean. Methodology v1.6
// grades only — do not change locked ingredient grades.
// Homeopathic rows stay in this use category with productSubtype +
// homeopathicSubtype = 'homeopathic'.
// Barcodes omitted — do not invent UPCs. Pack sizes share formulaId.
// Form is labeled on cleanAlternatives, not a hard filter (§6).
// Not wired into Clean Picks UI. No live First Aid / Clean Picks file is
// edited from this draft. Methodology.md / PROJECT_NOTES.md are untouched.
//
// OINTMENT vs CREAM (LOCKED): petrolatum ointments and paraben creams are
// different formulaIds. Neosporin / Equate Plus Pain ointment = Clean
// (petrolatum). The cream twins = Avoid (methylparaben). Do not collapse.
//
// PARKED ACTIVES (LOCKED): menthol / camphor / eucalyptol stay parked
// (Methodology §5) — grade inactives only; do NOT invent active-safety
// grades. Note parked in honestNotes when present. Zinc oxide as a
// diaper / rash / skin-protectant active is parked the same way
// (Desitin Max, calamine ZnO, Benadryl / Caladryl zinc acetate).
// Formaldehyde-releasers (diazolidinyl urea) are parked / out-of-scope —
// notes only, never a demerit.
//
// TOPICAL OINTMENT OILS: cottonseed / olive / cocoa in ointments are NOT
// the gummy seed/industrial-oil High rule. Cleared-class / ungraded
// presence; not Avoid.
//
// FOUNDER CALLS (LOCKED) — approved rows only:
// CLEAN
// - FA1 Boiron Calendula Cream = Clean. setid 2ed51803. Shea / coconut /
//   glycerin family. Homeopathic.
// - FA2 Boiron Calendula Ointment = Clean. setid 28c76b61-2a0c. White
//   petrolatum + alcohol + water. Homeopathic. (2a0a cream-style twin is
//   a different formula — not this row.)
// - FA3 Boiron Arnicare Gel = Clean. setid ce519152. Alcohol / carbomer /
//   water / NaOH — no fragrance, no paraben on the matched SPL. Cream
//   SPL 542b41dd lists two bases (including a PEG cream panel) — Clean
//   was not invented for cream. Pick is the gel.
// - FA4 Neosporin Original Ointment = Clean. setid 0ad21575. Petrolatum +
//   cottonseed / olive / cocoa oils.
// - FA5 Neosporin Plus Pain Relief Ointment = Clean. setid 32302dcd.
//   Petrolatum only.
// - FA6 Polysporin Ointment = Clean. setid e0fcf83e. Petrolatum.
// - FA7 Equate Bacitracin Ointment = Clean. setid 20908780. White
//   petrolatum.
// - FA8 Equate Triple Antibiotic + Pain Ointment = Clean. setid 907d44c5.
//   Petrolatum.
// - FA9 Equate Antibiotic oil-blend (Pain / Itch / Scar) = Clean.
//   setid 2b743271. Cocoa / cottonseed / olive / petrolatum Neosporin
//   twin.
// - FA10 Cortizone-10 Water Resistant = Clean. setid 118e55e7.
//   Petrolatum only.
// - FA11 Aquaphor Itch Relief HC = Clean. setid b1d0333f. No paraben /
//   no fragrance on the matched SPL.
// - FA12 Benadryl Extra Strength Itch Cooling = Clean. setid a7eae5dc
//   (cooling spray). Alcohol / glycerin / PVP / water. Stick twin
//   309d9be0 is the same inactives. Founder lock id keeps "gel".
// - FA13 Calamine lotion (plain) = Clean. setid 1a03331e. Bentonite /
//   Ca hydroxide / glycerin / water. ZnO is an active (parked).
// - FA14 Hydrogen peroxide 3% = Clean. Equate setid e19228e9. Water only.
// - FA15 Isopropyl alcohol 70% plain = Clean. Walgreens setid 21f125a0.
//   Water only.
// - FA16 Aquaphor Healing Ointment = Clean. setid 0a17bf6f.
// - FA17 Desitin Multi-Purpose = Clean. setid 30f06dbb. Mineral oil /
//   paraffin / cocoa butter / tocopherol blend holds. Active is
//   petrolatum, not ZnO.
// CAUTION
// - FA18 Calamine Plus (fragrance) = Caution. Fragrance; camphor parked.
//   Walgreens spray setid 33219878 (CVS db6f518d is the same family).
// - FA19 Bactine Max (BKC spray) = Caution. BKC + fragrance.
//   setid 28e8a311. BKC is the labeled antiseptic active — no invented
//   active-safety grade. Fragrance is the inactive Caution driver.
// - FA20 Bactine Max Wound Wash = Caution. setid 39b26c28. PEG-100
//   Stearate (PEG Moderate). No fragrance / no paraben — Clean is not
//   invented.
// - FA21 Desitin Maximum Strength = Caution. Fragrance; ZnO parked.
//   setid 1590101a.
// AVOID
// - FA22 Neosporin Plus Pain Cream = Avoid. Methylparaben.
//   setid 23222e54. Separate from the Clean ointment.
// - FA23 Equate Antibiotic + Pain Cream = Avoid. Methylparaben.
//   setid e08b427f.
// - FA24 Cortizone-10 Soothing Aloe = Avoid. Methyl / propylparaben + SLS.
//   setid 1962abb3.
// - FA25 Cortizone-10 Cooling = Avoid. Methylparaben (propylparaben also
//   on SPL). setid 14d9fce2.
// - FA26 CVS Hydrocortisone Aloe = Avoid. Parabens + SLS. setid 546a1b8a.
// - FA27 Benadryl Extra Strength Itch Stopping Cream = Avoid. Parabens.
//   setid a1c1b878. Original-strength twin 920c50cb is the same
//   demerit family.
// - FA28 Caladryl Clear = Avoid. Fragrance + parabens. setid fca6f08b.
//   Camphor parked; diazolidinyl urea parked.
// - FA29 Isopropyl alcohol 70% dyed = Avoid. Blue #1 + Yellow #5.
//   GNP wintergreen setid 03247512.
//
// TALLY (unverified drafts): 29 rows — Clean 17 / Caution 4 / Avoid 8.
// Independently Clean in THIS batch only: Calendula cream / ointment,
// Arnicare Gel, Neosporin Original / Plus Pain ointments, Polysporin,
// Equate bacitracin / triple-pain / oil-blend ointments, Cortizone-10
// Water Resistant, Aquaphor Itch Relief HC, Benadryl itch-cooling
// (spray SPL), plain calamine, Equate 3% peroxide, Walgreens 70% IPA,
// Aquaphor Healing, Desitin Multi-Purpose. Caution / Avoid rows offer
// the closest Clean peer with form labeled (§6). Prefer petrolatum
// ointment / Calendula / plain antiseptic peers.
//
// SKIPPED (founder skip — do not invent Clean / do not write):
// - VapoRub-style menthol / camphor / eucalyptol rubs
// - Solarcaine
// - Tecnu
// - Prep H
// - Kids first-aid
// - Amazon-only SKUs
// No invented menthol / camphor / eucalyptol active-safety grades.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const FIRST_AID = 'First Aid';
const ADULT = 'adult' as const;
const HOMEOPATHIC = 'homeopathic' as const;

const METH = {
  dyes: 'Methodology §5 High-tier (synthetic dyes, including lake forms)',
  parabens: 'Methodology §5 High-tier (parabens)',
  peg: 'Methodology §5 Moderate-risk (PEGs — ethylene-oxide / 1,4-dioxane contamination risk)',
  maltodextrin: 'Methodology §5 Limited-risk (non-organic maltodextrin)',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  fragrance:
    'Methodology §5 Caution (fragrance / parfum, topical OTC — population/sensitization; standalone Caution, not additive-scored, not Avoid alone)',
  sls:
    'Methodology §5 Caution (sodium lauryl sulfate — population/irritant; standalone Caution, not additive-scored, not Avoid)',
  benzyl:
    'Methodology §5 Caution (benzyl alcohol — population split is oral/infant; adult topical — not additive-scored, not the Avoid driver)',
  edta: 'Methodology §5 Cleared (disodium EDTA, trace preservative/stabilizer — locked v1.6)',
  tocopherols:
    'Methodology §5 Cleared (mixed tocopherols / tocopheryl acetate as antioxidants — locked v1.6)',
  gums: 'Methodology §5 Cleared (xanthan gum / gum arabic / guar / pectin — locked v1.6)',
  pvp: 'Methodology §5 Cleared (povidone / PVP — locked v1.6)',
  carbomer: 'Methodology §5 Cleared (carbomer homopolymer — current monograph)',
  starch: 'Methodology §5 Cleared (simple starches — corn starch / similar)',
  hypromellose: 'Methodology §5 Cleared (hypromellose)',
  oils:
    'Topical ointment cottonseed / olive / cocoa oils — not the gummy seed/industrial-oil High rule (Methodology §5 context scoping)',
  ungraded:
    'Not in Methodology §5 — ungraded (v1.6 intake). Mentioned as present; not graded on the spot; not used to invent Clean or Avoid',
  pgTopical:
    'Propylene glycol is oral-scoped in Methodology §5 — not scored as Moderate on this topical first-aid label',
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

function ungraded(setid: string, name: string): IngredientFlag {
  return flag(name, 'cleared', dailymed(setid, METH.ungraded));
}

function topicalOil(setid: string, name: string): IngredientFlag {
  return flag(name, 'cleared', dailymed(setid, METH.oils));
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

const PARKED_MCE =
  'Menthol / camphor / eucalyptol as topical actives stay parked (Methodology §5) — inactives graded only; no invented active-safety grade.';

const PARKED_ZNO =
  'Zinc (oxide / acetate) as a topical / diaper-rash / skin-protectant active stays parked (Methodology §5) — inactives graded only; no invented active-safety grade.';

const PARKED_FORMALDEHYDE =
  'Diazolidinyl urea is a formaldehyde-releaser — parked / out-of-scope (Methodology §5). Notes only, not a demerit.';

const CALENDULA_CREAM = 'boiron-calendula-cream';
const CALENDULA_OINT = 'boiron-calendula-ointment';
const ARNICARE_GEL = 'boiron-arnicare-gel';
const NEOSPORIN_ORIG = 'neosporin-original-ointment';
const NEOSPORIN_PAIN_OINT = 'neosporin-plus-pain-ointment';
const POLYSPORIN = 'polysporin-ointment';
const EQUATE_BACITRACIN = 'equate-bacitracin-ointment';
const EQUATE_TRIPLE_PAIN = 'equate-triple-antibiotic-pain-ointment';
const EQUATE_OIL_BLEND = 'equate-antibiotic-oil-blend';
const CORTIZONE_WR = 'cortizone10-water-resistant';
const AQUAPHOR_HC = 'aquaphor-itch-relief-hc';
const BENADRYL_COOL = 'benadryl-itch-cooling-gel';
const CALAMINE_PLAIN = 'calamine-lotion-plain';
const H2O2 = 'hydrogen-peroxide-3';
const IPA_PLAIN = 'isopropyl-alcohol-plain';
const AQUAPHOR_HEAL = 'aquaphor-healing-ointment';
const DESITIN_MP = 'desitin-multipurpose';

const SET_CAL_CREAM = '2ed51803-5ec2-4163-ad12-2bf441551f07';
const SET_CAL_OINT = '28c76b61-2a0c-0f52-e054-00144ff8d46c';
const SET_ARNICA_GEL = 'ce519152-e6fb-42e3-8fd4-f819476ebd86';
const SET_NEO_ORIG = '0ad21575-0e2d-24c2-e063-6394a90a616e';
const SET_NEO_PAIN_OINT = '32302dcd-f3f1-408b-ae5f-e7d8b666f68f';
const SET_POLY = 'e0fcf83e-a374-4fc0-a629-873033054392';
const SET_EQ_BAC = '20908780-8803-4e19-e063-6394a90aab87';
const SET_EQ_TRIPLE = '907d44c5-cbd1-4d13-8c5c-c164f7a536e5';
const SET_EQ_OIL = '2b743271-4f58-4ba1-a04c-560f7f8a547e';
const SET_C10_WR = '118e55e7-241f-44c4-959e-09bf6221bd77';
const SET_AQ_HC = 'b1d0333f-ba60-35d8-e053-2995a90af932';
const SET_BEN_COOL = 'a7eae5dc-9db6-4bdf-9179-76060e75e044';
const SET_CALAMINE = '1a03331e-3676-451c-be22-9a547e8ae6e2';
const SET_H2O2 = 'e19228e9-6f87-456e-a222-f979a234d589';
const SET_IPA_PLAIN = '21f125a0-73e8-34a9-e063-6294a90a8396';
const SET_AQ_HEAL = '0a17bf6f-6114-4647-a509-65999255c37b';
const SET_DES_MP = '30f06dbb-de8c-43ee-b1ed-99ffd59dd3ab';
const SET_CALAMINE_PLUS = '33219878-f102-46c6-bd63-e83d54fa2785';
const SET_BACTINE_MAX = '28e8a311-20a4-45a1-8d5d-ca42b101c275';
const SET_BACTINE_WASH = '39b26c28-93e0-41a9-8018-f73525ebc015';
const SET_DES_MAX = '1590101a-c968-fca5-e063-6394a90a7ccc';
const SET_NEO_CREAM = '23222e54-d793-4d79-980e-550e32a95742';
const SET_EQ_CREAM = 'e08b427f-d070-4521-ad3c-faf295531791';
const SET_C10_ALOE = '1962abb3-6ca7-4934-9efe-20287b1c2a5b';
const SET_C10_COOL = '14d9fce2-9f54-4204-83cb-161de8a303f0';
const SET_CVS_HC = '546a1b8a-8254-432a-85c4-38ebee5ad568';
const SET_BEN_CREAM = 'a1c1b878-d58f-41ff-b7a8-477f28c52667';
const SET_CALADRYL = 'fca6f08b-7fa0-4ae6-bce3-61f3bcae4332';
const SET_IPA_DYED = '03247512-7a31-4fb4-b7e0-efc337cab693';

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const OINTMENT_ALTS: CleanAlternative[] = [
  alt(
    NEOSPORIN_PAIN_OINT,
    'Independently Clean adult first-aid ointment in this batch (Neosporin Plus Pain Relief, petrolatum only). Form: ointment — labeled, not a hard filter (§6).',
  ),
  alt(
    CALENDULA_OINT,
    'Independently Clean adult First Aid analog (Boiron Calendula Ointment, homeopathic). Form: ointment — labeled, not a hard filter (§6). Cleanliness only; no efficacy claim.',
  ),
];

const HC_ALTS: CleanAlternative[] = [
  alt(
    CORTIZONE_WR,
    'Independently Clean adult hydrocortisone analog in this batch (Cortizone-10 Water Resistant, petrolatum only). Form: ointment — labeled, not a hard filter (§6).',
  ),
  alt(
    AQUAPHOR_HC,
    'Independently Clean adult hydrocortisone analog (Aquaphor Itch Relief 1%, fragrance-free / paraben-free). Form: ointment — labeled, not a hard filter (§6).',
  ),
];

const ITCH_ALTS: CleanAlternative[] = [
  alt(
    BENADRYL_COOL,
    'Independently Clean adult topical-analgesic analog in this batch (Benadryl Extra Strength Itch Cooling — alcohol / glycerin / PVP / water). Form: topical spray on the matched SPL (founder lock id keeps gel) — labeled, not a hard filter (§6).',
  ),
  alt(
    CALAMINE_PLAIN,
    'Independently Clean adult itch analog (plain calamine lotion, no fragrance). Form: lotion — labeled, not a hard filter (§6).',
  ),
];

const ANTISEPTIC_ALTS: CleanAlternative[] = [
  alt(
    H2O2,
    'Independently Clean adult antiseptic analog in this batch (Equate Hydrogen Peroxide 3%, water only). Form: liquid — labeled, not a hard filter (§6).',
  ),
  alt(
    IPA_PLAIN,
    'Independently Clean adult antiseptic analog (Walgreens 70% Isopropyl Alcohol, water only). Form: liquid — labeled, not a hard filter (§6).',
  ),
];

const RASH_ALTS: CleanAlternative[] = [
  alt(
    DESITIN_MP,
    'Independently Clean adult / diaper-rash analog in this batch (Desitin Multi-Purpose Healing, fragrance-free). Form: ointment — labeled, not a hard filter (§6).',
  ),
  alt(
    AQUAPHOR_HEAL,
    'Independently Clean skin-protectant analog (Aquaphor Healing Ointment). Form: ointment — labeled, not a hard filter (§6).',
  ),
];

export const BATCH12_ADULT_FIRST_AID: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  {
    id: CALENDULA_CREAM,
    productName: 'Boiron Calendula Cream',
    brand: 'Boiron',
    category: FIRST_AID,
    barcode: '306962043568',
    formulaId: CALENDULA_CREAM,
    audience: ADULT,
    minAge: 1,
    form: 'cream',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Calendula officinalis', strength: '1X HPUS 10%' },
    ],
    inactiveIngredients: [
      ungraded(SET_CAL_CREAM, 'Arachidyl alcohol'),
      ungraded(SET_CAL_CREAM, 'Arachidyl glucoside'),
      ungraded(SET_CAL_CREAM, 'Behenyl alcohol'),
      ungraded(SET_CAL_CREAM, 'Butyrospermum parkii (shea) butter'),
      topicalOil(SET_CAL_CREAM, 'Coconut oil'),
      cleared(SET_CAL_CREAM, 'Glycerin'),
      ungraded(SET_CAL_CREAM, 'Lactobacillus ferment'),
      cleared(SET_CAL_CREAM, 'Purified water'),
      flag('Xanthan gum', 'cleared', dailymed(SET_CAL_CREAM, METH.gums)),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Boiron Calendula Cream = Clean. Draft Clean on the shea / coconut / glycerin family (setid 2ed51803). Arachidyl alcohol / glucoside, behenyl alcohol, shea butter, and lactobacillus ferment are not in Methodology §5 (ungraded; v1.6 intake) — not Clean-blockers. Coconut oil is topical ointment/cream oil, not the gummy seed-oil High rule. Homeopathic cream — cleanliness only, no efficacy claim. ' +
      CARLSTON +
      ' Adult First Aid row; Boiron topical calendula / Arnica sibling charts start at 1 year. Pack sizes share formulaId.',
    retailers: ['CVS', 'Walgreens', 'Whole Foods', 'Sprouts'],
    sourcesGeneral: [
      `DailyMed setid ${SET_CAL_CREAM} (draft, not verified)`,
      CARLSTON,
    ],
  },
  {
    id: CALENDULA_OINT,
    productName: 'Boiron Calendula Ointment',
    brand: 'Boiron',
    category: FIRST_AID,
    barcode: '306962052508',
    formulaId: CALENDULA_OINT,
    audience: ADULT,
    minAge: 1,
    form: 'ointment',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Calendula officinalis', strength: '1X HPUS 4%' },
    ],
    inactiveIngredients: [
      ungraded(SET_CAL_OINT, 'White petrolatum USP'),
      ungraded(SET_CAL_OINT, 'Alcohol'),
      cleared(SET_CAL_OINT, 'Purified water'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Boiron Calendula Ointment = Clean. White petrolatum + alcohol + water on setid 28c76b61-2a0c. Petrolatum and topical alcohol are not in Methodology §5 (ungraded; v1.6 intake) — not Clean-blockers. The 2a0a SPL is a different cream-style base (PEG / caprylyl glycol panel) — not this row. Homeopathic ointment — cleanliness only, no efficacy claim. ' +
      CARLSTON,
    retailers: ['CVS', 'Walgreens', 'Whole Foods', 'Sprouts'],
    sourcesGeneral: [
      `DailyMed setid ${SET_CAL_OINT} (draft, not verified)`,
      CARLSTON,
    ],
  },
  {
    id: ARNICARE_GEL,
    productName: 'Boiron Arnicare Gel',
    brand: 'Boiron',
    category: FIRST_AID,
    barcode: '306969000595',
    formulaId: ARNICARE_GEL,
    audience: ADULT,
    minAge: 1,
    form: 'gel',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [{ name: 'Arnica montana', strength: '1X HPUS 7%' }],
    inactiveIngredients: [
      ungraded(SET_ARNICA_GEL, 'Alcohol'),
      flag('Carbomer', 'cleared', dailymed(SET_ARNICA_GEL, METH.carbomer)),
      cleared(SET_ARNICA_GEL, 'Purified water'),
      ungraded(SET_ARNICA_GEL, 'Sodium hydroxide'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Boiron Arnicare Gel = Clean ONLY because the matched SPL (ce519152) has no fragrance and no paraben (alcohol / carbomer / purified water / sodium hydroxide). Cream SPL 542b41dd lists a shea/coconut panel and a PEG cream panel — Clean is not invented for cream. Ointment twin 9d03bd9c (petrolatum / alcohol / water) is also fragrance-free / paraben-free but this row is the gel. Homeopathic gel — cleanliness only, no efficacy claim. ' +
      CARLSTON +
      ' Arnicare ointment/cream sibling charts: adults and children 1 year and older (under 1: not recommended).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Whole Foods', 'Sprouts'],
    sourcesGeneral: [
      `DailyMed setid ${SET_ARNICA_GEL} (draft, not verified)`,
      CARLSTON,
    ],
  },
  {
    id: NEOSPORIN_ORIG,
    productName: 'Neosporin Original Ointment',
    brand: 'Neosporin',
    category: FIRST_AID,
    barcode: '312547944892 300810730884 300810730877',
    formulaId: NEOSPORIN_ORIG,
    audience: ADULT,
    minAge: 2,
    form: 'ointment',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Bacitracin zinc', strength: '400 units / g' },
      { name: 'Neomycin sulfate', strength: '3.5mg / g' },
      { name: 'Polymyxin B sulfate', strength: '5,000 units / g' },
    ],
    inactiveIngredients: [
      ungraded(SET_NEO_ORIG, 'Petrolatum'),
      topicalOil(SET_NEO_ORIG, 'Gossypium herbaceum (cotton) seed oil'),
      topicalOil(SET_NEO_ORIG, 'Olea europaea (olive) fruit oil'),
      topicalOil(SET_NEO_ORIG, 'Theobroma cacao (cocoa) seed butter'),
      ungraded(SET_NEO_ORIG, 'Sodium pyruvate'),
      flag(
        'Tocopheryl acetate',
        'cleared',
        dailymed(SET_NEO_ORIG, METH.tocopherols),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Neosporin Original Ointment = Clean. Petrolatum + cottonseed / olive / cocoa oils on setid 0ad21575. Topical ointment oils are not the gummy seed-oil High rule. Petrolatum and sodium pyruvate are not in Methodology §5 (ungraded; v1.6 intake). First-aid antibiotic monograph: ages 2+ (under 2: ask a doctor). The Plus Pain cream is a separate Avoid formulaId.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      `DailyMed setid ${SET_NEO_ORIG} (draft, not verified)`,
    ],
  },
  {
    id: NEOSPORIN_PAIN_OINT,
    productName: 'Neosporin Plus Pain Relief Ointment',
    brand: 'Neosporin',
    category: FIRST_AID,
    barcode: '300810746885',
    formulaId: NEOSPORIN_PAIN_OINT,
    audience: ADULT,
    minAge: 2,
    form: 'ointment',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Bacitracin zinc', strength: '500 units / g' },
      { name: 'Neomycin sulfate', strength: '3.5mg / g' },
      { name: 'Polymyxin B sulfate', strength: '10,000 units / g' },
      { name: 'Pramoxine HCl', strength: '10mg / g' },
    ],
    inactiveIngredients: [cleared(SET_NEO_PAIN_OINT, 'Petrolatum')],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Neosporin Plus Pain Relief Ointment = Clean. Petrolatum only on setid 32302dcd. Separate formulaId from the Plus Pain cream (methylparaben Avoid). Ages 2+ (under 2: ask a doctor).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      `DailyMed setid ${SET_NEO_PAIN_OINT} (draft, not verified)`,
    ],
  },
  {
    id: POLYSPORIN,
    productName: 'Polysporin First Aid Antibiotic Ointment',
    brand: 'Polysporin',
    category: FIRST_AID,
    barcode: '312547238137',
    formulaId: POLYSPORIN,
    audience: ADULT,
    minAge: 2,
    form: 'ointment',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Bacitracin zinc', strength: '500 units / g' },
      { name: 'Polymyxin B sulfate', strength: '10,000 units / g' },
    ],
    inactiveIngredients: [cleared(SET_POLY, 'Petrolatum')],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Polysporin ointment = Clean. Petrolatum only on setid e0fcf83e. Neomycin-free twin of the petrolatum ointment family. First-aid antibiotic monograph: ages 2+ (under 2: ask a doctor).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target'],
    sourcesGeneral: [`DailyMed setid ${SET_POLY} (draft, not verified)`],
  },
  {
    id: EQUATE_BACITRACIN,
    productName: 'Equate Bacitracin Ointment',
    brand: 'Equate',
    category: FIRST_AID,
    barcode: '194346256778',
    formulaId: EQUATE_BACITRACIN,
    audience: ADULT,
    minAge: 2,
    form: 'ointment',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Bacitracin zinc', strength: '500 units / g' },
    ],
    inactiveIngredients: [cleared(SET_EQ_BAC, 'White petrolatum')],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Equate Bacitracin Ointment = Clean. White petrolatum only on setid 20908780. First-aid antibiotic monograph: ages 2+ (under 2: ask a doctor).',
    retailers: ['Walmart'],
    sourcesGeneral: [`DailyMed setid ${SET_EQ_BAC} (draft, not verified)`],
  },
  {
    id: EQUATE_TRIPLE_PAIN,
    productName: 'Equate First Aid Antibiotic Plus Pain Relief Ointment',
    brand: 'Equate',
    category: FIRST_AID,
    barcode: '681131082433',
    formulaId: EQUATE_TRIPLE_PAIN,
    audience: ADULT,
    minAge: 2,
    form: 'ointment',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Bacitracin', strength: '500 units / g' },
      { name: 'Neomycin sulfate', strength: '3.5mg / g' },
      { name: 'Polymyxin B sulfate', strength: '10,000 units / g' },
      { name: 'Pramoxine HCl', strength: '10mg / g' },
    ],
    inactiveIngredients: [cleared(SET_EQ_TRIPLE, 'Petrolatum')],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Equate Triple Antibiotic + Pain ointment = Clean. Petrolatum only on setid 907d44c5. Separate from the Equate antibiotic cream (methylparaben Avoid) and from the cocoa/cottonseed/olive oil-blend SKU. Ages 2+ (under 2: consult a doctor).',
    retailers: ['Walmart'],
    sourcesGeneral: [`DailyMed setid ${SET_EQ_TRIPLE} (draft, not verified)`],
  },
  {
    id: EQUATE_OIL_BLEND,
    productName: 'Equate Antibiotic Plus Pain, Itch, Scar Relief',
    brand: 'Equate',
    category: FIRST_AID,
    barcode: '681131040372',
    formulaId: EQUATE_OIL_BLEND,
    audience: ADULT,
    minAge: 2,
    form: 'ointment',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Bacitracin zinc', strength: '500 units / g' },
      { name: 'Neomycin sulfate', strength: '3.5mg / g' },
      { name: 'Polymyxin B sulfate', strength: '10,000 units / g' },
      { name: 'Pramoxine hydrochloride', strength: '10mg / g' },
    ],
    inactiveIngredients: [
      topicalOil(SET_EQ_OIL, 'Cocoa butter'),
      topicalOil(SET_EQ_OIL, 'Cotton seed oil'),
      topicalOil(SET_EQ_OIL, 'Olive fruit oil'),
      ungraded(SET_EQ_OIL, 'Petrolatum'),
      ungraded(SET_EQ_OIL, 'Sodium pyruvate'),
      flag(
        'Tocopheryl acetate',
        'cleared',
        dailymed(SET_EQ_OIL, METH.tocopherols),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Equate antibiotic oil-blend = Clean. Cocoa / cottonseed / olive / petrolatum Neosporin Original twin on setid 2b743271. Topical ointment oils are not the gummy seed-oil High rule. Ages 2+ (under 2: ask a doctor).',
    retailers: ['Walmart'],
    sourcesGeneral: [`DailyMed setid ${SET_EQ_OIL} (draft, not verified)`],
  },
  {
    id: CORTIZONE_WR,
    productName: 'Cortizone-10 Water Resistant',
    brand: 'Cortizone-10',
    category: FIRST_AID,
    barcode: '041167033968',
    formulaId: CORTIZONE_WR,
    audience: ADULT,
    minAge: 2,
    form: 'ointment',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Hydrocortisone', strength: '1%' }],
    inactiveIngredients: [cleared(SET_C10_WR, 'Petrolatum')],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Cortizone-10 Water Resistant = Clean. Petrolatum only on setid 118e55e7. Separate from Soothing Aloe / Cooling (paraben Avoid). Ages 2+ (under 2: do not use, ask a doctor). External anal / genital itching chart is 12+ — not this row\'s minAge.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [`DailyMed setid ${SET_C10_WR} (draft, not verified)`],
  },
  {
    id: AQUAPHOR_HC,
    productName: 'Aquaphor Itch Relief',
    brand: 'Aquaphor',
    category: FIRST_AID,
    barcode: '072140031114',
    formulaId: AQUAPHOR_HC,
    audience: ADULT,
    minAge: 2,
    form: 'ointment',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Hydrocortisone', strength: '1%' }],
    inactiveIngredients: [
      ungraded(SET_AQ_HC, 'Petrolatum'),
      ungraded(SET_AQ_HC, 'Mineral oil'),
      ungraded(SET_AQ_HC, 'Ceresin'),
      ungraded(SET_AQ_HC, 'Lanolin alcohol'),
      ungraded(SET_AQ_HC, 'Panthenol'),
      cleared(SET_AQ_HC, 'Glycerin'),
      ungraded(SET_AQ_HC, 'Bisabolol'),
      ungraded(SET_AQ_HC, 'Menthoxypropanediol'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Aquaphor Itch Relief HC = Clean — no paraben and no fragrance on setid b1d0333f. Mineral oil / ceresin / lanolin alcohol / panthenol / bisabolol / menthoxypropanediol are not in Methodology §5 (ungraded; v1.6 intake) — not Clean-blockers. Menthoxypropanediol is a cooling diol, not menthol; menthol / camphor / eucalyptol stay parked and are not on this SPL. Ages 2+ (under 2: do not use).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target'],
    sourcesGeneral: [`DailyMed setid ${SET_AQ_HC} (draft, not verified)`],
  },
  {
    id: BENADRYL_COOL,
    productName: 'Benadryl Extra Strength Itch Cooling Spray',
    brand: 'Benadryl',
    category: FIRST_AID,
    barcode: '312547170048',
    formulaId: BENADRYL_COOL,
    audience: ADULT,
    minAge: 2,
    form: 'topical spray',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Diphenhydramine HCl', strength: '2%' },
      { name: 'Zinc acetate', strength: '0.1%' },
    ],
    inactiveIngredients: [
      ungraded(SET_BEN_COOL, 'Alcohol'),
      cleared(SET_BEN_COOL, 'Glycerin'),
      flag('PVP (povidone)', 'cleared', dailymed(SET_BEN_COOL, METH.pvp)),
      cleared(SET_BEN_COOL, 'Purified water'),
      ungraded(SET_BEN_COOL, 'Tromethamine'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Benadryl itch-cooling (alcohol / glycerin / PVP / water) = Clean. Matched SPL a7eae5dc is Extra Strength Itch Cooling Spray; stick twin 309d9be0 is the same inactives. Founder lock id keeps "gel" — form on the cited carton is spray (labeled, not a hard filter §6). ' +
      PARKED_ZNO +
      ' Tromethamine / topical alcohol are not in Methodology §5 (ungraded). Separate from Extra Strength Itch Stopping Cream (paraben Avoid). Ages 2+ (under 2: ask a doctor).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [`DailyMed setid ${SET_BEN_COOL} (draft, not verified)`],
  },
  {
    id: CALAMINE_PLAIN,
    productName: 'Calamine Lotion',
    brand: 'Family Dollar',
    category: FIRST_AID,
    barcode: '032251925559',
    formulaId: CALAMINE_PLAIN,
    audience: ADULT,
    minAge: 2,
    form: 'lotion',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Calamine', strength: '8%' },
      { name: 'Zinc oxide', strength: '8%' },
    ],
    inactiveIngredients: [
      ungraded(SET_CALAMINE, 'Bentonite magma'),
      ungraded(SET_CALAMINE, 'Calcium hydroxide'),
      cleared(SET_CALAMINE, 'Glycerin'),
      cleared(SET_CALAMINE, 'Purified water'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Plain calamine lotion = Clean IF bentonite / calcium hydroxide / glycerin / water holds. Family Dollar setid 1a03331e matches that list. ' +
      PARKED_ZNO +
      ' Bentonite magma and calcium hydroxide are not in Methodology §5 (ungraded; v1.6 intake). Fragrance / camphor Calamine Plus sprays are a separate Caution formulaId. Calamine monograph: ages 2+ typical (under 2: ask a doctor).',
    retailers: ['Family Dollar', 'Grocery'],
    sourcesGeneral: [`DailyMed setid ${SET_CALAMINE} (draft, not verified)`],
  },
  {
    id: H2O2,
    productName: 'Equate Hydrogen Peroxide 3%',
    brand: 'Equate',
    category: FIRST_AID,
    barcode: '681131175838',
    formulaId: H2O2,
    audience: ADULT,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Hydrogen peroxide', strength: '3%' }],
    inactiveIngredients: [cleared(SET_H2O2, 'Purified water')],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Hydrogen peroxide 3% = Clean. Water only on Equate setid e19228e9. Other brick-and-mortar 3% water-only bottles share this formulaId for grading. Oral-rinse chart on this SPL is ages 2+ (under 2: consult a dentist or doctor); first-aid antiseptic use is the same adult-catalog row.',
    retailers: ['Walmart'],
    sourcesGeneral: [`DailyMed setid ${SET_H2O2} (draft, not verified)`],
  },
  {
    id: IPA_PLAIN,
    productName: 'Walgreens 70% Isopropyl Alcohol',
    brand: 'Walgreens',
    category: FIRST_AID,
    barcode: '311917053844',
    formulaId: IPA_PLAIN,
    audience: ADULT,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Isopropyl alcohol', strength: '70%' }],
    inactiveIngredients: [cleared(SET_IPA_PLAIN, 'Water')],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Plain isopropyl alcohol = Clean. Water only on Walgreens setid 21f125a0. Other water-only 70% bottles (Leader 4b5d50cb, GNP 0ffd9643) share this formulaId for grading. The wintergreen Blue #1 + Yellow #5 twin is a separate Avoid formulaId. First-aid antiseptic monograph: ages 2+ typical.',
    retailers: ['Walgreens'],
    sourcesGeneral: [`DailyMed setid ${SET_IPA_PLAIN} (draft, not verified)`],
  },
  {
    id: AQUAPHOR_HEAL,
    productName: 'Aquaphor Healing Ointment',
    brand: 'Aquaphor',
    category: FIRST_AID,
    barcode: '072140019457',
    formulaId: AQUAPHOR_HEAL,
    audience: ADULT,
    minAge: 0,
    form: 'ointment',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Petrolatum', strength: '41%' }],
    inactiveIngredients: [
      ungraded(SET_AQ_HEAL, 'Mineral oil'),
      ungraded(SET_AQ_HEAL, 'Ceresin'),
      ungraded(SET_AQ_HEAL, 'Lanolin alcohol'),
      ungraded(SET_AQ_HEAL, 'Panthenol'),
      cleared(SET_AQ_HEAL, 'Glycerin'),
      ungraded(SET_AQ_HEAL, 'Bisabolol'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Aquaphor Healing Ointment = Clean. setid 0a17bf6f — mineral oil / ceresin / lanolin alcohol / panthenol / glycerin / bisabolol. Those unlisted-in-§5 inactives are ungraded (v1.6 intake), not Clean-blockers. No fragrance / no paraben. Skin-protectant / diaper-rash directions have no lower-age floor (minAge 0). Adult First Aid catalog row; also labeled for diaper rash. Diaper-rash Fast Relief / Balm Stick SKUs are different formulaIds — not this row.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [`DailyMed setid ${SET_AQ_HEAL} (draft, not verified)`],
  },
  {
    id: DESITIN_MP,
    productName: 'Desitin Multi-Purpose Healing Ointment',
    brand: 'Desitin',
    category: FIRST_AID,
    barcode: '312547034913',
    formulaId: DESITIN_MP,
    audience: ADULT,
    minAge: 0,
    form: 'ointment',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'White petrolatum', strength: '71.3%' }],
    inactiveIngredients: [
      ungraded(SET_DES_MP, 'Mineral oil'),
      ungraded(SET_DES_MP, 'Paraffin'),
      topicalOil(SET_DES_MP, 'Theobroma cacao (cocoa) seed butter'),
      flag(
        'Tocopheryl acetate',
        'cleared',
        dailymed(SET_DES_MP, METH.tocopherols),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Desitin Multi-Purpose = Clean — mineral oil / paraffin / cocoa butter / tocopherol blend holds on setid 30f06dbb. Active is petrolatum, not zinc oxide (Max Strength is the ZnO + fragrance twin). Cocoa butter is topical ointment oil, not the gummy seed-oil High rule. Mineral oil / paraffin are not in Methodology §5 (ungraded). No lower-age floor on the diaper-rash chart (minAge 0). Adult First Aid catalog row.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [`DailyMed setid ${SET_DES_MP} (draft, not verified)`],
  },

  // ── Caution ──────────────────────────────────────────────
  {
    id: 'calamine-plus-fragrance',
    productName: 'Walgreens Calamine Plus Pramoxine Spray',
    brand: 'Walgreens',
    category: FIRST_AID,
    barcode: '311917148588',
    formulaId: 'calamine-plus-fragrance',
    audience: ADULT,
    minAge: 2,
    form: 'aerosol spray',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Calamine', strength: '8%' },
      { name: 'Pramoxine HCl', strength: '1%' },
    ],
    inactiveIngredients: [
      flag(
        'Fragrance',
        'cleared',
        dailymed(SET_CALAMINE_PLUS, METH.fragrance),
      ),
      flag(
        'Hydrated silica',
        'cleared',
        dailymed(SET_CALAMINE_PLUS, METH.sio2),
      ),
      flag(
        'Benzyl alcohol',
        'cleared',
        dailymed(SET_CALAMINE_PLUS, METH.benzyl),
      ),
      ungraded(SET_CALAMINE_PLUS, 'Camphor (parked topical active — listed inactive)'),
      ungraded(SET_CALAMINE_PLUS, 'Disteardimonium hectorite'),
      ungraded(SET_CALAMINE_PLUS, 'Isobutane'),
      ungraded(SET_CALAMINE_PLUS, 'Oleyl alcohol'),
      ungraded(SET_CALAMINE_PLUS, 'SD alcohol 40-B'),
      ungraded(SET_CALAMINE_PLUS, 'Sorbitan trioleate'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Calamine Plus fragrance = Caution. Fragrance is standalone Caution (not Avoid alone). ' +
      PARKED_MCE +
      ' Camphor is on this spray as an inactive listing and stays parked. Hydrated silica is the SiO2 nanoparticle Caution cap (0 pts). Benzyl alcohol is not the Avoid driver on this adult topical (oral/infant population split). CVS setid db6f518d and other store Calamine Plus sprays with the same fragrance + camphor list share this formulaId. Leader-style lotion twins that add parabens are a different Avoid family — not this row. Ages 2+ (under 2: consult a doctor).',
    retailers: ['Walgreens', 'CVS', 'Target', 'Grocery'],
    cleanAlternatives: ITCH_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_CALAMINE_PLUS} (draft, not verified)`,
    ],
  },
  {
    id: 'bactine-max-bkc',
    productName: 'Bactine Max Pain Relieving Cleansing Spray',
    brand: 'Bactine',
    category: FIRST_AID,
    barcode: '365197811144',
    formulaId: 'bactine-max-bkc',
    audience: ADULT,
    minAge: 2,
    form: 'topical spray',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Benzalkonium chloride', strength: '0.13%' },
      { name: 'Lidocaine HCl', strength: '4%' },
    ],
    inactiveIngredients: [
      flag('Fragrances', 'cleared', dailymed(SET_BACTINE_MAX, METH.fragrance)),
      flag(
        'Edetate disodium',
        'cleared',
        dailymed(SET_BACTINE_MAX, METH.edta),
      ),
      flag(
        'Propylene glycol',
        'cleared',
        dailymed(SET_BACTINE_MAX, METH.pgTopical),
      ),
      cleared(SET_BACTINE_MAX, 'Purified water'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Bactine Max = Caution — BKC + fragrance. setid 28e8a311. BKC 0.13% is the labeled first-aid antiseptic active (also the §5 BKC Caution pattern) — no invented active-safety grade. Fragrance is the inactive Caution driver (not Avoid alone). Propylene glycol is oral-scoped and is not scored as Moderate on this topical. Wound Wash is a separate formulaId. Ages 2+ (under 2: ask a doctor).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ANTISEPTIC_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_BACTINE_MAX} (draft, not verified)`,
    ],
  },
  {
    id: 'bactine-wound-wash',
    productName: 'Bactine Max Wound Wash',
    brand: 'Bactine',
    category: FIRST_AID,
    barcode: '365197820801',
    formulaId: 'bactine-wound-wash',
    audience: ADULT,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Benzalkonium chloride', strength: '0.13%' },
    ],
    inactiveIngredients: [
      flag(
        'PEG-100 stearate',
        'moderate',
        dailymed(SET_BACTINE_WASH, METH.peg),
      ),
      flag(
        'Edetate disodium',
        'cleared',
        dailymed(SET_BACTINE_WASH, METH.edta),
      ),
      flag(
        'Propylene glycol',
        'cleared',
        dailymed(SET_BACTINE_WASH, METH.pgTopical),
      ),
      ungraded(SET_BACTINE_WASH, 'Aloe barbadensis leaf extract'),
      cleared(SET_BACTINE_WASH, 'Purified water'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Bactine Wound Wash — confirm carton; Caution, not invented Clean. setid 39b26c28 inactives include PEG-100 stearate (PEG Moderate, 2 pts → Caution), aloe extract, EDTA, propylene glycol, water. No fragrance and no paraben on this SPL. PEG-100 stearate is a PEG ester (same EO / 1,4-dioxane Moderate family as PEG 400/3350). PG is oral-scoped and is not scored here. BKC is the labeled antiseptic active — no invented active-safety grade. First-aid antiseptic directions; ages 2+ typical (this SPL does not reprint a 2+ chart).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target'],
    cleanAlternatives: ANTISEPTIC_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_BACTINE_WASH} (draft, not verified)`,
    ],
  },
  {
    id: 'desitin-max-strength',
    productName: 'Desitin Maximum Strength Zinc Oxide Diaper Rash Paste',
    brand: 'Desitin',
    category: FIRST_AID,
    barcode: '312547034234',
    formulaId: 'desitin-max-strength',
    audience: ADULT,
    minAge: 0,
    form: 'paste',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Zinc oxide', strength: '40%' }],
    inactiveIngredients: [
      flag('Fragrance', 'cleared', dailymed(SET_DES_MAX, METH.fragrance)),
      ungraded(SET_DES_MAX, 'Petrolatum'),
      ungraded(SET_DES_MAX, 'Cod liver oil'),
      ungraded(SET_DES_MAX, 'Lanolin'),
      flag(
        'Zea mays (corn) starch',
        'cleared',
        dailymed(SET_DES_MAX, METH.starch),
      ),
      cleared(SET_DES_MAX, 'Glycerin'),
      cleared(SET_DES_MAX, 'Beeswax'),
      ungraded(SET_DES_MAX, 'Sorbitan sesquioleate'),
      ungraded(
        SET_DES_MAX,
        'Pentaerythrityl tetra-di-t-butyl hydroxyhydrocinnamate',
      ),
      flag(
        'Tocopheryl acetate',
        'cleared',
        dailymed(SET_DES_MAX, METH.tocopherols),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Desitin Maximum Strength = Caution — fragrance (standalone Caution, not Avoid alone). ' +
      PARKED_ZNO +
      ' Cod liver oil / lanolin / sorbitan sesquioleate / the hindered-phenol antioxidant are not in Methodology §5 (ungraded; v1.6 intake) — not the Caution driver. Multi-Purpose (petrolatum active, no fragrance) is the independently Clean twin. No lower-age floor (minAge 0). Adult First Aid catalog row.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: RASH_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_DES_MAX} (draft, not verified)`],
  },

  // ── Avoid ────────────────────────────────────────────────
  {
    id: 'neosporin-plus-pain-cream',
    productName: 'Neosporin Plus Pain Relief Cream',
    brand: 'Neosporin',
    category: FIRST_AID,
    barcode: '312547237796',
    formulaId: 'neosporin-plus-pain-cream',
    audience: ADULT,
    minAge: 2,
    form: 'cream',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Neomycin sulfate', strength: '3.5mg / g' },
      { name: 'Polymyxin B sulfate', strength: '10,000 units / g' },
      { name: 'Pramoxine HCl', strength: '10mg / g' },
    ],
    inactiveIngredients: [
      flag('Methylparaben', 'high', dailymed(SET_NEO_CREAM, METH.parabens)),
      flag(
        'Propylene glycol',
        'cleared',
        dailymed(SET_NEO_CREAM, METH.pgTopical),
      ),
      ungraded(SET_NEO_CREAM, 'Emulsifying wax'),
      ungraded(SET_NEO_CREAM, 'Mineral oil'),
      ungraded(SET_NEO_CREAM, 'Petrolatum'),
      ungraded(SET_NEO_CREAM, 'Sulfuric acid'),
      ungraded(SET_NEO_CREAM, 'Sodium hydroxide'),
      cleared(SET_NEO_CREAM, 'Water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Neosporin Plus Pain Cream = Avoid. Methylparaben is High-tier. Separate formulaId from the petrolatum-only Plus Pain ointment (Clean). Propylene glycol is oral-scoped and is not scored as Moderate on this topical. Ages 2+ (under 2: ask a doctor).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: OINTMENT_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_NEO_CREAM} (draft, not verified)`],
  },
  {
    id: 'equate-antibiotic-cream-paraben',
    productName: 'Equate Antibiotic Plus Pain Relief Cream',
    brand: 'Equate',
    category: FIRST_AID,
    barcode: '681131082440',
    formulaId: 'equate-antibiotic-cream-paraben',
    audience: ADULT,
    minAge: 2,
    form: 'cream',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Neomycin sulfate', strength: '3.5mg / g' },
      { name: 'Polymyxin B sulfate', strength: '10,000 units / g' },
      { name: 'Pramoxine hydrochloride', strength: '10mg / g' },
    ],
    inactiveIngredients: [
      flag('Methylparaben', 'high', dailymed(SET_EQ_CREAM, METH.parabens)),
      flag(
        'Propylene glycol',
        'cleared',
        dailymed(SET_EQ_CREAM, METH.pgTopical),
      ),
      ungraded(SET_EQ_CREAM, 'Cetearyl alcohol'),
      ungraded(SET_EQ_CREAM, 'Mineral oil'),
      ungraded(SET_EQ_CREAM, 'Petrolatum'),
      ungraded(SET_EQ_CREAM, 'Polysorbate 60'),
      cleared(SET_EQ_CREAM, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Equate antibiotic cream = Avoid. Methylparaben is High-tier. setid e08b427f. Polysorbate 60 is not PS80 / PS20 and is not in Methodology §5 (ungraded) — Avoid already stands on the paraben. Separate from the Clean petrolatum ointments. Ages 2+ (under 2: ask a doctor).',
    retailers: ['Walmart'],
    cleanAlternatives: OINTMENT_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_EQ_CREAM} (draft, not verified)`],
  },
  {
    id: 'cortizone10-soothing-aloe',
    productName: 'Cortizone-10 Soothing Aloe Itch Relief',
    brand: 'Cortizone-10',
    category: FIRST_AID,
    barcode: '041167003916',
    formulaId: 'cortizone10-soothing-aloe',
    audience: ADULT,
    minAge: 2,
    form: 'cream',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Hydrocortisone', strength: '1%' }],
    inactiveIngredients: [
      flag('Methylparaben', 'high', dailymed(SET_C10_ALOE, METH.parabens)),
      flag('Propylparaben', 'high', dailymed(SET_C10_ALOE, METH.parabens)),
      flag(
        'Sodium lauryl sulfate',
        'cleared',
        dailymed(SET_C10_ALOE, METH.sls),
      ),
      flag(
        'Maltodextrin',
        'limited',
        dailymed(SET_C10_ALOE, METH.maltodextrin),
      ),
      ungraded(SET_C10_ALOE, 'Aloe barbadensis leaf juice'),
      ungraded(SET_C10_ALOE, 'Aluminum sulfate'),
      cleared(SET_C10_ALOE, 'Beeswax'),
      ungraded(SET_C10_ALOE, 'Calcium acetate'),
      ungraded(SET_C10_ALOE, 'Cetearyl alcohol'),
      ungraded(SET_C10_ALOE, 'Dextrin'),
      cleared(SET_C10_ALOE, 'Glycerin'),
      ungraded(SET_C10_ALOE, 'Mineral oil'),
      ungraded(SET_C10_ALOE, 'Petrolatum'),
      ungraded(SET_C10_ALOE, 'Sodium cetearyl sulfate'),
      cleared(SET_C10_ALOE, 'Water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Cortizone-10 Soothing Aloe = Avoid. Methylparaben + propylparaben are High-tier. SLS is standalone Caution (irritant, not additive-scored) and is not the Avoid driver. Creme twin 1a841bf0 is the same demerit family. Water Resistant (petrolatum only) is the independently Clean HC twin. Ages 2+ (under 2: ask a doctor).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: HC_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_C10_ALOE} (draft, not verified)`],
  },
  {
    id: 'cortizone10-cooling',
    productName: 'Cortizone-10 Cooling',
    brand: 'Cortizone-10',
    category: FIRST_AID,
    barcode: '041167003626',
    formulaId: 'cortizone10-cooling',
    audience: ADULT,
    minAge: 2,
    form: 'cream',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Hydrocortisone', strength: '1%' }],
    inactiveIngredients: [
      flag('Methylparaben', 'high', dailymed(SET_C10_COOL, METH.parabens)),
      flag('Propylparaben', 'high', dailymed(SET_C10_COOL, METH.parabens)),
      flag(
        'Maltodextrin',
        'limited',
        dailymed(SET_C10_COOL, METH.maltodextrin),
      ),
      flag(
        'Disodium EDTA',
        'cleared',
        dailymed(SET_C10_COOL, METH.edta),
      ),
      ungraded(SET_C10_COOL, 'Alcohol denat. (15%)'),
      ungraded(SET_C10_COOL, 'Aloe barbadensis leaf juice'),
      ungraded(SET_C10_COOL, 'Avena sativa (oat) kernel extract'),
      ungraded(SET_C10_COOL, 'Dextrin'),
      ungraded(SET_C10_COOL, 'Dimethicone'),
      cleared(SET_C10_COOL, 'Glycerin'),
      ungraded(
        SET_C10_COOL,
        'Hydroxyethyl acrylate / sodium acryloyldimethyl taurate copolymer',
      ),
      ungraded(SET_C10_COOL, 'Isohexadecane'),
      ungraded(SET_C10_COOL, 'Menthyl lactate'),
      ungraded(SET_C10_COOL, 'Methyl gluceth-20'),
      ungraded(SET_C10_COOL, 'Polysorbate 60'),
      ungraded(SET_C10_COOL, 'PPG-3 benzyl ether myristate'),
      ungraded(SET_C10_COOL, 'Sodium citrate'),
      cleared(SET_C10_COOL, 'Water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Cortizone-10 Cooling = Avoid. Methylparaben is High-tier (propylparaben is also on this SPL). Menthyl lactate is a cooling ester, not menthol — menthol / camphor / eucalyptol stay parked and are not invented as active-safety grades. Ages 2+ (under 2: ask a doctor).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: HC_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_C10_COOL} (draft, not verified)`],
  },
  {
    id: 'cvs-hydrocortisone-aloe',
    productName: 'CVS Health Hydrocortisone Anti-Itch with Aloe',
    brand: 'CVS Health',
    category: FIRST_AID,
    barcode: '050428088517',
    formulaId: 'cvs-hydrocortisone-aloe',
    audience: ADULT,
    minAge: 2,
    form: 'cream',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Hydrocortisone', strength: '1%' }],
    inactiveIngredients: [
      flag('Methylparaben', 'high', dailymed(SET_CVS_HC, METH.parabens)),
      flag('Propylparaben', 'high', dailymed(SET_CVS_HC, METH.parabens)),
      flag(
        'Sodium lauryl sulfate',
        'cleared',
        dailymed(SET_CVS_HC, METH.sls),
      ),
      flag(
        'Maltodextrin',
        'limited',
        dailymed(SET_CVS_HC, METH.maltodextrin),
      ),
      ungraded(SET_CVS_HC, 'Aloe barbadensis leaf extract'),
      ungraded(SET_CVS_HC, 'Aluminum sulfate'),
      cleared(SET_CVS_HC, 'Beeswax'),
      ungraded(SET_CVS_HC, 'Calcium acetate'),
      ungraded(SET_CVS_HC, 'Cetearyl alcohol'),
      ungraded(SET_CVS_HC, 'Dextrin'),
      cleared(SET_CVS_HC, 'Glycerin'),
      ungraded(SET_CVS_HC, 'Mineral oil'),
      ungraded(SET_CVS_HC, 'Petrolatum'),
      ungraded(SET_CVS_HC, 'Sodium cetearyl sulfate'),
      cleared(SET_CVS_HC, 'Water (purified)'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: CVS hydrocortisone aloe = Avoid. Parabens are High-tier; SLS is standalone Caution and is not the Avoid driver. Cortizone-10 Soothing Aloe twin pattern. Ages 2+ (under 2: do not use).',
    retailers: ['CVS'],
    cleanAlternatives: HC_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_CVS_HC} (draft, not verified)`],
  },
  {
    id: 'benadryl-itch-stopping-cream',
    productName: 'Benadryl Extra Strength Itch Stopping Cream',
    brand: 'Benadryl',
    category: FIRST_AID,
    barcode: '312547171670',
    formulaId: 'benadryl-itch-stopping-cream',
    audience: ADULT,
    minAge: 2,
    form: 'cream',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Diphenhydramine hydrochloride', strength: '2%' },
      { name: 'Zinc acetate', strength: '0.1%' },
    ],
    inactiveIngredients: [
      flag('Methylparaben', 'high', dailymed(SET_BEN_CREAM, METH.parabens)),
      flag('Propylparaben', 'high', dailymed(SET_BEN_CREAM, METH.parabens)),
      flag(
        'Polyethylene glycol monostearate 1000',
        'moderate',
        dailymed(SET_BEN_CREAM, METH.peg),
      ),
      flag(
        'Propylene glycol',
        'cleared',
        dailymed(SET_BEN_CREAM, METH.pgTopical),
      ),
      ungraded(SET_BEN_CREAM, 'Cetyl alcohol'),
      ungraded(SET_BEN_CREAM, 'Diazolidinyl urea (formaldehyde-releaser — parked)'),
      cleared(SET_BEN_CREAM, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Benadryl Extra Strength Itch Stopping Cream = Avoid. Parabens are High-tier. setid a1c1b878. Original-strength twin 920c50cb (1% DPH, same inactives) is the same Avoid family. ' +
      PARKED_FORMALDEHYDE +
      ' ' +
      PARKED_ZNO +
      ' Cooling spray / stick (alcohol / glycerin / PVP / water) is the independently Clean twin. Ages 2+ (under 2: ask a doctor).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ITCH_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_BEN_CREAM} (draft, not verified)`],
  },
  {
    id: 'caladryl-clear',
    productName: 'Caladryl Clear',
    brand: 'Caladryl',
    category: FIRST_AID,
    barcode: '301875466060',
    formulaId: 'caladryl-clear',
    audience: ADULT,
    minAge: 2,
    form: 'lotion',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Pramoxine HCl', strength: '1%' },
      { name: 'Zinc acetate', strength: '0.1%' },
    ],
    inactiveIngredients: [
      flag('Methylparaben', 'high', dailymed(SET_CALADRYL, METH.parabens)),
      flag('Propylparaben', 'high', dailymed(SET_CALADRYL, METH.parabens)),
      flag('Fragrance', 'cleared', dailymed(SET_CALADRYL, METH.fragrance)),
      flag(
        'Propylene glycol',
        'cleared',
        dailymed(SET_CALADRYL, METH.pgTopical),
      ),
      flag(
        'Hypromellose',
        'cleared',
        dailymed(SET_CALADRYL, METH.hypromellose),
      ),
      ungraded(SET_CALADRYL, 'SD alcohol 38-B'),
      ungraded(SET_CALADRYL, 'Camphor (parked topical active — listed inactive)'),
      cleared(SET_CALADRYL, 'Citric acid'),
      ungraded(SET_CALADRYL, 'Diazolidinyl urea (formaldehyde-releaser — parked)'),
      cleared(SET_CALADRYL, 'Glycerin'),
      ungraded(SET_CALADRYL, 'Polysorbate 40'),
      cleared(SET_CALADRYL, 'Purified water'),
      ungraded(SET_CALADRYL, 'Sodium citrate'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Caladryl Clear = Avoid. Fragrance + parabens — Avoid stands on the parabens (fragrance is Caution, not Avoid alone). setid fca6f08b. ' +
      PARKED_MCE +
      ' ' +
      PARKED_FORMALDEHYDE +
      ' ' +
      PARKED_ZNO +
      ' Plain calamine is the independently Clean itch analog. Ages 2+ (under 2: ask a doctor).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Grocery'],
    cleanAlternatives: ITCH_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_CALADRYL} (draft, not verified)`],
  },
  {
    id: 'isopropyl-alcohol-dyed',
    productName: 'GNP 70% Isopropyl Alcohol with Wintergreen Oil',
    brand: 'GNP (Good Neighbor Pharmacy)',
    category: FIRST_AID,
    barcode: '087701427282',
    formulaId: 'isopropyl-alcohol-dyed',
    audience: ADULT,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Isopropyl alcohol', strength: '70%' }],
    inactiveIngredients: [
      flag('FD&C Blue No. 1', 'high', dailymed(SET_IPA_DYED, METH.dyes)),
      flag('FD&C Yellow No. 5', 'high', dailymed(SET_IPA_DYED, METH.dyes)),
      ungraded(SET_IPA_DYED, 'Methyl salicylate 0.5%'),
      cleared(SET_IPA_DYED, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Dyed isopropyl alcohol = Avoid. Blue #1 + Yellow #5 are High-tier. GNP wintergreen setid 03247512. Methyl salicylate is not in Methodology §5 (ungraded; v1.6 intake) — Avoid already stands on the dyes. Plain water-only 70% IPA is the independently Clean twin. First-aid antiseptic monograph: ages 2+ typical.',
    retailers: ['Grocery', 'Independent pharmacy'],
    cleanAlternatives: ANTISEPTIC_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_IPA_DYED} (draft, not verified)`],
  },
];
