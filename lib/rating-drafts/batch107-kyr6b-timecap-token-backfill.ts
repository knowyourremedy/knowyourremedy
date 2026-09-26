// DRAFT / not verified / batch 107 KYR6-b TIME-Cap leftover-token backfill.
// Methodology v1.6 + MAIN §5 after 19f1484 (Sept 25, 2026 TIME-Cap refuse maps).
// Harm-first. No invented grades. No invented OI. No invented UPCs.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. TIME-Cap / Timely only. Unlocks batch106 REFUSED packs whose
// blocking string is now an exact alias on 19f1484, and whose full inactive
// paragraph maps to locked MAIN tokens. A panel that still has one unmapped
// string stays REFUSED with that exact string. A mapped panel with no count
// on the opened DailyMed tile or the brand category page stays OUT. Count
// is not invented from an NDC suffix. Dual-panel day/night is not in this
// refuse set.
// The pin is the DailyMed inactive paragraph those refusals named (re-opened
// this pass). Brand pages re-opened: timecaplabs.com analgesic, cold-allergy,
// laxative. Those pages are bulk -00 codes and do not print an inactive line.
// NDC is not a UPC. No GTIN-12 under barcode bars was opened.
// recordStatus is 'unverified' on every row.
// Internal keys only: clean | caution | avoid. Packs with the same inactive
// line share formulaId. None of these lines is already a MAIN formula row.
// Search wiring only. Not wired into Clean Picks UI.
//
// Do NOT edit batch70–batch106. No house Amazon. No HealthA2Z. No A+Health.
// No GoodSense. No toothpaste. No Sprouts. No factory. Oil form split stays
// as it is on main.
//
// Leftover Amazon 3P after this backfill: 1 (GoodSense).
//
// TALLY (unverified drafts in THIS file): 10 rows —
// Clean 0 / Caution 0 / Avoid 10.
// NEW 4 / REUSE-formula 6 /
// SKIPPED 3 (no_OI 0 / OUT 3) /
// REFUSED 3.
// Search grade: Clean 0 / Caution 0 / Avoid 10.
// UPCs attached: none.
// TALLY is asserted at the bottom.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const UNVERIFIED_NOTE = 'draft, not verified';

const BRAND = 'TIME-Cap Labs';
const AMAZON = ['Amazon', 'timecaplabs.com'] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const STAMP = 'Sept 25, 2026 TIME-Cap refuse maps (19f1484)';

