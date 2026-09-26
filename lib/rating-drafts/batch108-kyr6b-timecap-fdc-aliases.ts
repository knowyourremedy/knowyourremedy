// DRAFT / not verified / batch 108 KYR6-b TIME-Cap FD-C / mica aliases.
// Methodology v1.6 + MAIN §5 after 01dc193 (Sept 25, 2026 FD-C dye aliases).
// Harm-first. No invented grades. No invented OI. No invented UPCs.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. Three batch107 refusals only. FD-C and D-C spellings, and
// "no." / "no ", map to the existing FD&C / D&C dye Avoid locks. Mica based
// pearlescent pigment maps to the existing mica-based pearlescent pigment
// Caution lock. Same tokens. Not new grades. Cite 01dc193.
// The pin is the DailyMed inactive paragraph (re-opened this pass). Counts
// are the ones printed on the opened label images: 342.jpg reads
// "100 TABLETS - 500 mg each"; 29RLABEL.jpg reads "96 Tablets". The 697R
// title and image name pin 400 count. No GTIN-12 under barcode bars was read.
// NDC is not a UPC.
// The batch107 pack-count OUTs stay OUT and are not written as Search rows.
// recordStatus is 'unverified'. Internal keys only: clean | caution | avoid.
// Search wiring only. Not wired into Clean Picks UI.
//
// Do NOT edit batch70–batch107. No house Amazon. No HealthA2Z. No A+Health.
// No GoodSense. No toothpaste. No Sprouts. No factory. Oil form split stays
// as it is on main.
//
// Leftover Amazon 3P after this slice: 1 (GoodSense).
//
// TALLY (unverified drafts in THIS file): 3 rows —
// Clean 0 / Caution 0 / Avoid 3.
// NEW 3 / REUSE-formula 0 /
// SKIPPED 3 (no_OI 0 / OUT 3) /
// REFUSED 0.
// Search grade: Clean 0 / Caution 0 / Avoid 3.
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

const STAMP = 'Sept 25, 2026 FD-C dye aliases (01dc193)';

const METH = {
  acacia: 'Methodology §5 Cleared (acacia / gum arabic).',
  carnauba:
    'Methodology §5 Caution (carnauba wax — Sept 25, 2026). Not the old Cleared wax row. Not Avoid.',
  caso4:
    'Methodology §5 Cleared (calcium sulfate — Sept 25, 2026). Same salt neighborhood as sodium sulfate. Not SLS.',
  corn: 'Methodology §5 Cleared (corn starch — named simple starch).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium).',
  crospovidone: 'Methodology §5 Cleared (crospovidone).',
  dye:
    'Methodology §5 High (FD&C / D&C synthetic dyes, including lakes). FD-C, D-C, "no.", and "no " map to these same locks (Sept 25, 2026, 01dc193). Not a new grade.',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC).',
  iron:
    'Methodology §5 Caution (iron oxide as color). Iron oxide black, iron oxide red, iron oxide yellow, and iron oxide ochre sit on this row. Not Avoid.',
  kaolin:
    'Methodology §5 Cleared (kaolin). Distinct from Caution calcined kaolin.',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose).',
  mgStearate: 'Methodology §5 Cleared (magnesium stearate).',
  mica:
    'Methodology §5 Caution (mica-based pearlescent pigment). Mica based pearlescent pigment is this spelling (Sept 25, 2026, 01dc193). Same token. Not a new grade. Not Avoid.',
  peg:
    'Methodology §5 Moderate (polyethylene glycol / PEGs, including polyethylene glycol 400). Not the Avoid driver.',
  peg8000:
    'Methodology §5 Moderate (PEGs). polyethylene glycol (peg) 8000 maps here (Sept 25, 2026). Not a new grade. Not the Avoid driver.',
  peg6000:
    'Methodology §5 Moderate (PEGs). polyethylene glycol 6000 maps here (Sept 25, 2026). Not a new grade. Not the Avoid driver.',
  povidone: 'Methodology §5 Cleared (povidone).',
  pregel: 'Methodology §5 Cleared (pregelatinized starch).',
  ps80: 'Methodology §5 Moderate (polysorbate 80). Not the Avoid driver.',
  sio2:
    'Methodology §5 Limited (colloidal silicon dioxide / silica — 0-pt nanoparticle Caution cap). Does not by itself make Avoid.',
  ssg: 'Methodology §5 Cleared (sodium starch glycolate).',
  stearic: 'Methodology §5 Cleared (stearic acid).',
  sucralose: 'Methodology §5 Moderate (sucralose). Not the Avoid driver.',
  sugar:
    'Methodology §5 Caution (bare sugar). Distinct from Cleared cane sugar and from Limited sucrose. Not Avoid.',
  talc: 'Methodology §5 High (talc in an oral / swallow product).',
  tio2: 'Methodology §5 High (titanium dioxide).',
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
  barcode?: string;
  upcNote?: string;
};

