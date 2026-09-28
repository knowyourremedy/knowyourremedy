// DRAFT / not verified / batch 115 KYR6-b NatureWise leftover closeout.
// Methodology v1.6 + MAIN §5. Harm-first. No invented grades. No invented OI.
// Annatto stays the existing Caution row. Aliases only:
// annatto powder (color) → annatto; annatto [color] → annatto.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. The four Vitamin B12 counts refused in batch114, plus
// Creatine Monohydrate 100 Servings. No flax reopen. No Women's Stress
// reopen. batch70–batch114 were not edited. No toothpaste. No oil bottles.
// recordStatus is 'unverified' on every row.
//
// TALLY (unverified drafts in THIS file): 5 rows —
// Clean 1 / Caution 4 / Avoid 0.
// NEW 3 / REUSE 2 / SKIPPED 0 / REFUSED 0.
// Search grade: Clean 1 / Caution 4 / Avoid 0.
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

const BRAND = 'NatureWise';
const AMAZON = ['Amazon', 'naturewise.com'] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const METH = {
  annatto:
    'Methodology §5 Caution (annatto / annatto powder (color) / annatto [color] — same Caution row; aliases Sept 28, 2026). Not a new grade. Not Avoid.',
  dical: 'Methodology §5 Cleared (dicalcium phosphate / calcium phosphate as filler).',
  gelatin: 'Methodology §5 Cleared (gelatin / halal gelatin / gelatin capsule).',
  glycerin:
    'Methodology §5 Cleared (glycerin / vegetable glycerin / organic glycerin).',
  lecithin:
    'Methodology §5 Cleared (sunflower lecithin). Not an allergen flag.',
  sunflowerFill:
    'Methodology §5 Cleared (sunflower oil as non-gummy / softgel fill). Not gummy High.',
  water: 'Methodology §5 Cleared (purified water).',
  wax: 'Methodology §5 Cleared (yellow beeswax / beeswax). Distinct from Caution synthetic beeswax.',
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
  barcode?: string;
  formulaId: string;
  audience: typeof ADULT;
  minAge: number;
  form: string;
  productType: typeof SUPPLEMENT;
  actives: RatingRecord['activeIngredients'];
  flags: [string, IngredientFlag['riskLevel'], keyof typeof METH][];
  verdict: RatingRecord['verdict'];
  note: string;
  cite: string;
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
    category: d.category,
    barcode: d.barcode,
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
    honestNote: `${d.note} ${LIMITED_STACK} Pack sizes share formulaId \`${d.formulaId}\` when this OI list holds. Adults unless the name says kids. No dosing or medical advice. Draft, not verified.`,
    retailers: [...AMAZON],
    cleanAlternatives: alts.length ? alts : undefined,
    sourcesGeneral: [`${d.cite} — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`],
  });
}

const B12_NOTE =
  'FOUNDER-LOCK DRAFT: Caution. Driver is annatto. Cleared softgel, wax, lecithin, and non-gummy sunflower-oil fill do not raise Avoid.';

const B12_1000 = 'naturewise-b115-b12-1000-60';
const B12_3000 = 'naturewise-b115-b12-3000-60';
const CREATINE = 'naturewise-b115-creatine-monohydrate-100';

const B12_1000_FLAGS: Compact['flags'] = [
  ['Halal gelatin', 'cleared', 'gelatin'],
  ['Sunflower oil', 'cleared', 'sunflowerFill'],
  ['Glycerin', 'cleared', 'glycerin'],
  ['Purified water', 'cleared', 'water'],
  ['Yellow beeswax', 'cleared', 'wax'],
  ['Sunflower lecithin', 'cleared', 'lecithin'],
  ['annatto powder (color)', 'limited', 'annatto'],
];

const B12_3000_FLAGS: Compact['flags'] = [
  ['Halal gelatin', 'cleared', 'gelatin'],
  ['Glycerin', 'cleared', 'glycerin'],
  ['Purified water', 'cleared', 'water'],
  ['annatto [color]', 'limited', 'annatto'],
  ['Dicalcium phosphate', 'cleared', 'dical'],
  ['Sunflower oil', 'cleared', 'sunflowerFill'],
  ['Yellow beeswax', 'cleared', 'wax'],
  ['Sunflower lecithin', 'cleared', 'lecithin'],
];

