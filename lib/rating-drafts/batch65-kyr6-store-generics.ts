// DRAFT / not verified / batch 65 KYR6 store-generics WRITE /
// methodology v1.6 + current main §5 exact. Additive / “also
// appears as” / locked exact-INCI rows only. No invented grades.
// No cousin-match. Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. High-conf DailyMed / store-PDP OI holes ONLY.
// recordStatus is 'unverified' on every row. Internal keys only:
// clean | caution | avoid. UPC attached only when carton / store
// PDP / DailyMed / DSLD has a real barcode — no invented codes.
// NDC ≠ UPC. Missing code ≠ no row (omit barcode). Pack sizes of
// the same name+form+inactives share formulaId. Form is labeled
// on cleanAlternatives, not a hard filter (§6). Search wiring
// only. Not wired into Clean Picks UI. No photos. Letter tiles
// only on new ids. No fake Clean alts. No methodology wipe.
// PROJECT_NOTES tally-only (do not wipe LIVE NOW).
//
// REUSE first — match brand+name+form+strength for product ids;
// same inactives share formulaId across store siblings.
//
// DO NOT REOPEN / DO NOT CLONE:
// equate-es-pain-reliever 100-ct white · Amazon house 30/54/56/61–63 ·
// Thrive 27/52/59/60/64 · Sprouts stash · pain-rub 41–48 ·
// Rexall expansion / Open Nature · Walgreens prenatal coated.
//
// LOCKS used (exact §5): L484 oral PEG = Caution. L612 plain
// loratadine = Clean. Coated cetirizine Blue #1 + TiO2 = Avoid.
// Mucus-ER Max dye-free (carbomer / HPMC / Mg stearate / MCC /
// SSG) = Clean. Mucus-DM Max Yellow #10 = Avoid. Triple Abx
// oil-blend sodium pyruvate + tocopheryl acetate = Caution.
// SiO2 = 0-pt Caution cap. Maltodextrin Limited. Fragrance /
// thymol / spirits of turpentine (turpentine oil) = Caution.
// Lanolin alcohols = Caution. BKC = Caution. Sucralose +
// Limited stack on dye-free sleep liquid = Avoid (batch 7
// founder dye-free trap). Limited-only never Avoid. Avoid
// needs High. Softgel / topical oil fill ≠ gummy seed-oil High.
// Display keys stay clean / caution / avoid.
//
// TALLY (unverified drafts in THIS file): 20 rows — Clean 3 /
// Caution 9 / Avoid 8. NEW 20 / REUSE-formula 10 / SKIPPED 16.
//
// Independently Clean analogs already on main (not cloned):
// amazon-basic-care-mucus-er-max-dyefree ·
// claritin-allergy-tablets-plain ·
// equate-loratadine-tablets-plain ·
// kirkland-allerclear-loratadine-plain ·
// dg-health-loratadine-tablets ·
// genexa-acetaminophen-es · cvs-health-es-castor ·
// family-wellness-triple-antibiotic-pain ·
// amazon-basic-care-triple-pain-ointment ·
// equate-lubricant-eye-pf · refresh-tears-pf ·
// coldcalm-meltaways · badger-aromatic-chest-rub ·
// hylands-calms-forte · phillips-mom-original ·
// boiron-acidcalm.
//
// TALLY is asserted at the bottom of this file.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const OTC = 'OTC' as const;
const UNVERIFIED_NOTE = 'draft, not verified';

const ALLERGY = 'Allergy';
const PAIN_FEVER = 'Pain & Fever';
const COLD_FLU = 'Cold & Flu';
const FIRST_AID = 'First Aid';
const SLEEP = 'Sleep';
const DIGESTIVE = 'Digestive';

const L484_FORMULA = 'apap-store-es-l484-peg';
const L612_FORMULA = 'loratadine-l612-plain';
const COATED_CETIRIZINE = 'store-cetirizine-coated-blue1-tio2';
const MUCUS_ER_MAX_DF = 'amazon-basic-care-mucus-er-max-dyefree';
const MUCUS_DM_MAX_Y10 = 'kirkland-mucus-dm-max-er';
const TRIPLE_OIL_BLEND = 'amazon-basic-care-triple-abx-oil-blend';
const DPH_SLEEP_COAT = 'dg-health-sleep-aid-dph';
const SLEEP_LIQUID_DF = 'cvs-sleep-aid-liquid-dyefree';
const FW_GUAIF_IR = 'family-wellness-guaifenesin-ir';
const STORE_PM_LANOLIN = 'store-pm-ointment-lanolin-alcohol';

const GENEXA_ES = 'genexa-acetaminophen-es';
const CVS_ES_CASTOR = 'cvs-health-es-castor';
const CLARITIN_PLAIN = 'claritin-allergy-tablets-plain';
const EQUATE_LORATADINE = 'equate-loratadine-tablets-plain';
const DG_LORATADINE = 'dg-health-loratadine-tablets';
const WALGREENS_LORATADINE = 'walgreens-allergy-relief-loratadine';
const COLDCALM = 'coldcalm-meltaways';
const BADGER_RUB = 'badger-aromatic-chest-rub';
const CALMS_FORTE = 'hylands-calms-forte';
const PHILLIPS_MOM = 'phillips-mom-original';
const ACIDCALM = 'boiron-acidcalm';
const EQUATE_EYE_PF = 'equate-lubricant-eye-pf';
const REFRESH_TEARS_PF = 'refresh-tears-pf';
const FW_TRIPLE_PAIN = 'family-wellness-triple-antibiotic-pain';
const ABC_TRIPLE_PAIN = 'amazon-basic-care-triple-pain-ointment';

const SET = {
  dgMax: 'ea8deeb0-d6c0-4cb6-b599-ca938ea22397',
  mmMax: '00c40e3b-6962-dfb4-e063-6294a90afec6',
  walLorat: '41f8fc1d-2d14-48da-a233-23e9c11296d9',
  gsL484: '7f78028a-484b-48b3-a37a-1e0b055bbefc',
  fwIr: '412f3459-4c22-4822-86bd-011fc3e91ca6',
  fwDm: '8aee8108-a4e0-4956-8e37-6b3b1c5dc683',
  dgTriple: '1694f4ee-1065-4b13-b642-b8437f473541',
  fwScar: '9e507ec5-310d-3a21-e053-2a95a90a15a6',
  eqVap: '372e66a6-1f1f-4aa3-a2ed-d215fafee9b9',
  eqPm: '152171db-2f2a-9d36-e063-6394a90a7225',
  cvsPm: 'fc1c3dad-edf5-45e7-b9cd-adee08d6bca3',
  tcEye: '9c61a56a-c1a9-2846-e053-2995a90a755b',
  walCet: '678dcc09-55da-4d9d-a39a-c450c61c387b',
  tcDph: '30284271-0411-4abf-bc62-d956dc794432',
  mmDmY10: '3db5409d-d772-4bf1-a183-37fbe01d53d6',
  mmDmBlue: '2b59f90b-b8fc-03c0-3527-a8efa97fbfe3',
  walSleepDye: '048cfa3a-4519-400d-a5ab-ce05c9cc4ec8',
  walSleepDf: '96948973-09e3-4c05-8982-0494ebeaac4b',
  walOme: '30a893d2-198a-4184-81b4-02399324ff29',
  walFam: '2766ffe7-2f1c-48c8-8f67-0a2819dcc3be',
} as const;

const SIO2_TAP =
  'Silicon dioxide / silica is the 0-pt nanoparticle Caution cap (EFSA 2018 data-gap). It does not push Avoid.';

const OIL_FILL_TAP =
  'Named single oil / butter as the topical BASE or FILL is Cleared. Seed/industrial oils are flagged in gummies. In this ointment they are not that High rule.';

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const SEDATING =
  'First-generation / sedating antihistamine — cleanliness note only; next-day drowsiness is a use note, not an invented active-safety grade.';

