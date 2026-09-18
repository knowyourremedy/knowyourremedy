// DRAFT / not verified / batch 67 KYR6 Member's Mark founder-panel
// WRITE / methodology v1.6 + current main §5 exact. Additive /
// “also appears as” / locked exact-INCI rows only. No invented
// grades. No cousin-match. Founder owns final Avoid vs Caution
// vs Clean.
//
// ONE write. Founder-logged MM panels ONLY (PROJECT_NOTES
// “ready to write, do not re-ask”). recordStatus is
// 'unverified' on every row. Internal keys only:
// clean | caution | avoid. UPC attached only when a carton /
// Sam’s carousel tile shows 12 digits — no invented codes.
// DSLD / HelloPharmacist barcodes on the older soybean+corn
// D3 panel are NOT this safflower carton. NDC ≠ UPC. Missing
// code ≠ no row (omit barcode). Pack sizes of the same
// name+form+inactives share formulaId. Form is labeled on
// cleanAlternatives, not a hard filter (§6). Search wiring
// only. Not wired into Clean Picks UI. No photos. Letter
// tiles only on new ids. No fake Clean alts. No methodology
// wipe. PROJECT_NOTES one-liner only (do not wipe LIVE NOW).
//
// REUSE first — match brand+name+form+strength for product
// ids; same inactives share formulaId. Do not merge this
// safflower D3 into `kirkland-d3-softgels-clear` /
// `nature-made-d3-softgels-clear` (those are soybean-fill
// twins). Do not attach DSLD 272823 / 272824 soybean+corn
// OI or those UPCs.
//
// DO NOT REOPEN / DO NOT CLONE:
// batch65 20 new / 10 reuse · batch66 6 held ·
// equate-es-pain-reliever 100-ct white · Amazon house
// 30/54/56/61–63 · Thrive 27/52/59/60/64 · Sprouts stash ·
// Assured no-panel · Rexall · Open Nature · Walgreens
// prenatal coated · Member’s Mark conflicted OTC skip pile
// (Max Sleep DPH / Fish Oil+D3 / kids multi gummies).
//
// LOCKS used (exact §5): safflower oil as softgel fill =
// Cleared (NOT gummy High; tap both sides; Sept 16).
// Vegetable oil (coconut, canola) in a gummy = High → Avoid
// (canola is the seed-oil High; coconut alone would not be
// High). Named fruit-or-vegetable juice as color = Cleared.
// Orange juice concentrate as its own gummy-base line =
// Limited (not the Cleared named-color row). Natural flavor
// = Limited. Maltodextrin Limited. Gelatin / glycerin /
// purified water / pectin / carnauba wax / citric acid /
// glucose syrup / sugar = Cleared. Limited-only never Avoid.
// Avoid needs High. Softgel / topical oil fill ≠ gummy
// seed-oil High. Display keys stay clean / caution / avoid.
//
// FOUNDER PANELS (exact strings):
// - MM D3 softgels, all potencies, same OI: Safflower Oil,
//   Gelatin, Glycerin, Purified Water USP. Contains 2% or
//   less of Cholecalciferol. Live Sam’s this hunt: 50 mcg
//   (2000 IU) + 125 mcg (5000 IU). Shared formulaId. A
//   third distinct current potency was not a live standalone
//   SKU this hunt — do not invent 1000 IU. Older soybean +
//   corn / BHT DSLD twins are a different formula (not
//   written).
// - MM Adult Multi gummies: Glucose Syrup, Sugar, Water,
//   Gelatin, Maltodextrin, Natural Flavor, Citric Acid,
//   Pectin (from fruits), Orange Juice Concentrate, Colors
//   (from fruits and vegetables), Vegetable Oil (Coconut,
//   Canola) and Carnauba Leaf Wax (to prevent sticking).
//
// TALLY (unverified drafts in THIS file): 3 rows — Clean 2 /
// Caution 0 / Avoid 1. NEW 3 / REUSE-formula 0 / SKIPPED 6.
//
// Independently Clean analogs already on main (not cloned):
// nature-made-d3-softgels-clear ·
// kirkland-d3-softgels-clear ·
// amazon-elements-vitamin-d3-5000-softgels ·
// pure-encapsulations-one-multivitamin.
//
// TALLY is asserted at the bottom of this file.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const VITAMIN = 'Vitamin' as const;
const UNVERIFIED_NOTE = 'draft, not verified';

