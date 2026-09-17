// DRAFT / not verified / batch 40 Bayer / Excedrin / Infants’ Motrin
// leftover / methodology v1.6 + Sept 15 triacetin Cleared lock.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. New in-scope US Pain & Fever / Sleep rows only.
// recordStatus is 'unverified' on every row. Internal keys only:
// clean | caution | avoid. Do NOT invent Clean. Do NOT invent UPCs /
// barcodes. Pack sizes of the same name+form+inactives share formulaId.
// Form is labeled on cleanAlternatives, not a hard filter (§6). Not
// wired into Clean Picks UI. No live Clean Picks file is edited. No
// photos. Letter tiles only on new ids. No fake Clean alts. No
// methodology rewrite.
//
// REUSE ONLY (do not rewrite / do not clone) — 12 existing ids from
// batches 1 / 2 / 39:
// Batch 1: motrin-ib-caplets, advil-dual-action
// Batch 2: motrin-children-liquid-dyed, motrin-children-liquid-dyefree,
//   motrin-children-chew-dyed, motrin-children-chew-dyefree,
//   motrin-infants-liquid-dyed
// Batch 39: advil-dual-action-back-pain, motrin-dual-action, motrin-pm,
//   motrin-ib-liquid-gels, motrin-ib-migraine-liquid-gels
//
// LIST 2 — proposed scan verdicts (11 formula rows, all Avoid).
// LIST 3 — founder lock applied, not re-derived (1 formula row):
//   Genuine Bayer Aspirin 325 coated — triacetin = Cleared. Write Clean
//   because the SPL has no High / Limited / Caution left (carnauba /
//   corn starch / HPMC / powdered cellulose + triacetin).
//
// TALLY (unverified drafts in THIS file): 12 rows — Clean 1 /
// Caution 0 / Avoid 11.
// Independently Clean swaps: genuine-bayer-aspirin-325 (this batch);
// genexa-acetaminophen-es / genexa-infants-apap-liquid /
// hylands-calms-forte already on main. No Clean ibuprofen invented.
// Cherry chew ≠ orange chew (separate formulaIds). Excedrin ES
// Blue #1 coat ≠ TiO2-only coat (separate formulaIds). Infants’
// Motrin Dye-Free ≠ motrin-infants-liquid-dyed.
//
// LIST 4 is PR-comment only — no Search rows for topicals (Motrin
// Arthritis gel), kits (Excedrin PM+ES / Tension kits), Geltabs as
// new if discontinued from the current US brand lineup, Canada/EU,
// skincare, or cold/flu/sinus.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const OTC = 'OTC' as const;
const PAIN_FEVER = 'Pain & Fever';
const SLEEP = 'Sleep';
const UNVERIFIED_NOTE = 'draft, not verified';

const PF_RETAILERS = [
  'Walmart',
  'Target',
  'CVS',
  'Walgreens',
  'Safeway',
] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const CARAMEL_TAP =
  'Label says caramel and does not name Class I/II vs III/IV. Undisclosed class is treated as Class III/IV — High / Avoid.';

const TRIACETIN_TAP =
  'Triacetin is the locked Cleared tablet/caplet coating plasticizer. Not a grade driver.';

const MCT_UNLABELED_TAP =
  'Label says medium-chain triglycerides and does not name coconut. We mark that Limited because the source isn’t clear. MCT labeled from coconut is Cleared on oral capsule/softgel/liquid supplements (not a cooking-oil bottle). Softgel/tablet fill is not the gummy seed-oil High rule.';

const METHACRYLIC_TAP =
  'Methacrylic acid copolymer / unnamed delayed-release composites are the locked Caution enteric-coat row until specified. Standalone Caution, not additive-scored, not Avoid.';

const SLS_TAP =
  'Sodium lauryl sulfate is standalone Caution (irritant class, not additive-scored) and is not an Avoid driver.';

const SORBITAN_TAP =
  'Sorbitan (plain / sorbitan esters) is the locked Caution row — polysorbate neighborhood, not additive-scored, not Avoid. It is not the sugar-alcohol Limited row.';

const SEDATING =
  'Nighttime first-generation antihistamine — labeled drowsiness will occur; next-day drowsiness can linger. Cleanliness grade only; no efficacy claim.';

