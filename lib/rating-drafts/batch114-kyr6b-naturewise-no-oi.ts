// DRAFT / not verified / batch 114 KYR6-b NatureWise leftover no_OI only.
// Methodology v1.6 + MAIN §5. Harm-first. No invented grades. No invented OI.
// No new aliases. An exact string that is not already a MAIN lock refuses the row.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. Four leftover names from batch85 SKIPPED no_OI. No new products.
// batch70–batch113 were not edited. No toothpaste. No oil pour-bottle grades.
// Flax is the 3000 mg / 90 softgel count only. The 30 Count right panel was
// not copied. recordStatus is 'unverified' on every row.
//
// TALLY (unverified drafts in THIS file): 2 rows —
// Clean 1 / Caution 1 / Avoid 0.
// NEW 2 / REUSE 0 / SKIPPED no_OI leftover 1 / REFUSED 1.
// Search grade: Clean 1 / Caution 1 / Avoid 0.
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
  gelatin: 'Methodology §5 Cleared (gelatin / halal gelatin / gelatin capsule).',
  glycerin:
    'Methodology §5 Cleared (glycerin / vegetable glycerin / organic glycerin).',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC). Label string Vegetable capsule (hypromellose) is the exact token already written on MAIN.',
  maltodextrin:
    'Methodology §5 Limited-risk (maltodextrin, organic or non-organic). Not Avoid.',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose).',
  sio2: 'Methodology §5 Limited (silicon dioxide / silica — 0-pt nanoparticle Caution cap). Does not by itself make Avoid.',
  stearate: 'Methodology §5 Cleared (magnesium stearate / stearic acid).',
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

const CLEAN_NOTE =
  'FOUNDER-LOCK DRAFT: Clean. Pinned Other Ingredients are Cleared-class only. Softgel fill is not a pour-bottle grade and not the gummy seed-oil High rule.';

const CAUTION_NOTE =
  'FOUNDER-LOCK DRAFT: Caution. Driver is silicon dioxide and maltodextrin. Cleared capsule and lubricant tokens do not raise Avoid.';

const WOMEN = 'naturewise-b114-womens-multivitamin-stress-60';
const FLAX = 'naturewise-b114-flaxseed-oil-3000-90';

const COMPACT: Compact[] = [
  {
    id: WOMEN,
    productName: "NatureWise Women's Multivitamin with Stress Support (60 Count)",
    barcode: '858081006707',
    category: 'Vitamins',
    formulaId: WOMEN,
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: SUPPLEMENT,
    actives: [
      {
        name: "Women's Multivitamin with Stress Support",
        strength: '60 Count',
      },
    ],
    flags: [
      ['Vegetable capsule (hypromellose)', 'cleared', 'hpmc'],
      ['Magnesium stearate', 'cleared', 'stearate'],
      ['Silicon dioxide', 'limited', 'sio2'],
      ['Maltodextrin', 'limited', 'maltodextrin'],
      ['Microcrystalline cellulose', 'cleared', 'mcc'],
    ],
    verdict: 'caution',
    note: CAUTION_NOTE,
    cite: 'Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/womens-multivitamin; image https://www.naturewise.com/cdn/shop/files/NW-Women_sStress-10-Supplement.jpg?width=1200) other-ingredients: Vegetable capsule (hypromellose), magnesium stearate, silicon dioxide, maltodextrin, microcrystalline cellulose. Brand-site supplement-facts image is the pin for the 60 Count (only variant, SKU NW10585). UPC-A 858081006707 is the naturewise.com variant barcode for that 60 Count, and the same 12 digits are the Vitacost UPC field on https://www.vitacost.com/products/naturewise-women-s-multivitamin-minerals-60-vegetarian-capsules-81931. No DailyMed drug SPL.',
  },
  {
    id: FLAX,
    productName: 'NatureWise Flaxseed Oil 3000 mg (90 Softgels)',
    barcode: '810157851277',
    category: 'Vitamins',
    formulaId: FLAX,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: SUPPLEMENT,
    actives: [{ name: 'Organic Flaxseed Oil', strength: '3000 mg' }],
    flags: [
      ['Halal gelatin', 'cleared', 'gelatin'],
      ['Organic glycerin', 'cleared', 'glycerin'],
      ['Purified water', 'cleared', 'water'],
    ],
    verdict: 'clean',
    note:
      CLEAN_NOTE +
      ' Organic flaxseed oil is the Supplement Facts serving, not an Other Ingredient. The 30 Count right panel and the 3000 mg / 120 Count graphic were not copied onto this 90 softgel count.',
    cite: 'Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/flaxseed-oil; image https://www.naturewise.com/cdn/shop/files/NW-FlaxseedOil3_000mg-5-Supplement90.jpg?width=1200) other-ingredients: Softgel (halal gelatin, organic glycerin, purified water). Brand-site supplement-facts image is the pin for 3000 mg / 90 Count only (SKU NW11970). UPC-A 810157851277 is the naturewise.com variant barcode for that exact count. The 3000 mg / 120 Count barcode 810157851284 was not copied. No DailyMed drug SPL.',
  },
];