const VITAMINS = 'Vitamins';
const SAMS = ["Sam's Club"] as const;

const D3_FORMULA = 'members-mark-d3-softgels-safflower';
const D3_50_ID = 'members-mark-d3-50mcg-softgels';
const D3_125_ID = 'members-mark-d3-125mcg-softgels';
const GUMMY_ID = 'members-mark-adult-multi-gummies';

const PE_ONE_MULTI = 'pure-encapsulations-one-multivitamin';

const OIL_FILL_TAP =
  'Seed/industrial oils are flagged in gummies. Safflower / sunflower / palm / vegetable oil / canola used as a gummy coating or fill is that High rule. In this softgel fill they are not.';

const GUMMY_OIL_TAP =
  'Seed/industrial oils are flagged in gummies. Vegetable oil (coconut, canola) on this gummy is that High rule because canola is printed. Coconut oil alone in a gummy is not High. Softgel safflower fill is not this High rule.';

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const ZINC_PARKED =
  'Zinc (oxide / citrate / other labeled zinc salts) is parked as of Methodology v1.6 — active-safety-cap review is not done. This draft grades inactives only and does not invent an active-safety grade for zinc.';

const CITE = {
  d3: 'Founder-logged Member’s Mark Vitamin D3 softgel Other Ingredients (Sam’s / PROJECT_NOTES ready-to-write; VitaCart 50 mcg carton matches): Safflower Oil, Gelatin, Glycerin, Purified Water USP. Contains 2% or less of Cholecalciferol. Distinct from HelloPharmacist / NIH DSLD 272823 (50 mcg) and 272824 (125 mcg) soybean oil + gelatin + glycerin + corn oil — those are a different formula and are not this row. No 12-digit carton / Sam’s tile UPC harvested on the safflower panel.',
  gummy:
    'Founder-logged Member’s Mark Adult Multi Gummies Other Ingredients (Sam’s ingredients tile / PROJECT_NOTES ready-to-write): Glucose Syrup, Sugar, Water, Gelatin, Maltodextrin, Natural Flavor, Citric Acid, Pectin (from fruits), Orange Juice Concentrate, Colors (from fruits and vegetables), Vegetable Oil (Coconut, Canola) and Carnauba Leaf Wax (to prevent sticking). No 12-digit carton / Sam’s tile UPC harvested.',
} as const;

const METH = {
  seedOilGummies: `Methodology §5 High-tier (seed/industrial oils in gummies — soybean, canola, palm, safflower, sunflower, “vegetable oil”). ${GUMMY_OIL_TAP}`,
  flavors:
    'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  maltodextrin:
    'Methodology §5 Limited-risk (maltodextrin — organic or non-organic; same Limited)',
  juiceBase:
    'Methodology §5 Limited-risk (fruit puree / juice concentrate as gummy base — not the Cleared named juice-as-color row)',
  safflowerFill: `Methodology §5 Cleared (safflower oil as softgel fill — NOT gummy High; locked Sept 16, 2026). ${OIL_FILL_TAP}`,
  gelatin:
    'Methodology §5 Cleared (lactose, gelatin, carnauba wax, beeswax, purified water)',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin / organic glycerin)',
  water: 'Methodology §5 Cleared (purified water / purified water USP)',
  gums: 'Methodology §5 Cleared (xanthan gum / gum arabic / guar / pectin — locked v1.6)',
  citrate:
    'Methodology §5 Cleared (citric acid / citrate salts / malic / lactic / fumaric / adipic / tartaric)',
  sugar:
    'Methodology §5 Cleared (cane sugar, glucose syrup, tapioca syrup / dextrose / sucrose / evaporated cane sugar)',
  namedColor:
    'Methodology §5 Cleared (black carrot / named fruit-or-vegetable juice as color / colors from fruits and vegetables)',
  carnauba: 'Methodology §5 Cleared (carnauba wax / carnauba leaf wax)',
  cleared: 'Methodology §5 Cleared',
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
    retailers: opts.retailers ?? [...SAMS],
  };
}

