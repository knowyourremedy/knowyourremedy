// DRAFT / not verified / batch 104 KYR6 HealthA2Z no_OI 46 AI-mode pass.
// Methodology v1.6 + MAIN §5 after f7d58d6 (Sept 25, 2026 HealthA2Z exact
// leftovers) and the alias-family stamps 8e480c3, a761f55, f7d58d6.
// Harm-first. No invented grades. No invented OI. No invented UPCs.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. The 46 SKUs in BATCH100_SKIPPED_NO_OI only. No TIME-Cap.
// No GoodSense. No other brands. No house Amazon. No Sprouts. No toothpaste.
// No factory. Oil form split stays. Do not edit batch70–batch103.
//
// This rung is Google search plus Google AI mode. AI mode (udm=50) returned
// a captcha / unusual-traffic wall on the first query and was not treated as
// an answer. Search snippets, AI blurbs, and HTML marketing bullets are not
// OI and are not a UPC. A schema / BigCommerce upc field is not a printed
// barcode. An NHRIC is not a UPC. Empty stays empty.
// recordStatus is 'unverified' on every row.
// Internal keys only: clean | caution | avoid.
// Search wiring only. Not wired into Clean Picks UI.
//
// TALLY (unverified drafts in THIS file): 1 row —
// Clean 0 / Caution 1 / Avoid 0.
// NEW 1 / REUSE-formula 0 /
// SKIPPED 44 (no_OI 44 / OUT 0) /
// REFUSED 1.
// Search grade: Clean 0 / Caution 1 / Avoid 0.
// UPCs attached: none.
// WebSearch calls recorded on this pass: 92 (46 SKUs × 2).
// TALLY is asserted at the bottom.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';
import { BATCH100_SKIPPED_NO_OI } from './batch100-kyr6-healtha2z-no-oi-google';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const SUPPLEMENT = 'Supplement' as const;
const UNVERIFIED_NOTE = 'draft, not verified';

const BRAND = 'HealthA2Z';
const AMAZON = ['Amazon'] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const DM = 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=';

const METH = {
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose).',
  sio2:
    'Methodology §5 Limited (colloidal silicon dioxide / silicon dioxide / silica — 0-pt nanoparticle Caution cap). Does not by itself make Avoid.',
  stearic: 'Methodology §5 Cleared (stearic acid).',
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
  productType: typeof SUPPLEMENT;
  actives: RatingRecord['activeIngredients'];
  flags: [string, IngredientFlag['riskLevel'], keyof typeof METH][];
  verdict: RatingRecord['verdict'];
  note: string;
  cite: string;
  barcode?: string;
  upcNote?: string;
};

