// DRAFT / not verified / batch 66 KYR6 held-row WRITE /
// methodology v1.6 + current main §5 exact. Additive / “also
// appears as” / locked exact-INCI rows only. No invented grades.
// No cousin-match. Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. The six held DailyMed / printed-DF holes ONLY.
// recordStatus is 'unverified' on every row. Internal keys only:
// clean | caution | avoid. UPC attached only when carton / store
// PDP / DailyMed / DSLD / UPC database has a real barcode — no
// invented codes. NDC ≠ UPC. Missing code ≠ no row (omit
// barcode). Pack sizes of the same name+form+inactives share
// formulaId. Form is labeled on cleanAlternatives, not a hard
// filter (§6). Search wiring only. Not wired into Clean Picks
// UI. No photos. Letter tiles only on new ids. No fake Clean
// alts. No methodology wipe. No new §5 stamps (cetyl alcohol
// is already §5 Cleared Sept 15 — use Cleared; do not invent;
// do not cousin-ask). PROJECT_NOTES tally-only (do not wipe
// LIVE NOW).
//
// REUSE first — match brand+name+form+strength for product ids;
// same inactives share formulaId across store siblings.
//
// DO NOT REOPEN / DO NOT CLONE:
// batch65 20 new / 10 reuse · equate-es-pain-reliever 100-ct
// white · Walgreens prenatal coated · Assured no-panel ·
// Rexall · Open Nature · Amazon house 30/54/56/61–63 ·
// Thrive 27/52/59/60/64 · Sprouts stash · Nice! no-OI ·
// Member’s Mark conflicted panels · Kirkland guaifenesin-only
// delisted · pain-rub 41–48.
//
// LOCKS used (exact §5): cetyl alcohol = Cleared fatty-alcohol
// family (Sept 15; already on main — not a new token).
// squalane = Cleared. Light mineral oil / white petrolatum =
// Cleared topical occlusive. Vitamin E / alpha-tocopherol =
// Cleared mixed-tocopherols (≠ tocopheryl acetate). Blue #1
// aluminum lake = High → Avoid. IPA 95% is the otic ACTIVE
// (not an oral Limited vehicle demerit). Glycerin / vegetable
// glycerin = Cleared. Lanolin alcohol = Caution (reuse
// `store-pm-ointment-lanolin-alcohol`). SiO2 / colloidal SiO2
// = 0-pt Caution cap when present on the printed panel.
// Maltodextrin Limited. Limited-only never Avoid. Avoid needs
// High. Softgel / topical oil fill ≠ gummy seed-oil High.
// Display keys stay clean / caution / avoid.
//
// TALLY (unverified drafts in THIS file): 6 rows — Clean 3 /
// Caution 2 / Avoid 1. NEW 6 / REUSE-formula 3 / SKIPPED 0
// (held write only; batch65 skip pile stays closed).
//
// Independently Clean analogs already on main (not cloned):
// family-wellness-triple-antibiotic-pain ·
// amazon-basic-care-triple-pain-ointment ·
// swim-ear · similasan-earache-relief ·
// equate-lubricant-eye-pf · refresh-tears-pf ·
// hylands-calms-forte · coldcalm-meltaways.
//
// TALLY is asserted at the bottom of this file.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const HOMEOPATHIC = 'homeopathic' as const;
const UNVERIFIED_NOTE = 'draft, not verified';

const ALLERGY = 'Allergy';
const COLD_FLU = 'Cold & Flu';
const FIRST_AID = 'First Aid';
const SLEEP = 'Sleep';

const UNISOM_DOXY = 'unisom-sleeptabs-doxylamine';
const SWIM_EAR = 'swim-ear';
const STORE_PM_LANOLIN = 'store-pm-ointment-lanolin-alcohol';
const FW_TRIPLE_ORIGINAL = 'family-wellness-triple-original';
const TC_EAR_RELIEF = 'topcare-ear-relief';
const DG_GUAIF_IR = 'dg-health-guaifenesin-ir';

