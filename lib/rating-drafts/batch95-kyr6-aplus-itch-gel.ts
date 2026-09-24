// DRAFT / not verified / batch 95 KYR6 A+Health itch gel.
// Methodology v1.6 + MAIN §5 after the Sept 24, 2026 formaldehyde-releaser
// stamp (0620a56). Harm-first. No invented grades. No invented OI.
// No invented UPCs. Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. A+Health itch gel only. Unlocks the batch94 REFUSED packs
// whose only blocking string was `Diazolidnyl Urea`. That spelling is the
// printed misspelling of diazolidinyl urea. The Sept 24 stamp puts both
// strings on the formaldehyde-releaser Avoid row. Same treatment as
// batch94 mapping `Plain caramel powder` onto the undisclosed-caramel
// Avoid row.
// The pin is the DailyMed inactive paragraph. NDC is not a UPC. A UPC-A
// is attached only where the carton bars on the DailyMed image matched
// this exact pack. The 496 tube image has no bars. Empty stays empty.
// Both packs print the same inactive line and the same active, so they
// share one formulaId. Canada/EU listings stay out. recordStatus is
// 'unverified' on every row.
// Internal keys only: clean | caution | avoid. Search wiring only.
// Not wired into Clean Picks UI.
//
// Do NOT edit batch70–batch94. No house Amazon. No HealthA2Z. No
// TIME-Cap. No GoodSense. No toothpaste. No Sprouts. No factory.
//
// TALLY (unverified drafts in THIS file): 2 rows —
// Clean 0 / Caution 0 / Avoid 2.
// NEW 1 / REUSE-formula 1 /
// SKIPPED 0 (no_OI 0 / OUT 0) /
// REFUSED 0.
// Search grade: Clean 0 / Caution 0 / Avoid 2.
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

const BRAND = 'A+Health';
const AMAZON = ['Amazon'] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';
const PG_TOPICAL_TAP =
  'Propylene glycol is oral-scoped Moderate. On this topical it is not that Moderate row.';

const DM = 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=';

const METH = {
  alcoholVehicle:
    'Methodology §5 Limited (alcohol / SD alcohol as a vehicle — SD alcohol and SD alcohol 39C sit on this row). SD Alcohol 38-B sits on this same row. Not a new alcohol class. Not Avoid.',
  camphor:
    'Methodology §5 Caution (camphor / dl-camphor as inactive — exact token when listed as inactive; distinct from parked camphor-as-active; locked Sept 15, 2026). Not Avoid.',
  citric:
    'Methodology §5 Cleared (citric acid / citrate salts as fillers or buffers).',
  diazolidinyl:
    'Methodology §5 High (formaldehyde-releasers as Other Ingredients). Diazolidnyl Urea is the printed misspelling of diazolidinyl urea (Sept 24, 2026). Avoid. Not the old Caution lock.',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  hpmc:
    'Methodology §5 Cleared (hypromellose / HPMC). Hydroxypropyl Methylcellulose is that same row. Not a new grade. Not hydroxypropyl cellulose.',
  paraben:
    'Methodology §5 High (parabens — methylparaben and propylparaben, every form).',
  pgTopical: `Methodology §5 Cleared (propylene glycol, topical). ${PG_TOPICAL_TAP}`,
  sodiumCitrate:
    'Methodology §5 Cleared (sodium citrate — citrate-salt filler/buffer with citric acid).',
  water: 'Methodology §5 Cleared (purified water / water).',
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
    alts.push(
      alt(
        'boiron-arnicare-gel',
        'Independently Clean Boiron Arnicare Gel already on main. Form labeled, not a hard filter (§6).',
      ),
    );
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
    barcode: d.barcode,
    sourcesGeneral: [`${d.cite}${d.upcNote ? ` ${d.upcNote}` : ''} — ${UNVERIFIED_NOTE}`],
  });
}

const ITCH = 'aplushealth-b95-itch-gel';

const INACTIVE_LINE =
  'Camphor, Citric Acid, Diazolidnyl Urea, Glycerin, Hydroxypropyl Methylcellulose, Methylparaben, Propylene Glycol, Propylparaben, SD Alcohol 38-B, Sodium Citrate, Purified Water.';

