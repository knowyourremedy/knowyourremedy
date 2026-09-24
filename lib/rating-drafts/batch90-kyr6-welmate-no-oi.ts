// DRAFT / not verified / batch 90 KYR6 WELMATE no_OI second look.
// Methodology v1.6 + MAIN §5. Harm-first. No invented grades. No invented OI.
// No invented UPCs. Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. WELMATE only. Hunt list = the batch87 SKIPPED no_OI 6, read
// from batch87-kyr6-amazon-3p-welmate.ts on MAIN. batch70–batch89 were not
// edited. OUT multipacks (diclofenac 150 g pack of 3, sodium chloride
// ointment pack of 3, adapalene 1.6 oz pack of 2) were not reopened.
// No A+Health / HealthA2Z / TIME-Cap / GoodSense. No toothpaste. No house
// Amazon. No Sprouts. No factory. No graded oil pour bottles. WelAhead
// roll-on was not written. Leftover Amazon 3P stays N=4.
//
// Ladder this pass: DailyMed when the carton prints an NDC, then
// wellspringmeds.com (every carousel tile plus the collapsed Inactive
// Ingredients accordion). HTML accordion text was not treated as a panel.
// The simethicone accordion dropped FD&C blue #1 and cut "purified water"
// down to "PURIFIED", so it was not copied. Target / Walmart / iHerb /
// Vitacost / Amazon US were opened for the 360-count levocetirizine,
// which has no DailyMed package and no drug-facts tile. iHerb returned
// 403. Walmart returned a robot wall. Target and Vitacost returned a
// captcha and no product PDP. Amazon returned an automated-access block.
// Google search cited the same DailyMed, Wellspring, and Amazon URLs.
// An AI blurb was not used as OI or as a UPC source.
// recordStatus is 'unverified' on every row. Internal keys only:
// clean | caution | avoid. Pack sizes of the same OI+form share formulaId.
// Search wiring only.
//
// TALLY (unverified drafts in THIS file): 4 rows —
// Clean 2 / Caution 0 / Avoid 2.
// NEW 3 / REUSE-formula 1 / SKIPPED 1
// (no_OI leftover 1 / OUT 0 / other 0) /
// REFUSED 1.
// Search grade: Clean 2 / Caution 0 / Avoid 2.
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

const SIM_SET = 'cc79435e-6d4b-b283-e053-2995a90a8db3';
const LEVO_SET = '8ee69332-742d-4071-95df-84bc42e170e7';
const GUA_SET = 'd9d2539b-bd31-66bd-e053-2a95a90aa583';

const SHOP = 'https://wellspringmeds.com/products';
const SIM_SHOP = `${SHOP}/welmate-gas-relief-simethicone-125-mg-extra-strength-365-count-softgels`;
const LEVO180_SHOP = `${SHOP}/generic-xyzal-allergy-relief-levocetirizine-5-mg-180-count`;
const LEVO360_SHOP = `${SHOP}/welmate-allergy-relief-levocetirizine-dihydrochloride-5-mg-24-hours-360-count-tablets-value-size`;
const GUA100_SHOP = `${SHOP}/welmate-mucus-relief-guaifenesin-1200-mg-maximum-strength-100-count-extended-release-bi-layer-tablets`;
const GUA35_SHOP = `${SHOP}/welmate-mucus-relief-guaifenesin-1200mg-12-hour-35-count-extended-release-tablets`;
const ADA_SHOP = `${SHOP}/welmate-adapalene-gel-0-1-fsa-hsa-acne-treatment-skin-care-daily-topical-acne-skincare-pimple-cream-acne-cream-oil-fragrance-free-dermatologist-tested-fda-approved-1-6oz-45g`;

function dmImage(setid: string, name: string): string {
  return `https://dailymed.nlm.nih.gov/dailymed/image.cfm?name=${encodeURIComponent(name)}&setid=${setid}&type=img`;
}