const EQUATE_EYE_PF = 'equate-lubricant-eye-pf';
const REFRESH_TEARS_PF = 'refresh-tears-pf';
const CALMS_FORTE = 'hylands-calms-forte';
const COLDCALM = 'coldcalm-meltaways';

const SET = {
  fw041: '915759af-0d4f-6a87-e053-2a95a90acbd6',
  kirkSleep: '74a728e1-9ca1-4219-9427-b503ab0480b4',
  tcSwim: '9dccbc25-d954-f917-e053-2a95a90a0eff',
  tcEar: '2e8422f3-546a-4d09-84c0-4aa809ceaa62',
  walPm: '6bb68dc4-da71-4134-9ec4-9c4faecb3b88',
  dgIr: 'f60a9d1b-7a63-43d3-b843-e1f31cf78873',
} as const;

const SIO2_TAP =
  'Silicon dioxide / silica is the 0-pt nanoparticle Caution cap (EFSA 2018 data-gap). It does not push Avoid.';

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const SEDATING =
  'First-generation / sedating antihistamine — cleanliness note only; next-day drowsiness is a use note, not an invented active-safety grade.';

const CARLSTON =
  'Carlston M (ed), Classical Homeopathy, Churchill Livingstone 2003 — homeopathic eligibility is cleanliness + documented evidentiary framework only; no efficacy claim.';

const METH = {
  dyes: 'Methodology §5 High-tier (synthetic dyes, including lake forms)',
  sio2: `Methodology §5 Precautionary (silicon dioxide / silica — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points). ${SIO2_TAP}`,
  maltodextrin:
    'Methodology §5 Limited-risk (maltodextrin — organic or non-organic; same Limited)',
  lanolinAlcohol:
    'Methodology §5 Caution (lanolin alcohol / lanolin alcohols — exact token; same Caution as lanolin / wool-alcohol family; standalone Caution, not Avoid; locked Sept 16, 2026)',
  fattyAlcohol:
    'Methodology §5 Cleared (stearyl alcohol / cetearyl alcohol / cetyl alcohol — fatty-alcohol family; cetyl alcohol already locked Cleared Sept 15, 2026 — not a new token)',
  squalane: 'Methodology §5 Cleared (squalane — exact INCI; locked Sept 15, 2026)',
  mineralOil:
    'Methodology §5 Cleared (paraffin + mineral oil as topical ointment occlusive — petrolatum neighborhood; tap: not an oral oil)',
  petrolatum:
    'Methodology §5 Cleared (petrolatum / white petrolatum — topical occlusive)',
  tocopherols:
    'Methodology §5 Cleared (mixed tocopherols / D-Alpha-Tocopherol / alpha-tocopherol as antioxidants — locked v1.6). Distinct from Caution tocopheryl acetate.',
  stearic:
    'Methodology §5 Cleared (magnesium stearate / stearic acid / calcium stearate / vegetable stearate)',
  cellulose:
    'Methodology §5 Cleared (microcrystalline cellulose / croscarmellose sodium / cellulose gum)',
  ssg: 'Methodology §5 Cleared (sodium starch glycolate)',
  povidone: 'Methodology §5 Cleared (povidone / copovidone / crospovidone — locked housekeeping)',
  dical:
    'Methodology §5 Cleared (dicalcium phosphate / tricalcium phosphate / dibasic calcium phosphate — mineral fillers / buffers)',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin / organic glycerin)',
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

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

function row(
  opts: Omit<RatingRecord, 'recordStatus'> & {
    recordStatus?: RatingRecord['recordStatus'];
  },
): RatingRecord {
  return {
    ...opts,
    recordStatus: opts.recordStatus ?? UNVERIFIED,
  };
}

function homeopathicFields() {
  return {
    productType: OTC,
    productSubtype: HOMEOPATHIC,
    homeopathicSubtype: HOMEOPATHIC,
  };
}

