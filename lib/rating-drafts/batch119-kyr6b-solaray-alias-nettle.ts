// DRAFT / not verified / batch 119 KYR6-b Solaray alias pass + organic Nettle restore.
// Methodology v1.6 + MAIN §5. Harm-first. No invented grades.
// Three founder aliases stamped Sept 28, 2026 (aliases only, grades unchanged):
// Titanium Dioxide / titanium oxide when it is TiO2 → titanium dioxide (High/Avoid).
// Mannitol → sugar-alcohol row (Limited; verdict Caution).
// Softgel (Gelatin, Glycerin) splits into gelatin + glycerin (both Cleared).
// Parsley Leaf is not stamped. No OCR junk stamped.
// batch70–batch118 were not edited. Organic Nettle is a new row here.
// No 123 no_OI pass. No new brands. No oil pour bottles.
// recordStatus is 'unverified' on every row.
// UPC is set only for the restored organic Nettle pack Brandon named.
//
// TALLY (unverified drafts in THIS file): 5 rows —
// Clean 5 / Caution 0 / Avoid 0.
// NEW 5 / REUSE 0 / SKIPPED 0 / REFUSED 0 in this file.
// TALLY is asserted at the bottom.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const UNVERIFIED_NOTE = 'draft, not verified';

const BRAND = 'Solaray';
const RETAILERS = ['Amazon', 'solaray.com'] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const UPC_BLANK =
  'Shopify variant barcode field was empty and these 12 digits did not print under the bars, so UPC is blank. No NDC on the solaray.com listing.';