function expand(d: Compact): RatingRecord {
  const alts: CleanAlternative[] = [];
  if (d.verdict !== 'clean') {
    const main = {
      Digestive: [
        'megafood-magnesium-300-capsules',
        'Independently Clean MegaFood Magnesium 300 already on main. Form labeled, not a hard filter (§6).',
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
    honestNote: `${d.note} ${LIMITED_STACK} Packs with this OI list share formulaId \`${d.formulaId}\`. No dosing or medical advice. Draft, not verified.`,
    retailers: [...AMAZON],
    cleanAlternatives: alts.length ? alts : undefined,
    barcode: d.barcode,
    sourcesGeneral: [`${d.cite}${d.upcNote ? ` ${d.upcNote}` : ''} — ${UNVERIFIED_NOTE}`],
  });
}

const MAG_SET = '37d5a34d-42f5-47c3-85c3-4402e46849b9';
const MAG_ID = 'healtha2z-b104-mag-oxide-90';

const MAG_NOTE =
  'FOUNDER-LOCK DRAFT: Caution. Driver: colloidal silicon dioxide. Microcrystalline cellulose, croscarmellose sodium, and stearic acid are Cleared. The printed ingredients line is Microcrystalline Cellulose, Croscarmellose Sodium, Stearic Acid, Colloidal Silicon Dioxide. The structured inactive table names silicon dioxide for that fourth string and does not add a fifth ingredient. Statement of identity prints Magnesium (as magnesium oxide) 253 mg. The marketed name on this SKU is magnesium oxide 420 mg. Directions say adults, 1 tablet. The label does not print a year. NHRIC 69168-306-82 is the 90-count bottle. No GTIN-12 on the SPL. A brand schema UPC is not a printed barcode. The 24×90 value pack (FP1069) is a different count and is not this row.';

const MAG_CITE = `DailyMed dietary supplement label (${DM}${MAG_SET}; setid ${MAG_SET}; NHRIC 69168-306-82; 90 in 1 bottle; labeler Allegiant Health). Ingredients: Microcrystalline Cellulose, Croscarmellose Sodium, Stearic Acid, Colloidal Silicon Dioxide. Statement of identity: Magnesium (as magnesium oxide) 253 mg. No GTIN-12.`;

const COMPACT: Compact[] = [
  {
    id: MAG_ID,
    productName: 'HealthA2Z Mag Oxide 420 mg tablets, 90 count (FPHK1069)',
    category: 'Digestive',
    formulaId: MAG_ID,
    audience: ADULT,
    minAge: 18,
    form: 'tablet',
    productType: SUPPLEMENT,
    actives: [{ name: 'Magnesium (as magnesium oxide)', strength: '253 mg' }],
    flags: [
      ['microcrystalline cellulose', 'cleared', 'mcc'],
      ['croscarmellose sodium', 'cleared', 'croscarmellose'],
      ['stearic acid', 'cleared', 'stearic'],
      ['colloidal silicon dioxide', 'limited', 'sio2'],
    ],
    verdict: 'caution',
    note: MAG_NOTE,
    cite: MAG_CITE,
  },
];

export const BATCH104_KYR6_HEALTHA2Z_NO_OI_AIMODE: RatingRecord[] = COMPACT.map(expand);

const MEL_SET = '21629477-90e4-4e41-8186-a80db3f007b2';

const MEL_BLOCK =
  'REFUSED exact panel string(s) `natural blackberry flavor`, `purple carrot juice`, `carnuaba wax`. DailyMed setid 21629477-90e4-4e41-8186-a80db3f007b2 (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=21629477-90e4-4e41-8186-a80db3f007b2; NHRIC 69168-763-60; 60 in 1 bottle; labeler Allegiant Health). Printed other ingredients: Glucose syrup, sugar, glucose, pectin, citric acid, sodium citrate, natural blackberry flavor, purple carrot juice, vegetable oil (with carnuaba wax). `natural blackberry flavor` is not natural apple flavor, artificial blueberry flavor, Orange flavor, peppermint flavor, assorted flavors, flavors, or banana flavor. `purple carrot juice` is not purple carrot concentrate and is not purple carrot for color. `carnuaba wax` is not carnauba wax. Those three strings block the row. NO Search row. No GTIN-12 on the SPL.';

type Outcome = 'no_OI' | 'refused' | 'new';

type Log = {
  needle: string;
  q1: string;
  q2: string;
  opened: string;
  outcome: Outcome;
};

const AI =
  'Google AI mode (udm=50) returned a captcha on this machine and was not an answer.';

export const BATCH104_SEARCH_LOG: Log[] = [
  {
    needle: '(FP1043)',
    q1: '"HealthA2Z Allergy Relief Diphenhydramine 25mg 24 Packs of 12 Softgels 288" other ingredients',
    q2: '"HealthA2Z Allergy Relief Diphenhydramine 25mg 24 Packs of 12 Softgels 288" UPC',
    opened: `${AI} Opened the AI-mode URL for query (a) and got a captcha. Grocery Outlet 12-count dye-free page did not render an ingredient list and is not this 24×12 softgel pack. Brand-page text in search had no inactive sentence. Schema UPC is not a printed barcode.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FP1062)',
    q1: '"HealthA2Z Blackberry Flavored Melatonin 5 mg 60 Pieces" other ingredients',
    q2: '"HealthA2Z Blackberry Flavored Melatonin 5 mg 60 Pieces" UPC',
    opened: `${AI} Opened DailyMed setid ${MEL_SET}. The 60-count bottle prints an other-ingredients line. Three strings do not resolve. Refused. No GTIN-12.`,
    outcome: 'refused',
  },
  {
    needle: '(FP1069)',
    q1: '"HealthA2Z Wellness Magnesium Oxide 420mg 24 Packs of 90 Tablets" other ingredients',
    q2: '"HealthA2Z Wellness Magnesium Oxide 420mg 24 Packs of 90 Tablets" UPC',
    opened: `${AI} Search cited the 90-count Allegiant SPL and non-Allegiant magnesium oxide labels. The 90-count panel is FPHK1069, not this 2,160-tablet value pack. No page confirmed the value pack is 24 of that bottle. No panel for 24×90.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FP1221)',
    q1: '"HealthA2Z Men\'s Vitality Boost 30 Capsules" other ingredients',
    q2: '"HealthA2Z Men\'s Vitality Boost 30 Capsules" UPC',
    opened: `${AI} Opened Walmart 16560766217. Page loaded without an ingredient sentence and the carousel images were not readable as a facts panel. Schema UPC 369168804852 is not a printed barcode.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FPA104)',
    q1: '"HealthA2Z Multi Collagen Pills 1735 mg 270 Collagen Capsules" other ingredients',
    q2: '"HealthA2Z Multi Collagen Pills 1735 mg 270 Collagen Capsules" UPC',
    opened: `${AI} Opened Target A-1004541306. Image text described supplement facts for the collagen blend and did not print an other-ingredients line. A side-image barcode was not read. Estonia and New Zealand listings were skipped. No GTIN-12 pinned.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FP1186)',
    q1: '"HealthA2Z CoQ-10 1000 mg 80 Softgels" other ingredients',
    q2: '"HealthA2Z CoQ-10 1000 mg 80 Softgels" UPC',
    opened: `${AI} Opened Target A-1004576888. The label accordion did not render. A search snippet that named soybean oil and also said Coenzyme Q10 100 mg was not pinned to this 1000 mg SKU. Walmart golden CoQ10 was a robot wall. French Guiana Ubuy was skipped.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FP0921)',
    q1: '"HealthA2Z Senna Laxative Sennoside 8.6mg" other ingredients',
    q2: '"HealthA2Z Senna Laxative Sennoside 8.6mg" UPC',
    opened: `${AI} Hits were the already-written 24×30 (FP0921A) and 300-count (FPA091) brand pages. This uncounted compare SKU still has no own panel. Those rows were not rewritten.`,
    outcome: 'no_OI',
  },
  {
    needle: 'Aspirin 81mg Low Strength, 40 Tablets',
    q1: '"HealthA2Z Aspirin 81mg Low Strength 40 Tablets" other ingredients',
    q2: '"HealthA2Z Aspirin 81mg Low Strength 40 Tablets" UPC',
    opened: `${AI} Opened the Instacart 40-count page. The ingredient tab did not render. A search snippet of an inactive paragraph was not on the fetched page and was not pinned. JC Sales barcode field is not a printed GTIN.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FPHK1222)',
    q1: '"HealthA2Z Vitamin D3 + K2 5000 IU 100 mcg 90 Softgels" other ingredients',
    q2: '"HealthA2Z Vitamin D3 + K2 5000 IU 100 mcg 90 Softgels" UPC',
    opened: `${AI} Opened Target A-1004603374. The label accordion did not render. A sunflower-oil snippet was not pinned. The coconut-oil SKU FPHK1287 is a different product.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FP1119)',
    q1: '"HealthA2Z Fish oil 200 ct" other ingredients',
    q2: '"HealthA2Z Fish oil 200 ct" UPC',
    opened: `${AI} Brand-page text in search had no other-ingredients line. Fish-oil DailyMed hits were not this 200-count HealthA2Z pack. The 180-count is FPHK1218.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FPHK1313)',
    q1: '"HealthA2Z Magnesium Glycinate 240 mg 180 Capsules" other ingredients',
    q2: '"HealthA2Z Magnesium Glycinate 240 mg 180 Capsules" UPC',
    opened: `${AI} Brand and Walmart text in search was marketing. Nature's Bounty ingredients are another brand and were not pinned. Schema UPC is not a printed barcode.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FPHK1252)',
    q1: '"HealthA2Z Ashwagandha 120 Capsules 7000mg" other ingredients',
    q2: '"HealthA2Z Ashwagandha 120 Capsules 7000mg" UPC',
    opened: `${AI} Opened Target A-1005266743. The label accordion did not render. A search snippet mixed a 700 mg extract formula with this 7,000 mg root-powder SKU and was not pinned.`,
    outcome: 'no_OI',
  },
  {
    needle: 'Allergy Relief, Diphenhydramine 25mg ( 1 Pack',
    q1: '"HealthA2Z Allergy Relief Diphenhydramine 25mg" "1 Pack" "3 Packs" other ingredients',
    q2: '"HealthA2Z Allergy Relief Diphenhydramine 25mg" "1 Pack" "3 Packs" UPC',
    opened: `${AI} Brand-page text in search had dosing and no inactive list. The option page is not one pinned count. A sleep-aid caplet SPL was not copied onto this SKU.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FP1068)',
    q1: '"HealthA2Z Vitamin D3 2000 IU 90 Mini Softgels" other ingredients',
    q2: '"HealthA2Z Vitamin D3 2000 IU 90 Mini Softgels" UPC',
    opened: `${AI} Opened Target A-1004578844. The label accordion did not render. A soybean-oil snippet was not pinned. The 360-count is FPHK1153.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FP1126)',
    q1: '"HealthA2Z Strawberry Flavored B-Complex 60 Pieces" other ingredients',
    q2: '"HealthA2Z Strawberry Flavored B-Complex 60 Pieces" UPC',
    opened: `${AI} Search results were brand marketing and other B-complex products. No US page rendered an other-ingredients panel for this 60-piece pack.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FPHK1069)',
    q1: '"HealthA2Z Mag Oxide 420mg Tablets 90 ct" other ingredients',
    q2: '"HealthA2Z Mag Oxide 420mg Tablets 90 ct" UPC',
    opened: `${AI} Opened DailyMed setid ${MAG_SET}. Printed ingredients line matches the 90-count bottle. Written. No GTIN-12 on the SPL.`,
    outcome: 'new',
  },
  {
    needle: '(FP1190)',
    q1: '"HealthA2Z Emulsified Calcium 600 mg 100 Softgels" other ingredients',
    q2: '"HealthA2Z Emulsified Calcium 600 mg 100 Softgels" UPC',
    opened: `${AI} Opened Target A-1004578942. The label accordion did not render. Walmart liquid-calcium hits were a robot wall or a different product.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FPN002)',
    q1: '"HealthA2Z Multi Collagen 1735mg 180 capsules" other ingredients',
    q2: '"HealthA2Z Multi Collagen 1735mg 180 capsules" UPC',
    opened: `${AI} An Estonia nutricity listing named gelatin, magnesium stearate, microcrystalline cellulose, and silica. Non-US. Not pinned. No US panel rendered for the 180-count.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FPHK1255)',
    q1: '"HealthA2Z CoQ10 200mg Heart Power 90 Softgels" other ingredients',
    q2: '"HealthA2Z CoQ10 200mg Heart Power 90 Softgels" UPC',
    opened: `${AI} Brand-page text in search named actives and did not print an other-ingredients line. Schema UPC is not a printed barcode.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FPN016)',
    q1: '"HealthA2Z Liquid Vitamin B-Complex 16 oz" other ingredients',
    q2: '"HealthA2Z Liquid Vitamin B-Complex 16 oz" UPC',
    opened: `${AI} Brand-page text for FPN016 was in the search result and the description is cod-liver copy. No other-ingredients line. Schema UPC 369168809574 is shared with FPN015 and is not a printed barcode. Plus-iron listings are a different product.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FP1148)',
    q1: '"HealthA2Z Vitamin D3 25 mcg 1000 IU 90 Softgels" other ingredients',
    q2: '"HealthA2Z Vitamin D3 25 mcg 1000 IU 90 Softgels" UPC',
    opened: `${AI} Healthy Accents is another brand. Target 1000 IU text in search showed the active and no other-ingredients line.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FPHK1153)',
    q1: '"HealthA2Z Vitamin D3 2000IU 360 Softgels" other ingredients',
    q2: '"HealthA2Z Vitamin D3 2000IU 360 Softgels" UPC',
    opened: `${AI} UK and other-brand 360-count listings were skipped or not this SKU. The 90-count Target page is FP1068. No panel for 360.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FPHK1253)',
    q1: '"HealthA2Z 9 in 1 Joint Health for Women 90 Tablets" other ingredients',
    q2: '"HealthA2Z 9 in 1 Joint Health for Women 90 Tablets" UPC',
    opened: `${AI} Target A-1005286398 image text in search described supplement facts of the actives and did not print an other-ingredients line. The page was not a new facts panel.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FPHK1256)',
    q1: '"HealthA2Z Eye Health 60 Softgels" other ingredients',
    q2: '"HealthA2Z Eye Health 60 Softgels" UPC',
    opened: `${AI} Search text named actives only. No US page rendered an other-ingredients panel for this 60-softgel pack.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FPA080)',
    q1: '"HealthA2Z Pain Relief Extra Strength 500 Caplets" other ingredients',
    q2: '"HealthA2Z Pain Relief Extra Strength 500 Caplets" UPC',
    opened: `${AI} Opened DailyMed setid d72d83b8-54ff-4bc4-b66e-bb10d9913f74. Labeler Allegiant Health, NDC 69168-235-05, package is 50 tablets, not 500. Not pinned. Setid 8e60b78e was already known to lack a 500-count. Brand schema UPC is not a printed barcode.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FPHK1065)',
    q1: '"HealthA2Z Vitamin C Gummies Orange 250 mg 60 Pieces" other ingredients',
    q2: '"HealthA2Z Vitamin C Gummies Orange 250 mg 60 Pieces" UPC',
    opened: `${AI} Opened Target A-1004604237. The label accordion and carousel did not render an ingredients sentence. A search snippet that included "nautural orange flavor" was not on the fetched page and was not pinned.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FPHK1302)',
    q1: '"HealthA2Z Milk Thistle 300 mg 60 Tablets" other ingredients',
    q2: '"HealthA2Z Milk Thistle 300 mg 60 Tablets" UPC',
    opened: `${AI} Brand-page text in search had no other-ingredients line. No US PDP rendered a facts panel for this 60-tablet pack.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FP1032)',
    q1: '"HealthA2Z Anti-Gas 125mg" "1 Pack" "3 Packs" other ingredients',
    q2: '"HealthA2Z Anti-Gas 125mg" "1 Pack" "3 Packs" UPC',
    opened: `${AI} Brand-page text named the active only. The 72, 150, and 365 counts are already written and were not copied onto this option page. FirstCare chewable is another brand.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FPHK1290)',
    q1: '"HealthA2Z Vitamin D3 2000 IU K2 coconut oil 90 Softgels" other ingredients',
    q2: '"HealthA2Z Vitamin D3 2000 IU K2 coconut oil 90 Softgels" UPC',
    opened: `${AI} Brand-page text named virgin coconut oil as the carrier and did not print an other-ingredients line. Schema UPC is not a printed barcode. A sunflower-oil Target page is FPHK1222, a different SKU.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FPHK1294)',
    q1: '"HealthA2Z Antarctic Krill Oil 1000 mg Per Serving 60 Softgels" other ingredients FPHK1294',
    q2: '"HealthA2Z Antarctic Krill Oil 1000 mg Per Serving 60 Softgels" UPC FPHK1294',
    opened: `${AI} Both queries returned the FPHK1188 brand page, not a separate FPHK1294 panel. That page has no other-ingredients line. Schema UPC 369168814608 is not a printed barcode. Target 60-count was already fetched in batch100 and was not re-walked.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FPHK1318)',
    q1: '"HealthA2Z Ovarian Support" "Saffron 88.5mg" "60 Caps" other ingredients FPHK1318',
    q2: '"HealthA2Z Ovarian Support" "Saffron 88.5mg" "60 Caps" UPC FPHK1318',
    opened: `${AI} Brand-page text named saffron, inositol, and organic MCT oil and did not print an other-ingredients line. Schema UPC 369168828605 is not a printed barcode. Other brands' ovarian formulas were not pinned.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FP1138)',
    q1: '"HealthA2Z Glucosamine Chondroitin MSM" "120 Caplets" other ingredients FP1138',
    q2: '"HealthA2Z Glucosamine Chondroitin MSM" "120 Caplets" UPC FP1138',
    opened: `${AI} Brand-page text was "MSM Caplets help with Joint Health" and no other-ingredients line. Schema UPC 369168784062 is not a printed barcode. Nature's Blend and Jamieson are other brands. The women's 90-tablet joint SKU is FPHK1253.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FP1090)',
    q1: '"HealthA2Z Extra Strength Pain Relief" "Acetaminophen 500mg" "24 Packs of 24 Tablets" other ingredients FP1090',
    q2: '"HealthA2Z Extra Strength Pain Relief" "Acetaminophen 500mg" "24 Packs of 24 Tablets" UPC FP1090',
    opened: `${AI} Amazon B0FX66WQB2 search text is marketing for the 576-count value pack and has no inactive line. Opened Target A-1004584711, which is a 24-count, not 576. Its accordion did not render. A search snippet of corn starch, povidone, pregelatinized starch, sodium starch glycolate, and stearic acid was not on the fetched page and was not pinned. DailyMed d72d83b8 is 50 tablets.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FPA192 (FP1317))',
    q1: '"HealthA2Z Daytime and Nighttime" "Cold & Flu" "36 Softgels" other ingredients FPA192',
    q2: '"HealthA2Z Daytime and Nighttime" "Cold & Flu" "36 Softgels" UPC FPA192',
    opened: `${AI} Brand-page text says 24 daytime and 12 nighttime softgels and prints no inactive list. A phenylephrine day/night DailyMed kit is a different product and was not pinned. Kuwait tilga.com.kw was skipped. Dual panels were not on a page for this SKU, so it stays no_OI. Schema UPC 369168474154 is not a printed barcode.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FP1127)',
    q1: '"HealthA2Z Sugar Free Melatonin Gummies" "Blackberry" "5 mg" "60 Pieces" other ingredients FP1127',
    q2: '"HealthA2Z Sugar Free Melatonin Gummies" "Blackberry" "5 mg" "60 Pieces" UPC FP1127',
    opened: `${AI} Brand-page text has no other-ingredients line. The sugared Allegiant melatonin SPL (setid ${MEL_SET}) is FP1062, not this sugar-free SKU, and was not copied. Estonia nutricity was skipped. Schema UPC 369168778603 is not a printed barcode.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FPN015)',
    q1: '"HealthA2Z Liquid Vitamin B-Complex" "16oz" other ingredients FPN015',
    q2: '"HealthA2Z Liquid Vitamin B-Complex" "16oz" UPC FPN015',
    opened: `${AI} Brand-page text for FPN015 has no other-ingredients line. The FPN016 page shares schema gtin14 00369168809574 and is a different SKU. Plus-iron Amazon text is a different product. No printed barcode.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FPHK1277)',
    q1: '"HealthA2Z Magnesium Glycinate" DHA 120mg "120 Chewable Tablets" other ingredients FPHK1277',
    q2: '"HealthA2Z Magnesium Glycinate" DHA 120mg "120 Chewable Tablets" UPC FPHK1277',
    opened: `${AI} Search hits were the dietary-supplements index blurb and the FP1019 / FPHK1313 magnesium pages. No other-ingredients line for this 120-count chewable. A Nordic VMS tech sheet is another brand.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FPHK1130)',
    q1: '"HealthA2Z Women\'s Multivitamin Gummies" "Peach" "60 Pieces" other ingredients FPHK1130',
    q2: '"HealthA2Z Women\'s Multivitamin Gummies" "Peach" "60 Pieces" UPC FPHK1130',
    opened: `${AI} Target A-1004604139 was opened on this pass and the accordion did not render. The search snippet that lists natural peach flavor, natural orange flavor, natural strawberry flavor, and purple carrot juice concentrate was not on the fetched page and was not pinned. Brand schema UPC 369168782600 is not a printed barcode.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FPHK1287)',
    q1: '"HealthA2Z Vitamin D3" "5,000 IU" K2 "Virgin Coconut Oil" "90 Softgels" other ingredients FPHK1287',
    q2: '"HealthA2Z Vitamin D3" "5,000 IU" K2 "Virgin Coconut Oil" "90 Softgels" UPC FPHK1287',
    opened: `${AI} Brand-page text names virgin coconut oil and does not print an other-ingredients line. Schema UPC 369168815605 is not a printed barcode. Cambodia Ubuy was skipped.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FPHK1188)',
    q1: '"HealthA2Z Antarctic Krill Oil" "1000 mg" "60 Softgels" other ingredients FPHK1188',
    q2: '"HealthA2Z Antarctic Krill Oil" "1000 mg" "60 Softgels" UPC FPHK1188',
    opened: `${AI} Brand-page text has no other-ingredients line. Schema UPC 369168814608 is not a printed barcode. Target A-1004576887 search text shows krill oil 1000 mg and a different UPC field 369168791602, and the accordion was already fetched in batch100 without a rendered other-ingredients line. NatureWise and Swanson ingredients were not pinned.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FP1019)',
    q1: '"HealthA2Z Magnesium Glycinate" "180 ct" other ingredients FP1019',
    q2: '"HealthA2Z Magnesium Glycinate" "180 ct" UPC FP1019',
    opened: `${AI} Brand-page text has no other-ingredients line. Schema UPC 369168745186 is not a printed barcode. Target A-1004576882 search text has no ingredient sentence. Walmart 240 mg 180-count marketing is FPHK1313. Check My Body Health ingredients are another brand.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FPHK1312)',
    q1: '"HealthA2Z Magnesium Glycinate" "240 mg" "60 Capsules" other ingredients FPHK1312',
    q2: '"HealthA2Z Magnesium Glycinate" "240 mg" "60 Capsules" UPC FPHK1312',
    opened: `${AI} Brand-page text has no other-ingredients line. Schema UPC 369168827608 is not a printed barcode. Nature's Bounty vegetable cellulose and ascorbyl palmitate are another brand and were not pinned.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FPHK1128)',
    q1: '"HealthA2Z Sugar Free Probiotics Gummies" "Raspberry" "60 Pieces" other ingredients FPHK1128',
    q2: '"HealthA2Z Sugar Free Probiotics Gummies" "Raspberry" "60 Pieces" UPC FPHK1128',
    opened: `${AI} Target A-1004604176 was opened on this pass and the accordion did not render. The search snippet that lists maltitol solution, natural raspberry flavor, and natural watermelon flavor was not on the fetched page and was not pinned. Brand schema UPC 369168779600 is not a printed barcode.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FPHK1218)',
    q1: '"HealthA2Z Fish Oil" "900 mg EPA" "600 mg DHA" "180 Softgels" other ingredients FPHK1218',
    q2: '"HealthA2Z Fish Oil" "900 mg EPA" "600 mg DHA" "180 Softgels" UPC FPHK1218',
    opened: `${AI} Opened Target A-1004603056. Carousel alt text describes a supplement-facts image with 900 mg EPA and 600 mg DHA and does not print an other-ingredients line. Brand schema UPC 369168795808 and the Target UPC field 369168776821 are not a printed barcode. WellWithAll gelatin, glycerin, and purified water are another brand.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FPHK1319)',
    q1: '"HealthA2Z Kids\' & Teens\' Chewable Vitamin D3 + K2" "20 mcg" "60 Tablets" other ingredients FPHK1319',
    q2: '"HealthA2Z Kids\' & Teens\' Chewable Vitamin D3 + K2" "20 mcg" "60 Tablets" UPC FPHK1319',
    opened: `${AI} The dietary-supplements index blurb names the SKU and does not print an other-ingredients line. UK Health4All, Zahler UK, and Zahler US chewables are other brands and were not pinned. No US PDP rendered a facts panel for this 60-tablet pack.`,
    outcome: 'no_OI',
  },
  {
    needle: '(FPHK1226)',
    q1: '"HealthA2Z Vitamin D3 + K2" "2000 IU" "100 mcg" "90 Softgels" other ingredients FPHK1226',
    q2: '"HealthA2Z Vitamin D3 + K2" "2000 IU" "100 mcg" "90 Softgels" UPC FPHK1226',
    opened: `${AI} Brand-page text names D3 and K2 amounts and does not print an other-ingredients line. Schema UPC 369168802827 is not a printed barcode. Estonia nutricity ingredients are the coconut-oil SKU, a different product, and that shop is non-US. Kenya Ubuy was skipped.`,
    outcome: 'no_OI',
  },
];