const EYE_PF_ALTS: CleanAlternative[] = [
  alt(
    EQUATE_EYE_PF,
    'Independently Clean Equate preservative-free lubricant already on main. Form: PF vial vs this PM ointment — labeled, not a hard filter (§6). Prefer PF over lanolin-alcohol bottles.',
  ),
  alt(
    REFRESH_TEARS_PF,
    'Independently Clean Refresh Tears PF already on main. Form: PF vial — labeled, not a hard filter (§6).',
  ),
];

const SLEEP_ALTS: CleanAlternative[] = [
  alt(
    CALMS_FORTE,
    'Independently Clean adult Sleep analog (Hyland’s Calms Forte) already on main. Form: tablet — labeled, not a hard filter (§6). Cleanliness only; not an efficacy swap.',
  ),
];

const COLD_ALTS: CleanAlternative[] = [
  alt(
    COLDCALM,
    'No independently Clean guaifenesin / expectorant exists as a same-active swap. Closest independently Clean adult Cold & Flu analog is ColdCalm meltaways already on main. Form labeled, not a hard filter (§6); not an expectorant replacement.',
  ),
];

export const BATCH66_CATCHUP_BARCODES: Record<string, string> = {
  // upcitemdb + Kirkland 096619 prefix already used on main (Daily Multi).
  // Costco item 719940 / NDC 63981-986-96 192-ct (2 x 96).
  'kirkland-sleep-aid-doxylamine': '096619857692',
  // topcarebrand.com + SmartLabel 1 oz IPA 95% / glycerin.
  'topcare-swimmers-ear': '036800001053',
  // topcarebrand.com + SmartLabel 0.4 fl oz homeopathic glycerin-only.
  'topcare-ear-relief': '036800171695',
};