const COMPACT: Compact[] = [
  {
    id: B12_1000,
    productName: 'NatureWise Vitamin B12 (1000 mcg / 60 Count)',
    barcode: '855724007770',
    category: 'Vitamins',
    formulaId: B12_1000,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: SUPPLEMENT,
    actives: [{ name: 'Vitamin B12 (as cyanocobalamin)', strength: '1000 mcg' }],
    flags: B12_1000_FLAGS,
    verdict: 'caution',
    note: B12_NOTE,
    cite: 'Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/vitamin-b12; image https://www.naturewise.com/cdn/shop/files/NW-VitaminB12-4-Supplement60.jpg?width=1200) other-ingredients: Halal gelatin, sunflower oil, glycerin, purified water, yellow beeswax, sunflower lecithin, annatto powder (color). Exact pack 1000 mcg / 60 Count (SKU NW11146). UPC-A 855724007770 is the naturewise.com variant barcode for that count. No DailyMed drug SPL.',
  },
  {
    id: 'naturewise-b115-b12-1000-150',
    productName: 'NatureWise Vitamin B12 (1000 mcg / 150 Count)',
    barcode: '858081006233',
    category: 'Vitamins',
    formulaId: B12_1000,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: SUPPLEMENT,
    actives: [{ name: 'Vitamin B12 (as cyanocobalamin)', strength: '1000 mcg' }],
    flags: B12_1000_FLAGS,
    verdict: 'caution',
    note: B12_NOTE,
    cite: 'Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/vitamin-b12; image https://www.naturewise.com/cdn/shop/files/NW-VitaminB12-4-Supplement150.jpg?width=1200) other-ingredients: Halal gelatin, sunflower oil, glycerin, purified water, yellow beeswax, sunflower lecithin, annatto powder (color). Exact pack 1000 mcg / 150 Count (SKU NW11346). Same Other Ingredients as the 60 Count. UPC-A 858081006233 is the naturewise.com variant barcode for that count. No DailyMed drug SPL.',
  },
  {
    id: B12_3000,
    productName: 'NatureWise Vitamin B12 (3000 mcg / 60 Count)',
    barcode: '810157850973',
    category: 'Vitamins',
    formulaId: B12_3000,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: SUPPLEMENT,
    actives: [{ name: 'Vitamin B12 (as cyanocobalamin)', strength: '3000 mcg' }],
    flags: B12_3000_FLAGS,
    verdict: 'caution',
    note: B12_NOTE,
    cite: 'Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/vitamin-b12; image https://www.naturewise.com/cdn/shop/files/VitaminB123_000mcg-4-Supplement.jpg?width=1200) other-ingredients: Softgel (halal gelatin, glycerin, purified water, annatto [color]), dicalcium phosphate, sunflower oil, yellow beeswax, sunflower lecithin. Exact pack 3000 mcg / 60 Count (SKU NW11840). UPC-A 810157850973 is the naturewise.com variant barcode for that count. No DailyMed drug SPL.',
  },
  {
    id: 'naturewise-b115-b12-5000-60',
    productName: 'NatureWise Vitamin B12 (5000 mcg / 60 Count)',
    barcode: '810157851017',
    category: 'Vitamins',
    formulaId: B12_3000,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: SUPPLEMENT,
    actives: [{ name: 'Vitamin B12 (as cyanocobalamin)', strength: '5000 mcg' }],
    flags: B12_3000_FLAGS,
    verdict: 'caution',
    note: B12_NOTE,
    cite: 'Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/vitamin-b12; image https://www.naturewise.com/cdn/shop/files/NW-VitaminB125_000-4-Supplement.jpg?width=1200) other-ingredients: Softgel (halal gelatin, glycerin, purified water, annatto [color]), dicalcium phosphate, sunflower oil, yellow beeswax, sunflower lecithin. Exact pack 5000 mcg / 60 Count (SKU NW11845). Same Other Ingredients as the 3000 mcg / 60 Count. UPC-A 810157851017 is the naturewise.com variant barcode for that count. No DailyMed drug SPL.',
  },
  {
    id: CREATINE,
    productName: 'NatureWise Creatine Monohydrate (100 Servings)',
    barcode: '810157851369',
    category: 'Vitamins',
    formulaId: CREATINE,
    audience: ADULT,
    minAge: 18,
    form: 'powder',
    productType: SUPPLEMENT,
    actives: [{ name: 'Creatine Monohydrate', strength: '5 g' }],
    flags: [],
    verdict: 'clean',
    note: 'FOUNDER-LOCK DRAFT: Clean. Single-ingredient powder. Inactives none. Confirmed-empty 100% powder is not missing-OI (docs/PROJECT_NOTES.md OI accordion lock: “Confirmed-empty cartons (100% powder / DailyMed “inactive ingredients: none”) are not missing-OI”). No fillers invented.',
    cite: '100 Servings powder (SKU NW12010). naturewise.com https://www.naturewise.com/products/creatine-monohydrate images https://www.naturewise.com/cdn/shop/files/Creatine-PDP-Right.jpg and https://www.naturewise.com/cdn/shop/files/NW-CreatinePowder-6-Supplement.jpg print Supplement Facts for creatine monohydrate 5 g / 100 servings and no Other Ingredients line. Amazon https://www.amazon.com/NatureWise-Micronized-Creatine-Monohydrate-Serving/dp/B0F4YFQFPW Ingredients: ACTIVE INGREDIENTS: Creatine monohydrate. Target https://www.target.com/p/naturewise-micronized-creatine-monohydrate-powder-5000mg-5g-per-serving-creatine-for-women-men-pure-supports-lean-muscle-mass/-/A-1007353716 opened with no Other Ingredients line. UPC-A 810157851369 is the naturewise.com variant barcode for 100 Servings and the Amazon UPC field on that listing. No DailyMed drug SPL.',
  },
];