function expand(d: Compact): RatingRecord {
  const alts: CleanAlternative[] = [];
  if (d.verdict !== 'clean') {
    const main = {
      'Pain & Fever': [
        'thorne-glucosamine-chondroitin',
        'Independently Clean Thorne Glucosamine & Chondroitin already on main. Form labeled, not a hard filter (§6).',
      ],
      'Cold & Flu': [
        'coldcalm-meltaways',
        'Independently Clean Boiron ColdCalm already on main. Form labeled, not a hard filter (§6).',
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
    honestNote: `${d.note} ${LIMITED_STACK} No dosing or medical advice. Draft, not verified.`,
    retailers: [...AMAZON],
    cleanAlternatives: alts.length ? alts : undefined,
    barcode: d.barcode,
    sourcesGeneral: [`${d.cite}${d.upcNote ? ` ${d.upcNote}` : ''} — ${UNVERIFIED_NOTE}`],
  });
}

function dm(
  setid: string,
  ndc: string,
  extra: string,
  active: string,
  inactive: string,
): string {
  return `DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${setid}; setid ${setid}; NDC ${ndc}). ${extra} Active: ${active}. Inactive ingredients: ${inactive}. No GTIN-12 printed under barcode bars was read. NDC is not a UPC. Re-opened this pass.`;
}

const APAP: Compact['flags'] = [
  ['CARNAUBA WAX', 'limited', 'carnauba'],
  ['FD-C RED NO. 40 ALUMINUM LAKE', 'high', 'dye'],
  ['HYPROMELLOSE', 'cleared', 'hpmc'],
  ['POLYETHYLENE GLYCOL(PEG) 400', 'moderate', 'peg'],
  ['POLYETHYLENE GLYCOL (peg) 8000', 'moderate', 'peg8000'],
  ['POVIDONE', 'cleared', 'povidone'],
  ['PREGELATINIZED STARCH', 'cleared', 'pregel'],
  ['SODIUM STARCH GLYCOLATE', 'cleared', 'ssg'],
  ['STEARIC ACID', 'cleared', 'stearic'],
  ['SUCRALOSE', 'moderate', 'sucralose'],
  ['TITANIUM DIOXIDE', 'high', 'tio2'],
];

const RAPID: Compact['flags'] = [
  ['croscarmellose sodium', 'cleared', 'croscarmellose'],
  ['crospovidone', 'cleared', 'crospovidone'],
  ['FD&C red #40 aluminum lake', 'high', 'dye'],
  ['FD&C yellow #6 aluminum lake', 'high', 'dye'],
  ['hypromellose', 'cleared', 'hpmc'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['mica based pearlescent pigment', 'limited', 'mica'],
  ['polyethylene glycol 400', 'moderate', 'peg'],
  ['polyethylene glycol 6000', 'moderate', 'peg6000'],
  ['polysorbate 80', 'moderate', 'ps80'],
  ['povidone', 'cleared', 'povidone'],
  ['pregelatinized starch', 'cleared', 'pregel'],
];

const PSE: Compact['flags'] = [
  ['acacia', 'cleared', 'acacia'],
  ['calcium sulfate', 'cleared', 'caso4'],
  ['carnauba wax', 'limited', 'carnauba'],
  ['colloidal silicon dioxide', 'limited', 'sio2'],
  ['corn starch', 'cleared', 'corn'],
  ['D-C red no. 27', 'high', 'dye'],
  ['D-C yellow no.10', 'high', 'dye'],
  ['FD-C red no.40', 'high', 'dye'],
  ['FD-C yellow no 6', 'high', 'dye'],
  ['iron oxide black', 'limited', 'iron'],
  ['iron oxide red', 'limited', 'iron'],
  ['iron oxide yellow (iron oxide ochre)', 'limited', 'iron'],
  ['kaolin', 'cleared', 'kaolin'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['polyethylene glycol (PEG) 400', 'moderate', 'peg'],
  ['pregelatinized starch', 'cleared', 'pregel'],
  ['sodium starch glycolate', 'cleared', 'ssg'],
  ['stearic acid', 'cleared', 'stearic'],
  ['sugar', 'limited', 'sugar'],
  ['talc', 'high', 'talc'],
  ['titanium dioxide', 'high', 'tio2'],
];

const SET_APAP = '2569383a-4a05-4ddb-852e-b37e487ffcde';
const SET_RAPID = 'c9f80d24-bd05-e1ce-e053-2995a90aa646';
const SET_PSE = 'd8dace20-752e-4686-8026-c8fc97591fa8';

const APAP_OI =
  'CARNAUBA WAX, FD-C RED NO. 40 ALUMINUM LAKE, HYPROMELLOSE, POLYETHYLENE GLYCOL(PEG) 400, POLYETHYLENE GLYCOL (peg) 8000, POVIDONE, PREGELATINIZED STARCH, SODIUM STARCH GLYCOLATE**, STEARIC ACID, SUCRALOSE, TITANIUM DIOXIDE';
const RAPID_OI =
  'croscarmellose sodium, crospovidone, FD&C red #40 aluminum lake, FD&C yellow #6 aluminum lake, hypromellose, magnesium stearate, mica based pearlescent pigment, polyethylene glycol 400, polyethylene glycol 6000, polysorbate 80, povidone, pregelatinized starch';
const PSE_OI =
  'acacia, calcium sulfate, carnauba wax, colloidal silicon dioxide, corn starch, D-C red no. 27, D-C yellow no.10, FD-C red no.40, FD-C yellow no 6, iron oxide black, iron oxide red, iron oxide yellow (iron oxide ochre), kaolin, microcrystalline cellulose, polyethylene glycol (PEG) 400, pregelatinized starch, sodium starch glycolate, stearic acid, sugar, talc, titanium dioxide';

function pack(
  partial: Omit<Compact, 'audience' | 'productType'>,
): Compact {
  return { ...partial, audience: ADULT, productType: OTC };
}

const COMPACT: Compact[] = [
  pack({
    id: 'timecap-b108-apap-342-100',
    productName:
      'Timely Extra Strength Acetaminophen easy-swallow tablets 500 mg, 100 count, NDC 49483-342',
    category: 'Pain & Fever',
    formulaId: 'timecap-b108-apap-342-100',
    minAge: 12,
    form: 'film-coated tablet',
    actives: [{ name: 'Acetaminophen', strength: '500 mg' }],
    flags: APAP,
    verdict: 'avoid',
    note: `Avoid. Drivers are FD-C RED NO. 40 ALUMINUM LAKE and titanium dioxide (High). FD-C is the ${STAMP} onto the existing FD&C red 40 lake lock. POLYETHYLENE GLYCOL (peg) 8000 is the existing PEG lock. The ** on sodium starch glycolate is may-contain and is included. Ages 12+. Brand code 342R.`,
    cite: dm(
      SET_APAP,
      '49483-342',
      'Label image 342.jpg prints 100 TABLETS - 500 mg each. Brand code 342R. https://www.timecaplabs.com/analgesic is the bulk code 49483-342-00 and does not print a count.',
      'Acetaminophen 500 mg',
      APAP_OI,
    ),
  }),
  pack({
    id: 'timecap-b108-apap-rr-400',
    // KYR5-d — zbar on DailyMed 697R-Timely-APAP-RR-label-400s.jpg.
    barcode: '349483697438',
    upcNote:
      'UPC-A 349483697438 is the code under the bars on DailyMed image 697R-Timely-APAP-RR-label-400s.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=c9f80d24-bd05-e1ce-e053-2995a90aa646&name=697R-Timely-APAP-RR-label-400s.jpg).',
    productName:
      'Timely Extra Strength Acetaminophen 500 mg rapid release, 400 count, NDC 49483-697',
    category: 'Pain & Fever',
    formulaId: 'timecap-b108-apap-rr-400',
    minAge: 12,
    form: 'rapid-release caplet',
    actives: [{ name: 'Acetaminophen', strength: '500 mg' }],
    flags: RAPID,
    verdict: 'avoid',
    note: `Avoid. Drivers are FD&C red #40 aluminum lake and FD&C yellow #6 aluminum lake (High). mica based pearlescent pigment is the ${STAMP} onto the existing mica-based pearlescent pigment Caution lock and is not the Avoid driver. polyethylene glycol 6000 is the existing PEG lock. Ages 12+. Brand code 697R.`,
    cite: dm(
      SET_RAPID,
      '49483-697',
      'SPL title and label image 697R-Timely-APAP-RR-label-400s.jpg pin 400 count. Directions say caplets. Brand code 697R.',
      'Acetaminophen 500 mg',
      RAPID_OI,
    ),
  }),
  pack({
    id: 'timecap-b108-pse-30-96',
    // KYR5-d — zbar on DailyMed 29RLABEL.jpg.
    barcode: '049483016962',
    upcNote:
      'UPC-A 049483016962 is the code under the bars on DailyMed image 29RLABEL.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=d8dace20-752e-4686-8026-c8fc97591fa8&name=29RLABEL.jpg).',
    productName:
      'Timely Pseudo-Time pseudoephedrine HCl 30 mg tablets, 96 count, NDC 49483-016',
    category: 'Cold & Flu',
    formulaId: 'timecap-b108-pse-30-96',
    minAge: 6,
    form: 'coated tablet',
    actives: [{ name: 'Pseudoephedrine HCl', strength: '30 mg' }],
    flags: PSE,
    verdict: 'avoid',
    note: `Avoid. Drivers are D-C red no. 27, D-C yellow no.10, FD-C red no.40, FD-C yellow no 6, talc, and titanium dioxide (High). FD-C and D-C, including no. and no followed by a space, are the ${STAMP} onto the existing FD&C / D&C dye locks. calcium sulfate is the existing Cleared calcium sulfate lock. The blank between two commas on the SPL is not an ingredient. Package codes 49483-016-24 and 49483-016-48 were not on the opened image, so those counts are not rows. Ages 6+.`,
    cite: dm(
      SET_PSE,
      '49483-016',
      'Label image 29RLABEL.jpg prints Pseudo-Time, Pseudoephedrine HCl 30 mg, 96 Tablets.',
      'Pseudoephedrine HCl 30 mg',
      PSE_OI,
    ),
  }),
];

export const BATCH108_KYR6B_TIMECAP_FDC_ALIASES: RatingRecord[] = COMPACT.map(expand);

export const BATCH108_SKIPPED_NO_OI: { sku: string; reason: string }[] = [];

export const BATCH108_SKIPPED_OUT: { sku: string; reason: string }[] = [
  {
    sku: 'Timely omeprazole 20 mg tablets, NDC 49483-731',
    reason:
      'OUT. Stays the batch107 pack-count OUT. Not written. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=40906798-cd84-fbd0-e063-6294a90a1d29.',
  },
  {
    sku: '686T Loratadine liquid-filled capsules, NDC 49483-686',
    reason:
      'OUT. Stays the batch107 pack-count OUT. Not written. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=85b26cf3-448c-4d4f-93a2-aa89530ec1f1.',
  },
  {
    sku: '190R Sennosides 15 mg sugar-coated tablets, NDC 49483-079',
    reason:
      'OUT. Stays the batch107 pack-count OUT. Not written. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7498f5fa-1739-bb6e-e053-2a91aa0a5404.',
  },
];

export const BATCH108_SKIPPED: { sku: string; reason: string }[] = [
  ...BATCH108_SKIPPED_NO_OI,
  ...BATCH108_SKIPPED_OUT,
];

export const BATCH108_REFUSED: { sku: string; reason: string }[] = [];

const _ROWS = BATCH108_KYR6B_TIMECAP_FDC_ALIASES;
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
if (_ROWS.length !== 3) throw new Error('batch108 row tally drift');
if (_grades.clean !== 0 || _grades.caution !== 0 || _grades.avoid !== 3) {
  throw new Error('batch108 Search grade drift');
}
if (_new !== 3 || _reuse !== 0) throw new Error('batch108 NEW/REUSE drift');
if (_ROWS.filter((r) => r.formulaId === r.id).length !== 3) {
  throw new Error('batch108 canonical formula drift');
}
if (BATCH108_SKIPPED_NO_OI.length !== 0) throw new Error('batch108 no_OI drift');
if (BATCH108_SKIPPED_OUT.length !== 3) throw new Error('batch108 OUT drift');
if (BATCH108_SKIPPED.length !== 3) throw new Error('batch108 SKIPPED drift');
if (BATCH108_REFUSED.length !== 0) throw new Error('batch108 REFUSED drift');
if (_ROWS.some((r) => r.brand !== 'TIME-Cap Labs')) throw new Error('batch108 brand drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch108 recordStatus must stay unverified');
}
const _UPC: Record<string, string> = {
  'timecap-b108-apap-rr-400': '349483697438',
  'timecap-b108-pse-30-96': '049483016962',
};
function _upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}
if (Object.keys(_UPC).length !== 2) throw new Error('batch108 UPC allowlist drift');
for (const record of _ROWS) {
  const expected = _UPC[record.id];
  if (expected) {
    if (record.barcode !== expected) throw new Error(`batch108 UPC attach drift on ${record.id}`);
    if (!_upcOk(record.barcode ?? '')) throw new Error(`batch108 barcode failed UPC-A check on ${record.id}`);
  } else if (record.barcode) {
    throw new Error(`batch108 unexpected barcode on ${record.id}`);
  }
}
const _upcValues = Object.values(_UPC);
if (new Set(_upcValues).size !== _upcValues.length) throw new Error('batch108 duplicate UPC');
if (_ROWS.some((r) => !r.id.startsWith('timecap-b108-'))) {
  throw new Error('batch108 ids must use timecap-b108-');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch108 duplicate id');
if (_ROWS.some((r) => r.verdict === 'avoid' && !r.inactiveIngredients?.some((f) => f.riskLevel === 'high'))) {
  throw new Error('batch108 Avoid without High');
}
if (_ROWS.some((r) => !(r.inactiveIngredients?.length))) {
  throw new Error('batch108 missing a printed inactive');
}
const _blob = [
  ..._ROWS.map((r) => `${r.productName} ${r.id}`),
  ...BATCH108_SKIPPED.map((s) => s.sku),
  ...BATCH108_REFUSED.map((s) => s.sku),
].join('\n');
if (/GoodSense|HealthA2Z|A\+Health|toothpaste|Sprouts|Basic Care|Amazon Elements|\bSolimo\b/i.test(_blob)) {
  throw new Error('batch108 excluded brand leaked');
}
