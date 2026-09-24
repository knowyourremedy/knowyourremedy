// DRAFT / not verified / batch 91 KYR6 WELMATE poloxamer 182 backfill.
// Methodology v1.6 + MAIN §5 after the Sept 24, 2026 poloxamer 182 stamp
// (fd26c58). Harm-first. No invented grades. No invented OI. No invented UPCs.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. WELMATE Adapalene Gel 0.1%, 1.6 oz only. The SKU batch90
// refused solely on `poloxamer 182`. That string is now the locked exact
// Caution token (PEG-style surfactant). Not High. Not a new grade. The
// rest of that carton already sat on a locked §5 row. Methylparaben is
// the existing High paraben row, so the verdict is Avoid.
// batch70–90 were not edited. The paraben-free carton NDC 73581-019-06
// is a different pack and was not written. Levocetirizine 5 mg 360
// tablets stays no_OI and was not hunted. OCR `chonüoitin sulfate` /
// WelAhead roll-on stays refused and is not written here.
// Pin = DailyMed carton image adapalene-01.jpg (setid
// 3ab5661b-a67a-45a3-b542-228be3cebb27, NDC 73581-214-06). That carton
// barcode decodes as GTIN 0373581000203 (UPC-A 373581000203).
// recordStatus is 'unverified'. Internal keys only: clean | caution | avoid.
// Search wiring only. Not wired into Clean Picks UI.
//
// No next Amazon 3P brand. No A+Health / HealthA2Z / TIME-Cap / GoodSense.
// No toothpaste. No house Amazon. No Sprouts. No factory. No graded oil
// pour bottles. Leftover Amazon 3P stays N=4.
//
// TALLY (unverified drafts in THIS file): 1 row —
// Clean 0 / Caution 0 / Avoid 1.
// NEW 1 / REUSE-formula 0 / SKIPPED 0 / REFUSED 0.
// Search grade: Avoid.
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

const BRAND = 'WELMATE';
const AMAZON = ['Amazon', 'wellspringmeds.com'] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';
const PG_TOPICAL_TAP =
  'Propylene glycol is oral-scoped Moderate. On this topical it is not that Moderate row.';

const PRINTED_OI =
  'carbomer homopolymer type C, edetate disodium, methylparaben, poloxamer 182, propylene glycol, purified water, sodium hydroxide';

const SETID = '3ab5661b-a67a-45a3-b542-228be3cebb27';
const NDC = '73581-214-06';
const UPC = '373581000203';
const FORMULA = 'welmate-b91-adapalene-01-gel';