const MULTI_ALTS: CleanAlternative[] = [
  alt(
    PE_ONE_MULTI,
    'Independently Clean adult multi analog already on main. Form: capsule vs gummy — labeled, not a hard filter (§6). Do not invent a Clean Member’s Mark multi tablet.',
  ),
];

function d3Inactives(): IngredientFlag[] {
  return [
    flag('Safflower Oil', 'cleared', labelCite(CITE.d3, METH.safflowerFill)),
    flag('Gelatin', 'cleared', labelCite(CITE.d3, METH.gelatin)),
    flag('Glycerin', 'cleared', labelCite(CITE.d3, METH.glycerin)),
    flag('Purified Water USP', 'cleared', labelCite(CITE.d3, METH.water)),
  ];
}

export const BATCH67_CATCHUP_BARCODES: Record<string, string> = {
  // No 12-digit safflower-panel / Adult Multi gummy tile harvested.
  // Do not attach DSLD 193968030216 / 193968030209 (soybean+corn twins).
};

export const BATCH67_KYR6_MEMBERS_MARK: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  row({
    id: D3_50_ID,
    productName: "Member's Mark Vitamin D3 Softgels, 50 mcg (2000 IU)",
    brand: "Member's Mark",
    category: VITAMINS,
    formulaId: D3_FORMULA,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Vitamin D3 (cholecalciferol)', strength: '50mcg (2000 IU)' },
    ],
    inactiveIngredients: d3Inactives(),
    verdict: 'clean',
    honestNote: `FOUNDER-LOCK DRAFT: Member’s Mark Vitamin D3 50 mcg (2000 IU) softgels = Clean. Founder-logged Other Ingredients: Safflower Oil, Gelatin, Glycerin, Purified Water USP. Contains 2% or less of Cholecalciferol (the labeled active — not a second inactive grade). Safflower as softgel fill is Cleared (NOT gummy High; Sept 16 lock). ${OIL_FILL_TAP} Shared formulaId \`${D3_FORMULA}\` with the 125 mcg twin — founder lock is the same OI across potencies. Do not reuse \`kirkland-d3-softgels-clear\` / \`nature-made-d3-softgels-clear\` (soybean fill). Do not write HelloPharmacist / DSLD 272823 soybean + corn oil (or BHT-era twins) as this carton. No 12-digit tile UPC harvested — omitted. Confirm carton. No DailyMed drug SPL (dietary supplement). Adults. Draft, not verified.`,
    sourcesGeneral: [`${CITE.d3} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: D3_125_ID,
    productName: "Member's Mark Vitamin D3 Softgels, 125 mcg (5000 IU)",
    brand: "Member's Mark",
    category: VITAMINS,
    formulaId: D3_FORMULA,
    audience: ADULT,
    minAge: 18,
    form: 'softgel',
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Vitamin D3 (cholecalciferol)', strength: '125mcg (5000 IU)' },
    ],
    inactiveIngredients: d3Inactives(),
    verdict: 'clean',
    honestNote: `FOUNDER-LOCK DRAFT: Member’s Mark Vitamin D3 125 mcg (5000 IU) softgels = Clean. Same safflower-fill OI as the 50 mcg twin — shared formulaId \`${D3_FORMULA}\`. Founder-logged Other Ingredients: Safflower Oil, Gelatin, Glycerin, Purified Water USP. Contains 2% or less of Cholecalciferol (the labeled active). Safflower as softgel fill is Cleared (NOT gummy High). ${OIL_FILL_TAP} Do not reuse DSLD 272824 soybean + corn oil. No 12-digit tile UPC harvested — omitted. Confirm carton. No DailyMed drug SPL. Adults. Draft, not verified.`,
    sourcesGeneral: [`${CITE.d3} — ${UNVERIFIED_NOTE}`],
  }),

  // ── Avoid ────────────────────────────────────────────────
  row({
    id: GUMMY_ID,
    productName: "Member's Mark Adult Multivitamin Gummies, Assorted Fruit",
    brand: "Member's Mark",
    category: VITAMINS,
    formulaId: GUMMY_ID,
    audience: ADULT,
    minAge: 18,
    form: 'gummy',
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Adult multivitamin (A, C, D, E + minerals)', strength: '2 gummies (label serving)' },
    ],
    inactiveIngredients: [
      flag(
        'Vegetable Oil (Coconut, Canola)',
        'high',
        labelCite(CITE.gummy, METH.seedOilGummies),
      ),
      flag('Maltodextrin', 'limited', labelCite(CITE.gummy, METH.maltodextrin)),
      flag('Natural Flavor', 'limited', labelCite(CITE.gummy, METH.flavors)),
      flag(
        'Orange Juice Concentrate',
        'limited',
        labelCite(CITE.gummy, METH.juiceBase),
      ),
      flag('Glucose Syrup', 'cleared', labelCite(CITE.gummy, METH.sugar)),
      flag('Sugar', 'cleared', labelCite(CITE.gummy, METH.sugar)),
      flag('Water', 'cleared', labelCite(CITE.gummy, METH.water)),
      flag('Gelatin', 'cleared', labelCite(CITE.gummy, METH.gelatin)),
      flag('Citric Acid', 'cleared', labelCite(CITE.gummy, METH.citrate)),
      flag('Pectin (from fruits)', 'cleared', labelCite(CITE.gummy, METH.gums)),
      flag(
        'Colors (from fruits and vegetables)',
        'cleared',
        labelCite(CITE.gummy, METH.namedColor),
      ),
      flag(
        'Carnauba Leaf Wax',
        'cleared',
        labelCite(CITE.gummy, METH.carnauba),
      ),
    ],
    verdict: 'avoid',
    honestNote: `FOUNDER-LOCK DRAFT: Member’s Mark Adult Multi Gummies = Avoid. Founder-printed Other Ingredients include Vegetable Oil (Coconut, Canola). Canola in a gummy is the §5 seed/industrial-oil High rule. Coconut on the same line does not clear the canola High — coconut alone would not be High. ${GUMMY_OIL_TAP} Do not invent a new oil grade. Natural Flavor + maltodextrin + orange-juice-concentrate (gummy-base Limited, not the Cleared named-color row) are Limited and are not needed to reach Avoid. Colors (from fruits and vegetables) are the Cleared named plant-color row. Carnauba leaf wax / pectin / gelatin / glucose syrup / sugar / citric acid / water are Cleared. ${LIMITED_STACK} Gummy ≠ the skipped Women’s / Advanced Men’s / Advanced Women’s 50+ tablets. No 12-digit tile UPC harvested — omitted. Confirm carton. No DailyMed drug SPL. Adults. ${ZINC_PARKED} Draft, not verified.`,
    cleanAlternatives: MULTI_ALTS,
    sourcesGeneral: [`${CITE.gummy} — ${UNVERIFIED_NOTE}`],
  }),
];

