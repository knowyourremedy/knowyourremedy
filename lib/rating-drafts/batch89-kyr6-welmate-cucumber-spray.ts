// DRAFT / not verified / batch 89 KYR6 WELMATE cucumber-spray unlock.
// Methodology v1.6 + MAIN §5 after the Sept 23, 2026 cucumber alias
// (a37faa5). Harm-first. No invented grades. No invented OI. No invented UPCs.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. WELMATE Numbing Relief Lidocaine 5% Spray only. The SKU
// batch88 refused solely on `cucumis sativus (cucumber) fruit extract`.
// That string now maps to the existing cucumber extract Caution row.
// Same token. Not a new grade. Aloe barbadensis leaf extract and
// disodium cocoamphodipropionate were already locked. The rest of the
// DailyMed inactive paragraph already sat on a locked §5 row.
// batch70–88 were not edited. OCR `chonüoitin sulfate` / WelAhead
// roll-on stays refused and is not written here.
// Pin = DailyMed WELMATE NDC 73581-920 (setid
// 562162c0-7a85-f83c-e063-6294a90a8fc5). Not on the Wellspring catalog.
// The SPL text does not print a GTIN-12, and the PDP screenshot does
// not show readable barcode digits. No barcode attached.
// recordStatus is 'unverified'. Internal keys only: clean | caution | avoid.
// Search wiring only. Not wired into Clean Picks UI.
//
// No next Amazon 3P brand. No toothpaste. No house Amazon. No Sprouts.
// No graded oil pour bottles. WELMATE no_OI 6 was not hunted.
// Leftover Amazon 3P stays N=4.
//
// TALLY (unverified drafts in THIS file): 1 row —
// Clean 0 / Caution 1 / Avoid 0.
// NEW 1 / REUSE-formula 0 / SKIPPED 0 / REFUSED 0.
// Search grade: Caution.
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
  'Water, alcohol denat., propylene glycol, glycerin, aloe barbadensis leaf extract, tocopheryl acetate, chamomilla recutita (matricaria) flower extract, cucumis sativus (cucumber) fruit extract, disodium cocoamphodipropionate, carbomer, disodium EDTA, triethanolamine';

const SETID = '562162c0-7a85-f83c-e063-6294a90a8fc5';
const NDC = '73581-920';