const METH = {
  carbomer:
    'Methodology §5 Cleared (carbomer / carbomer homopolymer, including type B and type C).',
  cellulose:
    'Methodology §5 Cleared (microcrystalline cellulose / croscarmellose sodium / cellulose gum / sodium carboxymethylcellulose).',
  dye: 'Methodology §5 High (FD&C / D&C synthetic dye, including aluminum lake and brilliant blue lake).',
  edta: 'Methodology §5 Cleared (disodium EDTA / edetate disodium, trace preservative/stabilizer — locked v1.6). Distinct from Caution tetrasodium EDTA.',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC / hydroxypropyl methylcellulose).',
  lactose: 'Methodology §5 Cleared (lactose monohydrate / anhydrous lactose).',
  peg: 'Methodology §5 Moderate (polyethylene glycol, including polyethylene glycol 400).',
  peppermint:
    'Methodology §5 Limited (peppermint oil as flavor — locked flavor/EO line). Not gummy High. Not an oil-bottle grade.',
  povidone: 'Methodology §5 Cleared (povidone, including povidone K-30).',
  ps80: 'Methodology §5 Moderate (polysorbate 80).',
  sio2: 'Methodology §5 Limited (silicon dioxide / colloidal silicon dioxide / silica gel — 0-pt nanoparticle Caution cap). Does not by itself make Avoid.',
  sorbitol:
    'Methodology §5 Limited (sorbitol — sugar-alcohol row). Label string sorbitol 70% solution sits on this row. Not sorbitan.',
  ssg: 'Methodology §5 Cleared (sodium starch glycolate).',
  stearate: 'Methodology §5 Cleared (magnesium stearate / stearic acid).',
  tio2: 'Methodology §5 High (titanium dioxide).',
  water: 'Methodology §5 Cleared (purified water).',
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
};

