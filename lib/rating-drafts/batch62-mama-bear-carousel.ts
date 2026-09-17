// DRAFT / not verified / batch 62 Mama Bear founder-carousel OI WRITE /
// methodology v1.6 + current main §5 exact Additive / “also appears
// as” / locked exact-INCI rows only. No invented grades. No
// cousin-match. Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. These FOUR Mama Bear gummies ONLY. recordStatus is
// 'unverified' on every row. Internal keys only: clean | caution |
// avoid. UPC attached only when HelloPharmacist / NIH DSLD has a
// real barcode — no invented codes. Missing code ≠ no row (omit
// barcode). Pack sizes of the same name+form+inactives share
// formulaId. Form is labeled on cleanAlternatives, not a hard
// filter (§6). Search wiring only. Not wired into Clean Picks UI.
// No photos. Letter tiles only on new ids. No fake Clean alts.
// No methodology rewrite. PROJECT_NOTES tally-only (do not wipe
// LIVE NOW).
//
// DO NOT REOPEN: batch61 Amazon house pinned (18) · batch30 house
// wave · batch54–58 Amazon P&F · batch59–60 Thrive. Do not write
// Elements / Basics / Solimo / Revly leftovers. No 3P. No WELMATE
// / A+Health / HealthA2Z full lines. Do not stash. Do not invent
// OI. Founder carousel OI is pinned label truth.
//
// LOCKS used (exact §5, already on MAIN): Mama Bear gummy
// sunflower oil = High / Avoid. Natural flavors = Limited
// (opacity) → product Caution (Limited-only never Avoid). Organic
// flavors = Cleared (organic flavors/colors row — not Limited
// natural flavors). Annatto / Organic Annatto Extract (Color) =
// standalone Caution, not Avoid, encoded cleared + METH.annatto
// (RiskLevel has no caution key). Named plant colors (black
// carrot / turmeric-as-color / maqui) = Cleared. Unspecified
// Natural Colors is NOT this write (named strings inside
// parentheses). Lemon juice concentrate as gummy base = Limited.
// Display keys stay clean / caution / avoid.
//
// TALLY (unverified drafts in THIS file): 4 rows — Clean 0 /
// Caution 1 / Avoid 3. NEW 4 / REUSE 0.
//
// Independently Clean analogs already on main (not cloned):
// carlson-kids-super-daily-d3-drops ·
// thrive-wellmade-real-food-vitamin-c · wellmade-elderberry ·
// oscillococcinum.
//
// TALLY is asserted at the bottom of this file.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const KIDS = 'kids' as const;
const VITAMIN = 'Vitamin' as const;
const SUPPLEMENT = 'Supplement' as const;
const UNVERIFIED_NOTE = 'draft, not verified';

const VITAMINS = 'Vitamins';
const IMMUNE = 'Immune Support';
const DIGESTIVE = 'Digestive';

const MAMA_BEAR = 'Mama Bear';
const AMAZON = ['Amazon'] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const GUMMY_OIL_TAP =
  'Seed/industrial oils are flagged in gummies. Sunflower / palm / safflower / vegetable oil used as a gummy coating or fill is that High rule. Capsule / softgel / drop fill of the same oil is not.';

const ZINC_PARKED =
  'Zinc (citrate / other labeled zinc salts) is parked as of Methodology v1.6 — active-safety-cap review is not done. This draft grades inactives only.';

const CITE = {
  d3:
    'Founder carousel OI (pinned label truth) Mama Bear Organic Kids Vitamin D3 Gummies other-ingredients: Organic Tapioca Syrup, Organic Sugar, Organic Lemon Juice Concentrate, Pectin, Organic Flavors, Sodium Citrate, Colors Added (Organic Black Carrot Juice Concentrate, Organic Turmeric, Organic Annatto), Organic Sunflower Oil, Organic Carnauba Wax. HelloPharmacist / NIH DSLD 300215 barcode 842379159305 (80 ct).',
  vitC:
    'Founder carousel OI (pinned label truth) Mama Bear Vegan Kids Vitamin C Gummies other-ingredients: Organic Sugar, Organic Tapioca Syrup; Contains <2% of: Citric Acid, Natural Flavors, Organic Annatto Extract (Color), Organic Carnauba Wax, Organic Sunflower Oil, Pectin, Sodium Citrate. HelloPharmacist / DSLD barcode 842379148835 (60 ct).',
  elder:
    'Founder carousel OI (pinned label truth) Mama Bear Kids Black Elderberry Gummies other-ingredients: Sugar, Organic Tapioca Syrup, Pectin; Contains <2% of: Citric Acid, Natural Flavors, Sodium Citrate. No seed oil. HelloPharmacist / NIH DSLD 300217 barcode 842379152665 (60 ct).',
  probiotic:
    'Founder carousel OI (pinned label truth) Mama Bear Vegan Kids Probiotic Gummies other-ingredients: Organic Tapioca Syrup, Organic Evaporated Cane Sugar, Pectin, Natural Colors (Organic Maqui Berry Juice Concentrate, Black Carrot Juice Concentrate), Natural Flavors, Citric Acid, Sodium Citrate, Corn Starch, Organic Sunflower Oil (Containing Carnauba Wax). Amazon / carton UPC 842379148828 (60 ct berry).',
} as const;