const METH = {
  dyes: 'Methodology §5 High-tier (synthetic dyes, including lake forms)',
  tio2: 'Methodology §5 High-tier (titanium dioxide / E171)',
  talc: 'Methodology §5 High-tier (talc — IARC 2A; no pharma-grade exception)',
  peg: 'Methodology §5 Moderate-risk (PEGs — ethylene-oxide / 1,4-dioxane contamination risk)',
  pg: 'Methodology §5 Moderate-risk (propylene glycol, oral)',
  sucralose: 'Methodology §5 Moderate-risk (sucralose)',
  ps80: 'Methodology §5 Moderate-risk (polysorbate 80)',
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  maltodextrin:
    'Methodology §5 Limited-risk (maltodextrin — organic or non-organic; same Limited)',
  benzoate:
    'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate)',
  sorbitol:
    'Methodology §5 Limited-risk (other sugar alcohols — sorbitol, maltitol, mannitol — GI effects at volume)',
  sio2: `Methodology §5 Precautionary (silicon dioxide / silica — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points). ${SIO2_TAP}`,
  pyruvate:
    'Methodology §5 Caution (sodium pyruvate — exact token; standalone Caution, not Avoid; locked Sept 16, 2026)',
  tocopherylAcetate:
    'Methodology §5 Caution (tocopheryl acetate — exact INCI; distinct from Cleared mixed tocopherols / D-Alpha-Tocopherol; standalone Caution, not Avoid; locked Sept 15, 2026)',
  fragrance:
    'Methodology §5 Caution (fragrance / parfum — topical OTC only; standalone Caution, not Avoid)',
  thymol:
    'Methodology §5 Caution (thymol — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  turpentine:
    'Methodology §5 Caution (spirits of turpentine / turpentine oil — exact token; EO / solvent line; standalone Caution, not Avoid; locked Sept 16, 2026)',
  lanolinAlcohol:
    'Methodology §5 Caution (lanolin alcohol / lanolin alcohols — exact token; same Caution as lanolin / wool-alcohol family; standalone Caution, not Avoid; locked Sept 16, 2026)',
  bkc: 'Methodology §5 Caution (benzalkonium chloride — contested ciliotoxicity; standalone Caution, not additive-scored, not Avoid)',
  sls: 'Methodology §5 Caution (sodium lauryl sulfate — population/irritant; standalone Caution, not additive-scored, not Avoid)',
  ironOxide:
    'Methodology §5 Caution (iron oxides / ferric oxide red / ferric oxide yellow — exact tokens; standalone Caution, not Avoid; locked Sept 15, 2026)',
  oilFill: `Methodology §5 Cleared (named single oil / butter as the topical BASE or FILL — cottonseed / olive / cocoa; tap fill ≠ gummy High). ${OIL_FILL_TAP}`,
  petrolatum:
    'Methodology §5 Cleared (petrolatum / white petrolatum — topical occlusive)',
  tocopherols:
    'Methodology §5 Cleared (mixed tocopherols / D-Alpha-Tocopherol as antioxidants — locked v1.6). Distinct from Caution tocopheryl acetate.',
  carbomer:
    'Methodology §5 Cleared (carbomer / carbomer homopolymer type B — current monograph; locked Sept 15, 2026)',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC / hydroxypropyl methylcellulose)',
  cellulose:
    'Methodology §5 Cleared (microcrystalline cellulose / croscarmellose sodium / cellulose gum)',
  ssg: 'Methodology §5 Cleared (sodium starch glycolate)',
  stearic:
    'Methodology §5 Cleared (magnesium stearate / stearic acid / calcium stearate / vegetable stearate)',
  povidone: 'Methodology §5 Cleared (povidone / copovidone / crospovidone — locked housekeeping)',
  starch:
    'Methodology §5 Cleared (pregelatinized / corn / potato / tapioca starch / similar simple starches)',
  gelatin:
    'Methodology §5 Cleared (lactose, gelatin, carnauba wax, beeswax, purified water)',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin / organic glycerin)',
  gums: 'Methodology §5 Cleared (xanthan gum / gum arabic / guar / pectin — locked v1.6)',
  citrate:
    'Methodology §5 Cleared (citric acid / citrate salts / malic / lactic / fumaric / adipic / tartaric)',
  dical:
    'Methodology §5 Cleared (dicalcium phosphate / tricalcium phosphate / dibasic calcium phosphate — mineral fillers / buffers)',
  mineralOil:
    'Methodology §5 Cleared (paraffin + mineral oil as topical ointment occlusive — petrolatum neighborhood; tap: not an oral oil)',
  edta: 'Methodology §5 Cleared (disodium EDTA, trace preservative/stabilizer — locked v1.6)',
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

const APAP_ALTS: CleanAlternative[] = [
  alt(
    GENEXA_ES,
    'Closest independently Clean adult acetaminophen 500 mg analog already on main. Form: caplet — labeled, not a hard filter (§6).',
  ),
  alt(
    CVS_ES_CASTOR,
    'Independently Clean adult acetaminophen 500 mg already on main. Form: film-coated tablet — labeled, not a hard filter (§6).',
  ),
];

const ALLERGY_ALTS: CleanAlternative[] = [
  alt(
    WALGREENS_LORATADINE,
    'Independently Clean in-batch Walgreens plain loratadine (L612 family). Same-store analog. Form: tablet — labeled, not a hard filter (§6).',
  ),
  alt(
    DG_LORATADINE,
    'Independently Clean DG Health plain loratadine (L612 family) already on main. Form: tablet.',
  ),
  alt(
    CLARITIN_PLAIN,
    'Independently Clean national loratadine analog already on main. Form: tablet.',
  ),
  alt(
    EQUATE_LORATADINE,
    'Independently Clean store-brand plain loratadine (L612 family) already on main. Form: tablet.',
  ),
];

const COLD_ALTS: CleanAlternative[] = [
  alt(
    COLDCALM,
    'No independently Clean guaifenesin / DM expectorant exists as a same-active swap. Closest independently Clean adult Cold & Flu analog is ColdCalm meltaways already on main. Form labeled, not a hard filter (§6); not an expectorant replacement.',
  ),
];

const FIRST_AID_ALTS: CleanAlternative[] = [
  alt(
    FW_TRIPLE_PAIN,
    'Independently Clean Family Wellness Triple + Pain (petrolatum only) already on main. Form: ointment. Distinct from oil-blend / sodium pyruvate rows.',
  ),
  alt(
    ABC_TRIPLE_PAIN,
    'Independently Clean Amazon Basic Care Triple + Pain (petrolatum only) already on main. Form: ointment.',
  ),
];

const EYE_PF_ALTS: CleanAlternative[] = [
  alt(
    EQUATE_EYE_PF,
    'Independently Clean Equate preservative-free lubricant already on main. Form: PF vial vs this multi-dose / ointment — labeled, not a hard filter (§6). Prefer PF over BKC or lanolin-alcohol bottles.',
  ),
  alt(
    REFRESH_TEARS_PF,
    'Independently Clean Refresh Tears PF already on main. Form: PF vial — labeled, not a hard filter (§6).',
  ),
];

const SLEEP_ALTS: CleanAlternative[] = [
  alt(
    CALMS_FORTE,
    'Independently Clean adult Sleep analog (Hyland’s Calms Forte) already on main. Form: tablet vs this liquid / coated caplet — labeled, not a hard filter (§6). Cleanliness only; not an efficacy swap.',
  ),
];

const DIGESTIVE_ALTS: CleanAlternative[] = [
  alt(
    PHILLIPS_MOM,
    'No independently Clean PPI / H2 analog exists in the drafted batches. Closest independently Clean adult Digestive analog is Phillips Original Milk of Magnesia already on main. Form labeled, not a hard filter (§6); different active; cleanliness peer only.',
  ),
  alt(
    ACIDCALM,
    'Independently Clean adult Digestive analog (Boiron AcidCalm) already on main. Form: meltaway tablet — labeled, not a hard filter (§6). Cleanliness only; not an efficacy swap.',
  ),
];

const VAPOR_ALTS: CleanAlternative[] = [
  alt(
    BADGER_RUB,
    'Independently Clean topical chest-rub analog (Badger Aromatic Chest Rub) already on main. Form: ointment. Distinct from this fragrance / thymol / turpentine petrolatum rub.',
  ),
];