export const BATCH115_KYR6B_NATUREWISE_CLOSEOUT: RatingRecord[] = COMPACT.map(expand);

export const BATCH115_SKIPPED: { sku: string; reason: string }[] = [];
export const BATCH115_REFUSED: { sku: string; reason: string }[] = [];

const _ROWS = BATCH115_KYR6B_NATUREWISE_CLOSEOUT;
if (_ROWS.length !== 5) throw new Error('batch115 tally drift: expected 5 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 1) {
  throw new Error('batch115 Clean tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 4) {
  throw new Error('batch115 Caution tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 0) {
  throw new Error('batch115 Avoid tally drift');
}
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch115 recordStatus must stay unverified');
}
if (_ROWS.filter((r) => r.formulaId === r.id).length !== 3) {
  throw new Error('batch115 NEW tally drift');
}
if (_ROWS.filter((r) => r.formulaId !== r.id).length !== 2) {
  throw new Error('batch115 REUSE tally drift');
}
if (_ROWS.some((r) => r.brand !== BRAND)) throw new Error('batch115 writes NatureWise only');
if (_ROWS.some((r) => !r.barcode || !/^\d{12}$/.test(r.barcode))) {
  throw new Error('batch115 barcode must be a 12-digit UPC-A');
}
if (
  _ROWS.some((r) => {
    if (!r.barcode) return false;
    let sum = 0;
    for (let i = 0; i < 11; i++) sum += Number(r.barcode[i]) * (i % 2 === 0 ? 3 : 1);
    return (10 - (sum % 10)) % 10 !== Number(r.barcode[11]);
  })
) {
  throw new Error('batch115 barcode failed UPC-A check digit');
}
const _creatine = _ROWS.find((r) => r.id === CREATINE);
if (!_creatine || _creatine.verdict !== 'clean' || _creatine.inactiveIngredients.length !== 0) {
  throw new Error('batch115 creatine must stay Clean with inactives none');
}
if (_creatine.form !== 'powder' || _creatine.barcode !== '810157851369') {
  throw new Error('batch115 creatine must stay the 100-serving powder GTIN');
}
const _b12 = _ROWS.filter((r) => r.id !== CREATINE);
if (_b12.some((r) => !r.inactiveIngredients.some((i) => i.riskLevel === 'limited' && /annatto/i.test(i.name)))) {
  throw new Error('batch115 every B12 pack needs the annatto Caution flag');
}
if (_b12.some((r) => r.inactiveIngredients.some((i) => i.riskLevel === 'high'))) {
  throw new Error('batch115 B12 must not invent Avoid');
}
if (
  _ROWS.some((r) => /flaxseed|women's multivitamin|stress support|toothpaste/i.test(r.productName))
) {
  throw new Error('batch115 must not reopen flax, women, or toothpaste');
}
for (const record of _ROWS) {
  if (record.verdict === 'avoid' && !record.inactiveIngredients.some((i) => i.riskLevel === 'high')) {
    throw new Error(`batch115 Avoid without High on ${record.id}`);
  }
  if (
    record.verdict === 'caution' &&
    !record.inactiveIngredients.some((i) => i.riskLevel === 'limited' || i.riskLevel === 'moderate')
  ) {
    throw new Error(`batch115 Caution without Limited or Moderate on ${record.id}`);
  }
  if (record.verdict === 'clean' && record.inactiveIngredients.some((i) => i.riskLevel !== 'cleared')) {
    throw new Error(`batch115 Clean row has a non-cleared flag on ${record.id}`);
  }
  if (record.form === 'gummy') throw new Error(`batch115 has no gummy rows: ${record.id}`);
}
if (BATCH115_SKIPPED.length !== 0) throw new Error('batch115 skip tally drift');
if (BATCH115_REFUSED.length !== 0) throw new Error('batch115 refuse tally drift');