const BATCH62_CATCHUP_BARCODES: Record<string, string> = {
  'mama-bear-vegan-kids-probiotic-gummies': '842379148828',
};

const METH = {
  seedOilGummies: `Methodology §5 High-tier (seed/industrial oils in gummies — soybean, canola, palm, safflower, sunflower, vegetable oil). ${GUMMY_OIL_TAP}`,
  flavors:
    'Methodology §5 Limited-risk (natural / artificial flavors — opacity). Product display key is caution when this is the worst inactive (Limited-only never Avoid).',
  juiceBase:
    'Methodology §5 Limited-risk (fruit puree / juice concentrate as gummy base — not the Cleared named juice-as-color row)',
  organicFlavor:
    'Methodology §5 Cleared (organic flavors / organic colors — whole-food-derived; not Limited natural flavors)',
  annatto:
    'Methodology §5 Caution (annatto / Organic Annatto Extract (Color) — allergenic; standalone Caution, not additive-scored, not Avoid)',
  namedColor:
    'Methodology §5 Cleared (black carrot / named fruit-or-vegetable juice as color / maqui / turmeric-as-color)',
  gums: 'Methodology §5 Cleared (xanthan gum, guar gum, gum arabic / acacia, pectin, gellan gum)',
  gelatin:
    'Methodology §5 Cleared (lactose, gelatin, carnauba wax, beeswax, purified water)',
  citrate:
    'Methodology §5 Cleared (citric acid / citrate salts / malic / lactic / fumaric / adipic / tartaric)',
  sugar:
    'Methodology §5 Cleared (cane sugar, glucose syrup, tapioca syrup / dextrose / sucrose / evaporated cane sugar)',
  starch:
    'Methodology §5 Cleared (pregelatinized / corn / potato / tapioca starch / pea starch / similar simple starches)',
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
  opts: Omit<RatingRecord, 'retailers' | 'recordStatus'> & {
    retailers?: string[];
    recordStatus?: RatingRecord['recordStatus'];
  },
): RatingRecord {
  return {
    ...opts,
    recordStatus: opts.recordStatus ?? UNVERIFIED,
    retailers: opts.retailers ?? [...AMAZON],
  };
}

const D3_ALTS: CleanAlternative[] = [
  alt(
    'carlson-kids-super-daily-d3-drops',
    "Independently Clean kids Vitamin D3 analog already on main (Carlson Kid's Super Daily D3 drops — MCT from coconut only). Form: liquid drops vs gummy — labeled, not a hard filter (§6). Age-matched (minAge 1). Do not invent a Clean Mama Bear D3 gummy.",
  ),
];

const VITAMIN_C_ALTS: CleanAlternative[] = [
  alt(
    'thrive-wellmade-real-food-vitamin-c',
    'Independently Clean whole-food vitamin C analog already on main (named HPMC capsule + rice hull). Form: capsule vs gummy — labeled, not a hard filter (§6). Age-match: this swap is an adult capsule; parents choose form. Do not invent a Clean Mama Bear C gummy.',
  ),
];

const ELDER_ALTS: CleanAlternative[] = [
  alt(
    'wellmade-elderberry',
    'Independently Clean elderberry analog already on main (wellmade Elderberry Plus — HPMC capsule). Form: capsule vs gummy — labeled, not a hard filter (§6). Age-match: this swap is an adult capsule; parents choose form. Do not invent a Clean Mama Bear elderberry gummy.',
  ),
  alt(
    'oscillococcinum',
    'Independently Clean Immune Support analog already on main (Boiron Oscillococcinum; minAge 2). Form: meltaway pellets vs gummy — labeled, not a hard filter (§6). Cleanliness peer only; not an elderberry replacement.',
  ),
];