export const BATCH67_SKIPPED: { sku: string; reason: string }[] = [
  {
    sku: "Member's Mark Women's Multi tablets",
    reason:
      'SKIPPED honestly — founder named the Sam’s ingredients tile but did not paste Other Ingredients. HelloPharmacist Women’s Daily mixes actives into OI (BHT / TiO2 / dye lakes) and conflicts with the current Sam’s Advanced Women’s ingredients dump (no TiO2 / dyes / BHT; actives mixed on one Ingredients line). Not a single clear carton OI. Do not invent tablet OI.',
  },
  {
    sku: "Member's Mark Advanced Men's Multi tablets",
    reason:
      'SKIPPED honestly — no Sam’s tile Other Ingredients harvested this hunt. HelloPharmacist / DSLD 277384 is Men 50+ 400-ct (UPC 193968030001) with BHT / TiO2 / dye lakes / talc — not confirmed as the current Advanced Men’s 275-ct carton. Conflicted / wrong SKU. Do not invent.',
  },
  {
    sku: "Member's Mark Advanced Women's 50+ tablets",
    reason:
      'SKIPPED honestly — no Sam’s tile Other Ingredients harvested this hunt. HelloPharmacist Women 50+ vs SupLabel Women 50+ OI lists conflict (dye / BHT / TiO2 stack vs shorter TiO2 / PEG / SiO2 list). Do not pick a side. Do not invent tablet OI.',
  },
  {
    sku: "Member's Mark Vitamin D3 third potency (1000 IU / 25 mcg invent)",
    reason:
      'SKIPPED honestly — founder lock is the same safflower OI across potencies. This hunt confirmed two live Sam’s SKUs (50 mcg / 125 mcg). A third distinct current standalone potency was not found. Do not invent 1000 IU. Shared formulaId will take a later carton when the OI holds.',
  },
  {
    sku: 'Equate D3 softgels',
    reason: 'Dead this hunt (PROJECT_NOTES). Do not write.',
  },
  {
    sku: "Member's Mark Fish Oil + D3",
    reason: 'Dead this hunt (PROJECT_NOTES). Do not write.',
  },
];