const METH = {
  capsuleCellulose:
    'Methodology §5 Cleared (capsule cellulose / labeled veg cap). Vegetable Cellulose Capsule maps here (Sept 27, 2026). Same Cleared. Not a new grade.',
  gelatin:
    'Methodology §5 Cleared (gelatin). Softgel (Gelatin, Glycerin) splits: the gelatin half maps here (Sept 28, 2026). Same Cleared. Not a new grade.',
  glycerin:
    'Methodology §5 Cleared (glycerin / vegetable glycerin). Softgel (Gelatin, Glycerin) splits: the glycerin half maps here (Sept 28, 2026). Same Cleared. Not a new grade.',
  water: 'Methodology §5 Cleared (water / purified water).',
  safflower:
    'Methodology §5 Cleared (safflower oil as softgel fill). NOT gummy High. Gummy safflower stays High.',
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
  formulaId: string;
  form: string;
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
    alts.push(
      alt(
        'amazon-elements-vitamin-d3-5000-softgels',
        'Independently Clean Amazon Elements Vitamin D3 5000 IU already on main. Form labeled, not a hard filter (§6).',
      ),
    );
  }
  return row({
    id: d.id,
    productName: d.productName,
    brand: BRAND,
    category: 'Vitamins',
    formulaId: d.formulaId,
    audience: ADULT,
    minAge: 18,
    form: d.form,
    productType: SUPPLEMENT,
    activeIngredients: d.actives,
    inactiveIngredients: d.flags.map(([n, risk, meth]) =>
      flag(n, risk, labelCite(d.cite, METH[meth])),
    ),
    verdict: d.verdict,
    honestNote: `${d.note} ${LIMITED_STACK} Pack sizes share formulaId \`${d.formulaId}\` when this OI list holds. Adults unless the name says kids. No dosing or medical advice. Draft, not verified.`,
    retailers: [...RETAILERS],
    cleanAlternatives: alts.length ? alts : undefined,
    barcode: d.barcode,
    sourcesGeneral: [`${d.cite} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  });
}

const CLEARED_NOTE =
  'FOUNDER-LOCK DRAFT: Clean. Every Other Ingredients token is an existing Cleared §5 lock or a Sept 28, 2026 split onto gelatin and glycerin. No High. No Limited.';

const COMPACT: Compact[] = [
  {
    id: 'solaray-b119-076280194104',
    productName: 'Solaray Organic Nettle Leaf 900mg (100 ct)',
    formulaId: 'solaray-b119-076280194104',
    form: 'capsule',
    barcode: '076280194104',
    actives: [
      { name: 'Organic Nettle (Urtica dioica) (leaf)', strength: '900 mg' },
    ],
    flags: [
      ['Vegetable Cellulose Capsule', 'cleared', 'capsuleCellulose'],
    ],
    verdict: 'clean',
    note: CLEARED_NOTE,
    cite: 'solaray.com https://www.solaray.com/products/organically-grown-nettle-leaf supplement-facts image lb_facts_076280194104 other-ingredients: Vegetable Cellulose Capsule. Serving 2 VegCaps, 50 servings (100 ct). Re-read of that carton SF image. Distinct from conventional Nettle Leaf 900mg 100ct SKU 076280014105. Exact pack Solaray Organic Nettle Leaf 900mg (100 ct). UPC 076280194104.',
  },
  {
    id: 'solaray-b119-076280008340',
    productName: 'Solaray Borage Seed Oil GLA 1000mg (50ct)',
    formulaId: 'solaray-b119-076280008340',
    form: 'softgel',
    barcode: '076280008340',
    actives: [{ name: 'Borage Seed Oil (Borago officinalis)', strength: '1,000 mg' }],
    flags: [
      ['Gelatin', 'cleared', 'gelatin'],
      ['Glycerin', 'cleared', 'glycerin'],
    ],
    verdict: 'clean',
    note: CLEARED_NOTE,
    cite: `solaray.com https://www.solaray.com/products/borage-seed-oil-gla supplement-facts image other-ingredients: Softgel (Gelatin, Glycerin). Split into gelatin and glycerin (Sept 28, 2026). Softgel, not an oil pour bottle. Exact pack Solaray Borage Seed Oil GLA 1000mg (50ct). SKU 076280008340. ${UPC_BLANK}`,
  },
  {
    id: 'solaray-b119-076280008364',
    productName: 'Solaray Evening Primrose 500mg (90ct)',
    formulaId: 'solaray-b119-076280008364',
    form: 'softgel',
    barcode: '076280008364',
    actives: [
      { name: 'Evening Primrose Oil (Oenothera biennis)', strength: '500 mg' },
    ],
    flags: [
      ['Gelatin', 'cleared', 'gelatin'],
      ['Glycerin', 'cleared', 'glycerin'],
      ['Water', 'cleared', 'water'],
    ],
    verdict: 'clean',
    note: CLEARED_NOTE,
    cite: `solaray.com https://www.solaray.com/products/high-potency-evening-primrose supplement-facts image other-ingredients: Softgel (Gelatin, Glycerin), water. Softgel splits into gelatin and glycerin. Water is the existing purified-water lock. Softgel, not an oil pour bottle. Exact pack Solaray Evening Primrose 500mg (90ct). SKU 076280008364. ${UPC_BLANK}`,
  },
  {
    id: 'solaray-b119-076280107272',
    productName: 'Solaray Pumpkin Seed Oil 1000mg (90ct)',
    formulaId: 'solaray-b119-076280107272',
    form: 'softgel',
    barcode: '076280107272',
    actives: [{ name: 'Pumpkin Seed Oil (Cucurbita spp.)', strength: '1,000 mg' }],
    flags: [
      ['Gelatin', 'cleared', 'gelatin'],
      ['Glycerin', 'cleared', 'glycerin'],
      ['Purified Water', 'cleared', 'water'],
    ],
    verdict: 'clean',
    note: CLEARED_NOTE,
    cite: `solaray.com https://www.solaray.com/products/pumpkin-seed-oil supplement-facts image other-ingredients: Softgel (Gelatin, Glycerin), Purified Water. Softgel splits into gelatin and glycerin. Purified Water is already Cleared. Softgel, not an oil pour bottle. Exact pack Solaray Pumpkin Seed Oil 1000mg (90ct). SKU 076280107272. ${UPC_BLANK}`,
  },
  {
    id: 'solaray-b119-076280610093',
    productName: 'Solaray Super Omega 3-7-9 (120 ct)',
    formulaId: 'solaray-b119-076280610093',
    form: 'softgel',
    barcode: '076280610093',
    actives: [
      { name: 'Salmon Oil (fish)', strength: '1,000 mg' },
      { name: 'Sea Buckthorn Fruit Oil', strength: '200 mg' },
      { name: 'Extra Virgin Olive Oil', strength: '100 mg' },
    ],
    flags: [
      ['Gelatin', 'cleared', 'gelatin'],
      ['Glycerin', 'cleared', 'glycerin'],
      ['Purified Water', 'cleared', 'water'],
      ['Safflower Oil', 'cleared', 'safflower'],
    ],
    verdict: 'clean',
    note: CLEARED_NOTE,
    cite: `solaray.com https://www.solaray.com/products/super-omega-3-7-9 supplement-facts image other-ingredients: Softgel (Gelatin, Glycerin), Purified Water, Safflower Oil. Serving 2 softgels, 60 servings (120 ct). Safflower Oil is the existing softgel-fill Cleared lock, not gummy High. Softgel, not an oil pour bottle. Exact pack Solaray Super Omega 3-7-9 (120 ct). SKU 076280610093. ${UPC_BLANK}`,
  },
];

export const BATCH119_KYR6B_SOLARAY_ALIAS_NETTLE: RatingRecord[] = COMPACT.map(expand);

const _ROWS = BATCH119_KYR6B_SOLARAY_ALIAS_NETTLE;
if (_ROWS.length !== 5) throw new Error('batch119 tally drift: expected 5 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 5) {
  throw new Error('batch119 Clean tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 0) {
  throw new Error('batch119 Caution tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 0) {
  throw new Error('batch119 Avoid tally drift');
}
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch119 recordStatus must stay unverified');
}
if (_ROWS.filter((r) => r.formulaId === r.id).length !== 5) {
  throw new Error('batch119 NEW tally drift');
}
if (_ROWS.some((r) => r.formulaId !== r.id)) {
  throw new Error('batch119 REUSE tally drift');
}
if (_ROWS.some((r) => r.brand !== BRAND)) throw new Error('batch119 writes Solaray only');
const nettle = _ROWS.find((r) => r.id === 'solaray-b119-076280194104');
if (!nettle || nettle.verdict !== 'clean' || nettle.barcode !== '076280194104') {
  throw new Error('batch119 organic nettle restore missing');
}
if (!nettle.productName.includes('Organic')) {
  throw new Error('batch119 organic nettle name must stay distinct');
}
if (_ROWS.filter((r) => r.barcode).length !== 5) {
  throw new Error('batch119 UPC count drift');
}
{
  const _seenUpc = new Set<string>();
  for (const _r of _ROWS) {
    const _b = _r.barcode ?? '';
    if (!_b) continue;
    if (!/^\d{12}$/.test(_b)) throw new Error('batch119 barcode not GTIN-12 on ' + _r.id);
    const _d = _b.split('').map(Number);
    const _sum = _d.slice(0, 11).reduce((acc, n, i) => acc + n * (i % 2 === 0 ? 3 : 1), 0);
    if ((10 - (_sum % 10)) % 10 !== _d[11]) throw new Error('batch119 barcode check digit ' + _r.id);
    if (_seenUpc.has(_b)) throw new Error('batch119 duplicate barcode ' + _b);
    _seenUpc.add(_b);
  }
}
if (_ROWS.some((r) => r.form === 'gummy')) throw new Error('batch119 has no gummy rows');
if (_ROWS.some((r) => r.form === 'liquid')) {
  throw new Error('batch119 must not grade oil pour bottles');
}