export const BATCH66_KYR6_HELD_ROWS: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  row({
    id: FW_TRIPLE_ORIGINAL,
    productName: 'Family Wellness Triple Antibiotic Original',
    brand: 'Family Wellness',
    category: FIRST_AID,
    formulaId: FW_TRIPLE_ORIGINAL,
    audience: ADULT,
    minAge: 2,
    form: 'ointment',
    productType: OTC,
    retailers: ['Family Dollar'],
    activeIngredients: [
      { name: 'Bacitracin zinc', strength: '400 units / g' },
      { name: 'Neomycin sulfate', strength: '3.5mg / g' },
      { name: 'Polymyxin B sulfate', strength: '5,000 units / g' },
    ],
    inactiveIngredients: [
      flag('Cetyl alcohol', 'cleared', dailymed(SET.fw041, METH.fattyAlcohol)),
      flag('Light mineral oil', 'cleared', dailymed(SET.fw041, METH.mineralOil)),
      flag('White petrolatum', 'cleared', dailymed(SET.fw041, METH.petrolatum)),
      flag('Squalane', 'cleared', dailymed(SET.fw041, METH.squalane)),
      flag('Stearic acid', 'cleared', dailymed(SET.fw041, METH.stearic)),
      flag('Vitamin E (alpha-tocopherol)', 'cleared', dailymed(SET.fw041, METH.tocopherols)),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER-LOCK DRAFT: Family Wellness Triple Original 69396-041 = Clean. DailyMed setid 915759af Drug Facts: Cetyl Alcohol, Light Mineral Oil, White Petrolatum, Squalane, Stearic Acid, Vitamin E. Structured SPL maps vitamin E to alpha-tocopherol (Cleared mixed-tocopherols row) — not tocopheryl acetate. Cetyl alcohol is already §5 Cleared (Sept 15 fatty-alcohol family) — not a new token and not a cousin-ask. Squalane / light mineral oil / white petrolatum / stearic acid are Cleared. Own formulaId — not the petrolatum ± mineral oil Clean twin (`family-wellness-triple-antibiotic` / 69571-003) and not Pain Scar Itch 69396-054 (sodium pyruvate Caution). UPC 0032251533150 was not confirmed on carton / Family Dollar PDP / DailyMed for this Original NDC — omitted (NDC ≠ UPC). Ages 2+ (under 2: ask a doctor). Draft, not verified.',
    sourcesGeneral: [
      `DailyMed setid ${SET.fw041} (Family Wellness Triple Original NDC 69396-041; ${UNVERIFIED_NOTE})`,
    ],
  }),
  row({
    id: 'topcare-swimmers-ear',
    productName: "TopCare Swimmer's Ear Drops (Isopropyl Alcohol 95%)",
    brand: 'TopCare',
    category: FIRST_AID,
    // KYR5-d — brand site + SmartLabel 1 oz 036800001053.
    barcode: BATCH66_CATCHUP_BARCODES['topcare-swimmers-ear'],
    formulaId: SWIM_EAR,
    audience: ADULT,
    form: 'otic',
    productType: OTC,
    retailers: ['Save Mart'],
    activeIngredients: [{ name: 'Isopropyl alcohol', strength: '95%' }],
    inactiveIngredients: [
      flag('Glycerin', 'cleared', dailymed(SET.tcSwim, METH.glycerin)),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER-LOCK DRAFT: TopCare Swimmer’s Ear = Clean. Reuses `swim-ear`. DailyMed setid 9dccbc25 (NDC 36800-064). Active is isopropyl alcohol 95% in anhydrous glycerin (ear drying aid — IPA is the ACTIVE, not an oral Limited vehicle demerit). Only inactive on Drug Facts is glycerin. Same IPA 95% + glycerin drying-aid family as Swim-Ear. Flammable — keep away from fire or flame. Do not use in the eyes. Directions: 4 to 5 drops in each affected ear (SPL types “5 to 5”). No numeric labeled age beyond keep-out-of-reach. Adult drugstore SKU. Not TopCare Ear Relief 36800-846 (homeopathic glycerin-only). Draft, not verified.',
    sourcesGeneral: [
      `DailyMed setid ${SET.tcSwim} (TopCare Swimmer's Ear NDC 36800-064; ${UNVERIFIED_NOTE}) — reuse ${SWIM_EAR}`,
    ],
  }),
  row({
    id: TC_EAR_RELIEF,
    productName: 'TopCare Ear Relief Ear Drops',
    brand: 'TopCare',
    category: FIRST_AID,
    // KYR5-d — brand site + SmartLabel 0.4 fl oz 036800171695.
    barcode: BATCH66_CATCHUP_BARCODES[TC_EAR_RELIEF],
    formulaId: TC_EAR_RELIEF,
    audience: ADULT,
    minAge: 12,
    form: 'otic',
    ...homeopathicFields(),
    retailers: ['Save Mart'],
    activeIngredients: [
      { name: 'Chamomilla', strength: '10X HPUS' },
      { name: 'Mercurius solubilis', strength: '15X HPUS' },
      { name: 'Sulphur', strength: '12X HPUS' },
    ],
    inactiveIngredients: [
      flag('Vegetable glycerin', 'cleared', dailymed(SET.tcEar, METH.glycerin)),
    ],
    verdict: 'clean',
    honestNote:
      `FOUNDER-LOCK DRAFT: TopCare Ear Relief = Clean, homeopathic. DailyMed setid 2e8422f3 (NDC 36800-846). HPUS Chamomilla 10X / Mercurius solubilis 15X / Sulphur 12X. Only inactive is vegetable glycerin — no BKC, no PG, no purified-water twin. Own formulaId — do not silently merge into \`similasan-earache-relief\` (that family also lists purified water). Homeopathic otic — cleanliness only, no efficacy claim. ${CARLSTON} Children under 12 consult a doctor → minAge 12. For use in the ear only. Not TopCare Swimmer’s Ear 36800-064. Draft, not verified.`,
    sourcesGeneral: [
      `DailyMed setid ${SET.tcEar} (TopCare Ear Relief NDC 36800-846; ${UNVERIFIED_NOTE})`,
      CARLSTON,
    ],
  }),

  // ── Caution ──────────────────────────────────────────────
  row({
    id: 'walgreens-pm-lubricant-ointment',
    productName: 'Walgreens Nighttime Lubricant Eye Ointment',
    brand: 'Walgreens',
    category: ALLERGY,
    formulaId: STORE_PM_LANOLIN,
    audience: ADULT,
    minAge: 2,
    form: 'ointment',
    productType: OTC,
    retailers: ['Walgreens'],
    activeIngredients: [
      { name: 'Mineral oil', strength: '42.5%' },
      { name: 'White petrolatum', strength: '57.3%' },
    ],
    inactiveIngredients: [
      flag('Lanolin alcohols', 'cleared', dailymed(SET.walPm, METH.lanolinAlcohol)),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-LOCK DRAFT: Walgreens Nighttime Lubricant Eye ointment = Caution (lanolin alcohol). DailyMed setid 6bb68dc4 (NDC 0363-7274). Actives are mineral oil 42.5% + white petrolatum 57.3% (lubricant ACTIVES — not oral oil demerits). Only inactive is lanolin alcohols — locked Caution wool-alcohol family (Sept 16). No High. New product id only — reuses `store-pm-ointment-lanolin-alcohol` from batch65 Equate / CVS PM ointment (same actives + lanolin-alcohol inactive). Not Walgreens 0363-6855 (mineral oil 3% / petrolatum 94% / lanolin) and not 0363-8830 (20/80). Prefer PF tears over this PM ointment. Draft, not verified.',
    cleanAlternatives: EYE_PF_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.walPm} (Walgreens PM lubricant NDC 0363-7274; ${UNVERIFIED_NOTE}) — reuse ${STORE_PM_LANOLIN}`,
    ],
  }),
  row({
    id: DG_GUAIF_IR,
    productName: 'DG Health Immediate Release Mucus Relief (Guaifenesin 400 mg)',
    brand: 'DG Health',
    category: COLD_FLU,
    formulaId: DG_GUAIF_IR,
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    productType: OTC,
    retailers: ['Dollar General'],
    activeIngredients: [{ name: 'Guaifenesin', strength: '400mg' }],
    inactiveIngredients: [
      flag('Magnesium stearate', 'cleared', dailymed(SET.dgIr, METH.stearic)),
      flag('Microcrystalline cellulose', 'cleared', dailymed(SET.dgIr, METH.cellulose)),
      flag('Colloidal silicon dioxide', 'cleared', dailymed(SET.dgIr, METH.sio2)),
      flag('Copovidone', 'cleared', dailymed(SET.dgIr, METH.povidone)),
      flag('Dicalcium phosphate', 'cleared', dailymed(SET.dgIr, METH.dical)),
      flag('Maltodextrin', 'limited', dailymed(SET.dgIr, METH.maltodextrin)),
      flag('Sodium starch glycolate', 'cleared', dailymed(SET.dgIr, METH.ssg)),
      flag('Stearic acid', 'cleared', dailymed(SET.dgIr, METH.stearic)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: DG Health Immediate Release Mucus Relief guaifenesin 400 mg = Caution. DailyMed setid f60a9d1b (NDC 10956-059). Printed Drug Facts: magnesium stearate, microcrystalline cellulose. May also contain (colloidal) silicon dioxide, (co) povidone, dicalcium phosphate, maltodextrin, sodium starch glycolate, stearic acid. Printed DF is the authority (structured SPL lists maltodextrin / stearic acid / SiO2 / copovidone / magnesium stearate and omits MCC). SiO2 is present on the printed panel → 0-pt nanoparticle Caution cap. Maltodextrin is Limited. No High. ${LIMITED_STACK} ${SIO2_TAP} Own formulaId — not Family Wellness IR (\`family-wellness-guaifenesin-ir\`; that twin prints povidone K30 / 90F and does not list dicalcium / SSG) and not the dye-free ER Max family. Imprint PH063. Ages 6+ (6 to under 12: ½ tablet; 12+: 1 tablet every 4 hours; do not exceed 6 doses / 24 hours). Draft, not verified.`,
    cleanAlternatives: COLD_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.dgIr} (DG Health guaifenesin IR 400 NDC 10956-059; ${UNVERIFIED_NOTE})`,
    ],
  }),

  // ── Avoid ────────────────────────────────────────────────
  row({
    id: 'kirkland-sleep-aid-doxylamine',
    productName: 'Kirkland Signature Sleep Aid (Doxylamine 25 mg)',
    brand: 'Kirkland Signature',
    category: SLEEP,
    barcode: BATCH66_CATCHUP_BARCODES['kirkland-sleep-aid-doxylamine'],
    formulaId: UNISOM_DOXY,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    retailers: ['Costco'],
    activeIngredients: [{ name: 'Doxylamine succinate', strength: '25mg' }],
    inactiveIngredients: [
      flag('FD&C Blue No. 1 aluminum lake', 'high', dailymed(SET.kirkSleep, METH.dyes)),
      flag(
        'Dibasic calcium phosphate dihydrate',
        'cleared',
        dailymed(SET.kirkSleep, METH.dical),
      ),
      cleared(SET.kirkSleep, 'Magnesium stearate'),
      flag('Microcrystalline cellulose', 'cleared', dailymed(SET.kirkSleep, METH.cellulose)),
      flag('Sodium starch glycolate', 'cleared', dailymed(SET.kirkSleep, METH.ssg)),
    ],
    verdict: 'avoid',
    honestNote: `FOUNDER-LOCK DRAFT: Kirkland Signature club sleep = Avoid (Blue #1 aluminum lake). Reuses \`unisom-sleeptabs-doxylamine\` — same doxylamine 25 mg + dibasic calcium phosphate dihydrate / Blue #1 lake / magnesium stearate / MCC / SSG list as Unisom SleepTabs (not the up&up anhydrous + dihydrate pair). DailyMed setid 74a728e1 (NDC 63981-986; imprint 44-386; Costco item 719940). One tablet 30 minutes before bed. Ages 12+ (under 12: do not use). ${SEDATING} Draft, not verified.`,
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.kirkSleep} (Kirkland doxylamine 25 NDC 63981-986; ${UNVERIFIED_NOTE}) — reuse ${UNISOM_DOXY}`,
    ],
  }),
];

export const BATCH66_SKIPPED: { sku: string; reason: string }[] = [
  {
    sku: 'batch65 20 new / 10 reuse',
    reason: 'Already on main. Do not reopen.',
  },
  {
    sku: 'Assured no-panel / Rexall / Open Nature / Amazon house / Thrive / Sprouts / Nice! no-OI / MM conflicted panels / Kirkland guaifenesin-only delisted',
    reason:
      'Held-out of this write. Do not invent. Do not cousin-ask. Batch65 skip pile stays closed.',
  },
];

const _ROWS = BATCH66_KYR6_HELD_ROWS;
if (_ROWS.length !== 6) throw new Error('batch66 tally drift: expected 6 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 3) {
  throw new Error('batch66 Clean tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 2) {
  throw new Error('batch66 Caution tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 1) {
  throw new Error('batch66 Avoid tally drift');
}
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch66 recordStatus must stay unverified');
}
if (_ROWS.some((r) => !r.formulaId)) {
  throw new Error('batch66 every row needs formulaId');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch66 duplicate ids');

const FORBIDDEN_IDS = [
  'equate-es-pain-reliever',
  'walgreens-prenatal-coated',
  'family-wellness-triple-antibiotic',
  'family-wellness-triple-antibiotic-pain',
  'family-wellness-pain-scar-itch',
  'equate-nighttime-lubricant-ointment',
  'cvs-health-nighttime-dry-eye',
  'unisom-sleeptabs-doxylamine',
  'upup-doxylamine-sleeptabs',
  'swim-ear',
  'similasan-earache-relief',
  'family-wellness-guaifenesin-ir-400',
  'dg-health-mucus-er-max-dyefree',
];
if (_ROWS.some((r) => FORBIDDEN_IDS.includes(r.id))) {
  throw new Error('batch66 must not clone closed product ids');
}

const fw041 = _ROWS.find((r) => r.id === FW_TRIPLE_ORIGINAL);
if (fw041?.verdict !== 'clean' || fw041.formulaId !== FW_TRIPLE_ORIGINAL) {
  throw new Error('FW 69396-041 must be Clean on its own formulaId');
}
if (!fw041.inactiveIngredients.some((i) => /cetyl alcohol/i.test(i.name))) {
  throw new Error('FW 69396-041 must list cetyl alcohol');
}
if (fw041.inactiveIngredients.some((i) => i.riskLevel !== 'cleared' && i.riskLevel !== 'limited')) {
  throw new Error('FW 69396-041 must not invent a High/Moderate on this Cleared panel');
}
if (fw041.barcode) {
  throw new Error('FW 69396-041 UPC 0032251533150 was not confirmed — omit barcode');
}

const kirk = _ROWS.find((r) => r.id === 'kirkland-sleep-aid-doxylamine');
if (kirk?.verdict !== 'avoid' || kirk.formulaId !== UNISOM_DOXY) {
  throw new Error('Kirkland club sleep must reuse Unisom doxylamine Avoid');
}
if (!kirk.inactiveIngredients.some((i) => /blue/i.test(i.name) && i.riskLevel === 'high')) {
  throw new Error('Kirkland club sleep must flag Blue #1 lake High');
}
if (kirk.inactiveIngredients.some((i) => /anhydrous/i.test(i.name))) {
  throw new Error('Kirkland club sleep is the Unisom dihydrate list — not the up&up pair');
}

const swim = _ROWS.find((r) => r.id === 'topcare-swimmers-ear');
if (swim?.verdict !== 'clean' || swim.formulaId !== SWIM_EAR) {
  throw new Error('TopCare Swimmer’s Ear must reuse swim-ear Clean');
}

const ear = _ROWS.find((r) => r.id === TC_EAR_RELIEF);
if (ear?.verdict !== 'clean' || ear.formulaId !== TC_EAR_RELIEF) {
  throw new Error('TopCare Ear Relief must be Clean on its own glycerin-only formulaId');
}
if (ear.productSubtype !== HOMEOPATHIC) {
  throw new Error('TopCare Ear Relief must stay homeopathic');
}

const walPm = _ROWS.find((r) => r.id === 'walgreens-pm-lubricant-ointment');
if (walPm?.verdict !== 'caution' || walPm.formulaId !== STORE_PM_LANOLIN) {
  throw new Error('Walgreens PM ointment must reuse store-pm-ointment-lanolin-alcohol');
}

const dgIr = _ROWS.find((r) => r.id === DG_GUAIF_IR);
if (dgIr?.verdict !== 'caution' || dgIr.formulaId !== DG_GUAIF_IR) {
  throw new Error('DG guaifenesin IR must be Caution on its own printed-DF formulaId');
}
if (!dgIr.inactiveIngredients.some((i) => /silicon dioxide/i.test(i.name))) {
  throw new Error('DG guaifenesin IR printed panel includes SiO2 — Caution cap must be listed');
}
if (!dgIr.inactiveIngredients.some((i) => /maltodextrin/i.test(i.name) && i.riskLevel === 'limited')) {
  throw new Error('DG guaifenesin IR printed may-contain maltodextrin is Limited');
}

const REUSE_FORMULA_COUNT = _ROWS.filter((r) =>
  [UNISOM_DOXY, SWIM_EAR, STORE_PM_LANOLIN].includes(r.formulaId ?? ''),
).length;
if (REUSE_FORMULA_COUNT !== 3) {
  throw new Error('batch66 expected 3 formulaId reuses (Unisom / Swim-Ear / store PM)');
}

for (const record of BATCH66_KYR6_HELD_ROWS) {
  const expected = BATCH66_CATCHUP_BARCODES[record.id];
  if (expected && record.barcode !== expected) {
    throw new Error(`batch 66 catch-up UPC drift on ${record.id}`);
  }
}