const METH = {
  acacia:
    'Methodology §5 Cleared (acacia / gum arabic). Acadia is this spelling (Sept 25, 2026). Same Cleared lock. Not Caution. Not a new grade.',
  acaciaExact: 'Methodology §5 Cleared (acacia / gum arabic).',
  carnauba:
    'Methodology §5 Caution (carnauba wax — Sept 25, 2026). Not the old Cleared wax row. Not Avoid.',
  caso4:
    'Methodology §5 Cleared (calcium sulfate). Calcium sulfate anhydrous and Anhydrous Calcium Sulfate map here (Sept 25, 2026). Same salt neighborhood as sodium sulfate. Not SLS. Not a new grade.',
  corn: 'Methodology §5 Cleared (corn starch — named simple starch).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium).',
  dical:
    'Methodology §5 Cleared (dibasic calcium phosphate dihydrate — calcium phosphate filler).',
  dye: 'Methodology §5 High (FD&C / D&C synthetic dye, including lakes). The printed spelling is the flag name. Blue 1 and D&C Yellow 10 sit on this row. Lake forms sit on this row.',
  dyeRed3:
    'Methodology §5 High (FD&C / D&C synthetic dyes). The row names FDA-revoked Red No. 3. FD&C red 3 is that color. Not a new grade.',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  gms: 'Methodology §5 Cleared (glyceryl monostearate / GMS). Distinct from Caution mono- and diglycerides.',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose / HPC).',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC).',
  iron:
    'Methodology §5 Caution (iron oxide as color). Iron oxide, iron oxide black, iron oxide yellow, iron oxide ochre, ferric oxide yellow, and black iron oxide sit on this row. Not Avoid.',
  kaolin:
    'Methodology §5 Cleared (kaolin). Distinct from Caution calcined kaolin. Not Avoid.',
  koh:
    'Methodology §5 Caution (potassium hydroxide — Sept 25, 2026). Distinct from Cleared sodium hydroxide. Not Avoid.',
  lactose:
    'Methodology §5 Cleared (lactose / lactose monohydrate). Anhydrous lactose and lactose anhydrous are that spelling. Not a new grade.',
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose).',
  methacrylic:
    'Methodology §5 Caution (methacrylic acid copolymer / enteric coat). Eudragit maps here (Sept 25, 2026). Methacrylic acid and ethyl acrylate copolymer, without the word dispersion, maps here (Sept 25, 2026). Not a new grade. Not Avoid.',
  mgStearate: 'Methodology §5 Cleared (magnesium stearate).',
  naoh: 'Methodology §5 Cleared (sodium hydroxide as a pH adjuster).',
  peg:
    'Methodology §5 Moderate (polyethylene glycol / PEGs, including polyethylene glycol 400 and PEG 6000 / PEG 8000). PEG 6000 and PEG 8000 map here (Sept 25, 2026). Not the Avoid driver. Not a new grade.',
  povidone: 'Methodology §5 Cleared (povidone).',
  pregel: 'Methodology §5 Cleared (pregelatinized starch).',
  ps80: 'Methodology §5 Moderate (polysorbate 80). Not the Avoid driver.',
  pvap:
    'Methodology §5 Caution (polyvinyl acetate phthalate / PVAP). Polyvinyl Acetate Phthalates maps here (Sept 25, 2026). Same Caution. Not a new grade. Not Avoid.',
  shellac: 'Methodology §5 Cleared (shellac). Shellac wax is not this row.',
  simethicone:
    'Methodology §5 Caution (simethicone as an Other Ingredient). Not Avoid.',
  sio2:
    'Methodology §5 Limited (colloidal silicon dioxide / silicon dioxide / silica — 0-pt nanoparticle Caution cap). Does not by itself make Avoid.',
  sls: 'Methodology §5 Caution (sodium lauryl sulfate). Not Avoid.',
  ssg: 'Methodology §5 Cleared (sodium starch glycolate).',
  starch:
    'Methodology §5 Cleared (bare starch as a filler — Sept 25, 2026). Unspecified starch stays Caution. Not that row.',
  stearic: 'Methodology §5 Cleared (stearic acid).',
  sugar:
    'Methodology §5 Caution (bare sugar). Distinct from Cleared cane sugar and from Limited sucrose. Not Avoid.',
  talc: 'Methodology §5 High (talc in an oral / swallow product).',
  tio2: 'Methodology §5 High (titanium dioxide).',
  triethyl: 'Methodology §5 Cleared (triethyl citrate).',
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

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

function row(
  opts: Omit<RatingRecord, 'recordStatus'> & {
    recordStatus?: RatingRecord['recordStatus'];
  },
): RatingRecord {
  return { ...opts, recordStatus: opts.recordStatus ?? UNVERIFIED };
}

type Compact = {
  id: string;
  productName: string;
  category: string;
  formulaId: string;
  audience: typeof ADULT;
  minAge: number;
  form: string;
  productType: typeof OTC;
  actives: RatingRecord['activeIngredients'];
  flags: [string, IngredientFlag['riskLevel'], keyof typeof METH][];
  verdict: RatingRecord['verdict'];
  note: string;
  cite: string;
};

