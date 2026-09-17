// DRAFT / not verified / batch 13 kids First Aid / topical
// First Aid · audience 'kids' · recordStatus is 'unverified' on every row.
// Founder calls (locked): see notes below. Do NOT invent Clean. Methodology v1.6
// grades only — do not change locked ingredient grades.
// Homeopathic rows set productSubtype + homeopathicSubtype = 'homeopathic'.
// Barcodes omitted — do not invent UPCs. Pack sizes share formulaId.
// Form is labeled on cleanAlternatives, not a hard filter (§6).
// Not wired into Clean Picks UI. No live First Aid / Clean Picks file is
// edited from this draft. Methodology.md / PROJECT_NOTES.md are untouched.
//
// SHARED ADULT FORMULA IDs (LOCKED): kids-audience rows reuse the EXACT
// batch 12 formulaId strings when the kids SKU is the same jar. Do not
// invent a second formulaId or a second grade for that formula. Adult
// batch 12 grades are unchanged.
//   Clean (same jar): aquaphor-healing-ointment (infant diaper chart),
//   desitin-multipurpose (infant), calamine-lotion-plain (minAge 2),
//   neosporin-original-ointment, neosporin-plus-pain-ointment,
//   polysporin-ointment, equate-bacitracin-ointment,
//   equate-triple-antibiotic-pain-ointment, equate-antibiotic-oil-blend
//   (minAge 2), cortizone10-water-resistant (minAge 2),
//   hydrogen-peroxide-3, isopropyl-alcohol-plain,
//   boiron-calendula-cream, boiron-calendula-ointment (homeopathic).
//   Caution (same jar): desitin-max-strength (fragrance; ZnO parked;
//   fragrance-only SKU without talc — infant).
//   Avoid (same jar): neosporin-plus-pain-cream (methylparaben, minAge 2),
//   cortizone10-soothing-aloe, cortizone10-cooling, cvs-hydrocortisone-aloe
//   (parabens ± SLS, minAge 2), isopropyl-alcohol-dyed (dyes).
//
// BENZYL ALCOHOL (LOCKED population split): Avoid on any under-3 / infant
// labeled SKU. Caution on 2+ only if the split allows and fragrance is the
// remaining issue. No infant-labeled calamine + benzyl SPL was matched this
// batch — do not invent an infant Avoid row. The 2+ Walgreens medicated
// calamine lotion is Caution (fragrance remains; camphor parked).
//
// BALSAM PERU (LOCKED): fragrance-class Caution. Do NOT invent a new High
// row. Boudreaux's Butt Paste stays Caution.
//
// PARKED ACTIVES (LOCKED): menthol / camphor / eucalyptol stay parked
// (Methodology §5) — inactives graded only; no invented active-safety
// grades. Zinc oxide as a diaper / rash / skin-protectant active is parked
// the same way. Formaldehyde-releasers parked / out-of-scope — notes only.
//
// TOPICAL OINTMENT OILS: cottonseed / olive / cocoa / corn / castor in
// ointments are NOT the gummy seed/industrial-oil High rule.
//
// FOUNDER CALLS (LOCKED) — approved rows only:
// CLEAN — shared jars
// - KF1 Aquaphor Healing Ointment = Clean. SHARE `aquaphor-healing-ointment`.
//   Infant diaper chart (minAge 0).
// - KF2 Desitin Multi-Purpose = Clean. SHARE `desitin-multipurpose`. Infant.
// - KF3 Plain calamine lotion = Clean. SHARE `calamine-lotion-plain`. minAge 2.
// - KF4–KF9 First-aid antibiotic ointments = Clean. SHARE batch 12
//   formulaIds. minAge 2.
// - KF10 Cortizone-10 Water Resistant = Clean. SHARE
//   `cortizone10-water-resistant`. minAge 2.
// - KF11–KF12 Hydrogen peroxide 3% / plain 70% IPA = Clean. SHARE
//   `hydrogen-peroxide-3`, `isopropyl-alcohol-plain`.
// - KF13–KF14 Boiron Calendula cream / ointment = Clean. SHARE
//   `boiron-calendula-cream`, `boiron-calendula-ointment`. Homeopathic.
// CLEAN — new kids / baby formulaIds
// - KF15 Aquaphor diaper-rash ZnO = Clean. formulaId
//   `aquaphor-diaper-rash-zno`. Infant. No fragrance / no paraben.
//   Matched SPL 887e3566 (Fast Relief 40% paste). Sibling 15% 3-in-1
//   cream dec07dfc also holds fragrance-free / paraben-free — same
//   cleanliness family, not a second formulaId. ZnO parked.
// - KF16 Boudreaux's Butt Barrier = Clean IF blend holds. formulaId
//   `boudreauxs-butt-barrier`. setid 06a5af4d. Infant. Tocopherol /
//   castor / glyceryl hydroxystearate / hydrogenated castor — no
//   fragrance / no paraben on the matched SPL.
// - KF17 Equate Cortisone 1% spray = Clean. formulaId
//   `equate-cortisone-simple`. Alcohol / glycerin / water (+ dimethyl
//   isosorbide ungraded). setid 027fae33. minAge 2. Not for diaper rash.
// - KF18 Boogie Bottoms No-Rub Diaper Rash Spray = Clean IF no
//   fragrance / paraben. formulaId `boogie-bottoms-rash-spray`.
//   setid ae5eedf3. Infant. ZnO parked.
// CAUTION
// - KF19 Desitin Maximum Strength (fragrance-only, no talc) = Caution.
//   SHARE `desitin-max-strength`. Fragrance; ZnO parked. Infant.
//   Separate from the talc jar.
// - KF20 Boudreaux's Butt Paste = Caution. formulaId
//   `boudreauxs-butt-paste`. Balsam Peru = fragrance-class Caution —
//   do NOT invent High. setid 4c7e832e. ZnO parked. Infant.
// - KF21 Balmex Multi-Purpose = Caution. formulaId `balmex-multipurpose`.
//   Fragrance. setid 83a9ba1a. Infant.
// - KF22 Boogie Hands antibacterial wipes = Caution. formulaId
//   `boogie-hands-bkc`. BKC + fragrance. minAge 2.
// - KF23 Calamine Plus benzyl + fragrance = Caution on the 2+ labeled
//   lotion (benzyl split allows; fragrance remains). formulaId
//   `calamine-plus-benzyl`. Camphor parked. Walgreens medicated
//   calamine setid 33aa789e. Avoid would apply only if the carton were
//   under-3 / infant labeled — no such SPL written.
// AVOID
// - KF24 Neosporin Plus Pain Cream = Avoid. SHARE
//   `neosporin-plus-pain-cream`. Methylparaben. minAge 2.
// - KF25–KF27 Cortizone-10 Soothing Aloe / Cooling / CVS HC aloe =
//   Avoid. SHARE those batch 12 formulaIds. Parabens ± SLS. minAge 2.
// - KF28 Dyed 70% IPA = Avoid. SHARE `isopropyl-alcohol-dyed`.
// - KF29 Desitin Max + talc = Avoid. formulaId `desitin-max-talc`.
//   Talc + fragrance. setid 59728810. Infant. Separate formulaId from
//   fragrance-only `desitin-max-strength` Caution.
//
// TALLY (unverified drafts): 29 rows — Clean 18 / Caution 5 / Avoid 6.
// Independently Clean in THIS batch only: Aquaphor Healing, Desitin
// Multi-Purpose, plain calamine, Neosporin Original / Plus Pain ointments,
// Polysporin, Equate bacitracin / triple-pain / oil-blend ointments,
// Cortizone-10 Water Resistant, Equate 3% peroxide, plain 70% IPA,
// Calendula cream / ointment (homeopathic), Aquaphor diaper-rash ZnO,
// Boudreaux's Butt Barrier, Equate Cortisone simple spray, Boogie Bottoms
// rash spray. Caution / Avoid rows offer those as §6 alternatives (form
// labeled). Prefer infant Clean ointments / pastes for diaper-rash rows
// and petrolatum ointment / plain antiseptic / simple HC peers for 2+.
//
// SKIPPED (founder skip — do not invent Clean / do not write):
// - Triple Paste Exact
// - Mustela
// - Tecnu
// - VapoRub-style menthol / camphor / eucalyptol rubs
// - Prep H
// - Amazon-only SKUs
// No invented menthol / camphor / eucalyptol active-safety grades.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const FIRST_AID = 'First Aid';
const KIDS = 'kids' as const;
const HOMEOPATHIC = 'homeopathic' as const;