const METH = {
  tio2: 'Methodology §5 High-tier (titanium dioxide / E171)',
  dyes: 'Methodology §5 High-tier (synthetic dyes, including lake forms)',
  talc: 'Methodology §5 High-tier (talc — IARC 2A; no pharma-grade exception)',
  caramel:
    'Methodology §5 High-tier (caramel color, undisclosed class — treated as Class III/IV). ' +
    CARAMEL_TAP,
  peg: 'Methodology §5 Moderate-risk (PEGs — ethylene-oxide / 1,4-dioxane contamination risk)',
  pg: 'Methodology §5 Moderate-risk (propylene glycol, oral)',
  ps80: 'Methodology §5 Moderate-risk (polysorbate 80)',
  ps20: 'Methodology §5 Moderate-risk (polysorbate 20 — same 2023 gut-barrier signal as P80)',
  saccharin: 'Methodology §5 Moderate-risk (saccharin)',
  maltodextrin: 'Methodology §5 Limited-risk (non-organic maltodextrin)',
  polydextrose: 'Methodology §5 Limited-risk (polydextrose — maltodextrin-like)',
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  benzoate: 'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate)',
  benzoic:
    'Methodology §5 Limited-risk (synthetic preservatives — benzoic acid / benzoate class)',
  sorbitol: 'Methodology §5 Limited-risk (sugar alcohols — sorbitol)',
  mctUnlabeled: `Methodology §5 Limited-risk (unlabeled MCT — coconut vs other source not named; opacity; not Avoid). ${MCT_UNLABELED_TAP}`,
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  sls: `Methodology §5 Caution (sodium lauryl sulfate — population/irritant; standalone Caution, not additive-scored, not Avoid). ${SLS_TAP}`,
  methacrylic: `Methodology §5 Caution (methacrylic acid copolymer / unnamed delayed-release composites — enteric coat; standalone Caution, not Avoid). ${METHACRYLIC_TAP}`,
  sorbitan: `Methodology §5 Caution (sorbitan, plain / sorbitan esters as emulsifier — polysorbate neighborhood; standalone Caution, not additive-scored, not Avoid; not the sugar-alcohol Limited row). ${SORBITAN_TAP}`,
  triacetin: `Methodology §5 Cleared (triacetin — tablet/caplet coating plasticizer; locked Sept 15, 2026). ${TRIACETIN_TAP}`,
  zincStearate:
    'Methodology §5 Cleared (zinc stearate — stearate-family lubricant with magnesium / calcium stearate)',
  simethicone:
    'Methodology §5 Cleared (simethicone emulsion — dimethicone family)',
  alginic: 'Methodology §5 Cleared (alginic acid — gum/fiber family)',
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

const GENUINE = 'genuine-bayer-aspirin-325';
const GENEXA_ES = 'genexa-acetaminophen-es';
const GENEXA_INFANTS = 'genexa-infants-apap-liquid';
const CALMS_FORTE = 'hylands-calms-forte';

const ASPIRIN_ALTS: CleanAlternative[] = [
  alt(
    GENUINE,
    'Independently Clean in-batch Genuine Bayer Aspirin 325 coated (triacetin Cleared; no High / Limited / Caution on that SPL). Same Pain & Fever shelf. Form labeled, not a hard filter (§6).',
  ),
];

const APAP_ADULT_ALTS: CleanAlternative[] = [
  alt(
    GENEXA_ES,
    'Independently Clean adult acetaminophen Extra Strength already on main (founder-exception Clean). Same Pain & Fever shelf. Form labeled, not a hard filter (§6). Combo / caffeine SKUs are not a 1:1 replacement.',
  ),
];

const COMBO_ALTS: CleanAlternative[] = [
  alt(
    GENEXA_ES,
    'No independently Clean acetaminophen + aspirin + caffeine combo. Closest Clean analog is Genexa Extra Strength acetaminophen for the APAP half — not a 250/250/65 replacement. Form labeled, not a hard filter (§6).',
  ),
  alt(
    GENUINE,
    'Independently Clean in-batch Genuine Bayer Aspirin 325 for the aspirin half — not a combo replacement. Form labeled, not a hard filter (§6).',
  ),
];

const SLEEP_ALTS: CleanAlternative[] = [
  alt(
    CALMS_FORTE,
    "Independently Clean adult Sleep analog already on main (Hyland's Calms Forte, homeopathic tablets). Form: tablet — labeled, not a hard filter (§6). Conventional sedating-antihistamine PM aids have no independently Clean match.",
  ),
];

const INFANTS_ALTS: CleanAlternative[] = [
  alt(
    GENEXA_INFANTS,
    'No independently Clean infant ibuprofen. Closest Clean Pain & Fever analog is Genexa Infants acetaminophen (different active, age-matched). Form: liquid. Distinct from dyed Infants’ Motrin already on main.',
  ),
];

const SET = {
  bayerEs: '0ae64cdb-4ea0-23af-e054-00144ff88e88',
  aspirinaCaplets: '2e6f5ba8-8e8b-6059-e063-6394a90adcd5',
  backBody: '0c77c484-6caf-12ca-e054-00144ff88e88',
  aspirinaCafeina: '2e709acc-325a-baca-e063-6394a90a24be',
  enteric81: '075b103e-0bb4-4b7a-ac0e-5645bcbd0a07',
  enteric325: '0c6ae05f-7634-34d1-e054-00144ff88e88',
  chewOrange: '0c6ae05f-760f-34d1-e054-00144ff88e88',
  chewCherry: '070d5713-e018-2913-e054-00144ff8d46c',
  migraine: '7ed841fb-a61c-4868-b4e5-4f2311a5e79c',
  esBlue: 'a71074a6-cc19-4bb3-8c84-4e82a8906801',
  esTio2: '0faa3592-4d56-4645-9a0e-066e0bdfebb6',
  tension: '12c074d1-81ac-47d2-8747-b018cda0058a',
  pm: 'b3812d27-40af-40d7-864a-dfa4ae34cb9e',
  rapid: '3a36b7ca-396e-cfd8-e063-6294a90a76ab',
  infantsDf: 'c57f6ded-c0bd-45ae-823a-4c02ce334d98',
  genuine: '44a08904-68b9-4d06-a28d-21aae3d6140c',
} as const;

const ID = {
  bayerEs: 'bayer-es-500-aspirina',
  backBody: 'bayer-back-body-aspirina-cafeina',
  enteric: 'bayer-aspirin-regimen-enteric',
  chewOrange: 'bayer-chewable-81-orange',
  chewCherry: 'bayer-chewable-81-cherry',
  excedrinBlue: 'excedrin-migraine-es-blue',
  excedrinTio2: 'excedrin-es-tio2',
  tension: 'excedrin-tension-headache',
  pm: 'excedrin-pm-headache',
  rapid: 'excedrin-rapid-relief-apap',
  infantsDf: 'motrin-infants-liquid-dyefree',
  genuine: GENUINE,
} as const;

function row(opts: RatingRecord): RatingRecord {
  return {
    productType: OTC,
    recordStatus: UNVERIFIED,
    ...opts,
  };
}

export const BATCH40_BAYER_EXCEDRIN_MOTRIN: RatingRecord[] = [
  // ── List 2 Avoid — Bayer ─────────────────────────────────
  row({
    id: ID.bayerEs,
    productName: 'Bayer Extra Strength 500 / Aspirina Caplets',
    brand: 'Bayer',
    category: PAIN_FEVER,
    formulaId: ID.bayerEs,
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    activeIngredients: [{ name: 'Aspirin', strength: '500mg' }],
    inactiveIngredients: [
      flag('D&C Red No. 7 calcium lake', 'high', dailymed(SET.bayerEs, METH.dyes)),
      flag('FD&C Blue No. 2 aluminum lake', 'high', dailymed(SET.bayerEs, METH.dyes)),
      flag('FD&C Red No. 40 aluminum lake', 'high', dailymed(SET.bayerEs, METH.dyes)),
      flag('Titanium dioxide', 'high', dailymed(SET.bayerEs, METH.tio2)),
      flag('Propylene glycol', 'moderate', dailymed(SET.bayerEs, METH.pg)),
      flag('Triacetin', 'cleared', dailymed(SET.bayerEs, METH.triacetin)),
      cleared(SET.bayerEs, 'Carnauba wax'),
      cleared(SET.bayerEs, 'Corn starch'),
      cleared(SET.bayerEs, 'Hypromellose'),
      cleared(SET.bayerEs, 'Powdered cellulose'),
    ],
    verdict: 'avoid',
    honestNote:
      'PROPOSED DRAFT: Bayer Extra Strength 500 + Aspirina Caplets = Avoid. Drivers are Red #7 / Blue #2 / Red #40 lakes + titanium dioxide (High). DailyMed setids 0ae64cdb (ES) and 2e6f5ba8 (Aspirina) list the same Other Ingredients — one formulaId, not cloned. Oral PG is Moderate (not needed to reach Avoid). Shellac / aluminum oxide (lake substrate) are not in Methodology §5 (ungraded; not the Avoid drivers). Triacetin is Cleared. Ages 12+.',
    retailers: [...PF_RETAILERS, 'bayeraspirin.com'],
    cleanAlternatives: ASPIRIN_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.bayerEs} (Extra Strength 500); Aspirina twin ${SET.aspirinaCaplets} — same OI, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.backBody,
    productName: 'Bayer Back & Body Extra Strength / Aspirina Cafeína',
    brand: 'Bayer',
    category: PAIN_FEVER,
    formulaId: ID.backBody,
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    activeIngredients: [
      { name: 'Aspirin', strength: '500mg' },
      { name: 'Caffeine', strength: '32.5mg' },
    ],
    inactiveIngredients: [
      flag('D&C Red No. 30 aluminum lake', 'high', dailymed(SET.backBody, METH.dyes)),
      flag(
        'D&C Yellow No. 10 aluminum lake',
        'high',
        dailymed(SET.backBody, METH.dyes),
      ),
      flag('Titanium dioxide', 'high', dailymed(SET.backBody, METH.tio2)),
      flag('Propylene glycol', 'moderate', dailymed(SET.backBody, METH.pg)),
      flag('Triacetin', 'cleared', dailymed(SET.backBody, METH.triacetin)),
      cleared(SET.backBody, 'Carnauba wax'),
      cleared(SET.backBody, 'Corn starch'),
      cleared(SET.backBody, 'Hypromellose'),
      cleared(SET.backBody, 'Powdered cellulose'),
    ],
    verdict: 'avoid',
    honestNote:
      'PROPOSED DRAFT: Bayer Back & Body Extra Strength + Aspirina Cafeína = Avoid. Drivers are Red #30 / Yellow #10 lakes + titanium dioxide (High). DailyMed setids 0c77c484 (Back & Body) and 2e709acc (Cafeína) list the same Other Ingredients — one formulaId, not cloned. Distinct from Extra Strength 500 / Aspirina (different dye set; no caffeine). Shellac / aluminum oxide are ungraded (not the Avoid drivers). Triacetin is Cleared. Listed swap is a single-active analog, not a 500/32.5 replacement. Ages 12+.',
    retailers: [...PF_RETAILERS, 'bayeraspirin.com'],
    cleanAlternatives: ASPIRIN_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.backBody} (Back & Body); Cafeína twin ${SET.aspirinaCafeina} — same OI, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.enteric,
    productName: 'Bayer Aspirin Regimen Enteric (81 + 325)',
    brand: 'Bayer',
    category: PAIN_FEVER,
    formulaId: ID.enteric,
    audience: ADULT,
    minAge: 12,
    form: 'enteric-coated tablet',
    activeIngredients: [{ name: 'Aspirin', strength: '81mg or 325mg' }],
    inactiveIngredients: [
      flag(
        'D&C Yellow No. 10 aluminum lake',
        'high',
        dailymed(SET.enteric81, METH.dyes),
      ),
      flag(
        'FD&C Yellow No. 6 aluminum lake',
        'high',
        dailymed(SET.enteric81, METH.dyes),
      ),
      flag('Polysorbate 80', 'moderate', dailymed(SET.enteric81, METH.ps80)),
      flag('Propylene glycol', 'moderate', dailymed(SET.enteric81, METH.pg)),
      flag(
        'Methacrylic acid copolymer type C',
        'cleared',
        dailymed(SET.enteric81, METH.methacrylic),
      ),
      flag(
        'Sodium lauryl sulfate',
        'cleared',
        dailymed(SET.enteric81, METH.sls),
      ),
      flag('Triacetin', 'cleared', dailymed(SET.enteric81, METH.triacetin)),
      cleared(SET.enteric81, 'Carnauba wax'),
      cleared(SET.enteric81, 'Corn starch'),
      cleared(SET.enteric81, 'Hypromellose'),
      cleared(SET.enteric81, 'Powdered cellulose'),
    ],
    verdict: 'avoid',
    honestNote:
      `PROPOSED DRAFT: Bayer Aspirin Regimen enteric 81 + 325 = Avoid. Drivers are Yellow #10 + Yellow #6 lakes (High). DailyMed setids 075b103e (81 mg) and 0c6ae05f-7634 (325 mg) share this inactive list — one formulaId, not cloned. Distinct from chewable 81 orange (0c6ae05f-760f; Yellow #6 only, no enteric coat) and from cherry chew. ${METHACRYLIC_TAP} ${SLS_TAP} Black / brown iron oxides, shellac, and triethyl citrate are not in Methodology §5 (ungraded; not the Avoid drivers). Triacetin is Cleared. Strengths 81 and 325 share inactives; pack sizes are not graded separately. Ages 12+.`,
    retailers: [...PF_RETAILERS, 'bayeraspirin.com'],
    cleanAlternatives: ASPIRIN_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.enteric81} (81 mg enteric); 325 mg twin ${SET.enteric325} — same OI, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.chewOrange,
    productName: 'Bayer Chewable Aspirin 81 Orange',
    brand: 'Bayer',
    category: PAIN_FEVER,
    barcode: '312843131057',
    formulaId: ID.chewOrange,
    audience: ADULT,
    minAge: 12,
    form: 'chewable',
    activeIngredients: [{ name: 'Aspirin', strength: '81mg' }],
    inactiveIngredients: [
      flag(
        'FD&C Yellow No. 6 aluminum lake',
        'high',
        dailymed(SET.chewOrange, METH.dyes),
      ),
      flag('Saccharin sodium', 'moderate', dailymed(SET.chewOrange, METH.saccharin)),
      flag('Flavor', 'limited', dailymed(SET.chewOrange, METH.flavors)),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET.chewOrange, METH.sio2),
      ),
      cleared(SET.chewOrange, 'Corn starch'),
      cleared(SET.chewOrange, 'Dextrose'),
      cleared(SET.chewOrange, 'Microcrystalline cellulose'),
    ],
    verdict: 'avoid',
    honestNote:
      'PROPOSED DRAFT: Bayer Chewable 81 Orange = Avoid. Driver is Yellow #6 lake (High). Saccharin is Moderate; flavor is Limited. SEPARATE formulaId from cherry chew (Red #27 + Red #40) and from enteric 81/325 (Yellow #10 + Yellow #6 on a delayed-release coat — do not merge 0c6ae05f-760f into 0c6ae05f-7634). Silicon dioxide is the 0-pt Caution cap, not Avoid. Aluminum oxide (lake substrate) is ungraded. Ages 12+ (children under 12: consult a doctor on the carton).',
    retailers: [...PF_RETAILERS, 'bayeraspirin.com'],
    cleanAlternatives: ASPIRIN_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET.chewOrange} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: ID.chewCherry,
    productName: 'Bayer Chewable Aspirin 81 Cherry',
    brand: 'Bayer',
    category: PAIN_FEVER,
    barcode: '312843132313',
    formulaId: ID.chewCherry,
    audience: ADULT,
    minAge: 12,
    form: 'chewable',
    activeIngredients: [{ name: 'Aspirin', strength: '81mg' }],
    inactiveIngredients: [
      flag(
        'D&C Red No. 27 aluminum lake',
        'high',
        dailymed(SET.chewCherry, METH.dyes),
      ),
      flag(
        'FD&C Red No. 40 aluminum lake',
        'high',
        dailymed(SET.chewCherry, METH.dyes),
      ),
      flag('Saccharin sodium', 'moderate', dailymed(SET.chewCherry, METH.saccharin)),
      flag('Flavor', 'limited', dailymed(SET.chewCherry, METH.flavors)),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET.chewCherry, METH.sio2),
      ),
      cleared(SET.chewCherry, 'Corn starch'),
      cleared(SET.chewCherry, 'Dextrose'),
      cleared(SET.chewCherry, 'Microcrystalline cellulose'),
    ],
    verdict: 'avoid',
    honestNote:
      'PROPOSED DRAFT: Bayer Chewable 81 Cherry = Avoid. Drivers are Red #27 + Red #40 lakes (High). SEPARATE formulaId from orange chew (Yellow #6 only) — do not merge flavors. Saccharin is Moderate; flavor is Limited. Silicon dioxide is the 0-pt Caution cap. Ages 12+ (children under 12: consult a doctor on the carton).',
    retailers: [...PF_RETAILERS, 'bayeraspirin.com'],
    cleanAlternatives: ASPIRIN_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET.chewCherry} — ${UNVERIFIED_NOTE}`],
  }),

  // ── List 2 Avoid — Excedrin ──────────────────────────────
  row({
    id: ID.excedrinBlue,
    productName: 'Excedrin Migraine / Extra Strength (Blue #1 coat)',
    brand: 'Excedrin',
    category: PAIN_FEVER,
    barcode: '300672039835',
    formulaId: ID.excedrinBlue,
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '250mg' },
      { name: 'Aspirin', strength: '250mg' },
      { name: 'Caffeine', strength: '65mg' },
    ],
    inactiveIngredients: [
      flag('FD&C Blue No. 1', 'high', dailymed(SET.migraine, METH.dyes)),
      flag('Titanium dioxide', 'high', dailymed(SET.migraine, METH.tio2)),
      flag('Polysorbate 20', 'moderate', dailymed(SET.migraine, METH.ps20)),
      flag('Propylene glycol', 'moderate', dailymed(SET.migraine, METH.pg)),
      flag(
        'Benzoic acid',
        'limited',
        dailymed(SET.migraine, METH.benzoic),
      ),
      flag(
        'Sorbitan monolaurate',
        'cleared',
        dailymed(SET.migraine, METH.sorbitan),
      ),
      flag(
        'Simethicone emulsion',
        'cleared',
        dailymed(SET.migraine, METH.simethicone),
      ),
      cleared(SET.migraine, 'Carnauba wax'),
      cleared(SET.migraine, 'Hydroxypropyl cellulose'),
      cleared(SET.migraine, 'Hypromellose'),
      cleared(SET.migraine, 'Microcrystalline cellulose'),
      cleared(SET.migraine, 'Povidone'),
      cleared(SET.migraine, 'Stearic acid'),
    ],
    verdict: 'avoid',
    honestNote:
      `PROPOSED DRAFT: Excedrin Migraine + Extra Strength Blue #1 coat = Avoid. Drivers are Blue #1 + titanium dioxide (High). DailyMed setids 7ed841fb (Migraine) and a71074a6 (ES Blue #1) list the same Other Ingredients — shared formulaId OK. SEPARATE from Extra Strength TiO2-only coat (0faa3592 — no Blue #1). ${SORBITAN_TAP} Light mineral oil is not in Methodology §5 (ungraded coat aid; not the Avoid driver; not the gummy seed-oil High rule). Stay under 4 g/day acetaminophen. Ages 12+.`,
    retailers: [...PF_RETAILERS, 'excedrin.com'],
    cleanAlternatives: COMBO_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.migraine} (Migraine); ES Blue #1 twin ${SET.esBlue} — same OI, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.excedrinTio2,
    productName: 'Excedrin Extra Strength (TiO2-only coat)',
    brand: 'Excedrin',
    category: PAIN_FEVER,
    formulaId: ID.excedrinTio2,
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '250mg' },
      { name: 'Aspirin', strength: '250mg' },
      { name: 'Caffeine', strength: '65mg' },
    ],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', dailymed(SET.esTio2, METH.tio2)),
      flag('Propylene glycol', 'moderate', dailymed(SET.esTio2, METH.pg)),
      flag(
        'Sodium lauryl sulfate',
        'cleared',
        dailymed(SET.esTio2, METH.sls),
      ),
      cleared(SET.esTio2, 'Corn starch'),
      cleared(SET.esTio2, 'Crospovidone'),
      cleared(SET.esTio2, 'Hypromellose'),
      cleared(SET.esTio2, 'Microcrystalline cellulose'),
      cleared(SET.esTio2, 'Povidone'),
      cleared(SET.esTio2, 'Sodium starch glycolate'),
      cleared(SET.esTio2, 'Stearic acid'),
    ],
    verdict: 'avoid',
    honestNote:
      `PROPOSED DRAFT: Excedrin Extra Strength TiO2-only coat = Avoid. Driver is titanium dioxide (High). No Blue #1 on DailyMed setid 0faa3592 — SEPARATE formulaId from the Blue #1 Migraine / ES coat (7ed841fb / a71074a6). ${SLS_TAP} Confirm the bottle: a Blue #1 line is the other row. Stay under 4 g/day acetaminophen. Ages 12+.`,
    retailers: [...PF_RETAILERS, 'excedrin.com'],
    cleanAlternatives: COMBO_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET.esTio2} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: ID.tension,
    productName: 'Excedrin Tension Headache',
    brand: 'Excedrin',
    category: PAIN_FEVER,
    formulaId: ID.tension,
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '500mg' },
      { name: 'Caffeine', strength: '65mg' },
    ],
    inactiveIngredients: [
      flag(
        'D&C Red No. 27 aluminum lake',
        'high',
        dailymed(SET.tension, METH.dyes),
      ),
      flag(
        'FD&C Blue No. 2 aluminum lake',
        'high',
        dailymed(SET.tension, METH.dyes),
      ),
      flag(
        'FD&C Yellow No. 6 aluminum lake',
        'high',
        dailymed(SET.tension, METH.dyes),
      ),
      flag('Talc', 'high', dailymed(SET.tension, METH.talc)),
      flag('Titanium dioxide', 'high', dailymed(SET.tension, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.tension, METH.peg)),
      flag('Benzoic acid', 'limited', dailymed(SET.tension, METH.benzoic)),
      cleared(SET.tension, 'Magnesium stearate'),
      cleared(SET.tension, 'Microcrystalline cellulose'),
      cleared(SET.tension, 'Povidone'),
      cleared(SET.tension, 'Pregelatinized starch'),
      cleared(SET.tension, 'Stearic acid'),
    ],
    verdict: 'avoid',
    honestNote:
      'PROPOSED DRAFT: Excedrin Tension Headache = Avoid. Drivers are Red #27 / Blue #2 / Yellow #6 lakes + talc + titanium dioxide (each High). Aspirin-free (APAP 500 + caffeine 65). Distinct from Migraine / ES combo rows. Polyvinyl alcohol is not in Methodology §5 (ungraded; not the Avoid driver). Stay under 4 g/day acetaminophen. Ages 12+.',
    retailers: [...PF_RETAILERS, 'excedrin.com'],
    cleanAlternatives: APAP_ADULT_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET.tension} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: ID.pm,
    productName: 'Excedrin PM Headache',
    brand: 'Excedrin',
    category: SLEEP,
    formulaId: ID.pm,
    audience: ADULT,
    minAge: 12,
    form: 'coated tablet',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '250mg' },
      { name: 'Aspirin', strength: '250mg' },
      { name: 'Diphenhydramine citrate', strength: '38mg' },
    ],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1 aluminum lake',
        'high',
        dailymed(SET.pm, METH.dyes),
      ),
      flag('Talc', 'high', dailymed(SET.pm, METH.talc)),
      flag('Titanium dioxide', 'high', dailymed(SET.pm, METH.tio2)),
      flag('Polysorbate 80', 'moderate', dailymed(SET.pm, METH.ps80)),
      flag('Maltodextrin', 'limited', dailymed(SET.pm, METH.maltodextrin)),
      flag('Polydextrose', 'limited', dailymed(SET.pm, METH.polydextrose)),
      flag(
        'Medium-chain triglycerides (source not named)',
        'limited',
        dailymed(SET.pm, METH.mctUnlabeled),
      ),
      flag('Benzoic acid', 'limited', dailymed(SET.pm, METH.benzoic)),
      flag(
        'Zinc stearate',
        'cleared',
        dailymed(SET.pm, METH.zincStearate),
      ),
      cleared(SET.pm, 'Hypromellose'),
      cleared(SET.pm, 'Hydroxypropyl cellulose'),
      cleared(SET.pm, 'Magnesium stearate'),
      cleared(SET.pm, 'Povidone'),
      cleared(SET.pm, 'Pregelatinized corn starch'),
      cleared(SET.pm, 'Stearic acid'),
    ],
    verdict: 'avoid',
    honestNote:
      `PROPOSED DRAFT: Excedrin PM Headache (single SKU, not a kit) = Avoid. Drivers are Blue #1 lake + talc + titanium dioxide (High). DailyMed setid b3812d27 is the standalone PM caplet — kits that pair PM with Extra Strength / Tension (e.g. setid 444fa225) are OUT / no Search row. ${MCT_UNLABELED_TAP} ${LIMITED_STACK} Calcium carbonate, ferric oxide yellow, and silicified MCC are not in Methodology §5 as named (ungraded; not the Avoid drivers). Labeled 2 caplets at bedtime. Ages 12+. ` +
      SEDATING,
    retailers: [...PF_RETAILERS, 'excedrin.com'],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET.pm} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: ID.rapid,
    productName: 'Excedrin Rapid Relief Acetaminophen 500',
    brand: 'Excedrin',
    category: PAIN_FEVER,
    formulaId: ID.rapid,
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    activeIngredients: [{ name: 'Acetaminophen', strength: '500mg' }],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', dailymed(SET.rapid, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.rapid, METH.peg)),
      flag('Polysorbate 80', 'moderate', dailymed(SET.rapid, METH.ps80)),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed(SET.rapid, METH.sio2),
      ),
      flag('Alginic acid', 'cleared', dailymed(SET.rapid, METH.alginic)),
      cleared(SET.rapid, 'Carnauba wax'),
      cleared(SET.rapid, 'Crospovidone'),
      cleared(SET.rapid, 'Hypromellose'),
      cleared(SET.rapid, 'Magnesium stearate'),
      cleared(SET.rapid, 'Povidone'),
      cleared(SET.rapid, 'Pregelatinized starch'),
      cleared(SET.rapid, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'PROPOSED DRAFT: Excedrin Rapid Relief APAP 500 = Avoid. Driver is titanium dioxide (High). Aspirin-free / caffeine-free. Distinct from Migraine / ES combo rows and from Tension. Calcium carbonate is not in Methodology §5 as an inactive filler (ungraded; not the Avoid driver). Silicon dioxide is the 0-pt Caution cap. Stay under 4 g/day acetaminophen. Ages 12+.',
    retailers: [...PF_RETAILERS, 'excedrin.com'],
    cleanAlternatives: APAP_ADULT_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET.rapid} — ${UNVERIFIED_NOTE}`],
  }),

  // ── List 2 Avoid — Motrin leftover ───────────────────────
  row({
    id: ID.infantsDf,
    productName: "Infants' Motrin Concentrated Drops Dye-Free",
    brand: 'Motrin',
    category: PAIN_FEVER,
    barcode: '300450198044',
    formulaId: ID.infantsDf,
    audience: KIDS,
    minAge: 0,
    form: 'concentrated drops',
    activeIngredients: [{ name: 'Ibuprofen', strength: '50mg / 1.25mL' }],
    inactiveIngredients: [
      flag(
        'Caramel color (undisclosed class)',
        'high',
        dailymed(SET.infantsDf, METH.caramel),
      ),
      flag('Polysorbate 80', 'moderate', dailymed(SET.infantsDf, METH.ps80)),
      flag('Sodium benzoate', 'limited', dailymed(SET.infantsDf, METH.benzoate)),
      flag('Sorbitol', 'limited', dailymed(SET.infantsDf, METH.sorbitol)),
      flag('Flavors', 'limited', dailymed(SET.infantsDf, METH.flavors)),
      cleared(SET.infantsDf, 'Anhydrous citric acid'),
      cleared(SET.infantsDf, 'Glycerin'),
      cleared(SET.infantsDf, 'Pregelatinized starch'),
      cleared(SET.infantsDf, 'Purified water'),
      cleared(SET.infantsDf, 'Sucrose'),
      cleared(SET.infantsDf, 'Xanthan gum'),
    ],
    verdict: 'avoid',
    honestNote:
      `PROPOSED DRAFT: Infants’ Motrin Concentrated Drops Dye-Free = Avoid. Driver is undisclosed-class caramel (High). ${CARAMEL_TAP} Dye-free does not clear this liquid. NEW formulaId — do not reuse motrin-infants-liquid-dyed (that dyed row is Red #40 + caramel). Berry SPL; typically 6–23 months. No independently Clean infant ibuprofen — listed swap is Genexa Infants acetaminophen (different active, age-matched).`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: INFANTS_ALTS,
    sourcesGeneral: [`DailyMed setid ${SET.infantsDf} — ${UNVERIFIED_NOTE}`],
  }),

  // ── List 3 Clean — Genuine Bayer (triacetin lock) ────────
  row({
    id: ID.genuine,
    productName: 'Genuine Bayer Aspirin 325 Coated',
    brand: 'Bayer',
    category: PAIN_FEVER,
    barcode: '312843536357 312843536364',
    formulaId: ID.genuine,
    audience: ADULT,
    minAge: 12,
    form: 'coated tablet',
    activeIngredients: [{ name: 'Aspirin', strength: '325mg' }],
    inactiveIngredients: [
      flag('Triacetin', 'cleared', dailymed(SET.genuine, METH.triacetin)),
      cleared(SET.genuine, 'Carnauba wax'),
      cleared(SET.genuine, 'Corn starch'),
      cleared(SET.genuine, 'Hypromellose'),
      cleared(SET.genuine, 'Powdered cellulose'),
    ],
    verdict: 'clean',
    honestNote:
      `FOUNDER-LOCK DRAFT: Genuine Bayer Aspirin 325 coated = Clean. Triacetin is Cleared. DailyMed setid 44a08904 lists carnauba wax (may contain), corn starch, hypromellose, powdered cellulose, and triacetin — no High / Limited / Caution left on that SPL. ${TRIACETIN_TAP} Distinct from Extra Strength 500 / Aspirina (dye + TiO2 Avoid), from enteric regimen (dye lakes Avoid), and from the chewables. Confirm the carton matches this coated Genuine list. Ages 12+.`,
    retailers: [...PF_RETAILERS, 'bayeraspirin.com'],
    sourcesGeneral: [`DailyMed setid ${SET.genuine} — ${UNVERIFIED_NOTE}`],
  }),
];

// Verdict tally (12 records): Clean 1 · Caution 0 · Avoid 11
// List 2: Avoid 11 · List 3: Clean 1
