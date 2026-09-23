// DRAFT / not verified / batch 86 KYR6 NatureWise last-refuse backfill.
// Methodology v1.6 + MAIN §5 after the Sept 23, 2026 last-refuse stamp
// (3925925). Harm-first. No invented grades. No invented OI. No invented UPCs.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. NatureWise only. Unlocks batch85 REFUSED rows whose remaining
// blockers are now the three stamped strings:
//   stevia leaf extract → existing stevia extract Caution;
//   bare turmeric as an Other Ingredient Caution
//     (curcumin-as-color stays Cleared; oleoresin turmeric stays its own Caution row);
//   behenoyl polyoxyl-8 glycerides Caution (PEG-style glyceride; not High).
// A SKU whose panel still has another unmapped token stays REFUSED.
// naturewise.com supplement-facts images are the pin. Amazon US was not used.
// Shopify variant barcodes are admin data and are not a printed GTIN-12.
// Incomplete galleries stay SKIP. OI is not invented.
// The batch85 no_OI leftover 4 was not hunted. OUT 15 was not reopened.
// Oral Probiotics 3 Pack stays the batch82 OUT row.
// recordStatus is 'unverified' on every row.
// Internal keys only: clean | caution | avoid. Pack sizes of the same
// OI+form share formulaId. Search wiring only. Not wired into Clean Picks UI.
//
// Do NOT edit batch70–batch85. No WELMATE. No A+Health / HealthA2Z /
// TIME-Cap / GoodSense. No toothpaste. No house Amazon. No Sprouts.
// No graded oil pour bottles. Leftover Amazon 3P stays N=5.
//
// TALLY (unverified drafts in THIS file): 3 rows —
// Clean 0 / Caution 3 / Avoid 0.
// NEW 2 / REUSE-formula 1 (Oral Probiotics 60 Count shares the 30 Count
// formula) / SKIPPED 2 (no_OI 0 / OUT 0 / other 2 — Advanced Joint Care
// and Vegan Vitamin K2 Softgels still have no complete panel) /
// REFUSED 0.
// Search grade: Clean 0 / Caution 3 / Avoid 0.
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
const CDN = 'https://www.naturewise.com/cdn/shop/files/';

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const METH = {
  behenoyl: "Methodology §5 Limited-risk (behenoyl polyoxyl-8 glycerides — exact token; PEG-style glyceride; Caution; not High; locked Sept 23, 2026). Distinct from Cleared glyceryl dibehenate and from Cleared polyoxyl castor oil. Not Avoid.",
  dical: "Methodology §5 Cleared (dicalcium phosphate / calcium phosphate as filler).",
  flavors: "Methodology §5 Limited-risk (natural flavors / named simple flavors — undisclosed or named flavor mixtures). Label string natural peppermint flavor sits on this row.",
  glycerin: "Methodology §5 Cleared (glycerin / vegetable glycerin / organic vegetable glycerin).",
  inulin: "Methodology §5 Cleared (inulin — food fiber; locked Sept 14, 2026 housekeeping). Not a flag.",
  isomalt: "Methodology §5 Limited-risk (isomalt — oral sugar alcohol; locked Sept 15, 2026).",
  mctUnlabeled: "Methodology §5 Limited-risk (unlabeled MCT — organic MCT oil when the token does not name coconut or palm kernel). Not an oil-bottle grade. Not gummy High.",
  modStarch: "Methodology §5 Limited-risk (modified tapioca starch — Limited modified-starch row). Not Caution modified tapioca starchgel. Do not flip this Limited row.",
  oliveFill: "Methodology §5 Cleared (pure olive oil / extra virgin olive oil / organic extra virgin olive oil as fill — locked Sept 22, 2026). Not an oil-bottle grade.",
  steviaLeaf: "Methodology §5 Limited-risk (stevia leaf extract — maps to Caution stevia extract; locked Sept 22, 2026, mapped Sept 23, 2026). Not whole-leaf / crude stevia. Not Reb A / Reb M. Not a new grade. Not Avoid.",
  turmericOi: "Methodology §5 Limited-risk (bare turmeric as an Other Ingredient — exact token; Caution; locked Sept 23, 2026). Not Cleared turmeric/curcumin as a color. Not Caution oleoresin turmeric. Do not flip those rows. Not Avoid.",
  water: "Methodology §5 Cleared (purified water).",
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

function img(file: string): string {
  return `${CDN}${file}?width=1200`;
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
    const main = {
      Vitamins: ["amazon-elements-vitamin-d3-5000-softgels", "Independently Clean Amazon Elements Vitamin D3 5000 IU already on main. Form labeled, not a hard filter (§6)."],
      Digestive: ["megafood-magnesium-300-capsules", "Independently Clean MegaFood Magnesium 300 already on main. Form labeled, not a hard filter (§6)."],
    } as const;
    const pair = main[d.category as keyof typeof main];
    if (pair) alts.push(alt(pair[0], pair[1]));
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

const ORAL = "naturewise-b86-oral-probiotics-chewable";

const COMPACT: Compact[] = [
  {
    id: "naturewise-b86-vegan-k2-mk7",
    productName: "NatureWise Vegan Vitamin K2 as MK-7 (100 mcg / 120 Count)",
    barcode: "810157852861",
    category: "Vitamins",
    formulaId: "naturewise-b86-vegan-k2-mk7",
    audience: ADULT,
    minAge: 18,
    form: "softgel",
    productType: SUPPLEMENT,
    actives: [{ name: "Vitamin K2 as MK-7", strength: "100 mcg / 120 Count" }],
    flags: [
      ["Modified tapioca starch", "limited", "modStarch"],
      ["Vegetable glycerin", "cleared", "glycerin"],
      ["Purified water", "cleared", "water"],
      ["Turmeric", "limited", "turmericOi"],
      ["Organic MCT oil", "limited", "mctUnlabeled"],
      ["Olive oil", "cleared", "oliveFill"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Modified tapioca starch; Turmeric; Organic MCT oil. Bare turmeric is the Sept 23 Other Ingredient Caution row. It is not the locked turmeric-as-color string and not oleoresin turmeric. Modified tapioca starch on this softgel stays the Limited modified-starch row. It is not modified tapioca starchgel. Organic MCT oil does not name coconut or palm kernel on the Other Ingredients line, so it stays Limited unlabeled MCT. Not an oil-bottle grade. Not gummy High. Olive oil on this softgel is Cleared fill. Not an oil-bottle grade.",
    cite: `Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/vitamin-k2-mk-7; image ${img("NW_-_Vitamin_K2_100_mcg_-_1b_-_Right_Side.jpg")}) other-ingredients: Softgel (modified tapioca starch, vegetable glycerin, purified water, turmeric), organic MCT oil, olive oil. Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 810157852861 is the GTIN-12 printed on this same right panel (120 Count). No DailyMed drug SPL.`,
  },
  {
    id: ORAL,
    productName: "NatureWise Oral Probiotics - Chewable Tablets (30 Count)",
    barcode: "810157850867",
    category: "Digestive",
    formulaId: ORAL,
    audience: ADULT,
    minAge: 18,
    form: "chewable",
    productType: SUPPLEMENT,
    actives: [{ name: "Oral Probiotics", strength: "30 Count" }],
    flags: [
      ["Isomalt", "limited", "isomalt"],
      ["Inulin", "cleared", "inulin"],
      ["Behenoyl polyoxyl-8 glycerides", "limited", "behenoyl"],
      ["Dicalcium phosphate", "cleared", "dical"],
      ["Natural peppermint flavor", "limited", "flavors"],
      ["Stevia leaf extract", "limited", "steviaLeaf"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Isomalt; Behenoyl polyoxyl-8 glycerides; Natural peppermint flavor; Stevia leaf extract. Stevia leaf extract maps to the locked Caution stevia extract row. It is not whole-leaf stevia and not Reb A / Reb M. Behenoyl polyoxyl-8 glycerides is the Sept 23 PEG-style glyceride Caution row, not High. Inulin is Cleared fiber. Dicalcium phosphate is Cleared filler. This chewable is not a gummy. The 60 Count graphic prints the same Other Ingredients line, so they share formulaId. The 3 Pack multipack stays the batch82 OUT row and was not reopened. UPC-A 810157850867 is the published GTIN-12 for this 30 Count (Target primary barcode, 30 chewable tablets). The 60 Count and 3 Pack codes are not copied onto this count.",
    cite: `Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/oral-probiotics-chewable-tablets; image ${img("NW-OralHealthProbiotics-7-Supplement301_1.jpg")}) other-ingredients: Isomalt, inulin, behenoyl polyoxyl-8 glycerides, dicalcium phosphate, natural peppermint flavor, stevia leaf extract. The 60 Count graphic prints the same Other Ingredients line (${img("NW-OralHealthProbiotics-7-Supplement601.jpg")}). Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 810157850867 is the published GTIN-12 for this 30 Count (Target primary barcode, 30 chewable tablets). The 60 Count and 3 Pack codes are not this row. No DailyMed drug SPL.`,
  },
  {
    id: "naturewise-b86-oral-probiotics-chewable-60",
    productName: "NatureWise Oral Probiotics - Chewable Tablets (60 Count)",
    barcode: "858081006356",
    category: "Digestive",
    formulaId: ORAL,
    audience: ADULT,
    minAge: 18,
    form: "chewable",
    productType: SUPPLEMENT,
    actives: [{ name: "Oral Probiotics", strength: "60 Count" }],
    flags: [
      ["Isomalt", "limited", "isomalt"],
      ["Inulin", "cleared", "inulin"],
      ["Behenoyl polyoxyl-8 glycerides", "limited", "behenoyl"],
      ["Dicalcium phosphate", "cleared", "dical"],
      ["Natural peppermint flavor", "limited", "flavors"],
      ["Stevia leaf extract", "limited", "steviaLeaf"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Isomalt; Behenoyl polyoxyl-8 glycerides; Natural peppermint flavor; Stevia leaf extract. Stevia leaf extract maps to the locked Caution stevia extract row. It is not whole-leaf stevia and not Reb A / Reb M. Behenoyl polyoxyl-8 glycerides is the Sept 23 PEG-style glyceride Caution row, not High. Same Other Ingredients line as the 30 Count, so they share formulaId. This chewable is not a gummy. UPC-A 858081006356 is the published GTIN-12 for this 60 Count (Target primary barcode and Vitacost UPC field, 60 chewable tablets). The 30 Count barcode is not copied onto this count.",
    cite: `Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/oral-probiotics-chewable-tablets; image ${img("NW-OralHealthProbiotics-7-Supplement601.jpg")}) other-ingredients: Isomalt, inulin, behenoyl polyoxyl-8 glycerides, dicalcium phosphate, natural peppermint flavor, stevia leaf extract. Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 858081006356 is the published GTIN-12 for this 60 Count (Target primary barcode and Vitacost UPC field, 60 chewable tablets). The 30 Count barcode is not copied onto this count. No DailyMed drug SPL.`,
  },
];

export const BATCH86_KYR6_NATUREWISE_LAST_REFUSE: RatingRecord[] = COMPACT.map(expand);

export const BATCH86_SKIPPED: { sku: string; reason: string }[] = [
  {
    sku: "Advanced Joint Care",
    reason: "SKIPPED other. The current naturewise.com gallery (https://www.naturewise.com/products/advanced-joint-care) still has no complete Other Ingredients panel. Serving, chart, and info tiles are not a supplement-facts panel. Not unlocked by stevia leaf extract, bare turmeric as OI, or behenoyl polyoxyl-8 glycerides. OI not invented. Not a no_OI hunt and not an OUT category. NO Search row. SKU: Advanced Joint Care.",
  },
  {
    sku: "Vegan Vitamin K2 Softgels",
    reason: "SKIPPED other. The current naturewise.com gallery (https://www.naturewise.com/products/vegan-vitamin-k2) still has no complete Other Ingredients panel. Front, marketing, and serving tiles only, on the 90 Count, 180 Count, and 360 Count tabs. Not unlocked by stevia leaf extract, bare turmeric as OI, or behenoyl polyoxyl-8 glycerides. OI not invented. Not a no_OI hunt and not an OUT category. NO Search row. SKU: Vegan Vitamin K2 Softgels.",
  },
];

export const BATCH86_REFUSED: { sku: string; reason: string }[] = [];

const _ROWS = BATCH86_KYR6_NATUREWISE_LAST_REFUSE;
if (_ROWS.length !== 3) throw new Error('batch86 tally drift: expected 3 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 0) throw new Error('batch86 Clean tally drift');
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 3) throw new Error('batch86 Caution tally drift');
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 0) throw new Error('batch86 Avoid tally drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) throw new Error('batch86 recordStatus must stay unverified');
if (_ROWS.some((r) => !r.formulaId)) throw new Error('batch86 every row needs formulaId');
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch86 duplicate ids');
if (_ROWS.some((r) => r.brand !== BRAND)) throw new Error('batch86 writes NatureWise only');
if (_ROWS.some((r) => !r.id.startsWith('naturewise-b86-'))) throw new Error('batch86 formula ids must use naturewise-b86-');
if (_ROWS.some((r) => r.barcode && !/^\d{12}$/.test(r.barcode))) {
  throw new Error('batch86 barcode must be a 12-digit UPC-A');
}
if (_ROWS.some((r) => {
  if (!r.barcode) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(r.barcode[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 !== Number(r.barcode[11]);
})) {
  throw new Error('batch86 barcode failed UPC-A check digit');
}
if (_ROWS.filter((r) => r.formulaId !== r.id).length !== 1) {
  throw new Error('batch86 REUSE-formula tally drift');
}
if (_ROWS.filter((r) => r.formulaId === r.id).length !== 2) {
  throw new Error('batch86 NEW formula drift');
}
const _formulas = new Set(_ROWS.map((r) => r.formulaId));
if (![..._formulas].every((id) => _ids.has(id!))) throw new Error('batch86 formulaId must point at a row in this file');
if (_ROWS.some((r) => /toothpaste|sprouts|now foods|nutricost|welmate|goodsense|healtha2z|time-cap|a\+health/i.test(r.brand + r.productName))) {
  throw new Error('batch86 leftover 3P / Sprouts / toothpaste / NOW / Nutricost must stay out');
}
if (_ROWS.some((r) => /\boil\b/i.test(r.productName) && !/softgel|capsule|gumm|tablet|chew/i.test(r.productName + (r.form ?? '')))) {
  throw new Error('batch86 must not grade oil pour bottles');
}
const _upcById: Record<string, string | undefined> = {
  'naturewise-b86-vegan-k2-mk7': '810157852861',
  'naturewise-b86-oral-probiotics-chewable': '810157850867',
  'naturewise-b86-oral-probiotics-chewable-60': '858081006356',
};
for (const record of _ROWS) {
  if (record.verdict === 'avoid' && !record.inactiveIngredients.some((i) => i.riskLevel === 'high')) {
    throw new Error(`batch86 Avoid without High on ${record.id}`);
  }
  if (record.verdict === 'caution' && !record.inactiveIngredients.some((i) => i.riskLevel === 'limited' || i.riskLevel === 'moderate')) {
    throw new Error(`batch86 Caution without Limited or Moderate on ${record.id}`);
  }
  if (record.verdict === 'clean' && record.inactiveIngredients.some((i) => i.riskLevel !== 'cleared')) {
    throw new Error(`batch86 Clean row has a non-cleared flag on ${record.id}`);
  }
  if (record.form === 'gummy') throw new Error(`batch86 has no gummy rows: ${record.id}`);
  if (_upcById[record.id] !== record.barcode) {
    throw new Error(`batch86 UPC attach drift on ${record.id}`);
  }
}
if (BATCH86_SKIPPED.length !== 2) throw new Error('batch86 skip tally drift');
if (BATCH86_SKIPPED.some((s) => /SKIPPED no_OI/.test(s.reason))) throw new Error('batch86 no_OI must stay 0');
if (BATCH86_SKIPPED.some((s) => /SKIPPED OUT/.test(s.reason))) throw new Error('batch86 OUT must stay 0');
if (!BATCH86_SKIPPED.every((s) => /not a no_OI hunt/i.test(s.reason) && /not an OUT/i.test(s.reason))) {
  throw new Error('batch86 skips must say they are not a no_OI hunt and not an OUT');
}
if (BATCH86_REFUSED.length !== 0) throw new Error('batch86 refuse tally drift');
const _written = _ROWS.map((r) => `${r.productName} ${r.inactiveIngredients.map((i) => i.name).join(' ')} ${(r.sourcesGeneral ?? []).join(' ')}`).join('\n');
if (!/stevia leaf extract/i.test(_written)) throw new Error('batch86 missing stevia leaf extract');
if (!/\bturmeric\b/i.test(_written)) throw new Error('batch86 missing bare turmeric');
if (/turmeric \(color\)|turmeric \[color\]|oleoresin turmeric|turmeric oleoresin/i.test(_written)) {
  throw new Error('batch86 must not use the color or oleoresin turmeric row');
}
if (!/behenoyl polyoxyl-8 glycerides/i.test(_written)) throw new Error('batch86 missing behenoyl polyoxyl-8 glycerides');
const _noOi = ['Creatine Monohydrate', "Women's Multivitamin with Stress Support", 'Vitamin B12', 'Flaxseed Oil'];
if (_noOi.some((name) => _ROWS.some((r) => r.productName.includes(name)) || BATCH86_SKIPPED.some((s) => s.sku === name))) {
  throw new Error('batch86 must not re-hunt the no_OI leftover 4');
}
if (_ROWS.some((r) => /Advanced Joint Care|Vegan Vitamin K2 Softgels/.test(r.productName))) {
  throw new Error('batch86 incomplete panels must stay skipped');
}