function logFor(sku: string): Log {
  const hits = BATCH104_SEARCH_LOG.filter((entry) => sku.includes(entry.needle));
  if (hits.length !== 1) {
    throw new Error(`batch104 log match drift for ${sku}`);
  }
  return hits[0];
}

function skippedReason(entry: Log): string {
  return `SKIPPED no_OI leftover. Queries: (a) ${entry.q1} (b) ${entry.q2}. ${entry.opened} A search snippet is not OI. An AI blurb is not OI. HTML marketing bullets are not OI. No GTIN-12. NDC is not a UPC.`;
}

export const BATCH104_SKIPPED_NO_OI: { sku: string; reason: string }[] =
  BATCH100_SKIPPED_NO_OI.filter((s) => logFor(s.sku).outcome === 'no_OI').map((s) => ({
    sku: s.sku,
    reason: skippedReason(logFor(s.sku)),
  }));

export const BATCH104_SKIPPED_OUT: { sku: string; reason: string }[] = [];

export const BATCH104_SKIPPED: { sku: string; reason: string }[] = [
  ...BATCH104_SKIPPED_NO_OI,
  ...BATCH104_SKIPPED_OUT,
];

export const BATCH104_REFUSED: { sku: string; reason: string }[] =
  BATCH100_SKIPPED_NO_OI.filter((s) => logFor(s.sku).outcome === 'refused').map((s) => ({
    sku: s.sku,
    reason: `${MEL_BLOCK} Queries: (a) ${logFor(s.sku).q1} (b) ${logFor(s.sku).q2}.`,
  }));