const _ROWS = BATCH67_KYR6_MEMBERS_MARK;
if (_ROWS.length !== 3) throw new Error('batch67 tally drift: expected 3 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 2) {
  throw new Error('batch67 Clean tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 0) {
  throw new Error('batch67 Caution tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 1) {
  throw new Error('batch67 Avoid tally drift');
}
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch67 recordStatus must stay unverified');
}
if (_ROWS.some((r) => !r.formulaId)) {
  throw new Error('batch67 every row needs formulaId');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch67 duplicate ids');

const FORBIDDEN_IDS = [
  'equate-es-pain-reliever',
  'walgreens-prenatal-coated',
  'kirkland-d3-softgels-clear',
  'nature-made-d3-softgels-clear',
  'amazon-elements-vitamin-d3-5000-softgels',
  'members-mark-loratadine-tablets',
  'members-mark-acetaminophen-es',
  'members-mark-ibuprofen',
  'members-mark-cetirizine-tablets',
  'olly-mens-multi-canola',
  'olly-womens-multi-canola',
];
if (_ROWS.some((r) => FORBIDDEN_IDS.includes(r.id))) {
  throw new Error('batch67 must not clone closed product ids');
}

const d3Rows = _ROWS.filter((r) => r.formulaId === D3_FORMULA);
if (d3Rows.length !== 2) {
  throw new Error('batch67 D3 must be two potencies on one formulaId');
}
if (d3Rows.some((r) => r.verdict !== 'clean')) {
  throw new Error('MM D3 safflower fill must stay Clean (NOT gummy High)');
}
if (
  d3Rows.some((r) =>
    r.inactiveIngredients.some((i) => /safflower/i.test(i.name) && i.riskLevel === 'high'),
  )
) {
  throw new Error('softgel safflower fill must not be High');
}
if (
  d3Rows.some((r) =>
    r.inactiveIngredients.some((i) => /soybean|corn oil|bht/i.test(i.name)),
  )
) {
  throw new Error('do not import the DSLD soybean + corn / BHT D3 twin');
}
if (new Set(d3Rows.map((r) => r.formulaId)).size !== 1) {
  throw new Error('D3 potencies must share one formulaId');
}

const gummy = _ROWS.find((r) => r.id === GUMMY_ID);
if (gummy?.verdict !== 'avoid') {
  throw new Error('Adult Multi gummies canola print must be Avoid');
}
const gummyOil = gummy?.inactiveIngredients.find((i) =>
  /vegetable oil \(coconut, canola\)/i.test(i.name),
);
if (gummyOil?.riskLevel !== 'high') {
  throw new Error('gummy Vegetable Oil (Coconut, Canola) must be High');
}
if (
  gummy?.inactiveIngredients.some(
    (i) => /coconut/i.test(i.name) && !/canola/i.test(i.name) && i.riskLevel === 'high',
  )
) {
  throw new Error('do not High coconut-alone; canola on the same line is the High');
}

const tablets = _ROWS.some((r) =>
  /women'?s multi|advanced men|advanced women|50\+/i.test(r.productName + r.id),
);
if (tablets) throw new Error('tablet multis stay skipped — do not invent OI');

if (_ROWS.some((r) => r.barcode)) {
  throw new Error('batch67 must not invent or attach unconfirmed UPCs');
}

if (_ROWS.some((r) => r.verdict !== 'clean' && r.verdict !== 'avoid')) {
  throw new Error('batch67 display keys stay clean / avoid');
}

if (BATCH67_SKIPPED.length !== 6) {
  throw new Error('batch67 skipped tally drift');
}

for (const record of BATCH67_KYR6_MEMBERS_MARK) {
  const expected = BATCH67_CATCHUP_BARCODES[record.id];
  if (expected && record.barcode !== expected) {
    throw new Error(`batch 67 catch-up UPC drift on ${record.id}`);
  }
}