export const BATCH62_MAMA_BEAR_CAROUSEL: RatingRecord[] = [
  // ── Caution ──────────────────────────────────────────────
  row({
    id: 'mama-bear-kids-black-elderberry-gummies',
    productName: 'Mama Bear Kids Black Elderberry Gummies',
    brand: MAMA_BEAR,
    category: IMMUNE,
    barcode: '842379152665',
    formulaId: 'mama-bear-kids-black-elderberry-gummies',
    audience: KIDS,
    minAge: 2,
    form: 'gummy',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Black elderberry juice powder', strength: '300mg per 2-gummy serving' },
      { name: 'Vitamin C', strength: 'label serving' },
      { name: 'Vitamin D', strength: 'label serving' },
      { name: 'Vitamin E', strength: 'label serving' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag('Natural flavors', 'limited', labelCite(CITE.elder, METH.flavors)),
      flag('Sugar', 'cleared', labelCite(CITE.elder, METH.sugar)),
      flag('Organic tapioca syrup', 'cleared', labelCite(CITE.elder, METH.sugar)),
      flag('Pectin', 'cleared', labelCite(CITE.elder, METH.gums)),
      flag('Citric acid', 'cleared', labelCite(CITE.elder, METH.citrate)),
      flag('Sodium citrate', 'cleared', labelCite(CITE.elder, METH.citrate)),
    ],
    verdict: 'caution',
    honestNote: `FOUNDER-LOCK DRAFT: Mama Bear Kids Black Elderberry gummies = Caution. No seed oil on the pinned founder-carousel OI. Driver is natural flavors (Limited opacity — exact §5). ${LIMITED_STACK} Sugar / organic tapioca syrup / pectin / citric acid / sodium citrate are Cleared. Pack sizes share this formulaId. HelloPharmacist / NIH DSLD 300217 barcode 842379152665 (60 ct). Confirm carton. No DailyMed drug SPL (dietary supplement). Ages 2+. ${ZINC_PARKED} Draft, not verified.`,
    cleanAlternatives: ELDER_ALTS,
    sourcesGeneral: [`${CITE.elder} — ${UNVERIFIED_NOTE}`],
  }),

  // ── Avoid ────────────────────────────────────────────────
  row({
    id: 'mama-bear-organic-kids-vitamin-d3-gummies',
    productName: 'Mama Bear Organic Kids Vitamin D3 Gummies',
    brand: MAMA_BEAR,
    category: VITAMINS,
    barcode: '842379159305',
    formulaId: 'mama-bear-organic-kids-vitamin-d3-gummies',
    audience: KIDS,
    minAge: 2,
    form: 'gummy',
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Vitamin D3 (cholecalciferol)', strength: '25mcg (1000 IU) per serving' },
    ],
    inactiveIngredients: [
      flag(
        'Organic sunflower oil',
        'high',
        labelCite(CITE.d3, METH.seedOilGummies),
      ),
      flag(
        'Organic lemon juice concentrate',
        'limited',
        labelCite(CITE.d3, METH.juiceBase),
      ),
      flag('Organic annatto (color)', 'cleared', labelCite(CITE.d3, METH.annatto)),
      flag('Organic flavors', 'cleared', labelCite(CITE.d3, METH.organicFlavor)),
      flag(
        'Organic black carrot juice concentrate (color)',
        'cleared',
        labelCite(CITE.d3, METH.namedColor),
      ),
      flag(
        'Organic turmeric (color)',
        'cleared',
        labelCite(CITE.d3, METH.namedColor),
      ),
      flag('Organic tapioca syrup', 'cleared', labelCite(CITE.d3, METH.sugar)),
      flag('Organic sugar', 'cleared', labelCite(CITE.d3, METH.sugar)),
      flag('Pectin', 'cleared', labelCite(CITE.d3, METH.gums)),
      flag('Sodium citrate', 'cleared', labelCite(CITE.d3, METH.citrate)),
      flag('Organic carnauba wax', 'cleared', labelCite(CITE.d3, METH.gelatin)),
    ],
    verdict: 'avoid',
    honestNote: `FOUNDER-LOCK DRAFT: Mama Bear Organic Kids Vitamin D3 gummies = Avoid. Organic sunflower oil in a gummy is High. ${GUMMY_OIL_TAP} Organic flavors are Cleared (§5 organic flavors/colors — not Limited natural flavors). Organic lemon juice concentrate is the Limited gummy-base row — not needed to reach Avoid. Annatto is standalone Caution — not the Avoid driver. Named black carrot / turmeric-as-color is Cleared. Pack sizes share this formulaId. HelloPharmacist / NIH DSLD 300215 barcode 842379159305 (80 ct). Confirm carton. No DailyMed drug SPL (dietary supplement). Ages 2+. Draft, not verified.`,
    cleanAlternatives: D3_ALTS,
    sourcesGeneral: [`${CITE.d3} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'mama-bear-vegan-kids-vitamin-c-gummies',
    productName: 'Mama Bear Vegan Kids Vitamin C Gummies',
    brand: MAMA_BEAR,
    category: VITAMINS,
    barcode: '842379148835',
    formulaId: 'mama-bear-vegan-kids-vitamin-c-gummies',
    audience: KIDS,
    minAge: 2,
    form: 'gummy',
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Vitamin C', strength: '125mg per gummy' },
    ],
    inactiveIngredients: [
      flag(
        'Organic sunflower oil',
        'high',
        labelCite(CITE.vitC, METH.seedOilGummies),
      ),
      flag('Natural flavors', 'limited', labelCite(CITE.vitC, METH.flavors)),
      flag(
        'Organic annatto extract (color)',
        'cleared',
        labelCite(CITE.vitC, METH.annatto),
      ),
      flag('Organic sugar', 'cleared', labelCite(CITE.vitC, METH.sugar)),
      flag('Organic tapioca syrup', 'cleared', labelCite(CITE.vitC, METH.sugar)),
      flag('Pectin', 'cleared', labelCite(CITE.vitC, METH.gums)),
      flag('Citric acid', 'cleared', labelCite(CITE.vitC, METH.citrate)),
      flag('Sodium citrate', 'cleared', labelCite(CITE.vitC, METH.citrate)),
      flag('Organic carnauba wax', 'cleared', labelCite(CITE.vitC, METH.gelatin)),
    ],
    verdict: 'avoid',
    honestNote: `FOUNDER-LOCK DRAFT: Mama Bear Vegan Kids Vitamin C gummies = Avoid. Organic sunflower oil in a gummy is High. ${GUMMY_OIL_TAP} Natural flavors are Limited — not needed to reach Avoid. Organic Annatto Extract (Color) is standalone Caution — not the Avoid driver. Pack sizes share this formulaId. HelloPharmacist / DSLD barcode 842379148835 (60 ct). Confirm carton. No DailyMed drug SPL (dietary supplement). Ages 2+. Draft, not verified.`,
    cleanAlternatives: VITAMIN_C_ALTS,
    sourcesGeneral: [`${CITE.vitC} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'mama-bear-vegan-kids-probiotic-gummies',
    productName: 'Mama Bear Vegan Kids Probiotic Gummies',
    brand: MAMA_BEAR,
    category: DIGESTIVE,
    barcode: BATCH62_CATCHUP_BARCODES['mama-bear-vegan-kids-probiotic-gummies'],
    formulaId: 'mama-bear-vegan-kids-probiotic-gummies',
    audience: KIDS,
    minAge: 2,
    form: 'gummy',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Kids probiotic', strength: '1 billion CFU per gummy' },
    ],
    inactiveIngredients: [
      flag(
        'Organic sunflower oil (containing carnauba wax)',
        'high',
        labelCite(CITE.probiotic, METH.seedOilGummies),
      ),
      flag('Natural flavors', 'limited', labelCite(CITE.probiotic, METH.flavors)),
      flag(
        'Organic maqui berry juice concentrate (color)',
        'cleared',
        labelCite(CITE.probiotic, METH.namedColor),
      ),
      flag(
        'Black carrot juice concentrate (color)',
        'cleared',
        labelCite(CITE.probiotic, METH.namedColor),
      ),
      flag('Organic tapioca syrup', 'cleared', labelCite(CITE.probiotic, METH.sugar)),
      flag(
        'Organic evaporated cane sugar',
        'cleared',
        labelCite(CITE.probiotic, METH.sugar),
      ),
      flag('Pectin', 'cleared', labelCite(CITE.probiotic, METH.gums)),
      flag('Citric acid', 'cleared', labelCite(CITE.probiotic, METH.citrate)),
      flag('Sodium citrate', 'cleared', labelCite(CITE.probiotic, METH.citrate)),
      flag('Corn starch', 'cleared', labelCite(CITE.probiotic, METH.starch)),
      flag('Organic carnauba wax', 'cleared', labelCite(CITE.probiotic, METH.gelatin)),
    ],
    verdict: 'avoid',
    honestNote: `FOUNDER-LOCK DRAFT: Mama Bear Vegan Kids Probiotic gummies = Avoid. Organic sunflower oil (containing carnauba wax) in a gummy is High. ${GUMMY_OIL_TAP} Carnauba wax itself is Cleared. Natural flavors are Limited — not needed to reach Avoid. Named Natural Colors (organic maqui berry juice concentrate, black carrot juice concentrate) are Cleared named plant-color — not the unspecified Natural Colors Limited row. Organic evaporated cane sugar is the Cleared cane-sugar row. No carton / DSLD UPC harvested — do not invent a code. Pack sizes share this formulaId. Confirm carton. No DailyMed drug SPL (dietary supplement). Ages 2+ (2–3: 1 gummy; 4+: 2 gummies as labeled). No independently Clean kids probiotic exists in the drafted batches — cleanAlternatives omitted (honest empty; do not invent a Clean kids probiotic gummy; do not point at adult sex-specific probiotics). Draft, not verified.`,
    sourcesGeneral: [`${CITE.probiotic} — ${UNVERIFIED_NOTE}`],
  }),
];

