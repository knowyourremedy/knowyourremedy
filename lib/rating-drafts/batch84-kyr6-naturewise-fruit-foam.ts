// DRAFT / not verified / batch 84 KYR6 NatureWise fruit + foam backfill.
// Methodology v1.6 + MAIN §5 after the Sept 23, 2026 leftover fruit / foam
// stamp (2b48b11). Harm-first. No invented grades. No invented OI. No invented UPCs.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. NatureWise only. Unlocks batch83 REFUSED rows whose remaining
// blockers are now the five stamped strings:
//   cranberry fruit; organic raspberry; organic raspberry powder;
//   blueberry juice concentrate; non-silicone foam control agent.
// A SKU whose panel still has another unmapped token stays REFUSED.
// naturewise.com supplement-facts images are the pin. Amazon US was not used.
// OCR-garbage panels stay refused. Incomplete galleries stay refused.
// batch82 no_OI 28 was not hunted. OUT 15 was not reopened.
// Mango 60-pack multipack stays the batch82 OUT row.
// recordStatus is 'unverified' on every row.
// Internal keys only: clean | caution | avoid. Pack sizes of the same
// OI+form share formulaId. Search wiring only. Not wired into Clean Picks UI.
//
// Do NOT edit batch70–batch83. No WELMATE. No A+Health / HealthA2Z /
// TIME-Cap / GoodSense. No toothpaste. No house Amazon. No Sprouts.
// No graded oil pour bottles. Leftover Amazon 3P stays N=5.
//
// TALLY (unverified drafts in THIS file): 4 rows —
// Clean 0 / Caution 4 / Avoid 0.
// NEW 4 / REUSE-formula 0 / SKIPPED 2 (no_OI 0 / OUT 0 / other 2 —
// Hair Growth 15.22 oz front only; Mango 30-pack back is the 10-pack photo) /
// REFUSED 3.
// Search grade: Clean 0 / Caution 4 / Avoid 0.
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
  aloe: "Methodology §5 Limited-risk (organic aloe vera as Other Ingredient — exact token; Caution; not a named-color pass; locked Sept 23, 2026). Not Avoid.",
  aloePowder: "Methodology §5 Limited-risk (organic aloe vera powder as Other Ingredient — exact token; Caution; not a named-color pass; locked Sept 23, 2026). Not Avoid.",
  betaCarotene: "Methodology §5 Caution (beta-carotene as a color additive, not the vitamin). This panel prints beta carotene in Other Ingredients, not as a Supplement Facts vitamin. Not Avoid.",
  blueberrySweet: "Methodology §5 Limited-risk (blueberry juice concentrate as sweetener — exact token; locked Sept 23, 2026). This panel is not labeled for color, so it is not the Cleared blueberry-juice-concentrate-as-color row. Distinct from the broader blueberry juice / fruit-powder split. Not Avoid.",
  carrot: "Methodology §5 Limited-risk (bare carrot — exact token when the panel does not clearly say color; Caution; locked Sept 23, 2026). Black carrot / purple carrot for color stays Cleared. Not Avoid.",
  citric: "Methodology §5 Cleared (citric acid).",
  concentrace: "Methodology §5 Limited-risk (ConcenTrace mineral complex — exact token as an inactive blend; Caution; locked Sept 23, 2026). Distinct from minerals under the Supplement Facts bar. Not Avoid.",
  cranberryFruit: "Methodology §5 Cleared (cranberry fruit — exact token; locked Sept 23, 2026). Named fruit. Distinct from cranberry juice / cranberry fruit powder (color Cleared; unspecified sweetener Caution). Do not pull this token onto the sweetener row.",
  cranberryPowder: "Methodology §5 Limited-risk (cranberry fruit powder as unspecified sweetener — locked Sept 23, 2026). This panel is not labeled for color, so it is not the Cleared named-fruit-color row. Distinct from Cleared cranberry fruit. Not Avoid.",
  flavors: "Methodology §5 Limited-risk (natural flavors / named simple flavors — undisclosed or named flavor mixtures).",
  foam: "Methodology §5 Limited-risk (non-silicone foam control agent — exact token; unspecified processing aid; Caution; locked Sept 23, 2026). Not a named antifoam. Not Avoid.",
  glycerin: "Methodology §5 Cleared (glycerin / vegetable glycerin / organic vegetable glycerin).",
  grapefruit: "Methodology §5 Limited-risk (grapefruit extract — exact token; Caution; extract; locked Sept 23, 2026). Distinct from Caution grapefruit oil and from Cleared citrus / grapefruit fiber. Not Avoid.",
  organicRaspberry: "Methodology §5 Cleared (organic raspberry — exact token; locked Sept 23, 2026). Named fruit. Distinct from raspberry juice / raspberry fruit powder. Do not pull this token onto the sweetener row.",
  raspberryPowder: "Methodology §5 Cleared (organic raspberry powder — exact token; locked Sept 23, 2026). Named fruit powder. Distinct from raspberry fruit powder on the juice-or-fruit-powder color-vs-sweetener split. Do not flip that split.",
  salt: "Methodology §5 Cleared (sodium chloride / sea salt). Sea salt sits on the sodium chloride row. Not a grade driver.",
  sucralose: "Methodology §5 Moderate-risk (sucralose). Not Avoid by itself. Avoid needs High.",
  water: "Methodology §5 Cleared (purified water).",
  xanthan: "Methodology §5 Cleared (xanthan gum — xanthan / guar / pectin family).",
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
    alts.push(alt(
      "amazon-elements-vitamin-d3-5000-softgels",
      "Independently Clean Amazon Elements Vitamin D3 5000 IU already on main. Form labeled, not a hard filter (§6).",
    ));
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

