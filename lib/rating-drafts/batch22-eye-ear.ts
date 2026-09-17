// DRAFT / not verified / batch 22 eye/ear leftover slice /
// founder-approved rows only / methodology untouched.
//
// Eye lubricants + redness relievers + otic leftover SKUs. Mixed
// categories · audience 'adult' · recordStatus is 'unverified' on
// every row. Founder calls (locked): see notes below. Methodology v1.6
// grades only — do not change locked ingredient grades.
// Homeopathic rows set productSubtype + homeopathicSubtype = 'homeopathic'.
// Barcodes omitted — do not invent UPCs. Pack sizes share formulaId.
// Form is labeled on cleanAlternatives, not a hard filter (§6).
// Not wired into Clean Picks UI. Do not invent Clean Picks UI changes.
// Methodology.md / PROJECT_NOTES.md are untouched.
// No Amazon-only. No Dollar Tree. No iHerb / Fullscript.
//
// CATEGORY (existing RatingRecord strings only — no dedicated eye/ear
// enum): lubricant / redness eye rows use 'Allergy' (same aisle home as
// batch 5 allergy eye drops; recent batches use the singular string).
// Otic rows use 'First Aid' (ear-drying / wax / earache first-aid aisle).
//
// NEW formulaIds (inactives do not match any drafted family — do not
// reuse Refresh / Equate PF twins, IPA 70% first-aid, or allergy-eye
// formulaIds):
// - E1 Refresh Tears PF ≠ E4 Equate PF (Refresh adds glycerin active +
//   borate / erythritol / levocarnitine / citrate buffer).
// - E4 Equate PF ≠ E10 Equate multi-dose BKC.
// - E2 Systane Ultra PF vial (a5c1c194) and PF bottle (751fb85f) share
//   inactives — one formulaId. E8 POLYQUAD bottle is a different
//   formula and is not written.
//
// FOUNDER CALLS (LOCKED) — write these rows only:
// CLEAN
// - E1 Refresh Tears PF = Clean. setid 9e1cba7b. CMC 0.5% + glycerin
//   0.9%. No preservative; borate / electrolyte buffers.
// - E2 Systane Ultra PF = Clean. setid a5c1c194 (PF single-use vials;
//   twin 751fb85f is the PF bottle with the same inactives). PEG 400
//   0.4% + PG 0.3% are lubricant ACTIVES. HonestNote must say:
//   FOUNDER CALL — PG is the lubricant active, not an oral inactive
//   Moderate demerit.
// - E3 TheraTears PF single-use = Clean. setid 797b0394. CMC 0.25%.
// - E4 Equate Lubricant Eye Drops Preservative-Free = Clean
//   (CONFIRMED PF). setid 9228a39b; NDC 49035-245. CMC 0.5%. New
//   formulaId.
// - E5 Refresh P.M. ointment = Clean. setid 24365d64. Mineral oil
//   42.5% + white petrolatum 57.3%; lanolin alcohols; labeled PF.
// - R3 Swim-Ear = Clean. setid b849acb5. Isopropyl alcohol 95%;
//   anhydrous glycerin. Otic ear drying aid.
// - R6 Similasan Earache Relief = Clean, homeopathic. setid 3b48e1d5.
//   Children under 12 consult a doctor → minAge 12.
// - R7 Hyland’s Naturals Earache Drops = Clean, homeopathic, minAge 4.
//   setid 017ed754.
// CAUTION
// - E10 Equate Lubricant Eye Drops multi-dose = Caution (BKC).
//   setid 44494842; NDC 79903-364. Prefer PF twin (E4) in
//   cleanAlternatives. Do not invent Clean Picks UI.
// - E13 Visine Red Eye Comfort = Caution. setid d7abd7cb. Active
//   tetrahydrozoline HCl 0.05%. Current SPL preservative is
//   polyquaternium-42 / polixetonium chloride, NOT BKC — do not invent
//   a BKC flag. Founder Caution is redness-reliever class + rebound.
//   Not a cleaner alternative. minAge 6 (under 2: do not use).
// - E14 Clear Eyes Redness Relief = Caution (BKC + rebound).
//   setid a26ef66e. Not a cleaner alternative.
// - R1 Debrox = Caution (PG). setid 43649ba3. Flavor is Limited.
// - R2 Equate Ear Wax Removal = Caution (PG + SLS). setid 33065ba2.
//
// TALLY (unverified drafts): 13 rows — Clean 8 / Caution 5 / Avoid 0.
// Independently Clean in THIS batch: E1 Refresh Tears PF, E2 Systane
// Ultra PF, E3 TheraTears PF, E4 Equate PF, E5 Refresh P.M., R3
// Swim-Ear, R6 Similasan Earache, R7 Hyland’s Earache. Caution eye
// rows point at in-batch PF lubricants (Equate PF first for the Equate
// BKC bottle). Redness rows are not cleaner alternatives. Caution otic
// wax rows have no Clean carbamide-peroxide analog — point at in-batch
// Clean otic peers with form labeled (§6).
//
// SKIPPED (founder FLAG / skip — do not invent / do not write):
// - E7 Refresh Tears bottle PURITE
// - E8 Systane Ultra bottle POLYQUAD
// - E9 Blink Tears sodium chlorite
// - E6 store PM ointment
// - E11–12 other store tears
// - E16 store redness
// - E17–18 eye washes
// - R4–5 Murine / Kyrosol
// - Slice 3 oils
// - iHerb / Fullscript / Amazon-only / Dollar Tree
// - Allergy eye already on main (Alaway, Zaditor, Pataday, Similasan
//   Allergy Eye)

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const ALLERGY = 'Allergy';
const FIRST_AID = 'First Aid';
const HOMEOPATHIC = 'homeopathic' as const;