function expand(d: Compact): RatingRecord {
  const alts: CleanAlternative[] = [];
  if (d.verdict !== 'clean') {
    const main = {
      Digestive: [
        'megafood-magnesium-300-capsules',
        'Independently Clean MegaFood Magnesium 300 already on main. Form labeled, not a hard filter (§6).',
      ],
      'Pain & Fever': [
        'thorne-glucosamine-chondroitin',
        'Independently Clean Thorne Glucosamine & Chondroitin already on main. Form labeled, not a hard filter (§6).',
      ],
    } as const;
    const pair = main[d.category as keyof typeof main];
    if (pair) alts.push(alt(pair[0], pair[1]));
  }
  return row({
    id: d.id,
    productName: d.productName,
    brand: BRAND,
    category: d.category,
    formulaId: d.formulaId,
    audience: d.audience,
    minAge: d.minAge,
    form: d.form,
    productType: d.productType,
    activeIngredients: d.actives,
    inactiveIngredients: d.flags.map(([n, risk, meth]) =>
      flag(n, risk, labelCite(d.cite, METH[meth])),
    ),
    verdict: d.verdict,
    honestNote: `${d.note} ${LIMITED_STACK} Pack sizes share formulaId \`${d.formulaId}\` when this OI list holds. No dosing or medical advice. Draft, not verified.`,
    retailers: [...AMAZON],
    cleanAlternatives: alts.length ? alts : undefined,
    sourcesGeneral: [`${d.cite} — ${UNVERIFIED_NOTE}`],
  });
}

function dm(
  setid: string,
  ndc: string,
  extra: string,
  active: string,
  inactive: string,
): string {
  return `DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${setid}; setid ${setid}; NDC ${ndc}). ${extra} Active: ${active}. Inactive ingredients: ${inactive}. No GTIN-12 printed under barcode bars was opened. NDC is not a UPC. Re-opened this pass.`;
}