const ITCH_FLAGS: Compact['flags'] = [
  ['Diazolidnyl Urea', 'high', 'diazolidinyl'],
  ['Methylparaben', 'high', 'paraben'],
  ['Propylparaben', 'high', 'paraben'],
  ['Camphor', 'limited', 'camphor'],
  ['SD Alcohol 38-B', 'limited', 'alcoholVehicle'],
  ['Citric Acid', 'cleared', 'citric'],
  ['Glycerin', 'cleared', 'glycerin'],
  ['Hydroxypropyl Methylcellulose', 'cleared', 'hpmc'],
  ['Propylene Glycol', 'cleared', 'pgTopical'],
  ['Sodium Citrate', 'cleared', 'sodiumCitrate'],
  ['Purified Water', 'cleared', 'water'],
];

const COMPACT: Compact[] = [
  {
    id: ITCH,
    // zbar on DailyMed Health Itch Relief 2022.jpg and a health itch gel.jpg.
    // Both decode GTIN-13 0369452376553, which is UPC-A 369452376553.
    barcode: '369452376553',
    upcNote:
      'UPC-A 369452376553 is the code under the bars on the DailyMed carton images for NDC 69452-376-55 (Health Itch Relief 2022.jpg and a health itch gel.jpg).',
    productName:
      'A+Health Itch Relief Gel, Diphenhydramine HCl 2%, 4 fl oz (118 mL), NDC 69452-376-55',
    category: 'First Aid',
    formulaId: ITCH,
    audience: ADULT,
    minAge: 2,
    form: 'gel',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine HCl', strength: '2%' }],
    flags: ITCH_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are Diazolidnyl Urea, methylparaben, and propylparaben. Diazolidnyl Urea is the printed misspelling of diazolidinyl urea and sits on the Sept 24 formaldehyde-releaser Avoid row. Camphor is the locked inactive Caution token. SD Alcohol 38-B sits on the locked SD alcohol vehicle row, not a new alcohol class. Hydroxypropyl Methylcellulose sits on the Cleared hypromellose row. Topical propylene glycol stays Cleared. The 69452-496-55 tube prints this same inactive line and the same active, so it shares formulaId. Under 2: ask a doctor.',
    cite: `DailyMed SPL (${DM}ecf5decb-c98b-7739-e053-2995a90a5541; setid ecf5decb-c98b-7739-e053-2995a90a5541; NDC 69452-376-55; 118 mL). Active ingredient: Diphenhydramine HCl 2%. Inactive ingredients: ${INACTIVE_LINE} Ages 2+. Amazon PDP B0B9NTJ3B4 lists the same UPC and spells the urea token Diazolidinyl Urea. The Drug Facts print Diazolidnyl Urea. The grade follows the Drug Facts string.`,
  },
  {
    id: 'aplushealth-b95-itch-gel-496',
    productName:
      'A+Health Itch Relief Gel, Diphenhydramine HCl 2%, 4 fl oz (118 mL), NDC 69452-496-55',
    category: 'First Aid',
    formulaId: ITCH,
    audience: ADULT,
    minAge: 2,
    form: 'gel',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine HCl', strength: '2%' }],
    flags: ITCH_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Same inactive line and the same active as NDC 69452-376-55, so they share formulaId. Drivers are Diazolidnyl Urea, methylparaben, and propylparaben. Diazolidnyl Urea is the Sept 24 formaldehyde-releaser Avoid row. Under 2: ask a doctor.',
    cite: `DailyMed SPL (${DM}38040732-48c9-3533-e063-6394a90af10a; setid 38040732-48c9-3533-e063-6394a90af10a; NDC 69452-496-55; 118 mL tube). Active ingredient: Diphenhydramine HCl 2%. Inactive ingredients: ${INACTIVE_LINE} Ages 2+. No GTIN-12 on the tube-label image. The Amazon B0B9NTJ3B4 UPC belongs to the 376 carton, not this tube.`,
  },
];

export const BATCH95_KYR6_APLUS_ITCH_GEL: RatingRecord[] = COMPACT.map(expand);

export const BATCH95_SKIPPED_NO_OI: { sku: string; reason: string }[] = [];

export const BATCH95_SKIPPED_OUT: { sku: string; reason: string }[] = [];

export const BATCH95_SKIPPED: { sku: string; reason: string }[] = [
  ...BATCH95_SKIPPED_NO_OI,
  ...BATCH95_SKIPPED_OUT,
];

export const BATCH95_REFUSED: { sku: string; reason: string }[] = [];