const METH = {
  pg: 'Methodology §5 Moderate-risk (propylene glycol, oral)',
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  bkc:
    'Methodology §5 Caution (benzalkonium chloride — contested ciliotoxicity; standalone Caution, not additive-scored, not Avoid)',
  sls:
    'Methodology §5 Caution (sodium lauryl sulfate — population/irritant; standalone Caution, not additive-scored, not Avoid)',
  edta: 'Methodology §5 Cleared (disodium EDTA, trace preservative/stabilizer)',
  ungraded:
    'Not in Methodology §5 — ungraded (v1.6 intake). Mentioned as present; not graded on the spot; not used to invent Clean or Avoid',
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

function homeopathicFields() {
  return {
    productType: OTC,
    productSubtype: HOMEOPATHIC,
    homeopathicSubtype: HOMEOPATHIC,
  };
}

const CARLSTON =
  'Carlston M (ed), Classical Homeopathy, Churchill Livingstone 2003 — homeopathic eligibility is cleanliness + documented evidentiary framework only; no efficacy claim.';

const REFRESH_TEARS_PF = 'refresh-tears-pf';
const SYSTANE_ULTRA_PF = 'systane-ultra-pf';
const THERATEARS_PF = 'theratears-pf';
const EQUATE_EYE_PF = 'equate-lubricant-eye-pf';
const REFRESH_PM = 'refresh-pm-ointment';
const SWIM_EAR = 'swim-ear';
const SIMILASAN_EARACHE = 'similasan-earache-relief';
const HYLANDS_EARACHE = 'hylands-naturals-earache-drops';

const SET_E1 = '9e1cba7b-84ed-47f3-b19a-121992834350';
const SET_E2 = 'a5c1c194-3db5-4f18-9cd1-97f7f84c3cff';
const SET_E2_BOTTLE = '751fb85f-6683-4b0a-a650-324d4a74c5de';
const SET_E3 = '797b0394-2f0f-4733-8d20-ec5bdf3e085d';
const SET_E4 = '9228a39b-38d2-1dfc-e053-2a95a90a3c90';
const SET_E5 = '24365d64-cd94-41cc-a7e1-033102d98114';
const SET_R3 = 'b849acb5-e20b-464c-948b-8dcc51fdaf70';
const SET_R6 = '3b48e1d5-5e74-415b-a460-e4d96899dbb6';
const SET_R7 = '017ed754-9fe8-2cb5-e063-6294a90ab2f6';
const SET_E10 = '44494842-e38d-617c-e063-6294a90afaf8';
const SET_E13 = 'd7abd7cb-e094-481f-bea5-a5983e2c9ef4';
const SET_E14 = 'a26ef66e-2def-4c98-9959-d40d4cfe3108';
const SET_R1 = '43649ba3-75e0-4dcf-9172-23767dbaeda6';
const SET_R2 = '33065ba2-5ce2-4db7-9d7a-d8aa2f38a90d';

const MAJOR = ['CVS', 'Walgreens', 'Walmart', 'Target'] as const;

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const EYE_PF_ALTS: CleanAlternative[] = [
  alt(
    EQUATE_EYE_PF,
    'Independently Clean in-batch preservative-free lubricant (Equate CMC 0.5% single-use vials). Form: single-use eye drop — labeled, not a hard filter (§6).',
  ),
  alt(
    REFRESH_TEARS_PF,
    'Independently Clean in-batch Refresh Tears PF (CMC + glycerin, no preservative). Form: eye drops — labeled, not a hard filter (§6).',
  ),
  alt(
    SYSTANE_ULTRA_PF,
    'Independently Clean in-batch Systane Ultra PF (PEG 400 + PG lubricant actives, no POLYQUAD). Form: single-use eye drop — labeled, not a hard filter (§6).',
  ),
  alt(
    THERATEARS_PF,
    'Independently Clean in-batch TheraTears PF single-use (CMC 0.25%, no preservative). Form: single-use eye drop — labeled, not a hard filter (§6).',
  ),
];

function equateBkCAlts(): CleanAlternative[] {
  return [
    alt(
      EQUATE_EYE_PF,
      'Closest independently Clean same-store / same-active PF twin in this batch (Equate Lubricant Eye Drops Preservative-Free, CMC 0.5%). Prefer this PF carton over the BKC multi-dose bottle. Form: single-use eye drop vs multi-dose — labeled, not a hard filter (§6).',
    ),
    ...EYE_PF_ALTS.filter((row) => row.productId !== EQUATE_EYE_PF),
  ];
}

const REDNESS_ALTS: CleanAlternative[] = [
  alt(
    REFRESH_TEARS_PF,
    'Independently Clean in-batch PF lubricant. Form: eye drops — labeled, not a hard filter (§6). Dry-eye lubricant, not a redness-reliever replacement; this tetrahydrozoline / naphazoline class is not a cleaner alternative.',
  ),
  alt(
    EQUATE_EYE_PF,
    'Independently Clean in-batch PF lubricant (CMC 0.5% vials). Form: single-use eye drop — labeled, not a hard filter (§6). Not a redness-reliever swap.',
  ),
  alt(
    SYSTANE_ULTRA_PF,
    'Independently Clean in-batch Systane Ultra PF. Form: single-use eye drop — labeled, not a hard filter (§6). Not a redness-reliever swap.',
  ),
];

const OTIC_ALTS: CleanAlternative[] = [
  alt(
    SWIM_EAR,
    'No independently Clean carbamide-peroxide ear-wax analog exists in this batch. Closest independently Clean otic peer is Swim-Ear (isopropyl alcohol 95% drying aid). Form: otic — labeled, not a hard filter (§6); different purpose; not a wax-softener replacement.',
  ),
  alt(
    SIMILASAN_EARACHE,
    'Independently Clean in-batch homeopathic otic (Earache Relief, minAge 12). Form: otic — labeled, not a hard filter (§6). Cleanliness only; not an efficacy or wax-removal swap.',
  ),
  alt(
    HYLANDS_EARACHE,
    'Independently Clean in-batch homeopathic otic (Hyland’s Naturals Earache Drops, minAge 4). Form: otic — labeled, not a hard filter (§6). Cleanliness only; not an efficacy or wax-removal swap.',
  ),
];

export const BATCH22_EYE_EAR: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  {
    id: REFRESH_TEARS_PF,
    productName: 'Refresh Tears PF',
    brand: 'Refresh',
    category: ALLERGY,
    formulaId: REFRESH_TEARS_PF,
    audience: ADULT,
    form: 'eye drops',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Carboxymethylcellulose sodium', strength: '0.5%' },
      { name: 'Glycerin', strength: '0.9%' },
    ],
    inactiveIngredients: [
      cleared(SET_E1, 'Boric acid'),
      cleared(SET_E1, 'Calcium chloride dihydrate'),
      ungraded(SET_E1, 'Erythritol'),
      ungraded(SET_E1, 'Levocarnitine'),
      cleared(SET_E1, 'Magnesium chloride hexahydrate'),
      cleared(SET_E1, 'Potassium chloride'),
      cleared(SET_E1, 'Purified water'),
      cleared(SET_E1, 'Sodium borate decahydrate'),
      cleared(SET_E1, 'Sodium citrate dihydrate'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Refresh Tears PF = Clean. DailyMed setid 9e1cba7b (Allergan; NDC 0023-3110). Actives are CMC sodium 0.5% + glycerin 0.9%. Inactives are borate / electrolyte buffers (boric acid, calcium chloride, magnesium chloride, potassium chloride, sodium borate, sodium citrate) plus purified water — no benzalkonium chloride, no PURITE / sodium chlorite. Erythritol and levocarnitine are not in Methodology §5 (ungraded; v1.6 intake) — draft Clean follows the locked no-preservative call, not a new ingredient lock. This SPL is the PF carton (replace cap / discard 90 days after opening). The PURITE multi-dose Refresh Tears bottle (E7) is a different formula and is not this row. No numeric labeled age beyond keep-out-of-reach. Adult drugstore SKU.',
    retailers: [...MAJOR],
    sourcesGeneral: [
      `DailyMed setid ${SET_E1} (draft, not verified)`,
    ],
  },
  {
    id: SYSTANE_ULTRA_PF,
    productName: 'Systane Ultra PF',
    brand: 'Systane',
    category: ALLERGY,
    formulaId: SYSTANE_ULTRA_PF,
    audience: ADULT,
    form: 'single-use eye drop',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Polyethylene glycol 400', strength: '0.4%' },
      { name: 'Propylene glycol', strength: '0.3%' },
    ],
    inactiveIngredients: [
      ungraded(SET_E2, 'Aminomethylpropanol'),
      cleared(SET_E2, 'Boric acid'),
      ungraded(SET_E2, 'Hydroxypropyl guar'),
      cleared(SET_E2, 'Potassium chloride'),
      cleared(SET_E2, 'Purified water'),
      cleared(SET_E2, 'Sodium chloride'),
      ungraded(SET_E2, 'Sorbitol'),
      cleared(SET_E2, 'Hydrochloric acid and/or sodium hydroxide (pH adjusters)'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Systane Ultra PF = Clean. FOUNDER CALL — PG is the lubricant active, not an oral inactive Moderate demerit. DailyMed setid a5c1c194 is the PF single-use vial SPL (Alcon; PDP “ULTRA PF PRESERVATIVE-FREE”; do not reuse / once opened, discard). Twin setid 751fb85f is the PF multi-dose bottle (replace cap; discard 90 days after opening) with the same inactive list — shared formulaId, not a second grade. Actives are PEG 400 0.4% + propylene glycol 0.3% as lubricant actives — do not score oral PG Moderate or PEG contamination Moderate on those actives. Inactives have no POLYQUAD / polyquaternium-1 / BKC. Aminomethylpropanol, hydroxypropyl guar, and ophthalmic sorbitol are not in Methodology §5 as scored inactives here (ungraded; v1.6 intake; oral sugar-alcohol Limited is not applied) — draft Clean follows the locked PF call. The POLYQUAD multi-dose Systane Ultra bottle (E8) is a different formula and is not this row. No numeric labeled age beyond keep-out-of-reach. Adult drugstore SKU.',
    retailers: [...MAJOR],
    sourcesGeneral: [
      `DailyMed setid ${SET_E2} (PF single-use vials; draft, not verified)`,
      `DailyMed setid ${SET_E2_BOTTLE} (PF bottle twin, same inactives; draft, not verified)`,
    ],
  },
  {
    id: THERATEARS_PF,
    productName: 'TheraTears PF (Single-Use)',
    brand: 'TheraTears',
    category: ALLERGY,
    formulaId: THERATEARS_PF,
    audience: ADULT,
    form: 'single-use eye drop',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Carboxymethylcellulose sodium', strength: '0.25%' },
    ],
    inactiveIngredients: [
      cleared(SET_E3, 'Boric acid'),
      cleared(SET_E3, 'Calcium chloride'),
      cleared(SET_E3, 'Magnesium chloride'),
      cleared(SET_E3, 'Potassium chloride'),
      cleared(SET_E3, 'Sodium bicarbonate'),
      cleared(SET_E3, 'Sodium borate'),
      cleared(SET_E3, 'Sodium chloride'),
      cleared(SET_E3, 'Sodium phosphate'),
      cleared(SET_E3, 'Water'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: TheraTears PF single-use = Clean. DailyMed setid 797b0394. Active is CMC 0.25%. SPL states this product contains no preservatives (single-use vials; do not reuse / discard leftover). Electrolyte / borate / bicarbonate / phosphate buffer only — no BKC. Separate formulaId from Refresh Tears PF (different CMC strength, no glycerin active) and from Equate PF. No numeric labeled age beyond keep-out-of-reach. Adult drugstore SKU.',
    retailers: [...MAJOR],
    sourcesGeneral: [
      `DailyMed setid ${SET_E3} (draft, not verified)`,
    ],
  },
  {
    id: EQUATE_EYE_PF,
    productName: 'Equate Lubricant Eye Drops Preservative-Free',
    brand: 'Equate',
    category: ALLERGY,
    formulaId: EQUATE_EYE_PF,
    audience: ADULT,
    form: 'single-use eye drop',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Carboxymethylcellulose sodium', strength: '0.5%' },
    ],
    inactiveIngredients: [
      cleared(SET_E4, 'Calcium chloride'),
      cleared(SET_E4, 'Hydrochloric acid and/or sodium hydroxide (pH adjusters)'),
      cleared(SET_E4, 'Magnesium chloride'),
      cleared(SET_E4, 'Potassium chloride'),
      cleared(SET_E4, 'Purified water'),
      cleared(SET_E4, 'Sodium chloride'),
      cleared(SET_E4, 'Sodium lactate'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Equate Lubricant Eye Drops Preservative-Free = Clean (CONFIRMED PF). DailyMed setid 9228a39b; NDC 49035-245. Active is CMC 0.5%. Inactives: calcium chloride, magnesium chloride, potassium chloride, sodium chloride, purified water, sodium lactate, HCl / NaOH pH adjusters — NO preservative. New formulaId — not identical to Refresh Tears PF (that SPL adds glycerin as a second active plus borate / erythritol / levocarnitine / citrate). Separate formulaId from the Equate multi-dose BKC bottle (E10). Single-use vials (do not reuse / discard). No numeric labeled age beyond keep-out-of-reach. Walmart SKU.',
    retailers: ['Walmart'],
    sourcesGeneral: [
      `DailyMed setid ${SET_E4} (NDC 49035-245; draft, not verified)`,
    ],
  },
  {
    id: REFRESH_PM,
    productName: 'Refresh P.M. Lubricant Eye Ointment',
    brand: 'Refresh',
    category: ALLERGY,
    formulaId: REFRESH_PM,
    audience: ADULT,
    form: 'ointment',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Mineral oil', strength: '42.5%' },
      { name: 'White petrolatum', strength: '57.3%' },
    ],
    inactiveIngredients: [ungraded(SET_E5, 'Lanolin alcohols')],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Refresh P.M. ointment = Clean. DailyMed setid 24365d64 (Allergan). Actives are mineral oil 42.5% + white petrolatum 57.3%. Only inactive is lanolin alcohols (not in Methodology §5 — ungraded; v1.6 intake; not used to invent Clean). Carton / PDP is labeled preservative-free. Nighttime lubricant ointment — not a store-brand PM ointment (E6 skipped). Contains lanolin. No numeric labeled age beyond keep-out-of-reach. Adult drugstore SKU.',
    retailers: [...MAJOR],
    sourcesGeneral: [
      `DailyMed setid ${SET_E5} (draft, not verified)`,
    ],
  },
  {
    id: SWIM_EAR,
    productName: 'Swim-Ear',
    brand: 'Swim-Ear',
    category: FIRST_AID,
    formulaId: SWIM_EAR,
    audience: ADULT,
    form: 'otic',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Isopropyl alcohol', strength: '95%' }],
    inactiveIngredients: [cleared(SET_R3, 'Anhydrous glycerin')],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Swim-Ear = Clean. DailyMed setid b849acb5 (Fougera). Active is isopropyl alcohol 95% (ear drying aid). Only inactive is anhydrous glycerin 5% base. Flammable — keep away from fire or flame. Do not reuse the batch 12 70% IPA-in-water first-aid formulaId (different strength and vehicle). Directions: 4 to 5 drops in each affected ear. No numeric labeled age beyond keep-out-of-reach. Adult drugstore SKU.',
    retailers: [...MAJOR],
    sourcesGeneral: [
      `DailyMed setid ${SET_R3} (draft, not verified)`,
    ],
  },
  {
    id: SIMILASAN_EARACHE,
    productName: 'Similasan Earache Relief',
    brand: 'Similasan',
    category: FIRST_AID,
    formulaId: SIMILASAN_EARACHE,
    audience: ADULT,
    minAge: 12,
    form: 'otic',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Chamomilla', strength: '10X HPUS' },
      { name: 'Mercurius solubilis', strength: '15X HPUS' },
      { name: 'Sulphur', strength: '12X HPUS' },
    ],
    inactiveIngredients: [
      cleared(SET_R6, 'Purified water'),
      cleared(SET_R6, 'Vegetable glycerin'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Similasan Earache Relief = Clean. DailyMed setid 3b48e1d5. HPUS Chamomilla 10X / Mercurius solubilis 15X / Sulphur 12X. Inactives are purified water + vegetable glycerin only — no BKC, no PG. Homeopathic otic — cleanliness only, no efficacy claim. ' +
      CARLSTON +
      ' Directions: children under 12 years of age consult a doctor → minAge 12. For use in the ear only. Not Similasan Allergy Eye (already on main).',
    retailers: [...MAJOR, 'Sprouts'],
    sourcesGeneral: [
      `DailyMed setid ${SET_R6} (draft, not verified)`,
      CARLSTON,
    ],
  },
  {
    id: HYLANDS_EARACHE,
    productName: "Hyland's Naturals Earache Drops",
    brand: "Hyland's",
    category: FIRST_AID,
    formulaId: HYLANDS_EARACHE,
    audience: ADULT,
    minAge: 4,
    form: 'otic',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Belladonna', strength: '30C HPUS' },
      { name: 'Calcarea carbonica', strength: '30C HPUS' },
      { name: 'Chamomilla', strength: '30C HPUS' },
      { name: 'Lycopodium', strength: '30C HPUS' },
      { name: 'Pulsatilla', strength: '30C HPUS' },
      { name: 'Sulphur', strength: '30C HPUS' },
    ],
    inactiveIngredients: [
      cleared(SET_R7, 'Citric acid'),
      cleared(SET_R7, 'Glycerin'),
      cleared(SET_R7, 'Purified water'),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: Hyland’s Naturals Earache Drops = Clean. DailyMed setid 017ed754. Homeopathic otic (Belladonna / Calcarea carbonica / Chamomilla / Lycopodium / Pulsatilla / Sulphur 30C HPUS). Inactives: citric acid, glycerin (SPL spelling Glycerine), purified water — no BKC, no PG. Cleanliness only, no efficacy claim. ' +
      CARLSTON +
      ' Labeled ages 4 years and over → minAge 4. Adult leftover-slice catalog row. Do not use with ear tubes, damaged eardrums, or after ear surgery. Keep away from eyes.',
    retailers: [...MAJOR],
    sourcesGeneral: [
      `DailyMed setid ${SET_R7} (draft, not verified)`,
      CARLSTON,
    ],
  },

  // ── Caution ──────────────────────────────────────────────
  {
    id: 'equate-lubricant-eye-bkc',
    productName: 'Equate Lubricant Eye Drops (Multi-Dose)',
    brand: 'Equate',
    category: ALLERGY,
    formulaId: 'equate-lubricant-eye-bkc',
    audience: ADULT,
    form: 'multi-dose eye drop',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Carboxymethylcellulose sodium', strength: '0.5%' },
    ],
    inactiveIngredients: [
      flag('Benzalkonium chloride', 'cleared', dailymed(SET_E10, METH.bkc)),
      cleared(SET_E10, 'Boric acid'),
      cleared(SET_E10, 'Calcium chloride hydrate (dihydrate)'),
      cleared(SET_E10, 'Hydrochloric acid and/or sodium hydroxide (pH adjusters)'),
      cleared(SET_E10, 'Magnesium chloride'),
      cleared(SET_E10, 'Potassium chloride'),
      cleared(SET_E10, 'Sodium borate'),
      cleared(SET_E10, 'Sodium chloride'),
      cleared(SET_E10, 'Water for injection'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Equate Lubricant Eye Drops multi-dose = Caution (BKC). DailyMed setid 44494842; NDC 79903-364. Active is CMC 0.5%. Inactive list includes benzalkonium chloride — standalone Caution (not Avoid, not additive-scored). Separate formulaId from Equate PF (E4). Prefer the PF twin as the cleaner alternative in carousel notes (cleanAlternatives) — do not invent Clean Picks UI changes. No numeric labeled age beyond keep-out-of-reach. Walmart SKU.',
    retailers: ['Walmart'],
    cleanAlternatives: equateBkCAlts(),
    sourcesGeneral: [
      `DailyMed setid ${SET_E10} (NDC 79903-364; draft, not verified)`,
    ],
  },
  {
    id: 'visine-red-eye-comfort',
    productName: 'Visine Red Eye Comfort',
    brand: 'Visine',
    category: ALLERGY,
    formulaId: 'visine-red-eye-comfort',
    audience: ADULT,
    minAge: 6,
    form: 'multi-dose eye drop',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Tetrahydrozoline HCl', strength: '0.05%' },
    ],
    inactiveIngredients: [
      ungraded(SET_E13, 'Polyquaternium-42 (polixetonium chloride)'),
      cleared(SET_E13, 'Ascorbic acid'),
      cleared(SET_E13, 'Boric acid'),
      cleared(SET_E13, 'Dextrose'),
      cleared(SET_E13, 'Glycerin'),
      cleared(SET_E13, 'Glycine'),
      cleared(SET_E13, 'Magnesium chloride'),
      cleared(SET_E13, 'Potassium chloride'),
      cleared(SET_E13, 'Purified water'),
      cleared(SET_E13, 'Sodium borate'),
      cleared(SET_E13, 'Sodium citrate'),
      cleared(SET_E13, 'Sodium lactate'),
      cleared(SET_E13, 'Sodium phosphate dibasic'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Visine Red Eye Comfort = Caution + rebound-redness. Not a cleaner alternative. DailyMed setid d7abd7cb. Active is tetrahydrozoline HCl 0.05%. Current DailyMed inactive list has polyquaternium-42 / polixetonium chloride, NOT benzalkonium chloride — do not invent a BKC flag that is not on the SPL. Methodology §5 names BKC as the Caution preservative; this SPL preservative is polyquaternium-42 (ungraded; v1.6 intake; flagged as present, not scored as BKC). Founder Caution is the redness-reliever class + rebound (label: overuse may cause more eye redness) — not a BKC call. Ages 6+ (children under 6: consult a doctor; under 2: do not use).',
    retailers: [...MAJOR],
    cleanAlternatives: REDNESS_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_E13} (draft, not verified)`,
    ],
  },
  {
    id: 'clear-eyes-redness-relief',
    productName: 'Clear Eyes Redness Relief',
    brand: 'Clear Eyes',
    category: ALLERGY,
    formulaId: 'clear-eyes-redness-relief',
    audience: ADULT,
    form: 'multi-dose eye drop',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Naphazoline HCl', strength: '0.012%' },
      { name: 'Glycerin', strength: '0.25%' },
    ],
    inactiveIngredients: [
      flag('Benzalkonium chloride', 'cleared', dailymed(SET_E14, METH.bkc)),
      cleared(SET_E14, 'Boric acid'),
      flag('Edetate disodium', 'cleared', dailymed(SET_E14, METH.edta)),
      cleared(SET_E14, 'Purified water'),
      cleared(SET_E14, 'Sodium borate'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Clear Eyes Redness Relief = Caution (BKC + rebound). Not a cleaner alternative. DailyMed setid a26ef66e. Actives are naphazoline HCl 0.012% + glycerin 0.25% (lubricant). Inactives: benzalkonium chloride, boric acid, edetate disodium, purified water, sodium borate. BKC is standalone Caution (not Avoid). Label: overuse may produce increased redness of the eye. No numeric labeled age beyond keep-out-of-reach (unlike Visine’s 6+ chart). Adult drugstore SKU. Do not treat this redness reliever as a Clean PF lubricant swap.',
    retailers: [...MAJOR],
    cleanAlternatives: REDNESS_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_E14} (draft, not verified)`,
    ],
  },
  {
    id: 'debrox-earwax-removal',
    productName: 'Debrox Earwax Removal Aid',
    brand: 'Debrox',
    category: FIRST_AID,
    barcode: '042037104788',
    formulaId: 'debrox-earwax-removal',
    audience: ADULT,
    minAge: 12,
    form: 'otic',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Carbamide peroxide', strength: '6.5%' }],
    inactiveIngredients: [
      flag('Propylene glycol', 'moderate', dailymed(SET_R1, METH.pg)),
      flag('Flavor', 'limited', dailymed(SET_R1, METH.flavors)),
      cleared(SET_R1, 'Citric acid'),
      cleared(SET_R1, 'Glycerin'),
      ungraded(SET_R1, 'Sodium lauroyl sarcosinate'),
      cleared(SET_R1, 'Water'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Debrox = Caution for PG. DailyMed setid 43649ba3. Active is carbamide peroxide 6.5%. Inactives: citric acid, flavor (Limited), glycerin, propylene glycol, sodium lauroyl sarcosinate, water. Methodology §5 scopes PG as oral Moderate; founder locked Caution on this otic inactive (do not treat as topical-unscored Clean). Flavor is Limited when listed. Sodium lauroyl sarcosinate is not sodium lauryl sulfate and is not in Methodology §5 (ungraded; not an SLS Caution). Children under 12: consult a doctor → minAge 12. For use in the ear only.',
    retailers: [...MAJOR],
    cleanAlternatives: OTIC_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_R1} (draft, not verified)`,
    ],
  },
  {
    id: 'equate-ear-wax-removal',
    productName: 'Equate Ear Wax Removal Drops',
    brand: 'Equate',
    category: FIRST_AID,
    formulaId: 'equate-ear-wax-removal',
    audience: ADULT,
    minAge: 12,
    form: 'otic',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Carbamide peroxide', strength: '6.5%' }],
    inactiveIngredients: [
      flag('Propylene glycol', 'moderate', dailymed(SET_R2, METH.pg)),
      flag(
        'Sodium lauryl sulfate',
        'cleared',
        dailymed(SET_R2, METH.sls),
      ),
      cleared(SET_R2, 'Citric acid'),
      cleared(SET_R2, 'Glycerin'),
      cleared(SET_R2, 'Sodium citrate'),
      cleared(SET_R2, 'Tartaric acid'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Equate Ear Wax Removal = Caution (PG + SLS). DailyMed setid 33065ba2. Active is carbamide peroxide 6.5%. Inactives: citric acid, glycerin, propylene glycol, sodium citrate, sodium lauryl sulfate, tartaric acid. Methodology §5 scopes PG as oral Moderate; founder locked Caution on this otic PG. SLS is standalone Caution (not Avoid). Separate formulaId from Debrox (Debrox has flavor + sodium lauroyl sarcosinate, not SLS). Children under 12: consult a doctor → minAge 12. Walmart SKU. For use in the ear only.',
    retailers: ['Walmart'],
    cleanAlternatives: OTIC_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_R2} (draft, not verified)`,
    ],
  },
];