const METH = {
  alcohol:
    'Methodology §5 Limited-risk (alcohol / ethyl alcohol / alcohol denat. / SD alcohol / methylated spirit as a VEHICLE). Alcohol is the vehicle, not the gummy seed-oil High rule. Distinct from drinking alcohol as an active. Not Avoid.',
  aloe:
    'Methodology §5 Caution (organic aloe vera / powder as Other Ingredient — locked Sept 23, 2026). Aloe barbadensis leaf extract maps here (Sept 23, 2026). Not a new grade. Not a named-color pass. Not Avoid.',
  carbomer:
    'Methodology §5 Cleared (carbomer / carbomer homopolymer, including type C and carbomer 940). The inactive paragraph prints carbomer. The UNII table names carbomer 940. Same Cleared row. Not a new token.',
  chamomile:
    'Methodology §5 Caution (topical botanical extracts/oils used as inactives — chamomile; locked Sept 15, 2026). The printed string chamomilla recutita (matricaria) flower extract sits on this topical chamomile row. DailyMed lists the moiety as CHAMOMILE. Distinct from oral Cleared chamomile flower as a food botanical. Not Avoid.',
  cocoampho:
    'Methodology §5 Caution (disodium cocoamphodipropionate — exact token; locked Sept 23, 2026). Not High. Distinct from Caution SLS. Do not flip that row.',
  cucumber:
    'Methodology §5 Caution (cucumber extract — exact token; locked Sept 23, 2026). Cucumis sativus (cucumber) fruit extract maps here (Sept 23, 2026). Same token. Not a new grade. Not a named-color pass. Not Avoid.',
  edta:
    'Methodology §5 Cleared (disodium EDTA, trace preservative/stabilizer — locked v1.6). Distinct from Caution tetrasodium EDTA.',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  pgTopical: `Methodology §5 Cleared (propylene glycol, topical). ${PG_TOPICAL_TAP}`,
  tocopherylAcetate:
    'Methodology §5 Caution (tocopheryl acetate — exact INCI; locked Sept 15, 2026). Not Cleared DL-alpha tocopheryl acetate. Not Cleared mixed tocopherols / D-Alpha-Tocopherol. Do not flip this Caution row. Do not alias the bare token onto either Cleared row.',
  trolamine:
    'Methodology §5 Caution (TEA / trolamine / triethanolamine as an inactive — locked Sept 15, 2026). Not Avoid.',
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
  `DailyMed WELMATE NUMBING RELIEF lidocaine 5% spray (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${SETID}; NDC ${NDC}; package 73581-920-05, 142 g in 1 can) inactive ingredients: ${PRINTED_OI}. DailyMed is the pin. Not on the Wellspring catalog. The printed string cucumis sativus (cucumber) fruit extract maps to existing cucumber extract. Same token. Not a new grade. Aloe barbadensis leaf extract maps to existing aloe as an Other Ingredient. Disodium cocoamphodipropionate is the locked exact token. Tocopheryl acetate stays the Caution INCI, not Cleared DL-alpha tocopheryl acetate. Chamomilla recutita (matricaria) flower extract sits on topical chamomile, not the oral Cleared chamomile-flower food row. ${PG_TOPICAL_TAP} No GTIN-12 digits in the SPL text. No barcode attached.`;

export const BATCH89_KYR6_WELMATE_CUCUMBER_SPRAY: RatingRecord[] = [
  row({
    id: 'welmate-b89-lidocaine-5-spray',
    productName: 'WELMATE Numbing Relief Lidocaine 5% Spray (142 g)',
    brand: BRAND,
    category: 'Pain & Fever',
    formulaId: 'welmate-b89-lidocaine-5-spray',
    audience: ADULT,
    minAge: 12,
    form: 'spray',
    productType: OTC,
    activeIngredients: [{ name: 'Lidocaine', strength: '5%' }],
    inactiveIngredients: (
      [
        ['Water', 'cleared', 'water'],
        ['Alcohol denat.', 'limited', 'alcohol'],
        ['Propylene glycol', 'cleared', 'pgTopical'],
        ['Glycerin', 'cleared', 'glycerin'],
        ['Aloe barbadensis leaf extract', 'limited', 'aloe'],
        ['Tocopheryl acetate', 'limited', 'tocopherylAcetate'],
        ['Chamomilla recutita (matricaria) flower extract', 'limited', 'chamomile'],
        ['Cucumis sativus (cucumber) fruit extract', 'limited', 'cucumber'],
        ['Disodium cocoamphodipropionate', 'limited', 'cocoampho'],
        ['Carbomer', 'cleared', 'carbomer'],
        ['Disodium EDTA', 'cleared', 'edta'],
        ['Triethanolamine', 'limited', 'trolamine'],
      ] as [string, IngredientFlag['riskLevel'], keyof typeof METH][]
    ).map(([name, risk, meth]) => flag(name, risk, labelCite(cite, METH[meth]))),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Caution. Drivers are alcohol denat., aloe barbadensis leaf extract, tocopheryl acetate, chamomilla recutita (matricaria) flower extract, cucumis sativus (cucumber) fruit extract, disodium cocoamphodipropionate, and triethanolamine. The Latin cucumber fruit-extract string maps to existing cucumber extract Caution. Same token. Not a new grade. Aloe barbadensis leaf extract maps to existing aloe as an Other Ingredient. Disodium cocoamphodipropionate is the locked exact token. Tocopheryl acetate stays Caution and is not Cleared DL-alpha tocopheryl acetate. The chamomile Latin string sits on topical chamomile Caution, not the oral Cleared chamomile-flower food row. Topical propylene glycol stays Cleared. Carbomer and the UNII carbomer 940 are the same Cleared row. Disodium EDTA stays the Cleared trace row, not tetrasodium EDTA. No High. Lidocaine as the active stays parked. DailyMed says adults and children 2 years and older, and children under 12 consult a doctor. This draft uses 12+ and does not add a kids row. ${LIMITED_STACK} Pack sizes share formulaId \`welmate-b89-lidocaine-5-spray\` when this OI list holds. No dosing or medical advice. Draft, not verified.`,
    retailers: [...AMAZON],
    cleanAlternatives: [
      alt(
        'thorne-glucosamine-chondroitin',
        'Independently Clean Thorne Glucosamine & Chondroitin already on main. Form labeled, not a hard filter (§6).',
      ),
    ],
    sourcesGeneral: [`${cite} — ${UNVERIFIED_NOTE}`],
  }),
];

export const BATCH89_SKIPPED: { sku: string; reason: string }[] = [];

export const BATCH89_REFUSED: { sku: string; reason: string }[] = [];

const _ROWS = BATCH89_KYR6_WELMATE_CUCUMBER_SPRAY;
if (_ROWS.length !== 1) throw new Error('batch89 tally drift: expected 1 row');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 0) throw new Error('batch89 Clean tally drift');
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 1) throw new Error('batch89 Caution tally drift');
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 0) throw new Error('batch89 Avoid tally drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) throw new Error('batch89 recordStatus must stay unverified');
if (_ROWS.some((r) => !r.id.startsWith('welmate-b89-'))) throw new Error('batch89 ids must use welmate-b89-');
if (_ROWS.some((r) => r.formulaId !== r.id)) throw new Error('batch89 NEW formula drift');
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch89 duplicate ids');
if (_ROWS.some((r) => r.brand !== BRAND)) throw new Error('batch89 writes WELMATE only');
if (_ROWS.some((r) => r.barcode)) throw new Error('batch89 must not attach a barcode');
if (_ROWS.some((r) => /toothpaste|sprouts|now foods|nutricost|naturewise|goodsense|healtha2z|time-cap|a\+health|welahead/i.test(`${r.brand} ${r.productName}`))) {
  throw new Error('batch89 other 3P / WelAhead / toothpaste must stay out');
}
if (_ROWS.some((r) => /\boil\b/i.test(r.productName) && !/spray|cream|gel/i.test(r.productName + (r.form ?? '')))) {
  throw new Error('batch89 must not grade oil pour bottles');
}
for (const record of _ROWS) {
  if (record.verdict === 'caution' && !record.inactiveIngredients.some((i) => i.riskLevel === 'limited' || i.riskLevel === 'moderate')) {
    throw new Error(`batch89 Caution without Limited or Moderate on ${record.id}`);
  }
  if (record.inactiveIngredients.some((i) => i.riskLevel === 'high')) {
    throw new Error('batch89 spray has no High token');
  }
  if (!record.sourcesGeneral?.some((s) => s.includes(PRINTED_OI))) {
    throw new Error('batch89 cite must quote the printed inactive list');
  }
  const cucumber = record.inactiveIngredients.find((i) => i.name === 'Cucumis sativus (cucumber) fruit extract');
  if (!cucumber || cucumber.riskLevel !== 'limited' || !/cucumber extract/.test(cucumber.source ?? '') || !/Same token/.test(cucumber.source ?? '')) {
    throw new Error('batch89 cucumber string must map to existing cucumber extract Caution');
  }
  const aloe = record.inactiveIngredients.find((i) => i.name === 'Aloe barbadensis leaf extract');
  if (!aloe || aloe.riskLevel !== 'limited') throw new Error('batch89 aloe must stay the mapped Caution row');
  const coco = record.inactiveIngredients.find((i) => i.name === 'Disodium cocoamphodipropionate');
  if (!coco || coco.riskLevel !== 'limited') throw new Error('batch89 cocoampho must stay Caution');
  const tocopheryl = record.inactiveIngredients.find((i) => i.name === 'Tocopheryl acetate');
  if (!tocopheryl || tocopheryl.riskLevel !== 'limited' || !/Not Cleared DL-alpha/.test(tocopheryl.source ?? '')) {
    throw new Error('batch89 tocopheryl acetate must stay Caution, not DL-alpha');
  }
  const chamomile = record.inactiveIngredients.find((i) => /chamomilla recutita/i.test(i.name));
  if (!chamomile || chamomile.riskLevel !== 'limited') throw new Error('batch89 chamomile must stay topical Caution');
  if (record.form !== 'spray') throw new Error('batch89 is a spray');
}
const _blob = _ROWS.map((r) => `${r.productName} ${r.honestNote} ${r.inactiveIngredients.map((i) => i.name).join(' | ')}`).join('\n');
if (/chonüoitin|chondroitin/i.test(_blob)) throw new Error('batch89 must not write the WelAhead OCR panel');
if (BATCH89_SKIPPED.length !== 0) throw new Error('batch89 SKIPPED drift');
if (BATCH89_REFUSED.length !== 0) throw new Error('batch89 REFUSED drift');