function expand(d: Compact): RatingRecord {
  const alts: CleanAlternative[] = [];
  if (d.verdict !== 'clean') {
    const main = {
      Allergies: [
        'claritin-allergy-tablets-plain',
        'Independently Clean Claritin plain loratadine already on main. Form labeled, not a hard filter (§6).',
      ],
      Digestive: [
        'megafood-magnesium-300-capsules',
        'Independently Clean MegaFood Magnesium 300 already on main. Form labeled, not a hard filter (§6).',
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
    honestNote: `${d.note} ${LIMITED_STACK} Pack sizes share formulaId \`${d.formulaId}\` when this OI list holds. No dosing or medical advice. Draft, not verified.`,
    retailers: [...AMAZON],
    cleanAlternatives: alts.length ? alts : undefined,
    barcode: d.barcode,
    sourcesGeneral: [
      `${d.cite}${d.barcode ? ` UPC-A ${d.barcode} is the GTIN-12 on this carton.` : ''} — ${UNVERIFIED_NOTE}`,
    ],
  });
}

const GUA_FORMULA = 'welmate-b90-guaifenesin-1200';
const GUA_OI =
  'carbomer homopolymer type B, hypromellose, magnesium stearate, microcrystalline cellulose, sodium starch glycolate';

const COMPACT: Compact[] = [
  {
    id: 'welmate-b90-simethicone-125',
    // KYR5-d — Target primary barcode, simethicone 125 mg 365 softgels (TCIN 92214416).
    barcode: '373581301362',
    productName: 'WELMATE Simethicone 125 mg, 365 Softgels',
    category: 'Digestive',
    formulaId: 'welmate-b90-simethicone-125',
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    actives: [{ name: 'Simethicone', strength: '125mg' }],
    flags: [
      ['FD&C blue #1', 'high', 'dye'],
      ['FD&C yellow #10', 'high', 'dye'],
      ['Titanium dioxide', 'high', 'tio2'],
      ['Peppermint oil', 'limited', 'peppermint'],
      ['Sorbitol 70% solution', 'limited', 'sorbitol'],
      ['Gelatin', 'cleared', 'gelatin'],
      ['Glycerin', 'cleared', 'glycerin'],
      ['Povidone', 'cleared', 'povidone'],
      ['Purified water', 'cleared', 'water'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers are FD&C blue #1, FD&C yellow #10, and titanium dioxide. FD&C yellow #10 is the carton spelling on the locked FD&C / D&C synthetic-dye High row. Peppermint oil is the locked flavor/EO Limited row, not an oil-bottle grade. Sorbitol 70% solution sits on the locked sorbitol Limited row. Softgel fill is not gummy seed-oil High. Ages 12+.',
    cite: `DailyMed carton front (${dmImage(SIM_SET, '01b LBL_(PDP) Gas Relief_Simethicone_125mg_365ct.jpg')}) prints NDC 73581-301-36 on the 365-count simethicone 125 mg softgel. Drug Facts on the same label (${dmImage(SIM_SET, '01 LBL_(DF)_Gas Relief_Simethicone_125mg_365ct.jpg')}; label code L9027-365-103-0) inactive ingredients: FD&C blue #1, FD&C yellow #10, gelatin, glycerin, peppermint oil, povidone, purified water, sorbitol 70% solution, titanium dioxide. Wellspring carousel (${SIM_SHOP}) did not show a readable inactive line, and its accordion text was not used. DailyMed tiles did not decode a GTIN. UPC-A 373581301362 is the Target primary barcode on the 365-count page (TCIN 92214416). Ages 12+.`,
  },
  {
    id: 'welmate-b90-levocetirizine-180',
    // KYR5-d — Target primary barcode, levocetirizine 5 mg 180 tablets (TCIN 92205193).
    // 360-count primary barcode 373581000104 stays off this row.
    barcode: '373581201808',
    productName: 'WELMATE Levocetirizine 5 mg, 180 Tablets',
    category: 'Allergies',
    formulaId: 'welmate-b90-levocetirizine-180',
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Levocetirizine dihydrochloride', strength: '5mg' }],
    flags: [
      ['Titanium dioxide', 'high', 'tio2'],
      ['Polyethylene glycol', 'moderate', 'peg'],
      ['Polysorbate 80', 'moderate', 'ps80'],
      ['Colloidal silicon dioxide', 'limited', 'sio2'],
      ['Hypromellose', 'cleared', 'hpmc'],
      ['Lactose monohydrate', 'cleared', 'lactose'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
    ],
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Driver is titanium dioxide. Polyethylene glycol and polysorbate 80 are Moderate, not the Avoid driver. Colloidal silicon dioxide is the 0-pt Caution cap. Contains lactose. The 360-count is not this package and was not given this list. Ages 6+ (under 6: do not use).',
    cite: `DailyMed 180-count Drug Facts (${dmImage(LEVO_SET, '01b LBL_Allergy Relief_180mg_DF2.jpg')}; front ${dmImage(LEVO_SET, '01b LBL_Allergy Relief_180mg_PDP.jpg')} prints 180 tablets; label code G7067-180-103-0) inactive ingredients: colloidal silicon dioxide, hypromellose, lactose monohydrate, magnesium stearate, microcrystalline cellulose, polyethylene glycol, polysorbate 80, titanium dioxide. SPL setid ${LEVO_SET} package NDC 73581-201-80 is the 180-count. Wellspring carousel (${LEVO180_SHOP}) did not show a readable inactive line. DailyMed tiles did not decode a GTIN. UPC-A 373581201808 is the Target primary barcode on the 180-count page (TCIN 92205193). The 360-count primary barcode 373581000104 is not this row. The 360-count is not a package on this SPL.`,
  },
  {
    id: 'welmate-b90-guaifenesin-1200',
    barcode: '373581000173',
    productName: 'WELMATE Guaifenesin 1200 mg, 100 Extended-Release Tablets',
    category: 'Cold & Flu',
    formulaId: GUA_FORMULA,
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    productType: OTC,
    actives: [{ name: 'Guaifenesin', strength: '1200mg' }],
    flags: [
      ['Carbomer homopolymer type B', 'cleared', 'carbomer'],
      ['Hypromellose', 'cleared', 'hpmc'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
      ['Sodium starch glycolate', 'cleared', 'ssg'],
    ],
    verdict: 'clean',
    note: 'FOUNDER-LOCK DRAFT: Clean. Every inactive token on this carton sits on an existing Cleared row. Not the 600 mg row. The 35-count prints the same inactive line.',
    cite: `DailyMed 100-count carton (${dmImage(GUA_SET, '01b LBL_Welmate_Mucus Relief_100ct_1200mg_L7861-100-103-0.jpg')}) prints NDC 73581-402-01 and inactive ingredients: ${GUA_OI}. Carton barcode reads GTIN 0373581000173 (UPC-A 373581000173). Wellspring carousel (${GUA100_SHOP}) was front and lifestyle only. Ages 12+.`,
  },
  {
    id: 'welmate-b90-guaifenesin-1200-35',
    barcode: '373581000661',
    productName: 'WELMATE Guaifenesin 1200 mg, 35 Extended-Release Tablets',
    category: 'Cold & Flu',
    formulaId: GUA_FORMULA,
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    productType: OTC,
    actives: [{ name: 'Guaifenesin', strength: '1200mg' }],
    flags: [
      ['Carbomer homopolymer type B', 'cleared', 'carbomer'],
      ['Hypromellose', 'cleared', 'hpmc'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Microcrystalline cellulose', 'cleared', 'cellulose'],
      ['Sodium starch glycolate', 'cleared', 'ssg'],
    ],
    verdict: 'clean',
    note: 'FOUNDER-LOCK DRAFT: Clean. 35-count Drug Facts print the same inactive line as the 100-count. Not the 600 mg row.',
    cite: `DailyMed 35-count carton image WEL-48 35ct on setid ${GUA_SET} (${dmImage(GUA_SET, 'WEL-48 35ct.jpg')}) Drug Facts inactive ingredients: ${GUA_OI}. Same line as the 100-count NDC 73581-402-01 carton. Carton barcode reads GTIN 0373581000661 (UPC-A 373581000661). Wellspring carousel (${GUA35_SHOP}) was front and lifestyle only. Ages 12+.`,
  },
];

export const BATCH90_KYR6_WELMATE_NO_OI: RatingRecord[] = COMPACT.map(expand);

const RETAIL_360 =
  'iHerb search returned 403. Walmart search returned a robot wall. Target search returned a captcha and no product PDP. Vitacost search returned a captcha and no product PDP. Amazon US https://www.amazon.com/WELMATE-Levocetirizine-Dihydrochloride-Antihistamine-Medication/dp/B0B272L1FY returned an automated-access block, so the carousel was not opened. Google search cited the same DailyMed, Wellspring, and Amazon pages. An AI blurb was not used as OI or as a UPC source.';

export const BATCH90_SKIPPED_NO_OI: { sku: string; reason: string }[] = [
  {
    sku: 'WELMATE Levocetirizine 5 mg, 360 Tablets',
    reason: `SKIPPED no_OI leftover. Wellspring carousel (${LEVO360_SHOP}) is front and lifestyle tiles only. The collapsed Inactive Ingredients accordion was HTML, not a panel, and was not copied. DailyMed setid ${LEVO_SET} packages are 73581-201-10, 73581-201-18, and 73581-201-80 (180). The 180-count panel was not copied onto 360. ${RETAIL_360} NO Search row.`,
  },
];

export const BATCH90_SKIPPED_OUT: { sku: string; reason: string }[] = [];

export const BATCH90_SKIPPED_OTHER: { sku: string; reason: string }[] = [];

export const BATCH90_SKIPPED: { sku: string; reason: string }[] = [
  ...BATCH90_SKIPPED_NO_OI,
  ...BATCH90_SKIPPED_OUT,
  ...BATCH90_SKIPPED_OTHER,
];

export const BATCH90_REFUSED: { sku: string; reason: string }[] = [
  {
    sku: 'WELMATE Adapalene Gel 0.1%, 1.6 oz',
    reason:
      'REFUSED exact panel string `poloxamer 182`. DailyMed carton image adapalene-01.jpg (setid 3ab5661b-a67a-45a3-b542-228be3cebb27, NDC 73581-214-06) inactive ingredients: carbomer homopolymer type C, edetate disodium, methylparaben, poloxamer 182, propylene glycol, purified water, sodium hydroxide. That carton barcode reads 373581000203, the same GTIN as the Wellspring 1.6 oz offer. `poloxamer 182` is not a locked token. No grade invented. The paraben-free carton NDC 73581-019-06 (GTIN 373581000685, phenoxyethanol) is a different pack and was not written. Wellspring carousel (' +
      ADA_SHOP +
      ') drug-facts tile was cropped before the inactive line. HTML accordion text was not used. NO Search row.',
  },
];

const _ROWS = BATCH90_KYR6_WELMATE_NO_OI;
if (_ROWS.length !== 4) throw new Error('batch90 tally drift: expected 4 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 2) throw new Error('batch90 Clean tally drift');
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 0) throw new Error('batch90 Caution tally drift');
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 2) throw new Error('batch90 Avoid tally drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) throw new Error('batch90 recordStatus must stay unverified');
if (_ROWS.some((r) => !r.id.startsWith('welmate-b90-'))) throw new Error('batch90 ids must use welmate-b90-');
if (_ROWS.some((r) => !r.formulaId)) throw new Error('batch90 every row needs formulaId');
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch90 duplicate ids');
const _formulas = new Set(_ROWS.map((r) => r.formulaId));
if (![..._formulas].every((id) => _ids.has(id!))) throw new Error('batch90 formulaId must point at a row in this file');
if (_ROWS.some((r) => r.brand !== BRAND)) throw new Error('batch90 writes WELMATE only');
if (_ROWS.filter((r) => r.formulaId === r.id).length !== 3) throw new Error('batch90 NEW formula drift');
if (_ROWS.filter((r) => r.formulaId !== r.id).length !== 1) throw new Error('batch90 REUSE-formula tally drift');
const _UPC: Record<string, string> = {
  'welmate-b90-guaifenesin-1200': '373581000173',
  'welmate-b90-guaifenesin-1200-35': '373581000661',
  'welmate-b90-simethicone-125': '373581301362',
  'welmate-b90-levocetirizine-180': '373581201808',
};
function _upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}
if (Object.keys(_UPC).length !== 4) throw new Error('batch90 UPC allowlist drift');
for (const record of _ROWS) {
  const expected = _UPC[record.id];
  if (expected) {
    if (record.barcode !== expected) throw new Error(`batch90 UPC attach drift on ${record.id}`);
    if (!_upcOk(record.barcode ?? '')) throw new Error(`batch90 barcode failed UPC-A check on ${record.id}`);
  } else if (record.barcode) {
    throw new Error(`batch90 unexpected barcode on ${record.id}`);
  }
  if (record.verdict === 'avoid' && !record.inactiveIngredients.some((i) => i.riskLevel === 'high')) {
    throw new Error(`batch90 Avoid without High on ${record.id}`);
  }
  if (record.verdict === 'caution' && !record.inactiveIngredients.some((i) => i.riskLevel === 'limited' || i.riskLevel === 'moderate')) {
    throw new Error(`batch90 Caution without Limited or Moderate on ${record.id}`);
  }
  if (record.verdict === 'clean' && record.inactiveIngredients.some((i) => i.riskLevel !== 'cleared')) {
    throw new Error(`batch90 Clean row has a non-cleared flag on ${record.id}`);
  }
}
if (_ROWS.some((r) => /toothpaste|sprouts|now foods|nutricost|naturewise|goodsense|healtha2z|time-cap|a\+health|welahead/i.test(r.brand + r.productName))) {
  throw new Error('batch90 other 3P / WelAhead / Sprouts / toothpaste must stay out');
}
if (_ROWS.some((r) => /\boil\b/i.test(r.productName) && !/softgel|capsule|tablet|gel|ointment/i.test(r.productName + (r.form ?? '')))) {
  throw new Error('batch90 must not grade oil pour bottles');
}
const _blob = JSON.stringify(_ROWS) + JSON.stringify(BATCH90_SKIPPED) + JSON.stringify(BATCH90_REFUSED);
if (/chonüoitin|chondroitin/i.test(_blob)) throw new Error('batch90 must not write the WelAhead OCR panel');
if (BATCH90_SKIPPED_NO_OI.length !== 1) throw new Error('batch90 no_OI leftover tally drift');
if (BATCH90_SKIPPED_OUT.length !== 0) throw new Error('batch90 OUT must stay 0');
if (BATCH90_SKIPPED_OTHER.length !== 0) throw new Error('batch90 other skip must stay 0');
if (BATCH90_SKIPPED.length !== 1) throw new Error('batch90 skip tally drift');
if (!BATCH90_SKIPPED_NO_OI.every((s) => /no_OI leftover/i.test(s.reason))) throw new Error('batch90 no_OI reasons');
if (BATCH90_REFUSED.length !== 1) throw new Error('batch90 refuse tally drift');
if (BATCH90_REFUSED.some((s) => !/`[^`]+`/.test(s.reason))) throw new Error('batch90 REFUSED must quote an exact panel string');
if (!BATCH90_REFUSED.some((s) => s.reason.includes('`poloxamer 182`'))) throw new Error('batch90 must refuse poloxamer 182');