const METH = {
  carbomer:
    'Methodology §5 Cleared (carbomer / carbomer homopolymer, including type C).',
  edta:
    'Methodology §5 Cleared (disodium EDTA / edetate disodium, trace preservative/stabilizer — locked v1.6). Distinct from Caution tetrasodium EDTA.',
  naoh:
    'Methodology §5 Cleared (sodium hydroxide as pH adjuster — locked Sept 14, 2026). Not a grade driver.',
  paraben:
    'Methodology §5 High (parabens — methylparaben). High in every form, including gels. Not a topical exception.',
  pgTopical: `Methodology §5 Cleared (propylene glycol, topical). ${PG_TOPICAL_TAP}`,
  poloxamer:
    'Methodology §5 Caution (poloxamer 182 — exact token; PEG-style surfactant; locked Sept 24, 2026). Not High. Distinct from Caution behenoyl polyoxyl-8 glycerides and from Caution polyoxyethylene (23) cetyl ether. Do not flip those rows. Not the Moderate polyethylene glycol row.',
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

const cite =
  `DailyMed carton image adapalene-01.jpg (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${SETID}; setid ${SETID}; NDC ${NDC}; 45 g / 1.6 oz tube in 1 carton) inactive ingredients: ${PRINTED_OI}. Carton barcode decodes as GTIN 0373581000203 (UPC-A ${UPC}), the same GTIN batch90 recorded on this carton and on the Wellspring 1.6 oz offer. Directions: adults and children 12 years of age and older; children under 12 years of age ask a doctor. Poloxamer 182 maps to the locked Sept 24 Caution token. Not High. ${PG_TOPICAL_TAP}`;

export const BATCH91_KYR6_WELMATE_POLOXAMER: RatingRecord[] = [
  row({
    id: FORMULA,
    productName: 'WELMATE Adapalene Gel 0.1%, 1.6 oz',
    brand: BRAND,
    category: 'First Aid',
    formulaId: FORMULA,
    audience: ADULT,
    minAge: 12,
    form: 'gel',
    productType: OTC,
    activeIngredients: [{ name: 'Adapalene', strength: '0.1%' }],
    inactiveIngredients: (
      [
        ['Carbomer homopolymer type C', 'cleared', 'carbomer'],
        ['Edetate disodium', 'cleared', 'edta'],
        ['Methylparaben', 'high', 'paraben'],
        ['Poloxamer 182', 'limited', 'poloxamer'],
        ['Propylene glycol', 'cleared', 'pgTopical'],
        ['Purified water', 'cleared', 'water'],
        ['Sodium hydroxide', 'cleared', 'naoh'],
      ] as [string, IngredientFlag['riskLevel'], keyof typeof METH][]
    ).map(([name, risk, meth]) => flag(name, risk, labelCite(cite, METH[meth]))),
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Avoid. Driver is methylparaben. High in every form, including this gel. Poloxamer 182 maps to the locked Sept 24 Caution token (PEG-style surfactant). Not High. Not the Moderate polyethylene glycol row. Distinct from Caution behenoyl polyoxyl-8 glycerides and from Caution polyoxyethylene (23) cetyl ether. Topical propylene glycol stays Cleared. Edetate disodium stays Cleared disodium EDTA, not tetrasodium EDTA. Carbomer homopolymer type C stays Cleared. Sodium hydroxide is the Cleared pH adjuster. Ages 12+ (under 12: ask a doctor). ${LIMITED_STACK} Pack sizes share formulaId \`${FORMULA}\` when this OI list holds. No dosing or medical advice. Draft, not verified.`,
    retailers: [...AMAZON],
    cleanAlternatives: [
      alt(
        'boiron-arnicare-gel',
        'Independently Clean Boiron Arnicare Gel already on main. Form labeled, not a hard filter (§6).',
      ),
    ],
    barcode: UPC,
    sourcesGeneral: [`${cite} UPC-A ${UPC} is the GTIN-12 on this carton. — ${UNVERIFIED_NOTE}`],
  }),
];

export const BATCH91_SKIPPED: { sku: string; reason: string }[] = [];

export const BATCH91_REFUSED: { sku: string; reason: string }[] = [];

const _ROWS = BATCH91_KYR6_WELMATE_POLOXAMER;
if (_ROWS.length !== 1) throw new Error('batch91 tally drift: expected 1 row');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 0) throw new Error('batch91 Clean tally drift');
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 0) throw new Error('batch91 Caution tally drift');
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 1) throw new Error('batch91 Avoid tally drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) throw new Error('batch91 recordStatus must stay unverified');
if (_ROWS.some((r) => r.id !== FORMULA)) throw new Error('batch91 id drift');
if (_ROWS.some((r) => r.formulaId !== r.id)) throw new Error('batch91 NEW formula drift');
if (_ROWS.some((r) => !r.id.startsWith('welmate-b91-'))) throw new Error('batch91 ids must use welmate-b91-');
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch91 duplicate ids');
if (_ROWS.some((r) => r.brand !== BRAND)) throw new Error('batch91 writes WELMATE only');
if (_ROWS.some((r) => r.barcode !== UPC)) throw new Error('batch91 UPC attach drift');
function _upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}
if (!_upcOk(UPC)) throw new Error('batch91 barcode failed UPC-A check');
if (_ROWS.some((r) => /toothpaste|sprouts|now foods|nutricost|naturewise|goodsense|healtha2z|time-cap|a\+health|welahead/i.test(`${r.brand} ${r.productName}`))) {
  throw new Error('batch91 other 3P / WelAhead / toothpaste must stay out');
}
if (_ROWS.some((r) => /\boil\b/i.test(r.productName) && !/gel|cream|ointment/i.test(`${r.productName} ${r.form ?? ''}`))) {
  throw new Error('batch91 must not grade oil pour bottles');
}
for (const record of _ROWS) {
  if (!record.inactiveIngredients.some((i) => i.riskLevel === 'high')) {
    throw new Error(`batch91 Avoid without High on ${record.id}`);
  }
  if (!record.sourcesGeneral?.some((s) => s.includes(PRINTED_OI))) {
    throw new Error('batch91 cite must quote the printed inactive list');
  }
  if (!record.sourcesGeneral?.some((s) => s.includes(NDC) && s.includes(SETID))) {
    throw new Error('batch91 cite must pin NDC 73581-214-06');
  }
  const names = record.inactiveIngredients.map((i) => i.name);
  if (names.join(' | ') !== [
    'Carbomer homopolymer type C',
    'Edetate disodium',
    'Methylparaben',
    'Poloxamer 182',
    'Propylene glycol',
    'Purified water',
    'Sodium hydroxide',
  ].join(' | ')) {
    throw new Error('batch91 inactive line drift');
  }
  const poloxamer = record.inactiveIngredients.find((i) => i.name === 'Poloxamer 182');
  if (
    !poloxamer
    || poloxamer.riskLevel !== 'limited'
    || !/poloxamer 182/.test(poloxamer.source ?? '')
    || !/Caution/.test(poloxamer.source ?? '')
    || !/Not High/.test(poloxamer.source ?? '')
    || !/Sept 24, 2026/.test(poloxamer.source ?? '')
    || /Moderate polyethylene glycol row\./.test(poloxamer.source ?? '') === false
  ) {
    throw new Error('batch91 poloxamer 182 must map to the locked Caution token');
  }
  const methyl = record.inactiveIngredients.find((i) => i.name === 'Methylparaben');
  if (!methyl || methyl.riskLevel !== 'high') throw new Error('batch91 methylparaben must stay High');
  const pg = record.inactiveIngredients.find((i) => i.name === 'Propylene glycol');
  if (!pg || pg.riskLevel !== 'cleared' || !/topical/.test(pg.source ?? '')) {
    throw new Error('batch91 topical propylene glycol must stay Cleared');
  }
  if (record.form !== 'gel') throw new Error('batch91 is a gel');
  if (record.minAge !== 12) throw new Error('batch91 age floor is 12');
}
const _blob = _ROWS.map((r) => `${r.productName} ${r.honestNote} ${r.inactiveIngredients.map((i) => i.name).join(' | ')} ${r.barcode ?? ''}`).join('\n');
if (/chonüoitin|chondroitin|phenoxyethanol|73581-019|373581000685|levocetirizine/i.test(_blob)) {
  throw new Error('batch91 must not write the paraben-free carton, levocet 360, or the WelAhead OCR panel');
}
if (BATCH91_SKIPPED.length !== 0) throw new Error('batch91 SKIPPED drift');
if (BATCH91_REFUSED.length !== 0) throw new Error('batch91 REFUSED drift');