const METH = {
  dyes: 'Methodology §5 High-tier (synthetic dyes, including lake forms)',
  parabens: 'Methodology §5 High-tier (parabens)',
  talc: 'Methodology §5 High-tier (talc — IARC 2A; no pharma-grade exception)',
  maltodextrin: 'Methodology §5 Limited-risk (non-organic maltodextrin)',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  fragrance:
    'Methodology §5 Caution (fragrance / parfum, topical OTC — population/sensitization; standalone Caution, not additive-scored, not Avoid alone)',
  balsam:
    'Methodology §5 Caution (balsam of Peru / Myroxylon pereirae — fragrance-class sensitization; standalone Caution, not additive-scored, NOT a new High row)',
  sls:
    'Methodology §5 Caution (sodium lauryl sulfate — population/irritant; standalone Caution, not additive-scored, not Avoid)',
  bkc:
    'Methodology §5 Caution (benzalkonium chloride — contested ciliotoxicity; standalone Caution, not additive-scored, not Avoid)',
  benzyl2plus:
    'Methodology §5 Caution (benzyl alcohol — population split: Caution on 2+ labeled OTC when the carton is not under-3 / infant; standalone Caution, not additive-scored, not Avoid on this 2+ label)',
  benzylInfant:
    'Methodology §5 Avoid (benzyl alcohol — population split: Avoid on neonate / infant / under-3 labeled products; gasping-syndrome / FDA exclusion)',
  edta: 'Methodology §5 Cleared (disodium EDTA, trace preservative/stabilizer — locked v1.6)',
  tocopherols:
    'Methodology §5 Cleared (mixed tocopherols / tocopheryl acetate as antioxidants — locked v1.6)',
  castor:
    'Methodology §5 Cleared (castor oil / hydrogenated castor — oral/topical locked v1.6; not the IV Cremophor case)',
  gums: 'Methodology §5 Cleared (xanthan gum / gum arabic / guar / pectin — locked v1.6)',
  hypromellose: 'Methodology §5 Cleared (hypromellose)',
  starch: 'Methodology §5 Cleared (simple starches — corn starch / similar)',
  oils:
    'Topical ointment cottonseed / olive / cocoa / corn oils — not the gummy seed/industrial-oil High rule (Methodology §5 context scoping)',
  ungraded:
    'Not in Methodology §5 — ungraded (v1.6 intake). Mentioned as present; not graded on the spot; not used to invent Clean or Avoid',
  pgTopical:
    'Propylene glycol is oral-scoped in Methodology §5 — not scored as Moderate on this topical first-aid label',
  benzoateTopical:
    'Sodium benzoate / potassium sorbate are oral Limited in Methodology §5 — not stacked as a 3-pt Avoid on this topical wipe; draft follows the locked BKC + fragrance Caution',
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

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const CARLSTON =
  'Carlston M (ed), Classical Homeopathy, Churchill Livingstone 2003 — homeopathic eligibility is cleanliness + documented evidentiary framework only; no efficacy claim.';

const PARKED_MCE =
  'Menthol / camphor / eucalyptol as topical actives stay parked (Methodology §5) — inactives graded only; no invented active-safety grade.';

const PARKED_ZNO =
  'Zinc (oxide / acetate) as a topical / diaper-rash / skin-protectant active stays parked (Methodology §5) — inactives graded only; no invented active-safety grade.';

const SHARED_B12 =
  'Shared formulaId with adult batch 12 so the grade propagates conceptually. Do not invent a second formulaId or change the adult grade. Kids-audience row.';

// Shared adult batch 12 formulaIds — EXACT strings.
const AQUAPHOR_HEAL = 'aquaphor-healing-ointment';
const DESITIN_MP = 'desitin-multipurpose';
const CALAMINE_PLAIN = 'calamine-lotion-plain';
const NEOSPORIN_ORIG = 'neosporin-original-ointment';
const NEOSPORIN_PAIN_OINT = 'neosporin-plus-pain-ointment';
const POLYSPORIN = 'polysporin-ointment';
const EQUATE_BACITRACIN = 'equate-bacitracin-ointment';
const EQUATE_TRIPLE_PAIN = 'equate-triple-antibiotic-pain-ointment';
const EQUATE_OIL_BLEND = 'equate-antibiotic-oil-blend';
const CORTIZONE_WR = 'cortizone10-water-resistant';
const H2O2 = 'hydrogen-peroxide-3';
const IPA_PLAIN = 'isopropyl-alcohol-plain';
const CALENDULA_CREAM = 'boiron-calendula-cream';
const CALENDULA_OINT = 'boiron-calendula-ointment';
const DESITIN_MAX = 'desitin-max-strength';
const NEOSPORIN_PAIN_CREAM = 'neosporin-plus-pain-cream';
const CORTIZONE_ALOE = 'cortizone10-soothing-aloe';
const CORTIZONE_COOL = 'cortizone10-cooling';
const CVS_HC_ALOE = 'cvs-hydrocortisone-aloe';
const IPA_DYED = 'isopropyl-alcohol-dyed';

// New kids / baby formulaIds.
const AQUAPHOR_ZNO = 'aquaphor-diaper-rash-zno';
const BOUDREAUX_PASTE = 'boudreauxs-butt-paste';
const BOUDREAUX_BARRIER = 'boudreauxs-butt-barrier';
const DESITIN_MAX_TALC = 'desitin-max-talc';
const BALMEX_MP = 'balmex-multipurpose';
const EQUATE_CORT_SIMPLE = 'equate-cortisone-simple';
const BOOGIE_HANDS = 'boogie-hands-bkc';
const BOOGIE_BOTTOMS = 'boogie-bottoms-rash-spray';
const CALAMINE_BENZYL = 'calamine-plus-benzyl';

const SET_AQ_HEAL = '0a17bf6f-6114-4647-a509-65999255c37b';
const SET_DES_MP = '30f06dbb-de8c-43ee-b1ed-99ffd59dd3ab';
const SET_CALAMINE = '1a03331e-3676-451c-be22-9a547e8ae6e2';
const SET_NEO_ORIG = '0ad21575-0e2d-24c2-e063-6394a90a616e';
const SET_NEO_PAIN_OINT = '32302dcd-f3f1-408b-ae5f-e7d8b666f68f';
const SET_POLY = 'e0fcf83e-a374-4fc0-a629-873033054392';
const SET_EQ_BAC = '20908780-8803-4e19-e063-6394a90aab87';
const SET_EQ_TRIPLE = '907d44c5-cbd1-4d13-8c5c-c164f7a536e5';
const SET_EQ_OIL = '2b743271-4f58-4ba1-a04c-560f7f8a547e';
const SET_C10_WR = '118e55e7-241f-44c4-959e-09bf6221bd77';
const SET_H2O2 = 'e19228e9-6f87-456e-a222-f979a234d589';
const SET_IPA_PLAIN = '21f125a0-73e8-34a9-e063-6294a90a8396';
const SET_CAL_CREAM = '2ed51803-5ec2-4163-ad12-2bf441551f07';
const SET_CAL_OINT = '28c76b61-2a0c-0f52-e054-00144ff8d46c';
const SET_DES_MAX = '1590101a-c968-fca5-e063-6394a90a7ccc';
const SET_NEO_CREAM = '23222e54-d793-4d79-980e-550e32a95742';
const SET_C10_ALOE = '1962abb3-6ca7-4934-9efe-20287b1c2a5b';
const SET_C10_COOL = '14d9fce2-9f54-4204-83cb-161de8a303f0';
const SET_CVS_HC = '546a1b8a-8254-432a-85c4-38ebee5ad568';
const SET_IPA_DYED = '03247512-7a31-4fb4-b7e0-efc337cab693';
const SET_AQ_ZNO = '887e3566-ec5d-4474-83c6-edcc0732f8d6';
const SET_AQ_ZNO_CREAM = 'dec07dfc-67a2-46ad-8fab-828488bdba15';
const SET_BOUD_PASTE = '4c7e832e-55f3-4766-98b7-29b17d741a4b';
const SET_BOUD_BARRIER = '06a5af4d-40dd-42a4-8368-4d6a772d1b3a';
const SET_DES_TALC = '59728810-4ea9-45a1-b945-5a54199e01f3';
const SET_BALMEX = '83a9ba1a-b708-47e2-a4a3-ef847e1bb792';
const SET_EQ_CORT = '027fae33-93a0-a61f-e063-6294a90a990f';
const SET_BOOGIE_HANDS = '4009eb93-cef6-a202-e063-6394a90ae61b';
const SET_BOOGIE_BOTTOMS = 'ae5eedf3-86c2-69bd-e053-2995a90a43e5';
const SET_CALAMINE_BENZYL = '33aa789e-c282-409e-94c7-7287ed3e4ddf';

const DIAPER_ALTS: CleanAlternative[] = [
  alt(
    AQUAPHOR_HEAL,
    'Independently Clean kids / infant skin-protectant in this batch (Aquaphor Healing Ointment, shared adult formulaId, minAge 0). Form: ointment — labeled, not a hard filter (§6).',
  ),
  alt(
    DESITIN_MP,
    'Independently Clean kids / infant diaper-rash analog (Desitin Multi-Purpose, fragrance-free, minAge 0). Form: ointment — labeled, not a hard filter (§6).',
  ),
  alt(
    AQUAPHOR_ZNO,
    'Independently Clean infant zinc-oxide diaper paste in this batch (Aquaphor Fast Relief, no fragrance / no paraben). Form: paste — labeled, not a hard filter (§6). ZnO parked.',
  ),
];

const DIAPER_ALTS_PLUS: CleanAlternative[] = [
  ...DIAPER_ALTS,
  alt(
    BOUDREAUX_BARRIER,
    'Independently Clean infant barrier ointment in this batch (Boudreaux\'s Butt Barrier, no balsam Peru / no fragrance). Form: ointment — labeled, not a hard filter (§6).',
  ),
  alt(
    BOOGIE_BOTTOMS,
    'Independently Clean infant diaper-rash spray in this batch (Boogie Bottoms, fragrance-free / paraben-free). Form: topical spray — labeled, not a hard filter (§6).',
  ),
];

const OINTMENT_ALTS: CleanAlternative[] = [
  alt(
    NEOSPORIN_PAIN_OINT,
    'Independently Clean kids first-aid ointment in this batch (Neosporin Plus Pain Relief, petrolatum only, minAge 2). Form: ointment — labeled, not a hard filter (§6).',
  ),
  alt(
    CALENDULA_OINT,
    'Independently Clean kids First Aid analog (Boiron Calendula Ointment, homeopathic, minAge 1). Form: ointment — labeled, not a hard filter (§6). Cleanliness only; no efficacy claim.',
  ),
];

const HC_ALTS: CleanAlternative[] = [
  alt(
    CORTIZONE_WR,
    'Independently Clean kids hydrocortisone analog in this batch (Cortizone-10 Water Resistant, petrolatum only, minAge 2). Form: ointment — labeled, not a hard filter (§6).',
  ),
  alt(
    EQUATE_CORT_SIMPLE,
    'Independently Clean kids hydrocortisone analog (Equate Cortisone 1% spray, alcohol / glycerin / water, minAge 2). Form: topical spray — labeled, not a hard filter (§6). Not for diaper rash.',
  ),
];

const ITCH_ALTS: CleanAlternative[] = [
  alt(
    CALAMINE_PLAIN,
    'Independently Clean kids itch analog in this batch (plain calamine lotion, no fragrance / no benzyl alcohol, minAge 2). Form: lotion — labeled, not a hard filter (§6).',
  ),
  alt(
    CALENDULA_CREAM,
    'Independently Clean kids First Aid analog (Boiron Calendula Cream, homeopathic, minAge 1). Form: cream — labeled, not a hard filter (§6). Cleanliness only; no efficacy claim.',
  ),
];

const ANTISEPTIC_ALTS: CleanAlternative[] = [
  alt(
    H2O2,
    'Independently Clean kids antiseptic analog in this batch (Equate Hydrogen Peroxide 3%, water only). Form: liquid — labeled, not a hard filter (§6).',
  ),
  alt(
    IPA_PLAIN,
    'Independently Clean kids antiseptic analog (Walgreens 70% Isopropyl Alcohol, water only). Form: liquid — labeled, not a hard filter (§6).',
  ),
];

export const BATCH13_KIDS_FIRST_AID: RatingRecord[] = [
  // ── Clean — shared adult jars ────────────────────────────
  {
    id: AQUAPHOR_HEAL,
    productName: 'Aquaphor Healing Ointment',
    brand: 'Aquaphor',
    category: FIRST_AID,
    barcode: '072140019457',
    formulaId: AQUAPHOR_HEAL,
    audience: KIDS,
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
      'FOUNDER CALL: Aquaphor Healing Ointment = Clean kids / infant twin of the adult batch 12 formula. ' +
      SHARED_B12 +
      ' setid 0a17bf6f — mineral oil / ceresin / lanolin alcohol / panthenol / glycerin / bisabolol. Those unlisted-in-§5 inactives are ungraded (v1.6 intake), not Clean-blockers. No fragrance / no paraben. Skin-protectant / diaper-rash directions have no lower-age floor (minAge 0 — infant diaper chart). Diaper-rash Fast Relief / 3-in-1 ZnO SKUs are a separate kids formulaId.',
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
    audience: KIDS,
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
      'FOUNDER CALL: Desitin Multi-Purpose = Clean kids / infant twin of the adult batch 12 formula — mineral oil / paraffin / cocoa butter / tocopherol blend holds. ' +
      SHARED_B12 +
      ' Active is petrolatum, not zinc oxide (Max Strength fragrance-only is the Caution twin; Max + talc is a separate Avoid formulaId). Cocoa butter is topical ointment oil, not the gummy seed-oil High rule. No lower-age floor on the diaper-rash chart (minAge 0).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [`DailyMed setid ${SET_DES_MP} (draft, not verified)`],
  },
  {
    id: CALAMINE_PLAIN,
    productName: 'Calamine Lotion',
    brand: 'Family Dollar',
    category: FIRST_AID,
    barcode: '032251925559',
    formulaId: CALAMINE_PLAIN,
    audience: KIDS,
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
      'FOUNDER CALL: Plain calamine lotion = Clean kids-usable twin of the adult batch 12 formula IF bentonite / calcium hydroxide / glycerin / water holds. ' +
      SHARED_B12 +
      ' Family Dollar setid 1a03331e matches that list. ' +
      PARKED_ZNO +
      ' Fragrance / benzyl / camphor Calamine Plus lotions are a separate kids formulaId. Calamine monograph: ages 2+ (under 2: ask a doctor).',
    retailers: ['Family Dollar', 'Grocery'],
    sourcesGeneral: [`DailyMed setid ${SET_CALAMINE} (draft, not verified)`],
  },
  {
    id: NEOSPORIN_ORIG,
    productName: 'Neosporin Original Ointment',
    brand: 'Neosporin',
    category: FIRST_AID,
    barcode: '312547944892',
    formulaId: NEOSPORIN_ORIG,
    audience: KIDS,
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
      'FOUNDER CALL: Neosporin Original Ointment = Clean kids-usable twin of the adult batch 12 formula. ' +
      SHARED_B12 +
      ' Petrolatum + cottonseed / olive / cocoa oils. Topical ointment oils are not the gummy seed-oil High rule. First-aid antibiotic monograph: ages 2+ (under 2: ask a doctor). The Plus Pain cream is a separate Avoid formulaId.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [`DailyMed setid ${SET_NEO_ORIG} (draft, not verified)`],
  },
  {
    id: NEOSPORIN_PAIN_OINT,
    productName: 'Neosporin Plus Pain Relief Ointment',
    brand: 'Neosporin',
    category: FIRST_AID,
    barcode: '300810746885',
    formulaId: NEOSPORIN_PAIN_OINT,
    audience: KIDS,
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
      'FOUNDER CALL: Neosporin Plus Pain Relief Ointment = Clean kids-usable twin of the adult batch 12 formula (petrolatum only). ' +
      SHARED_B12 +
      ' Separate formulaId from the Plus Pain cream (methylparaben Avoid). Ages 2+ (under 2: ask a doctor).',
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
    audience: KIDS,
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
      'FOUNDER CALL: Polysporin ointment = Clean kids-usable twin of the adult batch 12 formula (petrolatum only). ' +
      SHARED_B12 +
      ' Neomycin-free twin of the petrolatum ointment family. Ages 2+ (under 2: ask a doctor).',
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
    audience: KIDS,
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
      'FOUNDER CALL: Equate Bacitracin Ointment = Clean kids-usable twin of the adult batch 12 formula (white petrolatum only). ' +
      SHARED_B12 +
      ' Ages 2+ (under 2: ask a doctor).',
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
    audience: KIDS,
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
      'FOUNDER CALL: Equate Triple Antibiotic + Pain ointment = Clean kids-usable twin of the adult batch 12 formula (petrolatum only). ' +
      SHARED_B12 +
      ' Separate from the Equate antibiotic cream (not written in this kids batch) and from the cocoa/cottonseed/olive oil-blend SKU. Ages 2+ (under 2: consult a doctor).',
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
    audience: KIDS,
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
      'FOUNDER CALL: Equate antibiotic oil-blend = Clean kids-usable twin of the adult batch 12 formula. ' +
      SHARED_B12 +
      ' Cocoa / cottonseed / olive / petrolatum Neosporin Original twin. Topical ointment oils are not the gummy seed-oil High rule. Ages 2+ (under 2: ask a doctor).',
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
    audience: KIDS,
    minAge: 2,
    form: 'ointment',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Hydrocortisone', strength: '1%' }],
    inactiveIngredients: [cleared(SET_C10_WR, 'Petrolatum')],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Cortizone-10 Water Resistant = Clean kids-usable twin of the adult batch 12 formula (petrolatum only). ' +
      SHARED_B12 +
      ' Separate from Soothing Aloe / Cooling (paraben Avoid). Ages 2+ (under 2: do not use, ask a doctor). External anal / genital itching chart is 12+ — not this row\'s minAge.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [`DailyMed setid ${SET_C10_WR} (draft, not verified)`],
  },
  {
    id: H2O2,
    productName: 'Equate Hydrogen Peroxide 3%',
    brand: 'Equate',
    category: FIRST_AID,
    barcode: '681131175838',
    formulaId: H2O2,
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Hydrogen peroxide', strength: '3%' }],
    inactiveIngredients: [cleared(SET_H2O2, 'Purified water')],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Hydrogen peroxide 3% = Clean kids-usable twin of the adult batch 12 formula (water only). ' +
      SHARED_B12 +
      ' Other brick-and-mortar 3% water-only bottles share this formulaId for grading. Oral-rinse / first-aid antiseptic charts on this family are ages 2+ (under 2: consult a dentist or doctor).',
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
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Isopropyl alcohol', strength: '70%' }],
    inactiveIngredients: [cleared(SET_IPA_PLAIN, 'Water')],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Plain isopropyl alcohol = Clean kids-usable twin of the adult batch 12 formula (water only). ' +
      SHARED_B12 +
      ' The wintergreen Blue #1 + Yellow #5 twin is a separate Avoid formulaId. First-aid antiseptic monograph: ages 2+ typical.',
    retailers: ['Walgreens'],
    sourcesGeneral: [`DailyMed setid ${SET_IPA_PLAIN} (draft, not verified)`],
  },
  {
    id: CALENDULA_CREAM,
    productName: 'Boiron Calendula Cream',
    brand: 'Boiron',
    category: FIRST_AID,
    barcode: '306962043568',
    formulaId: CALENDULA_CREAM,
    audience: KIDS,
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
      'FOUNDER CALL: Boiron Calendula Cream = Clean kids-usable twin of the adult batch 12 formula. ' +
      SHARED_B12 +
      ' Draft Clean on the shea / coconut / glycerin family (setid 2ed51803). Homeopathic cream — cleanliness only, no efficacy claim. ' +
      CARLSTON +
      ' Boiron topical calendula sibling charts start at 1 year (minAge 1).',
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
    audience: KIDS,
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
      'FOUNDER CALL: Boiron Calendula Ointment = Clean kids-usable twin of the adult batch 12 formula. ' +
      SHARED_B12 +
      ' White petrolatum + alcohol + water on setid 28c76b61-2a0c. The 2a0a SPL is a different cream-style base — not this row. Homeopathic ointment — cleanliness only, no efficacy claim. ' +
      CARLSTON +
      ' Sibling charts start at 1 year (minAge 1).',
    retailers: ['CVS', 'Walgreens', 'Whole Foods', 'Sprouts'],
    sourcesGeneral: [
      `DailyMed setid ${SET_CAL_OINT} (draft, not verified)`,
      CARLSTON,
    ],
  },

  // ── Clean — new kids / baby formulaIds ───────────────────
  {
    id: AQUAPHOR_ZNO,
    productName: 'Aquaphor Healing Fast Relief Diaper Rash Paste',
    brand: 'Aquaphor',
    category: FIRST_AID,
    barcode: '072140026615',
    formulaId: AQUAPHOR_ZNO,
    audience: KIDS,
    minAge: 0,
    form: 'paste',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Zinc oxide', strength: '40%' }],
    inactiveIngredients: [
      cleared(SET_AQ_ZNO, 'Glycerin'),
      ungraded(SET_AQ_ZNO, 'Caprylic/capric triglyceride'),
      ungraded(SET_AQ_ZNO, 'Octyldodecanol'),
      ungraded(
        SET_AQ_ZNO,
        'Polyglyceryl-4 diisostearate/polyhydroxystearate/sebacate',
      ),
      cleared(SET_AQ_ZNO, 'Magnesium stearate'),
      ungraded(SET_AQ_ZNO, 'Panthenol'),
      ungraded(SET_AQ_ZNO, 'Butyrospermum parkii (shea) butter'),
      cleared(SET_AQ_ZNO, 'Water'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Aquaphor diaper-rash ZnO = Clean — no fragrance / no paraben on the matched Fast Relief paste (setid 887e3566; carton: paraben and talc free, odor free). ' +
      PARKED_ZNO +
      ' Caprylic/capric triglyceride, octyldodecanol, polyglyceryl-4 blend, panthenol, and shea are not in Methodology §5 (ungraded; v1.6 intake) — not Clean-blockers. Sibling 15% 3-in-1 cream setid dec07dfc (mineral oil / glycerin / ceresin / polyglyceryl-4 / Mg stearate / panthenol / water; carton fragrance-free / paraben-free) holds the same Clean call — same formulaId family, not a second grade. Healing Ointment (petrolatum active, no ZnO) is a separate shared formulaId. Infant diaper-rash chart (minAge 0).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      `DailyMed setid ${SET_AQ_ZNO} (draft, not verified)`,
      `DailyMed setid ${SET_AQ_ZNO_CREAM} (15% 3-in-1 cream sibling; draft, not verified)`,
    ],
  },
  {
    id: BOUDREAUX_BARRIER,
    productName: "Boudreaux's Butt Paste Butt Barrier",
    brand: "Boudreaux's",
    category: FIRST_AID,
    barcode: '362103000203',
    formulaId: BOUDREAUX_BARRIER,
    audience: KIDS,
    minAge: 0,
    form: 'ointment',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Dimethicone', strength: '1%' }],
    inactiveIngredients: [
      flag(
        'Alpha-tocopherol acetate (vitamin E acetate)',
        'cleared',
        dailymed(SET_BOUD_BARRIER, METH.tocopherols),
      ),
      flag(
        'Ricinus communis (castor) seed oil',
        'cleared',
        dailymed(SET_BOUD_BARRIER, METH.castor),
      ),
      ungraded(SET_BOUD_BARRIER, 'Glyceryl hydroxystearate'),
      flag(
        'Hydrogenated castor oil',
        'cleared',
        dailymed(SET_BOUD_BARRIER, METH.castor),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Boudreaux\'s Butt Barrier = Clean IF the matched blend holds. setid 06a5af4d — tocopherol acetate / castor seed oil / glyceryl hydroxystearate / hydrogenated castor oil. No fragrance, no balsam Peru, no paraben on this SPL. Castor oil / hydrogenated castor are Cleared (v1.6 oral/topical lock), not the gummy seed-oil High rule. Glyceryl hydroxystearate is not in Methodology §5 (ungraded; v1.6 intake) — not a Clean-blocker. Original Butt Paste (balsam Peru) is a separate Caution formulaId. SPL: use with infants, children and adults (minAge 0).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      `DailyMed setid ${SET_BOUD_BARRIER} (draft, not verified)`,
    ],
  },
  {
    id: EQUATE_CORT_SIMPLE,
    productName: 'Equate Cortisone 1% Spray',
    brand: 'Equate',
    category: FIRST_AID,
    barcode: '194346121618',
    formulaId: EQUATE_CORT_SIMPLE,
    audience: KIDS,
    minAge: 2,
    form: 'topical spray',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Hydrocortisone', strength: '1%' }],
    inactiveIngredients: [
      ungraded(SET_EQ_CORT, 'Alcohol denat.'),
      ungraded(SET_EQ_CORT, 'Dimethyl isosorbide'),
      cleared(SET_EQ_CORT, 'Glycerin'),
      cleared(SET_EQ_CORT, 'Water'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Equate Cortisone simple = Clean — alcohol / glycerin / water on setid 027fae33. Dimethyl isosorbide is not in Methodology §5 (ungraded; v1.6 intake) — not a Clean-blocker. No fragrance / no paraben / no SLS. Do not use for the treatment of diaper rash (carton). Ages 2+ (under 2: ask a doctor). Water Resistant petrolatum ointment is the independently Clean HC ointment peer.',
    retailers: ['Walmart'],
    sourcesGeneral: [`DailyMed setid ${SET_EQ_CORT} (draft, not verified)`],
  },
  {
    id: BOOGIE_BOTTOMS,
    productName: 'Boogie Bottoms No-Rub Diaper Rash Spray',
    brand: 'Boogie',
    category: FIRST_AID,
    barcode: '816167012004',
    formulaId: BOOGIE_BOTTOMS,
    audience: KIDS,
    minAge: 0,
    form: 'topical spray',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Zinc oxide', strength: '25%' },
      { name: 'Dimethicone', strength: '20%' },
    ],
    inactiveIngredients: [
      ungraded(SET_BOOGIE_BOTTOMS, 'Cyclomethicone'),
      ungraded(SET_BOOGIE_BOTTOMS, 'Hexamethyldisiloxane'),
      ungraded(SET_BOOGIE_BOTTOMS, 'Lanolin'),
      ungraded(SET_BOOGIE_BOTTOMS, 'Light mineral oil'),
      ungraded(SET_BOOGIE_BOTTOMS, 'Microcrystalline wax'),
      ungraded(SET_BOOGIE_BOTTOMS, 'Vitamin A palmitate'),
      ungraded(SET_BOOGIE_BOTTOMS, 'Vitamin D3 (cholecalciferol)'),
      ungraded(SET_BOOGIE_BOTTOMS, 'White petrolatum'),
      flag(
        'Tocopherol',
        'cleared',
        dailymed(SET_BOOGIE_BOTTOMS, METH.tocopherols),
      ),
      topicalOil(SET_BOOGIE_BOTTOMS, 'Corn oil'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Boogie Bottoms rash spray = Clean IF no fragrance / paraben. setid ae5eedf3 carton: free from fragrances, dyes, parabens. ' +
      PARKED_ZNO +
      ' Cyclomethicone / hexamethyldisiloxane / lanolin / mineral oil / microcrystalline wax / vitamins A and D / petrolatum are not in Methodology §5 (ungraded; v1.6 intake). Corn oil on the structured inactive list is topical ointment oil, not the gummy seed-oil High rule. Infant diaper-rash chart (minAge 0). Boogie Hands (BKC + fragrance) is a separate Caution formulaId.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      `DailyMed setid ${SET_BOOGIE_BOTTOMS} (draft, not verified)`,
    ],
  },

  // ── Caution ──────────────────────────────────────────────
  {
    id: DESITIN_MAX,
    productName: 'Desitin Maximum Strength Zinc Oxide Diaper Rash Paste',
    brand: 'Desitin',
    category: FIRST_AID,
    barcode: '312547034234',
    formulaId: DESITIN_MAX,
    audience: KIDS,
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
      'FOUNDER CALL: Desitin Maximum Strength (fragrance-only, no talc) = Caution kids / infant twin of the adult batch 12 formula — fragrance (standalone Caution, not Avoid alone). ' +
      SHARED_B12 +
      ' ' +
      PARKED_ZNO +
      ' Corn starch on this SPL — not talc. The 1 lb jar with talc + fragrance is a separate Avoid formulaId (`desitin-max-talc`). Multi-Purpose (petrolatum active, no fragrance) is the independently Clean twin. No lower-age floor (minAge 0).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: DIAPER_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_DES_MAX} (draft, not verified)`],
  },
  {
    id: BOUDREAUX_PASTE,
    productName: "Boudreaux's Butt Paste Diaper Rash Ointment",
    brand: "Boudreaux's",
    category: FIRST_AID,
    barcode: '362103553006',
    formulaId: BOUDREAUX_PASTE,
    audience: KIDS,
    minAge: 0,
    form: 'ointment',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Zinc oxide', strength: '16%' }],
    inactiveIngredients: [
      flag(
        'Myroxylon pereirae (balsam Peru) resin',
        'cleared',
        dailymed(SET_BOUD_PASTE, METH.balsam),
      ),
      ungraded(SET_BOUD_PASTE, 'Mineral oil'),
      ungraded(SET_BOUD_PASTE, 'Paraffin'),
      ungraded(SET_BOUD_PASTE, 'Petrolatum'),
      flag(
        'Ricinus communis (castor) seed oil',
        'cleared',
        dailymed(SET_BOUD_PASTE, METH.castor),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Boudreaux\'s Butt Paste = Caution — balsam Peru is fragrance-class Caution (sensitization). Do NOT invent a High / Avoid row for balsam Peru. setid 4c7e832e. ' +
      PARKED_ZNO +
      ' Castor oil is Cleared (v1.6). Mineral oil / paraffin / petrolatum are ungraded (v1.6 intake) — not the Caution driver. Butt Barrier (no balsam) is the independently Clean twin. SPL: use with infants, children and adults (minAge 0).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: DIAPER_ALTS_PLUS,
    sourcesGeneral: [`DailyMed setid ${SET_BOUD_PASTE} (draft, not verified)`],
  },
  {
    id: BALMEX_MP,
    productName: 'Balmex Multi-Purpose Healing Ointment',
    brand: 'Balmex',
    category: FIRST_AID,
    barcode: '030103043000',
    formulaId: BALMEX_MP,
    audience: KIDS,
    minAge: 0,
    form: 'ointment',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Petrolatum', strength: '51.1%' }],
    inactiveIngredients: [
      flag('Fragrance', 'cleared', dailymed(SET_BALMEX, METH.fragrance)),
      flag(
        'Silica (silicon dioxide)',
        'cleared',
        dailymed(SET_BALMEX, METH.sio2),
      ),
      topicalOil(SET_BALMEX, 'Zea mays (corn) oil'),
      flag(
        'Tocopheryl acetate',
        'cleared',
        dailymed(SET_BALMEX, METH.tocopherols),
      ),
      ungraded(SET_BALMEX, 'Acacia farnesiana flower extract'),
      ungraded(SET_BALMEX, 'Allantoin'),
      ungraded(SET_BALMEX, 'Aloe barbadensis leaf extract'),
      ungraded(SET_BALMEX, 'Chamomilla recutita (matricaria) flower extract'),
      ungraded(SET_BALMEX, 'Cholecalciferol'),
      ungraded(SET_BALMEX, 'Cyclomethicone'),
      ungraded(SET_BALMEX, 'Dimethicone'),
      ungraded(SET_BALMEX, 'Isopropyl myristate'),
      ungraded(SET_BALMEX, 'Isopropyl palmitate'),
      ungraded(SET_BALMEX, 'Lavandula angustifolia (lavender) extract'),
      ungraded(SET_BALMEX, 'Mineral oil'),
      ungraded(SET_BALMEX, 'Polyethylene'),
      ungraded(SET_BALMEX, 'Retinyl palmitate'),
      ungraded(SET_BALMEX, 'Rosmarinus officinalis (rosemary) extract'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Balmex Multi-Purpose = Caution — fragrance (standalone Caution, not Avoid alone). setid 83a9ba1a. Silica is the SiO2 nanoparticle Caution cap (0 pts), not the verdict driver. Corn oil is topical ointment oil, not the gummy seed-oil High rule. Named botanical extracts / lavender / rosemary are not a new High row (fragrance already carries the Caution). Diaper-rash + chapped-skin carton; no lower-age floor (minAge 0). Desitin Multi-Purpose / Aquaphor Healing are the independently Clean twins.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Grocery'],
    cleanAlternatives: DIAPER_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_BALMEX} (draft, not verified)`],
  },
  {
    id: BOOGIE_HANDS,
    productName: 'Boogie Hands Antibacterial Wet Wipes',
    brand: 'Boogie',
    category: FIRST_AID,
    barcode: '816167012219',
    formulaId: BOOGIE_HANDS,
    audience: KIDS,
    minAge: 2,
    form: 'wipe',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Benzalkonium chloride', strength: '0.13%' },
    ],
    inactiveIngredients: [
      flag(
        'Fragrance',
        'cleared',
        dailymed(SET_BOOGIE_HANDS, METH.fragrance),
      ),
      flag(
        'Disodium EDTA',
        'cleared',
        dailymed(SET_BOOGIE_HANDS, METH.edta),
      ),
      flag(
        'Tocopheryl acetate',
        'cleared',
        dailymed(SET_BOOGIE_HANDS, METH.tocopherols),
      ),
      flag(
        'Potassium sorbate',
        'cleared',
        dailymed(SET_BOOGIE_HANDS, METH.benzoateTopical),
      ),
      flag(
        'Sodium benzoate',
        'cleared',
        dailymed(SET_BOOGIE_HANDS, METH.benzoateTopical),
      ),
      ungraded(SET_BOOGIE_HANDS, 'Decyl glucoside'),
      ungraded(SET_BOOGIE_HANDS, 'Aloe barbadensis leaf extract'),
      ungraded(SET_BOOGIE_HANDS, 'Phenoxyethanol'),
      cleared(SET_BOOGIE_HANDS, 'Citric acid'),
      cleared(SET_BOOGIE_HANDS, 'Purified water'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Boogie Hands = Caution — BKC + fragrance. Current wipe SPL 4009eb93 (BKC 0.13%). BKC is the labeled antimicrobial active (also the §5 BKC Caution pattern) — no invented active-safety grade. Fragrance is the inactive Caution driver (not Avoid alone). Potassium sorbate / sodium benzoate are oral Limited and are not stacked as a 3-pt Avoid on this topical wipe; draft follows the locked Caution call. Older 0.115% wipe twins (fragrance + glycerin / PG / sorbitol / aloe / EDTA) stay in the same Caution family. Children under 2: ask a doctor (minAge 2); under 6: adult supervision. Boogie Bottoms is a separate Clean diaper-rash formulaId. No independently Clean BKC wipe exists here — antiseptic alts are liquid.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ANTISEPTIC_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_BOOGIE_HANDS} (draft, not verified)`,
    ],
  },
  {
    id: CALAMINE_BENZYL,
    productName: 'Walgreens Medicated Calamine Lotion',
    brand: 'Walgreens',
    category: FIRST_AID,
    formulaId: CALAMINE_BENZYL,
    audience: KIDS,
    minAge: 2,
    form: 'lotion',
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
        dailymed(SET_CALAMINE_BENZYL, METH.fragrance),
      ),
      flag(
        'Benzyl alcohol',
        'cleared',
        dailymed(SET_CALAMINE_BENZYL, METH.benzyl2plus),
      ),
      ungraded(
        SET_CALAMINE_BENZYL,
        'Camphor (parked topical active — listed inactive)',
      ),
      ungraded(SET_CALAMINE_BENZYL, 'Alcohol'),
      flag(
        'Hydroxypropyl methylcellulose',
        'cleared',
        dailymed(SET_CALAMINE_BENZYL, METH.hypromellose),
      ),
      ungraded(SET_CALAMINE_BENZYL, 'Lavandula angustifolia (lavender) oil'),
      ungraded(SET_CALAMINE_BENZYL, 'Phenoxyethanol'),
      ungraded(SET_CALAMINE_BENZYL, 'Polysorbate 80'),
      flag(
        'Propylene glycol',
        'cleared',
        dailymed(SET_CALAMINE_BENZYL, METH.pgTopical),
      ),
      ungraded(SET_CALAMINE_BENZYL, 'Rosmarinus officinalis (rosemary) leaf oil'),
      cleared(SET_CALAMINE_BENZYL, 'Water'),
      flag('Xanthan gum', 'cleared', dailymed(SET_CALAMINE_BENZYL, METH.gums)),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Calamine Plus benzyl + fragrance = Caution on this 2+ labeled lotion (benzyl population split allows Caution; fragrance is the remaining issue — not Avoid alone). Separate new kids formulaId `calamine-plus-benzyl` — not the adult spray `calamine-plus-fragrance` (different form / inactive panel). Walgreens medicated calamine setid 33aa789e; store twins with the same benzyl + fragrance + camphor + lavender/rosemary list share this formulaId. ' +
      PARKED_MCE +
      ' Camphor is listed inactive and stays parked. Avoid would apply only if the carton were under-3 / infant labeled — no such SPL was matched this batch (do not invent). Children under 2: do not use, ask a doctor (minAge 2). Plain calamine is the independently Clean twin. Never recommend a benzyl-alcohol product as a cleaner alternative for an infant product.',
    retailers: ['Walgreens', 'CVS', 'Grocery'],
    cleanAlternatives: ITCH_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_CALAMINE_BENZYL} (draft, not verified)`,
    ],
  },

  // ── Avoid — shared adult jars + new talc jar ─────────────
  {
    id: NEOSPORIN_PAIN_CREAM,
    productName: 'Neosporin Plus Pain Relief Cream',
    brand: 'Neosporin',
    category: FIRST_AID,
    barcode: '312547237796',
    formulaId: NEOSPORIN_PAIN_CREAM,
    audience: KIDS,
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
      'FOUNDER CALL: Neosporin Plus Pain Cream = Avoid kids-usable twin of the adult batch 12 formula. Methylparaben is High-tier. ' +
      SHARED_B12 +
      ' Separate formulaId from the petrolatum-only Plus Pain ointment (Clean). Ages 2+ (under 2: ask a doctor).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: OINTMENT_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_NEO_CREAM} (draft, not verified)`],
  },
  {
    id: CORTIZONE_ALOE,
    productName: 'Cortizone-10 Soothing Aloe Itch Relief',
    brand: 'Cortizone-10',
    category: FIRST_AID,
    barcode: '041167003916',
    formulaId: CORTIZONE_ALOE,
    audience: KIDS,
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
      'FOUNDER CALL: Cortizone-10 Soothing Aloe = Avoid kids-usable twin of the adult batch 12 formula. Parabens are High-tier; SLS is standalone Caution and is not the Avoid driver. ' +
      SHARED_B12 +
      ' Water Resistant (petrolatum only) is the independently Clean HC twin. Ages 2+ (under 2: ask a doctor).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: HC_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_C10_ALOE} (draft, not verified)`],
  },
  {
    id: CORTIZONE_COOL,
    productName: 'Cortizone-10 Cooling',
    brand: 'Cortizone-10',
    category: FIRST_AID,
    barcode: '041167003626',
    formulaId: CORTIZONE_COOL,
    audience: KIDS,
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
      'FOUNDER CALL: Cortizone-10 Cooling = Avoid kids-usable twin of the adult batch 12 formula. Methylparaben is High-tier (propylparaben is also on this SPL). ' +
      SHARED_B12 +
      ' Menthyl lactate is a cooling ester, not menthol — menthol / camphor / eucalyptol stay parked. Ages 2+ (under 2: ask a doctor).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: HC_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_C10_COOL} (draft, not verified)`],
  },
  {
    id: CVS_HC_ALOE,
    productName: 'CVS Health Hydrocortisone Anti-Itch with Aloe',
    brand: 'CVS Health',
    category: FIRST_AID,
    barcode: '050428088517',
    formulaId: CVS_HC_ALOE,
    audience: KIDS,
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
      'FOUNDER CALL: CVS hydrocortisone aloe = Avoid kids-usable twin of the adult batch 12 formula. Parabens are High-tier; SLS is standalone Caution and is not the Avoid driver. ' +
      SHARED_B12 +
      ' Ages 2+ (under 2: do not use).',
    retailers: ['CVS'],
    cleanAlternatives: HC_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_CVS_HC} (draft, not verified)`],
  },
  {
    id: IPA_DYED,
    productName: 'GNP 70% Isopropyl Alcohol with Wintergreen Oil',
    brand: 'GNP (Good Neighbor Pharmacy)',
    category: FIRST_AID,
    barcode: '087701427282',
    formulaId: IPA_DYED,
    audience: KIDS,
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
      'FOUNDER CALL: Dyed isopropyl alcohol = Avoid kids-usable twin of the adult batch 12 formula. Blue #1 + Yellow #5 are High-tier. ' +
      SHARED_B12 +
      ' Plain water-only 70% IPA is the independently Clean twin. First-aid antiseptic monograph: ages 2+ typical.',
    retailers: ['Grocery', 'Independent pharmacy'],
    cleanAlternatives: ANTISEPTIC_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_IPA_DYED} (draft, not verified)`],
  },
  {
    id: DESITIN_MAX_TALC,
    productName: 'Desitin Maximum Strength Zinc Oxide Diaper Rash Paste (talc jar)',
    brand: 'Desitin',
    category: FIRST_AID,
    barcode: '074300000657',
    formulaId: DESITIN_MAX_TALC,
    audience: KIDS,
    minAge: 0,
    form: 'paste',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Zinc oxide', strength: '40%' }],
    inactiveIngredients: [
      flag('Talc', 'high', dailymed(SET_DES_TALC, METH.talc)),
      flag('Fragrance', 'cleared', dailymed(SET_DES_TALC, METH.fragrance)),
      ungraded(SET_DES_TALC, 'Petrolatum'),
      ungraded(SET_DES_TALC, 'Cod liver oil'),
      ungraded(SET_DES_TALC, 'Lanolin'),
      cleared(SET_DES_TALC, 'Glycerin'),
      ungraded(SET_DES_TALC, 'Sorbitan sesquioleate'),
      ungraded(
        SET_DES_TALC,
        'Pentaerythrityl tetra-di-t-butyl hydroxyhydrocinnamate',
      ),
      cleared(SET_DES_TALC, 'Beeswax'),
      flag(
        'Tocopheryl acetate',
        'cleared',
        dailymed(SET_DES_TALC, METH.tocopherols),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Desitin Max + talc = Avoid. Talc is High-tier (IARC 2A; no pharma-grade exception); fragrance is standalone Caution and is not needed to reach Avoid. setid 59728810 (1 lb jar inactive list includes talc + fragrance). Separate formulaId from fragrance-only `desitin-max-strength` Caution (corn starch, no talc). ' +
      PARKED_ZNO +
      ' Infant diaper-rash chart (minAge 0). Multi-Purpose / Aquaphor Healing / Aquaphor ZnO paste are the independently Clean twins.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: DIAPER_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET_DES_TALC} (draft, not verified)`],
  },
];