const L484_NOTE =
  'LNK L484 extra-strength acetaminophen family — oral PEG is Moderate (2 pts) → Caution. These store brands share inactives and formulaId; pack sizes are not graded separately. Some of the same retailers also sell dyed / titanium-dioxide ES SKUs under similar names — confirm the L484 / PEG list on the bottle. Stay under 4 g/day acetaminophen. Ages 12+.';

export const BATCH65_CATCHUP_BARCODES: Record<string, string> = {
  // Dollar General PDP path /p/.../370030118014 — store barcode tile, not the NDC.
  'dg-health-mucus-er-max-dyefree': '370030118014',
};

export const BATCH65_KYR6_STORE_GENERICS: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  row({
    id: 'dg-health-mucus-er-max-dyefree',
    productName: 'DG Health Mucus-ER Max (Guaifenesin 1200 mg)',
    brand: 'DG Health',
    category: COLD_FLU,
    barcode: BATCH65_CATCHUP_BARCODES['dg-health-mucus-er-max-dyefree'],
    formulaId: MUCUS_ER_MAX_DF,
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    productType: OTC,
    retailers: ['Dollar General'],
    activeIngredients: [{ name: 'Guaifenesin', strength: '1200mg' }],
    inactiveIngredients: [
      flag('Carbomer homopolymer type B', 'cleared', dailymed(SET.dgMax, METH.carbomer)),
      flag('Hypromellose', 'cleared', dailymed(SET.dgMax, METH.hpmc)),
      cleared(SET.dgMax, 'Magnesium stearate'),
      flag('Microcrystalline cellulose', 'cleared', dailymed(SET.dgMax, METH.cellulose)),
      flag('Sodium starch glycolate', 'cleared', dailymed(SET.dgMax, METH.ssg)),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER-LOCK DRAFT: DG Health Mucus-ER Max 55910-626-74 = Clean. DailyMed setid ea8deeb0 Drug Facts: carbomer homopolymer type B, hypromellose, magnesium stearate, microcrystalline cellulose, sodium starch glycolate. White tablet — no dye on Drug Facts. Structured SPL omits sodium starch glycolate; Drug Facts line is the authority. Reuses `amazon-basic-care-mucus-er-max-dyefree` (same 1200 mg dye-free list). Dollar General PDP 14-ct confirms the live NDC. This is NOT the Blue #1 600 mg Mucus-ER (`dg-health-mucus-er`) and not the Blue #1 Max twin 55910-887 (not written). Ages 12+. Swallow whole. Draft, not verified.',
    sourcesGeneral: [
      `DailyMed setid ${SET.dgMax} (DG Health Mucus-ER Max NDC 55910-626-74; ${UNVERIFIED_NOTE}) — reuse ${MUCUS_ER_MAX_DF}`,
      'Dollar General PDP /p/dg-health-maximum-strength-mucus-er-max-guaifenesin-extended-release-tablets-14-ct/370030118014',
    ],
  }),
  row({
    id: 'members-mark-mucus-er-max-dyefree',
    productName: "Member's Mark Maximum Strength Mucus Relief (Guaifenesin 1200 mg)",
    brand: "Member's Mark",
    category: COLD_FLU,
    formulaId: MUCUS_ER_MAX_DF,
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    productType: OTC,
    retailers: ["Sam's Club"],
    activeIngredients: [{ name: 'Guaifenesin', strength: '1200mg' }],
    inactiveIngredients: [
      flag('Carbomer homopolymer type B', 'cleared', dailymed(SET.mmMax, METH.carbomer)),
      flag('Hypromellose', 'cleared', dailymed(SET.mmMax, METH.hpmc)),
      cleared(SET.mmMax, 'Magnesium stearate'),
      flag('Microcrystalline cellulose', 'cleared', dailymed(SET.mmMax, METH.cellulose)),
      flag('Sodium starch glycolate', 'cleared', dailymed(SET.mmMax, METH.ssg)),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER-LOCK DRAFT: Member’s Mark Maximum Strength Mucus Relief guaifenesin-only 1200 mg = Clean. DailyMed setid 00c40e3b (NDC 68196-405) Drug Facts: carbomer homopolymer type B, hypromellose, magnesium stearate, microcrystalline cellulose, sodium starch glycolate. Same dye-free Max list as Amazon Basic Care / DG 55910-626. Reuses `amazon-basic-care-mucus-er-max-dyefree`. This is NOT the Mucus Relief DM twins (68196-812 Yellow #10 / 68196-999 Blue #1). Ages 12+. Swallow whole. Draft, not verified.',
    sourcesGeneral: [
      `DailyMed setid ${SET.mmMax} (Member's Mark guaifenesin 1200 ER NDC 68196-405; ${UNVERIFIED_NOTE}) — reuse ${MUCUS_ER_MAX_DF}`,
    ],
  }),
  row({
    id: WALGREENS_LORATADINE,
    productName: 'Walgreens Allergy Relief (Loratadine 10 mg)',
    brand: 'Walgreens',
    category: ALLERGY,
    formulaId: L612_FORMULA,
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    productType: OTC,
    retailers: ['Walgreens'],
    activeIngredients: [{ name: 'Loratadine', strength: '10mg' }],
    inactiveIngredients: [
      cleared(SET.walLorat, 'Lactose monohydrate'),
      cleared(SET.walLorat, 'Magnesium stearate'),
      cleared(SET.walLorat, 'Povidone'),
      flag('Pregelatinized starch', 'cleared', dailymed(SET.walLorat, METH.starch)),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER-LOCK DRAFT: Walgreens Allergy Relief loratadine 10 mg = Clean. Reuses `loratadine-l612-plain`. DailyMed setid 41f8fc1d (NDC 0363-1612). Drug Facts: lactose monohydrate, magnesium stearate, povidone, pregelatinized starch. Current Walgreens / W-brand house tablet (Free + Pure carton on this SPL). Not Wal-itin 0363-9150 / ended 0363-0699. Not a coated / ODT / -D SKU. Contains lactose. Ages 6+ (under 6: ask a doctor). Draft, not verified.',
    sourcesGeneral: [
      `DailyMed setid ${SET.walLorat} (Walgreens loratadine L612 NDC 0363-1612; ${UNVERIFIED_NOTE}) — reuse ${L612_FORMULA}`,
    ],
  }),

  // ── Caution ──────────────────────────────────────────────
  row({
    id: 'goodsense-es-pain-relief-l484',
    productName: 'GoodSense Extra Strength Pain Relief (Acetaminophen 500 mg, L484)',
    brand: 'GoodSense',
    category: PAIN_FEVER,
    formulaId: L484_FORMULA,
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    productType: OTC,
    retailers: ['Grocery'],
    activeIngredients: [{ name: 'Acetaminophen', strength: '500mg' }],
    inactiveIngredients: [
      flag('Polyethylene glycol', 'moderate', dailymed(SET.gsL484, METH.peg)),
      flag('Hypromellose', 'cleared', dailymed(SET.gsL484, METH.hpmc)),
      flag('Povidone', 'cleared', dailymed(SET.gsL484, METH.povidone)),
      flag('Stearic acid', 'cleared', dailymed(SET.gsL484, METH.stearic)),
      flag('Carnauba wax', 'cleared', dailymed(SET.gsL484, METH.gelatin)),
      flag('Corn starch', 'cleared', dailymed(SET.gsL484, METH.starch)),
      flag('Croscarmellose sodium', 'cleared', dailymed(SET.gsL484, METH.cellulose)),
      flag('Pregelatinized starch', 'cleared', dailymed(SET.gsL484, METH.starch)),
      flag('Sodium starch glycolate', 'cleared', dailymed(SET.gsL484, METH.ssg)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: GoodSense Extra Strength Pain Relief APAP 500 L484 = Caution. Reuses \`${L484_FORMULA}\` — oral PEG Moderate. DailyMed setid 7f78028a (NDC 0113-0484; imprint L484). Drug Facts: carnauba wax, corn starch*, croscarmellose sodium*, hypromellose, polyethylene glycol, povidone, pregelatinized starch, sodium starch glycolate*, stearic acid (*may contain). Starch / SSG are Cleared housekeeping and are not a reason to split this L484 family. Not the dyed / talc / TiO2 GoodSense twin (setid af7ae548 — not written). ${L484_NOTE}`,
    cleanAlternatives: APAP_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.gsL484} (GoodSense ES APAP L484 NDC 0113-0484; ${UNVERIFIED_NOTE}) — reuse ${L484_FORMULA}`,
    ],
  }),
  row({
    id: 'family-wellness-guaifenesin-ir-400',
    productName: 'Family Wellness Chest Congestion Relief (Guaifenesin 400 mg)',
    brand: 'Family Wellness',
    category: COLD_FLU,
    formulaId: FW_GUAIF_IR,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    retailers: ['Family Dollar'],
    activeIngredients: [{ name: 'Guaifenesin', strength: '400mg' }],
    inactiveIngredients: [
      flag('Silicon dioxide', 'cleared', dailymed(SET.fwIr, METH.sio2)),
      flag('Maltodextrin', 'limited', dailymed(SET.fwIr, METH.maltodextrin)),
      flag('Povidone K30', 'cleared', dailymed(SET.fwIr, METH.povidone)),
      flag('Povidone 90F', 'cleared', dailymed(SET.fwIr, METH.povidone)),
      flag('Magnesium stearate', 'cleared', dailymed(SET.fwIr, METH.stearic)),
      flag('Microcrystalline cellulose', 'cleared', dailymed(SET.fwIr, METH.cellulose)),
      flag('Stearic acid', 'cleared', dailymed(SET.fwIr, METH.stearic)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Family Wellness Chest Congestion Relief guaifenesin IR 400 mg = Caution. DailyMed setid 412f3459 (NDC 55319-891). Drug Facts: magnesium stearate, microcrystalline cellulose, silicon dioxide, povidone K30, povidone 90F, maltodextrin, stearic acid. SiO2 is the 0-pt nanoparticle Caution cap. Maltodextrin is Limited. No High. ${LIMITED_STACK} ${SIO2_TAP} Own formulaId — not an ER mucus family and not the skipped DG IR (no live DG IR SPL this hunt). Copovidone is not on this label (povidone K30 / 90F are the locked povidone housekeeping row). Ages 12+. Draft, not verified.`,
    cleanAlternatives: COLD_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.fwIr} (Family Wellness guaifenesin IR 400 NDC 55319-891; ${UNVERIFIED_NOTE})`,
    ],
  }),
  row({
    id: 'family-wellness-guaifenesin-dm-ir',
    productName:
      'Family Wellness Chest Congestion Relief DM (Guaifenesin 400 mg + DXM 20 mg)',
    brand: 'Family Wellness',
    category: COLD_FLU,
    formulaId: FW_GUAIF_IR,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    retailers: ['Family Dollar'],
    activeIngredients: [
      { name: 'Guaifenesin', strength: '400mg' },
      { name: 'Dextromethorphan HBr', strength: '20mg' },
    ],
    inactiveIngredients: [
      flag('Silicon dioxide', 'cleared', dailymed(SET.fwDm, METH.sio2)),
      flag('Maltodextrin', 'limited', dailymed(SET.fwDm, METH.maltodextrin)),
      flag('Povidone K30', 'cleared', dailymed(SET.fwDm, METH.povidone)),
      flag('Povidone 90F', 'cleared', dailymed(SET.fwDm, METH.povidone)),
      flag('Magnesium stearate', 'cleared', dailymed(SET.fwDm, METH.stearic)),
      flag('Microcrystalline cellulose', 'cleared', dailymed(SET.fwDm, METH.cellulose)),
      flag('Stearic acid', 'cleared', dailymed(SET.fwDm, METH.stearic)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Family Wellness Chest Congestion Relief DM IR 400/20 = Caution. DailyMed setid 8aee8108 (NDC 55319-890). Same inactive list as the guaifenesin-only IR twin — shared formulaId \`${FW_GUAIF_IR}\`. SiO2 Caution cap + maltodextrin Limited. No High. ${LIMITED_STACK} Different actives (adds DXM 20 mg) — own product id. Ages 12+. Draft, not verified.`,
    cleanAlternatives: COLD_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.fwDm} (Family Wellness guaifenesin DM IR NDC 55319-890; ${UNVERIFIED_NOTE}) — share ${FW_GUAIF_IR}`,
    ],
  }),
  row({
    id: 'dg-health-triple-abx-oil-blend',
    productName: 'DG Health Triple Antibiotic Ointment (Oil-Blend)',
    brand: 'DG Health',
    category: FIRST_AID,
    formulaId: TRIPLE_OIL_BLEND,
    audience: ADULT,
    minAge: 2,
    form: 'ointment',
    productType: OTC,
    retailers: ['Dollar General'],
    activeIngredients: [
      { name: 'Bacitracin zinc', strength: '400 units / g' },
      { name: 'Neomycin sulfate', strength: '3.5mg / g' },
      { name: 'Polymyxin B sulfate', strength: '5,000 units / g' },
    ],
    inactiveIngredients: [
      flag('Sodium pyruvate', 'cleared', dailymed(SET.dgTriple, METH.pyruvate)),
      flag('Tocopheryl acetate', 'cleared', dailymed(SET.dgTriple, METH.tocopherylAcetate)),
      flag('Cocoa butter', 'cleared', dailymed(SET.dgTriple, METH.oilFill)),
      flag('Cottonseed oil', 'cleared', dailymed(SET.dgTriple, METH.oilFill)),
      flag('Olive oil', 'cleared', dailymed(SET.dgTriple, METH.oilFill)),
      flag('White petrolatum', 'cleared', dailymed(SET.dgTriple, METH.petrolatum)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: DG Health Triple Antibiotic oil-blend 55910-209 = Caution. Drivers are sodium pyruvate (Caution, Sept 16 lock) + tocopheryl acetate (Caution; distinct from Cleared mixed tocopherols). No High. DailyMed setid 1694f4ee Drug Facts: cocoa butter, cottonseed oil, olive oil, sodium pyruvate, tocopheryl acetate, white petrolatum. Reuses \`${TRIPLE_OIL_BLEND}\`. Named ointment oils / cocoa butter are Cleared topical fill — not the gummy seed-oil High rule. ${OIL_FILL_TAP} Do not merge into petrolatum-only Triple + Pain. First-aid antibiotic monograph: ages 2+ (under 2: ask a doctor). Draft, not verified.`,
    cleanAlternatives: FIRST_AID_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.dgTriple} (DG Health Triple Abx oil-blend NDC 55910-209; ${UNVERIFIED_NOTE}) — reuse ${TRIPLE_OIL_BLEND}`,
    ],
  }),
  row({
    id: 'family-wellness-pain-scar-itch',
    productName: 'Family Wellness Pain Scar Itch Triple Antibiotic (69396-054)',
    brand: 'Family Wellness',
    category: FIRST_AID,
    formulaId: 'family-wellness-pain-scar-itch',
    audience: ADULT,
    minAge: 2,
    form: 'ointment',
    productType: OTC,
    retailers: ['Family Dollar'],
    activeIngredients: [
      { name: 'Bacitracin zinc', strength: '400 units / g' },
      { name: 'Neomycin sulfate', strength: '3.5mg / g' },
      { name: 'Polymyxin B sulfate', strength: '5,000 units / g' },
      { name: 'Pramoxine HCl', strength: '10mg / g' },
    ],
    inactiveIngredients: [
      flag('Sodium pyruvate', 'cleared', dailymed(SET.fwScar, METH.pyruvate)),
      flag('Vitamin E (alpha-tocopherol)', 'cleared', dailymed(SET.fwScar, METH.tocopherols)),
      flag('Cocoa butter', 'cleared', dailymed(SET.fwScar, METH.oilFill)),
      flag('Cottonseed oil', 'cleared', dailymed(SET.fwScar, METH.oilFill)),
      flag('Olive oil', 'cleared', dailymed(SET.fwScar, METH.oilFill)),
      flag('Petrolatum', 'cleared', dailymed(SET.fwScar, METH.petrolatum)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Family Wellness Pain Scar Itch 69396-054 = Caution. Driver is sodium pyruvate (Caution, Sept 16 lock). DailyMed setid 9e507ec5 Drug Facts: cocoa butter, Levant cottonseed oil, olive oil, petrolatum, sodium pyruvate, vitamin E. Structured SPL maps vitamin E to alpha-tocopherol (Cleared mixed-tocopherols row) — not tocopheryl acetate. Own formulaId — do not silently merge into \`${TRIPLE_OIL_BLEND}\` (that family flags tocopheryl acetate). ${OIL_FILL_TAP} Not 69396-041 (cetyl alcohol ungraded — skipped). Not the petrolatum ± mineral oil Clean twins. Ages 2+ (under 2: ask a doctor). Draft, not verified.`,
    cleanAlternatives: FIRST_AID_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.fwScar} (Family Wellness Pain Scar Itch NDC 69396-054; ${UNVERIFIED_NOTE})`,
    ],
  }),
  row({
    id: 'equate-childrens-vaporizing-rub',
    productName: "Equate Children's Vaporizing Rub",
    brand: 'Equate',
    category: COLD_FLU,
    formulaId: 'equate-childrens-vaporizing-rub',
    audience: KIDS,
    minAge: 2,
    form: 'ointment',
    productType: OTC,
    retailers: ['Walmart'],
    activeIngredients: [
      { name: 'Camphor', strength: '4.8%' },
      { name: 'Eucalyptus oil', strength: '1.2%' },
      { name: 'Menthol', strength: '2.6%' },
    ],
    inactiveIngredients: [
      flag('Fragrance', 'cleared', dailymed(SET.eqVap, METH.fragrance)),
      flag('Thymol', 'cleared', dailymed(SET.eqVap, METH.thymol)),
      flag('Turpentine oil', 'cleared', dailymed(SET.eqVap, METH.turpentine)),
      flag('White petrolatum', 'cleared', dailymed(SET.eqVap, METH.petrolatum)),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-LOCK DRAFT: Equate Children’s Vaporizing Rub = Caution. DailyMed setid 372e66a6 (NDC 49035-770). Drug Facts inactives: fragrance, thymol, turpentine oil, white petrolatum. Fragrance (topical) + thymol + spirits of turpentine / turpentine oil are locked Caution tokens. White petrolatum is Cleared (petrolatum grade is no longer an intake block). No High. Adult Equate Vaporizing 49035-872 prints the same inactive list — not a second row this write. Camphor / eucalyptus / menthol stay parked as actives. External use only; keep away from nostrils / mouth / eyes. Typical chest-rub monograph: ages 2+ (under 2: do not use). Draft, not verified.',
    cleanAlternatives: VAPOR_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.eqVap} (Equate Children's Vaporizing Rub NDC 49035-770; ${UNVERIFIED_NOTE})`,
    ],
  }),
  row({
    id: 'equate-nighttime-lubricant-ointment',
    productName: 'Equate Nighttime Relief Lubricant Eye Ointment',
    brand: 'Equate',
    category: ALLERGY,
    formulaId: STORE_PM_LANOLIN,
    audience: ADULT,
    minAge: 2,
    form: 'ointment',
    productType: OTC,
    retailers: ['Walmart'],
    activeIngredients: [
      { name: 'Light mineral oil', strength: '42.5%' },
      { name: 'White petrolatum', strength: '57.3%' },
    ],
    inactiveIngredients: [
      flag('Lanolin alcohols', 'cleared', dailymed(SET.eqPm, METH.lanolinAlcohol)),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-LOCK DRAFT: Equate Nighttime Relief Lubricant ointment = Caution (lanolin alcohols). DailyMed setid 152171db (NDC 79903-260). Actives are light mineral oil 42.5% + white petrolatum 57.3% (lubricant ACTIVES — not oral oil demerits). Only inactive is lanolin alcohols — locked Caution wool-alcohol family (Sept 16). No High. Shared formulaId with the CVS Nighttime Dry-Eye twin (same actives + lanolin alcohol). Prefer in-batch / already-on-main PF tears over this PM ointment. Equate PF + BKC multi-dose already on main — this is the skipped E6 store PM hole. Draft, not verified.',
    cleanAlternatives: EYE_PF_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.eqPm} (Equate Nighttime Relief Lubricant NDC 79903-260; ${UNVERIFIED_NOTE})`,
    ],
  }),
  row({
    id: 'cvs-health-nighttime-dry-eye',
    productName: 'CVS Nighttime Dry-Eye Relief Ointment',
    brand: 'CVS Health',
    category: ALLERGY,
    formulaId: STORE_PM_LANOLIN,
    audience: ADULT,
    minAge: 2,
    form: 'ointment',
    productType: OTC,
    retailers: ['CVS'],
    activeIngredients: [
      { name: 'Mineral oil', strength: '42.5%' },
      { name: 'White petrolatum', strength: '57.3%' },
    ],
    inactiveIngredients: [
      flag('Lanolin alcohol', 'cleared', dailymed(SET.cvsPm, METH.lanolinAlcohol)),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-LOCK DRAFT: CVS Nighttime Dry-Eye Relief ointment = Caution (lanolin alcohol). DailyMed setid fc1c3dad (NDC 59779-788). Same mineral oil 42.5% + white petrolatum 57.3% + lanolin-alcohol inactive as Equate Nighttime Relief — shared `store-pm-ointment-lanolin-alcohol`. NBE Refresh PM on the SPL title is a compare-to, not a Clean merge (Refresh PM already on main; do not reopen). Prefer PF tears. Draft, not verified.',
    cleanAlternatives: EYE_PF_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.cvsPm} (CVS Nighttime Dry-Eye Relief NDC 59779-788; ${UNVERIFIED_NOTE}) — share ${STORE_PM_LANOLIN}`,
    ],
  }),
  row({
    id: 'topcare-original-eye-drops',
    productName: 'TopCare Health Original Eye Drops (Tetrahydrozoline 0.05%)',
    brand: 'TopCare',
    category: ALLERGY,
    formulaId: 'topcare-original-eye-drops',
    audience: ADULT,
    minAge: 6,
    form: 'drops',
    productType: OTC,
    retailers: ['Save Mart'],
    activeIngredients: [{ name: 'Tetrahydrozoline HCl', strength: '0.05%' }],
    inactiveIngredients: [
      flag('Benzalkonium chloride', 'cleared', dailymed(SET.tcEye, METH.bkc)),
      cleared(SET.tcEye, 'Boric acid'),
      flag('Edetate disodium', 'cleared', dailymed(SET.tcEye, METH.edta)),
      cleared(SET.tcEye, 'Purified water'),
      cleared(SET.tcEye, 'Sodium borate'),
      cleared(SET.tcEye, 'Sodium chloride'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-LOCK DRAFT: TopCare Health Original Eye Drops = Caution (BKC). DailyMed setid 9c61a56a (NDC 36800-858). Inactives: benzalkonium chloride, boric acid, edetate disodium, purified water, sodium borate, sodium chloride. BKC is standalone Caution (not Avoid). Tetrahydrozoline rebound-redness is a labeled use note, not an invented active-safety grade. Not a cleaner alternative. Ages 6+ typical for this redness class (under 6: consult a doctor). Slice-2 eye hole from batch 21. Draft, not verified.',
    cleanAlternatives: EYE_PF_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.tcEye} (TopCare Original Eye Drops NDC 36800-858; ${UNVERIFIED_NOTE})`,
    ],
  }),

  // ── Avoid ────────────────────────────────────────────────
  row({
    id: 'walgreens-allergy-relief-cetirizine',
    productName: 'Walgreens Allergy Relief (Cetirizine 10 mg)',
    brand: 'Walgreens',
    category: ALLERGY,
    formulaId: COATED_CETIRIZINE,
    audience: ADULT,
    minAge: 6,
    form: 'film-coated tablet',
    productType: OTC,
    retailers: ['Walgreens'],
    activeIngredients: [{ name: 'Cetirizine HCl', strength: '10mg' }],
    inactiveIngredients: [
      flag('FD&C Blue No. 1 aluminum lake', 'high', dailymed(SET.walCet, METH.dyes)),
      flag('Titanium dioxide', 'high', dailymed(SET.walCet, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.walCet, METH.peg)),
      flag('Corn starch', 'cleared', dailymed(SET.walCet, METH.starch)),
      flag('Hypromellose', 'cleared', dailymed(SET.walCet, METH.hpmc)),
      flag('Lactose monohydrate', 'cleared', dailymed(SET.walCet, METH.gelatin)),
      cleared(SET.walCet, 'Magnesium stearate'),
      flag('Povidone', 'cleared', dailymed(SET.walCet, METH.povidone)),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER-LOCK DRAFT: Walgreens Allergy Relief cetirizine 10 mg = Avoid (Blue #1 lake + TiO2). Reuses `store-cetirizine-coated-blue1-tio2`. DailyMed setid 678dcc09 (NDC 0363-4101). Drug Facts: corn starch, FD&C blue no. 1 aluminum lake, hypromellose, lactose monohydrate, magnesium stearate, polydextrose, polyethylene glycol, povidone, titanium dioxide, triacetin. Same Blue #1 + TiO2 coat family as Equate / Member’s Mark / CVS / Kirkland Aller-Tec / TopCare. Prefer in-batch L612 loratadine. Ages 6+. Draft, not verified.',
    cleanAlternatives: ALLERGY_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.walCet} (Walgreens cetirizine NDC 0363-4101; ${UNVERIFIED_NOTE}) — reuse ${COATED_CETIRIZINE}`,
    ],
  }),
  row({
    id: 'topcare-sleep-aid-dph',
    productName: 'TopCare Sleep Aid Nighttime (Diphenhydramine 25 mg)',
    brand: 'TopCare',
    category: SLEEP,
    formulaId: DPH_SLEEP_COAT,
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    productType: OTC,
    retailers: ['Save Mart'],
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '25mg' }],
    inactiveIngredients: [
      flag('FD&C Blue No. 1 aluminum lake', 'high', dailymed(SET.tcDph, METH.dyes)),
      flag('FD&C Blue No. 2 aluminum lake', 'high', dailymed(SET.tcDph, METH.dyes)),
      flag('Titanium dioxide', 'high', dailymed(SET.tcDph, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.tcDph, METH.peg)),
      flag('Polysorbate 80', 'moderate', dailymed(SET.tcDph, METH.ps80)),
      flag('Carnauba wax', 'cleared', dailymed(SET.tcDph, METH.gelatin)),
      flag('Crospovidone', 'cleared', dailymed(SET.tcDph, METH.povidone)),
      flag(
        'Dibasic calcium phosphate dihydrate',
        'cleared',
        dailymed(SET.tcDph, METH.dical),
      ),
      flag('Hypromellose', 'cleared', dailymed(SET.tcDph, METH.hpmc)),
      flag('Magnesium stearate', 'cleared', dailymed(SET.tcDph, METH.stearic)),
      flag('Microcrystalline cellulose', 'cleared', dailymed(SET.tcDph, METH.cellulose)),
      flag('Pregelatinized starch', 'cleared', dailymed(SET.tcDph, METH.starch)),
      flag('Stearic acid', 'cleared', dailymed(SET.tcDph, METH.stearic)),
    ],
    verdict: 'avoid',
    honestNote: `FOUNDER-LOCK DRAFT: TopCare Sleep Aid Nighttime DPH 25 mg = Avoid (Blue #1 / #2 lakes + TiO2). Reuses \`dg-health-sleep-aid-dph\` — same Drug Facts list as DG Health Sleep Aid DPH (setid 038c1b4e). DailyMed setid 30284271 (NDC 36800-431): carnauba wax, crospovidone, dibasic calcium phosphate dihydrate, FD&C blue #1 aluminum lake, FD&C blue #2 aluminum lake, hypromellose, magnesium stearate, microcrystalline cellulose, polyethylene glycol, polysorbate 80, pregelatinized starch, stearic acid, titanium dioxide. Batch 21 T9 FLAG is closed by this complete panel. Ages 12+ (under 12: do not use). ${SEDATING} Draft, not verified.`,
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.tcDph} (TopCare Sleep Aid DPH NDC 36800-431; ${UNVERIFIED_NOTE}) — reuse ${DPH_SLEEP_COAT}`,
    ],
  }),
  row({
    id: 'members-mark-mucus-dm-max-yellow10',
    productName:
      "Member's Mark Mucus Relief DM Max (Guaifenesin 1200 mg + DXM 60 mg)",
    brand: "Member's Mark",
    category: COLD_FLU,
    formulaId: MUCUS_DM_MAX_Y10,
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    productType: OTC,
    retailers: ["Sam's Club"],
    activeIngredients: [
      { name: 'Guaifenesin', strength: '1200mg' },
      { name: 'Dextromethorphan HBr', strength: '60mg' },
    ],
    inactiveIngredients: [
      flag('D&C Yellow No. 10 aluminum lake', 'high', dailymed(SET.mmDmY10, METH.dyes)),
      flag('Carbomer homopolymer type B', 'cleared', dailymed(SET.mmDmY10, METH.carbomer)),
      flag('Copovidone', 'cleared', dailymed(SET.mmDmY10, METH.povidone)),
      flag('Hypromellose', 'cleared', dailymed(SET.mmDmY10, METH.hpmc)),
      cleared(SET.mmDmY10, 'Magnesium hydroxide'),
      cleared(SET.mmDmY10, 'Magnesium stearate'),
      flag('Microcrystalline cellulose', 'cleared', dailymed(SET.mmDmY10, METH.cellulose)),
      flag('Silicon dioxide', 'cleared', dailymed(SET.mmDmY10, METH.sio2)),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER-LOCK DRAFT: Member’s Mark Mucus Relief DM Max 1200/60 = Avoid (Yellow #10 lake). Reuses `kirkland-mucus-dm-max-er` — same carbomer / copovidone / Yellow #10 / HPMC / Mg hydroxide / Mg stearate / MCC / SiO2 list as Kirkland Mucus-DM Max (batch 20). DailyMed setid 3db5409d (NDC 68196-812). Copovidone is now the locked povidone-family Cleared row (not an intake block). This is NOT the Blue #1 MM DM twin 68196-999 and not the guaifenesin-only dye-free 68196-405. Ages 12+. Swallow whole. Draft, not verified.',
    cleanAlternatives: COLD_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.mmDmY10} (Member's Mark Mucus DM Max Y10 NDC 68196-812; ${UNVERIFIED_NOTE}) — reuse ${MUCUS_DM_MAX_Y10}`,
    ],
  }),
  row({
    id: 'members-mark-mucus-dm-max-blue1',
    productName:
      "Member's Mark Mucus Relief DM (Guaifenesin 1200 mg + DXM 60 mg, Blue #1)",
    brand: "Member's Mark",
    category: COLD_FLU,
    formulaId: 'members-mark-mucus-dm-max-blue1',
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    productType: OTC,
    retailers: ["Sam's Club"],
    activeIngredients: [
      { name: 'Guaifenesin', strength: '1200mg' },
      { name: 'Dextromethorphan HBr', strength: '60mg' },
    ],
    inactiveIngredients: [
      flag('FD&C Blue No. 1', 'high', dailymed(SET.mmDmBlue, METH.dyes)),
      flag(
        'Ferric oxide yellow',
        'cleared',
        dailymed(SET.mmDmBlue, METH.ironOxide),
      ),
      flag('Carbomer homopolymer type B', 'cleared', dailymed(SET.mmDmBlue, METH.carbomer)),
      flag('Colloidal silicon dioxide', 'cleared', dailymed(SET.mmDmBlue, METH.sio2)),
      flag('Hypromellose', 'cleared', dailymed(SET.mmDmBlue, METH.hpmc)),
      cleared(SET.mmDmBlue, 'Magnesium stearate'),
      flag('Microcrystalline cellulose', 'cleared', dailymed(SET.mmDmBlue, METH.cellulose)),
      flag('Sodium starch glycolate', 'cleared', dailymed(SET.mmDmBlue, METH.ssg)),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER-LOCK DRAFT: Member’s Mark Mucus Relief DM 68196-999 = Avoid (Blue #1). DailyMed setid 2b59f90b. Drug Facts: carbomer homopolymer type B, colloidal silicon dioxide, FD&C Blue #1, ferric oxide yellow, hypromellose, magnesium stearate, microcrystalline cellulose, sodium starch glycolate. Own formulaId — not the Yellow #10 Max twin (`kirkland-mucus-dm-max-er`) and not guaifenesin-only dye-free. Confirm the carton (Sam’s has sold both DM coats). Ages 12+. Swallow whole. Draft, not verified.',
    cleanAlternatives: COLD_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.mmDmBlue} (Member's Mark Mucus DM Blue #1 NDC 68196-999; ${UNVERIFIED_NOTE})`,
    ],
  }),
  row({
    id: 'walgreens-sleep-aid-liquid-dyed',
    productName: 'Walgreens Nighttime Sleep Aid Liquid (Diphenhydramine 50 mg / 30 mL)',
    brand: 'Walgreens',
    category: SLEEP,
    formulaId: 'walgreens-sleep-aid-liquid-dyed',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    productType: OTC,
    retailers: ['Walgreens'],
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '50mg / 30mL' }],
    inactiveIngredients: [
      flag('FD&C Blue No. 1', 'high', dailymed(SET.walSleepDye, METH.dyes)),
      flag('FD&C Red No. 40', 'high', dailymed(SET.walSleepDye, METH.dyes)),
      flag('Sucralose', 'moderate', dailymed(SET.walSleepDye, METH.sucralose)),
      flag('Flavor', 'limited', dailymed(SET.walSleepDye, METH.flavors)),
      flag('Sodium benzoate', 'limited', dailymed(SET.walSleepDye, METH.benzoate)),
      flag('Sorbitol', 'limited', dailymed(SET.walSleepDye, METH.sorbitol)),
      flag('Anhydrous citric acid', 'cleared', dailymed(SET.walSleepDye, METH.citrate)),
      flag('Glycerin', 'cleared', dailymed(SET.walSleepDye, METH.glycerin)),
      cleared(SET.walSleepDye, 'Potassium citrate'),
      cleared(SET.walSleepDye, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote: `FOUNDER-LOCK DRAFT: Walgreens Nighttime Sleep Aid liquid dyed = Avoid (Blue #1 + Red #40). DailyMed setid 048cfa3a (NDC 0363-7300). Drug Facts: anhydrous citric acid, FD&C Blue No. 1, FD&C Red No. 40, flavor, glycerin, potassium citrate, purified water, sodium benzoate, sorbitol, sucralose. Own formulaId — not up&up dyed (that family adds oral PG + saccharin) and not CVS dyed 9f944edc. One 30 mL dose at bedtime. Ages 12+ (under 12: do not use). ${SEDATING} Draft, not verified.`,
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.walSleepDye} (Walgreens Nighttime Sleep Aid dyed NDC 0363-7300; ${UNVERIFIED_NOTE})`,
    ],
  }),
  row({
    id: 'walgreens-sleep-z-dyefree',
    productName: 'Walgreens Dye-Free Wal-Sleep Z (Diphenhydramine 50 mg / 30 mL)',
    brand: 'Walgreens',
    category: SLEEP,
    formulaId: SLEEP_LIQUID_DF,
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    productType: OTC,
    retailers: ['Walgreens'],
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '50mg / 30mL' }],
    inactiveIngredients: [
      flag('Sucralose', 'moderate', dailymed(SET.walSleepDf, METH.sucralose)),
      flag('Flavor', 'limited', dailymed(SET.walSleepDf, METH.flavors)),
      flag('Sodium benzoate', 'limited', dailymed(SET.walSleepDf, METH.benzoate)),
      flag('Sorbitol', 'limited', dailymed(SET.walSleepDf, METH.sorbitol)),
      flag('Xanthan gum', 'cleared', dailymed(SET.walSleepDf, METH.gums)),
      flag('Anhydrous citric acid', 'cleared', dailymed(SET.walSleepDf, METH.citrate)),
      flag('Glycerin', 'cleared', dailymed(SET.walSleepDf, METH.glycerin)),
      cleared(SET.walSleepDf, 'Potassium citrate'),
      cleared(SET.walSleepDf, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote: `FOUNDER-LOCK DRAFT: Walgreens Dye-Free Wal-Sleep Z = Avoid, not Caution. Reuses \`cvs-sleep-aid-liquid-dyefree\` — same sucralose + flavor + sodium benzoate + sorbitol dye-free trap locked Avoid in batch 7 (CVS Health no-FD&C setid 03f521f4). DailyMed setid 96948973 (NDC 0363-0753). Dye-free / no-FD&C is not Clean and is not parked at Caution. Berry-flavor alcohol-free liquid. One 30 mL dose at bedtime. Ages 12+ (under 12: do not use). ${SEDATING} Draft, not verified.`,
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.walSleepDf} (Walgreens Dye-Free Wal-Sleep Z NDC 0363-0753; ${UNVERIFIED_NOTE}) — reuse ${SLEEP_LIQUID_DF}`,
    ],
  }),
  row({
    id: 'walgreens-omeprazole-20',
    productName: 'Walgreens Omeprazole 20 mg Delayed-Release',
    brand: 'Walgreens',
    category: DIGESTIVE,
    formulaId: 'walgreens-omeprazole-20',
    audience: ADULT,
    minAge: 18,
    form: 'delayed-release tablet',
    productType: OTC,
    retailers: ['Walgreens'],
    activeIngredients: [{ name: 'Omeprazole', strength: '20mg' }],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', dailymed(SET.walOme, METH.tio2)),
      flag('Talc', 'high', dailymed(SET.walOme, METH.talc)),
      flag('Propylene glycol', 'moderate', dailymed(SET.walOme, METH.pg)),
      flag('Sodium lauryl sulfate', 'cleared', dailymed(SET.walOme, METH.sls)),
      flag('Ferric oxide red', 'cleared', dailymed(SET.walOme, METH.ironOxide)),
      flag('Ferric oxide yellow', 'cleared', dailymed(SET.walOme, METH.ironOxide)),
      flag('Carnauba wax', 'cleared', dailymed(SET.walOme, METH.gelatin)),
      flag('Hypromellose', 'cleared', dailymed(SET.walOme, METH.hpmc)),
      flag('Lactose monohydrate', 'cleared', dailymed(SET.walOme, METH.gelatin)),
      flag('Sodium starch glycolate', 'cleared', dailymed(SET.walOme, METH.ssg)),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER-LOCK DRAFT: Walgreens Omeprazole 20 mg DR = Avoid (TiO2 + talc). DailyMed setid 30a893d2 (NDC 0363-0915). Drug Facts: carnauba wax, ferric oxide red, ferric oxide yellow, hypromellose, hypromellose acetate succinate, lactose monohydrate, monoethanolamine, propylene glycol, sodium lauryl sulfate, sodium starch glycolate, sodium stearate, sodium stearyl fumarate, talc, titanium dioxide, triethyl citrate. Own formulaId — do not silently merge into `dg-health-omeprazole-dr` (confirm the bottle). SLS is standalone Caution (not the Avoid driver). minAge 18. Mirror batch 10 / 21 PPI TiO2/talc Avoid. Draft, not verified.',
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.walOme} (Walgreens omeprazole 20 NDC 0363-0915; ${UNVERIFIED_NOTE})`,
    ],
  }),
  row({
    id: 'walgreens-famotidine-20',
    productName: 'Walgreens Famotidine 20 mg',
    brand: 'Walgreens',
    category: DIGESTIVE,
    formulaId: 'walgreens-famotidine-20',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    productType: OTC,
    retailers: ['Walgreens'],
    activeIngredients: [{ name: 'Famotidine', strength: '20mg' }],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', dailymed(SET.walFam, METH.tio2)),
      flag('Talc', 'high', dailymed(SET.walFam, METH.talc)),
      flag('Red iron oxide', 'cleared', dailymed(SET.walFam, METH.ironOxide)),
      flag('Yellow iron oxide', 'cleared', dailymed(SET.walFam, METH.ironOxide)),
      flag('Carnauba wax', 'cleared', dailymed(SET.walFam, METH.gelatin)),
      flag('Corn starch', 'cleared', dailymed(SET.walFam, METH.starch)),
      flag('Hypromellose', 'cleared', dailymed(SET.walFam, METH.hpmc)),
      cleared(SET.walFam, 'Magnesium stearate'),
      flag('Microcrystalline cellulose', 'cleared', dailymed(SET.walFam, METH.cellulose)),
      flag('Sodium starch glycolate', 'cleared', dailymed(SET.walFam, METH.ssg)),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER-LOCK DRAFT: Walgreens Famotidine 20 mg = Avoid (TiO2 + talc). DailyMed setid 2766ffe7 (NDC 0363-5300). Drug Facts: carnauba wax, corn starch, hydroxypropyl cellulose, hypromellose, magnesium stearate, microcrystalline cellulose, red iron oxide, sodium starch glycolate, talc, titanium dioxide, yellow iron oxide. Own formulaId — do not merge into `equate-famotidine` (that coat adds colloidal SiO2 / croscarmellose / lactose). HPC is the locked HPMC-family Cleared sibling. Ages 12+. Draft, not verified.',
    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.walFam} (Walgreens famotidine 20 NDC 0363-5300; ${UNVERIFIED_NOTE})`,
    ],
  }),
];

export const BATCH65_SKIPPED: { sku: string; reason: string }[] = [
  {
    sku: 'Equate Extra Strength Pain Reliever 100-ct white',
    reason: 'Already coded on main (equate-es-pain-reliever). Do not reopen.',
  },
  {
    sku: 'Walgreens prenatal coated',
    reason: 'Already on main and stays DRY. Do not reopen.',
  },
  {
    sku: 'Assured cetirizine / ES APAP / menthol patches',
    reason: 'No-panel skip — no live DailyMed / no harvested tokens.',
  },
  {
    sku: 'Kirkland guaifenesin-only',
    reason:
      'SKIPPED honestly — live Costco guaifenesin-only DailyMed not found. 44-532 is delisted (Blue #1). Do not invent from the dead SPL.',
  },
  {
    sku: "Member's Mark Max Sleep Aid DPH 50 softgels",
    reason:
      'SKIPPED honestly — no Sam’s-specific DailyMed / carton OI this hunt. National 50 mg DPH softgel SPLs are not this SKU.',
  },
  {
    sku: "Member's Mark Vitamin D3 softgels",
    reason:
      'SKIPPED honestly — conflicting OI (HelloPharmacist/DSLD 321613 lists soybean + BHT + corn oil; other cartons list safflower, no BHT). Not confirmed ≠ Kirkland clear. BHT would Avoid if that panel is the bottle — do not pick a side.',
  },
  {
    sku: "Member's Mark Fish Oil + D3 / Men's / Adult Daily Multi / kids multi gummies",
    reason: 'SKIPPED honestly — no complete confirmed Other Ingredients panel this hunt. Do not invent TiO2 split.',
  },
  {
    sku: 'Equate Vitamin D3 softgels',
    reason: 'SKIPPED honestly — OI not confirmed distinct from Kirkland clear D3.',
  },
  {
    sku: 'Kirkland Wild Alaskan / enteric fish oil',
    reason: 'SKIPPED honestly — OI not confirmed ≠ Kirkland clear FO already on main.',
  },
  {
    sku: 'Kirkland club sleep',
    reason:
      'SKIPPED honestly — no complete Kirkland sleep-aid SPL this hunt. Costco DPH 25 allergy (63981-329) facts incomplete / not the sleep SKU.',
  },
  {
    sku: 'Family Wellness Triple Original 69396-041',
    reason:
      'SKIPPED honestly — cetyl alcohol is not an exact §5 token (stearyl / cetearyl are locked; do not cousin-alias). Squalane is now Cleared but the cetyl gap still blocks the row.',
  },
  {
    sku: 'DG Health guaifenesin IR',
    reason: 'SKIPPED honestly — no live DG IR guaifenesin-only DailyMed this hunt (ER 600 / Max 1200 only).',
  },
  {
    sku: 'Nice! grocery house / W-brand leftovers',
    reason:
      'Nice! grocery OTC/vit with OI not found. NICE cough drops are a different national brand — OUT. Current Walgreens / W-brand loratadine L612 written; older Wal-itin NDCs ended.',
  },
  {
    sku: 'TopCare vitamins / kids multi / ear',
    reason: 'SKIPPED honestly — no complete vitamin / otic OI this hunt. Sleep DPH + Original Eye written.',
  },
  {
    sku: 'up&up / Walgreens PM ointment',
    reason: 'SKIPPED honestly — no complete matching PM ointment SPL this hunt. Equate + CVS PM written.',
  },
  {
    sku: 'Walgreens adult vitamins',
    reason: 'SKIPPED honestly — no complete DSLD / carton Other Ingredients this hunt. Do not invent.',
  },
];

const _ROWS = BATCH65_KYR6_STORE_GENERICS;
if (_ROWS.length !== 20) throw new Error('batch65 tally drift: expected 20 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 3) {
  throw new Error('batch65 Clean tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 9) {
  throw new Error('batch65 Caution tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 8) {
  throw new Error('batch65 Avoid tally drift');
}
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch65 recordStatus must stay unverified');
}
if (_ROWS.some((r) => !r.formulaId)) {
  throw new Error('batch65 every row needs formulaId');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch65 duplicate ids');

const FORBIDDEN_IDS = [
  'equate-es-pain-reliever',
  'walgreens-prenatal-coated',
  'amazon-basic-care-mucus-er-max-dyefree',
  'amazon-basic-care-triple-abx-oil-blend',
  'kirkland-mucus-dm-max-er',
  'dg-health-mucus-er',
  'dg-health-sleep-aid-dph',
  'cvs-sleep-aid-liquid-dyefree',
  'members-mark-loratadine-tablets',
  'members-mark-acetaminophen-es',
];
if (_ROWS.some((r) => FORBIDDEN_IDS.includes(r.id))) {
  throw new Error('batch65 must not clone closed product ids');
}

const dgMax = _ROWS.find((r) => r.id === 'dg-health-mucus-er-max-dyefree');
if (dgMax?.verdict !== 'clean' || dgMax.formulaId !== MUCUS_ER_MAX_DF) {
  throw new Error('DG Mucus-ER Max 626 must be Clean reuse of dye-free Max');
}
if (dgMax.inactiveIngredients.some((i) => /blue|dye|lake/i.test(i.name))) {
  throw new Error('DG Mucus-ER Max 626 must stay dye-free — do not import 55910-887');
}

const gs = _ROWS.find((r) => r.id === 'goodsense-es-pain-relief-l484');
if (gs?.formulaId !== L484_FORMULA || gs.verdict !== 'caution') {
  throw new Error('GoodSense ES APAP must reuse L484 PEG Caution');
}

const walLorat = _ROWS.find((r) => r.id === WALGREENS_LORATADINE);
if (walLorat?.formulaId !== L612_FORMULA || walLorat.verdict !== 'clean') {
  throw new Error('Walgreens loratadine must reuse L612 Clean');
}

const walDf = _ROWS.find((r) => r.id === 'walgreens-sleep-z-dyefree');
if (walDf?.verdict !== 'avoid' || walDf.formulaId !== SLEEP_LIQUID_DF) {
  throw new Error('Walgreens dye-free sleep must reuse CVS dye-free trap Avoid');
}

const fw041 = _ROWS.some((r) => /69396-041/.test(r.productName));
if (fw041) throw new Error('FW 69396-041 is skipped (cetyl alcohol ungraded)');

const prenatal = _ROWS.some((r) => /prenatal/i.test(r.productName));
if (prenatal) throw new Error('Walgreens prenatal coated stays DRY');

for (const record of BATCH65_KYR6_STORE_GENERICS) {
  const expected = BATCH65_CATCHUP_BARCODES[record.id];
  if (expected && record.barcode !== expected) {
    throw new Error(`batch 65 catch-up UPC drift on ${record.id}`);
  }
}