export const BATCH114_KYR6B_NATUREWISE_NO_OI: RatingRecord[] = COMPACT.map(expand);

export const BATCH114_SKIPPED_NO_OI: { sku: string; reason: string }[] = [
  {
    sku: 'Creatine Monohydrate',
    reason:
      'SKIPPED no_OI leftover. 100 Servings (SKU NW12010) only. https://www.naturewise.com/products/creatine-monohydrate HTML has no Other Ingredients line. Opened images https://www.naturewise.com/cdn/shop/files/Creatine-PDP-Right.jpg and https://www.naturewise.com/cdn/shop/files/NW-CreatinePowder-6-Supplement.jpg show Supplement Facts for creatine monohydrate 5 g / 100 servings and do not print an Other Ingredients line. https://www.naturewise.com/cdn/shop/files/NW-CreatinePowder-4-Information.jpg and https://www.naturewise.com/cdn/shop/files/NW-CreatinePowder-10-Serving.jpg are benefit and dosing tiles, not a panel. https://www.target.com/p/naturewise-micronized-creatine-monohydrate-powder-5000mg-5g-per-serving-creatine-for-women-men-pure-supports-lean-muscle-mass/-/A-1007353716 opened with no Other Ingredients line. https://www.amazon.com/NatureWise-Micronized-Creatine-Monohydrate-Serving/dp/B0F4YFQFPW opened; Ingredients reads ACTIVE INGREDIENTS: Creatine monohydrate, with no Other Ingredients line (marketing “no additives” is not a panel). iHerb search https://www.iherb.com/search?kw=NatureWise%20Creatine%20Monohydrate returned 403 / just a moment (captcha). Vitacost search returned a captcha wall. Walmart search title was robot or human (captcha). No DailyMed (no NDC). OI not invented.',
  },
];

export const BATCH114_REFUSED: { sku: string; reason: string }[] = [
  {
    sku: 'Vitamin B12',
    reason:
      'REFUSED exact panel strings `annatto powder (color)` and `annatto [color]`. Neither string is a MAIN lock. Annatto extract (for color) and Organic Annatto Extract (Color) were not aliased onto these prints. 1000 mcg / 60 Count and 1000 mcg / 150 Count (https://www.naturewise.com/products/vitamin-b12; images https://www.naturewise.com/cdn/shop/files/NW-VitaminB12-4-Supplement60.jpg and https://www.naturewise.com/cdn/shop/files/NW-VitaminB12-4-Supplement150.jpg) print Other Ingredients: Halal gelatin, sunflower oil, glycerin, purified water, yellow beeswax, sunflower lecithin, annatto powder (color). 3000 mcg / 60 Count and 5000 mcg / 60 Count (images https://www.naturewise.com/cdn/shop/files/VitaminB123_000mcg-4-Supplement.jpg and https://www.naturewise.com/cdn/shop/files/NW-VitaminB125_000-4-Supplement.jpg) print Other Ingredients: Softgel (halal gelatin, glycerin, purified water, annatto [color]), dicalcium phosphate, sunflower oil, yellow beeswax, sunflower lecithin. NO Search row.',
  },
];