export const BATCH62_REFUSED_NOT_WRITTEN: { sku: string; reason: string }[] = [
  {
    sku: 'Elements / Basics leftover multis and singles; Solimo leftovers; Revly full line',
    reason: 'out of this four-SKU Mama Bear write; do not invent',
  },
  {
    sku: 'WELMATE / A+Health / HealthA2Z / 3P brands',
    reason: 'out of file scope this pass',
  },
];

const _ROWS = BATCH62_MAMA_BEAR_CAROUSEL;
if (_ROWS.length !== 4) throw new Error('batch62 tally drift: expected 4 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 0) {
  throw new Error('batch62 Clean tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 1) {
  throw new Error('batch62 Caution tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 3) {
  throw new Error('batch62 Avoid tally drift');
}
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch62 recordStatus must stay unverified');
}
if (_ROWS.some((r) => !r.formulaId)) {
  throw new Error('batch62 every row needs formulaId');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch62 duplicate ids');

const FORBIDDEN_IDS = [
  'mama-bear-organic-kids-multivitamin-gummies',
  'mama-bear-kids-fiber-gummies',
];
if (_ROWS.some((r) => FORBIDDEN_IDS.includes(r.id))) {
  throw new Error('batch62 must not clone batch61 Mama Bear multi / fiber ids');
}
if (
  !_ids.has('mama-bear-organic-kids-vitamin-d3-gummies') ||
  !_ids.has('mama-bear-vegan-kids-vitamin-c-gummies') ||
  !_ids.has('mama-bear-kids-black-elderberry-gummies') ||
  !_ids.has('mama-bear-vegan-kids-probiotic-gummies')
) {
  throw new Error('batch62 must write exactly the four founder-carousel Mama Bear SKUs');
}

const d3 = _ROWS.find((r) => r.id === 'mama-bear-organic-kids-vitamin-d3-gummies');
const vitC = _ROWS.find((r) => r.id === 'mama-bear-vegan-kids-vitamin-c-gummies');
const elder = _ROWS.find((r) => r.id === 'mama-bear-kids-black-elderberry-gummies');
const probiotic = _ROWS.find((r) => r.id === 'mama-bear-vegan-kids-probiotic-gummies');
if (d3?.verdict !== 'avoid' || vitC?.verdict !== 'avoid' || probiotic?.verdict !== 'avoid') {
  throw new Error('Mama Bear gummy sunflower oil must stay Avoid');
}
if (elder?.verdict !== 'caution') {
  throw new Error('Mama Bear elderberry (no seed oil; natural flavors) must stay Caution');
}
if (d3?.inactiveIngredients.some((i) => /sunflower/i.test(i.name) && i.riskLevel !== 'high')) {
  throw new Error('D3 sunflower oil must be High');
}
if (vitC?.inactiveIngredients.some((i) => /sunflower/i.test(i.name) && i.riskLevel !== 'high')) {
  throw new Error('Vitamin C sunflower oil must be High');
}
if (probiotic?.inactiveIngredients.some((i) => /sunflower/i.test(i.name) && i.riskLevel !== 'high')) {
  throw new Error('Probiotic sunflower oil must be High');
}
if (elder?.inactiveIngredients.some((i) => /sunflower|palm|safflower|vegetable oil|canola|soybean/i.test(i.name))) {
  throw new Error('elderberry pinned OI has no seed oil — do not invent one');
}
if (elder?.inactiveIngredients.find((i) => /natural flavors/i.test(i.name))?.riskLevel !== 'limited') {
  throw new Error('elderberry natural flavors must be Limited');
}
for (const record of BATCH62_MAMA_BEAR_CAROUSEL) {
  const expected = BATCH62_CATCHUP_BARCODES[record.id];
  if (expected && record.barcode !== expected) {
    throw new Error(`batch 62 catch-up UPC drift on ${record.id}`);
  }
}