const _ROWS = BATCH95_KYR6_APLUS_ITCH_GEL;
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

if (_ROWS.length !== 2) throw new Error('batch95 row tally drift');
if (_grades.clean !== 0 || _grades.caution !== 0 || _grades.avoid !== 2) {
  throw new Error('batch95 Search grade drift');
}
if (_new !== 1 || _reuse !== 1) throw new Error('batch95 NEW/REUSE drift');
if (_ROWS.filter((r) => r.formulaId === r.id).length !== 1) {
  throw new Error('batch95 canonical formula drift');
}
if (BATCH95_SKIPPED_NO_OI.length !== 0) throw new Error('batch95 no_OI drift');
if (BATCH95_SKIPPED_OUT.length !== 0) throw new Error('batch95 OUT drift');
if (BATCH95_SKIPPED.length !== 0) throw new Error('batch95 SKIPPED drift');
if (BATCH95_REFUSED.length !== 0) throw new Error('batch95 REFUSED drift');
if (_ROWS.some((r) => r.brand !== 'A+Health')) throw new Error('batch95 brand drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch95 recordStatus must stay unverified');
}
const _UPC: Record<string, string> = {
  'aplushealth-b95-itch-gel': '369452376553',
};
function _upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}
if (Object.keys(_UPC).length !== 1) throw new Error('batch95 UPC allowlist drift');
for (const record of _ROWS) {
  const expected = _UPC[record.id];
  if (expected) {
    if (record.barcode !== expected) throw new Error(`batch95 UPC attach drift on ${record.id}`);
    if (!_upcOk(record.barcode ?? '')) throw new Error(`batch95 barcode failed UPC-A check on ${record.id}`);
  } else if (record.barcode) {
    throw new Error(`batch95 unexpected barcode on ${record.id}`);
  }
}
if (_ROWS.some((r) => !r.id.startsWith('aplushealth-b95-'))) {
  throw new Error('batch95 ids must use aplushealth-b95-');
}
if (_ROWS.some((r) => !r.formulaId?.startsWith('aplushealth-b95-'))) {
  throw new Error('batch95 formula ids must use aplushealth-b95-');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch95 duplicate id');
const _formulas = new Set(_ROWS.map((r) => r.formulaId));
if (![..._formulas].every((id) => _ids.has(id!))) {
  throw new Error('batch95 formulaId must point at a row in this file');
}
if (_ROWS.some((r) => r.verdict === 'avoid' && !r.inactiveIngredients?.some((f) => f.riskLevel === 'high'))) {
  throw new Error('batch95 Avoid without High');
}
const _printed = [
  'Camphor',
  'Citric Acid',
  'Diazolidnyl Urea',
  'Glycerin',
  'Hydroxypropyl Methylcellulose',
  'Methylparaben',
  'Propylene Glycol',
  'Propylparaben',
  'SD Alcohol 38-B',
  'Sodium Citrate',
  'Purified Water',
];
for (const record of _ROWS) {
  const names = record.inactiveIngredients?.map((f) => f.name) ?? [];
  if (_printed.some((name) => !names.includes(name))) {
    throw new Error(`batch95 missing a printed inactive on ${record.id}`);
  }
  if (names.length !== _printed.length) throw new Error(`batch95 extra inactive on ${record.id}`);
  const urea = record.inactiveIngredients?.find((f) => f.name === 'Diazolidnyl Urea');
  if (!urea || urea.riskLevel !== 'high') {
    throw new Error('batch95 Diazolidnyl Urea must be Avoid');
  }
  const active = record.activeIngredients?.[0];
  if (active?.name !== 'Diphenhydramine HCl' || active.strength !== '2%') {
    throw new Error('batch95 active must stay Diphenhydramine HCl 2%');
  }
}
const _blob = [
  ..._ROWS.map((r) => `${r.brand} ${r.productName} ${r.id}`),
  ...BATCH95_SKIPPED.map((s) => s.sku),
  ...BATCH95_REFUSED.map((s) => s.sku),
].join('\n');
if (/healtha2z|goodsense|toothpaste|sprouts/i.test(_blob)) {
  throw new Error('batch95 must not write HealthA2Z, GoodSense, toothpaste, or Sprouts');
}
if (/\bTIME-Cap\b/.test(_blob)) throw new Error('batch95 must not write TIME-Cap');