const _ROWS = BATCH104_KYR6_HEALTHA2Z_NO_OI_AIMODE;
const _grades = {
  clean: _ROWS.filter((r) => r.verdict === 'clean').length,
  caution: _ROWS.filter((r) => r.verdict === 'caution').length,
  avoid: _ROWS.filter((r) => r.verdict === 'avoid').length,
};
const _new = _ROWS.filter((r) => r.formulaId === r.id).length;
const _reuse = _ROWS.filter((r) => r.formulaId !== r.id).length;
if (_ROWS.length !== 1) throw new Error('batch104 row tally drift');
if (_grades.clean !== 0 || _grades.caution !== 1 || _grades.avoid !== 0) {
  throw new Error('batch104 Search grade drift');
}
if (_new !== 1 || _reuse !== 0) throw new Error('batch104 NEW/REUSE drift');
if (BATCH104_SKIPPED_NO_OI.length !== 44) throw new Error('batch104 no_OI drift');
if (BATCH104_SKIPPED_OUT.length !== 0) throw new Error('batch104 OUT drift');
if (BATCH104_SKIPPED.length !== 44) throw new Error('batch104 SKIPPED drift');
if (BATCH104_REFUSED.length !== 1) throw new Error('batch104 REFUSED drift');
if (BATCH104_SEARCH_LOG.length !== 46) throw new Error('batch104 search log drift');
if (BATCH100_SKIPPED_NO_OI.length !== 46) throw new Error('batch104 source 46 drift');
if (
  BATCH104_SKIPPED_NO_OI.length + BATCH104_SKIPPED_OUT.length + BATCH104_REFUSED.length + _ROWS.length !==
  46
) {
  throw new Error('batch104 46-SKU accounting drift');
}
const _accounted = new Set([
  ...BATCH104_SKIPPED.map((s) => s.sku),
  ...BATCH104_REFUSED.map((s) => s.sku),
]);
for (const source of BATCH100_SKIPPED_NO_OI) {
  const entry = logFor(source.sku);
  if (entry.outcome === 'new') {
    if (_accounted.has(source.sku)) throw new Error('batch104 written SKU also skipped');
  } else if (!_accounted.has(source.sku)) {
    throw new Error(`batch104 dropped ${source.sku}`);
  }
}
if (_ROWS.some((r) => r.brand !== 'HealthA2Z')) throw new Error('batch104 brand drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch104 recordStatus must stay unverified');
}
const _UPC: Record<string, string> = {
};
function _upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}
if (Object.keys(_UPC).length !== 0) throw new Error('batch104 UPC allowlist drift');
for (const record of _ROWS) {
  const expected = _UPC[record.id];
  if (expected) {
    if (record.barcode !== expected) throw new Error(`batch104 UPC attach drift on ${record.id}`);
    if (!_upcOk(record.barcode ?? '')) throw new Error(`batch104 barcode failed UPC-A check on ${record.id}`);
  } else if (record.barcode) {
    throw new Error(`batch104 unexpected barcode on ${record.id}`);
  }
}
const _upcValues = Object.values(_UPC);
if (new Set(_upcValues).size !== _upcValues.length) throw new Error('batch104 duplicate UPC');
if (_ROWS.some((r) => !r.id.startsWith('healtha2z-b104-'))) {
  throw new Error('batch104 ids must use healtha2z-b104-');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch104 duplicate id');
if (_ROWS.some((r) => r.formulaId?.startsWith('healtha2z-b104-') && !_ids.has(r.formulaId))) {
  throw new Error('batch104 in-file formulaId must point at a row in this file');
}
if (_ROWS.some((r) => r.verdict === 'avoid' && !r.inactiveIngredients?.some((f) => f.riskLevel === 'high'))) {
  throw new Error('batch104 Avoid without High');
}
if (_ROWS.some((r) => r.verdict === 'clean' && r.inactiveIngredients?.some((f) => f.riskLevel !== 'cleared'))) {
  throw new Error('batch104 Clean row has a non-cleared inactive');
}
if (
  _ROWS.some(
    (r) =>
      r.verdict === 'caution' &&
      !r.inactiveIngredients?.some((f) => f.riskLevel === 'limited' || f.riskLevel === 'moderate'),
  )
) {
  throw new Error('batch104 Caution needs Limited or Moderate');
}
const _blob = [
  ..._ROWS.map((r) => `${r.productName} ${r.id}`),
  ...BATCH104_SKIPPED.map((s) => s.sku),
  ...BATCH104_REFUSED.map((s) => s.sku),
].join('\n');
if (/\bTIME-Cap\b|GoodSense|toothpaste|Sprouts|Basic Care|Amazon Elements|\bSolimo\b/i.test(_blob)) {
  throw new Error('batch104 excluded brand leaked');
}
if (!BATCH104_REFUSED[0]?.reason.includes('natural blackberry flavor')) {
  throw new Error('batch104 refusal missing the blocking string');
}
if (!BATCH104_REFUSED[0]?.reason.includes('purple carrot juice')) {
  throw new Error('batch104 refusal missing purple carrot juice');
}
if (!BATCH104_REFUSED[0]?.reason.includes('carnuaba wax')) {
  throw new Error('batch104 refusal missing carnuaba wax');
}