const _ROWS = BATCH114_KYR6B_NATUREWISE_NO_OI;
if (_ROWS.length !== 2) throw new Error('batch114 tally drift: expected 2 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 1) {
  throw new Error('batch114 Clean tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 1) {
  throw new Error('batch114 Caution tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 0) {
  throw new Error('batch114 Avoid tally drift');
}
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch114 recordStatus must stay unverified');
}
if (_ROWS.some((r) => r.formulaId !== r.id)) throw new Error('batch114 REUSE must stay 0');
if (_ROWS.some((r) => r.brand !== BRAND)) throw new Error('batch114 writes NatureWise only');
if (_ROWS.some((r) => !r.barcode || !/^\d{12}$/.test(r.barcode))) {
  throw new Error('batch114 barcode must be a 12-digit UPC-A');
}
if (
  _ROWS.some((r) => {
    if (!r.barcode) return false;
    let sum = 0;
    for (let i = 0; i < 11; i++) sum += Number(r.barcode[i]) * (i % 2 === 0 ? 3 : 1);
    return (10 - (sum % 10)) % 10 !== Number(r.barcode[11]);
  })
) {
  throw new Error('batch114 barcode failed UPC-A check digit');
}
const _flax = _ROWS.find((r) => r.id === FLAX);
if (!_flax || _flax.barcode !== '810157851277' || _flax.form !== 'softgel') {
  throw new Error('batch114 flax must stay the 3000 mg / 90 softgel GTIN');
}
if (_flax.productName.includes('30 Count') || _flax.productName.includes('120')) {
  throw new Error('batch114 must not copy the 120 or 30 flax pack');
}
if (
  _ROWS.some(
    (r) =>
      /\boil\b/i.test(r.productName) &&
      !/softgel|capsule|gumm|tablet|chew/i.test(r.productName + (r.form ?? '')),
  )
) {
  throw new Error('batch114 must not grade oil pour bottles');
}
for (const record of _ROWS) {
  if (record.verdict === 'avoid' && !record.inactiveIngredients.some((i) => i.riskLevel === 'high')) {
    throw new Error(`batch114 Avoid without High on ${record.id}`);
  }
  if (
    record.verdict === 'caution' &&
    !record.inactiveIngredients.some((i) => i.riskLevel === 'limited' || i.riskLevel === 'moderate')
  ) {
    throw new Error(`batch114 Caution without Limited or Moderate on ${record.id}`);
  }
  if (record.verdict === 'clean' && record.inactiveIngredients.some((i) => i.riskLevel !== 'cleared')) {
    throw new Error(`batch114 Clean row has a non-cleared flag on ${record.id}`);
  }
  if (record.inactiveIngredients.length === 0) throw new Error(`batch114 empty inactives on ${record.id}`);
  if (record.form === 'gummy') throw new Error(`batch114 has no gummy rows: ${record.id}`);
}
if (BATCH114_SKIPPED_NO_OI.length !== 1) throw new Error('batch114 no_OI leftover tally drift');
if (BATCH114_REFUSED.length !== 1) throw new Error('batch114 refuse tally drift');
if (!BATCH114_REFUSED.every((s) => /`annatto powder \(color\)`/.test(s.reason) && /`annatto \[color\]`/.test(s.reason))) {
  throw new Error('batch114 REFUSED must quote both unlocked strings');
}
if (_ROWS.some((r) => /creatine|vitamin b12/i.test(r.productName))) {
  throw new Error('batch114 must not write creatine or Vitamin B12');
}