const COMPACT: Compact[] = [
  {
    id: "naturewise-b84-liquid-multivitamin",
    productName: "NatureWise Liquid Multivitamin (30 oz)",
    barcode: "810157851116",
    category: "Vitamins",
    formulaId: "naturewise-b84-liquid-multivitamin",
    audience: ADULT,
    minAge: 18,
    form: "liquid",
    productType: SUPPLEMENT,
    actives: [{ name: "Liquid Multivitamin", strength: "30 oz" }],
    flags: [
      ["Purified water", "cleared", "water"],
      ["Vegetable glycerin", "cleared", "glycerin"],
      ["Mixed berry flavors", "limited", "flavors"],
      ["Flavors (from natural sources)", "limited", "flavors"],
      ["Xanthan gum", "cleared", "xanthan"],
      ["ConcenTrace mineral complex", "limited", "concentrace"],
      ["Cranberry fruit", "cleared", "cranberryFruit"],
      ["Organic aloe vera", "limited", "aloe"],
      ["Grapefruit extract", "limited", "grapefruit"],
      ["Organic raspberry", "cleared", "organicRaspberry"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Mixed berry flavors; Flavors (from natural sources); ConcenTrace mineral complex; Organic aloe vera; Grapefruit extract. Cranberry fruit and organic raspberry are the Sept 23 Cleared exact tokens. They are not the cranberry / raspberry juice or fruit-powder sweetener row. ConcenTrace mineral complex, grapefruit extract, and organic aloe vera were already stamped and stay Caution. The supplement-facts panel also prints servings for ages 1–3, 4–13, and 14+. This draft does not add a separate kids row.",
    cite: "Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/liquid-multivitamin; image https://www.naturewise.com/cdn/shop/files/NW-LiquidMultivitamin-4-Supplement.jpg?width=1200) other-ingredients: Purified water, vegetable glycerin, mixed berry flavors, flavors (from natural sources), xanthan gum, concentrace mineral complex, cranberry fruit, organic aloe vera, grapefruit extract, organic raspberry. The same Other Ingredients line is on the bottle right panel (https://www.naturewise.com/cdn/shop/files/NW-LiquidMultivitaminAllAges_PDP_RIGHT.jpg?width=1200). Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 810157851116 is the GTIN-12 printed on this PDP right panel (30 oz). No DailyMed drug SPL.",
  },
  {
    id: "naturewise-b84-liquid-multi-hair",
    productName: "NatureWise Liquid Multivitamin + Hair Growth (30 oz)",
    barcode: "810157851222",
    category: "Vitamins",
    formulaId: "naturewise-b84-liquid-multi-hair",
    audience: ADULT,
    minAge: 18,
    form: "liquid",
    productType: SUPPLEMENT,
    actives: [{ name: "Liquid Multivitamin + Hair Growth", strength: "30 oz" }],
    flags: [
      ["Purified water", "cleared", "water"],
      ["Vegetable glycerin", "cleared", "glycerin"],
      ["Mixed flavors", "limited", "flavors"],
      ["Xanthan gum", "cleared", "xanthan"],
      ["Citric acid", "cleared", "citric"],
      ["Sea salt", "cleared", "salt"],
      ["Cranberry fruit powder", "limited", "cranberryPowder"],
      ["Organic aloe vera powder", "limited", "aloePowder"],
      ["Organic raspberry powder", "cleared", "raspberryPowder"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Mixed flavors; Cranberry fruit powder; Organic aloe vera powder. Cranberry fruit powder is not labeled for color, so it stays the unspecified-sweetener Caution row, not Cleared named-fruit color. Organic raspberry powder is the Sept 23 Cleared exact token. Do not pull it onto the raspberry fruit-powder sweetener row. Organic aloe vera powder was already stamped and stays Caution. Sea salt sits on Cleared sodium chloride. TocoGaia and the amino-acid complex are Supplement Facts actives, not Other Ingredients.",
    cite: "Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/liquid-multivitamin-hair-growth; image https://www.naturewise.com/cdn/shop/files/NW-LiquidMultivitamin_HairGrowth_PDP_RIGHT.jpg?width=1200) other-ingredients: Purified water, vegetable glycerin, mixed flavors, xanthan gum, citric acid, sea salt, cranberry fruit powder, organic aloe vera powder, organic raspberry powder. Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 810157851222 is the GTIN-12 printed on the left panel of this 30 oz bottle (https://www.naturewise.com/cdn/shop/files/NW-LiquidMultivitamin_HairGrowth_PDP_LEFT.jpg?width=1200). No DailyMed drug SPL.",
  },
  {
    id: "naturewise-b84-liquid-collagen-berry",
    productName: "NatureWise Liquid Collagen Mixed Berry",
    category: "Vitamins",
    formulaId: "naturewise-b84-liquid-collagen-berry",
    audience: ADULT,
    minAge: 18,
    form: "liquid",
    productType: SUPPLEMENT,
    actives: [{ name: "Liquid Collagen Mixed Berry", strength: "1 Liquid-Tube (10 mL)" }],
    flags: [
      ["Purified water", "cleared", "water"],
      ["Citric acid", "cleared", "citric"],
      ["Mixed berry and strawberry flavor", "limited", "flavors"],
      ["Sucralose", "moderate", "sucralose"],
      ["Carrot", "limited", "carrot"],
      ["Blueberry juice concentrate", "limited", "blueberrySweet"],
      ["Non-silicone foam control agent", "limited", "foam"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Mixed berry and strawberry flavor; Sucralose; Carrot; Blueberry juice concentrate; Non-silicone foam control agent. Blueberry juice concentrate is not labeled for color, so it is the sweetener Caution row, not the Cleared color row. Carrot is bare carrot Caution. Non-silicone foam control agent is the Sept 23 unspecified-processing-aid Caution row. Sucralose is Moderate and does not make Avoid without High. Blueberry, blackberry, and pomegranate juice concentrates inside the Supplement Facts antioxidant blend are actives, not this Other Ingredients line. No GTIN-12 printed on this supplement-facts graphic, so no UPC is attached.",
    cite: "Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/liquid-collagen; image https://www.naturewise.com/cdn/shop/files/Liquid_Collagen_Bundle_Supplement_Fact_Label.jpg?width=1200) other-ingredients: Purified water, citric acid, mixed berry and strawberry flavor, sucralose, carrot and blueberry juice concentrate, non-silicone foam control agent. Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. The graphic does not print a GTIN-12, so no UPC is attached. No DailyMed drug SPL.",
  },
  {
    id: "naturewise-b84-liquid-collagen-mango",
    productName: "NatureWise Liquid Collagen Mango (10 Pack)",
    barcode: "810157852434",
    category: "Vitamins",
    formulaId: "naturewise-b84-liquid-collagen-mango",
    audience: ADULT,
    minAge: 18,
    form: "liquid",
    productType: SUPPLEMENT,
    actives: [{ name: "Liquid Collagen Mango", strength: "10 Pack" }],
    flags: [
      ["Purified water", "cleared", "water"],
      ["Citric acid", "cleared", "citric"],
      ["Flavors", "limited", "flavors"],
      ["Sucralose", "moderate", "sucralose"],
      ["Beta carotene", "limited", "betaCarotene"],
      ["Non-silicone foam control agent", "limited", "foam"],
    ],
    verdict: "caution",
    note: "FOUNDER-LOCK DRAFT: Caution. Driver is Flavors; Sucralose; Beta carotene; Non-silicone foam control agent. Beta carotene is in Other Ingredients, so it is the color-additive Caution row, not a vitamin active. The panel does not print \"(for color)\". Non-silicone foam control agent is the Sept 23 unspecified-processing-aid Caution row. Sucralose is Moderate and does not make Avoid without High. Mango, peach, and orange juice concentrates are inside the Supplement Facts antioxidant blend (actives), not this Other Ingredients line. This OI list is not the Mixed Berry list, so it does not share that formulaId.",
    cite: "Current naturewise.com supplement-facts panel (https://www.naturewise.com/products/liquid-collagen; image https://www.naturewise.com/cdn/shop/files/NW-LiquidCollagenMangoAmpules-6-Supplement_1.jpg?width=1200) other-ingredients: Purified water, citric acid, flavors, sucralose, beta carotene, non-silicone foam control agent. The 10-pack back panel prints the same Other Ingredients line (https://www.naturewise.com/cdn/shop/files/NW_-_Liquid_Collagen_Mango_-_1b_-_Back_Side_10.jpg?width=1200). Brand-site supplement-facts image is the pin for this NatureWise name. Live Amazon US exact pack when this name is listed. UPC-A 810157852434 is the GTIN-12 printed on that 10-pack back panel. No DailyMed drug SPL.",
  },
];

export const BATCH84_KYR6_NATUREWISE_FRUIT_FOAM: RatingRecord[] = COMPACT.map(expand);

export const BATCH84_SKIPPED: { sku: string; reason: string }[] = [
  {
    sku: "Liquid Multivitamin + Hair Growth (15.22 oz)",
    reason: "SKIPPED other. The 15.22 oz image on naturewise.com is a front tile. The supplement-facts bottle on this PDP is the 30 oz (GTIN-12 810157851222 prints on that bottle's left panel). OI not copied onto the 15.22 oz. Not a no_OI hunt and not an OUT category.",
  },
  {
    sku: "Liquid Collagen Mango (30 Pack)",
    reason: "SKIPPED other. The 30-pack back image on naturewise.com is the same photo as the 10-pack back and prints GTIN-12 810157852434, which is the 10-pack. OI not copied onto a distinct 30-pack panel. Not a no_OI hunt and not an OUT category.",
  },
];

export const BATCH84_REFUSED: { sku: string; reason: string }[] = [
  {
    sku: "Advanced Joint Care",
    reason: "REFUSED exact panel string(s) `bamboo extract`, `rice bran wax` were already stamped, but the current naturewise.com gallery has no complete Other Ingredients panel to re-read. Not unlocked by cranberry fruit, organic raspberry, organic raspberry powder, blueberry juice concentrate, or non-silicone foam control agent. OI not invented. NO Search row. SKU: Advanced Joint Care.",
  },
  {
    sku: "Multivitamin for Men",
    reason: "REFUSED OCR junk on the bottle panel. Readable strings `bamboo extract` and `rice bran wax` are already stamped, but the rest of the Other Ingredients line did not read cleanly. OCR junk stays refuse. Not a fruit or foam unlock. NO Search row. SKU: Multivitamin for Men.",
  },
  {
    sku: "Vegan Vitamin K2 Softgels",
    reason: "REFUSED exact panel string(s) `modified tapioca starchgel (cassava root)` is already stamped, but the current naturewise.com gallery has no complete Other Ingredients panel (front and marketing tiles only). Not unlocked by the fruit or foam stamps. OI not invented. NO Search row. SKU: Vegan Vitamin K2 Softgels.",
  },
];

const _ROWS = BATCH84_KYR6_NATUREWISE_FRUIT_FOAM;
if (_ROWS.length !== 4) throw new Error('batch84 tally drift: expected 4 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 0) throw new Error('batch84 Clean tally drift');
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 4) throw new Error('batch84 Caution tally drift');
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 0) throw new Error('batch84 Avoid tally drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) throw new Error('batch84 recordStatus must stay unverified');
if (_ROWS.some((r) => !r.formulaId)) throw new Error('batch84 every row needs formulaId');
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch84 duplicate ids');
if (_ROWS.some((r) => r.brand !== BRAND)) throw new Error('batch84 writes NatureWise only');
if (_ROWS.some((r) => r.barcode && !/^\d{12}$/.test(r.barcode))) {
  throw new Error('batch84 barcode must be a 12-digit UPC-A');
}
if (_ROWS.some((r) => {
  if (!r.barcode) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(r.barcode[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 !== Number(r.barcode[11]);
})) {
  throw new Error('batch84 barcode failed UPC-A check digit');
}
if (_ROWS.filter((r) => r.formulaId !== r.id).length !== 0) {
  throw new Error('batch84 REUSE-formula tally drift');
}
if (_ROWS.filter((r) => r.formulaId === r.id).length !== 4) {
  throw new Error('batch84 NEW formula drift');
}
const _formulas = new Set(_ROWS.map((r) => r.formulaId));
if (![..._formulas].every((id) => _ids.has(id!))) throw new Error('batch84 formulaId must point at a row in this file');
if (_ROWS.some((r) => /toothpaste|sprouts|now foods|nutricost|welmate|goodsense|healtha2z|time-cap|a\+health/i.test(r.brand + r.productName))) {
  throw new Error('batch84 leftover 3P / Sprouts / toothpaste / NOW / Nutricost must stay out');
}
if (_ROWS.some((r) => /\boil\b/i.test(r.productName) && !/softgel|capsule|gumm|tablet|chew/i.test(r.productName + (r.form ?? '')))) {
  throw new Error('batch84 must not grade oil pour bottles');
}
const _upcById: Record<string, string | undefined> = {
  'naturewise-b84-liquid-multivitamin': '810157851116',
  'naturewise-b84-liquid-multi-hair': '810157851222',
  'naturewise-b84-liquid-collagen-berry': undefined,
  'naturewise-b84-liquid-collagen-mango': '810157852434',
};
for (const record of _ROWS) {
  if (record.verdict === 'avoid' && !record.inactiveIngredients.some((i) => i.riskLevel === 'high')) {
    throw new Error(`batch84 Avoid without High on ${record.id}`);
  }
  if (record.verdict === 'caution' && !record.inactiveIngredients.some((i) => i.riskLevel === 'limited' || i.riskLevel === 'moderate')) {
    throw new Error(`batch84 Caution without Limited or Moderate on ${record.id}`);
  }
  if (record.verdict === 'clean' && record.inactiveIngredients.some((i) => i.riskLevel !== 'cleared')) {
    throw new Error(`batch84 Clean row has a non-cleared flag on ${record.id}`);
  }
  if (record.form === 'gummy') throw new Error(`batch84 has no gummy rows: ${record.id}`);
  if (_upcById[record.id] !== record.barcode) {
    throw new Error(`batch84 UPC attach drift on ${record.id}`);
  }
}
if (BATCH84_SKIPPED.length !== 2) throw new Error('batch84 skip tally drift');
if (BATCH84_SKIPPED.some((s) => /SKIPPED no_OI/.test(s.reason))) throw new Error('batch84 no_OI must stay 0');
if (BATCH84_SKIPPED.some((s) => /SKIPPED OUT/.test(s.reason))) throw new Error('batch84 OUT must stay 0');
if (!BATCH84_SKIPPED.every((s) => /not a no_OI hunt/i.test(s.reason) && /not an OUT/i.test(s.reason))) {
  throw new Error('batch84 skips must say they are not a no_OI hunt and not an OUT');
}
if (BATCH84_REFUSED.length !== 3) throw new Error('batch84 refuse tally drift');
if (BATCH84_REFUSED.some((s) => !/`[^`]+`/.test(s.reason))) throw new Error('batch84 REFUSED must quote an exact panel string');
const _written = _ROWS.map((r) => `${r.productName} ${r.inactiveIngredients.map((i) => i.name).join(' ')} ${(r.sourcesGeneral ?? []).join(' ')}`).join('\n');
if (!/cranberry fruit/i.test(_written)) throw new Error('batch84 missing cranberry fruit');
if (!/organic raspberry powder/i.test(_written)) throw new Error('batch84 missing organic raspberry powder');
if (!/blueberry juice concentrate/i.test(_written)) throw new Error('batch84 missing blueberry juice concentrate');
if (!/non-silicone foam control agent/i.test(_written)) throw new Error('batch84 missing foam control agent');