const ESO: Compact['flags'] = [
  ['black iron oxide', 'limited', 'iron'],
  ['eudragit', 'limited', 'methacrylic'],
  ['FD&C blue 1', 'high', 'dye'],
  ['FD&C red 3', 'high', 'dyeRed3'],
  ['ferric oxide yellow', 'limited', 'iron'],
  ['gelatin', 'cleared', 'gelatin'],
  ['glyceryl monostearate', 'cleared', 'gms'],
  ['hydroxypropyl cellulose', 'cleared', 'hpc'],
  ['hypromellose', 'cleared', 'hpmc'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['polysorbate 80', 'moderate', 'ps80'],
  ['potassium hydroxide', 'limited', 'koh'],
  ['shellac', 'cleared', 'shellac'],
  ['simethicone', 'limited', 'simethicone'],
  ['sodium lauryl sulfate', 'limited', 'sls'],
  ['sugar spheres', 'limited', 'sugar'],
  ['talc', 'high', 'talc'],
  ['titanium dioxide', 'high', 'tio2'],
  ['triethyl citrate', 'cleared', 'triethyl'],
];

const ASA: Compact['flags'] = [
  ['anhydrous lactose', 'cleared', 'lactose'],
  ['carnauba wax', 'limited', 'carnauba'],
  ['colloidal silicon dioxide', 'limited', 'sio2'],
  ['croscarmellose sodium', 'cleared', 'croscarmellose'],
  ['D&C yellow #10 aluminum lake', 'high', 'dye'],
  ['iron oxide ochre', 'limited', 'iron'],
  ['methacrylic acid and ethyl acrylate copolymer', 'limited', 'methacrylic'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['polysorbate 80', 'moderate', 'ps80'],
  ['simethicone', 'limited', 'simethicone'],
  ['sodium hydroxide', 'cleared', 'naoh'],
  ['sodium lauryl sulfate', 'limited', 'sls'],
  ['starch', 'cleared', 'starch'],
  ['talc', 'high', 'talc'],
  ['titanium dioxide', 'high', 'tio2'],
  ['triethyl citrate', 'cleared', 'triethyl'],
];

const SENNA: Compact['flags'] = [
  ['acacia', 'cleared', 'acaciaExact'],
  ['calcium sulfate anhydrous', 'cleared', 'caso4'],
  ['carnauba wax', 'limited', 'carnauba'],
  ['colloidal silicon dioxide', 'limited', 'sio2'],
  ['corn starch', 'cleared', 'corn'],
  ['croscarmellose sodium', 'cleared', 'croscarmellose'],
  ['dibasic calcium phosphate dihydrate', 'cleared', 'dical'],
  ['FD&C blue #1 aluminum lake', 'high', 'dye'],
  ['iron oxide', 'limited', 'iron'],
  ['iron oxide black', 'limited', 'iron'],
  ['iron oxide yellow', 'limited', 'iron'],
  ['kaolin', 'cleared', 'kaolin'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['maltodextrin', 'limited', 'maltodextrin'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['polyethylene glycol', 'moderate', 'peg'],
  ['povidone', 'cleared', 'povidone'],
  ['shellac', 'cleared', 'shellac'],
  ['stearic acid', 'cleared', 'stearic'],
  ['sugar', 'limited', 'sugar'],
  ['talc', 'high', 'talc'],
  ['titanium dioxide', 'high', 'tio2'],
];

const BISA: Compact['flags'] = [
  ['Acadia', 'cleared', 'acacia'],
  ['Anhydrous Calcium Sulfate', 'cleared', 'caso4'],
  ['Anhydrous Lactose', 'cleared', 'lactose'],
  ['Carnauba Wax', 'limited', 'carnauba'],
  ['Colloidal Silicon Dioxide', 'limited', 'sio2'],
  ['Corn Starch', 'cleared', 'corn'],
  ['D&C Yellow #10 Aluminum Lake', 'high', 'dye'],
  ['FD&C yellow #6 aluminum lake', 'high', 'dye'],
  ['Gelatin', 'cleared', 'gelatin'],
  ['Iron Oxide', 'limited', 'iron'],
  ['Iron Oxide Black', 'limited', 'iron'],
  ['Iron Oxide Yellow(Iron Oxide Ochre)', 'limited', 'iron'],
  ['Magnesium Stearate', 'cleared', 'mgStearate'],
  ['Microcrystalline Cellulose', 'cleared', 'mcc'],
  ['Polyethylene Glycol (PEG) 400', 'moderate', 'peg'],
  ['Polyvinyl Acetate Phthalates', 'limited', 'pvap'],
  ['Povidone', 'cleared', 'povidone'],
  ['Shellac', 'cleared', 'shellac'],
  ['Sodium Starch Glycolate', 'cleared', 'ssg'],
  ['Stearic Acid', 'cleared', 'stearic'],
  ['Sugar', 'limited', 'sugar'],
  ['Talc', 'high', 'talc'],
  ['Titanium Dioxide', 'high', 'tio2'],
];

const ESO_OI =
  'black iron oxide, eudragit, FD&C blue 1, FD&C red 3, ferric oxide yellow, gelatin, glyceryl monostearate, hydroxypropyl cellulose, hypromellose, magnesium stearate, polysorbate 80, potassium hydroxide, shellac, simethicone, sodium lauryl sulfate, sugar spheres, talc, titanium dioxide, triethyl citrate';
const ESO_NOTE =
  `Avoid. Drivers are FD&C blue 1, FD&C red 3, talc, and titanium dioxide (High). eudragit is the ${STAMP} onto the methacrylic enteric Caution row and is not the Avoid driver. Ages 18+.`;
const SET_ESO = '08acf79f-f50d-8416-e063-6294a90a2704';

const ASA_OI =
  'anhydrous lactose, carnauba wax, colloidal silicon dioxide, croscarmellose sodium, D&C yellow #10 aluminum lake, iron oxide ochre, methacrylic acid and ethyl acrylate copolymer, microcrystalline cellulose, polysorbate 80, simethicone, sodium hydroxide, sodium lauryl sulfate, starch, talc, titanium dioxide, triethyl citrate';
const ASA_NOTE =
  `Avoid. Drivers are D&C yellow #10 aluminum lake, talc, and titanium dioxide (High). methacrylic acid and ethyl acrylate copolymer, without the word dispersion, is the ${STAMP} onto the existing copolymer Caution row and is not the Avoid driver. Ages 12+.`;
const SET_ASA = '1acc8c1a-c746-4635-800c-de1ad758fce0';

const SENNA_OI =
  'acacia, calcium sulfate anhydrous, carnauba wax, colloidal silicon dioxide, corn starch, croscarmellose sodium, dibasic calcium phosphate dihydrate, FD&C blue #1 aluminum lake, iron oxide, iron oxide black, iron oxide yellow, kaolin, magnesium stearate, maltodextrin, microcrystalline cellulose, polyethylene glycol, povidone, shellac, stearic acid, sugar, talc, titanium dioxide';
const SENNA_NOTE =
  `Avoid. Drivers are FD&C blue #1 aluminum lake, talc, and titanium dioxide (High). calcium sulfate anhydrous is the ${STAMP} onto Cleared calcium sulfate and is not a grade driver. Ages 6+.`;
const SET_SENNA = '74a627fc-00e5-eb78-e053-2991aa0abacc';

const BISA_OI =
  'Acadia, Anhydrous Calcium Sulfate, Anhydrous Lactose, Carnauba Wax, Colloidal Silicon Dioxide, Corn Starch, D&C Yellow #10 Aluminum Lake, FD&C yellow #6 aluminum lake, Gelatin, Iron Oxide, Iron Oxide Black, Iron Oxide Yellow(Iron Oxide Ochre), Magnesium Stearate, Microcrystalline Cellulose, Polyethylene Glycol (PEG) 400, Polyvinyl Acetate Phthalates, Povidone, Shellac, Sodium Starch Glycolate, Stearic Acid, Sugar, Talc, Titanium Dioxide';
const BISA_NOTE =
  `Avoid. Drivers are D&C Yellow #10 Aluminum Lake, FD&C yellow #6 aluminum lake, talc, and titanium dioxide (High). Acadia maps to Cleared acacia. Anhydrous Calcium Sulfate maps to Cleared calcium sulfate. Polyvinyl Acetate Phthalates maps to Caution PVAP. Those three are the ${STAMP} and are not the Avoid drivers. Ages 6+.`;
const SET_BISA = 'e0a9f8d9-660b-431c-8043-6d8ec81f98e5';

function pack(
  partial: Omit<Compact, 'audience' | 'productType'>,
): Compact {
  return { ...partial, audience: ADULT, productType: OTC };
}

const COMPACT: Compact[] = [
  pack({
    id: 'timecap-b107-eso-20-14',
    productName:
      'Timely Esomeprazole magnesium delayed-release capsules 20 mg, 14 count, NDC 49483-718',
    category: 'Digestive',
    formulaId: 'timecap-b107-eso-20-14',
    minAge: 18,
    form: 'delayed-release capsule',
    actives: [{ name: 'Esomeprazole magnesium', strength: '20 mg' }],
    flags: ESO,
    verdict: 'avoid',
    note: ESO_NOTE,
    cite: dm(
      SET_ESO,
      '49483-718',
      'Label image 718T-Esomeprazole-14ct-label.jpg.',
      'Esomeprazole magnesium 20 mg',
      ESO_OI,
    ),
  }),
  pack({
    id: 'timecap-b107-eso-20-42',
    productName:
      'Timely Esomeprazole magnesium delayed-release capsules 20 mg, 42 count, NDC 49483-718',
    category: 'Digestive',
    formulaId: 'timecap-b107-eso-20-14',
    minAge: 18,
    form: 'delayed-release capsule',
    actives: [{ name: 'Esomeprazole magnesium', strength: '20 mg' }],
    flags: ESO,
    verdict: 'avoid',
    note: ESO_NOTE,
    cite: dm(
      SET_ESO,
      '49483-718',
      'Label image 718T-Esomeprazole-42ct-carton.jpg.',
      'Esomeprazole magnesium 20 mg',
      ESO_OI,
    ),
  }),
  pack({
    id: 'timecap-b107-asa-81-120',
    productName:
      'Timely Aspirin 81 mg delayed-release tablets, 120 count, NDC 49483-481',
    category: 'Pain & Fever',
    formulaId: 'timecap-b107-asa-81-120',
    minAge: 12,
    form: 'delayed-release tablet',
    actives: [{ name: 'Aspirin', strength: '81 mg' }],
    flags: ASA,
    verdict: 'avoid',
    note: ASA_NOTE,
    cite: dm(
      SET_ASA,
      '49483-481',
      'Label image 481r-timely-120s.jpg. Brand code 481R.',
      'Aspirin 81 mg',
      ASA_OI,
    ),
  }),
  pack({
    id: 'timecap-b107-asa-81-300',
    productName:
      'Timely Aspirin 81 mg delayed-release tablets, 300 count, NDC 49483-481',
    category: 'Pain & Fever',
    formulaId: 'timecap-b107-asa-81-120',
    minAge: 12,
    form: 'delayed-release tablet',
    actives: [{ name: 'Aspirin', strength: '81 mg' }],
    flags: ASA,
    verdict: 'avoid',
    note: ASA_NOTE,
    cite: dm(
      SET_ASA,
      '49483-481',
      'Label image 481R-Low dose Aspirin 81mg-300T-Label.jpg.',
      'Aspirin 81 mg',
      ASA_OI,
    ),
  }),
  pack({
    id: 'timecap-b107-asa-81-365',
    productName:
      'Timely Aspirin 81 mg delayed-release tablets, 365 count, NDC 49483-481',
    category: 'Pain & Fever',
    formulaId: 'timecap-b107-asa-81-120',
    minAge: 12,
    form: 'delayed-release tablet',
    actives: [{ name: 'Aspirin', strength: '81 mg' }],
    flags: ASA,
    verdict: 'avoid',
    note: ASA_NOTE,
    cite: dm(
      SET_ASA,
      '49483-481',
      'Label image 481R-timely-365ct-label.jpg.',
      'Aspirin 81 mg',
      ASA_OI,
    ),
  }),
  pack({
    id: 'timecap-b107-asa-81-1000',
    productName:
      'Timely Aspirin 81 mg delayed-release tablets, 1000 count, NDC 49483-481',
    category: 'Pain & Fever',
    formulaId: 'timecap-b107-asa-81-120',
    minAge: 12,
    form: 'delayed-release tablet',
    actives: [{ name: 'Aspirin', strength: '81 mg' }],
    flags: ASA,
    verdict: 'avoid',
    note: ASA_NOTE,
    cite: dm(
      SET_ASA,
      '49483-481',
      'Label image 481R-timely-1000-label.jpg.',
      'Aspirin 81 mg',
      ASA_OI,
    ),
  }),
  pack({
    id: 'timecap-b107-senna-25-90',
    productName:
      'Timely Lax-Time sennosides 25 mg sugar-coated tablets, 90 count, NDC 49483-083',
    category: 'Digestive',
    formulaId: 'timecap-b107-senna-25-90',
    minAge: 6,
    form: 'sugar-coated tablet',
    actives: [{ name: 'Sennosides', strength: '25 mg' }],
    flags: SENNA,
    verdict: 'avoid',
    note: SENNA_NOTE,
    cite: dm(
      SET_SENNA,
      '49483-083',
      'Label image 195R-timely-90s-label.jpg. Brand code 195R.',
      'Sennosides 25 mg',
      SENNA_OI,
    ),
  }),
  pack({
    id: 'timecap-b107-bisa-5-25',
    productName:
      'Timely Bisacodyl 5 mg delayed-release tablets, 25 count, NDC 49483-003',
    category: 'Digestive',
    formulaId: 'timecap-b107-bisa-5-25',
    minAge: 6,
    form: 'delayed-release tablet',
    actives: [{ name: 'Bisacodyl', strength: '5 mg' }],
    flags: BISA,
    verdict: 'avoid',
    note: BISA_NOTE,
    cite: dm(
      SET_BISA,
      '49483-003',
      'SPL text 25 COUNT BLISTER next to the blister image. Brand code 014R.',
      'Bisacodyl 5 mg',
      BISA_OI,
    ),
  }),
  pack({
    id: 'timecap-b107-bisa-5-100',
    productName:
      'Timely Bisacodyl 5 mg delayed-release tablets, 100 count, NDC 49483-003',
    category: 'Digestive',
    formulaId: 'timecap-b107-bisa-5-25',
    minAge: 6,
    form: 'delayed-release tablet',
    actives: [{ name: 'Bisacodyl', strength: '5 mg' }],
    flags: BISA,
    verdict: 'avoid',
    note: BISA_NOTE,
    cite: dm(
      SET_BISA,
      '49483-003',
      'Label image 49483-003 100ct.jpg. Observation text 14R 100CT LABEL.',
      'Bisacodyl 5 mg',
      BISA_OI,
    ),
  }),
  pack({
    id: 'timecap-b107-bisa-5-1000',
    productName:
      'Timely Bisacodyl 5 mg delayed-release tablets, 1000 count, NDC 49483-003',
    category: 'Digestive',
    formulaId: 'timecap-b107-bisa-5-25',
    minAge: 6,
    form: 'delayed-release tablet',
    actives: [{ name: 'Bisacodyl', strength: '5 mg' }],
    flags: BISA,
    verdict: 'avoid',
    note: BISA_NOTE,
    cite: dm(
      SET_BISA,
      '49483-003',
      'Observation text 14R 1000 CT LABEL.',
      'Bisacodyl 5 mg',
      BISA_OI,
    ),
  }),
];

export const BATCH107_KYR6B_TIMECAP_TOKEN_BACKFILL: RatingRecord[] = COMPACT.map(expand);

export const BATCH107_SKIPPED_NO_OI: { sku: string; reason: string }[] = [];

export const BATCH107_SKIPPED_OUT: { sku: string; reason: string }[] = [
  {
    sku: 'Timely omeprazole 20 mg tablets, NDC 49483-731',
    reason:
      'OUT. Every inactive now maps, including colloidal silicone dioxide, polyethylene glycol 6000, and methacrylic acid and ethyl acrylate copolymer. Opened tiles are 731R IFC and 731R label. Neither prints a count. Brand category pages opened this pass do not list 731R. Count not invented. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=40906798-cd84-fbd0-e063-6294a90a1d29.',
  },
  {
    sku: '686T Loratadine liquid-filled capsules, NDC 49483-686',
    reason:
      'OUT. Every inactive now maps, including mono and diglyceride of caprylic/capric acid. Opened image loratadine-10TCL.jpg does not print a count. Brand cold page is bulk NDC 49483-686-00 and does not print a count. Count not invented. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=85b26cf3-448c-4d4f-93a2-aa89530ec1f1.',
  },
  {
    sku: '190R Sennosides 15 mg sugar-coated tablets, NDC 49483-079',
    reason:
      'OUT. Every inactive now maps, including calcium sulfate anhydrous. Opened image TCL 190R.jpg does not print a count. Brand laxative page is bulk NDC 49483-079-00 and does not print a count. Count not invented. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7498f5fa-1739-bb6e-e053-2a91aa0a5404.',
  },
];

export const BATCH107_SKIPPED: { sku: string; reason: string }[] = [
  ...BATCH107_SKIPPED_NO_OI,
  ...BATCH107_SKIPPED_OUT,
];

export const BATCH107_REFUSED: { sku: string; reason: string }[] = [
  {
    sku: '342R Extra Strength Acetaminophen easy-swallow tablets, NDC 49483-342',
    reason:
      'REFUSED exact panel string `FD-C RED NO. 40 ALUMINUM LAKE`. polyethylene glycol (peg) 8000 now maps to PEG. The narrative dye uses a hyphen in place of & and is not the locked FD&C red #40 string. Setid 2569383a-4a05-4ddb-852e-b37e487ffcde. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2569383a-4a05-4ddb-852e-b37e487ffcde.',
  },
  {
    sku: '697R Timely Extra Strength Acetaminophen 500 mg rapid release, 400 count, NDC 49483-697',
    reason:
      'REFUSED exact panel string `mica based pearlescent pigment`. polyethylene glycol 6000 now maps to PEG. The lock is mica-based pearlescent pigment, with a hyphen. This panel prints a space. Setid c9f80d24-bd05-e1ce-e053-2995a90aa646. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c9f80d24-bd05-e1ce-e053-2995a90aa646.',
  },
  {
    sku: 'Pseudo-Time pseudoephedrine HCl 30 mg tablets, NDC 49483-016',
    reason:
      'REFUSED exact panel strings `D-C red no. 27`, `D-C yellow no.10`, `FD-C red no.40`, `FD-C yellow no 6`. calcium sulfate now maps to Cleared calcium sulfate. These hyphen spellings are not the locked D&C / FD&C dye strings. Setid d8dace20-752e-4686-8026-c8fc97591fa8. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d8dace20-752e-4686-8026-c8fc97591fa8.',
  },
];

const _ROWS = BATCH107_KYR6B_TIMECAP_TOKEN_BACKFILL;
const _grades = {
  clean: _ROWS.filter((r) => r.verdict === 'clean').length,
  caution: _ROWS.filter((r) => r.verdict === 'caution').length,
  avoid: _ROWS.filter((r) => r.verdict === 'avoid').length,
};
const _formulaFirst = new Set<string>();
let _new = 0;
let _reuse = 0;
for (const r of _ROWS) {
  const id = r.formulaId ?? r.id;
  if (_formulaFirst.has(id)) _reuse += 1;
  else {
    _formulaFirst.add(id);
    _new += 1;
  }
}
if (_ROWS.length !== 10) throw new Error('batch107 row tally drift');
if (_grades.clean !== 0 || _grades.caution !== 0 || _grades.avoid !== 10) {
  throw new Error('batch107 Search grade drift');
}
if (_new !== 4 || _reuse !== 6) throw new Error('batch107 NEW/REUSE drift');
if (_ROWS.filter((r) => r.formulaId === r.id).length !== 4) {
  throw new Error('batch107 canonical formula drift');
}
if (BATCH107_SKIPPED_NO_OI.length !== 0) throw new Error('batch107 no_OI drift');
if (BATCH107_SKIPPED_OUT.length !== 3) throw new Error('batch107 OUT drift');
if (BATCH107_SKIPPED.length !== 3) throw new Error('batch107 SKIPPED drift');
if (BATCH107_REFUSED.length !== 3) throw new Error('batch107 REFUSED drift');
if (BATCH107_REFUSED.some((s) => !/`[^`]+`/.test(s.reason))) {
  throw new Error('batch107 REFUSED must quote an exact panel string');
}
if (_ROWS.some((r) => r.brand !== 'TIME-Cap Labs')) throw new Error('batch107 brand drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch107 recordStatus must stay unverified');
}
if (_ROWS.some((r) => r.barcode)) throw new Error('batch107 must not invent a UPC');
if (_ROWS.some((r) => !r.id.startsWith('timecap-b107-'))) {
  throw new Error('batch107 ids must use timecap-b107-');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch107 duplicate id');
const _formulas = new Set(_ROWS.map((r) => r.formulaId));
if (![..._formulas].every((id) => _ids.has(id!))) {
  throw new Error('batch107 formulaId must point at a row in this file');
}
if (_ROWS.some((r) => r.verdict === 'avoid' && !r.inactiveIngredients?.some((f) => f.riskLevel === 'high'))) {
  throw new Error('batch107 Avoid without High');
}
if (_ROWS.some((r) => !(r.inactiveIngredients?.length))) {
  throw new Error('batch107 missing a printed inactive');
}
const _blob = [
  ..._ROWS.map((r) => `${r.productName} ${r.id}`),
  ...BATCH107_SKIPPED.map((s) => s.sku),
  ...BATCH107_REFUSED.map((s) => s.sku),
].join('\n');
if (/GoodSense|HealthA2Z|A\+Health|toothpaste|Sprouts|Basic Care|Amazon Elements|\bSolimo\b/i.test(_blob)) {
  throw new Error('batch107 excluded brand leaked');
}
